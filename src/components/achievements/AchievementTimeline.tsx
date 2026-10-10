import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import type { Achievement } from '../../data/achievementsData';
import { AchievementCard } from './AchievementCard';
import { AchievementLightbox } from './AchievementLightbox';

interface AchievementTimelineProps {
  achievements: Achievement[];
}

export const AchievementTimeline: React.FC<AchievementTimelineProps> = ({
  achievements,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 85%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="achievement-timeline">
      {/* Central continuous vertical line */}
      <div className="achievement-timeline__line-track">
        <div className="achievement-timeline__line-bg" />
        <motion.div
          className="achievement-timeline__line-fill"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {/* Chained vertical list of achievements */}
      <div className="achievement-timeline__chain">
        {achievements.map((item, idx) => (
          <AchievementCard
            key={item.id}
            achievement={item}
            index={idx}
            total={achievements.length}
            onOpenLightbox={(index) => setLightboxIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox for inspecting any card in high-res full screen */}
      <AchievementLightbox
        achievements={achievements}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelect={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
