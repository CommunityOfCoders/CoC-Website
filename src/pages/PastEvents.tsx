import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TimelineContent } from "../components/ui/TimelineContent";
import { Tilt } from "../components/ui/Tilt";
import CountUp from "../components/ui/CountUp";
import { EVENTS, type CoCEvent } from "../data/eventsData";
import photo2 from "../assets/2.jpg";
import photo3 from "../assets/3.jpg";
import photo4 from "../assets/4.jpeg";
import photo5 from "../assets/5.jpeg";
import photo6 from "../assets/6.jpeg";
import photo7 from "../assets/7.jpg";
import photo8 from "../assets/8.jpg";
import photo9 from "../assets/9.jpg";

import review1 from "../assets/reviews/Screenshot 2026-09-16 153005.png";
import review2 from "../assets/reviews/Screenshot 2026-09-16 153012.png";
import review3 from "../assets/reviews/Screenshot 2026-09-16 153024.png";
import review4 from "../assets/reviews/Screenshot 2026-09-16 153028.png";
import review5 from "../assets/reviews/Screenshot 2026-09-16 153032.png";
import review6 from "../assets/reviews/Screenshot 2026-09-16 153036.png";
import review7 from "../assets/reviews/Screenshot 2026-09-16 153041.png";
import review8 from "../assets/reviews/Screenshot 2026-09-16 153045.png";
import review9 from "../assets/reviews/Screenshot 2026-09-16 153515.png";

const REVIEWS = [
  { src: review1, position: "center 51.5%" },
  { src: review2, position: "center 44.5%" },
  { src: review3, position: "center 40.4%" },
  { src: review4, position: "center 43.7%" },
  { src: review5, position: "center 45.9%" },
  { src: review6, position: "center 47.4%" },
  { src: review7, position: "center 44.5%" },
  { src: review8, position: "center 42.4%" },
  { src: review9, position: "center 64.3%" },
];
import "./PastEvents.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const DWELL_DELAY = 1500;
const SLIDE_STEP = 2800;

/* ---------------------------------------------------------- */
/* Web Audio "pop" synthesiser - no asset file needed.
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
      osc.type = "sine";
      osc.frequency.setValueAtTime(860, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
      osc.onended = () => ctx.close();
    } catch {
      /* Safari private / blocked autoplay - silent fallback */
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
      osc.type = "sine";
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
            <span className={`ev-kinetic__word${w.mark ? " is-mark" : ""}`}>
              {w.t}
            </span>
          ) : (
            <motion.span
              className={`ev-kinetic__word${w.mark ? " is-mark" : ""}`}
              initial={{ y: "112%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                duration: 0.65,
                ease: EASE,
                delay: baseDelay + i * stagger,
              }}
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
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="1"
      />
    </svg>
  </div>
);

const HeartSticker: React.FC = () => (
  <div className="ev-sticker ev-sticker--heart" aria-hidden="true">
    <svg viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 34C20 34 3 24.2 3 13C3 7.48 7.48 3 13 3C15.76 3 18.26 4.1 20.1 5.94A9.97 9.97 0 0 1 27 3C32.52 3 37 7.48 37 13C37 24.2 20 34 20 34Z"
        fill="#FB7185"
        stroke="#F43F5E"
        strokeWidth="1"
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
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

/* ---------------------------------------------------------- */
/* Polaroid collage flanks                                     */
/* Each frame: warm white border, random rotation, optional    */
/* sticker decal pinned at a corner.                           */
/* ---------------------------------------------------------- */



interface PolaroidItem {
  src: string;
  rot: number; /* degrees, positive = clockwise */
  w: number; /* base width in px */
  top: string;
  inset: string; /* left% for left-flank, right% for right-flank */
  z: number;
  sticker?: "star" | "heart" | "coc";
  delay: number; /* entrance stagger delay in seconds */
}

const LEFT_PHOTOS: PolaroidItem[] = [
  {
    src: photo2,
    rot: -9,
    w: 170,
    top: "7%",
    inset: "1%",
    z: 3,
    sticker: "star",
    delay: 0,
  },
  { src: photo3, rot: 6, w: 136, top: "43%", inset: "16%", z: 4, delay: 0.08 },
  { src: photo4, rot: -3, w: 154, top: "71%", inset: "-2%", z: 2, delay: 0.16 },
  { src: photo5, rot: 13, w: 106, top: "21%", inset: "22%", z: 1, delay: 0.06 },
];

const RIGHT_PHOTOS: PolaroidItem[] = [
  { src: photo6, rot: 7, w: 160, top: "6%", inset: "1%", z: 3, delay: 0.04 },
  {
    src: photo7,
    rot: -7,
    w: 132,
    top: "41%",
    inset: "14%",
    z: 4,
    sticker: "heart",
    delay: 0.12,
  },
  {
    src: photo8,
    rot: 4,
    w: 148,
    top: "69%",
    inset: "-1%",
    z: 2,
    sticker: "coc",
    delay: 0.2,
  },
  {
    src: photo9,
    rot: -11,
    w: 108,
    top: "19%",
    inset: "21%",
    z: 1,
    delay: 0.02,
  },
];

const PolaroidFlank: React.FC<{ side: "left" | "right" }> = ({ side }) => {
  const photos = side === "left" ? LEFT_PHOTOS : RIGHT_PHOTOS;
  const reduce = useReducedMotion();

  return (
    <>
      {photos.map((p, i) => (
        <motion.div
          key={`${side}-${i}`}
          className="ev-polaroid"
          style={
            {
              "--rot": `${p.rot}deg`,
              top: p.top,
              [side]: p.inset,
              width: p.w,
              zIndex: p.z,
            } as React.CSSProperties
          }
          initial={
            reduce
              ? false
              : { opacity: 0, scale: 0.82, rotate: p.rot * 1.8, y: 20 }
          }
          animate={{ opacity: 1, scale: 1, rotate: p.rot, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: p.delay }}
          whileHover={
            reduce
              ? undefined
              : {
                  scale: 1.07,
                  rotate: p.rot * 0.25,
                  y: -6,
                  zIndex: 20,
                  transition: { duration: 0.3, ease: EASE },
                }
          }
        >
          <div className="ev-polaroid__img">
            <img src={p.src} alt="" draggable={false} />
          </div>
          {p.sticker === "star" && <StarSticker />}
          {p.sticker === "heart" && <HeartSticker />}
          {p.sticker === "coc" && <CoCSticker />}
        </motion.div>
      ))}
    </>
  );
};

/* ---------------------------------------------------------- */
/* Photo slider - used in both grid cards (dwell) and modal   */
/* ---------------------------------------------------------- */
const PhotoSlider: React.FC<{
  photos: string[];
  alt: string;
  mode?: "dwell" | "auto";
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
    if (mode !== "dwell" || !many || !hovered) return;
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
    if (mode !== "auto" || !many || paused) return;
    const interval = window.setInterval(() => advance(1), SLIDE_STEP);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, many, paused, timerEpoch]);

  const go = (delta: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    advance(delta);
    if (mode === "auto") setTimerEpoch((t) => t + 1);
  };

  const goTo = (i: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setState(([cur]) => [i, i > cur ? 1 : -1]);
    if (mode === "auto") setTimerEpoch((t) => t + 1);
  };

  const variants = {
    enter: (d: number) =>
      reduce ? { opacity: 0 } : { x: d > 0 ? "100%" : "-100%" },
    center: { x: 0, opacity: 1 },
    exit: (d: number) =>
      reduce ? { opacity: 0 } : { x: d > 0 ? "-100%" : "100%" },
  };

  const arrowProps = (delta: number, label: string) => ({
    type: "button" as const,
    "aria-label": label,
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
            {...arrowProps(-1, "Previous photo")}
          >
            <ChevronLeft />
          </button>
          <button
            className="ev-slider__arrow ev-slider__arrow--next"
            {...arrowProps(1, "Next photo")}
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
              className={`ev-slider__dot${i === index ? " is-active" : ""}`}
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
  hidden: { opacity: 0, y: 28, scale: 0.95, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
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
          aria-label={`${event.name} - open details`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onOpen(event)}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "Enter" || e.key === " ") {
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
            <PhotoSlider
              photos={event.photos}
              alt={event.name}
              mode="dwell"
              hovered={hovered}
            />

            {/* Badge sits inside the media layer - truly overlaid on the photo */}
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
              {event.prizePool !== "N/A" && (
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
/* Detail drawer (matches OpenSource contributor drawer style) */
/* ---------------------------------------------------------- */
const EventModal: React.FC<{ event: CoCEvent; onClose: () => void }> = ({
  event,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pop = usePop();
  const popClose = usePopClose();

  const handleClose = useCallback(() => {
    popClose();
    onClose();
  }, [onClose, popClose]);

  useEffect(() => {
    pop();

    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>(".ev-drawer-close")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
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

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      opener?.focus();
    };
  }, [handleClose, pop]);

  const hasPrize = event.prizePool !== "N/A";

  /* Split event name: outlined first part + accent last word */
  const words = event.name.split(" ");
  const firstName = words.slice(0, -1).join(" ") || words[0];
  const lastName = words.length > 1 ? words[words.length - 1] : "";

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="ev-drawer-backdrop is-open"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        ref={ref as React.RefObject<HTMLElement>}
        className="ev-drawer-panel is-open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ev-drawer-title"
      >
        {/* Sticky header */}
        <div className="ev-drawer-header">
          <span className="eyebrow">Event Archive</span>
          <button
            type="button"
            className="ev-drawer-close"
            aria-label="Close"
            onClick={handleClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="ev-drawer-content">
          {/* Big display title — outlined first part + accent last word */}
          <h2 id="ev-drawer-title" className="ev-drawer-name">
            <span className="ev-drawer-name__first">{firstName}</span>
            {lastName && (
              <span className="ev-drawer-name__last"> {lastName}</span>
            )}
          </h2>

          {/* Meta: date · location */}
          <div className="ev-drawer-meta">
            {event.date} · {event.location}
          </div>

          {/* Photo slider */}
          <div className="ev-drawer-section">
            <div className="ev-drawer-section-label">Photos</div>
            <div className="ev-drawer-photo">
              <PhotoSlider
                photos={event.photos}
                alt={event.name}
                mode="auto"
                showDots
              />
            </div>
          </div>

          {/* Description */}
          <div className="ev-drawer-section">
            <div className="ev-drawer-section-label">Description</div>
            <p className="ev-drawer-about">{event.description}</p>
          </div>

          {/* Location */}
          <div className="ev-drawer-section">
            <div className="ev-drawer-section-label">Location</div>
            <span className="ev-drawer-value">{event.location}</span>
          </div>

          {/* Date */}
          <div className="ev-drawer-section">
            <div className="ev-drawer-section-label">Date</div>
            <span className="ev-drawer-value">{event.date}</span>
          </div>

          {/* Prize pool */}
          <div className="ev-drawer-section">
            <div className="ev-drawer-section-label">Prize Pool</div>
            <span
              className={`ev-drawer-value${hasPrize ? " ev-drawer-value--prize" : ""}`}
            >
              {event.prizePool}
            </span>
          </div>
        </div>
      </aside>
    </>,
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
            Rooms full of
            <br />
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
          className={`ev-testimonials__track${paused ? " is-paused" : ""}`}
          aria-live="off"
        >
          {/* Duplicate for seamless loop */}
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <article
              key={`review-${i}`}
              className="ev-tcard"
              aria-label={`Review ${i}`}
            >
              <img 
                src={review.src} 
                alt="Member Review" 
                className="ev-tcard__image" 
                style={{ objectPosition: review.position }}
              />
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
  hidden: { opacity: 0, y: 26, filter: "blur(14px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};

const TITLE_WORDS: KineticWord[] = [
  { t: "Every" },
  { t: "room" },
  { t: "we've", mark: true },
  { t: "filled.", mark: true },
];
const EYEBROW_WORDS: KineticWord[] = [{ t: "Event" }, { t: "archive" }];

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
      const match =
        hash.match(/[?&]id=([^&]+)/) ||
        hash.match(/#events\/([^?&]+)/) ||
        hash.match(/[?&]event=([^&]+)/);
      if (match) {
        const eventId = decodeURIComponent(match[1]);
        const found = EVENTS.find((e) => e.id === eventId);
        if (found) {
          setSelected(found);
          setTimeout(() => {
            const el = document.getElementById(`event-${eventId}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 150);
        }
      }
    };

    checkHashEvent();
    window.addEventListener("hashchange", checkHashEvent);
    return () => window.removeEventListener("hashchange", checkHashEvent);
  }, []);

  const handleClose = () => {
    setSelected(null);
    if (
      window.location.hash.includes("?id=") ||
      window.location.hash.includes("?event=") ||
      window.location.hash.includes("#events/")
    ) {
      window.history.replaceState(null, "", "#events");
    }
  };

  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start 0.95", "end 0.25"],
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
              <KineticWords
                words={EYEBROW_WORDS}
                timelineRef={headRef}
                stagger={0.09}
              />
            </span>
            <motion.h1
              className="section-title ev-page__title"
              style={
                reduce
                  ? undefined
                  : {
                      scale: headScale,
                      skewX: headSkew,
                      transformOrigin: "center bottom",
                    }
              }
            >
              <KineticWords
                words={TITLE_WORDS}
                timelineRef={headRef}
                baseDelay={0.12}
              />
            </motion.h1>
            <TimelineContent
              as="p"
              animationNum={2}
              timelineRef={headRef}
              customVariants={introVariants}
              once
              className="ev-page__intro"
            >
              From late-night hackathons to quiet Sunday workshops - a running
              record of what we've built together, one gathering at a time.
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
              <EventCard
                key={ev.id}
                event={ev}
                index={i}
                gridRef={gridRef}
                onOpen={setSelected}
              />
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
