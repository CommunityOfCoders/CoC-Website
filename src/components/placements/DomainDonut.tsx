import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Domain } from '../../data/placementsData';
import { DOMAIN_COLORS, orderedDomainSplit } from '../../data/placementsStats';

const SIZE = 210;
const STROKE = 22;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;
const GAP = 2; // px gap between segments

interface Props {
  year: number;
}

const DomainDonut: React.FC<Props> = ({ year }) => {
  const [hover, setHover] = useState<Domain | null>(null);
  const reduce = useReducedMotion();
  const split = orderedDomainSplit(year);
  const total = split.reduce((s, d) => s + d.count, 0);

  let acc = 0;
  const segs = split.map((d) => {
    const frac = d.count / total;
    const len = Math.max(frac * CIRC - GAP, 0);
    const offset = acc * CIRC;
    acc += frac;
    return { ...d, len, offset, frac };
  });

  const centre = hover ? split.find((d) => d.domain === hover) : null;

  return (
    <div className="donut">
      <div className="donut-ring">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Domain split for ${year}`}>
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            {segs.map((s, i) => (
              <motion.circle
                key={s.domain}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke={DOMAIN_COLORS[s.domain]}
                strokeWidth={hover === s.domain ? STROKE + 5 : STROKE}
                strokeDasharray={`${s.len} ${CIRC - s.len}`}
                strokeDashoffset={-s.offset}
                style={{
                  opacity: hover && hover !== s.domain ? 0.3 : 1,
                  transition: 'opacity .25s ease, stroke-width .25s ease',
                }}
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHover(s.domain)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </g>
        </svg>
        <div className="donut-centre">
          <span className="donut-centre-val">{centre ? centre.count : total}</span>
          <span className="donut-centre-lbl">{centre ? centre.domain : 'offers mapped'}</span>
        </div>
      </div>

      <ul className="donut-legend">
        {segs.map((s) => (
          <li
            key={s.domain}
            className={`donut-legend-row ${hover === s.domain ? 'on' : ''}`}
            onMouseEnter={() => setHover(s.domain)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="donut-dot" style={{ background: DOMAIN_COLORS[s.domain] }} />
            <span className="donut-legend-name">{s.domain}</span>
            <span className="donut-legend-pct">{Math.round(s.frac * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainDonut;
