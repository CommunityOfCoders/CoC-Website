import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';
import type { MonthlyDrive } from '../../data/placementsData';

interface DriveTimelineProps {
  data: MonthlyDrive[] | null;
}

const DriveTimeline: React.FC<DriveTimelineProps> = ({ data }) => {
  const reduceMotion = useReducedMotion();

  if (!data || data.length === 0) {
    return (
      <div className="timeline-empty">
        <CalendarClock size={22} className="timeline-empty-icon" />
        <p>Drive-by-drive timing isn&apos;t on record for this year yet.</p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.offers), 1);

  return (
    <div className="drive-timeline" role="img" aria-label="Offers by month">
      {data.map((d, i) => (
        <div className="drive-timeline-col" key={d.month}>
          <span className="drive-timeline-count">{d.offers > 0 ? d.offers : ''}</span>
          <div className="drive-timeline-track">
            <motion.div
              className="drive-timeline-bar"
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.offers / max) * 100}%` }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: reduceMotion ? 0.01 : 0.7, delay: reduceMotion ? 0 : i * 0.05, ease: [0.25, 1, 0.5, 1] }}
            />
          </div>
          <span className="drive-timeline-month">{d.month}</span>
        </div>
      ))}
    </div>
  );
};

export default DriveTimeline;
