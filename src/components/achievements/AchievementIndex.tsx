import React, { useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import { AchievementLightbox } from './AchievementLightbox';
import './AchievementIndex.css';

/* An awards index, the way studio sites list their awards: one big
   typographic row per win, grouped by discipline. Pointing at a row lifts
   its photo out in full colour and lets it trail the cursor; on phones the
   photo sits in the row itself. Click / tap opens the full viewer. */

const EASE = [0.16, 1, 0.3, 1] as const;

const GROUPS = [
  { id: 'cp', label: 'Competitive Programming', test: /icpc|lady ada|acm/i },
  { id: 'web3', label: 'Web3', test: /eth/i },
  { id: 'os', label: 'Open Source & Research', test: /gsoc|cern|summer of code/i },
  { id: 'hack', label: 'Hackathons & Awards', test: /.*/ },
] as const;
type GroupId = (typeof GROUPS)[number]['id'];

const WIN = /winner|champion|1st|runner-up/i;

const groupOf = (a: Achievement): GroupId =>
  GROUPS.find((g) => g.test.test(`${a.tag} ${a.title}`))!.id;

/* "Smart India Hackathon 2022 Grand Finale - Team KADAMM"
   -> title "Smart India Hackathon 2022 Grand Finale", team "Team KADAMM" */
const splitTitle = (t: string) => {
  const i = t.lastIndexOf(' - ');
  return i > 0 ? { main: t.slice(0, i), sub: t.slice(i + 3) } : { main: t, sub: '' };
};

export const AchievementIndex: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<GroupId | 'all'>('all');
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // cursor-trailing preview (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });
  const vx = useVelocity(x);
  const rotate = useTransform(vx, [-1600, 0, 1600], [-7, 0, 7]);

  const grouped = useMemo(() => {
    return GROUPS.map((g) => ({
      ...g,
      items: achievements
        .map((a, index) => ({ a, index }))
        .filter(({ a }) => groupOf(a) === g.id),
    })).filter((g) => g.items.length && (filter === 'all' || g.id === filter));
  }, [achievements, filter]);

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  const current = hover !== null ? achievements[hover] : null;
  let n = 0;

  return (
    <div className="ach-index">
      <div className="ach-filters" role="tablist" aria-label="Filter achievements">
        {[{ id: 'all' as const, label: 'All' }, ...GROUPS].map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={filter === g.id}
            className={`ach-filter${filter === g.id ? ' is-on' : ''}`}
            onClick={() => setFilter(g.id)}
          >
            {filter === g.id && <motion.span layoutId="ach-filter-pill" className="ach-filter__pill" transition={{ duration: 0.4, ease: EASE }} />}
            <span className="ach-filter__label">{g.label}</span>
          </button>
        ))}
      </div>

      <div ref={listRef} className="ach-list" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <LayoutGroup>
          <AnimatePresence mode="popLayout" initial={false}>
            {grouped.map((g) => (
              <motion.section
                key={g.id}
                layout
                className="ach-group"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <h2 className="ach-group__title">{g.label}</h2>
                <ol className="ach-rows">
                  {g.items.map(({ a, index }) => {
                    n += 1;
                    const { main, sub } = splitTitle(a.title);
                    const win = WIN.test(`${a.tag} ${a.title}`);
                    return (
                      <motion.li
                        key={a.id}
                        className={`ach-row${hover === index ? ' is-hover' : ''}${hover !== null && hover !== index ? ' is-dim' : ''}`}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-8% 0px' }}
                        transition={{ duration: 0.55, ease: EASE }}
                      >
                        <button
                          type="button"
                          className="ach-row__btn"
                          onMouseEnter={() => setHover(index)}
                          onFocus={() => setHover(index)}
                          onBlur={() => setHover(null)}
                          onClick={() => setOpen(index)}
                        >
                          <span className="ach-row__num">{String(n).padStart(2, '0')}</span>
                          <span className="ach-row__thumb" aria-hidden="true">
                            <img src={a.src} alt="" loading="lazy" draggable={false} />
                          </span>
                          <span className="ach-row__text">
                            <span className="ach-row__title">{main}</span>
                            {sub && <span className="ach-row__sub">{sub}</span>}
                          </span>
                          <span className={`ach-row__tag${win ? ' is-win' : ''}`}>
                            {win && <Trophy size={13} strokeWidth={2.2} />}
                            {a.tag}
                          </span>
                          <span className="ach-row__go" aria-hidden="true">
                            <ArrowUpRight size={18} />
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ol>
              </motion.section>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {/* the photo that trails the cursor */}
      {!reduce && (
        <motion.div className="ach-preview" style={{ x, y, rotate }} aria-hidden="true">
          <AnimatePresence>
            {current && (
              <motion.div
                key={current.id}
                className="ach-preview__card"
                initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(50% 0% 50% 0%)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <img src={current.src} alt="" draggable={false} />
                <span className="ach-preview__tag">{current.tag}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AchievementLightbox
        achievements={achievements}
        currentIndex={open}
        onClose={() => setOpen(null)}
        onSelect={(i) => setOpen(i)}
      />
    </div>
  );
};
