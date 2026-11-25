import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import Magnetic from '../ui/Magnetic';

/* iso drives the order (newest first) and the calendar label.
   pos = object-position: keeps event titles (posters) and people (group shots) inside the 16:10 frame */
type Slide = { id: string; img: string; title: string; iso: string; kind: string; pos?: string };
const RAW_SLIDES: Slide[] = [
  { id: 'cp-club-selections-2026', iso: '2026-11-05', kind: 'Contest', img: '/photos/2026/CP Selections 2026/Screenshot_2026-11-13-16-46-27-902_com.instagram.android-edit.jpg', title: 'CP Club Selections' },
  { id: 'hello-world-2026', iso: '2026-10-09', kind: 'Exhibition', img: '/photos/2026/Hello World/IMG-20261009-WA0014.jpg', title: 'Hello World' },
  { id: 'icpc-prelims-2026', iso: '2026-10-03', kind: 'Contest', img: '/photos/2026/ICPC 2026/20261003_133339.jpg', title: 'ICPC Prelims' },
  { id: 'project-x-final-meet-2026', iso: '2026-09-27', kind: 'Mentorship', img: '/photos/2026/Project X 2026/Screenshot 2026-10-31 235238.jpg', title: 'Project X Final Meet' },
  { id: 'sih-2026', iso: '2026-08-25', kind: 'Hackathon', img: '/photos/2026/SIH 2026/sih-2026-01.jpg', title: 'Smart India Hackathon' },
  { id: 'routequest-2026', iso: '2026-04-23', kind: 'CTF', pos: '50% 0%', img: '/photos/2026/routequest.jpg', title: 'RouteQuest' },
  { id: 'codehunt-2026', iso: '2026-04-09', kind: 'Contest', pos: '50% 0%', img: '/photos/2026/codehunt.jpg', title: 'Codehunt' },
  { id: 'inheritance-2025-26', iso: '2026-02-15', kind: 'Mentorship', pos: '50% 0%', img: '/photos/2026/inheritance.jpg', title: 'Inheritance' },
  { id: 'hackxcelerate-2026', iso: '2026-02-14', kind: 'Hackathon', pos: '50% 65%', img: '/photos/2026/hackX.jpeg', title: 'HackXcelerate' },
  { id: 'the-lost-probe-2026', iso: '2026-02-01', kind: 'ML challenge', pos: '50% 0%', img: '/photos/2026/lostprobe2.jpg', title: 'The Lost Probe' },
  { id: 'coderush-2026', iso: '2026-02-01', kind: 'Contest', pos: '50% 0%', img: '/photos/2026/coderush.jpg', title: 'CodeRush' },
  { id: 'routing-rush-2026', iso: '2026-02-01', kind: 'Contest', pos: '50% 0%', img: '/photos/2026/routerush.jpg', title: 'Route Rush' },
  { id: 'pixel-perfect-2026', iso: '2026-01-31', kind: 'Frontend', pos: '50% 0%', img: '/photos/2026/pixelperfect.jpg', title: 'Pixel Perfect' },
  { id: 'debug-a-thon-2026', iso: '2026-01-30', kind: 'Debugging', pos: '50% 0%', img: '/photos/2026/debugathon.jpg', title: 'Debug-A-Thon' },
  { id: 'webgenesis-2026', iso: '2026-01-10', kind: 'Mentorship', pos: '50% 0%', img: '/photos/2026/webgenesis.jpg', title: 'Webgenesis' },
  { id: 'icpc-vjti-2026', iso: '2025-11-01', kind: 'Contest', img: '/photos/2026/icpc2.jpeg', title: 'ICPC VJTI Round' },
  { id: 'eth-evening-2025', iso: '2025-10-08', kind: 'Talk', pos: '50% 0%', img: '/photos/2026/ethhevening.jpg', title: 'ETH Evening' },
  { id: 'project-x-2025', iso: '2025-07-15', kind: 'Mentorship', pos: '50% 0%', img: '/photos/2026/ProjectX.jpg', title: 'Project X' },
  { id: 'codeverse', iso: '2025-04-12', kind: 'Tech fest', pos: '50% 70%', img: '/photos/2025/codeverseceremony.jpg', title: 'CodeVerse Ceremony' },
  { id: 'codeverse', iso: '2025-04-11', kind: 'Tech fest', pos: '50% 60%', img: '/photos/2025/codeverseteam.jpg', title: 'CodeVerse Team' },
  { id: 'ai-vs-human', iso: '2025-03-15', kind: 'Contest', img: '/photos/2025/aivshuman.JPG', title: 'AI vs Human' },
  { id: 'api-murder-mystery', iso: '2025-02-15', kind: 'Puzzle hunt', img: '/photos/2025/apimurder.JPG', title: 'API Murder Mystery' },
  { id: 'tech-auction', iso: '2024-11-15', kind: 'Strategy', img: '/photos/2025/auction.jpg', title: 'Tech Auction' },
  { id: 'debugathon', iso: '2024-10-15', kind: 'Debugging', img: '/photos/2025/debugathon.jpg', title: 'Debugathon' },
  { id: 'eth-ctf', iso: '2024-08-15', kind: 'CTF', img: '/photos/2025/ethctf.jpg', title: 'ETH CTF' },
  { id: 'grid-of-doom', iso: '2024-04-15', kind: 'Contest', img: '/photos/2025/gridofdoom.jpg', title: 'Grid of Doom' },
  { id: 'pixel-pursuit', iso: '2024-03-15', kind: 'Frontend', img: '/photos/2025/pixelpursuit.jpg', title: 'Pixel Pursuit' },
  { id: 'travelling-coder', iso: '2023-11-15', kind: 'Contest', img: '/photos/2025/travellingcoder.jpg', title: 'Travelling Coder' },
];
/* newest first; the sort is stable, so same-day events keep the order above */
const SLIDES = [...RAW_SLIDES].sort((a, b) => b.iso.localeCompare(a.iso));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthOf = (iso: string) => MONTHS[Number(iso.slice(5, 7)) - 1];

// Tripled sets: Set A (clones before), Set B (main set), Set C (clones after) for seamless infinite looping
const EXTENDED_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

const AUTOPLAY_MS = 2000;

const Throwback: React.FC = () => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const virtualIndexRef = useRef(SLIDES.length);
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [seen, setSeen] = useState(false);

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
        if (entry.isIntersecting) setSeen(true);
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
      className={`section tb${seen ? ' is-in' : ''}`}
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
            // the first few cards of the middle set are the ones on screen when the section arrives
            const j = idx - SLIDES.length;
            const enter = j >= 0 && j < 5 ? j : 0;
            return (
              <figure className="tb__slide" key={`${s.id}-${s.iso}-${idx}`} style={{ '--j': enter } as React.CSSProperties}>
                <a
                  href={`#events?id=${s.id}`}
                  className="tb__card"
                  onClick={handleSlideClick}
                  aria-label={`${s.title}, ${monthOf(s.iso)} ${s.iso.slice(0, 4)}: view event`}
                >
                  <div className="tb__img">
                    <img src={s.img} alt="" draggable={false} loading="lazy" decoding="async" style={s.pos ? { objectPosition: s.pos } : undefined} />
                  </div>
                  <span className="tb__shade" aria-hidden="true" />

                  <span className="tb__cal" aria-hidden="true">
                    <span className="tb__cal-m" data-text={monthOf(s.iso)}><span>{monthOf(s.iso)}</span></span>
                    <span className="tb__cal-y">{s.iso.slice(0, 4)}</span>
                  </span>
                  <span className="tb__kind" aria-hidden="true">{s.kind}</span>

                  <span className="tb__over" aria-hidden="true">
                    <span className="tb__title">{s.title}</span>
                  </span>

                  {/* round badge: "open event" runs round the rim; pops in and spins on hover */}
                  <span className="tb__go" aria-hidden="true">
                    <svg viewBox="0 0 100 100">
                      <defs>
                        <path id="tb-ring" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                      </defs>
                      <text>
                        <textPath href="#tb-ring" textLength="224">OPEN EVENT · OPEN EVENT ·</textPath>
                      </text>
                    </svg>
                    <span className="tb__go-core" />
                  </span>
                </a>
              </figure>
            );
          })}
        </div>
      </div>

      {/* progress: one segment per slide; the active one fills up in step with autoplay */}
      <div className={`container tb__dots${paused || !isInView || reduce ? ' is-paused' : ''}`} role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={`${s.id}-${s.iso}`}
            className={`tb__dot${i === index ? ' is-active' : ''}${i < index ? ' is-done' : ''}`}
            aria-label={`Go to ${s.title}`}
            aria-selected={i === index}
            role="tab"
            onClick={() => goToSlide(i)}
            style={{ '--dur': `${AUTOPLAY_MS}ms` } as React.CSSProperties}
          >
            {i === index && <span className="tb__dot-fill" key={index} />}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Throwback;
