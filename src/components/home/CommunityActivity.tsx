import React from 'react';
import Reveal from '../ui/Reveal';

const ACTIVITY = [
  {
    id: 'hello-world-2026',
    date: 'Oct 2026',
    title: 'Hello World – FY Domain Exhibition',
    note: 'Open Door exhibition introducing 300+ first-year students to tech domains.',
  },
  {
    id: 'icpc-prelims-2026',
    date: 'Oct 2026',
    title: 'ICPC 2026 College Prelims',
    note: 'First stage contest selecting VJTI representatives for ICPC.',
  },
  {
    id: 'project-x-final-meet-2026',
    date: 'Sept 2026',
    title: 'Project X – Final Meet',
    note: 'Milestone project demos, senior reviews, and open-source guidance (GSoC, LFX).',
  },
  {
    id: 'sih-2026',
    date: 'Aug 2026',
    title: 'Smart India Hackathon 2026',
    note: 'Internal hackathon with 100+ teams and 10+ panels developing impactful solutions.',
  },
  {
    id: 'routequest-2026',
    date: 'April 2026',
    title: 'RouteQuest 2026',
    note: 'FY-only Capture The Flag league and season-closing event.',
  },
  {
    id: 'codehunt-2026',
    date: 'April 2026',
    title: 'Codehunt 2026',
    note: 'Flagship CP and physical campus treasure hunt exclusively for first-years.',
  },
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
          <Reveal as="li" key={a.id} delay={i * 0.06} className="act__item">
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
