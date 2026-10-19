// Small pooled particles: dust puffs, sweat drops, spilling coins.
import { THREE, toon } from './gfx.js';

export function makeFx(scene) {
  // soft round smoke sprite (radial gradient) instead of hard little balls
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const cx = cv.getContext('2d'), gr = cx.createRadialGradient(32, 32, 2, 32, 32, 31);
  gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(0.55, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  cx.fillStyle = gr; cx.fillRect(0, 0, 64, 64);
  const puffTex = new THREE.CanvasTexture(cv);
  const dropGeo = new THREE.SphereGeometry(1, 8, 6);
  const coinGeo = new THREE.CylinderGeometry(1, 1, 0.3, 14);
  const puffs = [], drops = [], coins = [];
  for (let i = 0; i < 30; i++) {
    const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex, color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
    m.visible = false; scene.add(m); puffs.push({ m, life: 0, max: 1, vx: 0, vy: 0, s0: 0.1, s1: 0.3, a: 0.6 });
  }
  const dropMat = new THREE.MeshBasicMaterial({ color: 0x9fe0ff });
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(dropGeo, dropMat); m.scale.set(0.035, 0.055, 0.035); m.visible = false; scene.add(m); drops.push({ m, life: 0, vx: 0, vy: 0 });
  }
  const coinMat = toon(0xf3bd35);
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Mesh(coinGeo, coinMat); m.scale.set(0.07, 0.07, 0.07); m.visible = false; scene.add(m); coins.push({ m, life: 0, vx: 0, vy: 0, vr: 0, bounces: 0 });
  }
  let pi = 0, di = 0, ci = 0;
  return {
    puff(x, y, z, o = {}) {
      const p = puffs[pi++ % puffs.length];
      p.m.position.set(x, y, z); p.life = 0; p.max = o.life ?? 0.5; p.vx = o.vx ?? -0.3; p.vy = o.vy ?? 0.25; p.s0 = o.s0 ?? 0.05; p.s1 = o.s1 ?? 0.22; p.a = o.a ?? 0.6;
      p.m.material.color.setHex(o.color ?? 0xffffff); p.m.visible = true;
    },
    drop(x, y, z, vx, vy) {
      const d = drops[di++ % drops.length];
      d.m.position.set(x, y, z); d.life = 0.7; d.vx = vx; d.vy = vy; d.m.visible = true;
    },
    coin(x, y, z, vx, vy) {
      const c = coins[ci++ % coins.length];
      c.m.position.set(x, y, z); c.life = 2.2; c.vx = vx; c.vy = vy; c.vr = 8 + Math.random() * 10; c.bounces = 0; c.m.visible = true;
    },
    update(dt) {
      for (const p of puffs) {
        if (!p.m.visible) continue;
        p.life += dt;
        const u = p.life / p.max;
        if (u >= 1) { p.m.visible = false; continue; }
        p.m.position.x += p.vx * dt; p.m.position.y += p.vy * dt;
        p.m.scale.setScalar((p.s0 + (p.s1 - p.s0) * u) * 2.2);
        p.m.material.opacity = p.a * (1 - u);
      }
      for (const d of drops) {
        if (!d.m.visible) continue;
        d.life -= dt; if (d.life <= 0) { d.m.visible = false; continue; }
        d.vy -= 5 * dt; d.m.position.x += d.vx * dt; d.m.position.y += d.vy * dt;
      }
      for (const c of coins) {
        if (!c.m.visible) continue;
        c.life -= dt; if (c.life <= 0) { c.m.visible = false; continue; }
        c.vy -= 7 * dt; c.m.position.x += c.vx * dt; c.m.position.y += c.vy * dt; c.m.rotation.x += c.vr * dt; c.m.rotation.z += c.vr * 0.5 * dt;
        if (c.m.position.y < 0.07 && c.vy < 0) { c.m.position.y = 0.07; if (c.bounces++ < 3) { c.vy *= -0.55; c.vx *= 0.7; } else c.vy = 0, c.vx *= 0.5; }
      }
    },
    clear() { for (const a of [puffs, drops, coins]) for (const p of a) p.m.visible = false; },
  };
}
