import React from 'react';
import Reveal from '../ui/Reveal';

/* Dummy recent milestones — keep this list short and fresh; it reads
   as "the club is alive", not as an archive. */
const ACTIVITY = [
  { date: 'July 2026', title: 'ProjectX Mentorship \'26 Cohort', note: '150+ applications, 32 accepted.' },
  { date: 'Jan 2026', title: 'Codeverse', note: 'As series of 12 hackathons, total prize pool of 90k INR.' },
  { date: 'April 2026', title: 'RouteQuest 2026', note: 'A web development CTF competition, with a prize pool of 20k INR.' },
  { date: 'April 2026', title: 'OpenCV Workshop', note: 'Learn the fundamentals of computer vision and image processing.' },
  { date: 'July 2025', title: 'Project X Mentorship \'25 Cohort', note: '140+ applications, 29 accepted.' },
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
            <span className="act__date">{a.date}</span>
            <div className="act__body">
              <h3 className="act__title">{a.title}</h3>
              <p className="act__note">{a.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default CommunityActivity;
