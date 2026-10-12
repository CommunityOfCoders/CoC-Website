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
  { name: 'COCWebsite', desc: "The official website of Community Of Coders, VJTI - yes, it's open source too.", lang: 'TypeScript', stars: 27, forks: 48, href: repo('COCWebsite') },
  { name: 'Inheritance2k25', desc: "This year's submissions for Inheritance - CoC's flagship project-building fest.", lang: 'JavaScript', stars: 4, forks: 26, href: repo('Inheritance2k25') },
  { name: 'Inheritance-2021', desc: "Culmination of projects under Inheritance '21.", lang: 'JavaScript', stars: 28, forks: 69, href: repo('Inheritance-2021') },
  { name: 'Inheritance-2020', desc: 'Official repository for Inheritance submissions, 2020.', lang: 'JavaScript', stars: 17, forks: 53, href: repo('Inheritance-2020') },
  { name: 'Project-X-2023', desc: 'Project ideas and repos for the Project X mentorship programme - by the seniors, for the juniors.', lang: 'JavaScript', stars: 7, forks: 10, href: repo('Project-X-2023') },
  { name: 'WebGenesis', desc: "Starter templates and resources from CoC's web-development workshop series.", lang: 'HTML', stars: 10, forks: 77, href: repo('WebGenesis') },
  { name: 'Git-Workshop-22', desc: 'Hands-on material from the Git & GitHub workshop - branching, PRs, real collaboration workflows.', lang: 'JavaScript', stars: 26, forks: 42, href: repo('Git-Workshop-22') },
  { name: 'ML-DS-Workshop-22', desc: 'Notebooks and datasets from the Machine Learning & Data Science workshop.', lang: 'Jupyter Notebook', stars: 22, forks: 13, href: repo('ML-DS-Workshop-22') },
  { name: 'Inheritance-Bot', desc: "A Discord bot built for Inheritance '22 - submissions, reminders and leaderboard pings.", lang: 'JavaScript', stars: 8, forks: 11, href: repo('Inheritance-Bot') },
  { name: 'EthVJTI-Web3-Bootcamp-2024', desc: 'Resources from the Web3 Bootcamp run by ETH VJTI, 2024.', lang: 'JavaScript', stars: 3, forks: 0, href: repo('EthVJTI-Web3-Bootcamp-2024') },
];

/* ---------- featured organisations (hero logo wall) - all real ---------- */
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

/* ---------- programs students plug into - all real, all link out ---------- */
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
    description: 'A month-long open-source celebration every October - four accepted pull requests to any participating repo, no application or mentor needed.',
    href: 'https://hacktoberfest.com/',
    Logo: HacktoberfestLogo,
    color: '#BA3925',
  },
];

/* ============================================================
   CONTRIBUTORS - Community of Coders members across GSoC,
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
  projectLink?: string;
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
    tech: ['C++', 'MATLAB', 'Octave', 'Linear Regression', 'Statistics'],
    description:
      'Add LinearModel and CompactLinearModel classes to the GNU Octave Statistics package to provide an object-oriented framework for linear regression, separating model training from lightweight predictions and modernizing fitlm and stepwiselm functions.',
    mentor: 'Colin Macdonald, Andreas Bertsatos',
    projectLink: 'https://summerofcode.withgoogle.com/programs/2026/projects/YKFoacXh',
    github: 'https://github.com/gnu-octave/statistics',
    linkedin: 'https://www.linkedin.com/in/avanish-salunke-539042330',
    blog: 'https://avanishsalunke.github.io/AvanishSalunke-gsoc-2026/',
  },
  {
    id: 'anushree-upasham',
    name: 'Anushree Upasham',
    initials: 'AU',
    programId: 'gsoc',
    org: 'ML4SCI',
    project: 'Exoplanet Atmosphere Characterization',
    year: '2026',
    tech: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'Deep Learning', 'Astrophysics'],
    description:
      'Develop deep learning models (disequilibrium-aware GRU, Variational Autoencoders, and unsupervised Autoencoders) for exoplanet atmosphere parameter retrieval and biosignature detection from transmission spectra validated on JWST observational data.',
    mentor: 'Katia Matcheva, Emilie Panek',
    projectLink: 'https://summerofcode.withgoogle.com/programs/2026/projects/N4VolVhn',
  },
  {
    id: 'vidhi-rohira',
    name: 'Vidhi Rohira',
    initials: 'VR',
    programId: 'gsoc',
    org: 'INCF',
    project: 'Open Source Community Sustainability',
    year: '2025',
    tech: ['Python', 'Reinforcement Learning', 'NetLogo', 'Flask', 'Multi-Armed Bandits'],
    description:
      'Developed SustainHub, an AI-driven simulation platform modeling open-source community dynamics and task allocation using Multi-Armed Bandits and SARSA reinforcement learning to evaluate contributor sustainability and system resilience.',
    mentor: 'Bradly Alicea, Jesse Parent, Sarrah Bastawala, Mehul Arora',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2025/projects/5ar0UXAF',
    blog: 'https://vidhirohira.github.io/blog/2025/06/12/week2-task-allocation-mab.html',
  },
  {
    id: 'sourish-phate',
    name: 'Sourish Phate',
    initials: 'SP',
    programId: 'gsoc',
    org: 'ML4SCI',
    project: 'Quantum Machine Learning For Exoplanet Characterization',
    year: '2025',
    tech: ['Python', 'TensorFlow', 'PennyLane', 'Quantum ML', 'Spectroscopy'],
    description:
      'Investigated quantum machine learning methods including quantum feature encoding, variational quantum circuits, and hybrid neural networks for characterizing exoplanet atmospheres from transit spectroscopy data under ML4SCI.',
    mentor: 'Katia Matcheva, Konstantin Matchev, Emilie Panek',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2025/projects/xIJEvndL',
    github: 'https://github.com/sourishphate/QML_For_Exoplanet_Characterization_EXXA_GSoC_2025',
    blog: 'https://medium.com/@sourishphate/quantum-machine-learning-for-exoplanet-characterization-gsoc-25-ml4sci-c6c6cb4590b9',
  },
  {
    id: 'swayam-shah',
    name: 'Swayam Shah',
    initials: 'SS',
    programId: 'gsoc',
    org: 'GNU Octave',
    project: 'Adding clustering *Searcher classes in statistics package',
    year: '2025',
    tech: ['C++', 'Octave', 'CMake', 'Nearest-Neighbor Search', 'classdef'],
    description:
      "Implemented KDTreeSearcher, ExhaustiveSearcher and hnswSearcher classes for GNU Octave's Statistics package, plus a unified createns() factory function for nearest-neighbour queries and clustering.",
    mentor: 'Colin Macdonald, Andreas Bertsatos',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2025/projects/vf4W0YiX',
    github: 'https://github.com/Sonu0305/statistics',
    linkedin: 'https://www.linkedin.com/in/swayamshahh/',
    blog: 'https://medium.com/@swayams/gsoc-25-final-report-gnu-octave-27dfc954f9d8',
  },
  {
    id: 'prasanna-kasar',
    name: 'Prasanna Kasar',
    initials: 'PK',
    programId: 'gsoc',
    org: 'CERN-HSF',
    project: 'TMVA SOFIE - Enhancing Keras Parser and JAX/FLAX Integration',
    year: '2025',
    tech: ['Python', 'C++', 'TensorFlow', 'Keras', 'JAX/FLAX', 'TMVA SOFIE'],
    description:
      'Enhanced ROOT TMVA SOFIE by expanding Keras parser coverage and adding JAX/FLAX integration for generating optimized, standalone C++ inference code for high-energy physics models.',
    mentor: 'Lorenzo Moneta, Sanjiban Sengupta',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2025/projects/uAjGYhgX',
    github: 'https://gist.github.com/PrasannaKasar/3cf1ccc7109a9bf5d784b973233ed05a',
  },
  {
    id: 'rushabh-mehta-sympy',
    name: 'Rushabh Mehta',
    initials: 'RM',
    programId: 'gsoc',
    org: 'SYMPY',
    project: 'Symbolic Wrapping Geometries for Musculoskeletal Modeling in SymPy',
    year: '2025',
    tech: ['Python', 'SymPy', 'Biomechanics', 'Symbolic Math', 'Mechanics'],
    description:
      'Added symbolic wrapping obstacle geometry models (cylinders, spheres) to SymPy mechanics module for efficient musculoskeletal biomechanics simulations and path calculations around bones and joints.',
    mentor: 'Jason Moore, Hwayeon Kang',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2025/projects/uvXG3nzX',
    github: 'https://github.com/sympy/sympy/wiki/GSoC-2025-Report-Rushabh-Mehta%3A-Implementing-Wrapping-Geometries-for-Musculoskeletal-Modeling',
    linkedin: 'https://www.linkedin.com/in/mehtarushabh/',
    blog: 'https://rushabh-mehta.medium.com/',
  },
  {
    id: 'aarya-pandey',
    name: 'Aarya Pandey',
    initials: 'AP',
    programId: 'gsoc',
    org: 'Intel',
    project: 'Interactive Multimodal Embedding Explorer',
    year: '2025',
    tech: ['Python', 'React', 'OpenVINO Toolkit', 'Datumaro', 'D3.js', 'Streamlit'],
    description:
      'Built the Multimodal Embedding Explorer (MMEE) for Intel OpenVINO / Datumaro to inspect, filter, clean, and visualize multimodal AI embeddings and dataset distributions.',
    mentor: 'Samet Akcay, Laurens Hogeweg',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2025/projects/j834yUmd',
    github: 'https://github.com/geeky33/mmee2025',
  },
  {
    id: 'kshitij-shah',
    name: 'Kshitij Shah',
    initials: 'KS',
    programId: 'gsoc',
    org: 'Sugar Labs',
    project: 'Add an AI-assistant to the Pippy Activity',
    year: '2024',
    tech: ['Python', 'GTK', 'Docker', 'AWS', 'LLMs', 'UI/UX'],
    description:
      'Implemented an LLM-powered interactive assistant inside Sugar Labs Pippy to help learners learn Python programming with intelligent hints and code explanations.',
    mentor: 'Walter Bender, Chihurumnaya Ibiam, Perrie',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/lccFY8AH',
    github: 'https://github.com/kshitijdshah99/Pippy_Activity',
    blog: 'https://medium.com/@sugarlabs/gsoc-2024-students-weekly-reports-6-and-7-9eacb78e4093',
  },
  {
    id: 'sharan-poojari',
    name: 'Sharan Poojari',
    initials: 'SP',
    programId: 'gsoc',
    org: 'NumFOCUS / AiiDA',
    project: 'Explore the Aiida Node graph in the browser',
    year: '2024',
    tech: ['React', 'JavaScript', 'REST API', 'Scientific Computing'],
    description:
      'Built an intuitive React-based graph exploration tool for AiiDA to inspect complex provenance relationships between scientific calculation nodes, inputs, and outputs in the browser.',
    mentor: 'Jusong Yu, eimrek',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/l9XgEOnp',
    github: 'https://github.com/aiidateam/aiida-explorer/blob/gsoc/gsoc/README.md',
    blog: 'https://aiida.net/blog/2024-10-17-google-summer-of-code/',
  },
  {
    id: 'vedant-mehra',
    name: 'Vedant Mehra',
    initials: 'VM',
    programId: 'gsoc',
    org: 'CERN-HSF / ROOT',
    project: 'SOFIE Developments - Inference Code Generation for Deep Learning models',
    year: '2024',
    tech: ['C++', 'Python', 'PyTorch', 'ONNX', 'ROOT SOFIE'],
    description:
      'Extended ROOT SOFIE system by implementing inference code generation for deep learning architectures with dynamic inputs and new neural network operators for high-energy physics.',
    mentor: 'Neel Shah, Dr. Lorenzo Moneta, Sanjiban Sengupta',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/6DDnly0z',
    github: 'https://github.com/extint/gsoc24-blog/blob/main/Final-Evaluation-Gsoc.md',
    blog: 'https://hepsoftwarefoundation.org/gsoc/blogs/2024/blog_SOFIE_VedantMehra.html',
  },
  {
    id: 'mayank-palan',
    name: 'Mayank Palan',
    initials: 'MP',
    programId: 'gsoc',
    org: 'Red Hen Lab',
    project: 'Modeling Wayfinding',
    year: '2024',
    tech: ['Python', 'Modeling', 'Simulation', 'Decision Making'],
    description:
      'Simulated decision-making in the single-celled organism Stentor roeselii, exploring environmental feedback, energy costs, and adaptive behaviour.',
    mentor: 'Mark Turner, Francis Steen, Ankit Gupta, Homa Hosseinmardi, Rajesh Kasturirangan, Santanu Chakraborty',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/fRdO8ACC',
    github: 'https://github.com/MayankPalan2004/Modeling-Wayfinding',
  },
  {
    id: 'raya-chakravarty',
    name: 'Raya Chakravarty',
    initials: 'RC',
    programId: 'gsoc',
    org: 'INCF / Neurobagel',
    project: 'A natural language interface for querying federated research data',
    year: '2024',
    tech: ['Python', 'React', 'LangChain', 'REST API', 'NLP'],
    description:
      'Built an LLM-powered natural language querying interface that converts free-form researcher questions into structured Neurobagel API queries across federated neuroscience data.',
    mentor: 'Jean-Baptiste Poline, Arman Jahanpour, Sebastian Urchs, Alyssa Dai, Brent McPherson',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/W7ATppvz',
    github: 'https://github.com/neurobagel/query-tool-ai',
    blog: 'https://raya679.github.io/gsoc/',
  },
  {
    id: 'tvisha-vedant',
    name: 'Tvisha Vedant',
    initials: 'TV',
    programId: 'gsoc',
    org: 'INCF / Neurobagel',
    project: 'LLM-assisted tool to annotate research data with machine-understandable, semantic data dictionaries',
    year: '2024',
    tech: ['Python', 'TypeScript', 'React', 'LangChain', 'Semantic Data'],
    description:
      'Developed an LLM-assisted tool to automatically harmonize and annotate tabular clinical and neuroimaging research data with semantic data dictionaries conforming to Neurobagel’s schema.',
    mentor: 'Jean-Baptiste Poline, Arman Jahanpour, Sebastian Urchs, Alyssa Dai, Brent McPherson',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/RbOlafUP',
    github: 'https://github.com/neurobagel/annotation-tool-ai',
    blog: 'https://tvilight4.github.io/MyBlog/',
  },
  {
    id: 'warren-jacinto',
    name: 'Warren Jacinto',
    initials: 'WJ',
    programId: 'gsoc',
    org: 'OpenAstronomy / GNUastro',
    project: 'OpenCL Integration with GNUAstro',
    year: '2024',
    tech: ['C', 'OpenCL', 'Parallel Computing', 'Astronomy'],
    description:
      'Implemented OpenCL-accelerated spatial convolution and astronomical image processing routines in GNU Astronomy Utilities (Gnuastro) for parallel GPU/CPU computation.',
    mentor: 'Mohammad Akhlaghi, Labib Asari',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/ehBYTrDa',
    github: 'https://github.com/DeadSpheroid/gnuastro/tree/final',
  },
  {
    id: 'dhruvanshu-joshi',
    name: 'Dhruvanshu Joshi',
    initials: 'DJ',
    programId: 'gsoc',
    org: 'INCF',
    project: 'Efficient app-based measurement of visual functions in infants and young children',
    year: '2024',
    tech: ['Python', 'Computer Vision', 'Deep Learning', 'Video Processing', 'UI/UX'],
    description:
      'Engineered real-time gaze tracking and preferential looking algorithms into a streamlined visual-function testing app for pediatric clinics to identify vision deficits early.',
    mentor: 'Dr. Suresh Krishna, Soham Mulye',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/Tkk88oFl',
    github: 'https://gist.github.com/Dhruvanshu-Joshi/a0c700cf55ec29ee45e0cc638b83edc5',
    blog: 'https://gist.github.com/Dhruvanshu-Joshi/a0c700cf55ec29ee45e0cc638b83edc5',
  },
  {
    id: 'om-doiphode',
    name: 'Om Doiphode',
    initials: 'OD',
    programId: 'gsoc',
    org: 'NumFOCUS / Data Retriever / DeepForest',
    project: 'Developing an Advanced Image Recognition Model for Bird Nest Detection in UAV Imagery',
    year: '2024',
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'UAV Imagery', 'PyTorch'],
    description:
      'Trained and benchmarked deep learning models in DeepForest to detect endangered wading bird colonies and nests from high-resolution drone imagery across the Florida Everglades.',
    mentor: 'Henry Senyondo, Benjamin Weinstein',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2024/projects/uN8mA5zq',
    github: 'https://gist.github.com/Om-Doiphode/77ac70ab14c9134182cebe6077480de1',
    blog: 'https://gist.github.com/Om-Doiphode/77ac70ab14c9134182cebe6077480de1',
  },
  {
    id: 'vaibhav-patel',
    name: 'Vaibhav Patel',
    initials: 'VP',
    programId: 'gsoc',
    org: 'Internet Archive / Open Library',
    project: 'Book-rating system for Open Library',
    year: '2024',
    tech: ['Python', 'JavaScript', 'Web Development', 'Open Library'],
    description:
      'Contributed to frontend and backend enhancements for book ratings, ratings components, and issue resolution in the Internet Archive Open Library repository.',
    mentor: 'Open Library Maintainers',
    projectLink: 'https://www.linkedin.com/posts/vaibhavpatel2892_openlibrary-openlibrary-gsoc-activity-7211661788323450882-93U9',
    github: 'https://github.com/noobCoderVP/openlibrary',
  },
  {
    id: 'smit-shah',
    name: 'Smit Shah',
    initials: 'SS',
    programId: 'gsoc',
    org: 'CERN-HSF / Compiler Research',
    project: 'Enable cross-talk between Python and C++ kernels in xeus-clang-REPL by using Cppyy',
    year: '2023',
    tech: ['C++', 'Python', 'Jupyter', 'Clang-REPL', 'cppyy'],
    description:
      'Enabled seamless cross-language interoperability and variable exchange between Python and C++ interactive Jupyter kernels using Clang-REPL and cppyy for high-energy physics workflows.',
    mentor: 'Baidyanath Kundu, Vassil Vassilev',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2023/projects/GGwZBrTf',
    github: 'https://gist.github.com/Smit1603/628b56019d19bfb6dd3bd5ee53f0eab1',
  },
  {
    id: 'dishie-vinchhi',
    name: 'Dishie Vinchhi',
    initials: 'DV',
    programId: 'gsoc',
    org: 'INCF / BraiNets',
    project: 'Optimization of the computations of HOIs and integration in the Frites python package',
    year: '2023',
    tech: ['Python', 'NumPy', 'JAX', 'Neuroscience', 'Parallel Computing'],
    description:
      'Optimized High-Order Interaction (HOI) and O-information calculations for neural population data using NumPy and JAX, developing plotting tools and integrating HOIs into Frites.',
    mentor: 'Daniele Marinazzo, Etienne Combrisson',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2023/projects/z6hGpvLS',
    github: 'https://github.com/brainets/hoi',
    blog: 'https://dishie2498.github.io/gsoc/',
  },
  {
    id: 'soham-mulye',
    name: 'Soham Mulye',
    initials: 'SM',
    programId: 'gsoc',
    org: 'INCF',
    project: 'Efficient app-based measurement of visual functions in infants and young children',
    year: '2023',
    tech: ['Python', 'OpenCV', 'PsychoPy', 'Neuroinformatics', 'Vision Assessment'],
    description:
      'Developed Automated Preferential Looking (APL), an app using computer vision and eye tracking to measure visual acuity and contrast sensitivity in young infants.',
    mentor: 'Dr. Suresh Krishna, Arvind Chandna, Yohaï-Eliel Berreby, Floris van Vugt',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2023/projects/NNz2NNsS',
    github: 'https://github.com/Shazam213/automated-preferential-looking',
  },
  {
    id: 'labib-asari',
    name: 'Labib Asari',
    initials: 'LA',
    programId: 'gsoc',
    org: 'OpenAstronomy / GNU Astronomy Utilities (Gnuastro)',
    project: 'Gnuastro Python Library and Cuda Integration',
    year: '2023',
    tech: ['C', 'Python', 'CUDA', 'NumPy', 'CPython', 'Astronomy'],
    description:
      "Created pyGnuastro CPython wrappers to access Gnuastro data structures from Python, and integrated GPU CUDA acceleration for fast astronomical image analysis.",
    mentor: 'Mohammad Akhlaghi, Jash Shah',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2023/projects/pwivQF02',
    github: 'https://github.com/labeeb-7z/cuda-gnu',
    blog: 'https://openastronomy.org/Universe_OA/posts/2023/08/20230822_0000_labeeb-7z/',
  },
  {
    id: 'siddheshsingh-tanwar',
    name: 'Siddheshsingh Tanwar',
    initials: 'ST',
    programId: 'gsoc',
    org: 'JdeRobot',
    project: 'Dockerization of Visual Circuit',
    year: '2023',
    tech: ['Docker', 'Python', 'JavaScript', 'React', 'ROS', 'Robotics'],
    description:
      'Containerized Visual Circuit with Docker and integrated it into Robotics Academy, enabling seamless browser-based deployment and simulation for robotics students.',
    mentor: 'José María Cañas, Toshan Luktuke',
    projectLink: 'https://summerofcode.withgoogle.com/archive/2023/projects/SPqrs4g7',
    github: 'https://github.com/JdeRobot/VisualCircuit/pull/222',
  },

  // ─── LFX Mentorship Contributors ─────────────────────────────────────────
  {
    id: 'rushabh-mehta-lfx',
    name: 'Rushabh Mehta',
    initials: 'RM',
    programId: 'lfx',
    org: 'CNCF',
    project: 'Improving Prometheus startup performance by enabling metric scraping to run in parallel with WAL replay',
    year: '2025',
    tech: ['Go', 'Prometheus', 'CNCF', 'WAL Replay', 'Distributed Systems'],
    description:
      'Refactoring Prometheus startup sequence to allow target scraping to begin immediately concurrently with WAL replay, eliminating monitoring gaps during server restarts.',
    mentor: 'Prometheus Maintainers',
    projectLink: 'https://github.com/prometheus/prometheus/issues/17058',
    github: 'https://github.com/prometheus/prometheus/issues/17058',
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
    tech: ['C++', 'Rust', 'WebAssembly', 'WasmEdge', 'bitnet.cpp', 'WASI-NN'],
    description:
      'Built a WASI-NN backend plugin for WasmEdge integrating Microsoft BitNet.cpp to execute ultra-efficient 1-bit quantized LLMs on edge CPU hardware without GPU requirements.',
    mentor: 'WasmEdge Maintainers',
    projectLink: 'https://github.com/WasmEdge/WasmEdge/issues/4110',
    github: 'https://github.com/WasmEdge/WasmEdge/issues/4110',
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
    tech: ['Julia', 'Symbolic Computation', 'PINNs', 'SciML', 'NeuralPDE'],
    description:
      'Built symbolic parsing tools for generating optimized loss functions for Physics-Informed Neural Networks (PINNs) in Julia, and contributed to core SciML packages.',
    mentor: 'SciML / Julia Maintainers',
    projectLink: 'https://julialang.org/jsoc/',
    github: 'https://github.com/SciML/NeuralPDE.jl',
  },
];

