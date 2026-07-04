import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import ShinyText from '../components/ShinyText';
import './team.css';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Avanish Salunke',
    role: 'Secretary',
    bio: 'Drives the strategic vision of the club, fostering partnerships and overseeing core club operations.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Nihira Neralwar',
    role: 'Secretary',
    bio: 'Shapes the community framework, coordinates large-scale initiatives, and ensures collaborative growth.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Kavish Nasta',
    role: 'AIDSET/Brain Head',
    bio: 'Spearheads ML and Artificial Intelligence research, mentoring members on building next-gen neural models.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Bianca Sawant',
    role: 'AIDSET/Brain Head',
    bio: 'Directs neural network labs and AI workshops, bringing bleeding-edge data science to the community.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Aryan Daga',
    role: 'Project X Head',
    bio: 'Orchestrates flagship builds and development sprints, turning complex concepts into shipped code.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Vaishnavi Sanap',
    role: 'Project X Head',
    bio: 'Leads engineering cycles for open-source initiatives and guides project contributors from concept to deploy.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Jinmay Jhaveri',
    role: 'Treasurer',
    bio: 'Manages financial resources, budget allocations, and event resources to sustain the club\'s goals.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Awwab Wadekar',
    role: 'CP Head',
    bio: 'Nurtures the competitive programming culture, organizing algorithmic sprints and contest sessions.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Pratyush Rao',
    role: 'Dev Head',
    bio: 'Architects the club\'s web platforms and mentors developers in modern full-stack engineering.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Ankita Sagar',
    role: 'Design Head',
    bio: 'Curates the visual identity of CoC, directing UI/UX aesthetics and digital brand experiences.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Ojas Alai',
    role: 'Sponsorship Head',
    bio: 'Establishes corporate alliances, securing resource channels and industry support for events.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Sanskar Tarte',
    role: 'Sponsorship Head',
    bio: 'Bridges the gap between the tech community and corporate sponsors to maximize event scaling.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Dhiraj Shirse',
    role: 'PR Head',
    bio: 'Directs outreach and communications, amplifying CoC\'s presence across digital channels.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    name: 'Pratik Shewale',
    role: 'PR Head',
    bio: 'Manages public relations, content strategy, and community engagement to drive member growth.',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/'
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
          <h2 className="team-title">
            Meet the <ShinyText text="CoC Team" speed={3} />
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
                  <span className="member-role">{member.role}</span>
                  <h3 className="member-name">{member.name}</h3>
                </div>
              </div>

              <div className="team-card-divider" />

              <p className="member-bio">{member.bio}</p>

              <div className="team-card-footer">
                <span className="member-status">STATUS // ACTIVE</span>
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
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Team;
