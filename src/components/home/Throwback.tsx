import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';

/* pos = object-position: keeps event titles (posters) and people (group shots) inside the 16:10 frame */
const SLIDES: { id: string; img: string; title: string; year: string; pos?: string }[] = [
  { id: 'debug-a-thon-2026', pos: '50% 0%', img: '/photos/2026/debugathon.png', title: 'Debug-A-Thon', year: '2026' },
  { id: 'hackxcelerate-2026', pos: '50% 65%', img: '/photos/2026/hackX.jpeg', title: 'HackXcelerate 2026', year: '2026' },
  { id: 'the-lost-probe-2026', pos: '50% 0%', img: '/photos/2026/lostprobe2.png', title: 'The Lost Probe', year: '2026' },
  { id: 'coderush-2026', pos: '50% 0%', img: '/photos/2026/coderush.png', title: 'CodeRush', year: '2026' },
  { id: 'pixel-perfect-2026', pos: '50% 0%', img: '/photos/2026/pixelperfect.png', title: 'Pixel Perfect', year: '2026' },
  { id: 'routing-rush-2026', pos: '50% 0%', img: '/photos/2026/routerush.png', title: 'Route Rush', year: '2026' },
  { id: 'routequest-2026', pos: '50% 0%', img: '/photos/2026/routequest.png', title: 'RouteQuest', year: '2026' },
  { id: 'codehunt-2026', pos: '50% 0%', img: '/photos/2026/codehunt.png', title: 'Codehunt', year: '2026' },
  { id: 'icpc-vjti-2026', img: '/photos/2026/icpc2.jpeg', title: 'ICPC VJTI Round', year: '2025' },
  { id: 'inheritance-2025-26', pos: '50% 0%', img: '/photos/2026/inheritance.png', title: 'Inheritance', year: '2026' },
  { id: 'webgenesis-2026', pos: '50% 0%', img: '/photos/2026/webgenesis.png', title: 'Webgenesis', year: '2026' },
  { id: 'eth-evening-2025', pos: '50% 0%', img: '/photos/2026/ethhevening.png', title: 'ETH Evening', year: '2025' },
  { id: 'project-x-2025', pos: '50% 0%', img: '/photos/2026/ProjectX.png', title: 'Project X', year: '2025' },
  { id: 'codeverse', pos: '50% 70%', img: '/photos/2025/codeverseceremony.jpg', title: 'CodeVerse Ceremony', year: '2025' },
  { id: 'ai-vs-human', img: '/photos/2025/aivshuman.JPG', title: 'AI vs Human', year: '2025' },
  { id: 'api-murder-mystery', img: '/photos/2025/apimurder.JPG', title: 'API Murder Mystery', year: '2025' },
  { id: 'codeverse', pos: '50% 60%', img: '/photos/2025/codeverseteam.jpg', title: 'CodeVerse Team', year: '2025' },
  { id: 'debugathon', img: '/photos/2025/debugathon.jpg', title: 'Debugathon', year: '2024' },
  { id: 'eth-ctf', img: '/photos/2025/ethctf.jpg', title: 'ETH CTF', year: '2024' },
  { id: 'grid-of-doom', img: '/photos/2025/gridofdoom.jpg', title: 'Grid of Doom', year: '2024' },
  { id: 'pixel-pursuit', img: '/photos/2025/pixelpursuit.jpg', title: 'Pixel Pursuit', year: '2024' },
  { id: 'tech-auction', img: '/photos/2025/auction.jpg', title: 'Tech Auction', year: '2024' },
  { id: 'travelling-coder', img: '/photos/2025/travellingcoder.jpg', title: 'Travelling Coder', year: '2023' },
];

// Tripled sets: Set A (clones before), Set B (main set), Set C (clones after) for seamless infinite looping
const EXTENDED_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

const AUTOPLAY_MS = 4000;

const Throwback: React.FC = () => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const virtualIndexRef = useRef(SLIDES.length);
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  const getStep = useCallback(() => {
    if (!viewportRef.current) return 0;
    const first = viewportRef.current.querySelector<HTMLElement>('.tb__slide');
    if (!first) return 0;
    const track = viewportRef.current.querySelector<HTMLElement>('.tb__track');
    const gap = track ? parseFloat(getComputedStyle(track).columnGap || '22') : 22;
    return first.offsetWidth + gap;
  }, []);

  // When scroll animation ends or during scroll bounds check,
  // silently normalize position back into Set B without visual jump
  const normalizeScrollPosition = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const step = getStep();
    if (step <= 0) return;

    const curScroll = el.scrollLeft;
    const curVIdx = Math.round(curScroll / step);
    const N = SLIDES.length;

    // If outside middle set [N, 2N - 1], seamlessly jump back into Set B
    if (curVIdx >= 2 * N || curVIdx < N) {
      const realIdx = ((curVIdx % N) + N) % N;
      const newVIdx = N + realIdx;
      virtualIndexRef.current = newVIdx;

      el.style.scrollSnapType = 'none';
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = newVIdx * step;

      requestAnimationFrame(() => {
        if (el) el.style.scrollSnapType = '';
      });
    }
  }, [getStep]);

  // Initial scroll alignment to Set B
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const initPos = () => {
      const step = getStep();
      if (step > 0) {
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = (SLIDES.length + indexRef.current) * step;
        virtualIndexRef.current = SLIDES.length + indexRef.current;
      }
    };
    const raf = requestAnimationFrame(initPos);
    window.addEventListener('resize', initPos);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', initPos);
    };
  }, [getStep]);

  // Pause autoplay when section is scrolled out of viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Listen to native scrollend for instantaneous silent normalizations
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleScrollEnd = () => {
      isProgrammaticScrollRef.current = false;
      normalizeScrollPosition();
    };

    el.addEventListener('scrollend', handleScrollEnd);
    return () => el.removeEventListener('scrollend', handleScrollEnd);
  }, [normalizeScrollPosition]);

  const scrollToVirtualIndex = useCallback((targetVIdx: number, smooth = true) => {
    const el = viewportRef.current;
    if (!el) return;
    const step = getStep();
    if (step <= 0) return;

    virtualIndexRef.current = targetVIdx;
    const realIdx = ((targetVIdx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setIndex(realIdx);
    indexRef.current = realIdx;

    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    el.scrollTo({
      left: targetVIdx * step,
      behavior: smooth ? 'smooth' : 'auto',
    });

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      normalizeScrollPosition();
    }, 600);
  }, [getStep, normalizeScrollPosition]);

  const go = useCallback((dir: number) => {
    const currentVIdx = virtualIndexRef.current;
    const targetVIdx = currentVIdx + dir;
    scrollToVirtualIndex(targetVIdx, !reduce);
  }, [scrollToVirtualIndex, reduce]);

  const goToSlide = useCallback((targetRealIdx: number) => {
    const currentRealIdx = indexRef.current;
    const N = SLIDES.length;
    let diff = targetRealIdx - currentRealIdx;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const targetVIdx = virtualIndexRef.current + diff;
    scrollToVirtualIndex(targetVIdx, !reduce);
  }, [scrollToVirtualIndex, reduce]);

  const onScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (!viewportRef.current) return;
    const scrollLeft = viewportRef.current.scrollLeft;
    const stepSize = getStep();
    if (stepSize <= 0) return;

    const vIdx = Math.round(scrollLeft / stepSize);
    virtualIndexRef.current = vIdx;
    const realIdx = ((vIdx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setIndex(realIdx);
    indexRef.current = realIdx;
  }, [getStep]);

  // Autoplay - smoothly loops forward infinitely
  useEffect(() => {
    if (paused || reduce || !isInView) return;
    const id = setInterval(() => {
      go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduce, isInView, go]);

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
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(SLIDES.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isHovered, go, goToSlide]);

  // Global mouse up for desktop click & drag
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setPaused(false);
        setTimeout(() => {
          isDraggingRef.current = false;
          normalizeScrollPosition();
        }, 50);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [normalizeScrollPosition]);

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
      normalizeScrollPosition();
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
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(SLIDES.length - 1);
    }
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section tb"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!isMouseDownRef.current) setPaused(false);
        }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        tabIndex={0}
        role="region"
        aria-label="Throwback timeline carousel"
      >
        <div className="tb__track">
          {EXTENDED_SLIDES.map((s, idx) => {
            const realIdx = idx % SLIDES.length;
            return (
              <figure className="tb__slide" key={`${s.id}-${idx}`}>
                <a
                  href={`#events?id=${s.id}`}
                  className="tb__slide-link"
                  onClick={handleSlideClick}
                  aria-label={`View ${s.title} details`}
                >
                  <div className="tb__img photo photo--hover">
                    <img src={s.img} alt={`${s.title}, ${s.year}`} draggable={false} loading="lazy" style={s.pos ? { objectPosition: s.pos } : undefined} />
                  </div>
                  <figcaption className="tb__cap">
                    <span className="tb__cap-title">{s.title}</span>
                    <span className="tb__cap-year">{s.year}</span>
                    <span className="tb__cap-idx">
                      {String(realIdx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                    </span>
                  </figcaption>
                </a>
              </figure>
            );
          })}
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
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Throwback;
