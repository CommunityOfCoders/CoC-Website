import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Backdrop provider and Scene wrapper for section scroll tracking.
 */
type Setter = (src: string | null) => void;
const BackdropCtx = createContext<Setter>(() => {});

export const BackdropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setSrc] = useState<string | null>(null);

  return (
    <BackdropCtx.Provider value={setSrc}>{children}</BackdropCtx.Provider>
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
