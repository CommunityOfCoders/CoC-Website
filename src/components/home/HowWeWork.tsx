import React from 'react';
import { Check } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Parallax from '../ui/Parallax';
import { IMG } from '../../data/placeholderImages';

const POINTS = [
  'Everything ships - workshops end with working code, not certificates',
  'Code review culture: seniors read your PRs the way industry will',
  'Teams mix years, so first-years work on the same repos as final-years',
];

/** "How we work" - informational split. Showcase framing, not a pitch. */
const HowWeWork: React.FC = () => (
  <section className="section section--bone how">
    <div className="container how__grid">
      <Reveal className="how__media" variant="clip">
        <Parallax drift={26}>
          <div className="how__img photo photo--hover">
            <img src={IMG.howWeWork} alt="Two CoC members reviewing code together" loading="lazy" />
          </div>
        </Parallax>
        <div className="how__stamp">Since<br />2016</div>
      </Reveal>

      <div className="how__copy">
        <Reveal><span className="eyebrow eyebrow--bone">How we work</span></Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">Learn by shipping,<br />in the open.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="how__lead">
            CoC runs like a small engineering org, not a classroom. Work happens
            in public repos, decisions get argued in the group chat, and the
            default answer to "can we build this?" is a branch name.
          </p>
        </Reveal>
        <ul className="how__list">
          {POINTS.map((p, i) => (
            <Reveal as="li" className="how__item" key={p} delay={0.15 + i * 0.07}>
              <span className="how__check"><Check /></span>{p}
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default HowWeWork;
