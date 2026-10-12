import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import { SpotlightCard } from './SpotlightCard';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  total: number;
  onOpenLightbox: (index: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  index,
  onOpenLightbox,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-15% 0px' });
  const reduce = useReducedMotion();

  return (
    <div
      ref={cardRef}
      className={`achievement-item ${isInView ? 'is-in-view' : ''}`}
    >
      {/* Timeline Node (●) */}
      <div className="achievement-item__node-wrapper">
        <div className={`achievement-node ${isInView ? 'achievement-node--active' : ''}`}>
          <span className="achievement-node__core" />
          <span className="achievement-node__ring" />
          <span className="achievement-node__halo" />
        </div>
      </div>

      {/* Main Image & Info Card */}
      <motion.div
        className="achievement-item__card-wrapper"
        initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <SpotlightCard
          className="achievement-card"
          onClick={() => onOpenLightbox(index)}
        >
          <div className="achievement-card__inner">
            {/* Image Container */}
            <div className="achievement-card__photo-frame">
              <img
                src={achievement.src}
                alt={achievement.alt}
                loading="lazy"
                className="achievement-card__img"
              />
            </div>

            {/* Info Box */}
            <div className="achievement-card__desc-box">
              <div className="achievement-card__desc-header">
                <span className="achievement-card__tag">
                  <Sparkles size={12} /> {achievement.tag}
                </span>
              </div>

              <h3 className="achievement-card__desc-title">
                {achievement.title}
              </h3>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};
