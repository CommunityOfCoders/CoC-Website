/* ============================================================
   TEAM ROSTER — dummy data, single source of truth.
   Mirrors eventsData.ts / placeholderImages.ts: portraits are
   Unsplash stock stand-ins shown as real, untinted photography.
   To swap in real members: edit the entries below; drop real
   portraits into /public/photos/ and point the URLs there.
   ============================================================ */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export interface TeamMember {
  id: string;
  name: string;
  /** designation, set in DM Mono uppercase */
  role: string;
  /** one-liner for the collapsed card */
  tagline: string;
  /** fuller 2–3 sentence bio for the expanded view */
  bio: string;
  photo: string;
  github: string;
  linkedin: string;
}

export const TEAM: TeamMember[] = [
  {
    id: 'avanish-salunke',
    name: 'Avanish Salunke',
    role: 'Secretary',
    tagline: 'Building the next chapter of CoC.',
    bio: 'Secretary of the Council of Coders, helping drive operations, coordination, and community initiatives across the council.',
    photo: u('photo-1500648767791-00dcc994a43e'),
    github: 'https://github.com/AvanishSalunke',
    linkedin: 'https://linkedin.com/in/avanishsalunke',
  },
  {
    id: 'nihira-neralwar',
    name: 'Nihira Neralwar',
    role: 'Secretary',
    tagline: 'Turning ideas into action.',
    bio: 'Secretary of the Council of Coders, focused on enabling collaboration and ensuring the community continues to grow and thrive.',
    photo: u('photo-1494790108377-be9c29b29330'),
    github: 'https://github.com/nihira20',
    linkedin: 'https://www.linkedin.com/in/nihira-neralwar-307538337/',
  },
  {
    id: 'kavish-nasta',
    name: 'Kavish Nasta',
    role: 'AIDSET / BRAIN Head',
    tagline: 'Leading innovation through AI and technology.',
    bio: 'Co-head of AIDSET/BRAIN, driving initiatives, workshops, and projects that explore the future of artificial intelligence.',
    photo: u('photo-1472099645785-5658abf4ff4e'),
    github: 'https://github.com/kavishnasta',
    linkedin: 'https://www.linkedin.com/in/kavish-nasta-4772a1218/',
  },
  {
    id: 'bianca-sawant',
    name: 'Bianca Sawant',
    role: 'AIDSET / BRAIN Head',
    tagline: 'Empowering students through AI.',
    bio: 'Co-head of AIDSET/BRAIN, working to build impactful learning experiences and foster innovation in AI.',
    photo: u('photo-1534528741775-53994a69daeb'),
    github: 'https://github.com/star-lord1234',
    linkedin: 'https://linkedin.com/in/bianca-sawant-ba7963308',
  },
  {
    id: 'aryan-daga',
    name: 'Aryan Daga',
    role: 'Project X Head',
    tagline: 'Turning ambitious ideas into reality.',
    bio: 'Co-head of Project X, leading high-impact projects and encouraging members to push beyond conventional boundaries.',
    photo: u('photo-1507003211169-0a1dd7228f2d'),
    github: 'https://github.com/dagaaryan011',
    linkedin: 'https://www.linkedin.com/in/aryan-daga-288542324/',
  },
  {
    id: 'vaishnavi-sanap',
    name: 'Vaishnavi Sanap',
    role: 'Project X Head',
    tagline: 'Building projects that create impact.',
    bio: 'Co-head of Project X, focused on innovation, execution, and fostering a culture of problem-solving.',
    photo: u('photo-1544005313-94ddf0286df2'),
    github: 'https://github.com/shnavii11',
    linkedin: 'https://www.linkedin.com/in/vaishnavi-sanap/',
  },
  {
    id: 'jinmay-jhaveri',
    name: 'Jinmay Jhaveri',
    role: 'Treasurer',
    tagline: 'Keeping every initiative sustainable.',
    bio: 'Treasurer of CoC, managing finances, sponsorship allocations, and ensuring smooth execution of council activities.',
    photo: u('photo-1506794778202-cad84cf45f1d'),
    github: 'https://github.com/Borrus-sudo',
    linkedin: 'https://www.linkedin.com/in/jinmay-jhaveri',
  },
  {
    id: 'awwab-wadekar',
    name: 'Awwab Wadekar',
    role: 'CP Head',
    tagline: 'Growing the competitive programming culture.',
    bio: 'Leads the Competitive Programming wing, organizing contests, practice sessions, and coding challenges for the community.',
    photo: u('photo-1519085360753-af0119f7cbe7'),
    github: 'https://github.com/Once-1296',
    linkedin: 'https://www.linkedin.com/in/awwab-wadekar-a42a65330/',
  },
  {
    id: 'pratyush-rao',
    name: 'Pratyush Rao',
    role: 'Dev Head',
    tagline: 'Building products, not just projects.',
    bio: 'Heads the Development wing, mentoring developers and leading technical initiatives across CoC.',
    photo: u('photo-1539571696357-5a69c17a67c6'),
    github: 'https://github.com/PratyushRao',
    linkedin: 'https://www.linkedin.com/in/pratyushrao06/',
  },
  {
    id: 'ankita-sagar',
    name: 'Ankita Sagar',
    role: 'Design Head',
    tagline: 'Crafting the visual identity of CoC.',
    bio: 'Leads the Design team, ensuring every event, campaign, and project reflects a strong and cohesive brand.',
    photo: u('photo-1438761681033-6461ffad8d80'),
    github: 'https://github.com/Sagarankita',
    linkedin: 'https://www.linkedin.com/in/ankitasagar/',
  },
  {
    id: 'ojas-alai',
    name: 'Ojas Alai',
    role: 'Sponsorship Head',
    tagline: 'Building partnerships that create opportunities.',
    bio: 'Co-head of Sponsorships, connecting CoC with industry partners and enabling larger opportunities for members.',
    photo: u('photo-1500648767791-00dcc994a43e'),
    github: 'https://github.com/ojasalai27',
    linkedin: 'https://www.linkedin.com/in/ojasalai/',
  },
  {
    id: 'sanskar-tarte',
    name: 'Sanskar Tarte',
    role: 'Sponsorship Head',
    tagline: 'Turning collaborations into impact.',
    bio: 'Co-head of Sponsorships, focused on strategic partnerships and supporting the growth of council initiatives.',
    photo: u('photo-1507003211169-0a1dd7228f2d'),
    github: 'https://github.com/snaksartrate',
    linkedin: 'https://www.linkedin.com/in/sanskar-tarte-67b5b2293/',
  },
  {
    id: 'dhiraj-shirse',
    name: 'Dhiraj Shirse',
    role: 'PR Head',
    tagline: 'Amplifying the voice of CoC.',
    bio: 'Co-head of Public Relations, leading outreach, engagement, and communication across the community.',
    photo: u('photo-1517841905240-472988babdf9'),
    github: 'https://github.com/Dhiraj201226',
    linkedin: 'https://linkedin.com/in/dhiraj-shirse-645445328/',
  },
  {
    id: 'pratik-shewale',
    name: 'Pratik Shewale',
    role: 'PR Head',
    tagline: 'Connecting CoC with the campus.',
    bio: 'Co-head of Public Relations, working on community engagement, branding, and communication initiatives.',
    photo: u('photo-1487412720507-e7ab37603c6f'),
    github: 'https://github.com/PratikShewale21',
    linkedin: 'https://www.linkedin.com/in/pratik-shewale-829194338',
  },
];