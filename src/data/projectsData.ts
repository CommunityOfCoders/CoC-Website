import { IMG } from './placeholderImages';

/* ============================================================
   PLACEHOLDER — same three projects already teased on the
   homepage (see components/home/FeaturedProjects.tsx), extended
   with fuller detail-view copy. Swap for the real shipped-project
   list (name, tagline, description, tech, github/demo links, a
   real screenshot per project) before this page goes out for
   promotion — nothing here should be presented as real to visitors.
   ============================================================ */

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

export const CATEGORIES = ['All', 'Web', 'Systems', 'Data'] as const;

export const PROJECTS: Project[] = [
  {
    id: 'campus-compass',
    name: 'Campus Compass',
    tagline: 'Indoor navigation PWA for the VJTI campus.',
    description:
      'Timetables, a room-finder and fest maps in one installable web app. Built for the first week of college, when nobody — including the seniors — remembers where H-building actually is.',
    category: 'Web',
    tech: ['React', 'Node', 'PWA'],
    image: IMG.projectA,
  },
  {
    id: 'gradevault',
    name: 'GradeVault',
    tagline: 'Results analytics for students.',
    description:
      'Semester trends, SGPA projections and branch-level insights pulled from public result data. Built so students can see where they actually stand, not just their own number in isolation.',
    category: 'Data',
    tech: ['Next.js', 'Postgres'],
    image: IMG.projectB,
  },
  {
    id: 'coc-judge',
    name: 'CoC Judge',
    tagline: "Our in-house contest judge.",
    description:
      'Sandboxed code execution with live leaderboards, built to run every Algo Arena without leaning on a third-party judging platform. Handles concurrent submissions across a full lab of machines.',
    category: 'Systems',
    tech: ['Go', 'Docker', 'Redis'],
    image: IMG.projectC,
  },
];
