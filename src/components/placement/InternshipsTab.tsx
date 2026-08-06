import React, { useState } from 'react';
import { INTERNSHIPS_DATA } from '../../data/placementData';
import { CompanyLogo } from './CompanyLogo';

export const InternshipsTab: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2024' | '2023' | '2022'>('2025');
  const [filterMode, setFilterMode] = useState<'all' | 'ppo'>('all');

  const currentYearData = INTERNSHIPS_DATA[selectedYear] || INTERNSHIPS_DATA['2025'];
  const items = filterMode === 'ppo' 
    ? currentYearData.items.filter((item) => item.isPpoReceived)
    : currentYearData.items;

  const totalMembers = items.reduce((acc, item) => acc + item.members, 0);
  const totalCompanies = new Set(items.map((item) => item.company)).size;

  return (
    <section className="placement-tab-content">
      <div className="placement-tab-header">
        <div className="placement-tab-title-group">
          <h2>Internships · {selectedYear}</h2>
          <p>{totalMembers} COC members · {totalCompanies} companies</p>
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

          <div className="divider-vertical" />

          <button
            className={`filter-btn ${filterMode === 'all' ? 'active-outline' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            All interns
          </button>
          <button
            className={`filter-btn ${filterMode === 'ppo' ? 'active-outline' : ''}`}
            onClick={() => setFilterMode('ppo')}
          >
            PPO received
          </button>
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
          <tbody>
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
