import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import styles from './IntroAnimation.module.css';
import { CleanLogo } from './CleanLogo';
import { createGlassField, flightEase } from './glass';

/* ════════════════════════ TUNABLES ════════════════════════ */

/**
 * Where the mark docks when the intro resolves (px from the viewport
 * top-left, and the final square size). Re-aiming the ending — e.g. into
 * the real navbar brand slot later — means changing only this.
 */
export const SHRINK_TARGET = { x: 28, y: 20, size: 68 };

/** Phase timings, seconds. (Per-shard stagger/arrival live in glass.ts;
    the last shard locks at ~5s.) */
const T = {
  hold: 0.5, // assembled glass sits untouched
  melt: 2.0, // sag + stretch + fade to nothing
  cross: 0.5, // the clean 2D mark starts fading in this long before melt ends
  logoIn: 0.5, // clean mark fade-in
  shrinkDelay: 0.65, // beat before it travels to the corner
  shrink: 0.95, // travel to SHRINK_TARGET
  revealDelay: 1.1, // backdrop starts fading this far into the reveal
  reveal: 1.0, // slow fade from black into the homepage
};

/* Camera: fov 40 at z≈560 shows ~408 world-units of height, so the
   280-unit mark fills ~70% of the viewport — RESOLVE_FRACTION must match
   or the 2D crossfade jumps in size. A slow push-in from CAM_Z + CAM_PUSH
   runs across the assembly. */
const CAM_FOV = 40;
const CAM_Z = 560;
const CAM_PUSH = 60;
const RESOLVE_FRACTION = 0.7;

const GLASS = {
  color: 0x8fd400,
  metalness: 0.1,
  roughness: 0.38,
  opacity: 0.8,
  emissiveIntensity: 0.2,
  clearcoat: 0.6,
  clearcoatRoughness: 0.3,
};

/* Signature curves: GLIDE for the dock, FADE for the final reveal.
   (Shard flight uses cubic-bezier(0.25,0.1,0.25,1) in glass.ts.) */
const GLIDE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FADE: [number, number, number, number] = [0.45, 0.05, 0.55, 0.95];

/* ═══════════════════════════════════════════════════════════ */

type Target = typeof SHRINK_TARGET;

interface Props {
  onComplete?: () => void;
  target?: Target;
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

/** Phase 4: the clean 2D mark surfaces where the glass stood, then docks. */
function ResolveLogo({ target }: { target: Target }) {
  const size = Math.min(window.innerHeight * RESOLVE_FRACTION, window.innerWidth * 0.85);
  const dx = target.x + target.size / 2 - window.innerWidth / 2;
  const dy = target.y + target.size / 2 - window.innerHeight / 2;
  const s = target.size / size;
  return (
    <motion.div
      className={styles.resolveLogo}
      style={{ width: size, height: size, left: '50%', top: '50%' }}
      initial={{ opacity: 0, x: -size / 2, y: -size / 2, scale: 1.03 }}
      animate={{ opacity: 1, x: -size / 2 + dx, y: -size / 2 + dy, scale: s }}
      transition={{
        opacity: { duration: T.logoIn, ease: 'linear' },
        x: { delay: T.shrinkDelay, duration: T.shrink, ease: GLIDE },
        y: { delay: T.shrinkDelay, duration: T.shrink, ease: GLIDE },
        scale: { delay: T.shrinkDelay, duration: T.shrink, ease: GLIDE },
      }}
    >
      <CleanLogo tight />
    </motion.div>
  );
}

export default function IntroAnimation({ onComplete, target = SHRINK_TARGET }: Props) {
  const reduced = useReducedMotion();
  // Dev escape hatches: ?intro=skip | hold (assembled glass, one static frame)
  const mode = new URLSearchParams(window.location.search).get('intro');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'glass' | 'reveal' | 'done'>(mode === 'skip' ? 'done' : 'glass');

  useEffect(() => {
    if (mode === 'skip' || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      // no WebGL — degrade to the 2D resolve sequence
      setPhase('reveal');
      return;
    }

    document.body.style.overflow = 'hidden';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      CAM_FOV,
      window.innerWidth / window.innerHeight,
      1,
      3000,
    );
    camera.position.set(0, 0, CAM_Z + CAM_PUSH);

    scene.add(new THREE.AmbientLight(0xdce8f5, 0.55));
    const key = new THREE.DirectionalLight(0xffe9c4, 1.4);
    key.position.set(240, 320, 260);
    scene.add(key);

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

    const field = createGlassField();
    const meshes = field.shards.map((s) => {
      const mesh = new THREE.Mesh(s.geometry, material);
      mesh.position.copy(s.spawn);
      mesh.quaternion.setFromAxisAngle(s.axis, s.angle);
      scene.add(mesh);
      return mesh;
    });

    const meltStart = field.assembleEnd + T.hold;
    const endT = meltStart + T.melt;

    let disposed = false;
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      field.shards.forEach((s) => s.geometry.dispose());
      material.dispose();
      renderer.dispose();
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── dev hold: place everything assembled, render one frame ── */
    if (mode === 'hold') {
      meshes.forEach((mesh, i) => {
        mesh.position.copy(field.shards[i].target);
        mesh.quaternion.identity();
      });
      camera.position.z = CAM_Z;
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
    const t0 = performance.now();

    const tick = () => {
      const t = (performance.now() - t0) / 1000;

      // slow cinematic push-in across the assembly
      const push = Math.min(t / field.assembleEnd, 1);
      camera.position.z = CAM_Z + CAM_PUSH * (1 - push * push * (3 - 2 * push));

      if (t < meltStart) {
        /* Phase 1/2 — convergence, then stillness */
        for (let i = 0; i < meshes.length; i++) {
          const s = field.shards[i];
          const m = meshes[i];
          const p = Math.min(Math.max((t - s.start) / (s.arrival - s.start), 0), 1);
          const e = flightEase(p);
          m.position.lerpVectors(s.spawn, s.target, e);
          m.position.addScaledVector(s.arcDir, Math.sin(Math.PI * e) * s.arcAmp);
          m.quaternion.setFromAxisAngle(s.axis, s.angle * (1 - e));
        }
      } else {
        /* Phase 3 — melt: sag, stretch, squash; global fade */
        const mp = Math.min((t - meltStart) / T.melt, 1);
        const g = mp * mp; // gravity takes hold
        for (let i = 0; i < meshes.length; i++) {
          const s = field.shards[i];
          const m = meshes[i];
          if (s.stretch) {
            // drip: elongate downward, top edge roughly pinned
            m.scale.y = 1 + s.meltK * g;
            m.position.y = s.target.y - s.meltK * g * s.halfH - s.sagAmp * g * 0.4;
          } else {
            // slump: squash and sink
            m.scale.y = 1 - s.meltK * g;
            m.position.y = s.target.y - s.sagAmp * g;
          }
        }
        const fade = Math.min(Math.max((t - meltStart - 0.2) / (T.melt - 0.2), 0), 1);
        material.opacity = GLASS.opacity * (1 - fade);
        material.emissiveIntensity = GLASS.emissiveIntensity * (1 - fade);
      }

      if (!revealed && t >= endT - T.cross) {
        revealed = true;
        setPhase('reveal');
      }

      if (t >= endT) {
        renderer.clear();
        dispose();
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

  if (phase === 'done') {
    return (
      <div
        className={styles.docked}
        style={{ left: target.x, top: target.y, width: target.size, height: target.size }}
        aria-hidden="true"
      >
        <CleanLogo tight />
      </div>
    );
  }

  return (
    <div className={styles.overlay} aria-hidden="true">
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 1 }}
        animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: T.revealDelay, duration: T.reveal, ease: FADE }}
        onAnimationComplete={() => {
          if (phase === 'reveal') {
            document.body.style.overflow = '';
            setPhase('done');
            onComplete?.();
          }
        }}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
      {phase === 'reveal' && <ResolveLogo target={target} />}
    </div>
  );
}
