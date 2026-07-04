import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, Sparkles, Filter, X, Award } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import ShinyText from '../components/ShinyText';
import './PastEvents.css';

interface EventData {
  id: string;
  title: string;
  category: 'hackathon' | 'workshop' | 'contest' | 'meetup';
  date: string;
  description: string;
  longDescription: string;
  coverImage: string;
  highlights: string[];
}

const pastEventsData: EventData[] = [
  {
    id: 'devhack-2025',
    title: 'Cyber_Fusion 2077 (DevHack)',
    category: 'hackathon',
    date: 'October 18-20, 2025',
    description: 'Our flagship 48-hour global hackathon challenging builders to solve pressing issues in AI, CyberSecurity, and Web3.',
    longDescription: 'Cyber_Fusion 2077 was a massive success, attracting top-tier engineering students from across the country. Over the course of 48 hours, developers pushed their limits to build solutions utilizing bleeding-edge technologies. Mentors from major tech giants provided guidance, culminating in a fierce pitching round in front of a panel of venture capitalists and industry leaders.',
    coverImage: '/events/hackathon.jpg',
    highlights: [
      'Record-breaking turnout of over 500 active physical & virtual participants.',
      'Sponsorship from leading tech organizations including GitHub, Vercel, and Solana.',
      'Over 90% of submitted projects deployed and verified on-chain or on live servers.',
      'Stunning mid-hackathon technical workshops hosted by expert Google & Microsoft devs.'
    ]
  },
  {
    id: 'ai-ml-workshop-2024',
    title: 'Neurons & Networks AI Workshop',
    category: 'workshop',
    date: 'October 26-27, 2024',
    description: 'An intensive two-day hands-on bootcamp covering Neural Networks, LLMs, and deploying custom inference models.',
    longDescription: 'This workshop brought together ML enthusiasts for a deep dive into neural architectures. Students built custom classification models on Day 1, and progressed to configuring fine-tuning loops for small-scale LLMs on Day 2. Every student successfully deployed their API-driven model on cloud infrastructure.',
    coverImage: '/events/ai_workshop.jpg',
    highlights: [
      'Comprehensive curriculum designed by senior research students and VJTI alumni.',
      'Complimentary cloud credits provided for heavy training work.',
      'Covered modern architectures: Transformers, CNNs, and Diffusion models.'
    ]
  },
  {
    id: 'algo-strike-2024',
    title: 'Algo-Strike 2024: CP Contest',
    category: 'contest',
    date: 'October 12-14, 2024',
    description: 'A high-octane competitive programming clash testing data structures, algorithms, and speed-coding under pressure.',
    longDescription: 'Algo-Strike challenged coders with a highly curated set of 8 algorithmic problems ranging from DP to graph theory. Running in parallel on Codeforces, this 3-hour speedrun saw intense leaderboard shifts in the final 10 minutes. A post-contest analysis session unpacked the optimal solutions.',
    coverImage: '/events/algo_arena.jpg',
    highlights: [
      'Problemset designed by 5-star CodeChef and Candidate Master Codeforces community members.',
      'Active live dashboard displayed on VJTI campus screens.',
      'Sponsor interviews offered directly to the top 5 contestants.'
    ]
  },
  {
    id: 'open-source-oct-2023',
    title: 'Open Source October Sprint',
    category: 'workshop',
    date: 'October 1-31, 2023',
    description: 'A month-long open source contribution drive with structured mentorship, git sessions, and PR contributions.',
    longDescription: 'Designed to ease beginners into the open-source ecosystem, this month-long event kicked off with deep dives on Git branching workflows. Over 80 students successfully landed their first pull requests in production repositories, guided by experienced mentors.',
    coverImage: '/events/open_source.jpg',
    highlights: [
      '80%+ of participants had never submitted a PR prior to this event.',
      'Weekly code review sessions helped improve code quality guidelines.',
      'Top merged code incorporated into the main university portal dashboard.'
    ]
  },
  {
    id: 'web3-summit-2023',
    title: 'Web3 & Blockchain Summit',
    category: 'meetup',
    date: 'August 12, 2023',
    description: 'Expert talks, panel discussions, and developer networking around Ethereum scaling, Solidity, and zero-knowledge proofs.',
    longDescription: 'An industry-meetup format bringing together blockchain professionals and university researchers. Presentations explored cryptographic proofs, state channels, and decentralization security risks, ending with a network mixer over refreshments.',
    coverImage: '/events/hackathon.jpg',
    highlights: [
      'Interactive panel debate on L2 rollups vs sidechains.',
      'Live smart-contract auditing workshop demonstrating re-entrancy exploits.',
      'Networking session introducing 20+ students to crypto startup internships.'
    ]
  },
  {
    id: 'icpc-internal-2023',
    title: 'ByteSized: Intra-College CP',
    category: 'contest',
    date: 'July 24, 2023',
    description: 'ACM-ICPC mock team contest for choosing the elite teams representing VJTI in regional stages.',
    longDescription: 'A rigorous three-person team competition modeling the actual ACM-ICPC regional atmosphere. Teams shared a single computer to solve 10 challenging algorithmic problems, requiring tight collaboration and division of labor under strict time penalties.',
    coverImage: '/events/algo_arena.jpg',
    highlights: [
      'Strict single-keyboard rule implemented to simulate official ICPC environments.',
      'Advanced dynamic programming and geometry tasks included.',
      'Winning teams went on to qualify for the ICPC Gwalior-Pune regionals.'
    ]
  }
];

const PastEvents: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEvent]);

  // Filter and search logic
  const filteredEvents = pastEventsData.filter((event) => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'hackathon', label: 'Hackathons' },
    { value: 'workshop', label: 'Workshops & Bootcamps' },
    { value: 'contest', label: 'Coding Contests' },
    { value: 'meetup', label: 'Tech Meetups' },
  ];

  return (
    <div className="past-events-container">
      {/* Hero Section */}
      <section className="events-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hero-text"
        >
          <div className="accent-badge">
            <Sparkles size={12} className="accent-icon" />
            <span>Legacy & Innovation</span>
          </div>
          <h2 className="events-title">
            Code. Build. <ShinyText text="Legacy." speed={3} />
          </h2>
          <p className="events-subtitle">
            Explore our archive of technical milestones. From massive hackathons to deep-dive workshops, 
            see how we drive peer learning and innovation.
          </p>
        </motion.div>
      </section>

      {/* Control Panel (Search & Filter) */}
      <section className="control-panel">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="clear-search">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filters-wrapper">
          <div className="filter-label">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-grid-section">
        {filteredEvents.length > 0 ? (
          <motion.div 
            layout
            className="events-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="event-card-wrapper"
                >
                  <SpotlightCard 
                    className="event-card" 
                    spotlightColor="var(--spotlight-color)"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="card-image-container">
                      <img src={event.coverImage} alt={event.title} className="card-image" />
                      <div className="card-category-badge">{event.category}</div>
                    </div>
                    <div className="card-body">
                      <div className="card-meta">
                        <span className="card-date">
                          <Calendar size={12} className="meta-icon" />
                          {event.date}
                        </span>
                      </div>
                      <h3 className="card-title">{event.title}</h3>
                      <p className="card-desc">{event.description}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            <p>No past events found matching your current search or filter query.</p>
            <button onClick={() => { setFilter('all'); setSearchQuery(''); }} className="reset-btn">
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>
                <X size={20} />
              </button>

              <div className="modal-header-image" style={{ backgroundImage: `url(${selectedEvent.coverImage})` }}>
                <div className="modal-header-overlay">
                  <span className="modal-category">{selectedEvent.category}</span>
                  <h2 className="modal-title">{selectedEvent.title}</h2>
                </div>
              </div>

              <div className="modal-content-grid">
                <div className="modal-main-info">
                  <div className="modal-meta-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="meta-item">
                      <Calendar size={16} className="meta-item-icon" />
                      <div>
                        <h4>Date & Time</h4>
                        <p>{selectedEvent.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h3>Overview</h3>
                    <p className="modal-long-desc">{selectedEvent.longDescription}</p>
                  </div>

                  <div className="modal-section">
                    <h3>Event Highlights</h3>
                    <ul className="modal-highlights-list">
                      {selectedEvent.highlights.map((highlight, idx) => (
                        <li key={idx}>
                          <Award size={14} className="bullet-icon" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PastEvents;
