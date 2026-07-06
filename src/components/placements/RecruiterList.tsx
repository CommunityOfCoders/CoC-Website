import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DOMAIN_COLORS, topRecruiters } from '../../data/placementsStats';

interface Props {
  year: number;
}

const RecruiterList: React.FC<Props> = ({ year }) => {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const list = topRecruiters(year, 8);
  const maxOffers = Math.max(...list.map((r) => r.offers));

  return (
    <ol className="recs">
      {list.map((r, i) => {
        // varied row height by offer count (bento feel), bounded
        const scale = 0.55 + (r.offers / maxOffers) * 0.45; // 0.55 → 1.0
        return (
          <motion.li
            key={r.name}
            className="rec-row"
            style={{ ['--rec-scale' as string]: scale }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            whileHover={reduce ? undefined : { scale: 1.015 }}
          >
            <span className="rec-rank">{String(i + 1).padStart(2, '0')}</span>
            <span className="rec-bar" style={{ background: DOMAIN_COLORS[r.domain] }} />
            <span className="rec-name">{r.name}</span>
            <span className="rec-offers">
              <strong>{r.offers}</strong> {r.offers === 1 ? 'offer' : 'offers'}
            </span>
            <span className="rec-pkg">{r.packageLPA} LPA</span>
            <span
              className="rec-track"
              aria-hidden
              style={{ opacity: hover === i ? 1 : 0.5 }}
            >
              <motion.span
                className="rec-fill"
                style={{ background: DOMAIN_COLORS[r.domain] }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.offers / maxOffers) * 100}%` }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </motion.li>
        );
      })}
    </ol>
  );
};

export default RecruiterList;
