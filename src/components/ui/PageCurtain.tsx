import React from 'react';
import './PageCurtain.css';

/* Route-change transition: a green blade and an ink blade sweep up over
   the page, the next page's name flashes in huge outlined type, then both
   blades lift away to reveal the new page. Transform-only, so it stays on
   the compositor and never janks. */

export type CurtainPhase = 'in' | 'out';

export const PageCurtain: React.FC<{ label: string; phase: CurtainPhase }> = ({ label, phase }) => (
  <div className={`curtain is-${phase}`} aria-hidden="true">
    <div className="curtain__blade curtain__blade--green" />
    <div className="curtain__blade curtain__blade--ink">
      <span className="curtain__label">
        {label}
        <span className="curtain__dot">.</span>
      </span>
    </div>
  </div>
);

export default PageCurtain;
