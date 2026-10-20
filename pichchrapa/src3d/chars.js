// The two stars, dressed the way they appear in Raja Ka Baja (both young and clean-shaven, no moustaches):
// Raja: tall gold Ramleela mukut with a black front plate and a blue stone, red angrakha with a blue mirror-work panel,
//       a black stole over both shoulders, pearl strings, saffron dhoti-pants, wheatish skin, slim build, long face, curly hair.
// Mantri: red-saffron safa (turban) with a gold band and a cloth tail, long pink angrakha with gold borders,
//       a white bead mala, cream churidar, fair skin and a slim face.
// They are built from toon-shaded primitives and posed by code, so legs really run, arms really swing and faces can shout.
import { THREE, G, mk, ell, put, grp, cap } from './gfx.js';

const GOLD = 0xe9b43c;
const GOLD_HI = 0xffd86a;
const HAIR = 0x17110d;
const PEARL = 0xf6f1e6;

function leg(parent, side, o) {
  const hip = grp(parent, side * o.hipX, 0, 0);
  put(hip, mk(cap(o.thighR, o.thigh - 2 * o.thighR), o.pant), 0, -o.thigh / 2, 0);
  const knee = grp(hip, 0, -o.thigh, 0);
  put(knee, mk(cap(o.shinR, o.shin - 2 * o.shinR), o.shinCol || o.pant), 0, -o.shin / 2, 0);
  if (o.ankle) put(knee, ell(o.ankle, o.shinR * 1.25, 0.03, o.shinR * 1.25), 0, -o.shin + 0.07, 0);
  const foot = grp(knee, 0, -o.shin + 0.03, 0);
  put(foot, ell(o.shoe, 0.075, 0.055, 0.14, 0, 0, 0.05));
  const toe = mk(G.cone, o.shoe);          // jutti with a curled toe
  toe.scale.set(0.035, 0.11, 0.035);
  toe.rotation.x = -0.75;
  put(foot, toe, 0, 0.03, 0.19);
  return { hip, knee, foot };
}

function arm(parent, side, o) {
  const sh = grp(parent, side * o.shX, o.shY, 0);
  put(sh, ell(o.sleeve, o.shR, o.shR, o.shR));
  put(sh, mk(cap(o.upR, o.upper - 2 * o.upR), o.sleeve), 0, -o.upper / 2, 0);
  if (o.band) put(sh, ell(o.band, o.upR * 1.25, 0.03, o.upR * 1.25), 0, -o.upper + 0.03, 0);
  const elbow = grp(sh, 0, -o.upper, 0);
  put(elbow, mk(cap(o.foreR, o.fore - 2 * o.foreR), o.foreCol), 0, -o.fore / 2, 0);
  if (o.cuff) put(elbow, ell(o.cuff, o.foreR * 1.3, 0.03, o.foreR * 1.3), 0, -o.fore * 0.8, 0);
  const hand = grp(elbow, 0, -o.fore, 0);
  put(hand, ell(o.skin, 0.075, 0.08, 0.075));
  return { sh, elbow, hand };
}

function eye(head, side, s, y, z, k = 1) {
  const e = grp(head, side * s, y, z);
  put(e, ell(0xffffff, 0.09 * k, 0.105 * k, 0.055));
  const pupil = ell(0x151010, 0.046 * k, 0.054 * k, 0.03, side * -0.008, -0.005, 0.05, { out: false });
  put(e, pupil);
  put(pupil, ell(0xffffff, 0.3, 0.3, 0.3, 0.35, 0.4, 0.6, { out: false }));    // catch-light
  return { e, pupil };
}

// a string of beads that hangs in a U across the chest. r: half-width, d: depth of the U, z: how far forward
function mala(parent, color, n, r, d, y, z, size) {
  const g = grp(parent, 0, y, 0);
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * 2 - 1;                   // -1..1
    const x = t * r, yy = -d * (1 - t * t), zz = z * Math.sqrt(1 - t * t * 0.85);
    g.add(ell(color, size, size, size, x, yy, zz, { out: false }));
  }
  return g;
}

// a strip of cloth that hangs from its pivot along -y (stole ends, turban tail). Rotate the pivot to make it flap.
function strip(parent, color, w, len, t, x, y, z, edge) {
  const p = grp(parent, x, y, z);
  const m = mk(G.box, color); m.scale.set(w, len, t); put(p, m, 0, -len / 2, 0);
  if (edge) { const e = mk(G.sharp, edge, { out: false }); e.scale.set(w * 1.02, 0.035, t * 1.1); put(p, e, 0, -len + 0.03, 0); }
  return p;
}

export function makeRaja() {
  const skin = 0xbf8259, skinD = 0xa36a45;
  const RED = 0xd8283a, BLUE = 0x2449c8, SAFFRON = 0xf39a1d, STOLE = 0x1c1d22;
  const c = { name: 'raja', root: new THREE.Group() };
  c.body = grp(c.root, 0, 0.62, 0);
  c.hipY = 0.62;
  const o = { hipX: 0.105, thigh: 0.31, shin: 0.29, thighR: 0.11, shinR: 0.08, pant: SAFFRON, ankle: GOLD, shoe: 0x6b3a1e };
  const L = leg(c.body, 1, o), R = leg(c.body, -1, o);
  c.legL = L.hip; c.shinL = L.knee; c.legR = R.hip; c.shinR = R.knee; c.L1 = o.thigh; c.L2 = o.shin;
  put(c.body, ell(SAFFRON, 0.22, 0.15, 0.19, 0, 0.02, 0));                     // dhoti seat
  c.torso = grp(c.body, 0, 0.05, 0);
  put(c.torso, ell(RED, 0.235, 0.3, 0.19, 0, 0.3, 0));                         // angrakha
  put(c.torso, ell(RED, 0.24, 0.12, 0.2, 0, 0.1, 0));                          // flare over the hips
  put(c.torso, ell(BLUE, 0.15, 0.19, 0.06, 0, 0.3, 0.15));                     // blue mirror-work panel
  for (let i = 0; i < 9; i++) {                                                 // the little mirrors
    const a = (i / 9) * Math.PI * 2;
    c.torso.add(ell(0xe8f1f6, 0.018, 0.018, 0.012, Math.cos(a) * 0.1, 0.3 + Math.sin(a) * 0.13, 0.2, { out: false }));
  }
  c.torso.add(ell(GOLD_HI, 0.03, 0.03, 0.015, 0, 0.3, 0.21, { out: false }));
  put(c.torso, ell(GOLD, 0.245, 0.04, 0.2, 0, 0.04, 0.0));                     // gold kamarbandh
  put(c.torso, mk(cap(0.075, 0.07), skin), 0, 0.58, 0.01);                     // neck
  c.torso.add(mala(c.torso, PEARL, 15, 0.13, 0.13, 0.55, 0.17, 0.022));        // pearl strings
  c.torso.add(mala(c.torso, PEARL, 19, 0.16, 0.22, 0.55, 0.19, 0.022));
  c.torso.add(mala(c.torso, GOLD_HI, 21, 0.18, 0.3, 0.56, 0.2, 0.018));
  // the black stole over both shoulders, its ends hanging down the front
  c.stole = [strip(c.torso, STOLE, 0.12, 0.6, 0.035, 0.165, 0.56, 0.13, GOLD), strip(c.torso, STOLE, 0.12, 0.6, 0.035, -0.165, 0.56, 0.13, GOLD)];
  for (const s of [1, -1]) put(c.torso, ell(STOLE, 0.1, 0.05, 0.13, s * 0.17, 0.56, 0.02));
  const a = { shX: 0.28, shY: 0.5, shR: 0.1, sleeve: RED, band: BLUE, upR: 0.075, upper: 0.21, foreR: 0.06, fore: 0.2, foreCol: skin, cuff: GOLD, skin };
  const AL = arm(c.torso, 1, a), AR = arm(c.torso, -1, a);
  c.armL = AL.sh; c.foreL = AL.elbow; c.handL = AL.hand; c.armR = AR.sh; c.foreR = AR.elbow; c.handR = AR.hand;

  c.head = grp(c.torso, 0, 0.86, 0.01);
  put(c.head, ell(skin, 0.25, 0.3, 0.25));
  put(c.head, ell(skin, 0.19, 0.13, 0.19, 0, -0.18, 0.03));                    // long, narrow jaw
  put(c.head, ell(HAIR, 0.27, 0.25, 0.26, 0, 0.07, -0.05));                    // curly black hair under the crown
  for (const [x, y, z] of [[0.2, -0.02, -0.12], [-0.2, -0.02, -0.12], [0.12, -0.08, -0.2], [-0.12, -0.08, -0.2], [0, -0.06, -0.24]]) c.head.add(ell(HAIR, 0.09, 0.09, 0.09, x, y, z));
  for (const s of [1, -1]) {
    put(c.head, ell(skin, 0.05, 0.075, 0.035, s * 0.26, 0, 0));                // ears
    put(c.head, ell(HAIR, 0.03, 0.08, 0.04, s * 0.24, 0.05, 0.09, { out: false }));  // sideburns
  }
  put(c.head, ell(skinD, 0.055, 0.07, 0.06, 0, -0.04, 0.26));                  // nose
  c.eyeL = eye(c.head, 1, 0.1, 0.07, 0.22); c.eyeR = eye(c.head, -1, 0.1, 0.07, 0.22);
  c.browL = put(c.head, ell(HAIR, 0.085, 0.026, 0.03, 0.1, 0.19, 0.23)); c.browR = put(c.head, ell(HAIR, 0.085, 0.026, 0.03, -0.1, 0.19, 0.23));
  c.mouth = put(c.head, ell(0x3a0d0d, 0.075, 0.05, 0.04, 0, -0.17, 0.23, { out: false }));
  // the mukut: a tall gold crown with a black front plate, white work and a blue stone, gold flaps over the ears
  c.hatY = 0.255;
  c.hat = grp(c.head, 0, c.hatY, 0);
  const band = mk(G.cyl, GOLD); band.scale.set(0.25, 0.08, 0.25); put(c.hat, band, 0, 0.0, 0);
  const tower = mk(new THREE.CylinderGeometry(0.62, 1, 1, 24), GOLD_HI); tower.scale.set(0.235, 0.36, 0.235); put(c.hat, tower, 0, 0.22, 0);
  const ring2 = mk(G.cyl, GOLD); ring2.scale.set(0.2, 0.05, 0.2); put(c.hat, ring2, 0, 0.3, 0);
  const dome = ell(GOLD, 0.16, 0.13, 0.16, 0, 0.42, 0); put(c.hat, dome);
  const tip = mk(G.cone, GOLD_HI); tip.scale.set(0.06, 0.2, 0.06); put(c.hat, tip, 0, 0.6, 0);
  put(c.hat, ell(0xd8232a, 0.035, 0.035, 0.035, 0, 0.71, 0, { out: false }));
  const plate = ell(0x15151a, 0.16, 0.22, 0.05, 0, 0.2, 0.21); put(c.hat, plate);   // front plate
  plate.rotation.x = -0.12;
  for (let i = 0; i < 12; i++) {                                                     // white work around the plate
    const t = (i / 12) * Math.PI * 2;
    c.hat.add(ell(0xffffff, 0.017, 0.017, 0.012, Math.sin(t) * 0.12, 0.2 + Math.cos(t) * 0.17, 0.25 - Math.cos(t) * 0.02, { out: false }));
  }
  put(c.hat, ell(0xffffff, 0.07, 0.07, 0.03, 0, 0.2, 0.25, { out: false }));
  put(c.hat, ell(0x2f8cff, 0.05, 0.05, 0.035, 0, 0.2, 0.27, { out: false }));        // the blue stone
  for (const s of [1, -1]) {
    const flap = ell(GOLD, 0.05, 0.13, 0.08, s * 0.25, -0.1, 0.02); put(c.hat, flap); flap.rotation.z = s * 0.15;
    c.hat.add(ell(0xd8232a, 0.025, 0.025, 0.025, s * 0.27, -0.09, 0.09, { out: false }));
  }
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI * 2 + Math.PI / 6;
    c.hat.add(ell([0xd8232a, 0x1fa36b][i % 2], 0.028, 0.028, 0.028, Math.sin(ang) * 0.255, 0.0, Math.cos(ang) * 0.255, { out: false }));
  }
  c.height = 2.0;
  return c;
}

export function makeMantri() {
  const skin = 0xe3ac80, skinD = 0xcb9064;
  const PINK = 0xd8397f, SAFA = 0xe9502a, SAFA2 = 0xf7802f;
  const c = { name: 'mantri', root: new THREE.Group() };
  c.body = grp(c.root, 0, 0.64, 0);
  c.hipY = 0.64;
  const o = { hipX: 0.085, thigh: 0.33, shin: 0.31, thighR: 0.075, shinR: 0.062, pant: 0xf3e6c4, shoe: 0x8a4a22 };
  const L = leg(c.body, 1, o), R = leg(c.body, -1, o);
  c.legL = L.hip; c.shinL = L.knee; c.legR = R.hip; c.shinR = R.knee; c.L1 = o.thigh; c.L2 = o.shin;
  c.torso = grp(c.body, 0, 0.05, 0);
  const skirt = mk(new THREE.CylinderGeometry(0.21, 0.31, 0.42, 24), PINK); put(c.torso, skirt, 0, -0.08, 0);   // long angrakha
  const hem = mk(G.tor, GOLD); hem.scale.set(0.31, 0.31, 0.09); hem.rotation.x = Math.PI / 2; put(c.torso, hem, 0, -0.28, 0);
  const hem2 = mk(G.tor, SAFA2, { out: false }); hem2.scale.set(0.285, 0.285, 0.06); hem2.rotation.x = Math.PI / 2; put(c.torso, hem2, 0, -0.22, 0);
  put(c.torso, ell(PINK, 0.22, 0.3, 0.18, 0, 0.3, 0));
  const placket = mk(G.sharp, GOLD, { out: false }); placket.scale.set(0.035, 0.62, 0.02); placket.rotation.z = 0.12; put(c.torso, placket, 0.03, 0.12, 0.19);
  put(c.torso, ell(GOLD, 0.225, 0.035, 0.19, 0, 0.12, 0));                                                    // waist band
  put(c.torso, mk(cap(0.075, 0.06), skin), 0, 0.58, 0.02);
  c.torso.add(mala(c.torso, PEARL, 21, 0.14, 0.3, 0.56, 0.18, 0.024));                                         // long white mala
  const a = { shX: 0.25, shY: 0.5, shR: 0.085, sleeve: PINK, upR: 0.062, upper: 0.2, foreR: 0.054, fore: 0.2, foreCol: PINK, cuff: GOLD, skin };
  const AL = arm(c.torso, 1, a), AR = arm(c.torso, -1, a);
  c.armL = AL.sh; c.foreL = AL.elbow; c.handL = AL.hand; c.armR = AR.sh; c.foreR = AR.elbow; c.handR = AR.hand;

  c.head = grp(c.torso, 0, 0.85, 0.01);
  put(c.head, ell(skin, 0.25, 0.29, 0.25));                                     // slim face
  put(c.head, ell(skin, 0.19, 0.12, 0.19, 0, -0.18, 0.03));
  for (const s of [1, -1]) {
    put(c.head, ell(skin, 0.05, 0.072, 0.035, s * 0.25, 0, 0));
    put(c.head, ell(0xef9c86, 0.045, 0.026, 0.02, s * 0.14, -0.08, 0.2, { out: false }));   // cheeks
  }
  put(c.head, ell(skinD, 0.055, 0.07, 0.06, 0, -0.04, 0.25));
  c.eyeL = eye(c.head, 1, 0.1, 0.06, 0.21); c.eyeR = eye(c.head, -1, 0.1, 0.06, 0.21);
  c.browL = put(c.head, ell(HAIR, 0.08, 0.024, 0.03, 0.1, 0.18, 0.22)); c.browR = put(c.head, ell(HAIR, 0.08, 0.024, 0.03, -0.1, 0.18, 0.22));
  c.mouth = put(c.head, ell(0x3a0d0d, 0.065, 0.045, 0.03, 0, -0.18, 0.22, { out: false }));
  // his own black hair, seen when the safa flies off, with one tuft standing up
  put(c.head, ell(HAIR, 0.255, 0.2, 0.255, 0, 0.12, -0.03));
  c.tuft = grp(c.head, 0, 0.29, 0.02);
  put(c.tuft, mk(cap(0.02, 0.1), HAIR), 0, 0.06, 0);
  put(c.tuft, ell(HAIR, 0.035, 0.035, 0.035, 0.02, 0.14, 0));
  // the safa
  c.hatY = 0.225;
  c.hat = grp(c.head, 0, c.hatY, 0);
  put(c.hat, ell(SAFA, 0.33, 0.2, 0.32, 0, 0.07, -0.01));
  const w1 = mk(G.tor, SAFA2); w1.scale.set(0.29, 0.29, 0.18); w1.rotation.x = Math.PI / 2 + 0.22; put(c.hat, w1, 0, 0.05, 0);
  const w2 = mk(G.tor, 0xc93a22); w2.scale.set(0.26, 0.26, 0.16); w2.rotation.x = Math.PI / 2 - 0.28; w2.rotation.z = 0.45; put(c.hat, w2, 0, 0.15, 0);
  const bandG = mk(G.tor, GOLD); bandG.scale.set(0.295, 0.295, 0.07); bandG.rotation.x = Math.PI / 2; put(c.hat, bandG, 0, -0.03, 0);
  put(c.hat, ell(GOLD_HI, 0.055, 0.055, 0.035, 0, 0.02, 0.3));                 // brooch
  put(c.hat, ell(0xd8232a, 0.028, 0.028, 0.028, 0, 0.02, 0.33, { out: false }));
  c.tail = strip(c.hat, SAFA, 0.15, 0.36, 0.04, 0, 0.02, -0.29, GOLD);         // the safa's tail down the back
  c.tail.rotation.x = 0.25;
  c.height = 1.8;
  return c;
}

export function setFace(c, f) {
  const m = f.mouth ?? 0, ang = f.angry ?? 0, wide = f.wide ?? 0;
  c.mouth.scale.y = (c.name === 'raja' ? 0.04 : 0.03) + m * 0.11;
  for (const side of [c.eyeL, c.eyeR]) { side.e.scale.setScalar(1 + wide * 0.3); }
  c.browL.rotation.z = -ang * 0.45 + wide * 0.15;
  c.browR.rotation.z = ang * 0.45 - wide * 0.15;
  c.browL.position.y = c.browR.position.y = (c.name === 'raja' ? 0.19 : 0.18) + wide * 0.045 - ang * 0.02;
}

export function look(c, x, y) {
  for (const e of [c.eyeL, c.eyeR]) e.pupil.position.set(x * 0.03 + (e === c.eyeL ? -0.006 : 0.006), y * 0.03 - 0.004, 0.04);
}

// cloth that trails behind when moving: k 0..1 how hard it streams, t time for the flutter
export function flutter(c, k, t) {
  if (c.stole) c.stole.forEach((s, i) => { const side = i ? -1 : 1; s.rotation.x = -0.12 * k - Math.abs(Math.sin(t * 9 + i * 1.7)) * 0.2 * k; s.rotation.z = side * (k * 0.45 + Math.sin(t * 13 + i * 2) * 0.18 * k); });
  if (c.tail) { c.tail.rotation.x = 0.25 + k * 0.6 + Math.sin(t * 11) * 0.18 * k; c.tail.rotation.z = Math.sin(t * 7) * 0.15 * k; }
}

export function resetPose(c) {
  for (const k of ['legL', 'legR', 'shinL', 'shinR', 'armL', 'armR', 'foreL', 'foreR', 'torso', 'head', 'body']) c[k].rotation.set(0, 0, 0);
  c.body.scale.set(1, 1, 1);
  c.body.position.set(0, c.hipY, 0);
  c.torso.position.y = 0.05;
  flutter(c, 0, 0);
}
