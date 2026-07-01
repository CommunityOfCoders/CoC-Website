import React, { useRef, useEffect, useState } from 'react';

interface ParticlesProps {
  particleCount?: number;
  particleColor?: string;
  speed?: number;
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 150,
  particleColor = '#61B919',
  speed = 0.9,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const particles: { 
      x: number; 
      y: number; 
      size: number; 
      baseVx: number; 
      baseVy: number;
      vx: number; 
      vy: number; 
      alpha: number 
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseVx = (Math.random() - 0.5) * speed;
      const baseVy = (Math.random() - 0.5) * speed;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        baseVx,
        baseVy,
        vx: baseVx,
        vy: baseVy,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // If mouse is active on screen, pull particles within radius towards it
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Attraction radius of 300px
          if (distance < 300) {
            const force = (300 - distance) / 300; // 0 to 1 scaling
            // Adjust velocity towards the mouse
            p.vx += (dx / distance) * force * 0.05;
            p.vy += (dy / distance) * force * 0.05;
          }
        }

        // Apply friction to slowly return to the base wandering velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Speed limit
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = speed * 3.5;
        if (currentSpeed > maxSpeed) {
          p.vx = (p.vx / currentSpeed) * maxSpeed;
          p.vy = (p.vy / currentSpeed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Screen wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        let r = 97, g = 185, b = 25;
        if (particleColor.startsWith('#') && particleColor.length === 7) {
            r = parseInt(particleColor.substring(1,3), 16);
            g = parseInt(particleColor.substring(3,5), 16);
            b = parseInt(particleColor.substring(5,7), 16);
        }
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, particleCount, speed, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default Particles;
