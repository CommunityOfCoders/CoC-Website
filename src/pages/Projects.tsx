import React, { useState, useEffect } from "react";
import {
  Search,
  GitBranch,
  ExternalLink,
  X,
  ArrowRight,
  ChevronRight,
  Star,
  GitFork,
  Users,
  Award,
  BarChart3,
  Database,
  Shield,
  Bell,
  Monitor,
  Zap,
  Globe,
  Code2,
  Cpu,
  Lock,
} from "lucide-react";
import "./Projects.css";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Feature {
  icon: React.ElementType;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  features: Feature[];
  github: string;
  demo?: string;
  stars: number;
  forks: number;
  thumbnail: "ChatUI" | "Analytics" | "CodeEditor" | "Portal" | "Mobile" | "CodeCollabUI" | "HackTrackUI";
  featured?: boolean;
  /**
   * NOTE FOR ADDING REAL IMAGES:
   * Drop actual image assets into `/public/images/projects/<id>.png`
   * (or `/src/assets/projects/`) and reference the image URL here:
   * e.g., image: "/images/projects/campus-ai.png"
   */
  image?: string;
}

// ─── SVG THUMBNAIL MOCK GRAPHICS ─────────────────────────────────────────────

const ChatUI: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect width="110" height="220" fill="#161b22" />
    <rect x="8" y="10" width="94" height="30" rx="6" fill="#21262d" />
    <rect x="16" y="23" width="60" height="7" rx="2" fill="#6e7681" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="8" y={52 + i * 36} width="94" height="28" rx="5" fill={i === 0 ? "#0d2010" : "transparent"} />
        <circle cx="22" cy={66 + i * 36} r="7" fill={i === 0 ? "#7ED957" : "#21262d"} />
        <rect x="34" y={62 + i * 36} width="50" height="6" rx="2" fill={i === 0 ? "#c9d1d9" : "#6e7681"} />
        <rect x="34" y={72 + i * 36} width="35" height="4" rx="2" fill="#6e7681" opacity="0.5" />
      </g>
    ))}
    <rect x="110" y="0" width="290" height="36" fill="#161b22" />
    <rect x="120" y="12" width="120" height="12" rx="2" fill="#21262d" />
    <rect x="340" y="10" width="50" height="16" rx="8" fill="#7ED957" opacity="0.25" />
    <rect x="150" y="48" width="238" height="40" rx="8" fill="#21262d" />
    <rect x="162" y="58" width="150" height="6" rx="2" fill="#c9d1d9" />
    <rect x="162" y="68" width="110" height="6" rx="2" fill="#6e7681" />
    <rect x="114" y="100" width="252" height="62" rx="8" fill="#0d2010" />
    <rect x="114" y="100" width="3" height="62" rx="1.5" fill="#7ED957" />
    <rect x="126" y="110" width="55" height="6" rx="2" fill="#7ED957" />
    <rect x="126" y="120" width="220" height="6" rx="2" fill="#6e7681" />
    <rect x="126" y="130" width="180" height="6" rx="2" fill="#6e7681" />
    <rect x="126" y="140" width="130" height="6" rx="2" fill="#6e7681" />
    <rect x="114" y="174" width="274" height="36" rx="8" fill="#161b22" stroke="#30363d" strokeWidth="1" />
    <rect x="126" y="190" width="180" height="5" rx="2" fill="#30363d" />
    <rect x="366" y="180" width="16" height="22" rx="4" fill="#7ED957" />
  </svg>
);

const Analytics: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect width="400" height="36" fill="#161b22" />
    <rect x="12" y="10" width="100" height="14" rx="3" fill="#21262d" />
    <rect x="290" y="10" width="60" height="14" rx="7" fill="#21262d" />
    <rect x="358" y="10" width="30" height="14" rx="7" fill="#7ED957" opacity="0.25" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={10 + i * 97} y="46" width="90" height="50" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1" />
        <rect x={18 + i * 97} y="54" width="45" height="6" rx="2" fill="#6e7681" />
        <rect x={18 + i * 97} y="65" width={[55, 48, 62, 44][i]} height="18" rx="3" fill={["#7ED957", "#58a6ff", "#f0883e", "#bc8cff"][i]} opacity="0.9" />
        <rect x={18 + i * 97} y="88" width="30" height="4" rx="2" fill="#30363d" />
      </g>
    ))}
    <rect x="10" y="106" width="248" height="104" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="18" y="114" width="80" height="7" rx="2" fill="#c9d1d9" />
    {[22, 40, 28, 58, 36, 68, 50, 44, 56, 32].map((h, i) => (
      <rect key={i} x={18 + i * 24} y={202 - h} width="16" height={h} rx="2" fill={i === 5 || i === 6 ? "#7ED957" : "#21262d"} />
    ))}
    <rect x="266" y="106" width="124" height="104" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="276" y="114" width="70" height="7" rx="2" fill="#c9d1d9" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <circle cx="280" cy={132 + i * 20} r="5" fill={["#7ED957", "#58a6ff", "#f0883e", "#bc8cff"][i]} />
        <rect x="292" y={128 + i * 20} width="60" height="6" rx="2" fill="#6e7681" />
        <rect x="358" y={128 + i * 20} width="24" height="6" rx="2" fill="#21262d" />
      </g>
    ))}
  </svg>
);

const CodeEditor: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect width="400" height="32" fill="#161b22" />
    <rect width="115" height="32" fill="#0d1117" />
    <rect x="10" y="10" width="80" height="12" rx="2" fill="#21262d" />
    <rect x="125" y="10" width="55" height="12" rx="2" fill="#21262d" opacity="0.4" />
    <rect x="190" y="10" width="50" height="12" rx="2" fill="#21262d" opacity="0.25" />
    <rect width="28" height="220" y="32" fill="#161b22" />
    {[...Array(11)].map((_, i) => (
      <text key={i} x="8" y={50 + i * 16} fill="#6e7681" fontSize="7" fontFamily="monospace">
        {i + 1}
      </text>
    ))}
    <rect x="35" y="36" width="28" height="8" rx="1" fill="#f0883e" />
    <rect x="68" y="36" width="52" height="8" rx="1" fill="#79c0ff" />
    <rect x="35" y="52" width="18" height="8" rx="1" fill="#f0883e" />
    <rect x="58" y="52" width="36" height="8" rx="1" fill="#a5f3fc" opacity="0.9" />
    <rect x="100" y="52" width="55" height="8" rx="1" fill="#7ED957" />
    <rect x="42" y="68" width="70" height="8" rx="1" fill="#c9d1d9" />
    <rect x="118" y="68" width="90" height="8" rx="1" fill="#79c0ff" />
    <rect x="42" y="84" width="45" height="8" rx="1" fill="#bc8cff" />
    <rect x="92" y="84" width="110" height="8" rx="1" fill="#c9d1d9" />
    <rect x="28" y="98" width="372" height="16" fill="#1a2332" opacity="0.6" />
    <rect x="42" y="101" width="40" height="7" rx="1" fill="#f0883e" />
    <rect x="88" y="101" width="70" height="7" rx="1" fill="#a5f3fc" opacity="0.9" />
    <rect x="162" y="100" width="2" height="10" fill="#c9d1d9" />
    <rect x="42" y="116" width="55" height="8" rx="1" fill="#7ED957" />
    <rect x="103" y="116" width="130" height="8" rx="1" fill="#c9d1d9" />
    <rect x="42" y="132" width="80" height="8" rx="1" fill="#c9d1d9" />
    <rect x="128" y="132" width="45" height="8" rx="1" fill="#bc8cff" />
    <rect x="35" y="148" width="30" height="8" rx="1" fill="#f0883e" />
    <rect x="35" y="164" width="170" height="6" rx="1" fill="#6e7681" opacity="0.35" />
    <rect x="396" y="32" width="4" height="188" fill="#161b22" />
    <rect x="396" y="55" width="4" height="44" rx="2" fill="#21262d" />
  </svg>
);

const Portal: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect width="56" height="220" fill="#161b22" />
    <rect x="8" y="8" width="40" height="40" rx="8" fill="#7ED957" />
    <rect x="14" y="26" width="28" height="8" rx="2" fill="#0d1117" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="12" y={68 + i * 28} width="32" height="24" rx="6" fill={i === 1 ? "#0d2010" : "transparent"} />
        <rect x="18" y={74 + i * 28} width="20" height="12" rx="3" fill={i === 1 ? "#7ED957" : "#30363d"} />
      </g>
    ))}
    <rect x="56" y="0" width="344" height="40" fill="#161b22" />
    <rect x="68" y="12" width="110" height="16" rx="3" fill="#21262d" />
    <rect x="286" y="12" width="102" height="16" rx="8" fill="#21262d" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={68 + i * 110} y="50" width="104" height="52" rx="7" fill="#161b22" stroke="#21262d" strokeWidth="1" />
        <rect x={78 + i * 110} y="60" width="50" height="7" rx="2" fill="#6e7681" />
        <rect x={78 + i * 110} y="72" width={[48, 60, 42][i]} height="18" rx="3" fill={["#7ED957", "#58a6ff", "#f0883e"][i]} />
        <rect x={78 + i * 110} y="94" width="28" height="4" rx="2" fill="#30363d" />
      </g>
    ))}
    <rect x="68" y="112" width="218" height="98" rx="7" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="78" y="122" width="80" height="7" rx="2" fill="#c9d1d9" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="78" y={136 + i * 20} width="8" height="8" rx="2" fill={["#7ED957", "#58a6ff", "#f0883e", "#bc8cff"][i]} />
        <rect x="92" y={137 + i * 20} width="110" height="6" rx="2" fill="#6e7681" />
        <rect x="232" y={137 + i * 20} width="36" height="6" rx="2" fill="#21262d" />
      </g>
    ))}
    <rect x="294" y="112" width="118" height="98" rx="7" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="304" y="122" width="60" height="7" rx="2" fill="#c9d1d9" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <circle cx="308" cy={140 + i * 14} r="4" fill={["#7ED957", "#58a6ff", "#bc8cff", "#f0883e", "#6e7681"][i]} />
        <rect x="318" y={137 + i * 14} width="80" height="5" rx="2" fill="#6e7681" />
      </g>
    ))}
  </svg>
);

const Mobile: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect x="20" y="50" width="100" height="120" rx="8" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="30" y="62" width="80" height="7" rx="2" fill="#c9d1d9" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="30" y={76 + i * 22} width="8" height="8" rx="2" fill={["#7ED957", "#58a6ff", "#bc8cff", "#f0883e"][i]} />
        <rect x="44" y={77 + i * 22} width="55" height="6" rx="2" fill="#6e7681" />
      </g>
    ))}
    <rect x="130" y="10" width="140" height="200" rx="16" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
    <rect x="168" y="16" width="64" height="8" rx="4" fill="#21262d" />
    <rect x="134" y="30" width="132" height="1" fill="#21262d" />
    <rect x="140" y="38" width="120" height="60" rx="8" fill="#0d2010" />
    <rect x="152" y="50" width="75" height="10" rx="3" fill="#7ED957" opacity="0.9" />
    <rect x="152" y="64" width="55" height="7" rx="2" fill="#6e7681" />
    <rect x="152" y="75" width="80" height="7" rx="2" fill="#6e7681" />
    <rect x="152" y="86" width="38" height="6" rx="2" fill="#7ED957" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x="140" y={110 + i * 32} width="120" height="26" rx="7" fill="#21262d" />
        <circle cx="153" cy={123 + i * 32} r="7" fill={["#7ED957", "#58a6ff", "#f0883e"][i]} opacity="0.85" />
        <rect x="166" y={119 + i * 32} width="60" height="6" rx="2" fill="#c9d1d9" />
        <rect x="166" y={129 + i * 32} width="44" height="5" rx="2" fill="#6e7681" />
        <rect x="236" y={119 + i * 32} width="14" height="8" rx="2" fill="#30363d" />
      </g>
    ))}
    <rect x="140" y="208" width="120" height="6" rx="3" fill="#21262d" />
    <rect x="282" y="50" width="98" height="120" rx="8" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="292" y="62" width="65" height="7" rx="2" fill="#c9d1d9" />
    {[22, 38, 18, 30, 42, 14, 26].map((h, i) => (
      <rect key={i} x={292 + i * 11} y={162 - h} width="8" height={h} rx="2" fill={i === 4 ? "#7ED957" : "#21262d"} />
    ))}
    <rect x="292" y="164" width="78" height="1" fill="#30363d" />
  </svg>
);

const CodeCollabUI: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect width="400" height="30" fill="#161b22" />
    <circle cx="15" cy="15" r="4" fill="#ff5f56" />
    <circle cx="28" cy="15" r="4" fill="#ffbd2e" />
    <circle cx="41" cy="15" r="4" fill="#27c93f" />
    <rect x="60" y="8" width="120" height="14" rx="4" fill="#21262d" />
    <rect width="32" height="190" y="30" fill="#161b22" />
    {[...Array(9)].map((_, i) => (
      <text key={i} x="10" y={48 + i * 18} fill="#6e7681" fontSize="8" fontFamily="monospace">
        {i + 1}
      </text>
    ))}
    <rect x="42" y="42" width="60" height="8" rx="2" fill="#f0883e" />
    <rect x="108" y="42" width="80" height="8" rx="2" fill="#79c0ff" />
    <rect x="42" y="60" width="100" height="8" rx="2" fill="#bc8cff" />
    <rect x="148" y="60" width="40" height="8" rx="2" fill="#7ED957" />
    <rect x="52" y="78" width="140" height="8" rx="2" fill="#c9d1d9" />
    <rect x="52" y="96" width="90" height="8" rx="2" fill="#79c0ff" />
    <rect x="52" y="114" width="110" height="8" rx="2" fill="#7ED957" />
    <rect x="42" y="132" width="50" height="8" rx="2" fill="#f0883e" />
    <rect x="42" y="150" width="180" height="6" rx="2" fill="#6e7681" opacity="0.4" />
  </svg>
);

const HackTrackUI: React.FC = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117" />
    <rect width="400" height="36" fill="#161b22" />
    <rect x="12" y="8" width="24" height="20" rx="4" fill="#7ED957" />
    <rect x="44" y="12" width="90" height="12" rx="3" fill="#21262d" />
    <rect x="330" y="10" width="56" height="16" rx="8" fill="#f87171" opacity="0.25" />
    <rect x="12" y="46" width="230" height="160" rx="8" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="24" y="58" width="100" height="12" rx="3" fill="#7ED957" />
    <rect x="24" y="76" width="140" height="6" rx="2" fill="#6e7681" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="24" y={96 + i * 24} width="202" height="18" rx="4" fill="#21262d" />
        <circle cx="34" cy={105 + i * 24} r="4" fill={["#7ED957", "#58a6ff", "#f0883e", "#bc8cff"][i]} />
        <rect x="44" y={102 + i * 24} width="80" height="6" rx="2" fill="#c9d1d9" />
        <rect x="190" y={102 + i * 24} width="26" height="6" rx="2" fill="#30363d" />
      </g>
    ))}
    <rect x="250" y="46" width="138" height="160" rx="8" fill="#161b22" stroke="#21262d" strokeWidth="1" />
    <rect x="262" y="58" width="80" height="10" rx="3" fill="#c9d1d9" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="262" y={78 + i * 22} width="114" height="14" rx="3" fill="#21262d" />
        <rect x={266 + i * 16} y={82 + i * 22} width="10" height="6" rx="1" fill="#7ED957" />
      </g>
    ))}
  </svg>
);

const THUMBNAILS: Record<string, React.FC> = {
  ChatUI,
  Analytics,
  CodeEditor,
  Portal,
  Mobile,
  CodeCollabUI,
  HackTrackUI,
};

// ─── DATA ────────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "campus-ai",
    name: "CampusAI",
    tagline: "AI-powered campus assistant with RAG architecture",
    description:
      "Built to help VJTI students navigate academic resources more efficiently, CampusAI uses retrieval-augmented generation to answer questions about campus facilities, course materials, and exam procedures in real-time. Deployed on the VJTI intranet and actively used during exam season by over 300 students.",
    category: "AI",
    tech: ["Python", "FastAPI", "React", "LangChain"],
    features: [
      { icon: Search, label: "Semantic Search" },
      { icon: Database, label: "RAG Pipeline" },
      { icon: Shield, label: "Auth & Roles" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Bell, label: "Notifications" },
      { icon: Monitor, label: "Admin Panel" },
    ],
    github: "https://github.com/coc-vjti/campus-ai",
    demo: "https://campusai.vjti.ac.in",
    stars: 127,
    forks: 34,
    thumbnail: "ChatUI",
    featured: true,
  },
  {
    id: "coc-portal",
    name: "CoC Portal",
    tagline: "Central platform for community management and coordination",
    description:
      "The operational backbone of CoC, handling member onboarding, event registration, project showcasing, and newsletter distribution. Serves 500+ active members each semester with role-based access control and real-time analytics built in.",
    category: "Web",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      { icon: Users, label: "Member Mgmt" },
      { icon: Globe, label: "Event Booking" },
      { icon: Bell, label: "Email Alerts" },
      { icon: Lock, label: "RBAC" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Zap, label: "Mobile-first" },
    ],
    github: "https://github.com/coc-vjti/coc-portal",
    stars: 89,
    forks: 21,
    thumbnail: "Portal",
    featured: true,
  },
  {
    id: "open-placement",
    name: "OpenPlacement",
    tagline: "Open-source placement tracker and analytics for engineering colleges",
    description:
      "A community-driven initiative to democratize placement data across engineering colleges. Students log interview experiences, track company trends, and visualize multi-year placement statistics. Adopted by 3 consecutive VJTI batches and forked by 12 other colleges.",
    category: "Open Source",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    features: [
      { icon: BarChart3, label: "Trend Analysis" },
      { icon: Database, label: "Data Export" },
      { icon: Users, label: "Community" },
      { icon: Shield, label: "Verified Data" },
      { icon: Globe, label: "Public API" },
      { icon: Monitor, label: "Dashboard" },
    ],
    github: "https://github.com/coc-vjti/open-placement",
    stars: 203,
    forks: 67,
    thumbnail: "Analytics",
    featured: true,
  },
  {
    id: "algo-viz",
    name: "AlgoViz",
    tagline: "Interactive algorithm and data structure visualizer for learning",
    description:
      "An educational tool for visualizing sorting algorithms, graph traversal, and data structures with step-by-step animation and complexity analysis. Built for students preparing for technical interviews.",
    category: "Education",
    tech: ["React", "D3.js", "TypeScript", "Vite"],
    features: [
      { icon: Zap, label: "Step Animations" },
      { icon: Code2, label: "Code View" },
      { icon: BarChart3, label: "Complexity" },
    ],
    github: "https://github.com/coc-vjti/algo-viz",
    demo: "https://algoviz.coc-vjti.in",
    stars: 156,
    forks: 43,
    thumbnail: "CodeEditor",
  },
  {
    id: "smart-attend",
    name: "SmartAttend",
    tagline: "IoT-based smart attendance with RFID and facial recognition",
    description:
      "A hardware-software system that automates classroom attendance using RFID tags and OpenCV-based facial recognition. Deployed in 3 VJTI labs, eliminating manual proxy and reducing overhead for faculty.",
    category: "IoT",
    tech: ["Python", "OpenCV", "Arduino", "Firebase"],
    features: [
      { icon: Cpu, label: "RFID Scan" },
      { icon: Monitor, label: "Face Recog" },
      { icon: Database, label: "Firebase Sync" },
      { icon: BarChart3, label: "Reports" },
    ],
    github: "https://github.com/coc-vjti/smart-attend",
    stars: 72,
    forks: 18,
    thumbnail: "Mobile",
  },
  {
    id: "code-collab",
    name: "CodeCollab",
    tagline: "Real-time collaborative code editor with live execution",
    description:
      "A browser-based pair programming environment with real-time sync, multi-language support, and sandboxed code execution. Actively used in CoC workshops and interview prep sessions across batches.",
    category: "Web",
    tech: ["Node.js", "WebSocket", "Monaco Editor", "Redis"],
    features: [
      { icon: Code2, label: "Live Sync" },
      { icon: Zap, label: "Run Code" },
      { icon: Users, label: "Multi-cursor" },
      { icon: Shield, label: "Low Latency" },
    ],
    github: "https://github.com/coc-vjti/code-collab",
    demo: "https://codelab.coc-vjti.in",
    stars: 94,
    forks: 28,
    thumbnail: "CodeCollabUI",
  },
  {
    id: "vjti-map",
    name: "VJTIMap",
    tagline: "Interactive campus map and indoor navigation for VJTI",
    description:
      "A mobile app for navigating the VJTI campus with indoor positioning, department directories, and real-time event overlays. Originally built during a 36-hour hackathon, then polished and published on the App Store.",
    category: "Mobile",
    tech: ["React Native", "Expo", "Mapbox", "Node.js"],
    features: [
      { icon: Globe, label: "Indoor Nav" },
      { icon: Bell, label: "Event Overlay" },
      { icon: Database, label: "Offline Maps" },
    ],
    github: "https://github.com/coc-vjti/vjti-map",
    stars: 61,
    forks: 15,
    thumbnail: "Mobile",
  },
  {
    id: "hack-track",
    name: "HackTrack",
    tagline: "End-to-end hackathon management and live judging platform",
    description:
      "The platform behind CoC's own hackathons. HackTrack handles team formation, project submissions, mentor scheduling, and live judging scoreboards. Supports 200+ participants per event with Celery-powered async jobs.",
    category: "Hackathon",
    tech: ["React", "Django", "PostgreSQL", "Celery", "AWS S3"],
    features: [
      { icon: Users, label: "Team Mgmt" },
      { icon: Award, label: "Judging" },
      { icon: BarChart3, label: "Scoreboard" },
      { icon: Zap, label: "Async Jobs" },
    ],
    github: "https://github.com/coc-vjti/hack-track",
    stars: 45,
    forks: 12,
    thumbnail: "HackTrackUI",
  },
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

const FILTERS = ["All", "AI", "Web", "Open Source", "Mobile", "IoT", "Education", "Hackathon"];

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
  const Comp = THUMBNAILS[project.thumbnail] || ChatUI;
  return <Comp />;
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  showViewDetails?: boolean;
}

function ProjectCard({ project, onSelect, showViewDetails = true }: ProjectCardProps) {
  return (
    <article className="project-card" onClick={() => onSelect(project)} role="button" tabIndex={0}>
      <div className="project-card__media">
        <ThumbnailMedia project={project} />
      </div>

      <div className="project-card__body">
        <div className="project-card__header">
          <h3 className="project-card__title">{project.name}</h3>
          <CategoryBadge category={project.category} />
        </div>

        <p className="project-card__tagline">{project.tagline}</p>

        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="tech-chip">
              {t}
            </span>
          ))}
        </div>

        <div className="project-card__footer">
          <div className="project-card__stats">
            <span className="project-card__stat">
              <Star size={13} /> {project.stars}
            </span>
            <span className="project-card__stat">
              <GitFork size={13} /> {project.forks}
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

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`drawer-backdrop ${isOpen ? "is-open" : ""}`} onClick={onClose} />

      {/* Slide Panel */}
      <aside className={`drawer-panel ${isOpen ? "is-open" : ""}`} aria-modal="true" role="dialog">
        <div className="drawer-header">
          <div className="drawer-header__meta">
            <CategoryBadge category={project.category} />
            <span className="project-card__stat" style={{ color: "var(--fg-faint)", fontSize: "0.8rem" }}>
              · <Star size={12} style={{ marginLeft: 4, marginRight: 2 }} /> {project.stars}
              <GitFork size={12} style={{ marginLeft: 10, marginRight: 2 }} /> {project.forks}
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
          <p className="drawer-tagline">{project.tagline}</p>

          <div className="drawer-actions">
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <GitBranch size={15} /> GitHub Repository
            </a>
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

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Filter projects by category & search term
  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

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
                <a href="#browse-section" className="btn">
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
              {/* Card 1: CampusAI */}
              <div className="floating-preview floating-preview--1" onClick={() => handleOpenProject(PROJECTS[0])}>
                <div className="floating-preview__media">
                  <ChatUI />
                </div>
                <div className="floating-preview__info">
                  <div className="floating-preview__header">
                    <span className="floating-preview__title">CampusAI</span>
                    <CategoryBadge category="AI" />
                  </div>
                  <div className="floating-preview__tags">
                    <span className="floating-preview__tag">Python</span>
                    <span className="floating-preview__tag">FastAPI</span>
                    <span className="floating-preview__tag">React</span>
                  </div>
                </div>
              </div>

              {/* Card 2: OpenPlacement */}
              <div className="floating-preview floating-preview--2" onClick={() => handleOpenProject(PROJECTS[2])}>
                <div className="floating-preview__media">
                  <Analytics />
                </div>
                <div className="floating-preview__info">
                  <div className="floating-preview__header">
                    <span className="floating-preview__title">OpenPlacement</span>
                    <CategoryBadge category="Open Source" />
                  </div>
                  <div className="floating-preview__tags">
                    <span className="floating-preview__tag">Next.js</span>
                    <span className="floating-preview__tag">TypeScript</span>
                    <span className="floating-preview__tag">Prisma</span>
                  </div>
                </div>
              </div>

              {/* Card 3: CoC Portal */}
              <div className="floating-preview floating-preview--3" onClick={() => handleOpenProject(PROJECTS[1])}>
                <div className="floating-preview__media">
                  <Portal />
                </div>
                <div className="floating-preview__info">
                  <div className="floating-preview__header">
                    <span className="floating-preview__title">CoC Portal</span>
                    <CategoryBadge category="Web" />
                  </div>
                  <div className="floating-preview__tags">
                    <span className="floating-preview__tag">React</span>
                    <span className="floating-preview__tag">Node.js</span>
                    <span className="floating-preview__tag">MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="projects-scroll-hint">
            <span className="projects-scroll-hint__text">SCROLL</span>
            <div className="projects-scroll-hint__line" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED (FLAGSHIP WORK) SECTION ───────────────────────────── */}
      <section className="projects-featured">
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