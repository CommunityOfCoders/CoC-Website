/* ============================================================
   TESTIMONIALS - CoC alumni quotes for the Events page marquee.
   Each entry has a quote, author name, username (links to
   GitHub/profile), and company (links to company homepage).
   ============================================================ */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  username: string;
  profileUrl: string;
  company: string;
  companyUrl: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'aryan-m',
    quote:
      "Hack8 was the first time I stayed up for 24 hours and felt genuinely proud of what I'd built at the end of it. The energy in that auditorium at 4 AM is something I still talk about.",
    author: 'Aryan Mehta',
    username: 'aryanmehta',
    profileUrl: 'https://github.com/aryanmehta',
    company: 'Razorpay',
    companyUrl: 'https://razorpay.com',
  },
  {
    id: 'priya-d',
    quote:
      "Winter of Code literally changed my trajectory. I went from \"what is a pull request?\" to maintaining a repo in eight months. That's because of CoC's culture, not just the event.",
    author: 'Priya Desai',
    username: 'priyad',
    profileUrl: 'https://github.com/priyad',
    company: 'Atlassian',
    companyUrl: 'https://atlassian.com',
  },
  {
    id: 'rohan-s',
    quote:
      "The Systems Design talk made me realise my interview prep was completely backwards. The alum was brutal and honest in a way that no course could be.",
    author: 'Rohan Sharma',
    username: 'rohansharma',
    profileUrl: 'https://github.com/rohansharma',
    company: 'Google',
    companyUrl: 'https://google.com',
  },
  {
    id: 'neha-k',
    quote:
      "Open Source October was chaotic and I loved every minute. Triaging issues at midnight, reviewing PRs on the fly -- it's the closest thing to a real engineering team I had in college.",
    author: 'Neha Kulkarni',
    username: 'nehakulkarni',
    profileUrl: 'https://github.com/nehakulkarni',
    company: 'Figma',
    companyUrl: 'https://figma.com',
  },
  {
    id: 'karan-p',
    quote:
      "I shipped my first open-source commit at a CoC session in my first year. That single diff gave me more confidence than an entire semester of coursework.",
    author: 'Karan Patil',
    username: 'karanp',
    profileUrl: 'https://github.com/karanp',
    company: 'Stripe',
    companyUrl: 'https://stripe.com',
  },
  {
    id: 'ananya-r',
    quote:
      "Project Demo Day forced me to actually finish something. \"No slides, live only\" is the best constraint anyone ever put on me. My Campus Compass demo still runs.",
    author: 'Ananya Rao',
    username: 'ananyarao',
    profileUrl: 'https://github.com/ananyarao',
    company: 'Notion',
    companyUrl: 'https://notion.so',
  },
  {
    id: 'siddharth-v',
    quote:
      "The Intro to LLMs workshop was the most practically useful three hours I spent in four years of engineering. I deployed a RAG chatbot the same night.",
    author: 'Siddharth Varma',
    username: 'siddharthv',
    profileUrl: 'https://github.com/siddharthv',
    company: 'Mistral AI',
    companyUrl: 'https://mistral.ai',
  },
  {
    id: 'ishita-n',
    quote:
      "Algo Arena Finals is where I learned that competitive programming is a sport. The last 90 seconds of that final round felt like a movie. I still have the leaderboard screenshot.",
    author: 'Ishita Nair',
    username: 'ishitanair',
    profileUrl: 'https://github.com/ishitanair',
    company: 'Jane Street',
    companyUrl: 'https://janestreet.com',
  },
];
