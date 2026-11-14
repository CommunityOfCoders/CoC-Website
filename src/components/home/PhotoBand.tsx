import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Full-width candid group-photo moment, scroll-choreographed:
 * the frame starts inset with rounded corners and expands to full
 * bleed as it crosses the viewport, while the photo drifts against
 * the scroll. Falls back to a static full-bleed under reduced motion.
 */
const PhotoBand: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const clip = useTransform(
    scrollYProgress,
    [0.05, 0.42],
    ['inset(9% 6% 9% 6% round 40px)', 'inset(0% 0% 0% 0% round 0px)'],
  );
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  return (
    <section className="band" ref={ref}>
      <a href="#events?id=codeverse" aria-label="View CodeVerse details" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <motion.div className="band__frame" style={reduce ? undefined : { clipPath: clip }}>
          <motion.img
            src="/photos/2025/codeverse-band.jpg"
            alt="The CoC community gathered after an event"
            style={reduce ? { objectPosition: '50% 62%' } : { y, scale, objectPosition: '50% 62%' }}
            loading="lazy"
          />
          <div className="band__shade" aria-hidden />
          <p className="band__cap">
            <span>CodeVerse 2025</span>
          </p>
        </motion.div>
      </a>
    </section>
  );
};

export default PhotoBand;
