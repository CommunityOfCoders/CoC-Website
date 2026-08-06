import type React from 'react';
import {
  CERNLogo, DebianLogo, FedoraLogo, GoogleLogo, GSoCLogo, HacktoberfestLogo, JuliaLogo, LFXLogo,
  ML4SciLogo, OctaveLogo, OpenCVLogo, PrometheusLogo, SageLogo, SymPyLogo,
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
  { name: 'Hacktoberfest', href: 'https://hacktoberfest.com/', Logo: HacktoberfestLogo },
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
    shortName: 'JSoC',
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
   CONTRIBUTORS — real people, verified against public sources.

   Research method: VJTI has several tech clubs running in parallel
   (CoC, SRA, DSC, Pratibimb...), and GSoC/LFX write-ups rarely say
   which one. Each entry below has a direct, citable link to
   Community of Coders specifically — not just "a VJTI student did
   GSoC" (that's mostly SRA's alumni, who keep their own tracker at
   sravjti.in/opensource) — or was named directly by CoC as a
   confirmed member, then corroborated with their own GSoC/LFX
   write-up.

   - Swayam Shah — GSoC'25 write-up (swayams.medium.com) credits
     "Project X VJTI" seniors for mentorship; Project X is CoC's own
     mentorship pipeline (its repos live under github.com/
     CommunityOfCoders). Also already credited as a co-author on this
     site's own Projects page (Text To Speech, 2024).
   - Om Mukherjee — LinkedIn headline is literally "Community Of
     Coders, VJTI"; confirmed LFX Mentorship graduate (Linux Kernel
     track). Exact mentor name/cohort season weren't pullable (LinkedIn
     blocks unauthenticated scraping) — left out rather than guessed.
   - Avanish Salunke — LinkedIn headline: "GSoC 2026 @ GNU Octave |
     CoC @ VJTI"; GitHub bio confirms active contribution to
     gnu-octave/statistics since Sept 2025. Also a repeat credited
     author on this site's own Projects page (Train Your Foes, JARVIS).
   - Vidhi Rohira — GSoC'25 with OREL (Orthogonal Research and
     Education Lab), building SustainHub; her own blog documents the
     work week by week. Already credited as a co-author on this
     site's Projects page (Super MaRLo Bros, 2024).
   - Rushabh Mehta — GSoC'25 contributor & SymPy maintainer, per
     sympy@googlegroups.com mailing-list threads and his own GitHub/
     opensource.com profile; confirmed "Third Year Computer
     Engineering Student @ VJTI." No LFX stint could be independently
     confirmed, so he's listed under GSoC only.
   - Khush Agrawal — LFX'25 mentee at WasmEdge (CNCF), per his own
     GitHub/portfolio bio; VJTI '27 student.
   - Sourish Phate — GSoC'25 with ML4Sci ("Quantum Machine Learning
     for Exoplanet Characterization"), per his own Medium write-up.

   Named by CoC but not yet independently confirmable to a publishable
   standard (specific org/project/links): Anushree Upasham (GSoC'26)
   and Utsav Ojha (this year's Julia/JSoC contributor) — both already
   appear as real CoC project co-authors elsewhere on this site, but
   their open-source project specifics need to come from CoC directly
   before they're added here. No Hacktoberfest participant has been
   individually confirmed yet either, even though the program is real
   and listed in PROGRAMS above.
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
  {
    id: 'avanish-salunke',
    name: 'Avanish Salunke',
    initials: 'AS',
    programId: 'gsoc',
    org: 'GNU Octave',
    project: "Statistics package contributions",
    year: '2026',
    tech: ['C++', 'MATLAB', 'Octave'],
    description:
      "Selected for GSoC 2026 to contribute to GNU Octave's Statistics package, extending the same numerical-computing package CoC has now sent two consecutive years of contributors into.",
    github: 'https://github.com/AvanishSalunke',
    linkedin: 'https://www.linkedin.com/in/avanish-salunke-539042330',
  },
  {
    id: 'swayam-shah',
    name: 'Swayam Shah',
    initials: 'SS',
    programId: 'gsoc',
    org: 'GNU Octave',
    project: "Clustering searcher classes for Octave's Statistics package",
    year: '2025',
    tech: ['C++', 'Octave', 'CMake'],
    description:
      "Implemented KDTreeSearcher, ExhaustiveSearcher and hnswSearcher classes for GNU Octave's Statistics package, plus a unified createns() factory function for nearest-neighbour search — bringing Octave's searcher API in line with MATLAB's.",
    mentor: 'Andreas Bertsatos & Colin Macdonald',
    github: 'https://github.com/Sonu0305',
    linkedin: 'https://www.linkedin.com/in/swayamshahh/',
    blog: 'https://swayams.medium.com/embarking-on-my-google-summer-of-code-25-journey-with-gnu-octave-cfa50a4681fb',
  },
  {
    id: 'vidhi-rohira',
    name: 'Vidhi Rohira',
    initials: 'VR',
    programId: 'gsoc',
    org: 'OREL',
    project: 'SustainHub — an adaptive agent-based model for open-source community sustainability',
    year: '2025',
    tech: ['Python', 'Reinforcement Learning', 'Agent-Based Modeling'],
    description:
      "Built SustainHub, a simulation framework modelling open-source community dynamics, at the Orthogonal Research and Education Lab (OREL). Implemented Thompson Sampling (a multi-armed bandit strategy) to dynamically match contributor agents to tasks.",
    github: 'https://github.com/vidhirohira',
    blog: 'https://vidhirohira.github.io/blog/2025/06/12/week2-task-allocation-mab.html',
  },
  {
    id: 'rushabh-mehta',
    name: 'Rushabh Mehta',
    initials: 'RM',
    programId: 'gsoc',
    org: 'SymPy',
    project: "Expanding SymPy's force and torque models",
    year: '2025',
    tech: ['Python', 'SymPy', 'Mechanics'],
    description:
      'GSoC 2025 contributor and maintainer at SymPy, extending the mechanics module’s force and torque models — merged pull requests to the core library while still a third-year at VJTI.',
    github: 'https://github.com/RushabhMehta2005',
    linkedin: 'https://www.linkedin.com/in/mehtarushabh/',
    blog: 'https://rushabh-mehta.medium.com/',
  },
  {
    id: 'khush-agrawal',
    name: 'Khush Agrawal',
    initials: 'KA',
    programId: 'lfx',
    org: 'WasmEdge (CNCF)',
    project: 'LFX Mentorship — WasmEdge runtime',
    year: '2025',
    tech: ['Rust', 'WebAssembly', 'Machine Learning'],
    description:
      'LFX 2025 mentee at WasmEdge, a CNCF WebAssembly runtime — contributing alongside undergraduate ML research at VJTI’s CoE-CNDS lab.',
    github: 'https://github.com/Khushmagrawal',
    linkedin: 'https://www.linkedin.com/in/khush-agrawal-36916b207/',
    blog: 'https://khush3.github.io/',
  },
  {
    id: 'sourish-phate',
    name: 'Sourish Phate',
    initials: 'SP',
    programId: 'gsoc',
    org: 'ML4Sci',
    project: 'Quantum machine learning for exoplanet characterization',
    year: '2025',
    tech: ['Python', 'Qiskit', 'Quantum ML'],
    description:
      'GSoC 2025 with ML4Sci, exploring quantum feature encoding and quantum neural networks to characterise exoplanet atmospheres from transmission spectra.',
    blog: 'https://medium.com/@sourishphate/quantum-machine-learning-for-exoplanet-characterization-gsoc-25-ml4sci-c6c6cb4590b9',
  },
  {
    id: 'om-mukherjee',
    name: 'Om Mukherjee',
    initials: 'OM',
    programId: 'lfx',
    org: 'Linux Kernel',
    project: 'LFX Mentorship — Linux Kernel bug-fixing track',
    year: '2025',
    tech: ['C', 'Linux Kernel', 'Git'],
    description:
      "Graduated from the Linux Foundation's LFX Mentorship program on the Linux Kernel bug-fixing track — triaging reported issues across kernel subsystems, reproducing them, and landing fixes upstream.",
    github: 'https://github.com/meekhumor',
    linkedin: 'https://www.linkedin.com/in/om-mukherjee7/',
  },
];
