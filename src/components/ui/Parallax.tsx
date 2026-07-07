import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  /** px the element drifts across its scroll journey (negative = drifts up) */
  drift?: number;
  className?: string;
}

/**
 * Scroll-linked parallax wrapper. The child drifts `drift`px as it
 * travels through the viewport. Disabled under reduced-motion.
 */
const Parallax: React.FC<ParallaxProps> = ({ children, drift = 40, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
