import React, { useState } from 'react';
import { PPOS_DATA } from '../../data/placementData';
import { CompanyLogo } from './CompanyLogo';

export const PPOsTab: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2024' | '2023' | '2022'>('2024');

  const currentYearData = PPOS_DATA[selectedYear] || PPOS_DATA['2024'];
  const totalPpos = currentYearData.items.reduce((acc, item) => acc + item.members, 0);
  const totalCompanies = new Set(currentYearData.items.map((item) => item.company)).size;

  return (
    <section className="placement-tab-content">
      <div className="ppo-layout-container">
        <div className="ppo-side-header">
          <h2>Pre-Placement Offers</h2>
          <div className="ppo-stat-box">
            <div className="stat-label">PPOS RECEIVED</div>
            <div className="stat-value">{totalPpos}</div>
            <div className="stat-subtitle">across {totalCompanies} companies</div>
            <div className="stat-subdetail">{selectedYear} season</div>
          </div>
        </div>

        <div className="ppo-main-content">
          <div className="placement-tab-header">
            <div className="placement-tab-title-group">
              <h2>PPOs · {selectedYear}</h2>
            </div>

            <div className="placement-controls">
              <div className="pill-group">
                {(['2025', '2024', '2023', '2022'] as const).map((year) => (
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
                  <th>CTC</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
