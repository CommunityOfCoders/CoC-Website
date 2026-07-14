import * as THREE from 'three';

/**
 * Procedural 3D glass-particle field with compression-merge data.
 *
 * The clean mark (two crescent lunes + O ring, traced in logo-paths.ts) is
 * described analytically here:
 *   - crescent 1 = inside circle (185,160,r100) AND outside circle (239,167,r112)
 *   - crescent 2 = the same test on the point rotated 180° about (200,200)
 *   - O ring     = between ellipses (200,200, 30×34) and (200,200, 13×16)
 *
 * A fine jittered grid samples that region; every hit becomes one particle
 * slot. Slots share 12 template geometries (irregular beveled extrusions) so
 * the whole cloud renders as 12 InstancedMesh draw calls, with all motion
 * computed parametrically per frame (no per-particle tween objects).
 *
 * Each slot carries its own choreography, all seeded and deterministic:
 *   spawn      far outside, 360° around the mark, at random depth
 *   flight     cubic-bezier(0.25,0.05,0.25,1) — slow start, silky ease-out,
 *              with a gentle sideways/depth arc; rim lands ~1.2s, core ~4s
 *   rotation   slow quaternion tumble (~0.5–1.5 turns) decelerating to rest
 *   compress   a merge target pulled toward the nearest point on the mark's
 *              boundary and blended onto a subtle 4-unit lattice, plus a
 *              shrink factor (0.3–0.5) and a small decaying residual spin —
 *              Phase 2 condenses the cloud onto the logo outline
 *
 * Scene space: logo coords (0..400, y down) → scene (x−200, 200−y), so the
 * mark is centered at the origin, 280 units tall, facing +z.
 */

export interface ParticleSlot {
  template: number;
  scale: number;
  target: THREE.Vector3;
  spawn: THREE.Vector3;
  /** unit vector for the flight's sideways arc */
  arcDir: THREE.Vector3;
  arcAmp: number;
  start: number;
  arrival: number;
  axis: THREE.Vector3;
  angle: number;
  /** compression-merge resting point (edge-pulled + grid-blended) */
  compress: THREE.Vector3;
  /** shrink factor at full compression */
  compressScale: number;
  /** small residual spin during compression (radians) */
  spin: number;
}

export interface ParticleField {
  templates: THREE.BufferGeometry[];
  slots: ParticleSlot[];
  /** when the last particle locks in (seconds from assembly start) */
  assembleEnd: number;
}

const GRID = 72; // 400/72 ≈ 5.6-unit cells → ~880 particles
const TEMPLATE_COUNT = 12;
const SEED = 424243;

/** how far each particle pulls toward the boundary during compression */
const EDGE_PULL = 0.55;
/** lattice pitch and blend for the subtle grid snap */
const SNAP_GRID = 4;
const SNAP_BLEND = 0.35;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** cubic-bezier easing with x1 = x2 = 0.25 (Newton-solved x → param t). */
function makeEase(y1: number, y2: number) {
  const cy = 3 * y1;
  const by = 3 * (y2 - 2 * y1);
  const ay = 1 - cy - by;
  return (p: number) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let t = p;
    for (let i = 0; i < 8; i++) {
      const x = ((t - 0.75) * t + 0.75) * t - p; // x-poly for x1=x2=0.25
      const dx = (3 * t - 1.5) * t + 0.75;
      if (Math.abs(x) < 1e-5 || dx === 0) break;
      t -= x / dx;
    }
    return ((ay * t + by) * t + cy) * t;
  };
}

/** Inbound particle flight: cubic-bezier(0.25, 0.05, 0.25, 1). */
export const flightEase = makeEase(0.05, 1);
/** Compression / corner glide: cubic-bezier(0.25, 0.1, 0.25, 1). */
export const glideEase = makeEase(0.1, 1);

/* ── analytic mark geometry (logo coords) ── */

const CO = { x: 185, y: 160, r: 100 };
const CI = { x: 239, y: 167, r: 112 };

const inLune = (x: number, y: number) => {
  const doSq = (x - CO.x) ** 2 + (y - CO.y) ** 2;
  if (doSq > CO.r * CO.r) return false;
  const diSq = (x - CI.x) ** 2 + (y - CI.y) ** 2;
  return diSq >= CI.r * CI.r;
};

const inRing = (x: number, y: number) => {
  const dx = x - 200;
  const dy = y - 200;
  const outer = (dx / 30) ** 2 + (dy / 34) ** 2;
  if (outer > 1) return false;
  const inner = (dx / 13) ** 2 + (dy / 16) ** 2;
  return inner >= 1;
};

const inMark = (x: number, y: number) =>
  inLune(x, y) || inLune(400 - x, 400 - y) || inRing(x, y);

/** nearest point on the lune's boundary (outer or inner circle, whichever is closer) */
function luneEdge(x: number, y: number): [number, number] {
  const dOutLen = Math.hypot(x - CO.x, y - CO.y) || 1;
  const dInLen = Math.hypot(x - CI.x, y - CI.y) || 1;
  const gapOut = CO.r - dOutLen; // distance to outer arc
  const gapIn = dInLen - CI.r; // distance to inner arc
  if (gapOut < gapIn) {
    return [CO.x + ((x - CO.x) / dOutLen) * CO.r, CO.y + ((y - CO.y) / dOutLen) * CO.r];
  }
  return [CI.x + ((x - CI.x) / dInLen) * CI.r, CI.y + ((y - CI.y) / dInLen) * CI.r];
}

/** nearest point on the O ring's boundary (approximate ellipse projection) */
function ringEdge(x: number, y: number): [number, number] {
  const dx = x - 200;
  const dy = y - 200;
  const mOut = Math.hypot(dx / 30, dy / 34) || 1e-6;
  const mIn = Math.hypot(dx / 13, dy / 16) || 1e-6;
  const gapOut = (1 - mOut) * 30;
  const gapIn = (mIn - 1) * 13;
  const m = gapOut < gapIn ? mOut : mIn;
  return [200 + dx / m, 200 + dy / m];
}

/** compression-merge point: pull toward the boundary, then blend onto a lattice */
function compressPoint(lx: number, ly: number): [number, number] {
  let ex = lx;
  let ey = ly;
  if (inLune(lx, ly)) {
    [ex, ey] = luneEdge(lx, ly);
  } else if (inLune(400 - lx, 400 - ly)) {
    const [rx, ry] = luneEdge(400 - lx, 400 - ly);
    ex = 400 - rx;
    ey = 400 - ry;
  } else if (inRing(lx, ly)) {
    [ex, ey] = ringEdge(lx, ly);
  }
  let cx = lx + (ex - lx) * EDGE_PULL;
  let cy = ly + (ey - ly) * EDGE_PULL;
  cx += (Math.round(cx / SNAP_GRID) * SNAP_GRID - cx) * SNAP_BLEND;
  cy += (Math.round(cy / SNAP_GRID) * SNAP_GRID - cy) * SNAP_BLEND;
  return [cx, cy];
}

/** ~unit-radius irregular 5–7-gon, extruded and beveled. */
function makeTemplate(rnd: () => number): THREE.BufferGeometry {
  const nV = 5 + Math.floor(rnd() * 3);
  const pts: THREE.Vector2[] = [];
  for (let k = 0; k < nV; k++) {
    const ang = (k / nV) * Math.PI * 2 + rnd() * (Math.PI / nV);
    const rad = 0.6 + rnd() * 0.4;
    pts.push(new THREE.Vector2(Math.cos(ang) * rad, Math.sin(ang) * rad));
  }
  const depth = 0.35 + rnd() * 0.4;
  const geometry = new THREE.ExtrudeGeometry(new THREE.Shape(pts), {
    depth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.08,
    bevelSegments: 1,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

/** Build the whole field. Call once per mount; dispose geometries after. */
export function createParticleField(): ParticleField {
  const rnd = mulberry32(SEED);
  const templates = Array.from({ length: TEMPLATE_COUNT }, () => makeTemplate(rnd));
  const slots: ParticleSlot[] = [];
  const cell = 400 / GRID;
  let assembleEnd = 0;

  for (let gi = 0; gi < GRID; gi++) {
    for (let gj = 0; gj < GRID; gj++) {
      const lx = (gi + 0.5) * cell + (rnd() * 2 - 1) * cell * 0.12;
      const ly = (gj + 0.5) * cell + (rnd() * 2 - 1) * cell * 0.12;
      if (!inMark(lx, ly)) continue;

      /* resting slot and compression-merge point, in scene space */
      const target = new THREE.Vector3(lx - 200, 200 - ly, 0);
      const [cx, cy] = compressPoint(lx, ly);
      const compress = new THREE.Vector3(cx - 200, 200 - cy, 0);

      /* sized to overlap neighbours (dense, solid pack);
         a sprinkle of larger chunks for organic variety */
      const big = rnd() < 0.06;
      const scale = cell * (0.68 + rnd() * 0.4) * (big ? 2.1 : 1);

      /* spawn: radially outward, 360°, at random depth */
      let dir = new THREE.Vector3(target.x, target.y, 0);
      if (dir.lengthSq() < 100) dir.set(rnd() * 2 - 1, rnd() * 2 - 1, 0);
      dir = dir.normalize();
      const spawn = target
        .clone()
        .addScaledVector(dir, 600 + rnd() * 600)
        .setZ((rnd() * 2 - 1) * 380);

      /* gentle sideways arc, perpendicular to the inbound direction */
      const arcDir = new THREE.Vector3(-dir.y, dir.x, rnd() * 1.4 - 0.7).normalize();
      const arcAmp = (rnd() < 0.5 ? -1 : 1) * (26 + rnd() * 80);

      /* stagger: rim lands ~1.2s, middle ~2.5s, core ~3.8–4s */
      const rNorm = Math.min(target.length() / 145, 1);
      const start = (1 - rNorm) * 0.6 + rnd() * 0.1;
      const arrival = 1.2 + (1 - rNorm) * 2.6 + rnd() * 0.15;
      assembleEnd = Math.max(assembleEnd, arrival);

      /* slow elegant tumble: 0.5–1.5 turns, decelerating to identity */
      const axis = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize();
      const angle = (rnd() < 0.5 ? -1 : 1) * (Math.PI + rnd() * Math.PI * 2);

      slots.push({
        template: Math.floor(rnd() * TEMPLATE_COUNT),
        scale,
        target,
        spawn,
        arcDir,
        arcAmp,
        start,
        arrival,
        axis,
        angle,
        compress,
        compressScale: 0.3 + rnd() * 0.2,
        spin: (rnd() < 0.5 ? -1 : 1) * (0.15 + rnd() * 0.25),
      });
    }
  }

  return { templates, slots, assembleEnd };
}
