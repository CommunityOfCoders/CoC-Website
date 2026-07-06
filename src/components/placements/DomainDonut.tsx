import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Domain, DomainCount } from '../../data/placementsData';
import { DOMAIN_ORDER } from '../../data/placementsData';

const DOMAIN_COLOR_VAR: Record<Domain, string> = {
  'Software & Product': 'var(--domain-software)',
  'Quant & Finance': 'var(--domain-finance)',
  'Consulting & Analytics': 'var(--domain-consulting)',
  'Core & Semiconductor': 'var(--domain-core)',
  'IT Services': 'var(--domain-services)',
};

const SIZE = 240;
const STROKE = 28;
const R = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * R;

interface DomainDonutProps {
  data: DomainCount[];
  year: number;
}

const DomainDonut: React.FC<DomainDonutProps> = ({ data, year }) => {
  const [hovered, setHovered] = useState<Domain | null>(null);
  const reduceMotion = useReducedMotion();
  const total = data.reduce((sum, d) => sum + d.count, 0);

  const ordered = [...data].sort((a, b) => DOMAIN_ORDER.indexOf(a.domain) - DOMAIN_ORDER.indexOf(b.domain));

  let cumulative = 0;
  const segments = ordered.map((d) => {
    const pct = d.count / total;
    const dash = pct * CIRC;
    const offset = cumulative * CIRC;
    cumulative += pct;
    return { ...d, dash, offset, pct };
  });

  const activeDomain = hovered ?? undefined;
  const centerLabel = activeDomain
    ? ordered.find((d) => d.domain === activeDomain)
    : null;

  return (
    <div className="domain-section">
      <div className="domain-donut-wrapper">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="domain-donut-svg"
          role="img"
          aria-label={`Domain-wise placement split for ${year}`}
        >
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="var(--box-border)"
              strokeWidth={STROKE}
            />
            {segments.map((seg, i) => (
              <motion.circle
                key={seg.domain}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke={DOMAIN_COLOR_VAR[seg.domain]}
                strokeWidth={hovered === seg.domain ? STROKE + 6 : STROKE}
                strokeDasharray={`${seg.dash} ${CIRC - seg.dash}`}
                strokeDashoffset={-seg.offset}
                strokeLinecap="butt"
                style={{
                  opacity: hovered && hovered !== seg.domain ? 0.35 : 1,
                  transition: 'opacity 0.25s ease, stroke-width 0.25s ease',
                }}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: reduceMotion ? 0.01 : 1, delay: reduceMotion ? 0 : i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => setHovered(seg.domain)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </g>
        </svg>
        <div className="domain-donut-center">
          <span className="domain-donut-center-value">
            {centerLabel ? centerLabel.count : total}
          </span>
          <span className="domain-donut-center-label">
            {centerLabel ? centerLabel.domain : 'Total Offers'}
          </span>
        </div>
      </div>

      <ul className="domain-legend">
        {segments.map((seg) => (
          <li
            key={seg.domain}
            className={`domain-legend-item ${hovered === seg.domain ? 'active' : ''}`}
            onMouseEnter={() => setHovered(seg.domain)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="domain-legend-swatch" style={{ background: DOMAIN_COLOR_VAR[seg.domain] }} />
            <span className="domain-legend-name">{seg.domain}</span>
            <span className="domain-legend-count">{seg.count}</span>
            <span className="domain-legend-pct">{Math.round(seg.pct * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainDonut;
