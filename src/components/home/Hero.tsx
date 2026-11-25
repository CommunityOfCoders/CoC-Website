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

/* Hero call-to-action: a 3D key. On hover it springs up, a glint crosses
   the face, and every letter flips over (one after another, like a
   departure board) into a "cut-out" version of itself - serif italic,
   outlined capital, mono on a little label, heavy italic - each landing at
   its own small tilt, so the label becomes a ransom-note collage. Letters
   keep their resting width, so the button never changes size. */
const CTA_STYLES = 4;
const HeroCta: React.FC<{ href: string; label: string; primary?: boolean }> = ({ href, label, primary }) => {
  let n = 0; // counts real letters only, so spaces don't break the style pattern
  return (
    <a href={href} className={`cta${primary ? " cta--primary" : ""}`} aria-label={label}>
      <span className="cta__label" aria-hidden="true">
        {[...label].map((c, i) => {
          if (c === " ") return <span className="cta__sp" key={i}> </span>;
          const k = n++;
          const vars = {
            "--i": i,
            "--r": `${((k * 37) % 9) - 4}deg`,
            "--y": `${(((k * 53) % 7) - 3) * 0.03}em`,
          } as React.CSSProperties;
          return (
            <span className="cta__ch" key={i} style={vars}>
              <span className="cta__a">{c}</span>
              <span className={`cta__b cta__b--${k % CTA_STYLES}`}>{c}</span>
            </span>
          );
        })}
      </span>
    </a>
  );
};

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
              <HeroCta href="#projects" label="See our work" primary />
            </Magnetic>
            <Magnetic strength={0.08}>
              <HeroCta href="#events" label="Explore events" />
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
