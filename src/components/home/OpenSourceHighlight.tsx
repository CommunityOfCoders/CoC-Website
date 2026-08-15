import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { FEATURED_ORGS, PROGRAMS } from '../../data/openSourceData';

const ALL_LOGOS = [
  ...PROGRAMS.map((p) => ({ name: p.name, Logo: p.Logo })),
  ...FEATURED_ORGS.filter((o) => !PROGRAMS.some((p) => p.name === o.name)).map((o) => ({
    name: o.name,
    Logo: o.Logo,
  })),
];

const MARQUEE_ITEMS = [...ALL_LOGOS, ...ALL_LOGOS];

const OpenSourceHighlight: React.FC = () => (
  <section className="section oss" id="opensource-highlight">
    <div className="container">
      <div className="oss__head">
        <Reveal className="section-head">
          <span className="eyebrow">Open source</span>
          <h2 className="section-title">
            Where we've<br />contributed.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="oss__head-right">
          <p className="oss__intro">
            From Google Summer of Code and LFX Mentorship to Julia and CNCF —
            CoC members contribute to leading open-source organizations worldwide.
          </p>
          <a href="#opensource" className="oss__head-link">
            <span>Explore open source</span>
            <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>

      {/* Infinite scrolling bar with all icons */}
      <Reveal delay={0.15}>
        <div className="oss__marquee-wrap">
          <div className="oss__marquee-track">
            {MARQUEE_ITEMS.map((item, idx) => (
              <a
                key={`${item.name}-${idx}`}
                href="#opensource"
                className="oss__marquee-logo"
                data-tip={item.name}
                aria-label={item.name}
              >
                <item.Logo width={34} height={34} />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default OpenSourceHighlight;
