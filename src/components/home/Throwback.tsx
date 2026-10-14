import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
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
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();
  const last = SLIDES.length - 1;

  const getStep = useCallback(() => {
    if (!viewportRef.current) return 0;
    const first = viewportRef.current.querySelector<HTMLElement>('.tb__slide');
    if (!first) return 0;
    const track = viewportRef.current.querySelector<HTMLElement>('.tb__track');
    const gap = track ? parseFloat(getComputedStyle(track).columnGap || '22') : 22;
    return first.offsetWidth + gap;
  }, []);

  const scrollToSlide = useCallback((targetIndex: number, smooth = true) => {
    if (!viewportRef.current) return;
    const stepSize = getStep();
    if (stepSize <= 0) return;

    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 600);

    setIndex(targetIndex);
    viewportRef.current.scrollTo({
      left: targetIndex * stepSize,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [getStep]);

  const go = useCallback((dir: number) => {
    setIndex((currentIdx) => {
      const nextIdx = (currentIdx + dir + SLIDES.length) % SLIDES.length;
      scrollToSlide(nextIdx, true);
      return nextIdx;
    });
  }, [scrollToSlide]);

  const onScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (!viewportRef.current) return;
    const scrollLeft = viewportRef.current.scrollLeft;
    const stepSize = getStep();
    if (stepSize <= 0) return;
    const newIndex = Math.round(scrollLeft / stepSize);
    const clamped = Math.max(0, Math.min(newIndex, last));
    setIndex(clamped);
  }, [getStep, last]);

  // autoplay - timer restarts on every index change
  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => {
      const nextIdx = index >= last ? 0 : index + 1;
      scrollToSlide(nextIdx, true);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduce, last, scrollToSlide]);

  // Keypad & keyboard navigation when hovering or interacting with section
  useEffect(() => {
    if (!isHovered) return;
    const onKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName);
      if (isInput) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(last, true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isHovered, go, scrollToSlide, last]);

  // Mouse wheel: smoothly slides blocks horizontally when scrolling over the carousel
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If user is scrolling horizontally on trackpad, let browser handle natively
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const isAtStart = el.scrollLeft <= 0;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 6;

      // If scrolling down/right and not at end, or scrolling up/left and not at start:
      if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Global mouse up for desktop click & drag
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setPaused(false);
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 50);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = viewportRef.current.scrollLeft;
    setPaused(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !viewportRef.current) return;
    const deltaX = e.pageX - startXRef.current;
    if (Math.abs(deltaX) > 5) {
      isDraggingRef.current = true;
    }
    viewportRef.current.scrollLeft = scrollLeftStartRef.current - deltaX;
  };

  const onMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setPaused(false);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToSlide(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToSlide(last, true);
    }
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
  };

  return (
    <section
      className="section tb"
      onMouseEnter={() => {
        setIsHovered(true);
        setPaused(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setPaused(false);
      }}
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

      <div
        className="tb__viewport"
        ref={viewportRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Throwback timeline carousel"
      >
        <div className="tb__track">
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
        </div>
      </div>

      <div className="container tb__dots" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={`${s.id}-${i}`}
            className={`tb__dot${i === index ? ' is-active' : ''}`}
            aria-label={`Go to ${s.title}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => scrollToSlide(i, true)}
          />
        ))}
      </div>
    </section>
  );
};

export default Throwback;
