import React from 'react';
import Particles from '../components/Particles';
import FuzzyOverlay from '../components/FuzzyOverlay';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <Particles particleCount={150} speed={0.8} />
      <FuzzyOverlay />
      
      {/* Ambient floating glow blobs */}
      <div className="ambient-glow blob-1" />
      <div className="ambient-glow blob-2" />
      
      <header className="header">
        <h1 className="club-name">Community of Coders</h1>
        <div className="header-glow"></div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Community of Coders. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
