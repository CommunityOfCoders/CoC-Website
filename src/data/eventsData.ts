/* ============================================================
   EVENTS ARCHIVE — dummy data, single source of truth.
   Mirrors placeholderImages.ts: all photos are Unsplash stock
   stand-ins (real tech-event photography, no tint washes).
   To swap in real content: edit the entries below; drop real
   photos into /public/photos/ and point the URLs there.
   ============================================================ */

const u = (id: string, w = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export interface CoCEvent {
  id: string;
  name: string;
  /** display date, e.g. "March 2026" */
  date: string;
  location: string;
  /** punchy one-liner for the grid card */
  summary: string;
  /** longer 2–4 sentence version for the modal */
  description: string;
  /** "₹15,000" for competitive events, "N/A" otherwise */
  prizePool: string;
  /** exactly 2 photos per event for now */
  photos: string[];
}

export const EVENTS: CoCEvent[] = [
  {
    id: 'hack8-2026',
    name: 'Hack8 — 24hr Hackathon',
    date: 'March 2026',
    location: 'VJTI Auditorium',
    summary: '340 hackers, 61 submissions, one sleepless night.',
    description:
      'The eighth edition of our flagship 24-hour hackathon, and the biggest yet. 340 participants across 85 teams built everything from campus tools to ML-powered accessibility apps, judged by alumni now at product companies. The auditorium did not sleep, and neither did the organizing team.',
    prizePool: '₹75,000',
    photos: [u('photo-1504384308090-c894fdcc538d'), u('photo-1515187029135-18ee286d815b')],
  },
  {
    id: 'woc-2026',
    name: 'Winter of Code, Cohort 4',
    date: 'January 2026',
    location: 'VJTI CSE Lab',
    summary: '28 first-time contributors merged their first PRs.',
    description:
      'A five-week mentored sprint that takes first- and second-years from "what is a fork?" to merged pull requests on community repos. Cohort 4 paired 28 newcomers with senior mentors, ran weekly review clinics, and ended with every single participant landing at least one PR.',
    prizePool: 'N/A',
    photos: [u('photo-1522202176988-66273c2fd55f'), u('photo-1556761175-b413da4baf72')],
  },
  {
    id: 'oso-2025',
    name: 'Open Source October',
    date: 'October 2025',
    location: 'VJTI CSE Lab',
    summary: '120+ PRs across community repos in one month.',
    description:
      'Our month-long open-source festival: issues triaged and labelled across every CoC repo, nightly review windows, and a public leaderboard. The community merged over 120 pull requests in 31 days, and two participants went on to become repo maintainers.',
    prizePool: 'N/A',
    photos: [u('photo-1519389950473-47ba0277781c'), u('photo-1531482615713-2afd69097998')],
  },
  {
    id: 'llm-workshop-2025',
    name: 'Intro to LLMs Workshop',
    date: 'August 2025',
    location: 'VJTI Seminar Hall',
    summary: 'Tokenizers to a working RAG demo in three hours.',
    description:
      'A hands-on session that cut through the hype: how transformers actually work, what a tokenizer does, and why context windows matter. Every attendee left with a small retrieval-augmented chatbot running locally against the college syllabus. Slides and code stayed public in the community repo.',
    prizePool: 'N/A',
    photos: [u('photo-1517245386807-bb43f82c33c4'), u('photo-1524178232363-1fb2b075b655')],
  },
  {
    id: 'sysdesign-talk-2024',
    name: 'Systems Design Talk',
    date: 'September 2024',
    location: 'VJTI Seminar Hall',
    summary: 'An alum on scaling real systems past the whiteboard.',
    description:
      'An evening talk by a CoC alum, now an infrastructure engineer, on what systems design interviews get right and wrong about production reality. Load balancers, queues and the art of boring technology — followed by an hour of unfiltered Q&A that ran well past schedule.',
    prizePool: 'N/A',
    photos: [u('photo-1540575467063-178a50c2df87'), u('photo-1505373877841-8d25f7d46678')],
  },
  {
    id: 'algo-arena-2024',
    name: 'Algo Arena Finals',
    date: 'February 2024',
    location: 'VJTI Computer Centre',
    summary: 'Five rounds, 200 entrants, one on-site showdown.',
    description:
      'The final round of our semester-long competitive programming ladder, run on our in-house judge with live leaderboards on the big screen. Two hundred entrants over five online rounds were cut down to thirty finalists competing on-site. The winning solve of the last problem landed with ninety seconds on the clock.',
    prizePool: '₹15,000',
    photos: [u('photo-1461749280684-dccba630e2f6'), u('photo-1552664730-d307ca884978')],
  },
  {
    id: 'demo-day-2023',
    name: 'Project Demo Day',
    date: 'April 2023',
    location: 'VJTI Auditorium',
    summary: 'A semester of side projects, shipped and on stage.',
    description:
      'End-of-year showcase where members demo what they actually shipped — no slideware allowed, live products only. Twelve teams presented, including the first public demo of Campus Compass, which the whole campus now uses for fest navigation.',
    prizePool: 'N/A',
    photos: [u('photo-1528901166007-3784c7dd3653'), u('photo-1511632765486-a01980e01a18')],
  },
  {
    id: 'codestorm-2021',
    name: 'CodeStorm Hackathon',
    date: 'March 2021',
    location: 'VJTI CSE Lab',
    summary: 'The hybrid-era hackathon that refused to be cancelled.',
    description:
      'Run in the thick of the hybrid semester: 48 hours, teams split between the lab and home, standups over video calls. The constraint became the theme — most winning projects were tools for remote collaboration and campus life at a distance.',
    prizePool: '₹25,000',
    photos: [u('photo-1522071820081-009f0129c71c'), u('photo-1543269865-cbf427effbad')],
  },
  {
    id: 'git-101-2017',
    name: 'Git & GitHub 101',
    date: 'July 2017',
    location: 'VJTI CSE Lab',
    summary: 'The workshop that started the PR-review culture.',
    description:
      'An early hands-on workshop teaching branches, rebases and pull requests to a packed lab. It seeded the review-first culture the community still runs on — several attendees became the seniors who now read first-years’ PRs the way industry will.',
    prizePool: 'N/A',
    photos: [u('photo-1529156069898-49953e39b3ac'), u('photo-1551288049-bebda4e38f71')],
  },
  {
    id: 'first-commit-2016',
    name: 'First Commit — Freshers’ Orientation',
    date: 'August 2016',
    location: 'VJTI Seminar Hall',
    summary: 'Where it all began: the founding batch’s first session.',
    description:
      'The very first CoC session: a room of freshers, a borrowed projector, and a promise that everything built here would ship in public. The founding batch pushed their first commits to a shared repo that same evening — the repo, and the tradition, are still alive.',
    prizePool: 'N/A',
    photos: [u('photo-1515187029135-18ee286d815b'), u('photo-1505373877841-8d25f7d46678')],
  },
];
