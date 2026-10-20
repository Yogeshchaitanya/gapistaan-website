// Seven short comedy scenes. Each one is built facing +x inside its own group; the engine slides the group across the lane
// and mirrors it (scale.x = -1) for the scenes that run right to left. Local x is "along the way".
import { THREE, ell, put, grp } from './gfx.js';
import { makeRaja, makeMantri, setFace, look, flutter } from './chars.js';
import { run, sit, legIK, resetPose } from './poses.js';
import { makeCar, makeScooter, makeRickshaw } from './vehicles.js';
import { makeTalwar, makeBow, makeArrow, makeScroll, makeMoneyBag, makeJalebi, makeStar } from './props.js';

const TAU = Math.PI * 2;
const YAW = Math.PI / 2 - 0.45;      // three-quarter view: facing the way they travel, turned a little toward the viewer
const RS = 0.62, MS = 0.6;           // build size -> world size
const FREQ = 2.4;                    // run cycles per second
const sm = (a, b, x) => { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); };
const V = new THREE.Vector3();

let blobTex;
function blob(g, w, x = 0) {
  if (!blobTex) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x2 = c.getContext('2d'); const gr = x2.createRadialGradient(32, 32, 2, 32, 32, 31);
    gr.addColorStop(0, 'rgba(0,0,0,.65)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); x2.fillStyle = gr; x2.fillRect(0, 0, 64, 64);
    blobTex = new THREE.CanvasTexture(c);
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.006, 0.05); m.scale.set(w, w * 0.42, 1); g.add(m);
  return m;
}
function actor(g, c, s, lx, ly = 0) {
  c.root.scale.setScalar(s); c.root.position.set(lx, ly, 0); c.root.rotation.y = YAW; g.add(c.root); return c;
}
function newScene(ctx, dir, rear, front, speed) {
  const g = new THREE.Group(); g.visible = false; ctx.scene.add(g);
  return { g, dir, rear, front, speed, wx: (lx) => g.position.x + dir * lx };
}
function dust(ctx, S, st, T, lx, every = 0.1) {
  if (T - (st.t ?? -1) > every) { st.t = T; ctx.fx.puff(S.wx(lx), 0.06, 0.12, { vx: -S.dir * 0.5, vy: 0.22, s0: 0.03, s1: 0.13, life: 0.38, a: 0.34 }); }
}
function sweat(ctx, S, c, st, T, every = 0.14) {
  if (T - (st.s ?? -1) > every) {
    st.s = T; c.head.getWorldPosition(V);
    ctx.fx.drop(V.x, V.y + 0.12, V.z, (Math.random() - 0.5) * 1.2 - S.dir * 0.5, 1 + Math.random() * 0.8);
  }
}
const shout = (T, k = 15) => 0.55 + 0.4 * Math.sin(T * k);

// ---------------------------------------------------------------- 1. Raja waves his talwar and chases the Mantri
function swordChase(ctx) {
  const S = newScene(ctx, 1, 1.0, 3.2, 2.7), g = S.g;
  const R = actor(g, makeRaja(), RS, 0.2), M = actor(g, makeMantri(), MS, 2.2);
  const sword = makeTalwar(); sword.scale.setScalar(1.6); R.handR.add(sword);
  blob(g, 0.8, 0.2); const bm = blob(g, 0.7, 2.2); void bm;
  const st = { r: {}, m: {} };
  S.update = (T, dt) => {
    const ph = T * FREQ * TAU;
    R.root.position.x = 0.2 + 0.35 * Math.sin(T * 1.3);
    run(R, ph, { armMode: 'none', lean: 0.3, amp: 1.05 });
    R.armL.rotation.x = Math.sin(ph) * 1.0; R.foreL.rotation.x = -0.9;
    R.armR.rotation.x = -2.6 + Math.sin(T * 9) * 0.55; R.armR.rotation.z = -0.15; R.foreR.rotation.x = -0.4;
    setFace(R, { angry: 1, mouth: shout(T) }); look(R, 1, 0);
    run(M, ph + 1.3, { armMode: 'panic', lean: 0.32, amp: 1.15 });
    M.head.rotation.y = -2.2 + Math.sin(T * 6) * 0.15;
    setFace(M, { wide: 1, mouth: 0.9 }); look(M, -1, 0);
    dust(ctx, S, st.r, T, R.root.position.x - 0.15); dust(ctx, S, st.m, T + 0.05, 2.0);
    sweat(ctx, S, M, st, T);
  };
  return S;
}

// ---------------------------------------------------------------- 2. Raja flees by car, the Mantri hangs on the bumper like a flag
function carFlee(ctx) {
  const S = newScene(ctx, -1, 2.6, 1.4, 4.2), g = S.g;
  const car = makeCar(); g.add(car.group); blob(g, 2.4, -0.05);
  const R = makeRaja(); R.root.scale.setScalar(RS); R.root.rotation.y = YAW; sit(R, { hip: 0.2 });
  R.root.position.set(car.seat.x, car.seat.y - 0.2 * RS, 0); car.body.add(R.root);
  const hang = grp(car.body, car.bumper.x, car.bumper.y + 0.05, 0);
  const M = makeMantri(); M.root.scale.setScalar(MS); hang.add(M.root); M.root.position.set(0, -0.97, 0.02);
  const st = {};
  S.update = (T, dt) => {
    const bump = Math.sin(T * 31) * 0.012 + Math.sin(T * 6.5) * 0.02;
    car.bob.position.y = Math.max(0, bump);
    car.bob.rotation.z = Math.sin(T * 6.5 + 1) * 0.012;
    const spin = -(T * S.speed) / 0.25; for (const w of car.wheels) w.rotation.z = spin;
    sit(R, { hip: 0.2, lean: 0.12 });
    R.armL.rotation.x = -1.15; R.foreL.rotation.x = -0.4; R.armR.rotation.x = -1.15; R.foreR.rotation.x = -0.4;
    R.armR.rotation.x += Math.max(0, Math.sin(T * 5.5)) * -0.5;    // honks
    R.head.rotation.z = Math.sin(T * 8) * 0.06;
    setFace(R, { angry: 0.2, mouth: 0.6 + 0.35 * Math.sin(T * 11), wide: 0.2 });
    R.hat.rotation.z = -0.3 + Math.sin(T * 17) * 0.08; flutter(R, 1, T);
    // the Mantri: arms up on the bumper, body streaming out behind
    resetPose(M);
    hang.rotation.z = -Math.PI / 2 + Math.sin(T * 13) * 0.22 + 0.15;
    M.armL.rotation.x = M.armR.rotation.x = Math.PI - 0.08; M.armL.rotation.z = 0.08; M.armR.rotation.z = -0.08;
    M.legL.rotation.x = Math.sin(T * 15) * 0.7; M.legR.rotation.x = -Math.sin(T * 15) * 0.7;
    M.shinL.rotation.x = 0.5 + Math.sin(T * 15 + 1) * 0.4; M.shinR.rotation.x = 0.5 - Math.sin(T * 15 + 1) * 0.4;
    M.head.rotation.x = -0.3; M.hat.rotation.z = 0.5 + Math.sin(T * 20) * 0.15; flutter(M, 1.2, T);
    setFace(M, { wide: 1, mouth: 1 }); look(M, 0, 0.3);
    if (T - (st.t ?? -1) > 0.05) { st.t = T; ctx.fx.puff(S.wx(car.tail.x - 0.05), 0.2, 0.1, { vx: -S.dir * 0.9, vy: 0.35, s0: 0.04, s1: 0.2, life: 0.55, a: 0.38, color: 0xc9d4d4 }); }
  };
  return S;
}

// ---------------------------------------------------------------- 3. The Mantri chases Raja for the tax; coins spill from the money bag
function taxChase(ctx) {
  const S = newScene(ctx, 1, 1.0, 3.4, 2.7), g = S.g;
  const M = actor(g, makeMantri(), MS, 0.2), R = actor(g, makeRaja(), RS, 2.3);
  const scroll = makeScroll(); scroll.scale.setScalar(1.8); M.handR.add(scroll);
  const bag = makeMoneyBag(); bag.scale.setScalar(1.7); R.handR.add(bag);
  blob(g, 0.7, 0.2); blob(g, 0.8, 2.3);
  const st = { r: {}, m: {} };
  S.update = (T, dt) => {
    const ph = T * FREQ * TAU;
    run(R, ph + 0.5, { armMode: 'none', lean: 0.3, amp: 1.1 });
    R.armL.rotation.x = -2.3 + Math.sin(T * 12) * 0.4; R.armL.rotation.z = -0.3; R.foreL.rotation.x = -0.3;
    R.armR.rotation.x = -1.0 + Math.sin(ph) * 0.45; R.foreR.rotation.x = -0.5;
    R.head.rotation.y = -2.1 + Math.sin(T * 5) * 0.15;
    setFace(R, { wide: 1, mouth: 0.85 }); look(R, -1, 0);
    run(M, ph, { armMode: 'none', lean: 0.32, amp: 1.05 });
    M.armR.rotation.x = -2.6 + Math.sin(T * 8) * 0.45; M.foreR.rotation.x = -0.4; M.armR.rotation.z = -0.1;
    M.armL.rotation.x = -1.55; M.foreL.rotation.x = -0.1;
    scroll.userData.bill.rotation.y = Math.sin(T * 10) * 0.25; scroll.rotation.z = 0.5;
    setFace(M, { angry: 1, mouth: shout(T, 13) }); look(M, 1, 0);
    dust(ctx, S, st.r, T, 2.15); dust(ctx, S, st.m, T + 0.04, 0.05);
    sweat(ctx, S, R, st, T);
    if (T - (st.c ?? -1) > 0.1) {
      st.c = T; bag.getWorldPosition(V);
      ctx.fx.coin(V.x, V.y - 0.05, V.z, -S.dir * (0.5 + Math.random() * 1.2), 1.3 + Math.random() * 1.2);
    }
  };
  return S;
}

// ---------------------------------------------------------------- 4. Archery: the third arrow carries off the Mantri's turban
function archery(ctx) {
  const S = newScene(ctx, -1, 1.0, 3.6, 2.5), g = S.g;
  const R = actor(g, makeRaja(), RS, 0.2), M = actor(g, makeMantri(), MS, 2.7);
  const bow = makeBow(); bow.scale.setScalar(1.5);
  const ex = new THREE.Vector3(0, -1, 0), ey = new THREE.Vector3(0, 0, 1), ez = new THREE.Vector3(-1, 0, 0);
  bow.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(ex, ey, ez)); bow.position.set(0, 0.42 * 1.5, 0);
  R.handL.add(bow);
  blob(g, 0.8, 0.2); blob(g, 0.7, 2.7);
  const arrows = []; for (let i = 0; i < 4; i++) { const a = makeArrow(); a.scale.setScalar(1.15); a.visible = false; g.add(a); arrows.push(a); }
  const shots = [{ t: 0.9, hit: false, up: 0.5 }, { t: 2.0, hit: false, up: 0.28 }, { t: 3.1, hit: true, up: 0 }, { t: 4.9, hit: false, up: 0.45 }];
  const FLIGHT = 0.5, HAT_Y = 1.1;
  const st = { r: {}, m: {} };
  let hatOff = false;
  const reset = () => { for (const a of arrows) a.visible = false; if (hatOff) { M.head.add(M.hat); M.hat.position.set(0, M.hatY, 0); M.hat.rotation.set(0, 0, 0); M.hat.scale.set(1, 1, 1); hatOff = false; } };
  S.enter = reset; S.exit = reset;
  S.update = (T, dt) => {
    const ph = T * FREQ * TAU;
    // the bow arm and the drawing arm
    let draw = 0;
    for (const s of shots) draw = Math.max(draw, sm(s.t - 0.45, s.t - 0.05, T) * (1 - sm(s.t, s.t + 0.07, T)));
    run(R, ph, { armMode: 'none', lean: 0.2, amp: 1.0 });
    R.armL.rotation.x = -1.5; R.foreL.rotation.x = 0; R.armL.rotation.z = -0.1;
    R.armR.rotation.x = -1.35 - 0.2 * draw; R.foreR.rotation.x = 0.15 + 1.75 * draw; R.armR.rotation.z = 0.2;
    R.head.rotation.y = -0.15; R.head.rotation.x = -0.1;
    setFace(R, { angry: 0.9, mouth: 0.15 + (1 - draw) * 0.35 * Math.max(0, Math.sin(T * 9)) }); look(R, 1, 0);
    // arrows
    let n = 0, tip = null;
    shots.forEach((s, i) => {
      const a = arrows[i]; const u = (T - s.t) / FLIGHT;
      if (u < 0 || u > 3.2) { a.visible = false; return; }
      if (u === 0 || !s.p0) { bow.getWorldPosition(V); g.worldToLocal(V); s.p0 = V.clone(); s.p0.x += 0.15; s.p0.y = 0.86; }
      const tx = 2.7, ty = HAT_Y + s.up;
      const vx = (tx - s.p0.x) / FLIGHT, vy = (ty - s.p0.y) / FLIGHT;
      const uu = Math.min(u, 3.2);
      const arc = 0.14 * Math.sin(Math.PI * Math.min(uu, 1));
      a.position.set(s.p0.x + vx * FLIGHT * uu, s.p0.y + vy * FLIGHT * uu + (uu <= 1 ? arc : 0), 0.12);
      a.rotation.z = Math.atan2(vy + (uu <= 1 ? 0.14 * Math.PI * Math.cos(Math.PI * uu) / FLIGHT : 0), vx);
      a.visible = true;
      if (s.hit && u >= 1) tip = a;
    });
    // the hit: the turban goes along on the arrow
    const hitT = shots[2].t + FLIGHT;
    if (T >= hitT && !hatOff) { g.attach(M.hat); hatOff = true; }
    if (T < hitT && hatOff) reset();
    if (hatOff && tip) { M.hat.position.copy(tip.position); M.hat.position.x += 0.1; M.hat.rotation.z += 11 * dt; M.hat.rotation.x += 6 * dt; }
    // the Mantri runs scared, then grabs his bald head
    const after = sm(hitT, hitT + 0.1, T);
    run(M, ph + 1.1, { armMode: 'panic', lean: 0.3, amp: 1.1 });
    if (after > 0) {
      M.armR.rotation.x = -2.6; M.armR.rotation.z = 0.2; M.foreR.rotation.x = -1.9;
      M.armL.rotation.x = -0.6 + Math.sin(T * 14) * 0.5; M.foreL.rotation.x = -0.5; M.armL.rotation.z = -0.2;
      M.head.rotation.x = 0.15;
    }
    M.head.rotation.y = -2.2 + Math.sin(T * 7) * 0.12;
    setFace(M, { wide: 1, mouth: after > 0 ? 1 : 0.7, angry: 0 }); look(M, -1, 0.1);
    M.tuft.rotation.z = Math.sin(T * 12) * 0.5;
    dust(ctx, S, st.r, T, 0.05); dust(ctx, S, st.m, T + 0.04, 2.6);
    sweat(ctx, S, M, st, T, 0.1);
    void n;
  };
  return S;
}

// ---------------------------------------------------------------- 5. Scooter wheelie: Raja drives, the Mantri holds on for dear life
function scooterWheelie(ctx) {
  const S = newScene(ctx, 1, 1.4, 2.0, 4.0), g = S.g;
  const sc = makeScooter(); g.add(sc.group); blob(g, 1.8, 0.0);
  const R = makeRaja(); R.root.scale.setScalar(RS); R.root.rotation.y = YAW; sit(R);
  R.root.position.set(sc.seats[0].x + 0.05, sc.seats[0].y - 0.2 * RS, 0); sc.body.add(R.root);
  const M = makeMantri(); M.root.scale.setScalar(MS); M.root.rotation.y = YAW; sit(M);
  M.root.position.set(sc.seats[1].x - 0.02, sc.seats[1].y - 0.2 * MS, 0); sc.body.add(M.root);
  const st = {};
  S.update = (T, dt) => {
    const lift = sm(0.5, 1.4, T) * (0.36 + 0.07 * Math.sin(T * 3.1));
    sc.pitch.rotation.z = lift;
    sc.group.position.y = 0;
    const spin = -(T * S.speed) / 0.2; for (const w of sc.wheels) w.rotation.z = spin;
    sc.body.position.y = -0.2 + Math.sin(T * 24) * 0.01;
    sit(R, { lean: -0.05 - lift * 0.1 });
    R.armL.rotation.x = R.armR.rotation.x = -1.0; R.foreL.rotation.x = R.foreR.rotation.x = -0.6;
    R.hat.rotation.z = -0.35 + Math.sin(T * 17) * 0.08; flutter(R, 1, T);
    setFace(R, { angry: 0, mouth: 0.7 + 0.25 * Math.sin(T * 9), wide: 0.1 }); look(R, 1, 0);
    sit(M, { lean: 0.02 });
    M.armL.rotation.x = M.armR.rotation.x = -1.35; M.foreL.rotation.x = M.foreR.rotation.x = -0.9; M.armL.rotation.z = 0.25; M.armR.rotation.z = -0.25;
    M.hat.rotation.z = -0.45 + Math.sin(T * 19) * 0.1; flutter(M, 1.1, T);
    M.head.rotation.x = -0.15;
    setFace(M, { wide: 1, mouth: 1 }); look(M, 0, 0.1);
    if (T - (st.t ?? -1) > 0.05) { st.t = T; ctx.fx.puff(S.wx(-1.1), 0.22 + lift * 0.3, 0.1, { vx: -S.dir * 0.8, vy: 0.3, s0: 0.04, s1: 0.2, life: 0.5, a: 0.36, color: 0xc7d0d0 }); }
    if (lift < 0.3) dust(ctx, S, st, T, -0.9, 0.08);
  };
  return S;
}

// ---------------------------------------------------------------- 6. Rickshaw: Raja dangles a jalebi in front of the pedalling Mantri
function rickshawBait(ctx) {
  const S = newScene(ctx, -1, 1.8, 2.4, 3.2), g = S.g;
  const rk = makeRickshaw(); g.add(rk.group); blob(g, 2.6, 0.1);
  const R = makeRaja(); R.root.scale.setScalar(RS); R.root.rotation.y = YAW; sit(R);
  R.root.position.set(rk.passenger.x, rk.passenger.y - 0.2 * RS, 0); rk.bob.add(R.root);
  const M = makeMantri(); M.root.scale.setScalar(MS); M.root.rotation.y = YAW; rk.bob.add(M.root);
  const HIP_Y = 0.78;
  M.root.position.set(0.4, HIP_Y - M.hipY * MS, 0);
  // the stick with the jalebi hanging from it
  const stick = new THREE.Group(); rk.bob.add(stick); stick.position.set(-0.28, 1.0, 0.1);
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.7, 8), new THREE.MeshBasicMaterial({ color: 0x7a4a1f }));
  sh.position.set(0.82, 0.3, 0); sh.rotation.z = -1.2; stick.add(sh);
  const sway = grp(stick, 1.62, 0.64, 0);
  const string = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.34, 4), new THREE.MeshBasicMaterial({ color: 0xf6ecd2 }));
  string.position.y = -0.17; sway.add(string);
  const jal = makeJalebi(); jal.position.y = -0.4; sway.add(jal);
  const st = {};
  S.update = (T, dt) => {
    rk.bob.position.y = Math.abs(Math.sin(T * 7)) * 0.012;
    const th = T * 7.5;
    rk.crank.rotation.z = -th;
    const spin = -(T * S.speed) / 0.3; for (const w of rk.wheels) w.rotation.z = spin;
    // pedalling Mantri
    resetPose(M);
    M.root.position.y = HIP_Y - M.hipY * MS + Math.abs(Math.sin(th)) * 0.02;
    M.torso.rotation.x = 0.5; M.head.rotation.x = -0.55;
    const cx = rk.crankPos.x, cy = rk.crankPos.y;
    const hx = M.root.position.x, hy = M.root.position.y + M.hipY * MS;
    const pr = { x: cx + 0.14 * Math.cos(th), y: cy - 0.14 * Math.sin(th) }, pl = { x: cx - 0.14 * Math.cos(th), y: cy + 0.14 * Math.sin(th) };
    legIK(M, M.legR, M.shinR, hx, hy, pr.x, pr.y + 0.04, MS); legIK(M, M.legL, M.shinL, hx, hy, pl.x, pl.y + 0.04, MS);
    M.armL.rotation.x = M.armR.rotation.x = -1.7; M.foreL.rotation.x = M.foreR.rotation.x = -0.15;
    M.armL.rotation.z = 0.05; M.armR.rotation.z = -0.05;
    setFace(M, { wide: 0.6, mouth: 0.6 + 0.3 * Math.sin(T * 12) }); look(M, 1, 1);
    // Raja leans back, holds the stick and flicks it
    sit(R, { lean: -0.12 });
    R.armR.rotation.x = -1.75 + Math.sin(T * 4) * 0.12; R.foreR.rotation.x = -0.5; R.armR.rotation.z = 0.1;
    R.armL.rotation.x = -0.4; R.foreL.rotation.x = -1.2; R.armL.rotation.z = -0.3;      // arm resting on the hood
    setFace(R, { angry: 0, mouth: 0.25 + 0.15 * Math.max(0, Math.sin(T * 3)), wide: 0 }); look(R, 1, 0);
    R.head.rotation.z = 0.08;
    sway.rotation.z = 0.28 * Math.sin(T * 5.2);
    jal.rotation.y = T * 3;
    sweat(ctx, S, M, st, T, 0.07);
    if (T - (st.d ?? -1) > 0.12) { st.d = T; ctx.fx.puff(S.wx(-0.2), 0.05, 0.3, { vx: -S.dir * 0.4, vy: 0.2, s0: 0.05, s1: 0.2, life: 0.4, a: 0.45 }); }
  };
  return S;
}

// ---------------------------------------------------------------- 7. Somersaults, jumps and dizzy stars
function flips(ctx) {
  const S = newScene(ctx, 1, 0.8, 2.6, 2.6), g = S.g;
  const M = actor(g, makeMantri(), MS, 0.3), R = actor(g, makeRaja(), RS, 1.9);
  const bm = blob(g, 0.7, 0.3), br = blob(g, 0.8, 1.9);
  const mkStars = (c, y) => { const grpS = new THREE.Group(); c.root.add(grpS); grpS.position.y = y; const stars = []; for (let i = 0; i < 4; i++) { const s = makeStar(i % 2 ? 0xffe14a : 0xffffff); s.scale.multiplyScalar(2.2); grpS.add(s); stars.push(s); } grpS.visible = false; return { grpS, stars }; };
  const sM = mkStars(M, 2.2), sR = mkStars(R, 2.35);
  const CYC = 2.3;
  const st = { r: {}, m: {} };
  const one = (c, S2, T, off, kind, bl, lx) => {
    const tau = ((T + off) % CYC + CYC) % CYC;
    const ph = T * FREQ * TAU + off;
    let airY = 0, rotX = 0, rotY = 0, squash = 0, tuck = 0, dizzy = 0, running = true;
    if (tau < 0.7) { /* run */ }
    else if (tau < 0.9) { squash = sm(0.7, 0.9, tau); running = false; }
    else if (tau < 1.6) {
      const u = (tau - 0.9) / 0.7; running = false;
      airY = 4 * (kind === 'flip' ? 0.55 : 0.75) * u * (1 - u);
      if (kind === 'flip') rotX = u * TAU; else rotY = u * TAU;
      tuck = Math.sin(Math.PI * u);
    } else if (tau < 1.72) { squash = 1 - sm(1.6, 1.72, tau) * 0.4; running = false; }
    else if (tau < 2.3) { dizzy = 1 - sm(2.0, 2.3, tau); running = false; if (dizzy < 0.01) running = true; }
    if (running) run(c, ph, { amp: 1.0, lean: 0.25 });
    else {
      resetPose(c);
      c.legL.rotation.x = -0.4 - tuck * 1.3; c.legR.rotation.x = -0.4 - tuck * 1.3;
      c.shinL.rotation.x = 0.5 + tuck * 1.5; c.shinR.rotation.x = 0.5 + tuck * 1.5;
      c.armL.rotation.x = c.armR.rotation.x = -1.2 - tuck * 0.8 + squash * 0.6; c.foreL.rotation.x = c.foreR.rotation.x = -0.9 - tuck * 0.7;
      c.torso.rotation.x = 0.15 + tuck * 0.6 + squash * 0.35;
      if (dizzy > 0) { c.torso.rotation.z = Math.sin(T * 10) * 0.15 * dizzy; c.head.rotation.z = Math.sin(T * 8) * 0.25 * dizzy; c.legL.rotation.x = Math.sin(T * 9) * 0.3 * dizzy; c.armL.rotation.z = -0.6; c.armR.rotation.z = 0.6; c.armL.rotation.x = -0.4; c.armR.rotation.x = -0.4; }
    }
    c.body.position.y = c.hipY - squash * 0.2 + airY / c.root.scale.x;
    c.body.rotation.x = rotX;
    c.root.rotation.y = YAW + rotY;
    c.body.scale.set(1 + squash * 0.22, 1 - squash * 0.26, 1 + squash * 0.22);
    setFace(c, { wide: running ? 0 : 1, mouth: running ? 0.2 : (dizzy > 0 ? 0.7 : 0.8), angry: 0 });
    bl.scale.setScalar(Math.max(0.35, 1 - airY * 1.0) * (c.name === 'raja' ? 0.8 : 0.7)); bl.scale.y *= 0.42;
    const sx = kind === 'flip' ? sR : sM; const sP = c.name === 'raja' ? sR : sM;
    sP.grpS.visible = dizzy > 0.02;
    if (sP.grpS.visible) sP.stars.forEach((s, i) => { const a = T * 6 + i * (TAU / 4); s.position.set(Math.cos(a) * 0.38, Math.sin(a * 2) * 0.03, Math.sin(a) * 0.38); s.rotation.y = a; });
    void sx;
    if (running) dust(ctx, S, S2, T + off * 0.1, lx - 0.05);
    else if (tau >= 1.6 && tau < 1.72 && (S2.l ?? -9) < T - 0.5) { S2.l = T; for (let i = 0; i < 5; i++) ctx.fx.puff(S.wx(lx) + (i - 2) * 0.1, 0.06, 0.1, { vx: (i - 2) * 0.35, vy: 0.2, s0: 0.06, s1: 0.26, life: 0.5, a: 0.55 }); }
  };
  S.update = (T, dt) => {
    one(M, st.m, T, 1.2, 'jump', bm, 0.3);
    one(R, st.r, T, 0, 'flip', br, 1.9);
  };
  return S;
}

export function buildScenes(ctx) {
  return [swordChase(ctx), carFlee(ctx), taxChase(ctx), archery(ctx), scooterWheelie(ctx), rickshawBait(ctx), flips(ctx)];
}
