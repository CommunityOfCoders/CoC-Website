import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Scroll-driven photographic backdrop.
 *
 * <BackdropProvider> renders a fixed full-viewport layer behind the page.
 * Wrap any section in <Scene bg={...}> - when that section scrolls into the
 * middle band of the viewport, its image animates in (rise + settle) while
 * the previous one drifts out. While on screen, the image also drifts
 * against scroll, so the backdrop never sits still.
 */

type Setter = (src: string | null) => void;
const BackdropCtx = createContext<Setter>(() => {});

const BackdropImg: React.FC<{ src: string }> = ({ src }) => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const startRef = useRef<number | null>(null);
  // drift relative to where the image entered, so motion is continuous
  const drift = useTransform(scrollY, (v) => {
    if (startRef.current === null) startRef.current = v;
    return (startRef.current - v) * 0.09;
  });

  return (
    <motion.div
      className="backdrop__item"
      initial={{ opacity: 0, y: 90, scale: 1.06 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -110, scale: 1.02 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img src={src} alt="" style={reduce ? undefined : { y: drift }} />
    </motion.div>
  );
};

export const BackdropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [src, setSrc] = useState<string | null>(null);

  return (
    <>
      <div className="backdrop" aria-hidden>
        <AnimatePresence>
          {src && <BackdropImg key={src} src={src} />}
        </AnimatePresence>
        <div className="backdrop__veil" />
      </div>
      <BackdropCtx.Provider value={setSrc}>{children}</BackdropCtx.Provider>
    </>
  );
};

export const Scene: React.FC<{ bg: string | null; children: React.ReactNode }> = ({ bg, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const setBg = useContext(BackdropCtx);
  // fires when the section occupies the middle band of the viewport
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) setBg(bg);
  }, [inView, bg, setBg]);

  return <div ref={ref} className="scene">{children}</div>;
};
