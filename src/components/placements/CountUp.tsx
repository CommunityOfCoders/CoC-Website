import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

// ease-out-expo
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const reduceMotion = useReducedMotion();

  const start = () => {
    if (started.current) return;
    started.current = true;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1000 / duration, 1);
      setDisplay(value * easeOutExpo(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={start}
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
};

export default CountUp;
