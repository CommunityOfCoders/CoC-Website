import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

type RevealVariant = 'up' | 'clip' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  /** stagger delay in seconds */
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered reveal. Fires once on entry.
 * - 'up'   fade + slide-up (default)
 * - 'clip' curtain reveal, top-to-bottom (for imagery)
 * - 'fade' plain fade
 */
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 26, variant = 'up', className, as = 'div' }) => {
  const MotionTag = motion[as];

  const variants: Variants =
    variant === 'clip'
      ? {
          hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
          show: { clipPath: 'inset(0 0 0% 0)', opacity: 1, transition: { duration: 1, ease: EASE, delay } },
        }
      : variant === 'fade'
        ? {
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.8, ease: EASE, delay } },
          }
        : {
            hidden: { opacity: 0, y },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
          };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
