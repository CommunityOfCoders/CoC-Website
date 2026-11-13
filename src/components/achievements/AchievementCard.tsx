import React, { useRef } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Achievement } from '../../data/achievementsData';

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

  /* scroll-linked fade: each card rises + fades in as it enters, and
     drifts up + fades out as it leaves — alternating a hair of tilt */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const tilt = index % 2 === 0 ? -1.4 : 1.4;
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [70, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.94, 1, 1, 0.97]);
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [tilt, 0, 0, -tilt * 0.5]);

  const open = () => onOpenLightbox(index);
  const reveal = (delay: number, y0 = 24) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: y0 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-8% 0px' },
          transition: { duration: 0.7, ease: EASE, delay },
        };

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
        </div>
      </div>

      {/* Main Image & Info Card */}
      <motion.div
        className="achievement-item__card-wrapper"
        style={reduce ? undefined : { opacity, y, scale, rotate }}
      >
        <div
          className="achievement-card"
          role="button"
          tabIndex={0}
          aria-label={`Open ${achievement.title}`}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              open();
            }
          }}
        >
          <div className="achievement-card__inner">
            {/* Image: wipes open once, then the photo settles in */}
            <motion.div
              className="achievement-card__photo-frame"
              {...(reduce
                ? {}
                : {
                    initial: { clipPath: 'inset(0 0 100% 0 round 22px)' },
                    whileInView: { clipPath: 'inset(0 0 0% 0 round 22px)' },
                    viewport: { once: true, margin: '-8% 0px' },
                    transition: { duration: 0.9, ease: EASE, delay: 0.1 },
                  })}
            >
              <motion.img
                src={achievement.src}
                alt={achievement.alt}
                loading="lazy"
                className="achievement-card__img"
                {...(reduce
                  ? {}
                  : {
                      initial: { scale: 1.12 },
                      whileInView: { scale: 1 },
                      viewport: { once: true, margin: '-8% 0px' },
                      transition: { duration: 1.3, ease: EASE, delay: 0.1 },
                    })}
              />
            </motion.div>

            {/* Info Box */}
            <motion.div className="achievement-card__desc-box" {...reveal(0.3)}>
              <div className="achievement-card__desc-header">
                <span className="achievement-card__tag">
                  {achievement.tag}
                </span>
              </div>

              <h3 className="achievement-card__desc-title">
                {achievement.title}
              </h3>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
