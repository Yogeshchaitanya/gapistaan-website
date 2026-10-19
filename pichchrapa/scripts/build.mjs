// PICHCHRAPA site generator: content/site.json + data/videos.json (synced from YouTube) -> dist/
// Plain Node, no dependencies. Run: node pichchrapa/scripts/build.mjs
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const data = JSON.parse(await readFile(path.join(root, 'data/videos.json'), 'utf8'));
const css = await readFile(path.join(root, 'src/styles.css'), 'utf8');
const appJs = await readFile(path.join(root, 'src/app.js'), 'utf8');
const siteUrl = (site.siteUrl || '').replace(/\/$/, '');
const abs = (p) => (siteUrl ? siteUrl + p : '');
const B = site.business;
const S = site.series;
const MAIN = site.sources.find((s) => s.main).channelId;

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
const decode = (s) => String(s || '').replace(/&(amp|lt|gt|quot|#39);/g, (m) => ENT[m]);
const hiDate = (iso) => new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
const hiMonth = (iso) => new Intl.DateTimeFormat('hi-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
function count(n) {
  const f = (x, unit) => String(Math.floor((x / unit) * 10) / 10).replace(/\.0$/, '');
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
function cleanTitle(raw) {
  const t = decode(raw).replace(/#\S+/g, '').replace(/\s+/g, ' ').trim();
  const piped = t.includes('|');
  const segs = t.split(piped ? '|' : /\s*,\s*/).map((s) => s.trim()).filter(Boolean);
  const keep = segs.filter((s) => !NOISE.test(s) && !LABELSEG.test(s));
  const base = ((piped ? keep[0] : keep.join(', ')) || segs[0] || t || 'PICHCHRAPA').replace(/\s*[-–,]?\s*(raja ka baja( gags)?|sadak ka raja|pichchrapa)\s*$/i, '').trim() || 'PICHCHRAPA';
  const labels = [];
  const has = (re) => re.test(base);
  const ep = /episode ?-? ?(\d+)/i.exec(t);
  if (ep && !has(/episode/i)) labels.push(`एपिसोड ${ep[1]}`);
  const part = /part ?-? ?(\d+)/i.exec(t);
  if (part && !has(/part/i)) labels.push(`पार्ट ${part[1]}`);
  if (/trailer/i.test(t) && !has(/trailer/i)) labels.push('ट्रेलर');
  if (/teaser/i.test(t) && !has(/teaser/i)) labels.push('टीज़र');
  if (/making|behind the scene/i.test(t) && !has(/making|behind/i)) labels.push('मेकिंग');
  return labels.length ? `${base} (${labels.join(', ')})` : base;
}
const reAdalat = new RegExp(S.adalat.match, 'i');
const MILESTONE = /million|views on instagram|subscribe|सब्सक्राइब/i;
const channelChip = (v) => (/academy/i.test(v.channel) ? 'IFA चैनल' : `${v.channel} चैनल`);

const vids = data.videos.map((v) => {
  const t = decode(v.title);
  const primary = v.channelId === MAIN;
  const series = reAdalat.test(t) ? 'adalat' : primary && v.publishedAt.slice(0, 10) >= S.raja.since ? 'raja' : 'other';
  const paras = decode(v.description).split(/\n+/).map((x) => x.trim()).filter((x) => x && !/^(#|https?:\/\/)/.test(x) && !/^(subscribe|follow|like)\b/i.test(x)).slice(0, 3);
  return { ...v, title: t, clean: cleanTitle(v.title), primary, series, sec: seconds(v.duration), paras, hasPage: primary && !v.isShort };
});
const byNew = (a, b) => b.publishedAt.localeCompare(a.publishedAt);
vids.sort(byNew);
const pageVids = vids.filter((v) => v.hasPage);
const adalatEps = vids.filter((v) => v.series === 'adalat' && !v.isShort);
const rajaEps = vids.filter((v) => v.series === 'raja' && !v.isShort && v.primary);
const rajaShorts = vids.filter((v) => v.series === 'raja' && v.isShort && v.primary);
const hitShorts = [...rajaShorts].filter((v) => !MILESTONE.test(v.title)).sort((a, b) => b.views - a.views).slice(0, 12);
const otherEps = vids.filter((v) => v.series === 'other' && !v.isShort && v.primary);

const cases = S.adalat.cases.map((c) => ({ ...c, re: new RegExp(c.match, 'i'), items: [] }));
for (const v of adalatEps) cases.find((c) => c.re.test(v.title)).items.push(v);
for (const c of cases) c.items.sort((a, b) => (a.primary === b.primary ? a.publishedAt.localeCompare(b.publishedAt) : a.primary ? -1 : 1));
const liveCases = cases.filter((c) => c.items.length);
const dated = liveCases.filter((c) => c.id !== 'general').sort((a, b) => a.items[0].publishedAt.localeCompare(b.items[0].publishedAt));
dated.forEach((c, i) => (c.no = String(i + 1).padStart(2, '0')));
const caseOrder = [...dated].reverse().concat(liveCases.filter((c) => c.id === 'general'));

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
  const meta = [hiDate(v.publishedAt), v.views >= 100 ? `${count(v.views)} व्यू` : ''].filter(Boolean).join(', ');
  const tag = chip || (v.primary ? '' : channelChip(v));
  return `<article class="vcard">
  <a class="thumb" href="${esc(href)}"${ext} tabindex="-1" aria-hidden="true"><img src="${esc(thumbOf(v))}" width="320" height="180" loading="lazy" decoding="async" alt=""><span class="play"></span>${tag ? `<span class="chip">${esc(tag)}</span>` : ''}<span class="dur">${clock(v.sec)}</span></a>
  <div class="vbody"><a class="vtitle" href="${esc(href)}"${ext}>${esc(v.clean)}</a><span class="vmeta">${esc(meta)}</span></div>
</article>`;
}
const rail = (items, label) => `<div class="rail-wrap">
  <div class="rail-nav"><button type="button" data-dir="prev" aria-label="पीछे">&#8249;</button><button type="button" data-dir="next" aria-label="आगे">&#8250;</button></div>
  <div class="rail" role="list" aria-label="${esc(label)}">${items.map((v) => card(v)).join('\n')}</div>
</div>`;
const shortCard = (v) => `<div class="short" role="listitem"><img src="${esc(thumbOf(v))}" width="320" height="180" loading="lazy" decoding="async" alt=""><span class="play"></span><span class="cap">${esc(trunc(v.clean, 48))}<small>${esc(count(v.views))} व्यू</small></span><button class="hit" type="button" data-yt="${esc(v.id)}" data-short data-title="${esc(v.clean)}" aria-label="शॉर्ट चलाइए: ${esc(trunc(v.clean, 60))}"></button></div>`;

function reelStrips() {
  const mixA = [];
  const fa = adalatEps.filter((v) => v.primary);
  const rk = [...rajaEps].sort((a, b) => b.views - a.views).slice(0, Math.max(8, fa.length));
  for (let i = 0; i < Math.max(fa.length, rk.length); i++) { if (fa[i]) mixA.push(fa[i]); if (rk[i]) mixA.push(rk[i]); }
  const rowB = rajaEps.slice(0, 22);
  const cell = (v, hide) => `<a class="cell" href="${esc(hrefOf(v))}"${hide ? ' tabindex="-1" aria-hidden="true"' : ''}><img src="${esc(smallThumb(v))}" width="210" height="118" loading="lazy" decoding="async" alt="${hide ? '' : esc(v.clean)}"></a>`;
  const row = (items, cls, dur) => `<div class="strip${cls}" style="--dur:${dur}s"><div class="strip-track">${items.map((v) => cell(v, false)).join('')}${items.map((v) => cell(v, true)).join('')}</div></div>`;
  return `<div class="reels" aria-label="PICHCHRAPA की रील">${row(mixA, '', Math.round(mixA.length * 5.5))}${row(rowB, ' rev', Math.round(rowB.length * 5.5))}</div>`;
}

const personLd = { '@type': 'Person', name: B.founder, jobTitle: 'Founder' };
const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': abs('/#org'),
  name: 'PICHCHRAPA',
  alternateName: ['Pichchrapa', 'Pichrapa Planet'],
  url: abs('/'),
  logo: abs('/img/logo-520.webp'),
  image: abs('/img/og-home.jpg'),
  description: 'PICHCHRAPA लखनऊ का फ़िल्म और वेब-सीरीज़ प्रोडक्शन है, जिसे Indian Films Academy के अभिनेताओं का परिवार चलाता है। फ़िल्मी अदालत और राजा का बाजा इसकी सीरीज़ हैं।',
  email: B.email,
  telephone: B.phone,
  address: { '@type': 'PostalAddress', ...(B.street || B.address ? { streetAddress: B.street || B.address } : {}), addressLocality: 'Lucknow', addressRegion: 'Uttar Pradesh', ...(B.pin ? { postalCode: B.pin } : {}), addressCountry: 'IN' },
  founder: personLd,
  ...(B.gstin ? { taxID: B.gstin } : {}),
  sameAs: [site.channelUrl, site.links.gapistaan, site.links.ifa, site.links.instagram].filter(Boolean),
});
const crumbs = (items) => (siteUrl ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })) }] : []);
const crumbNav = (...items) => `<nav class="crumbs" aria-label="आप यहाँ हैं">${items.map(([n, p]) => (p ? `<a href="${p}">${esc(n)}</a>` : esc(n))).join(' / ')}</nav>`;

const waLink = `https://wa.me/${B.whatsapp}?text=${encodeURIComponent('नमस्ते PICHCHRAPA, मैं आपसे बात करना चाहता/चाहती हूँ।')}`;
const contactButtons = `<a class="btn btn-gold" href="mailto:${esc(B.email)}">ईमेल भेजिए</a><a class="btn btn-ghost" href="tel:${esc(B.phone)}">कॉल कीजिए</a><a class="btn btn-ghost" href="${esc(waLink)}" target="_blank" rel="noopener">WhatsApp पर लिखिए</a>`;

function layout({ title, description, pathName, image, type = 'website', ld = [], body, preload = [], noindex = false }) {
  const url = abs(pathName);
  image = image || abs('/img/og-home.jpg');
  const nav = [
    ['/filmy-adalat/', S.adalat.name],
    ['/raja-ka-baja/', S.raja.name],
    ['/about/', 'हमारी कहानी'],
    ['/contact/', 'संपर्क'],
  ].map(([h, l]) => `<a href="${h}"${h === pathName ? ' aria-current="page"' : ''}>${esc(l)}</a>`).join('');
  return `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${url ? `<link rel="canonical" href="${esc(url)}">` : ''}
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#052b2b">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/teko-devanagari-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/hind-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/teko-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
${preload.map((u) => `<link rel="preload" as="image" href="${esc(u)}">`).join('\n')}
<meta property="og:site_name" content="PICHCHRAPA">
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
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="/" aria-label="PICHCHRAPA होम"><img src="/img/logo-200.webp" alt="" width="48" height="38"><span class="brand-name">PICHCHRAPA</span></a>
    <nav class="topnav" aria-label="मुख्य मेन्यू">${nav}</nav>
    <a class="btn btn-gold btn-sm" href="${esc(site.subscribeUrl)}" target="_blank" rel="noopener">YouTube पर देखिए</a>
  </div>
</header>
${body}
<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand"><img src="/img/logo-200.webp" alt="PICHCHRAPA" width="82" height="64" loading="lazy"></div>
        <p>अभिनेताओं के परिवार का स्टूडियो। ${esc(B.city)}।</p>
        <p>${esc(B.form)}${B.gstRegistered ? ', GST पंजीकृत' : ''}${B.gstin ? `। GSTIN: ${esc(B.gstin)}` : ''}</p>
      </div>
      <div>
        <h2>सीरीज़</h2>
        <ul>
          <li><a href="/filmy-adalat/">${esc(S.adalat.name)}</a></li>
          <li><a href="/raja-ka-baja/">${esc(S.raja.name)}</a></li>
          <li><a href="${esc(site.links.gapistaan)}">गैपिस्तान</a></li>
          <li><a href="${esc(site.channelUrl)}" target="_blank" rel="noopener">YouTube चैनल</a></li>
        </ul>
      </div>
      <div>
        <h2>कंपनी</h2>
        <ul>
          <li><a href="/about/">हमारी कहानी</a></li>
          <li><a href="/contact/">संपर्क</a></li>
          <li><a href="${esc(site.links.ifa)}">Indian Films Academy</a></li>
          <li><a href="/privacy/">प्राइवेसी नीति</a></li>
        </ul>
      </div>
      <div>
        <h2>संपर्क</h2>
        <ul>
          <li><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></li>
          <li><a href="tel:${esc(B.phone)}">${esc(B.phoneLabel)}</a></li>
          <li>${esc(B.address || B.city)}</li>
        </ul>
      </div>
    </div>
    <div class="foot-base"><span>&copy; ${new Date().getFullYear()} PICHCHRAPA. सर्वाधिकार सुरक्षित।</span><span>वीडियो YouTube से चलते हैं और अपने-आप यहाँ जुड़ते हैं।</span></div>
  </div>
</footer>
<script>${appJs}</script>
</body>
</html>
`;
}

// ---------- pages ----------
const factsHtml = () => `<div class="facts" role="list">
  <div role="listitem"><b>${ch.subs ? count(ch.subs) : '-'}</b><span>YouTube सब्सक्राइबर</span></div>
  <div role="listitem"><b>${ch.views ? count(ch.views) + '+' : '-'}</b><span>कुल व्यू</span></div>
  <div role="listitem"><b>${ch.videos || pageVids.length}</b><span>वीडियो और शॉर्ट्स</span></div>
</div>
<p class="muted facts-note">आँकड़े YouTube चैनल @pichchrapa से, ${esc(hiDate(statsDate))} तक।</p>`;

const reelSvg = `<svg class="bigreel" viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92"/><circle cx="100" cy="100" r="16"/><circle cx="100" cy="100" r="30" stroke-width="1.5"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${(100 + 56 * Math.cos((a * Math.PI) / 180)).toFixed(1)}" cy="${(100 + 56 * Math.sin((a * Math.PI) / 180)).toFixed(1)}" r="19"/>`).join('')}<circle cx="100" cy="100" r="76" stroke-width="1.5"/></svg>`;

function creditsHtml() {
  const f = site.family;
  return `<div class="credits" role="group" aria-label="${esc(f.creditsTitle)}">
  <h3>${esc(f.creditsTitle)}</h3>
  <dl>${f.credits.map(([r, w]) => `<div><dt>${esc(r)}</dt><dd>${esc(w)}</dd></div>`).join('')}</dl>
  <p class="credits-note">${esc(f.creditsNote)}</p>
</div>`;
}
const founderHtml = () => `<div class="founder"><img src="/img/founder-yogesh-320.webp" width="64" height="64" loading="lazy" alt="${esc(B.founder)}"><p><b>${esc(B.founder)}</b><br>संस्थापक, PICHCHRAPA और Indian Films Academy</p></div>`;

function caseBlock(c, { limit = 0, grid = false } = {}) {
  const items = limit ? c.items.slice(0, limit) : c.items;
  const first = c.items.find((v) => v.primary) || c.items[0];
  const when = hiMonth(first.publishedAt);
  return `<section class="case" aria-labelledby="case-${c.id}">
  <div class="case-h">${c.no ? `<span class="case-no">केस ${c.no}</span>` : ''}<h3 id="case-${c.id}">${esc(c.name)}</h3><span class="muted">${esc(when)}, ${c.items.length} वीडियो</span></div>
  ${grid ? `<div class="grid" style="margin-top:1.2rem">${items.map((v) => card(v)).join('\n')}</div>` : rail(items, c.name)}
</section>`;
}

function studioHtml({ heading = true } = {}) {
  const st = site.studio;
  if (!st || !st.photos || !st.photos.length) return '';
  return `<div class="studio">
    ${heading ? `<div class="studio-head"><h2 class="h2" id="studio-h">${esc(st.title)}</h2><p>${esc(st.lead)}</p></div>` : ''}
    <div class="studio-grid">${st.photos.map((p, i) => `<figure class="sf sf-${i + 1}"><img src="${esc(p.src)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async" alt="${esc(p.alt)}"><figcaption>${esc(p.cap)}</figcaption></figure>`).join('')}</div>
  </div>`;
}

const figImg = (p) => `<img src="${esc(p.src)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async" alt="${esc(p.alt)}">`;
const stripHtml = (items, cls, label) => `<div class="pstrip ${cls}" role="list" aria-label="${esc(label)}" tabindex="0">${items.map((p) => `<figure class="sp" role="listitem">${figImg(p)}${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ''}</figure>`).join('')}</div>`;

function behindHtml({ heading = true } = {}) {
  const st = site.studio, tm = site.team;
  if (!st && !tm) return '';
  return `<div class="studio">
    ${heading && st ? `<div class="studio-head"><h2 class="h2" id="studio-h">${esc(st.title)}</h2><p>${esc(st.lead)}</p></div>` : ''}
    ${tm && tm.main ? `<div class="team-grid">${tm.main.map((p, i) => `<figure class="sf t${i + 1}">${figImg(p)}<figcaption>${esc(p.cap)}</figcaption></figure>`).join('')}</div>` : ''}
    ${tm && tm.strip ? `<h3 class="h3 strip-h">${esc(tm.stripTitle || 'सेट से')}</h3>${stripHtml(tm.strip, 'set-strip', tm.stripTitle || 'सेट से')}` : ''}
    ${tm && tm.portraits ? `<h3 class="h3 strip-h">${esc(tm.portraitsTitle || 'कलाकार')}</h3>${stripHtml(tm.portraits, 'face-strip', tm.portraitsTitle || 'कलाकार')}` : ''}
    ${st && st.photos ? `<h3 class="h3 strip-h">${esc(st.subTitle || 'एडिटिंग और कलर')}</h3>
    <div class="studio-grid">${st.photos.map((p, i) => `<figure class="sf sf-${i + 1}">${figImg(p)}<figcaption>${esc(p.cap)}</figcaption></figure>`).join('')}</div>` : ''}
  </div>`;
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
      <div class="actions"><a class="btn btn-gold" href="#adalat">${esc(S.adalat.name)} देखिए</a><a class="btn btn-ghost" href="#raja">${esc(S.raja.name)} देखिए</a></div>
      <p class="hero-fine">${esc(site.hero.fine)}</p>
    </div>
    <div class="hero-screen">
      <div class="screen" id="screen">
        <span class="perf perf-l" aria-hidden="true"></span><span class="perf perf-r" aria-hidden="true"></span>
        <div class="frame">
          <video id="intro" muted playsinline autoplay preload="auto" poster="/media/intro-poster.jpg" width="1100" height="803" disablepictureinpicture aria-label="PICHCHRAPA का क्लैपर-बोर्ड इंट्रो"><source src="/media/intro.mp4" type="video/mp4"></video>
          <div class="vf" aria-hidden="true"><i></i><i></i><i></i><i></i><span class="rec"><b></b>REC</span><span class="tc" id="tc">00:00:00:00</span><span class="spec">24 FPS</span></div>
          <button class="btn btn-gold btn-sm replay" id="replay" type="button" data-play="इंट्रो चलाइए">फिर से देखिए</button>
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
        <p style="margin-top:1.2rem"><a href="/about/">पूरी कहानी पढ़िए</a></p>
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
        <h2 class="h2" id="adalat-h"><span class="accent">${esc(S.adalat.name)}</span> <span class="muted" style="font-family:var(--display);font-size:.55em;letter-spacing:.08em">${esc(S.adalat.latin)}</span></h2>
        <p>${esc(S.adalat.intro)}</p>
      </div>
      <a class="btn btn-ghost" href="/filmy-adalat/">सारे केस देखिए</a>
    </div>
    ${homeCases.map((c) => caseBlock(c, { limit: 8 })).join('\n')}
  </div>
</section>

<section class="sec raja" id="raja" aria-labelledby="raja-h">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2 class="h2" id="raja-h"><span class="accent">${esc(S.raja.name)}</span> <span class="muted" style="font-family:var(--display);font-size:.55em;letter-spacing:.08em">${esc(S.raja.latin)}</span></h2>
        <p>${esc(S.raja.intro)}</p>
      </div>
      <a class="btn btn-ghost" href="/raja-ka-baja/">सारे एपिसोड (${rajaEps.length})</a>
    </div>
    ${latest ? `<div class="feat-grid">
      <article class="feature">
        <div class="thumb"><img src="${esc(thumbOf(latest))}" width="640" height="360" alt="" decoding="async"><span class="play"></span><span class="live">सबसे नया</span><span class="dur">${clock(latest.sec)}</span><a href="${esc(hrefOf(latest))}" style="position:absolute;inset:0;z-index:3" aria-label="${esc(latest.clean)}"></a></div>
        <div class="vbody"><a class="vtitle" href="${esc(hrefOf(latest))}">${esc(latest.clean)}</a><span class="vmeta">${esc(hiDate(latest.publishedAt))}</span></div>
      </article>
      <div class="latest" aria-label="पिछले एपिसोड">
        ${side.map((v) => `<a class="mini" href="${esc(hrefOf(v))}"><span class="thumb"><img src="${esc(smallThumb(v))}" width="128" height="72" loading="lazy" decoding="async" alt=""></span><span><b>${esc(trunc(v.clean, 70))}</b><span>${esc(hiDate(v.publishedAt))}</span></span></a>`).join('\n        ')}
      </div>
    </div>` : ''}
    ${hitShorts.length ? `<h3 class="h3 shorts-h">हिट शॉर्ट्स</h3>
    <p class="muted">सबसे ज़्यादा देखे गए शॉर्ट्स। किसी पर दबाइए, यहीं चल जाएगा।</p>
    <div class="shorts" role="list" aria-label="हिट शॉर्ट्स">${hitShorts.map(shortCard).join('')}</div>
    <p class="more"><a class="btn btn-ghost" href="${esc(site.shortsUrl)}" target="_blank" rel="noopener">YouTube पर और शॉर्ट्स</a></p>` : ''}
  </div>
</section>

<section class="sec" aria-labelledby="studio-h">
  <div class="wrap">${behindHtml()}</div>
</section>

<section class="sec sec-alt" aria-labelledby="brands-h">
  <div class="wrap">
    <h2 class="h2" id="brands-h">${esc(site.brands.title)}</h2>
    <div class="brands">${site.brands.items.map((b) => `<a class="brand-card" href="${esc(b.url)}"><img src="${esc(b.img)}" alt="" width="84" height="84" loading="lazy"><span><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p><span>${esc(b.cta)}</span></span></a>`).join('')}</div>
  </div>
</section>

<section class="sec" aria-labelledby="co-h">
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
      <div class="actions">${contactButtons}</div>
    </div>
  </div>
</section>
</main>`;
  return layout({
    title: 'PICHCHRAPA | फ़िल्मी अदालत और राजा का बाजा बनाने वाला लखनऊ का प्रोडक्शन',
    description: 'PICHCHRAPA लखनऊ का फ़िल्म और वेब-सीरीज़ प्रोडक्शन है, जिसे अभिनेताओं का परिवार चलाता है। फ़िल्मी अदालत, राजा का बाजा और शॉर्ट्स यहाँ देखिए।',
    pathName: '/',
    preload: ['/media/intro-poster.jpg'],
    ld: [orgLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'PICHCHRAPA', url: abs('/'), inLanguage: 'hi', publisher: { '@id': abs('/#org') } }],
    body,
  });
}

function companyFacts() {
  const rows = [
    ['फ़र्म का नाम', 'PICHCHRAPA'],
    B.legalName ? ['विधिक नाम (GST के अनुसार)', B.legalName] : null,
    ['स्वरूप', B.form],
    ['GST', B.gstRegistered ? (B.gstin ? `पंजीकृत, GSTIN ${B.gstin}` : 'पंजीकृत') : null],
    ['संस्थापक', B.founder],
    ['पता', B.address || B.city],
    ['ईमेल', `<a href="mailto:${esc(B.email)}">${esc(B.email)}</a>`, true],
    ['फ़ोन', `<a href="tel:${esc(B.phone)}">${esc(B.phoneLabel)}</a>`, true],
  ].filter((r) => r && r[1]);
  return `<dl class="facts-list">${rows.map(([k, v, raw]) => `<dt>${esc(k)}</dt><dd>${raw ? v : esc(v)}</dd>`).join('')}</dl>`;
}

function adalatPage() {
  const first = adalatEps.filter((v) => v.primary).slice(-1)[0];
  const body = `<main id="main" class="wrap page adalat">
${crumbNav(['PICHCHRAPA', '/'], [S.adalat.name])}
<h1 class="page-h1"><span class="accent">${esc(S.adalat.name)}</span></h1>
<p class="lede">${esc(S.adalat.pageIntro)}</p>
<p class="muted">${adalatEps.length} वीडियो, ${liveCases.filter((c) => c.no).length} केस${first ? `, पहला केस ${esc(hiMonth(first.publishedAt))} में` : ''}।</p>
${caseOrder.map((c) => caseBlock(c, { grid: true })).join('\n')}
${otherEps.length ? `<section class="case" aria-labelledby="other-h"><div class="case-h"><h3 id="other-h">${esc(S.other.name)}</h3><span class="muted">${otherEps.length} वीडियो</span></div><p class="muted" style="margin-top:.6rem">${esc(S.other.intro)}</p><div class="grid" style="margin-top:1.2rem">${otherEps.map((v) => card(v)).join('\n')}</div></section>` : ''}
${postersHtml()}
</main>`;
  return layout({
    title: `${S.adalat.name} (Filmy Adalat) | कोर्टरूम कॉमेडी वेब सीरीज़ | PICHCHRAPA`,
    description: 'फ़िल्मी अदालत PICHCHRAPA की पहली वेब सीरीज़ है, एक कोर्टरूम कॉमेडी। पति पत्नी और वो, पाखी का स्वयंबर, जिन्न की आज़ादी और जीजा साले का तलाक देखिए।',
    pathName: '/filmy-adalat/',
    ld: [
      ...crumbs([['PICHCHRAPA', '/'], [S.adalat.name, '/filmy-adalat/']]),
      { '@context': 'https://schema.org', '@type': 'TVSeries', name: S.adalat.name, alternateName: ['Filmy Adalat', 'Filmy Adaalat', 'Filmi Adalat'], genre: 'Comedy', inLanguage: 'hi', url: abs('/filmy-adalat/'), productionCompany: { '@id': abs('/#org') }, numberOfEpisodes: adalatEps.filter((v) => v.primary).length },
    ],
    body,
  });
}

function rajaPage() {
  const body = `<main id="main" class="wrap page raja">
${crumbNav(['PICHCHRAPA', '/'], [S.raja.name])}
<h1 class="page-h1"><span class="accent">${esc(S.raja.name)}</span></h1>
<p class="lede">${esc(S.raja.pageIntro)}</p>
<p class="muted">${rajaEps.length} एपिसोड और ${rajaShorts.length} शॉर्ट्स, ${esc(hiMonth(rajaEps[rajaEps.length - 1].publishedAt))} से।</p>
${hitShorts.length ? `<h2 class="h3 shorts-h">हिट शॉर्ट्स</h2><div class="shorts" role="list" aria-label="हिट शॉर्ट्स">${hitShorts.map(shortCard).join('')}</div>` : ''}
<h2 class="h2" style="margin-top:2.4rem">सारे एपिसोड</h2>
<div class="grid" id="eps" style="margin-top:1.2rem">${rajaEps.map((v, i) => card(v).replace('<article class="vcard">', `<article class="vcard"${i >= 24 ? ' hidden' : ''}>`)).join('\n')}</div>
${rajaEps.length > 24 ? `<p class="more"><button class="btn btn-gold" type="button" data-more="#eps">और एपिसोड दिखाइए</button></p>` : ''}
</main>`;
  return layout({
    title: `${S.raja.name} (Raja Ka Baja) | लखनऊ की स्ट्रीट कॉमेडी | PICHCHRAPA`,
    description: 'राजा का बाजा, लखनऊ की सड़कों पर राजा और मंत्री की रोज़ की कॉमेडी। सारे एपिसोड और हिट शॉर्ट्स PICHCHRAPA पर देखिए।',
    pathName: '/raja-ka-baja/',
    ld: [
      ...crumbs([['PICHCHRAPA', '/'], [S.raja.name, '/raja-ka-baja/']]),
      { '@context': 'https://schema.org', '@type': 'TVSeries', name: S.raja.name, alternateName: ['Raja Ka Baja', S.raja.alt], genre: 'Comedy', inLanguage: 'hi', url: abs('/raja-ka-baja/'), productionCompany: { '@id': abs('/#org') }, numberOfEpisodes: rajaEps.length },
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
  const desc = trunc(v.paras[0] || `${v.clean}, ${seriesName} का एपिसोड, ${hiDate(v.publishedAt)} को PICHCHRAPA पर आया।`, 155);
  const body = `<main id="main" class="wrap narrow page ${v.series}">
${crumbNav(['PICHCHRAPA', '/'], [seriesName, seriesPath], [trunc(v.clean, 60)])}
<div class="player"><button class="thumb" type="button" data-yt="${esc(v.id)}" data-title="${esc(v.clean)}" aria-label="चलाइए: ${esc(v.clean)}"><img src="${esc(thumbOf(v))}" width="1280" height="720" alt="" decoding="async"><span class="play"></span></button></div>
<h1 class="page-h1" style="margin-top:1.3rem;font-size:clamp(2rem,4.6vw,3.2rem)">${esc(v.clean)}</h1>
<p class="ep-meta"><span>${esc(seriesName)}</span><span>${esc(hiDate(v.publishedAt))}</span><span>${clock(v.sec)}</span><a href="${esc(watchUrl(v))}" target="_blank" rel="noopener">YouTube पर खोलिए</a></p>
<section class="prose">
${v.paras.length ? v.paras.map((p) => `<p>${esc(p)}</p>`).join('\n') : `<p>${esc(v.clean)}, ${esc(seriesName)} का एपिसोड। पूरा वीडियो ऊपर चलाइए।</p>`}
<p>${esc(site.channelUrl ? 'ऐसे और वीडियो के लिए ' : '')}<a href="${esc(site.subscribeUrl)}" target="_blank" rel="noopener">YouTube पर PICHCHRAPA को सब्सक्राइब कीजिए</a>।</p>
</section>
${prev || next ? `<div class="pn">${prev ? `<a href="/video/${prev.id}/"><small>${v.series === 'adalat' ? 'पिछला' : 'पुराना'}</small>${esc(trunc(prev.clean, 70))}</a>` : '<span></span>'}${next ? `<a href="/video/${next.id}/"><small>${v.series === 'adalat' ? 'अगला' : 'नया'}</small>${esc(trunc(next.clean, 70))}</a>` : '<span></span>'}</div>` : ''}
${mates.length ? `<h2 class="h3" style="margin-top:2.4rem">${v.series === 'adalat' ? 'इसी केस के और वीडियो' : `${esc(seriesName)} के और एपिसोड`}</h2><div class="grid" style="margin-top:1rem">${mates.slice(0, 3).map((x) => card(x)).join('\n')}</div>` : ''}
</main>`;
  const video = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.clean,
    description: v.paras.join(' ') || v.clean,
    thumbnailUrl: [thumbOf(v), v.thumbs.high].filter(Boolean).filter((u, k, a) => a.indexOf(u) === k),
    uploadDate: v.publishedAt,
    duration: v.duration,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    contentUrl: watchUrl(v),
    inLanguage: 'hi',
    isFamilyFriendly: true,
    publisher: { '@id': abs('/#org') },
    ...(v.series !== 'other' ? { partOfSeries: { '@type': 'TVSeries', name: seriesName, url: abs(seriesPath) } } : {}),
    ...(v.tags?.length ? { keywords: v.tags.slice(0, 12).join(', ') } : {}),
  };
  return layout({
    title: `${trunc(v.title.replace(/\s+/g, ' '), 78)} | PICHCHRAPA`,
    description: desc,
    pathName: `/video/${v.id}/`,
    image: thumbOf(v),
    type: 'video.other',
    ld: [...crumbs([['PICHCHRAPA', '/'], [seriesName, seriesPath], [v.clean, `/video/${v.id}/`]]), video],
    body,
  });
}

function aboutPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(['PICHCHRAPA', '/'], ['हमारी कहानी'])}
<h1 class="page-h1">हमारी कहानी</h1>
<p class="lede">PICHCHRAPA अभिनेताओं के एक परिवार का स्टूडियो है। यहाँ कलाकार सिर्फ़ पर्दे पर नहीं, कैमरे के पीछे भी वही हैं।</p>
<div class="family" style="margin-top:2rem">
  <div class="prose">
    <h2>${esc(site.family.title)}</h2>
    ${site.family.paras.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    <p class="why" style="border-left:3px solid var(--brass);padding-left:1.1rem;color:#fff">${esc(site.family.why)}</p>
    <h2>कैसे काम होता है</h2>
    <p>हर सीरीज़ की कहानी, निर्देशन, एडिटिंग, कलर और संगीत परिवार के कलाकार ख़ुद करते हैं। फ़िल्मी अदालत हमारी पहली वेब सीरीज़ थी। आज राजा का बाजा हर रोज़ आता है, और गैपिस्तान जैसी नई सीरीज़ भी इसी परिवार से निकल रही हैं।</p>
    <h2>${esc(site.studio ? site.studio.title : 'स्टूडियो')}</h2>
    <p>${esc(site.studio ? site.studio.lead : '')}</p>
    <h2>संस्थापक</h2>
    ${founderHtml()}
    <p style="margin-top:1rem">योगेश चैतन्य अभिनय-गुरु, निर्देशक और अभिनेता हैं और Indian Films Academy के संस्थापक हैं। PICHCHRAPA के कलाकार उन्हीं के सिखाए हुए अभिनेता हैं।</p>
  </div>
  <div>${creditsHtml()}</div>
</div>
<section style="margin-top:2.2rem" aria-label="स्टूडियो की तस्वीरें">${behindHtml({ heading: false })}</section>
<section class="prose" style="margin-top:2.4rem"><h2>${esc(site.company.title)}</h2><p>${esc(site.company.lead)}</p>${companyFacts()}</section>
<div class="actions" style="margin-top:2rem"><a class="btn btn-gold" href="/filmy-adalat/">${esc(S.adalat.name)} देखिए</a><a class="btn btn-ghost" href="/raja-ka-baja/">${esc(S.raja.name)} देखिए</a><a class="btn btn-ghost" href="/contact/">संपर्क कीजिए</a></div>
</main>`;
  return layout({
    title: 'हमारी कहानी | अभिनेताओं का परिवार, PICHCHRAPA',
    description: 'PICHCHRAPA में अभिनेता ही लेखक, निर्देशक, एडिटर, DI कलरिस्ट और संगीतकार हैं। Indian Films Academy से तैयार हुए कलाकारों के परिवार की कहानी।',
    pathName: '/about/',
    ld: crumbs([['PICHCHRAPA', '/'], ['हमारी कहानी', '/about/']]),
    body,
  });
}

function contactPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(['PICHCHRAPA', '/'], ['संपर्क'])}
<h1 class="page-h1">संपर्क</h1>
<p class="lede">${esc(site.contact.lead)}</p>
<div class="actions">${contactButtons}</div>
<section class="prose" style="margin-top:2rem"><h2>PICHCHRAPA</h2>${companyFacts()}</section>
</main>`;
  return layout({
    title: 'संपर्क | PICHCHRAPA, लखनऊ',
    description: 'PICHCHRAPA से ईमेल, फ़ोन या WhatsApp पर बात कीजिए। ब्रांड-कोलैब, प्रोडक्शन और नए प्रोजेक्ट के लिए।',
    pathName: '/contact/',
    ld: crumbs([['PICHCHRAPA', '/'], ['संपर्क', '/contact/']]),
    body,
  });
}

function privacyPage() {
  const body = `<main id="main" class="wrap page">
${crumbNav(['PICHCHRAPA', '/'], ['प्राइवेसी'])}
<h1 class="page-h1">प्राइवेसी नीति</h1>
<section class="prose">
<p>pichchrapa.com पर हम आपसे नाम, फ़ोन या ईमेल जैसी कोई निजी जानकारी नहीं माँगते और न जमा करते हैं।</p>
<p>वीडियो के थंबनेल YouTube के सर्वर (i.ytimg.com) से आते हैं, इसलिए पेज खुलने पर YouTube को आपका IP एड्रेस दिख सकता है। वीडियो या शॉर्ट पर दबाने से पहले YouTube का प्लेयर लोड नहीं होता। दबाने के बाद वीडियो youtube-nocookie.com के प्लेयर में चलता है, और YouTube (Google) अपनी नीति के अनुसार जानकारी इस्तेमाल कर सकता है।</p>
<p>ईमेल, फ़ोन या WhatsApp के बटन सिर्फ़ आपका ईमेल ऐप, फ़ोन या WhatsApp खोलते हैं। आप जो भेजते हैं, वह सीधे हमारे पास आता है और सिर्फ़ आपको जवाब देने के लिए इस्तेमाल होता है।</p>
<p>किसी भी सवाल के लिए लिखिए: <a href="mailto:${esc(B.email)}">${esc(B.email)}</a></p>
<p class="muted">आख़िरी बदलाव: ${esc(hiDate(new Date().toISOString()))}</p>
</section>
</main>`;
  return layout({
    title: 'प्राइवेसी नीति | PICHCHRAPA',
    description: 'pichchrapa.com की प्राइवेसी नीति: हम कोई निजी जानकारी नहीं लेते; वीडियो YouTube के प्लेयर में चलते हैं।',
    pathName: '/privacy/',
    ld: crumbs([['PICHCHRAPA', '/'], ['प्राइवेसी', '/privacy/']]),
    body,
  });
}

function notFoundPage() {
  return layout({
    title: 'यह पन्ना नहीं मिला | PICHCHRAPA',
    description: 'यह पन्ना PICHCHRAPA की वेबसाइट पर नहीं है।',
    pathName: '/404',
    noindex: true,
    body: `<main id="main" class="wrap lost"><img src="/img/logo-520.webp" alt="" width="320" height="251"><h1 class="page-h1">यह पन्ना यहाँ नहीं है</h1><p style="margin:0 auto 1.4rem">हो सकता है लिंक पुराना हो। सारी सीरीज़ होम पेज पर हैं।</p><p class="actions" style="justify-content:center"><a class="btn btn-gold" href="/">होम पेज पर जाइए</a></p></main>`,
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

await writeFile(path.join(out, 'index.html'), homePage());
await page('filmy-adalat', adalatPage());
await page('raja-ka-baja', rajaPage());
await page('about', aboutPage());
await page('contact', contactPage());
await page('privacy', privacyPage());
for (const [i, v] of pageVids.entries()) await page(`video/${v.id}`, videoPage(v, i, pageVids));
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
  await writeFile(
    path.join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(abs(u.p))}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`,
  );
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
} else {
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n`);
}
const files = await readdir(out, { recursive: true });
console.log(`pichchrapa/dist तैयार: ${adalatEps.length} फ़िल्मी अदालत, ${rajaEps.length} राजा का बाजा, ${rajaShorts.length} शॉर्ट्स, ${pageVids.length} वीडियो पेज, ${files.length} फ़ाइलें`);
