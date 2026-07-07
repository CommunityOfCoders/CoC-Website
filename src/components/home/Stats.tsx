import React from 'react';
import Reveal from '../ui/Reveal';
import CountUp from '../ui/CountUp';

/* Placeholder figures — replace with real club numbers. */
const STATS = [
  { to: 500, suffix: '+', label: 'Active members' },
  { to: 50, suffix: '+', label: 'Events hosted' },
  { to: 120, suffix: '+', label: 'Projects built' },
  { to: 40, suffix: '+', label: 'Companies placed' },
];

const Stats: React.FC = () => (
  <section className="stats">
    <div className="container stats__grid">
      {STATS.map((s, i) => (
        <Reveal className="stats__item" key={s.label} delay={i * 0.08}>
          <span className="stats__num"><CountUp to={s.to} suffix={s.suffix} /></span>
          <span className="stats__label">{s.label}</span>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Stats;
