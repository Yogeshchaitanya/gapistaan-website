// Builds indianfilmsacademy.com into ifa/dist: Hindi at /, English at /en/.
// Inputs: content/site.json, data/videos.json, data/instagram.json. No dependencies.
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const site = JSON.parse(await readFile(path.join(root, 'content/site.json'), 'utf8'));
const vdata = JSON.parse(await readFile(path.join(root, 'data/videos.json'), 'utf8'));
const guides = existsSync(path.join(root, 'content/guides.json')) ? JSON.parse(await readFile(path.join(root, 'content/guides.json'), 'utf8')) : [];
const igdata = existsSync(path.join(root, 'data/instagram.json')) ? JSON.parse(await readFile(path.join(root, 'data/instagram.json'), 'utf8')) : { posts: [] };
const css = (await readFile(path.join(root, 'src/styles.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n+/g, '\n');
const siteUrl = site.siteUrl.replace(/\/+$/, '');
const abs = (p) => siteUrl + p;
const LANGS = ['hi', 'en'];
const prefixOf = (lang) => (lang === 'hi' ? '' : '/en');

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const fmt = (s, vars) => String(s).replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || '');
  return m ? (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0) : 0;
}
function clock(sec) {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60, p = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${p(m)}:${p(s)}` : `${m}:${p(s)}`;
}
const money = (n) => '₹' + Number(n).toLocaleString('en-IN');
const img = (name, w, alt, { sizes = '100vw', lazy = true, cls = '', width, height, widths, high = false } = {}) => {
  const ws = widths || [w];
  const srcset = ws.length > 1 ? ` srcset="${ws.map((x) => `/img/${name}-${x}.webp ${x}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="/img/${name}-${w}.webp"${srcset} alt="${esc(alt)}"${width ? ` width="${width}" height="${height}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ''}${high ? ' fetchpriority="high"' : ''}>`;
};
const addressEn = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.pin}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Indian Films Academy, ' + addressEn)}`;

// ---------- videos: only full-length class/academy videos, with clean titles ----------
const vc = site.videos || {};
const blockRe = vc.block?.length ? new RegExp(vc.block.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i') : null;
const hide = new Set(vc.hide || []);
function cleanTitle(t) {
  const parts = t.replace(/#\S+/g, '').split('|').map((x) => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const noise = /^(indian films? acc?ademy|camera acting|learn online acting.*|by\s*-?.*|\d{1,2} \w+ 20\d\d)$/i;
  const kept = parts.filter((x) => !noise.test(x));
  let t2 = (kept.length ? kept : parts).slice(0, 2).join(' · ');
  t2 = t2
    .replace(/yogesh\s+mi?shrr?as?\s+actors?\s+transformation\s+system(\s*\(ATS\))?/gi, 'Yogesh CineAct')
    .replace(/actors?\s+transformation\s+system(\s*\(ATS\))?/gi, 'Yogesh CineAct')
    .replace(/\bfree\s+/gi, '')
    .replace(/\bPART\s*-\s*(\d+)/gi, 'Part $1')
    .replace(/\b[A-Z]{3,}\b/g, (w) => (/^(CINEKAR|IFA|DI|ATS|PICHCHRAPA)$/.test(w) ? w : w[0] + w.slice(1).toLowerCase()))
    .replace(/\s+\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return t2.length > 90 ? t2.slice(0, 88).replace(/\s+\S*$/, '') + '…' : t2;
}
const videos = (vdata.videos || [])
  .map((v) => ({ ...v, sec: seconds(v.duration) }))
  .filter((v) => !v.isShort && v.sec >= 60 && !hide.has(v.id) && !(blockRe && blockRe.test(v.title)))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((v) => ({ ...v, clean: vc.titles?.[v.id] || cleanTitle(v.title) }));
const igPosts = igdata.posts || [];

// ---------- gallery ----------
const galleryFiles = existsSync(path.join(root, 'public/img/g')) ? (await readdir(path.join(root, 'public/img/g'))).filter((f) => f.endsWith('-480.webp')).sort() : [];
const nameOrder = Object.keys(site.legendNames || {});
const gallery = galleryFiles.map((f) => {
  const base = f.replace(/-480\.webp$/, '');
  const names = site.legendNames?.[base.slice(2)] || null;
  return { group: base[0], base, names };
});
const rank = (g) => (g.names ? nameOrder.indexOf(g.base.slice(2)) : 999);
const byRank = (a, b) => rank(a) - rank(b) || a.base.localeCompare(b.base);
const legends = gallery.filter((g) => g.group === 'L').sort(byRank);
const visitors = gallery.filter((g) => g.group === 'V').sort(byRank);
// Film-strip: one photo with Yogesh, then one with Dinesh, alternately (lists in site.json "strip").
const byKey = Object.fromEntries(gallery.map((g) => [g.base.slice(2), g]));
const pick = (keys) => (keys || []).map((k) => byKey[k]).filter(Boolean);
const sy = pick(site.strip?.yogesh), sd = pick(site.strip?.dinesh);
const stripPhotos = [];
for (let i = 0; i < Math.max(sy.length, sd.length); i++) { if (sy[i]) stripPhotos.push(sy[i]); if (sd[i]) stripPhotos.push(sd[i]); }
if (!stripPhotos.length) stripPhotos.push(...legends.filter((g) => g.names).slice(0, 16));

// ---------- reels: the stars' video blessings from the old site, compressed into public/media ----------
const mediaDir = path.join(root, 'public/media');
const reels = (site.reels || [])
  .filter((r) => existsSync(path.join(mediaDir, `loop-${r.slug}.mp4`)) && existsSync(path.join(mediaDir, `poster-${r.slug}.jpg`)))
  .map((r) => ({ ...r, full: existsSync(path.join(mediaDir, `full-${r.slug}.mp4`)) ? `/media/full-${r.slug}.mp4` : '' }));
const heroReels = reels.filter((r) => r.hero).slice(0, 6);

// ---------- structured data ----------
const orgId = abs('/#academy');
const orgLd = (lang) => ({
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': orgId,
  name: 'Indian Films Academy',
  alternateName: ['इंडियन फिल्म्स एकेडमी', 'IFA Lucknow', 'Indian Film Academy Lucknow', 'Indian Films Academy Gomti Nagar'],
  areaServed: [{ '@type': 'City', name: 'Lucknow' }, { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' }],
  knowsAbout: ['Cinematic acting', 'Camera acting', 'Film direction', 'Film editing', 'Yogesh CineAct method', 'YouTube and Instagram content creation'],
  contactPoint: { '@type': 'ContactPoint', contactType: 'admissions', telephone: site.phone, email: site.email, areaServed: 'IN', availableLanguage: ['Hindi', 'English'] },
  ...(site.geo ? { geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
  ...(site.mapUrl ? { hasMap: site.mapUrl } : {}),
  url: abs('/'),
  logo: abs('/img/logo-emblem-512.webp'),
  image: abs('/img/hero-group-1600.webp'),
  description: site.en.about[0],
  foundingDate: String(site.since),
  telephone: site.phone,
  email: site.email,
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.pin, addressCountry: 'IN' },
  founder: site.founderMeta.map((f, i) => ({ '@type': 'Person', name: f.nameEn, jobTitle: site.en.founders[i].role, ...(f.links.length ? { sameAs: f.links.map(([, h]) => (h.startsWith('/') ? abs(h) : h)) } : {}) })),
  sameAs: [site.youtubeUrl, site.instagramUrl, site.facebookUrl].filter(Boolean),
  inLanguage: lang,
});
const courseLd = (lang, slug) => {
  const T = site[lang].tracks[slug];
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${site.courses[slug].en}: ${T.seo}`,
    description: T.description,
    inLanguage: 'hi',
    provider: { '@type': 'EducationalOrganization', '@id': orgId, name: 'Indian Films Academy', sameAs: abs('/') },
    offers: { '@type': 'Offer', category: 'Paid', price: site.fee, priceCurrency: 'INR', url: abs(`${prefixOf(lang)}/${site.courses[slug].slug}/`) },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Onsite', location: { '@type': 'Place', name: 'Indian Films Academy', address: addressEn }, courseWorkload: 'P3M' },
  };
};
const faqLd = (list) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbsLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(p) })) });

// ---------- page builder for one language ----------
function buildLang(lang) {
  const L = site[lang];
  const pre = prefixOf(lang);
  const other = lang === 'hi' ? 'en' : 'hi';
  const u = (p) => pre + p;
  const applyUrl = u('/admission/');
  const crumbs = (items) => `<nav class="crumbs" aria-label="breadcrumb">${items.map(([n, p], i) => (i < items.length - 1 ? `<a href="${p}">${esc(n)}</a>` : `<span>${esc(n)}</span>`)).join('<span aria-hidden="true"> / </span>')}</nav>`;
  const tracks = site.trackOrder.map((key) => ({ key, slug: site.courses[key].slug, name: site.courses[key].en, ...L.tracks[key] }));
  const GH = L.guidesHome;
  const guideList = () => `<ul class="guide-list">${guides.map((g) => `<li><a class="guide-card" href="${u(`/guides/${g.slug}/`)}"><strong>${esc(g[lang].h1)}</strong><span>${esc(g[lang].lede)}</span><span class="more">${esc(GH.read)}</span></a></li>`).join('')}</ul>`;
  const TP = L.trackPage, CPG = L.coursesPage, DN = L.donate, AD = L.admit, CA = L.cineact, CH = L.cineactHome;
  const li = (x) => `<li>${esc(x)}</li>`;
  const feeVars = {
    i1: money(site.installments[0]), i2: money(site.installments[1]), total: money(site.installments.reduce((a, b) => a + b, 0)), pct: site.scholarshipPct,
    fee: money(site.fee), phone: site.phoneLabel, email: site.email,
    addr: `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.pin}`,
    founders: L.founders.map((f) => f.name).join(lang === 'hi' ? ' और ' : ' and '),
  };
  const glance = () => `<dl class="glance">${L.glance.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(fmt(v, feeVars))}</dd></div>`).join('')}</dl>`;
  const practical = () => `<aside class="practical"><strong>${esc(L.practical.title)}</strong><p>${esc(L.practical.text)}</p></aside>`;

  function layout({ title, description, pathName, image, ld = [], body, type = 'website', noindex = false }) {
    const url = abs(u(pathName));
    const altHi = abs(pathName), altEn = abs('/en' + pathName);
    const switchHref = (other === 'hi' ? '' : '/en') + pathName;
    const nav = `<a class="nav-free" href="${u('/videos/')}"${pathName.startsWith('/videos/') ? ' aria-current="page"' : ''}><span class="live-dot" aria-hidden="true"></span>${esc(L.freeNav)}</a>`
      + L.nav.map(([h, l]) => `<a href="${u(h)}"${pathName.startsWith(h) ? ' aria-current="page"' : ''}>${esc(l)}</a>`).join('');
    const socials = [site.youtubeUrl && ['YouTube', site.youtubeUrl], site.instagramUrl && ['Instagram', site.instagramUrl], site.facebookUrl && ['Facebook', site.facebookUrl]].filter(Boolean);
    const F = L.foot;
    const script = lang === 'hi' ? 'devanagari' : 'latin';
    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="alternate" hreflang="hi" href="${esc(altHi)}">
<link rel="alternate" hreflang="en" href="${esc(altEn)}">
<link rel="alternate" hreflang="x-default" href="${esc(altHi)}">`}
<meta name="theme-color" content="#023E41">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/cinzel-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-${script}-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-${script}-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:site_name" content="Indian Films Academy">
<meta property="og:locale" content="${lang === 'hi' ? 'hi_IN' : 'en_IN'}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(image || abs('/img/hero-group-1600.webp'))}">
<meta name="twitter:card" content="summary_large_image">
<style>${css}</style>
${ld.map(jsonLd).join('\n')}
</head>
<body class="lang-${lang}">
<a class="skip" href="#main">${esc(L.skip)}</a>
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="${u('/')}"><img src="/img/logo-emblem-96.webp" alt="" width="44" height="44"><span><span class="brand-name">Indian Films Academy</span><span class="brand-sub">${esc(L.brandSub)}</span></span></a>
    <nav class="topnav" aria-label="Menu">${nav}</nav>
    <div class="top-actions">
      <a class="lang-switch" href="${switchHref}" hreflang="${other}" lang="${other}">${esc(L.switchLabel)}</a>
      <a class="btn btn-primary btn-sm" href="${applyUrl}">${esc(L.apply)}</a>
    </div>
  </div>
</header>
${body}
<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <div class="foot-brand"><img src="/img/logo-emblem-96.webp" alt="" width="52" height="52" loading="lazy"><span>Indian Films Academy</span></div>
      <p>${esc(F.tag)}</p>
      <p class="foot-muted">${esc(L.addressText)}</p>
    </div>
    <div>
      <h2>${esc(F.courses)}</h2>
      <ul>
        ${tracks.map((t) => `<li><a href="${u(`/${t.slug}/`)}">${esc(t.seo)}</a></li>`).join('\n        ')}
        <li><a href="${u('/courses/')}">${esc(F.cinekar)}</a></li>
        <li><a href="${u('/admission/')}">${esc(F.admission)}</a></li>
        <li><a href="${u('/videos/')}">${esc(L.freeNav)}</a></li>
        <li><a href="${u('/online/')}">${esc(F.online)}</a></li>
      </ul>
    </div>
    <div>
      <h2>${esc(F.academy)}</h2>
      <ul>
        <li><a href="${u('/about/')}">${esc(F.about)}</a></li>
        <li><a href="${u('/yogesh-cineact/')}">${esc(F.cineact)}</a></li>
        <li><a href="${u('/bytes/')}">${esc(F.bytes)}</a></li>
        <li><a href="${u('/guides/')}">${esc(F.guides)}</a></li>
        <li><a href="${u('/gallery/')}">${esc(F.gallery)}</a></li>
        <li><a href="${u('/videos/')}">${esc(F.videos)}</a></li>
        <li><a href="${u('/privacy/')}">${esc(F.privacy)}</a></li>
        ${socials.map(([l, h]) => `<li><a href="${esc(h)}">${l}</a></li>`).join('\n        ')}
      </ul>
    </div>
    <div>
      <h2>${esc(F.contact)}</h2>
      <ul>
        <li><a href="tel:${esc(site.phone)}">${esc(site.phoneLabel)}</a></li>
        <li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
        <li><a href="${mapsUrl}">${esc(L.contact.directions)}</a></li>
        <li><a href="${switchHref}" lang="${other}">${esc(L.switchLabel)}</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <span>© ${new Date().getFullYear()} ${esc(F.copy)}</span>
    <span class="foot-pol"><a href="${u('/fees/')}">${esc(F.fees)}</a><a href="${u('/terms/')}">${esc(F.terms)}</a><a href="${u('/refund-policy/')}">${esc(F.refund)}</a><a href="${u('/shipping-policy/')}">${esc(F.shipping)}</a><a href="${u('/privacy/')}">${esc(F.privacy)}</a></span>
    <span>${esc(F.partner)}: <a href="https://pichchrapa.com">PICHCHRAPA</a> · <a href="https://gapistaan.com">Gapistaan</a></span>
  </div>
</footer>
<script type="application/json" id="pay-i18n">${JSON.stringify({ ...L.pay, wa: site.whatsapp }).replace(/</g, '\\u003c')}</script>
${PAGE_JS}
${site.cfAnalyticsToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${esc(site.cfAnalyticsToken)}"}'></script>` : ''}
</body>
</html>
`;
  }

  // ----- blocks -----
  const videoCard = (v) => `<li><a class="vcard" href="https://www.youtube.com/watch?v=${v.id}" data-id="${v.id}" data-title="${esc(v.clean)}">
  <span class="thumb"><img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" srcset="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg 320w, https://i.ytimg.com/vi/${v.id}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${v.id}/sddefault.jpg 640w" sizes="(min-width: 64rem) 24rem, 80vw" alt="" width="320" height="180" loading="lazy" decoding="async"><span class="play-dot" aria-hidden="true"></span><span class="dur" aria-hidden="true">${clock(v.sec)}</span></span>
  <span class="vtitle">${esc(v.clean)}</span>
</a></li>`;

  const rail = (items, cls, label) => `<div class="rail-wrap">
  <button class="rail-btn prev" type="button" aria-label="${lang === 'hi' ? 'पीछे' : 'Previous'}" data-dir="-1">‹</button>
  <ul class="rail ${cls}" aria-label="${esc(label)}">${items}</ul>
  <button class="rail-btn next" type="button" aria-label="${lang === 'hi' ? 'आगे' : 'Next'}" data-dir="1">›</button>
</div>`;

  const nameIdx = lang === 'hi' ? 0 : 1;
  const capOf = (g) => (g.names ? fmt(L.withName, { name: g.names[nameIdx] }) : g.group === 'V' ? L.guestCap : L.legendCap);
  const photo = (g, dup = false) => `<li><a class="js-view" href="/img/g/${g.base}-1200.webp" data-cap="${esc(capOf(g))}"${dup ? ' tabindex="-1"' : ''}><img src="/img/g/${g.base}-480.webp" alt="${dup ? '' : esc(capOf(g) + ': Indian Films Academy')}" loading="lazy" decoding="async" width="480" height="360">${g.names ? `<span class="gcap">${esc(g.names[nameIdx])}</span>` : ''}</a></li>`;
  const marquee = (items) => `<div class="marquee"><ul class="marquee-track">${items.map((g) => photo(g)).join('')}</ul><ul class="marquee-track" aria-hidden="true">${items.map((g) => photo(g, true)).join('')}</ul></div>`;
  const grid = (items) => `<ul class="gallery">${items.map((g) => photo(g)).join('\n')}</ul>`;
  const viewer = `<dialog id="viewer" class="viewer"><figure><img alt=""><figcaption></figcaption></figure></dialog>`;

  const reelName = (r) => (lang === 'hi' ? r.hi : r.en);
  const reelRole = (r) => (lang === 'hi' ? r.roleHi : r.roleEn) || '';
  const SPEAKER = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.6a4.4 4.4 0 0 1 0 6.8M18.6 6a8 8 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  const reelCard = (r, d = 0, dur = false) => `<li class="reel-card"${d ? ` style="--d:${d}s"` : ''}><button class="reel" type="button" data-full="${esc(r.full)}" data-yt="${esc(r.yt || '')}" data-cap="${esc(reelName(r) + (reelRole(r) ? ', ' + reelRole(r) : ''))}" aria-label="${esc(fmt(L.reelPlay, { name: reelName(r) }))}"><video muted loop playsinline preload="none" poster="/media/poster-${r.slug}.jpg" data-src="/media/loop-${r.slug}.mp4" aria-hidden="true"></video><span class="reel-cap">${esc(reelName(r))}${reelRole(r) ? `<small>${esc(reelRole(r))}</small>` : ''}</span><span class="reel-sound">${SPEAKER}</span>${dur && r.sec ? `<span class="reel-dur">${esc(L.fullByte)} · ${clock(r.sec)}</span>` : ''}</button></li>`;
  // Hero wall: 3 columns of 2 (mobile shows the first of each column).
  const reelWall = () => {
    if (heroReels.length < 3) return '';
    const cols = [[], [], []];
    heroReels.forEach((r, i) => cols[i % 3].push(reelCard(r, +(0.15 + (i % 3) * 0.12 + Math.floor(i / 3) * 0.2).toFixed(2))));
    return `<div class="reel-wall" role="group" aria-label="${esc(L.wallLabel)}">${cols.map((c) => `<ul class="reel-col">${c.join('')}</ul>`).join('')}</div>`;
  };
  const reelBox = `<dialog id="reelbox" class="reelbox" aria-label="${esc(L.blessingsTitle)}"><div class="reelbox-media"></div><div class="reelbox-bar"><p class="reelbox-cap"></p><button class="reelbox-x" type="button" aria-label="${lang === 'hi' ? 'बंद करें' : 'Close'}">×</button></div></dialog>`;

  const ladder = () => `<div class="ladder-band"><div class="wrap"><p class="ladder-title">${esc(L.ladderTitle)}</p><ol class="ladder">${L.ladder.map(([big, unit, k, v]) => `<li><p class="ladder-num"><span class="ladder-big">${esc(big)}</span><span class="ladder-unit">${esc(unit)}</span></p><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol>${L.ladderNote ? `<p class="ladder-note">${esc(L.ladderNote)}</p>` : ''}</div></div>`;

  // Course page: month 1 shared, months 2 and 3 only for this course.
  const syllabus = (t) => {
    const [m1, m2, m3] = L.months;
    return `<ol class="syl">
<li class="syl-m shared"><p class="syl-top"><span class="month-n">${esc(L.monthWord)} 1</span><span class="tag">${esc(TP.shared)}</span></p><h3>${esc(m1.title)}</h3><p class="muted">${esc(m1.why)}</p><ul class="ticks cols">${m1.points.map(li).join('')}</ul></li>
<li class="syl-m"><p class="syl-top"><span class="month-n">${esc(L.monthWord)} 2</span><span class="tag gold">${esc(TP.own)}</span></p><h3>${esc(m2.title)}</h3><p class="muted">${esc(m2.why)}</p><dl class="mods">${t.month2.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></li>
<li class="syl-m"><p class="syl-top"><span class="month-n">${esc(L.monthWord)} 3</span><span class="tag gold">${esc(TP.own)}</span></p><h3>${esc(m3.title)}</h3><p class="muted">${esc(m3.why)}</p><ul class="ticks">${t.month3.map(li).join('')}</ul></li>
</ol>`;
  };
  // Home and /courses/: one shared trunk that splits into three courses.
  const fork = () => {
    const m1 = L.months[0];
    return `<div class="fork">
  <div class="trunk"><p class="trunk-label">${esc(L.trunkLabel)}</p><h3>${esc(m1.title)}</h3><ul class="ticks cols light">${m1.points.map(li).join('')}</ul></div>
  <svg class="fork-lines" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M150 0V20C150 42 50 34 50 60"/><path pathLength="1" d="M150 0V60"/><path pathLength="1" d="M150 0V20C150 42 250 34 250 60"/></svg>
  <ul class="branches">${tracks
    .map((t) => `<li><a class="branch" href="${u(`/${t.slug}/`)}"><span class="branch-en">${esc(t.name)}</span>${lang === 'hi' ? `<span class="branch-hi">${esc(t.local)}</span>` : ''}<span class="branch-pitch">${esc(t.pitch)}</span><span class="branch-m">${esc(L.branchM2)}</span><ul class="ticks">${t.month2.slice(0, 5).map(([k]) => li(k)).join('')}</ul><span class="branch-m">${esc(L.branchM3)}</span><span class="branch-p3">${esc(t.month3[0])}</span><span class="more">${esc(L.courseMore)}</span></a></li>`)
    .join('')}</ul>
</div>`;
  };
  const tiles = (items, cls = '') => `<ul class="hl${cls ? ' ' + cls : ''}">${items.map(([k, v]) => `<li><h3>${esc(k)}</h3><p>${esc(v)}</p></li>`).join('')}</ul>`;
  const channel = (cls = 'sec-alt') => `<section class="sec ${cls}" aria-labelledby="ch-h"><div class="wrap">
  <p class="eyebrow">${esc(L.channel.eyebrow)}</p><h2 class="h2" id="ch-h">${esc(L.channel.title)}</h2><p class="lede">${esc(L.channel.lede)}</p>
  ${tiles(L.channel.points, 'hl-ch')}
  <p class="proof">${L.creatorProof}</p>
</div></section>`;
  const Q = site.quotes || {};
  const quoteFig = (k, cls = '') => (Q[k] ? `<figure class="quote${cls ? ' ' + cls : ''}"><blockquote lang="en">${esc(Q[k].en)}</blockquote>${lang === 'hi' ? `<p class="quote-hi">${esc(Q[k].hi)}</p>` : ''}<figcaption>Yogesh Mishrra</figcaption></figure>` : '');
  const cineactBand = () => `<section class="sec sec-dark" aria-labelledby="ca-h"><div class="wrap split ca-band">
  <div><p class="eyebrow">${esc(CH.eyebrow)}</p><h2 class="h2" id="ca-h">${esc(CH.title)}</h2><p class="ca-text">${esc(CH.text)}</p><a class="btn btn-gold" href="${u('/yogesh-cineact/')}">${esc(CH.cta)}</a></div>
  ${quoteFig('transform')}
</div></section>`;
  // UPI: the bank's own QR payload; amount and note added only for the phone link.
  const upi = site.upi || {};
  const donate = () => `<aside class="donate" id="support" aria-labelledby="dn-h">
  <div class="donate-text"><p class="eyebrow">${esc(DN.eyebrow)}</p><h2 id="dn-h">${esc(DN.title)}</h2><p>${esc(DN.text)}</p>
  <p class="amts">${(upi.donate || [101, 251, 501, 1100]).map((a) => `<button type="button" class="amt" data-amt="${a}">${money(a)}</button>`).join('')}</p>
  <p class="donate-own"><label>${esc(DN.other)} <span class="rs">₹<input name="amt" inputmode="numeric" pattern="[0-9]*" placeholder="2100" aria-label="${esc(DN.other)}"></span></label><button type="button" class="btn btn-gold donate-go">${esc(DN.btn)}</button></p>
  <p class="pay-status" role="status" aria-live="polite"></p>
  <p class="fine">${esc(DN.payInfo)} ${esc(DN.fine)}</p>
  ${upi.id ? `<p class="donate-upi fine" hidden>${esc(DN.fallbackUpi)} <strong>${esc(upi.id)}</strong> <button type="button" class="copy" data-copy="${esc(upi.id)}" data-done="${esc(AD.copied)}">${esc(AD.copy)}</button></p>` : ''}</div>
</aside>`;
  const donateLine = () => `<p class="donate-line"><a href="${u('/videos/')}#support">${esc(DN.short)}</a></p>`;
  const feeCard = (key) => `<div class="fee-card">
  <p class="fee-k">${esc(L.fee.label)}</p>
  <p class="fee-v">${money(site.fee)}</p>
  <p class="fee-note">${esc(L.fee.note)}</p>
  <dl class="fee-list">
    <div><dt>${esc(L.fee.instK)}</dt><dd>${esc(fmt(L.fee.instV, feeVars))}</dd></div>
    <div><dt>${esc(L.fee.schK)}</dt><dd>${esc(fmt(L.fee.schV, feeVars))}</dd></div>
    <div><dt>${esc(L.fee.eligK)}</dt><dd>${esc(L.fee.eligV)}</dd></div>
  </dl>
  <a class="btn btn-gold" href="${applyUrl}${key ? `?c=${key}` : ''}">${esc(L.hero.cta)}</a>
</div>`;
  const steps = () => `<ol class="steps">${L.steps.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol>`;
  const faq = (list) => `<div class="faq">${list.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}</div>`;

  const founders = () => `<div class="founders">${L.founders
    .map((f, i) => {
      const m = site.founderMeta[i];
      return `<article class="founder">
    ${img(m.photo, 320, f.name, { widths: [320, 640], sizes: '170px', width: 320, height: 380 })}
    <div>
      <h3>${esc(f.name)}${lang === 'hi' ? ` <span class="en" lang="en">${esc(m.nameEn)}</span>` : ''}</h3>
      <p class="role">${esc(f.role)}</p>
      ${f.bio.map((b) => `<p>${esc(b)}</p>`).join('\n      ')}
      ${m.links.length ? `<p class="link-row">${m.links.map(([l, h]) => `<a class="chip-link" href="${esc(h.startsWith('/') ? u(h) : h)}">${esc(l)}</a>`).join('')}</p>` : ''}
    </div>
  </article>`;
    })
    .join('\n')}</div>`;

  const C = L.contact;
  const contactBlock = () => `<div class="contact-grid">
  <div class="contact-card">
    <h3>${esc(C.address)}</h3><p>${esc(L.addressText)}</p>
    <p><a class="chip-link" href="${mapsUrl}">${esc(C.directions)}</a></p>
    <h3>${esc(C.phone)}</h3><p><a href="tel:${esc(site.phone)}">${esc(site.phoneLabel)}</a></p>
    <h3>${esc(C.email)}</h3><p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
  </div>
  <form class="apply js-wa" id="apply" action="https://wa.me/${site.whatsapp}" method="get" data-intro="${esc(C.msgIntro)}">
    <h3>${esc(C.formTitle)}</h3>
    <p class="muted">${esc(C.formNote)}</p>
    <label>${esc(C.name)}<input name="name" autocomplete="name" required data-k="${esc(C.name)}"></label>
    <label>${esc(C.phoneF)}<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required data-k="${esc(C.phoneF)}"></label>
    <label>${esc(C.city)}<input name="city" autocomplete="address-level2" data-k="${esc(C.city)}"></label>
    <label>${esc(C.track)}<select name="track" data-k="${esc(C.track)}">${tracks.map((t) => `<option>${esc(lang === 'hi' ? `${t.name} (${t.local})` : t.name)}</option>`).join('')}<option>${esc(C.undecided)}</option><option>${esc(C.online)}</option></select></label>
    <label>${esc(C.note)}<textarea name="note" rows="3" data-k="${esc(C.note)}"></textarea></label>
    <button class="btn btn-primary" type="submit">${esc(C.send)}</button>
  </form>
</div>`;

  // ----- pages -----
  const pages = {};

  pages['/'] = layout({
    title: L.homeTitle,
    description: L.homeDescription,
    pathName: '/',
    ld: [orgLd(lang), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Indian Films Academy', url: abs(u('/')), inLanguage: lang }, ...site.trackOrder.map((k) => courseLd(lang, k)), faqLd(L.faq)],
    body: `<main id="main">
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="kicker">${esc(L.hero.kicker)}</p>
      <h1 class="hero-h1"><span class="sr-only">${esc(L.hero.h1Hidden)} </span><span class="ninety"><span class="ninety-n" data-count="${esc(L.ninety.n)}">${esc(L.ninety.n)}</span><span class="ninety-t"><span>${esc(L.ninety.l1)}</span><span>${esc(L.ninety.l2)}</span></span></span>${tracks.map((t, i) => `<a class="door" href="${u(`/${t.slug}/`)}" style="--i:${i}"><span class="door-en">${esc(t.name)}</span><span class="door-sub">${esc(lang === 'hi' ? fmt(L.doorSub, { name: t.local }) : site.doorSubEn[t.key])}</span></a>`).join('')}</h1>
      <p class="hero-sub">${esc(L.hero.sub)}</p>
      <div class="actions">
        <a class="btn btn-gold" href="${applyUrl}">${esc(L.hero.cta)}</a>
        <a class="btn btn-ghost-light" href="${u('/courses/')}">${esc(L.hero.cta2)}</a>
      </div>
    </div>
    ${reelWall()}
  </div>
</section>
${ladder()}
<section class="sec" aria-labelledby="fork-h"><div class="wrap">
  <p class="eyebrow">${esc(L.forkEyebrow)}</p>
  <h2 class="h2" id="fork-h">${esc(L.forkTitle)}</h2>
  <p class="lede">${esc(L.forkLede)}</p>
  ${fork()}
</div></section>
${reels.length ? `<section class="sec sec-dark" aria-labelledby="bless-h"><div class="wrap">
  <div class="sec-head"><div><p class="eyebrow">${esc(L.blessingsEyebrow)}</p><h2 class="h2" id="bless-h">${esc(L.blessingsTitle)}</h2><p class="lede">${esc(L.blessingsLede)}</p></div><a class="chip-link" href="${u('/bytes/')}">${esc(L.allBytes)}</a></div>
  ${rail(reels.map((r) => reelCard(r, 0, true)).join(''), 'reelrail', L.blessingsTitle)}
</div></section>` : ''}
${channel()}
${cineactBand()}
${videos.length ? `<section class="sec" aria-labelledby="yt-h"><div class="wrap">
  <div class="sec-head"><div><p class="eyebrow">${esc(L.videosEyebrow)}</p><h2 class="h2" id="yt-h">${esc(L.videosTitle)}</h2><p class="hint">${esc(L.videosHint)}</p></div><a class="chip-link" href="${esc(site.youtubeUrl)}?sub_confirmation=1">${esc(L.subscribe)}</a></div>
  ${rail(videos.slice(0, 16).map(videoCard).join(''), 'vrail', L.videosTitle)}
  <p class="more-link"><a href="${u('/videos/')}">${esc(L.allVideos)}</a></p>
  ${donateLine()}
</div></section>` : ''}
<section class="sec sec-alt" aria-labelledby="legends-h">
  <div class="wrap"><p class="eyebrow">${esc(L.legendsEyebrow)}</p><h2 class="h2" id="legends-h">${esc(L.legendsTitle)}</h2><p class="lede">${esc(L.legendsLede)}</p></div>
  ${marquee(stripPhotos)}
  <div class="wrap"><p class="more-link"><a href="${u('/gallery/')}">${esc(L.allPhotos)}</a></p></div>
</section>
<section class="sec" aria-labelledby="fees-h"><div class="wrap split">
  <div><p class="eyebrow">${esc(L.feesEyebrow)}</p><h2 class="h2" id="fees-h">${esc(L.feesTitle)}</h2>${steps()}</div>
  ${feeCard()}
</div></section>
<section class="sec sec-alt" aria-labelledby="founders-h"><div class="wrap">
  <p class="eyebrow">${esc(L.foundersEyebrow)}</p><h2 class="h2" id="founders-h">${esc(L.foundersTitle)}</h2>
  ${founders()}
</div></section>
${igPosts.length ? `<section class="sec" aria-labelledby="ig-h"><div class="wrap">
  <div class="sec-head"><div><p class="eyebrow">${esc(L.igEyebrow)}</p><h2 class="h2" id="ig-h">${esc(L.igTitle)}</h2></div>${site.instagramUrl ? `<a class="chip-link" href="${esc(site.instagramUrl)}">${esc(L.follow)}</a>` : ''}</div>
  ${rail(igPosts.slice(0, 12).map((p) => `<li><a class="igcard" href="${esc(p.permalink)}"><img src="${esc(p.img)}" alt="${esc((p.caption || 'Instagram').slice(0, 90))}" loading="lazy" decoding="async" width="320" height="320">${p.type === 'reel' || p.type === 'video' ? '<span class="ig-reel" aria-hidden="true">▶</span>' : ''}</a></li>`).join(''), 'igrail', L.igTitle)}
</div></section>` : ''}
<section class="sec"><div class="wrap"><div class="online-band">
  <div><p class="eyebrow">${esc(L.onlineEyebrow)}</p><h2 class="h2">${esc(L.onlineTitle)}</h2><p>${esc(L.onlineText)}</p></div>
  <a class="btn btn-gold" href="${u('/online/')}">${esc(L.onlineCta)}</a>
</div></div></section>
${guides.length ? `<section class="sec" aria-labelledby="gd-h"><div class="wrap">
  <div class="sec-head"><div><p class="eyebrow">${esc(GH.eyebrow)}</p><h2 class="h2" id="gd-h">${esc(GH.title)}</h2><p class="lede">${esc(GH.lede)}</p></div><a class="chip-link" href="${u('/guides/')}">${esc(GH.all)}</a></div>
  ${guideList()}
</div></section>` : ''}
<section class="sec" aria-labelledby="gl-h"><div class="wrap"><h2 class="h2" id="gl-h">${esc(L.glance.title)}</h2>${glance()}</div></section>
<section class="sec sec-alt" aria-labelledby="faq-h"><div class="wrap"><h2 class="h2" id="faq-h">${esc(L.faqTitle)}</h2>${faq(L.faq)}</div></section>
<section class="sec" id="contact" aria-labelledby="contact-h"><div class="wrap"><h2 class="h2" id="contact-h">${esc(L.contactTitle)}</h2>${contactBlock()}</div></section>
${viewer}
${reelBox}
</main>`,
  });

  pages['/courses/'] = layout({
    title: CPG.title,
    description: CPG.description,
    pathName: '/courses/',
    ld: [...site.trackOrder.map((k) => courseLd(lang, k)), faqLd(L.faq), crumbsLd([[L.home, u('/')], [CPG.h1, u('/courses/')]])],
    body: `<main id="main" class="page">
<div class="wrap page-head">
${crumbs([[L.home, u('/')], [CPG.h1, u('/courses/')]])}
<p class="eyebrow">${esc(L.forkEyebrow)}</p>
<h1 class="page-h1">${esc(CPG.h1)}</h1>
<p class="lede">${esc(L.forkLede)}</p>
<div class="actions"><a class="btn btn-primary" href="${applyUrl}">${esc(L.hero.cta)}</a></div>
</div>
<section class="sec sec-tight"><div class="wrap">${fork()}</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2 class="h2">${esc(CPG.compareTitle)}</h2>
  <div class="compare-wrap"><table class="compare">
    <thead><tr><th></th>${tracks.map((t) => `<th><a href="${u(`/${t.slug}/`)}">${esc(t.name)}</a>${lang === 'hi' ? `<span class="th-hi">${esc(t.local)}</span>` : ''}</th>`).join('')}</tr></thead>
    <tbody>
      <tr><th>${esc(CPG.rowFor)}</th>${tracks.map((t) => `<td>${esc(t.forWhom[0])}</td>`).join('')}</tr>
      <tr><th>${esc(CPG.rowM2)}</th>${tracks.map((t) => `<td>${esc(t.month2.map(([k]) => k).join(', '))}</td>`).join('')}</tr>
      <tr><th>${esc(CPG.rowM3)}</th>${tracks.map((t) => `<td>${esc(t.month3[0])}</td>`).join('')}</tr>
      <tr><th>${esc(CPG.rowCareer)}</th>${tracks.map((t) => `<td>${esc(t.careers.join(', '))}</td>`).join('')}</tr>
      <tr><th>${esc(CPG.rowFee)}</th>${tracks.map(() => `<td>${money(site.fee)}</td>`).join('')}</tr>
    </tbody>
  </table></div>
</div></section>
${channel('')}
${ladder()}
<section class="sec"><div class="wrap split"><div><h2 class="h2">${esc(L.feesTitle)}</h2>${steps()}</div>${feeCard()}</div></section>
<section class="sec sec-alt"><div class="wrap"><h2 class="h2">${esc(CPG.faq)}</h2>${faq(L.faq)}</div></section>
</main>`,
  });

  for (const t of tracks) {
    const others = tracks.filter((x) => x !== t);
    const path = `/${t.slug}/`;
    const trail = [[L.home, u('/')], [CPG.h1, u('/courses/')], [lang === 'hi' ? t.local : t.name, u(path)]];
    pages[path] = layout({
      title: t.title,
      description: t.description,
      pathName: path,
      ld: [courseLd(lang, t.key), crumbsLd(trail)],
      body: `<main id="main" class="page">
<section class="course-hero"><div class="wrap">
${crumbs(trail)}
<p class="course-en" aria-hidden="true">${esc(t.name)}</p>
<h1 class="page-h1">${esc(t.h1)}</h1>
<p class="lede">${esc(t.pitch)}</p>
<ul class="chips">${[...TP.chips, money(site.fee)].map(li).join('')}</ul>
<div class="actions"><a class="btn btn-gold" href="${applyUrl}?c=${t.key}">${esc(L.hero.cta)}</a><a class="btn btn-ghost-light" href="#syllabus">${esc(TP.syllabus)}</a></div>
</div></section>
<section class="sec" aria-labelledby="hl-h"><div class="wrap"><h2 class="h2" id="hl-h">${esc(L.highlightsTitle)}</h2>${tiles(t.highlights)}</div></section>
${t.key === 'actor' ? `<section class="sec sec-dark sec-quote"><div class="wrap">${quoteFig('behave', 'quote-lg')}</div></section>` : ''}
<section class="sec sec-alt" id="syllabus" aria-labelledby="syl-h"><div class="wrap"><h2 class="h2" id="syl-h">${esc(TP.syllabusTitle)}</h2>${syllabus(t)}</div></section>
${channel('')}
<section class="sec sec-alt"><div class="wrap three">
  <div><h2 class="h3">${esc(TP.for)}</h2><ul class="ticks big">${t.forWhom.map(li).join('')}</ul></div>
  <div><h2 class="h3">${esc(TP.out)}</h2><ul class="ticks big">${t.outcome.map(li).join('')}</ul></div>
  <div><h2 class="h3">${esc(TP.careers)}</h2><ul class="ticks big">${t.careers.map(li).join('')}</ul></div>
</div></section>
${ladder()}
${reels.length ? `<section class="sec sec-dark" aria-labelledby="tb-h"><div class="wrap">
  <div class="sec-head"><div><h2 class="h2" id="tb-h">${esc(TP.bytesTitle)}</h2><p class="lede">${esc(L.blessingsLede)}</p></div><a class="chip-link" href="${u('/bytes/')}">${esc(L.allBytes)}</a></div>
  ${rail(reels.map((r) => reelCard(r, 0, true)).join(''), 'reelrail', TP.bytesTitle)}
</div></section>${reelBox}` : ''}
<section class="sec"><div class="wrap split">
  <div><h2 class="h2">${esc(L.feesTitle)}</h2>${steps()}<p class="muted">${esc(TP.others)}: ${others.map((o) => `<a href="${u(`/${o.slug}/`)}">${esc(lang === 'hi' ? o.local : o.name)}</a>`).join(' · ')}</p></div>
  ${feeCard(t.key)}
</div></section>
</main>`,
    });
  }

  const classRe = /\bclass\b|क्लास|कक्षा|cineact|\bATS\b|acting system/i;
  const caVideos = [...videos.filter((v) => classRe.test(v.title)).slice(0, 6), ...(site.cineactVideos || []).map((id) => videos.find((v) => v.id === id)).filter(Boolean)]
    .filter((v, i, all) => all.indexOf(v) === i)
    .slice(0, 14);
  pages['/yogesh-cineact/'] = layout({
    title: CA.title,
    description: CA.description,
    pathName: '/yogesh-cineact/',
    image: abs('/img/founder-yogesh-640.webp'),
    ld: [crumbsLd([[L.home, u('/')], ['Yogesh CineAct', u('/yogesh-cineact/')]])],
    body: `<main id="main" class="page">
<section class="course-hero ca-hero"><div class="wrap ca-hero-in">
  <div>
    ${crumbs([[L.home, u('/')], ['Yogesh CineAct', u('/yogesh-cineact/')]])}
    <p class="kicker">${esc(CA.eyebrow)}</p>
    <h1 class="ca-h1"><span class="brandword">Yogesh CineAct</span><span class="ca-sub">${esc(CA.sub)}</span></h1>
    <p class="lede">${esc(CA.lede)}</p>
    <div class="actions"><a class="btn btn-gold" href="${applyUrl}">${esc(L.hero.cta)}</a><a class="btn btn-ghost-light" href="#classes">${esc(CA.classesTitle)}</a></div>
  </div>
  ${img('founder-yogesh', 320, 'Yogesh Mishrra', { widths: [320, 640], sizes: '(min-width: 60rem) 300px, 60vw', cls: 'ca-photo', width: 320, height: 380 })}
</div></section>
<section class="sec"><div class="wrap prose ca-body">${CA.body.map((x) => `<p>${esc(x)}</p>`).join('\n')}</div></section>
<section class="sec sec-dark" aria-labelledby="qt-h"><div class="wrap"><h2 class="h2" id="qt-h">${esc(L.quotesTitle)}</h2><div class="quote-pair">${quoteFig('transform')}${quoteFig('behave')}</div></div></section>
<section class="sec sec-alt" aria-labelledby="pr-h"><div class="wrap"><h2 class="h2" id="pr-h">${esc(CA.principlesTitle)}</h2>${tiles(CA.principles, 'principles')}</div></section>
<section class="sec" aria-labelledby="tech-h"><div class="wrap"><h2 class="h2" id="tech-h">${esc(CA.techTitle)}</h2><p class="lede">${esc(CA.techLede)}</p><ul class="tech">${CA.tech.map(li).join('')}</ul></div></section>
${caVideos.length ? `<section class="sec sec-alt" id="classes" aria-labelledby="cl-h"><div class="wrap"><h2 class="h2" id="cl-h">${esc(CA.classesTitle)}</h2><p class="lede">${esc(CA.classesLede)}</p>${practical()}${rail(caVideos.map(videoCard).join(''), 'vrail', CA.classesTitle)}${donate()}</div></section>` : ''}
<section class="sec"><div class="wrap"><div class="online-band"><h2 class="h2">${esc(CA.cta)}</h2><a class="btn btn-gold" href="${applyUrl}">${esc(L.hero.cta)}</a></div></div></section>
</main>`,
  });

  pages['/bytes/'] = layout({
    title: L.bytesPage.title,
    description: L.bytesPage.description,
    pathName: '/bytes/',
    ld: [crumbsLd([[L.home, u('/')], [L.blessingsTitle, u('/bytes/')]])],
    body: `<main id="main" class="page">
<section class="course-hero"><div class="wrap">
${crumbs([[L.home, u('/')], [L.blessingsTitle, u('/bytes/')]])}
<h1 class="page-h1">${esc(L.blessingsTitle)}</h1>
<p class="lede">${esc(L.blessingsLede)}</p>
</div></section>
<section class="sec sec-dark sec-tight"><div class="wrap"><ul class="reelgrid">${reels.map((r) => reelCard(r, 0, true)).join('')}</ul></div></section>
${reelBox}
</main>`,
  });

  const regFee = upi.registrationFee || 500;
  const courseVal = (t) => (lang === 'hi' ? `${t.name} (${t.local})` : t.name);
  pages['/admission/'] = layout({
    title: AD.title,
    description: AD.description,
    pathName: '/admission/',
    ld: [crumbsLd([[L.home, u('/')], [AD.h1, u('/admission/')]])],
    body: `<main id="main" class="page">
<div class="wrap page-head">
${crumbs([[L.home, u('/')], [AD.h1, u('/admission/')]])}
<h1 class="page-h1">${esc(AD.h1)}</h1>
<p class="lede">${esc(AD.lede)}</p>
</div>
<div class="wrap"><form class="admit js-pay" id="admit" action="https://wa.me/${site.whatsapp}" method="get" data-intro="${esc(AD.msgIntro)}" novalidate>
  <fieldset class="astep"><legend><span class="astep-n">1</span>${esc(AD.step1)}</legend>
    <div class="pick">${tracks.map((t, i) => `<label class="pick-card"><input type="radio" name="course" value="${esc(courseVal(t))}" data-k="${esc(AD.course)}" data-key="${t.key}"${i === 0 ? ' checked' : ''}><span class="pick-en">${esc(t.name)}</span>${lang === 'hi' ? `<span class="pick-hi">${esc(t.local)}</span>` : ''}<span class="pick-meta">${esc(TP.chips[0])} · ${money(site.fee)}</span></label>`).join('')}</div>
    <p class="muted">${esc(fmt(AD.feeLine, { fee: money(site.fee), i1: feeVars.i1, i2: feeVars.i2 }))} · ${esc(fmt(L.fee.schV, feeVars))}</p>
  </fieldset>
  <fieldset class="astep"><legend><span class="astep-n">2</span>${esc(AD.step2)}</legend>
    <div class="fields">
      <label>${esc(AD.name)}<input name="name" autocomplete="name" required data-k="${esc(AD.name)}"></label>
      <label>${esc(AD.phone)}<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required data-k="${esc(AD.phone)}"></label>
      <label class="wide">${esc(AD.email)}<input name="email" type="email" autocomplete="email" inputmode="email" data-k="Email"></label>
      <label>${esc(AD.age)}<input name="age" inputmode="numeric" data-k="${esc(AD.age)}"></label>
      <label>${esc(AD.city)}<input name="city" autocomplete="address-level2" data-k="${esc(AD.city)}"></label>
      <label class="wide">${esc(AD.note)}<textarea name="note" rows="2" data-k="${esc(AD.note)}"></textarea></label>
    </div>
  </fieldset>
  <fieldset class="astep"><legend><span class="astep-n">3</span>${esc(AD.step3)}</legend>
    <div class="pay"><p class="pay-amt">${money(regFee)}</p><div><p class="muted">${esc(AD.payInfo)}</p><p class="muted">${esc(AD.after)}</p></div></div>
  </fieldset>
  <div class="admit-send"><button class="btn btn-gold btn-lg" type="submit">${esc(fmt(AD.send, { amount: money(regFee) }))}</button><p class="pay-status" role="status" aria-live="polite"></p><p class="muted">${esc(AD.note2)} ${esc(AD.help)}: <a href="tel:${esc(site.phone)}">${esc(site.phoneLabel)}</a></p></div>
</form>
<section class="paid" id="paid" hidden tabindex="-1" aria-labelledby="paid-h">
  <p class="paid-tick" aria-hidden="true">✓</p>
  <h2 id="paid-h">${esc(AD.okTitle)}</h2>
  <p class="paid-k">${esc(AD.okReg)}</p>
  <p class="paid-reg reg-no"></p>
  <p>${esc(AD.okText)}</p>
  <div class="actions"><a class="btn btn-gold paid-wa" href="https://wa.me/${site.whatsapp}">${esc(AD.okWa)}</a><a class="btn btn-ghost" href="${u('/')}">${esc(L.home)}</a></div>
</section></div>
</main>`,
  });

  pages['/about/'] = layout({
    title: L.aboutPage.title,
    description: L.aboutPage.description,
    pathName: '/about/',
    image: abs('/img/founders-1000.webp'),
    ld: [orgLd(lang), crumbsLd([[L.home, u('/')], [L.foot.about, u('/about/')]])],
    body: `<main id="main" class="page">
<div class="wrap page-head">
${crumbs([[L.home, u('/')], [L.foot.about, u('/about/')]])}
<h1 class="page-h1">${esc(L.aboutTitle)}</h1>
<p class="lede">${esc(L.aboutLede)}</p>
<ul class="stats">${L.stats.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ul>
</div>
<section class="sec sec-alt"><div class="wrap split">
  <div class="prose">${L.about.map((p) => `<p>${esc(p)}</p>`).join('\n')}</div>
  ${img('founders', 640, 'Indian Films Academy', { widths: [640, 1000], sizes: '(min-width: 64rem) 460px, 92vw', cls: 'rounded', width: 640, height: 640 })}
</div></section>
<section class="sec"><div class="wrap"><h2 class="h2">${esc(L.glance.title)}</h2>${glance()}</div></section>
<section class="sec sec-alt"><div class="wrap"><h2 class="h2">${esc(L.foundersTitle)}</h2>${founders()}</div></section>
<section class="sec sec-alt"><div class="wrap"><h2 class="h2 cine">${esc(L.methodTitle)}</h2><div class="prose">${L.method.map((p) => `<p>${esc(p)}</p>`).join('')}</div><p class="more-link"><a href="${u('/yogesh-cineact/')}">${esc(CH.cta)}</a></p></div></section>
<section class="sec"><div class="wrap"><h2 class="h2">${esc(L.guestsTitle)}</h2><p class="lede">${esc(L.guestsLede)}</p>${grid(visitors.slice(0, 8))}<p class="more-link"><a href="${u('/gallery/')}">${esc(L.allPhotos)}</a></p></div></section>
${viewer}
</main>`,
  });

  pages['/gallery/'] = layout({
    title: L.galleryPage.title,
    description: L.galleryPage.description,
    pathName: '/gallery/',
    ld: [crumbsLd([[L.home, u('/')], [L.galleryTitle, u('/gallery/')]])],
    body: `<main id="main" class="page"><div class="wrap page-head">
${crumbs([[L.home, u('/')], [L.galleryTitle, u('/gallery/')]])}
<h1 class="page-h1">${esc(L.galleryTitle)}</h1><p class="lede">${esc(L.galleryLede)}</p></div>
<section class="sec sec-tight"><div class="wrap"><h2 class="h2">${esc(L.legendsTitle)}</h2>${grid(legends)}</div></section>
<section class="sec sec-tight"><div class="wrap"><h2 class="h2">${esc(L.guestsTitle)}</h2>${grid(visitors)}</div></section>
<section class="sec sec-tight"><div class="wrap"><h2 class="h2">${esc(L.galleryAcademy)}</h2><ul class="gallery">${['group-2', 'campus-1', 'stage-1', 'stage-2'].map((n) => `<li><a class="js-view" href="/img/${n}-800.webp" data-cap="Indian Films Academy"><img src="/img/${n}-800.webp" alt="Indian Films Academy, Lucknow" loading="lazy" decoding="async" width="480" height="360"></a></li>`).join('')}</ul></div></section>
${viewer}
</main>`,
  });

  pages['/videos/'] = layout({
    title: L.videosPage.title,
    description: L.videosPage.description,
    pathName: '/videos/',
    ld: [crumbsLd([[L.home, u('/')], [L.videosPageTitle, u('/videos/')]])],
    body: `<main id="main" class="page"><div class="wrap page-head">
${crumbs([[L.home, u('/')], [L.videosPageTitle, u('/videos/')]])}
<div class="sec-head"><div><h1 class="page-h1">${esc(L.videosPageTitle)}</h1><p class="lede">${esc(L.videosPageLede)}</p><p class="hint">${esc(L.videosHint)}</p></div><div class="link-row"><a class="chip-link chip-gold" href="#support">${esc(L.supportChip)}</a><a class="chip-link" href="${esc(site.youtubeUrl)}?sub_confirmation=1">${esc(L.subscribe)}</a></div></div>
${practical()}
<div class="vid-layout"><div class="vid-main"><ul class="vgrid">${videos.map(videoCard).join('\n')}</ul><a class="support-bar" href="#support"><span>${esc(DN.short)}</span><b>${esc(DN.btn)}</b></a></div>${donate()}</div>
</div></main>`,
  });

  const OP = L.onlinePage;
  pages['/online/'] = layout({
    title: OP.title,
    description: OP.description,
    pathName: '/online/',
    ld: [crumbsLd([[L.home, u('/')], [OP.h1, u('/online/')]])],
    body: `<main id="main" class="page"><div class="wrap page-head">
${crumbs([[L.home, u('/')], [OP.h1, u('/online/')]])}
<p class="eyebrow">${esc(OP.eyebrow)}</p><h1 class="page-h1">${esc(OP.h1)}</h1><p class="lede">${esc(OP.lede)}</p>
<div class="actions">${site.graphyUrl ? `<a class="btn btn-primary" href="${esc(site.graphyUrl)}">${esc(OP.buy)}</a>` : `<a class="btn btn-primary" href="${u('/contact/#apply')}">${esc(OP.ask)}</a>`}<a class="btn btn-ghost" href="${u('/videos/')}">${esc(OP.free)}</a></div>
</div>
<section class="sec sec-alt"><div class="wrap split">
  <div><h2 class="h2">${esc(OP.learnTitle)}</h2><ul class="ticks big">${OP.learn.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
  <div class="card"><h2 class="h2">${esc(OP.forTitle)}</h2><ul class="ticks big">${OP.for.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><p class="muted">${esc(OP.note)}</p></div>
</div></section>
</main>`,
  });

  const KP = L.contactPage;
  pages['/contact/'] = layout({
    title: KP.title,
    description: KP.description,
    pathName: '/contact/',
    ld: [orgLd(lang), crumbsLd([[L.home, u('/')], [KP.h1, u('/contact/')]])],
    body: `<main id="main" class="page"><div class="wrap page-head">
${crumbs([[L.home, u('/')], [KP.h1, u('/contact/')]])}
<h1 class="page-h1">${esc(KP.h1)}</h1><p class="lede">${esc(KP.lede)}</p>
${contactBlock()}
<div class="map"><iframe title="Indian Films Academy map" src="https://www.google.com/maps?q=${encodeURIComponent('Indian Films Academy, ' + addressEn)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></main>`,
  });

  for (const [key, pth] of [['terms', '/terms/'], ['refund', '/refund-policy/'], ['shipping', '/shipping-policy/']]) {
    const P = L.policies[key];
    pages[pth] = layout({
      title: P.title,
      description: P.body[0],
      pathName: pth,
      body: `<main id="main" class="page"><div class="wrap page-head prose">${crumbs([[L.home, u('/')], [P.h1, u(pth)]])}<h1 class="page-h1">${esc(P.h1)}</h1>${P.body.map((x) => `<p>${esc(x)}</p>`).join('')}<p class="muted">${esc(L.policyUpdated)} · <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> · <a href="tel:${esc(site.phone)}">${esc(site.phoneLabel)}</a></p></div></main>`,
    });
  }
  const FT = L.feesTable, FP = L.policies.fees;
  pages['/fees/'] = layout({
    title: FP.title,
    description: `${tracks.map((t) => (lang === 'hi' ? t.local : t.name)).join(', ')}: ${money(site.fee)} (${FT.days}). ${FT.note}`,
    pathName: '/fees/',
    ld: [...site.trackOrder.map((k) => courseLd(lang, k))],
    body: `<main id="main" class="page"><div class="wrap page-head">${crumbs([[L.home, u('/')], [FP.h1, u('/fees/')]])}<h1 class="page-h1">${esc(FP.h1)}</h1>
<div class="compare-wrap"><table class="compare fees-table"><thead><tr><th>${esc(FT.course)}</th><th>${esc(FT.duration)}</th><th>${esc(FT.fee)}</th><th>${esc(FT.inst)}</th></tr></thead><tbody>
${tracks.map((t) => `<tr><td><a href="${u(`/${t.slug}/`)}">${esc(lang === 'hi' ? `${t.local} (${t.name})` : t.name)}</a></td><td>${esc(FT.days)}</td><td>${money(site.fee)}</td><td>${esc(feeVars.i1)} + ${esc(feeVars.i2)}</td></tr>`).join('')}
<tr><td>${esc(FT.reg)}</td><td>–</td><td>${money((site.upi || {}).registrationFee || 500)}</td><td>–</td></tr>
</tbody></table></div>
<p class="muted">${esc(FT.note)}</p>
<div class="actions"><a class="btn btn-primary" href="${applyUrl}">${esc(L.hero.cta)}</a><a class="btn btn-ghost" href="${u('/refund-policy/')}">${esc(L.foot.refund)}</a></div></div></main>`,
  });

  pages['/guides/'] = layout({
    title: `${GH.title} | Indian Films Academy, ${lang === 'hi' ? 'लखनऊ' : 'Lucknow'}`,
    description: GH.lede,
    pathName: '/guides/',
    ld: [crumbsLd([[L.home, u('/')], [GH.title, u('/guides/')]])],
    body: `<main id="main" class="page"><div class="wrap page-head">${crumbs([[L.home, u('/')], [GH.title, u('/guides/')]])}<p class="eyebrow">${esc(GH.eyebrow)}</p><h1 class="page-h1">${esc(GH.title)}</h1><p class="lede">${esc(GH.lede)}</p>${guideList()}</div></main>`,
  });
  for (const g of guides) {
    const G = g[lang], pth = `/guides/${g.slug}/`, t = tracks.find((x) => x.key === g.course) || tracks[0];
    const trail = [[L.home, u('/')], [GH.title, u('/guides/')], [G.h1, u(pth)]];
    pages[pth] = layout({
      title: G.title,
      description: G.description,
      pathName: pth,
      type: 'article',
      ld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: G.h1, description: G.description, inLanguage: lang, datePublished: g.date, dateModified: g.date, author: { '@type': 'Person', name: 'Yogesh Mishrra', url: abs(u('/yogesh-cineact/')) }, publisher: { '@type': 'EducationalOrganization', '@id': orgId, name: 'Indian Films Academy', logo: { '@type': 'ImageObject', url: abs('/img/logo-emblem-512.webp') } }, mainEntityOfPage: abs(u(pth)), image: abs('/img/hero-group-1600.webp') }, crumbsLd(trail)],
      body: `<main id="main" class="page"><article class="wrap page-head article">
${crumbs(trail)}
<h1 class="page-h1">${esc(G.h1)}</h1>
<p class="byline">${esc(GH.by)} · Indian Films Academy · <time datetime="${g.date}">${esc(new Date(g.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' }))}</time></p>
<p class="lede">${esc(G.lede)}</p>
${G.sections.map((sec) => `<h2>${esc(sec.h)}</h2>${(sec.p || []).map((x) => `<p>${esc(fmt(x, feeVars))}</p>`).join('')}${sec.list ? `<ul class="ticks big">${sec.list.map((x) => li(fmt(x, feeVars))).join('')}</ul>` : ''}`).join('\n')}
<aside class="guide-cta"><p class="eyebrow">${esc(GH.related)}</p><p class="guide-cta-t">${esc(lang === 'hi' ? `${t.local} कोर्स · 90 दिन` : `${t.name} course · 90 days`)}</p><div class="actions"><a class="btn btn-gold" href="${u(`/${t.slug}/`)}">${esc(L.courseMore)}</a><a class="btn btn-ghost-light" href="${applyUrl}">${esc(L.hero.cta)}</a></div></aside>
<h2>${esc(GH.all)}</h2>
<ul class="ticks big">${guides.filter((x) => x !== g).map((x) => `<li><a href="${u(`/guides/${x.slug}/`)}">${esc(x[lang].h1)}</a></li>`).join('')}</ul>
</article></main>`,
    });
  }

  pages['/privacy/'] = layout({
    title: L.privacy.title,
    description: L.privacy.body[0],
    pathName: '/privacy/',
    body: `<main id="main" class="page"><div class="wrap page-head prose">${crumbs([[L.home, u('/')], [L.privacy.h1, u('/privacy/')]])}<h1 class="page-h1">${esc(L.privacy.h1)}</h1>${L.privacy.body.map((p) => `<p>${esc(p)}</p>`).join('')}<p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p></div></main>`,
  });

  const notFound = layout({
    title: L.notFound.title,
    description: L.notFound.text,
    pathName: '/404',
    noindex: true,
    body: `<main id="main" class="page"><div class="wrap lost"><img src="/img/logo-emblem-192.webp" alt="" width="120" height="120"><h1 class="page-h1">${esc(L.notFound.h1)}</h1><p>${esc(L.notFound.text)}</p><p class="actions"><a class="btn btn-primary" href="${u('/courses/')}">${esc(CPG.h1)}</a><a class="btn btn-ghost" href="${u('/')}">${esc(L.home)}</a></p></div></main>`,
  });
  return { pages, notFound };
}

// Shared behaviour: hover previews, click-to-play, rails, gallery viewer, WhatsApp form.
const PAGE_JS = `<script>
(function(){
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hover=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function frame(id,title,preview){
    var f=document.createElement('iframe');
    f.src=(preview?'https://www.youtube-nocookie.com/embed/':'https://www.youtube.com/embed/')+id+'?autoplay=1&rel=0&playsinline=1'+(preview?'&mute=1&controls=0&disablekb=1&iv_load_policy=3':'');
    f.title=title||'YouTube'; f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    if(preview){ f.className='preview'; f.tabIndex=-1; f.setAttribute('aria-hidden','true'); } else { f.className='inline-player'; f.allowFullscreen=true; }
    return f;
  }
  document.querySelectorAll('.vcard').forEach(function(card){
    var id=card.getAttribute('data-id'), title=card.getAttribute('data-title'), thumb=card.querySelector('.thumb'), timer;
    if(hover && !calm){
      card.addEventListener('mouseenter',function(){ timer=setTimeout(function(){ if(!card.classList.contains('playing') && !thumb.querySelector('.preview')) thumb.appendChild(frame(id,title,true)); },450); });
      card.addEventListener('mouseleave',function(){ clearTimeout(timer); var p=thumb.querySelector('.preview'); if(p) p.remove(); });
    }
    card.addEventListener('click',function(e){
      if(e.metaKey||e.ctrlKey) return; e.preventDefault();
      if(card.classList.contains('playing')) return;
      card.classList.add('playing'); clearTimeout(timer); thumb.innerHTML=''; thumb.appendChild(frame(id,title,false));
    });
  });
  document.querySelectorAll('.rail-wrap').forEach(function(w){
    var r=w.querySelector('.rail');
    w.querySelectorAll('.rail-btn').forEach(function(b){ b.addEventListener('click',function(){ r.scrollBy({left:(+b.dataset.dir)*r.clientWidth*0.85,behavior:calm?'auto':'smooth'}); }); });
  });
  var dlg=document.getElementById('viewer');
  if(dlg && dlg.showModal){
    var big=dlg.querySelector('img'), cap=dlg.querySelector('figcaption');
    document.querySelectorAll('.js-view').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); big.src=a.getAttribute('href'); big.alt=a.getAttribute('data-cap')||''; cap.textContent=a.getAttribute('data-cap')||''; dlg.showModal(); }); });
    dlg.addEventListener('click',function(){ dlg.close(); });
  }
  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=parseInt(el.getAttribute('data-count'),10); if(calm||!end) return;
    var t0=null; el.textContent='0';
    function step(t){ if(!t0) t0=t; var p=Math.min((t-t0)/1100,1); el.textContent=Math.round(end*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  });
  // Reels: silent loops start as soon as they are on screen and pause when they leave.
  var lite=calm || (navigator.connection && navigator.connection.saveData);
  var vids=document.querySelectorAll('video[data-src]');
  function go(v){ if(!v.getAttribute('src')) v.setAttribute('src',v.getAttribute('data-src')); var p=v.play(); if(p && p.catch) p.catch(function(){}); }
  if(!lite && 'IntersectionObserver' in window){
    var vo=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) go(e.target); else if(e.target.getAttribute('src')) e.target.pause(); }); },{rootMargin:'80px 0px'});
    vids.forEach(function(v){ vo.observe(v); });
  }
  var box=document.getElementById('reelbox');
  if(box && box.showModal){
    var media=box.querySelector('.reelbox-media'), bcap=box.querySelector('.reelbox-cap');
    document.querySelectorAll('.reel').forEach(function(b){ b.addEventListener('click',function(){
      var full=b.getAttribute('data-full'), yt=b.getAttribute('data-yt'), el;
      if(full){ el=document.createElement('video'); el.src=full; el.controls=true; el.autoplay=true; el.playsInline=true; el.poster=b.querySelector('video').getAttribute('poster'); }
      else if(yt){ el=frame(yt,b.getAttribute('data-cap'),false); }
      else return;
      media.innerHTML=''; media.appendChild(el); bcap.textContent=b.getAttribute('data-cap'); box.showModal();
    }); });
    function shut(){ media.innerHTML=''; }
    box.addEventListener('close',shut);
    box.querySelector('.reelbox-x').addEventListener('click',function(){ box.close(); });
    box.addEventListener('click',function(e){ if(e.target===box) box.close(); });
  }
  if('IntersectionObserver' in window && !calm){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.sec .h2, .sec .lede, .track, .month, .founder, .fee-card, .steps li, .faq details, .online-band, .ladder li, .stats li, .sec .reel-card, .fork, .branches > li, .hl > li, .syl-m, .tech li, .donate, .quote, .pick-card').forEach(function(el){
      var sib=el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
      el.style.setProperty('--d', Math.min(sib,5)*0.08+'s'); el.classList.add('reveal'); io.observe(el);
    });
  }
  var T={}; try{ T=JSON.parse((document.getElementById('pay-i18n')||{}).textContent||'{}'); }catch(e){}
  function waSend(form){
    var lines=[form.getAttribute('data-intro')];
    form.querySelectorAll('[data-k]').forEach(function(el){ if((el.type==='radio'||el.type==='checkbox') && !el.checked) return; var v=(el.value||'').trim(); if(v) lines.push(el.getAttribute('data-k')+': '+v); });
    window.location.href='https://wa.me/'+T.wa+'?text='+encodeURIComponent(lines.join('\\n'));
  }
  document.querySelectorAll('form.js-wa').forEach(function(form){ form.addEventListener('submit',function(e){ e.preventDefault(); waSend(form); }); });
  function post(u,b){ return fetch(u,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)}).then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ j._status=r.status; return j; }); }); }
  function loadRzp(){ return new Promise(function(ok,no){ if(window.Razorpay) return ok(); var s=document.createElement('script'); s.src='https://checkout.razorpay.com/v1/checkout.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
  // Opens Razorpay Checkout for an order made by our server; cb.say(text), cb.done(result), cb.fail('off'|'cancel'|'err')
  function pay(body, desc, prefill, cb){
    cb.say(T.opening);
    post('/api/order', body).then(function(o){
      if(!o.order_id){ cb.fail(o._status===503||o._status===404?'off':'err'); return; }
      return loadRzp().then(function(){
        var paid=false;
        var rz=new window.Razorpay({ key:o.key, amount:o.amount, currency:o.currency, order_id:o.order_id, name:'Indian Films Academy', description:desc, image:location.origin+'/img/logo-emblem-192.webp', prefill:prefill, notes:{ source:'website' }, theme:{ color:'#023E41' },
          handler:function(r){ paid=true; cb.say(T.verifying); post('/api/verify', r).then(function(v){ if(v.ok) cb.done(v); else cb.fail('err'); }, function(){ cb.fail('err'); }); },
          modal:{ ondismiss:function(){ if(!paid) cb.fail('cancel'); } } });
        rz.open();
      }, function(){ cb.fail('off'); });
    }, function(){ cb.fail('off'); });
  }
  var adm=document.getElementById('admit');
  if(adm){
    var st=adm.querySelector('.pay-status'), btn=adm.querySelector('button[type=submit]');
    var say=function(m){ st.textContent=m||''; };
    adm.addEventListener('submit',function(e){
      e.preventDefault();
      var f=function(n){ var el=adm.querySelector('[name="'+n+'"]'); return el?(el.value||'').trim():''; };
      var c=adm.querySelector('input[name=course]:checked');
      var phone=f('phone').replace(/[^\\d]/g,'').replace(/^(91|0)(?=\\d{10}$)/,'');
      if(!f('name')){ say(T.name); adm.querySelector('[name=name]').focus(); return; }
      if(phone.length!==10){ say(T.phone); adm.querySelector('[name=phone]').focus(); return; }
      btn.disabled=true;
      var body={ kind:'registration', course:c?c.getAttribute('data-key'):'', name:f('name'), phone:phone, email:f('email'), age:f('age'), city:f('city'), note:f('note'), lang:document.documentElement.lang };
      pay(body, T.desc+' · '+(c?c.value:''), { name:body.name, email:body.email, contact:'+91'+phone }, { say:say,
        done:function(v){
          var box=document.getElementById('paid');
          box.querySelector('.reg-no').textContent=v.reg;
          box.querySelector('.paid-wa').href='https://wa.me/'+T.wa+'?text='+encodeURIComponent(T.waReg.replace('{reg}',v.reg).replace('{course}',c?c.value:''));
          adm.hidden=true; box.hidden=false; box.focus(); window.scrollTo(0, box.getBoundingClientRect().top+window.scrollY-90);
        },
        fail:function(why){ btn.disabled=false; if(why==='off'){ say(T.offline); setTimeout(function(){ waSend(adm); },900); } else say(why==='cancel'?T.cancelled:T.failed); }
      });
    });
  }
  document.querySelectorAll('.donate').forEach(function(box){
    var input=box.querySelector('input[name=amt]'), st=box.querySelector('.pay-status'), go=box.querySelector('.donate-go');
    var say=function(m){ st.textContent=m||''; };
    function start(a){
      a=Math.round(+a); if(!(a>=10)){ say(T.amountErr); input.focus(); return; }
      go.disabled=true;
      pay({ kind:'support', amount:a, lang:document.documentElement.lang }, T.supportDesc, {}, { say:say,
        done:function(){ go.disabled=false; say(T.thanks); },
        fail:function(why){ go.disabled=false; if(why==='off'){ say(''); var up=box.querySelector('.donate-upi'); if(up) up.hidden=false; } else say(why==='cancel'?'':T.failed); }
      });
    }
    box.querySelectorAll('[data-amt]').forEach(function(b){ b.addEventListener('click',function(){ input.value=b.getAttribute('data-amt'); start(input.value); }); });
    go.addEventListener('click',function(){ start(input.value); });
  });
  var pre=new URLSearchParams(location.search).get('c');
  if(pre){ var r=document.querySelector('input[data-key="'+pre.replace(/[^a-z]/g,'')+'"]'); if(r) r.checked=true; }
  document.querySelectorAll('button.copy').forEach(function(b){ b.addEventListener('click',function(){ var t=b.getAttribute('data-copy'), old=b.textContent; function done(){ b.textContent=b.getAttribute('data-done'); setTimeout(function(){ b.textContent=old; },1800); } if(navigator.clipboard){ navigator.clipboard.writeText(t).then(done,function(){}); } }); });
})();
</script>`;

// ---------- write ----------
async function writePage(rel, html) {
  const dir = path.join(out, rel);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'public'), out, { recursive: true });
const urls = [];
for (const lang of LANGS) {
  const { pages, notFound } = buildLang(lang);
  for (const [p, html] of Object.entries(pages)) {
    const full = prefixOf(lang) + p;
    await writePage(full.replace(/^\//, ''), html);
    urls.push(full);
  }
  if (lang === 'hi') await writeFile(path.join(out, '404.html'), notFound);
}
await writeFile(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls
    .map((p) => {
      const base = p.replace(/^\/en/, '') || '/';
      return `  <url><loc>${abs(p)}</loc><xhtml:link rel="alternate" hreflang="hi" href="${abs(base)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs('/en' + base)}"/></url>`;
    })
    .join('\n')}\n</urlset>\n`,
);
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
const files = await readdir(out, { recursive: true });
console.log(`ifa/dist तैयार: ${urls.length} पेज (हिंदी + English), ${videos.length} वीडियो, ${gallery.length} गैलरी फ़ोटो, ${igPosts.length} Instagram पोस्ट, ${files.length} फ़ाइलें`);
