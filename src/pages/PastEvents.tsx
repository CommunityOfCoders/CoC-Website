import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { TimelineContent } from "../components/ui/TimelineContent";
import Magnetic from "../components/ui/Magnetic";
import { EVENTS, type CoCEvent } from "../data/eventsData";
import pxProjectX from "../assets/polaroids/project-x-final-meet-2026.jpg";
import pxCpSelections from "../assets/polaroids/cp-club-selections-2026.jpg";
import pxHelloWorld from "../assets/polaroids/hello-world-2026.jpg";
import pxIcpc from "../assets/polaroids/icpc-prelims-2026.jpg";
import pxHackX from "../assets/polaroids/hackxcelerate-2026.jpg";
import pxSih from "../assets/polaroids/sih-2026.jpg";
import pxCodeverse from "../assets/polaroids/codeverse.jpg";
import pxCoderush from "../assets/polaroids/coderush-2026.jpg";

import review1 from "../assets/Reviews/review1.jpg";
import review2 from "../assets/Reviews/review2.jpg";
import review3 from "../assets/Reviews/review3.jpg";
import review4 from "../assets/Reviews/review4.jpg";
import review5 from "../assets/Reviews/review5.jpg";
import review6 from "../assets/Reviews/review6.jpg";
import review7 from "../assets/Reviews/review7.jpg";
import review8 from "../assets/Reviews/review8.jpg";

const REVIEWS = [
  { src: review1, author: "Breejesh Rathod" },
  { src: review2, author: "Piyusha Sawant" },
  { src: review3, author: "Priya Nayak" },
  { src: review4, author: "Saleem Shaikh" },
  { src: review5, author: "Sunaina Punyani" },
  { src: review6, author: "Saif Kazi" },
  { src: review7, author: "Palak Mantry" },
  { src: review8, author: "Shubhankar Gupta" },
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
  /** event this photo is from - clicking opens it */
  event: string;
  caption: string;
  rot: number; /* degrees, positive = clockwise */
  w: number; /* base width in px */
  top: string;
  inset: string; /* left% for left-flank, right% for right-flank */
  z: number; /* stacking + parallax depth */
  sticker?: "star" | "heart" | "coc";
  delay: number; /* entrance stagger delay in seconds */
}

const LEFT_PHOTOS: PolaroidItem[] = [
  { src: pxProjectX, event: "project-x-final-meet-2026", caption: "Project X", rot: -9, w: 170, top: "7%", inset: "1%", z: 3, sticker: "star", delay: 0 },
  { src: pxCodeverse, event: "codeverse", caption: "CodeVerse", rot: 6, w: 136, top: "43%", inset: "16%", z: 4, delay: 0.16 },
  { src: pxCpSelections, event: "cp-club-selections-2026", caption: "CP Selections", rot: -3, w: 154, top: "71%", inset: "-2%", z: 2, delay: 0.32 },
  { src: pxIcpc, event: "icpc-prelims-2026", caption: "ICPC Prelims", rot: 13, w: 106, top: "21%", inset: "22%", z: 1, delay: 0.12 },
];

const RIGHT_PHOTOS: PolaroidItem[] = [
  { src: pxHackX, event: "hackxcelerate-2026", caption: "HackXcelerate", rot: 7, w: 160, top: "6%", inset: "1%", z: 3, delay: 0.08 },
  { src: pxSih, event: "sih-2026", caption: "SIH 2026", rot: -7, w: 132, top: "41%", inset: "14%", z: 4, sticker: "heart", delay: 0.24 },
  { src: pxHelloWorld, event: "hello-world-2026", caption: "Hello World", rot: 4, w: 148, top: "69%", inset: "-1%", z: 2, sticker: "coc", delay: 0.4 },
  { src: pxCoderush, event: "coderush-2026", caption: "CodeRush", rot: -11, w: 108, top: "19%", inset: "21%", z: 1, delay: 0.04 },
];

/* One polaroid: dealt onto the table from its side with a springy landing,
   then the photo "develops" from a washed-out flash. It floats gently,
   drifts with scroll by depth, tilts toward the cursor, and on hover is
   picked up (straightens, lifts, camera flash). Click opens its event. */
const Polaroid: React.FC<{
  p: PolaroidItem;
  side: "left" | "right";
  index: number;
  progress: MotionValue<number>;
}> = ({ p, side, index, progress }) => {
  const reduce = useReducedMotion();
  const dir = side === "left" ? -1 : 1;

  // scroll depth: nearer photos (higher z) travel further
  const y = useTransform(progress, [0, 1], [0, -(50 + p.z * 34)]);
  const drift = useTransform(progress, [0, 1], [0, dir * (10 + p.z * 6)]);

  // cursor tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 16 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16 });
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className="ev-polaroid-slot"
      style={
        {
          top: p.top,
          [side]: p.inset,
          width: p.w,
          zIndex: p.z,
          ...(reduce ? {} : { y, x: drift }),
        } as React.CSSProperties
      }
    >
      <motion.a
        href={`#events?id=${p.event}`}
        className="ev-polaroid"
        aria-label={`Open ${p.caption}`}
        draggable={false}
        style={
          {
            "--float-delay": `${-index * 1.3}s`,
            "--develop-delay": `${p.delay + 0.45}s`,
            rotateX: srx,
            rotateY: sry,
            transformPerspective: 700,
          } as React.CSSProperties
        }
        initial={
          reduce
            ? false
            : { opacity: 0, x: dir * 320, y: -60, rotate: p.rot + dir * -38, scale: 1.25 }
        }
        animate={{ opacity: 1, x: 0, y: 0, rotate: p.rot, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 13,
          mass: 0.9,
          delay: p.delay + 0.1,
          opacity: { duration: 0.25, delay: p.delay + 0.1 },
        }}
        whileHover={
          reduce
            ? undefined
            : { scale: 1.16, rotate: 0, y: -10, transition: { type: "spring", stiffness: 260, damping: 18 } }
        }
        whileTap={reduce ? undefined : { scale: 1.06 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="ev-polaroid__img">
          <img src={p.src} alt="" draggable={false} decoding="async" />
          <span className="ev-polaroid__flash" aria-hidden="true" />
        </div>
        <span className="ev-polaroid__cap">
          {p.caption}
          <span className="ev-polaroid__go" aria-hidden="true">&rarr;</span>
        </span>
        {p.sticker === "star" && <StarSticker />}
        {p.sticker === "heart" && <HeartSticker />}
        {p.sticker === "coc" && <CoCSticker />}
      </motion.a>
    </motion.div>
  );
};

const PolaroidFlank: React.FC<{
  side: "left" | "right";
  progress: MotionValue<number>;
}> = ({ side, progress }) => {
  const photos = side === "left" ? LEFT_PHOTOS : RIGHT_PHOTOS;
  return (
    <>
      {photos.map((p, i) => (
        <Polaroid key={p.event} p={p} side={side} index={i + (side === "right" ? 4 : 0)} progress={progress} />
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
          loading="lazy"
          decoding="async"
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

/* ---- grid entrance, same choreography as the Achievements wall:
   a green seam draws across, two ink blades split open like a camera
   shutter, the photo settles from a zoom and the text rises in ---- */
const cardSeam: Variants = {
  hidden: { scaleX: 0, opacity: 1 },
  show: (d: number) => ({
    scaleX: [0, 1, 1],
    opacity: [1, 1, 0],
    transition: { duration: 0.9, times: [0, 0.4, 1], ease: EASE, delay: d },
  }),
};
const cardBlade: Variants = {
  hidden: { scaleY: 1 },
  show: (d: number) => ({ scaleY: 0, transition: { duration: 0.75, ease: EASE, delay: d + 0.32 } }),
};
const cardPhoto: Variants = {
  hidden: { scale: 1.32 },
  show: (d: number) => ({ scale: 1, transition: { duration: 1.3, ease: EASE, delay: d + 0.3 } }),
};
const cardRise: Variants = {
  hidden: { y: 18, opacity: 0 },
  show: (d: number) => ({ y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: d } }),
};
const cardPop: Variants = {
  hidden: { scale: 0, rotate: -12 },
  show: (d: number) => ({ scale: 1, rotate: 0, transition: { type: "spring", stiffness: 320, damping: 16, delay: d } }),
};

/* "1st February 2026" -> { big: "01", small: "FEB · 2026" };
   "8th and 9th October 2026" -> "08–09"; "November 2025 – February 2026"
   -> "NOV–FEB" / "2025–26"; "March 2025" -> "MAR" / "2025" */
const MONTH_RE = /(January|February|March|April|May|June|July|August|September|October|November|December)/gi;
function calendarParts(date: string): { big: string; small: string } {
  const days = [...date.matchAll(/(\d{1,2})(?:st|nd|rd|th)/g)].map((m) => m[1].padStart(2, "0"));
  const months = [...date.matchAll(MONTH_RE)].map((m) => m[1].slice(0, 3).toUpperCase());
  const years = [...date.matchAll(/\b(20\d\d)\b/g)].map((m) => m[1]);
  if (days.length) return { big: days.join("–"), small: [months[0], years[0]].filter(Boolean).join(" · ") };
  if (months.length > 1) {
    const yr = years[0] === years[1] || !years[1] ? years[0] ?? "" : `${years[0]}–${years[1].slice(2)}`;
    return { big: `${months[0]}–${months[1]}`, small: yr };
  }
  return { big: months[0] ?? date, small: years[0] ?? "" };
}

const EventCard: React.FC<{
  event: CoCEvent;
  index: number;
  gridRef?: React.RefObject<HTMLUListElement | null>;
  onOpen: (ev: CoCEvent) => void;
}> = ({ event, index, onOpen }) => {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // photo drifts inside its frame with the page scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // depth tilt: the card leans toward the cursor, photo drifts against it, type with it
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 18, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 18, mass: 0.5 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const photoX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const photoY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const typeX = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const typeY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const badgeX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const badgeY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  const d = (index % 3) * 0.08; // a small left-to-right wave across each row
  const cal = calendarParts(event.date);

  return (
    <motion.li
      className="ev-card-reveal"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      <motion.article
        ref={ref}
        id={`event-${event.id}`}
        className="ev-card"
        role="button"
        tabIndex={0}
        aria-label={`${event.name} - open details`}
        onMouseEnter={() => setHovered(true)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => onOpen(event)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(event);
          }
        }}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      >
        {/* Full-bleed background image + badge pinned inside the image */}
        <motion.div
          layoutId={reduce ? undefined : `event-photo-${event.id}`}
          className="ev-card__media"
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.div className="ev-card__depth" style={reduce ? undefined : { x: photoX, y: photoY }}>
            <motion.div className="ev-card__zoom" variants={cardPhoto} custom={d} style={reduce ? undefined : { y: scrollY }}>
              <PhotoSlider
                photos={event.photos}
                alt={event.name}
                mode="dwell"
                hovered={hovered}
              />
            </motion.div>
          </motion.div>

        </motion.div>

        {/* top row: calendar date + prize stamp (revealed on hover), upcoming badge */}
        <motion.div className="ev-card__top" style={reduce ? undefined : { x: badgeX, y: badgeY }}>
          <span className="ev-cal" aria-label={event.date}>
            <span className="ev-cal__big" data-text={cal.big} aria-hidden="true">
              <span>{cal.big}</span>
            </span>
            {cal.small && (
              <span className="ev-cal__small" aria-hidden="true">
                {cal.small}
              </span>
            )}
          </span>
          <span className="ev-card__top-end">
            {isUpcoming(event.isoDate) && (
              <motion.span className="ev-card__badge" aria-label="Upcoming event" variants={cardPop} custom={d + 0.95}>
                <span className="ev-card__badge-dot" aria-hidden="true" />
                Upcoming
              </motion.span>
            )}
            {event.prizePool !== "N/A" && (
              <span className="ev-stamp" aria-label={`Prize pool: ${event.prizePool}`}>
                <span className="ev-stamp__k">Prize pool</span>
                <span className="ev-stamp__v">{event.prizePool.replace(/^Rs\.?\s*/i, "₹")}</span>
              </span>
            )}
          </span>
        </motion.div>

        {/* title, place, and the summary that slides up on hover */}
        <motion.div className="ev-card__overlay" style={reduce ? undefined : { x: typeX, y: typeY }}>
          <motion.h3 className="ev-card__name" variants={cardRise} custom={d + 0.7}>
            {event.name}
          </motion.h3>
          <motion.span className="ev-card__sub" variants={cardRise} custom={d + 0.82}>
            {event.location}
          </motion.span>
          <p className="ev-card__summary">{event.summary}</p>
        </motion.div>

        <span className="ev-card__go" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>

        {/* camera-shutter entrance: seam + two blades */}
        {!reduce && (
          <span className="ev-card__shutter" aria-hidden="true">
            <motion.span className="ev-card__blade ev-card__blade--top" variants={cardBlade} custom={d} />
            <motion.span className="ev-card__blade ev-card__blade--bottom" variants={cardBlade} custom={d} />
            <motion.span className="ev-card__seam" variants={cardSeam} custom={d} />
          </span>
        )}
      </motion.article>
    </motion.li>
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
          <div className="ev-drawer-section ev-drawer-section--photos">
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
          <div className="ev-drawer-section ev-drawer-section--about">
            <div className="ev-drawer-section-label">Description</div>
            <p className="ev-drawer-about">{event.description}</p>
          </div>

          {/* Location */}
          <div className="ev-drawer-section ev-drawer-section--fact">
            <div className="ev-drawer-section-label">Location</div>
            <span className="ev-drawer-value">{event.location}</span>
          </div>

          {/* Date */}
          <div className="ev-drawer-section ev-drawer-section--fact">
            <div className="ev-drawer-section-label">Date</div>
            <span className="ev-drawer-value">{event.date}</span>
          </div>

          {/* Prize pool */}
          <div className={`ev-drawer-section ev-drawer-section--fact${hasPrize ? "" : " is-empty"}`}>
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
/* ---------------------------------------------------------- */
/* Testimonials reviews horizontal slider                     */
/* ---------------------------------------------------------- */
const AUTOPLAY_REVIEWS_MS = 3000;

const TestimonialsSlider: React.FC = () => {
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
  const last = REVIEWS.length - 1;

  const getStep = useCallback(() => {
    if (!viewportRef.current) return 0;
    const first = viewportRef.current.querySelector<HTMLElement>(".ev-tcard");
    if (!first) return 0;
    const track = viewportRef.current.querySelector<HTMLElement>(".ev-testimonials__track");
    const gap = track ? parseFloat(getComputedStyle(track).gap || "22") : 22;
    return first.offsetWidth + gap;
  }, []);

  const scrollToSlide = useCallback(
    (targetIndex: number, smooth = true) => {
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
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [getStep]
  );

  const go = useCallback(
    (dir: number) => {
      setIndex((currentIdx) => {
        const nextIdx = (currentIdx + dir + REVIEWS.length) % REVIEWS.length;
        scrollToSlide(nextIdx, true);
        return nextIdx;
      });
    },
    [scrollToSlide]
  );

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

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => {
      const nextIdx = index >= last ? 0 : index + 1;
      scrollToSlide(nextIdx, true);
    }, AUTOPLAY_REVIEWS_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduce, last, scrollToSlide]);

  useEffect(() => {
    if (!isHovered) return;
    const onKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && ["INPUT", "TEXTAREA", "SELECT"].includes(activeEl.tagName);
      if (isInput) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSlide(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSlide(last, true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isHovered, go, scrollToSlide, last]);

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
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
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
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      className="ev-testimonials"
      aria-label="What members say"
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
      <div className="container">
        <div className="ev-testimonials__head">
          <div>
            <span className="eyebrow">What members say</span>
            <h2 className="ev-testimonials__title">
              Rooms full of
              <br />
              <span className="ev-testimonials__title-mark">real people.</span>
            </h2>
          </div>
          <div className="ev-testimonials__controls">
            <Magnetic strength={0.35}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => go(-1)}
                aria-label="Previous review"
              >
                <ArrowLeft />
              </button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => go(1)}
                aria-label="Next review"
              >
                <ArrowRight />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      <div
        className="ev-testimonials__viewport"
        ref={viewportRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Reviews slider"
      >
        <div className="ev-testimonials__track">
          {REVIEWS.map((review, i) => (
            <article
              key={`review-${i}`}
              className="ev-tcard"
              aria-label={`Review by ${review.author}`}
            >
              <img
                src={review.src}
                alt={`Review by ${review.author}`}
                className="ev-tcard__image"
                loading="lazy"
                draggable={false}
              />
            </article>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="ev-testimonials__dots" role="tablist" aria-label="Review slides">
          {REVIEWS.map((review, i) => (
            <button
              key={`dot-${i}`}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to review by ${review.author}`}
              className={`ev-testimonials__dot${i === index ? " is-active" : ""}`}
              onClick={() => scrollToSlide(i, true)}
            />
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
  // polaroids drift away as the hero scrolls out
  const { scrollYProgress: heroProgress } = useScroll({
    target: headRef,
    offset: ["start start", "end start"],
  });
  const headSkew = useTransform(scrollYProgress, [0, 1], [-1.4, 0.4]);

  return (
    <>
      <section className="section ev-page">
        {/* ── Hero: polaroid collage flanks + centre heading ── */}
        <div className="ev-hero" ref={headRef}>
          {/* Polaroids are position:absolute within ev-hero */}
          <PolaroidFlank side="left" progress={heroProgress} />
          <PolaroidFlank side="right" progress={heroProgress} />

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

        {/* ── Testimonials slider ─────────────────────────── */}
        <TestimonialsSlider />

        <AnimatePresence>
          {selected && <EventModal event={selected} onClose={handleClose} />}
        </AnimatePresence>
      </section>
    </>
  );
};

export default PastEvents;
