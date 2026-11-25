import React from 'react';
import './PageCurtain.css';

/* Route-change transition: a green blade and an ink blade sweep up over
   the page, the next page's name flashes in huge outlined type, then both
   blades lift away to reveal the new page. Some pages (Team) carry a photo
   inside the ink blade: it rises with the blade, settles slowly while the
   name is up, and lifts away a touch slower than the blade (parallax).
   Transform-only, so it stays on the compositor and never janks. */

export type CurtainPhase = 'in' | 'out';

export const PageCurtain: React.FC<{ label: string; phase: CurtainPhase; photo?: string }> = ({ label, phase, photo }) => (
  <div className={`curtain is-${phase}${photo ? ' has-photo' : ''}`} aria-hidden="true">
    <div className="curtain__blade curtain__blade--green" />
    <div className="curtain__blade curtain__blade--ink">
      {photo && (
        <div className="curtain__photo">
          <img src={photo} alt="" decoding="sync" draggable={false} />
        </div>
      )}
      <span className={`curtain__label${label.length > 12 ? ' is-long' : ''}`}>
        {label}
        <span className="curtain__dot">.</span>
      </span>
    </div>
  </div>
);

export default PageCurtain;
