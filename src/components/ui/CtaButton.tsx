import React from 'react';
import './CtaButton.css';

/* Call-to-action pill (homepage hero, Projects hero). Flat; on hover it
   dissolves pixel by pixel into its other colour - a grid of small squares
   pops in at random, like a screen redrawing - and dissolves back when the
   pointer leaves. */
const CTA_COLS = 18;
const CTA_ROWS = 5;
/* fixed pseudo-random order, so it looks scattered but is the same every render */
const CTA_DELAYS = Array.from({ length: CTA_COLS * CTA_ROWS }, (_, k) => {
  const x = Math.sin(k * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
});

type Props = {
  href: string;
  label: string;
  primary?: boolean;
  /** opens in a new tab */
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export const CtaButton: React.FC<Props> = ({ href, label, primary, external, onClick }) => (
  <a
    href={href}
    className={`cta${primary ? ' cta--primary' : ''}`}
    onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noreferrer' } : null)}
  >
    <span className="cta__pixels" aria-hidden="true">
      {CTA_DELAYS.map((d, k) => (
        <i key={k} style={{ '--d': d } as React.CSSProperties} />
      ))}
    </span>
    <span className="cta__label">{label}</span>
  </a>
);

export default CtaButton;
