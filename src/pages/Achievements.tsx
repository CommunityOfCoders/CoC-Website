import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import KineticWords from '../components/ui/KineticHeading';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { AchievementIndex } from '../components/achievements/AchievementIndex';
import './Achievements.css';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Achievements: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const heroWords = [
    { t: 'Celebrating' },
    { t: 'Our' },
    { t: 'Milestones' },
    { t: '&' },
    { t: 'Victories', mark: true },
  ];

  return (
    <div className="achievements-page">
      {/* Hero Section */}
      <header ref={heroRef} className="achievements-hero">
        <div className="container achievements-hero__container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="eyebrow achievements-hero__eyebrow"
          >
            Milestones & Honors
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
            Hackathon finals, ICPC regionals, open-source scholarships and the wins in between. Open any of them to see the moment.
          </motion.p>

        </div>
      </header>

      {/* The awards index flows straight on from the heading - one piece, no separate blocks */}
      <section className="achievements-journey">
        <div className="container">
          <AchievementIndex achievements={ACHIEVEMENTS} />
        </div>
      </section>

    </div>
  );
};

export default Achievements;
