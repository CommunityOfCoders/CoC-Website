import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import { AchievementLightbox } from './AchievementLightbox';
import './AchievementGallery.css';

/* One continuous wall of full-colour photo tiles (square, so nothing is
   cropped badly). Every fifth tile is a large feature tile, alternating
   sides. Tiles unroll into view, the photo drifts inside its frame as you
   scroll, and hovering lifts the tile with the site's green ring. */

const EASE = [0.16, 1, 0.3, 1] as const;
const WIN = /winner|champion|1st|runner-up/i;

const splitTitle = (t: string) => {
  const i = t.lastIndexOf(' - ');
  return i > 0 ? { main: t.slice(0, i), sub: t.slice(i + 3) } : { main: t, sub: '' };
};

const Tile: React.FC<{ item: Achievement; index: number; onOpen: () => void }> = ({ item, index, onOpen }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  const big = index % 5 === 0;
  const right = big && Math.floor(index / 5) % 2 === 1;
  const win = WIN.test(`${item.tag} ${item.title}`);
  const { main, sub } = splitTitle(item.title);

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`ach-tile${big ? ' is-big' : ''}${right ? ' is-right' : ''}`}
      onClick={onOpen}
      aria-label={`Open ${item.title}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 20px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 4) * 0.06 }}
    >
      <span className="ach-tile__media">
        <motion.img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          draggable={false}
          style={reduce ? undefined : { y }}
        />
      </span>

      <span className="ach-tile__top">
        <span className="ach-tile__tag">{item.tag}</span>
        {win && (
          <span className="ach-tile__trophy" title="Winner">
            <Trophy size={big ? 16 : 13} strokeWidth={2.2} />
          </span>
        )}
      </span>

      <span className="ach-tile__body">
        <span className="ach-tile__title">{main}</span>
        {sub && <span className="ach-tile__sub">{sub}</span>}
        {big && item.description && <span className="ach-tile__desc">{item.description}</span>}
      </span>

      <span className="ach-tile__go" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
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
