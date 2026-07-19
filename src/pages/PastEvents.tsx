import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { TimelineContent } from '../components/ui/TimelineContent';
import { Tilt } from '../components/ui/Tilt';
import { EVENTS, type CoCEvent } from '../data/eventsData';
import './PastEvents.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/* sequenced reveals — intro at a readable pace, grid faster */
const introVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(14px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.08, duration: 0.55, ease: EASE },
  }),
};

/* ---------------------------------------------------------- */
/* Photo slider — used in grid cards and the modal hero.
   Directional slide with the house ease; loops; no controls
   for single-photo events. Arrows are invisible until the
   cursor is over the arrow itself, and never bubble clicks
   into the card's open handler.

   mode 'dwell'  (grid):  auto-advances only after the cursor
                          has rested on the card for 1.5s
                          (driven by `hovered`); stops and
                          resets to the first photo on leave.
   mode 'auto'   (modal): advances every 4s from mount; arrow
                          hover/focus pauses it; a manual click
                          restarts the 4s countdown.            */
/* ---------------------------------------------------------- */

const DWELL_DELAY = 1500;
const DWELL_STEP = 1800;
const AUTO_STEP = 4000;

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
      interval = window.setInterval(() => advance(1), DWELL_STEP);
    }, DWELL_DELAY);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
      setState([0, -1]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, many, hovered]);

  /* auto: free-running 4s loop; paused by arrow hover/focus;
     timerEpoch bumps restart the countdown after a manual click */
  useEffect(() => {
    if (mode !== 'auto' || !many || paused) return;
    const interval = window.setInterval(() => advance(1), AUTO_STEP);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, many, paused, timerEpoch]);

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    advance(delta);
    if (mode === 'auto') setTimerEpoch((t) => t + 1); // fresh 4s from this click
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
/* Compact grid card — photo, tight title, one-liner, date and
   CTA. Wrapped in Tilt (micro) + TimelineContent (stagger).
   The photo container morphs into the modal hero (layoutId).  */
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
            <div className="ev-card__foot">
              <span className="ev-card__date">{event.date}</span>
              <span className="ev-card__go">Full story →</span>
            </div>
          </div>
        </article>
      </Tilt>
    </TimelineContent>
  );
};

/* ---------------------------------------------------------- */
/* Detail modal — unchanged shell: the card photo morphs into
   the hero (layoutId), text staggers in after, and Escape /
   overlay / X close through the same reverse animation.       */
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
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
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

  return (
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
        <button type="button" className="ev-modal__close" aria-label="Close" onClick={onClose}>
          <X />
        </button>

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
          <motion.h2 variants={item} id="ev-modal-title" className="ev-modal__title">
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
    </motion.div>
  );
};

/* ---------------------------------------------------------- */

const PastEvents: React.FC = () => {
  const [selected, setSelected] = useState<CoCEvent | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  return (
    <section className="section ev-page">
      <div className="container">
        <div className="ev-page__head" ref={headRef}>
          <div>
            <TimelineContent
              as="span"
              animationNum={0}
              timelineRef={headRef}
              customVariants={introVariants}
              once
              className="eyebrow"
            >
              Event archive
            </TimelineContent>
            <TimelineContent
              as="h1"
              animationNum={1}
              timelineRef={headRef}
              customVariants={introVariants}
              once
              className="section-title"
            >
              Every room <span className="mark">we've filled.</span>
            </TimelineContent>
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
            {EVENTS.length} events · 2016–2026
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
