import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { IMG } from '../../data/placeholderImages';

/* Dummy featured work — swap for real projects (and real screenshots)
   when the Projects page content lands. */
const PROJECTS = [
  {
    img: IMG.projectA,
    name: 'Campus Compass',
    blurb: 'Indoor navigation PWA for the VJTI campus — timetables, room-finder and fest maps in one place.',
    tags: ['React', 'Node', 'PWA'],
  },
  {
    img: IMG.projectB,
    name: 'GradeVault',
    blurb: 'Results analytics for students: semester trends, SGPA projections and branch-level insights.',
    tags: ['Next.js', 'Postgres'],
  },
  {
    img: IMG.projectC,
    name: 'CoC Judge',
    blurb: 'Our in-house contest judge — sandboxed execution, live leaderboards, used at every Algo Arena.',
    tags: ['Go', 'Docker', 'Redis'],
  },
];

const FeaturedProjects: React.FC = () => (
  <section className="section proj">
    <div className="container">
      <div className="proj__head">
        <Reveal className="section-head">
          <span className="eyebrow">Featured work</span>
          <h2 className="section-title">Built here,<br />used for real.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <a href="#projects" className="btn btn--ghost">All projects <ArrowUpRight /></a>
        </Reveal>
      </div>

      <div className="proj__grid">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="proj-card">
            <a href="#projects" className="proj-card__link">
              <div className="proj-card__img photo photo--hover">
                <img src={p.img} alt={`${p.name} — project screenshot placeholder`} loading="lazy" />
              </div>
              <div className="proj-card__body">
                <h3 className="proj-card__name">{p.name} <ArrowUpRight /></h3>
                <p className="proj-card__blurb">{p.blurb}</p>
                <ul className="proj-card__tags">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedProjects;
