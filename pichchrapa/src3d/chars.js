// The two stars: Raja (the king: crown, thick moustache, belly, royal blue) and the Mantri (the minister: big turban, long moustache, saffron kurta).
// They are built from toon-shaded primitives and posed by code, so legs really run, arms really swing and faces can shout.
import { THREE, G, mk, ell, put, grp, cap, toon } from './gfx.js';

const GOLD = 0xe9b43c;
const GOLD_HI = 0xffd86a;

function leg(parent, side, o) {
  const hip = grp(parent, side * o.hipX, 0, 0);
  put(hip, mk(cap(o.thighR, o.thigh - 2 * o.thighR), o.pant), 0, -o.thigh / 2, 0);
  const knee = grp(hip, 0, -o.thigh, 0);
  put(knee, mk(cap(o.shinR, o.shin - 2 * o.shinR), o.shinCol || o.pant), 0, -o.shin / 2, 0);
  const foot = grp(knee, 0, -o.shin + 0.03, 0);
  put(foot, ell(o.shoe, 0.085, 0.065, 0.15, 0, 0, 0.055));
  const toe = mk(G.cone, o.shoe);
  toe.scale.set(0.04, 0.12, 0.04);
  toe.rotation.x = -1.1;
  put(foot, toe, 0, 0.0, 0.2);
  return { hip, knee, foot };
}

function arm(parent, side, o) {
  const sh = grp(parent, side * o.shX, o.shY, 0);
  put(sh, ell(o.sleeve, o.shR, o.shR, o.shR));
  put(sh, mk(cap(o.upR, o.upper - 2 * o.upR), o.sleeve), 0, -o.upper / 2, 0);
  const elbow = grp(sh, 0, -o.upper, 0);
  put(elbow, mk(cap(o.foreR, o.fore - 2 * o.foreR), o.foreCol), 0, -o.fore / 2, 0);
  if (o.cuff) put(elbow, ell(o.cuff, o.foreR * 1.35, 0.035, o.foreR * 1.35), 0, -o.fore * 0.78, 0);
  const hand = grp(elbow, 0, -o.fore, 0);
  put(hand, ell(o.skin, 0.082, 0.082, 0.082));
  return { sh, elbow, hand };
}

// a moustache as a chain of ellipsoids that sweeps out and curls up (droop < 0 curls down)
function moustache(parent, color, k, curl) {
  const g = grp(parent, 0, 0, 0);
  put(g, ell(color, 0.1 * k, 0.05 * k, 0.065 * k, 0, 0, 0));
  for (const s of [1, -1]) {
    const a = put(g, ell(color, 0.12 * k, 0.045 * k, 0.06 * k, s * 0.12 * k, -0.005 * k, 0)); a.rotation.z = s * 0.3 * (curl < 0 ? -1 : 1);
    const b = put(g, ell(color, 0.1 * k, 0.04 * k, 0.055 * k, s * 0.235 * k, 0.03 * k * Math.sign(curl), 0)); b.rotation.z = s * 0.85 * Math.sign(curl);
    put(g, ell(color, 0.04 * k, 0.04 * k, 0.04 * k, s * 0.31 * k, 0.105 * k * Math.sign(curl), 0));
  }
  return g;
}

function eye(head, side, s, y, z) {
  const e = grp(head, side * s, y, z);
  put(e, ell(0xffffff, 0.1, 0.115, 0.06));
  const pupil = ell(0x151010, 0.05, 0.058, 0.03, side * -0.008, -0.005, 0.05, { out: false });
  put(e, pupil);
  return { e, pupil };
}

export function makeRaja() {
  const skin = 0xc78a5b;
  const c = { name: 'raja', root: new THREE.Group() };
  c.body = grp(c.root, 0, 0.6, 0);
  c.hipY = 0.6;
  const o = { hipX: 0.12, thigh: 0.3, shin: 0.27, thighR: 0.115, shinR: 0.095, pant: 0x2146c9, shinCol: 0x2146c9, shoe: 0xc9892b };
  const L = leg(c.body, 1, o), R = leg(c.body, -1, o);
  c.legL = L.hip; c.shinL = L.knee; c.legR = R.hip; c.shinR = R.knee; c.L1 = o.thigh; c.L2 = o.shin;
  put(c.body, ell(0x2146c9, 0.25, 0.17, 0.22, 0, 0.02, 0));
  c.torso = grp(c.body, 0, 0.05, 0);
  put(c.torso, ell(0x2e55e0, 0.3, 0.32, 0.25, 0, 0.3, 0));                 // chest
  c.belly = put(c.torso, ell(0x2e55e0, 0.29, 0.25, 0.23, 0, 0.12, 0.1));      // pot belly
  put(c.torso, ell(0xb8302b, 0.31, 0.055, 0.265, 0, 0.0, 0.07));              // crimson sash
  put(c.torso, ell(GOLD, 0.075, 0.075, 0.03, 0, 0.0, 0.31));                  // buckle
  for (const [y, r] of [[0.46, 0.215], [0.34, 0.285]]) { const t = mk(G.ring, GOLD, { out: false }); t.scale.set(r, r * 0.9, 0.9); t.rotation.x = Math.PI / 2; put(c.torso, t, 0, y, 0.015); }
  put(c.torso, mk(cap(0.1, 0.08), skin), 0, 0.58, 0.02);                      // neck
  const a = { shX: 0.34, shY: 0.5, shR: 0.12, sleeve: 0x2e55e0, upR: 0.085, upper: 0.2, foreR: 0.07, fore: 0.2, foreCol: skin, cuff: GOLD, skin };
  const AL = arm(c.torso, 1, a), AR = arm(c.torso, -1, a);
  c.armL = AL.sh; c.foreL = AL.elbow; c.handL = AL.hand; c.armR = AR.sh; c.foreR = AR.elbow; c.handR = AR.hand;
  for (const s of [1, -1]) put(c.torso, ell(GOLD, 0.1, 0.05, 0.1, s * 0.34, 0.55, 0));  // shoulder pads

  c.head = grp(c.torso, 0, 0.88, 0.01);
  put(c.head, ell(skin, 0.31, 0.29, 0.29));
  for (const s of [1, -1]) put(c.head, ell(skin, 0.055, 0.08, 0.04, s * 0.3, 0, 0));        // ears
  put(c.head, ell(0xb5744a, 0.09, 0.075, 0.075, 0, -0.03, 0.29));                          // nose
  c.eyeL = eye(c.head, 1, 0.115, 0.08, 0.25); c.eyeR = eye(c.head, -1, 0.115, 0.08, 0.25);
  c.browL = put(c.head, ell(0x120c0a, 0.1, 0.028, 0.03, 0.115, 0.2, 0.26)); c.browR = put(c.head, ell(0x120c0a, 0.1, 0.028, 0.03, -0.115, 0.2, 0.26));
  c.mouth = put(c.head, ell(0x3a0d0d, 0.085, 0.05, 0.04, 0, -0.17, 0.265, { out: false }));
  c.mus = moustache(c.head, 0x120c0a, 1.15, 1); c.mus.position.set(0, -0.1, 0.285);                 // big moustache with curled ends
  // crown
  c.hat = grp(c.head, 0, 0.23, 0);
  const band = mk(G.cyl, GOLD); band.scale.set(0.27, 0.07, 0.27); put(c.hat, band, 0, 0.0, 0);
  const mid = mk(new THREE.CylinderGeometry(0.8, 1, 1, 20), GOLD_HI); mid.scale.set(0.27, 0.15, 0.27); put(c.hat, mid, 0, 0.11, 0);
  const tip = mk(G.cone, GOLD); tip.scale.set(0.11, 0.28, 0.11); put(c.hat, tip, 0, 0.32, 0);
  put(c.hat, ell(0xd8232a, 0.045, 0.045, 0.045, 0, 0.5, 0));
  for (let i = 0; i < 7; i++) {
    const ang = (i / 7) * Math.PI * 2;
    const petal = mk(G.cone, GOLD); petal.scale.set(0.05, 0.16, 0.05);
    put(c.hat, petal, Math.sin(ang) * 0.22, 0.25, Math.cos(ang) * 0.22);
    petal.rotation.set(Math.cos(ang) * 0.25, 0, -Math.sin(ang) * 0.25);
    const gem = ell([0xd8232a, 0x1fa36b, 0x2b6bff][i % 3], 0.036, 0.036, 0.036, Math.sin(ang) * 0.265, 0.01, Math.cos(ang) * 0.265, { out: false });
    c.hat.add(gem);
  }
  c.height = 1.9;
  return c;
}

export function makeMantri() {
  const skin = 0xdea272;
  const c = { name: 'mantri', root: new THREE.Group() };
  c.body = grp(c.root, 0, 0.66, 0);
  c.hipY = 0.66;
  const o = { hipX: 0.085, thigh: 0.34, shin: 0.32, thighR: 0.07, shinR: 0.06, pant: 0xf1dfb0, shoe: 0xb9763a };
  const L = leg(c.body, 1, o), R = leg(c.body, -1, o);
  c.legL = L.hip; c.shinL = L.knee; c.legR = R.hip; c.shinR = R.knee; c.L1 = o.thigh; c.L2 = o.shin;
  c.torso = grp(c.body, 0, 0.05, 0);
  const skirt = mk(new THREE.CylinderGeometry(0.2, 0.3, 0.36, 22), 0xf2a33a); put(c.torso, skirt, 0, -0.04, 0);   // long kurta
  const hem = mk(G.tor, 0xc4372c); hem.scale.set(0.3, 0.3, 0.12); hem.rotation.x = Math.PI / 2; put(c.torso, hem, 0, -0.2, 0);
  put(c.torso, ell(0xf2a33a, 0.23, 0.3, 0.19, 0, 0.3, 0));
  const sash = mk(G.sharp, 0x2a62e8); sash.scale.set(0.1, 0.5, 0.05); sash.rotation.z = -0.5; put(c.torso, sash, 0, 0.3, 0.19);   // blue shoulder sash
  put(c.torso, ell(0xc4372c, 0.25, 0.04, 0.21, 0, 0.1, 0));                                                          // belt
  put(c.torso, mk(cap(0.08, 0.06), skin), 0, 0.58, 0.02);
  const a = { shX: 0.26, shY: 0.5, shR: 0.085, sleeve: 0xc4372c, upR: 0.062, upper: 0.2, foreR: 0.055, fore: 0.2, foreCol: 0xc4372c, cuff: GOLD, skin };
  const AL = arm(c.torso, 1, a), AR = arm(c.torso, -1, a);
  c.armL = AL.sh; c.foreL = AL.elbow; c.handL = AL.hand; c.armR = AR.sh; c.foreR = AR.elbow; c.handR = AR.hand;

  c.head = grp(c.torso, 0, 0.86, 0.01);
  put(c.head, ell(skin, 0.25, 0.29, 0.25));
  for (const s of [1, -1]) put(c.head, ell(skin, 0.05, 0.075, 0.035, s * 0.245, 0, 0));
  put(c.head, ell(0xc9895b, 0.07, 0.1, 0.07, 0, -0.03, 0.245));                          // long nose
  c.eyeL = eye(c.head, 1, 0.095, 0.07, 0.21); c.eyeR = eye(c.head, -1, 0.095, 0.07, 0.21);
  c.browL = put(c.head, ell(0xe9e4da, 0.09, 0.03, 0.03, 0.095, 0.19, 0.22)); c.browR = put(c.head, ell(0xe9e4da, 0.09, 0.03, 0.03, -0.095, 0.19, 0.22));
  c.mouth = put(c.head, ell(0x3a0d0d, 0.06, 0.04, 0.03, 0, -0.19, 0.22, { out: false }));
  c.mus = moustache(c.head, 0xf3f0e8, 1.25, -1); c.mus.position.set(0, -0.12, 0.235);             // long white moustache
  put(c.head, ell(0xf3f0e8, 0.03, 0.07, 0.03, 0, -0.27, 0.19));                              // little goatee
  // tuft of hair, visible when the turban is gone
  c.tuft = grp(c.head, 0, 0.27, 0);
  put(c.tuft, mk(cap(0.018, 0.14), 0x120c0a), 0, 0.09, 0);
  put(c.tuft, ell(0x120c0a, 0.04, 0.04, 0.04, 0, 0.19, 0));
  // turban
  c.hat = grp(c.head, 0, 0.21, 0);
  put(c.hat, ell(0xe0452b, 0.34, 0.2, 0.33, 0, 0.06, 0));
  const w1 = mk(G.tor, 0xf06a2e); w1.scale.set(0.3, 0.3, 0.2); w1.rotation.x = Math.PI / 2 + 0.25; put(c.hat, w1, 0, 0.06, 0);
  const w2 = mk(G.tor, 0xc4372c); w2.scale.set(0.28, 0.28, 0.18); w2.rotation.x = Math.PI / 2 - 0.3; w2.rotation.z = 0.5; put(c.hat, w2, 0, 0.16, 0);
  const band = mk(G.tor, GOLD); band.scale.set(0.3, 0.3, 0.08); band.rotation.x = Math.PI / 2; put(c.hat, band, 0, -0.03, 0);
  put(c.hat, ell(GOLD_HI, 0.06, 0.06, 0.04, 0, 0.0, 0.31));
  put(c.hat, ell(0xd8232a, 0.03, 0.03, 0.03, 0, 0.0, 0.34, { out: false }));
  c.feather = grp(c.hat, 0.05, 0.14, 0.2);
  put(c.feather, ell(0x27b6a4, 0.045, 0.2, 0.025, 0, 0.18, 0));
  c.height = 1.75;
  return c;
}

export function setFace(c, f) {
  const m = f.mouth ?? 0, ang = f.angry ?? 0, wide = f.wide ?? 0;
  c.mouth.scale.y = (c.name === 'raja' ? 0.04 : 0.03) + m * 0.11;
  for (const side of [c.eyeL, c.eyeR]) { side.e.scale.setScalar(1 + wide * 0.35); }
  c.browL.rotation.z = -ang * 0.45 + wide * 0.15;
  c.browR.rotation.z = ang * 0.45 - wide * 0.15;
  c.browL.position.y = c.browR.position.y = (c.name === 'raja' ? 0.2 : 0.19) + wide * 0.045 - ang * 0.02;
}

export function look(c, x, y) {
  for (const e of [c.eyeL, c.eyeR]) e.pupil.position.set(x * 0.03 + (e === c.eyeL ? -0.006 : 0.006), y * 0.03 - 0.004, 0.04);
}

export function resetPose(c) {
  for (const k of ['legL', 'legR', 'shinL', 'shinR', 'armL', 'armR', 'foreL', 'foreR', 'torso', 'head', 'body']) c[k].rotation.set(0, 0, 0);
  c.body.scale.set(1, 1, 1);
  c.body.position.set(0, c.hipY, 0);
  c.torso.position.y = 0.05;
}
