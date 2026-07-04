import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import ShinyText from '../components/ShinyText';
import BlurText from '../components/BlurText';
import './team.css';

interface TeamMember {
  name: string;
  role: string;
  github: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Avanish Salunke',
    role: 'Secretary',
    github: 'https://github.com/AvanishSalunke',
    linkedin: 'https://www.linkedin.com/in/avanishsalunke'
  },
  {
    name: 'Nihira Neralwar',
    role: 'Secretary',
    github: 'https://github.com/nihira20',
    linkedin: 'https://www.linkedin.com/in/nihira-neralwar'
  },
  {
    name: 'Kavish Nasta',
    role: 'AIDSET/Brain Head',
    github: 'https://github.com/kavishnasta',
    linkedin: 'https://www.linkedin.com/in/kavish-nasta-4772a1218'
  },
  {
    name: 'Bianca Sawant',
    role: 'AIDSET/Brain Head',
    github: 'https://github.com/star-lord1234',
    linkedin: 'https://www.linkedin.com/in/bianca-sawant-ba7963308'
  },
  {
    name: 'Aryan Daga',
    role: 'Project X Head',
    github: 'https://github.com/dagaaryan011',
    linkedin: 'https://www.linkedin.com/in/aryan-daga-288542324'
  },
  {
    name: 'Vaishnavi Sanap',
    role: 'Project X Head',
    github: 'https://github.com/shnavii11',
    linkedin: 'https://www.linkedin.com/in/vaishnavi-sanap'
  },
  {
    name: 'Jinmay Jhaveri',
    role: 'Treasurer',
    github: 'https://github.com/borrus-sudo',
    linkedin: 'https://www.linkedin.com/in/jinmay-jhaveri/'
  },
  {
    name: 'Awwab Wadekar',
    role: 'CP Head',
    github: 'https://github.com/Once-1296',
    linkedin: 'https://www.linkedin.com/in/awwab-wadekar-a42a65330/'
  },
  {
    name: 'Pratyush Rao',
    role: 'Dev Head',
    github: 'https://github.com/PratyushRao',
    linkedin: 'https://www.linkedin.com/in/pratyushrao06'
  },
  {
    name: 'Ankita Sagar',
    role: 'Design Head',
    github: 'https://github.com/Sagarankita',
    linkedin: 'https://www.linkedin.com/in/ankitasagar'
  },
  {
    name: 'Ojas Alai',
    role: 'Sponsorship Head',
    github: 'https://github.com/ojasalai27',
    linkedin: 'https://www.linkedin.com/in/ojasalai'
  },
  {
    name: 'Sanskar Tarte',
    role: 'Sponsorship Head',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in/'
  },
  {
    name: 'Dhiraj Shirse',
    role: 'PR Head',
    github: 'https://github.com/Dhiraj201226',
    linkedin: 'https://www.linkedin.com/in/dhiraj-shirse-645445328'
  },
  {
    name: 'Pratik Shewale',
    role: 'PR Head',
    github: 'https://github.com/PratikShewale21',
    linkedin: 'https://www.linkedin.com/in/pratik-shewale-829194338'
  }
];

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const Team: React.FC = () => {
  return (
    <div className="team-page">
      <section className="team-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="team-hero-content"
        >
          <div className="team-eyebrow">
            <Users size={12} className="accent-icon" />
            <span>Core Team 2026-27</span>
          </div>
          <h2 className="team-title" style={{ display: 'flex', alignItems: 'center', gap: '0.25em', flexWrap: 'wrap' }}>
            <BlurText text="Meet the" />
            <ShinyText text="CoC Team" speed={3} />
          </h2>
          <p className="team-subtitle">
            From planning ideas to making them a reality, this team is at the heart of everything CoC does.
            Ready to build, lead, and inspire.<br></br>
            Presenting the Core Team of Community of Coders, VJTI 2026-27
          </p>
        </motion.div>
      </section>

      <section className="team-grid">
        {teamMembers.map((member, index) => (
          <motion.div
            key={`${member.name}-${member.role}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.04 }}
            className="team-card-wrapper"
          >
            <SpotlightCard className="team-card" spotlightColor="var(--spotlight-color)">
              <div className="team-card-header">
                <div className="member-avatar-container">
                  <div className="member-avatar-glow" />
                  <div className="member-avatar">
                    <span className="member-initials">{getInitials(member.name)}</span>
                    <div className="avatar-grid-overlay" />
                  </div>
                </div>

                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                </div>
              </div>

              <div className="team-socials">
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={`${member.name} GitHub`}
                  className="social-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={`${member.name} LinkedIn`}
                  className="social-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Team;
