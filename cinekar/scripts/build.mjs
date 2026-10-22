// Builds the static Cinekar site into cinekar/dist from content/site.json and data/videos.json.
// Node 18+, no packages. Run from anywhere: node cinekar/scripts/build.mjs
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const data = JSON.parse(await readFile(path.join(root, 'data/videos.json'), 'utf8'));
const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');

const videos = (data.videos || []).slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const vlogs = videos.filter((v) => !v.isShort);
const shorts = videos.filter((v) => v.isShort);
const BUILD = new Date().toISOString();

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const attr = esc;
const abs = (p) => site.siteUrl + p;
const thumb = (v, size = 'high') => v.thumbs?.[size] || v.thumbs?.high || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
const videoPath = (v) => `/video/${v.id}/`;
const ytWatch = (v) => (v.isShort ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`);

const MONTHS = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
function dateHi(iso) {
  const d = new Date(iso);
  const ist = new Date(d.getTime() + 5.5 * 3600 * 1000);
  return `${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]} ${ist.getUTCFullYear()}`;
}
function parseDuration(iso) {
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(iso || '') || [];
  return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
}
function durationLabel(iso) {
  const s = parseDuration(iso);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${m}:${String(sec).padStart(2, '0')}`;
}
function tsToSeconds(ts) {
  const p = ts.split(':').map(Number);
  return p.reduce((a, b) => a * 60 + b, 0);
}

// Description → HTML: paragraphs, links, hashtags, and "0:45 label" lines become seek links.
function descriptionHtml(v) {
  const text = String(v.description || '').replace(/\r/g, '');
  const lines = text.split('\n');
  const out = [];
  let para = [];
  const flush = () => {
    if (para.length) out.push(`<p>${para.join('<br>')}</p>`);
    para = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^[━─]{6,}$/.test(line)) { flush(); out.push('<hr>'); continue; }
    const chap = /^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/.exec(line);
    if (chap) {
      const sec = tsToSeconds(chap[1]);
      para.push(`<a class="chap" href="${attr(ytWatch(v))}&t=${sec}s" target="_blank" rel="noopener" data-t="${sec}"><span class="chap-t">${esc(chap[1])}</span> ${esc(chap[2])}</a>`);
      continue;
    }
    let html = esc(line);
    html = html.replace(/(https?:\/\/[^\s<]+)/g, (u) => {
      const clean = u.replace(/[),.]+$/, '');
      const tail = u.slice(clean.length);
      const label = clean.replace(/^https?:\/\/(www\.)?/, '');
      return `<a href="${attr(clean)}" target="_blank" rel="noopener">${esc(label)}</a>${esc(tail)}`;
    });
    html = html.replace(/(^|\s)#([\p{L}\p{N}_]+)/gu, (m, sp, tag) => `${sp}<a class="tag" href="https://www.youtube.com/hashtag/${encodeURIComponent(tag.toLowerCase())}" target="_blank" rel="noopener">#${esc(tag)}</a>`);
    para.push(html);
  }
  flush();
  return out.join('\n');
}
function shortDescription(v, n = 160) {
  const first = String(v.description || '').split('\n').map((s) => s.trim()).find((s) => s && !/^[━─]{6,}$/.test(s)) || v.title;
  const t = first.replace(/\s+/g, ' ');
  return t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : t;
}

// ---------- layout ----------
const NAV = [
  ['/', 'होम'],
  ['/vlogs/', 'Vlogs'],
  ['/shorts/', 'Shorts'],
  ['/about/', 'Yogesh Chaitanya'],
  ['/contact/', 'संपर्क'],
];
function page({ title, description, pathName, body, jsonld = [], image, type = 'website', extraHead = '' }) {
  const url = abs(pathName);
  const og = image || abs('/img/og-home.jpg');
  const ld = jsonld.length ? `<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : jsonld)}</script>` : '';
  const analytics = site.cfAnalyticsToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${site.cfAnalyticsToken}"}'></script>` : '';
  return `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${attr(url)}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Cinekar">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${attr(url)}">
<meta property="og:image" content="${attr(og)}">
<meta property="og:locale" content="hi_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0d0b0b">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/img/icon-180.png">
<link rel="alternate" type="application/rss+xml" title="Cinekar Vlogs" href="/feed.xml">
<link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
${extraHead}
${ld}
</head>
<body>
<a class="skip" href="#main">मुख्य हिस्से पर जाएँ</a>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="/" aria-label="Cinekar होम">
      <img class="brand-mark" src="/img/logo-96.webp" alt="" width="40" height="40">
      <span class="brand-text">CINEKAR<small>by Yogesh Chaitanya</small></span>
    </a>
    <nav class="nav" aria-label="मुख्य">
      ${NAV.map(([p, l]) => `<a href="${p}"${p === pathName || (p !== '/' && pathName.startsWith(p)) ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
      <a class="btn btn-yt" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ Subscribe</a>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <img src="/img/logo-96.webp" alt="Cinekar Vlogs" width="72" height="72" loading="lazy" style="margin-bottom:10px"><p class="foot-brand">CINEKAR</p>
      <p class="muted">Yogesh Chaitanya — Film Director, Acting Guru, Founder of Indian Films Academy, Lucknow. रोज़ की ज़िंदगी, बिना फ़िल्टर।</p>
      <p class="muted small">© ${new Date().getFullYear()} Yogesh Chaitanya · PICHCHRAPA, Lucknow</p>
    </div>
    <div>
      <p class="foot-h">YouTube चैनल</p>
      ${site.channels.map(([n, u]) => `<a class="foot-link" href="${attr(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join('')}
    </div>
    <div>
      <p class="foot-h">जुड़िए</p>
      <a class="foot-link" href="${attr(site.instagramUrl)}" target="_blank" rel="noopener">Instagram</a>
      <a class="foot-link" href="${attr(site.facebookUrl)}" target="_blank" rel="noopener">Facebook</a>
      <a class="foot-link" href="${attr(site.imdbUrl)}" target="_blank" rel="noopener">IMDb</a>
      <a class="foot-link" href="mailto:${attr(site.email)}">${esc(site.email)}</a>
      <a class="foot-link" href="/privacy/">Privacy</a>
    </div>
    <div>
      <p class="foot-h">मेरी दुनिया</p>
      ${site.brands.map((b) => `<a class="foot-link" href="${attr(b.url)}" target="_blank" rel="noopener">${esc(b.name)}</a>`).join('')}
    </div>
  </div>
</footer>
<script>
// Lite YouTube embed: the iframe loads only after a click, so pages stay fast.
document.addEventListener('click', function (e) {
  var p = e.target.closest('.player[data-id]');
  if (!p) return;
  e.preventDefault();
  var id = p.getAttribute('data-id');
  var ifr = document.createElement('iframe');
  ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
  ifr.title = p.getAttribute('data-title') || 'YouTube video';
  ifr.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  ifr.allowFullscreen = true;
  p.innerHTML = '';
  p.appendChild(ifr);
  p.classList.add('is-playing');
});
</script>
${analytics}
</body>
</html>
`;
}

function card(v, { big = false, lazy = true } = {}) {
  const dur = durationLabel(v.duration);
  return `<a class="card${v.isShort ? ' card-short' : ''}${big ? ' card-big' : ''}" href="${videoPath(v)}">
  <span class="card-img"><img src="${attr(thumb(v, big ? 'maxres' : 'high'))}" alt="" width="${v.isShort ? 480 : 480}" height="${v.isShort ? 854 : 360}"${lazy ? ' loading="lazy"' : ''} decoding="async"><span class="dur">${dur}</span></span>
  <span class="card-body"><span class="card-title">${esc(v.title)}</span><span class="card-meta">${dateHi(v.publishedAt)}</span></span>
</a>`;
}
function player(v, { eager = false } = {}) {
  return `<div class="player${v.isShort ? ' player-short' : ''}" data-id="${attr(v.id)}" data-title="${attr(v.title)}" role="button" tabindex="0" aria-label="चलाएँ: ${attr(v.title)}">
  <img src="${attr(thumb(v, 'maxres'))}" alt="${attr(v.title)}" width="1280" height="720"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">
  <span class="play" aria-hidden="true"><svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.4 0 34 0 34 0S12.6 0 7.4 1.7c-2.9.8-5.1 3.1-5.9 6C0 13 0 24 0 24s0 11 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.6 48 34 48 34 48s21.4 0 26.6-1.7c2.9-.8 5.1-3.1 5.9-6C68 35 68 24 68 24s0-11-1.5-16.3z" fill="#f00"/><path d="M45 24 27 14v20" fill="#fff"/></svg></span>
</div>`;
}

const sectionHead = (eyebrow, title, more) => `<div class="sec-head"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${more ? `<a class="more" href="${more[0]}">${more[1]} →</a>` : ''}</div>`;

// ---------- pages ----------
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yogesh Chaitanya',
  alternateName: ['Yogesh Mishrra', 'Yogesh Raj Mishra'],
  url: site.siteUrl,
  image: abs('/img/yogesh-cut.webp'),
  jobTitle: 'Film Director, Acting Coach',
  worksFor: { '@type': 'Organization', name: 'Indian Films Academy', url: 'https://indianfilmsacademy.com' },
  address: { '@type': 'PostalAddress', addressLocality: 'Lucknow', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  sameAs: [site.channelUrl, site.instagramUrl, site.facebookUrl, site.imdbUrl, 'https://indianfilmsacademy.com', 'https://pichchrapa.com', 'https://gapistaan.com'],
};
const siteLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Cinekar', url: site.siteUrl, inLanguage: 'hi' };

function ventureCards() {
  return `<div class="ventures">${site.brands.map((b) => `<a class="venture" href="${attr(b.url)}" target="_blank" rel="noopener">
    <img class="venture-bg" src="${attr(b.bg)}" alt="" loading="lazy" decoding="async">
    <span class="venture-shade"></span>
    <span class="venture-in">
      ${b.img ? `<img class="venture-logo" src="${attr(b.img)}" alt="" width="64" height="64" loading="lazy">` : ''}
      <small>${esc(b.tag)}</small>
      <b>${esc(b.name)}</b>
      <span class="venture-txt">${esc(b.text)}</span>
      <span class="venture-go">देखें →</span>
    </span>
  </a>`).join('')}</div>`;
}
const marquee = () => `<div class="marquee" aria-hidden="true"><div class="marquee-track">${[...site.credits, ...site.credits].map((c) => `<span>${esc(c)}</span><i>✦</i>`).join('')}</div></div>`;
const statsRow = () => `<div class="stats">${site.stats.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>`;

function homePage() {
  const latest = vlogs[0];
  const h = site.hero;
  const body = `
<section class="hero">
  <img class="hero-bg" src="/img/hero-bg.webp" alt="" fetchpriority="high">
  <div class="hero-grain"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker"><span class="dot"></span> Film Director · Acting Guru · Lucknow</p>
      <h1 class="hero-name">YOGESH<br><span>CHAITANYA</span></h1>
      <p class="hero-tag">${esc(h.line1)} <em>${esc(h.line2)}</em></p>
      <p class="hero-lead">Acting school के अंदर की असली ज़िंदगी, शूटिंग का सच और Raja Ka Baja के कलाकार — रोज़ एक नया vlog।</p>
      <div class="cta-row">
        <a class="btn btn-yt btn-lg" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ YouTube पर Subscribe</a>
        <a class="btn btn-line btn-lg" href="${latest ? videoPath(latest) : '/vlogs/'}">आज का vlog देखें</a>
      </div>
    </div>
    <div class="hero-art">
      <div class="hero-ring"></div>
      <img class="hero-cut" src="/img/yogesh-cut.webp" alt="Yogesh Chaitanya" width="512" height="608" fetchpriority="high">
      <img class="hero-badge" src="/img/logo-200.webp" alt="Cinekar Vlogs" width="150" height="150">
    </div>
  </div>
  <div class="wrap">${statsRow()}</div>
</section>
${marquee()}

${latest ? `<section class="sec feature">
  <div class="wrap feature-grid">
    <div>${player(latest)}</div>
    <div class="feature-copy">
      <p class="eyebrow">ताज़ा vlog · ${dateHi(latest.publishedAt)}</p>
      <h2 class="feature-title"><a href="${videoPath(latest)}">${esc(latest.title)}</a></h2>
      <p class="muted">${esc(shortDescription(latest, 220))}</p>
      <div class="cta-row"><a class="btn btn-yt" href="${attr(ytWatch(latest))}" target="_blank" rel="noopener">YouTube पर देखें</a><a class="btn btn-line" href="${videoPath(latest)}">पूरा विवरण</a></div>
    </div>
  </div>
</section>` : ''}

<section class="sec">
  <div class="wrap">
    ${sectionHead('Daily Vlogs', 'हर दिन, एक नई कहानी', ['/vlogs/', `सारे ${vlogs.length} vlogs`])}
    <div class="grid">${vlogs.slice(1, 9).map((v) => card(v)).join('')}</div>
  </div>
</section>

${shorts.length ? `<section class="sec sec-dark">
  <div class="wrap">
    ${sectionHead('Shorts', 'एक मिनट की मस्ती', ['/shorts/', 'सारे shorts'])}
    <div class="strip">${shorts.slice(0, 10).map((v) => card(v)).join('')}</div>
  </div>
</section>` : ''}

<section class="sec about-band">
  <div class="wrap about-split">
    <figure class="frame"><img src="/img/edit-suite.webp" alt="Yogesh Chaitanya edit suite में" loading="lazy" decoding="async"><figcaption>Edit suite — जहाँ हर vlog कटता है</figcaption></figure>
    <div>
      <p class="eyebrow">कैमरे के पीछे का आदमी</p>
      <h2 class="big-h">20 साल से सिनेमा।<br><span>अब रोज़ आपके साथ।</span></h2>
      <p class="muted">${esc(site.about.paras[1])} ${esc(site.about.paras[2])}</p>
      <ul class="creds">
        <li><b>निर्देशन</b><span>दबंग सरकार · विद्यापीठ</span></li>
        <li><b>पोस्ट-प्रोडक्शन</b><span>15+ फ़ीचर फ़िल्में · Editor · DI Colorist</span></li>
        <li><b>Founder</b><span>Indian Films Academy, Lucknow (2019)</span></li>
        <li><b>पद्धति</b><span>Yogesh CineAct</span></li>
      </ul>
      <a class="btn btn-line" href="/about/">पूरी कहानी →</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    ${sectionHead('मेरी दुनिया', 'एक आदमी, चार मोर्चे')}
    ${ventureCards()}
  </div>
</section>

<section class="sec sec-dark">
  <div class="wrap">
    ${sectionHead('Behind The Scenes', 'ये है असली Cinekar परिवार')}
    <div class="gallery">${site.gallery.map(([src, cap], i) => `<figure class="g${i}"><img src="${attr(src)}" alt="${attr(cap)}" loading="lazy" decoding="async"><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div>
  </div>
</section>

<section class="collab">
  <div class="wrap collab-in">
    <div>
      <p class="eyebrow">Brand Collab · Shoot · Admission</p>
      <h2 class="big-h">साथ काम करना है?</h2>
      <p class="muted">Brand integration, फ़िल्म/ad shoot, या Indian Films Academy में admission — सीधे बात कीजिए।</p>
    </div>
    <div class="collab-btns">
      <a class="btn btn-yt btn-lg" href="https://wa.me/${attr(site.whatsapp)}?text=${encodeURIComponent('नमस्ते Yogesh जी, cinekar.com से संपर्क कर रहा हूँ।')}" target="_blank" rel="noopener">WhatsApp करें</a>
      <a class="btn btn-line btn-lg" href="mailto:${attr(site.email)}">Email करें</a>
    </div>
  </div>
</section>`;
  return page({ title: site.homeTitle, description: site.homeDescription, pathName: '/', body, jsonld: [siteLd, orgLd] });
}

function listPage({ pathName, title, h1, eyebrow, lead, items, description }) {
  const body = `<section class="sec sec-first"><div class="wrap">
  <p class="eyebrow">${eyebrow}</p><h1>${h1}</h1><p class="lead">${esc(lead)}</p>
  <div class="grid${items[0]?.isShort ? ' grid-shorts' : ''}">${items.map((v) => card(v)).join('')}</div>
</div></section>`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: h1,
    itemListElement: items.slice(0, 50).map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(videoPath(v)), name: v.title })),
  };
  return page({ title, description, pathName, body, jsonld: [ld] });
}

function videoPage(v, i, list) {
  const prev = list[i + 1]; // older
  const next = list[i - 1]; // newer
  const related = list.filter((x) => x.id !== v.id).slice(Math.max(0, i - 3), Math.max(0, i - 3) + 6);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: shortDescription(v, 300),
    thumbnailUrl: [thumb(v, 'maxres'), thumb(v, 'high')],
    uploadDate: v.publishedAt,
    duration: v.duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: ytWatch(v),
    url: abs(videoPath(v)),
    inLanguage: 'hi',
    author: { '@type': 'Person', name: 'Yogesh Chaitanya', url: site.siteUrl },
    publisher: { '@type': 'Organization', name: 'Cinekar Vlogs', url: site.siteUrl, logo: { '@type': 'ImageObject', url: abs('/img/icon-512.png') } },
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Cinekar', item: site.siteUrl },
      { '@type': 'ListItem', position: 2, name: v.isShort ? 'Shorts' : 'Vlogs', item: abs(v.isShort ? '/shorts/' : '/vlogs/') },
      { '@type': 'ListItem', position: 3, name: v.title, item: abs(videoPath(v)) },
    ],
  };
  const share = encodeURIComponent(`${v.title}\n${abs(videoPath(v))}`);
  const body = `<article class="watch">
  <div class="wrap">
    <nav class="crumbs" aria-label="रास्ता"><a href="/">होम</a> › <a href="${v.isShort ? '/shorts/' : '/vlogs/'}">${v.isShort ? 'Shorts' : 'Vlogs'}</a></nav>
    <div class="watch-grid${v.isShort ? ' watch-short' : ''}">
      <div class="watch-main">
        ${player(v, { eager: true })}
        <h1>${esc(v.title)}</h1>
        <p class="watch-meta"><time datetime="${attr(v.publishedAt)}">${dateHi(v.publishedAt)}</time> · ${durationLabel(v.duration)} · <a href="${attr(ytWatch(v))}" target="_blank" rel="noopener">YouTube पर देखें</a></p>
        <div class="actions">
          <a class="btn btn-yt" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ Subscribe</a>
          <a class="btn btn-ghost" href="https://wa.me/?text=${share}" target="_blank" rel="noopener">WhatsApp पर भेजें</a>
          <a class="btn btn-ghost" href="${attr(ytWatch(v))}" target="_blank" rel="noopener">Like &amp; Comment</a>
        </div>
        <div class="desc">${descriptionHtml(v)}</div>
        <nav class="pager">
          ${next ? `<a class="pager-a" href="${videoPath(next)}"><small>नया ↑</small>${esc(next.title)}</a>` : '<span></span>'}
          ${prev ? `<a class="pager-a pager-prev" href="${videoPath(prev)}"><small>पुराना ↓</small>${esc(prev.title)}</a>` : ''}
        </nav>
      </div>
      <aside class="watch-side">
        <h2 class="side-h">और ${v.isShort ? 'shorts' : 'vlogs'}</h2>
        <div class="side-list">${related.map((x) => card(x)).join('')}</div>
        <a class="more" href="${v.isShort ? '/shorts/' : '/vlogs/'}">सब देखें →</a>
      </aside>
    </div>
  </div>
</article>`;
  return page({
    title: `${v.title} | Cinekar`,
    description: shortDescription(v),
    pathName: videoPath(v),
    body,
    image: thumb(v, 'maxres'),
    type: 'video.other',
    jsonld: [ld, crumbs],
  });
}

function aboutPage() {
  const a = site.about;
  const body = `<section class="hero hero-sm">
  <img class="hero-bg" src="/img/hero-bg.webp" alt="">
  <div class="hero-grain"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker"><span class="dot"></span> कैमरे के पीछे</p>
      <h1 class="hero-name">YOGESH<br><span>CHAITANYA</span></h1>
      <p class="hero-tag">${esc(a.sub)}</p>
    </div>
    <div class="hero-art"><div class="hero-ring"></div><img class="hero-cut" src="/img/yogesh-cut.webp" alt="Yogesh Chaitanya" width="512" height="608"></div>
  </div>
  <div class="wrap">${statsRow()}</div>
</section>
<section class="sec"><div class="wrap about-split">
  <figure class="frame"><img src="/img/edit-suite.webp" alt="Edit suite में Yogesh Chaitanya" decoding="async"><figcaption>Editor & DI Colorist</figcaption></figure>
  <div class="prose">
    <p class="eyebrow">कहानी</p>
    <h2 class="big-h">रंगमंच से सिनेमा तक,<br><span>सिनेमा से आपकी स्क्रीन तक।</span></h2>
    ${a.paras.map((p) => `<p>${esc(p)}</p>`).join('')}
    <ul class="creds">
      <li><b>निर्देशन</b><span>दबंग सरकार · विद्यापीठ</span></li>
      <li><b>पोस्ट-प्रोडक्शन</b><span>15+ फ़ीचर फ़िल्में · Editor · DI Colorist</span></li>
      <li><b>Founder</b><span>Indian Films Academy, Lucknow (2019)</span></li>
      <li><b>पद्धति</b><span>Yogesh CineAct</span></li>
    </ul>
    <div class="cta-row"><a class="btn btn-line" href="${attr(site.imdbUrl)}" target="_blank" rel="noopener">IMDb</a><a class="btn btn-line" href="${attr(site.instagramUrl)}" target="_blank" rel="noopener">Instagram</a><a class="btn btn-yt" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ Subscribe</a></div>
  </div>
</div></section>
${marquee()}
<section class="sec"><div class="wrap">${sectionHead('मेरी दुनिया', 'एक आदमी, चार मोर्चे')}${ventureCards()}</div></section>`;
  return page({
    title: 'Yogesh Chaitanya — Film Director, Acting Guru, Founder Indian Films Academy | Cinekar',
    description: 'Yogesh Chaitanya (Yogesh Mishrra) की कहानी: Dabang Sarkar और Vidyapeeth के निर्देशक, 15+ फ़िल्मों के पोस्ट-प्रोडक्शन प्रमुख, Indian Films Academy Lucknow के founder और Yogesh CineAct पद्धति के रचनाकार।',
    pathName: '/about/',
    body,
    image: abs('/img/og-home.jpg'),
    type: 'profile',
    jsonld: [orgLd],
  });
}

function contactPage() {
  const body = `<section class="sec sec-first"><div class="wrap narrow">
  <p class="eyebrow">संपर्क</p><h1>बात कीजिए</h1>
  <p class="lead">Brand collab, shoot, academy में admission या कोई भी बात — सीधे लिखिए।</p>
  <p><b>Email:</b> <a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
  <p><b>Instagram:</b> <a href="${attr(site.instagramUrl)}" target="_blank" rel="noopener">@cinekarvlogs</a></p>
  <p><b>Indian Films Academy:</b> C1/192, Vardan Khand, Sector 1, Gomti Nagar, Lucknow 226010 · <a href="https://indianfilmsacademy.com" target="_blank" rel="noopener">indianfilmsacademy.com</a></p>
  <p><b>Production (PICHCHRAPA):</b> <a href="https://pichchrapa.com" target="_blank" rel="noopener">pichchrapa.com</a></p>
</div></section>`;
  return page({ title: 'संपर्क | Cinekar — Yogesh Chaitanya', description: 'Yogesh Chaitanya / Cinekar Vlogs से संपर्क: email, Instagram और Indian Films Academy, Lucknow का पता।', pathName: '/contact/', body });
}

function privacyPage() {
  const body = `<section class="sec sec-first"><div class="wrap narrow">
  <p class="eyebrow">Privacy</p><h1>निजता नीति</h1>
  <p>cinekar.com एक जानकारी देने वाली वेबसाइट है। हम कोई account नहीं बनाते और आपसे कोई निजी जानकारी नहीं माँगते।</p>
  <p>वीडियो YouTube से (youtube-nocookie.com) चलते हैं और play दबाने के बाद ही लोड होते हैं; तब YouTube की अपनी निजता नीति लागू होती है। साइट की गति मापने के लिए Cloudflare के anonymous analytics इस्तेमाल हो सकते हैं, जो cookies नहीं रखते।</p>
  <p>किसी सवाल के लिए: <a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
</div></section>`;
  return page({ title: 'निजता नीति | Cinekar', description: 'cinekar.com की निजता नीति।', pathName: '/privacy/', body });
}

function notFoundPage() {
  const body = `<section class="sec sec-first"><div class="wrap narrow center">
  <p class="eyebrow">404</p><h1>ये पेज नहीं मिला</h1><p class="lead">शायद video हटा दिया गया या link ग़लत है।</p>
  <div class="cta-row center"><a class="btn btn-yt" href="/vlogs/">सारे vlogs</a><a class="btn btn-ghost" href="/">होम</a></div>
</div></section>`;
  return page({ title: 'पेज नहीं मिला | Cinekar', description: 'ये पेज नहीं मिला।', pathName: '/404', body });
}

// ---------- feeds ----------
function sitemap() {
  const urls = [
    ['/', BUILD, 'daily', '1.0'],
    ['/vlogs/', BUILD, 'daily', '0.9'],
    ['/shorts/', BUILD, 'daily', '0.7'],
    ['/about/', BUILD, 'monthly', '0.8'],
    ['/contact/', BUILD, 'monthly', '0.4'],
    ['/privacy/', BUILD, 'yearly', '0.1'],
    ...videos.map((v) => [videoPath(v), v.publishedAt, 'monthly', v.isShort ? '0.5' : '0.8']),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(([p, lm, cf, pr]) => {
  const v = videos.find((x) => videoPath(x) === p);
  const vid = v ? `
    <video:video>
      <video:thumbnail_loc>${esc(thumb(v, 'maxres'))}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(shortDescription(v, 300))}</video:description>
      <video:player_loc>https://www.youtube-nocookie.com/embed/${v.id}</video:player_loc>
      <video:duration>${parseDuration(v.duration)}</video:duration>
      <video:publication_date>${esc(v.publishedAt)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${attr(site.siteUrl)}/about/">Yogesh Chaitanya</video:uploader>
    </video:video>` : '';
  return `  <url><loc>${esc(abs(p))}</loc><lastmod>${esc(lm)}</lastmod><changefreq>${cf}</changefreq><priority>${pr}</priority>${vid}</url>`;
}).join('\n')}
</urlset>
`;
}
function rss() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Cinekar Vlogs — Yogesh Chaitanya</title>
<link>${esc(site.siteUrl)}</link>
<atom:link href="${esc(abs('/feed.xml'))}" rel="self" type="application/rss+xml"/>
<description>${esc(site.homeDescription)}</description>
<language>hi</language>
${videos.slice(0, 50).map((v) => `<item><title>${esc(v.title)}</title><link>${esc(abs(videoPath(v)))}</link><guid isPermaLink="true">${esc(abs(videoPath(v)))}</guid><pubDate>${new Date(v.publishedAt).toUTCString()}</pubDate><description>${esc(shortDescription(v, 300))}</description></item>`).join('\n')}
</channel>
</rss>
`;
}

// ---------- write ----------
async function out(p, content) {
  const f = path.join(dist, p);
  await mkdir(path.dirname(f), { recursive: true });
  await writeFile(f, content);
}
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });

await out('index.html', homePage());
await out('vlogs/index.html', listPage({ pathName: '/vlogs/', eyebrow: 'Daily Vlogs', h1: 'सारे vlogs', title: `सारे vlogs (${vlogs.length}) | Cinekar — Yogesh Chaitanya`, description: 'Yogesh Chaitanya के सारे daily vlogs — Indian Films Academy Lucknow के अंदर की ज़िंदगी, शूटिंग और Raja Ka Baja के कलाकार, नए से पुराने क्रम में।', lead: 'नए से पुराने। हर vlog का अपना पेज, पूरे description और chapters के साथ।', items: vlogs }));
await out('shorts/index.html', listPage({ pathName: '/shorts/', eyebrow: 'Shorts', h1: 'सारे shorts', title: `Shorts (${shorts.length}) | Cinekar — Yogesh Chaitanya`, description: 'Cinekar Vlogs के सारे YouTube Shorts — Acting School की एक मिनट की comedy और झलकियाँ।', lead: 'एक मिनट से छोटे। Acting School की मस्ती और झलकियाँ।', items: shorts }));
for (let i = 0; i < vlogs.length; i++) await out(`video/${vlogs[i].id}/index.html`, videoPage(vlogs[i], i, vlogs));
for (let i = 0; i < shorts.length; i++) await out(`video/${shorts[i].id}/index.html`, videoPage(shorts[i], i, shorts));
await out('about/index.html', aboutPage());
await out('contact/index.html', contactPage());
await out('privacy/index.html', privacyPage());
await out('404.html', notFoundPage());
await out('sitemap.xml', sitemap());
await out('feed.xml', rss());
await out('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${abs('/sitemap.xml')}\n`);

const n = (await readdir(path.join(dist, 'video'))).length;
console.log(`cinekar/dist तैयार: ${vlogs.length} vlogs, ${shorts.length} shorts (${n} video pages).`);
