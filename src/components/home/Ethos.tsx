import React from 'react';
import { Users, Compass, Hammer, GitFork, Briefcase, Trophy } from 'lucide-react';
import Reveal from '../ui/Reveal';

/* "What we're about" - descriptive, not persuasive. */
const FEATURES = [
  { Icon: Users, title: 'Community', body: 'A few hundred people across batches who actually answer at 1am.' },
  { Icon: Compass, title: 'Mentorship', body: 'Seniors and alumni pass down what worked - and what didn\'t.' },
  { Icon: Hammer, title: 'Real projects', body: 'The tools on this page run on campus right now. That\'s the bar.' },
  { Icon: GitFork, title: 'Open source', body: 'Public repos, proper reviews, the same workflow industry uses.' },
  { Icon: Briefcase, title: 'Placements', body: 'A decade of outcomes documented, so juniors can see the path.' },
  { Icon: Trophy, title: 'Events', body: 'Hackathons, arenas and demo days on a calendar that never empties.' },
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
