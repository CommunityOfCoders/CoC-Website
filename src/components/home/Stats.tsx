import React from "react";
import Reveal from "../ui/Reveal";
import CountUp from "../ui/CountUp";

/* Counted from the site's own data (Nov 2026): 131 members on the CP Club
   leaderboard, 31 events in eventsData, 50 projects on the Projects page and
   44 companies across placements, internships and PPOs. Update with the data. */
const STATS = [
  { to: 130, suffix: "+", label: "Active members" },
  { to: 30, suffix: "+", label: "Events hosted" },
  { to: 50, suffix: "+", label: "Projects built" },
  { to: 40, suffix: "+", label: "Companies hired" },
];

const Stats: React.FC = () => (
  <section className="stats">
    <div className="container stats__grid">
      {STATS.map((s, i) => (
        <Reveal className="stats__item" key={s.label} delay={i * 0.08}>
          <CountUp className="stats__num" to={s.to} suffix={s.suffix} />
          <span className="stats__label">{s.label}</span>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Stats;
