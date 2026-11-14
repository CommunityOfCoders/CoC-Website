import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Code2 } from 'lucide-react';
import KineticWords from '../components/ui/KineticHeading';
import Reveal from '../components/ui/Reveal';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { AchievementTimeline } from '../components/achievements/AchievementTimeline';
import './Achievements.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/* everything contest-shaped: ICPC rounds, ACM-W Lady Ada */
const CP_ITEMS = ACHIEVEMENTS.filter((a) => /ICPC|LADY ADA/i.test(a.tag));

export const CompetitiveProgramming: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroWords = [
    { t: 'Competitive' },
    { t: 'Programming', mark: true },
    { t: 'at' },
    { t: 'VJTI' },
  ];

  return (
    <div className="achievements-page">
      <header ref={heroRef} className="achievements-hero">
        <div className="container achievements-hero__container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="eyebrow achievements-hero__eyebrow"
          >
            ICPC · Contests · Rankings
          </motion.div>

          <h1 className="achievements-hero__title">
            <KineticWords words={heroWords} triggerRef={heroRef} baseDelay={0.15} />
          </h1>

          <motion.p
            className="achievements-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            Our teams take on the ICPC circuit, from regionals across India to the Asia West Finals.
          </motion.p>

          <motion.div
            className="achievements-hero__stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          >
            <div className="achievements-hero__stat-item">
              <Code2 size={14} className="achievements-hero__stat-num" />
              <span>
                <strong className="achievements-hero__stat-num">{CP_ITEMS.length}</strong> Contest Milestones
              </span>
            </div>
            <div className="achievements-hero__stat-divider" />
            <div className="achievements-hero__stat-item">
              <span>ICPC Asia West Finals 2026</span>
            </div>
          </motion.div>

          <motion.div
            className="achievements-hero__scroll-prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <span>Scroll to explore</span>
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </header>

      <section className="section achievements-journey">
        <div className="container">
          <AchievementTimeline achievements={CP_ITEMS} />
        </div>
      </section>

      <section className="achievements-closing">
        <div className="container achievements-closing__container">
          <Reveal variant="up" y={30}>
            <div className="achievements-closing__card">
              <h2 className="achievements-closing__title">
                More contests ahead<span className="achievements-closing__dot">.</span>
              </h2>
              <div className="achievements-closing__actions">
                <a href="#achievements" className="btn btn--hero-cta">
                  All Achievements <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default CompetitiveProgramming;
