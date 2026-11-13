import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, Award, ChevronDown, Flame } from 'lucide-react';
import KineticWords from '../components/ui/KineticHeading';
import Reveal from '../components/ui/Reveal';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { AchievementTimeline } from '../components/achievements/AchievementTimeline';
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
            “Celebrating the milestones, victories, and moments that shaped our journey.”
          </motion.p>

          {/* Hero Stats Pill Bar */}
          <motion.div
            className="achievements-hero__stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          >
            <div className="achievements-hero__stat-item">
              <Flame size={14} className="achievements-hero__stat-num" />
              <span>
                <strong className="achievements-hero__stat-num">{ACHIEVEMENTS.length + 1}+</strong> Achievements
              </span>
            </div>
            <div className="achievements-hero__stat-divider" />
            <div className="achievements-hero__stat-item">
              <span>VJTI's Legacy</span>
            </div>
            <div className="achievements-hero__stat-divider" />
            <div className="achievements-hero__stat-item">
              <span>Continuous Excellence</span>
            </div>
          </motion.div>

          {/* Floating Scroll Indicator */}
          <motion.div
            className="achievements-hero__scroll-prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <span>Scroll to explore timeline</span>
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </header>

      {/* Main Single-Column Chained Achievement Journey */}
      <section className="section achievements-journey">
        <div className="container">
          <AchievementTimeline achievements={ACHIEVEMENTS} />
        </div>
      </section>

      {/* End of Journey / Closing Section */}
      <section className="achievements-closing">
        <div className="container achievements-closing__container">
          <Reveal variant="up" y={30}>
            <div className="achievements-closing__card">
              <div className="achievements-closing__badge">
                <Trophy size={18} />
                <span>End of Timeline</span>
              </div>

              <h2 className="achievements-closing__title">
                And many more milestones ahead<span className="achievements-closing__dot">.</span>
              </h2>

              <p className="achievements-closing__subtext">
                Our story doesn't stop here. Community of Coders continues to innovate, compete, and build the future of software together.
              </p>

              <div className="achievements-closing__actions">
                <a href="#events" className="btn btn--hero-cta">
                  Explore Past Events <ArrowRight size={16} />
                </a>
                <a href="#contact" className="btn btn--ghost">
                  Get In Touch <Award size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
