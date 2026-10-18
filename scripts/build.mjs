// Builds the static site into dist/ from content/site.json + data/videos.json.
// No dependencies: run with `node scripts/build.mjs`.
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');

const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const data = JSON.parse(await readFile(path.join(root, 'data/videos.json'), 'utf8'));
const css = (await readFile(path.join(root, 'src/styles.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n+/g, '\n');
const siteUrl = (process.env.SITE_URL || site.siteUrl || '').trim().replace(/\/+$/, '');
const abs = (p) => (siteUrl ? siteUrl + p : '');

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const dateFmt = new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
const hiDate = (iso) => dateFmt.format(new Date(iso));

function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || '');
  if (!m) return 0;
  return (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0);
}
function clock(sec) {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
const minutes = (sec) => `${Math.max(1, Math.round(sec / 60))} मिनट`;

const BRAND = /^(gapistaan|gapistan|गैपिस्तान|गपिस्तान)$/i;
function cleanTitle(title) {
  const parts = title.split('|').map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const kept = parts.filter((p) => !BRAND.test(p));
  return (kept.length ? kept : parts).join(' | ');
}

const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
const TS = /^\s*((?:\d{1,2}:)?\d{1,2}:\d{2})\s*[-–—:]?\s*(.+?)\s*$/;
const toSec = (t) => t.split(':').map(Number).reduce((a, n) => a * 60 + n, 0);

// Lines that are credits, hashtags or the repeated title: kept on the page, skipped for summaries.
const BOILER = /^(created\s+by|cast\s*[:—-]|edit\s*&|production\s*:|gapistaan\s*\|\s*गैपिस्तान\s*—|#|🎭|🔔|📅|💬|👇|👍|📲|डिस्क्लेमर)/i;

function parseDescription(v) {
  const lines = (v.description || '').split(/\r?\n/);
  const chapters = [];
  const body = [];
  for (const line of lines) {
    const m = TS.exec(line);
    if (m) chapters.push({ t: toSec(m[1]), label: m[2] });
    else body.push(line);
  }
  while (body.length && !body[0].trim()) body.shift();
  if (body.length && norm(body[0]) === norm(v.title)) body.shift();
  const paragraphs = body.join('\n').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const validChapters = chapters.length >= 2 && chapters[0].t === 0 ? chapters : [];
  return { paragraphs, chapters: validChapters };
}

function summary(v, paragraphs, max = 155) {
  const candidates = paragraphs
    .map((p) => p.split('\n').filter((l) => !BOILER.test(l.trim())).join(' ').trim())
    .filter((p) => p.length >= 40 && !/^[\x00-\x7F]+$/.test(p)); // prefer Hindi prose over the Hinglish/English blocks
  let text = candidates[0] || `गैपिस्तान का एपिसोड "${cleanTitle(v.title)}"। चाचा बनाम Gen Z की improvised हिंदी कॉमेडी।`;
  text = text.replace(/\s+/g, ' ');
  if (text.length > max) text = text.slice(0, max).replace(/\s+\S*$/, '') + '…';
  return text;
}

function linkify(escaped) {
  return escaped.replace(/https?:\/\/[^\s<]+/g, (u) => `<a href="${u}" rel="nofollow noopener" target="_blank">${u}</a>`);
}
const renderParagraphs = (paras) => paras.map((p) => `<p>${linkify(esc(p)).replace(/\n/g, '<br>')}</p>`).join('\n');

function thumb(v, size) {
  const t = v.thumbs || {};
  return t[size] || t.standard || t.high || t.medium || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
}
function srcset(v) {
  const t = v.thumbs || {};
  return [[t.medium, 320], [t.high, 480], [t.standard, 640], [t.maxres, 1280]]
    .filter(([u]) => u)
    .map(([u, w]) => `${u} ${w}w`)
    .join(', ');
}

// Optional hand-written text per episode: content/episodes/<videoId>.md (plain paragraphs).
async function customText(id) {
  const f = path.join(root, 'content/episodes', `${id}.md`);
  if (!existsSync(f)) return [];
  return (await readFile(f, 'utf8')).split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p && !p.startsWith('<!--'));
}

// ---------- data ----------
const all = [...(data.videos || [])].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
const episodes = all.filter((v) => !v.isShort).map((v, i) => ({ ...v, n: i + 1 }));
const shorts = all.filter((v) => v.isShort).reverse();
const newestFirst = [...episodes].reverse();
for (const ep of episodes) {
  ep.sec = seconds(ep.duration);
  ep.clean = cleanTitle(ep.title);
  ep.path = `/video/${ep.id}/`;
  Object.assign(ep, parseDescription(ep));
  ep.summary = summary(ep, ep.paragraphs);
  ep.custom = await customText(ep.id);
}

// ---------- layout ----------
function layout({ title, description, pathName, image, type = 'website', ld = [], body, preloadImage }) {
  const url = abs(pathName);
  return `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${url ? `<link rel="canonical" href="${esc(url)}">` : ''}
<meta name="theme-color" content="#170705">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/img/favicon-64.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/mukta-devanagari-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${preloadImage ? `<link rel="preload" as="image" href="${esc(preloadImage)}">` : ''}
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:locale" content="hi_IN">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${url ? `<meta property="og:url" content="${esc(url)}">` : ''}
${image ? `<meta property="og:image" content="${esc(image)}">\n<meta name="twitter:image" content="${esc(image)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<style>${css}</style>
${ld.map(jsonLd).join('\n')}
</head>
<body>
<a class="skip" href="#main">सीधे मुख्य हिस्से पर जाएँ</a>
<div class="filmstrip" aria-hidden="true"></div>
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="/"><img src="/img/logo-96.webp" alt="" width="48" height="48"><span>Gapistaan</span></a>
    <nav class="topnav" aria-label="मुख्य मेन्यू"><a href="/#episodes">एपिसोड</a><a href="/#about">कलाकार</a></nav>
    <a class="btn btn-primary" href="${esc(site.subscribeUrl)}">सब्सक्राइब करें</a>
  </div>
</header>
${body}
<footer class="foot">
  <div class="filmstrip" aria-hidden="true"></div>
  <div class="wrap foot-in">
    <p>© ${new Date().getFullYear()} ${esc(site.production)}. गैपिस्तान एक ${esc(site.production)} प्रोडक्शन है।</p>
    <ul>
      <li><a href="${esc(site.channelUrl)}">YouTube</a></li>
      <li><a href="${esc(site.instagramUrl)}">Instagram</a></li>
    </ul>
  </div>
</footer>
${PAGE_JS}
</body>
</html>
`;
}

const epLabel = (n) => `EP ${String(n).padStart(2, '0')}`;

// WhatsApp: YouTube link first, so the chat shows the YouTube preview and a tap opens the YouTube app.
const shareMessage = (ep) =>
  `${ep.clean}\n\nगैपिस्तान पर देखिए: https://youtu.be/${ep.id}` + (siteUrl ? `\nसारे एपिसोड: ${siteUrl}` : '');
const waLink = (ep) => `https://wa.me/?text=${encodeURIComponent(shareMessage(ep))}`;

function shareButtons(ep, { pageLink = false } = {}) {
  return `<div class="actions">
        <a class="btn btn-primary" href="https://www.youtube.com/watch?v=${ep.id}">YouTube पर देखें</a>
        <a class="btn btn-wa" href="${waLink(ep)}">WhatsApp पर भेजें</a>
        <button class="btn btn-ghost js-share" type="button" hidden data-title="${esc(ep.clean)}" data-text="${esc(shareMessage(ep))}" data-url="https://youtu.be/${ep.id}">और जगह शेयर करें</button>
        ${pageLink ? `<a class="btn btn-ghost" href="${ep.path}">पूरा एपिसोड पेज</a>` : ''}
      </div>`;
}

// Shared behaviour: click-to-play thumbnails and the phone's own share sheet.
const PAGE_JS = `<script>
(function(){
  document.querySelectorAll('.js-play').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      var f=document.createElement('iframe');
      f.src='https://www.youtube.com/embed/'+a.getAttribute('data-id')+'?autoplay=1&rel=0&playsinline=1';
      f.title=a.getAttribute('data-title')||'YouTube';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen=true;
      f.className='inline-player';
      a.replaceWith(f);
    });
  });
  if(navigator.share){
    document.querySelectorAll('.js-share').forEach(function(b){
      b.hidden=false;
      b.addEventListener('click',function(){ navigator.share({title:b.dataset.title,text:b.dataset.text}).catch(function(){}); });
    });
  }
})();
</script>`;

function card(ep, { eager = false } = {}) {
  return `<li><a class="ep" href="${ep.path}">
  <span class="thumb"><img src="${esc(thumb(ep, 'standard'))}" srcset="${esc(srcset(ep))}" sizes="(min-width: 72rem) 22rem, (min-width: 40rem) 45vw, 92vw" alt="" width="640" height="360" ${eager ? '' : 'loading="lazy" '}decoding="async"><span class="dur">${clock(ep.sec)}</span></span>
  <span class="plate">${epLabel(ep.n)}</span>
  <span class="ep-title">${esc(ep.clean)}</span>
  <span class="date">${hiDate(ep.publishedAt)}</span>
</a></li>`;
}

// ---------- home ----------
function homePage() {
  const latest = newestFirst[0];

  const marquee = latest
    ? `<div class="marquee">
        <div class="marquee-frame">
          <span class="ribbon">NEW EPISODE</span>
          <a class="js-play play" href="${latest.path}" data-id="${latest.id}" data-title="${esc(latest.clean)}" aria-label="एपिसोड यहीं चलाएँ: ${esc(latest.clean)}">
            <img src="${esc(thumb(latest, 'maxres'))}" srcset="${esc(srcset(latest))}" sizes="(min-width: 64rem) 40rem, 92vw" alt="" width="1280" height="720" fetchpriority="high">
            <span class="play-btn" aria-hidden="true"></span>
            <span class="dur">${clock(latest.sec)}</span>
          </a>
        </div>
        <div class="marquee-cap">
          <span class="plate">${epLabel(latest.n)}</span>
          <a class="marquee-title" href="${latest.path}">${esc(latest.clean)}</a>
          <span class="date">${hiDate(latest.publishedAt)}, ${minutes(latest.sec)}</span>
        </div>
        ${shareButtons(latest)}
      </div>`
    : '';

  const older = newestFirst.slice(1);
  const listHtml = older.length
    ? `<section class="sec wrap" id="episodes" aria-labelledby="eps-h">
  <h2 class="h2" id="eps-h">पिछले एपिसोड</h2>
  <p class="count">अब तक कुल ${newestFirst.length} एपिसोड</p>
  <ul class="grid">
${older.map((ep) => card(ep)).join('\n')}
  </ul>
</section>`
    : `<section class="sec wrap" id="episodes"><h2 class="h2">और एपिसोड जल्द आ रहे हैं</h2><p>नए एपिसोड के लिए <a href="${esc(site.subscribeUrl)}">YouTube पर सब्सक्राइब करें</a>।</p></section>`;

  const shortsHtml = shorts.length
    ? `<section class="sec wrap" aria-labelledby="shorts-h">
  <h2 class="h2" id="shorts-h">Shorts</h2>
  <ul class="grid">
${shorts.slice(0, 8).map((s) => `<li><a class="ep" href="https://www.youtube.com/shorts/${s.id}"><span class="thumb"><img src="${esc(thumb(s, 'high'))}" alt="" width="480" height="360" loading="lazy" decoding="async"></span><span class="ep-title">${esc(cleanTitle(s.title))}</span></a></li>`).join('\n')}
  </ul>
</section>`
    : '';

  const castHtml = site.cast
    .map((c) => `<li><span class="naam">${esc(c.name)}</span>${c.role ? `<span class="role">${esc(c.role)}</span>` : ''}<span class="naam-en" lang="en">${esc(c.nameEn)}</span></li>`)
    .join('\n');

  const boards = (site.brands || [])
    .map((b) => {
      const inner = `${b.logo ? `<img src="${esc(b.logo)}" alt="" height="56" loading="lazy">` : ''}<span class="board-naam">${esc(b.name)}</span><span class="board-kaam">${esc(b.label)}</span>`;
      return `<li>${b.url ? `<a class="board" href="${esc(b.url)}">${inner}</a>` : `<div class="board">${inner}</div>`}</li>`;
    })
    .join('\n');

  const body = `<main id="main">
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-brand">
      <img class="hero-logo" src="/img/logo-520.webp" alt="Gapistaan का लोगो: चाचा" width="200" height="200">
      <h1 class="hero-name"><span class="latin">Gapistaan</span><span class="hi">गैपिस्तान</span></h1>
      <p class="hero-line">${esc(site.heroLine)}</p>
      <p class="hero-sub">${esc(site.heroSub)}</p>
      <p class="schedule">${esc(site.schedule)}</p>
    </div>
    ${marquee}
  </div>
</section>
${listHtml}
${shortsHtml}
<section class="sec about" id="about" aria-labelledby="about-h">
  <div class="wrap about-in">
    <div>
      <img class="gengap" src="/img/gengap-440.webp" srcset="/img/gengap-440.webp 440w, /img/gengap-880.webp 880w" sizes="(min-width: 30rem) 440px, 92vw" alt="Gen Gap" width="440" height="148" loading="lazy">
      <h2 class="h2" id="about-h">गैपिस्तान क्या है?</h2>
      ${site.about.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      ${site.aboutEn ? `<p class="about-en" lang="en">${esc(site.aboutEn)}</p>` : ''}
      <h3 class="cast-h">कलाकार</h3>
      <ul class="cast">
${castHtml}
      </ul>
    </div>
    <img class="chacha" src="/img/chacha-560.webp" srcset="/img/chacha-560.webp 560w, /img/chacha-1040.webp 1040w" sizes="(min-width: 56rem) 520px, 92vw" alt="चाचा, हाथ में चार्जर का प्लग और केबल लिए" width="520" height="520" loading="lazy">
  </div>
</section>
${boards ? `<section class="sec wrap" aria-labelledby="brands-h">
  <h2 class="h2" id="brands-h">हमारे दूसरे ब्रांड</h2>
  <ul class="boards">
${boards}
  </ul>
</section>` : ''}
</main>`;

  const sameAs = [site.channelUrl, site.instagramUrl].filter(Boolean);
  const ld = siteUrl
    ? [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: site.siteName, alternateName: ['Gapistaan', 'गैपिस्तान'], url: abs('/'), inLanguage: 'hi' },
        { '@context': 'https://schema.org', '@type': 'Organization', name: 'Gapistaan', alternateName: 'गैपिस्तान', url: abs('/'), logo: abs('/img/logo-520.webp'), sameAs },
      ]
    : [];

  return layout({
    title: site.homeTitle,
    description: site.homeDescription,
    pathName: '/',
    image: siteUrl ? abs('/img/og-home.jpg') : latest ? thumb(latest, 'maxres') : null,
    ld,
    body,
    preloadImage: latest ? thumb(latest, 'maxres') : null,
  });
}

// ---------- episode ----------
function episodePage(ep) {
  const idx = episodes.indexOf(ep);
  const prev = episodes[idx - 1];
  const next = episodes[idx + 1];
  const pageUrl = abs(ep.path);
  const watchUrl = `https://www.youtube.com/watch?v=${ep.id}`;
  const embed = `https://www.youtube.com/embed/${ep.id}?rel=0`;
  const more = newestFirst.filter((e) => e !== ep).slice(0, 3);

  const chaptersHtml = ep.chapters.length
    ? `<section class="block" aria-labelledby="ch-h">
  <h2 class="h2" id="ch-h">इस एपिसोड के हिस्से</h2>
  <ol class="chapters">
${ep.chapters.map((c) => `<li><a href="${watchUrl}&amp;t=${c.t}s" data-t="${c.t}"><span class="t">${clock(c.t)}</span><span>${esc(c.label)}</span></a></li>`).join('\n')}
  </ol>
</section>`
    : '';

  const customHtml = ep.custom.length
    ? `<section class="block prose" aria-labelledby="note-h"><h2 class="h2" id="note-h">इस एपिसोड में क्या है</h2>${renderParagraphs(ep.custom)}</section>`
    : '';

  const descHtml = ep.paragraphs.length
    ? `<section class="block prose" aria-labelledby="desc-h"><h2 class="h2" id="desc-h">एपिसोड के बारे में</h2>${renderParagraphs(ep.paragraphs)}</section>`
    : '';

  const prevNext = prev || next
    ? `<nav class="prevnext" aria-label="पिछला और अगला एपिसोड">
  ${prev ? `<a class="pn" href="${prev.path}"><span class="pn-k">पिछला एपिसोड</span><span class="pn-t">${esc(prev.clean)}</span></a>` : ''}
  ${next ? `<a class="pn pn-next" href="${next.path}"><span class="pn-k">अगला एपिसोड</span><span class="pn-t">${esc(next.clean)}</span></a>` : ''}
</nav>`
    : '';

  const body = `<main id="main" class="wrap episode">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / <a href="/#episodes">एपिसोड</a> / एपिसोड ${ep.n}</nav>
<h1 class="ep-h1">${esc(ep.clean)}</h1>
<p class="meta"><span class="plate">${epLabel(ep.n)}</span><span>${hiDate(ep.publishedAt)}</span><span>${minutes(ep.sec)}</span></p>
<div class="player"><iframe id="player" src="${embed}" data-src="${embed}" title="${esc(ep.clean)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
${shareButtons(ep)}
${customHtml}
${chaptersHtml}
${descHtml}
${prevNext}
${more.length ? `<section class="block" aria-labelledby="more-h"><h2 class="h2" id="more-h">और एपिसोड</h2><ul class="grid">${more.map((e) => card(e)).join('\n')}</ul></section>` : ''}
</main>
<script>
(function(){
  var f=document.getElementById('player'); if(!f) return;
  var base=f.getAttribute('data-src');
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(t,play){ f.src=base+'&start='+t+(play?'&autoplay=1':''); }
  document.querySelectorAll('[data-t]').forEach(function(a){
    a.addEventListener('click',function(e){ e.preventDefault(); go(a.getAttribute('data-t'),true); f.scrollIntoView({behavior:calm?'auto':'smooth',block:'center'}); });
  });
  var t=new URLSearchParams(location.search).get('t');
  if(t && /^\\d+$/.test(t)) go(t,false);
})();
</script>`;

  const video = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: ep.clean,
    description: ep.summary,
    thumbnailUrl: [thumb(ep, 'maxres'), thumb(ep, 'high')].filter((u, i, a) => a.indexOf(u) === i),
    uploadDate: ep.publishedAt,
    duration: ep.duration,
    embedUrl: `https://www.youtube.com/embed/${ep.id}`,
    inLanguage: 'hi',
    partOfSeries: { '@type': 'CreativeWorkSeries', name: 'Gapistaan | गैपिस्तान' },
    ...(ep.tags?.length ? { keywords: ep.tags.slice(0, 15).join(', ') } : {}),
  };
  if (pageUrl && ep.chapters.length) {
    video.hasPart = ep.chapters.map((c, i) => ({
      '@type': 'Clip',
      name: c.label,
      startOffset: c.t,
      endOffset: ep.chapters[i + 1] ? ep.chapters[i + 1].t : ep.sec,
      url: `${pageUrl}?t=${c.t}`,
    }));
  }
  const ld = [video];
  if (siteUrl) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'गैपिस्तान', item: abs('/') },
        { '@type': 'ListItem', position: 2, name: ep.clean, item: pageUrl },
      ],
    });
  }

  return layout({
    title: `${ep.clean} | गैपिस्तान एपिसोड ${ep.n}`,
    description: ep.summary,
    pathName: ep.path,
    image: thumb(ep, 'maxres'),
    type: 'video.episode',
    ld,
    body,
  });
}

function notFoundPage() {
  return layout({
    title: 'यह पन्ना नहीं मिला | गैपिस्तान',
    description: 'यह पन्ना गैपिस्तान की साइट पर नहीं है।',
    pathName: '/404',
    body: `<main id="main" class="wrap lost"><img src="/img/logo-520.webp" alt="" width="180" height="180"><h1 class="ep-h1">यह पन्ना यहाँ नहीं है</h1><p>हो सकता है लिंक पुराना हो। सारे एपिसोड होम पेज पर हैं।</p><p><a class="btn btn-primary" href="/">होम पेज पर जाएँ</a></p></main>`,
  });
}

// ---------- write ----------
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
if (existsSync(path.join(root, 'public'))) await cp(path.join(root, 'public'), out, { recursive: true });

await writeFile(path.join(out, 'index.html'), homePage());
for (const ep of episodes) {
  await mkdir(path.join(out, 'video', ep.id), { recursive: true });
  await writeFile(path.join(out, 'video', ep.id, 'index.html'), episodePage(ep));
}
await writeFile(path.join(out, '404.html'), notFoundPage());

if (siteUrl) {
  const urls = [
    { loc: abs('/'), lastmod: newestFirst[0]?.publishedAt },
    ...episodes.map((ep) => ({ loc: abs(ep.path), lastmod: ep.publishedAt })),
  ];
  await writeFile(
    path.join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`)
      .join('\n')}\n</urlset>\n`,
  );
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
} else {
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n`);
  console.warn('siteUrl खाली है: canonical, sitemap और Clip markup domain जुड़ने के बाद बनेंगे।');
}

const files = await readdir(out, { recursive: true });
console.log(`dist/ तैयार: ${episodes.length} एपिसोड पेज, ${files.length} फ़ाइलें`);
