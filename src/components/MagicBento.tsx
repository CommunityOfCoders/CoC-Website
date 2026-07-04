import React, { useRef, useEffect } from 'react';
import './MagicBento.css';

interface MagicBentoProps {
  children: React.ReactNode;
  className?: string;
}

export const MagicBento: React.FC<MagicBentoProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll('.bento-card');
      
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const container = containerRef.current;
    if (container) {
      // We use mousemove on the container so the light spans across the grid seamlessly
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div ref={containerRef} className={`magic-bento-container ${className}`}>
      {children}
    </div>
  );
};

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  glowColor?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = '', 
  contentClassName = '',
  glowColor = 'rgba(97, 185, 25, 1)',
  style,
  ...props
}) => {
  return (
    <div 
      className={`bento-card ${className}`}
      style={{ ...style, '--glow-color': glowColor } as React.CSSProperties}
      {...props}
    >
      <div className={`bento-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
