import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Trophy, X } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import './AchievementLightbox.css';

/* The open view of an achievement, read top to bottom like a story page:
   a wide photo stage (with its own slider when there are several photos),
   then the headline, the story beside the team and the key facts, then a
   "previous / next" footer. Solid ink background - the page never shows
   through. */

interface AchievementLightboxProps {
  achievements: Achievement[];
  currentIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE_MS = 2700;
const SWIPE = 70;
const WIN = /winner|champion|1st|runner-up/i;

const pad = (n: number) => String(n).padStart(2, '0');
const splitTitle = (t: string) => {
  const i = t.lastIndexOf(' - ');
  return i > 0 ? { main: t.slice(0, i), sub: t.slice(i + 3) } : { main: t, sub: '' };
};

const PEOPLE_LABEL: Record<Achievement['kind'], string> = {
  team: 'The team',
  teams: 'Team members',
  individual: 'Achieved by',
  individuals: 'Contributors',
};

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
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
  const shotDirRef = useRef(1);

  /* ---- photos inside one achievement: arrows + auto-advance every 2.7s ---- */
  const [shot, setShot] = useState(0);
  useEffect(() => setShot(0), [currentIndex]);
  const shots = current ? [current.src, ...(current.gallery ?? [])] : [];
  const many = shots.length > 1;
  const shotIdx = Math.min(shot, Math.max(shots.length - 1, 0));
  const stepShot = useCallback(
    (d: number) => {
      shotDirRef.current = d;
      setShot((i) => (i + d + shots.length) % shots.length);
    },
    [shots.length],
  );
  useEffect(() => {
    if (!isOpen || !many) return;
    const t = window.setTimeout(() => stepShot(1), SLIDE_MS); // keeps going, always
    return () => window.clearTimeout(t);
  }, [isOpen, many, shotIdx, stepShot]);

  /* ---- moving between achievements ---- */
  const go = useCallback(
    (d: number) => {
      if (currentIndex === null) return;
      dirRef.current = d;
      shotDirRef.current = d;
      onSelect((currentIndex + d + total) % total);
      rootRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [currentIndex, total, onSelect],
  );

  // swipe: through the photos when there are several, otherwise to the next achievement
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const d = info.offset.x < -SWIPE || info.velocity.x < -450 ? 1 : info.offset.x > SWIPE || info.velocity.x > 450 ? -1 : 0;
    if (!d) return;
    if (many) stepShot(d);
    else go(d);
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

  let body: React.ReactNode = null;
  if (current && currentIndex !== null) {
    const { main, sub } = splitTitle(current.title);
    const words = main.split(' ');
    const head = words.slice(0, -1).join(' ');
    const last = words[words.length - 1];
    const win = WIN.test(`${current.tag} ${current.title}`);
    const prevItem = achievements[(currentIndex - 1 + total) % total];
    const nextItem = achievements[(currentIndex + 1) % total];
    const sd = shotDirRef.current;
    // for a single team, its name ("Team SKS") heads the people block instead of sitting in the facts
    const teamName = current.kind === 'team' ? current.facts.find((f) => /^team /i.test(f)) : undefined;
    const facts = current.facts.filter((f) => f !== teamName);

    body = (
      <>
        {/* ---- top bar ---- */}
        <div className="ach-view__bar-top">
          <span className="ach-view__count" aria-live="polite">
            <strong>{pad(currentIndex + 1)}</strong>
            <span> / {pad(total)}</span>
          </span>
          <button type="button" className="ach-view__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* ---- photo stage ---- */}
        <div className="ach-view__stage">
          <AnimatePresence mode="popLayout" initial={false} custom={sd}>
            <motion.div
              key={`${current.id}-${shotIdx}`}
              className="ach-view__photo"
              initial={{ opacity: 0, x: sd * 80, scale: 1.03 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: sd * -80, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              <img src={shots[shotIdx]} alt={current.alt} draggable={false} />
            </motion.div>
          </AnimatePresence>

          {many && (
            <>
              <button type="button" className="ach-view__arrow is-prev" onClick={() => stepShot(-1)} aria-label="Previous photo">
                <ChevronLeft size={22} />
              </button>
              <button type="button" className="ach-view__arrow is-next" onClick={() => stepShot(1)} aria-label="Next photo">
                <ChevronRight size={22} />
              </button>
              <div className="ach-view__dots" role="tablist" aria-label="Photos">
                {shots.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === shotIdx}
                    aria-label={`Photo ${i + 1} of ${shots.length}`}
                    className={`ach-view__dot${i === shotIdx ? ' is-on' : ''}`}
                    style={{ '--dur': `${SLIDE_MS}ms` } as React.CSSProperties}
                    onClick={() => {
                      shotDirRef.current = i > shotIdx ? 1 : -1;
                      setShot(i);
                    }}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ---- the story ---- */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="ach-view__story"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
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

            <div className="ach-view__cols">
              {current.description && (
                <motion.p className="ach-view__desc" variants={line}>
                  {current.description}
                </motion.p>
              )}

              <motion.aside className="ach-view__side" variants={line}>
                {(current.people.length > 0 || teamName) && (
                  <div className="ach-view__block">
                    <span className="ach-view__label">{PEOPLE_LABEL[current.kind]}</span>
                    {teamName && <p className="ach-view__team">{teamName}</p>}
                    {current.people.length > 0 && (
                    <p className="ach-view__people">
                      {current.people.map((p, i) => (
                        <React.Fragment key={p}>
                          {i > 0 && (
                            <>
                              {' '}
                              <span className="ach-view__slash">/</span>{' '}
                            </>
                          )}
                          <span className="ach-view__person">{p}</span>
                        </React.Fragment>
                      ))}
                    </p>
                    )}
                  </div>
                )}
                {facts.length > 0 && (
                  <div className="ach-view__block">
                    <span className="ach-view__label">At a glance</span>
                    <ul className="ach-view__facts">
                      {facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.aside>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ---- previous / next ---- */}
        <nav className="ach-view__nav" aria-label="More achievements">
          <button type="button" className="ach-view__step" onClick={() => go(-1)}>
            <span className="ach-view__step-k">
              <ArrowLeft size={14} /> Previous
            </span>
            <span className="ach-view__step-t">{splitTitle(prevItem.title).main}</span>
          </button>
          <button type="button" className="ach-view__step is-next" onClick={() => go(1)}>
            <span className="ach-view__step-k">
              Next <ArrowRight size={14} />
            </span>
            <span className="ach-view__step-t">{splitTitle(nextItem.title).main}</span>
          </button>
        </nav>
      </>
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
          <div className="ach-view__inner">{body}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
