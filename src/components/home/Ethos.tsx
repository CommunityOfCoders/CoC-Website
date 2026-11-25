import React from 'react';
import { Users, Compass, Hammer, GitFork, Briefcase, Trophy } from 'lucide-react';
import Reveal from '../ui/Reveal';

/* "What we're about" - descriptive, not persuasive. */
const FEATURES = [
  { Icon: Users, title: 'Community', body: 'The core team is always around for doubts, big or small, whatever year you are in.' },
  { Icon: Compass, title: 'Mentorship', body: 'Seniors and alumni pass down what worked - and what didn\'t.' },
  { Icon: Hammer, title: 'Real projects', body: 'New projects built every year, by members from first-years to final-years.' },
  { Icon: GitFork, title: 'Open source', body: 'Guidance for your first PRs and for programs like GSoC and LFX, from real contributors.' },
  { Icon: Briefcase, title: 'Placements', body: 'Help from seniors through placement season, with every offer documented for the batches after.' },
  { Icon: Trophy, title: 'Events', body: 'Hackathons, contests, workshops and talks, with activities running all year round.' },
];

const Ethos: React.FC = () => (
  <section className="section ethos">
    <div className="container">
      <Reveal className="section-head ethos__head">
        <span className="eyebrow">What we're about</span>
        <h2 className="section-title">Six things that<br />define this place.</h2>
      </Reveal>

      <div className="ethos__grid">
        {FEATURES.map((f, i) => (
          <Reveal className="ethos__item" key={f.title} delay={(i % 3) * 0.08}>
            <span className="ethos__icon"><f.Icon /></span>
            <h3 className="ethos__title">{f.title}</h3>
            <p className="ethos__text">{f.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Ethos;
