import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import styles from './IntroAnimation.module.css';
import { CleanLogo } from './CleanLogo';
import { CRESCENT_D, GREEN, O_D } from './logo-paths';
import { createParticleField, flightEase, glideEase } from './glass';

/* ════════════════════════ TUNABLES ════════════════════════ */

/**
 * Where the mark docks when the intro resolves (px from the viewport
 * top-left, and the final square size). Re-aiming the ending — e.g. into
 * the real navbar brand slot later — means changing only this.
 */
export const SHRINK_TARGET = { x: 28, y: 20, size: 68 };

/**
 * Phase timings, seconds. (Landing wave lives in glass.ts STAGGER; the
 * last particle lands at ~4s.)
 *
 * Strict order — nothing 2D exists before the 3D meeting is complete:
 *   1. every particle lands inside the mark's border (0–4s)
 *   2. a short beat with the complete 3D mass
 *   3. the melt: a wave sweeps rim → core; each chunk squashes flat like a
 *      droplet (slight liquid spread, thickness → 0) and STAYS as part of
 *      the surface — nothing shrinks away or disappears. The solid 2D mark
 *      surfaces beneath the covering chunks meanwhile (identical flat
 *      #8FD400, tone mapping off), and once everything is flat the pancake
 *      layer fades over it with zero visible change.
 *   4. once the mark is whole: zoom + glow, then the corner glide
 */
const T = {
  meetBeat: 0.15, // stillness with the fully-met 3D mass before the melt
  planeIn: 0.35, // clean plane slips in beneath the finished puddle
  melt: 0.55, // per chunk: squash-flat + spread duration (wave in glass.ts)
  chunkFade: 0.45, // flat-on-flat fade of the puddle layer (invisible)
  zoom: 1.5, // 1 → ZOOM_PEAK once the mark is completely formed
  glowRamp: 0.5, // halo builds during the zoom
  move: 1.0, // glide + shrink to the corner; halo fades with it
  reveal: 1.5, // backdrop fade revealing the homepage
  revealLag: 0.4, // reveal starts this far into the glide
};

const ZOOM_PEAK = 1.06;

/* Camera: locked at (0,0,CAM_Z) looking at the origin — no zoom, no sway.
   fov 40 at z=560 shows ~408 world-units of height, so the 280-unit mark
   fills ~69% of the viewport. The corner-dock math depends on this. */
const CAM_FOV = 40;
const CAM_Z = 560;

const GLASS = {
  color: 0x8fd400,
  metalness: 0.1,
  roughness: 0.3,
  opacity: 0.85,
  emissiveIntensity: 0.3,
  clearcoat: 0.6,
  clearcoatRoughness: 0.25,
};

/* 2D logo plane: world size matches the mark's tight box (284 units);
   the halo plane carries a pre-blurred copy, padded so the blur isn't
   clipped. HALO_MAX keeps the glow soft, not neon. */
const PLANE_SIZE = 284;
const LOGO_TEX = 1024;
const HALO_PAD = 128;
const HALO_BLUR = 24;
const HALO_MAX = 0.5;

/* Signature curve: FADE (sine-like in-out) for the final reveal. 3D motion
   uses flightEase / glideEase from glass.ts. */
const FADE: [number, number, number, number] = [0.45, 0.05, 0.55, 0.95];

/* ═══════════════════════════════════════════════════════════ */

type Target = typeof SHRINK_TARGET;

interface Props {
  onComplete?: () => void;
  target?: Target;
}

/** Draw the clean mark (logo coords 58..342) into a canvas at scale k. */
function drawMark(ctx: CanvasRenderingContext2D, k: number, pad: number) {
  ctx.setTransform(k, 0, 0, k, pad - 58 * k, pad - 58 * k);
  ctx.fillStyle = GREEN;
  const crescent = new Path2D(CRESCENT_D);
  ctx.fill(crescent);
  ctx.save();
  ctx.translate(200, 200);
  ctx.rotate(Math.PI);
  ctx.translate(-200, -200);
  ctx.fill(crescent);
  ctx.restore();
  ctx.fill(new Path2D(O_D), 'evenodd');
}

function makeLogoTexture(blur: number): THREE.CanvasTexture {
  const pad = blur > 0 ? HALO_PAD : 0;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = LOGO_TEX + pad * 2;
  const ctx = canvas.getContext('2d')!;
  if (blur > 0) ctx.filter = `blur(${blur}px)`;
  drawMark(ctx, LOGO_TEX / PLANE_SIZE, pad);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Accessibility fallback: static mark fades in already docked, <1s, no motion. */
function ReducedIntro({ target, onComplete }: { target: Target; onComplete?: () => void }) {
  const [done, setDone] = useState(false);
  const dockStyle = { left: target.x, top: target.y, width: target.size, height: target.size };

  if (done) {
    return (
      <div className={styles.docked} style={dockStyle} aria-hidden="true">
        <CleanLogo tight />
      </div>
    );
  }
  return (
    <div className={styles.overlay} aria-hidden="true">
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.45, ease: 'easeOut' }}
        onAnimationComplete={() => {
          setDone(true);
          onComplete?.();
        }}
      />
      <motion.div
        className={styles.docked}
        style={dockStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <CleanLogo tight />
      </motion.div>
    </div>
  );
}

type Phase = 'assembly' | 'reveal' | 'done';

export default function IntroAnimation({ onComplete, target = SHRINK_TARGET }: Props) {
  const reduced = useReducedMotion();
  // Dev escape hatches: ?intro=skip | hold (2D plane + halo, one static frame)
  const mode = new URLSearchParams(window.location.search).get('intro');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>(mode === 'skip' ? 'done' : 'assembly');

  useEffect(() => {
    if (mode === 'skip' || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      // no WebGL — degrade straight to the docked mark + homepage
      setPhase('reveal');
      const id = window.setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 1200);
      return () => window.clearTimeout(id);
    }

    document.body.style.overflow = 'hidden';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    /* no tone mapping: melting emissive particles and the unlit 2D plane
       must output the exact same #8FD400, or the merge shows a seam */
    renderer.toneMapping = THREE.NoToneMapping;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAM_FOV,
      window.innerWidth / window.innerHeight,
      1,
      4000,
    );
    camera.position.set(0, 0, CAM_Z);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xfff3dc, 0.9);
    key.position.set(240, 320, 260);
    scene.add(key);

    /* everything that zooms and travels to the corner lives in one group */
    const moveGroup = new THREE.Group();
    scene.add(moveGroup);

    /* ── particles ── */
    const particleRoot = new THREE.Group();
    moveGroup.add(particleRoot);

    const material = new THREE.MeshPhysicalMaterial({
      color: GLASS.color,
      metalness: GLASS.metalness,
      roughness: GLASS.roughness,
      transparent: true,
      opacity: GLASS.opacity,
      emissive: GLASS.color,
      emissiveIntensity: GLASS.emissiveIntensity,
      clearcoat: GLASS.clearcoat,
      clearcoatRoughness: GLASS.clearcoatRoughness,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const COL_GREEN = new THREE.Color(GLASS.color);
    const COL_BLACK = new THREE.Color(0x000000);

    const field = createParticleField();
    const byTemplate: number[][] = field.templates.map(() => []);
    field.slots.forEach((s, i) => byTemplate[s.template].push(i));
    const instanced = byTemplate.map((list, ti) => {
      const mesh = new THREE.InstancedMesh(field.templates[ti], material, list.length);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;
      particleRoot.add(mesh);
      return mesh;
    });

    /* ── 2D logo plane (behind the particles) + halo ── */
    const sharpTexture = makeLogoTexture(0);
    const haloTexture = makeLogoTexture(HALO_BLUR);

    const logoMaterial = new THREE.MeshBasicMaterial({
      map: sharpTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      toneMapped: false,
    });
    const logoPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE),
      logoMaterial,
    );
    logoPlane.position.z = -6; // behind the particles: they melt onto it
    logoPlane.renderOrder = 1;

    const haloScale = (LOGO_TEX + HALO_PAD * 2) / LOGO_TEX;
    const haloMaterial = new THREE.MeshBasicMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const haloPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(PLANE_SIZE * haloScale, PLANE_SIZE * haloScale),
      haloMaterial,
    );
    haloPlane.position.z = -9;
    haloPlane.renderOrder = 0;

    moveGroup.add(haloPlane, logoPlane);

    /* timeline — melt begins only after EVERY particle has met in the middle */
    const fuseStart = field.assembleEnd - 1.1;
    const fuseEnd = field.assembleEnd;
    const mergeStart = field.assembleEnd + T.meetBeat;
    const meltEnd = mergeStart + field.meltSpan + T.melt;
    const fadeEnd = meltEnd + T.planeIn + 0.05 + T.chunkFade;
    const zoomStart = fadeEnd + 0.1;
    const moveStart = zoomStart + T.zoom;
    const moveEnd = moveStart + T.move;
    const revealAt = moveStart + T.revealLag;
    const endAt = Math.max(moveEnd, revealAt + T.reveal) + 0.1;

    let disposed = false;
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      field.templates.forEach((g) => g.dispose());
      logoPlane.geometry.dispose();
      haloPlane.geometry.dispose();
      sharpTexture.dispose();
      haloTexture.dispose();
      logoMaterial.dispose();
      haloMaterial.dispose();
      material.dispose();
      renderer.dispose();
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();

    /** flight + (after the whole mass has met) per-chunk melt into the mark */
    const placeParticles = (t: number) => {
      byTemplate.forEach((list, ti) => {
        const mesh = instanced[ti];
        for (let k = 0; k < list.length; k++) {
          const s = field.slots[list[k]];
          const e = flightEase(clamp01((t - s.start) / (s.arrival - s.start)));
          pos.lerpVectors(s.spawn, s.target, e);
          /* the sideways arc dies out before touchdown so nothing drifts
             outside the mark's border at meet time */
          const arcK = clamp01((0.92 - e) / 0.25);
          pos.addScaledVector(s.arcDir, Math.sin(Math.PI * e) * s.arcAmp * arcK);
          q.setFromAxisAngle(s.axis, s.angle * (1 - e));
          /* the melt: squash flat like a droplet and SPREAD into the
             neighbours — the drops merge into one continuous puddle that
             IS the solid logo; nothing shrinks away or disappears */
          const mp = clamp01((t - mergeStart - s.meltOffset) / T.melt);
          const ms = mp * mp * (3 - 2 * mp); // smoothstep
          const spread = 1 + (s.spreadMax - 1) * ms;
          const sZ = Math.max(1 - ms * 1.05, 0.02);
          scl.set(s.scale * spread, s.scale * spread, s.scale * sZ);
          m4.compose(pos, q, scl);
          mesh.setMatrixAt(k, m4);
        }
        mesh.instanceMatrix.needsUpdate = true;
      });
    };

    /* ── dev hold: 2D plane + halo, one static frame ── */
    if (mode === 'hold') {
      particleRoot.visible = false;
      logoMaterial.opacity = 1;
      haloMaterial.opacity = HALO_MAX;
      moveGroup.scale.setScalar(ZOOM_PEAK);
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('resize', onResize);
        dispose();
        document.body.style.overflow = '';
      };
    }

    /* ── live timeline ── */
    let raf = 0;
    let revealed = false;
    let corner: { pos: THREE.Vector3; scale: number } | null = null;
    const t0 = performance.now();

    const tick = () => {
      const t = (performance.now() - t0) / 1000;

      /* Phase 1 — everything meets in the middle; then Phase 2 — the melt */
      if (t < meltEnd + 0.05) placeParticles(t);

      /* while the last pieces land, lighting/gloss drain so the whole mass
         flattens to opaque #8FD400 before it melts */
      const fuseP = clamp01((t - fuseStart) / (fuseEnd - fuseStart));
      if (fuseP > 0 && t <= mergeStart) {
        material.color.lerpColors(COL_GREEN, COL_BLACK, fuseP);
        material.emissiveIntensity =
          GLASS.emissiveIntensity + (1 - GLASS.emissiveIntensity) * fuseP;
        material.opacity = GLASS.opacity + (1 - GLASS.opacity) * fuseP;
        material.roughness = GLASS.roughness + (1 - GLASS.roughness) * fuseP;
        material.clearcoat = GLASS.clearcoat * (1 - fuseP);
        material.metalness = GLASS.metalness * (1 - fuseP);
      }

      /* only AFTER the puddle fully covers the mark does the clean plane
         slip in beneath it — with complete coverage this is invisible */
      logoMaterial.opacity = clamp01((t - meltEnd) / T.planeIn);

      /* …then the puddle layer fades over the identical flat mark —
         flat-on-flat, same color, nothing changes on screen */
      const fadeStart = meltEnd + T.planeIn + 0.05;
      if (t >= fadeStart && particleRoot.visible) {
        const fp = clamp01((t - fadeStart) / T.chunkFade);
        material.opacity = 1 - fp;
        if (fp >= 1) particleRoot.visible = false;
      }

      /* Phase 3 — small zoom with a soft glow, only once the mark is whole */
      const zoomP = glideEase(clamp01((t - zoomStart) / T.zoom));
      const gIn = clamp01((t - zoomStart) / T.glowRamp);
      let groupScale = 1 + (ZOOM_PEAK - 1) * zoomP;
      let haloOpacity = HALO_MAX * gIn;

      /* Phase 4 — glide to the corner while the glow fades away */
      if (t >= moveStart) {
        if (!corner) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const visH = 2 * CAM_Z * Math.tan((CAM_FOV * Math.PI) / 360);
          const u = visH / vh; // world units per px at z=0
          corner = {
            pos: new THREE.Vector3(
              (target.x + target.size / 2 - vw / 2) * u,
              -(target.y + target.size / 2 - vh / 2) * u,
              0,
            ),
            scale: (target.size * u) / PLANE_SIZE,
          };
        }
        const mp = glideEase(clamp01((t - moveStart) / T.move));
        groupScale = ZOOM_PEAK + (corner.scale - ZOOM_PEAK) * mp;
        moveGroup.position.set(corner.pos.x * mp, corner.pos.y * mp, 0);
        haloOpacity = HALO_MAX * (1 - mp);
      }
      moveGroup.scale.setScalar(groupScale);
      haloMaterial.opacity = haloOpacity;

      /* Phase 5 — homepage fades in while the mark settles */
      if (!revealed && t >= revealAt) {
        revealed = true;
        setPhase('reveal');
      }
      if (t >= endAt) {
        renderer.clear();
        dispose();
        document.body.style.overflow = '';
        setPhase('done');
        onComplete?.();
        return;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      dispose();
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduced) return <ReducedIntro target={target} onComplete={onComplete} />;

  const dockStyle = { left: target.x, top: target.y, width: target.size, height: target.size };

  if (phase === 'done') {
    return (
      <div className={styles.docked} style={dockStyle} aria-hidden="true">
        <CleanLogo tight />
      </div>
    );
  }

  return (
    <div className={styles.overlay} aria-hidden="true">
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        animate={phase === 'assembly' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: T.reveal, ease: FADE }}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
