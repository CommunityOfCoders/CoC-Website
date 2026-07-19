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
    id: 'aarav-deshmukh',
    name: 'Aarav Deshmukh',
    role: 'Chairperson',
    tagline: 'Keeps the whole circus running on time.',
    bio: 'Final-year CS, third year in the council. Ran Hack8 end to end and still answers the group chat at 1am. Believes the community works because seniors show up for juniors, and organizes accordingly.',
    photo: u('photo-1507003211169-0a1dd7228f2d'),
    github: 'https://github.com/aaravd',
    linkedin: 'https://linkedin.com/in/aarav-deshmukh',
  },
  {
    id: 'ishita-kulkarni',
    name: 'Ishita Kulkarni',
    role: 'General Secretary',
    tagline: 'The calendar, the minutes, and the memory of CoC.',
    bio: 'Third-year IT. Turned the council’s tribal knowledge into documented process — every event now ships with a runbook. If something happened in CoC in the last two years, she has the notes.',
    photo: u('photo-1494790108377-be9c29b29330'),
    github: 'https://github.com/ishitak',
    linkedin: 'https://linkedin.com/in/ishita-kulkarni',
  },
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    role: 'Lead — Open Source Wing',
    tagline: 'Reviews first PRs like industry will, but kinder.',
    bio: 'Maintains three community repos and mentors Winter of Code cohorts. Merged his own first PR here as a fresher and has paid it forward ever since. Strong opinions about commit messages, all of them correct.',
    photo: u('photo-1500648767791-00dcc994a43e'),
    github: 'https://github.com/rohanm',
    linkedin: 'https://linkedin.com/in/rohan-mehta',
  },
  {
    id: 'sneha-iyer',
    name: 'Sneha Iyer',
    role: 'Events Coordinator',
    tagline: 'Has never met a logistics problem she couldn’t solve.',
    bio: 'Second-year EXTC who somehow makes 340-person hackathons look easy. Handles venues, sponsors, catering and the inevitable 3am crisis with the same calm. The reason Hack8 wrapped on schedule.',
    photo: u('photo-1438761681033-6461ffad8d80'),
    github: 'https://github.com/snehaiyer',
    linkedin: 'https://linkedin.com/in/sneha-iyer',
  },
  {
    id: 'arjun-nair',
    name: 'Arjun Nair',
    role: 'Tech Lead — Web',
    tagline: 'Ships the sites you’re looking at right now.',
    bio: 'Third-year CS. Leads the web team behind this site, the contest judge and Campus Compass. Runs weekly code reviews where first-years ship to production — terrifying for them, great for the campus.',
    photo: u('photo-1472099645785-5658abf4ff4e'),
    github: 'https://github.com/arjunnair',
    linkedin: 'https://linkedin.com/in/arjun-nair',
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Design Lead',
    tagline: 'Everything you see that looks good — that’s her.',
    bio: 'Third-year Production with a designer’s eye and an engineer’s process. Owns the brand, the posters and this design system. Fights for whitespace and usually wins.',
    photo: u('photo-1544005313-94ddf0286df2'),
    github: 'https://github.com/priyasharma',
    linkedin: 'https://linkedin.com/in/priya-sharma',
  },
  {
    id: 'kunal-joshi',
    name: 'Kunal Joshi',
    role: 'Placements Cell Lead',
    tagline: 'Documents where a decade of members landed.',
    bio: 'Final-year IT. Built the placements archive that juniors actually use — companies, domains and honest outcomes, year over year. Runs mock-interview weekends every placement season.',
    photo: u('photo-1506794778202-cad84cf45f1d'),
    github: 'https://github.com/kunalj',
    linkedin: 'https://linkedin.com/in/kunal-joshi',
  },
  {
    id: 'ananya-rao',
    name: 'Ananya Rao',
    role: 'Workshop Lead',
    tagline: 'Turns a semester of theory into a three-hour build.',
    bio: 'Second-year CS. Designs the hands-on tracks — every workshop she runs ends with working code on every laptop, not certificates. Behind the Intro to LLMs session that overflowed the seminar hall.',
    photo: u('photo-1534528741775-53994a69daeb'),
    github: 'https://github.com/ananyarao',
    linkedin: 'https://linkedin.com/in/ananya-rao',
  },
  {
    id: 'aditya-patil',
    name: 'Aditya Patil',
    role: 'Core Member — Systems',
    tagline: 'Keeps the judge sandboxed and the leaderboards live.',
    bio: 'Third-year CS, resident infrastructure person. Maintains CoC Judge’s execution sandbox and the servers every Algo Arena runs on. Measures success in uptime and cold starts.',
    photo: u('photo-1519085360753-af0119f7cbe7'),
    github: 'https://github.com/adityap',
    linkedin: 'https://linkedin.com/in/aditya-patil',
  },
  {
    id: 'mira-shah',
    name: 'Mira Shah',
    role: 'Core Member — Web',
    tagline: 'First-year PRs, production code, no fear.',
    bio: 'Second-year IT who joined through Winter of Code and never left. Ships features across the community repos and now mentors the cohort she came from. Proof the pipeline works.',
    photo: u('photo-1517841905240-472988babdf9'),
    github: 'https://github.com/mirashah',
    linkedin: 'https://linkedin.com/in/mira-shah',
  },
  {
    id: 'varun-kelkar',
    name: 'Varun Kelkar',
    role: 'Treasurer',
    tagline: 'Makes prize pools and pizza budgets both add up.',
    bio: 'Third-year Mechanical, the council’s numbers person. Handles sponsorships, reimbursements and the delicate art of funding a 24-hour hackathon on a student budget. Every rupee accounted for.',
    photo: u('photo-1539571696357-5a69c17a67c6'),
    github: 'https://github.com/varunk',
    linkedin: 'https://linkedin.com/in/varun-kelkar',
  },
  {
    id: 'naina-gupta',
    name: 'Naina Gupta',
    role: 'Core Member — ML',
    tagline: 'Demos models live and lets the room break them.',
    bio: 'Second-year CS working on the ML track. Co-ran the LLM workshop and maintains the dsa-sheets editorial pipeline. Believes the best way to teach a model is to let thirty students try to trick it.',
    photo: u('photo-1487412720507-e7ab37603c6f'),
    github: 'https://github.com/nainag',
    linkedin: 'https://linkedin.com/in/naina-gupta',
  },
];
