import React, { useRef } from 'react';
import { motion, useReducedMotion, useSpring, type Variants } from 'framer-motion';
import { CalendarDays, GitPullRequestArrow, Briefcase, ArrowUpRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
  {
    Icon: CalendarDays,
    title: 'Events',
    body: 'Hackathons, hands-on workshops and talks that turn a semester of theory into things you can actually build.',
    href: '#events',
    featured: false,
  },
  {
    Icon: GitPullRequestArrow,
    title: 'Open Source',
    body: 'Real repos, real reviews. We mentor first PRs and maintain projects the whole campus uses.',
    href: '#opensource',
    featured: true,
  },
  {
    Icon: Briefcase,
    title: 'Placements',
    body: 'A documented record of where our members landed - placements, internships and PPOs, by company and role.',
    href: '#placements',
    featured: false,
  },
];

/* entrance: the cell unfolds up out of the floor, its pieces land one after another */
const cellV: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -28 },
  show: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 1, ease: EASE, delay: i * 0.13, when: 'beforeChildren', staggerChildren: 0.08 },
  }),
};
const pieceV: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const iconV: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -40 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 14 } },
};
const numV: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

type Pillar = (typeof PILLARS)[number];

const PillarCard: React.FC<{ p: Pillar; i: number }> = ({ p, i }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 18 });
  const ry = useSpring(0, { stiffness: 200, damping: 18 });

  // remember where the pointer is, so the colour floods from (and drains back to) that spot
  const track = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    if (e.pointerType === 'mouse' && !reduce) {
      ry.set((px - 0.5) * 12);
      rx.set((0.5 - py) * 10);
    }
  };
  const reset = (e: React.PointerEvent<HTMLAnchorElement>) => {
    track(e);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={`pillar-cell${p.featured ? ' pillar-cell--feat' : ''}`}
      variants={cellV}
      custom={i}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      style={{ transformPerspective: 1100 }}
    >
      <motion.a
        ref={ref}
        href={p.href}
        className={`pillar${p.featured ? ' pillar--feat' : ''}`}
        onPointerEnter={track}
        onPointerMove={track}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      >
        <span className="pillar__flood" aria-hidden="true" />
        <motion.span className="pillar__num" variants={numV} aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </motion.span>

        <motion.span className="pillar__icon" variants={iconV}>
          <p.Icon />
        </motion.span>

        <motion.div className="pillar__body" variants={pieceV}>
          <h3 className="pillar__title" aria-label={p.title}>
            {[...p.title].map((c, k) => (
              <span className="pillar__ch" key={k} aria-hidden="true">
                <span className="pillar__chi" data-c={c} style={{ '--i': k } as React.CSSProperties}>
                  {c === ' ' ? ' ' : c}
                </span>
              </span>
            ))}
          </h3>
          <p className="pillar__text">{p.body}</p>
        </motion.div>

        <motion.span className="pillar__go" variants={pieceV}>
          <span>Learn more</span> <ArrowUpRight />
        </motion.span>
      </motion.a>
    </motion.div>
  );
};

const WhatWeDo: React.FC = () => (
  <section className="section wwd" id="what">
    <div className="container">
      <div className="wwd__head">
        <div className="section-head">
          <span className="eyebrow">What we do</span>
          <h2 className="section-title">Three things we do<br />seriously well.</h2>
        </div>
        <div className="wwd__tag" role="img" aria-label="for the juniors, by the seniors" data-bg="CoC">
          <svg className="wwd__tag-arrow" viewBox="0 0 120 160" aria-hidden="true">
            <path d="M100 6 C 10 20, 4 100, 78 140" />
            <path d="M58 138 L 80 142 L 72 120" />
          </svg>
          <span className="wwd__tag-small">for the</span>
          <span className="wwd__tag-big wwd__tag-big--out" data-t="juniors">juniors</span>
          <span className="wwd__tag-small wwd__tag-small--by">by the</span>
          <span className="wwd__tag-big wwd__tag-big--fill" data-t="seniors">
            seniors
            <svg className="wwd__tag-line" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 12 C 60 2, 110 16, 160 8 S 260 4, 297 11" />
            </svg>
          </span>
        </div>
      </div>

      <div className="wwd__grid">
        {PILLARS.map((p, i) => (
          <PillarCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default WhatWeDo;
