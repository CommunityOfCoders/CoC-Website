import React from 'react';
import { motion } from 'framer-motion';

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
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`placement-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="placement-active-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
