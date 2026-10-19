// PICHCHRAPA stunt lane (3D): Raja and the Mantri cross the page above the first film strip in seven comedy scenes.
// Loaded on demand (see src/app.js), so it costs nothing until the lane is about to scroll into view.
// Rebuild the bundle with scripts/bundle-3d.sh after changing anything in src3d/.
import { THREE } from './gfx.js';
import { makeFx } from './fx.js';
import { buildScenes } from './scenes.js';

const HU = 1.9; // visible height of the lane in world units

export function start(host) {
  const canvas = document.createElement('canvas');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    return null;
  }
  host.appendChild(canvas);
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xe6fbf6, 0x2c5a58, 1.5));
  const key = new THREE.DirectionalLight(0xfff0d0, 2.4); key.position.set(-3, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x74e3cf, 1.3); rim.position.set(4, 3, -5); scene.add(rim);
  const cam = new THREE.OrthographicCamera(-1, 1, HU / 2, -HU / 2, 0.1, 60);
  const fx = makeFx(scene);
  const scenes = buildScenes({ scene, fx });

  let W = 0, hostW = 0, hostH = 0;
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h || (w === hostW && h === hostH)) return;
    hostW = w; hostH = h; W = (w / h) * HU;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(w, h, false);
    canvas.style.width = '100%'; canvas.style.height = '100%';
    cam.left = -W / 2; cam.right = W / 2; cam.updateProjectionMatrix();
    const cy = HU / 2 - 0.1, pit = 0.1;
    cam.position.set(W / 2, cy + 10 * Math.sin(pit), 10 * Math.cos(pit)); cam.lookAt(W / 2, cy, 0);
  }

  let idx = 0, T = 0, gap = 0.4, cur = null;
  function place(p) {
    const S = cur, x0 = S.dir > 0 ? -S.front : W + S.front, x1 = S.dir > 0 ? W + S.rear : -S.rear;
    S.g.position.x = x0 + (x1 - x0) * p; S.g.scale.x = S.dir;
  }
  function begin(i) {
    cur = scenes[i]; cur.g.visible = true; T = 0; cur.dur = (W + cur.rear + cur.front) / cur.speed;
    if (cur.enter) cur.enter(); place(0); cur.update(0, 0.016);
  }
  function end() {
    cur.g.visible = false; if (cur.exit) cur.exit(); cur = null; idx = (idx + 1) % scenes.length; gap = 0.3;
  }
  function step(dt) {
    fx.update(dt);
    if (!cur) { gap -= dt; if (gap <= 0) begin(idx); return; }
    T += dt;
    const p = T / cur.dur;
    if (p >= 1) { end(); return; }
    place(p); cur.update(T, dt);
  }

  let raf = 0, last = 0, wantRun = false;
  function frame(now) {
    raf = 0;
    if (!wantRun) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    step(dt);
    renderer.render(scene, cam);
    raf = requestAnimationFrame(frame);
  }
  function play() { wantRun = true; if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function pause() { wantRun = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }

  // jump straight to scene i at progress p (used for testing and screenshots)
  function seek(i, p) {
    pause(); resize();
    for (const s of scenes) { s.g.visible = false; if (s.exit) s.exit(); }
    fx.clear(); cur = null; idx = i; begin(i);
    const total = p * cur.dur;
    for (let t = 0; t < total; t += 1 / 30) { T = t; fx.update(1 / 30); place(Math.min(0.999, t / cur.dur)); cur.update(t, 1 / 30); }
    T = total; place(p); cur.update(total, 1 / 30);
    renderer.render(scene, cam);
  }

  resize();
  const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(host); else window.addEventListener('resize', resize);
  const api = { play, pause, seek, resize, canvas };
  window.__stunt3d = api;
  return api;
}
