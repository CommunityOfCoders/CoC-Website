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
        <p className="wwd__tag" aria-label="for the juniors, by the seniors" data-bg="SENIORS">
          <span className="wwd__tag-a">for the juniors</span>
          <span className="wwd__tag-b">by the seniors</span>
        </p>
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
