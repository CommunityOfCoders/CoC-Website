import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'internships' && <InternshipsTab />}
          {activeTab === 'placements' && <PlacementsTab />}
          {activeTab === 'ppos' && <PPOsTab />}
          {activeTab === 'yoy' && <YearOnYearTab />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Placements;
