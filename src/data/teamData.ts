/* ============================================================
   TEAM ROSTER - real data for CoC team members.
   ============================================================ */

import AvanishImg from "../assets/Avanish.jpg";
import NihiraImg from "../assets/Nihira.jpg";
import KavishImg from "../assets/Kavish.jpg";
import BiancaImg from "../assets/Bianca.jpg";
import AndersenImg from "../assets/andersen.jpg";
import AryanImg from "../assets/Aryan.png";
import VaishnaviImg from "../assets/vaishnavi.jpeg";
import AwwabImg from "../assets/Awwab.png";
import PratyushImg from "../assets/Rao.jpg";
import DhirajImg from "../assets/Dhiraj.jpg";
import PratikImg from "../assets/pratik.jpg";
import JinmayImg from "../assets/Jinmay.jpg";
import AnkitaImg from "../assets/ankita.jpeg";
import OjasImg from "../assets/ojas.jpeg";

import PurvashaImg from "../assets/purvasha.jpg";
import ShreyasImg from "../assets/shreyas.jpg";
import RudrakshiImg from "../assets/rudrakshi.jpg";
import AnushreeImg from "../assets/anushree.jpg";
import SudikshaImg from "../assets/sudiksha.jpg";
import AayushImg from "../assets/aayush.jpg";
import NathanImg from "../assets/nathan.jpg";
import TanushImg from "../assets/tanush.jpg";
import AkshatImg from "../assets/akshat.jpg";
import SarangImg from "../assets/sarang.jpg";

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

export const COUNCIL: TeamMember[] = [
  {
    id: "avanish-salunke",
    name: "Avanish Salunke",
    role: "Secretary",
    tagline: "Building the next chapter of CoC as never before.",
    bio: "Secretary of the Council of Coders, helping drive operations, coordination, and community initiatives across the council.",
    photo: AvanishImg,
    github: "https://github.com/AvanishSalunke",
    linkedin: "https://linkedin.com/in/avanishsalunke",
  },
  {
    id: "nihira-neralwar",
    name: "Nihira Neralwar",
    role: "Secretary",
    tagline: "Turning ideas into action.",
    bio: "Secretary of the Council of Coders, focused on enabling collaboration and ensuring the community continues to grow and thrive.",
    photo: NihiraImg,
    github: "https://github.com/nihira20",
    linkedin: "https://www.linkedin.com/in/nihira-neralwar-307538337/",
  },
  {
    id: "bianca-sawant",
    name: "Bianca Sawant",
    role: "AIDSET / BRAIN Secretary",
    tagline: "Empowering students through AI.",
    bio: "Secretary of AIDSET/BRAIN, working to build impactful learning experiences and foster innovation in AI.",
    photo: BiancaImg,
    github: "https://github.com/star-lord1234",
    linkedin: "https://linkedin.com/in/bianca-sawant-ba7963308",
  },
  {
    id: "kavish-nasta",
    name: "Kavish Nasta",
    role: "AIDSET / BRAIN Secretary",
    tagline: "Leading innovation through AI and technology.",
    bio: "Secretary of AIDSET/BRAIN, driving initiatives, workshops, and projects that explore the future of artificial intelligence.",
    photo: KavishImg,
    github: "https://github.com/kavishnasta",
    linkedin: "https://www.linkedin.com/in/kavish-nasta-4772a1218/",
  },
  {
    id: "andersen-dsa",
    name: "Andersen Dsa",
    role: "Open Source Head",
    tagline: "Championing open source collaboration.",
    bio: "Open Source Head at Community of Coders, leading open-source initiatives, community programs, and driving contributions across upstream repositories.",
    photo: AndersenImg,
    github: "https://github.com/andersendsa",
    linkedin: "https://www.linkedin.com/in/andersen-dsa-800ba0294/",
  },
  {
    id: "aryan-daga",
    name: "Aryan Daga",
    role: "Project X Head",
    tagline: "Turning ambitious ideas into reality.",
    bio: "Co-head of Project X, leading high-impact projects and encouraging members to push beyond conventional boundaries.",
    photo: AryanImg,
    github: "https://github.com/dagaaryan011",
    linkedin: "https://www.linkedin.com/in/aryan-daga-288542324/",
  },
  {
    id: "vaishnavi-sanap",
    name: "Vaishnavi Sanap",
    role: "Project X Head",
    tagline: "Building projects that create impact.",
    bio: "Co-head of Project X, focused on innovation, execution, and fostering a culture of problem-solving.",
    photo: VaishnaviImg,
    github: "https://github.com/shnavii11",
    linkedin: "https://www.linkedin.com/in/vaishnavi-sanap/",
  },
  {
    id: "jinmay-jhaveri",
    name: "Jinmay Jhaveri",
    role: "Treasurer",
    tagline: "Keeping every initiative sustainable.",
    bio: "Treasurer of CoC, managing finances, sponsorship allocations, and ensuring smooth execution of council activities.",
    photo: JinmayImg,
    github: "https://github.com/Borrus-sudo",
    linkedin: "https://www.linkedin.com/in/jinmay-jhaveri",
  },
  {
    id: "awwab-wadekar",
    name: "Awwab Wadekar",
    role: "CP Head",
    tagline: "Growing the competitive programming culture.",
    bio: "Leads the Competitive Programming wing, organizing contests, practice sessions, and coding challenges for the community.",
    photo: AwwabImg,
    github: "https://github.com/Once-1296",
    linkedin: "https://www.linkedin.com/in/awwab-wadekar-a42a65330/",
  },
  {
    id: "pratyush-rao",
    name: "Pratyush Rao",
    role: "Dev Head",
    tagline: "Building products, not just projects.",
    bio: "Heads the Development wing, mentoring developers and leading technical initiatives across CoC.",
    photo: PratyushImg,
    github: "https://github.com/PratyushRao",
    linkedin: "https://www.linkedin.com/in/pratyushrao06/",
  },
  {
    id: "ankita-sagar",
    name: "Ankita Sagar",
    role: "Design Head",
    tagline: "Crafting the visual identity of CoC.",
    bio: "Leads the Design team, ensuring every event, campaign, and project reflects a strong and cohesive brand.",
    photo: AnkitaImg,
    github: "https://github.com/Sagarankita",
    linkedin: "https://www.linkedin.com/in/ankitasagar/",
  },
  {
    id: "ojas-alai",
    name: "Ojas Alai",
    role: "Sponsorship Head",
    tagline: "Building partnerships that create opportunities.",
    bio: "Co-head of Sponsorships, connecting CoC with industry partners and enabling larger opportunities for members.",
    photo: OjasImg,
    github: "https://github.com/ojasalai27",
    linkedin: "https://www.linkedin.com/in/ojasalai/",
  },
  {
    id: "dhiraj-shirse",
    name: "Dhiraj Shirse",
    role: "PR Head",
    tagline: "Amplifying the voice of CoC.",
    bio: "Co-head of Public Relations, leading outreach, engagement, and communication across the community.",
    photo: DhirajImg,
    github: "https://github.com/Dhiraj201226",
    linkedin: "https://linkedin.com/in/dhiraj-shirse-645445328/",
  },
  {
    id: "pratik-shewale",
    name: "Pratik Shewale",
    role: "PR Head",
    tagline: "Connecting CoC with the campus.",
    bio: "Co-head of Public Relations, working on community engagement, branding, and communication initiatives.",
    photo: PratikImg,
    github: "https://github.com/PratikShewale21",
    linkedin: "https://www.linkedin.com/in/pratik-shewale-829194338",
  },
];

export const TY_CORE: TeamMember[] = [
  {
    id: "purvasha-singh",
    name: "Purvasha Singh",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: PurvashaImg,
    github: "https://github.com/purrvax",
    linkedin: "https://www.linkedin.com/in/purvasha-singh-941079333/",
  },
  {
    id: "shreyas-kulkarni",
    name: "Shreyas Kulkarni",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: ShreyasImg,
    github: "https://github.com/shreydudie",
    linkedin: "https://www.linkedin.com/in/shreyas-kulkarni-a1a085334/",
  },
  {
    id: "rudrakshi",
    name: "Rudrakshi Chincholkar",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: RudrakshiImg,
    github: "https://github.com/RudrakshiChincholkar",
    linkedin: "https://www.linkedin.com/in/rudrakshi-c/",
  },
  {
    id: "anushree",
    name: "Anushree Upasham",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: AnushreeImg,
    github: "https://github.com/annuuxoxo",
    linkedin: "https://www.linkedin.com/in/anushree-upasham/",
  },
  {
    id: "sudiksha",
    name: "Sudiksha Kadam",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: SudikshaImg,
    github: "https://github.com/sudigit",
    linkedin: "https://www.linkedin.com/in/sudiksha-kadam/",
  },
  {
    id: "aayush-pandey",
    name: "Aayush Pandey",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: AayushImg,
    github: "https://github.com/aayushpandeyv2vedtech",
    linkedin: "https://www.linkedin.com/in/aayush-arun-pandey/",
  },
  {
    id: "nathan-dsouza",
    name: "Nathan Dsouza",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: NathanImg,
    github: "https://github.com/AsparkArcane",
    linkedin: "https://www.linkedin.com/in/nathan-j-dsouza",
  },
  {
    id: "tanush-lokhande",
    name: "Tanush Lokhande",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: TanushImg,
    github: "https://github.com/tanushlokhande23",
    linkedin: "https://www.linkedin.com/in/tanush-lokhande-allmyt/",
  },
  {
    id: "akshat-chauhan",
    name: "Akshat Chauhan",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: AkshatImg,
    github: "https://github.com/akshat280706",
    linkedin: "https://www.linkedin.com/in/akshat-chauhan2807/",
  },
  {
    id: "sarang-meshte",
    name: "Sarang Meshte",
    role: "TY CORE",
    tagline: "Helping our community learn, build, and grow together.",
    bio: "Third Year Core member at Community of Coders, dedicated to supporting club initiatives, mentoring peers, and helping our developer community grow stronger together.",
    photo: SarangImg,
    github: "https://github.com/sarang80040",
    linkedin: "https://www.linkedin.com/in/sarang-meshte",
  },
];

export const TEAM: TeamMember[] = [...COUNCIL, ...TY_CORE];
