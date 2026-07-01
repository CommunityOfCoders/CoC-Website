import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';
import ShinyText from '../components/ShinyText';
import './Home.css';

const chainData = [
  { title: "Who We Are", content: "We are the Community of Coders, a passionate group of developers dedicated to building, learning, and innovating together. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Our Mission", content: "To bridge the gap between theory and practice. We aim to empower students by providing them with hands-on experience in real-world software development and emerging technologies." },
  { title: "Projects & Open Source", content: "Dive into our diverse range of projects. From web and mobile applications to artificial intelligence, we actively contribute to open source and encourage collaborative coding." },
  { title: "Hackathons & Events", content: "Join our exciting hackathons, coding sprints, and tech talks. It's the perfect opportunity to network, showcase your skills, and learn from industry experts." },
  { title: "Join The Community", content: "Whether you're a beginner or an experienced developer, there's a place for you here. Let's code the future together. Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt." },
];

const Home: React.FC = () => {
  return (
    <>
      <section className="hero-section">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-title"
        >
          Code. Create. <ShinyText text="Connect." speed={3} />
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-subtitle"
        >
          Welcome to the ultimate hub for tech enthusiasts. Scroll down to explore our chain of innovation and see what drives us forward.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="scroll-indicator"
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div>Swipe Up</div>
        </motion.div>
      </section>

      <section className="chain-container">
        <div className="chain-line"></div>
        {chainData.map((item, index) => (
          <ChainItem key={index} item={item} index={index} />
        ))}
      </section>
    </>
  );
};

function ChainItem({ item, index }: { item: { title: string, content: string }, index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`chain-node ${isLeft ? 'left' : 'right'}`}>
      <div className="chain-link">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="chain-dot"
        ></motion.div>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ transformOrigin: isLeft ? "right center" : "left center" }}
          className="chain-connector"
        ></motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3, delay: 0.3 }}
        className="chain-box-wrapper"
      >
        <SpotlightCard className="chain-box" spotlightColor="rgba(97, 185, 25, 0.15)">
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}

export default Home;
