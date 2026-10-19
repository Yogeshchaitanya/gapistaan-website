// Poses are plain functions of time. Rotation signs for a figure that faces +z: a negative x-rotation swings a limb forward.
import { resetPose, setFace, look } from './chars.js';

const TAU = Math.PI * 2;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// ph: run phase in radians. o: {amp, lean, armMode: 'swing'|'up'|'flap'|'none', knee}
export function run(c, ph, o = {}) {
  resetPose(c);
  const amp = o.amp ?? 1, lean = o.lean ?? 0.22, knee = o.knee ?? 1;
  const s = Math.sin(ph), s2 = Math.sin(ph + Math.PI);
  c.legL.rotation.x = -s * 0.95 * amp;
  c.legR.rotation.x = -s2 * 0.95 * amp;
  c.shinL.rotation.x = Math.max(0, Math.sin(ph + 1.6)) * 1.25 * knee + 0.08;
  c.shinR.rotation.x = Math.max(0, Math.sin(ph + 1.6 + Math.PI)) * 1.25 * knee + 0.08;
  c.body.position.y = c.hipY + Math.abs(Math.cos(ph)) * 0.075 * amp - 0.03;
  c.torso.rotation.x = lean;
  c.torso.rotation.y = s * 0.18;
  c.head.rotation.x = -lean * 0.8 + Math.abs(Math.cos(ph)) * 0.05;
  c.head.rotation.z = s * 0.04;
  const m = o.armMode || 'swing';
  if (m === 'swing') {
    c.armL.rotation.x = s * 1.05 * amp; c.armR.rotation.x = s2 * 1.05 * amp;
    c.foreL.rotation.x = -0.9 - Math.max(0, s) * 0.4; c.foreR.rotation.x = -0.9 - Math.max(0, s2) * 0.4;
  } else if (m === 'panic') {   // both arms thrown up and flapping
    c.armL.rotation.x = -2.5 + Math.sin(ph * 2) * 0.35; c.armR.rotation.x = -2.5 + Math.sin(ph * 2 + 1.5) * 0.35;
    c.armL.rotation.z = -0.35; c.armR.rotation.z = 0.35;
    c.foreL.rotation.x = -0.25 + Math.sin(ph * 2) * 0.4; c.foreR.rotation.x = -0.25 + Math.sin(ph * 2 + 2) * 0.4;
  }
  // the belly and the moustache jiggle against the bounce
  if (c.belly) { const j = Math.cos(ph * 2 + 0.6); c.belly.scale.set(0.29, 0.25 * (1 + j * 0.06), 0.23 * (1 - j * 0.05)); }
  if (c.hat) { c.hat.rotation.z = Math.sin(ph + 0.9) * 0.1; c.hat.position.y = (c.name === 'raja' ? 0.23 : 0.21) + Math.max(0, Math.cos(ph + 0.4)) * 0.025; }
  if (c.feather) c.feather.rotation.z = -0.5 + Math.sin(ph * 1.3) * 0.25;
  if (c.mus) c.mus.rotation.z = Math.sin(ph * 2) * 0.05;
}

export function stand(c) { resetPose(c); }

// seated in a vehicle: legs forward, hips lowered
export function sit(c, o = {}) {
  resetPose(c);
  c.legL.rotation.x = c.legR.rotation.x = -1.45;
  c.shinL.rotation.x = c.shinR.rotation.x = 1.35;
  c.body.position.y = o.hip ?? 0.2;
  c.torso.rotation.x = o.lean ?? 0.1;
}

// two-bone leg IK in the plane of travel. hip and target are in the same local frame as the figure's root; s is the root scale.
export function legIK(c, leg, shin, hx, hy, tx, ty, s) {
  const L1 = c.L1 * s, L2 = c.L2 * s;
  let dx = tx - hx, dy = ty - hy;
  let d = Math.hypot(dx, dy);
  d = clamp(d, 0.05, L1 + L2 - 0.001);
  const td = Math.atan2(dx, -dy);                                   // angle from straight down toward +x
  const A = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const B = Math.acos(clamp((L2 * L2 + d * d - L1 * L1) / (2 * L2 * d), -1, 1));
  const t1 = td + A, t2 = td - B;
  leg.rotation.x = -t1;
  shin.rotation.x = t1 - t2;
}

export { setFace, look, resetPose, clamp, TAU };
