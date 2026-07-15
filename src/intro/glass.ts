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
  /** seconds after merge start when this piece begins to melt (rim first) */
  meltOffset: number;
  /** how far this chunk spreads while melting (edge chunks spread less) */
  spreadMax: number;
}

export interface ParticleField {
  templates: THREE.BufferGeometry[];
  slots: ParticleSlot[];
  /** when the last particle locks in (seconds from assembly start) */
  assembleEnd: number;
  /** largest meltOffset across the field (the melt wave's span) */
  meltSpan: number;
}

const GRID = 72; // 400/72 ≈ 5.6-unit cells → ~880 particles
const TEMPLATE_COUNT = 12;
const SEED = 424243;

/**
 * Landing-wave timing: a slot at normalized radius rNorm (0 = mark center,
 * 1 = rim) arrives at `base + (1 − rNorm) · spread (+ jitter)`. The rim
 * lands first, the core last. IntroAnimation's radial reveal mask uses the
 * same numbers to paint the 2D mark in exactly behind the landings.
 */
export const STAGGER = { base: 3.3, spread: 0.5, jitter: 0.2, maxR: 145 };

/** landing slots keep at least this margin (capped) inside the boundary */
const MAX_INSET = 6;

/** melt wave: rim chunks melt first, sweeping to the core over this long */
const MELT_WAVE = 0.6;
const MELT_WAVE_JITTER = 0.15;

/** how far a melting chunk may spread (interior chunks; edge chunks are
    limited by their distance to the border so the puddle stays inside) */
const SPREAD_MAX = 1.9;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** General CSS-style cubic-bezier easing (Newton + bisection fallback). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (p: number) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let t = p;
    for (let i = 0; i < 8; i++) {
      const x = sampleX(t) - p;
      const dx = sampleDX(t);
      if (Math.abs(x) < 1e-5 || Math.abs(dx) < 1e-6) break;
      t -= x / dx;
    }
    if (t < 0 || t > 1 || Math.abs(sampleX(t) - p) > 1e-4) {
      let lo = 0;
      let hi = 1;
      t = p;
      for (let i = 0; i < 24; i++) {
        const x = sampleX(t);
        if (Math.abs(x - p) < 1e-4) break;
        if (x < p) lo = t;
        else hi = t;
        t = (lo + hi) / 2;
      }
    }
    return ((ay * t + by) * t + cy) * t;
  };
}

/**
 * Inbound particle flight: constant speed throughout — effectively linear,
 * with just enough softness at both ends that launch and touchdown don't
 * look mechanical.
 */
export const flightEase = cubicBezier(0.3, 0.25, 0.7, 0.75);
/** Compression / corner glide: cubic-bezier(0.25, 0.1, 0.25, 1). */
export const glideEase = cubicBezier(0.25, 0.1, 0.25, 1);

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

/**
 * The "imaginary border": nudge a landing slot so it sits at least `inset`
 * units inside its region's boundary — chunks never poke outside the mark
 * when they meet in the middle.
 */
function insetPoint(lx: number, ly: number, inset: number): [number, number, number] {
  let ex: number;
  let ey: number;
  if (inLune(lx, ly)) {
    [ex, ey] = luneEdge(lx, ly);
  } else if (inLune(400 - lx, 400 - ly)) {
    const [rx, ry] = luneEdge(400 - lx, 400 - ly);
    ex = 400 - rx;
    ey = 400 - ry;
  } else if (inRing(lx, ly)) {
    [ex, ey] = ringEdge(lx, ly);
  } else {
    return [lx, ly, inset];
  }
  const dx = lx - ex;
  const dy = ly - ey;
  const dist = Math.hypot(dx, dy);
  if (dist >= inset || dist < 0.4) return [lx, ly, Math.max(dist, inset)];
  const f = inset / dist;
  return [ex + dx * f, ey + dy * f, inset];
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
  let meltSpan = 0;

  for (let gi = 0; gi < GRID; gi++) {
    for (let gj = 0; gj < GRID; gj++) {
      const lx = (gi + 0.5) * cell + (rnd() * 2 - 1) * cell * 0.12;
      const ly = (gj + 0.5) * cell + (rnd() * 2 - 1) * cell * 0.12;
      if (!inMark(lx, ly)) continue;

      /* sized to overlap neighbours (dense, solid pack) — uniform range,
         no oversized chunks: they lump the border */
      const scale = cell * (0.62 + rnd() * 0.34);

      /* resting slot in scene space, inset from the boundary by the chunk's
         full vertex radius so nothing crosses the imaginary border */
      const [ix, iy, edgeDist] = insetPoint(lx, ly, Math.min(scale * 1.15, MAX_INSET));
      const target = new THREE.Vector3(ix - 200, 200 - iy, 0);

      /* melting spread budget: interior chunks merge into their neighbours,
         edge chunks stay within the border */
      const spreadMax = Math.min(Math.max(edgeDist / scale, 1.05), SPREAD_MAX);

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

      /* long overlapping flights; landings cascade rim → core following
         STAGGER, which the 2D reveal mask mirrors exactly */
      const rNorm = Math.min(target.length() / STAGGER.maxR, 1);
      const start = (1 - rNorm) * 0.5 + rnd() * 0.15;
      const arrival = STAGGER.base + (1 - rNorm) * STAGGER.spread + rnd() * STAGGER.jitter;
      assembleEnd = Math.max(assembleEnd, arrival);
      meltSpan = Math.max(meltSpan, (1 - rNorm) * MELT_WAVE + MELT_WAVE_JITTER);

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
        meltOffset: (1 - rNorm) * MELT_WAVE + rnd() * MELT_WAVE_JITTER,
        spreadMax,
      });
    }
  }

  return { templates, slots, assembleEnd, meltSpan };
}
