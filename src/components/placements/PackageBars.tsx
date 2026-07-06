import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  highest: number;
  average: number;
  median: number;
}

// Rendered inside the cream/light section — dark ink bars on light ground.
const PackageBars: React.FC<Props> = ({ highest, average, median }) => {
  const reduce = useReducedMotion();
  const max = Math.max(highest, average, median) || 1;
  const rows = [
    { label: 'Highest', value: highest, emphatic: true },
    { label: 'Average', value: average, emphatic: false },
    { label: 'Median', value: median, emphatic: false },
  ];

  return (
    <div className="pkg">
      {rows.map((row, i) => (
        <div className={`pkg-row ${row.emphatic ? 'pkg-row-hi' : ''}`} key={row.label}>
          <div className="pkg-head">
            <span className="pkg-label">{row.label}</span>
            <span className="pkg-value">
              {row.value.toFixed(1)}
              <span className="pkg-unit"> LPA</span>
            </span>
          </div>
          <div className="pkg-track">
            <motion.div
              className="pkg-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${(row.value / max) * 100}%` }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: reduce ? 0 : 0.95, delay: reduce ? 0 : i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageBars;
