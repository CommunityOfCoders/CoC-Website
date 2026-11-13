import React from 'react';
import { CalendarDays, GitPullRequestArrow, Briefcase, ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';

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
    body: 'A documented, year-over-year record of where our members landed - companies, domains and outcomes.',
    href: '#placements',
    featured: false,
  },
];

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
          <Reveal key={p.title} delay={i * 0.1} className={`pillar${p.featured ? ' pillar--feat' : ''}`}>
            <a href={p.href} className="pillar__link">
              <span className="pillar__icon"><p.Icon /></span>
              <div className="pillar__body">
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__text">{p.body}</p>
              </div>
              <span className="pillar__go">Learn more <ArrowUpRight /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhatWeDo;
