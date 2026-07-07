import React from 'react';
import Reveal from '../ui/Reveal';

/* Dummy recent milestones — keep this list short and fresh; it reads
   as "the club is alive", not as an archive. */
const ACTIVITY = [
  { date: 'Mar 2026', title: 'Hack8 wrapped', note: '340 participants, 61 submissions, one very tired organizing team.' },
  { date: 'Jan 2026', title: 'Winter of Code, cohort 4', note: '28 first-time contributors merged their first PRs.' },
  { date: 'Nov 2025', title: 'Open Source October totals', note: '120+ PRs merged across community repos in one month.' },
  { date: 'Sep 2025', title: 'Freshers\' codelab', note: 'The FE batch shipped their first deployed pages in week two.' },
  { date: 'Aug 2025', title: 'New council takes over', note: 'Handover done, roadmap published, calendar already full.' },
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
