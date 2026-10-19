// One-off: finds the PICHCHRAPA / Raja Ka Baja / Filmi Adalat videos and channels through the YouTube API,
// and saves the old pichchrapa.com page. Output goes to pichchrapa/discover-out/.
import { mkdir, writeFile } from 'node:fs/promises';
const key = process.env.YT_API_KEY;
const outDir = 'pichchrapa/discover-out';
await mkdir(outDir, { recursive: true });
async function api(endpoint, params) {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  for (const [k, v] of Object.entries({ ...params, key })) if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
  const res = await fetch(url);
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${endpoint} ${res.status}: ${JSON.stringify(j).slice(0, 200)}`);
  return j;
}
const out = { known: [], handles: {}, searches: {}, channelSearch: {}, errors: [] };
const slim = (v) => ({ id: v.id?.videoId || v.id, title: v.snippet.title, channelId: v.snippet.channelId, channel: v.snippet.channelTitle, at: v.snippet.publishedAt?.slice(0, 10), views: v.statistics?.viewCount });
try {
  const j = await api('videos', { part: 'snippet,statistics', id: '5cJ50s8ghm4,I5V6sz1S4e8,GHnaBN55iKc,gt9dPiNyBic,BLNiNleCdMQ' });
  out.known = (j.items || []).map(slim);
} catch (e) { out.errors.push(String(e.message)); }
for (const h of ['pichchrapa', 'rajakabaja', 'filmeenama', 'filmynama', 'filmyadaalat', 'filmiadalat', 'yogeshchaitanya', 'yogeshmishrra', 'yogeshrajmishra', 'indianfilmsacademyy', 'gapistaan', 'pichchrapaofficial', 'pichchrapa1']) {
  try {
    const j = await api('channels', { part: 'snippet,statistics', forHandle: '@' + h });
    out.handles[h] = (j.items || []).map((c) => ({ id: c.id, title: c.snippet.title, handle: c.snippet.customUrl, videos: c.statistics.videoCount, subs: c.statistics.subscriberCount, created: c.snippet.publishedAt?.slice(0, 10) }));
  } catch (e) { out.handles[h] = String(e.message); }
}
const queries = ['Filmy Adaalat', 'Filmi Adalat', 'फिल्मी अदालत', 'Filmy Adalat Pichchrapa', 'Filmy Adaalat web series Indian Films Academy students', 'Raja Ka Baja Pichchrapa', 'राजा का बाजा', 'Raja Ka Baja Yogesh Chaitanya', 'सड़क का राजा Pichchrapa', 'Pichchrapa'];
for (const q of queries) {
  const all = [];
  try {
    let pageToken = '';
    for (let p = 0; p < 2; p++) {
      const j = await api('search', { part: 'snippet', q, type: 'video', maxResults: 50, pageToken, regionCode: 'IN' });
      all.push(...(j.items || []).map(slim));
      pageToken = j.nextPageToken || '';
      if (!pageToken) break;
    }
  } catch (e) { out.errors.push(`${q}: ${e.message}`); }
  out.searches[q] = all;
}
for (const q of ['Pichchrapa', 'Raja Ka Baja', 'Filmy Adaalat', 'Filmee Nama', 'फिल्मी अदालत']) {
  try {
    const j = await api('search', { part: 'snippet', q, type: 'channel', maxResults: 10 });
    out.channelSearch[q] = (j.items || []).map((c) => ({ id: c.snippet.channelId, title: c.snippet.channelTitle, desc: (c.snippet.description || '').slice(0, 100) }));
  } catch (e) { out.errors.push(`channel ${q}: ${e.message}`); }
}
// which channels do the matches belong to
const byChannel = {};
for (const [q, list] of Object.entries(out.searches)) for (const v of list) {
  const c = (byChannel[v.channelId] ||= { channel: v.channel, hits: 0, queries: new Set() });
  c.hits++; c.queries.add(q);
}
out.byChannel = Object.fromEntries(Object.entries(byChannel).sort((a, b) => b[1].hits - a[1].hits).slice(0, 30).map(([id, c]) => [id, { ...c, queries: [...c.queries] }]));
await writeFile(`${outDir}/result.json`, JSON.stringify(out, null, 1));

// the old site
const UA = 'Mozilla/5.0 (PICHCHRAPA site migration by owner)';
for (const [name, url] of [['home', 'https://pichchrapa.com/'], ['www', 'https://www.pichchrapa.com/'], ['sitemap', 'https://pichchrapa.com/sitemap.xml'], ['robots', 'https://pichchrapa.com/robots.txt']]) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
    const text = await res.text();
    await writeFile(`${outDir}/old-${name}.txt`, `${res.status} ${res.url}\n${text.slice(0, 200000)}`);
  } catch (e) { await writeFile(`${outDir}/old-${name}.txt`, 'ERR ' + e.message); }
}
console.log('done', Object.keys(out.byChannel).length, 'channels');
