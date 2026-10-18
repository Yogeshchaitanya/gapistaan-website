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
  ep.custom = await customText(ep.id);
  ep.summary = summary(ep, [...ep.custom, ...ep.paragraphs]);
}

// People: the creator plays Chacha in every episode; the rest are matched by name in the episode credits.
const creator = { ...site.creator, path: '/creator/' };
const cast = (site.cast || []).map((c) => ({ ...c, path: `/cast/${c.slug}/` }));
for (const c of cast) {
  const full = c.nameEn.toLowerCase();
  c.episodes = newestFirst.filter((ep) => (ep.description || '').toLowerCase().includes(full));
}
creator.episodes = newestFirst;
const initials = (p) => [...p.name][0];

const epLabel = (n) => `EP ${String(n).padStart(2, '0')}`;

// WhatsApp: YouTube link first, so the chat shows the YouTube preview and a tap opens the YouTube app.
const shareMessage = (ep) =>
  `${ep.clean}\n\nगैपिस्तान पर देखिए: https://youtu.be/${ep.id}` + (siteUrl ? `\nसारे एपिसोड: ${siteUrl}` : '');
const waLink = (ep) => `https://wa.me/?text=${encodeURIComponent(shareMessage(ep))}`;

// ---------- structured data shared across pages ----------
const production = { '@type': 'Organization', name: site.presents || site.production, url: site.presentsUrl || undefined };
const personLd = (p, extra = {}) => ({
  '@type': 'Person',
  name: p.nameEn,
  alternateName: [p.name, ...(p.aka || [])],
  ...(siteUrl ? { url: abs(p.path) } : {}),
  ...extra,
});
const seriesLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'TVSeries',
  name: 'Gen Gap',
  alternateName: ['Gapistaan', 'गैपिस्तान', 'जेन गैप'],
  ...(siteUrl ? { url: abs('/') } : {}),
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
    ? [{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })) }]
    : [];

// ---------- layout ----------
const NAV = [
  ['/episodes/', 'एपिसोड'],
  ['/cast/', 'कलाकार'],
  ['/creator/', 'क्रिएटर'],
  ['/about/', 'बारे में'],
  ['/#contact', 'संपर्क'],
];

// FAQ answers may use {schedule}, {email}, {phone} so they never drift from the rest of the site.
const fillTokens = (s) => {
  const b = site.business || {};
  return s
    .replace(/\{schedule\}/g, site.schedule || '')
    .replace(/\{email\}/g, site.contactEmail || b.email || '')
    .replace(/\{phone\}/g, b.phoneLabel || b.phone || '');
};
const faq = (site.faq || []).map(([q, a]) => [q, fillTokens(a)]);

function layout({ title, description, pathName, image, type = 'website', ld = [], body, preloadImage, noindex = false }) {
  const url = abs(pathName);
  image = image || (siteUrl ? abs('/img/og-home.jpg') : null);
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === pathName ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const b = site.business || {};
  return `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${url ? `<link rel="canonical" href="${esc(url)}">` : ''}
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
    <a class="brand" href="/"><img src="/img/logo-96.webp" alt="" width="40" height="40"><span class="brand-name">Gapistaan</span></a>
    <nav class="topnav" aria-label="मुख्य मेन्यू">${nav}</nav>
    <a class="btn btn-primary btn-sm" href="${esc(site.subscribeUrl)}">सब्सक्राइब करें</a>
  </div>
</header>
${body}
<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <div class="foot-brand"><img src="/img/logo-96.webp" alt="" width="44" height="44" loading="lazy"><span>Gapistaan</span></div>
      <p>Gen Gap हिंदी कॉमेडी सीरीज़ का घर।</p>
      <p>${esc(site.presents)} की पेशकश, ${esc(b.city || 'लखनऊ')}</p>
    </div>
    <div>
      <h2>साइट</h2>
      <ul>
        <li><a href="/episodes/">सारे एपिसोड</a></li>
        <li><a href="/cast/">कलाकार</a></li>
        <li><a href="/creator/">क्रिएटर: ${esc(creator.name)}</a></li>
        <li><a href="/about/">गैपिस्तान के बारे में</a></li>
        <li><a href="/privacy/">प्राइवेसी</a></li>
      </ul>
    </div>
    <div>
      <h2>हमें फ़ॉलो करें</h2>
      <ul>
        <li><a href="${esc(site.channelUrl)}">YouTube: @gapistaan</a></li>
        <li><a href="${esc(site.instagramUrl)}">Instagram: @gapistaan</a></li>
        ${(site.brands || []).map((x) => `<li><a href="${esc(x.url || x.youtube)}">${esc(x.name)}</a></li>`).join('\n        ')}
      </ul>
    </div>
    ${b.email || b.phone ? `<div>
      <h2>बिज़नेस और कोलैब</h2>
      <ul>
        ${site.contactEmail ? `<li><a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a></li>` : ''}
        ${b.email ? `<li><a href="mailto:${esc(b.email)}">${esc(b.email)}</a></li>` : ''}
        ${b.phone ? `<li><a href="tel:${esc(b.phone)}">${esc(b.phoneLabel || b.phone)}</a></li>` : ''}
      </ul>
    </div>` : ''}
  </div>
  <div class="wrap foot-bottom">
    <span>© ${new Date().getFullYear()} ${esc(site.production)}. सर्वाधिकार सुरक्षित।</span>
    <span>Gapistaan is a part of ${esc(site.production)}.</span>
  </div>
</footer>
${PAGE_JS}
${site.cfAnalyticsToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${esc(site.cfAnalyticsToken)}"}'></script>` : ''}
</body>
</html>
`;
}

function shareButtons(ep, { stage = false } = {}) {
  const id = (k) => (stage ? ` id="stage-${k}"` : '');
  return `<div class="actions">
        <a class="btn btn-primary"${id('yt')} href="https://www.youtube.com/watch?v=${ep.id}">YouTube पर देखें</a>
        <a class="btn btn-wa"${id('wa')} href="${waLink(ep)}">WhatsApp पर भेजें</a>
        <button class="btn btn-ghost js-share"${id('share')} type="button" hidden data-title="${esc(ep.clean)}" data-text="${esc(shareMessage(ep))}">और जगह शेयर करें</button>
      </div>`;
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
})();
</script>`;

function card(ep, { pick = null } = {}) {
  const pickAttr = pick === null ? '' : ` js-pick" data-i="${pick}`;
  return `<li><a class="ep${pickAttr}" href="${ep.path}">
  <span class="thumb"><img src="${esc(thumb(ep, 'standard'))}" srcset="${esc(srcset(ep))}" sizes="(min-width: 72rem) 19rem, (min-width: 40rem) 45vw, 80vw" alt="" width="640" height="360" loading="lazy" decoding="async"><span class="dur">${clock(ep.sec)}</span></span>
  <span class="ep-meta"><span class="chip">${epLabel(ep.n)}</span>${pick === null ? '' : '<span class="now">अभी चल रहा है</span>'}</span>
  <span class="ep-title">${esc(ep.clean)}</span>
  <span class="date">${hiDate(ep.publishedAt)}</span>
</a></li>`;
}

function personCard(p, { lead = false } = {}) {
  const pic = p.photo
    ? `<img src="${esc(p.photo)}" alt="" width="84" height="84" loading="lazy">`
    : p.slug === creator.slug
      ? '<img src="/img/logo-160.webp" alt="" width="84" height="84" loading="lazy">'
      : esc(initials(p));
  return `<li><a class="person${lead ? ' lead' : ''}" href="${p.path}">
  <span class="avatar">${pic}</span>
  <span><span class="person-name">${esc(p.name)}</span><span class="person-en" lang="en">${esc(p.nameEn)}</span><span class="person-role">${esc(p.role)}</span></span>
</a></li>`;
}

const peopleList = () => `<ul class="people">
${personCard(creator, { lead: true })}
${cast.map((c) => personCard(c)).join('\n')}
</ul>`;

// ---------- home ----------
function homePage() {
  const latest = newestFirst[0];
  const b = site.business || {};

  const stage = latest
    ? `<div class="stage" id="stage">
        <div class="stage-frame">
          <div class="bulbs" aria-hidden="true"></div>
          <span class="badge" id="stage-badge">NEW EPISODE</span>
          <div id="stage-media"><a class="js-play play" href="${latest.path}" data-id="${latest.id}" data-title="${esc(latest.clean)}" aria-label="एपिसोड यहीं चलाएँ: ${esc(latest.clean)}">
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
        <h2 class="h2" id="eps-h">सारे एपिसोड</h2>
        <p class="lede">अब तक ${newestFirst.length} एपिसोड। किसी पर भी दबाइए, वो ऊपर बड़े प्लेयर में चलेगा।</p>
      </div>
      <div class="reel-nav"><button class="reel-btn" type="button" data-dir="-1" aria-label="पिछले एपिसोड दिखाओ">‹</button><button class="reel-btn" type="button" data-dir="1" aria-label="आगे के एपिसोड दिखाओ">›</button></div>
    </div>
    <ul class="reel" id="reel">
${newestFirst.map((ep, i) => card(ep, { pick: i })).join('\n')}
    </ul>
    <p class="more-link"><a href="/episodes/">सारे एपिसोड एक साथ देखें</a></p>
  </div>
</section>
<script id="ep-data" type="application/json">${JSON.stringify(
      newestFirst.map((ep) => ({ id: ep.id, ep: epLabel(ep.n), title: ep.clean, path: ep.path, date: `${hiDate(ep.publishedAt)}, ${minutes(ep.sec)}`, wa: waLink(ep), share: shareMessage(ep) })),
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
      <span class="board-kaam">${esc(x.label)}</span>
      <span class="board-links">${x.url ? `<a href="${esc(x.url)}">वेबसाइट</a>` : ''}${x.youtube ? `<a href="${esc(x.youtube)}">YouTube</a>` : ''}</span>
    </li>`)
    .join('\n');

  const faqHtml = faq.length
    ? `<section class="sec sec-alt" id="faq" aria-labelledby="faq-h">
  <div class="wrap">
    <h2 class="h2" id="faq-h">गैपिस्तान से जुड़े सवाल</h2>
    <div class="faq">
${faq.map(([q, a], i) => `      <details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
    </div>
    <p class="more-link"><a href="/about/">गैपिस्तान कैसे बनता है, पूरी कहानी पढ़ें</a></p>
  </div>
</section>`
    : '';

  const email = site.contactEmail || b.email;
  const contactHtml = `<section class="sec" id="contact" aria-labelledby="contact-h">
  <div class="wrap">
    <div class="contact">
      <div>
        <h2 class="h2" id="contact-h">ब्रांड कोलैब और बिज़नेस</h2>
        <p>स्पॉन्सरशिप, ब्रांड इंटीग्रेशन, प्रमोशन या किसी नए प्रोजेक्ट के लिए सीधे बात कीजिए। गैपिस्तान ${esc(site.presents)} की पेशकश है।</p>
      </div>
      <div class="actions">
        ${email ? `<a class="btn btn-primary" href="mailto:${esc(email)}?subject=${encodeURIComponent('Gapistaan collaboration')}">ईमेल भेजें</a>` : ''}
        ${b.phone ? `<a class="btn btn-ghost" href="tel:${esc(b.phone)}">कॉल करें</a>` : ''}
        <a class="btn btn-ghost" href="${esc(site.instagramUrl)}">Instagram पर मैसेज</a>
      </div>
    </div>
  </div>
</section>`;

  const body = `<main id="main">
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-text">
      <span class="logo-stage"><span class="coin">
        <img class="hero-logo" src="/img/logo-340.webp" srcset="/img/logo-160.webp 160w, /img/logo-340.webp 340w, /img/logo-520.webp 520w" sizes="190px" alt="Gapistaan का लोगो: चाचा" width="190" height="190" fetchpriority="high">
        <img class="hero-logo coin-back" src="/img/logo-340.webp" srcset="/img/logo-160.webp 160w, /img/logo-340.webp 340w, /img/logo-520.webp 520w" sizes="190px" alt="" aria-hidden="true" width="190" height="190">
      </span></span>
      <p class="presents"><a href="${esc(site.presentsUrl)}">${esc(site.presents)}</a> प्रस्तुत करता है</p>
      <h1 class="hero-name"><span class="latin">Gapistaan</span><span class="hi">गैपिस्तान</span></h1>
      <p class="hero-line">${esc(site.heroLine)}</p>
      <p class="hero-sub">${esc(site.heroSub)}</p>
      <p class="schedule">${esc(site.schedule)}</p>
      <div class="actions">
        <a class="btn btn-ghost" href="${esc(site.subscribeUrl)}">YouTube पर सब्सक्राइब करें</a>
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
      <h2 class="h2" id="about-h">गैपिस्तान क्या है?</h2>
      ${site.about.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      ${site.aboutEn ? `<p class="about-en" lang="en">${esc(site.aboutEn)}</p>` : ''}
      <p class="prod-note"><strong>${esc(site.presents)}</strong> की पेशकश। परिकल्पना और निर्देशन: <a href="/creator/">${esc(creator.name)}</a></p>
    </div>
    <img class="chacha" src="/img/chacha-560.webp" srcset="/img/chacha-560.webp 560w, /img/chacha-1040.webp 1040w" sizes="(min-width: 58rem) 470px, 92vw" alt="चाचा, हाथ में चार्जर का प्लग और केबल लिए" width="470" height="470" loading="lazy">
  </div>
</section>
<section class="sec sec-alt" id="cast" aria-labelledby="cast-h">
  <div class="wrap">
    <h2 class="h2" id="cast-h">कलाकार और टीम</h2>
    <p class="lede">किसी भी नाम पर दबाइए और उनके बारे में पढ़िए।</p>
    ${peopleList()}
  </div>
</section>
${boards ? `<section class="sec" aria-labelledby="brands-h">
  <div class="wrap">
    <h2 class="h2" id="brands-h">${esc(site.presents)} परिवार</h2>
    <p class="lede">गैपिस्तान ${esc(site.presents)} का हिस्सा है। हमारे दूसरे चैनल और संस्थान:</p>
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
        { '@context': 'https://schema.org', '@type': 'WebSite', name: site.siteName, alternateName: ['Gapistaan', 'Gapistan', 'गैपिस्तान', 'Gen Gap'], url: abs('/'), inLanguage: 'hi' },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Gapistaan',
          alternateName: 'गैपिस्तान',
          url: abs('/'),
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
  const inThis = cast.filter((c) => c.episodes.includes(ep));

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

  const castHtml = `<section class="block" aria-labelledby="ec-h"><h2 class="h2" id="ec-h">इस एपिसोड में</h2><ul class="people">
${personCard(creator)}
${inThis.map((c) => personCard(c)).join('\n')}
</ul></section>`;

  const descHtml = ep.paragraphs.length
    ? `<section class="block prose" aria-labelledby="desc-h"><h2 class="h2" id="desc-h">एपिसोड के बारे में</h2>${renderParagraphs(ep.paragraphs)}</section>`
    : '';

  const prevNext = prev || next
    ? `<nav class="prevnext" aria-label="पिछला और अगला एपिसोड">
  ${prev ? `<a class="pn" href="${prev.path}"><span class="pn-k">पिछला एपिसोड</span><span class="pn-t">${esc(prev.clean)}</span></a>` : ''}
  ${next ? `<a class="pn pn-next" href="${next.path}"><span class="pn-k">अगला एपिसोड</span><span class="pn-t">${esc(next.clean)}</span></a>` : ''}
</nav>`
    : '';

  const body = `<main id="main" class="wrap page">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / <a href="/episodes/">एपिसोड</a> / ${epLabel(ep.n)}</nav>
<h1 class="page-h1">${esc(ep.clean)}</h1>
<p class="meta"><span class="chip">${epLabel(ep.n)}</span><span>${hiDate(ep.publishedAt)}</span><span>${minutes(ep.sec)}</span></p>
<div class="player"><iframe id="player" src="${embed}" data-src="${embed}" title="${esc(ep.clean)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
${shareButtons(ep)}
${customHtml}
${chaptersHtml}
${castHtml}
${descHtml}
${prevNext}
${more.length ? `<section class="block" aria-labelledby="more-h"><h2 class="h2" id="more-h">और एपिसोड</h2><ul class="grid">${more.map((e) => card(e)).join('\n')}</ul></section>` : ''}
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
  const ld = [video];
  if (siteUrl) {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'गैपिस्तान', item: abs('/') },
        { '@type': 'ListItem', position: 2, name: 'एपिसोड', item: abs('/episodes/') },
        { '@type': 'ListItem', position: 3, name: ep.clean, item: pageUrl },
      ],
    });
  }

  return layout({
    title: `${ep.clean} | Gen Gap ${epLabel(ep.n)} | गैपिस्तान`,
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
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / सारे एपिसोड</nav>
<h1 class="page-h1">Gen Gap: गैपिस्तान के सारे एपिसोड</h1>
<p class="lede">अब तक ${newestFirst.length} एपिसोड, सबसे नया सबसे पहले।</p>
<ul class="grid">
${newestFirst.map((ep) => card(ep)).join('\n')}
</ul>
</main>`;
  return layout({
    title: `सारे एपिसोड | Gen Gap हिंदी कॉमेडी | Gapistaan गैपिस्तान`,
    description: `Gen Gap के सारे ${newestFirst.length} एपिसोड एक जगह: चाचा बनाम Gen Z की improvised हिंदी कॉमेडी, ${site.presents} की पेशकश।`,
    pathName: '/episodes/',
    image: siteUrl ? abs('/img/og-home.jpg') : null,
    ld: siteUrl
      ? [
          { ...seriesLd(), episode: newestFirst.map((ep) => ({ '@type': 'TVEpisode', name: ep.clean, episodeNumber: ep.n, url: abs(ep.path), datePublished: ep.publishedAt })) },
          ...crumbsLd([['गैपिस्तान', '/'], ['सारे एपिसोड', '/episodes/']]),
        ]
      : [],
    body,
  });
}

// ---------- people ----------
function episodeMiniList(list) {
  return list.length ? `<ul class="grid">${list.slice(0, 6).map((e) => card(e)).join('\n')}</ul>${list.length > 6 ? '<p class="more-link"><a href="/episodes/">सारे एपिसोड देखें</a></p>' : ''}` : '<p class="muted">एपिसोड की जानकारी जल्द जोड़ी जाएगी।</p>';
}

function creatorPage() {
  const p = creator;
  const pic = p.photo
    ? `<img class="profile-pic" src="${esc(p.photo)}" alt="${esc(p.name)}" width="260" height="260">`
    : `<img class="profile-pic" src="/img/chacha-560.webp" alt="${esc(p.name)}, चाचा के रूप में (इलस्ट्रेशन)" width="260" height="260">`;
  const body = `<main id="main" class="wrap page">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / क्रिएटर</nav>
<div class="profile">
  ${pic}
  <div>
    <h1 class="page-h1">${esc(p.name)}</h1>
    <p class="aka">${esc(p.nameEn)}. फ़िल्मों में: ${esc((p.aka || [])[0] || '')}</p>
    <p class="role-line">${esc(p.role)}</p>
    <div class="link-row">${(p.links || []).map(([l, u]) => `<a class="btn btn-ghost btn-sm" href="${esc(u)}">${esc(l)}</a>`).join('')}</div>
  </div>
</div>
<section class="prose" aria-label="परिचय">${renderParagraphs(p.bio || [])}</section>
<section class="block" aria-labelledby="facts-h">
  <h2 class="h2" id="facts-h">एक नज़र में</h2>
  <dl class="facts">${(p.facts || []).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
</section>
<section class="block" aria-labelledby="pe-h"><h2 class="h2" id="pe-h">गैपिस्तान के ताज़ा एपिसोड</h2>${episodeMiniList(p.episodes)}</section>
<section class="block" aria-labelledby="team-h"><h2 class="h2" id="team-h">गैपिस्तान की टीम</h2><ul class="people">${cast.map((c) => personCard(c)).join('\n')}</ul></section>
</main>`;
  return layout({
    title: `${p.name} (${p.nameEn}, ${(p.aka || [])[0] || ''}) | Gapistaan के क्रिएटर और डायरेक्टर`,
    description: `${p.name} उर्फ़ ${(p.aka || [])[0] || ''}: गैपिस्तान (Gen Gap) के क्रिएटर, डायरेक्टर और चाचा। दबंग सरकार और विद्यापीठ के निर्देशक, Indian Films Academy और PICHCHRAPA के संस्थापक।`,
    pathName: p.path,
    image: siteUrl ? abs('/img/chacha-1040.webp') : null,
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
          image: siteUrl ? abs('/img/chacha-1040.webp') : undefined,
        }),
      },
      ...crumbsLd([['गैपिस्तान', '/'], ['क्रिएटर', '/creator/']]),
    ],
    body,
  });
}

function castIndexPage() {
  const body = `<main id="main" class="wrap page">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / कलाकार</nav>
<h1 class="page-h1">गैपिस्तान के कलाकार और टीम</h1>
<p class="lede">Gen Gap के सारे कलाकार Indian Films Academy, लखनऊ से तैयार हुए हैं। हर एपिसोड improvised होता है, यानी हर डायलॉग इन्हीं का।</p>
${peopleList()}
</main>`;
  return layout({
    title: 'कलाकार और टीम | Gen Gap हिंदी कॉमेडी | Gapistaan गैपिस्तान',
    description: `गैपिस्तान (Gen Gap) के कलाकार: ${[creator, ...cast].map((c) => c.name).join(', ')}।`,
    pathName: '/cast/',
    image: siteUrl ? abs('/img/og-home.jpg') : null,
    ld: crumbsLd([['गैपिस्तान', '/'], ['कलाकार', '/cast/']]),
    body,
  });
}

function castPage(c) {
  const pic = c.photo ? `<img class="profile-pic" src="${esc(c.photo)}" alt="${esc(c.name)}" width="260" height="260">` : `<div class="profile-initials" aria-hidden="true">${esc(initials(c))}</div>`;
  const bio = c.bio?.length
    ? c.bio
    : [`${c.name} गैपिस्तान की हिंदी कॉमेडी सीरीज़ Gen Gap के कलाकार हैं, जहाँ हर सीन बिना स्क्रिप्ट के, improvisation से बनता है। वे लखनऊ के Indian Films Academy से प्रशिक्षित हैं।`];
  const body = `<main id="main" class="wrap page">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / <a href="/cast/">कलाकार</a> / ${esc(c.name)}</nav>
<div class="profile">
  ${pic}
  <div>
    <h1 class="page-h1">${esc(c.name)}</h1>
    <p class="aka" lang="en">${esc(c.nameEn)}</p>
    <p class="role-line">${esc(c.role)}, Gen Gap</p>
    ${c.instagram ? `<div class="link-row"><a class="btn btn-ghost btn-sm" href="${esc(c.instagram)}">Instagram</a></div>` : ''}
  </div>
</div>
<section class="prose">${renderParagraphs(bio)}</section>
<section class="block" aria-labelledby="ce-h"><h2 class="h2" id="ce-h">${esc(c.name)} के एपिसोड</h2>${episodeMiniList(c.episodes)}</section>
<section class="block" aria-labelledby="ot-h"><h2 class="h2" id="ot-h">बाकी टीम</h2><ul class="people">${personCard(creator)}${cast.filter((x) => x !== c).map((x) => personCard(x)).join('\n')}</ul></section>
</main>`;
  return layout({
    title: `${c.name} (${c.nameEn}) | Gen Gap कलाकार | Gapistaan गैपिस्तान`,
    description: `${c.name} (${c.nameEn}), गैपिस्तान की हिंदी कॉमेडी सीरीज़ Gen Gap के कलाकार। उनके सारे एपिसोड यहाँ देखें।`,
    pathName: c.path,
    image: c.photo || (siteUrl ? abs('/img/og-home.jpg') : null),
    type: 'profile',
    ld: [
      { '@context': 'https://schema.org', ...personLd(c, { jobTitle: 'Actor', ...(c.instagram ? { sameAs: [c.instagram] } : {}), ...(c.photo ? { image: c.photo } : {}) }) },
      ...crumbsLd([['गैपिस्तान', '/'], ['कलाकार', '/cast/'], [c.name, c.path]]),
    ],
    body,
  });
}

function aboutPage() {
  const body = `<main id="main" class="wrap page">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / बारे में</nav>
<h1 class="page-h1">गैपिस्तान और Gen Gap के बारे में</h1>
<p class="lede">${esc(site.heroLine)} ${esc(site.heroSub)}</p>
<section class="block prose" aria-labelledby="story-h">
  <h2 class="h2" id="story-h">कहानी क्या है</h2>
  ${site.about.map((p) => `<p>${esc(p)}</p>`).join('\n  ')}
  <p>एक तरफ़ चाचा हैं, जिनकी हर बात "हमारे टाइम में" से शुरू होती है। दूसरी तरफ़ Gen Z लड़के हैं, जिनके लिए YouTube, Instagram और ट्रेंड ही सब कुछ है। दोनों एक ही हॉस्टल, एक ही क्लास और एक ही कमरे में हैं, और यहीं से निकलती है गैपिस्तान की कॉमेडी।</p>
  ${site.aboutEn ? `<p lang="en">${esc(site.aboutEn)}</p>` : ''}
</section>
${site.making?.length ? `<section class="block prose" aria-labelledby="making-h">
  <h2 class="h2" id="making-h">गैपिस्तान कैसे बनता है</h2>
  ${site.making.map((p) => `<p>${esc(p)}</p>`).join('\n  ')}
</section>` : ''}
<section class="block prose" aria-labelledby="watch-h">
  <h2 class="h2" id="watch-h">कब और कहाँ देखें</h2>
  <p>${esc(site.schedule)}। हर एपिसोड YouTube चैनल <a href="${esc(site.channelUrl)}">@gapistaan</a> पर आता है और लगभग एक घंटे में इस वेबसाइट पर भी। छोटे क्लिप और पर्दे के पीछे की झलक Instagram पर <a href="${esc(site.instagramUrl)}">@gapistaan</a> पर मिलती है।</p>
  <h3 class="h3">अब तक के ${episodes.length} एपिसोड</h3>
  <ol class="ep-list">
${episodes.map((ep) => `    <li><a href="${ep.path}">${epLabel(ep.n)}: ${esc(ep.clean)}</a></li>`).join('\n')}
  </ol>
</section>
<section class="block" aria-labelledby="team-h"><h2 class="h2" id="team-h">गैपिस्तान की टीम</h2>${peopleList()}</section>
<section class="block prose" aria-labelledby="prod-h">
  <h2 class="h2" id="prod-h">${esc(site.presents)} की पेशकश</h2>
  <p>गैपिस्तान लखनऊ के प्रोडक्शन हाउस <a href="${esc(site.presentsUrl)}">${esc(site.presents)}</a> का हिस्सा है। इसके कलाकार <a href="https://indianfilmsacademy.com/">Indian Films Academy</a> से तैयार हुए हैं। परिकल्पना और निर्देशन: <a href="/creator/">${esc(creator.name)}</a>।</p>
</section>
</main>`;
  return layout({
    title: 'गैपिस्तान के बारे में: Gen Gap कैसे बनता है | Gapistaan गैपिस्तान',
    description: 'गैपिस्तान (Gapistaan) और Gen Gap की पूरी कहानी: बिना स्क्रिप्ट की improvised हिंदी कॉमेडी, 4-5 कैमरों से शूटिंग, Indian Films Academy के कलाकार और PICHCHRAPA की पेशकश।',
    pathName: '/about/',
    ld: [
      ...(siteUrl ? [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'गैपिस्तान के बारे में', url: abs('/about/'), inLanguage: 'hi', about: { '@type': 'TVSeries', name: 'Gen Gap', alternateName: ['Gapistaan', 'गैपिस्तान'], url: abs('/') } }] : []),
      ...crumbsLd([['गैपिस्तान', '/'], ['बारे में', '/about/']]),
    ],
    body,
  });
}

function privacyPage() {
  const b = site.business || {};
  const email = site.contactEmail || b.email;
  const body = `<main id="main" class="wrap page">
<nav class="crumbs" aria-label="आप यहाँ हैं"><a href="/">गैपिस्तान</a> / प्राइवेसी</nav>
<h1 class="page-h1">प्राइवेसी नीति</h1>
<section class="prose">
<p>gapistaan.com पर हम आपसे नाम, फ़ोन या ईमेल जैसी कोई निजी जानकारी नहीं माँगते और न ही जमा करते हैं।</p>
<p>साइट पर कितने लोग आए, यह समझने के लिए हम Cloudflare Web Analytics इस्तेमाल करते हैं। यह कुकी नहीं लगाता और किसी व्यक्ति को पहचानता नहीं, सिर्फ़ कुल गिनती दिखाता है।</p>
<p>एपिसोड YouTube के प्लेयर में चलते हैं। जब आप कोई वीडियो चलाते हैं, तो YouTube (Google) अपनी नीति के अनुसार कुकी इस्तेमाल कर सकता है।</p>
<p>WhatsApp या दूसरे ऐप पर शेयर करने के बटन सिर्फ़ उस ऐप को खोलते हैं; हमें कुछ नहीं भेजा जाता।</p>
${email ? `<p>किसी भी सवाल के लिए लिखें: <a href="mailto:${esc(email)}">${esc(email)}</a></p>` : ''}
<p class="muted">आख़िरी बदलाव: ${hiDate(new Date().toISOString())}</p>
</section>
</main>`;
  return layout({
    title: 'प्राइवेसी नीति | Gapistaan गैपिस्तान',
    description: 'gapistaan.com की प्राइवेसी नीति: हम कौन-सी जानकारी लेते हैं (कोई निजी जानकारी नहीं), analytics और YouTube प्लेयर के बारे में।',
    pathName: '/privacy/',
    ld: crumbsLd([['गैपिस्तान', '/'], ['प्राइवेसी', '/privacy/']]),
    body,
  });
}

function notFoundPage() {
  return layout({
    title: 'यह पन्ना नहीं मिला | गैपिस्तान',
    description: 'यह पन्ना गैपिस्तान की साइट पर नहीं है।',
    pathName: '/404',
    noindex: true,
    body: `<main id="main" class="wrap lost"><img src="/img/logo-520.webp" alt="" width="160" height="160"><h1 class="page-h1">यह पन्ना यहाँ नहीं है</h1><p>हो सकता है लिंक पुराना हो। सारे एपिसोड होम पेज पर हैं।</p><p><a class="btn btn-primary" href="/">होम पेज पर जाएँ</a></p></main>`,
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
for (const ep of episodes) await page(`video/${ep.id}`, episodePage(ep));
await page('episodes', episodesPage());
await page('creator', creatorPage());
await page('cast', castIndexPage());
for (const c of cast) await page(`cast/${c.slug}`, castPage(c));
await page('about', aboutPage());
await page('privacy', privacyPage());
await writeFile(path.join(out, '404.html'), notFoundPage());

if (siteUrl) {
  const latestDate = newestFirst[0]?.publishedAt;
  const urls = [
    { loc: abs('/'), lastmod: latestDate },
    { loc: abs('/episodes/'), lastmod: latestDate },
    { loc: abs('/creator/'), lastmod: latestDate },
    { loc: abs('/cast/'), lastmod: latestDate },
    { loc: abs('/about/'), lastmod: latestDate },
    ...cast.map((c) => ({ loc: abs(c.path), lastmod: c.episodes[0]?.publishedAt || latestDate })),
    ...episodes.map((ep) => ({ loc: abs(ep.path), lastmod: ep.publishedAt })),
    { loc: abs('/privacy/') },
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
console.log(`dist/ तैयार: ${episodes.length} एपिसोड, ${cast.length + 1} प्रोफ़ाइल, ${files.length} फ़ाइलें`);
