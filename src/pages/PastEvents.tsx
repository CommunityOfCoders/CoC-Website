import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { EVENTS, type CoCEvent } from '../data/eventsData';
import './PastEvents.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/* "March 2026" → { month: "March", year: "2026" } */
const splitDate = (date: string) => {
  const [month, year] = date.split(' ');
  return { month, year };
};

/* ---------------------------------------------------------- */
/* Photo slider — grid cards only. Slides directionally with
   the house ease; loops; no controls for single-photo events.
   Arrow clicks never bubble into the card's open handler.     */
/* ---------------------------------------------------------- */

const PhotoSlider: React.FC<{ photos: string[]; alt: string }> = ({ photos, alt }) => {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setState(([i]) => [(i + delta + photos.length) % photos.length, delta]);
  };

  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { x: d > 0 ? '-100%' : '100%' }),
  };

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

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="ev-slider__arrow ev-slider__arrow--prev"
            aria-label="Previous photo"
            onClick={go(-1)}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="ev-slider__arrow ev-slider__arrow--next"
            aria-label="Next photo"
            onClick={go(1)}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

/* ---------------------------------------------------------- */
/* Poster card — 9:16, photo on the top 60%, info on the rest.
   The year numeral sits on the seam: the archive's real axis
   is time, so the year leads every card.                      */
/* ---------------------------------------------------------- */

const EventCard: React.FC<{ event: CoCEvent; index: number; onOpen: (ev: CoCEvent) => void }> = ({
  event,
  index,
  onOpen,
}) => {
  const { month, year } = splitDate(event.date);
  return (
    <Reveal as="li" delay={(index % 3) * 0.08}>
      <article
        className="ev-card"
        role="button"
        tabIndex={0}
        aria-label={`${event.name} — open details`}
        onClick={() => onOpen(event)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return; // slider arrows keep their keys
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(event);
          }
        }}
      >
        <div className="ev-card__media">
          <PhotoSlider photos={event.photos} alt={event.name} />
        </div>

        <span className="ev-card__year" aria-hidden>
          {year}
        </span>

        <div className="ev-card__info">
          <span className="ev-card__meta">
            {month} · {event.location}
          </span>
          <h3 className="ev-card__name">{event.name}</h3>
          <p className="ev-card__summary">{event.summary}</p>
          <span className="ev-card__go">
            Full story <ArrowUpRight />
          </span>
        </div>
      </article>
    </Reveal>
  );
};

/* ---------------------------------------------------------- */
/* Detail view — cinematic photo, then description on the left
   and a hairline meta rail (location / date / prize) on the
   right. Focus-trapped; Escape / overlay / X all close through
   the same exit animation.                                    */
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
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="ev-modal__close" aria-label="Close" onClick={onClose}>
          <X />
        </button>

        <figure className="ev-modal__photo">
          <img src={event.photos[0]} alt={event.name} />
        </figure>

        <div className="ev-modal__body">
          <span className="eyebrow">Event archive</span>
          <h2 id="ev-modal-title" className="ev-modal__title">
            {event.name}
          </h2>

          <div className="ev-modal__cols">
            <div className="ev-modal__desc">
              <span className="ev-modal__label">Description</span>
              <p>{event.description}</p>
            </div>

            <aside className="ev-modal__rail">
              <div className="ev-modal__field">
                <span className="ev-modal__label">Location</span>
                <span className="ev-modal__value">{event.location}</span>
              </div>
              <div className="ev-modal__field">
                <span className="ev-modal__label">Date</span>
                <span className="ev-modal__value">{event.date}</span>
              </div>
              <div className="ev-modal__field">
                <span className="ev-modal__label">Prize pool</span>
                <span className={`ev-modal__value${hasPrize ? ' ev-modal__value--prize' : ''}`}>
                  {event.prizePool}
                </span>
              </div>
            </aside>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------------------------------------------------------- */

const PastEvents: React.FC = () => {
  const [selected, setSelected] = useState<CoCEvent | null>(null);

  return (
    <section className="section ev-page">
      <div className="container">
        <div className="ev-page__head">
          <div>
            <Reveal>
              <span className="eyebrow">Past events</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="section-title">
                Our community <span className="mark">in action.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="ev-page__intro">
                A decade of hackathons, workshops, talks and sprints — the nights the labs stayed
                open. Click any event for the full story.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <span className="ev-page__count">{EVENTS.length} events · 2016—2026</span>
          </Reveal>
        </div>

        <ul className="ev-grid">
          {EVENTS.map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i} onOpen={setSelected} />
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
