/* ============================================================
   EVENTS ARCHIVE - single source of truth.
   ============================================================ */

export interface CoCEvent {
  id: string;
  name: string;
  /** display date, e.g. "March 2026" */
  date: string;
  /** ISO date string for sorting, e.g. "2026-10-15" */
  isoDate: string;
  location: string;
  /** punchy one-liner for the grid card */
  summary: string;
  /** longer 2-4 sentence version for the modal */
  description: string;
  /** "Rs.15,000" for competitive events, "N/A" otherwise */
  prizePool: string;
  photos: string[];
  /** if true, render the "Upcoming" badge on the card */
  upcoming?: boolean;
}

export const EVENTS: CoCEvent[] = [
  /* ──────────────── 2025–2026 Academic Year Events ──────────────── */
  {
    id: 'routequest-2026',
    name: 'RouteQuest',
    date: '23rd April 2026',
    isoDate: '2026-04-23',
    location: 'AL001, Lab 2/3, VJTI',
    summary: 'FY only CTF league, season closing event.',
    description:
      "RouteQuest is CoC's FY only Capture The Flag league and the final, season closing event for all first years. No prior experience is needed, just curiosity and smart thinking, as participants pitch, hack and prevail through challenges to test their skills.",
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/routequest.png'],
  },
  {
    id: 'codehunt-2026',
    name: 'Codehunt',
    date: '9th April 2026',
    isoDate: '2026-04-09',
    location: 'Lab 2/3 and AL001, VJTI',
    summary: 'CP and treasure hunt event for first years.',
    description:
      "Codehunt is CoC's flagship event held every year exclusively for first years, blending competitive programming with a treasure hunt. Teams search for hidden QR codes that test sharpness and attention to detail, while solving simple math and logic based problems in C++, Java or Python. It doubles as a way to form teams and build confidence for future competitions, both within and outside college.",
    prizePool: 'Top 3 Cash Prizes',
    photos: ['/photos/2026/codehunt.png'],
  },
  {
    id: 'icpc-vjti-2026',
    name: 'ICPC VJTI Internal Round',
    date: 'March 2026',
    isoDate: '2026-03-01',
    location: 'College Labs, VJTI',
    summary: "Internal round to select VJTI's ICPC teams.",
    description:
      "VJTI's internal selection round for the ICPC (International Collegiate Programming Contest), conducted to form and shortlist the strongest teams of three to represent the institute at the ICPC Regionals. Participants are tested on competitive programming and algorithmic problem-solving under contest conditions, with top-performing teams advancing to represent VJTI at the regional level.",
    prizePool: 'N/A',
    photos: ['/photos/2026/icpc2.jpeg'],
  },
  {
    id: 'inheritance-2025-26',
    name: 'Inheritance 2025-26',
    date: 'November 2025 – February 2026',
    isoDate: '2026-02-15',
    location: 'VJTI',
    summary: "CoC's flagship mentorship program across Web, App, Web3 and AI/ML.",
    description:
      "Inheritance is Community of Coders' flagship mentorship program, for the juniors, by the seniors. Participants pick a domain, pitch their ideas, and build projects with guidance from mentors, exploring Web Development, App Development, Machine Learning, Blockchain and Cybersecurity.",
    prizePool: 'N/A',
    photos: ['/photos/2026/inheritance.png'],
  },
  {
    id: 'hackxcelerate-2026',
    name: 'HackXcelerate 2026',
    date: '14th February 2026',
    isoDate: '2026-02-14',
    location: 'VJTI, Mumbai',
    summary: '12 hour on campus hackathon for sustainable solutions.',
    description:
      'HackXcelerate 2026 is an electrifying 12 hour on campus hackathon focused on innovation, competition and collaboration. Teams build smart, sustainable solutions to create a cleaner, greener campus, competing across 2 tracks with several sub features. Special prizes are offered for first years.',
    prizePool: 'Rs.35,000',
    photos: ['/photos/2026/hackX.jpeg', '/photos/2026/HackXacc.png'],
  },
  {
    id: 'routing-rush-2026',
    name: 'Routing Rush (CodeVerse 2.0)',
    date: '1st February 2026',
    isoDate: '2026-02-01',
    location: 'VJTI',
    summary: 'Maze based coding and strategy showdown.',
    description:
      "Get ready for an electrifying contest where teams navigate a strategic 4-quadrant maze from any corner node toward the Central Core! Progress by solving coding challenges to unlock Gates, with the freedom to Retreat and explore alternative paths if you hit a roadblock, though time spent won't be refunded. Your mission is to crack a chain of 3 problems to reach the Core and face the ultimate Final Boss challenge. The Champion title goes to the first team submitting an Accepted solution to the Final Boss. If no one conquers it or multiple teams succeed simultaneously, rankings pivot to the fastest time reaching the deepest maze level.",
    prizePool: 'Rs.10,000',
    photos: ['/photos/2026/routerush.png'],
  },
  {
    id: 'the-lost-probe-2026',
    name: 'The Lost Probe (CodeVerse 2.0)',
    date: '1st February 2026',
    isoDate: '2026-02-01',
    location: 'VJTI',
    summary: 'Real time ML forecasting challenge.',
    description:
      '2147 AD. Deep Space Sector 9. The autonomous rover ORION-7 was deployed to explore a newly discovered planet on the edge of human-charted space. It was designed to be intelligent and self-correcting, but it has suddenly gone rogue. The probe continues to transmit telemetry, but its diagnostics are incomplete. Sensor readings may exhibit delayed effects, where past observations influence future motion. Your task is to build a Machine Learning model to understand ORION-7’s motion and forecast its future trajectory.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/lostprobe.jpeg', '/photos/2026/lostprobe2.png'],
  },
  {
    id: 'coderush-2026',
    name: 'CodeRush (CodeVerse 2.0)',
    date: '1st February 2026',
    isoDate: '2026-02-01',
    location: 'VJTI',
    summary: 'Fast paced competitive programming round.',
    description:
      'CodeRush is an individual competitive programming contest that puts your problem-solving speed and algorithmic accuracy to the test. Participants must solve a set of coding challenges within a limited time, where every correct submission pushes them closer to the top of the leaderboard.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/coderush.jpeg', '/photos/2026/coderush.png'],
  },
  {
    id: 'cache-control-2026',
    name: 'Cache Control (CodeVerse 2.0)',
    date: '1st February 2026',
    isoDate: '2026-02-01',
    location: 'VJTI',
    summary: 'Systems based challenge on state and memory.',
    description:
      'Welcome to Cache Control, an immersive systems experience where memory never forgets only caches. Observe hidden behavior, learn how state evolves, and take control of a living system in this four-stage challenge. The goal is to progress through four sequential stages by understanding how the system remembers, caches, and reacts to your actions. Success depends on careful observation, precise interaction, and strategic decision-making, not speed or heavy coding.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/cache.png'],
  },
  {
    id: 'capture-the-proof-2026',
    name: 'Capture The Proof (CodeVerse 2.0)',
    date: '31st January 2026',
    isoDate: '2026-01-31',
    location: 'VJTI',
    summary: 'Blockchain inspired CTF challenge.',
    description:
      '“Capture the Proof” is a Capture The Flag (CTF) style event where participants solve blockchain-inspired challenges. The event encourages logical thinking, problem-solving, and understanding decentralized systems, all without heavy coding requirements.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/capturetheproof.png'],
  },
  {
    id: 'pixel-perfect-2026',
    name: 'Pixel Perfect (CodeVerse 2.0)',
    date: '31st January 2026',
    isoDate: '2026-01-31',
    location: 'VJTI',
    summary: 'Pixel perfect UI building with HTML and CSS.',
    description:
      'A competitive frontend engineering event where participants replicate complex visual targets using only raw HTML and CSS. Over two distinct rounds totaling three hours, developers must balance pixel-perfect accuracy with code efficiency to achieve the highest automated score. This event rigorously tests mastery of the browser rendering engine, creative problem-solving, and attention to detail, shifting focus from functional logic to pure visual precision.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/pixelperfect.jpeg', '/photos/2026/pixelperfect.png'],
  },
  {
    id: 'project-siuca-2026',
    name: 'Project SIUCA (CodeVerse 2.0)',
    date: '31st January 2026',
    isoDate: '2026-01-31',
    location: 'VJTI',
    summary: 'Outsmart an AI using prompt engineering.',
    description:
      'A high-stakes adversarial engineering competition set in a post-apocalyptic world where machines have taken over. Participants must bypass the security protocols of an advanced Large Language Model (LLM). Over the duration of the contest, "operatives" must craft precise, semantic injection attacks to trick the AI into revealing hidden secrets. This event tests mastery of natural language logic, semantic obfuscation, and understanding of LLM guardrails, shifting focus from traditional syntax coding to linguistic hacking. Each level is based on a concept from theoretical AI; the lesser the tokens used, the better the score!',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/siuca.png'],
  },
  {
    id: 'on-chain-odyssey-2026',
    name: 'On-Chain Odyssey (CodeVerse 2.0)',
    date: '30th January 2026',
    isoDate: '2026-01-30',
    location: 'VJTI',
    summary: 'Campus wide blockchain treasure hunt.',
    description:
      'A campus-wide race where teams find QR codes to unlock blockchain riddles. Participants use mobile wallets to collect 5 unique "Artifact NFTs" at different stations. The Twist: Some clues are hidden within public transaction data (Etherscan) for players to decode. The first team to present a wallet containing all 5 digital artifacts wins the prize. A zero-coding, fun introduction to wallets, NFTs, and on-chain transparency.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/odyssey.png'],
  },
  {
    id: 'debug-a-thon-2026',
    name: 'Debug-A-Thon (CodeVerse 2.0)',
    date: '30th January 2026',
    isoDate: '2026-01-30',
    location: 'VJTI',
    summary: 'Real world debugging challenge in Python and full stack.',
    description:
      'A collaborative technical challenge where teams of two rigorously identify and resolve syntax, logic, and runtime errors. This event tests code comprehension, algorithmic efficiency, and pair-programming synergy, requiring duos to analyze broken implementations and execute precise, functional fixes under strict time constraints.',
    prizePool: 'Rs.5,000',
    photos: ['/photos/2026/debugathon.jpeg', '/photos/2026/debugathon.png'],
  },
  {
    id: 'webgenesis-2026',
    name: 'Webgenesis',
    date: 'January 2026',
    isoDate: '2026-01-25',
    location: 'VJTI',
    summary: 'Web development mentorship program by CoC.',
    description:
      'Webgenesis is a mentorship program by seniors, for juniors, requiring no prior knowledge. Participants get hands on guidance and work on real projects to build and grow their web development skills alongside mentors who have been through the same journey.',
    prizePool: 'N/A',
    photos: ['/photos/2026/webgenesis.png'],
  },
  {
    id: 'eth-evening-2025',
    name: 'ETH Evening',
    date: '8th October 2025',
    isoDate: '2025-10-08',
    location: 'AL001, VJTI',
    summary: 'DeFi focused blockchain talk by CoC.',
    description:
      'ETH Evening was a blockchain and crypto focused session by Community of Coders, exploring decentralized finance and its role in shaping the future of Web3, centered around the idea of going from blocks to breakthroughs.',
    prizePool: 'N/A',
    photos: ['/photos/2026/ethhevening.png'],
  },
  {
    id: 'project-x-2025',
    name: 'Project X',
    date: '15th July 2025',
    isoDate: '2025-07-15',
    location: 'VJTI',
    summary: "VJTI's senior-led mentorship program for junior developers.",
    description:
      "Project X is Community of Coders' flagship mentorship program at VJTI, where selected juniors are paired with senior mentors to build challenging projects across domains like ML, web dev, and systems. Selected mentees work through a structured, project-based curriculum, gaining hands-on exposure and skills over the course of the program.",
    prizePool: 'N/A',
    photos: ['/photos/2026/ProjectX.png'],
  },

  /* ──────────────── 2024–2025 Events ──────────────── */
  {
    id: 'codeverse',
    name: 'CodeVerse',
    date: 'April 2025',
    isoDate: '2025-04-10',
    location: 'VJTI',
    summary: 'Flagship annual tech festival bringing together developers across competitive tracks.',
    description:
      "The inaugural edition of Community of Coders' flagship annual technical festival at VJTI. CodeVerse brought together hundreds of student builders across domains spanning AI, Web3, competitive programming, and systems engineering for multi-day competitive showdowns and hands-on workshops.",
    prizePool: 'N/A',
    photos: ['/photos/2025/codeverseceremony.jpg', '/photos/2025/codeverseteam.jpg'],
  },
  {
    id: 'ai-vs-human',
    name: 'AI vs Human',
    date: 'March 2025',
    isoDate: '2025-03-20',
    location: 'VJTI',
    summary: 'An epic showdown pitting human intuition and coding against modern AI models.',
    description:
      'A high-intensity competition where student developers went head-to-head with modern generative AI models on complex programming and logic puzzles. Participants tested prompt engineering efficiency and algorithmic speed to determine whether human ingenuity or AI assistance claims victory under pressure.',
    prizePool: 'N/A',
    photos: ['/photos/2025/aivshuman.JPG'],
  },
  {
    id: 'api-murder-mystery',
    name: 'API Murder Mystery',
    date: 'February 2025',
    isoDate: '2025-02-15',
    location: 'VJTI',
    summary: 'Solve clues, authenticate endpoints, and uncover the culprit by querying APIs.',
    description:
      'An investigative developer contest structured as a digital murder mystery. Participants queried REST APIs, decrypted hidden payloads, chained webhooks, and navigated multi-tier backend endpoints to piece together forensic clues and identify the culprit before time ran out.',
    prizePool: 'N/A',
    photos: ['/photos/2025/apimurder.JPG'],
  },
  {
    id: 'tech-auction',
    name: 'Tech Auction',
    date: 'November 2024',
    isoDate: '2024-11-10',
    location: 'VJTI',
    summary: 'Strategic bidding and team building tech auction.',
    description:
      'A high-stakes strategy and bidding event where teams managed virtual budgets to auction for programming languages, algorithms, and developer assets. Squads strategized asset allocations to formulate winning combinations against opponent teams in rapid evaluation rounds.',
    prizePool: 'N/A',
    photos: ['/photos/2025/auction.jpg'],
  },
  {
    id: 'debugathon',
    name: 'Debugathon',
    date: 'October 2024',
    isoDate: '2024-10-05',
    location: 'VJTI CSE Lab',
    summary: 'Fast-paced competitive debugging and error-squashing showdown.',
    description:
      'A high-speed competitive debugging showdown testing algorithmic error detection, memory leak resolution, and syntax fixes across challenging legacy codebases. Teams raced against the clock to pass automated unit suites and climb the leaderboard.',
    prizePool: 'N/A',
    photos: ['/photos/2025/debugathon.jpg'],
  },
  {
    id: 'eth-ctf',
    name: 'ETH CTF',
    date: 'August 2024',
    isoDate: '2024-08-18',
    location: 'VJTI',
    summary: 'Capture the Flag competition focusing on Web3 and smart contract security.',
    description:
      'A blockchain-focused Capture The Flag competition exploring decentralized systems, smart contract vulnerabilities, transaction reentrancy, and cryptographic puzzles. Participants dissected on-chain protocols to exploit security loopholes and recover flag tokens.',
    prizePool: 'N/A',
    photos: ['/photos/2025/ethctf.jpg'],
  },
  {
    id: 'grid-of-doom',
    name: 'Grid of Doom',
    date: 'April 2024',
    isoDate: '2024-04-12',
    location: 'VJTI',
    summary: 'Navigate the grid, solve challenges, and survive the obstacles.',
    description:
      'A dynamic grid-based competitive programming tournament where participants navigated a multi-dimensional challenge matrix. Teams solved increasingly difficult algorithmic obstacles at each coordinate while evading penalty zones to reach the final node.',
    prizePool: 'N/A',
    photos: ['/photos/2025/gridofdoom.jpg'],
  },
  {
    id: 'pixel-pursuit',
    name: 'Pixel Pursuit',
    date: 'March 2024',
    isoDate: '2024-03-08',
    location: 'VJTI',
    summary: 'Pure CSS design replication and visual precision showdown.',
    description:
      'A fast-paced CSS-only frontend competition where participants replicated intricate target designs using pure CSS styling. Developers demonstrated browser layout mastery, creative CSS trickery, and pixel-accurate visual precision under strict time limits without using JavaScript.',
    prizePool: 'N/A',
    photos: ['/photos/2025/pixelpursuit.jpg'],
  },
  {
    id: 'travelling-coder',
    name: 'Travelling Coder',
    date: 'November 2023',
    isoDate: '2023-11-25',
    location: 'VJTI',
    summary: 'Route optimization and strategic pathfinding coding showdown.',
    description:
      'A competitive programming showdown centered on route optimization, network graphs, and efficient pathfinding. Competitors tackled complex graph traversal and shortest-path scenarios inspired by the classic Travelling Salesperson Problem to construct optimal solutions under rigorous automated test suites.',
    prizePool: 'N/A',
    photos: ['/photos/2025/travellingcoder.jpg'],
  },
];

/* sorted newest-first by isoDate */
EVENTS.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
