// Pulls the academy's latest Instagram posts into data/instagram.json.
// Source: a Behold.so JSON feed (Instagram's own API needs a Meta app; Behold handles that).
// Set "instagramFeed" in content/site.json to the feed URL. Empty = nothing to do.
// Writes only when something changed, and never replaces good data with an empty result.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const dataFile = path.join(root, 'data/instagram.json');

if (!site.instagramFeed) {
  console.log('instagramFeed खाली है, Instagram सिंक छोड़ा।');
  process.exit(0);
}

const res = await fetch(site.instagramFeed);
if (!res.ok) {
  console.error(`Instagram feed ${res.status}`);
  process.exit(1);
}
const j = await res.json();
const posts = (j.posts || []).slice(0, 24).map((p) => {
  const s = p.sizes || {};
  const pick = (k) => s[k]?.mediaUrl || null;
  return {
    id: p.id,
    permalink: p.permalink,
    timestamp: p.timestamp,
    type: p.isReel ? 'reel' : (p.mediaType || '').toLowerCase(),
    caption: (p.prunedCaption || p.caption || '').slice(0, 300),
    img: pick('medium') || pick('small') || p.thumbnailUrl || p.mediaUrl,
    imgLarge: pick('large') || pick('medium') || p.thumbnailUrl || p.mediaUrl,
  };
});

let previous = '';
let previousCount = 0;
try {
  previous = await readFile(dataFile, 'utf8');
  previousCount = JSON.parse(previous).posts?.length || 0;
} catch {}
if (posts.length === 0 && previousCount > 0) {
  console.error('Instagram से 0 पोस्ट आए, पुराना डेटा नहीं छेड़ा।');
  process.exit(1);
}
const next = JSON.stringify({ username: j.username || site.instagramHandle || '', posts }, null, 2) + '\n';
if (next === previous) console.log(`Instagram: कोई बदलाव नहीं (${posts.length})`);
else {
  await writeFile(dataFile, next);
  console.log(`Instagram: ${posts.length} पोस्ट`);
}
