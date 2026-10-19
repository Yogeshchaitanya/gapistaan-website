// Three toy vehicles, all facing +x, ground at y = 0. Wheels are returned so the scene can spin them.
import { THREE, G, mk, ell, put, grp, toon } from './gfx.js';

const CREAM = 0xf6ecd2, BRASS = 0xd9a63a, DARK = 0x1b2323;

const box = (parent, color, w, h, d, x, y, z, o) => {
  const m = mk(o && o.sharp ? G.sharp : G.box, color, o);
  m.scale.set(w, h, d);
  return put(parent, m, x, y, z);
};
const cyl = (parent, color, r, h, x, y, z, rx = 0, rz = 0, o) => {
  const m = mk(G.cyl, color, o);
  m.scale.set(r, h, r);
  m.rotation.set(rx, 0, rz);
  return put(parent, m, x, y, z);
};
// a tube between two points in the x-y plane (z fixed)
const tube = (parent, color, r, ax, ay, bx, by, z = 0) => {
  const len = Math.hypot(bx - ax, by - ay);
  const m = mk(G.cyl, color, { out: true });
  m.scale.set(r, len, r);
  m.position.set((ax + bx) / 2, (ay + by) / 2, z);
  m.rotation.z = Math.atan2(bx - ax, -(by - ay)) + Math.PI;
  parent.add(m);
  return m;
};

function wheel(parent, r, x, y, z, hub = BRASS, spokes = false) {
  const w = grp(parent, x, y, z);
  const spin = grp(w);
  const tire = mk(G.tor, DARK);
  tire.scale.set(r * 0.82, r * 0.82, r * 1.15);
  put(spin, tire);
  const disc = mk(G.cyl, 0x2a3434);
  disc.scale.set(r * 0.78, 0.08, r * 0.78);
  disc.rotation.x = Math.PI / 2;
  put(spin, disc);
  const cap = mk(G.cyl, hub);
  cap.scale.set(r * 0.42, 0.11, r * 0.42);
  cap.rotation.x = Math.PI / 2;
  put(spin, cap);
  // a spoke or two so the turning shows
  for (let i = 0; i < 3; i++) {
    const s = mk(G.sharp, 0xf0d28e, { out: false });
    s.scale.set(r * 1.5, 0.045, 0.125);
    s.rotation.z = (i * Math.PI) / 3;
    put(spin, s, 0, 0, 0);
  }
  return spin;
}

export function makeCar() {
  const g = new THREE.Group();
  const bob = grp(g);
  const body = grp(bob);
  box(body, 0x1b9c8e, 2.1, 0.34, 0.74, 0, 0.32, 0);
  box(body, 0x1b9c8e, 0.8, 0.22, 0.68, 0.7, 0.5, 0);
  box(body, 0x1b9c8e, 0.5, 0.24, 0.68, -0.82, 0.5, 0);
  box(body, BRASS, 2.0, 0.035, 0.02, 0, 0.4, 0.375, { out: false });
  box(body, BRASS, 2.0, 0.035, 0.02, 0, 0.4, -0.375, { out: false });
  box(body, 0x7b3a22, 0.12, 0.34, 0.54, -0.5, 0.66, 0);          // seat back
  box(body, 0x7b3a22, 0.46, 0.12, 0.54, -0.28, 0.5, 0);          // seat
  // windscreen
  for (const s of [1, -1]) box(body, BRASS, 0.04, 0.34, 0.04, 0.42, 0.78, s * 0.3, { sharp: true }).rotation.z = 0.35;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.56), new THREE.MeshBasicMaterial({ color: 0xbff0ea, transparent: true, opacity: 0.38, side: THREE.DoubleSide, depthWrite: false }));
  glass.position.set(0.45, 0.78, 0); glass.rotation.set(0, Math.PI / 2, 0.35); body.add(glass);
  // steering wheel
  const sw = mk(G.tor, 0x2a2a2a); sw.scale.set(0.12, 0.12, 0.12); sw.rotation.y = Math.PI / 2 - 0.4; put(body, sw, 0.22, 0.74, 0);
  // lamps, bumpers, tail pipe
  for (const s of [1, -1]) put(body, ell(0xfff3c4, 0.09, 0.09, 0.09, 1.04, 0.56, s * 0.24, { out: true }));
  box(body, CREAM, 0.1, 0.09, 0.86, 1.1, 0.26, 0);
  box(body, CREAM, 0.1, 0.09, 0.86, -1.1, 0.26, 0);
  cyl(body, DARK, 0.045, 0.2, -1.1, 0.18, 0.22, 0, Math.PI / 2);
  const horn = mk(G.cone, BRASS); horn.scale.set(0.07, 0.2, 0.07); horn.rotation.z = -Math.PI / 2; put(body, horn, 1.0, 0.7, -0.24);
  const wheels = [];
  for (const [x, z] of [[0.68, 0.4], [-0.68, 0.4], [0.68, -0.4], [-0.68, -0.4]]) wheels.push(wheel(body, 0.25, x, 0.25, z));
  return { group: g, bob, body, wheels, seat: { x: -0.32, y: 0.54 }, tail: { x: -1.2, y: 0.2 }, bumper: { x: -1.14, y: 0.3 } };
}

export function makeScooter() {
  const g = new THREE.Group();
  const pitch = grp(g, -0.52, 0.2, 0);           // pivot at the rear axle, so a wheelie tips the whole scooter
  const body = grp(pitch, 0.52, -0.2, 0);
  box(body, 0xee8a3a, 0.95, 0.42, 0.46, -0.38, 0.44, 0);
  box(body, BRASS, 0.85, 0.035, 0.02, -0.38, 0.46, 0.235, { out: false });
  box(body, BRASS, 0.85, 0.035, 0.02, -0.38, 0.46, -0.235, { out: false });
  box(body, 0x3a2417, 0.8, 0.11, 0.34, -0.32, 0.7, 0);          // seat
  box(body, 0x0b5e56, 0.5, 0.06, 0.38, 0.32, 0.2, 0);           // floorboard
  const shield = box(body, 0xee8a3a, 0.1, 0.66, 0.4, 0.66, 0.56, 0); shield.rotation.z = -0.12;
  tube(body, DARK, 0.03, 0.74, 0.9, 0.8, 0.22, 0);
  tube(body, DARK, 0.03, 0.72, 0.92, 0.66, 1.18, 0);
  const bar = cyl(body, DARK, 0.03, 0.62, 0.66, 1.18, 0, Math.PI / 2, 0);
  for (const s of [1, -1]) put(body, ell(0x222222, 0.05, 0.05, 0.08, 0.66, 1.18, s * 0.33));
  put(body, ell(0xfff3c4, 0.1, 0.1, 0.1, 0.82, 1.06, 0));
  put(body, ell(0xd8232a, 0.05, 0.05, 0.05, -0.86, 0.5, 0, { out: false }));
  cyl(body, DARK, 0.04, 0.24, -0.88, 0.26, 0.16, 0, Math.PI / 2);
  const fender = mk(new THREE.TorusGeometry(1, 0.2, 8, 20, Math.PI), 0xee8a3a); fender.scale.set(0.26, 0.26, 0.36); put(body, fender, 0.8, 0.2, 0);
  const wheels = [wheel(body, 0.2, -0.52, 0.2, 0), wheel(body, 0.2, 0.8, 0.2, 0)];
  return { group: g, pitch, body, wheels, seats: [{ x: -0.1, y: 0.74 }, { x: -0.5, y: 0.74 }], tail: { x: -0.95, y: 0.28 } };
}

export function makeRickshaw() {
  const g = new THREE.Group();
  const bob = grp(g);
  const car = grp(bob);
  box(car, 0xd6453d, 1.05, 0.12, 0.64, -0.5, 0.4, 0);                // floor
  box(car, 0xd6453d, 0.78, 0.14, 0.54, -0.55, 0.52, 0);              // cushion
  box(car, 0xd6453d, 0.1, 0.5, 0.56, -0.98, 0.72, 0);                // seat back
  for (const s of [1, -1]) {
    box(car, 0xd6453d, 1.0, 0.3, 0.05, -0.5, 0.56, s * 0.31);
    box(car, BRASS, 0.9, 0.04, 0.02, -0.5, 0.56, s * 0.34, { out: false });
  }
  // hood: a thick curved band, seen from the side as an arch (open at both sides, so the passenger shows)
  const arcShape = (R, r) => { const sh = new THREE.Shape(); sh.absarc(0, 0, R, 0, Math.PI, false); sh.lineTo(-r, 0); sh.absarc(0, 0, r, Math.PI, 0, true); sh.closePath(); return sh; };
  const hoodGeo = new THREE.ExtrudeGeometry(arcShape(0.88, 0.62), { depth: 0.7, bevelEnabled: false, curveSegments: 28 });
  const hood = mk(hoodGeo, 0xf2b84b); hood.position.set(-0.6, 0.7, -0.35); car.add(hood);
  for (const z of [-0.37, 0.37]) { const rim = mk(new THREE.ExtrudeGeometry(arcShape(0.9, 0.86), { depth: 0.04, bevelEnabled: false, curveSegments: 28 }), 0xd6453d, { out: false }); rim.position.set(-0.6, 0.62, z - 0.02); car.add(rim); }
  const wheels = [wheel(car, 0.3, -0.62, 0.3, 0.38, BRASS), wheel(car, 0.3, -0.62, 0.3, -0.38, BRASS)];
  // the cycle in front
  const cyc = grp(bob);
  tube(cyc, DARK, 0.032, 0.0, 0.4, 0.5, 0.48, 0);                    // tow bar
  tube(cyc, DARK, 0.035, 0.5, 0.48, 0.36, 0.9, 0);                    // seat tube
  tube(cyc, DARK, 0.035, 0.5, 0.48, 0.86, 0.95, 0);                   // down tube
  tube(cyc, DARK, 0.035, 0.36, 0.9, 0.86, 0.95, 0);                   // top tube
  tube(cyc, DARK, 0.03, 0.86, 0.95, 1.04, 0.34, 0);                   // fork
  cyl(cyc, DARK, 0.028, 0.5, 0.86, 1.0, 0, Math.PI / 2, 0);
  box(cyc, 0x3a2417, 0.34, 0.08, 0.22, 0.34, 0.93, 0);                // saddle
  const fw = wheel(cyc, 0.34, 1.04, 0.34, 0, BRASS);
  wheels.push(fw);
  const crank = grp(cyc, 0.5, 0.48, 0.0);
  const spin = grp(crank);
  const arm1 = mk(G.sharp, DARK); arm1.scale.set(0.3, 0.04, 0.04); put(spin, arm1, 0, 0, 0);
  const pedals = [];
  for (const s of [1, -1]) {
    const pd = grp(spin, s * 0.14, 0, s * 0.2);
    box(pd, 0x333333, 0.16, 0.035, 0.1, 0, 0, 0, { sharp: true });
    pedals.push(pd);
  }
  put(cyc, ell(BRASS, 0.12, 0.12, 0.03, 0.5, 0.48, 0.1));
  return { group: g, bob, wheels, crank: spin, pedals, crankPos: { x: 0.5, y: 0.48 }, saddle: { x: 0.34, y: 0.93 }, passenger: { x: -0.6, y: 0.52 }, bar: { x: 0.86, y: 1.0 } };
}
