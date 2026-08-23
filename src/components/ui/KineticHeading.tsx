import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export interface KineticWord {
  t: string;
  mark?: boolean;
}

/**
 * Kinetic word reveal - each word rises out of its own clip, staggered,
 * once the given ref scrolls into view. Reduced motion: plain static text.
 * Shared by Events/Projects/OpenSource page headings.
 */
export const KineticWords: React.FC<{
  words: KineticWord[];
  triggerRef: React.RefObject<HTMLElement | null>;
  baseDelay?: number;
  stagger?: number;
}> = ({ words, triggerRef, baseDelay = 0, stagger = 0.06 }) => {
  const reduce = useReducedMotion();
  const inView = useInView(triggerRef, { once: true });

  return (
    <>
      {words.map((w, i) => (
        <span className="kinetic__clip" key={`${w.t}-${i}`}>
          {reduce ? (
            <span className={`kinetic__word${w.mark ? ' is-mark' : ''}`}>{w.t}</span>
          ) : (
            <motion.span
              className={`kinetic__word${w.mark ? ' is-mark' : ''}`}
              initial={{ y: '112%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.65, ease: EASE, delay: baseDelay + i * stagger }}
            >
              {w.t}
            </motion.span>
          )}
        </span>
      ))}
    </>
  );
};

export default KineticWords;
