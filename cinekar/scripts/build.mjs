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
const EN = site.en;
let LANG = 'hi';
const T = (hi, en) => (LANG === 'en' ? en : hi);
const L = (p) => (LANG === 'en' && !p.startsWith('/video/') ? '/en' + (p === '/' ? '/' : p) : p);

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const attr = esc;
const abs = (p) => site.siteUrl + p;
const thumb = (v, size = 'high') => v.thumbs?.[size] || v.thumbs?.high || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
const videoPath = (v) => `/video/${v.id}/`;
const ytWatch = (v) => (v.isShort ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`);

const MONTHS = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function dateHi(iso) {
  const d = new Date(iso);
  const ist = new Date(d.getTime() + 5.5 * 3600 * 1000);
  return LANG === 'en' ? `${ist.getUTCDate()} ${MONTHS_EN[ist.getUTCMonth()]} ${ist.getUTCFullYear()}` : `${ist.getUTCDate()} ${MONTHS[ist.getUTCMonth()]} ${ist.getUTCFullYear()}`;
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
// Pages that exist in both languages (Hindi at /x/, English at /en/x/). Video pages are Hindi only.
const BILINGUAL = ['/', '/vlogs/', '/shorts/', '/about/', '/contact/', '/privacy/'];
const NAV = () => [
  ['/', T('होम', 'Home')],
  ['/vlogs/', 'Vlogs'],
  ['/shorts/', 'Shorts'],
  ['/about/', 'Yogesh Chaitanya'],
  ['/contact/', T('संपर्क', 'Contact')],
];
const KEYWORDS = 'Yogesh Chaitanya, Cinekar, Cinekar Vlogs, Yogesh Mishrra, Yogesh Raj Mishra, Indian Films Academy, acting school Lucknow, acting coach Lucknow, film director Lucknow, Raja Ka Baja, PICHCHRAPA, Gapistaan, Gen Gap, Yogesh CineAct, Hindi vlog, daily vlog';

function page({ title, description, pathName, body, jsonld = [], image, imageAlt, type = 'website', extraHead = '', basePath }) {
  // pathName = the real URL path of this page; basePath = its language-neutral path (for hreflang/nav)
  basePath = basePath || pathName;
  const url = abs(pathName);
  const og = image || abs('/img/og-home.jpg');
  const bi = BILINGUAL.includes(basePath);
  const alt = bi
    ? `<link rel="alternate" hreflang="hi" href="${attr(abs(basePath))}">
<link rel="alternate" hreflang="en" href="${attr(abs('/en' + basePath))}">
<link rel="alternate" hreflang="x-default" href="${attr(abs(basePath))}">`
    : '';
  const ld = jsonld.length ? `<script type="application/ld+json">${JSON.stringify(jsonld.length === 1 ? jsonld[0] : { '@context': 'https://schema.org', '@graph': jsonld.map(({ ['@context']: _, ...r }) => r) })}</script>` : '';
  const analytics = site.cfAnalyticsToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${site.cfAnalyticsToken}"}'></script>` : '';
  const switchHref = bi ? (LANG === 'en' ? basePath : '/en' + basePath) : (LANG === 'en' ? '/' : '/en/');
  return `<!doctype html>
<html lang="${LANG === 'en' ? 'en' : 'hi'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
<meta name="keywords" content="${attr(KEYWORDS)}">
<meta name="author" content="Yogesh Chaitanya">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${attr(url)}">
${alt}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Cinekar — Yogesh Chaitanya">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${attr(url)}">
<meta property="og:image" content="${attr(og)}">
<meta property="og:image:alt" content="${attr(imageAlt || title)}">
<meta property="og:locale" content="${LANG === 'en' ? 'en_IN' : 'hi_IN'}">
<meta property="og:locale:alternate" content="${LANG === 'en' ? 'hi_IN' : 'en_IN'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(description)}">
<meta name="twitter:image" content="${attr(og)}">
${extraHead}
<meta name="theme-color" content="#080606">
<meta name="geo.region" content="IN-UP">
<meta name="geo.placename" content="Lucknow">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/img/icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Cinekar Vlogs" href="/feed.xml">
<link rel="preconnect" href="https://i.ytimg.com">
<link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}</style>
${ld}
</head>
<body>
<a class="skip" href="#main">${T('मुख्य हिस्से पर जाएँ', 'Skip to content')}</a>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${L('/')}" aria-label="Cinekar ${T('होम', 'home')}">
      <img class="brand-mark" src="/img/logo-96.webp" alt="Cinekar Vlogs logo" width="40" height="40">
      <span class="brand-text">CINEKAR<small>by Yogesh Chaitanya</small></span>
    </a>
    <nav class="nav" aria-label="${T('मुख्य', 'Main')}">
      ${NAV().map(([p, l]) => `<a href="${L(p)}"${p === basePath || (p !== '/' && basePath.startsWith(p)) ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
      <a class="lang" href="${switchHref}" hreflang="${LANG === 'en' ? 'hi' : 'en'}" lang="${LANG === 'en' ? 'hi' : 'en'}">${LANG === 'en' ? 'हिंदी' : 'EN'}</a>
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
      <p class="muted">${T('Yogesh Chaitanya — फ़िल्म निर्देशक, एक्टिंग गुरु और Indian Films Academy, Lucknow के founder। रोज़ की ज़िंदगी, बिना फ़िल्टर।', 'Yogesh Chaitanya — film director, acting coach and founder of Indian Films Academy, Lucknow. Real life, no filter.')}</p>
      <p class="muted small">© ${new Date().getFullYear()} Yogesh Chaitanya · PICHCHRAPA, Lucknow, Uttar Pradesh</p>
    </div>
    <div>
      <p class="foot-h">${T('YouTube चैनल', 'YouTube channels')}</p>
      ${site.channels.map(([n, u]) => `<a class="foot-link" href="${attr(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join('')}
    </div>
    <div>
      <p class="foot-h">${T('जुड़िए', 'Follow')}</p>
      <a class="foot-link" href="${attr(site.instagramUrl)}" target="_blank" rel="noopener me">Instagram</a>
      <a class="foot-link" href="${attr(site.facebookUrl)}" target="_blank" rel="noopener me">Facebook</a>
      <a class="foot-link" href="${attr(site.imdbUrl)}" target="_blank" rel="noopener me">IMDb</a>
      <a class="foot-link" href="mailto:${attr(site.email)}">${esc(site.email)}</a>
      <a class="foot-link" href="${L('/privacy/')}">Privacy</a>
    </div>
    <div>
      <p class="foot-h">${T('मेरी दुनिया', 'My world')}</p>
      ${site.brands.map((b) => `<a class="foot-link" href="${attr(b.url)}" target="_blank" rel="noopener">${esc(b.name)}</a>`).join('')}
    </div>
  </div>
</footer>
<script>
document.addEventListener('click', function (e) {
  var p = e.target.closest('.player[data-id]');
  if (!p) return;
  e.preventDefault();
  var ifr = document.createElement('iframe');
  ifr.src = 'https://www.youtube-nocookie.com/embed/' + p.getAttribute('data-id') + '?autoplay=1&rel=0&modestbranding=1';
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

function card(v, { lazy = true } = {}) {
  return `<a class="card${v.isShort ? ' card-short' : ''}" href="${videoPath(v)}">
  <span class="card-img"><img src="${attr(thumb(v, 'high'))}" alt="${attr(v.title)}" width="480" height="${v.isShort ? 854 : 360}"${lazy ? ' loading="lazy"' : ''} decoding="async"><span class="dur">${durationLabel(v.duration)}</span></span>
  <span class="card-body"><span class="card-title">${esc(v.title)}</span><span class="card-meta">${dateHi(v.publishedAt)}</span></span>
</a>`;
}
function player(v, { eager = false } = {}) {
  return `<div class="player${v.isShort ? ' player-short' : ''}" data-id="${attr(v.id)}" data-title="${attr(v.title)}" role="button" tabindex="0" aria-label="${T('चलाएँ', 'Play')}: ${attr(v.title)}">
  <img src="${attr(thumb(v, 'maxres'))}" alt="${attr(v.title)}" width="1280" height="720"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">
  <span class="play" aria-hidden="true"><svg viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.4 0 34 0 34 0S12.6 0 7.4 1.7c-2.9.8-5.1 3.1-5.9 6C0 13 0 24 0 24s0 11 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.6 48 34 48 34 48s21.4 0 26.6-1.7c2.9-.8 5.1-3.1 5.9-6C68 35 68 24 68 24s0-11-1.5-16.3z" fill="#f00"/><path d="M45 24 27 14v20" fill="#fff"/></svg></span>
</div>`;
}
const sectionHead = (eyebrow, title, more) => `<div class="sec-head"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${more ? `<a class="more" href="${more[0]}">${more[1]} →</a>` : ''}</div>`;

// ---------- structured data ----------
const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': abs('/#yogesh'),
  name: 'Yogesh Chaitanya',
  alternateName: ['Yogesh Mishrra', 'Yogesh Raj Mishra', 'योगेश चैतन्य'],
  url: site.siteUrl,
  image: abs('/img/yogesh-cut.webp'),
  description: T('लखनऊ के फ़िल्म निर्देशक, एक्टिंग गुरु, एडिटर और DI colorist; Indian Films Academy के founder।', 'Lucknow-based film director, acting coach, editor and DI colorist; founder of Indian Films Academy.'),
  jobTitle: ['Film Director', 'Acting Coach', 'Film Editor', 'DI Colorist'],
  birthPlace: { '@type': 'Place', name: 'Sitapur, Uttar Pradesh, India' },
  homeLocation: { '@type': 'Place', name: 'Lucknow, Uttar Pradesh, India' },
  knowsAbout: ['Film direction', 'Acting for camera', 'Film editing', 'Color grading', 'Theatre', 'YouTube vlogging'],
  founder: [
    { '@type': 'EducationalOrganization', name: 'Indian Films Academy', url: 'https://indianfilmsacademy.com' },
    { '@type': 'Organization', name: 'PICHCHRAPA', url: 'https://pichchrapa.com' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'Lucknow', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  email: 'mailto:' + site.email,
  sameAs: [site.channelUrl, site.instagramUrl, site.facebookUrl, site.imdbUrl, 'https://www.youtube.com/@pichchrapa', 'https://www.youtube.com/@gapistaan', 'https://indianfilmsacademy.com', 'https://pichchrapa.com', 'https://gapistaan.com'],
});
const siteLd = () => ({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs('/#site'), name: 'Cinekar', alternateName: 'Cinekar Vlogs', url: site.siteUrl, inLanguage: ['hi', 'en'], publisher: { '@id': abs('/#yogesh') } });
const channelLd = () => ({ '@context': 'https://schema.org', '@type': 'Organization', '@id': abs('/#cinekar'), name: 'Cinekar Vlogs', url: site.siteUrl, logo: abs('/img/logo-512.webp'), founder: { '@id': abs('/#yogesh') }, sameAs: [site.channelUrl, site.instagramUrl, site.facebookUrl] });
const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(p) })) });

// ---------- shared blocks ----------
const brandText = (b, i) => (LANG === 'en' ? EN.brands[i] : [b.tag, b.text]);
function ventureCards() {
  return `<div class="ventures">${site.brands.map((b, i) => {
    const [tag, text] = brandText(b, i);
    return `<a class="venture" href="${attr(b.url)}" target="_blank" rel="noopener">
    <img class="venture-bg" src="${attr(b.bg)}" alt="${attr(b.name)}" loading="lazy" decoding="async">
    <span class="venture-shade"></span>
    <span class="venture-in">
      ${b.img ? `<img class="venture-logo" src="${attr(b.img)}" alt="${attr(b.name)} logo" width="64" height="64" loading="lazy">` : ''}
      <small>${esc(tag)}</small>
      <b>${esc(b.name)}</b>
      <span class="venture-txt">${esc(text)}</span>
      <span class="venture-go">${T('देखें', 'Visit')} →</span>
    </span>
  </a>`;
  }).join('')}</div>`;
}
const marquee = () => `<div class="marquee" aria-hidden="true"><div class="marquee-track">${[...site.credits, ...site.credits].map((c) => `<span>${esc(c)}</span><i>✦</i>`).join('')}</div></div>`;
const statsRow = () => `<div class="stats">${(LANG === 'en' ? EN.stats : site.stats).map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>`;
const creds = () => `<ul class="creds">
  <li><b>${T('निर्देशन', 'Director')}</b><span>${T('दबंग सरकार · विद्यापीठ', 'Dabang Sarkar · Vidyapeeth')}</span></li>
  <li><b>${T('पोस्ट-प्रोडक्शन', 'Post-production')}</b><span>${T('15+ फ़ीचर फ़िल्में', '15+ feature films')} · Editor · DI Colorist</span></li>
  <li><b>Founder</b><span>Indian Films Academy, Lucknow (2019)</span></li>
  <li><b>${T('पद्धति', 'Method')}</b><span>Yogesh CineAct</span></li>
</ul>`;
const faqBlock = (faq) => `<div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;

// ---------- pages ----------
function homePage() {
  const latest = vlogs[0];
  const hero = LANG === 'en' ? EN.hero : site.hero;
  const faq = LANG === 'en' ? EN.faq : site.faq;
  const gallery = site.gallery.map(([src, cap], i) => [src, LANG === 'en' ? EN.gallery[i] : cap]);
  const body = `
<section class="hero">
  <img class="hero-bg" src="/img/hero-bg.webp" alt="" fetchpriority="high">
  <div class="hero-grain"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker"><span class="dot"></span> Film Director · ${T('Acting Guru', 'Acting Coach')} · Lucknow</p>
      <h1 class="hero-name"><span class="sr">${T('Yogesh Chaitanya — फ़िल्म निर्देशक, एक्टिंग गुरु | Cinekar Vlogs', 'Yogesh Chaitanya — Film Director & Acting Coach | Cinekar Vlogs')}</span><span aria-hidden="true">YOGESH<br><span class="gold">CHAITANYA</span></span></h1>
      <p class="hero-tag">${esc(hero.line1)} <em>${esc(hero.line2)}</em></p>
      <p class="hero-lead">${esc(LANG === 'en' ? hero.lead : 'Acting school के अंदर की असली ज़िंदगी, शूटिंग का सच और Raja Ka Baja के कलाकार — रोज़ एक नया vlog।')}</p>
      <div class="cta-row">
        <a class="btn btn-yt btn-lg" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ ${T('YouTube पर Subscribe', 'Subscribe on YouTube')}</a>
        <a class="btn btn-line btn-lg" href="${latest ? videoPath(latest) : L('/vlogs/')}">${T('आज का vlog देखें', "Watch today's vlog")}</a>
      </div>
    </div>
    <div class="hero-art">
      <div class="hero-ring"></div>
      <img class="hero-cut" src="/img/yogesh-cut.webp" alt="Yogesh Chaitanya, ${T('फ़िल्म निर्देशक, लखनऊ', 'film director, Lucknow')}" width="512" height="608" fetchpriority="high">
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
      <p class="eyebrow">${T('ताज़ा vlog', 'Latest vlog')} · ${dateHi(latest.publishedAt)}</p>
      <h2 class="feature-title"><a href="${videoPath(latest)}">${esc(latest.title)}</a></h2>
      <p class="muted">${esc(shortDescription(latest, 220))}</p>
      <div class="cta-row"><a class="btn btn-yt" href="${attr(ytWatch(latest))}" target="_blank" rel="noopener">${T('YouTube पर देखें', 'Watch on YouTube')}</a><a class="btn btn-line" href="${videoPath(latest)}">${T('पूरा विवरण', 'Full details')}</a></div>
    </div>
  </div>
</section>` : ''}

<section class="sec">
  <div class="wrap">
    ${sectionHead('Daily Vlogs', T('हर दिन, एक नई कहानी', 'Every day, a new story'), [L('/vlogs/'), T(`सारे ${vlogs.length} vlogs`, `All ${vlogs.length} vlogs`)])}
    <div class="grid">${vlogs.slice(1, 9).map((v) => card(v)).join('')}</div>
  </div>
</section>

${shorts.length ? `<section class="sec sec-dark">
  <div class="wrap">
    ${sectionHead('Shorts', T('एक मिनट की मस्ती', 'One-minute fun'), [L('/shorts/'), T('सारे shorts', 'All shorts')])}
    <div class="strip">${shorts.slice(0, 10).map((v) => card(v)).join('')}</div>
  </div>
</section>` : ''}

<section class="sec about-band">
  <div class="wrap about-split">
    <figure class="frame"><img src="/img/edit-suite.webp" alt="${T('Yogesh Chaitanya अपने edit suite में', 'Yogesh Chaitanya in his edit suite')}" loading="lazy" decoding="async"><figcaption>${T('Edit suite — जहाँ हर vlog कटता है', 'The edit suite — where every vlog is cut')}</figcaption></figure>
    <div>
      <p class="eyebrow">${T('कैमरे के पीछे का आदमी', 'The man behind the camera')}</p>
      <h2 class="big-h">${T('20 साल से सिनेमा।<br><span>अब रोज़ आपके साथ।</span>', '20 years in cinema.<br><span>Now with you, every day.</span>')}</h2>
      <p class="muted">${esc(LANG === 'en' ? EN.about.paras[1] + ' ' + EN.about.paras[2] : site.about.paras[1] + ' ' + site.about.paras[2])}</p>
      ${creds()}
      <a class="btn btn-line" href="${L('/about/')}">${T('पूरी कहानी', 'Full story')} →</a>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    ${sectionHead(T('मेरी दुनिया', 'My world'), T('एक आदमी, चार मोर्चे', 'One man, four fronts'))}
    ${ventureCards()}
  </div>
</section>

<section class="sec sec-dark">
  <div class="wrap">
    ${sectionHead('Behind The Scenes', T('ये है असली Cinekar परिवार', 'Meet the real Cinekar family'))}
    <div class="gallery">${gallery.map(([src, cap], i) => `<figure class="g${i}"><img src="${attr(src)}" alt="${attr(cap)}" loading="lazy" decoding="async"><figcaption>${esc(cap)}</figcaption></figure>`).join('')}</div>
  </div>
</section>

<section class="sec">
  <div class="wrap narrow">
    ${sectionHead('FAQ', T('अक्सर पूछे जाने वाले सवाल', 'Frequently asked questions'))}
    ${faqBlock(faq)}
  </div>
</section>

<section class="collab">
  <div class="wrap collab-in">
    <div>
      <p class="eyebrow">Brand Collab · Shoot · Admission</p>
      <h2 class="big-h">${T('साथ काम करना है?', "Let's work together")}</h2>
      <p class="muted">${T('Brand integration, फ़िल्म/ad shoot, या Indian Films Academy में admission — सीधे बात कीजिए।', 'Brand integrations, film or ad shoots, or admission to Indian Films Academy — talk to us directly.')}</p>
    </div>
    <div class="collab-btns">
      <a class="btn btn-yt btn-lg" href="https://wa.me/${attr(site.whatsapp)}?text=${encodeURIComponent(T('नमस्ते Yogesh जी, cinekar.com से संपर्क कर रहा हूँ।', 'Hello Yogesh ji, reaching out from cinekar.com.'))}" target="_blank" rel="noopener">${T('WhatsApp करें', 'WhatsApp us')}</a>
      <a class="btn btn-line btn-lg" href="mailto:${attr(site.email)}">${T('Email करें', 'Email us')}</a>
    </div>
  </div>
</section>`;
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Cinekar Vlogs', itemListElement: vlogs.slice(0, 10).map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(videoPath(v)) })) };
  return page({
    title: LANG === 'en' ? EN.homeTitle : 'Yogesh Chaitanya — फ़िल्म निर्देशक, एक्टिंग गुरु, लखनऊ | Cinekar Vlogs',
    description: LANG === 'en' ? EN.homeDescription : site.homeDescription,
    pathName: L('/'),
    basePath: '/',
    body,
    imageAlt: 'Yogesh Chaitanya — Cinekar Vlogs',
    jsonld: [siteLd(), personLd(), channelLd(), faqLd(faq), itemList],
  });
}

function listPage({ base, title, h1, eyebrow, lead, items, description }) {
  const body = `<section class="sec sec-first"><div class="wrap">
  <nav class="crumbs" aria-label="breadcrumb"><a href="${L('/')}">${T('होम', 'Home')}</a> › ${eyebrow}</nav>
  <p class="eyebrow">${eyebrow}</p><h1 class="page-h">${h1}</h1><p class="lead">${esc(lead)}</p>
  <div class="grid${items[0]?.isShort ? ' grid-shorts' : ''}">${items.map((v) => card(v)).join('')}</div>
</div></section>`;
  const ld = { '@context': 'https://schema.org', '@type': 'ItemList', name: h1, itemListElement: items.slice(0, 100).map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(videoPath(v)), name: v.title })) };
  return page({ title, description, pathName: L(base), basePath: base, body, jsonld: [ld, crumbLd([['Cinekar', L('/')], [eyebrow, L(base)]])] });
}

function videoPage(v, i, list) {
  const prev = list[i + 1];
  const next = list[i - 1];
  const related = list.filter((x) => x.id !== v.id).slice(Math.max(0, i - 3), Math.max(0, i - 3) + 6);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': abs(videoPath(v)) + '#video',
    name: v.title,
    description: shortDescription(v, 500),
    thumbnailUrl: [thumb(v, 'maxres'), thumb(v, 'high')],
    uploadDate: v.publishedAt,
    duration: v.duration,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    contentUrl: ytWatch(v),
    url: abs(videoPath(v)),
    inLanguage: 'hi',
    isFamilyFriendly: true,
    keywords: (v.tags || []).slice(0, 15).join(', ') || undefined,
    author: { '@type': 'Person', '@id': abs('/#yogesh'), name: 'Yogesh Chaitanya', url: site.siteUrl },
    publisher: { '@type': 'Organization', name: 'Cinekar Vlogs', url: site.siteUrl, logo: { '@type': 'ImageObject', url: abs('/img/icon-512.png') } },
    potentialAction: { '@type': 'WatchAction', target: ytWatch(v) },
  };
  const share = encodeURIComponent(`${v.title}\n${abs(videoPath(v))}`);
  const listBase = v.isShort ? '/shorts/' : '/vlogs/';
  const body = `<article class="watch">
  <div class="wrap">
    <nav class="crumbs" aria-label="रास्ता"><a href="/">होम</a> › <a href="${listBase}">${v.isShort ? 'Shorts' : 'Vlogs'}</a></nav>
    <div class="watch-grid${v.isShort ? ' watch-short' : ''}">
      <div class="watch-main">
        ${player(v, { eager: true })}
        <h1>${esc(v.title)}</h1>
        <p class="watch-meta"><time datetime="${attr(v.publishedAt)}">${dateHi(v.publishedAt)}</time> · ${durationLabel(v.duration)} · <a href="${attr(ytWatch(v))}" target="_blank" rel="noopener">YouTube पर देखें</a> · <a href="/about/" rel="author">Yogesh Chaitanya</a></p>
        <div class="actions">
          <a class="btn btn-yt" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ Subscribe</a>
          <a class="btn btn-ghost" href="https://wa.me/?text=${share}" target="_blank" rel="noopener">WhatsApp पर भेजें</a>
          <a class="btn btn-ghost" href="${attr(ytWatch(v))}" target="_blank" rel="noopener">Like &amp; Comment</a>
        </div>
        <div class="desc">${descriptionHtml(v)}</div>
        <nav class="pager">
          ${next ? `<a class="pager-a" href="${videoPath(next)}" rel="next"><small>नया ↑</small>${esc(next.title)}</a>` : '<span></span>'}
          ${prev ? `<a class="pager-a pager-prev" href="${videoPath(prev)}" rel="prev"><small>पुराना ↓</small>${esc(prev.title)}</a>` : ''}
        </nav>
      </div>
      <aside class="watch-side">
        <h2 class="side-h">और ${v.isShort ? 'shorts' : 'vlogs'}</h2>
        <div class="side-list">${related.map((x) => card(x)).join('')}</div>
        <a class="more" href="${listBase}">सब देखें →</a>
      </aside>
    </div>
  </div>
</article>`;
  const extra = `<meta property="og:video" content="https://www.youtube.com/embed/${attr(v.id)}">
<meta property="og:video:type" content="text/html">
<meta property="og:video:width" content="1280">
<meta property="og:video:height" content="720">
<meta property="video:release_date" content="${attr(v.publishedAt)}">
<meta property="video:duration" content="${parseDuration(v.duration)}">
<meta name="twitter:player" content="https://www.youtube.com/embed/${attr(v.id)}">`;
  return page({
    title: `${v.title.replace(/\s*\|\s*Cinekar Vlogs.*$/i, '')} | Cinekar Vlogs — Yogesh Chaitanya`,
    description: shortDescription(v),
    pathName: videoPath(v),
    body,
    image: thumb(v, 'maxres'),
    imageAlt: v.title,
    type: 'video.episode',
    extraHead: extra,
    jsonld: [ld, crumbLd([['Cinekar', '/'], [v.isShort ? 'Shorts' : 'Vlogs', listBase], [v.title, videoPath(v)]])],
  });
}

function aboutPage() {
  const a = LANG === 'en' ? EN.about : site.about;
  const body = `<section class="hero hero-sm">
  <img class="hero-bg" src="/img/hero-bg.webp" alt="">
  <div class="hero-grain"></div>
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker"><span class="dot"></span> ${T('कैमरे के पीछे', 'Behind the camera')}</p>
      <h1 class="hero-name"><span class="sr">${T('Yogesh Chaitanya के बारे में', 'About Yogesh Chaitanya')}</span><span aria-hidden="true">YOGESH<br><span class="gold">CHAITANYA</span></span></h1>
      <p class="hero-tag">${esc(a.sub)}</p>
    </div>
    <div class="hero-art"><div class="hero-ring"></div><img class="hero-cut" src="/img/yogesh-cut.webp" alt="Yogesh Chaitanya" width="512" height="608"></div>
  </div>
  <div class="wrap">${statsRow()}</div>
</section>
<section class="sec"><div class="wrap about-split">
  <figure class="frame"><img src="/img/edit-suite.webp" alt="${T('Edit suite में Yogesh Chaitanya', 'Yogesh Chaitanya in the edit suite')}" decoding="async"><figcaption>Editor & DI Colorist</figcaption></figure>
  <div class="prose">
    <p class="eyebrow">${T('कहानी', 'Story')}</p>
    <h2 class="big-h">${T('रंगमंच से सिनेमा तक,<br><span>सिनेमा से आपकी स्क्रीन तक।</span>', 'From theatre to cinema,<br><span>from cinema to your screen.</span>')}</h2>
    ${a.paras.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${creds()}
    <div class="cta-row"><a class="btn btn-line" href="${attr(site.imdbUrl)}" target="_blank" rel="noopener me">IMDb</a><a class="btn btn-line" href="${attr(site.instagramUrl)}" target="_blank" rel="noopener me">Instagram</a><a class="btn btn-yt" href="${attr(site.subscribeUrl)}" target="_blank" rel="noopener">▶ Subscribe</a></div>
  </div>
</div></section>
${marquee()}
<section class="sec"><div class="wrap">${sectionHead(T('मेरी दुनिया', 'My world'), T('एक आदमी, चार मोर्चे', 'One man, four fronts'))}${ventureCards()}</div></section>`;
  const profile = { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@id': abs('/#yogesh') }, url: abs(L('/about/')), inLanguage: LANG };
  return page({
    title: T('Yogesh Chaitanya — परिचय: फ़िल्म निर्देशक, एक्टिंग गुरु, Indian Films Academy के founder | Cinekar', 'About Yogesh Chaitanya — Film Director, Acting Coach, Founder of Indian Films Academy | Cinekar'),
    description: T('Yogesh Chaitanya (Yogesh Mishrra) की कहानी: Dabang Sarkar और Vidyapeeth के निर्देशक, 15+ फ़िल्मों के पोस्ट-प्रोडक्शन प्रमुख, Indian Films Academy Lucknow के founder और Yogesh CineAct पद्धति के रचनाकार।', 'The story of Yogesh Chaitanya (Yogesh Mishrra): director of Dabang Sarkar and Vidyapeeth, post-production head on 15+ films, founder of Indian Films Academy, Lucknow and creator of the Yogesh CineAct method.'),
    pathName: L('/about/'),
    basePath: '/about/',
    body,
    type: 'profile',
    jsonld: [profile, personLd(), crumbLd([['Cinekar', L('/')], ['Yogesh Chaitanya', L('/about/')]])],
  });
}

function contactPage() {
  const body = `<section class="sec sec-first"><div class="wrap narrow">
  <p class="eyebrow">${T('संपर्क', 'Contact')}</p><h1 class="page-h">${T('बात कीजिए', 'Get in touch')}</h1>
  <p class="lead">${T('Brand collab, shoot, academy में admission या कोई भी बात — सीधे लिखिए।', 'Brand collabs, shoots, academy admissions or anything else — write directly.')}</p>
  <p><b>Email:</b> <a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
  <p><b>WhatsApp:</b> <a href="https://wa.me/${attr(site.whatsapp)}" target="_blank" rel="noopener">+91 77540 00121</a></p>
  <p><b>Instagram:</b> <a href="${attr(site.instagramUrl)}" target="_blank" rel="noopener">@cinekarvlogs</a></p>
  <p><b>Indian Films Academy:</b> C1/192, Vardan Khand, Sector 1, Gomti Nagar, Lucknow 226010 · <a href="https://indianfilmsacademy.com" target="_blank" rel="noopener">indianfilmsacademy.com</a></p>
  <p><b>Production (PICHCHRAPA):</b> <a href="https://pichchrapa.com" target="_blank" rel="noopener">pichchrapa.com</a></p>
</div></section>`;
  const cp = { '@context': 'https://schema.org', '@type': 'ContactPage', url: abs(L('/contact/')), about: { '@id': abs('/#yogesh') } };
  return page({ title: T('संपर्क — Yogesh Chaitanya | Cinekar', 'Contact Yogesh Chaitanya | Cinekar'), description: T('Yogesh Chaitanya / Cinekar Vlogs से संपर्क: email, WhatsApp, Instagram और Indian Films Academy, Lucknow का पता।', 'Contact Yogesh Chaitanya / Cinekar Vlogs: email, WhatsApp, Instagram and the Indian Films Academy, Lucknow address.'), pathName: L('/contact/'), basePath: '/contact/', body, jsonld: [cp] });
}

function privacyPage() {
  const body = `<section class="sec sec-first"><div class="wrap narrow">
  <p class="eyebrow">Privacy</p><h1 class="page-h">${T('निजता नीति', 'Privacy policy')}</h1>
  <p>${T('cinekar.com एक जानकारी देने वाली वेबसाइट है। हम कोई account नहीं बनाते और आपसे कोई निजी जानकारी नहीं माँगते।', 'cinekar.com is an informational website. We do not create accounts or ask for personal information.')}</p>
  <p>${T('वीडियो YouTube से (youtube-nocookie.com) चलते हैं और play दबाने के बाद ही लोड होते हैं; तब YouTube की अपनी निजता नीति लागू होती है।', "Videos play from YouTube (youtube-nocookie.com) and load only after you press play; YouTube's own privacy policy then applies.")}</p>
  <p>${T('किसी सवाल के लिए', 'Questions')}: <a href="mailto:${attr(site.email)}">${esc(site.email)}</a></p>
</div></section>`;
  return page({ title: T('निजता नीति | Cinekar', 'Privacy policy | Cinekar'), description: T('cinekar.com की निजता नीति।', 'Privacy policy of cinekar.com.'), pathName: L('/privacy/'), basePath: '/privacy/', body });
}

function notFoundPage() {
  const body = `<section class="sec sec-first"><div class="wrap narrow center">
  <p class="eyebrow">404</p><h1 class="page-h">ये पेज नहीं मिला · Page not found</h1>
  <div class="cta-row center"><a class="btn btn-yt" href="/vlogs/">सारे vlogs</a><a class="btn btn-ghost" href="/">होम</a><a class="btn btn-ghost" href="/en/">English</a></div>
</div></section>`;
  return page({ title: 'पेज नहीं मिला | Cinekar', description: 'Page not found.', pathName: '/404', body }).replace('index, follow,', 'noindex, follow,');
}

// ---------- feeds ----------
function sitemap() {
  const pri = { '/': '1.0', '/vlogs/': '0.9', '/shorts/': '0.7', '/about/': '0.9', '/contact/': '0.5', '/privacy/': '0.1' };
  const altLinks = (b) => `
    <xhtml:link rel="alternate" hreflang="hi" href="${esc(abs(b))}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${esc(abs('/en' + b))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(b))}"/>`;
  const main = BILINGUAL.flatMap((b) => [abs(b), abs('/en' + b)].map((u) => `  <url><loc>${esc(u)}</loc><lastmod>${BUILD}</lastmod><changefreq>${b === '/privacy/' ? 'yearly' : 'daily'}</changefreq><priority>${pri[b]}</priority>${altLinks(b)}
  </url>`));
  const vids = videos.map((v) => `  <url><loc>${esc(abs(videoPath(v)))}</loc><lastmod>${esc(v.publishedAt)}</lastmod><changefreq>monthly</changefreq><priority>${v.isShort ? '0.5' : '0.8'}</priority>
    <video:video>
      <video:thumbnail_loc>${esc(thumb(v, 'maxres'))}</video:thumbnail_loc>
      <video:title>${esc(v.title)}</video:title>
      <video:description>${esc(shortDescription(v, 300))}</video:description>
      <video:player_loc>https://www.youtube.com/embed/${v.id}</video:player_loc>
      <video:duration>${parseDuration(v.duration)}</video:duration>
      <video:publication_date>${esc(v.publishedAt)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${attr(site.siteUrl)}/about/">Yogesh Chaitanya</video:uploader>
    </video:video>
  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${[...main, ...vids].join('\n')}
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

for (const lang of ['hi', 'en']) {
  LANG = lang;
  const pre = lang === 'en' ? 'en/' : '';
  await out(pre + 'index.html', homePage());
  await out(pre + 'vlogs/index.html', listPage({ base: '/vlogs/', eyebrow: 'Daily Vlogs', h1: T('सारे vlogs', 'All vlogs'), title: T(`सारे vlogs (${vlogs.length}) — Yogesh Chaitanya | Cinekar Vlogs`, `All ${vlogs.length} vlogs — Yogesh Chaitanya | Cinekar Vlogs`), description: T('Yogesh Chaitanya के सारे daily vlogs — Indian Films Academy Lucknow के अंदर की ज़िंदगी, शूटिंग और Raja Ka Baja के कलाकार, नए से पुराने क्रम में।', "Every daily vlog by Yogesh Chaitanya — life inside Indian Films Academy Lucknow, shoots and the actors of Raja Ka Baja, newest first."), lead: T('नए से पुराने। हर vlog का अपना पेज, पूरे description और chapters के साथ।', 'Newest first. Every vlog has its own page with full description and chapters (in Hindi).'), items: vlogs }));
  await out(pre + 'shorts/index.html', listPage({ base: '/shorts/', eyebrow: 'Shorts', h1: T('सारे shorts', 'All shorts'), title: T(`Shorts (${shorts.length}) — Yogesh Chaitanya | Cinekar Vlogs`, `${shorts.length} Shorts — Yogesh Chaitanya | Cinekar Vlogs`), description: T('Cinekar Vlogs के सारे YouTube Shorts — Acting School की एक मिनट की comedy और झलकियाँ।', 'All YouTube Shorts from Cinekar Vlogs — one-minute comedy and glimpses from an acting school.'), lead: T('एक मिनट से छोटे। Acting School की मस्ती और झलकियाँ।', 'Under a minute. Fun and glimpses from the acting school.'), items: shorts }));
  await out(pre + 'about/index.html', aboutPage());
  await out(pre + 'contact/index.html', contactPage());
  await out(pre + 'privacy/index.html', privacyPage());
}
LANG = 'hi';
for (let i = 0; i < vlogs.length; i++) await out(`video/${vlogs[i].id}/index.html`, videoPage(vlogs[i], i, vlogs));
for (let i = 0; i < shorts.length; i++) await out(`video/${shorts[i].id}/index.html`, videoPage(shorts[i], i, shorts));
await out('404.html', notFoundPage());
await out('sitemap.xml', sitemap());
await out('feed.xml', rss());
await out('robots.txt', `User-agent: *\nAllow: /\nDisallow: /404\n\nSitemap: ${abs('/sitemap.xml')}\n`);
await out('site.webmanifest', JSON.stringify({ name: 'Cinekar — Yogesh Chaitanya', short_name: 'Cinekar', start_url: '/', display: 'standalone', background_color: '#080606', theme_color: '#080606', icons: [{ src: '/img/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/img/icon-180.png', sizes: '180x180', type: 'image/png' }] }));

const n = (await readdir(path.join(dist, 'video'))).length;
console.log(`cinekar/dist तैयार: ${vlogs.length} vlogs, ${shorts.length} shorts (${n} video pages), Hindi + English.`);
