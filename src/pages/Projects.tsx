import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { MagicBento, BentoCard } from '../components/MagicBento';
import ShinyText from '../components/ShinyText';
import BlurText from '../components/BlurText';
import './Projects.css';

interface Project {
  id: string;
  name: string;
  description: string;
  year: '2026' | '2025' | '2024';
  githubLink?: string;
  authors?: string[];
}

const projectsData: Project[] = [
  // 2025 Projects
  { id: '1', name: 'FakeMyVoice', description: 'Deep learning-powered multi-speaker TTS system for voice cloning.', year: '2025', githubLink: 'https://github.com/nihira20/Fake_My_Voice', authors: ['Aryan Doshi', 'Dhiraj Shirse', 'Nihira Neralwar'] },
  { id: '2', name: 'Train Your Foes', description: 'Game with an AI enemy that learns from you using Q-Learning.', year: '2025', githubLink: 'https://github.com/AvanishSalunke/TRAIN-YOUR-FOES', authors: ['Avanish Salunke', 'Nathan Dsouza','Awwab Wadekar'] },
  { id: '3', name: 'Traffiq', description: 'Intelligent traffic control system optimizing signals in real-time with DRL.', year: '2025', githubLink: 'https://github.com/sofiaabidi/TraffIQ-Project-X-2025', authors: ['Ojas Alai', 'Sofia Abidi'] },
  { id: '4', name: 'Voice2English', description: 'Speech-to-English translation system using Transformer-based ASR and NMT for multilingual voice translation.', year: '2025', githubLink: 'https://github.com/shnavii11/Voice2English', authors: ['Purvasha Singh', 'Vaishnavi Sanap', 'Harsh Sanke'] },
  { id: '5', name: 'Reinforcents', description: 'Simulates stock & options trading market using Reinforcement Learning.', year: '2025', githubLink: 'https://github.com/dagaaryan011/Reinforcents', authors: ['Aryan Daga', 'Sudiksha Kadam'] },
  { id: '6', name: 'Neural Quest', description: 'AI-powered RPG with procedural world generation and LLM-driven NPC dialogue and dynamic storytelling.', year: '2025', githubLink: 'https://github.com/regenpalkar28/Neural-Quest', authors: ['Regen Palkar', 'Bhavika Wankhede'] },
  { id: '7', name: 'Cryptify', description: 'Secure messaging using Java Socket & Hybrid Cryptography (RSA+AES).', year: '2025', githubLink: 'https://github.com/MohdHedayati/Encrypted-Chat-Application', authors: ['Mohammed Hedayati', 'Rudrakshi Chincholkar'] },
  { id: '8', name: 'Text to Handwriting', description: 'Generates handwritten text from input using a Conditional GAN.', year: '2025', githubLink: 'https://github.com/hredayshah2507/Text-To-Handwriting', authors: ['Hreday Shah', 'Mahi Desai'] },
  { id: '9', name: 'EEG Analyser and Simulator', description: 'AI-driven simulation and prediction of brain dynamics using EEG data.', year: '2025', githubLink: 'https://github.com/ajatshatru01/EEG-Analyser-and-simulator', authors: ['Utsav Ojha', 'Bianca Sawant', 'Rudrani Wadelkar'] },
  { id: '10', name: 'MuseGan', description: 'GAN-based project for generating multi-track polyphonic music.', year: '2025', githubLink: 'https://github.com/Star-Light-9/MuseGAN', authors: ['Pratyush Rao', 'Yashasvi Choudhary'] },
  { id: '11', name: 'Multimodal Graph DB with RAG', description: 'Multimodal GraphRAG system combining knowledge graphs, CLIP embeddings, and LLMs for semantic document and product retrieval.', year: '2025', githubLink: 'https://github.com/champ-byte/Multimodal_GraphRAG', authors:['Kavya Zala','Manaswi Rane'] },
  { id: '12', name: 'CodeSage', description: 'Python framework that executes code and explains its logic step-by-step.', year: '2025', githubLink: 'https://github.com/Mokshii46/CODESAGE', authors: ['Mokshi Shah'] },
  { id: '13', name: 'Sera', description: 'Agentic AI web assistant that autonomously navigates websites using LLM planning and DOM-aware browser automation.', year: '2025', githubLink: 'https://github.com/shreyakash24/Sera--Smart-Search-Assistant', authors:['Tanmay More', 'Shreya Kashikar'] },
  { id: '14', name: 'Kernel Design', description: 'Bare-metal microkernel operating system for Raspberry Pi featuring MLFQ scheduling, a custom VFS, and system call support.', year: '2025', githubLink: 'https://github.com/Froglodyte/TycheOS', authors: ['Mudit Bengani', 'Jinmay Jhaveri'] },
  { id: '15', name: 'Cryptanalysis', description: 'Hybrid framework analyzing multiple ciphers with deep learning.', year: '2025', githubLink: 'https://github.com/RishitModi/EnergyBased-and-Neurosymbolic-Methods-for-Advanced-CrypytAnalysis/', authors: ['Rishit Modi', 'Anushka Yadav'] },
  { id: '16', name: 'AI Ops', description: 'AIOps platform for real-time anomaly detection and predictive monitoring using Prometheus, LSTM Autoencoders, and Prophet.', year: '2025', githubLink: 'https://github.com/SakshiKalunge07/AIOps', authors: ['Sakshi Kalunge', 'Anushree Upasham']},
  { id: '45', name: 'JARVIS', description: 'AI-powered personal assistant extending its capabilities into your local system.', year: '2025', githubLink: 'https://github.com/AvanishSalunke/JARVIS', authors: ['Avanish Salunke', 'Pratyush Rao', 'Purvasha Singh', 'Kavish Nasta'] },
  // 2026 Projects
  { id: '32', name: 'Optimum Fallax', description: 'Evolutionary multi-agent simulation for studying reward hacking and AI alignment through adaptive strategies and reward-model disagreement.', year: '2026', githubLink: '#', authors: ['Rushil Shah', 'Pratyush Lokhande'] },
  { id: '33', name: 'Pharmacon', description: 'AI framework for predicting and interpreting drug–drug interactions using graph and sequence-based molecular representations.', year: '2026', githubLink: '#', authors: ['Jaanya Jain', 'Aarya Burande'] },
  { id: '34', name: 'Sentient Shadow', description: '2D RPG with an adaptive AI companion that evolves its behavior based on player choices to create dynamic narratives.', year: '2026', githubLink: '#', authors: ['Jiya Choksi', 'Hishant Kudalkar', 'Samyak Kose'] },
  { id: '35', name: 'AI-Git', description: 'Git-style version control system optimized for AI projects with efficient dataset and model checkpoint management.', year: '2026', githubLink: '#', authors: ['Sanvi Naik', 'Aarya Doshi'] },
  { id: '36', name: 'Archaeological Site Detection', description: 'Geospatial AI system that combines LiDAR and satellite imagery to identify potential archaeological sites using deep learning.', year: '2026', githubLink: '#', authors: ['Aashita Singh', 'Shreyans Deshpande'] },
  { id: '37', name: 'Custom VPN', description: 'Custom VPN implementation featuring packet tunneling, UDP transport, and end-to-end encrypted secure communication.', year: '2026', githubLink: '#', authors: ['Advait Wadke', 'Shivam Bhalerao', 'Amit Phadke'] },
  { id: '38', name: 'MemoraDB', description: 'Lightweight DBMS combining temporal versioning with vector-based semantic search through an append-only storage engine.', year: '2026', githubLink: '#', authors: ['Vihaan Jain', 'Naman Panchal', 'Vivaan Sanghvi'] },
  { id: '39', name: 'Consistent Distributed Cache System', description: 'Fault-tolerant distributed cache system using Raft consensus for consistent replication and persistent storage synchronization.', year: '2026', githubLink: '#', authors: ['Omisha Iyer', 'Krish Bhattad'] },
  { id: '40', name: 'FantasyXI', description: 'AI-powered Fantasy Premier League assistant using deep learning, reinforcement learning, and game theory for strategic team optimization.', year: '2026', githubLink: '#', authors: ['Bhoomi Vaity', 'Darshan Mahale'] },
  { id: '41', name: 'KAIZEN', description: 'Autonomous multi-agent AI software engineer that plans, codes, tests, documents, and manages GitHub workflows end-to-end.', year: '2026', githubLink: '#', authors: ['Samarth Yanjane', 'Pranit Mathane', 'Sahil Pojee'] },
  { id: '42', name: 'Kurtosis', description: 'AI-driven predictive maintenance system for machine fault diagnosis using vibration signal analysis and deep learning.', year: '2026', githubLink: '#', authors: ['Onkar Raskar', 'Awdhoot Prasad'] },
  { id: '43', name: 'PentestingAgent', description: 'Autonomous AI penetration testing framework using reinforcement learning to discover attack paths and strengthen network defenses.', year: '2026', githubLink: '#', authors: ['Ayana Sardha', 'Sharwari Palve'] },
  { id: '44', name: 'Schrödinger\'s Verdict', description: 'Quantum machine learning system using variational quantum classifiers for breast cancer detection and analysis.', year: '2026', githubLink: '#', authors: ['Aarav Nambiar', 'Shreyash Bhor'] },
  // 2024 Projects
  { id: '19', name: 'Virtual Try On for Products', description: 'Transferring a target clothes image onto a reference person using AR combined with Machine Learning.', year: '2024', githubLink: 'https://github.com/Afreen-Kazi-1/Virtual-Try-On-Products-', authors: ['Afreen Kazi', 'Mahi Palimkar', 'Ishaan Shaikh'] },
  { id: '20', name: 'Text To Speech', description: 'Converting written text into spoken words exploring efficient Deep Learning methods.', year: '2024', githubLink: 'https://github.com/PrasannaKasar/Text-to-Speech', authors: ['Prasanna Kasar', 'Swayam Shah'] },
  { id: '21', name: 'GPT Reimagined: KANs vs MLPs', description: 'Exploring Kolmogorov-Arnold Networks (KANs) as an alternative to Multi Layer Perceptrons (MLPs) for GPTs.', year: '2024', githubLink: 'https://github.com/kavya-r30/GPT-Reimagined', authors: ['Kavya Rambhia', 'Abhay Upadhyay'] },
  { id: '22', name: 'Super MaRLo Bros', description: 'Building Super Mario Bros using PyGame and training AI to play it using Reinforcement Learning.', year: '2024', githubLink: 'https://github.com/23f2003701-1/SuperMaRLoBros', authors: ['Vidhi Rohira', 'Niharika Hariharan', 'Ayush Bothra'] },
  { id: '23', name: 'ChromaSight', description: 'Innovative color correction tool designed to enhance visual experiences for individuals with color blindness.', year: '2024', githubLink: 'https://github.com/Sohamshah03/Chroma-Sight', authors: ['Soham Shah', 'Krish Shah'] },
  { id: '24', name: 'Stock Transformers', description: 'Predicting stock prices using transformer architecture and time series forecasting.', year: '2024', githubLink: 'https://github.com/Ghruank/stocktransformers/', authors: ['Khush Agrawal', 'Yashvi Mehta', 'Ghruank Kothare' ] },
  { id: '25', name: '2D Car Simulation', description: 'Combining physics engines and genetic algorithms where cars evolve and adapt to their environment.', year: '2024', githubLink: 'https://github.com/pipinstallaadit/2D-Car-Simulator', authors: ['Abhay Varnekar', 'Aadit'] },
  { id: '26', name: 'SmartMailGuard', description: 'AI-powered tool that distinguishes between spam and legitimate emails using LSTM and transformers.', year: '2024', githubLink: 'https://github.com/aitwehrrg/SmartMailGuard', authors: ['Amal Verma', 'Kevin Shah', 'Rupak Gupta'] },
  { id: '27', name: 'Verbal to Visual', description: 'Transforming textual descriptions into vivid, lifelike images using state-of-the-art neural networks.', year: '2024', githubLink: 'https://github.com/Captain-MUDIT/Verbal-to-Visual/', authors: ['Mudit Jain', 'Yadnyesh Patil', 'Janvi Soni'] },
  { id: '28', name: 'Deep Multiclass Audio Classification', description: 'Classifying various audio recordings using Convolutional Neural Networks (CNNs).', year: '2024', githubLink: 'https://github.com/soham30rane/Deep-Multiclass-Audio-Classification', authors: ['Soham Rane', 'Aanchal Borse'] },
  { id: '30', name: 'Xcelerate - Self Driving Car', description: 'Training a CNN to map raw pixels from a single front-facing camera directly to steering commands.', year: '2024', githubLink: 'https://github.com/yashogale30/Xcelerate', authors: ['Viraj Vora', 'Yash Ogle'] },
  { id: '31', name: 'The Not So Generic Chatbot', description: 'Topic specific chatbot using MultiModal RAG to overcome traditional LLM limitations.', year: '2024', githubLink: 'https://github.com/Tanish2207/Not-So-Generic-Chatbot/', authors: ['Tanish Bhamre', 'Vaishvi Khandelwal'] },
  // { id: '29', name: 'Lip Reading', description: 'Lip-reading model based on CNN and LSTM decoding speech from video sequences.', year: '2024', githubLink: '#', authors: ['Veeransh Shah'] },
];

const TABS = ['All', '2026', '2025', '2024'] as const;
type TabType = typeof TABS[number];

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('2025');

  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.year === activeTab);

  return (
    <div className="projects-container">
      <section className="projects-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="projects-hero-content"
        >
          <div className="projects-eyebrow">
            <Code2 size={12} className="accent-icon" />
            <span>Student Projects</span>
          </div>
          <h2 className="projects-title" style={{ display: 'flex', alignItems: 'center', gap: '0.25em', flexWrap: 'wrap' }}>
            <BlurText text="Innovative" />
            <ShinyText text="Showcase" speed={3} />
          </h2>
          <p className="projects-subtitle">
            Innovative software, AI, and game dev projects crafted by our community members.
          </p>
        </motion.div>
      </section>

      <section className="projects-content">
        <div className="projects-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`projects-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="projects-active-tab-indicator"
                  className="projects-tab-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="projects-tab-label">{tab}</span>
            </button>
          ))}
        </div>

        <MagicBento>
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="projects-card-wrapper"
                >
                  <BentoCard contentClassName="projects-card-content" glowColor="rgba(97, 185, 25, 0.8)">
                    <div className="projects-card-header">
                      <div className="projects-year-tag">{project.year}</div>
                      <h3 className="projects-name">
                        {project.githubLink && project.githubLink !== '#' ? (
                          <a href={project.githubLink} target="_blank" rel="noreferrer">
                            {project.name}
                          </a>
                        ) : (
                          <span>{project.name}</span>
                        )}
                      </h3>
                    </div>
                    <div className="projects-card-body">
                      <p className="projects-desc">{project.description}</p>
                    </div>
                    {project.authors && project.authors.length > 0 && (
                      <div className="projects-card-footer">
                        <div className="projects-authors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          <span>{project.authors.join(', ')}</span>
                        </div>
                      </div>
                    )}
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

export default Projects;
