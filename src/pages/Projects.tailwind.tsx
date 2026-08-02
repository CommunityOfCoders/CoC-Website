import { useState, useEffect } from "react";
import {
  Search, GitBranch, ExternalLink, X, ArrowRight,
  Zap, Shield, BarChart3, Users, Bell, Monitor,
  Terminal, Database, Lock, Globe, Code2, Cpu,
  Star, GitFork, Award, ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import MainLayout from "../layouts/MainLayout";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Feature { icon: React.ElementType; label: string; }
interface Contributor { name: string; role: string; initials: string; color: string; }
interface Project {
  id: string; name: string; tagline: string; description: string;
  category: string; tech: string[]; features: Feature[];
  contributors: Contributor[]; github: string; demo?: string;
  presentation?: string; stars: number; forks: number;
  thumbnail: "ChatUI" | "Analytics" | "CodeEditor" | "Portal" | "Mobile";
  featured?: boolean;
}

// ─── SVG THUMBNAILS ───────────────────────────────────────────────────────────

const ChatUI = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117"/>
    <rect width="110" height="220" fill="#161b22"/>
    <rect x="8" y="10" width="94" height="30" rx="6" fill="#21262d"/>
    <rect x="16" y="23" width="60" height="7" rx="2" fill="#6e7681"/>
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x="8" y={52+i*36} width="94" height="28" rx="5" fill={i===0?"#0d2010":"transparent"}/>
        <circle cx="22" cy={66+i*36} r="7" fill={i===0?"#3fb950":"#21262d"}/>
        <rect x="34" y={62+i*36} width="50" height="6" rx="2" fill={i===0?"#c9d1d9":"#6e7681"}/>
        <rect x="34" y={72+i*36} width="35" height="4" rx="2" fill="#6e7681" opacity="0.5"/>
      </g>
    ))}
    <rect x="110" y="0" width="290" height="36" fill="#161b22"/>
    <rect x="120" y="12" width="120" height="12" rx="2" fill="#21262d"/>
    <rect x="340" y="10" width="50" height="16" rx="8" fill="#3fb950" opacity="0.2"/>
    <rect x="150" y="48" width="238" height="40" rx="8" fill="#21262d"/>
    <rect x="162" y="58" width="150" height="6" rx="2" fill="#c9d1d9"/>
    <rect x="162" y="68" width="110" height="6" rx="2" fill="#6e7681"/>
    <rect x="114" y="100" width="252" height="62" rx="8" fill="#0d2010"/>
    <rect x="114" y="100" width="3" height="62" rx="1.5" fill="#3fb950"/>
    <rect x="126" y="110" width="55" height="6" rx="2" fill="#3fb950"/>
    <rect x="126" y="120" width="220" height="6" rx="2" fill="#6e7681"/>
    <rect x="126" y="130" width="180" height="6" rx="2" fill="#6e7681"/>
    <rect x="126" y="140" width="130" height="6" rx="2" fill="#6e7681"/>
    <rect x="114" y="174" width="274" height="36" rx="8" fill="#161b22" stroke="#30363d" strokeWidth="1"/>
    <rect x="126" y="190" width="180" height="5" rx="2" fill="#30363d"/>
    <rect x="366" y="180" width="16" height="22" rx="4" fill="#3fb950"/>
  </svg>
);

const Analytics = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117"/>
    <rect width="400" height="36" fill="#161b22"/>
    <rect x="12" y="10" width="100" height="14" rx="3" fill="#21262d"/>
    <rect x="290" y="10" width="60" height="14" rx="7" fill="#21262d"/>
    <rect x="358" y="10" width="30" height="14" rx="7" fill="#3fb950" opacity="0.25"/>
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={10+i*97} y="46" width="90" height="50" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
        <rect x={18+i*97} y="54" width="45" height="6" rx="2" fill="#6e7681"/>
        <rect x={18+i*97} y="65" width={[55,48,62,44][i]} height="18" rx="3" fill={["#3fb950","#58a6ff","#f0883e","#bc8cff"][i]} opacity="0.9"/>
        <rect x={18+i*97} y="88" width="30" height="4" rx="2" fill="#30363d"/>
      </g>
    ))}
    <rect x="10" y="106" width="248" height="104" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
    <rect x="18" y="114" width="80" height="7" rx="2" fill="#c9d1d9"/>
    {[22,40,28,58,36,68,50,44,56,32].map((h,i) => (
      <rect key={i} x={18+i*24} y={202-h} width="16" height={h} rx="2" fill={i===5||i===6?"#3fb950":"#21262d"}/>
    ))}
    <rect x="266" y="106" width="124" height="104" rx="6" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
    <rect x="276" y="114" width="70" height="7" rx="2" fill="#c9d1d9"/>
    {[0,1,2,3].map(i => (
      <g key={i}>
        <circle cx="280" cy={132+i*20} r="5" fill={["#3fb950","#58a6ff","#f0883e","#bc8cff"][i]}/>
        <rect x="292" y={128+i*20} width="60" height="6" rx="2" fill="#6e7681"/>
        <rect x="358" y={128+i*20} width="24" height="6" rx="2" fill="#21262d"/>
      </g>
    ))}
  </svg>
);

const CodeEditor = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117"/>
    <rect width="400" height="32" fill="#161b22"/>
    <rect width="115" height="32" fill="#0d1117"/>
    <rect x="10" y="10" width="80" height="12" rx="2" fill="#21262d"/>
    <rect x="125" y="10" width="55" height="12" rx="2" fill="#21262d" opacity="0.4"/>
    <rect x="190" y="10" width="50" height="12" rx="2" fill="#21262d" opacity="0.25"/>
    <rect width="28" height="220" y="32" fill="#161b22"/>
    {[...Array(11)].map((_,i) => (
      <text key={i} x="8" y={50+i*16} fill="#6e7681" fontSize="7" fontFamily="monospace">{i+1}</text>
    ))}
    <rect x="35" y="36" width="28" height="8" rx="1" fill="#f0883e"/>
    <rect x="68" y="36" width="52" height="8" rx="1" fill="#79c0ff"/>
    <rect x="35" y="52" width="18" height="8" rx="1" fill="#f0883e"/>
    <rect x="58" y="52" width="36" height="8" rx="1" fill="#a5f3fc" opacity="0.9"/>
    <rect x="100" y="52" width="55" height="8" rx="1" fill="#3fb950"/>
    <rect x="42" y="68" width="70" height="8" rx="1" fill="#c9d1d9"/>
    <rect x="118" y="68" width="90" height="8" rx="1" fill="#79c0ff"/>
    <rect x="42" y="84" width="45" height="8" rx="1" fill="#bc8cff"/>
    <rect x="92" y="84" width="110" height="8" rx="1" fill="#c9d1d9"/>
    <rect x="28" y="98" width="372" height="16" fill="#1a2332" opacity="0.6"/>
    <rect x="42" y="101" width="40" height="7" rx="1" fill="#f0883e"/>
    <rect x="88" y="101" width="70" height="7" rx="1" fill="#a5f3fc" opacity="0.9"/>
    <rect x="162" y="100" width="2" height="10" fill="#c9d1d9"/>
    <rect x="42" y="116" width="55" height="8" rx="1" fill="#3fb950"/>
    <rect x="103" y="116" width="130" height="8" rx="1" fill="#c9d1d9"/>
    <rect x="42" y="132" width="80" height="8" rx="1" fill="#c9d1d9"/>
    <rect x="128" y="132" width="45" height="8" rx="1" fill="#bc8cff"/>
    <rect x="35" y="148" width="30" height="8" rx="1" fill="#f0883e"/>
    <rect x="35" y="164" width="170" height="6" rx="1" fill="#6e7681" opacity="0.35"/>
    <rect x="396" y="32" width="4" height="188" fill="#161b22"/>
    <rect x="396" y="55" width="4" height="44" rx="2" fill="#21262d"/>
  </svg>
);

const Portal = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117"/>
    <rect width="56" height="220" fill="#161b22"/>
    <rect x="8" y="8" width="40" height="40" rx="8" fill="#3fb950"/>
    <rect x="14" y="26" width="28" height="8" rx="2" fill="#0d1117"/>
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <rect x="12" y={68+i*28} width="32" height="24" rx="6" fill={i===1?"#0d2010":"transparent"}/>
        <rect x="18" y={74+i*28} width="20" height="12" rx="3" fill={i===1?"#3fb950":"#30363d"}/>
      </g>
    ))}
    <rect x="56" y="0" width="344" height="40" fill="#161b22"/>
    <rect x="68" y="12" width="110" height="16" rx="3" fill="#21262d"/>
    <rect x="286" y="12" width="102" height="16" rx="8" fill="#21262d"/>
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={68+i*110} y="50" width="104" height="52" rx="7" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
        <rect x={78+i*110} y="60" width="50" height="7" rx="2" fill="#6e7681"/>
        <rect x={78+i*110} y="72" width={[48,60,42][i]} height="18" rx="3" fill={["#3fb950","#58a6ff","#f0883e"][i]}/>
        <rect x={78+i*110} y="94" width="28" height="4" rx="2" fill="#30363d"/>
      </g>
    ))}
    <rect x="68" y="112" width="218" height="98" rx="7" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
    <rect x="78" y="122" width="80" height="7" rx="2" fill="#c9d1d9"/>
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x="78" y={136+i*20} width="8" height="8" rx="2" fill={["#3fb950","#58a6ff","#f0883e","#bc8cff"][i]}/>
        <rect x="92" y={137+i*20} width="110" height="6" rx="2" fill="#6e7681"/>
        <rect x="232" y={137+i*20} width="36" height="6" rx="2" fill="#21262d"/>
      </g>
    ))}
    <rect x="294" y="112" width="118" height="98" rx="7" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
    <rect x="304" y="122" width="60" height="7" rx="2" fill="#c9d1d9"/>
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <circle cx="308" cy={140+i*14} r="4" fill={["#3fb950","#58a6ff","#bc8cff","#f0883e","#6e7681"][i]}/>
        <rect x="318" y={137+i*14} width="80" height="5" rx="2" fill="#6e7681"/>
      </g>
    ))}
  </svg>
);

const Mobile = () => (
  <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="400" height="220" fill="#0d1117"/>
    <rect x="20" y="50" width="100" height="120" rx="8" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
    <rect x="30" y="62" width="80" height="7" rx="2" fill="#c9d1d9"/>
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x="30" y={76+i*22} width="8" height="8" rx="2" fill={["#3fb950","#58a6ff","#bc8cff","#f0883e"][i]}/>
        <rect x="44" y={77+i*22} width="55" height="6" rx="2" fill="#6e7681"/>
      </g>
    ))}
    <rect x="130" y="10" width="140" height="200" rx="16" fill="#161b22" stroke="#30363d" strokeWidth="1.5"/>
    <rect x="168" y="16" width="64" height="8" rx="4" fill="#21262d"/>
    <rect x="134" y="30" width="132" height="1" fill="#21262d"/>
    <rect x="140" y="38" width="120" height="60" rx="8" fill="#0d2010"/>
    <rect x="152" y="50" width="75" height="10" rx="3" fill="#3fb950" opacity="0.9"/>
    <rect x="152" y="64" width="55" height="7" rx="2" fill="#6e7681"/>
    <rect x="152" y="75" width="80" height="7" rx="2" fill="#6e7681"/>
    <rect x="152" y="86" width="38" height="6" rx="2" fill="#3fb950"/>
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x="140" y={110+i*32} width="120" height="26" rx="7" fill="#21262d"/>
        <circle cx="153" cy={123+i*32} r="7" fill={["#3fb950","#58a6ff","#f0883e"][i]} opacity="0.85"/>
        <rect x="166" y={119+i*32} width="60" height="6" rx="2" fill="#c9d1d9"/>
        <rect x="166" y={129+i*32} width="44" height="5" rx="2" fill="#6e7681"/>
        <rect x="236" y={119+i*32} width="14" height="8" rx="2" fill="#30363d"/>
      </g>
    ))}
    <rect x="140" y="208" width="120" height="6" rx="3" fill="#21262d"/>
    <rect x="282" y="50" width="98" height="120" rx="8" fill="#161b22" stroke="#21262d" strokeWidth="1"/>
    <rect x="292" y="62" width="65" height="7" rx="2" fill="#c9d1d9"/>
    {[22,38,18,30,42,14,26].map((h,i) => (
      <rect key={i} x={292+i*11} y={162-h} width="8" height={h} rx="2" fill={i===4?"#3fb950":"#21262d"}/>
    ))}
    <rect x="292" y="164" width="78" height="1" fill="#30363d"/>
  </svg>
);

const THUMBNAILS = { ChatUI, Analytics, CodeEditor, Portal, Mobile };

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "campus-ai",
    name: "CampusAI",
    tagline: "AI-powered campus assistant with RAG architecture",
    description: "Built to help VJTI students navigate academic resources more efficiently, CampusAI uses retrieval-augmented generation to answer questions about campus facilities, course materials, and exam procedures in real-time. Deployed on the VJTI intranet and actively used during exam season by over 300 students.",
    category: "AI",
    tech: ["Python", "FastAPI", "React", "LangChain", "PostgreSQL", "Docker"],
    features: [
      { icon: Search, label: "Semantic Search" },
      { icon: Database, label: "RAG Pipeline" },
      { icon: Shield, label: "Auth & Roles" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Bell, label: "Notifications" },
      { icon: Monitor, label: "Admin Panel" },
    ],
    contributors: [
      { name: "Aryan Shah", role: "AI Engineer", initials: "AS", color: "#3fb950" },
      { name: "Priya Mehta", role: "Backend", initials: "PM", color: "#58a6ff" },
      { name: "Rohan Kulkarni", role: "Frontend", initials: "RK", color: "#bc8cff" },
    ],
    github: "https://github.com/coc-vjti/campus-ai",
    demo: "https://campusai.vjti.ac.in",
    stars: 127, forks: 34,
    thumbnail: "ChatUI",
    featured: true,
  },
  {
    id: "coc-portal",
    name: "CoC Portal",
    tagline: "Central platform for community management and coordination",
    description: "The operational backbone of CoC, handling member onboarding, event registration, project showcasing, and newsletter distribution. Serves 500+ active members each semester with role-based access control and real-time analytics built in.",
    category: "Web",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Redis"],
    features: [
      { icon: Users, label: "Member Mgmt" },
      { icon: Globe, label: "Event Booking" },
      { icon: Bell, label: "Email Alerts" },
      { icon: Lock, label: "RBAC" },
      { icon: BarChart3, label: "Analytics" },
      { icon: Zap, label: "Mobile-first" },
    ],
    contributors: [
      { name: "Siddharth Rao", role: "Fullstack", initials: "SR", color: "#f0883e" },
      { name: "Anika Joshi", role: "Frontend", initials: "AJ", color: "#3fb950" },
      { name: "Karan Patel", role: "Backend", initials: "KP", color: "#58a6ff" },
      { name: "Neha Sharma", role: "Design", initials: "NS", color: "#bc8cff" },
    ],
    github: "https://github.com/coc-vjti/coc-portal",
    stars: 89, forks: 21,
    thumbnail: "Portal",
    featured: true,
  },
  {
    id: "open-placement",
    name: "OpenPlacement",
    tagline: "Open-source placement tracker and analytics for engineering colleges",
    description: "A community-driven initiative to democratize placement data across engineering colleges. Students log interview experiences, track company trends, and visualize multi-year placement statistics. Adopted by 3 consecutive VJTI batches and forked by 12 other colleges.",
    category: "Open Source",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Chart.js"],
    features: [
      { icon: BarChart3, label: "Trend Analysis" },
      { icon: Database, label: "Data Export" },
      { icon: Users, label: "Community" },
      { icon: Shield, label: "Verified Data" },
      { icon: Globe, label: "Public API" },
      { icon: Monitor, label: "Dashboard" },
    ],
    contributors: [
      { name: "Mihir Desai", role: "Fullstack", initials: "MD", color: "#3fb950" },
      { name: "Tanvi Nair", role: "Data", initials: "TN", color: "#f0883e" },
    ],
    github: "https://github.com/coc-vjti/open-placement",
    stars: 203, forks: 67,
    thumbnail: "Analytics",
    featured: true,
  },
  {
    id: "algo-viz",
    name: "AlgoViz",
    tagline: "Interactive algorithm and data structure visualizer for learning",
    description: "An educational tool for visualizing sorting algorithms, graph traversal, and data structures with step-by-step animation and complexity analysis. Built for students preparing for technical interviews.",
    category: "Education",
    tech: ["React", "D3.js", "TypeScript", "Vite"],
    features: [
      { icon: Zap, label: "Step Animations" },
      { icon: Code2, label: "Code View" },
      { icon: BarChart3, label: "Complexity" },
    ],
    contributors: [
      { name: "Varun Gupta", role: "Frontend", initials: "VG", color: "#58a6ff" },
      { name: "Ishaan Modi", role: "Algorithm", initials: "IM", color: "#bc8cff" },
    ],
    github: "https://github.com/coc-vjti/algo-viz",
    demo: "https://algoviz.coc-vjti.in",
    stars: 156, forks: 43,
    thumbnail: "CodeEditor",
  },
  {
    id: "smart-attend",
    name: "SmartAttend",
    tagline: "IoT-based smart attendance with RFID and facial recognition",
    description: "A hardware-software system that automates classroom attendance using RFID tags and OpenCV-based facial recognition. Deployed in 3 VJTI labs, eliminating manual proxy and reducing overhead for faculty.",
    category: "IoT",
    tech: ["Python", "OpenCV", "Arduino", "Firebase", "React", "Flask"],
    features: [
      { icon: Cpu, label: "RFID Scan" },
      { icon: Monitor, label: "Face Recog" },
      { icon: Database, label: "Firebase Sync" },
      { icon: BarChart3, label: "Reports" },
    ],
    contributors: [
      { name: "Yash Patil", role: "Hardware", initials: "YP", color: "#f0883e" },
      { name: "Shruti More", role: "ML", initials: "SM", color: "#3fb950" },
      { name: "Dev Bhatt", role: "Backend", initials: "DB", color: "#58a6ff" },
    ],
    github: "https://github.com/coc-vjti/smart-attend",
    stars: 72, forks: 18,
    thumbnail: "Mobile",
  },
  {
    id: "code-collab",
    name: "CodeCollab",
    tagline: "Real-time collaborative code editor with live execution",
    description: "A browser-based pair programming environment with real-time sync, multi-language support, and sandboxed code execution. Actively used in CoC workshops and interview prep sessions across batches.",
    category: "Web",
    tech: ["Node.js", "WebSocket", "Monaco Editor", "Redis", "Docker"],
    features: [
      { icon: Code2, label: "Live Sync" },
      { icon: Terminal, label: "Run Code" },
      { icon: Users, label: "Multi-cursor" },
      { icon: Zap, label: "Low Latency" },
    ],
    contributors: [
      { name: "Aditi Sane", role: "Fullstack", initials: "AS", color: "#bc8cff" },
      { name: "Rahul Bind", role: "Backend", initials: "RB", color: "#58a6ff" },
    ],
    github: "https://github.com/coc-vjti/code-collab",
    demo: "https://codelab.coc-vjti.in",
    stars: 94, forks: 28,
    thumbnail: "CodeEditor",
  },
  {
    id: "vjti-map",
    name: "VJTIMap",
    tagline: "Interactive campus map and indoor navigation for VJTI",
    description: "A mobile app for navigating the VJTI campus with indoor positioning, department directories, and real-time event overlays. Originally built during a 36-hour hackathon, then polished and published on the App Store.",
    category: "Mobile",
    tech: ["React Native", "Expo", "Mapbox", "Node.js", "Firebase"],
    features: [
      { icon: Globe, label: "Indoor Nav" },
      { icon: Bell, label: "Event Overlay" },
      { icon: Database, label: "Offline Maps" },
    ],
    contributors: [
      { name: "Pranav Jain", role: "Mobile Dev", initials: "PJ", color: "#3fb950" },
      { name: "Ayesha Khan", role: "Design", initials: "AK", color: "#f0883e" },
    ],
    github: "https://github.com/coc-vjti/vjti-map",
    stars: 61, forks: 15,
    thumbnail: "Mobile",
  },
  {
    id: "hack-track",
    name: "HackTrack",
    tagline: "End-to-end hackathon management and live judging platform",
    description: "The platform behind CoC's own hackathons. HackTrack handles team formation, project submissions, mentor scheduling, and live judging scoreboards. Supports 200+ participants per event with Celery-powered async jobs.",
    category: "Hackathon",
    tech: ["React", "Django", "PostgreSQL", "Celery", "AWS S3"],
    features: [
      { icon: Users, label: "Team Mgmt" },
      { icon: Award, label: "Judging" },
      { icon: Bell, label: "Alerts" },
      { icon: BarChart3, label: "Scoreboard" },
    ],
    contributors: [
      { name: "Akash Tiwari", role: "Fullstack", initials: "AT", color: "#f0883e" },
      { name: "Pooja Reddy", role: "Backend", initials: "PR", color: "#3fb950" },
      { name: "Neel Shah", role: "Frontend", initials: "NS", color: "#bc8cff" },
    ],
    github: "https://github.com/coc-vjti/hack-track",
    stars: 45, forks: 12,
    thumbnail: "Portal",
  },
];

const CATEGORY_STYLE: Record<string, { bg: string; text: string }> = {
  AI:            { bg: "rgba(168,85,247,0.15)",  text: "#c084fc" },
  Web:           { bg: "rgba(59,130,246,0.15)",   text: "#60a5fa" },
  "Open Source": { bg: "rgba(74,222,128,0.15)",   text: "#4ade80" },
  Mobile:        { bg: "rgba(249,115,22,0.15)",   text: "#fb923c" },
  IoT:           { bg: "rgba(6,182,212,0.15)",    text: "#22d3ee" },
  Education:     { bg: "rgba(234,179,8,0.15)",    text: "#facc15" },
  Hackathon:     { bg: "rgba(239,68,68,0.15)",    text: "#f87171" },
  Research:      { bg: "rgba(236,72,153,0.15)",   text: "#f472b6" },
};

const FILTERS = ["All","AI","Web","Open Source","Mobile","IoT","Education","Hackathon"];

const FEATURED = PROJECTS.filter(p => p.featured);

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-white/60">
      {label}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const s = CATEGORY_STYLE[category] ?? { bg: "rgba(255,255,255,0.1)", text: "#fff" };
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide"
      style={{ background: s.bg, color: s.text }}
    >
      {category}
    </span>
  );
}

function Thumbnail({ type }: { type: Project["thumbnail"] }) {
  const Comp = THUMBNAILS[type];
  return <Comp />;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

// ─── FLOATING HERO PREVIEW CARDS ─────────────────────────────────────────────

function FloatingPreviewCard({
  project, posStyle, rotation, delay
}: {
  project: Project;
  posStyle: React.CSSProperties;
  rotation: string;
  delay: number;
}) {
  return (
    <div className="absolute" style={{ ...posStyle, transform: rotation }}>
      <div
        className="w-[230px] rounded-2xl border border-white/10 bg-[#111] overflow-hidden shadow-2xl"
        style={{ animation: `floatY 4s ease-in-out ${delay}s infinite` }}
      >
        <div className="h-[120px] overflow-hidden">
          <Thumbnail type={project.thumbnail} />
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-[12px] font-semibold">{project.name}</span>
            <GitBranch size={12} className="text-white/30"/>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0,3).map(t => (
              <span key={t} className="px-1.5 py-0.5 rounded text-[9px] bg-white/5 border border-white/8 text-white/50">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 pt-14 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#4ade80]/5 blur-[120px] pointer-events-none"/>
      <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-[#60a5fa]/4 blur-[100px] pointer-events-none"/>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-[#4ade80]"/>
            <span className="text-[#4ade80] text-[11px] font-semibold tracking-widest uppercase">Student-run · VJTI Matunga</span>
          </div>

          <h1 className="text-[clamp(4rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
            PROJECTS<span className="text-[#4ade80]">.</span>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed max-w-md font-light">
            From hackathon winners to open-source tools, discover what Community of Coders has built through innovation, collaboration and real-world problem solving.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4ade80] text-[#0a0a0a] text-sm font-semibold hover:bg-[#86efac] transition-all duration-200 hover:gap-3">
              Browse Projects <ArrowRight size={14} strokeWidth={2.5}/>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all duration-200">
              <GitBranch size={14}/> Contribute
            </button>
          </div>

          {/* stats row */}
          <div className="flex items-center gap-8 pt-2">
            {[["120+","Projects built"],["50+","Contributors"],["2k+","GitHub stars"]].map(([n,l]) => (
              <div key={l}>
                <div className="text-white text-xl font-bold">{n}</div>
                <div className="text-white/35 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards */}
        <div className="hidden lg:block relative h-[480px]">
          <FloatingPreviewCard project={PROJECTS[0]} delay={0}
            posStyle={{ top: "10%", left: "20%", zIndex: 1 }} rotation="rotate(-4deg)"/>
          <FloatingPreviewCard project={PROJECTS[2]} delay={0.8}
            posStyle={{ top: "28%", left: "46%", zIndex: 2 }} rotation="rotate(3deg)"/>
          <FloatingPreviewCard project={PROJECTS[1]} delay={1.6}
            posStyle={{ top: "50%", left: "5%", zIndex: 3 }} rotation="rotate(-2deg)"/>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
        <div className="text-[10px] text-white tracking-widest uppercase">Scroll</div>
        <div className="w-px h-8 bg-white/40"/>
      </div>
    </section>
  );
}

// ─── FEATURED ────────────────────────────────────────────────────────────────

function FeaturedCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl border border-white/8 bg-[#111] overflow-hidden cursor-pointer hover:border-[#4ade80]/30 transition-colors duration-300"
    >
      <div className="h-52 overflow-hidden">
        <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500">
          <Thumbnail type={project.thumbnail}/>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-lg leading-tight">{project.name}</h3>
          <CategoryBadge category={project.category}/>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0,4).map(t => <TechChip key={t} label={t}/>)}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-white/30 text-xs">
            <span className="flex items-center gap-1"><Star size={10}/>{project.stars}</span>
            <span className="flex items-center gap-1"><GitFork size={10}/>{project.forks}</span>
          </div>
          <span className="text-[#4ade80] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
            View Details <ChevronRight size={12}/>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedSection({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <section className="px-6 md:px-16 py-20 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-5 h-px bg-[#4ade80]"/>
        <span className="text-[#4ade80] text-[11px] font-semibold tracking-widest uppercase">Featured</span>
      </div>
      <h2 className="text-4xl font-black text-white mb-10 tracking-tight">Flagship work.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURED.map(p => <FeaturedCard key={p.id} project={p} onSelect={onSelect}/>)}
      </div>
    </section>
  );
}

// ─── SEARCH + FILTERS ─────────────────────────────────────────────────────────

function SearchFilters({
  search, setSearch, active, setActive
}: {
  search: string; setSearch: (v: string) => void;
  active: string; setActive: (v: string) => void;
}) {
  return (
    <div className="px-6 md:px-16 pb-8 max-w-7xl mx-auto space-y-4">
      {/* Search bar */}
      <div className="relative max-w-lg">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"/>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#111] border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#4ade80]/40 focus:bg-[#111] transition-colors"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
            <X size={14}/>
          </button>
        )}
      </div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
              active === f
                ? "bg-[#4ade80] text-[#0a0a0a]"
                : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl border border-white/8 bg-[#111] overflow-hidden cursor-pointer hover:border-[#4ade80]/30 transition-colors duration-300 break-inside-avoid mb-5"
    >
      <div className="h-44 overflow-hidden">
        <div className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-500">
          <Thumbnail type={project.thumbnail}/>
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-bold text-sm leading-snug">{project.name}</h3>
          <CategoryBadge category={project.category}/>
        </div>
        <p className="text-white/45 text-xs leading-relaxed line-clamp-2">{project.tagline}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0,4).map(t => <TechChip key={t} label={t}/>)}
        </div>
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-3 text-white/25 text-[11px]">
            <span className="flex items-center gap-1"><Star size={9}/>{project.stars}</span>
            <span className="flex items-center gap-1"><GitFork size={9}/>{project.forks}</span>
          </div>
          <span className="text-[#4ade80] text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
            View Details <ChevronRight size={11}/>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery({ projects, onSelect }: { projects: Project[]; onSelect: (p: Project) => void }) {
  // split into two columns for masonry
  const col1 = projects.filter((_,i) => i % 2 === 0);
  const col2 = projects.filter((_,i) => i % 2 === 1);

  return (
    <section className="px-6 md:px-16 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-5 h-px bg-[#4ade80]"/>
        <span className="text-[#4ade80] text-[11px] font-semibold tracking-widest uppercase">All Projects</span>
        <span className="text-white/25 text-xs">— {projects.length} projects</span>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-white/25">
          <Code2 size={40} className="mb-4 opacity-40"/>
          <p className="text-sm">No projects match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
          <div>{col1.map(p => <ProjectCard key={p.id} project={p} onSelect={onSelect}/>)}</div>
          <div className="md:mt-10">{col2.map(p => <ProjectCard key={p.id} project={p} onSelect={onSelect}/>)}</div>
        </div>
      )}
    </section>
  );
}

// ─── DRAWER ──────────────────────────────────────────────────────────────────

function Drawer({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  // close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[600px] bg-[#0e0e0e] border-l border-white/8 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {project && (
          <div className="flex flex-col">
            {/* Close button */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 sticky top-0 bg-[#0e0e0e]/95 backdrop-blur border-b border-white/6 z-10">
              <div className="flex items-center gap-2">
                <CategoryBadge category={project.category}/>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/40 text-xs flex items-center gap-1"><Star size={10}/>{project.stars}</span>
                <span className="text-white/40 text-xs flex items-center gap-1"><GitFork size={10}/>{project.forks}</span>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
              >
                <X size={14}/>
              </button>
            </div>

            {/* Thumbnail */}
            <div className="mx-6 mt-5 rounded-xl overflow-hidden border border-white/8 h-52">
              <Thumbnail type={project.thumbnail}/>
            </div>

            {/* Header */}
            <div className="px-6 pt-5 pb-2 space-y-1.5">
              <h2 className="text-white text-2xl font-black tracking-tight">{project.name}</h2>
              <p className="text-white/50 text-sm leading-relaxed">{project.tagline}</p>
            </div>

            {/* CTA buttons */}
            <div className="px-6 pb-6 flex gap-2.5 flex-wrap mt-2">
              <a
                href={project.github}
                target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white text-xs font-semibold hover:bg-white/12 hover:border-white/20 transition-all"
              >
                <GitBranch size={13}/> GitHub Repository
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/25 text-[#4ade80] text-xs font-semibold hover:bg-[#4ade80]/15 transition-all"
                >
                  <ExternalLink size={13}/> Live Demo
                </a>
              )}
              {project.presentation && (
                <a
                  href={project.presentation}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-semibold hover:bg-white/8 transition-all"
                >
                  <Monitor size={13}/> Presentation
                </a>
              )}
            </div>

            <div className="border-t border-white/6 mx-6"/>

            {/* About */}
            <DrawerSection label="About">
              <p className="text-white/55 text-sm leading-7">{project.description}</p>
            </DrawerSection>

            {/* Tech Stack */}
            <DrawerSection label="Tech Stack">
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 border border-white/10 text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </DrawerSection>

            {/* Features */}
            <DrawerSection label="Features">
              <div className="grid grid-cols-2 gap-2.5">
                {project.features.map(f => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/4 border border-white/7">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#4ade80]/10 flex-shrink-0">
                        <Icon size={13} className="text-[#4ade80]"/>
                      </div>
                      <span className="text-white/70 text-xs font-medium">{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </DrawerSection>

            {/* Contributors */}
            <DrawerSection label="Contributors">
              <div className="space-y-2.5">
                {project.contributors.map(c => (
                  <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/7 group hover:border-white/12 transition-colors">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#0a0a0a] flex-shrink-0"
                      style={{ background: c.color }}
                    >
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold">{c.name}</div>
                      <div className="text-white/35 text-xs">{c.role}</div>
                    </div>
                    <a
                      href={`https://github.com/${c.name.toLowerCase().replace(" ","-")}`}
                      target="_blank" rel="noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={e => e.stopPropagation()}
                    >
                      <GitBranch size={14} className="text-white/40 hover:text-white/70"/>
                    </a>
                  </div>
                ))}
              </div>
            </DrawerSection>

            <div className="h-10"/>
          </div>
        )}
      </div>
    </>
  );
}

function DrawerSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-5 space-y-3">
      <h4 className="text-white/30 text-[11px] font-semibold tracking-widest uppercase">{label}</h4>
      {children}
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProjects = PROJECTS.filter(p => {
    const matchFilter = activeFilter === "All" || p.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });

  const openDrawer = (project: Project) => {
    setSelectedProject(project);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <MainLayout route="#projects">
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        * { font-family: 'Inter', system-ui, sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        input::placeholder { color: rgba(255,255,255,0.25) !important; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        <Hero/>
        <FeaturedSection onSelect={openDrawer}/>

        <div className="border-t border-white/6">
          <div className="max-w-7xl mx-auto pt-16">
            <div className="px-6 md:px-16 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-5 h-px bg-[#4ade80]"/>
                <span className="text-[#4ade80] text-[11px] font-semibold tracking-widest uppercase">Browse</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">Explore everything.</h2>
            </div>
            <SearchFilters search={search} setSearch={setSearch} active={activeFilter} setActive={setActiveFilter}/>
            <Gallery projects={filteredProjects} onSelect={openDrawer}/>
          </div>
        </div>
      </div>

      <Drawer project={selectedProject} isOpen={drawerOpen} onClose={closeDrawer}/>
    </MainLayout>
  );
}
