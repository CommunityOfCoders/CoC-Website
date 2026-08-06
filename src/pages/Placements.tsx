import React, { useState } from 'react';
import {
  PlacementHeader,
  PlacementTabs,
  type TabType,
  InternshipsTab,
  PlacementsTab,
  PPOsTab,
  YearOnYearTab
} from '../components/placement';
import '../components/placement/placement.css';

const Placements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('internships');

  return (
    <main className="placement-page">
      <PlacementHeader />
      <PlacementTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {activeTab === 'internships' && <InternshipsTab />}
      {activeTab === 'placements' && <PlacementsTab />}
      {activeTab === 'ppos' && <PPOsTab />}
      {activeTab === 'yoy' && <YearOnYearTab />}
    </main>
  );
};

export default Placements;
