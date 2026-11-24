import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import { AchievementLightbox } from './AchievementLightbox';
import './AchievementGallery.css';

/* One continuous wall of full-colour photo tiles (square, so nothing is
   cropped badly). Every fifth tile is a large feature tile, alternating
   sides.

   Loading: each tile opens like a camera shutter - a green seam draws
   across the middle, two ink blades split apart, the photo settles from a
   zoom and the text rises in line by line.
   Hover: the tile tilts toward the cursor and its layers drift at
   different depths (photo one way, type the other), the shade lifts and
   the details slide up. */

const EASE = [0.16, 1, 0.3, 1] as const;
const WIN = /winner|champion|1st|runner-up/i;

const splitTitle = (t: string) => {
  const i = t.lastIndexOf(' - ');
  return i > 0 ? { main: t.slice(0, i), sub: t.slice(i + 3) } : { main: t, sub: '' };
};

/* ---- entrance choreography (variants propagate from the tile) ---- */
const seam: Variants = {
  hidden: { scaleX: 0, opacity: 1 },
  show: (d: number) => ({
    scaleX: [0, 1, 1],
    opacity: [1, 1, 0],
    transition: { duration: 0.9, times: [0, 0.4, 1], ease: EASE, delay: d },
  }),
};
const bladeTop: Variants = {
  hidden: { scaleY: 1 },
  show: (d: number) => ({ scaleY: 0, transition: { duration: 0.75, ease: EASE, delay: d + 0.32 } }),
};
const bladeBottom = bladeTop;
const photo: Variants = {
  hidden: { scale: 1.32 },
  show: (d: number) => ({ scale: 1, transition: { duration: 1.3, ease: EASE, delay: d + 0.3 } }),
};
const rise: Variants = {
  hidden: { y: 18, opacity: 0 },
  show: (d: number) => ({ y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: d } }),
};
const pop: Variants = {
  hidden: { scale: 0, rotate: -90 },
  show: (d: number) => ({ scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 320, damping: 16, delay: d } }),
};

const Tile: React.FC<{ item: Achievement; index: number; onOpen: () => void }> = ({ item, index, onOpen }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  // photo drifts inside its frame with the page scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  // pointer position over the tile, -0.5..0.5, sprung
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 18, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 18, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const photoX = useTransform(sx, [-0.5, 0.5], [14, -14]); // photo moves against the tilt
  const photoY = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const typeX = useTransform(sx, [-0.5, 0.5], [-7, 7]); // type moves with it
  const typeY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const badgeX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const badgeY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const big = index % 5 === 0;
  const right = big && Math.floor(index / 5) % 2 === 1;
  const win = WIN.test(`${item.tag} ${item.title}`);
  const { main, sub } = splitTitle(item.title);
  const d = (index % 4) * 0.08; // a small left-to-right wave across each row

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`ach-tile${big ? ' is-big' : ''}${right ? ' is-right' : ''}`}
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={`Open ${item.title}`}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
    >
      <motion.span className="ach-tile__media" style={reduce ? undefined : { x: photoX, y: photoY }}>
        <motion.img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          draggable={false}
          variants={photo}
          custom={d}
          style={reduce ? undefined : { y: scrollY }}
        />
      </motion.span>

      <motion.span className="ach-tile__top" style={reduce ? undefined : { x: badgeX, y: badgeY }}>
        <motion.span className="ach-tile__tag" variants={rise} custom={d + 0.75}>
          {item.tag}
        </motion.span>
        {win && (
          <motion.span className="ach-tile__trophy" title="Winner" variants={pop} custom={d + 0.95}>
            <Trophy size={big ? 17 : 13} strokeWidth={2.2} />
          </motion.span>
        )}
      </motion.span>

      <motion.span className="ach-tile__body" style={reduce ? undefined : { x: typeX, y: typeY }}>
        <motion.span className="ach-tile__title" variants={rise} custom={d + 0.7}>
          {main}
        </motion.span>
        {sub && (
          <motion.span className="ach-tile__sub" variants={rise} custom={d + 0.82}>
            {sub}
          </motion.span>
        )}
        {item.description && <span className="ach-tile__desc">{item.description}</span>}
      </motion.span>

      <span className="ach-tile__go" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>

      {/* camera-shutter entrance: seam + two blades */}
      {!reduce && (
        <span className="ach-tile__shutter" aria-hidden="true">
          <motion.span className="ach-tile__blade ach-tile__blade--top" variants={bladeTop} custom={d} />
          <motion.span className="ach-tile__blade ach-tile__blade--bottom" variants={bladeBottom} custom={d} />
          <motion.span className="ach-tile__seam" variants={seam} custom={d} />
        </span>
      )}
    </motion.button>
  );
};

export const AchievementGallery: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="ach-wall">
        {achievements.map((a, i) => (
          <Tile key={a.id} item={a} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      <AchievementLightbox
        achievements={achievements}
        currentIndex={open}
        onClose={() => setOpen(null)}
        onSelect={(i) => setOpen(i)}
      />
    </>
  );
};
