import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PPOS_DATA, AVAILABLE_PPO_YEARS, CURRENT_YEAR } from '../../data/placementData';
import { CompanyLogo } from './CompanyLogo';

export const PPOsTab: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    AVAILABLE_PPO_YEARS.includes(CURRENT_YEAR) ? CURRENT_YEAR : AVAILABLE_PPO_YEARS[0] || '2026'
  );

  const currentYearData = PPOS_DATA[selectedYear] || PPOS_DATA[CURRENT_YEAR] || {
    items: [],
    totalPpos: 0,
    companiesCount: 0,
    season: `${selectedYear} season`
  };
  const totalPpos = currentYearData.items.reduce((acc, item) => {
    const num = typeof item.members === 'number' ? item.members : (parseInt(String(item.members), 10) || 0);
    return acc + num;
  }, 0);
  const totalCompanies = new Set(currentYearData.items.map((item) => item.company)).size;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="placement-tab-content"
    >
      <div className="ppo-layout-container">
        <div className="ppo-side-header">
          <h2>Pre-Placement Offers</h2>
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="ppo-stat-box"
          >
            <div className="stat-label">PPOS RECEIVED</div>
            <div className="stat-value">{totalPpos}</div>
            <div className="stat-subtitle">across {totalCompanies} companies</div>
            <div className="stat-subdetail">{selectedYear} season</div>
          </motion.div>
        </div>

        <div className="ppo-main-content">
          <div className="placement-tab-header">
            <div className="placement-tab-title-group">
              <h2>PPOs · {selectedYear}</h2>
            </div>

            <div className="placement-controls">
              <div className="pill-group">
                {AVAILABLE_PPO_YEARS.map((year) => (
                  <button
                    key={year}
                    className={`pill-btn ${selectedYear === year ? 'active-solid' : ''}`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="placement-table-wrapper">
            <table className="placement-table">
              <thead>
                <tr>
                  <th>INTERNED AT</th>
                  <th>MEMBERS</th>
                  <th>CTC / STIPEND</th>
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={selectedYear}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {currentYearData.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="col-company">
                          <CompanyLogo name={item.company} />
                          <span>{item.company}</span>
                        </div>
                      </td>
                      <td className="col-members">{item.members}</td>
                      <td className="col-ctc-green">{item.ctc}</td>
                    </tr>
                  ))}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
