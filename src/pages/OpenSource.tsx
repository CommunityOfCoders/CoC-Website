import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  ArrowRight,
  ChevronRight,
  Globe,
  BookOpen,
  CheckCircle2,
  Users,
  Code2,
  Trophy,
  ExternalLink,
} from "lucide-react";
import { Github, Linkedin } from "../components/ui/BrandIcons";
import "./OpenSource.css";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  description: string;
  logo: "Google" | "LFX" | "CNCF" | "Kubeflow" | "Kubernetes" | "Apache" | "Outreachy";
  color: string;
}

export interface JourneyStep {
  title: string;
  description: string;
  icon: "book" | "check" | "users" | "code" | "trophy";
}

export interface Contributor {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  program: "GSoC" | "LFX" | "Outreachy" | "Hacktoberfest";
  programColor: string;
  org: string;
  project: string;
  year: string;
  tech: string[];
  categories: string[];
  github?: string;
  linkedin?: string;
  repo?: string;
  about?: string;
  quote?: string;
  journey?: JourneyStep[];
  latest?: boolean;
  /**
   * NOTE FOR ADDING REAL IMAGES:
   * Drop actual contributor photo/avatar images into `/public/images/contributors/<id>.png`
   * (or `/src/assets/contributors/`) and reference the image URL here:
   * e.g., image: "/images/contributors/meera-desai.png"
   */
  image?: string;
}

// ─── SVG LOGO ICONS FOR ORGANIZATIONS ───────────────────────────────────────

const GoogleLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="3" fill="#EA4335" />
    <circle cx="17" cy="7" r="3" fill="#4285F4" />
    <circle cx="7" cy="17" r="3" fill="#FBBC05" />
    <circle cx="17" cy="17" r="3" fill="#34A853" />
  </svg>
);

const LFXLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#002B49" />
    <path d="M4 18V6H8V14H16V18H4Z" fill="#0097A7" />
    <path d="M11 6H20V10H11V6Z" fill="#00C4B4" />
  </svg>
);

const CNCFLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" fill="none" stroke="#0086FF" strokeWidth="2" />
    <polygon points="12,7 17,10 17,14 12,17 7,14 7,10" fill="#0086FF" opacity="0.3" />
  </svg>
);

const KubeflowLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#002B49" />
    <path d="M6 5V19M6 12H18M18 5L11 12L18 19" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const KubernetesLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,2 20,6 20,16 12,22 4,16 4,6" fill="none" stroke="#326CE5" strokeWidth="2" />
    <circle cx="12" cy="12" r="3" fill="#326CE5" />
    <line x1="12" y1="2" x2="12" y2="9" stroke="#326CE5" strokeWidth="1.5" />
    <line x1="20" y1="6" x2="14" y2="10.5" stroke="#326CE5" strokeWidth="1.5" />
    <line x1="20" y1="16" x2="14" y2="13.5" stroke="#326CE5" strokeWidth="1.5" />
  </svg>
);

const ApacheLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C10 5 8 9 7 13C6 17 6.5 20 8 22C9.5 20 11 16 12 12C13 16 14.5 20 16 22C17.5 20 18 17 17 13C16 9 14 5 12 2Z"
      fill="#D22128"
    />
  </svg>
);

const OutreachyLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="6" r="3" fill="#A855F7" />
    <circle cx="6" cy="17" r="3" fill="#A855F7" />
    <circle cx="18" cy="17" r="3" fill="#A855F7" />
    <path d="M12 9V13M12 13L8 15M12 13L16 15" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LOGO_COMPONENTS: Record<string, React.FC> = {
  Google: GoogleLogo,
  LFX: LFXLogo,
  CNCF: CNCFLogo,
  Kubeflow: KubeflowLogo,
  Kubernetes: KubernetesLogo,
  Apache: ApacheLogo,
  Outreachy: OutreachyLogo,
};

// ─── ORGANIZATIONS DATA ───────────────────────────────────────────────────────

export const ORGANIZATIONS: Organization[] = [
  {
    id: "gsoc",
    name: "Google Summer of Code",
    shortName: "GSoC",
    description: "Annual global program where contributors work on open source projects under org mentorship.",
    logo: "Google",
    color: "#4285F4",
  },
  {
    id: "lfx",
    name: "LFX Mentorship",
    shortName: "LFX",
    description: "Linux Foundation's mentorship platform connecting contributors with enterprise open source projects.",
    logo: "LFX",
    color: "#0097A7",
  },
  {
    id: "cncf",
    name: "CNCF",
    shortName: "CNCF",
    description: "Cloud Native Computing Foundation — stewarding Kubernetes, Prometheus, Envoy and more.",
    logo: "CNCF",
    color: "#0086FF",
  },
  {
    id: "kubeflow",
    name: "Kubeflow",
    shortName: "Kubeflow",
    description: "The machine learning toolkit for Kubernetes, making ML workflows scalable and portable.",
    logo: "Kubeflow",
    color: "#326CE5",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    shortName: "Kubernetes",
    description: "Production-grade container orchestration. The most contributed-to CNCF project.",
    logo: "Kubernetes",
    color: "#326CE5",
  },
  {
    id: "apache",
    name: "Apache Software Foundation",
    shortName: "Apache",
    description: "Home of Kafka, Flink, Spark, and hundreds of mission-critical open source projects.",
    logo: "Apache",
    color: "#D22128",
  },
  {
    id: "outreachy",
    name: "Outreachy",
    shortName: "Outreachy",
    description: "Paid internships in open source for people subject to systemic bias in the tech industry.",
    logo: "Outreachy",
    color: "#A855F7",
  },
];

// ─── CONTRIBUTORS DATA ────────────────────────────────────────────────────────

const DEFAULT_JOURNEY: JourneyStep[] = [
  {
    title: "Application",
    description: "Submitted a detailed proposal outlining goals and timeline.",
    icon: "book",
  },
  {
    title: "Selection",
    description: "Selected from thousands of applicants globally.",
    icon: "check",
  },
  {
    title: "Community Bonding",
    description: "Met mentors, explored the codebase and set up the environment.",
    icon: "users",
  },
  {
    title: "Development",
    description: "Implemented features, shipped PRs and participated in reviews.",
    icon: "code",
  },
  {
    title: "Successful Completion",
    description: "Passed final evaluation and merged contributions upstream.",
    icon: "trophy",
  },
];

export const CONTRIBUTORS: Contributor[] = [
  {
    id: "ankita-sagar",
    name: "Ankita Sagar",
    initials: "AS",
    avatarColor: "#7ED957",
    program: "LFX",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "Kubeflow",
    project: "Kubeflow Pipelines SDK",
    year: "2026",
    tech: ["Python", "Kubernetes", "gRPC"],
    categories: ["LFX", "Kubeflow", "AI/ML", "Backend", "Cloud"],
    github: "https://github.com/ankitasagar",
    linkedin: "https://linkedin.com/in/ankitasagar",
    repo: "https://github.com/kubeflow/pipelines",
    about:
      "Worked on extending the Kubeflow Pipelines SDK with advanced DAG execution features, artifact lineage tracking, and custom Python component decorators.",
    quote: "“Open source gave me the platform to collaborate with engineers worldwide while still in college.”",
    journey: DEFAULT_JOURNEY,
    latest: true,
  },
  {
    id: "rahul-sharma",
    name: "Rahul Sharma",
    initials: "RS",
    avatarColor: "#58a6ff",
    program: "GSoC",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "Apache",
    project: "Apache Kafka Streams",
    year: "2025",
    tech: ["Java", "Kafka", "Distributed Systems"],
    categories: ["GSoC", "Backend", "Cloud"],
    github: "https://github.com/rahulsharma",
    linkedin: "https://linkedin.com/in/rahulsharma",
    repo: "https://github.com/apache/kafka",
    about: "Enhanced state store recovery mechanisms and optimized memory serialization in Kafka Streams.",
    quote: "“Mentorship during GSoC helped me understand production distributed systems at scale.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    initials: "PP",
    avatarColor: "#f0883e",
    program: "GSoC",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "CNCF",
    project: "Prometheus Remote Write",
    year: "2024",
    tech: ["Go", "Prometheus", "Observability"],
    categories: ["GSoC", "Backend", "Cloud"],
    github: "https://github.com/priyapatel",
    linkedin: "https://linkedin.com/in/priyapatel",
    repo: "https://github.com/prometheus/prometheus",
    about: "Built high-throughput WAL streaming for Prometheus Remote Write 2.0 protocol implementation.",
    quote: "“Shipping core features to Prometheus was an incredible learning experience.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    initials: "AM",
    avatarColor: "#bc8cff",
    program: "Outreachy",
    programColor: "rgba(168, 85, 247, 0.2)",
    org: "Apache",
    project: "Apache Flink Table API",
    year: "2024",
    tech: ["Java", "Flink", "SQL"],
    categories: ["Outreachy", "Backend"],
    github: "https://github.com/arjunmehta",
    linkedin: "https://linkedin.com/in/arjunmehta",
    repo: "https://github.com/apache/flink",
    about: "Added support for windowed aggregation functions in the Flink Streaming SQL planner.",
    quote: "“Outreachy provided a warm and encouraging environment to grow as an open source developer.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "sneha-iyer",
    name: "Sneha Iyer",
    initials: "SI",
    avatarColor: "#7ED957",
    program: "LFX",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "Kubernetes",
    project: "Kubernetes Dashboard",
    year: "2025",
    tech: ["TypeScript", "Angular", "Go"],
    categories: ["LFX", "Kubernetes", "Frontend", "Cloud"],
    github: "https://github.com/snehaiyer",
    linkedin: "https://linkedin.com/in/snehaiyer",
    repo: "https://github.com/kubernetes/dashboard",
    about: "Modernized the Kubernetes Dashboard UI with real-time pod log streaming and metric graphs.",
    quote: "“Contributing to Kubernetes directly impacted thousands of cluster administrators.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "karan-joshi",
    name: "Karan Joshi",
    initials: "KJ",
    avatarColor: "#f0883e",
    program: "GSoC",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "Kubeflow",
    project: "Kubeflow Training Operator",
    year: "2023",
    tech: ["Python", "Go", "Kubernetes"],
    categories: ["GSoC", "Kubeflow", "Kubernetes", "AI/ML", "Backend"],
    github: "https://github.com/karanjoshi",
    linkedin: "https://linkedin.com/in/karanjoshi",
    repo: "https://github.com/kubeflow/training-operator",
    about: "Implemented auto-scaling and distributed PyTorch job orchestration inside the Kubeflow Training Operator.",
    quote: "“GSoC with Kubeflow was a game changer for my deep learning and systems engineering career.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "meera-desai",
    name: "Meera Desai",
    initials: "MD",
    avatarColor: "#22d3ee",
    program: "LFX",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "CNCF",
    project: "OpenTelemetry Collector",
    year: "2025",
    tech: ["Go", "OpenTelemetry", "Observability", "gRPC", "Docker"],
    categories: ["LFX", "Backend", "Cloud"],
    github: "https://github.com/meeradesai",
    linkedin: "https://linkedin.com/in/meeradesai",
    repo: "https://github.com/open-telemetry/opentelemetry-collector",
    about:
      "Built new processors and exporters for the OpenTelemetry Collector, improving support for multi-cloud environments and reducing trace data loss under high cardinality loads.",
    quote: "“The CNCF community is incredibly welcoming. I shipped production code in my first week.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "vikram-shetty",
    name: "Vikram Shetty",
    initials: "VS",
    avatarColor: "#e879f9",
    program: "Outreachy",
    programColor: "rgba(168, 85, 247, 0.2)",
    org: "Apache",
    project: "Apache Airflow",
    year: "2023",
    tech: ["Python", "Airflow", "DAGs"],
    categories: ["Outreachy", "Backend"],
    github: "https://github.com/vikramshetty",
    linkedin: "https://linkedin.com/in/vikramshetty",
    repo: "https://github.com/apache/airflow",
    about: "Created new provider packages for AWS EKS triggers and improved DAG execution scheduling latency.",
    quote: "“Airflow mentorship gave me confidence in writing clean, well-tested Python packages.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "rohan-gupta",
    name: "Rohan Gupta",
    initials: "RG",
    avatarColor: "#58a6ff",
    program: "GSoC",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "CNCF",
    project: "Envoy Proxy Extensions",
    year: "2024",
    tech: ["C++", "Rust", "Envoy"],
    categories: ["GSoC", "Backend", "Cloud"],
    github: "https://github.com/rohangupta",
    linkedin: "https://linkedin.com/in/rohangupta",
    repo: "https://github.com/envoyproxy/envoy",
    about: "Developed WebAssembly (Wasm) filter extensions for HTTP header mutation inside Envoy proxy.",
    quote: "“Working with low-level C++ network filters prepared me for core infrastructure roles.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "aisha-khan",
    name: "Aisha Khan",
    initials: "AK",
    avatarColor: "#f0883e",
    program: "Hacktoberfest",
    programColor: "rgba(239, 68, 68, 0.2)",
    org: "Kubernetes",
    project: "kubectl Plugins",
    year: "2024",
    tech: ["Go", "kubectl", "Bash"],
    categories: ["Hacktoberfest", "Kubernetes", "Cloud"],
    github: "https://github.com/aishakhan",
    linkedin: "https://linkedin.com/in/aishakhan",
    repo: "https://github.com/kubernetes/kubectl",
    about: "Created a suite of kubectl helper plugins for automated resource cleanup and cluster diagnostics.",
    quote: "“Hacktoberfest was my gateway into contributing regularly to Kubernetes SIG-CLI.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "siddharth-rao",
    name: "Siddharth Rao",
    initials: "SR",
    avatarColor: "#f87171",
    program: "GSoC",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "Apache",
    project: "Apache Beam Python SDK",
    year: "2023",
    tech: ["Python", "Beam", "GCP"],
    categories: ["GSoC", "AI/ML", "Backend"],
    github: "https://github.com/siddharthrao",
    linkedin: "https://linkedin.com/in/siddharthrao",
    repo: "https://github.com/apache/beam",
    about: "Implemented interactive Dataframe transforms inside Apache Beam Python SDK for real-time analytics.",
    quote: "“Building data pipelines with Beam mentors laid the foundation for my ML research.”",
    journey: DEFAULT_JOURNEY,
  },
  {
    id: "nikhil-patil",
    name: "Nikhil Patil",
    initials: "NP",
    avatarColor: "#22d3ee",
    program: "LFX",
    programColor: "rgba(59, 130, 246, 0.2)",
    org: "LFX",
    project: "Linux Kernel eBPF",
    year: "2025",
    tech: ["C", "eBPF", "Linux"],
    categories: ["LFX", "Backend", "Cloud"],
    github: "https://github.com/nikhilpatil",
    linkedin: "https://linkedin.com/in/nikhilpatil",
    repo: "https://github.com/torvalds/linux",
    about: "Added eBPF tracing probes for kernel network socket events and packet latency metrics.",
    quote: "“Diving into Linux Kernel eBPF under LFX mentorship was an unforgettable experience.”",
    journey: DEFAULT_JOURNEY,
  },
];

const FILTERS = ["All", "GSoC", "LFX", "Outreachy", "Hacktoberfest", "Kubeflow", "Kubernetes", "AI/ML", "Backend", "Frontend", "Cloud"];

// ─── REUSABLE SUB-COMPONENTS ─────────────────────────────────────────────────

function ProgramBadge({ program }: { program: Contributor["program"] }) {
  let bg = "rgba(59, 130, 246, 0.18)";
  let text = "#60a5fa";

  if (program === "Outreachy") {
    bg = "rgba(168, 85, 247, 0.18)";
    text = "#c084fc";
  } else if (program === "Hacktoberfest") {
    bg = "rgba(239, 68, 68, 0.18)";
    text = "#f87171";
  } else if (program === "LFX") {
    bg = "rgba(0, 151, 167, 0.2)";
    text = "#22d3ee";
  }

  return (
    <span className="program-badge" style={{ background: bg, color: text }}>
      {program}
    </span>
  );
}

// ─── CONTRIBUTOR CARD ─────────────────────────────────────────────────────────

interface ContributorCardProps {
  contributor: Contributor;
  onSelect: (c: Contributor) => void;
}

function ContributorCard({ contributor, onSelect }: ContributorCardProps) {
  return (
    <article className="contributor-card" onClick={() => onSelect(contributor)} role="button" tabIndex={0}>
      <div className="contributor-card__top">
        <div className="contributor-card__user-info">
          <div className="os-avatar" style={{ background: contributor.avatarColor }}>
            {contributor.initials}
          </div>
          <div>
            <h3 className="contributor-card__name">{contributor.name}</h3>
            <div className="contributor-card__org">{contributor.org}</div>
          </div>
        </div>
        <ProgramBadge program={contributor.program} />
      </div>

      <div className="contributor-card__project">{contributor.project}</div>
      <div className="contributor-card__year">{contributor.year}</div>

      <div className="contributor-card__tech">
        {contributor.tech.map((t) => (
          <span key={t} className="tech-chip">
            {t}
          </span>
        ))}
      </div>

      <div className="contributor-card__footer-link">
        View Journey <ChevronRight size={13} />
      </div>
    </article>
  );
}

// ─── CONTRIBUTOR JOURNEY DRAWER MODAL ─────────────────────────────────────────

interface DrawerProps {
  contributor: Contributor | null;
  isOpen: boolean;
  onClose: () => void;
}

function ContributorDrawer({ contributor, isOpen, onClose }: DrawerProps) {
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

  if (!contributor) return null;

  const journeySteps = contributor.journey || DEFAULT_JOURNEY;

  return (
    <>
      {/* Backdrop */}
      <div className={`os-drawer-backdrop ${isOpen ? "is-open" : ""}`} onClick={onClose} />

      {/* Slide Panel */}
      <aside className={`os-drawer-panel ${isOpen ? "is-open" : ""}`} aria-modal="true" role="dialog">
        <div className="os-drawer-header">
          <ProgramBadge program={contributor.program} />
          <button className="os-drawer-close" onClick={onClose} aria-label="Close details">
            <X size={16} />
          </button>
        </div>

        <div className="os-drawer-content">
          {/* Profile Header */}
          <div className="os-drawer-profile">
            <div className="os-avatar os-drawer-avatar" style={{ background: contributor.avatarColor }}>
              {contributor.initials}
            </div>
            <div>
              <h2 className="os-drawer-name">{contributor.name}</h2>
              <div className="os-drawer-sub">
                {contributor.org} · {contributor.project}
              </div>
              <div className="os-drawer-sub" style={{ opacity: 0.6, fontSize: "0.75rem", marginTop: 2 }}>
                {contributor.year}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="os-drawer-actions">
            {contributor.github && (
              <a href={contributor.github} target="_blank" rel="noreferrer" className="os-action-btn">
                <Github width={14} height={14} /> GitHub
              </a>
            )}
            {contributor.linkedin && (
              <a href={contributor.linkedin} target="_blank" rel="noreferrer" className="os-action-btn">
                <Linkedin width={14} height={14} /> LinkedIn
              </a>
            )}
            {contributor.repo && (
              <a href={contributor.repo} target="_blank" rel="noreferrer" className="os-action-btn os-action-btn--accent">
                <ExternalLink size={14} /> Repository
              </a>
            )}
          </div>

          {/* About */}
          {contributor.about && (
            <div style={{ marginBottom: "28px" }}>
              <div className="os-drawer-section-label">ABOUT</div>
              <p style={{ fontSize: "0.92rem", color: "var(--fg-dim)", lineHeight: 1.6 }}>{contributor.about}</p>
            </div>
          )}

          {/* Quote Card */}
          {contributor.quote && (
            <div className="os-quote-card">
              <p className="os-quote-text">{contributor.quote}</p>
              <div className="os-quote-author">— {contributor.name}</div>
            </div>
          )}

          {/* Technologies */}
          <div style={{ marginBottom: "28px" }}>
            <div className="os-drawer-section-label">TECHNOLOGIES</div>
            <div className="contributor-card__tech">
              {contributor.tech.map((t) => (
                <span key={t} className="tech-chip" style={{ fontSize: "0.78rem", padding: "4px 12px" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Journey Stepper */}
          <div>
            <div className="os-drawer-section-label">JOURNEY</div>
            <div className="os-journey-stepper">
              {journeySteps.map((step, idx) => {
                let IconComponent = BookOpen;
                if (step.icon === "check") IconComponent = CheckCircle2;
                if (step.icon === "users") IconComponent = Users;
                if (step.icon === "code") IconComponent = Code2;
                if (step.icon === "trophy") IconComponent = Trophy;

                return (
                  <div key={idx} className="os-journey-step">
                    <div className="os-journey-icon-wrap">
                      <IconComponent size={15} />
                    </div>
                    <div className="os-journey-content">
                      <div className="os-journey-title">{step.title}</div>
                      <div className="os-journey-desc">{step.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── MAIN OPEN SOURCE PAGE COMPONENT ───────────────────────────────────────────

export default function OpenSource() {
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleOpenContributor = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  // Filter contributors by active filter category & search query
  const filteredContributors = CONTRIBUTORS.filter((c) => {
    const matchesFilter =
      activeFilter === "All" ||
      c.program === activeFilter ||
      c.org === activeFilter ||
      c.categories.includes(activeFilter);

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      c.name.toLowerCase().includes(q) ||
      c.org.toLowerCase().includes(q) ||
      c.project.toLowerCase().includes(q) ||
      c.tech.some((t) => t.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  const latestContributor = CONTRIBUTORS.find((c) => c.latest) || CONTRIBUTORS[0];

  return (
    <div className="opensource-page">
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="os-hero">
        <div className="container">
          <div className="os-hero__grid">
            <div className="os-hero__content">
              <span className="eyebrow">STUDENT-RUN · VJTI MATUNGA</span>

              <h1 className="os-hero__title">
                <span className="os-hero__title-line">OPEN</span>
                <span className="os-hero__title-line os-hero__title-accent">
                  SOURCE<span className="mark">.</span>
                </span>
              </h1>

              <p className="os-hero__subtitle">
                Celebrating Community of Coders members who have represented VJTI in global open-source programs and
                organizations.
              </p>

              <div className="os-hero__actions">
                <a href="#contributors-section" className="btn">
                  Meet Contributors <ArrowRight size={16} />
                </a>
                <a
                  href="https://github.com/CommunityOfCoders"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost"
                >
                  <Globe size={16} /> Apply Next Season
                </a>
              </div>
            </div>

            {/* Right Column: Stats + Featured Orgs + Latest Card */}
            <div className="os-hero__widgets">
              {/* Stats Cards */}
              <div className="os-hero__stats-row">
                <div className="os-stat-card">
                  <div className="os-stat-card__num">50+</div>
                  <div className="os-stat-card__label">Contributors</div>
                </div>
                <div className="os-stat-card">
                  <div className="os-stat-card__num">15+</div>
                  <div className="os-stat-card__label">Organizations</div>
                </div>
                <div className="os-stat-card">
                  <div className="os-stat-card__num">6+</div>
                  <div className="os-stat-card__label">Programs</div>
                </div>
              </div>

              {/* Featured Orgs Box */}
              <div className="os-featured-orgs">
                <div className="os-featured-orgs__label">FEATURED ORGANIZATIONS</div>
                <div className="os-featured-orgs__chips">
                  {ORGANIZATIONS.map((org) => {
                    const LogoComp = LOGO_COMPONENTS[org.logo];
                    return (
                      <div key={org.id} className="os-org-chip">
                        <span className="os-org-chip__icon">
                          <LogoComp />
                        </span>
                        <span>{org.shortName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Latest Highlight Box */}
              <div className="os-latest-card" onClick={() => handleOpenContributor(latestContributor)}>
                <div className="os-latest-card__user">
                  <div className="os-avatar" style={{ background: latestContributor.avatarColor }}>
                    {latestContributor.initials}
                  </div>
                  <div>
                    <div className="os-latest-card__name">{latestContributor.name}</div>
                    <div className="os-latest-card__sub">
                      {latestContributor.program} · {latestContributor.org} · {latestContributor.year}
                    </div>
                  </div>
                </div>
                <span className="os-badge-pill">Latest</span>
              </div>
            </div>
          </div>

          <div className="os-scroll-hint">
            <span className="os-scroll-hint__text">SCROLL</span>
            <div className="os-scroll-hint__line" />
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: WHERE WE'VE CONTRIBUTED ────────────────────────── */}
      <section className="os-orgs-section">
        <div className="container">
          <div className="os-section-header">
            <span className="eyebrow">ORGANIZATIONS</span>
            <h2 className="os-section-title">Where we've contributed.</h2>
          </div>

          <div className="os-orgs-grid">
            {ORGANIZATIONS.map((org) => {
              const LogoComp = LOGO_COMPONENTS[org.logo];
              return (
                <div key={org.id} className="os-org-card">
                  <div className="os-org-card__header">
                    <div className="os-org-card__logo">
                      <LogoComp />
                    </div>
                    <div>
                      <h3 className="os-org-card__title">{org.name}</h3>
                      <div className="os-org-card__underline" />
                    </div>
                  </div>
                  <p className="os-org-card__desc">{org.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: MEET THE CONTRIBUTORS ──────────────────────────── */}
      <section className="os-people-section" id="contributors-section">
        <div className="container">
          <div className="os-section-header">
            <span className="eyebrow">PEOPLE</span>
            <h2 className="os-section-title">Meet the contributors.</h2>
          </div>

          {/* Search Bar */}
          <div className="os-search-bar">
            <Search size={18} className="os-search-icon" />
            <input
              type="text"
              className="os-search-input"
              placeholder="Search contributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="os-search-clear" onClick={() => setSearchQuery("")} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="os-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`os-filter-btn ${activeFilter === filter ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Subheader Count */}
          <div className="os-subhead">
            <span className="eyebrow">CONTRIBUTORS</span>
            <span className="os-count">— {filteredContributors.length} members</span>
          </div>

          {/* Contributors Grid */}
          {filteredContributors.length === 0 ? (
            <div className="os-empty">
              <p>No contributors found matching "{searchQuery}".</p>
            </div>
          ) : (
            <div className="os-contributors-grid">
              {filteredContributors.map((contributor) => (
                <ContributorCard key={contributor.id} contributor={contributor} onSelect={handleOpenContributor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CONTRIBUTOR DETAIL DRAWER ─────────────────────────────────── */}
      <ContributorDrawer contributor={selectedContributor} isOpen={drawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
}
