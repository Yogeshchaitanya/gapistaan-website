// Pulls the channel's public uploads from the YouTube Data API v3 into data/videos.json.
// Needs env YT_API_KEY. Writes the file only when something actually changed, and never
// overwrites good data with an empty or failed result.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = path.join(root, 'data/videos.json');
const key = process.env.YT_API_KEY;
if (!key) {
  console.error('YT_API_KEY नहीं मिली। GitHub repo की Settings > Secrets and variables > Actions में YT_API_KEY डालें।');
  process.exit(1);
}

const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const channelId = site.channelId;
const tail = channelId.slice(2);

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

const ids = await playlistVideoIds(`UU${tail}`);

// The channel's Shorts-only playlist (UUSH...) is how we tell Shorts apart. If YouTube
// refuses it, everything is treated as a normal episode.
let shortIds = new Set();
try {
  shortIds = new Set(await playlistVideoIds(`UUSH${tail}`));
} catch (e) {
  console.warn('Shorts की list नहीं मिली, सब वीडियो एपिसोड माने जाएँगे:', e.message);
}

const videos = [];
for (let i = 0; i < ids.length; i += 50) {
  const j = await api('videos', { part: 'snippet,contentDetails,status', id: ids.slice(i, i + 50).join(','), maxResults: 50 });
  for (const v of j.items || []) {
    if (v.status?.privacyStatus !== 'public') continue;
    if (v.snippet?.liveBroadcastContent && v.snippet.liveBroadcastContent !== 'none') continue; // skip upcoming/live
    const th = v.snippet.thumbnails || {};
    videos.push({
      id: v.id,
      title: v.snippet.title,
      description: v.snippet.description || '',
      publishedAt: v.snippet.publishedAt,
      duration: v.contentDetails.duration,
      tags: v.snippet.tags || [],
      isShort: shortIds.has(v.id),
      thumbs: {
        medium: th.medium?.url || null,
        high: th.high?.url || null,
        standard: th.standard?.url || null,
        maxres: th.maxres?.url || null,
      },
    });
  }
}
videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

let previous = '';
let previousCount = 0;
try {
  previous = await readFile(dataFile, 'utf8');
  previousCount = JSON.parse(previous).videos?.length || 0;
} catch {}

if (videos.length === 0 && previousCount > 0) {
  console.error(`YouTube से 0 वीडियो आए (पहले ${previousCount} थे)। पुराना डेटा नहीं छेड़ा।`);
  process.exit(1);
}

const next = JSON.stringify({ channelId, videos }, null, 2) + '\n';
if (next === previous) {
  console.log(`कोई बदलाव नहीं (${videos.length} वीडियो)।`);
} else {
  await writeFile(dataFile, next);
  console.log(`data/videos.json अपडेट: ${previousCount} से ${videos.length} वीडियो।`);
}
