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

// ---------- structured data ----------
const orgId = abs('/#academy');
const orgLd = (lang) => ({
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': orgId,
  name: 'Indian Films Academy',
  alternateName: ['इंडियन फिल्म्स एकेडमी', 'IFA Lucknow', 'Indian Film Academy Lucknow'],
  url: abs('/'),
  logo: abs('/img/logo-emblem-512.webp'),
  image: abs('/img/hero-group-1600.webp'),
  description: site.en.about[0],
  foundingDate: String(site.since),
  telephone: site.phone,
  email: site.email,
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.pin, addressCountry: 'IN' },
  founder: site.founderMeta.map((f, i) => ({ '@type': 'Person', name: f.nameEn, jobTitle: site.en.founders[i].role, ...(f.links.length ? { sameAs: f.links.map(([, h]) => h) } : {}) })),
  sameAs: [site.youtubeUrl, site.instagramUrl, site.facebookUrl].filter(Boolean),
  inLanguage: lang,
});
const courseLd = (lang, slug) => {
  const T = site[lang].tracks[slug];
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `CINEKAR ${site.trackNames[slug]}: ${T.seo}`,
    description: T.description,
    inLanguage: 'hi',
    provider: { '@type': 'EducationalOrganization', '@id': orgId, name: 'Indian Films Academy', sameAs: abs('/') },
    offers: { '@type': 'Offer', category: 'Paid', price: site.fee, priceCurrency: 'INR', url: abs(`${prefixOf(lang)}/cinekar/${slug}/`) },
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
  const applyUrl = u('/contact/#apply');
  const crumbs = (items) => `<nav class="crumbs" aria-label="breadcrumb">${items.map(([n, p], i) => (i < items.length - 1 ? `<a href="${p}">${esc(n)}</a>` : `<span>${esc(n)}</span>`)).join('<span aria-hidden="true"> / </span>')}</nav>`;
  const tracks = site.trackOrder.map((slug) => ({ slug, name: site.trackNames[slug], ...L.tracks[slug] }));
  const feeVars = { i1: money(site.installments[0]), i2: money(site.installments[1]), total: money(site.installments.reduce((a, b) => a + b, 0)), pct: site.scholarshipPct };

  function layout({ title, description, pathName, image, ld = [], body, type = 'website', noindex = false }) {
    const url = abs(u(pathName));
    const altHi = abs(pathName), altEn = abs('/en' + pathName);
    const switchHref = (other === 'hi' ? '' : '/en') + pathName;
    const nav = L.nav.map(([h, l]) => `<a href="${u(h)}"${pathName.startsWith(h) ? ' aria-current="page"' : ''}>${esc(l)}</a>`).join('');
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
<meta name="theme-color" content="#13203B">
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
        <li><a href="${u('/cinekar/')}">${esc(F.cinekar)}</a></li>
        ${tracks.map((t) => `<li><a href="${u(`/cinekar/${t.slug}/`)}">${esc(t.seo)}</a></li>`).join('\n        ')}
        <li><a href="${u('/online/')}">${esc(F.online)}</a></li>
      </ul>
    </div>
    <div>
      <h2>${esc(F.academy)}</h2>
      <ul>
        <li><a href="${u('/about/')}">${esc(F.about)}</a></li>
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
    <span>${esc(F.partner)}: <a href="https://pichchrapa.com">PICHCHRAPA</a> · <a href="https://gapistaan.com">Gapistaan</a></span>
  </div>
</footer>
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

  const ladder = () => `<div class="ladder-band"><div class="wrap"><p class="ladder-title">${esc(L.ladderTitle)}</p><ol class="ladder">${L.ladder.map(([k, v], i) => `<li><span class="ladder-step">${i + 1}</span><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol></div></div>`;

  const months = (track) => `<ol class="months">${L.months
    .map((m, i) => {
      const pts = i === 1 ? (track ? track.month2 : null) : m.points;
      const body = pts
        ? `<ul class="ticks">${pts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`
        : `<div class="tracklets">${tracks.map((t) => `<a href="${u(`/cinekar/${t.slug}/`)}"><strong>${esc(t.name)}</strong><span>${esc(t.month2.slice(0, 3).join(' · '))}</span></a>`).join('')}</div>`;
      return `<li class="month"><span class="month-n">${esc(L.monthWord)} ${i + 1}</span><h3>${esc(m.title)}</h3><p class="month-who">${esc(m.who)}</p><p class="muted">${esc(m.why)}</p>${body}</li>`;
    })
    .join('')}</ol>`;

  const feeCard = () => `<div class="fee-card">
  <p class="fee-k">${esc(L.fee.label)}</p>
  <p class="fee-v">${money(site.fee)}</p>
  <p class="fee-note">${esc(L.fee.note)}</p>
  <dl class="fee-list">
    <div><dt>${esc(L.fee.instK)}</dt><dd>${esc(fmt(L.fee.instV, feeVars))}</dd></div>
    <div><dt>${esc(L.fee.schK)}</dt><dd>${esc(fmt(L.fee.schV, feeVars))}</dd></div>
    <div><dt>${esc(L.fee.eligK)}</dt><dd>${esc(L.fee.eligV)}</dd></div>
  </dl>
  <a class="btn btn-gold" href="${applyUrl}">${esc(L.hero.cta)}</a>
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
      ${m.links.length ? `<p class="link-row">${m.links.map(([l, h]) => `<a class="chip-link" href="${esc(h)}">${esc(l)}</a>`).join('')}</p>` : ''}
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
  <form class="apply" id="apply" action="https://wa.me/${site.whatsapp}" method="get" data-intro="${esc(C.msgIntro)}">
    <h3>${esc(C.formTitle)}</h3>
    <p class="muted">${esc(C.formNote)}</p>
    <label>${esc(C.name)}<input name="name" autocomplete="name" required data-k="${esc(C.name)}"></label>
    <label>${esc(C.phoneF)}<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required data-k="${esc(C.phoneF)}"></label>
    <label>${esc(C.city)}<input name="city" autocomplete="address-level2" data-k="${esc(C.city)}"></label>
    <label>${esc(C.track)}<select name="track" data-k="${esc(C.track)}">${tracks.map((t) => `<option>${esc(t.name)} (${esc(t.nameLocal)})</option>`).join('')}<option>${esc(C.undecided)}</option><option>${esc(C.online)}</option></select></label>
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
    ld: [orgLd(lang), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Indian Films Academy', url: abs(u('/')), inLanguage: lang }, faqLd(L.faq)],
    body: `<main id="main">
<section class="hero">
  <div class="hero-bg">${img('hero-group', 800, '', { widths: [800, 1600], sizes: '100vw', lazy: false, high: true, width: 1600, height: 1069 })}</div>
  <div class="wrap hero-in">
    <p class="kicker">${esc(L.hero.kicker)}</p>
    <h1 class="hero-h1"><span class="brandword">CINEKAR</span><span class="hero-line">${esc(L.hero.line)}</span></h1>
    <p class="hero-sub">${esc(L.hero.sub)}</p>
    <div class="actions">
      <a class="btn btn-gold" href="${applyUrl}">${esc(L.hero.cta)}</a>
      <a class="btn btn-ghost-light" href="${u('/cinekar/')}">${esc(L.hero.cta2)}</a>
    </div>
  </div>
</section>
${ladder()}
<section class="sec" aria-labelledby="tracks-h"><div class="wrap">
  <p class="eyebrow">${esc(L.tracksEyebrow)}</p>
  <h2 class="h2" id="tracks-h">${esc(L.tracksTitle)}</h2>
  <p class="lede">${esc(L.tracksLede)}</p>
  <ul class="tracks">${tracks
    .map((t) => `<li><a class="track" href="${u(`/cinekar/${t.slug}/`)}"><span class="track-name">${esc(t.name)}</span><span class="track-local">${esc(t.nameLocal)}</span><span class="track-pitch">${esc(t.pitch)}</span><ul class="ticks">${t.month2.slice(0, 4).map((p) => `<li>${esc(p)}</li>`).join('')}</ul><span class="more">${esc(L.trackMore)}</span></a></li>`)
    .join('')}</ul>
</div></section>
<section class="sec sec-alt" aria-labelledby="months-h"><div class="wrap">
  <p class="eyebrow">${esc(L.monthsEyebrow)}</p>
  <h2 class="h2" id="months-h">${esc(L.monthsTitle)}</h2>
  ${months(null)}
</div></section>
${videos.length ? `<section class="sec" aria-labelledby="yt-h"><div class="wrap">
  <div class="sec-head"><div><p class="eyebrow">${esc(L.videosEyebrow)}</p><h2 class="h2" id="yt-h">${esc(L.videosTitle)}</h2><p class="hint">${esc(L.videosHint)}</p></div><a class="chip-link" href="${esc(site.youtubeUrl)}?sub_confirmation=1">${esc(L.subscribe)}</a></div>
  ${rail(videos.slice(0, 16).map(videoCard).join(''), 'vrail', L.videosTitle)}
  <p class="more-link"><a href="${u('/videos/')}">${esc(L.allVideos)}</a></p>
</div></section>` : ''}
<section class="sec sec-alt" aria-labelledby="creator-h"><div class="wrap split">
  <div>
    <p class="eyebrow">${esc(L.creatorEyebrow)}</p>
    <h2 class="h2" id="creator-h">${esc(L.creatorTitle)}</h2>
    ${L.creator.map((p) => `<p>${esc(p)}</p>`).join('\n    ')}
    <p class="proof">${L.creatorProof}</p>
  </div>
  ${img('group-3', 800, 'Indian Films Academy', { widths: [800, 1400], sizes: '(min-width: 64rem) 520px, 92vw', cls: 'rounded', width: 800, height: 570 })}
</div></section>
<section class="sec" aria-labelledby="legends-h">
  <div class="wrap"><p class="eyebrow">${esc(L.legendsEyebrow)}</p><h2 class="h2" id="legends-h">${esc(L.legendsTitle)}</h2><p class="lede">${esc(L.legendsLede)}</p></div>
  ${marquee(legends.filter((g) => g.names).slice(0, 18))}
  <div class="wrap"><p class="more-link"><a href="${u('/gallery/')}">${esc(L.allPhotos)}</a></p></div>
</section>
<section class="sec sec-alt" aria-labelledby="fees-h"><div class="wrap split">
  <div><p class="eyebrow">${esc(L.feesEyebrow)}</p><h2 class="h2" id="fees-h">${esc(L.feesTitle)}</h2>${steps()}</div>
  ${feeCard()}
</div></section>
<section class="sec" aria-labelledby="founders-h"><div class="wrap">
  <p class="eyebrow">${esc(L.foundersEyebrow)}</p><h2 class="h2" id="founders-h">${esc(L.foundersTitle)}</h2>
  ${founders()}
</div></section>
${igPosts.length ? `<section class="sec sec-alt" aria-labelledby="ig-h"><div class="wrap">
  <div class="sec-head"><div><p class="eyebrow">${esc(L.igEyebrow)}</p><h2 class="h2" id="ig-h">${esc(L.igTitle)}</h2></div>${site.instagramUrl ? `<a class="chip-link" href="${esc(site.instagramUrl)}">${esc(L.follow)}</a>` : ''}</div>
  ${rail(igPosts.slice(0, 12).map((p) => `<li><a class="igcard" href="${esc(p.permalink)}"><img src="${esc(p.img)}" alt="${esc((p.caption || 'Instagram').slice(0, 90))}" loading="lazy" decoding="async" width="320" height="320">${p.type === 'reel' || p.type === 'video' ? '<span class="ig-reel" aria-hidden="true">▶</span>' : ''}</a></li>`).join(''), 'igrail', L.igTitle)}
</div></section>` : ''}
<section class="sec"><div class="wrap"><div class="online-band">
  <div><p class="eyebrow">${esc(L.onlineEyebrow)}</p><h2 class="h2">${esc(L.onlineTitle)}</h2><p>${esc(L.onlineText)}</p></div>
  <a class="btn btn-gold" href="${u('/online/')}">${esc(L.onlineCta)}</a>
</div></div></section>
<section class="sec sec-alt" aria-labelledby="faq-h"><div class="wrap"><h2 class="h2" id="faq-h">${esc(L.faqTitle)}</h2>${faq(L.faq)}</div></section>
<section class="sec" id="contact" aria-labelledby="contact-h"><div class="wrap"><h2 class="h2" id="contact-h">${esc(L.contactTitle)}</h2>${contactBlock()}</div></section>
${viewer}
</main>`,
  });

  const CP = L.cinekarPage;
  pages['/cinekar/'] = layout({
    title: CP.title,
    description: CP.description,
    pathName: '/cinekar/',
    ld: [...site.trackOrder.map((s) => courseLd(lang, s)), faqLd(L.faq), crumbsLd([[L.home, u('/')], ['CINEKAR', u('/cinekar/')]])],
    body: `<main id="main" class="page">
<div class="wrap page-head">
${crumbs([[L.home, u('/')], ['CINEKAR', u('/cinekar/')]])}
<p class="eyebrow">${esc(CP.eyebrow)}</p>
<h1 class="page-h1"><span class="brandword sm">CINEKAR</span> <span class="h1-line">${esc(L.hero.line)}</span></h1>
<p class="lede">${esc(L.hero.sub)}</p>
<div class="actions"><a class="btn btn-primary" href="${applyUrl}">${esc(L.hero.cta)}</a></div>
</div>
${ladder()}
<section class="sec"><div class="wrap"><h2 class="h2">${esc(CP.syllabus)}</h2>${months(null)}</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2 class="h2">${esc(CP.choose)}</h2>
  <div class="compare-wrap"><table class="compare">
    <thead><tr><th></th>${tracks.map((t) => `<th><a href="${u(`/cinekar/${t.slug}/`)}">${esc(t.name)}</a></th>`).join('')}</tr></thead>
    <tbody>
      <tr><th>${esc(CP.rowFor)}</th>${tracks.map((t) => `<td>${esc(t.forWhom[0])}</td>`).join('')}</tr>
      <tr><th>${esc(CP.rowM2)}</th>${tracks.map((t) => `<td>${esc(t.month2.slice(0, 3).join('; '))}</td>`).join('')}</tr>
      <tr><th>${esc(CP.rowOut)}</th>${tracks.map((t) => `<td>${esc(t.outcome.join(', '))}</td>`).join('')}</tr>
    </tbody>
  </table></div>
</div></section>
<section class="sec"><div class="wrap split"><div><h2 class="h2">${esc(L.feesTitle)}</h2>${steps()}</div>${feeCard()}</div></section>
<section class="sec sec-alt"><div class="wrap"><h2 class="h2">${esc(CP.faq)}</h2>${faq(L.faq)}</div></section>
</main>`,
  });

  const TP = L.trackPage;
  for (const t of tracks) {
    const others = tracks.filter((x) => x !== t);
    pages[`/cinekar/${t.slug}/`] = layout({
      title: t.title,
      description: t.description,
      pathName: `/cinekar/${t.slug}/`,
      ld: [courseLd(lang, t.slug), crumbsLd([[L.home, u('/')], ['CINEKAR', u('/cinekar/')], [t.name, u(`/cinekar/${t.slug}/`)]])],
      body: `<main id="main" class="page">
<div class="wrap page-head">
${crumbs([[L.home, u('/')], ['CINEKAR', u('/cinekar/')], [t.name, u(`/cinekar/${t.slug}/`)]])}
<p class="eyebrow">CINEKAR ${esc(t.name)}</p>
<h1 class="page-h1">${esc(t.h1)}</h1>
<p class="lede">${esc(t.pitch)}</p>
<ul class="chips">${TP.chips.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
<div class="actions"><a class="btn btn-primary" href="${applyUrl}">${esc(L.hero.cta)}</a><a class="btn btn-ghost" href="#syllabus">${esc(TP.syllabus)}</a></div>
</div>
<section class="sec sec-alt"><div class="wrap split">
  <div><h2 class="h2">${esc(TP.for)}</h2><ul class="ticks big">${t.forWhom.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
  <div class="card"><h2 class="h2">${esc(TP.out)}</h2><ul class="ticks big">${t.outcome.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>
</div></section>
<section class="sec" id="syllabus"><div class="wrap"><h2 class="h2">${esc(L.cinekarPage.syllabus)}</h2>${months(t)}</div></section>
${ladder()}
<section class="sec"><div class="wrap split">
  <div><h2 class="h2">${esc(L.feesTitle)}</h2>${steps()}<p class="muted">${esc(TP.others)}: ${others.map((o) => `<a href="${u(`/cinekar/${o.slug}/`)}">${esc(o.seo)}</a>`).join(' · ')}</p></div>
  ${feeCard()}
</div></section>
</main>`,
    });
  }

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
<section class="sec"><div class="wrap"><h2 class="h2">${esc(L.foundersTitle)}</h2>${founders()}</div></section>
<section class="sec sec-alt"><div class="wrap"><h2 class="h2 cine">${esc(L.methodTitle)}</h2><div class="prose">${L.method.map((p) => `<p>${esc(p)}</p>`).join('')}</div></div></section>
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
<section class="sec sec-tight"><div class="wrap"><h2 class="h2">${esc(L.galleryAcademy)}</h2><ul class="gallery">${['group-2', 'campus-1', 'campus-2', 'campus-3', 'stage-1', 'stage-2'].map((n) => `<li><a class="js-view" href="/img/${n}-800.webp" data-cap="Indian Films Academy"><img src="/img/${n}-800.webp" alt="Indian Films Academy, Lucknow" loading="lazy" decoding="async" width="480" height="360"></a></li>`).join('')}</ul></div></section>
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
<div class="sec-head"><div><h1 class="page-h1">${esc(L.videosPageTitle)}</h1><p class="lede">${esc(L.videosPageLede)}</p><p class="hint">${esc(L.videosHint)}</p></div><a class="chip-link" href="${esc(site.youtubeUrl)}?sub_confirmation=1">${esc(L.subscribe)}</a></div>
<ul class="vgrid">${videos.map(videoCard).join('\n')}</ul>
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
    body: `<main id="main" class="page"><div class="wrap lost"><img src="/img/logo-emblem-192.webp" alt="" width="120" height="120"><h1 class="page-h1">${esc(L.notFound.h1)}</h1><p>${esc(L.notFound.text)}</p><p class="actions"><a class="btn btn-primary" href="${u('/cinekar/')}">CINEKAR</a><a class="btn btn-ghost" href="${u('/')}">${esc(L.home)}</a></p></div></main>`,
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
  var form=document.getElementById('apply');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var lines=[form.getAttribute('data-intro')];
      form.querySelectorAll('[data-k]').forEach(function(el){ var v=(el.value||'').trim(); if(v) lines.push(el.getAttribute('data-k')+': '+v); });
      window.location.href='https://wa.me/${site.whatsapp}?text='+encodeURIComponent(lines.join('\\n'));
    });
  }
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
