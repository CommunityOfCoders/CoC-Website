import React from 'react';

export type TabType = 'internships' | 'placements' | 'ppos' | 'yoy';

interface PlacementTabsProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: 'internships', label: 'Internships' },
  { id: 'placements', label: 'Placements' },
  { id: 'ppos', label: 'PPOs' },
  { id: 'yoy', label: 'Year-on-Year' },
];

export const PlacementTabs: React.FC<PlacementTabsProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="placement-tabs-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`placement-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onSelectTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
