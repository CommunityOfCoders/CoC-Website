import React from 'react';
import { motion } from 'framer-motion';
import { OVERVIEW_STATS } from '../../data/placementData';

export const PlacementHeader: React.FC = () => {
  return (
    <header className="placement-hero-section">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="placement-eyebrow"
      >
        PLACEMENT REPORT
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="placement-hero-header"
      >
        <h1 className="placement-hero-title">
          Internship &amp; Placement<br />
          <span className="text-green">Statistics · 2025–26</span>
        </h1>
        
        <p className="placement-hero-desc">
          140+ verified placement &amp; internship statistics across top tech companies. Updated after each placement season.
        </p>
      </motion.div>

      <div className="placement-stats-grid">
        {OVERVIEW_STATS.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + idx * 0.06 }}
            className="placement-stat-card"
          >
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
            <div>
              <div className="stat-subtitle">{stat.subtitle}</div>
              {stat.subDetail && <div className="stat-subdetail">{stat.subDetail}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </header>
  );
};
