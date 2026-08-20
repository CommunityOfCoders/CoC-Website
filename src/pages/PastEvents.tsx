import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Quote } from 'lucide-react';
import { TimelineContent } from '../components/ui/TimelineContent';
import { Tilt } from '../components/ui/Tilt';
import Magnetic from '../components/ui/Magnetic';
import CountUp from '../components/ui/CountUp';
import { EVENTS, type CoCEvent } from '../data/eventsData';
import { TESTIMONIALS } from '../data/testimonialsData';
import './PastEvents.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const DWELL_DELAY = 1500;
const SLIDE_STEP = 2800;

/* ---------------------------------------------------------- */
/* Web Audio "pop" synthesiser — no asset file needed.
   A short sine burst at 880 Hz → 440 Hz, 80 ms decay.        */
/* ---------------------------------------------------------- */
function usePop() {
  const play = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(860, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
      osc.onended = () => ctx.close();
    } catch {
      /* Safari private / blocked autoplay — silent fallback */
    }
  }, []);
  return play;
}

/* Softer, descending close-pop: lower pitch, shorter, quieter than open */
function usePopClose() {
  const play = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.11, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.11);
      osc.onended = () => ctx.close();
    } catch {
      /* silent fallback */
    }
  }, []);
  return play;
}

/* ---------------------------------------------------------- */
/* Kinetic word reveal                                         */
/* ---------------------------------------------------------- */
interface KineticWord {
  t: string;
  mark?: boolean;
}

const KineticWords: React.FC<{
  words: KineticWord[];
  timelineRef: React.RefObject<HTMLElement | null>;
  baseDelay?: number;
  stagger?: number;
}> = ({ words, timelineRef, baseDelay = 0, stagger = 0.06 }) => {
  const reduce = useReducedMotion();
  const inView = useInView(timelineRef, { once: true });

  return (
    <>
      {words.map((w, i) => (
        <span className="ev-kinetic__clip" key={`${w.t}-${i}`}>
          {reduce ? (
            <span className={`ev-kinetic__word${w.mark ? ' is-mark' : ''}`}>{w.t}</span>
          ) : (
            <motion.span
              className={`ev-kinetic__word${w.mark ? ' is-mark' : ''}`}
              initial={{ y: '112%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{ duration: 0.65, ease: EASE, delay: baseDelay + i * stagger }}
            >
              {w.t}
            </motion.span>
          )}
        </span>
      ))}
    </>
  );
};

/* ---------------------------------------------------------- */
/* SVG Sticker decorations                                     */
/* ---------------------------------------------------------- */
const StarSticker: React.FC = () => (
  <div className="ev-sticker ev-sticker--star" aria-hidden="true">
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 3L25.09 12.26L35 9.22L29.5 17.78L38 24L28.36 24.82L30.18 34.58L22 29.5L13.82 34.58L15.64 24.82L6 24L14.5 17.78L9 9.22L18.91 12.26L22 3Z"
        fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"
      />
    </svg>
  </div>
);

const HeartSticker: React.FC = () => (
  <div className="ev-sticker ev-sticker--heart" aria-hidden="true">
    <svg viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 34C20 34 3 24.2 3 13C3 7.48 7.48 3 13 3C15.76 3 18.26 4.1 20.1 5.94A9.97 9.97 0 0 1 27 3C32.52 3 37 7.48 37 13C37 24.2 20 34 20 34Z"
        fill="#FB7185" stroke="#F43F5E" strokeWidth="1"
      />
    </svg>
  </div>
);

const CoCSticker: React.FC = () => (
  <div className="ev-sticker ev-sticker--coc" aria-hidden="true">
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="10" fill="#1DB954" />
      <path
        d="M14 16L9 22L14 28M30 16L35 22L30 28M25 13L19 31"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  </div>
);

/* ---------------------------------------------------------- */
/* Polaroid collage flanks                                     */
/* Each frame: warm white border, random rotation, optional    */
/* sticker decal pinned at a corner.                           */
/* ---------------------------------------------------------- */

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=480&q=72`;

interface PolaroidItem {
  src: string;
  rot: number;       /* degrees, positive = clockwise */
  w: number;         /* base width in px */
  top: string;
  inset: string;     /* left% for left-flank, right% for right-flank */
  z: number;
  sticker?: 'star' | 'heart' | 'coc';
  delay: number;     /* entrance stagger delay in seconds */
}

const LEFT_PHOTOS: PolaroidItem[] = [
  { src: u('photo-1504384308090-c894fdcc538d'), rot: -9,  w: 170, top: '7%',  inset: '1%',  z: 3, sticker: 'star',  delay: 0    },
  { src: u('photo-1522202176988-66273c2fd55f'), rot:  6,  w: 136, top: '43%', inset: '16%', z: 4,                   delay: 0.08 },
  { src: u('photo-1519389950473-47ba0277781c'), rot: -3,  w: 154, top: '71%', inset: '-2%', z: 2,                   delay: 0.16 },
  { src: u('photo-1461749280684-dccba630e2f6'), rot: 13,  w: 106, top: '21%', inset: '22%', z: 1,                   delay: 0.06 },
];

const RIGHT_PHOTOS: PolaroidItem[] = [
  { src: u('photo-1540575467063-178a50c2df87'), rot:  7,  w: 160, top: '6%',  inset: '1%',  z: 3,                   delay: 0.04 },
  { src: u('photo-1528901166007-3784c7dd3653'), rot: -7,  w: 132, top: '41%', inset: '14%', z: 4, sticker: 'heart', delay: 0.12 },
  { src: u('photo-1517245386807-bb43f82c33c4'), rot:  4,  w: 148, top: '69%', inset: '-1%', z: 2, sticker: 'coc',  delay: 0.20 },
  { src: u('photo-1552664730-d307ca884978'),   rot: -11, w: 108, top: '19%', inset: '21%', z: 1,                   delay: 0.02 },
];

const PolaroidFlank: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const photos = side === 'left' ? LEFT_PHOTOS : RIGHT_PHOTOS;
  const reduce = useReducedMotion();

  return (
    <>
      {photos.map((p, i) => (
        <motion.div
          key={`${side}-${i}`}
          className="ev-polaroid"
          style={{
            '--rot': `${p.rot}deg`,
            top: p.top,
            [side]: p.inset,
            width: p.w,
            zIndex: p.z,
          } as React.CSSProperties}
          initial={reduce ? false : { opacity: 0, scale: 0.82, rotate: p.rot * 1.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, rotate: p.rot, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: p.delay }}
          whileHover={reduce ? undefined : {
            scale: 1.07,
            rotate: p.rot * 0.25,
            y: -6,
            zIndex: 20,
            transition: { duration: 0.3, ease: EASE },
          }}
        >
          <div className="ev-polaroid__img">
            <img src={p.src} alt="" draggable={false} />
          </div>
          {p.sticker === 'star'  && <StarSticker />}
          {p.sticker === 'heart' && <HeartSticker />}
          {p.sticker === 'coc'   && <CoCSticker />}
        </motion.div>
      ))}
    </>
  );
};


/* ---------------------------------------------------------- */
/* Photo slider — used in both grid cards (dwell) and modal   */
/* ---------------------------------------------------------- */
const PhotoSlider: React.FC<{
  photos: string[];
  alt: string;
  mode?: 'dwell' | 'auto';
  hovered?: boolean;
  showDots?: boolean;
}> = ({ photos, alt, mode, hovered, showDots = false }) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const [timerEpoch, setTimerEpoch] = useState(0);
  const reduce = useReducedMotion();
  const many = photos.length > 1;

  const advance = (delta: number) =>
    setState(([i]) => [(i + delta + photos.length) % photos.length, delta]);

  useEffect(() => {
    if (mode !== 'dwell' || !many || !hovered) return;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => advance(1), SLIDE_STEP);
    }, DWELL_DELAY);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
      setState([0, -1]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, many, hovered]);

  useEffect(() => {
    if (mode !== 'auto' || !many || paused) return;
    const interval = window.setInterval(() => advance(1), SLIDE_STEP);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, many, paused, timerEpoch]);

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    advance(delta);
    if (mode === 'auto') setTimerEpoch((t) => t + 1);
  };

  const goTo = (i: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setState(([cur]) => [i, i > cur ? 1 : -1]);
    if (mode === 'auto') setTimerEpoch((t) => t + 1);
  };

  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { x: d > 0 ? '-100%' : '100%' }),
  };

  const arrowProps = (delta: number, label: string) => ({
    type: 'button' as const,
    'aria-label': label,
    onClick: go(delta),
    onKeyDown: (e: React.KeyboardEvent) => e.stopPropagation(),
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  });

  return (
    <div className="ev-slider">
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={index}
          src={photos[index]}
          alt={alt}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: EASE }}
          draggable={false}
        />
      </AnimatePresence>

      {many && (
        <>
          <button
            className="ev-slider__arrow ev-slider__arrow--prev"
            {...arrowProps(-1, 'Previous photo')}
          >
            <ChevronLeft />
          </button>
          <button
            className="ev-slider__arrow ev-slider__arrow--next"
            {...arrowProps(1, 'Next photo')}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {showDots && many && (
        <div className="ev-slider__dots" role="tablist" aria-label="Photo">
          {photos.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}`}
              className={`ev-slider__dot${i === index ? ' is-active' : ''}`}
              onClick={goTo(i)}
              onKeyDown={(e) => e.stopPropagation()}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------- */
/* Full-bleed image card                                       */
/* ---------------------------------------------------------- */

/**
 * Returns true when the event's ISO date is between now and
 * `windowDays` days in the future (default 45). Events in the
 * past or too far ahead are silently excluded.
 */
function isUpcoming(isoDate: string, windowDays = 45): boolean {
  const now = Date.now();
  const eventMs = new Date(isoDate).getTime();
  return eventMs > now && eventMs <= now + windowDays * 86_400_000;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.95, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { delay: i * 0.06, duration: 0.5, ease: EASE },
  }),
};

const EventCard: React.FC<{
  event: CoCEvent;
  index: number;
  gridRef: React.RefObject<HTMLUListElement | null>;
  onOpen: (ev: CoCEvent) => void;
}> = ({ event, index, gridRef, onOpen }) => {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <TimelineContent
      as="li"
      animationNum={index}
      timelineRef={gridRef}
      customVariants={cardVariants}
      once
    >
      <Tilt
        className="ev-tilt"
        rotationFactor={4}
        springOptions={{ stiffness: 120, damping: 18 }}
      >
        <article
          id={`event-${event.id}`}
          className="ev-card"
          role="button"
          tabIndex={0}
          aria-label={`${event.name} — open details`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onOpen(event)}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen(event);
            }
          }}
        >
          {/* Full-bleed background image + badge pinned inside the image */}
          <motion.div
            layoutId={reduce ? undefined : `event-photo-${event.id}`}
            className="ev-card__media"
            transition={{ duration: 0.5, ease: EASE }}
          >
            <PhotoSlider photos={event.photos} alt={event.name} mode="dwell" hovered={hovered} />

            {/* Badge sits inside the media layer — truly overlaid on the photo */}
            {isUpcoming(event.isoDate) && (
              <div className="ev-card__badge" aria-label="Upcoming event">
                <span className="ev-card__badge-dot" aria-hidden="true" />
                Upcoming
              </div>
            )}
          </motion.div>

          {/* Gradient scrim + text overlay */}
          <div className="ev-card__overlay">
            <div className="ev-card__meta">
              <span className="ev-card__date">{event.date}</span>
              {event.prizePool !== 'N/A' && (
                <span className="ev-card__prize">{event.prizePool}</span>
              )}
            </div>
            <h3 className="ev-card__name">{event.name}</h3>
            <p className="ev-card__summary">{event.summary}</p>
          </div>
        </article>
      </Tilt>
    </TimelineContent>
  );
};

/* ---------------------------------------------------------- */
/* Detail modal                                               */
/* ---------------------------------------------------------- */
const EventModal: React.FC<{ event: CoCEvent; onClose: () => void }> = ({ event, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pop = usePop();
  const popClose = usePopClose();

  /* Play close sound then dismiss — shared by all three close paths */
  const handleClose = useCallback(() => {
    popClose();
    onClose();
  }, [onClose, popClose]);
  useEffect(() => {
    pop();

    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('.ev-modal__close')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { handleClose(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = ref.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      opener?.focus();
    };
  }, [handleClose, pop]);

  const hasPrize = event.prizePool !== 'N/A';

  const item = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

  const titleItem = reduce
    ? item
    : {
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
      };

  return createPortal(
    <motion.div
      className="ev-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={handleClose}
    >
      <motion.div
        ref={ref}
        className="ev-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ev-modal-title"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.38, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <Magnetic className="ev-modal__close-wrap" strength={0.3}>
          <button type="button" className="ev-modal__close" aria-label="Close" onClick={handleClose}>
            <X />
          </button>
        </Magnetic>

        {/* Image slider with dot nav */}
        <motion.div
          layoutId={reduce ? undefined : `event-photo-${event.id}`}
          className="ev-modal__hero"
          transition={{ duration: 0.5, ease: EASE }}
        >
          <PhotoSlider photos={event.photos} alt={event.name} mode="auto" showDots />
        </motion.div>

        <motion.div
          className="ev-modal__body"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: reduce ? undefined : { staggerChildren: 0.07, delayChildren: 0.28 },
            },
          }}
        >
          <motion.span variants={item} className="eyebrow">
            Event archive
          </motion.span>
          <motion.h2 variants={titleItem} id="ev-modal-title" className="ev-modal__title">
            {event.name}
          </motion.h2>

          <div className="ev-modal__cols">
            <motion.div variants={item} className="ev-modal__desc">
              <span className="ev-modal__label">Description</span>
              <p>{event.description}</p>
            </motion.div>

            <aside className="ev-modal__rail">
              <motion.div variants={item} className="ev-modal__field">
                <span className="ev-modal__label">Location</span>
                <span className="ev-modal__value">{event.location}</span>
              </motion.div>
              <motion.div variants={item} className="ev-modal__field">
                <span className="ev-modal__label">Date</span>
                <span className="ev-modal__value">{event.date}</span>
              </motion.div>
              <motion.div variants={item} className="ev-modal__field">
                <span className="ev-modal__label">Prize pool</span>
                <span className={`ev-modal__value${hasPrize ? ' ev-modal__value--prize' : ''}`}>
                  {event.prizePool}
                </span>
              </motion.div>
            </aside>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

/* ---------------------------------------------------------- */
/* Testimonials horizontal marquee                            */
/* ---------------------------------------------------------- */
const TestimonialsMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  return (
    <section className="ev-testimonials" aria-label="What members say">
      <div className="container">
        <div className="ev-testimonials__head">
          <span className="eyebrow">What members say</span>
          <h2 className="ev-testimonials__title">
            Rooms full of<br />
            <span className="ev-testimonials__title-mark">real people.</span>
          </h2>
        </div>
      </div>

      <div
        className="ev-testimonials__track-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className={`ev-testimonials__track${paused ? ' is-paused' : ''}`}
          aria-live="off"
        >
          {/* Duplicate for seamless loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="ev-tcard"
              aria-label={`Testimonial by ${t.author}`}
            >
              <Quote className="ev-tcard__icon" aria-hidden="true" />
              <p className="ev-tcard__quote">{t.quote}</p>
              <footer className="ev-tcard__footer">
                <div className="ev-tcard__avatar" aria-hidden="true">
                  {t.author.charAt(0)}
                </div>
                <div className="ev-tcard__info">
                  <a
                    href={t.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ev-tcard__username"
                  >
                    @{t.username}
                  </a>
                  <a
                    href={t.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ev-tcard__company"
                  >
                    {t.company}
                  </a>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------- */
/* Intro copy variants                                         */
/* ---------------------------------------------------------- */
const introVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(14px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};

const TITLE_WORDS: KineticWord[] = [
  { t: 'Every' },
  { t: 'room' },
  { t: "we've", mark: true },
  { t: 'filled.', mark: true },
];
const EYEBROW_WORDS: KineticWord[] = [{ t: 'Event' }, { t: 'archive' }];

/* ---------------------------------------------------------- */
/* Page root                                                   */
/* ---------------------------------------------------------- */
const PastEvents: React.FC = () => {
  const [selected, setSelected] = useState<CoCEvent | null>(null);
  const reduce = useReducedMotion();
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const checkHashEvent = () => {
      const hash = window.location.hash;
      const match = hash.match(/[?&]id=([^&]+)/) || hash.match(/#events\/([^?&]+)/) || hash.match(/[?&]event=([^&]+)/);
      if (match) {
        const eventId = decodeURIComponent(match[1]);
        const found = EVENTS.find((e) => e.id === eventId);
        if (found) {
          setSelected(found);
          setTimeout(() => {
            const el = document.getElementById(`event-${eventId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 150);
        }
      }
    };

    checkHashEvent();
    window.addEventListener('hashchange', checkHashEvent);
    return () => window.removeEventListener('hashchange', checkHashEvent);
  }, []);

  const handleClose = () => {
    setSelected(null);
    if (window.location.hash.includes('?id=') || window.location.hash.includes('?event=') || window.location.hash.includes('#events/')) {
      window.history.replaceState(null, '', '#events');
    }
  };

  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ['start 0.95', 'end 0.25'],
  });
  const headScale = useTransform(scrollYProgress, [0, 1], [0.985, 1.01]);
  const headSkew = useTransform(scrollYProgress, [0, 1], [-1.4, 0.4]);

  return (
    <>
      <section className="section ev-page">
        {/* ── Hero: polaroid collage flanks + centre heading ── */}
        <div className="ev-hero" ref={headRef}>
          {/* Polaroids are position:absolute within ev-hero */}
          <PolaroidFlank side="left" />
          <PolaroidFlank side="right" />

          {/* Centre text column */}
          <div className="ev-hero__center">
            <span className="eyebrow">
              <KineticWords words={EYEBROW_WORDS} timelineRef={headRef} stagger={0.09} />
            </span>
            <motion.h1
              className="section-title ev-page__title"
              style={
                reduce
                  ? undefined
                  : { scale: headScale, skewX: headSkew, transformOrigin: 'center bottom' }
              }
            >
              <KineticWords words={TITLE_WORDS} timelineRef={headRef} baseDelay={0.12} />
            </motion.h1>
            <TimelineContent
              as="p"
              animationNum={2}
              timelineRef={headRef}
              customVariants={introVariants}
              once
              className="ev-page__intro"
            >
              From late-night hackathons to quiet Sunday workshops — a running record of what
              we've built together, one gathering at a time.
            </TimelineContent>
            <TimelineContent
              as="span"
              animationNum={3}
              timelineRef={headRef}
              customVariants={introVariants}
              once
              className="ev-page__count"
            >
              <CountUp to={EVENTS.length} duration={1.2} /> events · 2016–2026
            </TimelineContent>
          </div>
        </div>

        {/* ── Events grid ─────────────────────────────────── */}
        <div className="container">
          <ul className="ev-grid" ref={gridRef}>
            {EVENTS.map((ev, i) => (
              <EventCard key={ev.id} event={ev} index={i} gridRef={gridRef} onOpen={setSelected} />
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {selected && <EventModal event={selected} onClose={handleClose} />}
        </AnimatePresence>
      </section>

      {/* ── Testimonials marquee ─────────────────────────── */}
      <TestimonialsMarquee />
    </>
  );
};

export default PastEvents;
