// Builds the site into dist/ from content/site.json + data/videos.json, in two languages:
// Hindi at the root (/) and English under /en/. No dependencies: run with `node scripts/build.mjs`.
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');

const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const en = JSON.parse(await readFile(path.join(root, 'content/en.json'), 'utf8'));
const gift = JSON.parse(await readFile(path.join(root, 'content/gift.json'), 'utf8'));
const data = JSON.parse(await readFile(path.join(root, 'data/videos.json'), 'utf8'));
const css = (await readFile(path.join(root, 'src/styles.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n+/g, '\n');
const siteUrl = (process.env.SITE_URL || site.siteUrl || '').trim().replace(/\/+$/, '');
const abs = (p) => (siteUrl ? siteUrl + p : '');

// ---------- language ----------
// Every page function reads LANG, so build('hi') and build('en') render the same templates.
let LANG = 'hi';
const T = (hi, eng) => (LANG === 'en' ? eng : hi);
const lp = (p) => (LANG === 'en' ? '/en' + p : p); // path of a page in the current language
const A = (p) => abs(lp(p));
const G = () => gift[LANG];
let S = site; // site texts in the current language

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const dateFmt = {
  hi: new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }),
  en: new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }),
};
const hiDate = (iso) => dateFmt[LANG].format(new Date(iso));

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
const minutes = (sec) => {
  const n = Math.max(1, Math.round(sec / 60));
  return T(`${n} मिनट`, `${n} min`);
};

const BRAND = /^(gapistaan|gapistan|गैपिस्तान|गपिस्तान)$/i;
// "Gen Gap Comedy" / "Gen Gap Full Comedy" tags from YouTube titles: the site adds "Gen Gap EP 0x" itself.
const SERIES_TAG = /\s*[-–—|]?\s*gen\s*gap\s*(full\s*)?comedy\s*$/i;
function cleanTitle(title) {
  const parts = title.split('|').map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const kept = parts.filter((p) => !BRAND.test(p)).map((p) => p.replace(SERIES_TAG, '').trim()).filter(Boolean);
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
    if (/^\s*📅/.test(line)) continue; // old schedule lines in YouTube descriptions; the site shows the current one
    const m = TS.exec(line);
    if (m) chapters.push({ t: toSec(m[1]), label: m[2] });
    else body.push(line);
  }
  while (body.length && !body[0].trim()) body.shift();
  if (body.length && norm(body[0]) === norm(v.title)) body.shift();
  const paragraphs = body
    .join('\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    // On the website, drop YouTube-only clutter: hashtag lines and "a | b | c | d" keyword lists.
    .filter((p) => !/^(#\S+\s*)+$/.test(p) && !(p.split('|').length >= 4 && /^[\x00-\x7F\s]+$/.test(p)));
  const validChapters = chapters.length >= 2 && chapters[0].t === 0 ? chapters : [];
  return { paragraphs, chapters: validChapters };
}

function summary(v, paragraphs, max = 155) {
  // English pages summarise only from the hand-written English text; the YouTube description is Hindi/Hinglish.
  const candidates =
    LANG === 'en'
      ? paragraphs.map((p) => p.replace(/\s+/g, ' ').trim()).filter((p) => p.length >= 40)
      : paragraphs
          .map((p) => p.split('\n').filter((l) => !BOILER.test(l.trim())).join(' ').trim())
          .filter((p) => p.length >= 40 && !/^[\x00-\x7F]+$/.test(p)); // prefer Hindi prose over the Hinglish/English blocks
  let text =
    candidates[0] ||
    T(`गैपिस्तान का एपिसोड "${cleanTitle(v.title)}"। चाचा बनाम Gen Z की improvised हिंदी कॉमेडी।`, `Gapistaan episode "${cleanTitle(v.title)}". Improvised Hindi comedy: Chacha vs Gen Z.`);
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

// Optional hand-written text per episode: content/episodes/<videoId>.md (Hindi) and <videoId>.en.md (English).
async function customText(id, lang) {
  const f = path.join(root, 'content/episodes', lang === 'en' ? `${id}.en.md` : `${id}.md`);
  if (!existsSync(f)) return [];
  return (await readFile(f, 'utf8')).split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p && !p.startsWith('<!--'));
}

// ---------- data ----------
const all = [...(data.videos || [])].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
const episodes = all.filter((v) => !v.isShort).map((v, i) => ({ ...v, n: i + 1 }));
const shorts = all.filter((v) => v.isShort).reverse();
const newestFirst = [...episodes].reverse();
const customs = { hi: {}, en: {} };
for (const ep of episodes) {
  ep.sec = seconds(ep.duration);
  ep.clean = cleanTitle(ep.title);
  ep.path = `/video/${ep.id}/`;
  Object.assign(ep, parseDescription(ep));
  customs.hi[ep.id] = await customText(ep.id, 'hi');
  customs.en[ep.id] = await customText(ep.id, 'en');
}

// People: the creator plays Chacha in every episode; the rest are matched by name in the episode credits.
// The English view swaps in the English name, role, bio and facts from content/en.json.
const baseCreator = { ...site.creator, path: '/creator/' };
const baseCast = (site.cast || []).map((c) => ({ ...c, path: `/cast/${c.slug}/` }));
let creator, cast, faq;
const DEFAULT_CHIP = '2-year cinematic acting course at IFA';
function localizePerson(p, isCreator) {
  if (LANG !== 'en') return { ...p, nameHi: p.name };
  const o = isCreator ? en.creator : en.cast[p.slug] || {};
  const L = en.labels;
  const facts = isCreator
    ? o.facts
    : [['Training', L.trained], ['Experience', L.experience], ...(o.selected ? [['Selected work', o.selected]] : []), ['In Gapistaan', L.inGapistaan]];
  return { ...p, nameHi: p.name, name: p.nameEn, role: o.role || L.role, bio: o.bio, credits: o.credits || [DEFAULT_CHIP], facts };
}
const initials = (p) => [...p.name][0];
const photoSet = (p) => (p.photos || []).map((id) => ({ src: `/img/cast/${id}.webp`, small: `/img/cast/${id}-s.webp` }));

// FAQ answers may use {schedule}, {email}, {phone} so they never drift from the rest of the site.
const biz = () => ({ ...(site.business || {}), ...(LANG === 'en' ? en.business : {}) });
const fillTokens = (s) => {
  const b = site.business || {};
  return s
    .replace(/\{schedule\}/g, S.schedule || '')
    .replace(/\{email\}/g, site.contactEmail || b.email || '')
    .replace(/\{phone\}/g, b.phoneLabel || b.phone || '');
};

function setLang(lang) {
  LANG = lang;
  S = lang === 'en' ? { ...site, ...en.site } : site;
  creator = localizePerson(baseCreator, true);
  cast = baseCast.map((c) => localizePerson(c, false));
  for (const c of cast) {
    // YouTube credits may use an older spelling of the name, so every spelling in `match` counts too.
    const names = [c.nameEn, ...(c.match || [])].map((n) => n.toLowerCase());
    c.episodes = newestFirst.filter((ep) => names.some((n) => (ep.description || '').toLowerCase().includes(n)));
  }
  creator.episodes = newestFirst;
  for (const p of [creator, ...cast]) {
    p.pics = photoSet(p);
    p.photo = p.pics.length ? p.pics[0].src : '';
  }
  for (const ep of episodes) {
    ep.custom = customs[lang][ep.id] || [];
    // The YouTube description is Hindi/Hinglish: English pages keep only its English-script paragraphs (credits, links).
    ep.paras = lang === 'en' ? ep.paragraphs.filter((x) => !/[\u0900-\u097F]/.test(x)) : ep.paragraphs;
    ep.summary = summary(ep, lang === 'en' ? ep.custom : [...ep.custom, ...ep.paragraphs]);
  }
  faq = (S.faq || []).map(([q, a]) => [q, fillTokens(a)]);
}

const imgTag = (pic, alt, sizes, extra = '') =>
  `<img src="${esc(pic.small)}" srcset="${esc(pic.small)} 400w, ${esc(pic.src)} 800w" sizes="${sizes}" alt="${esc(alt)}" width="400" height="500" ${extra || 'loading="lazy" decoding="async"'}>`;
const creditList = (p) => (p.credits?.length ? `<ul class="credits" aria-label="${T('चुनिंदा काम', 'Selected work')}">${p.credits.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
const factsBlock = (p, title, id) =>
  p.facts?.length ? `<section class="block" aria-labelledby="${id}">
  <h2 class="h2" id="${id}">${title}</h2>
  <dl class="facts">${p.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
</section>` : '';
const galleryBlock = (p) =>
  p.pics.length > 1 ? `<section class="block" aria-labelledby="gal-h">
  <h2 class="h2" id="gal-h">${T('तस्वीरें', 'Photos')}</h2>
  <ul class="gallery">${p.pics.slice(1).map((x, i) => `<li>${imgTag(x, `${p.name}, ${T('तस्वीर', 'photo')} ${i + 2}`, '(min-width: 44rem) 22vw, 45vw')}</li>`).join('')}</ul>
</section>` : '';
const portrait = (p, fallback) =>
  p.pics.length ? imgTag(p.pics[0], p.name, '(min-width: 52rem) 20rem, 78vw', 'fetchpriority="high"').replace('<img ', '<img class="profile-pic" ') : fallback;

const epLabel = (n) => `EP ${String(n).padStart(2, '0')}`;

// WhatsApp: YouTube link first, so the chat shows the YouTube preview and a tap opens the YouTube app.
const shareMessage = (ep) =>
  `${ep.clean}\n\n${T('गैपिस्तान पर देखिए', 'Watch it on Gapistaan')}: https://youtu.be/${ep.id}` + (siteUrl ? `\n${T('सारे एपिसोड', 'All episodes')}: ${A('/')}` : '');
const waLink = (ep) => `https://wa.me/?text=${encodeURIComponent(shareMessage(ep))}`;

// ---------- structured data shared across pages ----------
const production = { '@type': 'Organization', name: site.presents || site.production, url: site.presentsUrl || undefined };
const personLd = (p, extra = {}) => ({
  '@type': 'Person',
  name: p.nameEn,
  alternateName: [p.nameHi, ...(p.aka || []), ...(p.match || [])],
  ...(siteUrl ? { url: A(p.path) } : {}),
  ...extra,
});
const seriesLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'TVSeries',
  name: 'Gen Gap',
  alternateName: ['Gapistaan', 'गैपिस्तान', 'जेन गैप'],
  ...(siteUrl ? { url: A('/') } : {}),
  inLanguage: 'hi',
  genre: ['Comedy', 'Satire'],
  description: site.aboutEn,
  numberOfEpisodes: episodes.length,
  creator: personLd(creator),
  director: personLd(creator),
  actor: [personLd(creator), ...cast.map((c) => personLd(c))],
  productionCompany: production,
  ...(siteUrl ? { image: abs('/img/og-home.jpg') } : {}),
});

const crumbsLd = (items) =>
  siteUrl
    ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: A(p) })) }]
    : [];

// ---------- layout ----------
const navItems = () => [
  ['/episodes/', T('एपिसोड', 'Episodes')],
  ['/cast/', T('कलाकार', 'Cast')],
  ['/creator/', T('क्रिएटर', 'Creator')],
  ['/about/', T('बारे में', 'About')],
  ['/#contact', T('संपर्क', 'Contact')],
  ['/support/', G().nav, 'gift-link'],
];

// English pages: every link to an internal page gets the /en prefix (assets and the YouTube links stay as they are).
const INTERNAL = /href="(\/(?:episodes|cast|creator|about|privacy|terms|support|video)\/[^"]*|\/(?:#[^"]*)?)"/g;
const localize = (html) => (LANG === 'en' ? html.replace(INTERNAL, (m, p) => `href="/en${p}"`) : html);

function layout({ title, description, pathName, image, type = 'website', ld = [], body, preloadImage, noindex = false, bilingual = false }) {
  const url = A(pathName);
  image = image || (siteUrl ? abs('/img/og-home.jpg') : null);
  const nav = navItems().map(([href, label, cls]) => `<a${cls ? ` class="${cls}"` : ''} href="${href}"${href === pathName ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const b = biz();
  const alternates = siteUrl && !noindex
    ? `<link rel="alternate" hreflang="hi" href="${esc(abs(pathName))}">
<link rel="alternate" hreflang="en" href="${esc(abs('/en' + pathName))}">
<link rel="alternate" hreflang="x-default" href="${esc(abs(pathName))}">`
    : '';
  // The language switch points at the same page in the other language.
  const altHref = LANG === 'en' ? pathName : '/en' + pathName;
  const langSwitch = noindex && bilingual ? '' : `<a class="lang" href="@@ALT@@" hreflang="${T('en', 'hi')}" lang="${T('en', 'hi')}" title="${T('Read this page in English', 'यह पेज हिंदी में पढ़ें')}">${T('English', 'हिंदी')}</a>`;
  const html = `<!doctype html>
<html lang="${T('hi', 'en')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${url ? `<link rel="canonical" href="${esc(url)}">` : ''}
${alternates}
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="#0B1D24">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/img/favicon-64.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/mukta-devanagari-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
${preloadImage ? `<link rel="preload" as="image" href="${esc(preloadImage)}">` : ''}
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:locale" content="${T('hi_IN', 'en_IN')}">
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
<a class="skip" href="#main">${T('सीधे मुख्य हिस्से पर जाएँ', 'Skip to the main content')}</a>
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="/"><img src="/img/logo-96.webp" alt="" width="40" height="40"><span class="brand-name">Gapistaan</span></a>
    <nav class="topnav" aria-label="${T('मुख्य मेन्यू', 'Main menu')}">${nav}</nav>
    ${langSwitch}
    <a class="btn btn-primary btn-sm" href="${esc(site.subscribeUrl)}">${T('सब्सक्राइब करें', 'Subscribe')}</a>
  </div>
</header>
${body}
<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <div class="foot-brand"><img src="/img/logo-96.webp" alt="" width="44" height="44" loading="lazy"><span>Gapistaan</span></div>
      <p>${T('Gen Gap हिंदी कॉमेडी सीरीज़ का घर।', 'Home of the Gen Gap Hindi comedy series.')}</p>
      <p>${T(`${esc(site.presents)} की पेशकश, ${esc(b.city || 'लखनऊ')}`, `Presented by ${esc(site.presents)}, ${esc(b.city || 'Lucknow')}`)}</p>
    </div>
    <div>
      <h2>${T('साइट', 'Site')}</h2>
      <ul>
        <li><a href="/episodes/">${T('सारे एपिसोड', 'All episodes')}</a></li>
        <li><a href="/cast/">${T('कलाकार', 'Cast')}</a></li>
        <li><a href="/creator/">${T('क्रिएटर', 'Creator')}: ${esc(creator.name)}</a></li>
        <li><a href="/about/">${T('गैपिस्तान के बारे में', 'About Gapistaan')}</a></li>
        <li class="gift-only"><a href="/support/">${esc(G().nav)}</a></li>
        <li><a href="/privacy/">${T('प्राइवेसी', 'Privacy')}</a></li>
        <li><a href="/terms/">${T('नियम और वापसी नीति', 'Terms and refunds')}</a></li>
      </ul>
    </div>
    <div>
      <h2>${T('हमें फ़ॉलो करें', 'Follow us')}</h2>
      <ul>
        <li><a href="${esc(site.channelUrl)}">YouTube: @gapistaan</a></li>
        <li><a href="${esc(site.instagramUrl)}">Instagram: @gapistaan</a></li>
        ${(site.brands || []).map((x) => `<li><a href="${esc(x.url || x.youtube)}">${esc(x.name)}</a></li>`).join('\n        ')}
      </ul>
    </div>
    ${b.email || b.phone ? `<div>
      <h2>${T('बिज़नेस और कोलैब', 'Business and collabs')}</h2>
      <ul>
        ${site.contactEmail ? `<li><a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a></li>` : ''}
        ${b.email ? `<li><a href="mailto:${esc(b.email)}">${esc(b.email)}</a></li>` : ''}
        ${b.phone ? `<li><a href="tel:${esc(b.phone)}">${esc(b.phoneLabel || b.phone)}</a></li>` : ''}
      </ul>
    </div>` : ''}
  </div>
  <div class="wrap foot-bottom">
    <span>© ${new Date().getFullYear()} ${esc(site.production)}. ${T('सर्वाधिकार सुरक्षित।', 'All rights reserved.')}</span>
    <span>Gapistaan is a part of ${esc(site.production)}.</span>
  </div>
</footer>
${PAGE_JS}
${site.cfAnalyticsToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${esc(site.cfAnalyticsToken)}"}'></script>` : ''}
</body>
</html>
`;
  return localize(html).replace('@@ALT@@', altHref);
}

function shareButtons(ep, { stage = false } = {}) {
  const id = (k) => (stage ? ` id="stage-${k}"` : '');
  return `<div class="actions">
        <a class="btn btn-primary"${id('yt')} href="https://www.youtube.com/watch?v=${ep.id}">${T('YouTube पर देखें', 'Watch on YouTube')}</a>
        <a class="btn btn-wa"${id('wa')} href="${waLink(ep)}">${T('WhatsApp पर भेजें', 'Share on WhatsApp')}</a>
        <button class="btn btn-ghost js-share"${id('share')} type="button" hidden data-title="${esc(ep.clean)}" data-text="${esc(shareMessage(ep))}">${T('और जगह शेयर करें', 'Share elsewhere')}</button>
      </div>`;
}

// The applause box: a ticket-stub amount picker that opens Razorpay Checkout.
// variant: 'home' (full), 'episode' (short, no form fields), 'cast' (for one actor).
function giftBox({ variant = 'home', person = null, id = 'gift', pageName = '' } = {}) {
  const g = G();
  const fill = (s) => s.replace(/\{name\}/g, person ? person.name : '');
  const title = variant === 'cast' ? fill(g.castTitle) : variant === 'episode' ? g.episodeTitle : g.title;
  const text = variant === 'cast' ? fill(g.castText) : variant === 'episode' ? g.episodeText : g.text;
  const msgs = { opening: g.opening, verifying: g.verifying, thanks: g.thanks, failed: g.failed, offline: g.offline, amountErr: g.amountErr, desc: g.desc, min: gift.min };
  const first = gift.amounts[1].amt;
  const fields = variant === 'episode'
    ? ''
    : `<div class="gift-fields">
      <label>${esc(g.nameLabel)}<input name="gname" maxlength="60" autocomplete="name"></label>
      <label>${esc(g.msgLabel)}<textarea name="gmsg" rows="2" maxlength="200"></textarea></label>
    </div>`;
  return `<aside class="gift gift-${variant}" id="${id}" aria-labelledby="${id}-h" data-t="${esc(JSON.stringify(msgs))}" data-who="${esc(person ? person.nameEn : '')}" data-page="${esc(pageName)}">
  <div class="gift-body">
    <h2 class="gift-h" id="${id}-h">${esc(title)}</h2>
    <p class="gift-text">${esc(text)}</p>
    <ul class="stubs">${gift.amounts.map((a) => `<li><button type="button" class="stub${a.amt === first ? ' is-on' : ''}" data-amt="${a.amt}"><b>₹${a.amt}</b><span>${esc(a[LANG])}</span></button></li>`).join('')}</ul>
    ${fields}
    <p class="gift-own"><label>${esc(g.otherLabel)} <span class="rs">₹<input name="amt" inputmode="numeric" pattern="[0-9]*" value="${first}" aria-label="${esc(g.otherLabel)}"></span></label><button type="button" class="btn btn-gold gift-go">${esc(g.btn)}</button></p>
    <p class="pay-status" role="status" aria-live="polite"></p>
    <p class="fine">${esc(g.payInfo)} ${esc(g.fine)} <a href="/terms/">${esc(g.termsLink)}</a></p>
  </div>
</aside>`;
}

// Shared behaviour: click-to-play thumbnails, the home slider, chapters, and the phone's share sheet.
const PAGE_JS = `<script>
(function(){
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function player(id,title,start){
    var f=document.createElement('iframe');
    f.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1'+(start?'&start='+start:'');
    f.title=title||'YouTube';
    f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen=true;
    f.className='inline-player';
    return f;
  }
  document.querySelectorAll('.js-play').forEach(function(a){
    a.addEventListener('click',function(e){ e.preventDefault(); a.replaceWith(player(a.getAttribute('data-id'),a.getAttribute('data-title'))); });
  });

  var dataEl=document.getElementById('ep-data'), stage=document.getElementById('stage');
  if(dataEl && stage){
    var eps=JSON.parse(dataEl.textContent);
    function set(id,fn){ var el=document.getElementById(id); if(el) fn(el); }
    function pick(i){
      var e=eps[i]; if(!e) return;
      set('stage-media',function(m){ m.innerHTML=''; m.appendChild(player(e.id,e.title)); });
      set('stage-badge',function(r){ r.textContent = i===0 ? 'NEW EPISODE' : e.ep; });
      set('stage-chip',function(p){ p.textContent=e.ep; });
      set('stage-title',function(t){ t.textContent=e.title; t.href=e.path; });
      set('stage-date',function(d){ d.textContent=e.date; });
      set('stage-yt',function(y){ y.href='https://www.youtube.com/watch?v='+e.id; });
      set('stage-wa',function(w){ w.href=e.wa; });
      set('stage-share',function(s){ s.dataset.title=e.title; s.dataset.text=e.share; });
      document.querySelectorAll('.js-pick').forEach(function(c){ c.classList.toggle('is-on', c.getAttribute('data-i')==String(i)); });
      stage.scrollIntoView({behavior:calm?'auto':'smooth',block:'center'});
    }
    document.querySelectorAll('.js-pick').forEach(function(c){
      c.addEventListener('click',function(ev){
        if(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.button===1) return;
        ev.preventDefault(); pick(+c.getAttribute('data-i'));
      });
    });
    var first=document.querySelector('.js-pick[data-i="0"]'); if(first) first.classList.add('is-on');
  }

  // Marquee bulbs around the home player: placed along the frame, lit in a 3-step chase so the light runs around.
  document.querySelectorAll('.stage-frame .bulbs').forEach(function(box){
    var frame=box.parentNode, key='';
    function draw(){
      var w=frame.offsetWidth, h=frame.offsetHeight; if(!w||!h||key===w+'x'+h) return; key=w+'x'+h;
      var o=(parseFloat(getComputedStyle(frame).paddingTop)||18)/2, W=w-2*o, H=h-2*o, P=2*(W+H);
      var n=Math.max(24,Math.round(P/(w<520?19:23)/3)*3), html='';
      for(var i=0;i<n;i++){
        var d=i*P/n, x, y;
        if(d<W){x=o+d;y=o;} else if(d<W+H){x=o+W;y=o+d-W;} else if(d<2*W+H){x=o+W-(d-W-H);y=o+H;} else {x=o;y=o+H-(d-2*W-H);}
        html+='<i class="bulb" style="left:'+x.toFixed(1)+'px;top:'+y.toFixed(1)+'px;animation-delay:'+((i%3)*0.3-0.9).toFixed(1)+'s"></i>';
      }
      box.innerHTML=html;
    }
    draw();
    if(window.ResizeObserver) new ResizeObserver(draw).observe(frame); else window.addEventListener('resize',draw);
  });

  var reel=document.getElementById('reel');
  document.querySelectorAll('.reel-btn').forEach(function(b){
    b.addEventListener('click',function(){ if(reel) reel.scrollBy({left:(+b.dataset.dir)*reel.clientWidth*0.85,behavior:calm?'auto':'smooth'}); });
  });

  var fixed=document.getElementById('player');
  if(fixed){
    var base=fixed.getAttribute('data-src');
    function go(t,play){ fixed.src=base+'&start='+t+(play?'&autoplay=1':''); }
    document.querySelectorAll('[data-t]').forEach(function(a){
      a.addEventListener('click',function(e){ e.preventDefault(); go(a.getAttribute('data-t'),true); fixed.scrollIntoView({behavior:calm?'auto':'smooth',block:'center'}); });
    });
    var t=new URLSearchParams(location.search).get('t');
    if(t && /^[0-9]+$/.test(t)) go(t,false);
  }

  if(navigator.share){
    document.querySelectorAll('.js-share').forEach(function(b){
      b.hidden=false;
      b.addEventListener('click',function(){ navigator.share({title:b.dataset.title,text:b.dataset.text}).catch(function(){}); });
    });
  }
  // The applause box, its menu link and its page text stay hidden until the server says payments are switched on.
  if(document.querySelector('.gift,.gift-link')){
    var on=function(){ document.documentElement.classList.add('gift-on'); };
    var cached=false; try{ cached=sessionStorage.getItem('gift-on')==='1'; }catch(e){}
    if(cached) on();
    fetch('/api/status').then(function(r){ return r.json(); }).then(function(j){
      if(j&&j.payments==='on'){ on(); try{ sessionStorage.setItem('gift-on','1'); }catch(e){} }
      else { document.documentElement.classList.remove('gift-on'); try{ sessionStorage.removeItem('gift-on'); }catch(e){} }
    }).catch(function(){});
  }
  // Applause box: pick a ticket stub, then Razorpay Checkout opens. The server decides nothing about the amount except the limits.
  function post(u,b){ return fetch(u,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)}).then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ j._status=r.status; return j; }); }); }
  function loadRzp(){ return new Promise(function(ok,no){ if(window.Razorpay) return ok(); var s=document.createElement('script'); s.src='https://checkout.razorpay.com/v1/checkout.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
  document.querySelectorAll('.gift').forEach(function(box){
    var T=JSON.parse(box.getAttribute('data-t')), who=box.getAttribute('data-who')||'', pg=box.getAttribute('data-page')||'';
    var input=box.querySelector('input[name=amt]'), st=box.querySelector('.pay-status'), go=box.querySelector('.gift-go');
    var nm=box.querySelector('input[name=gname]'), msg=box.querySelector('textarea[name=gmsg]');
    var stubs=box.querySelectorAll('.stub');
    var say=function(m){ st.textContent=m||''; };
    function mark(){ stubs.forEach(function(b){ b.classList.toggle('is-on', b.getAttribute('data-amt')===String(+input.value)); }); }
    stubs.forEach(function(b){ b.addEventListener('click',function(){ input.value=b.getAttribute('data-amt'); mark(); say(''); }); });
    input.addEventListener('input',mark);
    function fail(m){ go.disabled=false; say(m); }
    go.addEventListener('click',function(){
      var a=Math.round(+input.value);
      if(!(a>=T.min)){ say(T.amountErr); input.focus(); return; }
      go.disabled=true; say(T.opening);
      post('/api/order',{amount:a,name:nm?nm.value:'',message:msg?msg.value:'',to:who,page:pg,lang:document.documentElement.lang}).then(function(o){
        if(!o.order_id){ fail(o._status===503||o._status===404?T.offline:T.failed); return; }
        return loadRzp().then(function(){
          var paid=false;
          var rz=new window.Razorpay({ key:o.key, amount:o.amount, currency:o.currency, order_id:o.order_id, name:'Gapistaan', description:T.desc, image:location.origin+'/img/logo-160.webp', prefill:{ name:nm?nm.value:'' }, notes:{ source:'website' }, theme:{ color:'#C93F15' },
            handler:function(r){ paid=true; say(T.verifying); post('/api/verify',r).then(function(v){ if(v.ok){ go.disabled=false; box.classList.add('is-thanked'); say(T.thanks); } else fail(T.failed); },function(){ fail(T.failed); }); },
            modal:{ ondismiss:function(){ if(!paid) fail(''); } } });
          rz.open();
        },function(){ fail(T.offline); });
      },function(){ fail(T.offline); });
    });
  });
})();
</script>`;

function card(ep, { pick = null } = {}) {
  const pickAttr = pick === null ? '' : ` js-pick" data-i="${pick}`;
  return `<li><a class="ep${pickAttr}" href="${ep.path}">
  <span class="thumb"><img src="${esc(thumb(ep, 'standard'))}" srcset="${esc(srcset(ep))}" sizes="(min-width: 72rem) 19rem, (min-width: 40rem) 45vw, 80vw" alt="" width="640" height="360" loading="lazy" decoding="async"><span class="dur">${clock(ep.sec)}</span></span>
  <span class="ep-meta"><span class="chip">${epLabel(ep.n)}</span>${pick === null ? '' : `<span class="now">${T('अभी चल रहा है', 'Now playing')}</span>`}</span>
  <span class="ep-title">${esc(ep.clean)}</span>
  <span class="date">${hiDate(ep.publishedAt)}</span>
</a></li>`;
}

function personCard(p, { lead = false } = {}) {
  const pic = p.pics?.length
    ? imgTag(p.pics[0], p.name, lead ? '12rem' : '(min-width: 76rem) 24rem, (min-width: 44rem) 30vw, 45vw')
    : p.slug === creator.slug
      ? '<img src="/img/chacha-560.webp" alt="" width="560" height="560" loading="lazy" decoding="async">'
      : `<span class="pic-init">${esc(initials(p))}</span>`;
  return `<li${lead ? ' class="lead-li"' : ''}><a class="person${lead ? ' lead' : ''}" href="${p.path}">
  <span class="pic">${pic}</span>
  <span class="person-body"><span class="person-name">${esc(p.name)}</span><span class="person-en" lang="${T('en', 'hi')}">${esc(T(p.nameEn, p.nameHi))}</span><span class="person-role">${esc(p.role)}</span></span>
</a></li>`;
}

const peopleList = () => `<ul class="people">
${personCard(creator, { lead: true })}
${cast.map((c) => personCard(c)).join('\n')}
</ul>`;

const crumbNav = (...parts) => `<nav class="crumbs" aria-label="${T('आप यहाँ हैं', 'You are here')}">${parts.join(' / ')}</nav>`;
const homeCrumb = () => `<a href="/">${T('गैपिस्तान', 'Gapistaan')}</a>`;

// ---------- home ----------
function homePage() {
  const latest = newestFirst[0];
  const b = biz();

  const stage = latest
    ? `<div class="stage" id="stage">
        <div class="stage-frame">
          <div class="bulbs" aria-hidden="true"></div>
          <span class="badge" id="stage-badge">NEW EPISODE</span>
          <div id="stage-media"><a class="js-play play" href="${latest.path}" data-id="${latest.id}" data-title="${esc(latest.clean)}" aria-label="${T('एपिसोड यहीं चलाएँ', 'Play the episode here')}: ${esc(latest.clean)}">
            <img src="${esc(thumb(latest, 'maxres'))}" srcset="${esc(srcset(latest))}" sizes="(min-width: 64rem) 44rem, 92vw" alt="" width="1280" height="720" fetchpriority="high">
            <span class="play-btn" aria-hidden="true"></span>
            <span class="dur" aria-hidden="true">${clock(latest.sec)}</span>
          </a></div>
        </div>
        <div class="stage-cap">
          <span class="chip" id="stage-chip">${epLabel(latest.n)}</span>
          <a class="stage-title" id="stage-title" href="${latest.path}">${esc(latest.clean)}</a>
          <span class="date" id="stage-date">${hiDate(latest.publishedAt)}, ${minutes(latest.sec)}</span>
        </div>
        ${shareButtons(latest, { stage: true })}
      </div>`
    : '';

  const listHtml = newestFirst.length
    ? `<section class="sec sec-alt" id="episodes" aria-labelledby="eps-h">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2 class="h2" id="eps-h">${T('सारे एपिसोड', 'All episodes')}</h2>
        <p class="lede">${T(`अब तक ${newestFirst.length} एपिसोड। किसी पर भी दबाइए, वो ऊपर बड़े प्लेयर में चलेगा।`, `${newestFirst.length} episodes so far. Tap any one and it plays in the big player above.`)}</p>
      </div>
      <div class="reel-nav"><button class="reel-btn" type="button" data-dir="-1" aria-label="${T('पिछले एपिसोड दिखाओ', 'Show earlier episodes')}">‹</button><button class="reel-btn" type="button" data-dir="1" aria-label="${T('आगे के एपिसोड दिखाओ', 'Show more episodes')}">›</button></div>
    </div>
    <ul class="reel" id="reel">
${newestFirst.map((ep, i) => card(ep, { pick: i })).join('\n')}
    </ul>
    <p class="more-link"><a href="/episodes/">${T('सारे एपिसोड एक साथ देखें', 'See all episodes together')}</a></p>
  </div>
</section>
<script id="ep-data" type="application/json">${JSON.stringify(
      newestFirst.map((ep) => ({ id: ep.id, ep: epLabel(ep.n), title: ep.clean, path: lp(ep.path), date: `${hiDate(ep.publishedAt)}, ${minutes(ep.sec)}`, wa: waLink(ep), share: shareMessage(ep) })),
    ).replace(/</g, '\\u003c')}</script>`
    : '';

  const shortsHtml = shorts.length
    ? `<section class="sec wrap" aria-labelledby="shorts-h">
  <h2 class="h2" id="shorts-h">Shorts</h2>
  <ul class="grid">
${shorts.slice(0, 8).map((s) => `<li><a class="ep" href="https://www.youtube.com/shorts/${s.id}"><span class="thumb"><img src="${esc(thumb(s, 'high'))}" alt="" width="480" height="360" loading="lazy" decoding="async"></span><span class="ep-title">${esc(cleanTitle(s.title))}</span></a></li>`).join('\n')}
  </ul>
</section>`
    : '';

  const boards = (site.brands || [])
    .map((x) => `<li class="board">
      ${x.logo ? `<img class="board-logo" src="${esc(x.logo)}" alt="" width="60" height="60" loading="lazy">` : ''}
      <span class="board-naam">${esc(x.name)}</span>
      <span class="board-kaam">${esc(LANG === 'en' ? en.brands[x.name] || x.label : x.label)}</span>
      <span class="board-links">${x.url ? `<a href="${esc(x.url)}">${T('वेबसाइट', 'Website')}</a>` : ''}${x.youtube ? `<a href="${esc(x.youtube)}">YouTube</a>` : ''}</span>
    </li>`)
    .join('\n');

  const faqHtml = faq.length
    ? `<section class="sec sec-alt" id="faq" aria-labelledby="faq-h">
  <div class="wrap">
    <h2 class="h2" id="faq-h">${T('गैपिस्तान से जुड़े सवाल', 'Questions about Gapistaan')}</h2>
    <div class="faq">
${faq.map(([q, a], i) => `      <details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
    </div>
    <p class="more-link"><a href="/about/">${T('गैपिस्तान कैसे बनता है, पूरी कहानी पढ़ें', 'How Gapistaan is made: read the full story')}</a></p>
  </div>
</section>`
    : '';

  const email = site.contactEmail || b.email;
  const contactHtml = `<section class="sec" id="contact" aria-labelledby="contact-h">
  <div class="wrap">
    <div class="contact">
      <div>
        <h2 class="h2" id="contact-h">${T('ब्रांड कोलैब और बिज़नेस', 'Brand collabs and business')}</h2>
        <p>${T(`स्पॉन्सरशिप, ब्रांड इंटीग्रेशन, प्रमोशन या किसी नए प्रोजेक्ट के लिए सीधे बात कीजिए। गैपिस्तान ${esc(site.presents)} की पेशकश है।`, `For sponsorship, brand integration, promotion or a new project, talk to us directly. Gapistaan is presented by ${esc(site.presents)}.`)}</p>
      </div>
      <div class="actions">
        ${email ? `<a class="btn btn-primary" href="mailto:${esc(email)}?subject=${encodeURIComponent('Gapistaan collaboration')}">${T('ईमेल भेजें', 'Send an email')}</a>` : ''}
        ${b.phone ? `<a class="btn btn-ghost" href="tel:${esc(b.phone)}">${T('कॉल करें', 'Call us')}</a>` : ''}
        <a class="btn btn-ghost" href="${esc(site.instagramUrl)}">${T('Instagram पर मैसेज', 'Message on Instagram')}</a>
      </div>
    </div>
  </div>
</section>`;

  const body = `<main id="main">
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-text">
      <span class="logo-stage"><span class="coin">
        <img class="hero-logo" src="/img/logo-340.webp" srcset="/img/logo-160.webp 160w, /img/logo-340.webp 340w, /img/logo-520.webp 520w" sizes="190px" alt="${T('Gapistaan का लोगो: चाचा', 'Gapistaan logo: Chacha')}" width="190" height="190" fetchpriority="high">
        <img class="hero-logo coin-back" src="/img/logo-340.webp" srcset="/img/logo-160.webp 160w, /img/logo-340.webp 340w, /img/logo-520.webp 520w" sizes="190px" alt="" aria-hidden="true" width="190" height="190">
      </span></span>
      <p class="presents">${T(`<a href="${esc(site.presentsUrl)}">${esc(site.presents)}</a> प्रस्तुत करता है`, `<a href="${esc(site.presentsUrl)}">${esc(site.presents)}</a> presents`)}</p>
      <h1 class="hero-name"><span class="latin">Gapistaan</span><span class="hi">गैपिस्तान</span></h1>
      <p class="hero-line">${esc(S.heroLine)}</p>
      <p class="hero-sub">${esc(S.heroSub)}</p>
      <p class="schedule">${esc(S.schedule)}</p>
      <div class="actions">
        <a class="btn btn-ghost" href="${esc(site.subscribeUrl)}">${T('YouTube पर सब्सक्राइब करें', 'Subscribe on YouTube')}</a>
      </div>
    </div>
    ${stage}
  </div>
</section>
${listHtml}
${shortsHtml}
<section class="sec about" id="about" aria-labelledby="about-h">
  <div class="wrap about-in">
    <div>
      <img class="gengap" src="/img/gengap-440.webp" srcset="/img/gengap-440.webp 440w, /img/gengap-880.webp 880w" sizes="300px" alt="Gen Gap" width="300" height="101" loading="lazy">
      <h2 class="h2" id="about-h">${T('गैपिस्तान क्या है?', 'What is Gapistaan?')}</h2>
      ${S.about.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      ${LANG === 'hi' && site.aboutEn ? `<p class="about-en" lang="en">${esc(site.aboutEn)}</p>` : ''}
      <p class="prod-note">${T(`<strong>${esc(site.presents)}</strong> की पेशकश। परिकल्पना और निर्देशन: <a href="/creator/">${esc(creator.name)}</a>`, `Presented by <strong>${esc(site.presents)}</strong>. Concept and direction: <a href="/creator/">${esc(creator.name)}</a>`)}</p>
    </div>
    <img class="chacha" src="/img/chacha-560.webp" srcset="/img/chacha-560.webp 560w, /img/chacha-1040.webp 1040w" sizes="(min-width: 58rem) 470px, 92vw" alt="${T('चाचा, हाथ में चार्जर का प्लग और केबल लिए', 'Chacha, holding a charger plug and cable')}" width="470" height="470" loading="lazy">
  </div>
</section>
<section class="sec sec-alt" id="cast" aria-labelledby="cast-h">
  <div class="wrap">
    <h2 class="h2" id="cast-h">${T('कलाकार और टीम', 'Cast and team')}</h2>
    <p class="lede">${T('किसी की भी फ़ोटो या नाम पर दबाइए और उनके बारे में पढ़िए।', 'Tap anyone\'s photo or name to read about them.')}</p>
    ${peopleList()}
  </div>
</section>
<section class="sec" aria-label="${esc(G().short)}">
  <div class="wrap">
    ${giftBox({ variant: 'home', id: 'gift', pageName: 'home' })}
  </div>
</section>
${boards ? `<section class="sec sec-alt" aria-labelledby="brands-h">
  <div class="wrap">
    <h2 class="h2" id="brands-h">${T(`${esc(site.presents)} परिवार`, `The ${esc(site.presents)} family`)}</h2>
    <p class="lede">${T(`गैपिस्तान ${esc(site.presents)} का हिस्सा है। हमारे दूसरे चैनल और संस्थान:`, `Gapistaan is part of ${esc(site.presents)}. Our other channels and institutes:`)}</p>
    <ul class="boards">
${boards}
    </ul>
  </div>
</section>` : ''}
${faqHtml}
${contactHtml}
</main>`;

  const ld = siteUrl
    ? [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: site.siteName, alternateName: ['Gapistaan', 'Gapistan', 'गैपिस्तान', 'Gen Gap'], url: A('/'), inLanguage: LANG },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Gapistaan',
          alternateName: 'गैपिस्तान',
          url: A('/'),
          logo: abs('/img/logo-520.webp'),
          sameAs: [site.channelUrl, site.instagramUrl],
          parentOrganization: { ...production, sameAs: (site.brands || []).filter((x) => x.name === site.presents).map((x) => x.youtube) },
          ...(email ? { email } : {}),
        },
        seriesLd(),
        ...(faq.length
          ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }]
          : []),
      ]
    : [];

  return layout({
    title: S.homeTitle,
    description: S.homeDescription,
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
  const pageUrl = A(ep.path);
  const watchUrl = `https://www.youtube.com/watch?v=${ep.id}`;
  const embed = `https://www.youtube.com/embed/${ep.id}?rel=0`;
  const more = newestFirst.filter((e) => e !== ep).slice(0, 3);
  const inThis = cast.filter((c) => c.episodes.includes(ep));

  const chaptersHtml = ep.chapters.length
    ? `<section class="block" aria-labelledby="ch-h">
  <h2 class="h2" id="ch-h">${T('इस एपिसोड के हिस्से', 'Parts of this episode')}</h2>
  <ol class="chapters">
${ep.chapters.map((c) => `<li><a href="${watchUrl}&amp;t=${c.t}s" data-t="${c.t}"><span class="t">${clock(c.t)}</span><span>${esc(c.label)}</span></a></li>`).join('\n')}
  </ol>
</section>`
    : '';

  const customHtml = ep.custom.length
    ? `<section class="block prose" aria-labelledby="note-h"><h2 class="h2" id="note-h">${T('इस एपिसोड में क्या है', 'What happens in this episode')}</h2>${renderParagraphs(ep.custom)}</section>`
    : '';

  const castHtml = `<section class="block" aria-labelledby="ec-h"><h2 class="h2" id="ec-h">${T('इस एपिसोड में', 'In this episode')}</h2><ul class="people">
${personCard(creator)}
${inThis.map((c) => personCard(c)).join('\n')}
</ul></section>`;

  const descHtml = ep.paras.length
    ? `<section class="block prose" aria-labelledby="desc-h"><h2 class="h2" id="desc-h">${T('एपिसोड के बारे में', 'About the episode')}</h2>${renderParagraphs(ep.paras)}</section>`
    : '';

  const prevNext = prev || next
    ? `<nav class="prevnext" aria-label="${T('पिछला और अगला एपिसोड', 'Previous and next episode')}">
  ${prev ? `<a class="pn" href="${prev.path}"><span class="pn-k">${T('पिछला एपिसोड', 'Previous episode')}</span><span class="pn-t">${esc(prev.clean)}</span></a>` : ''}
  ${next ? `<a class="pn pn-next" href="${next.path}"><span class="pn-k">${T('अगला एपिसोड', 'Next episode')}</span><span class="pn-t">${esc(next.clean)}</span></a>` : ''}
</nav>`
    : '';

  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), `<a href="/episodes/">${T('एपिसोड', 'Episodes')}</a>`, epLabel(ep.n))}
<h1 class="page-h1">${esc(ep.clean)}</h1>
<p class="meta"><span class="chip">${epLabel(ep.n)}</span><span>${hiDate(ep.publishedAt)}</span><span>${minutes(ep.sec)}</span></p>
<div class="player"><iframe id="player" src="${embed}" data-src="${embed}" title="${esc(ep.clean)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
${shareButtons(ep)}
${customHtml}
${chaptersHtml}
${castHtml}
<div class="block">${giftBox({ variant: 'episode', id: 'gift', pageName: `episode ${epLabel(ep.n)}` })}</div>
${descHtml}
${prevNext}
${more.length ? `<section class="block" aria-labelledby="more-h"><h2 class="h2" id="more-h">${T('और एपिसोड', 'More episodes')}</h2><ul class="grid">${more.map((e) => card(e)).join('\n')}</ul></section>` : ''}
</main>`;

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
    partOfSeries: { '@type': 'TVSeries', name: 'Gen Gap', alternateName: 'Gapistaan' },
    director: personLd(creator),
    actor: [personLd(creator), ...inThis.map((c) => personLd(c))],
    productionCompany: production,
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
  const ld = [video, ...crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('एपिसोड', 'Episodes'), '/episodes/'], [ep.clean, ep.path]])];

  return layout({
    title: `${ep.clean} | Gen Gap ${epLabel(ep.n)} | ${T('गैपिस्तान', 'Gapistaan')}`,
    description: ep.summary,
    pathName: ep.path,
    image: thumb(ep, 'maxres'),
    type: 'video.episode',
    ld,
    body,
  });
}

function episodesPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), T('सारे एपिसोड', 'All episodes'))}
<h1 class="page-h1">${T('Gen Gap: गैपिस्तान के सारे एपिसोड', 'Gen Gap: all Gapistaan episodes')}</h1>
<p class="lede">${T(`अब तक ${newestFirst.length} एपिसोड, सबसे नया सबसे पहले।`, `${newestFirst.length} episodes so far, newest first.`)}</p>
<ul class="grid">
${newestFirst.map((ep) => card(ep)).join('\n')}
</ul>
</main>`;
  return layout({
    title: T('सारे एपिसोड | Gen Gap हिंदी कॉमेडी | Gapistaan गैपिस्तान', 'All episodes | Gen Gap Hindi comedy | Gapistaan'),
    description: T(`Gen Gap के सारे ${newestFirst.length} एपिसोड एक जगह: चाचा बनाम Gen Z की improvised हिंदी कॉमेडी, ${site.presents} की पेशकश।`, `All ${newestFirst.length} Gen Gap episodes in one place: improvised Hindi comedy, Chacha vs Gen Z, presented by ${site.presents}.`),
    pathName: '/episodes/',
    image: siteUrl ? abs('/img/og-home.jpg') : null,
    ld: siteUrl
      ? [
          { ...seriesLd(), episode: newestFirst.map((ep) => ({ '@type': 'TVEpisode', name: ep.clean, episodeNumber: ep.n, url: A(ep.path), datePublished: ep.publishedAt })) },
          ...crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('सारे एपिसोड', 'All episodes'), '/episodes/']]),
        ]
      : [],
    body,
  });
}

// ---------- people ----------
function episodeMiniList(list) {
  return list.length
    ? `<ul class="grid">${list.slice(0, 6).map((e) => card(e)).join('\n')}</ul>${list.length > 6 ? `<p class="more-link"><a href="/episodes/">${T('सारे एपिसोड देखें', 'See all episodes')}</a></p>` : ''}`
    : `<p class="muted">${T('एपिसोड की जानकारी जल्द जोड़ी जाएगी।', 'Episode details will be added soon.')}</p>`;
}

function creatorPage() {
  const p = creator;
  const aka = (p.aka || [])[0] || '';
  const pic = portrait(p, `<img class="profile-pic profile-art" src="/img/chacha-560.webp" alt="${esc(p.name)}, ${T('चाचा के रूप में (इलस्ट्रेशन)', 'as Chacha (illustration)')}" width="560" height="560">`);
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), T('क्रिएटर', 'Creator'))}
<div class="profile">
  ${pic}
  <div>
    <h1 class="page-h1">${esc(p.name)}</h1>
    <p class="aka">${esc(T(p.nameEn, p.nameHi))}. ${T('फ़िल्मों में', 'In films')}: ${esc(aka)}</p>
    <p class="role-line">${esc(p.role)}</p>
    ${creditList(p)}
    <div class="link-row">${(p.links || []).map(([l, u]) => `<a class="btn btn-ghost btn-sm" href="${esc(u)}">${esc(l)}</a>`).join('')}</div>
  </div>
</div>
<section class="prose" aria-label="${T('परिचय', 'About')}">${renderParagraphs(p.bio || [])}</section>
${factsBlock(p, T('बायोडाटा', 'Biodata'), 'facts-h')}
${galleryBlock(p)}
<section class="block" aria-labelledby="pe-h"><h2 class="h2" id="pe-h">${T('गैपिस्तान के ताज़ा एपिसोड', 'Latest Gapistaan episodes')}</h2>${episodeMiniList(p.episodes)}</section>
<section class="block" aria-labelledby="team-h"><h2 class="h2" id="team-h">${T('गैपिस्तान की टीम', 'The Gapistaan team')}</h2><ul class="people">${cast.map((c) => personCard(c)).join('\n')}</ul></section>
</main>`;
  return layout({
    title: T(`${p.name} (${p.nameEn}, ${aka}) | Gapistaan के क्रिएटर और डायरेक्टर`, `${p.name} (${aka}) | Creator and director of Gapistaan`),
    description: T(
      `${p.name} उर्फ़ ${aka}: गैपिस्तान (Gen Gap) के क्रिएटर, डायरेक्टर और चाचा। दबंग सरकार और विद्यापीठ के निर्देशक, Indian Films Academy और PICHCHRAPA के संस्थापक।`,
      `${p.name}, also known as ${aka}: creator, director and Chacha of Gapistaan (Gen Gap). Director of Dabang Sarkar and Vidyapeeth, founder of Indian Films Academy and PICHCHRAPA.`,
    ),
    pathName: p.path,
    image: siteUrl ? abs(p.photo || '/img/chacha-1040.webp') : null,
    preloadImage: p.pics[0]?.src,
    type: 'profile',
    ld: [
      {
        '@context': 'https://schema.org',
        ...personLd(p, {
          jobTitle: ['Film Director', 'Creator', 'Acting Coach', 'Editor', 'DI Colorist'],
          worksFor: production,
          founder: [production, { '@type': 'EducationalOrganization', name: 'Indian Films Academy', url: 'https://indianfilmsacademy.com/' }],
          homeLocation: { '@type': 'Place', name: 'Lucknow, Uttar Pradesh, India' },
          sameAs: (p.links || []).map(([, u]) => u),
          image: siteUrl ? abs(p.photo || '/img/chacha-1040.webp') : undefined,
        }),
      },
      ...crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('क्रिएटर', 'Creator'), '/creator/']]),
    ],
    body,
  });
}

function castIndexPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), T('कलाकार', 'Cast'))}
<h1 class="page-h1">${T('गैपिस्तान के कलाकार और टीम', 'The Gapistaan cast and team')}</h1>
<p class="lede">${T(
    'Gen Gap के सारे कलाकार पेशेवर अभिनेता हैं और Indian Films Academy, लखनऊ से दो साल का सिनेमैटिक एक्टिंग कोर्स करके आए हैं। हर एपिसोड improvised होता है, यानी हर डायलॉग इन्हीं का। किसी की भी फ़ोटो पर क्लिक करके उनका पूरा परिचय पढ़िए।',
    'Everyone in the Gen Gap cast is a professional actor who has done a two-year cinematic acting course at Indian Films Academy, Lucknow. Every episode is improvised, which means every line is theirs. Click anyone\'s photo to read their full profile.',
  )}</p>
${peopleList()}
</main>`;
  return layout({
    title: T('कलाकार और टीम | Gen Gap हिंदी कॉमेडी | Gapistaan गैपिस्तान', 'Cast and team | Gen Gap Hindi comedy | Gapistaan'),
    description: T(`गैपिस्तान (Gen Gap) के कलाकार: ${[creator, ...cast].map((c) => c.name).join(', ')}।`, `The cast of Gapistaan (Gen Gap): ${[creator, ...cast].map((c) => c.name).join(', ')}.`),
    pathName: '/cast/',
    image: siteUrl ? abs('/img/og-home.jpg') : null,
    ld: crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('कलाकार', 'Cast'), '/cast/']]),
    body,
  });
}

function castPage(c) {
  const pic = portrait(c, `<div class="profile-initials" aria-hidden="true">${esc(initials(c))}</div>`);
  const bio = c.bio?.length
    ? c.bio
    : [T(`${c.name} गैपिस्तान की हिंदी कॉमेडी सीरीज़ Gen Gap के कलाकार हैं, जहाँ हर सीन बिना स्क्रिप्ट के, improvisation से बनता है। वे लखनऊ के Indian Films Academy से प्रशिक्षित हैं।`, `${c.name} is part of the cast of Gapistaan's Hindi comedy series Gen Gap, where every scene is improvised with no script. Trained at Indian Films Academy, Lucknow.`)];
  const work = (c.credits || []).filter((x) => !x.startsWith('IFA') && !x.startsWith('2-year')).join(', ');
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), `<a href="/cast/">${T('कलाकार', 'Cast')}</a>`, esc(c.name))}
<div class="profile">
  ${pic}
  <div>
    <h1 class="page-h1">${esc(c.name)}</h1>
    <p class="aka" lang="${T('en', 'hi')}">${esc(T(c.nameEn, c.nameHi))}</p>
    <p class="role-line">${esc(c.role)}, Gen Gap</p>
    ${creditList(c)}
    ${c.instagram ? `<div class="link-row"><a class="btn btn-ghost btn-sm" href="${esc(c.instagram)}">Instagram</a></div>` : ''}
  </div>
</div>
<section class="prose" aria-label="${T('परिचय', 'About')}">${renderParagraphs(bio)}</section>
${factsBlock(c, T('एक नज़र में', 'At a glance'), 'cf-h')}
${galleryBlock(c)}
<section class="block" aria-labelledby="ce-h"><h2 class="h2" id="ce-h">${T(`${esc(c.name)} के एपिसोड`, `Episodes with ${esc(c.name)}`)}</h2>${episodeMiniList(c.episodes)}</section>
<div class="block">${giftBox({ variant: 'cast', person: c, id: 'gift', pageName: `cast ${c.nameEn}` })}</div>
<section class="block" aria-labelledby="ot-h"><h2 class="h2" id="ot-h">${T('बाकी टीम', 'The rest of the team')}</h2><ul class="people">${personCard(creator)}${cast.filter((x) => x !== c).map((x) => personCard(x)).join('\n')}</ul></section>
</main>`;
  return layout({
    title: T(`${c.name} (${c.nameEn}) | Gen Gap कलाकार | Gapistaan गैपिस्तान`, `${c.name} | Gen Gap cast | Gapistaan`),
    description: T(
      `${c.name} (${c.nameEn}), गैपिस्तान की हिंदी कॉमेडी सीरीज़ Gen Gap के पेशेवर कलाकार। Indian Films Academy, लखनऊ से सिनेमैटिक एक्टिंग का दो साल का कोर्स${work ? `; काम: ${work}` : ''}।`,
      `${c.name} (${c.nameHi}), professional actor in Gapistaan's Hindi comedy series Gen Gap. Two-year cinematic acting course at Indian Films Academy, Lucknow${work ? `; work: ${work}` : ''}.`,
    ),
    pathName: c.path,
    image: c.photo ? (siteUrl ? abs(c.photo) : c.photo) : siteUrl ? abs('/img/og-home.jpg') : null,
    preloadImage: c.pics[0]?.src,
    type: 'profile',
    ld: [
      {
        '@context': 'https://schema.org',
        ...personLd(c, {
          jobTitle: 'Actor',
          alumniOf: { '@type': 'EducationalOrganization', name: 'Indian Films Academy', url: 'https://indianfilmsacademy.com/' },
          ...(c.instagram ? { sameAs: [c.instagram] } : {}),
          ...(c.photo && siteUrl ? { image: abs(c.photo) } : {}),
        }),
      },
      ...crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('कलाकार', 'Cast'), '/cast/'], [c.name, c.path]]),
    ],
    body,
  });
}

function aboutPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), T('बारे में', 'About'))}
<h1 class="page-h1">${T('गैपिस्तान और Gen Gap के बारे में', 'About Gapistaan and Gen Gap')}</h1>
<p class="lede">${esc(S.heroLine)} ${esc(S.heroSub)}</p>
<section class="block prose" aria-labelledby="story-h">
  <h2 class="h2" id="story-h">${T('कहानी क्या है', 'What the story is')}</h2>
  ${S.about.map((p) => `<p>${esc(p)}</p>`).join('\n  ')}
  <p>${T(
    'एक तरफ़ चाचा हैं, जिनकी हर बात "हमारे टाइम में" से शुरू होती है। दूसरी तरफ़ Gen Z लड़के हैं, जिनके लिए YouTube, Instagram और ट्रेंड ही सब कुछ है। दोनों एक ही हॉस्टल, एक ही क्लास और एक ही कमरे में हैं, और यहीं से निकलती है गैपिस्तान की कॉमेडी।',
    'On one side is Chacha, who starts every sentence with "in our time". On the other side are the Gen Z boys, for whom YouTube, Instagram and trends are everything. Both live in the same hostel, the same class and the same room, and that is where Gapistaan\'s comedy comes from.',
  )}</p>
  ${LANG === 'hi' && site.aboutEn ? `<p lang="en">${esc(site.aboutEn)}</p>` : ''}
</section>
${S.making?.length ? `<section class="block prose" aria-labelledby="making-h">
  <h2 class="h2" id="making-h">${T('गैपिस्तान कैसे बनता है', 'How Gapistaan is made')}</h2>
  ${S.making.map((p) => `<p>${esc(p)}</p>`).join('\n  ')}
</section>` : ''}
<section class="block prose" aria-labelledby="watch-h">
  <h2 class="h2" id="watch-h">${T('कब और कहाँ देखें', 'When and where to watch')}</h2>
  <p>${T(
    `${esc(S.schedule)}। हर एपिसोड YouTube चैनल <a href="${esc(site.channelUrl)}">@gapistaan</a> पर आता है और लगभग एक घंटे में इस वेबसाइट पर भी। छोटे क्लिप और पर्दे के पीछे की झलक Instagram पर <a href="${esc(site.instagramUrl)}">@gapistaan</a> पर मिलती है।`,
    `${esc(S.schedule)}. Every episode comes out on the YouTube channel <a href="${esc(site.channelUrl)}">@gapistaan</a> and on this website about an hour later. Short clips and behind-the-scenes glimpses are on Instagram at <a href="${esc(site.instagramUrl)}">@gapistaan</a>.`,
  )}</p>
  <h3 class="h3">${T(`अब तक के ${episodes.length} एपिसोड`, `All ${episodes.length} episodes so far`)}</h3>
  <ol class="ep-list">
${episodes.map((ep) => `    <li><a href="${ep.path}">${epLabel(ep.n)}: ${esc(ep.clean)}</a></li>`).join('\n')}
  </ol>
</section>
<section class="block" aria-labelledby="team-h"><h2 class="h2" id="team-h">${T('गैपिस्तान की टीम', 'The Gapistaan team')}</h2>${peopleList()}</section>
<section class="block prose" aria-labelledby="prod-h">
  <h2 class="h2" id="prod-h">${T(`${esc(site.presents)} की पेशकश`, `Presented by ${esc(site.presents)}`)}</h2>
  <p>${T(
    `गैपिस्तान लखनऊ के प्रोडक्शन हाउस <a href="${esc(site.presentsUrl)}">${esc(site.presents)}</a> का हिस्सा है। इसके कलाकार <a href="https://indianfilmsacademy.com/">Indian Films Academy</a> से तैयार हुए हैं। परिकल्पना और निर्देशन: <a href="/creator/">${esc(creator.name)}</a>।`,
    `Gapistaan is part of the Lucknow production house <a href="${esc(site.presentsUrl)}">${esc(site.presents)}</a>. Its actors are trained at <a href="https://indianfilmsacademy.com/">Indian Films Academy</a>. Concept and direction: <a href="/creator/">${esc(creator.name)}</a>.`,
  )}</p>
</section>
</main>`;
  return layout({
    title: T('गैपिस्तान के बारे में: Gen Gap कैसे बनता है | Gapistaan गैपिस्तान', 'About Gapistaan: how Gen Gap is made | Gapistaan'),
    description: T(
      'गैपिस्तान (Gapistaan) और Gen Gap की पूरी कहानी: बिना स्क्रिप्ट की improvised हिंदी कॉमेडी, 4-5 कैमरों से शूटिंग, Indian Films Academy के कलाकार और PICHCHRAPA की पेशकश।',
      'The full story of Gapistaan and Gen Gap: improvised Hindi comedy with no script, shot on 4-5 cameras, with actors from Indian Films Academy, presented by PICHCHRAPA.',
    ),
    pathName: '/about/',
    ld: [
      ...(siteUrl ? [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: T('गैपिस्तान के बारे में', 'About Gapistaan'), url: A('/about/'), inLanguage: LANG, about: { '@type': 'TVSeries', name: 'Gen Gap', alternateName: ['Gapistaan', 'गैपिस्तान'], url: A('/') } }] : []),
      ...crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('बारे में', 'About'), '/about/']]),
    ],
    body,
  });
}

function supportPage() {
  const g = G();
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), esc(g.nav))}
<h1 class="page-h1">${esc(g.page.title)}</h1>
<p class="lede gift-off-note">${esc(g.page.offNote)}</p>
<p class="lede gift-only">${esc(g.page.lede)}</p>
<div class="block">${giftBox({ variant: 'home', id: 'gift', pageName: 'support page' })}</div>
<section class="block prose gift-only" aria-label="${T('सवाल-जवाब', 'Questions and answers')}">
${g.page.qa.map(([q, a]) => `  <h2 class="h3">${esc(q)}</h2>\n  <p>${esc(a)}</p>`).join('\n')}
  <p><a href="/terms/">${esc(g.termsLink)}</a></p>
</section>
</main>`;
  return layout({
    title: `${g.page.title} | Gapistaan`,
    description: g.page.lede,
    pathName: '/support/',
    image: siteUrl ? abs('/img/og-home.jpg') : null,
    ld: crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [g.nav, '/support/']]),
    body,
  });
}

function termsPage() {
  const tt = gift.terms[LANG];
  const b = site.business || {};
  const email = site.contactEmail || b.email || '';
  const fill = (s) => s.replace(/\{email\}/g, email).replace(/\{phone\}/g, b.phoneLabel || b.phone || '');
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), esc(tt.title))}
<h1 class="page-h1">${esc(tt.title)}</h1>
<section class="prose">
${tt.paras.map(([h, p]) => `<h2 class="h3">${esc(h)}</h2>\n<p>${esc(fill(p))}</p>`).join('\n')}
<p class="muted">${T('आख़िरी बदलाव', 'Last updated')}: ${hiDate(new Date().toISOString())}</p>
</section>
</main>`;
  return layout({
    title: `${tt.title} | Gapistaan`,
    description: T('गैपिस्तान की वेबसाइट के नियम, तालियाँ (गिफ़्ट) की वापसी नीति और भुगतान की सुरक्षा।', 'Terms of the Gapistaan website, the refund policy for applause gifts, and payment security.'),
    pathName: '/terms/',
    ld: crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [tt.title, '/terms/']]),
    body,
  });
}

function privacyPage() {
  const b = site.business || {};
  const email = site.contactEmail || b.email;
  const body = `<main id="main" class="wrap page">
${crumbNav(homeCrumb(), T('प्राइवेसी', 'Privacy'))}
<h1 class="page-h1">${T('प्राइवेसी नीति', 'Privacy policy')}</h1>
<section class="prose">
<p>${T('gapistaan.com पर हम आपसे नाम, फ़ोन या ईमेल जैसी कोई निजी जानकारी नहीं माँगते और न ही जमा करते हैं।', 'On gapistaan.com we do not ask for or collect personal details such as your name, phone number or email.')}</p>
<p>${T('अगर आप "तालियाँ भेजें" से गिफ़्ट भेजते हैं, तो आपका नाम और संदेश सिर्फ़ तभी लिया जाता है जब आप ख़ुद लिखें, और वह भुगतान के रिकॉर्ड में हमें दिखता है। कार्ड, UPI या बैंक की जानकारी हमारे पास नहीं आती; वह Razorpay के पास रहती है।', 'If you send a gift through "Send applause", your name and message are taken only if you write them yourself, and they appear to us in the payment record. Your card, UPI or bank details never reach us; they stay with Razorpay.')}</p>
<p>${T('साइट पर कितने लोग आए, यह समझने के लिए हम Cloudflare Web Analytics इस्तेमाल करते हैं। यह कुकी नहीं लगाता और किसी व्यक्ति को पहचानता नहीं, सिर्फ़ कुल गिनती दिखाता है।', 'To understand how many people visit, we use Cloudflare Web Analytics. It sets no cookies and does not identify any person; it only shows a total count.')}</p>
<p>${T('एपिसोड YouTube के प्लेयर में चलते हैं। जब आप कोई वीडियो चलाते हैं, तो YouTube (Google) अपनी नीति के अनुसार कुकी इस्तेमाल कर सकता है।', 'Episodes play in the YouTube player. When you play a video, YouTube (Google) may use cookies according to its own policy.')}</p>
<p>${T('WhatsApp या दूसरे ऐप पर शेयर करने के बटन सिर्फ़ उस ऐप को खोलते हैं; हमें कुछ नहीं भेजा जाता।', 'The share buttons for WhatsApp and other apps only open that app; nothing is sent to us.')}</p>
${email ? `<p>${T('किसी भी सवाल के लिए लिखें', 'For any question, write to')}: <a href="mailto:${esc(email)}">${esc(email)}</a></p>` : ''}
<p class="muted">${T('आख़िरी बदलाव', 'Last updated')}: ${hiDate(new Date().toISOString())}</p>
</section>
</main>`;
  return layout({
    title: T('प्राइवेसी नीति | Gapistaan गैपिस्तान', 'Privacy policy | Gapistaan'),
    description: T('gapistaan.com की प्राइवेसी नीति: हम कौन-सी जानकारी लेते हैं (कोई निजी जानकारी नहीं), analytics और YouTube प्लेयर के बारे में।', 'The privacy policy of gapistaan.com: what we collect (no personal details), analytics, payments and the YouTube player.'),
    pathName: '/privacy/',
    ld: crumbsLd([[T('गैपिस्तान', 'Gapistaan'), '/'], [T('प्राइवेसी', 'Privacy'), '/privacy/']]),
    body,
  });
}

// One 404 page serves both languages, so it speaks both.
function notFoundPage() {
  return layout({
    title: 'यह पन्ना नहीं मिला | Page not found | Gapistaan',
    description: 'This page is not on the Gapistaan website.',
    pathName: '/404',
    noindex: true,
    bilingual: true,
    body: `<main id="main" class="wrap lost"><img src="/img/logo-520.webp" alt="" width="160" height="160"><h1 class="page-h1">यह पन्ना यहाँ नहीं है<br><span lang="en">This page is not here</span></h1><p>हो सकता है लिंक पुराना हो। सारे एपिसोड होम पेज पर हैं।<br><span lang="en">The link may be old. All episodes are on the home page.</span></p><p class="actions" style="justify-content:center"><a class="btn btn-primary" href="/">होम पेज पर जाएँ</a><a class="btn btn-ghost" href="/en/">Go to the English home page</a></p></main>`,
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
  for (const ep of episodes) await page(`${pre}video/${ep.id}`, episodePage(ep));
  await page(`${pre}episodes`, episodesPage());
  await page(`${pre}creator`, creatorPage());
  await page(`${pre}cast`, castIndexPage());
  for (const c of cast) await page(`${pre}cast/${c.slug}`, castPage(c));
  await page(`${pre}about`, aboutPage());
  await page(`${pre}support`, supportPage());
  await page(`${pre}terms`, termsPage());
  await page(`${pre}privacy`, privacyPage());
}
await buildLang('en');
await buildLang('hi'); // last, so the 404 page below is rendered in Hindi/bilingual mode
await writeFile(path.join(out, '404.html'), notFoundPage());

if (siteUrl) {
  const latestDate = newestFirst[0]?.publishedAt;
  const urls = [
    { p: '/', lastmod: latestDate },
    { p: '/episodes/', lastmod: latestDate },
    { p: '/creator/', lastmod: latestDate },
    { p: '/cast/', lastmod: latestDate },
    { p: '/about/', lastmod: latestDate },
    { p: '/support/' },
    ...cast.map((c) => ({ p: c.path, lastmod: c.episodes[0]?.publishedAt || latestDate })),
    ...episodes.map((ep) => ({ p: ep.path, lastmod: ep.publishedAt })),
    { p: '/privacy/' },
    { p: '/terms/' },
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
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${abs('/sitemap.xml')}\n`);
} else {
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n`);
  console.warn('siteUrl खाली है: canonical, sitemap और Clip markup domain जुड़ने के बाद बनेंगे।');
}

const files = await readdir(out, { recursive: true });
console.log(`dist/ तैयार: ${episodes.length} एपिसोड, ${cast.length + 1} प्रोफ़ाइल, 2 भाषाएँ, ${files.length} फ़ाइलें`);
