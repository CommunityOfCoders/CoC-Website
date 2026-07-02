import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import Particles from '../components/Particles';
import FuzzyOverlay from '../components/FuzzyOverlay';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const brandRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const updateGlowToBrand = useCallback(() => {
    if (brandRef.current && headerRef.current) {
      const brandRect = brandRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();
      setGlowStyle({
        left: `${brandRect.left - headerRect.left}px`,
        width: `${brandRect.width}px`,
        transition: 'left 0.4s cubic-bezier(0.25, 1, 0.5, 1), width 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      });
    }
  }, []);

  useLayoutEffect(() => {
    updateGlowToBrand();
  }, [updateGlowToBrand]);

  useEffect(() => {
    window.addEventListener('resize', updateGlowToBrand);
    return () => window.removeEventListener('resize', updateGlowToBrand);
  }, [updateGlowToBrand]);

  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (headerRef.current) {
      const linkRect = e.currentTarget.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();
      setGlowStyle({
        left: `${linkRect.left - headerRect.left}px`,
        width: `${linkRect.width}px`,
        transition: 'left 0.3s cubic-bezier(0.25, 1, 0.5, 1), width 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
      });
    }
  };

  const handleMouseLeave = () => {
    updateGlowToBrand();
  };

  return (
    <div className="app-container">
      <Particles particleCount={150} speed={0.8} />
      <FuzzyOverlay />
      
      {/* Ambient floating glow blobs */}
      <div className="ambient-glow blob-1" />
      <div className="ambient-glow blob-2" />
      
      <header className="header" ref={headerRef}>
        <a href="#" className="header-brand">
          <h1 className="club-name"><span ref={brandRef}>Community of Coders</span></h1>
        </a>
        <nav 
          className="header-nav"
          onMouseLeave={handleMouseLeave}
        >
          <a href="#events" className="nav-link" onMouseEnter={handleLinkMouseEnter}>~/events</a>
          <a href="#projects" className="nav-link" onMouseEnter={handleLinkMouseEnter}>~/projects</a>
          <a href="#team" className="nav-link" onMouseEnter={handleLinkMouseEnter}>~/team</a>
          <a href="#placements" className="nav-link" onMouseEnter={handleLinkMouseEnter}>~/placements</a>
        </nav>
        <div className="header-glow" style={glowStyle}></div>
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
