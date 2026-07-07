import React from 'react';
import { ArrowUpRight, Star, GitPullRequest } from 'lucide-react';
import Reveal from '../ui/Reveal';

/* Dummy repo stats — wire to the GitHub API (or hardcode real numbers)
   when the Opensource page lands. */
const REPOS = [
  { name: 'coc-website', lang: 'TypeScript', desc: 'This site. Yes, it\'s open source too.', stars: 128, prs: 42 },
  { name: 'campus-compass', lang: 'React', desc: 'Campus navigation PWA, maintained across batches.', stars: 96, prs: 31 },
  { name: 'dsa-sheets', lang: 'C++', desc: 'Curated problem sets with editorial solutions.', stars: 210, prs: 57 },
  { name: 'vjti-results-api', lang: 'Python', desc: 'Clean API over the results portal. You\'re welcome.', stars: 74, prs: 19 },
];

const OpenSourceHighlight: React.FC = () => (
  <section className="section oss">
    <div className="container">
      <div className="oss__head">
        <Reveal className="section-head">
          <span className="eyebrow">Open source</span>
          <h2 className="section-title">Maintained across<br />batches, in public.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="oss__intro">
            Repos outlive the people who start them here. Each one gets handed
            down, reviewed and kept alive — that's the whole point.
          </p>
        </Reveal>
      </div>

      <div className="oss__list">
        {REPOS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.07} className="repo">
            <a href="#opensource" className="repo__link">
              <span className="repo__name">{r.name}</span>
              <span className="repo__desc">{r.desc}</span>
              <span className="repo__meta">
                <span className="repo__lang"><i className="repo__lang-dot" />{r.lang}</span>
                <span className="repo__stat"><Star /> {r.stars}</span>
                <span className="repo__stat"><GitPullRequest /> {r.prs} merged</span>
                <ArrowUpRight className="repo__go" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default OpenSourceHighlight;
