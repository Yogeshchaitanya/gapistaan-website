// Pulls the public uploads of every source channel in content/site.json into data/videos.json
// through the YouTube Data API v3. Needs env YT_API_KEY.
//  - a source may carry "filter" (regex): only matching videos are kept (e.g. the Filmy Adaalat videos on the IFA channel)
//  - view counts are refreshed at most once a day, so the hourly sync does not commit every hour
//  - the file is never replaced by an empty or failed result
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = path.join(root, 'data/videos.json');
const key = process.env.YT_API_KEY;
if (!key) {
  console.error('YT_API_KEY नहीं मिली।');
  process.exit(1);
}
const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));

async function api(endpoint, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  for (const [k, v] of Object.entries({ ...params, key })) if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${endpoint} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}
async function playlistVideoIds(playlistId) {
  const ids = [];
  let pageToken = '';
  do {
    const j = await api('playlistItems', { part: 'contentDetails', playlistId, maxResults: 50, pageToken });
    for (const it of j.items || []) ids.push(it.contentDetails.videoId);
    pageToken = j.nextPageToken || '';
  } while (pageToken && ids.length < 5000);
  return ids;
}

let previous = null;
try { previous = JSON.parse(await readFile(dataFile, 'utf8')); } catch {}
const prevById = new Map((previous?.videos || []).map((v) => [v.id, v]));
const statsFresh = previous?.statsAt && Date.now() - Date.parse(previous.statsAt) < 23 * 3600 * 1000;

const byId = new Map();
const channels = {};
for (const src of site.sources) {
  const tail = src.channelId.slice(2);
  try {
    const c = await api('channels', { part: 'snippet,statistics', id: src.channelId });
    const it = c.items?.[0];
    if (it) channels[src.channelId] = {
      title: it.snippet.title, handle: it.snippet.customUrl || '',
      subs: it.statistics.hiddenSubscriberCount ? null : Number(it.statistics.subscriberCount),
      videos: Number(it.statistics.videoCount), views: Number(it.statistics.viewCount),
    };
  } catch (e) { console.warn('channel', src.channelId, e.message); }
  const ids = await playlistVideoIds(`UU${tail}`);
  let shortIds = new Set();
  try { shortIds = new Set(await playlistVideoIds(`UUSH${tail}`)); } catch (e) { console.warn('shorts list नहीं मिली', e.message); }
  const filter = src.filter ? new RegExp(src.filter, 'i') : null;
  for (let i = 0; i < ids.length; i += 50) {
    const j = await api('videos', { part: 'snippet,contentDetails,status,statistics', id: ids.slice(i, i + 50).join(','), maxResults: 50 });
    for (const v of j.items || []) {
      if (v.status?.privacyStatus !== 'public') continue;
      if (v.snippet?.liveBroadcastContent && v.snippet.liveBroadcastContent !== 'none') continue;
      const blob = `${v.snippet.title}\n${v.snippet.description || ''}\n${(v.snippet.tags || []).join(' ')}`;
      if (filter && !filter.test(blob)) continue;
      const th = v.snippet.thumbnails || {};
      const old = prevById.get(v.id);
      const st = v.statistics || {};
      byId.set(v.id, {
        id: v.id,
        title: v.snippet.title,
        description: (v.snippet.description || '').slice(0, 700),
        publishedAt: v.snippet.publishedAt,
        duration: v.contentDetails.duration,
        tags: (v.snippet.tags || []).slice(0, 15),
        isShort: shortIds.has(v.id),
        channelId: src.channelId,
        channel: v.snippet.channelTitle,
        views: statsFresh && old ? old.views : Number(st.viewCount || 0),
        likes: statsFresh && old ? old.likes : Number(st.likeCount || 0),
        thumbs: { medium: th.medium?.url || null, high: th.high?.url || null, standard: th.standard?.url || null, maxres: th.maxres?.url || null },
      });
    }
  }
  console.log(src.channelId, src.label || '', 'ids', ids.length, 'kept so far', byId.size);
}
const videos = [...byId.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
if (videos.length === 0 && (previous?.videos?.length || 0) > 0) {
  console.error('0 वीडियो आए; पुराना डेटा नहीं छेड़ा।');
  process.exit(1);
}
const strip = (o) => JSON.stringify({ channels: o.channels, videos: o.videos.map(({ views, likes, ...r }) => r) });
const structureChanged = !previous || strip(previous) !== strip({ channels, videos });
if (!structureChanged && statsFresh) {
  console.log(`कोई बदलाव नहीं (${videos.length} वीडियो)।`);
} else {
  await mkdir(path.dirname(dataFile), { recursive: true });
  const next = { statsAt: statsFresh && !structureChanged ? previous.statsAt : new Date().toISOString(), channels, videos };
  const text = JSON.stringify(next, null, 1) + '\n';
  if (text !== JSON.stringify(previous, null, 1) + '\n') await writeFile(dataFile, text);
  console.log(`data/videos.json अपडेट: ${previous?.videos?.length || 0} से ${videos.length} वीडियो।`);
}
