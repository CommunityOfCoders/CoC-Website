import React, { useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  AlignLeft,
  ArrowRight,
  BarChart,
  BookOpen,
  Brain,
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Copy,
  Cpu,
  Database,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Folder,
  GitBranch,
  GitFork,
  Globe,
  HardDrive,
  Heart,
  Image,
  Layers,
  Layout,
  Lock,
  Map,
  MessageSquare,
  Mic,
  Monitor,
  Music,
  Network,
  PieChart,
  Play,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Terminal,
  TrendingUp,
  User,
  Users,
  X,
  Zap
} from "lucide-react";
import "./Projects.css";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Feature {
  icon: React.ElementType;
  label: string;
}

export interface Feature {
  icon: React.ElementType;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  category?: string;
  tech?: string[];
  features?: Feature[];
  year?: string;
  github?: string;
  githubLink?: string;
  demo?: string;
  stars?: number;
  forks?: number;
  thumbnail?: string;
  featured?: boolean;
  image?: string;
  authors?: string[];
}

// ─── SVG THUMBNAIL MOCK GRAPHICS ─────────────────────────────────────────────

// ─── DATA ────────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  // 2025 Projects
  { id: '1', name: 'FakeMyVoice', tagline: 'Deep learning-powered multi-speaker TTS system for voice cloning.', description: 'FakeMyVoice is an advanced text-to-speech system leveraging deep learning to achieve multi-speaker voice cloning. It processes audio features and synthesizes highly realistic, natural-sounding speech patterns, enabling users to clone and reproduce voices accurately across diverse conversational contexts.', tech: ['Python', 'PyTorch', 'Librosa'], features: [{ icon: Mic, label: 'Multi-speaker voice cloning' }, { icon: Activity, label: 'Audio feature processing' }, { icon: Sparkles, label: 'Natural-sounding speech synthesis' }], year: '2025', githubLink: 'https://github.com/nihira20/Fake_My_Voice', authors: ['Aryan Doshi', 'Dhiraj Shirse', 'Nihira Neralwar'] },
  { id: '2', name: 'Train Your Foes', tagline: 'Game with an AI enemy that learns from you using Q-Learning.', description: 'Train Your Foes is an innovative gaming experience where the enemy AI continuously adapts to the player\'s strategies. Using Q-Learning reinforcement algorithms, the opponent evolves dynamically, creating an increasingly challenging and unpredictable gameplay loop tailored to your skill level.', tech: ['Python', 'TensorFlow', 'PyGame'], features: [{ icon: Target, label: 'Enemy AI continuous adaptation' }, { icon: Brain, label: 'Q-Learning reinforcement algorithms' }, { icon: Play, label: 'Dynamic gameplay loop generation' }], year: '2025', githubLink: 'https://github.com/AvanishSalunke/TRAIN-YOUR-FOES', authors: ['Avanish Salunke', 'Nathan Dsouza','Awwab Wadekar'], featured: true },
  { id: '3', name: 'Traffiq', tagline: 'Intelligent traffic control system optimizing signals in real-time with DRL.', description: 'Traffiq utilizes Deep Reinforcement Learning (DRL) to dynamically optimize traffic signal timings based on real-time vehicle density. By simulating urban intersections, the model effectively minimizes congestion, reduces wait times, and improves overall vehicular flow across complex road networks.', tech: ['Python', 'OpenAI Gym', 'Keras'], features: [{ icon: Car, label: 'Real-time traffic signal optimization' }, { icon: Network, label: 'Deep Reinforcement Learning (DRL) integration' }, { icon: Globe, label: 'Simulation of Urban Mobility (SUMO)' }], year: '2025', githubLink: 'https://github.com/sofiaabidi/TraffIQ-Project-X-2025', authors: ['Ojas Alai', 'Sofia Abidi'] },
  { id: '4', name: 'Voice2English', tagline: 'Speech-to-English translation system using Transformer-based ASR and NMT for multilingual voice translation.', description: 'Voice2English seamlessly translates spoken language into English using cutting-edge Transformer-based Automatic Speech Recognition (ASR) and Neural Machine Translation (NMT). Designed for high accuracy, the system facilitates real-time, cross-lingual communication by overcoming complex acoustic variations and linguistic barriers.', tech: ['Python', 'Transformers', 'HuggingFace'], features: [{ icon: Mic, label: 'Spoken language to original transcript conversion' }, { icon: Globe, label: 'Transcript to English language translation' }, { icon: Cpu, label: 'Transformer-based ASR and NMT integration' }], year: '2025', githubLink: 'https://github.com/shnavii11/Voice2English', authors: ['Purvasha Singh', 'Vaishnavi Sanap', 'Harsh Sanke'] },
  { id: '5', name: 'Reinforcents', tagline: 'Simulates stock & options trading market using Reinforcement Learning.', description: 'Reinforcents provides a comprehensive trading simulation environment for stock and options markets. Powered by Reinforcement Learning agents, the platform learns profitable trading strategies, manages risk through portfolio balancing, and adapts to volatile market trends using historical financial data.', tech: ['Python', 'RLlib', 'Pandas'], features: [{ icon: Activity, label: 'Comprehensive trading simulation environment' }, { icon: Brain, label: 'Reinforcement learning for trading strategies' }, { icon: PieChart, label: 'Portfolio balancing and risk management' }], year: '2025', githubLink: 'https://github.com/dagaaryan011/Reinforcents', authors: ['Aryan Daga', 'Sudiksha Kadam'] },
  { id: '6', name: 'Neural Quest', tagline: 'AI-powered RPG with procedural world generation and LLM-driven NPC dialogue and dynamic storytelling.', description: 'Neural Quest revolutionizes the RPG genre by integrating Large Language Models (LLMs) to power deeply immersive, open-ended NPC interactions. Accompanied by procedural world generation, every player action shapes a unique, dynamic narrative, ensuring no two playthroughs are ever identical.', tech: ['C#', 'Unity', 'OpenAI API'], features: [{ icon: Map, label: 'Procedural world generation' }, { icon: MessageSquare, label: 'LLM-driven open-ended NPC interactions' }, { icon: BookOpen, label: 'Dynamic narrative shaping' }], year: '2025', githubLink: 'https://github.com/regenpalkar28/Neural-Quest', authors: ['Regen Palkar', 'Bhavika Wankhede'] },
  { id: '7', name: 'Cryptify', tagline: 'Secure messaging using Java Socket & Hybrid Cryptography (RSA+AES).', description: 'Cryptify is a robust secure messaging application built on Java Sockets. It implements a hybrid cryptographic approach, utilizing RSA for secure key exchange and AES for rapid message encryption, guaranteeing end-to-end data confidentiality and integrity during client-server communications.', tech: ['Java', 'Sockets', 'Cryptography'], features: [{ icon: Lock, label: 'End-to-End Encryption with RSA and AES' }, { icon: MessageSquare, label: 'Real-Time Messaging via WebSockets' }, { icon: Shield, label: 'Secure Authentication using Spring Security' }, { icon: Lock, label: 'TLS/SSL Transport Layer Security' }], year: '2025', githubLink: 'https://github.com/MohdHedayati/Encrypted-Chat-Application', authors: ['Mohammed Hedayati', 'Rudrakshi Chincholkar'] },
  { id: '8', name: 'Text to Handwriting', tagline: 'Generates handwritten text from input using a Conditional GAN.', description: 'This project bridges the gap between digital text and physical handwriting using a Conditional Generative Adversarial Network (cGAN). It translates standard text inputs into highly personalized, realistic cursive or block handwriting styles, mimicking natural human penmanship with remarkable accuracy.', tech: ['Python', 'GANs', 'OpenCV'], features: [{ icon: Eye, label: 'Conditional GAN for digital text to handwriting' }, { icon: Edit3, label: 'Personalized cursive and block style generation' }, { icon: User, label: 'Highly realistic human penmanship mimicry' }], year: '2025', githubLink: 'https://github.com/hredayshah2507/Text-To-Handwriting', authors: ['Hreday Shah', 'Mahi Desai'] },
  { id: '9', name: 'EEG Analyser and Simulator', tagline: 'AI-driven simulation and prediction of brain dynamics using EEG data.', description: 'The EEG Analyser and Simulator applies advanced machine learning techniques to interpret and predict complex brain dynamics. By analyzing high-resolution electroencephalogram (EEG) signals, the system identifies neurological patterns, offering powerful insights for cognitive research and potential brain-computer interface applications.', tech: ['Python', 'MNE-Python', 'Scikit-learn'], features: [{ icon: Activity, label: 'Deep learning and signal processing on EEG signals' }, { icon: Brain, label: 'Neurological and cognitive pattern detection' }, { icon: Monitor, label: 'AI-driven simulation of brain dynamics' }], year: '2025', githubLink: 'https://github.com/ajatshatru01/EEG-Analyser-and-simulator', authors: ['Utsav Ojha', 'Bianca Sawant', 'Rudrani Wadelkar'] },
  { id: '10', name: 'MuseGan', tagline: 'GAN-based project for generating multi-track polyphonic music.', description: 'MuseGAN explores computational creativity by utilizing Generative Adversarial Networks to compose original, multi-track polyphonic music. The model intricately coordinates multiple instruments—such as bass, drums, and strings—generating harmonious, rhythmically complex musical pieces without human intervention.', tech: ['Python', 'TensorFlow', 'Music21'], features: [{ icon: Music, label: 'Multi-track polyphonic music generation via GANs' }, { icon: Play, label: '4 bars of coherent music from scratch' }, { icon: Users, label: 'Coordination of 5 simultaneous instruments' }], year: '2025', githubLink: 'https://github.com/Star-Light-9/MuseGAN', authors: ['Pratyush Rao', 'Yashasvi Choudhary'] },
  { id: '11', name: 'Multimodal Graph DB with RAG', tagline: 'Multimodal GraphRAG system combining knowledge graphs, CLIP embeddings, and LLMs for semantic document and product retrieval.', description: 'This sophisticated Multimodal GraphRAG system integrates knowledge graphs with CLIP embeddings and Large Language Models. It enables highly accurate, context-aware semantic retrieval across text and image datasets, significantly enhancing the precision of intelligent search engines and product recommendation platforms.', tech: ['Python', 'Neo4j', 'LangChain'], features: [{ icon: Search, label: 'Vector embeddings for semantic search and clustering' }, { icon: Network, label: 'Multimodal knowledge graph integration' }, { icon: FileText, label: 'CLIP and LLM semantic document retrieval' }], year: '2025', githubLink: 'https://github.com/champ-byte/Multimodal_GraphRAG', authors:['Kavya Zala','Manaswi Rane'] },
  { id: '12', name: 'CodeSage', tagline: 'Python framework that executes code and explains its logic step-by-step.', description: 'CodeSage acts as an intelligent programming tutor. It is a specialized Python framework that not only executes user-provided scripts but also dynamically breaks down the logic, offering step-by-step natural language explanations to help developers understand complex algorithms and debugging flows.', tech: ['Python', 'AST', 'Flask'], features: [{ icon: Code, label: 'AI Code Interpreter and Explainer' }, { icon: Cpu, label: 'AST parsing for script execution' }, { icon: AlignLeft, label: 'NLP summarizer for dynamic logic breakdowns' }], year: '2025', githubLink: 'https://github.com/Mokshii46/CODESAGE', authors: ['Mokshi Shah'] },
  { id: '13', name: 'Sera', tagline: 'Agentic AI web assistant that autonomously navigates websites using LLM planning and DOM-aware browser automation.', description: 'Sera is a state-of-the-art agentic AI assistant capable of autonomous web navigation. Leveraging sophisticated LLM planning and DOM-aware browser automation, Sera interprets high-level user prompts, seamlessly interacts with complex web interfaces, and automates repetitive online tasks with human-like precision.', tech: ['TypeScript', 'Puppeteer', 'LangChain'], features: [{ icon: Globe, label: 'Autonomous web navigation via agentic AI' }, { icon: Monitor, label: 'DOM-aware browser automation' }, { icon: Terminal, label: 'LLM-based high-level prompt interpretation' }], year: '2025', githubLink: 'https://github.com/shreyakash24/Sera--Smart-Search-Assistant', authors:['Tanmay More', 'Shreya Kashikar'] },
  { id: '14', name: 'Kernel Design', tagline: 'Bare-metal microkernel operating system for Raspberry Pi featuring MLFQ scheduling, a custom VFS, and system call support.', description: 'This ambitious Kernel Design project is a custom, bare-metal microkernel built specifically for the Raspberry Pi architecture. It features a Multi-Level Feedback Queue (MLFQ) for efficient process scheduling, a custom Virtual File System (VFS), and robust system call implementations for user-space applications.', tech: ['C', 'Assembly', 'Make'], features: [{ icon: Cpu, label: 'Bare-metal microkernel written in C and AArch64 Assembly' }, { icon: HardDrive, label: 'Targeted for Raspberry Pi 3B (BCM2837 SoC)' }, { icon: Layers, label: 'Custom Virtual File System (VFS) and MLFQ scheduling' }], year: '2025', githubLink: 'https://github.com/Froglodyte/TycheOS', authors: ['Mudit Bengani', 'Jinmay Jhaveri'], featured: true },
  { id: '15', name: 'Cryptanalysis', tagline: 'Hybrid framework analyzing multiple ciphers with deep learning.', description: 'This Cryptanalysis framework employs deep learning and neurosymbolic methods to evaluate and break cryptographic ciphers. By analyzing ciphertexts for hidden patterns and statistical anomalies, the system accelerates the discovery of vulnerabilities, pushing the boundaries of modern cryptographic security testing.', tech: ['Python', 'PyTorch', 'SymPy'], features: [{ icon: Lock, label: 'Deep learning for evaluating cryptographic ciphers' }, { icon: Eye, label: 'Ciphertext hidden pattern analysis' }, { icon: Shield, label: 'Neurosymbolic anomaly detection framework' }], year: '2025', githubLink: 'https://github.com/RishitModi/EnergyBased-and-Neurosymbolic-Methods-for-Advanced-CrypytAnalysis/', authors: ['Rishit Modi', 'Anushka Yadav'] },
  { id: '16', name: 'AI Ops', tagline: 'AIOps platform for real-time anomaly detection and predictive monitoring using Prometheus, LSTM Autoencoders, and Prophet.', description: 'AIOps is a predictive IT operations platform that monitors system health in real-time. By combining Prometheus telemetry with LSTM Autoencoders and Prophet forecasting models, it autonomously detects infrastructure anomalies, predicts impending failures, and enables proactive incident resolution before downtime occurs.', tech: ['Python', 'Prometheus', 'Prophet'], features: [{ icon: AlertTriangle, label: 'Automated infrastructure anomaly detection' }, { icon: Activity, label: 'Prophet forecasting for system behavior' }, { icon: BarChart, label: 'Real-time metrics visualization via dashboards' }], year: '2025', githubLink: 'https://github.com/SakshiKalunge07/AIOps', authors: ['Sakshi Kalunge', 'Anushree Upasham'], featured: true },
  { id: '45', name: 'JARVIS', tagline: 'AI-powered personal assistant extending its capabilities into your local system.', description: 'JARVIS brings the concept of an intelligent digital butler to life. Operating directly on your local system, this AI-powered assistant can execute system commands, manage files, fetch real-time information, and integrate with local APIs to drastically streamline your daily desktop workflow.', tech: ['Python', 'SpeechRecognition', 'FastAPI'], features: [{ icon: Terminal, label: 'Local system autonomous execution' }, { icon: Folder, label: 'Command execution and file management' }, { icon: Zap, label: 'Real-time API integrations and fetching' }], year: '2025', githubLink: 'https://github.com/AvanishSalunke/JARVIS', authors: ['Avanish Salunke', 'Pratyush Rao', 'Purvasha Singh', 'Kavish Nasta'] },
  
  // 2026 Projects
  { id: '32', name: 'Optimum Fallax', tagline: 'Evolutionary multi-agent simulation for studying reward hacking and AI alignment.', description: 'Optimum Fallax is an advanced multi-agent simulation framework focused on AI safety. It provides a controlled environment to study reward hacking, evolutionary adaptation, and alignment failures, allowing researchers to observe how agents exploit poorly specified reward models to achieve unintended objectives.', tech: ['Python', 'Ray', 'PyTorch'], features: [{ icon: Users, label: 'Multi-agent simulation environment' }, { icon: Shield, label: 'Study of reward hacking and AI alignment' }, { icon: Eye, label: 'Evolutionary adaptation strategy observation' }], year: '2026', githubLink: '#', authors: ['Rushil Shah', 'Pratyush Lokhande'] },
  { id: '33', name: 'Pharmacon', tagline: 'AI framework for predicting and interpreting drug–drug interactions.', description: 'Pharmacon utilizes deep learning on graph and sequence-based molecular representations to accurately predict potential drug-drug interactions. By uncovering hidden biochemical relationships, this framework assists pharmacologists in preventing adverse drug reactions and accelerating the safe development of new therapeutic combinations.', tech: ['Python', 'PyTorch Geometric', 'RDKit'], features: [{ icon: Network, label: 'Graph and sequence-based molecular representation analysis' }, { icon: Activity, label: 'Prediction of drug-drug interactions' }, { icon: Search, label: 'Identification of hidden biochemical relationships' }], year: '2026', githubLink: '#', authors: ['Bianca Sawant', 'Ankita Sagar'] },
  { id: '34', name: 'Sentient Shadow', tagline: '2D RPG with an adaptive AI companion that evolves its behavior based on player choices.', description: 'Sentient Shadow offers a deeply personalized 2D RPG experience through an adaptive AI companion. The companion analyzes your in-game decisions, dialogue choices, and moral alignments, organically evolving its personality and shaping branching narrative paths for a truly responsive, dynamic storytelling adventure.', tech: ['C++', 'Unreal Engine', 'Behavior Trees'], features: [{ icon: User, label: 'Adaptive AI companion evolving via player choices' }, { icon: GitBranch, label: 'Branching narrative paths shaping' }, { icon: Heart, label: 'Real-time moral alignment analysis' }], year: '2026', githubLink: '#', authors: ['Jiya Choksi', 'Hishant Kudalkar', 'Samyak Kose'] },
  { id: '35', name: 'AI-Git', tagline: 'Git-style version control system optimized for AI projects with dataset and model management.', description: 'AI-Git solves the data versioning bottleneck in machine learning workflows. It operates as a Git-style version control system specifically optimized for large datasets and massive model checkpoints, offering deduplication, rapid branching, and seamless collaboration features tailored for modern AI engineering teams.', tech: ['Go', 'gRPC', 'PostgreSQL'], features: [{ icon: GitBranch, label: 'Git-style version control optimized for AI' }, { icon: Copy, label: 'Deduplication and rapid branching' }, { icon: Database, label: 'Massive model checkpoint and dataset management' }], year: '2026', githubLink: '#', authors: ['Sanvi Naik', 'Aarya Doshi'] },
  { id: '36', name: 'Archaeological Site Detection', tagline: 'Geospatial AI system that combines LiDAR and satellite imagery to identify historical sites.', description: 'This Geospatial AI system revolutionizes modern archaeology by combining high-resolution LiDAR scans with multispectral satellite imagery. Utilizing specialized convolutional neural networks, the model autonomously detects subtle topographic anomalies, successfully identifying unexcavated historical sites hidden beneath dense vegetation.', tech: ['Python', 'GDAL', 'Keras'], features: [{ icon: Map, label: 'High-resolution LiDAR and multispectral satellite imagery fusion' }, { icon: Eye, label: 'CNN-based subtle topographic anomaly detection' }, { icon: Search, label: 'Unexcavated historical site identification' }], year: '2026', githubLink: '#', authors: ['Aashita Singh', 'Shreyans Deshpande'] },
  { id: '37', name: 'Custom VPN', tagline: 'Custom VPN implementation featuring packet tunneling, UDP transport, and encryption.', description: 'This Custom VPN is a high-performance network tunneling solution built from scratch. It features custom packet encapsulation, low-latency UDP transport, and rigorous end-to-end encryption protocols, providing users with a secure, private, and censorship-resistant connection across untrusted public networks.', tech: ['C', 'OpenSSL', 'Linux TUN/TAP'], features: [{ icon: Lock, label: 'Custom packet encapsulation' }, { icon: Zap, label: 'Low-latency UDP transport implementation' }, { icon: Shield, label: 'End-to-end rigorous encryption protocols' }], year: '2026', githubLink: '#', authors: ['Advait Wadke', 'Shivam Bhalerao', 'Amit Phadke'] },
  { id: '38', name: 'MemoraDB', tagline: 'Lightweight DBMS combining temporal versioning with vector-based semantic search.', description: 'MemoraDB is a modern, lightweight database management system engineered for AI-centric applications. Built on an append-only storage engine, it seamlessly combines temporal data versioning with native high-dimensional vector support, enabling lightning-fast semantic similarity searches alongside traditional CRUD operations.', tech: ['Rust', 'RocksDB', 'Faiss'], features: [{ icon: Database, label: 'Append-only storage engine design' }, { icon: Clock, label: 'Temporal data versioning' }, { icon: Search, label: 'Native high-dimensional vector search support' }], year: '2026', githubLink: '#', authors: ['Vihaan Jain', 'Naman Panchal', 'Vivaan Sanghvi'] },
  { id: '39', name: 'Consistent Distributed Cache System', tagline: 'Fault-tolerant distributed cache system using Raft consensus for consistent replication.', description: 'This Distributed Cache System is designed for extreme fault tolerance and high availability. It implements the robust Raft consensus algorithm to ensure strictly consistent data replication across clustered nodes, coupled with seamless persistent storage synchronization to prevent data loss during catastrophic node failures.', tech: ['Go', 'Raft', 'gRPC'], features: [{ icon: Layers, label: 'Raft consensus algorithm for strictly consistent replication' }, { icon: Shield, label: 'Extreme fault tolerance and high availability' }, { icon: RefreshCw, label: 'Seamless persistent storage synchronization' }], year: '2026', githubLink: '#', authors: ['Omisha Iyer', 'Krish Bhattad'] },
  { id: '40', name: 'FantasyXI', tagline: 'AI-powered Fantasy Premier League assistant using deep learning and game theory.', description: 'FantasyXI acts as the ultimate strategist for the Fantasy Premier League. Leveraging deep learning and game theory, the AI analyzes vast amounts of player statistics, upcoming fixture difficulties, and injury reports to recommend highly optimized squad transfers and maximize point yields week over week.', tech: ['Python', 'TensorFlow', 'Pandas'], features: [{ icon: Brain, label: 'Deep learning and game theory based strategy optimization' }, { icon: BarChart, label: 'Player statistics and fixture difficulty analysis' }, { icon: Users, label: 'Automated squad transfer recommendations' }], year: '2026', githubLink: '#', authors: ['Bhoomi Vaity', 'Darshan Mahale'] },
  { id: '41', name: 'KAIZEN', tagline: 'Autonomous multi-agent AI software engineer that manages GitHub workflows end-to-end.', description: 'KAIZEN is an ambitious multi-agent software engineering system. It autonomously manages the entire development lifecycle—interpreting feature requests, planning architectures, writing and testing code, updating documentation, and executing complete GitHub workflows without requiring continuous human intervention or oversight.', tech: ['TypeScript', 'Node.js', 'OpenAI API'], features: [{ icon: Cpu, label: 'Autonomous multi-agent software development lifecycle' }, { icon: Layout, label: 'Feature request interpretation and architecture planning' }, { icon: GitBranch, label: 'End-to-end GitHub workflow execution' }], year: '2026', githubLink: '#', authors: ['Samarth Yanjane', 'Pranit Mathane', 'Sahil Pojee'] },
  { id: '42', name: 'Kurtosis', tagline: 'AI-driven predictive maintenance system using vibration signal analysis.', description: 'Kurtosis is an industrial predictive maintenance solution designed to minimize factory downtime. By applying deep learning techniques to real-time mechanical vibration signals, the system identifies micro-faults in heavy machinery, diagnosing potential mechanical failures weeks before they become critical issues.', tech: ['Python', 'SciPy', 'TensorFlow'], features: [{ icon: Activity, label: 'Real-time mechanical vibration signal analysis' }, { icon: AlertTriangle, label: 'Deep learning based micro-fault identification' }, { icon: Clock, label: 'Proactive mechanical failure prediction' }], year: '2026', githubLink: '#', authors: ['Onkar Raskar', 'Awdhoot Prasad'] },
  { id: '43', name: 'PentestingAgent', tagline: 'Autonomous AI penetration testing framework using reinforcement learning.', description: 'PentestingAgent is a proactive cybersecurity framework that employs reinforcement learning to simulate sophisticated cyberattacks. By autonomously navigating networks, discovering exploitable vulnerabilities, and mapping out complex attack vectors, it helps security teams fortify infrastructure defenses against real-world malicious threats.', tech: ['Python', 'Metasploit', 'RLlib'], features: [{ icon: Target, label: 'Reinforcement learning for cyberattack simulation' }, { icon: Network, label: 'Autonomous network navigation and vulnerability discovery' }, { icon: Map, label: 'Complex attack vector mapping' }], year: '2026', githubLink: '#', authors: ['Ayana Sardha', 'Sharwari Palve'] },
  { id: '44', name: 'Schrödinger\'s Verdict', tagline: 'Quantum machine learning system using variational quantum classifiers for breast cancer detection.', description: 'Schrödinger\'s Verdict lies at the intersection of quantum computing and healthcare. The project utilizes Variational Quantum Classifiers (VQCs) to analyze complex medical datasets, providing highly accurate and computationally efficient breast cancer detection mechanisms that outperform traditional classical machine learning models.', tech: ['Python', 'Qiskit', 'Pennylane'], features: [{ icon: Cpu, label: 'Variational Quantum Classifiers (VQCs) integration' }, { icon: Activity, label: 'Complex medical dataset analysis' }, { icon: Zap, label: 'Computationally efficient breast cancer detection' }], year: '2026', githubLink: '#', authors: ['Aarav Nambiar', 'Shreyash Bhor'] },
  
  // 2024 Projects
  { id: '19', name: 'Virtual Try On for Products', tagline: 'Transferring a target clothes image onto a reference person using AR.', description: 'This Virtual Try-On system merges Augmented Reality with advanced Generative AI. It allows users to seamlessly transpose target clothing items onto a reference image of themselves, accurately preserving fabric textures, lighting, and body poses to deliver a highly realistic e-commerce shopping experience.', tech: ['Python', 'OpenCV', 'PyTorch'], features: [{ icon: User, label: 'Pose estimation and bone mapping' }, { icon: Layers, label: 'Mesh movements mapped in Unity' }, { icon: Smartphone, label: 'Augmented Reality clothing superimposition' }], year: '2024', githubLink: 'https://github.com/Afreen-Kazi-1/Virtual-Try-On-Products-', authors: ['Afreen Kazi', 'Mahi Palimkar', 'Ishaan Shaikh'] },
  { id: '20', name: 'Text To Speech', tagline: 'Converting written text into spoken words exploring efficient Deep Learning methods.', description: 'This Text To Speech engine explores highly optimized deep learning architectures to convert written text into natural, expressive human speech. Focused on efficiency and low-latency inference, the model is suitable for embedded devices and real-time accessibility applications requiring immediate voice synthesis.', tech: ['Python', 'TensorFlow', 'Librosa'], features: [{ icon: Cpu, label: 'End-to-end Transformer-based TTS architecture' }, { icon: Network, label: 'Self-attention mechanism for long-range dependencies' }, { icon: Mic, label: 'High-quality natural speech synthesis' }], year: '2024', githubLink: 'https://github.com/PrasannaKasar/Text-to-Speech', authors: ['Prasanna Kasar', 'Swayam Shah'] },
  { id: '21', name: 'GPT Reimagined: KANs vs MLPs', tagline: 'Exploring Kolmogorov-Arnold Networks (KANs) as an alternative to Multi Layer Perceptrons (MLPs).', description: 'GPT Reimagined is a rigorous architectural study comparing traditional Multi-Layer Perceptrons (MLPs) with novel Kolmogorov-Arnold Networks (KANs). The research explores whether KANs can offer superior interpretability, parameter efficiency, and mathematical expressiveness when scaling large generative pre-trained transformer models.', tech: ['Python', 'PyTorch', 'Transformers'], features: [{ icon: Activity, label: 'Comparison of traditional MLPs vs KANs' }, { icon: Cpu, label: 'Implementation of Generative Pre-trained Transformer' }, { icon: BarChart, label: 'Parameter efficiency and mathematical expressiveness analysis' }], year: '2024', githubLink: 'https://github.com/kavya-r30/GPT-Reimagined', authors: ['Kavya Rambhia', 'Abhay Upadhyay'] },
  { id: '22', name: 'Super MaRLo Bros', tagline: 'Building Super Mario Bros using PyGame and training AI to play it.', description: 'Super MaRLo Bros recreates the classic platformer using PyGame to serve as a training ground for autonomous AI agents. Through deep reinforcement learning algorithms like PPO and DQN, the AI independently learns complex movement physics, enemy evasion, and level traversal strategies to master the game.', tech: ['Python', 'PyGame', 'Stable-Baselines3'], features: [{ icon: Brain, label: 'Reinforcement learning (PPO and DQN) for agent training' }, { icon: Play, label: 'PyGame-based super-mario environment simulation' }, { icon: Target, label: 'Autonomous complex movement and evasion strategy generation' }], year: '2024', githubLink: 'https://github.com/23f2003701-1/SuperMaRLoBros', authors: ['Vidhi Rohira', 'Niharika Hariharan', 'Ayush Bothra'] },
  { id: '23', name: 'ChromaSight', tagline: 'Innovative color correction tool designed to enhance visual experiences for color blindness.', description: 'ChromaSight is an accessible accessibility utility specifically designed for users with color vision deficiencies. By applying real-time, customizable color matrix transformations to digital displays, the tool intelligently shifts indistinguishable hues into distinct visual spectrums, dramatically enhancing digital clarity and everyday usability.', tech: ['JavaScript', 'WebGL', 'React'], features: [{ icon: Eye, label: 'Vision Transformer (ViT) based image captioning' }, { icon: AlignLeft, label: 'Real-time optimized and concise text descriptions' }, { icon: Settings, label: 'Customizable color matrix transformations for accessibility' }], year: '2024', githubLink: 'https://github.com/Sohamshah03/Chroma-Sight', authors: ['Soham Shah', 'Krish Shah'] },
  { id: '24', name: 'Stock Transformers', tagline: 'Predicting stock prices using transformer architecture and time series forecasting.', description: 'Stock Transformers applies the power of attention mechanisms to the financial sector. By treating historical stock market data as complex time-series sequences, the transformer architecture identifies subtle long-term dependencies and market patterns, delivering highly accurate predictive forecasting for algorithmic trading.', tech: ['Python', 'PyTorch', 'Pandas'], features: [{ icon: Activity, label: 'Transformer architecture for time-series forecasting' }, { icon: Eye, label: 'Attention mechanisms applied to historical stock data' }, { icon: TrendingUp, label: 'Algorithmic trading predictive analytics' }], year: '2024', githubLink: 'https://github.com/Ghruank/stocktransformers/', authors: ['Khush Agrawal', 'Yashvi Mehta', 'Ghruank Kothare' ] },
  { id: '25', name: '2D Car Simulation', tagline: 'Combining physics engines and genetic algorithms where cars evolve.', description: 'This 2D Car Simulation is a fascinating exploration of evolutionary computing. By integrating a rigid-body physics engine with genetic algorithms, simulated vehicles undergo continuous mutation and crossover. Over multiple generations, the car designs organically evolve to successfully navigate increasingly difficult, randomly generated terrains.', tech: ['JavaScript', 'Matter.js', 'P5.js'], features: [{ icon: Car, label: 'Genetic algorithm based vehicle evolution' }, { icon: Settings, label: 'Rigid-body physics engine integration via Matter.js' }, { icon: Map, label: 'Randomized 2D terrain navigation' }], year: '2024', githubLink: 'https://github.com/pipinstallaadit/2D-Car-Simulator', authors: ['Abhay Varnekar', 'Aadit'] },
  { id: '26', name: 'SmartMailGuard', tagline: 'AI-powered tool that distinguishes between spam and legitimate emails.', description: 'SmartMailGuard is a highly robust email filtering system. It leverages a hybrid architecture of Long Short-Term Memory (LSTM) networks and lightweight Transformers to deeply analyze email semantics, metadata, and sender patterns, successfully isolating sophisticated phishing attempts and spam from legitimate correspondence.', tech: ['Python', 'Transformers', 'FastAPI'], features: [{ icon: Network, label: 'Hybrid LSTM and lightweight Transformer architecture' }, { icon: Search, label: 'Deep analysis of email semantics and metadata' }, { icon: Shield, label: 'Sophisticated phishing attempt isolation' }], year: '2024', githubLink: 'https://github.com/aitwehrrg/SmartMailGuard', authors: ['Amal Verma', 'Kevin Shah', 'Rupak Gupta'] },
  { id: '27', name: 'Verbal to Visual', tagline: 'Transforming textual descriptions into vivid, lifelike images using state-of-the-art neural networks.', description: 'Verbal to Visual is a powerful text-to-image generation platform. Utilizing state-of-the-art latent diffusion neural networks, the system intricately parses descriptive textual prompts and synthesizes vivid, high-resolution, lifelike images, offering immense creative potential for artists, designers, and content creators.', tech: ['Python', 'Diffusers', 'PyTorch'], features: [{ icon: Image, label: 'Latent diffusion neural networks (XL+GANs) for image synthesis' }, { icon: Cpu, label: 'Text-to-embedding translation' }, { icon: Monitor, label: 'High-resolution lifelike visual generation' }], year: '2024', githubLink: 'https://github.com/Captain-MUDIT/Verbal-to-Visual/', authors: ['Mudit Jain', 'Yadnyesh Patil', 'Janvi Soni'] },
  { id: '28', name: 'Deep Multiclass Audio Classification', tagline: 'Classifying various audio recordings using Convolutional Neural Networks (CNNs).', description: 'This Deep Multiclass Audio Classification project transforms raw auditory data into visual spectrograms. By feeding these representations into optimized Convolutional Neural Networks (CNNs), the system achieves remarkable accuracy in distinguishing between diverse environmental sounds, musical instruments, and human speech patterns.', tech: ['Python', 'Keras', 'Librosa'], features: [{ icon: Activity, label: 'Raw auditory data to visual spectrogram transformation' }, { icon: Cpu, label: 'Optimized Convolutional Neural Networks (CNNs)' }, { icon: Mic, label: 'Diverse environmental sound and speech classification' }], year: '2024', githubLink: 'https://github.com/soham30rane/Deep-Multiclass-Audio-Classification', authors: ['Soham Rane', 'Aanchal Borse'] },
  { id: '30', name: 'Xcelerate - Self Driving Car', tagline: 'Training a CNN to map raw pixels to steering commands.', description: 'Xcelerate is an end-to-end autonomous driving simulation. It trains a Convolutional Neural Network to map raw pixel data from a single front-facing virtual camera directly into precise steering angles, successfully demonstrating behavioral cloning and advanced computer vision techniques in self-driving architectures.', tech: ['Python', 'OpenCV', 'TensorFlow'], features: [{ icon: Car, label: 'CNN-based raw pixel data to steering angle mapping' }, { icon: Monitor, label: 'End-to-end autonomous driving simulation' }, { icon: Eye, label: 'Behavioral cloning and advanced computer vision implementation' }], year: '2024', githubLink: 'https://github.com/yashogale30/Xcelerate', authors: ['Viraj Vora', 'Yash Ogle'] },
  { id: '31', name: 'The Not So Generic Chatbot', tagline: 'Topic specific chatbot using MultiModal RAG to overcome traditional LLM limitations.', description: 'The Not So Generic Chatbot utilizes a MultiModal Retrieval-Augmented Generation (RAG) framework to provide hyper-specific, factual responses. By grounding the underlying Large Language Model with dynamic, domain-specific text and image databases, it dramatically eliminates hallucinations and surpasses the constraints of standard generic chatbots.', tech: ['Python', 'LangChain', 'Pinecone'], features: [{ icon: MessageSquare, label: 'MultiModal Retrieval-Augmented Generation (RAG)' }, { icon: Database, label: 'Dynamic domain-specific text and image grounding' }, { icon: CheckCircle, label: 'Hallucination elimination for factual responses' }], year: '2024', githubLink: 'https://github.com/Tanish2207/Not-So-Generic-Chatbot/', authors: ['Tanish Bhamre', 'Vaishvi Khandelwal'] },
];

const CATEGORY_STYLE: Record<string, { bg: string; text: string }> = {
  AI: { bg: "rgba(168, 85, 247, 0.18)", text: "#c084fc" },
  Web: { bg: "rgba(59, 130, 246, 0.18)", text: "#60a5fa" },
  "Open Source": { bg: "rgba(34, 197, 94, 0.18)", text: "#4ade80" },
  Mobile: { bg: "rgba(249, 115, 22, 0.18)", text: "#fb923c" },
  IoT: { bg: "rgba(6, 182, 212, 0.18)", text: "#22d3ee" },
  Education: { bg: "rgba(234, 179, 8, 0.18)", text: "#facc15" },
  Hackathon: { bg: "rgba(239, 68, 68, 0.18)", text: "#f87171" },
};

const FILTERS = [
  "All",
  ...Array.from(new Set(PROJECTS.map((p) => p.year).filter(Boolean) as string[])).sort(
    (a, b) => parseInt(b) - parseInt(a)
  ),
];

// ─── REUSABLE SUB-COMPONENTS ─────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  const s = CATEGORY_STYLE[category] || { bg: "rgba(255,255,255,0.1)", text: "#fff" };
  return (
    <span className="project-card__badge" style={{ background: s.bg, color: s.text }}>
      {category}
    </span>
  );
}

function ThumbnailMedia({ project }: { project: Project }) {
  if (project.image) {
    return <img src={project.image} alt={project.name} />;
  }
  
  // Blank placeholder space
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)" }}>
      <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>Image Placeholder</span>
    </div>
  );
}

// ─── GITHUB STATS HOOK ──────────────────────────────────────────────────────

function useGithubStats(project: Project) {
  const [stats, setStats] = useState({ stars: project.stars || 0, forks: project.forks || 0 });

  useEffect(() => {
    if (project.stars === undefined && (project.githubLink || project.github)) {
      const url = project.githubLink || project.github;
      const match = url?.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (match) {
        const [, owner, repo] = match;
        const cacheKey = `gh_stats_${owner}_${repo}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          setStats(JSON.parse(cached));
        } else {
          fetch(`https://api.github.com/repos/${owner}/${repo}`)
            .then((r) => r.json())
            .then((data) => {
              if (data.stargazers_count !== undefined) {
                const newStats = { stars: data.stargazers_count, forks: data.forks_count };
                setStats(newStats);
                sessionStorage.setItem(cacheKey, JSON.stringify(newStats));
              }
            })
            .catch(() => {});
        }
      }
    }
  }, [project]);

  return stats;
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  showViewDetails?: boolean;
}

function ProjectCard({ project, onSelect, showViewDetails = true }: ProjectCardProps) {
  const { stars, forks } = useGithubStats(project);

  return (
    <article className="project-card" onClick={() => onSelect(project)} role="button" tabIndex={0}>
      <div className="project-card__media">
        <ThumbnailMedia project={project} />
      </div>

      <div className="project-card__body">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.name}</h3>
          {project.year ? (
            <span className="project-card__badge" style={{ background: "rgba(126, 217, 87, 0.15)", color: "#7ED957" }}>
              {project.year}
            </span>
          ) : (
            project.category && <CategoryBadge category={project.category} />
          )}
        </div>

        {project.tagline && <p className="project-card__tagline">{project.tagline}</p>}

        {project.tech && (
          <div className="project-card__tech">
            {project.tech.map((t) => (
              <span key={t} className="tech-chip">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="project-card__footer">
          <div className="project-card__stats">
            <span className="project-card__stat">
              <Star size={13} /> {stars}
            </span>
            <span className="project-card__stat">
              <GitFork size={13} /> {forks}
            </span>
          </div>

          {showViewDetails && (
            <span className="project-card__link">
              View Details <ChevronRight size={13} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── PROJECT DETAIL DRAWER MODAL ─────────────────────────────────────────────

interface DrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectDrawer({ project, isOpen, onClose }: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // We always call useGithubStats unconditionally
  const mockProject = project || ({} as Project);
  const { stars, forks } = useGithubStats(mockProject);

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`drawer-backdrop ${isOpen ? "is-open" : ""}`} onClick={onClose} />

      {/* Slide Panel */}
      <aside className={`drawer-panel ${isOpen ? "is-open" : ""}`} aria-modal="true" role="dialog">
        <div className="drawer-header">
          <div className="drawer-header__meta">
            {project.year ? (
              <span className="project-card__badge" style={{ background: "rgba(126, 217, 87, 0.15)", color: "#7ED957" }}>
                {project.year}
              </span>
            ) : (
              project.category && <CategoryBadge category={project.category} />
            )}
            <span className="project-card__stat" style={{ color: "var(--fg-faint)", fontSize: "0.8rem" }}>
              · <Star size={12} style={{ marginLeft: 4, marginRight: 2 }} /> {stars}
              <GitFork size={12} style={{ marginLeft: 10, marginRight: 2 }} /> {forks}
            </span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close details">
            <X size={16} />
          </button>
        </div>

        <div className="drawer-content">
          <div className="drawer-media">
            <ThumbnailMedia project={project} />
          </div>

          <h2 className="drawer-title">{project.name}</h2>
          {project.tagline && <p className="drawer-tagline">{project.tagline}</p>}
          {project.authors && (
            <p className="drawer-tagline" style={{ fontSize: "0.9rem", color: "var(--fg-muted)" }}>
              Authors: {project.authors.join(", ")}
            </p>
          )}

          <div className="drawer-actions">
            {(project.github || project.githubLink) && (
              <a href={project.github || project.githubLink} target="_blank" rel="noreferrer" className="btn btn--ghost">
                <GitBranch size={15} /> GitHub Repository
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>

          <div className="drawer-divider" />

          <div style={{ marginBottom: "28px" }}>
            <div className="drawer-section-label">ABOUT</div>
            <p className="drawer-about-text">{project.description}</p>
          </div>

          

          {project.tech && project.tech.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <div className="drawer-section-label">TECH STACK</div>
              <div className="project-card__tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-chip" style={{ fontSize: "0.78rem", padding: "4px 12px" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div>
              <div className="drawer-section-label">FEATURES</div>
              <div className="drawer-features-grid">
                {project.features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="feature-card">
                      <div className="feature-card__icon">
                        <Icon size={16} />
                      </div>
                      <span className="feature-card__label">{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}


        </div>
      </aside>
    </>
  );
}

// ─── MAIN PROJECTS PAGE COMPONENT ─────────────────────────────────────────────

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let hasSnapped = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we are at the top and scrolling down (past a small threshold)
      if (currentScrollY > 10 && currentScrollY < 200 && currentScrollY > lastScrollY && !hasSnapped) {
        hasSnapped = true;
        const featured = document.getElementById("flagship-section");
        if (featured) {
          featured.scrollIntoView({ behavior: "smooth" });
        }
      }
      
      // Reset the snap if the user scrolls all the way back to the top
      if (currentScrollY <= 10) {
        hasSnapped = false;
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBrowseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featured = document.getElementById("flagship-section");
    if (featured) {
      featured.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Filter projects by category & search term
  const filteredProjects = PROJECTS.filter((p) => {
    if (p.featured) return false;
    const matchesYear = activeFilter === "All" || p.year === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      (p.tech && p.tech.some((t) => t.toLowerCase().includes(q)));
    return matchesYear && matchesSearch;
  }).sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"));

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="projects-page">
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="projects-hero">
        <div className="container">
          <div className="projects-hero__grid">
            <div className="projects-hero__content">
              <span className="eyebrow">STUDENT-RUN · VJTI MATUNGA</span>

              <h1 className="projects-title">
                PROJECTS<span className="mark">.</span>
              </h1>

              <p className="projects-subtitle">
                From hackathon winners to open-source tools, discover what Community of Coders has built through
                innovation, collaboration and real-world problem solving.
              </p>

              <div className="projects-hero__actions">
                <a href="#flagship-section" className="btn" onClick={handleBrowseClick}>
                  Browse Projects <ArrowRight size={16} />
                </a>
                <a
                  href="https://github.com/CommunityOfCoders"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost"
                >
                  <GitBranch size={16} /> Contribute
                </a>
              </div>

              <div className="projects-stats">
                <div>
                  <div className="projects-stat__number">120+</div>
                  <div className="projects-stat__label">Projects built</div>
                </div>
                <div>
                  <div className="projects-stat__number">50+</div>
                  <div className="projects-stat__label">Contributors</div>
                </div>
                <div>
                  <div className="projects-stat__number">2k+</div>
                  <div className="projects-stat__label">GitHub stars</div>
                </div>
              </div>
            </div>

            {/* Right Side: Stack of Preview Cards */}
            <div className="projects-hero__visual">
              {featuredProjects.slice(0, 3).map((fp, idx) => (
                <div key={fp.id} className={`floating-preview floating-preview--${idx + 1}`} onClick={() => handleOpenProject(fp)}>
                  <div className="floating-preview__media">
                    <ThumbnailMedia project={fp} />
                  </div>
                  <div className="floating-preview__info">
                    <div className="floating-preview__header">
                      <span className="floating-preview__title">{fp.name}</span>
                      {fp.year && (
                        <span className="project-card__badge" style={{ background: "rgba(126, 217, 87, 0.15)", color: "#7ED957" }}>
                          {fp.year}
                        </span>
                      )}
                    </div>
                    {fp.tech && (
                      <div className="floating-preview__tags">
                        {fp.tech.slice(0, 3).map((t) => (
                          <span key={t} className="floating-preview__tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="projects-scroll-hint">
            <span className="projects-scroll-hint__text">SCROLL</span>
            <div className="projects-scroll-hint__line" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED (FLAGSHIP WORK) SECTION ───────────────────────────── */}
      <section className="projects-featured" id="flagship-section">
        <div className="container">
          <div className="projects-section-header">
            <span className="eyebrow">FEATURED</span>
            <h2 className="projects-section-title">Flagship work.</h2>
          </div>

          <div className="projects-featured__grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={handleOpenProject} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BROWSE & EXPLORE EVERYTHING SECTION ────────────────────────── */}
      <section className="projects-browse" id="browse-section">
        <div className="container">
          <div className="projects-section-header">
            <span className="eyebrow">BROWSE</span>
            <h2 className="projects-section-title">Explore everything.</h2>
          </div>

          {/* Search Bar */}
          <div className="projects-search-bar">
            <Search size={18} className="projects-search-icon" />
            <input
              type="text"
              className="projects-search-input"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="projects-search-clear" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="projects-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Subheader Count */}
          <div className="projects-subhead">
            <span className="eyebrow">ALL PROJECTS</span>
            <span className="projects-count">— {filteredProjects.length} projects</span>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="projects-empty">
              <p>No projects found matching "{searchQuery}".</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onSelect={handleOpenProject} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── PROJECT DETAIL DRAWER ───────────────────────────────────────── */}
      <ProjectDrawer project={selectedProject} isOpen={drawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
}