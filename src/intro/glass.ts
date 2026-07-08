import * as THREE from 'three';

/**
 * Procedural 3D glass-shard field.
 *
 * The clean mark (two crescent lunes + O ring, traced in logo-paths.ts) is
 * described analytically here:
 *   - crescent 1 = inside circle (185,160,r100) AND outside circle (239,167,r112)
 *   - crescent 2 = the same test on the point rotated 180° about (200,200)
 *   - O ring     = between ellipses (200,200, 30×34) and (200,200, 13×16)
 *
 * A fine jittered grid samples that region; every hit becomes one shard: a
 * small irregular 5–7-gon extruded into a beveled 3D chunk (true mesh, not
 * a sprite). Together the ~550 shards tile the mark like fractured glass.
 *
 * Each shard carries its own choreography, all seeded and deterministic:
 *   spawn      far off-frustum, radially outward from its resting slot
 *   flight     cubic-bezier(0.25,0.1,0.25,1) — slow start, aggressive
 *              ease-out, with a gentle sideways/depth arc (no wobble spam)
 *   rotation   quaternion about a random axis, decelerating to identity
 *   stagger    rim shards arrive first (~1.2s), core shards last (~5s)
 *   melt       sag/stretch parameters for Phase 3
 *
 * Scene space: logo coords (0..400, y down) → scene (x−200, 200−y), so the
 * mark is centered at the origin, ~280 units tall, facing +z.
 */

export interface GlassShard {
  geometry: THREE.ExtrudeGeometry;
  target: THREE.Vector3;
  spawn: THREE.Vector3;
  /** unit vector for the flight's sideways arc */
  arcDir: THREE.Vector3;
  arcAmp: number;
  start: number;
  arrival: number;
  axis: THREE.Vector3;
  angle: number;
  /** Phase 3: how far this piece sags */
  sagAmp: number;
  /** Phase 3: true = elongates downward like a drip; false = squashes */
  stretch: boolean;
  meltK: number;
  halfH: number;
}

export interface GlassField {
  shards: GlassShard[];
  /** when the last shard locks in (seconds from assembly start) */
  assembleEnd: number;
}

const GRID = 57; // 400/57 ≈ 7-unit cells → ~550 shards
const SEED = 424243;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** cubic-bezier(0.25, 0.1, 0.25, 1), Newton-solved. */
export function flightEase(p: number) {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  let t = p;
  for (let i = 0; i < 8; i++) {
    const x = ((t - 0.75) * t + 0.75) * t - p; // ax=1, bx=-0.75, cx=0.75
    const dx = (3 * t - 1.5) * t + 0.75;
    if (Math.abs(x) < 1e-5 || dx === 0) break;
    t -= x / dx;
  }
  return ((-1.7 * t + 2.4) * t + 0.3) * t; // ay=-1.7, by=2.4, cy=0.3
}

/* ── analytic point-in-mark tests (logo coords) ── */

const inLune = (x: number, y: number) => {
  const doSq = (x - 185) ** 2 + (y - 160) ** 2;
  if (doSq > 100 * 100) return false;
  const diSq = (x - 239) ** 2 + (y - 167) ** 2;
  return diSq >= 112 * 112;
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

/** Build the whole field. Call once per mount; dispose geometries after. */
export function createGlassField(): GlassField {
  const rnd = mulberry32(SEED);
  const shards: GlassShard[] = [];
  const cell = 400 / GRID;
  let assembleEnd = 0;

  for (let gi = 0; gi < GRID; gi++) {
    for (let gj = 0; gj < GRID; gj++) {
      const lx = (gi + 0.5) * cell + (rnd() * 2 - 1) * cell * 0.15;
      const ly = (gj + 0.5) * cell + (rnd() * 2 - 1) * cell * 0.15;
      if (!inMark(lx, ly)) continue;

      /* irregular 5–7-gon around the cell center */
      const nV = 5 + Math.floor(rnd() * 3);
      const pts: THREE.Vector2[] = [];
      let maxR = 0;
      for (let k = 0; k < nV; k++) {
        const ang = (k / nV) * Math.PI * 2 + rnd() * (Math.PI / nV);
        const rad = cell * (0.58 + rnd() * 0.4);
        maxR = Math.max(maxR, rad);
        pts.push(new THREE.Vector2(Math.cos(ang) * rad, Math.sin(ang) * rad));
      }
      const shape = new THREE.Shape(pts);
      const depth = 2.2 + rnd() * 3.6;
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.45,
        bevelSegments: 1,
      });
      geometry.translate(0, 0, -depth / 2);

      /* resting slot in scene space */
      const target = new THREE.Vector3(lx - 200, 200 - ly, 0);

      /* spawn: radially outward, far outside the frustum, at random depth */
      let dir = new THREE.Vector3(target.x, target.y, 0);
      if (dir.lengthSq() < 100) dir.set(rnd() * 2 - 1, rnd() * 2 - 1, 0);
      dir = dir.normalize();
      const spawn = target
        .clone()
        .addScaledVector(dir, 520 + rnd() * 450)
        .setZ((rnd() * 2 - 1) * 320);

      /* gentle sideways arc, perpendicular to the inbound direction */
      const arcDir = new THREE.Vector3(-dir.y, dir.x, rnd() * 1.4 - 0.7).normalize();
      const arcAmp = (rnd() < 0.5 ? -1 : 1) * (24 + rnd() * 70);

      /* stagger: rim → core. Everything locks by ~5s. */
      const rNorm = Math.min(target.length() / 145, 1);
      const arrival = 1.2 + (1 - rNorm) * 3.6 + rnd() * 0.25;
      const start = arrival * rnd() * 0.22;
      assembleEnd = Math.max(assembleEnd, arrival);

      /* tumble: quaternion about a random axis, 0.5–1.5 turns */
      const axis = new THREE.Vector3(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1).normalize();
      const angle = (rnd() < 0.5 ? -1 : 1) * (Math.PI + rnd() * Math.PI * 2);

      /* melt behavior: lower pieces sag further; ~30% become drips */
      const sagAmp = (20 + rnd() * 60) * (1 + Math.max(0, -target.y) / 300);
      const stretch = rnd() < 0.3;
      const meltK = stretch ? 0.5 + rnd() * 0.7 : 0.22 + rnd() * 0.16;

      shards.push({
        geometry,
        target,
        spawn,
        arcDir,
        arcAmp,
        start,
        arrival,
        axis,
        angle,
        sagAmp,
        stretch,
        meltK,
        halfH: maxR,
      });
    }
  }

  return { shards, assembleEnd };
}
