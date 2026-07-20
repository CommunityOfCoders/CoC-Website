import React, { useEffect, useRef, useState } from 'react';
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
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TimelineContent } from '../components/ui/TimelineContent';
import { Tilt } from '../components/ui/Tilt';
import Magnetic from '../components/ui/Magnetic';
import CountUp from '../components/ui/CountUp';
import { EVENTS, type CoCEvent } from '../data/eventsData';
import './PastEvents.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/* unified slider pace: grid dwell and modal share the same rhythm */
const DWELL_DELAY = 1500;
const SLIDE_STEP = 2500;

/* body copy keeps the blur/slide reveal; heading + eyebrow go kinetic */
const introVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(14px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};
/* richer card entrance: rotated + scaled-down + blurred → resting */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.94, rotate: -2.5, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.07, duration: 0.5, ease: EASE },
  }),
};

/* ---------------------------------------------------------- */
/* Kinetic word reveal — each word rises out of its own clip,
   staggered, when the timeline element scrolls into view.
   Reduced motion: plain static text.                          */
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

const TITLE_WORDS: KineticWord[] = [
  { t: 'Every' },
  { t: 'room' },
  { t: "we've", mark: true },
  { t: 'filled.', mark: true },
];
const EYEBROW_WORDS: KineticWord[] = [{ t: 'Event' }, { t: 'archive' }];

/* ---------------------------------------------------------- */
/* Photo slider — used in grid cards and the modal hero.
   Directional slide with the house ease; loops; no controls
   for single-photo events. Arrows are invisible until the
   cursor (or focus) is on the arrow itself.

   mode 'dwell'  (grid):  starts advancing only after the
                          cursor has rested on the card 1.5s
                          (driven by `hovered`); resets on leave.
   mode 'auto'   (modal): advances every 2.5s from mount; arrow
                          hover/focus pauses; a manual click
                          restarts the countdown.               */
/* ---------------------------------------------------------- */

const PhotoSlider: React.FC<{
  photos: string[];
  alt: string;
  mode?: 'dwell' | 'auto';
  hovered?: boolean;
}> = ({ photos, alt, mode, hovered }) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const [timerEpoch, setTimerEpoch] = useState(0);
  const reduce = useReducedMotion();
  const many = photos.length > 1;

  const advance = (delta: number) =>
    setState(([i]) => [(i + delta + photos.length) % photos.length, delta]);

  /* dwell: arm after 1.5s of hover, then step; reset on leave */
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

  /* auto: free-running loop; paused by arrow hover/focus;
     timerEpoch bumps restart the countdown after a manual click */
  useEffect(() => {
    if (mode !== 'auto' || !many || paused) return;
    const interval = window.setInterval(() => advance(1), SLIDE_STEP);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, many, paused, timerEpoch]);

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    advance(delta);
    if (mode === 'auto') setTimerEpoch((t) => t + 1); // fresh countdown from this click
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
    </div>
  );
};

/* ---------------------------------------------------------- */
/* Framed grid card — photo, tight title, one-liner, date.
   Whole card clickable; Tilt micro-tilt; layoutId morph.      */
/* ---------------------------------------------------------- */

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
        rotationFactor={6}
        springOptions={{ stiffness: 120, damping: 16 }}
      >
        <article
          className="ev-card"
          role="button"
          tabIndex={0}
          aria-label={`${event.name} — open details`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onOpen(event)}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return; // slider arrows keep their keys
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen(event);
            }
          }}
        >
          <motion.div
            layoutId={reduce ? undefined : `event-photo-${event.id}`}
            className="ev-card__media"
            transition={{ duration: 0.5, ease: EASE }}
          >
            <PhotoSlider photos={event.photos} alt={event.name} mode="dwell" hovered={hovered} />
          </motion.div>

          <div className="ev-card__panel">
            <h3 className="ev-card__name">{event.name}</h3>
            <p className="ev-card__summary">{event.summary}</p>
            <span className="ev-card__date">{event.date}</span>
          </div>
        </article>
      </Tilt>
    </TimelineContent>
  );
};

/* ---------------------------------------------------------- */
/* Detail modal — photo morphs in via layoutId; the title lands
   as its own bold beat in the stagger; Escape / overlay / X
   all close through the same reverse animation.               */
/* ---------------------------------------------------------- */

const EventModal: React.FC<{ event: CoCEvent; onClose: () => void }> = ({ event, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('.ev-modal__close')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = ref.current.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open'); // header recedes behind the overlay
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      opener?.focus();
    };
  }, [onClose]);

  const hasPrize = event.prizePool !== 'N/A';

  const item = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };
  /* the title gets its own, weightier beat in the sequence */
  const titleItem = reduce
    ? item
    : {
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
      };

  /* portaled to <body>: the page wraps sections in their own stacking
     contexts (.shell main > * has z-index:1), which would trap the
     overlay beneath the fixed header no matter its z-index */
  return createPortal(
    <motion.div
      className="ev-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        className="ev-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ev-modal-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <Magnetic className="ev-modal__close-wrap" strength={0.3}>
          <button type="button" className="ev-modal__close" aria-label="Close" onClick={onClose}>
            <X />
          </button>
        </Magnetic>

        <motion.div
          layoutId={reduce ? undefined : `event-photo-${event.id}`}
          className="ev-modal__hero"
          transition={{ duration: 0.5, ease: EASE }}
        >
          <PhotoSlider photos={event.photos} alt={event.name} mode="auto" />
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

const PastEvents: React.FC = () => {
  const [selected, setSelected] = useState<CoCEvent | null>(null);
  const reduce = useReducedMotion();
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  /* scroll-linked kinetic energy on the big heading */
  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ['start 0.95', 'end 0.25'],
  });
  const headScale = useTransform(scrollYProgress, [0, 1], [0.985, 1.01]);
  const headSkew = useTransform(scrollYProgress, [0, 1], [-1.4, 0.4]);

  return (
    <section className="section ev-page">
      <div className="container">
        <div className="ev-page__head" ref={headRef}>
          <div>
            <span className="eyebrow">
              <KineticWords words={EYEBROW_WORDS} timelineRef={headRef} stagger={0.09} />
            </span>
            <motion.h1
              className="section-title ev-page__title"
              style={
                reduce
                  ? undefined
                  : { scale: headScale, skewX: headSkew, transformOrigin: 'left bottom' }
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
          </div>
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

        <ul className="ev-grid" ref={gridRef}>
          {EVENTS.map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i} gridRef={gridRef} onOpen={setSelected} />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default PastEvents;
