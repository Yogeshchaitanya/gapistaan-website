// Shared look of the 3D stunt lane: toon-shaded materials with a thin dark outline (inverted hull), so everything reads like a cartoon film.
// named imports (not `import *`) so the bundler can drop everything three.js ships that this lane never uses
import { BackSide, BoxGeometry, CanvasTexture, CapsuleGeometry, ConeGeometry, CylinderGeometry, DataTexture, DirectionalLight, DoubleSide, ExtrudeGeometry, Group, HemisphereLight, Matrix4, Mesh, MeshBasicMaterial, MeshToonMaterial, NearestFilter, OctahedronGeometry, OrthographicCamera, PlaneGeometry, RGBAFormat, Scene, ShaderMaterial, Shape, SphereGeometry, Sprite, SpriteMaterial, TorusGeometry, Vector3, WebGLRenderer } from 'three';
const THREE = { BackSide, BoxGeometry, CanvasTexture, CapsuleGeometry, ConeGeometry, CylinderGeometry, DataTexture, DirectionalLight, DoubleSide, ExtrudeGeometry, Group, HemisphereLight, Matrix4, Mesh, MeshBasicMaterial, MeshToonMaterial, NearestFilter, OctahedronGeometry, OrthographicCamera, PlaneGeometry, RGBAFormat, Scene, ShaderMaterial, Shape, SphereGeometry, Sprite, SpriteMaterial, TorusGeometry, Vector3, WebGLRenderer };
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export { THREE };

const steps = new THREE.DataTexture(new Uint8Array([128, 128, 128, 255, 176, 176, 176, 255, 222, 222, 222, 255, 255, 255, 255, 255]), 4, 1, THREE.RGBAFormat);
steps.minFilter = steps.magFilter = THREE.NearestFilter;
steps.needsUpdate = true;

const cache = new Map();
export function toon(color, extra) {
  const key = color + (extra ? JSON.stringify(extra) : '');
  let m = cache.get(key);
  if (!m) cache.set(key, (m = new THREE.MeshToonMaterial({ color, gradientMap: steps, ...(extra || {}) })));
  return m;
}

export const outlineMat = new THREE.ShaderMaterial({
  uniforms: { t: { value: 0.016 } },
  vertexShader: 'uniform float t;void main(){vec3 n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);mv.xyz+=n*t;gl_Position=projectionMatrix*mv;}',
  fragmentShader: 'void main(){gl_FragColor=vec4(.012,.09,.09,1.);}',
  side: THREE.BackSide,
});

// geometries are shared; sizes come from mesh.scale
export const G = {
  sph: new THREE.SphereGeometry(1, 22, 16),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 20, 1),
  cone: new THREE.ConeGeometry(1, 1, 18, 1),
  box: new RoundedBoxGeometry(1, 1, 1, 3, 0.12),
  sharp: new THREE.BoxGeometry(1, 1, 1),
  tor: new THREE.TorusGeometry(1, 0.28, 10, 28),
  ring: new THREE.TorusGeometry(1, 0.045, 8, 32),
};
const capCache = new Map();
export function cap(r, len) {
  const k = r + '_' + len;
  if (!capCache.has(k)) capCache.set(k, new THREE.CapsuleGeometry(r, Math.max(0.001, len), 6, 12));
  return capCache.get(k);
}

// mesh with outline. opts: {out:false} to skip the outline, mat: ready material
export function mk(geo, color, opts) {
  const o = opts || {};
  const mesh = new THREE.Mesh(geo, o.mat || toon(color));
  if (o.out !== false) {
    const ol = new THREE.Mesh(geo, outlineMat);
    ol.userData.outline = true;
    mesh.add(ol);
  }
  return mesh;
}
export function ell(color, sx, sy, sz, x = 0, y = 0, z = 0, opts) {
  const m = mk(G.sph, color, opts);
  m.scale.set(sx, sy, sz);
  m.position.set(x, y, z);
  return m;
}
export function put(parent, obj, x, y, z) {
  if (x !== undefined || y !== undefined || z !== undefined) obj.position.set(x ?? 0, y ?? 0, z ?? 0);
  parent.add(obj);
  return obj;
}
export function grp(parent, x = 0, y = 0, z = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  if (parent) parent.add(g);
  return g;
}
