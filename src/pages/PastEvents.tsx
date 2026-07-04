import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, Sparkles, Filter, X, Award } from 'lucide-react';
import { MagicBento, BentoCard } from '../components/MagicBento';
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
    id: 'git-python-workshop-2025',
    title: 'Git & Python Workshop',
    category: 'workshop',
    date: 'October 18-20, 2025',
    description: 'A three-day hands-on workshop covering Git workflows, Python scripting, and collaborative coding practices.',
    longDescription: 'This workshop provided participants with a deep dive into version control using Git, along with practical Python programming exercises. Attendees learned to manage repositories, resolve merge conflicts, and automate tasks using Python scripts. By the end of the workshop, students had successfully contributed to open-source projects and deployed their own Python applications.',
    coverImage: '/events/git_python.jpg',
    highlights: [
      'Hands-on sessions with real-world coding challenges.',
      'Guided mentorship from seniors.',
      'Final project presentations with peer and mentor feedback.'
    ]
  },
  {
    id: 'opencv-workshop-2025',
    title: 'OpenCV Workshop',
    category: 'workshop',
    date: 'April 11th - 13th, 2026',
    description: 'A two-day intensive workshop on computer vision using OpenCV, covering image processing, object detection, and real-time video analysis.',
    longDescription: 'This workshop provided participants with a deep dive into computer vision using OpenCV. Students learned to process images, detect objects, and analyze real-time video streams. By the end of the workshop, attendees had built their own computer vision applications.',
    coverImage: '/events/opencv.jpg',
    highlights: [
      'Hands-on sessions with real-world computer vision challenges.',
      'Guided mentorship from seniors.',
      'Final project presentations with peer and mentor feedback.'
    ]
  },
  {
    id: 'RouteQuest-2026',
    title: 'RouteQuest 2026',
    category: 'contest',
    date: 'October 12-14, 2026',
    description: 'A web development CTF (Capture The Flag) contest challenging participants to solve real-world web security scenarios.',
    longDescription: 'RouteQuest 2026 was a thrilling web development CTF contest that tested participants on various web security challenges. Contestants had to navigate through complex scenarios to capture flags and secure their applications. The event fostered a competitive yet collaborative environment, encouraging learning and skill enhancement in web security.',
    coverImage: '/events/routequest.jpg',
    highlights: [
      'Challenging web security scenarios designed to test participants\' skills.',
      'Collaboration and teamwork encouraged among participants.',
      'Winners received recognition and prizes for their exceptional performance.'
    ]
  },
  {
    id: 'codehunt-2026',
    title: 'CodeHunt 2026',
    category: 'contest',
    date: 'October 1st, 2026',
    description: 'A competitive coding contest where participants solve algorithmic challenges to hunt for hidden QR codes across the campus.',
    longDescription: 'CodeHunt 2026 was a fun and engaging contest that challenged participants to solve algorithmic problems while hunting for hidden QR codes across the campus. The event encouraged creative problem-solving and teamwork, providing a unique twist on traditional coding competitions.',
    coverImage: '/events/codehunt.jpg',
    highlights: [
      '80%+ of participants had never submitted a PR prior to this event.',
      'Weekly code review sessions helped improve code quality guidelines.',
      'Top merged code incorporated into the main university portal dashboard.'
    ]
  },
  {
    id: 'sih-internals-2025',
    title: 'Smart India Hackathon Internals 2025',
    category: 'contest',
    date: 'August 12, 2025',
    description: 'Internal selection round for the Smart India Hackathon, where teams competed to represent VJTI in the national finals.',
    longDescription: 'A high-stakes internal competition where student teams presented their innovative solutions to real-world problems. The event simulated the national Smart India Hackathon environment, with judges evaluating based on creativity, feasibility, and impact. Winning teams earned the opportunity to represent VJTI at the national level.',
    coverImage: '/events/sih_internals.jpg',
    highlights: [
      'Teams presented their solutions to a panel of judges from academia and industry.',
      'Focus on real-world problem-solving and innovation.',
      'Winners advanced to the national Smart India Hackathon finals.'
    ]
  },
  {
    id: 'codeverse-2026',
    title: 'CodeVerse 2026',
    category: 'contest',
    date: 'July 24, 2026',
    description: 'A series of hackathons spanning over 3 days, in fields like AI, Web Development, and Cybersecurity, culminating in a grand finale with top teams competing for prizes.',
    longDescription: 'CodeVerse 2026 was an exhilarating series of hackathons that brought together the brightest minds in AI, Web Development, and Cybersecurity. Over three days, participants collaborated in teams to develop innovative solutions, with the top teams advancing to a grand finale where they showcased their projects to a panel of esteemed judges.',
    coverImage: '/events/codeverse.jpg',
    highlights: [
      'Multi-day hackathon with diverse technical challenges.',
      'Collaboration and networking opportunities with industry experts.',
      'Prizes awarded to top teams.'
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
          <div className="hud-eyebrow accent-badge">
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
          <MagicBento>
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
                    <BentoCard 
                      className="event-card" 
                      contentClassName="event-card-content"
                      glowColor="rgba(97, 185, 25, 0.8)"
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
                    </BentoCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </MagicBento>
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
