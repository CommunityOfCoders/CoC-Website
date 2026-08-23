import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';

const SLIDES = [
  { id: 'debug-a-thon-2026', img: '/photos/2026/debugathon.png', title: 'Debug-A-Thon', year: '2026' },
  { id: 'hackxcelerate-2026', img: '/photos/2026/hackX.jpeg', title: 'HackXcelerate 2026', year: '2026' },
  { id: 'the-lost-probe-2026', img: '/photos/2026/lostprobe2.png', title: 'The Lost Probe', year: '2026' },
  { id: 'coderush-2026', img: '/photos/2026/coderush.png', title: 'CodeRush', year: '2026' },
  { id: 'pixel-perfect-2026', img: '/photos/2026/pixelperfect.png', title: 'Pixel Perfect', year: '2026' },
  { id: 'routing-rush-2026', img: '/photos/2026/routerush.png', title: 'Routing Rush', year: '2026' },
  { id: 'routequest-2026', img: '/photos/2026/routequest.png', title: 'RouteQuest', year: '2026' },
  { id: 'codehunt-2026', img: '/photos/2026/codehunt.png', title: 'Codehunt', year: '2026' },
  { id: 'icpc-vjti-2026', img: '/photos/2026/icpc2.jpeg', title: 'ICPC VJTI Round', year: '2026' },
  { id: 'inheritance-2025-26', img: '/photos/2026/inheritance.png', title: 'Inheritance', year: '2026' },
  { id: 'webgenesis-2026', img: '/photos/2026/webgenesis.png', title: 'Webgenesis', year: '2026' },
  { id: 'eth-evening-2025', img: '/photos/2026/ethhevening.png', title: 'ETH Evening', year: '2025' },
  { id: 'project-x-2025', img: '/photos/2026/ProjectX.png', title: 'Project X', year: '2025' },
  { id: 'codeverse', img: '/photos/2025/codeverseceremony.jpg', title: 'CodeVerse Ceremony', year: '2025' },
  { id: 'ai-vs-human', img: '/photos/2025/aivshuman.JPG', title: 'AI vs Human', year: '2025' },
  { id: 'api-murder-mystery', img: '/photos/2025/apimurder.JPG', title: 'API Murder Mystery', year: '2025' },
  { id: 'codeverse', img: '/photos/2025/codeverseteam.jpg', title: 'CodeVerse Team', year: '2025' },
  { id: 'debugathon', img: '/photos/2025/debugathon.jpg', title: 'Debugathon', year: '2024' },
  { id: 'eth-ctf', img: '/photos/2025/ethctf.jpg', title: 'ETH CTF', year: '2024' },
  { id: 'grid-of-doom', img: '/photos/2025/gridofdoom.jpg', title: 'Grid of Doom', year: '2024' },
  { id: 'pixel-pursuit', img: '/photos/2025/pixelpursuit.jpg', title: 'Pixel Pursuit', year: '2024' },
  { id: 'tech-auction', img: '/photos/2025/auction.jpg', title: 'Tech Auction', year: '2024' },
  { id: 'travelling-coder', img: '/photos/2025/travellingcoder.jpg', title: 'Travelling Coder', year: '2023' },
];

const AUTOPLAY_MS = 4000;

const Throwback: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const reduce = useReducedMotion();
  const last = SLIDES.length - 1;

  // measure one slide's width (+ gap) so translation is pixel-accurate
  useEffect(() => {
    const measure = () => {
      const first = trackRef.current?.querySelector<HTMLElement>('.tb__slide');
      if (!first) return;
      const gap = parseFloat(getComputedStyle(trackRef.current!).columnGap || '0');
      setStep(first.offsetWidth + gap);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = useCallback((dir: number) => {
    // arrows wrap so the reel never dead-ends
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  // autoplay - timer restarts on every index change (manual or automatic),
  // so a click/drag never causes an awkward double-advance
  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => setIndex((i) => (i >= last ? 0 : i + 1)), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduce, last]);

  const onDragStart = () => {
    isDraggingRef.current = true;
    setPaused(true);
  };

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -60 || velocity.x < -400) setIndex((i) => Math.min(i + 1, last));
    else if (offset.x > 60 || velocity.x > 400) setIndex((i) => Math.max(i - 1, 0));
    setPaused(false);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
  };

  return (
    <section
      className="section tb"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="container tb__head">
        <Reveal className="section-head">
          <span className="eyebrow">Throwback</span>
          <h2 className="section-title">A decade of<br />show, not tell.</h2>
        </Reveal>
        <Reveal className="tb__controls" delay={0.1}>
          <Magnetic strength={0.35}>
            <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous slide">
              <ArrowLeft />
            </button>
          </Magnetic>
          <Magnetic strength={0.35}>
            <button className="icon-btn" onClick={() => go(1)} aria-label="Next slide">
              <ArrowRight />
            </button>
          </Magnetic>
        </Reveal>
      </div>

      <div className="tb__viewport">
        <motion.div
          className="tb__track"
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -step * last, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          animate={{ x: -index * step }}
          transition={{ type: 'spring', stiffness: 220, damping: 32 }}
        >
          {SLIDES.map((s, i) => (
            <figure className="tb__slide" key={`${s.id}-${i}`}>
              <a
                href={`#events?id=${s.id}`}
                className="tb__slide-link"
                onClick={handleSlideClick}
                aria-label={`View ${s.title} details`}
              >
                <div className="tb__img photo photo--hover">
                  <img src={s.img} alt={`${s.title}, ${s.year}`} draggable={false} loading="lazy" />
                </div>
                <figcaption className="tb__cap">
                  <span className="tb__cap-title">{s.title}</span>
                  <span className="tb__cap-year">{s.year}</span>
                  <span className="tb__cap-idx">{String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
                </figcaption>
              </a>
            </figure>
          ))}
        </motion.div>
      </div>

      <div className="container tb__dots" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={`${s.id}-${i}`}
            className={`tb__dot${i === index ? ' is-active' : ''}`}
            aria-label={`Go to ${s.title}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Throwback;
