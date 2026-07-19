import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TimelineContentProps {
  children?: React.ReactNode;
  /** sequence index — multiplies the per-step delay */
  animationNum: number;
  /** the element whose viewport entry triggers the whole sequence */
  timelineRef: React.RefObject<HTMLElement | null>;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  customVariants?: Variants;
  once?: boolean;
}

const defaultSequenceVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.5, duration: 0.5 },
  }),
  hidden: { filter: 'blur(20px)', y: 0, opacity: 0 },
};

/**
 * Scroll-triggered blur/slide reveal, sequenced by `animationNum`.
 * All instances sharing a `timelineRef` fire together when that element
 * enters the viewport, staggered by their index. Under reduced motion the
 * content renders directly at its final state (no blur, no slide).
 */
export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = false,
}) => {
  const reduce = useReducedMotion();
  const isInView = useInView(timelineRef, { once });
  const MotionComponent = motion[as || 'div'] as React.ElementType;

  return (
    <MotionComponent
      initial={reduce ? false : 'hidden'}
      animate={isInView ? 'visible' : reduce ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={customVariants || defaultSequenceVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
