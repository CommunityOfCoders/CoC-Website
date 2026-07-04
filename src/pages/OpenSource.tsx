import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicBento, BentoCard } from '../components/MagicBento';
import ShinyText from '../components/ShinyText';
import BlurText from '../components/BlurText';
import './OpenSource.css';

interface OSResult {
  id: string;
  name: string;
  org: string;
  task: string;
  program: 'GSoC' | 'LFX' | 'Julia';
}

const osResults: OSResult[] = [

  { id: '1', name: 'Avanish Salunke', org: 'GNU Octave', task: 'Add LinearModel and CompactLinearModel objects to the statistics package.', program: 'GSoC' },
  { id: '2', name: 'Anushree Upasham', org: 'ML4SCI', task: 'Develop ML models for exoplanet atmosphere characterization using astrophysical data.', program: 'GSoC' },

  { id: '3', name: 'Utsav Ojha', org: 'Julia Language', task: 'Building a symbolic parser for generating loss function for PINNs', program: 'Julia' },

  { id: '4', name: 'Rushab Mehta', org: 'CNCF', task: 'Improving Prometheus startup performance by enabling metric scraping to run in parallel with WAL replay', program: 'LFX' },
  { id: '5', name: 'Khush Agrawal', org: 'CNCF', task: 'Build a WASI-NN plugin for WasmEdge that integrates bitnet.cpp to run efficient 1-bit LLMs on CPUs.', program: 'LFX' },

  { id: '6', name: 'Vidhi Rohira', org: 'INCF', task: 'Develop open-source neuroinformatics tools and workflows to support neuroscience research and open science initiatives.', program: 'GSoC' },
  { id: '7', name: 'Sourish Phate', org: 'ML4SCI', task: 'Apply quantum machine learning techniques to characterize exoplanet atmospheres from transmission spectra.', program: 'GSoC' },
  { id: '8', name: 'Swayam Shah', org: 'GNU Octave', task: 'Implement optimized nearest-neighbor searcher classes to enhance clustering performance in the GNU Octave Statistics package.', program: 'GSoC' },
  { id: '9', name: 'Prasanna Kasar', org: 'CERN-HSF', task: 'Enhance TMVA SOFIE by improving Keras parsing and adding JAX/FLAX support for optimized C++ ML inference generation.', program: 'GSoC' },
  { id: '10', name: 'Rushabh Mehta', org: 'SYMPY', task: 'Add symbolic wrapping geometry models to SymPy for efficient musculoskeletal biomechanics simulations.', program: 'GSoC' },
  { id: '11', name: 'Aarya Pandey', org: 'Intel', task: 'Build an Interactive Multimodal Data Explorer for Datumaro/OpenVINO to inspect and visualize AI datasets.', program: 'GSoC' },
  // { id: '7', name: 'Kevin Shah', org: 'RSPAMD', task: '-----', program: 'GSoC' },

];

const TABS = ['All', 'GSoC', 'LFX', 'Julia'] as const;
type TabType = typeof TABS[number];

const OpenSource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const filteredResults = activeTab === 'All' 
    ? osResults 
    : osResults.filter(r => r.program === activeTab);

  return (
    <div className="os-page">
      <section className="os-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="os-hero-content"
        >
          <div className="os-eyebrow">
            <span>Open Source Achievements</span>
          </div>
          <h2 className="os-title" style={{ display: 'flex', alignItems: 'center', gap: '0.25em', flexWrap: 'wrap' }}>
            <BlurText text="Global" />
            <ShinyText text="Impact" speed={3} />
          </h2>
          <p className="os-subtitle">
            Our members consistently contribute to world-class open source programs. Here are some of our proudest selections for GSoC, LFX, and Julia.
          </p>
        </motion.div>
      </section>

      <section className="os-content">
        <div className="os-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`os-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="os-tab-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="os-tab-label">{tab}</span>
            </button>
          ))}
        </div>

        <MagicBento>
          <motion.div layout className="os-grid">
            <AnimatePresence mode="popLayout">
              {filteredResults.map((result) => (
                <motion.div
                  key={result.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="os-card-wrapper"
                >
                  <BentoCard contentClassName="os-card-content" glowColor="rgba(97, 185, 25, 0.8)">
                    <div className="os-card-header">
                      <span className={`os-badge ${result.program.toLowerCase()}`}>{result.program}</span>
                      <h3 className="os-name">{result.name}</h3>
                    </div>
                    <div className="os-card-body">
                      <h4 className="os-org">@{result.org}</h4>
                      <p className="os-task">{result.task}</p>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </MagicBento>
      </section>
    </div>
  );
};

export default OpenSource;
