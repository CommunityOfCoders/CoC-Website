import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PackageBarsProps {
  highest: number;
  average: number;
  median: number;
}

const PackageBars: React.FC<PackageBarsProps> = ({ highest, average, median }) => {
  const reduceMotion = useReducedMotion();
  const max = Math.max(highest, average, median) || 1;

  const rows = [
    { label: 'Highest', value: highest },
    { label: 'Average', value: average },
    { label: 'Median', value: median },
  ];

  return (
    <div className="package-bars">
      {rows.map((row, i) => (
        <div className="package-bar-row" key={row.label}>
          <span className="package-bar-label">{row.label}</span>
          <div className="package-bar-track">
            <motion.div
              className="package-bar-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${(row.value / max) * 100}%` }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.9, delay: reduceMotion ? 0 : i * 0.1, ease: [0.25, 1, 0.5, 1] }}
            />
          </div>
          <span className="package-bar-value">{row.value.toFixed(1)} LPA</span>
        </div>
      ))}
    </div>
  );
};

export default PackageBars;
