/* Yogesh CineAct flipbook — pichchrapa.com/book
   पन्ने पलटना: StPageFlip (MIT). बाक़ी सब (आवाज़, ज़ूम, लाइन-रीडर, विषय-सूची) यहाँ। */
(() => {
  'use strict';
  const B = document.body, $ = (s) => document.querySelector(s);
  const SLUG = B.dataset.slug, VER = B.dataset.ver, UI = B.dataset.ui === 'en' ? 'en' : 'hi';
  const T = {
    hi: { loading: 'किताब खुल रही है…', read: 'पढ़ें', toc: 'विषय-सूची', ok: 'समझ गया',
      rhint: 'किसी भी लाइन पर टैप करें · दो उँगली से ज़ूम', cover: 'कवर', back: 'पिछला कवर', page: 'पृष्ठ',
      hint1: 'पन्ना पलटने के लिए उँगली से खींचिए, या किनारे पर टैप कीजिए। नीचे 📕 बटन से किताब बंद, फिर खोल सकते हैं।',
      hint2: 'पन्ने पर टैप करें या दो उँगली से फैलाएँ: पढ़ने वाला ज़ूम खुलेगा, वहाँ किसी भी लाइन पर टैप करें, वो बड़ी होकर दिखेगी।',
      resume: (n) => `पिछली बार ${n} पर थे`, go: 'वहीं चलें', open: 'किताब खोलें', close: 'किताब बंद करें', endA: 'इंडियन फ़िल्म्स एकेडमी · लखनऊ', endB: 'PICHCHRAPA प्रस्तुति' },
    en: { loading: 'Opening the book…', read: 'Read', toc: 'Contents', ok: 'Got it',
      rhint: 'Tap any line · pinch to zoom', cover: 'Cover', back: 'Back cover', page: 'Page',
      hint1: 'Drag a page with your finger, or tap the edge, to turn it. The 📕 button below closes and reopens the book.',
      hint2: 'Tap a page or pinch it to open the reading zoom. There, tap any line to see it large.',
      resume: (n) => `You were on ${n}`, go: 'Continue', open: 'Open the book', close: 'Close the book', endA: 'Indian Films Academy · Lucknow', endB: 'A PICHCHRAPA presentation' },
  }[UI];
  document.querySelectorAll('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (typeof v === 'string') { if (el.matches('a,button.ic')) el.title = v; else el.textContent = v; } });

  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const KEY = 'ycbook:' + SLUG;
  const pad = (n) => String(n).padStart(4, '0');
  const pageSrc = (i) => `./pages/p${pad(i + 1)}.webp`;
  const zoomSrc = (i) => `./zoom/p${pad(i + 1)}.webp`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  let D = null, N = 0, AR = parseFloat(getComputedStyle(B).getPropertyValue('--aspect')) || 1.42;
  let pf = null, mode = '', pageW = 0, cur = 0;
  const stage = $('#stage'), wrap = $('#bookWrap'), spot = $('#spot');

  /* ---------- आवाज़ ---------- */
  let ac = null; const buf = {};
  let muted = store.get('ycbook:muted') === '1';
  B.classList.toggle('muted', muted);
  function audioInit() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    ac = new C();
    ['flip-1', 'flip-2', 'flip-3', 'book-open', 'book-close'].forEach((n) => fetch(`../assets/${n}.mp3`).then((r) => r.arrayBuffer())
      .then((a) => new Promise((ok, bad) => ac.decodeAudioData(a, ok, bad))).then((b) => { buf[n] = b; }).catch(() => {}));
  }
  let lastFlip = '';
  function play(n, delay = 0) {
    if (n === 'flip') { const c = ['flip-1', 'flip-2', 'flip-3'].filter((x) => x !== lastFlip); n = lastFlip = c[Math.floor(Math.random() * c.length)]; }
    if (navigator.vibrate && n !== 'book-close') try { navigator.vibrate(6); } catch (e) {}
    if (muted || !ac || !buf[n]) return;
    if (ac.state === 'suspended') ac.resume();
    const s = ac.createBufferSource(), g = ac.createGain();
    s.buffer = buf[n]; s.playbackRate.value = 0.98 + Math.random() * 0.04; g.gain.value = n === 'book-close' ? 1 : 0.85;
    s.connect(g); g.connect(ac.destination); s.start(ac.currentTime + delay);
  }
  ['pointerdown', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, audioInit, { once: false, passive: true, capture: true }));
  $('#bSound').onclick = () => { muted = !muted; B.classList.toggle('muted', muted); store.set('ycbook:muted', muted ? '1' : '0'); if (!muted) { audioInit(); setTimeout(() => play('flip'), 60); } };

  /* ---------- पन्ने ---------- */
  function label(i) {
    const k = D.kinds[i];
    if (k === 'c') return T.cover; if (k === 'b') return T.back;
    if (k === 'p') return `${T.page} ${D.folio[i]}`;
    // endpaper/ख़ाली: सबसे पास वाला पन्ना
    for (let j = i; j < N; j++) if (D.kinds[j] === 'p') return `${T.page} ${D.folio[j]}`;
    for (let j = i; j >= 0; j--) if (D.kinds[j] === 'p') return `${T.page} ${D.folio[j]}`;
    return '';
  }
  function makePages() {
    const frag = [];
    for (let i = 0; i < N; i++) {
      const k = D.kinds[i];
      const p = document.createElement('div');
      p.className = 'page k-' + k; p.dataset.i = i;
      p.dataset.density = (k === 'c' || k === 'b') ? 'hard' : 'soft';
      const pg = document.createElement('div'); pg.className = 'pg';
      if (k === 'c' || k === 'p' || k === 'b') {
        const im = document.createElement('img'); im.alt = ''; im.decoding = 'async'; im.draggable = false; im.dataset.i = i;
        pg.appendChild(im);
      } else if (k === 'e') {
        const first = i < N / 2;
        pg.innerHTML = `<div class="mark"><div>${first ? `<span>${esc(D.author)}</span><b>${esc(D.title)}</b><span>${esc(D.subtitle)}</span>` : `<span>${esc(T.endA)}</span><b>✦</b><span>${esc(T.endB)}</span>`}</div></div>`;
      }
      p.appendChild(pg);
      const sh = document.createElement('span'); sh.className = 'shade'; p.appendChild(sh);
      frag.push(p);
    }
    return frag;
  }
  const esc = (s) => String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function loadAround(i) {
    const lo = Math.max(0, i - 3), hi = Math.min(N - 1, i + 6);
    document.querySelectorAll('#book img[data-i]').forEach((im) => {
      const j = +im.dataset.i;
      if (j >= lo && j <= hi && !im.getAttribute('src')) {
        im.onload = () => { im.classList.add('ok'); im.parentNode.classList.add('loaded'); };
        im.src = pageSrc(j);
      }
    });
    // आगे के कुछ पन्ने पहले से (cache)
    for (let j = hi + 1; j <= Math.min(N - 1, hi + 4); j++) if ('pcb'.includes(D.kinds[j])) { const x = new Image(); x.src = pageSrc(j); }
  }

  /* ---------- किताब का साइज़ और StPageFlip ---------- */
  function layout() {
    const r = wrap.getBoundingClientRect();
    const W = r.width, H = r.height;
    const one = Math.min(W, H / AR), two = Math.min(W / 2, H / AR);
    const m = two >= one * 0.74 && W > 520 ? 'landscape' : 'portrait';
    return { m, w: Math.floor(m === 'landscape' ? two : one) };
  }
  function build(startAt) {
    const L = layout();
    if (pf && L.m === mode && Math.abs(L.w - pageW) < 3) return;
    mode = L.m; pageW = L.w;
    const old = $('#book'); if (pf) { try { pf.destroy(); } catch (e) {} }
    const el = document.createElement('div'); el.id = 'book'; old.replaceWith(el);
    el.style.width = (mode === 'landscape' ? pageW * 2 : pageW) + 'px';
    B.classList.toggle('portrait', mode === 'portrait');
    const pageH = Math.round(pageW * AR);
    pf = new St.PageFlip(el, {
      width: pageW, height: pageH, size: 'stretch',
      minWidth: Math.floor(pageW * 0.6), maxWidth: pageW + 4, minHeight: 40, maxHeight: pageH + 4,
      showCover: true, usePortrait: true, autoSize: true, drawShadow: true, maxShadowOpacity: 0.5,
      flippingTime: 720, mobileScrollSupport: false, disableFlipByClick: true, swipeDistance: 24,
      showPageCorners: true, startPage: clamp(startAt, 0, N - 1),
    });
    // StPageFlip 2.0.7 की गड़बड़ी: फ़ोन (portrait) में "पिछला पन्ना" (बटन और दाएँ स्वाइप) काम नहीं करता। यहाँ ठीक किया।
    const origPrev = pf.flipPrev.bind(pf);
    pf.flipPrev = (corner = 'bottom') => {
      if (pf.getOrientation() !== 'portrait') return origPrev(corner);
      const b = pf.getBoundsRect(), st = pf.getSettings(), old = st.disableFlipByClick;
      st.disableFlipByClick = false;
      try { pf.getFlipController().flip({ x: b.left + b.pageWidth + 8, y: b.top + (corner === 'top' ? 2 : b.height - 2) }); } finally { st.disableFlipByClick = old; }
    };
    pf.on('flip', (e) => {
      const was = cur; cur = e.data; onPage();
      if ((cur === 0 && was > 0) || (cur >= N - 1 && was < N - 1)) play('book-close', 0.05);   // कवर बंद होने की थप
    });
    pf.on('changeState', (e) => {
      if (e.data === 'flipping') play(pf.getCurrentPageIndex() === 0 ? 'book-open' : 'flip');
      if (e.data === 'user_fold' || e.data === 'fold_corner') loadAround(pf.getCurrentPageIndex());
    });
    pf.on('changeOrientation', () => setTimeout(() => { placeSpot(); }, 30));
    pf.loadFromHTML(makePages());
    cur = pf.getCurrentPageIndex();
    loadAround(cur); onPage();
    requestAnimationFrame(() => { el.classList.add('ready'); $('#loading').hidden = true; placeSpot(); });
  }

  /* दिखती हुई किताब का आयत (स्क्रीन पर) */
  function visibleRect() {
    const el = $('#book'); if (!pf || !el) return null;
    const r = el.getBoundingClientRect(), b = pf.getBoundsRect();
    let x = r.left + b.left, w = b.width;
    if (mode === 'portrait') { x = r.left + b.left + b.pageWidth; w = b.pageWidth; }
    else if (cur === 0) { x = r.left + b.left + b.pageWidth; w = b.pageWidth; }
    else if (cur >= N - 1 && N % 2 === 0) { w = b.pageWidth; }
    return { x, y: r.top + b.top, w, h: b.height, pw: b.pageWidth };
  }
  function placeSpot() {
    const v = visibleRect(); if (!v) return;
    const s = stage.getBoundingClientRect();
    Object.assign(spot.style, { left: v.x - s.left + 'px', top: v.y - s.top + 'px', width: v.w + 'px', height: v.h + 'px' });
    const total = clamp(N / 36, 3, 13), prog = N > 1 ? cur / (N - 1) : 0;
    const showL = mode === 'landscape' && cur > 0, showR = cur < N - 1;
    spot.style.setProperty('--thickL', (showL ? Math.max(1.5, total * prog) : 0) + 'px');
    spot.style.setProperty('--thickR', (showR ? Math.max(1.5, total * (1 - prog)) : 0) + 'px');
  }
  spot.innerHTML = '<i class="edgeL"></i><i class="edgeR"></i>';

  /* ---------- हर पन्ने पर ---------- */
  const slider = $('#slider'), pno = $('#pno');
  function onPage() {
    loadAround(cur);
    const a = label(cur);
    const right = mode === 'landscape' && cur > 0 && cur + 1 < N ? label(cur + 1) : '';
    pno.textContent = right && right !== a && D.kinds[cur] === 'p' && D.kinds[cur + 1] === 'p' ? `${D.folio[cur]}–${D.folio[cur + 1]} / ${lastFolio}` : (D.kinds[cur] === 'p' ? `${D.folio[cur]} / ${lastFolio}` : a);
    slider.value = cur; slider.style.setProperty('--p', (N > 1 ? (cur / (N - 1)) * 100 : 0) + '%');
    $('#bPrev').disabled = cur <= 0; $('#bNext').disabled = cur >= N - 1;
    B.classList.toggle('closed', cur === 0);
    $('#bClose').title = cur === 0 ? T.open : T.close;
    store.set(KEY, String(cur));
    try { history.replaceState(null, '', cur > 0 ? '#p=' + cur : location.pathname); } catch (e) {}
    placeSpot();
  }
  let lastFolio = 0;

  /* ---------- छूना: टैप, किनारे, दो उँगली ---------- */
  const pts = new Map(); let down = null;
  stage.addEventListener('pointerdown', (e) => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) down = { x: e.clientX, y: e.clientY, t: Date.now(), moved: false };
    if (pts.size === 2) { // दो उँगली: ज़ूम वाला रीडर
      const [a, b] = [...pts.values()]; down = null;
      openReader(pageAt((a.x + b.x) / 2), { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, pinch: true });
    }
  }, true);
  stage.addEventListener('pointermove', (e) => { if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 10) down.moved = true; }, true);
  const up = (e) => {
    pts.delete(e.pointerId);
    if (!down || e.type === 'pointercancel') { down = null; return; }
    const d = down; down = null;
    if (d.moved || Date.now() - d.t > 400 || e.target.closest('button,a')) return;
    const v = visibleRect(); if (!v) return;
    const x = e.clientX, y = e.clientY;
    if (x < v.x || x > v.x + v.w || y < v.y || y > v.y + v.h) { B.classList.toggle('immersive'); setTimeout(() => { build(cur); placeSpot(); }, 380); return; }
    const edge = Math.min(70, v.w * 0.14);
    if (x > v.x + v.w - edge) return later(() => pf.flipNext('bottom'));
    if (x < v.x + edge && cur > 0) return later(() => pf.flipPrev('bottom'));
    if (cur === 0) return later(() => pf.flipNext('bottom'));   // बंद किताब पर टैप = खोलो
    openReader(pageAt(x), { x, y });
  };
  stage.addEventListener('pointerup', up, true);
  stage.addEventListener('pointercancel', up, true);
  function later(fn) { setTimeout(() => { if (pf.getState() === 'read') fn(); }, 40); }
  function pageAt(x) {
    if (mode === 'portrait' || cur === 0) return cur;
    const v = visibleRect();
    if (cur >= N - 1) return cur;
    return x < v.x + v.pw ? cur : Math.min(N - 1, cur + 1);
  }
  /* किताब बंद करो / खोलो */
  let closing = false;
  function closeBook() {
    if (!pf || closing) return;
    if (cur === 0) return pf.flipNext('bottom');
    closing = true;
    const near = 1;
    if (cur > near) {   // बीच के पन्ने तेज़ी से सरसराकर वापस
      const n = Math.min(4, Math.ceil((cur - near) / 20) + 2);
      for (let k = 0; k < n; k++) play('flip', k * 0.09);
      pf.turnToPage(near); cur = pf.getCurrentPageIndex(); onPage();
    }
    setTimeout(() => { pf.flipPrev('top'); closing = false; }, cur > near ? 380 : 0);
  }
  $('#bClose').onclick = closeBook;
  $('#bPrev').onclick = () => pf && pf.flipPrev('bottom');
  $('#bNext').onclick = () => pf && pf.flipNext('bottom');
  slider.addEventListener('input', () => { const i = +slider.value; pno.textContent = label(i); slider.style.setProperty('--p', (i / (N - 1)) * 100 + '%'); });
  slider.addEventListener('change', () => go(+slider.value));
  function go(i) { i = clamp(i, 0, N - 1); play('flip'); pf.turnToPage(i); cur = pf.getCurrentPageIndex(); onPage(); }
  window.addEventListener('keydown', (e) => {
    if (!$('#reader').hidden) return readerKey(e);
    if (e.key === 'Home') closeBook(); else if (e.key === 'ArrowRight' || e.key === 'PageDown') pf.flipNext(); else if (e.key === 'ArrowLeft' || e.key === 'PageUp') pf.flipPrev();
  });
  $('#bRead').onclick = () => openReader(cur, null);

  /* ---------- पूरी स्क्रीन ---------- */
  const de = document.documentElement;
  if (!(de.requestFullscreen || de.webkitRequestFullscreen)) $('#bFull').hidden = true;
  $('#bFull').onclick = () => {
    const fs = document.fullscreenElement || document.webkitFullscreenElement;
    if (fs) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else (de.requestFullscreen || de.webkitRequestFullscreen).call(de).catch?.(() => {});
  };
  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (pf) { build(cur); placeSpot(); } }, 220); });

  /* ---------- विषय-सूची ---------- */
  $('#bToc').onclick = () => {
    const ol = $('#tocList');
    if (!ol.childElementCount) {
      ol.innerHTML = D.toc.map((t) => `<li class="l${t.l}" data-p="${t.p}"><span>${esc(t.t)}</span><em>${D.folio[t.p] || ''}</em></li>`).join('');
      ol.onclick = (e) => { const li = e.target.closest('li'); if (!li) return; $('#toc').hidden = true; go(+li.dataset.p); };
    }
    ol.querySelectorAll('li').forEach((li) => li.classList.remove('cur'));
    let best = null; ol.querySelectorAll('li').forEach((li) => { if (+li.dataset.p <= cur + 1) best = li; });
    $('#toc').hidden = false;
    if (best) { best.classList.add('cur'); best.scrollIntoView({ block: 'center' }); }
  };
  $('#tocClose').onclick = () => { $('#toc').hidden = true; };
  $('#toc').addEventListener('click', (e) => { if (e.target.id === 'toc') $('#toc').hidden = true; });

  /* ================= पढ़ने वाला ज़ूम ================= */
  const R = $('#reader'), view = $('#rView'), inner = $('#rInner'), rImg = $('#rImg'), rLines = $('#rLines');
  const strip = $('#strip'), lineImg = $('#lineImg');
  let rI = 0, s = 1, tx = 0, ty = 0, bw = 0, bh = 0, sel = -1;
  let night = store.get('ycbook:night') === '1';
  R.classList.toggle('night', night);

  function readable(i) { // कवर/endpaper छोड़कर सबसे पास का पढ़ने लायक़ पन्ना
    if ('pcb'.includes(D.kinds[i])) return i;
    for (let d = 1; d < 4; d++) { if (i + d < N && D.kinds[i + d] === 'p') return i + d; if (i - d >= 0 && D.kinds[i - d] === 'p') return i - d; }
    return i;
  }
  function openReader(i, at) {
    i = readable(i);
    R.hidden = false; history.pushState({ reader: 1 }, '');
    showPage(i, false);
    if (at && at.pinch) { const r = inner.getBoundingClientRect(); zoomAt(2, clamp(at.x, r.left, r.right), clamp(at.y, r.top, r.bottom)); }
    const h = $('#rHint'); h.classList.remove('gone'); clearTimeout(h._t); h._t = setTimeout(() => h.classList.add('gone'), 3200);
  }
  function closeReader(fromPop) {
    if (R.hidden) return;
    R.hidden = true; strip.hidden = true; sel = -1;
    if (!fromPop) history.back();
    if (pf) { pf.turnToPage(rI); cur = pf.getCurrentPageIndex(); onPage(); }
  }
  window.addEventListener('popstate', () => { if (!R.hidden) closeReader(true); else if (!$('#toc').hidden) $('#toc').hidden = true; });
  $('#rClose').onclick = () => closeReader(false);

  function fit() {
    const r = view.getBoundingClientRect();
    bw = Math.min(r.width - 12, (r.height - 12) / AR); bh = bw * AR;
    inner.style.width = bw + 'px'; inner.style.height = bh + 'px';
    return r;
  }
  function showPage(i, sound) {
    rI = clamp(i, 0, N - 1);
    const r = fit(); s = 1; tx = (r.width - bw) / 2; ty = Math.max(6, (r.height - bh) / 2); apply(false);
    rImg.src = pageSrc(rI);
    const z = new Image(); z.onload = () => { if (z._i === rI) rImg.src = z.src; }; z._i = rI; z.src = zoomSrc(rI);
    rLines.innerHTML = (D.lines[rI] || []).map((l, k) => `<i data-k="${k}" style="left:${l[0] * 100}%;top:${l[1] * 100}%;width:${(l[2] - l[0]) * 100}%;height:${(l[3] - l[1]) * 100}%"></i>`).join('');
    $('#rPno').textContent = label(rI);
    sel = -1; strip.hidden = true;
    if (sound) play('flip');
    for (let j = rI + 1; j <= Math.min(N - 1, rI + 2); j++) { const x = new Image(); x.src = zoomSrc(j); }
  }
  function apply(anim) {
    const r = view.getBoundingClientRect();
    const W = bw * s, H = bh * s;
    tx = W <= r.width ? (r.width - W) / 2 : clamp(tx, r.width - W - 8, 8);
    ty = H <= r.height ? Math.max(6, (r.height - H) / 2) : clamp(ty, r.height - H - 8, 8);
    inner.style.transition = anim ? 'transform .25s ease' : 'none';
    inner.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
    R.classList.toggle('zoomed', s > 1.02);
  }
  function zoomAt(ns, cx, cy, anim = true) {
    const r = view.getBoundingClientRect(); ns = clamp(ns, 1, 5);
    const px = cx - r.left, py = cy - r.top;
    tx = px - (px - tx) * (ns / s); ty = py - (py - ty) * (ns / s); s = ns; apply(anim);
  }
  $('#rIn').onclick = () => { const r = view.getBoundingClientRect(); zoomAt(s * 1.5, r.left + r.width / 2, r.top + r.height / 2); };
  $('#rOut').onclick = () => { const r = view.getBoundingClientRect(); zoomAt(s / 1.5, r.left + r.width / 2, r.top + r.height / 2); };
  $('#rNight').onclick = () => { night = !night; R.classList.toggle('night', night); store.set('ycbook:night', night ? '1' : '0'); };
  $('#rPrevP').onclick = () => { if (rI > 0) showPage(readable(rI - 1) === rI ? rI - 1 : readable(rI - 1), true); };
  $('#rNextP').onclick = () => { if (rI < N - 1) showPage(readable(rI + 1), true); };
  view.addEventListener('wheel', (e) => { e.preventDefault(); zoomAt(s * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY, false); }, { passive: false });

  // उँगलियाँ: खींचना, फैलाना, टैप, डबल-टैप, स्वाइप
  const rp = new Map(); let g = null, lastTap = 0;
  view.addEventListener('pointerdown', (e) => {
    view.setPointerCapture(e.pointerId); rp.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (rp.size === 1) g = { kind: 'one', x0: e.clientX, y0: e.clientY, tx0: tx, ty0: ty, t: Date.now(), moved: false };
    else if (rp.size === 2) { const [a, b] = [...rp.values()]; g = { kind: 'two', d0: Math.hypot(a.x - b.x, a.y - b.y), s0: s, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, tx0: tx, ty0: ty }; }
  });
  view.addEventListener('pointermove', (e) => {
    if (!rp.has(e.pointerId) || !g) return;
    rp.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (g.kind === 'two' && rp.size >= 2) {
      const [a, b] = [...rp.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y);
      const ns = clamp(g.s0 * d / g.d0, 1, 5), r = view.getBoundingClientRect();
      const mx = (a.x + b.x) / 2 - r.left, my = (a.y + b.y) / 2 - r.top, m0x = g.mx - r.left, m0y = g.my - r.top;
      tx = mx - (m0x - g.tx0) * (ns / g.s0); ty = my - (m0y - g.ty0) * (ns / g.s0); s = ns; apply(false);
    } else if (g.kind === 'one') {
      const dx = e.clientX - g.x0, dy = e.clientY - g.y0;
      if (Math.hypot(dx, dy) > 8) g.moved = true;
      if (s > 1.02) { tx = g.tx0 + dx; ty = g.ty0 + dy; apply(false); }
      else if (g.moved) { inner.style.transition = 'none'; inner.style.transform = `translate(${g.tx0 + dx * 0.6}px,${ty}px)`; }
    }
  });
  const rup = (e) => {
    if (!rp.has(e.pointerId)) return;
    const pt = rp.get(e.pointerId); rp.delete(e.pointerId);
    if (!g) return;
    if (g.kind === 'two') { if (rp.size === 0) g = null; else { const [a] = [...rp.values()]; g = { kind: 'one', x0: a.x, y0: a.y, tx0: tx, ty0: ty, t: Date.now(), moved: true }; } return; }
    const dx = pt.x - g.x0, dy = pt.y - g.y0, dt = Date.now() - g.t, gg = g; g = null;
    if (e.type === 'pointercancel') return apply(true);
    if (!gg.moved && dt < 350) {
      const now = Date.now();
      if (now - lastTap < 300) { lastTap = 0; zoomAt(s > 1.4 ? 1 : 2.4, pt.x, pt.y); return; }
      lastTap = now; tapLine(pt.x, pt.y); return;
    }
    if (s <= 1.02 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0 && rI < N - 1) return showPage(readable(rI + 1), true);
      if (dx > 0 && rI > 0) return showPage(readable(rI - 1) === rI ? rI - 1 : readable(rI - 1), true);
    }
    apply(true);
  };
  view.addEventListener('pointerup', rup); view.addEventListener('pointercancel', rup);

  // लाइन चुनना और बड़ी पट्टी में दिखाना
  function tapLine(cx, cy) {
    const r = inner.getBoundingClientRect();
    const x = (cx - r.left) / r.width, y = (cy - r.top) / r.height;
    const L = D.lines[rI] || [];
    let best = -1, bd = 1e9;
    L.forEach((l, k) => {
      const h = l[3] - l[1];
      if (x < l[0] - 0.04 || x > l[2] + 0.04) return;
      const dy = y < l[1] ? l[1] - y : y > l[3] ? y - l[3] : 0;
      if (dy > h * 0.9) return;
      if (dy < bd) { bd = dy; best = k; }
    });
    if (best < 0) { selectLine(-1); return; }
    selectLine(best === sel ? -1 : best);
  }
  function selectLine(k) {
    sel = k;
    rLines.querySelectorAll('i.on').forEach((i) => i.classList.remove('on'));
    if (k < 0) { strip.hidden = true; return; }
    rLines.querySelector(`i[data-k="${k}"]`).classList.add('on');
    strip.hidden = false;
    $('#rHint').classList.add('gone');
    requestAnimationFrame(() => { drawStrip(D.lines[rI][k]); ensureVisible(D.lines[rI][k]); });
  }
  /* लाइन को पढ़ने लायक़ बड़ा करो; ज़्यादा लंबी हो तो शब्द पर तोड़कर 2-3 पंक्तियाँ */
  function drawStrip(l) {
    const box = $('#lineBox'), BW = box.clientWidth - 16;
    const lh = l[3] - l[1], lw = l[2] - l[0], gaps = l[4] || [];
    const target = clamp(window.innerHeight * 0.052, 30, 54);       // एक पंक्ति की ऊँचाई (px)
    let P = target / (lh * AR);                                       // पन्ने की चौड़ाई px में
    if (lw * P <= BW) P = Math.min(P, BW / lw);                     // छोटी लाइन: बस फैलाओ
    const rows = (P) => { const out = []; let a = l[0]; const max = BW / P;
      while (l[2] - a > max + 1e-4) { let cut = -1; for (const g of gaps) if (g > a + 0.01 && g - a <= max) cut = g; if (cut < 0) cut = a + max; out.push([a, cut]); a = cut; }
      out.push([a, l[2]]); return out; };
    let R = rows(P); while (R.length > 3) { P *= 0.9; R = rows(P); }
    const url = zoomSrc(rI), bgW = P, bgH = P * AR, h = lh * bgH;
    lineImg.innerHTML = R.map(([a, b]) => `<div style="width:${(b - a) * bgW}px;height:${h}px;background-image:url('${url}');background-size:${bgW}px ${bgH}px;background-position:${-a * bgW}px ${-l[1] * bgH}px"></div>`).join('');
  }
  function ensureVisible(l) {
    const vr = view.getBoundingClientRect();
    if (s > 1.02) { ty = vr.height * 0.4 - ((l[1] + l[3]) / 2) * bh * s; tx = vr.width / 2 - ((l[0] + l[2]) / 2) * bw * s; return apply(true); }
    const top = ty + l[1] * bh, bot = ty + l[3] * bh;
    if (bot > vr.height - 12) ty -= bot - vr.height + vr.height * 0.35;
    else if (top < 12) ty += 12 - top + vr.height * 0.2;
    apply(true);
  }
  function stepLine(d) {
    const L = D.lines[rI] || [];
    let k = sel + d;
    if (k >= L.length) { let j = rI + 1; while (j < N && !(D.lines[j] || []).length) j++; if (j >= N) return; showPage(j, true); return requestAnimationFrame(() => selectLine(0)); }
    if (k < 0) { let j = rI - 1; while (j >= 0 && !(D.lines[j] || []).length) j--; if (j < 0) return; showPage(j, true); return requestAnimationFrame(() => selectLine(D.lines[j].length - 1)); }
    selectLine(k);
  }
  $('#lNext').onclick = () => stepLine(1);
  $('#lPrev').onclick = () => stepLine(-1);
  // पट्टी पर बाएँ/दाएँ स्वाइप = अगली/पिछली लाइन
  let sx = null;
  strip.addEventListener('pointerdown', (e) => { sx = e.clientX; });
  strip.addEventListener('pointerup', (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 40) stepLine(e.clientX < sx ? 1 : -1); sx = null; });
  function readerKey(e) {
    if (e.key === 'Escape') closeReader(false);
    else if (e.key === 'ArrowDown') { e.preventDefault(); stepLine(1); } else if (e.key === 'ArrowUp') { e.preventDefault(); stepLine(-1); }
    else if (e.key === 'ArrowRight') $('#rNextP').click(); else if (e.key === 'ArrowLeft') $('#rPrevP').click();
    else if (e.key === '+' || e.key === '=') $('#rIn').click(); else if (e.key === '-') $('#rOut').click();
  }
  window.addEventListener('resize', () => { if (!R.hidden) showPage(rI, false); });

  /* ---------- शुरू ---------- */
  fetch(`./book.json?v=${VER}`).then((r) => r.json()).then((d) => {
    D = d; N = d.kinds.length; AR = d.aspect;
    lastFolio = d.folio.reduce((m, x) => (x > m ? x : m), 0);
    slider.max = N - 1;
    const h = /#p=(\d+)/.exec(location.hash);
    const saved = parseInt(store.get(KEY) || '0', 10);
    build(h ? +h[1] : 0);
    if (!h && saved > 2 && saved < N) {
      const t = $('#toast'); t.innerHTML = `<span>${esc(T.resume(label(saved)))}</span><button>${esc(T.go)}</button>`; t.hidden = false;
      t.querySelector('button').onclick = () => { t.hidden = true; go(saved); };
      setTimeout(() => { t.hidden = true; }, 8000);
    }
    if (store.get('ycbook:hint') !== '1') {
      $('#hint').hidden = false;
      $('#hintOk').onclick = () => { $('#hint').hidden = true; store.set('ycbook:hint', '1'); audioInit(); };
    }
  }).catch(() => { $('#loading span').textContent = UI === 'en' ? 'Could not load. Please refresh.' : 'किताब नहीं खुली, पेज दोबारा खोलिए।'; });
})();
