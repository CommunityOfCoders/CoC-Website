import React from 'react';
import { motion } from 'framer-motion';
import { YEAR_ON_YEAR_DATA } from '../../data/placementData';

export const YearOnYearTab: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="placement-tab-content"
    >
      <div className="placement-tab-header">
        <div className="placement-tab-title-group">
          <h2>Year-on-Year Growth</h2>
          <p>COC placement statistics across all seasons</p>
        </div>
      </div>

      <div className="placement-table-wrapper">
        <table className="placement-table yoy-table">
          <thead>
            <tr>
              <th>YEAR</th>
              <th>INTERNSHIPS</th>
              <th>PLACEMENTS</th>
              <th>AVG CTC</th>
              <th>HIGHEST CTC</th>
            </tr>
          </thead>
          <tbody>
            {YEAR_ON_YEAR_DATA.map((row, idx) => (
              <motion.tr
                key={row.year}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
              >
                <td className="yoy-year">{row.year}</td>
                <td className="col-members">{row.internships}</td>
                <td className="col-members">{row.placements}</td>
                <td className="col-ctc-green">{row.avgCtc}</td>
                <td className="col-ctc-green">{row.highestCtc}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};
