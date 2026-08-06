import React from 'react';
import { OVERVIEW_STATS } from '../../data/placementData';

export const PlacementHeader: React.FC = () => {
  return (
    <header className="placement-hero-section">
      <div className="placement-eyebrow">PLACEMENT REPORT</div>
      
      <div className="placement-hero-header">
        <h1 className="placement-hero-title">
          Internship &amp; Placement<br />
          <span className="text-green">Statistics · 2024–25</span>
        </h1>
        
        <p className="placement-hero-desc">
          140+ verified placement &amp; internship statistics across top tech companies. Updated after each placement season.
        </p>
      </div>

      <div className="placement-stats-grid">
        {OVERVIEW_STATS.map((stat) => (
          <div key={stat.id} className="placement-stat-card">
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
            <div>
              <div className="stat-subtitle">{stat.subtitle}</div>
              {stat.subDetail && <div className="stat-subdetail">{stat.subDetail}</div>}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};
