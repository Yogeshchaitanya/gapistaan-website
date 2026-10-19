// PICHCHRAPA site generator: content/site.json + data/videos.json (synced from YouTube) -> dist/
// Plain Node, no dependencies. Run: node pichchrapa/scripts/build.mjs
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const siteHi = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const siteEnOver = JSON.parse(await readFile(path.join(root, 'content/site.en.json'), 'utf8'));
const data = JSON.parse(await readFile(path.join(root, 'data/videos.json'), 'utf8'));
const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
const appJs = await readFile(path.join(root, 'src/app.js'), 'utf8');

// English content is an overlay on the Hindi content: objects merge by key, arrays merge by position.
function merge(a, b) {
  if (b === undefined) return a;
  if (Array.isArray(a) && Array.isArray(b)) return a.map((x, i) => (i < b.length ? merge(x, b[i]) : x)).concat(b.slice(a.length));
  if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    const o = { ...a };
    for (const k of Object.keys(b)) o[k] = k in a ? merge(a[k], b[k]) : b[k];
    return o;
  }
  return b;
}
const siteEn = merge(siteHi, siteEnOver);

// Language state: Hindi at the root, English under /en/. setLang() switches everything the page functions read.
let LANG = 'hi';
const T = (hi, en) => (LANG === 'en' ? en : hi);
let site = siteHi, S = site.series, B = site.business;
function setLang(lang) {
  LANG = lang;
  site = lang === 'en' ? siteEn : siteHi;
  S = site.series;
  B = site.business;
}
const siteUrl = (siteHi.siteUrl || '').replace(/\/$/, '');
const abs = (p) => (siteUrl ? siteUrl + p : '');
const L = (p) => (LANG === 'en' ? '/en' : '') + p; // a page path in the current language
const A = (p) => abs(L(p));
const MAIN = siteHi.sources.find((s) => s.main).channelId;

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const decode = (s) => String(s || '').replace(/&(amp|lt|gt|quot|#39);/g, (m) => ENT[m]);
const FMT = {
  hi: { date: new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }), month: new Intl.DateTimeFormat('hi-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }) },
  en: { date: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }), month: new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }) },
};
const hiDate = (iso) => FMT[LANG].date.format(new Date(iso));
const hiMonth = (iso) => FMT[LANG].month.format(new Date(iso));
function count(n) {
  const f = (x, unit) => String(Math.floor((x / unit) * 10) / 10).replace(/\.0$/, '');
  if (LANG === 'en') {
    if (n >= 1e9) return f(n, 1e9) + 'B';
    if (n >= 1e6) return f(n, 1e6) + 'M';
    if (n >= 1e3) return f(n, 1e3) + 'K';
    return String(n);
  }
  if (n >= 1e7) return f(n, 1e7) + ' करोड़';
  if (n >= 1e5) return f(n, 1e5) + ' लाख';
  if (n >= 1e3) return f(n, 1e3) + ' हज़ार';
  return String(n);
}
function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || '');
  return m ? (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0) : 0;
}
const clock = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(x).padStart(2, '0');
};
const trunc = (s, n) => {
  const a = [...String(s)];
  return a.length > n ? a.slice(0, n - 1).join('').trimEnd() + '…' : String(s);
};

// ---------- videos ----------
const NOISE = /^(raja ka baja( gags)?|raja ka gags|pichchrapa|pichrapa planet|sadak ka raja|सड़क का राजा|filmy adaa?lat|filmi adalat|full comedy( video| show| skit)?|courtroom comedy.*|comedy web ?serie?s?e?.*|web ?serie?s?e?.*|hindi comedy.*|new hindi comedy|pure comedy|street funny vlog|new episode|full video|comedy short)$/i;
const LABELSEG = /^(part ?-? ?\d+|episode ?-? ?\d+|official trailer|trailer|teaser|making.*|behind.*|comedy short film trailer|last)$/i;
const LABELS = {
  hi: { ep: (n) => `एपिसोड ${n}`, part: (n) => `पार्ट ${n}`, trailer: 'ट्रेलर', teaser: 'टीज़र', making: 'मेकिंग' },
  en: { ep: (n) => `Episode ${n}`, part: (n) => `Part ${n}`, trailer: 'Trailer', teaser: 'Teaser', making: 'Making-of' },
};
function cleanTitle(raw, lang) {
  const lb = LABELS[lang];
  const t = decode(raw).replace(/#\S+/g, '').replace(/\s+/g, ' ').trim();
  const piped = t.includes('|');
  const segs = t.split(piped ? '|' : /\s*,\s*/).map((s) => s.trim()).filter(Boolean);
  const keep = segs.filter((s) => !NOISE.test(s) && !LABELSEG.test(s));
  const base = ((piped ? keep[0] : keep.join(', ')) || segs[0] || t || 'PICHCHRAPA').replace(/\s*[-–,]?\s*(raja ka baja( gags)?|sadak ka raja|pichchrapa)\s*$/i, '').trim() || 'PICHCHRAPA';
  const labels = [];
  const has = (re) => re.test(base);
  const ep = /episode ?-? ?(\d+)/i.exec(t);
  if (ep && !has(/episode/i)) labels.push(lb.ep(ep[1]));
  const part = /part ?-? ?(\d+)/i.exec(t);
  if (part && !has(/part/i)) labels.push(lb.part(part[1]));
  if (/trailer/i.test(t) && !has(/trailer/i)) labels.push(lb.trailer);
  if (/teaser/i.test(t) && !has(/teaser/i)) labels.push(lb.teaser);
  if (/making|behind the scene/i.test(t) && !has(/making|behind/i)) labels.push(lb.making);
  return labels.length ? `${base} (${labels.join(', ')})` : base;
}
const reAdalat = new RegExp(siteHi.series.adalat.match, 'i');
const MILESTONE = /million|views on instagram|subscribe|सब्सक्राइब/i;
const channelChip = (v) => (/academy/i.test(v.channel) ? T('IFA चैनल', 'IFA channel') : `${v.channel} ${T('चैनल', 'channel')}`);

const vids = data.videos.map((v) => {
  const t = decode(v.title);
  const primary = v.channelId === MAIN;
  const series = reAdalat.test(t) ? 'adalat' : primary && v.publishedAt.slice(0, 10) >= siteHi.series.raja.since ? 'raja' : 'other';
  const paras = decode(v.description).split(/\n+/).map((x) => x.trim()).filter((x) => x && !/^(#|https?:\/\/)/.test(x) && !/^(subscribe|follow|like)\b/i.test(x)).slice(0, 3);
  return { ...v, title: t, clean: cleanTitle(v.title, 'hi'), cleanEn: cleanTitle(v.title, 'en'), primary, series, sec: seconds(v.duration), paras, hasPage: primary && !v.isShort };
});
const vt = (v) => (LANG === 'en' ? v.cleanEn : v.clean); // the title in the current language
const byNew = (a, b) => b.publishedAt.localeCompare(a.publishedAt);
vids.sort(byNew);
const pageVids = vids.filter((v) => v.hasPage);
const adalatEps = vids.filter((v) => v.series === 'adalat' && !v.isShort);
const rajaEps = vids.filter((v) => v.series === 'raja' && !v.isShort && v.primary);
const rajaShorts = vids.filter((v) => v.series === 'raja' && v.isShort && v.primary);
const hitShorts = [...rajaShorts].filter((v) => !MILESTONE.test(v.title)).sort((a, b) => b.views - a.views).slice(0, 12);
const otherEps = vids.filter((v) => v.series === 'other' && !v.isShort && v.primary);

const cases = siteHi.series.adalat.cases.map((c) => ({ ...c, re: new RegExp(c.match, 'i'), items: [] }));
for (const v of adalatEps) cases.find((c) => c.re.test(v.title)).items.push(v);
for (const c of cases) c.items.sort((a, b) => (a.primary === b.primary ? a.publishedAt.localeCompare(b.publishedAt) : a.primary ? -1 : 1));
const liveCases = cases.filter((c) => c.items.length);
const dated = liveCases.filter((c) => c.id !== 'general').sort((a, b) => a.items[0].publishedAt.localeCompare(b.items[0].publishedAt));
dated.forEach((c, i) => (c.no = String(i + 1).padStart(2, '0')));
const caseOrder = [...dated].reverse().concat(liveCases.filter((c) => c.id === 'general'));
const caseName = (c) => S.adalat.cases.find((x) => x.id === c.id).name;

const ch = data.channels[MAIN] || {};
const statsDate = data.statsAt || new Date().toISOString();
const thumbOf = (v) => v.thumbs.maxres || v.thumbs.medium || `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`;
const smallThumb = (v) => v.thumbs.medium || `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`;
const hrefOf = (v) => (v.hasPage ? `/video/${v.id}/` : `https://www.youtube.com/watch?v=${v.id}`);
const extAttr = (v) => (v.hasPage ? '' : ' target="_blank" rel="noopener"');
const watchUrl = (v) => `https://www.youtube.com/watch?v=${v.id}`;

// ---------- parts ----------
function card(v, { chip = '' } = {}) {
  const href = hrefOf(v);
  const ext = extAttr(v);
  const meta = [hiDate(v.publishedAt), v.views >= 100 ? `${count(v.views)} ${T('व्यू', 'views')}` : ''].filter(Boolean).join(', ');
  const tag = chip || (v.primary ? '' : channelChip(v));
  return `<article class="vcard">
  <a class="thumb" href="${esc(href)}"${ext} tabindex="-1" aria-hidden="true"><img src="${esc(thumbOf(v))}" width="320" height="180" loading="lazy" decoding="async" alt=""><span class="play"></span>${tag ? `<span class="chip">${esc(tag)}</span>` : ''}<span class="dur">${clock(v.sec)}</span></a>
  <div class="vbody"><a class="vtitle" href="${esc(href)}"${ext}>${esc(vt(v))}</a><span class="vmeta">${esc(meta)}</span></div>
</article>`;
}
const rail = (items, label) => `<div class="rail-wrap">
  <div class="rail-nav"><button type="button" data-dir="prev" aria-label="${T('पीछे', 'Previous')}">&#8249;</button><button type="button" data-dir="next" aria-label="${T('आगे', 'Next')}">&#8250;</button></div>
  <div class="rail" role="list" aria-label="${esc(label)}">${items.map((v) => card(v)).join('\n')}</div>
</div>`;
const shortCard = (v) => `<div class="short" role="listitem"><img src="${esc(thumbOf(v))}" width="320" height="180" loading="lazy" decoding="async" alt=""><span class="play"></span><span class="cap">${esc(trunc(vt(v), 48))}<small>${esc(count(v.views))} ${T('व्यू', 'views')}</small></span><button class="hit" type="button" data-yt="${esc(v.id)}" data-short data-title="${esc(vt(v))}" aria-label="${T('शॉर्ट चलाइए', 'Play Short')}: ${esc(trunc(vt(v), 60))}"></button></div>`;

// The hero reel: top strip = every Raja Ka Baja episode, bottom strip = everything else (Filmy Adalat and the older short films).
function reelStrips() {
  const top = rajaEps;
  const rest = [...adalatEps, ...otherEps].sort(byNew);
  const cell = (v, hide) => `<a class="cell" href="${esc(hrefOf(v))}"${hide ? ' tabindex="-1" aria-hidden="true"' : ''}><img src="${esc(smallThumb(v))}" width="210" height="118" loading="lazy" decoding="async" alt="${hide ? '' : esc(vt(v))}"></a>`;
  const row = (items, cls, dur) => `<div class="strip${cls}" style="--dur:${dur}s"><div class="strip-track">${items.map((v) => cell(v, false)).join('')}${items.map((v) => cell(v, true)).join('')}</div></div>`;
  const label = (cls, name, href, n) => `<div class="wrap reel-label ${cls}"><a href="${href}">${esc(name)}</a><span>${n} ${T('वीडियो', 'videos')}</span></div>`;
  return `<div class="reels" aria-label="${T('PICHCHRAPA की रील', 'PICHCHRAPA reels')}">${label('rl-raja', S.raja.name, '/raja-ka-baja/', top.length)}${row(top, '', Math.round(top.length * 5.5))}${label('rl-adalat', `${S.adalat.name} ${T('और बाक़ी', 'and more')}`, '/filmy-adalat/', rest.length)}${row(rest, ' rev', Math.round(rest.length * 5.5))}</div>`;
}

// The logo, drawn flat and level. The clapper is closed at rest, so it sits straight; in the header it claps once on load and again on hover.
let clapN = 0;
function clapMark(cls = '') {
  const id = `cm${++clapN}`;
  const arm = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M${10 + i * 10.5} 24h5l6-11h-5z"/>`).join('');
  const bar = [0, 1, 2, 3, 4, 5].map((i) => `<path d="M${5 + i * 10.5} 36h5l6-10h-5z"/>`).join('');
  return `<svg class="clap ${cls}" viewBox="0 0 72 60" aria-hidden="true" focusable="false"><defs><clipPath id="${id}a"><rect x="4" y="13" width="64" height="11" rx="2"/></clipPath><clipPath id="${id}b"><rect x="4" y="26" width="64" height="10" rx="2"/></clipPath></defs>
<rect x="5" y="37" width="62" height="21" rx="2.5" fill="#0b1313" stroke="#cda45a" stroke-opacity=".55" stroke-width=".8"/><path d="M10 45h52M10 51h52M41 45v6M25 51v5" stroke="#f0d28e" stroke-width=".9" fill="none"/>
<rect x="4" y="26" width="64" height="10" rx="2" fill="#0b1313"/><g clip-path="url(#${id}b)" fill="#cda45a">${bar}</g><rect x="4" y="26" width="64" height="10" rx="2" fill="none" stroke="#cda45a" stroke-opacity=".55" stroke-width=".8"/>
<g class="clap-arm"><rect x="4" y="13" width="64" height="11" rx="2" fill="#0b1313"/><g clip-path="url(#${id}a)" fill="#f0d28e">${arm}</g><rect x="4" y="13" width="64" height="11" rx="2" fill="none" stroke="#cda45a" stroke-opacity=".55" stroke-width=".8"/></g>
<circle cx="9" cy="25" r="2.3" fill="#f0d28e"/></svg>`;
}
// Filmy Adalat: a gavel that strikes twice when the heading scrolls into view. Raja Ka Baja: sound bars that move while it is on screen.
const gavelHtml = `<span class="gv" aria-hidden="true"><svg viewBox="0 0 120 96" focusable="false"><g class="gv-rings"><ellipse cx="70" cy="88" rx="9" ry="2.6"/><ellipse cx="70" cy="88" rx="9" ry="2.6"/></g><rect class="gv-block" x="46" y="84" width="76" height="9" rx="2"/><g class="gv-arm"><rect class="gv-handle" x="12" y="62" width="62" height="7" rx="3.5"/><rect class="gv-head" x="58" y="44" width="24" height="40" rx="5"/><rect class="gv-band" x="58" y="58" width="24" height="4"/></g></svg></span>`;
const eqHtml = `<span class="eq" aria-hidden="true">${'<i></i>'.repeat(7)}</span>`;

const personLd = () => ({ '@type': 'Person', name: B.founder, jobTitle: 'Founder' });
const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': abs('/#org'),
  name: 'PICHCHRAPA',
  alternateName: ['Pichchrapa', 'Pichrapa Planet'],
  url: abs('/'),
  logo: abs('/img/logo-520.webp'),
  image: abs('/img/og-home.jpg'),
  description: T('PICHCHRAPA लखनऊ का फ़िल्म और वेब-सीरीज़ प्रोडक्शन है, जिसे Indian Films Academy के अभिनेताओं का परिवार चलाता है। फ़िल्मी अदालत और राजा का बाजा इसकी सीरीज़ हैं।', 'PICHCHRAPA is a film and web-series production house in Lucknow, run by a family of actors trained at Indian Films Academy. Filmy Adalat and Raja Ka Baja are its series.'),
  email: B.email,
  telephone: B.phone,
  address: { '@type': 'PostalAddress', ...(B.street || B.address ? { streetAddress: B.street || B.address } : {}), addressLocality: 'Lucknow', addressRegion: 'Uttar Pradesh', ...(B.pin ? { postalCode: B.pin } : {}), addressCountry: 'IN' },
  founder: personLd(),
  ...(B.gstin ? { taxID: B.gstin } : {}),
  sameAs: [site.channelUrl, site.links.gapistaan, site.links.ifa, site.links.instagram].filter(Boolean),
});
const crumbs = (items) => (siteUrl ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: A(p) })) }] : []);
const crumbNav = (...items) => `<nav class="crumbs" aria-label="${T('आप यहाँ हैं', 'You are here')}">${items.map(([n, p]) => (p ? `<a href="${p}">${esc(n)}</a>` : esc(n))).join(' / ')}</nav>`;

const waLink = () => `https://wa.me/${B.whatsapp}?text=${encodeURIComponent(T('नमस्ते PICHCHRAPA, मैं आपसे बात करना चाहता/चाहती हूँ।', 'Hello PICHCHRAPA, I would like to talk to you.'))}`;
const contactButtons = () => `<a class="btn btn-gold" href="mailto:${esc(B.email)}">${T('ईमेल भेजिए', 'Send an email')}</a><a class="btn btn-ghost" href="tel:${esc(B.phone)}">${T('कॉल कीजिए', 'Call us')}</a><a class="btn btn-ghost" href="${esc(waLink())}" target="_blank" rel="noopener">${T('WhatsApp पर लिखिए', 'Write on WhatsApp')}</a>`;

// English pages: every link to an internal page gets the /en prefix (assets and outside links stay as they are).
const INTERNAL = /href="(\/(?:filmy-adalat|raja-ka-baja|about|contact|privacy|video)\/[^"]*|\/(?:#[^"]*)?)"/g;
const localize = (html) => (LANG === 'en' ? html.replace(INTERNAL, (m, p) => `href="/en${p}"`) : html);

function layout({ title, description, pathName, image, type = 'website', ld = [], body, preload = [], noindex = false, bilingual = false }) {
  const url = noindex ? '' : A(pathName);
  image = image || abs('/img/og-home.jpg');
  const nav = [
    ['/filmy-adalat/', S.adalat.name],
    ['/raja-ka-baja/', S.raja.name],
    ['/about/', T('हमारी कहानी', 'Our story')],
    ['/contact/', T('संपर्क', 'Contact')],
  ].map(([h, l]) => `<a href="${h}"${h === pathName ? ' aria-current="page"' : ''}>${esc(l)}</a>`).join('');
  const alternates = siteUrl && !noindex
    ? `<link rel="alternate" hreflang="hi" href="${esc(abs(pathName))}">
<link rel="alternate" hreflang="en" href="${esc(abs('/en' + pathName))}">
<link rel="alternate" hreflang="x-default" href="${esc(abs(pathName))}">`
    : '';
  const altHref = LANG === 'en' ? pathName : '/en' + pathName;
  const langSwitch = bilingual ? '' : `<a class="lang" href="@@ALT@@" hreflang="${T('en', 'hi')}" lang="${T('en', 'hi')}" title="${T('Read this page in English', 'यह पेज हिंदी में पढ़ें')}">${T('English', 'हिंदी')}</a>`;
  const html = `<!doctype html>
<html lang="${T('hi', 'en')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${url ? `<link rel="canonical" href="${esc(url)}">` : ''}
${alternates}
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#052b2b">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/teko-devanagari-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/hind-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/teko-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload.map((u) => `<link rel="preload" as="image" href="${esc(u)}">`).join('\n')}
<meta property="og:site_name" content="PICHCHRAPA">
<meta property="og:locale" content="${T('hi_IN', 'en_IN')}">
${noindex ? '' : `<meta property="og:locale:alternate" content="${T('en_IN', 'hi_IN')}">`}
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${url ? `<meta property="og:url" content="${esc(url)}">` : ''}
${image ? `<meta property="og:image" content="${esc(image)}">\n<meta name="twitter:image" content="${esc(image)}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<script>document.documentElement.className+=' js'</script>
<style>${css}</style>
${ld.map(jsonLd).join('\n')}
</head>
<body>
<a class="skip" href="#main">${T('सीधे मुख्य हिस्से पर जाएँ', 'Skip to main content')}</a>
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="/" aria-label="${T('PICHCHRAPA होम', 'PICHCHRAPA home')}">${clapMark('clap-live')}<span class="brand-name">PICHCHRAPA</span></a>
    <nav class="topnav" aria-label="${T('मुख्य मेन्यू', 'Main menu')}">${nav}</nav>
    ${langSwitch}
    <a class="btn btn-gold btn-sm" href="${esc(site.subscribeUrl)}" target="_blank" rel="noopener">${T('YouTube<span class="hide-sm"> पर देखिए</span>', '<span class="hide-sm">Watch on </span>YouTube')}</a>
  </div>
</header>
${body}
<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand">${clapMark('clap-foot')}<span class="brand-name">PICHCHRAPA</span></div>
        <p>${T('अभिनेताओं के परिवार का स्टूडियो।', 'A studio run by a family of actors.')} ${esc(B.city)}${T('।', '.')}</p>
        <p>${esc(B.form)}${B.gstRegistered ? T(', GST पंजीकृत', ', GST registered') : ''}${B.gstin ? `${T('। ', '. ')}GSTIN: ${esc(B.gstin)}` : ''}</p>
      </div>
      <div>
        <h2>${T('सीरीज़', 'Series')}</h2>
        <ul>
          <li><a href="/filmy-adalat/">${esc(S.adalat.name)}</a></li>
          <li><a href="/raja-ka-baja/">${esc(S.raja.name)}</a></li>
          <li><a href="${esc(site.links.gapistaan)}">${T('गैपिस्तान', 'Gapistaan')}</a></li>
          <li><a href="${esc(site.channelUrl)}" target="_blank" rel="noopener">${T('YouTube चैनल', 'YouTube channel')}</a></li>
        </ul>
      </div>
      <div>
        <h2>${T('कंपनी', 'Company')}</h2>
        <ul>
          <li><a href="/about/">${T('हमारी कहानी', 'Our story')}</a></li>
          <li><a href="/contact/">${T('संपर्क', 'Contact')}</a></li>
          <li><a href="${esc(site.links.ifa)}">Indian Films Academy</a></li>
          <li><a href="/privacy/">${T('प्राइवेसी नीति', 'Privacy policy')}</a></li>
        </ul>
      </div>
      <div>
        <h2>${T('संपर्क', 'Contact')}</h2>
        <ul>
          <li><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></li>
          <li><a href="tel:${esc(B.phone)}">${esc(B.phoneLabel)}</a></li>
          <li>${esc(B.address || B.city)}</li>
        </ul>
      </div>
    </div>
    <div class="foot-base"><span>&copy; ${new Date().getFullYear()} PICHCHRAPA. ${T('सर्वाधिकार सुरक्षित।', 'All rights reserved.')}</span><span>${T('वीडियो YouTube से चलते हैं और अपने-आप यहाँ जुड़ते हैं।', 'Videos play from YouTube and are added here automatically.')}</span></div>
  </div>
</footer>
<script>${appJs}</script>
</body>
</html>
`;
  return localize(html).replace('@@ALT@@', altHref);
}

// ---------- pages ----------
const factsHtml = () => `<div class="facts" role="list">
  <div role="listitem"><b>${ch.subs ? count(ch.subs) : '-'}</b><span>${T('YouTube सब्सक्राइबर', 'YouTube subscribers')}</span></div>
  <div role="listitem"><b>${ch.views ? count(ch.views) + '+' : '-'}</b><span>${T('कुल व्यू', 'Total views')}</span></div>
  <div role="listitem"><b>${ch.videos || pageVids.length}</b><span>${T('वीडियो और शॉर्ट्स', 'Videos and Shorts')}</span></div>
</div>
<p class="muted facts-note">${T(`आँकड़े YouTube चैनल @pichchrapa से, ${hiDate(statsDate)} तक।`, `Figures from the YouTube channel @pichchrapa, as of ${hiDate(statsDate)}.`)}</p>`;

const reelSvg = `<svg class="bigreel" viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92"/><circle cx="100" cy="100" r="16"/><circle cx="100" cy="100" r="30" stroke-width="1.5"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${(100 + 56 * Math.cos((a * Math.PI) / 180)).toFixed(1)}" cy="${(100 + 56 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" r="19"/>`).join('')}<circle cx="100" cy="100" r="76" stroke-width="1.5"/></svg>`;

function creditsHtml() {
  const f = site.family;
  return `<div class="credits" role="group" aria-label="${esc(f.creditsTitle)}">
  <h3>${esc(f.creditsTitle)}</h3>
  <dl>${f.credits.map(([r, w]) => `<div><dt>${esc(r)}</dt><dd>${esc(w)}</dd></div>`).join('')}</dl>
  <p class="credits-note">${esc(f.creditsNote)}</p>
</div>`;
}
const founderHtml = () => `<div class="founder"><img src="/img/founder-yogesh-320.webp" width="64" height="64" loading="lazy" alt="${esc(B.founder)}"><p><b>${esc(B.founder)}</b><br>${T('संस्थापक, PICHCHRAPA और Indian Films Academy', 'Founder, PICHCHRAPA and Indian Films Academy')}</p></div>`;

function caseBlock(c, { limit = 0, grid = false } = {}) {
  const items = limit ? c.items.slice(0, limit) : c.items;
  const first = c.items.find((v) => v.primary) || c.items[0];
  const when = hiMonth(first.publishedAt);
  const name = caseName(c);
  return `<section class="case" aria-labelledby="case-${c.id}">
  <div class="case-h">${c.no ? `<span class="case-no" data-fx="once">${T('केस', 'Case')} ${c.no}</span>` : ''}<h3 id="case-${c.id}">${esc(name)}</h3><span class="muted">${esc(when)}, ${c.items.length} ${T('वीडियो', 'videos')}</span></div>
  ${grid ? `<div class="grid" style="margin-top:1.2rem">${items.map((v) => card(v)).join('\n')}</div>` : rail(items, name)}
</section>`;
}

const figImg = (p) => `<img src="${esc(p.src)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async" alt="${esc(p.alt)}">`;
const stripHtml = (items, cls, label) => `<div class="pstrip ${cls}" role="list" aria-label="${esc(label)}" tabindex="0">${items.map((p) => `<figure class="sp" role="listitem">${figImg(p)}${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ''}</figure>`).join('')}</div>`;

function behindHtml({ heading = true } = {}) {
  const st = site.studio, tm = site.team;
  if (!st && !tm) return '';
  return `<div class="studio">
    ${heading && st ? `<div class="studio-head"><h2 class="h2" id="studio-h">${esc(st.title)}</h2><p>${esc(st.lead)}</p></div>` : ''}
    ${tm && tm.main ? `<div class="team-grid">${tm.main.map((p, i) => `<figure class="sf t${i + 1}">${figImg(p)}<figcaption>${esc(p.cap)}</figcaption></figure>`).join('')}</div>` : ''}
    ${tm && tm.strip ? `<h3 class="h3 strip-h">${esc(tm.stripTitle)}</h3>${stripHtml(tm.strip, 'set-strip', tm.stripTitle)}` : ''}
    ${st && st.photos ? `<h3 class="h3 strip-h">${esc(st.subTitle)}</h3>
    <div class="studio-grid">${st.photos.map((p, i) => `<figure class="sf sf-${i + 1}">${figImg(p)}<figcaption>${esc(p.cap)}</figcaption></figure>`).join('')}</div>` : ''}
  </div>`;
}

const gapUrl = (p) => `https://gapistaan.com${T('', '/en')}${p}`;
function artistsInner() {
  const a = site.artists;
  if (!a || !a.items.length) return '';
  return `<div class="studio-head"><h2 class="h2" id="artists-h">${esc(a.title)}</h2><p>${esc(a.lead)}</p></div>
  <ul class="artists">${a.items.map((x) => `<li><a class="artist" href="${esc(x.href || gapUrl('/cast/' + x.slug + '/'))}"><img src="${esc(x.photo)}" width="400" height="500" loading="lazy" decoding="async" alt=""><span class="a-name">${esc(x.name)}</span>${x.note ? `<span class="a-note">${esc(x.note)}</span>` : ''}</a></li>`).join('')}</ul>
  <p class="more" style="text-align:left"><a class="btn btn-ghost" href="${esc(gapUrl('/cast/'))}">${esc(a.cta)}</a></p>`;
}

function oldMembersInner() {
  const tm = site.team;
  if (!tm || !tm.portraits || !tm.portraits.length) return '';
  const items = tm.portraits.map((p) => ({ ...p, alt: p.name ? T(p.name, p.nameEn || p.name) : T('परिवार के एक पुराने कलाकार का पोर्ट्रेट', "Portrait of one of the family's earlier artists"), cap: p.name ? T(p.name, p.nameEn || p.name) : '' }));
  return `<div class="studio-head old-members"><h2 class="h2" id="old-h">${esc(tm.portraitsTitle)}</h2>${tm.portraitsLead ? `<p>${esc(tm.portraitsLead)}</p>` : ''}</div>${stripHtml(items, 'face-strip', tm.portraitsTitle)}`;
}

const postersHtml = () => (site.posters && site.posters.items.length
  ? `<section class="case" aria-labelledby="posters-h"><div class="case-h"><h3 id="posters-h">${esc(site.posters.title)}</h3></div>${stripHtml(site.posters.items, 'poster-strip', site.posters.title)}</section>`
  : '');

function homePage() {
  const latest = rajaEps[0];
  const side = rajaEps.slice(1, 6);
  const homeCases = caseOrder.filter((c) => c.id !== 'general').slice(0, 4);
  const body = `<main id="main">
<section class="hero" id="top">
  <div class="hero-bg" aria-hidden="true"><span class="beam"></span></div>
  <div class="wrap hero-in">
    <div class="hero-text">
      <h1 class="hero-h1"><span class="rack">${esc(site.hero.h1a)}</span><span class="rack b">${esc(site.hero.h1b)}</span></h1>
      <p class="hero-lead">${esc(site.hero.lead)}</p>
      <div class="actions"><a class="btn btn-gold" href="#adalat">${T(`${esc(S.adalat.name)} देखिए`, `Watch ${esc(S.adalat.name)}`)}</a><a class="btn btn-ghost" href="#raja">${T(`${esc(S.raja.name)} देखिए`, `Watch ${esc(S.raja.name)}`)}</a></div>
      <p class="hero-fine">${esc(site.hero.fine)}</p>
    </div>
    <div class="hero-screen">
      <div class="screen" id="screen">
        <span class="perf perf-l" aria-hidden="true"></span><span class="perf perf-r" aria-hidden="true"></span>
        <div class="frame">
          <video id="intro" muted playsinline autoplay preload="auto" poster="/media/intro-poster.jpg" width="1100" height="803" disablepictureinpicture aria-label="${T('PICHCHRAPA का क्लैपर-बोर्ड इंट्रो', 'PICHCHRAPA clapperboard intro')}"><source src="/media/intro.mp4" type="video/mp4"></video>
          <div class="vf" aria-hidden="true"><i></i><i></i><i></i><i></i><span class="rec"><b></b>REC</span><span class="tc" id="tc">00:00:00:00</span><span class="spec">24 FPS</span></div>
          <button class="btn btn-gold btn-sm replay" id="replay" type="button" data-play="${T('इंट्रो चलाइए', 'Play the intro')}">${T('फिर से देखिए', 'Watch again')}</button>
        </div>
      </div>
    </div>
  </div>
  ${reelStrips()}
</section>

<section class="sec" aria-labelledby="family-h" style="padding-top:2.4rem">
  <div class="wrap">
    <div class="family">
      <div>
        <h2 class="h2" id="family-h">${esc(site.family.title)}</h2>
        ${site.family.paras.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
        <p class="why">${esc(site.family.why)}</p>
        ${founderHtml()}
        <p style="margin-top:1.2rem"><a href="/about/">${T('पूरी कहानी पढ़िए', 'Read the full story')}</a></p>
      </div>
      ${creditsHtml()}
    </div>
    ${factsHtml()}
  </div>
</section>

<section class="sec sec-alt adalat" id="adalat" aria-labelledby="adalat-h">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <div class="hrow" data-fx="once"><h2 class="h2 hrow-t" id="adalat-h"><span class="accent">${esc(S.adalat.name)}</span> <span class="muted subname">${esc(S.adalat.sub)}</span></h2>${gavelHtml}</div>
        <p>${esc(S.adalat.intro)}</p>
      </div>
      <a class="btn btn-ghost" href="/filmy-adalat/">${T('सारे केस देखिए', 'See all cases')}</a>
    </div>
    ${homeCases.map((c) => caseBlock(c, { limit: 8 })).join('\n')}
  </div>
</section>

<section class="sec raja" id="raja" aria-labelledby="raja-h">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <div class="hrow eqrow" data-fx="live">${eqHtml}<h2 class="h2 hrow-t" id="raja-h"><span class="accent">${esc(S.raja.name)}</span> <span class="muted subname">${esc(S.raja.sub)}</span></h2></div>
        <p>${esc(S.raja.intro)}</p>
      </div>
      <a class="btn btn-ghost" href="/raja-ka-baja/">${T('सारे एपिसोड', 'All episodes')} (${rajaEps.length})</a>
    </div>
    ${latest ? `<div class="feat-grid">
      <article class="feature">
        <div class="thumb"><img src="${esc(thumbOf(latest))}" width="640" height="360" alt="" decoding="async"><span class="play"></span><span class="live">${T('सबसे नया', 'Latest')}</span><span class="dur">${clock(latest.sec)}</span><a href="${esc(hrefOf(latest))}" style="position:absolute;inset:0;z-index:3" aria-label="${esc(vt(latest))}"></a></div>
        <div class="vbody"><a class="vtitle" href="${esc(hrefOf(latest))}">${esc(vt(latest))}</a><span class="vmeta">${esc(hiDate(latest.publishedAt))}</span></div>
      </article>
      <div class="latest" aria-label="${T('पिछले एपिसोड', 'Previous episodes')}">
        ${side.map((v) => `<a class="mini" href="${esc(hrefOf(v))}"><span class="thumb"><img src="${esc(smallThumb(v))}" width="128" height="72" loading="lazy" decoding="async" alt=""></span><span><b>${esc(trunc(vt(v), 70))}</b><span>${esc(hiDate(v.publishedAt))}</span></span></a>`).join('\n        ')}
      </div>
    </div>` : ''}
    ${hitShorts.length ? `<h3 class="h3 shorts-h">${T('हिट शॉर्ट्स', 'Hit Shorts')}</h3>
    <p class="muted">${T('सबसे ज़्यादा देखे गए शॉर्ट्स। किसी पर दबाइए, यहीं चल जाएगा।', 'The most-watched Shorts. Press one and it plays right here.')}</p>
    <div class="shorts" role="list" aria-label="${T('हिट शॉर्ट्स', 'Hit Shorts')}">${hitShorts.map(shortCard).join('')}</div>
    <p class="more"><a class="btn btn-ghost" href="${esc(site.shortsUrl)}" target="_blank" rel="noopener">${T('YouTube पर और शॉर्ट्स', 'More Shorts on YouTube')}</a></p>` : ''}
  </div>
</section>

<section class="sec" aria-labelledby="studio-h">
  <div class="wrap">${behindHtml()}</div>
</section>

<section class="sec sec-alt" aria-labelledby="artists-h">
  <div class="wrap">${artistsInner()}${oldMembersInner()}</div>
</section>

<section class="sec" aria-labelledby="brands-h">
  <div class="wrap">
    <h2 class="h2" id="brands-h">${esc(site.brands.title)}</h2>
    <div class="brands">${site.brands.items.map((b) => `<a class="brand-card" href="${esc(b.url)}"><img src="${esc(b.img)}" alt="" width="84" height="84" loading="lazy"><span><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p><span>${esc(b.cta)}</span></span></a>`).join('')}</div>
  </div>
</section>

<section class="sec sec-alt" aria-labelledby="co-h">
  <div class="wrap company">
    <div>
      <h2 class="h2" id="co-h">${esc(site.what.title)}</h2>
      <div class="what" style="margin-top:1.2rem">${site.what.items.map(([h, p]) => `<div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
    </div>
    <div>
      <h2 class="h2">${esc(site.company.title)}</h2>
      <p style="margin-top:.7rem">${esc(site.company.lead)}</p>
      ${companyFacts()}
    </div>
  </div>
</section>

<section class="sec" id="contact" aria-labelledby="contact-h" style="padding-top:0">
  <div class="wrap">
    <div class="contact">
      <div><h2 class="h2" id="contact-h">${esc(site.contact.title)}</h2><p>${esc(site.contact.lead)}</p></div>
      <div class="actions">${contactButtons()}</div>
    </div>
  </div>
</section>
</main>`;
  return layout({
    title: T('PICHCHRAPA | फ़िल्मी अदालत और राजा का बाजा बनाने वाला लखनऊ का प्रोडक्शन', 'PICHCHRAPA | Filmy Adalat and Raja Ka Baja, a Lucknow production run by actors'),
    description: T('PICHCHRAPA लखनऊ का फ़िल्म और वेब-सीरीज़ प्रोडक्शन है, जिसे अभिनेताओं का परिवार चलाता है। फ़िल्मी अदालत, राजा का बाजा और शॉर्ट्स यहाँ देखिए।', 'PICHCHRAPA is a film and web-series production house in Lucknow, run by a family of actors. Watch Filmy Adalat, Raja Ka Baja and Shorts here.'),
    pathName: '/',
    preload: ['/media/intro-poster.jpg'],
    ld: [orgLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'PICHCHRAPA', url: A('/'), inLanguage: T('hi', 'en'), publisher: { '@id': abs('/#org') } }],
    body,
  });
}

function companyFacts() {
  const rows = [
    [T('फ़र्म का नाम', 'Firm name'), 'PICHCHRAPA'],
    B.legalName ? [T('विधिक नाम (GST के अनुसार)', 'Legal name (as per GST)'), B.legalName] : null,
    [T('स्वरूप', 'Type'), B.form],
    ['GST', B.gstRegistered ? (B.gstin ? `${T('पंजीकृत', 'Registered')}, GSTIN ${B.gstin}` : T('पंजीकृत', 'Registered')) : null],
    [T('संस्थापक', 'Founder'), B.founder],
    [T('पता', 'Address'), B.address || B.city],
    [T('ईमेल', 'Email'), `<a href="mailto:${esc(B.email)}">${esc(B.email)}</a>`, true],
    [T('फ़ोन', 'Phone'), `<a href="tel:${esc(B.phone)}">${esc(B.phoneLabel)}</a>`, true],
  ].filter((r) => r && r[1]);
  return `<dl class="facts-list">${rows.map(([k, v, raw]) => `<dt>${esc(k)}</dt><dd>${raw ? v : esc(v)}</dd>`).join('')}</dl>`;
}

function adalatPage() {
  const first = adalatEps.filter((v) => v.primary).slice(-1)[0];
  const cs = liveCases.filter((c) => c.no).length;
  const body = `<main id="main" class="wrap page adalat">
${crumbNav(['PICHCHRAPA', '/'], [S.adalat.name])}
<div class="hrow" data-fx="once"><h1 class="page-h1 hrow-t"><span class="accent">${esc(S.adalat.name)}</span></h1>${gavelHtml}</div>
<p class="lede">${esc(S.adalat.pageIntro)}</p>
<p class="muted">${T(`${adalatEps.length} वीडियो, ${cs} केस${first ? `, पहला केस ${hiMonth(first.publishedAt)} में` : ''}।`, `${adalatEps.length} videos, ${cs} cases${first ? `, the first case in ${hiMonth(first.publishedAt)}` : ''}.`)}</p>
${caseOrder.map((c) => caseBlock(c, { grid: true })).join('\n')}
${otherEps.length ? `<section class="case" aria-labelledby="other-h"><div class="case-h"><h3 id="other-h">${esc(S.other.name)}</h3><span class="muted">${otherEps.length} ${T('वीडियो', 'videos')}</span></div><p class="muted" style="margin-top:.6rem">${esc(S.other.intro)}</p><div class="grid" style="margin-top:1.2rem">${otherEps.map((v) => card(v)).join('\n')}</div></section>` : ''}
${postersHtml()}
</main>`;
  return layout({
    title: T(`${S.adalat.name} (Filmy Adalat) | कोर्टरूम कॉमेडी वेब सीरीज़ | PICHCHRAPA`, `${S.adalat.name} | Courtroom comedy web series | PICHCHRAPA`),
    description: T('फ़िल्मी अदालत PICHCHRAPA की पहली वेब सीरीज़ है, एक कोर्टरूम कॉमेडी। पति पत्नी और वो, पाखी का स्वयंबर, जिन्न की आज़ादी और जीजा साले का तलाक देखिए।', 'Filmy Adalat is PICHCHRAPA\'s first web series, a courtroom comedy. Watch Pati Patni Aur Woh, Pakhi Ka Swayamvar, Jinn Ki Azaadi and Jija Saale Ka Talaaq.'),
    pathName: '/filmy-adalat/',
    ld: [
      ...crumbs([['PICHCHRAPA', '/'], [S.adalat.name, '/filmy-adalat/']]),
      { '@context': 'https://schema.org', '@type': 'TVSeries', name: S.adalat.name, alternateName: [...new Set([S.adalat.sub, 'Filmy Adalat', 'Filmy Adaalat', 'Filmi Adalat'])].filter((n) => n !== S.adalat.name), genre: 'Comedy', inLanguage: 'hi', url: A('/filmy-adalat/'), productionCompany: { '@id': abs('/#org') }, numberOfEpisodes: adalatEps.filter((v) => v.primary).length },
    ],
    body,
  });
}

function rajaPage() {
  const body = `<main id="main" class="wrap page raja">
${crumbNav(['PICHCHRAPA', '/'], [S.raja.name])}
<div class="hrow eqrow" data-fx="live">${eqHtml}<h1 class="page-h1 hrow-t"><span class="accent">${esc(S.raja.name)}</span></h1></div>
<p class="lede">${esc(S.raja.pageIntro)}</p>
<p class="muted">${T(`${rajaEps.length} एपिसोड और ${rajaShorts.length} शॉर्ट्स, ${hiMonth(rajaEps[rajaEps.length - 1].publishedAt)} से।`, `${rajaEps.length} episodes and ${rajaShorts.length} Shorts, since ${hiMonth(rajaEps[rajaEps.length - 1].publishedAt)}.`)}</p>
${hitShorts.length ? `<h2 class="h3 shorts-h">${T('हिट शॉर्ट्स', 'Hit Shorts')}</h2><div class="shorts" role="list" aria-label="${T('हिट शॉर्ट्स', 'Hit Shorts')}">${hitShorts.map(shortCard).join('')}</div>` : ''}
<h2 class="h2" style="margin-top:2.4rem">${T('सारे एपिसोड', 'All episodes')}</h2>
<div class="grid" id="eps" style="margin-top:1.2rem">${rajaEps.map((v, i) => card(v).replace('<article class="vcard">', `<article class="vcard"${i >= 24 ? ' hidden' : ''}>`)).join('\n')}</div>
${rajaEps.length > 24 ? `<p class="more"><button class="btn btn-gold" type="button" data-more="#eps">${T('और एपिसोड दिखाइए', 'Show more episodes')}</button></p>` : ''}
</main>`;
  return layout({
    title: T(`${S.raja.name} (Raja Ka Baja) | लखनऊ की स्ट्रीट कॉमेडी | PICHCHRAPA`, `${S.raja.name} | Street comedy from Lucknow | PICHCHRAPA`),
    description: T('राजा का बाजा, लखनऊ की सड़कों पर राजा और मंत्री की रोज़ की कॉमेडी। सारे एपिसोड और हिट शॉर्ट्स PICHCHRAPA पर देखिए।', 'Raja Ka Baja: everyday street comedy by the King and the Minister on the roads of Lucknow. Watch all episodes and hit Shorts on PICHCHRAPA.'),
    pathName: '/raja-ka-baja/',
    ld: [
      ...crumbs([['PICHCHRAPA', '/'], [S.raja.name, '/raja-ka-baja/']]),
      { '@context': 'https://schema.org', '@type': 'TVSeries', name: S.raja.name, alternateName: [...new Set([S.raja.sub, 'Raja Ka Baja', S.raja.alt, 'सड़क का राजा', 'Sadak Ka Raja'])].filter((n) => n !== S.raja.name), genre: 'Comedy', inLanguage: 'hi', url: A('/raja-ka-baja/'), productionCompany: { '@id': abs('/#org') }, numberOfEpisodes: rajaEps.length },
    ],
    body,
  });
}

function videoPage(v, i, list) {
  const seriesName = v.series === 'adalat' ? S.adalat.name : v.series === 'raja' ? S.raja.name : S.other.name;
  const seriesPath = v.series === 'adalat' ? '/filmy-adalat/' : v.series === 'raja' ? '/raja-ka-baja/' : '/filmy-adalat/';
  const group = v.series === 'adalat' ? (cases.find((c) => c.items.includes(v))?.items.filter((x) => x.hasPage) || []) : list.filter((x) => x.series === v.series);
  const mates = group.filter((x) => x.id !== v.id).slice(0, 6);
  const idx = group.findIndex((x) => x.id === v.id);
  const prev = v.series === 'adalat' ? group[idx - 1] : group[idx + 1]; // adalat: oldest first; others: newest first
  const next = v.series === 'adalat' ? group[idx + 1] : group[idx - 1];
  const title = vt(v);
  const desc = trunc(v.paras[0] || T(`${title}, ${seriesName} का एपिसोड, ${hiDate(v.publishedAt)} को PICHCHRAPA पर आया।`, `${title}, an episode of ${seriesName}, published on PICHCHRAPA on ${hiDate(v.publishedAt)}.`), 155);
  const body = `<main id="main" class="wrap narrow page ${v.series}">
${crumbNav(['PICHCHRAPA', '/'], [seriesName, seriesPath], [trunc(title, 60)])}
<div class="player"><button class="thumb" type="button" data-yt="${esc(v.id)}" data-title="${esc(title)}" aria-label="${T('चलाइए', 'Play')}: ${esc(title)}"><img src="${esc(thumbOf(v))}" width="1280" height="720" alt="" decoding="async"><span class="play"></span></button></div>
<h1 class="page-h1" style="margin-top:1.3rem;font-size:clamp(2rem,4.6vw,3.2rem)">${esc(title)}</h1>
<p class="ep-meta"><span>${esc(seriesName)}</span><span>${esc(hiDate(v.publishedAt))}</span><span>${clock(v.sec)}</span><a href="${esc(watchUrl(v))}" target="_blank" rel="noopener">${T('YouTube पर खोलिए', 'Open on YouTube')}</a></p>
<section class="prose">
${v.paras.length ? v.paras.map((p) => `<p>${esc(p)}</p>`).join('\n') : `<p>${esc(title)}${T(`, ${seriesName} का एपिसोड। पूरा वीडियो ऊपर चलाइए।`, `, an episode of ${seriesName}. Play the full video above.`)}</p>`}
<p>${T('ऐसे और वीडियो के लिए ', 'For more videos like this, ')}<a href="${esc(site.subscribeUrl)}" target="_blank" rel="noopener">${T('YouTube पर PICHCHRAPA को सब्सक्राइब कीजिए', 'subscribe to PICHCHRAPA on YouTube')}</a>${T('।', '.')}</p>
</section>
${prev || next ? `<div class="pn">${prev ? `<a href="/video/${prev.id}/"><small>${v.series === 'adalat' ? T('पिछला', 'Previous') : T('पुराना', 'Older')}</small>${esc(trunc(vt(prev), 70))}</a>` : '<span></span>'}${next ? `<a href="/video/${next.id}/"><small>${v.series === 'adalat' ? T('अगला', 'Next') : T('नया', 'Newer')}</small>${esc(trunc(vt(next), 70))}</a>` : '<span></span>'}</div>` : ''}
${mates.length ? `<h2 class="h3" style="margin-top:2.4rem">${v.series === 'adalat' ? T('इसी केस के और वीडियो', 'More videos from this case') : T(`${esc(seriesName)} के और एपिसोड`, `More episodes of ${esc(seriesName)}`)}</h2><div class="grid" style="margin-top:1rem">${mates.slice(0, 3).map((x) => card(x)).join('\n')}</div>` : ''}
</main>`;
  const video = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: v.paras.join(' ') || title,
    thumbnailUrl: [thumbOf(v), v.thumbs.high].filter(Boolean).filter((u, k, a) => a.indexOf(u) === k),
    uploadDate: v.publishedAt,
    duration: v.duration,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    contentUrl: watchUrl(v),
    inLanguage: 'hi',
    isFamilyFriendly: true,
    publisher: { '@id': abs('/#org') },
    ...(v.series !== 'other' ? { partOfSeries: { '@type': 'TVSeries', name: seriesName, url: A(seriesPath) } } : {}),
    ...(v.tags?.length ? { keywords: v.tags.slice(0, 12).join(', ') } : {}),
  };
  return layout({
    title: `${trunc(v.title.replace(/\s+/g, ' '), 78)} | PICHCHRAPA`,
    description: desc,
    pathName: `/video/${v.id}/`,
    image: thumbOf(v),
    type: 'video.other',
    ld: [...crumbs([['PICHCHRAPA', '/'], [seriesName, seriesPath], [title, `/video/${v.id}/`]]), video],
    body,
  });
}

function aboutPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(['PICHCHRAPA', '/'], [T('हमारी कहानी', 'Our story')])}
<h1 class="page-h1">${T('हमारी कहानी', 'Our story')}</h1>
<p class="lede">${T('PICHCHRAPA अभिनेताओं के एक परिवार का स्टूडियो है। यहाँ कलाकार सिर्फ़ पर्दे पर नहीं, कैमरे के पीछे भी वही हैं।', 'PICHCHRAPA is the studio of a family of actors. Here the artists are not only on screen; behind the camera, they are the same people.')}</p>
<div class="family" style="margin-top:2rem">
  <div class="prose">
    <h2>${esc(site.family.title)}</h2>
    ${site.family.paras.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    <p class="why" style="border-left:3px solid var(--brass);padding-left:1.1rem;color:#fff">${esc(site.family.why)}</p>
    <h2>${T('कैसे काम होता है', 'How the work happens')}</h2>
    <p>${T('हर सीरीज़ की कहानी, निर्देशन, एडिटिंग, कलर और संगीत परिवार के कलाकार ख़ुद करते हैं। फ़िल्मी अदालत हमारी पहली वेब सीरीज़ थी। आज राजा का बाजा हर रोज़ आता है, और गैपिस्तान जैसी नई सीरीज़ भी इसी परिवार से निकल रही हैं।', 'Each series\' story, direction, editing, colour and music are done by the family\'s artists themselves. Filmy Adalat was our first web series. Today Raja Ka Baja arrives every day, and new series like Gapistaan are coming out of this same family.')}</p>
    <h2>${esc(site.studio ? site.studio.title : T('स्टूडियो', 'Studio'))}</h2>
    <p>${esc(site.studio ? site.studio.lead : '')}</p>
    <h2>${T('संस्थापक', 'Founder')}</h2>
    ${founderHtml()}
    <p style="margin-top:1rem">${T('योगेश चैतन्य अभिनय-गुरु, निर्देशक और अभिनेता हैं और Indian Films Academy के संस्थापक हैं। PICHCHRAPA के कलाकार उन्हीं के सिखाए हुए अभिनेता हैं।', 'Yogesh Chaitanya is an acting teacher, director and actor, and the founder of Indian Films Academy. PICHCHRAPA\'s artists are actors he has trained.')}</p>
  </div>
  <div>${creditsHtml()}</div>
</div>
<section style="margin-top:2.2rem" aria-label="${T('स्टूडियो की तस्वीरें', 'Studio photos')}">${behindHtml({ heading: false })}</section>
<section style="margin-top:2.4rem" aria-labelledby="artists-h">${artistsInner()}${oldMembersInner()}</section>
<section class="prose" style="margin-top:2.4rem"><h2>${esc(site.company.title)}</h2><p>${esc(site.company.lead)}</p>${companyFacts()}</section>
<div class="actions" style="margin-top:2rem"><a class="btn btn-gold" href="/filmy-adalat/">${T(`${esc(S.adalat.name)} देखिए`, `Watch ${esc(S.adalat.name)}`)}</a><a class="btn btn-ghost" href="/raja-ka-baja/">${T(`${esc(S.raja.name)} देखिए`, `Watch ${esc(S.raja.name)}`)}</a><a class="btn btn-ghost" href="/contact/">${T('संपर्क कीजिए', 'Get in touch')}</a></div>
</main>`;
  return layout({
    title: T('हमारी कहानी | अभिनेताओं का परिवार, PICHCHRAPA', 'Our story | A family of actors, PICHCHRAPA'),
    description: T('PICHCHRAPA में अभिनेता ही लेखक, निर्देशक, एडिटर, DI कलरिस्ट और संगीतकार हैं। Indian Films Academy से तैयार हुए कलाकारों के परिवार की कहानी।', 'At PICHCHRAPA the actors are the writers, directors, editors, DI colourists and composers. The story of a family of artists trained at Indian Films Academy.'),
    pathName: '/about/',
    ld: crumbs([['PICHCHRAPA', '/'], [T('हमारी कहानी', 'Our story'), '/about/']]),
    body,
  });
}

function contactPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(['PICHCHRAPA', '/'], [T('संपर्क', 'Contact')])}
<h1 class="page-h1">${T('संपर्क', 'Contact')}</h1>
<p class="lede">${esc(site.contact.lead)}</p>
<div class="actions">${contactButtons()}</div>
<section class="prose" style="margin-top:2rem"><h2>PICHCHRAPA</h2>${companyFacts()}</section>
</main>`;
  return layout({
    title: T('संपर्क | PICHCHRAPA, लखनऊ', 'Contact | PICHCHRAPA, Lucknow'),
    description: T('PICHCHRAPA से ईमेल, फ़ोन या WhatsApp पर बात कीजिए। ब्रांड-कोलैब, प्रोडक्शन और नए प्रोजेक्ट के लिए।', 'Reach PICHCHRAPA by email, phone or WhatsApp for brand collaborations, production and new projects.'),
    pathName: '/contact/',
    ld: crumbs([['PICHCHRAPA', '/'], [T('संपर्क', 'Contact'), '/contact/']]),
    body,
  });
}

function privacyPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(['PICHCHRAPA', '/'], [T('प्राइवेसी', 'Privacy')])}
<h1 class="page-h1">${T('प्राइवेसी नीति', 'Privacy policy')}</h1>
<section class="prose">
<p>${T('pichchrapa.com पर हम आपसे नाम, फ़ोन या ईमेल जैसी कोई निजी जानकारी नहीं माँगते और न जमा करते हैं।', 'On pichchrapa.com we do not ask for or collect any personal information such as your name, phone number or email.')}</p>
<p>${T('वीडियो के थंबनेल YouTube के सर्वर (i.ytimg.com) से आते हैं, इसलिए पेज खुलने पर YouTube को आपका IP एड्रेस दिख सकता है। वीडियो या शॉर्ट पर दबाने से पहले YouTube का प्लेयर लोड नहीं होता। दबाने के बाद वीडियो youtube-nocookie.com के प्लेयर में चलता है, और YouTube (Google) अपनी नीति के अनुसार जानकारी इस्तेमाल कर सकता है।', 'Video thumbnails come from YouTube\'s servers (i.ytimg.com), so YouTube may see your IP address when a page opens. The YouTube player does not load until you press a video or a Short. After you press, the video plays in a youtube-nocookie.com player, and YouTube (Google) may use information as per its own policy.')}</p>
<p>${T('ईमेल, फ़ोन या WhatsApp के बटन सिर्फ़ आपका ईमेल ऐप, फ़ोन या WhatsApp खोलते हैं। आप जो भेजते हैं, वह सीधे हमारे पास आता है और सिर्फ़ आपको जवाब देने के लिए इस्तेमाल होता है।', 'The email, phone and WhatsApp buttons only open your email app, phone or WhatsApp. Whatever you send comes straight to us and is used only to reply to you.')}</p>
<p>${T('किसी भी सवाल के लिए लिखिए', 'For any question, write to')}: <a href="mailto:${esc(B.email)}">${esc(B.email)}</a></p>
<p class="muted">${T('आख़िरी बदलाव', 'Last updated')}: ${esc(hiDate(new Date().toISOString()))}</p>
</section>
</main>`;
  return layout({
    title: T('प्राइवेसी नीति | PICHCHRAPA', 'Privacy policy | PICHCHRAPA'),
    description: T('pichchrapa.com की प्राइवेसी नीति: हम कोई निजी जानकारी नहीं लेते; वीडियो YouTube के प्लेयर में चलते हैं।', 'Privacy policy of pichchrapa.com: we collect no personal information; videos play in YouTube\'s player.'),
    pathName: '/privacy/',
    ld: crumbs([['PICHCHRAPA', '/'], [T('प्राइवेसी', 'Privacy'), '/privacy/']]),
    body,
  });
}

// The one 404 page is served for every address, so it speaks both languages.
function notFoundPage() {
  return layout({
    title: 'यह पन्ना नहीं मिला | Page not found | PICHCHRAPA',
    description: 'यह पन्ना PICHCHRAPA की वेबसाइट पर नहीं है। This page is not on the PICHCHRAPA website.',
    pathName: '/404',
    noindex: true,
    bilingual: true,
    body: `<main id="main" class="wrap lost"><img src="/img/logo-520.webp" alt="" width="320" height="251"><h1 class="page-h1">यह पन्ना यहाँ नहीं है<br><span lang="en">This page is not here</span></h1><p style="margin:0 auto 1.4rem">हो सकता है लिंक पुराना हो। सारी सीरीज़ होम पेज पर हैं।<br><span lang="en">The link may be old. All the series are on the home page.</span></p><p class="actions" style="justify-content:center"><a class="btn btn-gold" href="/">होम पेज पर जाइए</a><a class="btn btn-ghost" href="/en/">Go to the English home page</a></p></main>`,
  });
}

// ---------- write ----------
async function page(rel, html) {
  const dir = path.join(out, rel);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
if (existsSync(path.join(root, 'public'))) await cp(path.join(root, 'public'), out, { recursive: true });

async function buildLang(lang) {
  setLang(lang);
  const pre = lang === 'en' ? 'en/' : '';
  await page(pre.replace(/\/$/, ''), homePage());
  await page(`${pre}filmy-adalat`, adalatPage());
  await page(`${pre}raja-ka-baja`, rajaPage());
  await page(`${pre}about`, aboutPage());
  await page(`${pre}contact`, contactPage());
  await page(`${pre}privacy`, privacyPage());
  for (const [i, v] of pageVids.entries()) await page(`${pre}video/${v.id}`, videoPage(v, i, pageVids));
}
await buildLang('en');
await buildLang('hi'); // last, so the 404 page below is rendered in Hindi mode
await writeFile(path.join(out, '404.html'), notFoundPage());

if (siteUrl) {
  const newest = vids[0]?.publishedAt;
  const urls = [
    { p: '/', lastmod: newest },
    { p: '/filmy-adalat/', lastmod: adalatEps[0]?.publishedAt },
    { p: '/raja-ka-baja/', lastmod: rajaEps[0]?.publishedAt },
    { p: '/about/' },
    { p: '/contact/' },
    ...pageVids.map((v) => ({ p: `/video/${v.id}/`, lastmod: v.publishedAt })),
    { p: '/privacy/' },
  ];
  // Each page is listed in both languages, each entry pointing at its alternate (hreflang).
  const entry = (u, lang) => {
    const loc = lang === 'en' ? '/en' + u.p : u.p;
    return `  <url><loc>${esc(abs(loc))}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}<xhtml:link rel="alternate" hreflang="hi" href="${esc(abs(u.p))}"/><xhtml:link rel="alternate" hreflang="en" href="${esc(abs('/en' + u.p))}"/><xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(u.p))}"/></url>`;
  };
  await writeFile(
    path.join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.flatMap((u) => [entry(u, 'hi'), entry(u, 'en')]).join('\n')}\n</urlset>\n`,
  );
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
} else {
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n`);
}
const files = await readdir(out, { recursive: true });
console.log(`pichchrapa/dist तैयार: ${adalatEps.length} फ़िल्मी अदालत, ${rajaEps.length} राजा का बाजा, ${rajaShorts.length} शॉर्ट्स, ${pageVids.length} वीडियो पेज x 2 भाषाएँ, ${files.length} फ़ाइलें`);
