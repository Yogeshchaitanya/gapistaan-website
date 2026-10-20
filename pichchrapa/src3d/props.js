// Hand props. Each is built to hang from the hand along -y, so it follows the arm.
import { THREE, G, mk, ell, put, grp, cap, toon } from './gfx.js';

const GOLD = 0xe9b43c;

export function makeGada() {
  const g = new THREE.Group();
  const handle = mk(cap(0.035, 0.5), 0x7a4a1f); handle.position.y = -0.22; g.add(handle);
  const ring = mk(G.ring, GOLD, { out: false }); ring.scale.set(0.06, 0.06, 0.06); ring.rotation.x = Math.PI / 2; put(g, ring, 0, -0.1, 0);
  const headG = grp(g, 0, -0.62, 0);
  put(headG, ell(GOLD, 0.15, 0.15, 0.15, 0, 0, 0));
  for (let i = 0; i < 10; i++) {
    const a = Math.acos(1 - 2 * ((i + 0.5) / 10)), b = i * 2.399963;
    const sp = mk(G.cone, 0xffd86a); sp.scale.set(0.045, 0.12, 0.045);
    const dir = new THREE.Vector3(Math.sin(a) * Math.cos(b), Math.cos(a), Math.sin(a) * Math.sin(b));
    sp.position.copy(dir).multiplyScalar(0.16);
    sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    headG.add(sp);
  }
  return g;
}

export function makeBow() {
  const g = new THREE.Group();
  const arc = mk(new THREE.TorusGeometry(0.42, 0.022, 8, 28, Math.PI), 0x7a4a1f);
  arc.rotation.z = -Math.PI / 2;                       // belly toward +z... set below by scene
  g.add(arc);
  const string = mk(G.cyl, 0xf6ecd2, { out: false }); string.scale.set(0.006, 0.84, 0.006); string.position.set(0, 0, 0); g.add(string);
  const grip = mk(G.cyl, GOLD); grip.scale.set(0.035, 0.12, 0.035); grip.position.set(0.42, 0, 0); g.add(grip);
  return g;
}

export function makeArrow() {
  const g = new THREE.Group();            // points along +x
  const shaft = mk(G.cyl, 0x8a5a2b, { out: true }); shaft.scale.set(0.014, 0.7, 0.014); shaft.rotation.z = Math.PI / 2; g.add(shaft);
  const head = mk(G.cone, 0xdfe6e6); head.scale.set(0.04, 0.12, 0.04); head.rotation.z = -Math.PI / 2; put(g, head, 0.4, 0, 0);
  for (const r of [0, Math.PI / 2]) { const f = mk(G.sharp, 0xff6a3a, { out: false }); f.scale.set(0.12, 0.07, 0.006); f.rotation.x = r; put(g, f, -0.3, 0, 0); }
  return g;
}

export function makeScroll() {
  const g = new THREE.Group();
  const roll = mk(G.cyl, 0xf3e6c0); roll.scale.set(0.085, 0.4, 0.085); roll.rotation.x = Math.PI / 2; roll.position.set(0, -0.08, 0); g.add(roll);
  const cap1 = mk(G.cyl, 0xc4372c); cap1.scale.set(0.07, 0.03, 0.07); cap1.rotation.x = Math.PI / 2; put(g, cap1, 0, -0.08, 0.21);
  const cap2 = mk(G.cyl, 0xc4372c); cap2.scale.set(0.1, 0.035, 0.1); cap2.rotation.x = Math.PI / 2; put(g, cap2, 0, -0.08, -0.21);
  // the unrolled bill streams behind it
  const bill = grp(g, 0, -0.08, 0);
  const sheet = mk(G.sharp, 0xfaf3dc, { out: true }); sheet.scale.set(0.5, 0.012, 0.3); put(bill, sheet, -0.25, 0, 0);
  for (let i = 0; i < 4; i++) { const l = mk(G.sharp, 0x6b5a3a, { out: false }); l.scale.set(0.34 - i * 0.04, 0.004, 0.02); put(bill, l, -0.2 - i * 0.015, 0.008, -0.08 + i * 0.055); }
  g.userData.bill = bill;
  return g;
}

export function makeMoneyBag() {
  const g = new THREE.Group();
  put(g, ell(0xb88a4a, 0.17, 0.17, 0.17, 0, -0.17, 0));
  const neck = mk(G.cyl, 0xb88a4a); neck.scale.set(0.07, 0.08, 0.07); put(g, neck, 0, -0.03, 0);
  const tie = mk(G.ring, 0xc4372c, { out: false }); tie.scale.set(0.075, 0.075, 0.075); tie.rotation.x = Math.PI / 2; put(g, tie, 0, -0.05, 0);
  const coin = mk(G.cyl, GOLD, { out: false }); coin.scale.set(0.08, 0.02, 0.08); coin.rotation.z = Math.PI / 2; coin.rotation.x = 0.2; put(g, coin, 0.0, -0.17, 0.17);
  return g;
}

export function makeJalebi() {
  const g = new THREE.Group();
  const col = 0xf28c1b;
  for (const r of [0.2, 0.13, 0.06]) { const ring = mk(G.ring, col); ring.scale.set(r, r, r * 2.4); ring.rotation.x = Math.PI / 2 - 0.35; g.add(ring); }
  const sugar = ell(0xffe08a, 0.05, 0.04, 0.05, 0, 0.0, 0, { out: false }); g.add(sugar);
  return g;
}

export function makeStar(color = 0xffe14a) {
  const m = mk(new THREE.OctahedronGeometry(1, 0), color, { out: false });
  m.scale.set(0.07, 0.07, 0.025);
  return m;
}

// Raja's talwar, as in the episodes: red grip, gold guard and pommel, a curved steel blade. Hangs from the hand along -y.
// The flat of the blade lies in the y-z plane, the plane the figures are seen in, so it reads as a sword and not a stick.
export function makeTalwar() {
  const g = new THREE.Group();
  put(g, ell(GOLD, 0.045, 0.045, 0.045, 0, 0.09, 0));                                  // pommel
  const grip = mk(G.cyl, 0xc8202f); grip.scale.set(0.03, 0.15, 0.03); put(g, grip, 0, 0.0, 0);
  const guard = mk(G.box, GOLD); guard.scale.set(0.05, 0.035, 0.2); put(g, guard, 0, -0.08, 0);
  // one curved blade: drawn as a flat outline (u = toward the edge, v = down) and given a little thickness
  const L = 0.74, bend = 0.16, sh = new THREE.Shape();
  sh.moveTo(0, 0);
  for (let i = 1; i <= 12; i++) { const t = i / 12; sh.lineTo(bend * t * t, -L * t); }               // back of the blade
  for (let i = 12; i >= 0; i--) { const t = i / 12; sh.lineTo(bend * t * t + 0.065 * (1 - t * t * t) + (i === 12 ? 0.012 : 0), -L * t + (i === 12 ? 0.03 : 0)); }  // edge
  const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.014, bevelEnabled: false });
  geo.translate(-0.03, 0, -0.007);
  const blade = mk(geo, 0xe3ecee); blade.rotation.y = -Math.PI / 2; g.add(blade); blade.position.set(0, -0.1, 0);
  return g;
}
