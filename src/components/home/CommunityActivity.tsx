import React from 'react';
import Reveal from '../ui/Reveal';

const ACTIVITY = [
  { id: 'routequest-2026', date: 'April 2026', title: 'RouteQuest 2026', note: 'FY-only Capture The Flag league and season-closing event.' },
  { id: 'codehunt-2026', date: 'April 2026', title: 'Codehunt 2026', note: 'Flagship CP and physical campus treasure hunt exclusively for first-years.' },
  { id: 'icpc-vjti-2026', date: 'March 2026', title: 'ICPC VJTI Internal Round', note: 'Selection round to represent VJTI at the ICPC Regionals.' },
  { id: 'hackxcelerate-2026', date: 'Feb 2026', title: 'HackXcelerate 2026', note: '12-hour intensive hackathon with dual ML and Dev tracks, ₹35,000 prize pool.' },
  { id: 'debug-a-thon-2026', date: 'Jan 2026', title: 'CodeVerse 2.0', note: 'Flagship tech symposium with 9 competitions across 4 domains, ₹90,000 prize pool.' },
  { id: 'project-x-2025', date: 'July 2025', title: 'Project X', note: "VJTI's senior-led flagship mentorship program for junior developers." },
];

const CommunityActivity: React.FC = () => (
  <section className="section act">
    <div className="container act__grid">
      <Reveal className="section-head act__head">
        <span className="eyebrow">Recent activity</span>
        <h2 className="section-title">What we've been<br />up to lately.</h2>
      </Reveal>

      <ol className="act__list">
        {ACTIVITY.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.06} className="act__item">
            <a href={`#events?id=${a.id}`} className="act__link" aria-label={`View ${a.title} details`}>
              <span className="act__date">{a.date}</span>
              <div className="act__body">
                <h3 className="act__title">{a.title}</h3>
                <p className="act__note">{a.note}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default CommunityActivity;
