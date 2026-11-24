import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, Trophy, X } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import './AchievementLightbox.css';

/* The open view of an achievement, laid out like a magazine spread:
   the photo on its own stage (story-style progress bars when there are
   several), and an editorial column with an outlined headline, the team,
   the story, the people and a "previous / next" footer that names where
   you are going. Solid ink background - the page never bleeds through. */

interface AchievementLightboxProps {
  achievements: Achievement[];
  currentIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE_MS = 2200;
const SWIPE = 70;
const WIN = /winner|champion|1st|runner-up/i;

const pad = (n: number) => String(n).padStart(2, '0');
const splitTitle = (t: string) => {
  const i = t.lastIndexOf(' - ');
  return i > 0 ? { main: t.slice(0, i), sub: t.slice(i + 3) } : { main: t, sub: '' };
};

export const AchievementLightbox: React.FC<AchievementLightboxProps> = ({
  achievements,
  currentIndex,
  onClose,
  onSelect,
}) => {
  const isOpen = currentIndex !== null;
  const total = achievements.length;
  const current = isOpen ? achievements[currentIndex] : null;
  const rootRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef(1);

  /* ---- photos inside one achievement ---- */
  const [shot, setShot] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => setShot(0), [currentIndex]);
  const shots = current ? [current.src, ...(current.gallery ?? [])] : [];
  const shotIdx = Math.min(shot, Math.max(shots.length - 1, 0));
  useEffect(() => {
    if (!isOpen || shots.length < 2 || hold) return;
    const t = window.setTimeout(() => setShot((i) => (i + 1) % shots.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [isOpen, shots.length, shotIdx, hold]);

  /* ---- moving between achievements ---- */
  const go = useCallback(
    (d: number) => {
      if (currentIndex === null) return;
      dirRef.current = d;
      onSelect((currentIndex + d + total) % total);
    },
    [currentIndex, total, onSelect],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE || info.velocity.x < -450) go(1);
    else if (info.offset.x > SWIPE || info.velocity.x > 450) go(-1);
  };

  /* scroll lock, focus in / restore */
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>('.ach-view__close')?.focus());
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove('modal-open');
      opener?.focus?.();
    };
  }, [isOpen]);

  /* keyboard: Esc / arrows / Tab trap */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab' && rootRef.current) {
        const f = rootRef.current.querySelectorAll<HTMLElement>('button, a[href]');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, go]);

  /* preload neighbours */
  useEffect(() => {
    if (currentIndex === null) return;
    [1, -1].forEach((o) => {
      const a = achievements[(currentIndex + o + total) % total];
      [a.src, ...(a.gallery ?? [])].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [currentIndex, achievements, total]);

  if (typeof document === 'undefined') return null;

  const prevItem = currentIndex !== null ? achievements[(currentIndex - 1 + total) % total] : null;
  const nextItem = currentIndex !== null ? achievements[(currentIndex + 1) % total] : null;

  let body: React.ReactNode = null;
  if (current && currentIndex !== null) {
    const { main, sub } = splitTitle(current.title);
    const words = main.split(' ');
    const head = words.slice(0, -1).join(' ');
    const last = words[words.length - 1];
    const win = WIN.test(`${current.tag} ${current.title}`);
    const d = dirRef.current;

    body = (
      <div className="ach-view__grid">
        {/* ---- the photo stage ---- */}
        <div className="ach-view__stage" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {shots.length > 1 && (
            <div className="ach-view__bars" role="tablist" aria-label="Photos">
              {shots.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === shotIdx}
                  aria-label={`Photo ${i + 1} of ${shots.length}`}
                  className={`ach-view__bar${i < shotIdx ? ' is-done' : ''}${i === shotIdx ? ' is-on' : ''}${hold ? ' is-held' : ''}`}
                  style={{ '--dur': `${SLIDE_MS}ms` } as React.CSSProperties}
                  onClick={() => setShot(i)}
                >
                  <span />
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout" initial={false} custom={d}>
            <motion.div
              key={`${current.id}-${shotIdx}`}
              className="ach-view__photo"
              custom={d}
              initial={{ opacity: 0, x: d * 60, scale: 1.04 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: d * -60, scale: 0.98 }}
              transition={{ duration: 0.55, ease: EASE }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              <img src={shots[shotIdx]} alt={current.alt} draggable={false} />
            </motion.div>
          </AnimatePresence>

          <span className="ach-view__count" aria-live="polite">
            <strong>{pad(currentIndex + 1)}</strong> / {pad(total)}
          </span>
        </div>

        {/* ---- the editorial column ---- */}
        <div className="ach-view__copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="ach-view__copy-inner"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
                exit: { opacity: 0, transition: { duration: 0.18 } },
              }}
            >
              <motion.div className="ach-view__meta" variants={line}>
                <span className="ach-view__tag">{current.tag}</span>
                {win && (
                  <span className="ach-view__win">
                    <Trophy size={14} strokeWidth={2.2} /> Winner
                  </span>
                )}
              </motion.div>

              <motion.h2 id="ach-view-title" className="ach-view__title" variants={line}>
                {head && <span className="ach-view__title-out">{head} </span>}
                <span className="ach-view__title-last">{last}</span>
              </motion.h2>

              {sub && (
                <motion.p className="ach-view__sub" variants={line}>
                  {sub}
                </motion.p>
              )}

              {current.description && (
                <motion.p className="ach-view__desc" variants={line}>
                  {current.description}
                </motion.p>
              )}

              {current.highlights.length > 0 && (
                <motion.div className="ach-view__people" variants={line}>
                  <span className="ach-view__label">Highlights</span>
                  <ol>
                    {current.highlights.map((h, i) => (
                      <li key={h}>
                        <span>{pad(i + 1)}</span>
                        {h}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <nav className="ach-view__nav" aria-label="More achievements">
            <button type="button" className="ach-view__step" onClick={() => go(-1)}>
              <span className="ach-view__step-k">
                <ArrowLeft size={14} /> Previous
              </span>
              <span className="ach-view__step-t">{prevItem && splitTitle(prevItem.title).main}</span>
            </button>
            <button type="button" className="ach-view__step is-next" onClick={() => go(1)}>
              <span className="ach-view__step-k">
                Next <ArrowRight size={14} />
              </span>
              <span className="ach-view__step-t">{nextItem && splitTitle(nextItem.title).main}</span>
            </button>
          </nav>
        </div>
      </div>
    );
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          ref={rootRef}
          className="ach-view"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ach-view-title"
          initial={{ clipPath: 'inset(50% 0% 50% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(50% 0% 50% 0%)', transition: { duration: 0.45, ease: EASE } }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <button type="button" className="ach-view__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          {body}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const line = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
