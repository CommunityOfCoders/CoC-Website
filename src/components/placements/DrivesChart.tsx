import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MonthlyDrive } from '../../data/placementsData';

interface Props {
  data: MonthlyDrive[];
}

const DrivesChart: React.FC<Props> = ({ data }) => {
  const reduce = useReducedMotion();
  const max = Math.max(...data.map((d) => d.offers), 1);
  const peak = data.reduce((a, b) => (b.offers > a.offers ? b : a), data[0]);

  return (
    <div className="drives" role="img" aria-label="Offers by month across the season">
      {data.map((d, i) => {
        const isPeak = d.month === peak.month;
        return (
          <div className="drives-col" key={d.month}>
            <span className="drives-count">{d.offers}</span>
            <div className="drives-track">
              <motion.div
                className={`drives-bar ${isPeak ? 'drives-bar-peak' : ''}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.offers / max) * 100}%` }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="drives-month">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DrivesChart;
