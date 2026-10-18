// Builds indianfilmsacademy.com into ifa/dist from content/site.json, data/videos.json and data/instagram.json.
// No dependencies: run with `node ifa/scripts/build.mjs`.
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
const siteUrl = (site.siteUrl || '').replace(/\/+$/, '');
const abs = (p) => siteUrl + p;
const P = site.program;

// ---------- helpers ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const jsonLd = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const dateFmt = new Intl.DateTimeFormat('hi-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
const hiDate = (iso) => dateFmt.format(new Date(iso));
function seconds(iso) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || '');
  return m ? (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0) : 0;
}
function clock(sec) {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60, p = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${p(m)}:${p(s)}` : `${m}:${p(s)}`;
}
const money = (n) => '₹' + Number(n).toLocaleString('en-IN');
const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
const waAdmission = wa('नमस्ते, मुझे CINEKAR कोर्स (Indian Films Academy) में एडमिशन की जानकारी चाहिए।');
const img = (name, w, alt, { sizes = '100vw', lazy = true, cls = '', width, height, widths } = {}) => {
  const ws = widths || [w];
  const srcset = ws.length > 1 ? ` srcset="${ws.map((x) => `/img/${name}-${x}.webp ${x}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img${cls ? ` class="${cls}"` : ''} src="/img/${name}-${w}.webp"${srcset} alt="${esc(alt)}"${width ? ` width="${width}" height="${height}"` : ''}${lazy ? ' loading="lazy" decoding="async"' : ''}>`;
};
const address1 = `${site.address.street}, ${site.address.city}, ${site.address.region === 'Uttar Pradesh' ? 'उत्तर प्रदेश' : site.address.region} ${site.address.pin}`;
const addressEn = `${site.address.streetEn}, ${site.address.cityEn}, ${site.address.region} ${site.address.pin}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Indian Films Academy, ' + addressEn)}`;

// ---------- data ----------
const hidden = new Set(site.hiddenVideos || []);
const videos = (vdata.videos || [])
  .filter((v) => !hidden.has(v.id))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((v) => ({ ...v, sec: seconds(v.duration), clean: v.title.replace(/\s*\|\s*/g, ' | ').replace(/\s+/g, ' ').trim() }));
const longVideos = videos.filter((v) => !v.isShort);
const igPosts = igdata.posts || [];

const galleryFiles = existsSync(path.join(root, 'public/img/g')) ? (await readdir(path.join(root, 'public/img/g'))).filter((f) => f.endsWith('-480.webp')).sort() : [];
const gallery = galleryFiles.map((f) => {
  const base = f.replace(/-480\.webp$/, '');
  const key = base.slice(2);
  const name = site.legendNames?.[key] || '';
  return { group: base[0], base, name };
});
// Named photos first, in the order listed in site.json (biggest names first), then the rest.
const nameOrder = Object.keys(site.legendNames || {});
const rank = (g) => (g.name ? nameOrder.indexOf(g.base.slice(2)) : 999);
const byRank = (a, b) => rank(a) - rank(b) || a.base.localeCompare(b.base);
const legends = gallery.filter((g) => g.group === 'L').sort(byRank);
const visitors = gallery.filter((g) => g.group === 'V').sort(byRank);

// ---------- structured data ----------
const orgId = abs('/#academy');
const founderLd = (f) => ({ '@type': 'Person', name: f.nameEn, alternateName: f.name, jobTitle: f.role, ...(f.links?.length ? { sameAs: f.links.map(([, u]) => u) } : {}) });
const orgLd = () => ({
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': orgId,
  name: site.siteName,
  alternateName: [site.siteNameHi, 'IFA Lucknow', 'Indian Film Academy Lucknow'],
  url: abs('/'),
  logo: abs('/img/logo-emblem-512.webp'),
  image: abs('/img/hero-group-1600.webp'),
  description: site.aboutEn,
  foundingDate: String(site.since),
  telephone: site.phone,
  email: site.email,
  priceRange: '₹₹',
  address: { '@type': 'PostalAddress', streetAddress: site.address.streetEn, addressLocality: site.address.cityEn, addressRegion: site.address.region, postalCode: site.address.pin, addressCountry: 'IN' },
  founder: site.founders.map(founderLd),
  sameAs: [site.youtubeUrl, site.instagramUrl, site.facebookUrl].filter(Boolean),
});
const courseLd = (t) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: `CINEKAR ${t.name}: ${t.seo}`,
  description: t.description,
  inLanguage: 'hi',
  provider: { '@type': 'EducationalOrganization', '@id': orgId, name: site.siteName, sameAs: abs('/') },
  offers: { '@type': 'Offer', category: 'Paid', price: P.fee, priceCurrency: 'INR', url: abs(`/cinekar/${t.slug}/`) },
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Onsite', location: { '@type': 'Place', name: site.siteName, address: addressEn }, courseWorkload: P.durationIso },
});
const faqLd = (list) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbsLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: abs(p) })) });
const crumbs = (items) => `<nav class="crumbs" aria-label="आप यहाँ हैं">${items.map(([n, p], i) => (i < items.length - 1 ? `<a href="${p}">${esc(n)}</a>` : `<span>${esc(n)}</span>`)).join(' / ')}</nav>`;

// ---------- layout ----------
const NAV = [
  ['/cinekar/', 'CINEKAR कोर्स'],
  ['/online/', 'ऑनलाइन कोर्स'],
  ['/about/', 'हमारे बारे में'],
  ['/gallery/', 'गैलरी'],
  ['/videos/', 'वीडियो'],
  ['/contact/', 'संपर्क'],
];
const socials = () =>
  [
    site.youtubeUrl && ['YouTube', site.youtubeUrl],
    site.instagramUrl && ['Instagram', site.instagramUrl],
    site.facebookUrl && ['Facebook', site.facebookUrl],
  ].filter(Boolean);

function layout({ title, description, pathName, image, ld = [], body, type = 'website', noindex = false }) {
  const url = abs(pathName);
  const ogImage = image || abs('/img/hero-group-1600.webp');
  const nav = NAV.map(([h, l]) => `<a href="${h}"${pathName.startsWith(h) ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  return `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="#0E0C0A">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/img/logo-emblem-96.webp" type="image/webp">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/mukta-devanagari-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mukta-devanagari-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/anton-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:locale" content="hi_IN">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="summary_large_image">
<style>${css}</style>
${ld.map(jsonLd).join('\n')}
</head>
<body>
<a class="skip" href="#main">सीधे मुख्य हिस्से पर जाएँ</a>
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="/"><img src="/img/logo-emblem-96.webp" alt="" width="44" height="44"><span><span class="brand-name">Indian Films Academy</span><span class="brand-sub">लखनऊ · ${site.since} से</span></span></a>
    <nav class="topnav" aria-label="मुख्य मेन्यू">${nav}</nav>
    <a class="btn btn-gold btn-sm" href="${waAdmission}">एडमिशन</a>
  </div>
</header>
${body}
<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <div class="foot-brand"><img src="/img/logo-emblem-96.webp" alt="" width="48" height="48" loading="lazy"><span>Indian Films Academy</span></div>
      <p>सिनेमा की पढ़ाई, सिनेमा के बीच। ${site.since} से लखनऊ में।</p>
      <p class="muted">${esc(address1)}</p>
    </div>
    <div>
      <h2>कोर्स</h2>
      <ul>
        <li><a href="/cinekar/">CINEKAR: 3 महीने का प्रोग्राम</a></li>
        ${P.tracks.map((t) => `<li><a href="/cinekar/${t.slug}/">${esc(t.seo)}</a></li>`).join('\n        ')}
        <li><a href="/online/">ऑनलाइन एक्टिंग कोर्स</a></li>
      </ul>
    </div>
    <div>
      <h2>एकेडमी</h2>
      <ul>
        <li><a href="/about/">हमारे बारे में</a></li>
        <li><a href="/gallery/">गैलरी</a></li>
        <li><a href="/videos/">वीडियो</a></li>
        <li><a href="/privacy/">प्राइवेसी</a></li>
        ${socials().map(([l, u]) => `<li><a href="${esc(u)}">${l}</a></li>`).join('\n        ')}
      </ul>
    </div>
    <div>
      <h2>संपर्क</h2>
      <ul>
        <li><a href="tel:${esc(site.phone)}">${esc(site.phoneLabel)}</a></li>
        <li><a href="${waAdmission}">WhatsApp पर बात करें</a></li>
        <li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
        <li><a href="${mapsUrl}">Google Maps पर रास्ता</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <span>© ${new Date().getFullYear()} Indian Films Academy, लखनऊ</span>
    <span>प्रोडक्शन पार्टनर: <a href="https://pichchrapa.com">PICHCHRAPA</a> · <a href="https://gapistaan.com">गैपिस्तान</a></span>
  </div>
</footer>
<a class="wa-float" href="${waAdmission}" aria-label="WhatsApp पर एडमिशन की बात करें"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.1 19.7L3 29l6.5-1.8A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.8 6.5 6.5 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.1-.3-.2-.6-.4z"/></svg></a>
${PAGE_JS}
${site.cfAnalyticsToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${esc(site.cfAnalyticsToken)}"}'></script>` : ''}
</body>
</html>
`;
}

const PAGE_JS = `<script>
(function(){
  function player(id,title){
    var f=document.createElement('iframe');
    f.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1';
    f.title=title||'YouTube'; f.className='inline-player';
    f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen=true; return f;
  }
  document.querySelectorAll('.js-play').forEach(function(a){
    a.addEventListener('click',function(e){ if(e.metaKey||e.ctrlKey) return; e.preventDefault(); var t=a.querySelector('.thumb'); (t||a).replaceWith(player(a.getAttribute('data-id'),a.getAttribute('data-title'))); });
  });
  // Gallery: open the large photo in a simple viewer
  var dlg=document.getElementById('viewer');
  if(dlg && dlg.showModal){
    var big=dlg.querySelector('img'), cap=dlg.querySelector('figcaption');
    document.querySelectorAll('.js-view').forEach(function(a){
      a.addEventListener('click',function(e){ e.preventDefault(); big.src=a.getAttribute('href'); big.alt=a.getAttribute('data-cap')||''; cap.textContent=a.getAttribute('data-cap')||''; dlg.showModal(); });
    });
    dlg.addEventListener('click',function(){ dlg.close(); });
  }
  // Admission form: turns the answers into a WhatsApp message, nothing is stored anywhere
  var form=document.getElementById('apply');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form), lines=['नमस्ते, मुझे CINEKAR कोर्स में एडमिशन की जानकारी चाहिए।'];
      [['name','नाम'],['phone','फ़ोन'],['city','शहर'],['track','ट्रैक'],['note','संदेश']].forEach(function(k){ var v=(d.get(k[0])||'').toString().trim(); if(v) lines.push(k[1]+': '+v); });
      window.location.href='https://wa.me/${site.whatsapp}?text='+encodeURIComponent(lines.join('\\n'));
    });
  }
})();
</script>`;

// ---------- shared blocks ----------
function videoCard(v) {
  const t = `https://i.ytimg.com/vi/${v.id}/`;
  return `<li><a class="vcard js-play" href="https://www.youtube.com/watch?v=${v.id}" data-id="${v.id}" data-title="${esc(v.clean)}">
  <span class="thumb"><img src="${t}mqdefault.jpg" srcset="${t}mqdefault.jpg 320w, ${t}hqdefault.jpg 480w, ${t}sddefault.jpg 640w" sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 45vw, 92vw" alt="" width="320" height="180" loading="lazy" decoding="async"><span class="play-dot" aria-hidden="true"></span>${v.sec ? `<span class="dur" aria-hidden="true">${clock(v.sec)}</span>` : ''}</span>
  <span class="vtitle">${esc(v.clean)}</span>
  <span class="date">${hiDate(v.publishedAt)}</span>
</a></li>`;
}

const ladderHtml = () => `<ol class="ladder">
${P.ladder.map(([k, v], i) => `  <li><span class="ladder-step">${i + 1}</span><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('\n')}
</ol>`;

const monthsHtml = (track) => `<ol class="months">
${P.months
  .map((m) => {
    const pts = m.n === 2 ? (track ? track.month2 : null) : m.points;
    const body = pts
      ? `<ul class="ticks">${pts.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`
      : `<div class="tracklets">${P.tracks.map((t) => `<a href="/cinekar/${t.slug}/"><strong>${esc(t.name)}</strong><span>${esc(t.month2.slice(0, 3).join(' · '))}</span></a>`).join('')}</div>`;
    return `  <li class="month">
    <div class="month-head"><span class="month-n">महीना ${m.n}</span><h3>${esc(m.title)}</h3><span class="month-who">${esc(m.who)}</span></div>
    <p class="muted">${esc(m.why)}</p>
    ${body}
  </li>`;
  })
  .join('\n')}
</ol>`;

const feeCard = () => `<div class="fee-card">
  <div class="fee-main"><span class="fee-k">एक साथ जमा करने पर</span><span class="fee-v">${P.feeLabel}</span><span class="muted">पूरे 3 महीने की ट्रेनिंग, लाइव प्रोजेक्ट और सर्टिफ़िकेट</span></div>
  <ul class="fee-list">
    <li><strong>दो किस्तों में</strong><span>${P.installments.map(money).join(' + ')} = ${esc(P.installmentTotalLabel)}</span></li>
    <li><strong>सिलेक्शन टेस्ट स्कॉलरशिप</strong><span>${esc(P.scholarship)}</span></li>
    <li><strong>कौन आ सकता है</strong><span>${esc(P.eligibility)}</span></li>
  </ul>
  <a class="btn btn-gold" href="${waAdmission}">WhatsApp पर सीट और बैच पूछें</a>
</div>`;

const faqHtml = (list) => `<div class="faq">
${list.map(([q, a], i) => `  <details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
</div>`;

const galleryGrid = (items, limit) => `<ul class="gallery">
${items
  .slice(0, limit || items.length)
  .map((g) => {
    const cap = g.name ? `${g.name} के साथ` : g.group === 'V' ? 'एकेडमी में आए मेहमान' : 'इंडस्ट्री के दिग्गजों के साथ';
    return `  <li><a class="js-view" href="/img/g/${g.base}-1200.webp" data-cap="${esc(cap)}"><img src="/img/g/${g.base}-480.webp" alt="${esc(cap)}: Indian Films Academy" loading="lazy" decoding="async" width="480" height="360">${g.name ? `<span class="gcap">${esc(g.name)}</span>` : ''}</a></li>`;
  })
  .join('\n')}
</ul>`;
const viewer = `<dialog id="viewer" class="viewer"><figure><img alt=""><figcaption></figcaption></figure><p class="viewer-close">बंद करने के लिए कहीं भी दबाएँ</p></dialog>`;

const founderCards = () => `<div class="founders">
${site.founders
  .map(
    (f) => `  <article class="founder">
    ${img(f.photo, 320, f.name, { widths: [320, 640], sizes: '(min-width: 48rem) 220px, 40vw', width: 320, height: 380 })}
    <div>
      <h3>${esc(f.name)} <span class="en" lang="en">${esc(f.nameEn)}</span></h3>
      <p class="role">${esc(f.role)}</p>
      ${f.bio.map((b) => `<p>${esc(b)}</p>`).join('\n      ')}
      ${f.links.length ? `<p class="link-row">${f.links.map(([l, u]) => `<a class="btn btn-ghost btn-sm" href="${esc(u)}">${esc(l)}</a>`).join('')}</p>` : ''}
    </div>
  </article>`,
  )
  .join('\n')}
</div>`;

const igBlock = () => {
  if (igPosts.length)
    return `<ul class="ig">${igPosts
      .slice(0, 8)
      .map((p) => `<li><a href="${esc(p.permalink)}"><img src="${esc(p.img)}" alt="${esc((p.caption || 'Instagram पोस्ट').slice(0, 90))}" loading="lazy" decoding="async" width="320" height="320">${p.type === 'reel' || p.type === 'video' ? '<span class="ig-reel" aria-hidden="true">▶</span>' : ''}</a></li>`)
      .join('')}</ul>`;
  return '';
};

const contactBlock = () => `<div class="contact-grid">
  <div class="contact-card">
    <h3>पता</h3>
    <p>${esc(address1)}</p>
    <p class="link-row"><a class="btn btn-ghost btn-sm" href="${mapsUrl}">Google Maps पर रास्ता</a></p>
    <h3>फ़ोन और WhatsApp</h3>
    <p><a href="tel:${esc(site.phone)}">${esc(site.phoneLabel)}</a></p>
    <h3>ईमेल</h3>
    <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
  </div>
  <form class="apply" id="apply" action="https://wa.me/${site.whatsapp}" method="get">
    <h3>एडमिशन के लिए पूछिए</h3>
    <p class="muted">जवाब सीधे हमारे WhatsApp पर पहुँचेगा। हम आपका नंबर कहीं जमा नहीं करते।</p>
    <label>आपका नाम<input name="name" autocomplete="name" required></label>
    <label>फ़ोन नंबर<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
    <label>शहर<input name="city" autocomplete="address-level2"></label>
    <label>कौन-सा ट्रैक<select name="track">${P.tracks.map((t) => `<option>${esc(t.name)} (${esc(t.nameHi)})</option>`).join('')}<option>अभी तय नहीं</option><option>ऑनलाइन कोर्स</option></select></label>
    <label>कुछ और पूछना है?<textarea name="note" rows="3"></textarea></label>
    <button class="btn btn-wa" type="submit">WhatsApp पर भेजें</button>
  </form>
</div>`;

// ---------- pages ----------
function homePage() {
  const body = `<main id="main">
<section class="hero">
  <picture class="hero-bg">${img('hero-group', 800, '', { widths: [800, 1600], sizes: '100vw', lazy: false, width: 1600, height: 1069 }).replace('<img', '<img fetchpriority="high"')}</picture>
  <div class="wrap hero-in">
    <p class="kicker"><span>नया</span> Indian Films Academy, लखनऊ का 3 महीने का प्रोग्राम</p>
    <h1 class="hero-h1"><span class="brandword">${esc(P.name)}</span><span class="hero-line">${esc(P.tagline)}</span></h1>
    <p class="hero-sub">${esc(P.sub)}</p>
    <ul class="chips">
      <li>${esc(P.duration)}</li><li>${esc(P.feeLabel)}</li><li>टेस्ट पर 20% तक स्कॉलरशिप</li><li>टॉप 10 को इंटर्नशिप</li>
    </ul>
    <div class="actions">
      <a class="btn btn-gold" href="${waAdmission}">WhatsApp पर एडमिशन</a>
      <a class="btn btn-ghost" href="/cinekar/">पूरा कोर्स देखें</a>
    </div>
  </div>
</section>

<section class="sec band" aria-label="ट्रेनिंग से नौकरी तक">
  <div class="wrap">${ladderHtml()}</div>
</section>

<section class="sec" id="tracks" aria-labelledby="tracks-h">
  <div class="wrap">
    <p class="eyebrow">CINEKAR के तीन रास्ते</p>
    <h2 class="h2" id="tracks-h">आप क्या बनना चाहते हैं?</h2>
    <p class="lede">तीनों ट्रैक 3 महीने के हैं, फ़ीस एक ही है। पहला महीना सब साथ सीखते हैं, फिर हर कोई अपनी फ़ील्ड में जाता है।</p>
    <ul class="tracks">
${P.tracks
  .map(
    (t) => `      <li><a class="track" href="/cinekar/${t.slug}/">
        <span class="track-name">${esc(t.name)}</span><span class="track-hi">${esc(t.nameHi)}</span>
        <span class="track-pitch">${esc(t.pitch)}</span>
        <ul class="ticks">${t.month2.slice(0, 4).map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        <span class="more">${esc(t.nameHi)} ट्रैक का पूरा सिलेबस</span>
      </a></li>`,
  )
  .join('\n')}
    </ul>
  </div>
</section>

<section class="sec sec-alt" aria-labelledby="months-h">
  <div class="wrap">
    <p class="eyebrow">90 दिन का रास्ता</p>
    <h2 class="h2" id="months-h">तीन महीने, तीन क़दम</h2>
    ${monthsHtml(null)}
  </div>
</section>

<section class="sec" aria-labelledby="creator-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">हर छात्र क्रिएटर भी</p>
      <h2 class="h2" id="creator-h">YouTube और Instagram की पूरी ट्रेनिंग</h2>
      ${P.creator.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      <p class="proof">इसका सबूत: कॉमेडी सीरीज़ <a href="https://gapistaan.com">गैपिस्तान (Gen Gap)</a> के सारे कलाकार इसी एकेडमी से तैयार हुए हैं, और पूरा शो इसी तरीके से शूट होता है।</p>
    </div>
    ${img('group-3', 800, 'Indian Films Academy के छात्र और मेंटर', { widths: [800, 1400], sizes: '(min-width: 64rem) 520px, 92vw', cls: 'rounded', width: 800, height: 570 })}
  </div>
</section>

<section class="sec sec-alt" id="fees" aria-labelledby="fees-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">फ़ीस और एडमिशन</p>
      <h2 class="h2" id="fees-h">साफ़ फ़ीस, सिलेक्शन से एडमिशन</h2>
      <ol class="steps">${P.admission.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol>
    </div>
    ${feeCard()}
  </div>
</section>

<section class="sec" aria-labelledby="founders-h">
  <div class="wrap">
    <p class="eyebrow">कौन सिखाएगा</p>
    <h2 class="h2" id="founders-h">एकेडमी के संस्थापक</h2>
    ${founderCards()}
  </div>
</section>

<section class="sec sec-alt" aria-labelledby="legends-h">
  <div class="wrap">
    <p class="eyebrow">इंडस्ट्री के साथ रिश्ता</p>
    <h2 class="h2" id="legends-h">सिनेमा के दिग्गजों के साथ</h2>
    <p class="lede">लखनऊ में शूटिंग के दौरान और एकेडमी में आए इंडस्ट्री के दिग्गजों के साथ हमारे संस्थापक और छात्र।</p>
    ${galleryGrid(legends, 12)}
    <p class="more-link"><a href="/gallery/">सारी तस्वीरें देखें</a></p>
  </div>
</section>

${longVideos.length ? `<section class="sec" aria-labelledby="yt-h">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">YouTube से सीधे</p><h2 class="h2" id="yt-h">क्लास की झलक</h2></div><a class="btn btn-ghost btn-sm" href="${esc(site.youtubeUrl)}?sub_confirmation=1">YouTube पर सब्सक्राइब करें</a></div>
    <ul class="vgrid">${longVideos.slice(0, 6).map(videoCard).join('\n')}</ul>
    <p class="more-link"><a href="/videos/">सारे वीडियो</a></p>
  </div>
</section>` : ''}

${igPosts.length ? `<section class="sec sec-alt" aria-labelledby="ig-h">
  <div class="wrap">
    <div class="sec-head"><div><p class="eyebrow">Instagram</p><h2 class="h2" id="ig-h">एकेडमी में आज क्या हुआ</h2></div>${site.instagramUrl ? `<a class="btn btn-ghost btn-sm" href="${esc(site.instagramUrl)}">Instagram पर फ़ॉलो करें</a>` : ''}</div>
    ${igBlock()}
  </div>
</section>` : ''}

<section class="sec" aria-labelledby="online-h">
  <div class="wrap online-band">
    <div>
      <p class="eyebrow">लखनऊ नहीं आ सकते?</p>
      <h2 class="h2" id="online-h">घर बैठे एक्टिंग सीखिए</h2>
      <p>योगेश मिश्रा का ऑनलाइन एक्टिंग कोर्स: वीडियो क्लास, अपनी रफ़्तार से, फ़ोन पर भी।</p>
    </div>
    <a class="btn btn-gold" href="/online/">ऑनलाइन कोर्स देखें</a>
  </div>
</section>

<section class="sec sec-alt" aria-labelledby="faq-h">
  <div class="wrap">
    <h2 class="h2" id="faq-h">अक्सर पूछे जाने वाले सवाल</h2>
    ${faqHtml(site.faq)}
  </div>
</section>

<section class="sec" id="contact" aria-labelledby="contact-h">
  <div class="wrap">
    <h2 class="h2" id="contact-h">एकेडमी आइए या बात कीजिए</h2>
    ${contactBlock()}
  </div>
</section>
${viewer}
</main>`;
  return layout({
    title: site.homeTitle,
    description: site.homeDescription,
    pathName: '/',
    ld: [orgLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: site.siteName, alternateName: site.siteNameHi, url: abs('/'), inLanguage: 'hi' }, faqLd(site.faq)],
    body,
  });
}

function cinekarPage() {
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['CINEKAR कोर्स', '/cinekar/']])}
<p class="eyebrow">Indian Films Academy का नया प्रोग्राम</p>
<h1 class="page-h1"><span class="brandword sm">${esc(P.name)}</span> ${esc(P.tagline)}</h1>
<p class="lede">${esc(P.sub)}</p>
<ul class="chips"><li>${esc(P.duration)}</li><li>${esc(P.mode)}</li><li>${esc(P.feeLabel)}</li></ul>
</div>
<section class="sec band" aria-label="ट्रेनिंग से नौकरी तक"><div class="wrap">${ladderHtml()}</div></section>
<section class="sec"><div class="wrap">
  <h2 class="h2">तीन महीने का सिलेबस</h2>
  ${monthsHtml(null)}
</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2 class="h2">अपना ट्रैक चुनिए</h2>
  <div class="compare-wrap"><table class="compare">
    <thead><tr><th></th>${P.tracks.map((t) => `<th><a href="/cinekar/${t.slug}/">${esc(t.name)}</a></th>`).join('')}</tr></thead>
    <tbody>
      <tr><th>किसके लिए</th>${P.tracks.map((t) => `<td>${esc(t.forWhom[0])}</td>`).join('')}</tr>
      <tr><th>दूसरे महीने में</th>${P.tracks.map((t) => `<td>${esc(t.month2.slice(0, 3).join('; '))}</td>`).join('')}</tr>
      <tr><th>कोर्स के बाद आपके पास</th>${P.tracks.map((t) => `<td>${esc(t.outcome.join(', '))}</td>`).join('')}</tr>
    </tbody>
  </table></div>
</div></section>
<section class="sec"><div class="wrap split">
  <div>
    <h2 class="h2">फ़ीस और एडमिशन</h2>
    <ol class="steps">${P.admission.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol>
  </div>
  ${feeCard()}
</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2 class="h2">सवाल-जवाब</h2>
  ${faqHtml(site.faq)}
</div></section>
</main>`;
  return layout({
    title: 'CINEKAR: 3 महीने का Actor, Director, Editor कोर्स, लखनऊ | फ़ीस ₹50,000 | Indian Films Academy',
    description: 'CINEKAR (Indian Films Academy, लखनऊ): 90 दिन में Actor, Director या Editor। पहला महीना एक्टिंग, दूसरा अपनी फ़ील्ड, तीसरा लाइव प्रोजेक्ट। YouTube-Instagram ट्रेनिंग, टॉप 10 को इंटर्नशिप। फ़ीस ₹50,000।',
    pathName: '/cinekar/',
    ld: [...P.tracks.map(courseLd), faqLd(site.faq), crumbsLd([['होम', '/'], ['CINEKAR कोर्स', '/cinekar/']])],
    body,
  });
}

function trackPage(t) {
  const others = P.tracks.filter((x) => x !== t);
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['CINEKAR कोर्स', '/cinekar/'], [t.name, `/cinekar/${t.slug}/`]])}
<p class="eyebrow">CINEKAR ${esc(t.name)} · ${esc(P.duration)}</p>
<h1 class="page-h1">${esc(t.seo)}: ${esc(t.nameHi)} बनिए 90 दिन में</h1>
<p class="lede">${esc(t.pitch)}</p>
<ul class="chips"><li>${esc(P.duration)}</li><li>${esc(P.feeLabel)}</li><li>गोमती नगर, लखनऊ</li></ul>
<div class="actions"><a class="btn btn-gold" href="${wa(`नमस्ते, मुझे CINEKAR ${t.name} कोर्स में एडमिशन की जानकारी चाहिए।`)}">WhatsApp पर एडमिशन</a><a class="btn btn-ghost" href="#syllabus">सिलेबस देखें</a></div>
</div>
<section class="sec"><div class="wrap split">
  <div>
    <h2 class="h2">यह कोर्स किसके लिए है</h2>
    <ul class="ticks big">${t.forWhom.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  </div>
  <div class="outcome">
    <h2 class="h2">कोर्स के बाद आपके पास</h2>
    <ul class="ticks big">${t.outcome.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  </div>
</div></section>
<section class="sec sec-alt" id="syllabus"><div class="wrap">
  <h2 class="h2">90 दिन का सिलेबस</h2>
  ${monthsHtml(t)}
</div></section>
<section class="sec band"><div class="wrap">${ladderHtml()}</div></section>
<section class="sec"><div class="wrap split">
  <div>
    <h2 class="h2">फ़ीस और एडमिशन</h2>
    <ol class="steps">${P.admission.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ol>
    <p class="muted">दूसरे ट्रैक: ${others.map((o) => `<a href="/cinekar/${o.slug}/">${esc(o.seo)}</a>`).join(' · ')}</p>
  </div>
  ${feeCard()}
</div></section>
</main>`;
  return layout({
    title: t.title,
    description: t.description,
    pathName: `/cinekar/${t.slug}/`,
    ld: [courseLd(t), crumbsLd([['होम', '/'], ['CINEKAR कोर्स', '/cinekar/'], [t.name, `/cinekar/${t.slug}/`]])],
    body,
  });
}

function aboutPage() {
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['हमारे बारे में', '/about/']])}
<h1 class="page-h1">Indian Films Academy, लखनऊ</h1>
<p class="lede">सिनेमा की पढ़ाई, सिनेमा के बीच। ${site.since} से।</p>
<ul class="stats">${site.stats.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('')}</ul>
</div>
<section class="sec"><div class="wrap split">
  <div class="prose">${site.about.map((p) => `<p>${esc(p)}</p>`).join('\n')}<p lang="en" class="muted">${esc(site.aboutEn)}</p></div>
  ${img('founders', 640, 'Indian Films Academy के संस्थापक', { widths: [640, 1000], sizes: '(min-width: 64rem) 460px, 92vw', cls: 'rounded', width: 640, height: 640 })}
</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2 class="h2">संस्थापक</h2>
  ${founderCards()}
</div></section>
<section class="sec"><div class="wrap">
  <h2 class="h2">Actors Transformation System (YM-ATS)</h2>
  <div class="prose">
    <p>योगेश मिश्रा का बनाया यह सिस्टम एक्टर को अंदर से तैयार करता है। इसके चार स्तंभ हैं: Believing, Respect, Seriousness और Enjoying। Observation System (Micro, Nano, Combination और Live Observation) और Emotional Flow Engine (इमोशन बदलना और इमोशन का प्रतिशत) इसके मुख्य हिस्से हैं।</p>
    <p>साथ में नाट्यशास्त्र और नवरस जैसी भारतीय जड़ें, और Stanislavski, Stella Adler और Meisner जैसी दुनिया की तकनीकें भी सिखाई जाती हैं। <a href="https://ymatsystem.com/">YM-ATS के बारे में और पढ़ें</a></p>
  </div>
</div></section>
<section class="sec sec-alt"><div class="wrap">
  <h2 class="h2">एकेडमी में आए मार्गदर्शक</h2>
  <p class="lede">इंडस्ट्री के कलाकार, निर्देशक और कास्टिंग एक्सपर्ट अपने व्यस्त समय में से छात्रों के लिए वक़्त निकालते हैं। वे सिर्फ़ काम की बातें नहीं सिखाते, अपने संघर्ष और सफ़र की असली कहानी भी बताते हैं।</p>
  ${galleryGrid(visitors, 8)}
  <p class="more-link"><a href="/gallery/">सारी तस्वीरें देखें</a></p>
</div></section>
${viewer}
</main>`;
  return layout({
    title: 'हमारे बारे में | Indian Films Academy, लखनऊ (2019 से) | योगेश मिश्रा और दिनेश कुमार सहगल',
    description: 'Indian Films Academy, गोमती नगर लखनऊ: 2019 से कैमरा एक्टिंग की ट्रेनिंग, 100+ प्रशिक्षित छात्र, योगेश मिश्रा का Actors Transformation System और को-फ़ाउंडर दिनेश कुमार सहगल।',
    pathName: '/about/',
    image: abs('/img/founders-1000.webp'),
    ld: [orgLd(), crumbsLd([['होम', '/'], ['हमारे बारे में', '/about/']])],
    body,
  });
}

function galleryPage() {
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['गैलरी', '/gallery/']])}
<h1 class="page-h1">गैलरी: दिग्गजों के साथ और एकेडमी में</h1>
<p class="lede">किसी भी तस्वीर पर दबाकर उसे बड़ा देखिए।</p>
<h2 class="h2">सिनेमा के दिग्गजों के साथ</h2>
${galleryGrid(legends)}
<h2 class="h2 gap-top">एकेडमी में आए मार्गदर्शक और मेहमान</h2>
${galleryGrid(visitors)}
<h2 class="h2 gap-top">एकेडमी और मंच</h2>
<ul class="gallery">${['group-2', 'campus-1', 'campus-2', 'campus-3', 'stage-1', 'stage-2']
    .map((n) => `<li><a class="js-view" href="/img/${n}-800.webp" data-cap="Indian Films Academy"><img src="/img/${n}-800.webp" alt="Indian Films Academy, लखनऊ" loading="lazy" decoding="async" width="480" height="360"></a></li>`)
    .join('')}</ul>
</div>
${viewer}
</main>`;
  return layout({
    title: 'गैलरी | Indian Films Academy, लखनऊ: फ़िल्म इंडस्ट्री के दिग्गजों के साथ',
    description: 'Indian Films Academy, लखनऊ की गैलरी: अमिताभ बच्चन, नाना पाटेकर, अनुपम खेर, संजय दत्त जैसे दिग्गजों के साथ और एकेडमी में आए मार्गदर्शकों की तस्वीरें।',
    pathName: '/gallery/',
    ld: [crumbsLd([['होम', '/'], ['गैलरी', '/gallery/']])],
    body,
  });
}

function videosPage() {
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['वीडियो', '/videos/']])}
<div class="sec-head"><div><h1 class="page-h1">एक्टिंग क्लास के वीडियो</h1><p class="lede">Indian Films Academy के YouTube चैनल से, नए वीडियो अपने-आप यहाँ आते हैं।</p></div><a class="btn btn-gold btn-sm" href="${esc(site.youtubeUrl)}?sub_confirmation=1">YouTube पर सब्सक्राइब करें</a></div>
<ul class="vgrid">${longVideos.map(videoCard).join('\n')}</ul>
</div>
</main>`;
  return layout({
    title: 'एक्टिंग क्लास वीडियो (Free Acting Class in Hindi) | Indian Films Academy, लखनऊ',
    description: 'Indian Films Academy के YouTube चैनल की एक्टिंग क्लास: कैमरा एक्टिंग, Observation, Feel and React, YM-ATS। हिंदी में मुफ़्त वीडियो।',
    pathName: '/videos/',
    ld: [crumbsLd([['होम', '/'], ['वीडियो', '/videos/']])],
    body,
  });
}

function onlinePage() {
  const cta = site.graphyUrl
    ? `<a class="btn btn-gold" href="${esc(site.graphyUrl)}">ऑनलाइन कोर्स खरीदें</a>`
    : `<a class="btn btn-gold" href="${wa('नमस्ते, मुझे Indian Films Academy के ऑनलाइन एक्टिंग कोर्स की जानकारी चाहिए।')}">WhatsApp पर पूछें</a>`;
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['ऑनलाइन कोर्स', '/online/']])}
<p class="eyebrow">घर बैठे, अपनी रफ़्तार से</p>
<h1 class="page-h1">ऑनलाइन एक्टिंग कोर्स (हिंदी में)</h1>
<p class="lede">जो लखनऊ नहीं आ सकते, उनके लिए योगेश मिश्रा का वीडियो कोर्स। फ़ोन या लैपटॉप पर, कभी भी।</p>
<div class="actions">${cta}<a class="btn btn-ghost" href="/videos/">पहले मुफ़्त क्लास देखें</a></div>
</div>
<section class="sec"><div class="wrap split">
  <div>
    <h2 class="h2">इसमें क्या सीखेंगे</h2>
    <ul class="ticks big">
      <li>कैमरा एक्टिंग की बुनियाद: कैमरा लुक, एक्सप्रेशन और डायलॉग</li>
      <li>Actors Transformation System (YM-ATS) के मूल सिद्धांत</li>
      <li>Observation और Feel and React अभ्यास</li>
      <li>आवाज़, उच्चारण और बॉडी लैंग्वेज</li>
      <li>घर से ऑडिशन और सेल्फ़-टेप बनाना</li>
    </ul>
  </div>
  <div class="outcome">
    <h2 class="h2">किसके लिए</h2>
    <ul class="ticks big"><li>लखनऊ से बाहर रहने वाले</li><li>नौकरी या पढ़ाई के साथ सीखने वाले</li><li>CINEKAR से पहले शुरुआत करना चाहने वाले</li></ul>
    <p class="muted">प्रैक्टिकल शूट, लाइव प्रोजेक्ट और इंटर्नशिप सिर्फ़ CINEKAR (क्लासरूम) कोर्स में हैं।</p>
  </div>
</div></section>
</main>`;
  return layout({
    title: 'ऑनलाइन एक्टिंग कोर्स हिंदी में | Online Acting Course by Yogesh Mishrra | Indian Films Academy',
    description: 'घर बैठे हिंदी में एक्टिंग सीखिए: योगेश मिश्रा का ऑनलाइन कैमरा एक्टिंग कोर्स, YM-ATS, Observation, ऑडिशन और सेल्फ़-टेप।',
    pathName: '/online/',
    ld: [crumbsLd([['होम', '/'], ['ऑनलाइन कोर्स', '/online/']])],
    body,
  });
}

function contactPage() {
  const body = `<main id="main" class="page">
<div class="wrap">
${crumbs([['होम', '/'], ['संपर्क', '/contact/']])}
<h1 class="page-h1">संपर्क और एडमिशन</h1>
<p class="lede">सबसे जल्दी जवाब WhatsApp पर मिलता है। एकेडमी आना हो तो पहले फ़ोन कर लीजिए।</p>
${contactBlock()}
<div class="map"><iframe title="Indian Films Academy का नक्शा" src="https://www.google.com/maps?q=${encodeURIComponent('Indian Films Academy, ' + addressEn)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div>
</main>`;
  return layout({
    title: 'संपर्क | Indian Films Academy, गोमती नगर, लखनऊ | 77540 00121',
    description: `Indian Films Academy का पता: ${addressEn}। फ़ोन/WhatsApp ${site.phoneLabel}, ईमेल ${site.email}।`,
    pathName: '/contact/',
    ld: [orgLd(), crumbsLd([['होम', '/'], ['संपर्क', '/contact/']])],
    body,
  });
}

function privacyPage() {
  const body = `<main id="main" class="page"><div class="wrap prose">
${crumbs([['होम', '/'], ['प्राइवेसी', '/privacy/']])}
<h1 class="page-h1">प्राइवेसी नीति</h1>
<p>indianfilmsacademy.com पर हम कोई निजी जानकारी जमा नहीं करते। एडमिशन फ़ॉर्म में भरी जानकारी सीधे आपके फ़ोन से WhatsApp पर भेजी जाती है; यह वेबसाइट उसे कहीं सेव नहीं करती।</p>
<p>साइट पर कितने लोग आए, यह समझने के लिए हम Cloudflare Web Analytics इस्तेमाल कर सकते हैं, जो कुकी नहीं लगाता और किसी व्यक्ति को नहीं पहचानता।</p>
<p>वीडियो YouTube के प्लेयर में चलते हैं और Google अपनी नीति के अनुसार कुकी इस्तेमाल कर सकता है। नक्शा Google Maps से आता है।</p>
<p>किसी भी सवाल के लिए लिखें: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
</div></main>`;
  return layout({ title: 'प्राइवेसी नीति | Indian Films Academy', description: 'indianfilmsacademy.com की प्राइवेसी नीति।', pathName: '/privacy/', body });
}

function notFoundPage() {
  return layout({
    title: 'यह पन्ना नहीं मिला | Indian Films Academy',
    description: 'यह पन्ना नहीं मिला।',
    pathName: '/404',
    noindex: true,
    body: `<main id="main" class="page"><div class="wrap lost"><img src="/img/logo-emblem-192.webp" alt="" width="120" height="120"><h1 class="page-h1">यह पन्ना यहाँ नहीं है</h1><p>हमने वेबसाइट नई बनाई है, इसलिए पुराना लिंक बदल गया होगा।</p><p class="actions"><a class="btn btn-gold" href="/cinekar/">CINEKAR कोर्स</a><a class="btn btn-ghost" href="/">होम पेज</a></p></div></main>`,
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
await cp(path.join(root, 'public'), out, { recursive: true });
await writeFile(path.join(out, 'index.html'), homePage());
await page('cinekar', cinekarPage());
for (const t of P.tracks) await page(`cinekar/${t.slug}`, trackPage(t));
await page('about', aboutPage());
await page('gallery', galleryPage());
await page('videos', videosPage());
await page('online', onlinePage());
await page('contact', contactPage());
await page('privacy', privacyPage());
await writeFile(path.join(out, '404.html'), notFoundPage());

const urls = ['/', '/cinekar/', ...P.tracks.map((t) => `/cinekar/${t.slug}/`), '/about/', '/online/', '/gallery/', '/videos/', '/contact/', '/privacy/'];
await writeFile(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${abs(u)}</loc></url>`).join('\n')}\n</urlset>\n`,
);
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
const files = await readdir(out, { recursive: true });
console.log(`ifa/dist तैयार: ${urls.length} पेज, ${longVideos.length} वीडियो, ${gallery.length} गैलरी फ़ोटो, ${igPosts.length} Instagram पोस्ट, ${files.length} फ़ाइलें`);
