import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import KineticWords from '../components/ui/KineticHeading';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { AchievementGallery } from '../components/achievements/AchievementGallery';
import './Achievements.css';

const EASE = [0.16, 1, 0.3, 1] as const;

export const Achievements: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const heroWords = [
    { t: 'Wins' },
    { t: 'worth' },
    { t: 'framing.', mark: true },
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
            Hall of fame
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
            Hackathon finals, ICPC regionals, open-source scholarships and research grants, won by Community of Coders members. Open any of them for the full story.
          </motion.p>

        </div>
      </header>

      {/* The awards index flows straight on from the heading - one piece, no separate blocks */}
      <section className="achievements-journey">
        <div className="container">
          <AchievementGallery achievements={ACHIEVEMENTS} />
        </div>
      </section>

    </div>
  );
};

export default Achievements;
