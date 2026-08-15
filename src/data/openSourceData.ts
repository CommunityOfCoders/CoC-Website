import type React from 'react';
import {
  ApacheLogo, BlenderLogo, CERNLogo, CNCFLogo, DebianLogo, FedoraLogo, GoogleLogo, GSoCLogo,
  HacktoberfestLogo, INCFLogo, IntelLogo, JuliaLogo, KubernetesLogo, LFXLogo, ML4SciLogo,
  OctaveLogo, OpenCVLogo, PostgreSQLLogo, PrometheusLogo, PythonLogo, SageLogo, SymPyLogo,
} from '../components/ui/OrgLogos';

/* ============================================================
   REAL data: repos (see REPOS below), featured orgs and programs
   are real organisations with real links. Star/fork counts are a
   snapshot from the public GitHub API for CommunityOfCoders.

   CONTRIBUTORS is a different story — see the comment above that
   array. Those three entries are placeholders, not people.
   ============================================================ */

export interface Repo {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  forks: number;
  href: string;
}

const repo = (name: string) => `https://github.com/CommunityOfCoders/${name}`;

export const REPOS: Repo[] = [
  { name: 'COCWebsite', desc: "The official website of Community Of Coders, VJTI — yes, it's open source too.", lang: 'TypeScript', stars: 27, forks: 48, href: repo('COCWebsite') },
  { name: 'Inheritance2k25', desc: "This year's submissions for Inheritance — CoC's flagship project-building fest.", lang: 'JavaScript', stars: 4, forks: 26, href: repo('Inheritance2k25') },
  { name: 'Inheritance-2021', desc: "Culmination of projects under Inheritance '21.", lang: 'JavaScript', stars: 28, forks: 69, href: repo('Inheritance-2021') },
  { name: 'Inheritance-2020', desc: 'Official repository for Inheritance submissions, 2020.', lang: 'JavaScript', stars: 17, forks: 53, href: repo('Inheritance-2020') },
  { name: 'Project-X-2023', desc: 'Project ideas and repos for the Project X mentorship programme — by the seniors, for the juniors.', lang: 'JavaScript', stars: 7, forks: 10, href: repo('Project-X-2023') },
  { name: 'WebGenesis', desc: "Starter templates and resources from CoC's web-development workshop series.", lang: 'HTML', stars: 10, forks: 77, href: repo('WebGenesis') },
  { name: 'Git-Workshop-22', desc: 'Hands-on material from the Git & GitHub workshop — branching, PRs, real collaboration workflows.', lang: 'JavaScript', stars: 26, forks: 42, href: repo('Git-Workshop-22') },
  { name: 'ML-DS-Workshop-22', desc: 'Notebooks and datasets from the Machine Learning & Data Science workshop.', lang: 'Jupyter Notebook', stars: 22, forks: 13, href: repo('ML-DS-Workshop-22') },
  { name: 'Inheritance-Bot', desc: "A Discord bot built for Inheritance '22 — submissions, reminders and leaderboard pings.", lang: 'JavaScript', stars: 8, forks: 11, href: repo('Inheritance-Bot') },
  { name: 'EthVJTI-Web3-Bootcamp-2024', desc: 'Resources from the Web3 Bootcamp run by ETH VJTI, 2024.', lang: 'JavaScript', stars: 3, forks: 0, href: repo('EthVJTI-Web3-Bootcamp-2024') },
];

/* ---------- featured organisations (hero logo wall) — all real ---------- */
export interface FeaturedOrg { name: string; href: string; Logo: React.FC<React.SVGProps<SVGSVGElement>> }

export const FEATURED_ORGS: FeaturedOrg[] = [
  { name: 'Google Summer of Code', href: 'https://summerofcode.withgoogle.com/', Logo: GSoCLogo },
  { name: 'Google', href: 'https://opensource.google/', Logo: GoogleLogo },
  { name: 'Python', href: 'https://www.python.org/', Logo: PythonLogo },
  { name: 'Kubernetes', href: 'https://kubernetes.io/', Logo: KubernetesLogo },
  { name: 'PostgreSQL', href: 'https://www.postgresql.org/', Logo: PostgreSQLLogo },
  { name: 'Apache', href: 'https://www.apache.org/', Logo: ApacheLogo },
  { name: 'Blender', href: 'https://www.blender.org/', Logo: BlenderLogo },
  { name: 'Hacktoberfest', href: 'https://hacktoberfest.com/', Logo: HacktoberfestLogo },
  { name: 'CNCF', href: 'https://www.cncf.io/', Logo: CNCFLogo },
  { name: 'Julia Language', href: 'https://julialang.org/', Logo: JuliaLogo },
  { name: 'Intel', href: 'https://www.intel.com/', Logo: IntelLogo },
  { name: 'INCF', href: 'https://www.incf.org/', Logo: INCFLogo },
  { name: 'OpenCV', href: 'https://opencv.org/', Logo: OpenCVLogo },
  { name: 'Prometheus', href: 'https://prometheus.io/', Logo: PrometheusLogo },
  { name: 'Debian', href: 'https://www.debian.org/', Logo: DebianLogo },
  { name: 'Fedora', href: 'https://fedoraproject.org/', Logo: FedoraLogo },
  { name: 'SymPy', href: 'https://www.sympy.org/', Logo: SymPyLogo },
  { name: 'GNU Octave', href: 'https://octave.org/', Logo: OctaveLogo },
  { name: 'SageMath', href: 'https://www.sagemath.org/', Logo: SageLogo },
  { name: 'CERN-HSF', href: 'https://hepsoftwarefoundation.org/', Logo: CERNLogo },
  { name: 'ML4Sci', href: 'https://ml4sci.org/', Logo: ML4SciLogo },
];

/* ---------- programs students plug into — all real, all link out ---------- */
export interface Program {
  id: 'gsoc' | 'lfx' | 'jsoc' | 'hacktoberfest';
  name: string;
  shortName: string;
  description: string;
  href: string;
  Logo: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}

export const PROGRAMS: Program[] = [
  {
    id: 'gsoc',
    name: 'Google Summer of Code',
    shortName: 'GSoC',
    description: 'A global program funding contributors to work on open-source projects over a summer, under an organisation’s mentorship.',
    href: 'https://summerofcode.withgoogle.com/',
    Logo: GSoCLogo,
    color: '#4285F4',
  },
  {
    id: 'lfx',
    name: 'LFX Mentorship',
    shortName: 'LFX',
    description: 'The Linux Foundation’s mentorship platform, connecting contributors with enterprise open-source projects across the CNCF and beyond.',
    href: 'https://lfx.linuxfoundation.org/tools/mentorship/',
    Logo: LFXLogo,
    color: '#00A8E1',
  },
  {
    id: 'jsoc',
    name: 'Julia Season of Contributions',
    shortName: 'Julia',
    description: 'A seasonal program funding and mentoring contributors to the Julia language and its package ecosystem.',
    href: 'https://julialang.org/jsoc/',
    Logo: JuliaLogo,
    color: '#9558B2',
  },
  {
    id: 'hacktoberfest',
    name: 'Hacktoberfest',
    shortName: 'Hacktoberfest',
    description: 'A month-long open-source celebration every October — four accepted pull requests to any participating repo, no application or mentor needed.',
    href: 'https://hacktoberfest.com/',
    Logo: HacktoberfestLogo,
    color: '#BA3925',
  },
];

/* ============================================================
   CONTRIBUTORS — Community of Coders members across GSoC,
   LFX Mentorship, and Julia Season of Contributions (JSoC).
   ============================================================ */

export interface Contributor {
  id: string;
  name: string;
  initials: string;
  programId: 'gsoc' | 'lfx' | 'jsoc' | 'hacktoberfest';
  org: string;
  project: string;
  year: string;
  tech: string[];
  description: string;
  mentor?: string;
  github?: string;
  linkedin?: string;
  blog?: string;
}

export const CONTRIBUTORS: Contributor[] = [
  // ─── GSoC Contributors ──────────────────────────────────────────────────
  {
    id: 'avanish-salunke',
    name: 'Avanish Salunke',
    initials: 'AS',
    programId: 'gsoc',
    org: 'GNU Octave',
    project: 'Add LinearModel and CompactLinearModel objects to the statistics package.',
    year: '2026',
    tech: ['C++', 'MATLAB', 'Octave', 'Statistics'],
    description:
      'Add LinearModel and CompactLinearModel objects to the statistics package in GNU Octave, enhancing statistical and regression modelling capabilities.',
    github: 'https://github.com/AvanishSalunke',
    linkedin: 'https://www.linkedin.com/in/avanish-salunke-539042330',
  },
  {
    id: 'anushree-upasham',
    name: 'Anushree Upasham',
    initials: 'AU',
    programId: 'gsoc',
    org: 'ML4SCI',
    project: 'Develop ML models for exoplanet atmosphere characterization using astrophysical data.',
    year: '2026',
    tech: ['Python', 'Machine Learning', 'Astrophysics', 'Deep Learning'],
    description:
      'Develop machine learning models for exoplanet atmosphere characterization utilizing astrophysical transmission spectroscopy data under ML4SCI.',
    github: 'https://github.com/AnushreeUpasham',
  },
  {
    id: 'vidhi-rohira',
    name: 'Vidhi Rohira',
    initials: 'VR',
    programId: 'gsoc',
    org: 'INCF',
    project: 'Develop open-source neuroinformatics tools and workflows to support neuroscience research and open science initiatives.',
    year: '2025',
    tech: ['Python', 'Neuroscience', 'Neuroinformatics', 'Open Science'],
    description:
      'Develop open-source neuroinformatics tools and reproducible workflows to support neuroscience research and open science initiatives at INCF.',
    github: 'https://github.com/vidhirohira',
    blog: 'https://vidhirohira.github.io/blog/2025/06/12/week2-task-allocation-mab.html',
  },
  {
    id: 'sourish-phate',
    name: 'Sourish Phate',
    initials: 'SP',
    programId: 'gsoc',
    org: 'ML4SCI',
    project: 'Apply quantum machine learning techniques to characterize exoplanet atmospheres from transmission spectra.',
    year: '2025',
    tech: ['Python', 'Qiskit', 'Quantum ML', 'Spectroscopy'],
    description:
      'Apply quantum machine learning techniques to characterize exoplanet atmospheres from transmission spectra under ML4SCI in GSoC.',
    blog: 'https://medium.com/@sourishphate/quantum-machine-learning-for-exoplanet-characterization-gsoc-25-ml4sci-c6c6cb4590b9',
  },
  {
    id: 'swayam-shah',
    name: 'Swayam Shah',
    initials: 'SS',
    programId: 'gsoc',
    org: 'GNU Octave',
    project: 'Implement optimized nearest-neighbor searcher classes to enhance clustering performance in the GNU Octave Statistics package.',
    year: '2025',
    tech: ['C++', 'Octave', 'CMake', 'Nearest-Neighbor Search'],
    description:
      "Implemented KDTreeSearcher, ExhaustiveSearcher and hnswSearcher classes for GNU Octave's Statistics package, plus a unified createns() factory function for nearest-neighbour search.",
    mentor: 'Andreas Bertsatos & Colin Macdonald',
    github: 'https://github.com/Sonu0305',
    linkedin: 'https://www.linkedin.com/in/swayamshahh/',
    blog: 'https://swayams.medium.com/embarking-on-my-google-summer-of-code-25-journey-with-gnu-octave-cfa50a4681fb',
  },
  {
    id: 'prasanna-kasar',
    name: 'Prasanna Kasar',
    initials: 'PK',
    programId: 'gsoc',
    org: 'CERN-HSF',
    project: 'Enhance TMVA SOFIE by improving Keras parsing and adding JAX/FLAX support for optimized C++ ML inference generation.',
    year: '2025',
    tech: ['C++', 'JAX', 'FLAX', 'Keras', 'TMVA SOFIE'],
    description:
      'Enhance TMVA SOFIE by improving Keras parsing and adding JAX/FLAX support for optimized C++ machine learning inference code generation for high-energy physics.',
    github: 'https://github.com/prasannakasar',
  },
  {
    id: 'rushabh-mehta-sympy',
    name: 'Rushabh Mehta',
    initials: 'RM',
    programId: 'gsoc',
    org: 'SYMPY',
    project: 'Add symbolic wrapping geometry models to SymPy for efficient musculoskeletal biomechanics simulations.',
    year: '2025',
    tech: ['Python', 'SymPy', 'Biomechanics', 'Symbolic Math'],
    description:
      'Add symbolic wrapping obstacle geometry models to SymPy mechanics module for efficient musculoskeletal biomechanics simulations.',
    github: 'https://github.com/RushabhMehta2005',
    linkedin: 'https://www.linkedin.com/in/mehtarushabh/',
    blog: 'https://rushabh-mehta.medium.com/',
  },
  {
    id: 'aarya-pandey',
    name: 'Aarya Pandey',
    initials: 'AP',
    programId: 'gsoc',
    org: 'Intel',
    project: 'Build an Interactive Multimodal Data Explorer for Datumaro/OpenVINO to inspect and visualize AI datasets.',
    year: '2025',
    tech: ['Python', 'Intel OpenVINO', 'Datumaro', 'Multimodal AI'],
    description:
      'Build an Interactive Multimodal Data Explorer for Intel Datumaro / OpenVINO to inspect, filter, and visualize complex AI computer vision datasets.',
    github: 'https://github.com/aaryapandey',
  },

  // ─── LFX Mentorship Contributors ─────────────────────────────────────────
  {
    id: 'rushab-mehta-lfx',
    name: 'Rushab Mehta',
    initials: 'RM',
    programId: 'lfx',
    org: 'CNCF',
    project: 'Improving Prometheus startup performance by enabling metric scraping to run in parallel with WAL replay',
    year: '2025',
    tech: ['Go', 'Prometheus', 'CNCF', 'WAL Replay'],
    description:
      'Improving Prometheus startup performance by enabling metric scraping to run concurrently in parallel with WAL replay under CNCF.',
    github: 'https://github.com/RushabhMehta2005',
    linkedin: 'https://www.linkedin.com/in/mehtarushabh/',
  },
  {
    id: 'khush-agrawal',
    name: 'Khush Agrawal',
    initials: 'KA',
    programId: 'lfx',
    org: 'CNCF',
    project: 'Build a WASI-NN plugin for WasmEdge that integrates bitnet.cpp to run efficient 1-bit LLMs on CPUs.',
    year: '2025',
    tech: ['Rust', 'WebAssembly', 'WasmEdge', 'bitnet.cpp', 'LLMs'],
    description:
      'Build a WASI-NN backend plugin for WasmEdge (CNCF) that integrates bitnet.cpp to run ultra-efficient 1-bit quantized LLMs on CPU architectures.',
    github: 'https://github.com/Khushmagrawal',
    linkedin: 'https://www.linkedin.com/in/khush-agrawal-36916b207/',
    blog: 'https://khush3.github.io/',
  },

  // ─── Julia Contributors ─────────────────────────────────────────────────
  {
    id: 'utsav-ojha',
    name: 'Utsav Ojha',
    initials: 'UO',
    programId: 'jsoc',
    org: 'Julia Language',
    project: 'Building a symbolic parser for generating loss function for PINNs',
    year: '2025',
    tech: ['Julia', 'Symbolic Computation', 'PINNs', 'Loss Functions'],
    description:
      'Building a high-performance symbolic parser for automatically generating optimized loss functions for Physics-Informed Neural Networks (PINNs) in Julia.',
    github: 'https://github.com/utsavojha',
  },
];
