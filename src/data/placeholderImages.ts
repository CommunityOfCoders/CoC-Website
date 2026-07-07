/* ============================================================
   PLACEHOLDER IMAGERY — single source of truth.
   Every photo on the homepage resolves through this file.
   All are Unsplash stock stand-ins: real photographs of people
   coding / collaborating / presenting. Shown as full-colour
   photography (no tint washes). To swap in a real photo: drop
   the file into /public/photos/ and change the URL here.
   ============================================================ */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

export const IMG = {
  /* hero collage */
  heroMain: u('photo-1522071820081-009f0129c71c', 1400), // team working around laptops
  heroSub: u('photo-1531482615713-2afd69097998', 800),   // over-shoulder workshop shot

  /* how-we-work split */
  howWeWork: u('photo-1556761175-b413da4baf72', 1000),   // pair reviewing code on a laptop

  /* full-width candid band */
  groupPhoto: u('photo-1511632765486-a01980e01a18', 1800), // group huddle, energetic

  /* featured project "screenshots" (work-in-progress shots) */
  projectA: u('photo-1461749280684-dccba630e2f6', 900),  // code on screen
  projectB: u('photo-1551288049-bebda4e38f71', 900),     // dashboard on laptop
  projectC: u('photo-1512941937669-90a1b58e7e9c', 900),  // phone + app in hand

  /* scroll-driven backdrop scenes (shown dimmed behind sections) */
  bgHero: u('photo-1505373877841-8d25f7d46678', 1900),     // stage presentation, dark room
  bgCommunity: u('photo-1529156069898-49953e39b3ac', 1900),// group of students together
  bgBuild: u('photo-1522202176988-66273c2fd55f', 1900),    // two people pairing on a laptop
  bgTalk: u('photo-1540575467063-178a50c2df87', 1900),     // conference audience
  bgCrowd: u('photo-1515187029135-18ee286d815b', 1900),    // hackathon crowd, laptops open

  /* throwback slider — event candids */
  throwback: [
    u('photo-1504384308090-c894fdcc538d', 1100), // hackathon table, laptops everywhere
    u('photo-1515187029135-18ee286d815b', 1100), // crowd at a tech event
    u('photo-1517245386807-bb43f82c33c4', 1100), // workshop / classroom session
    u('photo-1519389950473-47ba0277781c', 1100), // group at a shared table
    u('photo-1543269865-cbf427effbad', 1100),    // students collaborating
    u('photo-1524178232363-1fb2b075b655', 1100), // lecture / talk in progress
    u('photo-1552664730-d307ca884978', 1100),    // whiteboard sprint
    u('photo-1528901166007-3784c7dd3653', 1100), // presentation to a room
  ],
};
