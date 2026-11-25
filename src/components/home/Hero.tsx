import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import grppic2 from "../../assets/grppic2.jpg";
import working3 from "../../assets/working3.jpeg";

const words = ["Code.", "Create.", "Connect."];

/* Hero call-to-action. The label is set in Anybody, a variable font that
   can stretch from condensed to ultra-wide: on hover the letters inflate
   one after another in a wave (wider, heavier, taller) and settle leaning
   into italic, the button wobbles like jelly, and the number stamp spins.
   The real label sits in a hidden sizer, so the wave never moves layout. */
const HeroCta: React.FC<{ href: string; label: string; badge: string; badgeLabel: string; primary?: boolean }> = ({
  href,
  label,
  badge,
  badgeLabel,
  primary,
}) => (
  <a href={href} className={`cta${primary ? " cta--primary" : ""}`} aria-label={`${label} (${badge} ${badgeLabel})`}>
    <span className="cta__word" aria-hidden="true">
      <span className="cta__sizer">{label}</span>
      <span className="cta__letters">
        {[...label].map((c, i) => (
          <span className="cta__ch" key={i} style={{ "--i": i } as React.CSSProperties}>
            {c === " " ? "\u00a0" : c}
          </span>
        ))}
      </span>
    </span>
    <span className="cta__badge" aria-hidden="true">
      <span className="cta__badge-n">{badge}</span>
      <svg className="cta__badge-ring" viewBox="0 0 100 100">
        <defs>
          <path id={`cta-ring-${href.slice(1)}`} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href={`#cta-ring-${href.slice(1)}`}>{`${badgeLabel} · ${badgeLabel} · `}</textPath>
        </text>
      </svg>
    </span>
  </a>
);

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // scroll parallax on the collage
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySub = useTransform(scrollYProgress, [0, 1], [0, 48]);

  // cursor parallax - the collage leans gently toward the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 15 });
  const sy = useSpring(my, { stiffness: 55, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  // touch has no hover: a tap fans the collage out, another tap settles it
  const [fanned, setFanned] = useState(false);
  const lastPointer = useRef("mouse");
  const onTap = () => {
    if (lastPointer.current !== "mouse") setFanned((f) => !f);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      className="hero"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Student-run · VJTI Mumbai
          </motion.span>

          <h1 className="hero__title" aria-label="Code. Create. Connect.">
            {words.map((w, i) => (
              <span className="hero__line" key={w}>
                <motion.span
                  className={`hero__word${i === 1 ? " hero__word--mark" : ""}`}
                  initial={{ opacity: 0, y: "110%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + i * 0.11,
                  }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            VJTI's coding community. A decade of hackathons, shipped projects,
            open-source work and engineers who went on to build everywhere.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          >
            <Magnetic strength={0.08}>
              <HeroCta href="#projects" label="See our work" badge="50+" badgeLabel="projects" primary />
            </Magnetic>
            <Magnetic strength={0.08}>
              <HeroCta href="#events" label="Explore events" badge="30+" badgeLabel="events" />
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className={`hero__media${fanned ? " is-fanned" : ""}`}
          onPointerDown={(e) => (lastPointer.current = e.pointerType)}
          onClick={onTap}
          style={reduce ? undefined : { x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <div className="hero__shape" aria-hidden />
          <motion.figure
            className="hero__img hero__img--main photo photo--hover"
            style={{ y: yMain }}
          >
            <img
              src={grppic2}
              alt="CoC members working together at a hack night"
              loading="eager"
            />
          </motion.figure>
          <motion.figure
            className="hero__img hero__img--sub photo"
            style={{ y: ySub }}
          >
            <img src={working3} alt="A CoC workshop session" loading="lazy" />
          </motion.figure>
          <div className="hero__badge">
            <span className="hero__badge-k">est.</span>
            <span className="hero__badge-v">2016</span>
          </div>
        </motion.div>
      </div>

      <a href="#what" className="hero__scroll" aria-label="Scroll to content">
        <ArrowDown /> Scroll
      </a>
    </section>
  );
};

export default Hero;
