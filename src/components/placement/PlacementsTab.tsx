import React, { useState } from 'react';
import { PLACEMENTS_DATA } from '../../data/placementData';
import { CompanyLogo } from './CompanyLogo';

export const PlacementsTab: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2024' | '2023' | '2022'>('2024');

  const currentYearData = PLACEMENTS_DATA[selectedYear] || PLACEMENTS_DATA['2024'];
  const totalOffers = currentYearData.items.reduce((acc, item) => acc + item.members, 0);
  const totalCompanies = new Set(currentYearData.items.map((item) => item.company)).size;

  return (
    <section className="placement-tab-content">
      <div className="placement-tab-header">
        <div className="placement-tab-title-group">
          <h2>Campus Placements · {selectedYear}</h2>
          <p>{totalOffers} offers · {totalCompanies} companies</p>
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
              <th className="col-num">#</th>
              <th>COMPANY</th>
              <th>CTC</th>
              <th>MEMBERS</th>
              <th>PPOS</th>
            </tr>
          </thead>
          <tbody>
            {currentYearData.items.map((item, idx) => (
              <tr key={item.id}>
                <td className="col-num">{idx + 1}</td>
                <td>
                  <div className="col-company">
                    <CompanyLogo name={item.company} />
                    <span>{item.company}</span>
                  </div>
                </td>
                <td className="col-ctc-green">{item.ctc}</td>
                <td className="col-members">{item.members}</td>
                <td>
                  {item.ppos !== '—' && Number(item.ppos) > 0 ? (
                    <span className="col-ppos">{item.ppos}</span>
                  ) : (
                    <span className="col-ppos-none">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
