import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INTERNSHIPS_DATA, CURRENT_YEAR } from '../../data/placementData';
import { CompanyLogo } from './CompanyLogo';

export const InternshipsTab: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>(CURRENT_YEAR);

  const currentYearData = INTERNSHIPS_DATA[selectedYear] || INTERNSHIPS_DATA[CURRENT_YEAR];
  const items = currentYearData.items;

  const totalMembers = items.reduce((acc, item) => acc + item.members, 0);
  const totalCompanies = new Set(items.map((item) => item.company)).size;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="placement-tab-content"
    >
      <div className="placement-tab-header">
        <div className="placement-tab-title-group">
          <h2>Internships · {selectedYear}</h2>
          <p>{totalMembers} members · {totalCompanies} companies</p>
        </div>

        <div className="placement-controls">
          <div className="pill-group">
            {Object.keys(INTERNSHIPS_DATA).sort((a, b) => Number(b) - Number(a)).map((year) => (
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
              <th className="col-num">#</th>
              <th>COMPANY</th>
              <th>STIPEND</th>
              <th>MEMBERS</th>
              <th>PPOS</th>
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
              {items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="col-num">{idx + 1}</td>
                  <td>
                    <div className="col-company">
                      <CompanyLogo name={item.company} />
                      <span>{item.company}</span>
                    </div>
                  </td>
                  <td className="col-stipend">{item.stipend}</td>
                  <td className="col-members">{item.members}</td>
                  <td>
                    {item.ppos !== '-' && Number(item.ppos) > 0 ? (
                      <span className="col-ppos">{item.ppos}</span>
                    ) : (
                      <span className="col-ppos-none">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </div>
    </motion.section>
  );
};
