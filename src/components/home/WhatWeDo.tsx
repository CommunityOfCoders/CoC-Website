import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GSoCLogo, LFXLogo, JuliaLogo, HacktoberfestLogo, CERNLogo } from '../ui/OrgLogos';
import pxHackX from '../../assets/polaroids/hackxcelerate-2026.jpg';
import pxSih from '../../assets/polaroids/sih-2026.jpg';
import pxCodeverse from '../../assets/polaroids/codeverse.jpg';
import lgDeshaw from '../../assets/company-logos/deshaw.png';
import lgGoogle from '../../assets/company-logos/google.png';
import lgGoldman from '../../assets/company-logos/goldman.png';
import lgMorgan from '../../assets/company-logos/morganstanley.png';
import lgVisa from '../../assets/company-logos/visa.png';

const EASE = [0.16, 1, 0.3, 1] as const;

type Item = { key: string; label: string; href: string; img?: string; Logo?: React.FC<React.SVGProps<SVGSVGElement>> };
type Pillar = { title: string; kicker: string; body: string; href: string; kind: 'photos' | 'orgs' | 'logos'; items: Item[] };

/* every picture / logo is real and links to the exact place it comes from */
const PILLARS: Pillar[] = [
  {
    title: 'Events',
    kicker: 'Hackathons · contests · talks',
    body: 'Hackathons, hands-on workshops and talks that turn a semester of theory into things you can actually build.',
    href: '#events',
    kind: 'photos',
    items: [
      { key: 'codeverse', label: 'CodeVerse', href: '#events?id=codeverse', img: pxCodeverse },
      { key: 'hackx', label: 'HackXcelerate 2026', href: '#events?id=hackxcelerate-2026', img: pxHackX },
      { key: 'sih', label: 'Smart India Hackathon 2026', href: '#events?id=sih-2026', img: pxSih },
    ],
  },
  {
    title: 'Open Source',
    kicker: 'GSoC · LFX · JSoC',
    body: 'Guidance for open-source contributors, from the first issue and pull request to GSoC and LFX.',
    href: '#opensource',
    kind: 'orgs',
    items: [
      { key: 'gsoc', label: 'Google Summer of Code', href: '#opensource', Logo: GSoCLogo },
      { key: 'lfx', label: 'LFX Mentorship', href: '#opensource', Logo: LFXLogo },
      { key: 'julia', label: 'Julia Seasons of Contributions', href: '#opensource', Logo: JuliaLogo },
      { key: 'cern', label: 'CERN', href: '#opensource', Logo: CERNLogo },
      { key: 'hacktoberfest', label: 'Hacktoberfest', href: '#opensource', Logo: HacktoberfestLogo },
    ],
  },
  {
    title: 'Placements',
    kicker: 'Placements · internships · PPOs',
    body: 'A documented record of where our members landed - placements, internships and PPOs, by company and role.',
    href: '#placements',
    kind: 'logos',
    items: [
      { key: 'deshaw', label: 'DE Shaw', href: '#placements', img: lgDeshaw },
      { key: 'google', label: 'Google', href: '#placements', img: lgGoogle },
      { key: 'goldman', label: 'Goldman Sachs', href: '#placements', img: lgGoldman },
      { key: 'morgan', label: 'Morgan Stanley', href: '#placements', img: lgMorgan },
      { key: 'visa', label: 'Visa', href: '#placements', img: lgVisa },
    ],
  },
];

/* entrance: transform + opacity only */
const cardV: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: i * 0.12 } }),
};

const PillarCard: React.FC<{ p: Pillar; i: number }> = ({ p, i }) => {
  const reduce = useReducedMotion();
  const num = String(i + 1).padStart(2, '0');
  return (
    <motion.article
      className={`pillar pillar--${p.kind}`}
      variants={cardV}
      custom={i}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="pillar__fill" aria-hidden="true" />
      <span className="pillar__ghost" aria-hidden="true">{num}</span>

      <div className="pillar__top">
        <span className="pillar__idx">{num}<em>/03</em></span>
        <span className="pillar__arrow" aria-hidden="true"><ArrowUpRight /></span>
      </div>

      {/* shown when the card opens up: what it is, plus real photos / logos */}
      <div className="pillar__reveal">
        <p className="pillar__text">{p.body}</p>
        <ul className="pillar__stack" aria-label={`${p.title}: highlights`}>
          {p.items.map((it, k) => (
            <li key={it.key} style={{ '--k': k, '--n': p.items.length } as React.CSSProperties}>
              <a href={it.href} className="pillar__chip" title={it.label} aria-label={it.label}>
                {it.img ? <img src={it.img} alt="" loading="lazy" decoding="async" draggable={false} /> : null}
                {it.Logo ? <it.Logo /> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="pillar__main">
        <p className="pillar__kicker">{p.kicker}</p>
        <h3 className="pillar__title">
          {/* the whole card is this link (stretched over it with ::after) */}
          <a href={p.href} className="pillar__link">
            <span className="pillar__roll" data-t={p.title}>{p.title}</span>
          </a>
        </h3>
      </div>
    </motion.article>
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
