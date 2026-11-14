import React, { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';

interface AchievementLightboxProps {
  achievements: Achievement[];
  currentIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

/* direction-aware slide: new image enters from the side you navigated toward */
const slide = {
  enter: (d: number) => ({ x: d * 70, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d * -70, opacity: 0, scale: 0.97 }),
};

const pad = (n: number) => String(n).padStart(2, '0');

export const AchievementLightbox: React.FC<AchievementLightboxProps> = ({
  achievements,
  currentIndex,
  onClose,
  onSelect,
}) => {
  const isOpen = currentIndex !== null;
  const current = isOpen ? achievements[currentIndex] : null;
  const isMouseDownOnBox = useRef(false);
  const dirRef = useRef(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const total = achievements.length;
  const [shot, setShot] = useState(0);
  useEffect(() => setShot(0), [currentIndex]);
  const shots = current ? [current.src, ...(current.gallery ?? [])] : [];
  const shotDir = useRef(1);
  const [hold, setHold] = useState(false);
  const shotIdx = Math.min(shot, Math.max(shots.length - 1, 0));

  useEffect(() => {
    if (!isOpen || shots.length < 2 || hold) return;
    const t = window.setTimeout(() => {
      shotDir.current = 1;
      setShot((i) => (i + 1) % shots.length);
    }, 2200);
    return () => window.clearTimeout(t);
  }, [isOpen, shots.length, shotIdx, hold]);

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    dirRef.current = -1;
    onSelect((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onSelect]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    dirRef.current = 1;
    onSelect((currentIndex + 1) % total);
  }, [currentIndex, total, onSelect]);

  const handleBackdropClick = () => {
    if (isMouseDownOnBox.current) {
      isMouseDownOnBox.current = false;
      return;
    }
    onClose();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) handleNext();
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) handlePrev();
  };

  /* open/close side effects: scroll lock, focus in, focus restore */
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      rootRef.current?.querySelector<HTMLElement>('.achievement-lightbox__close')?.focus();
    });
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove('modal-open');
      opener?.focus?.();
    };
  }, [isOpen]);

  /* keyboard: Esc / arrows / Tab focus trap */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Tab' && rootRef.current) {
        const f = rootRef.current.querySelectorAll<HTMLElement>('button');
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  /* preload the neighbours so next/prev never flashes empty */
  useEffect(() => {
    if (currentIndex === null) return;
    [1, -1, 2].forEach((o) => {
      const img = new Image();
      img.src = achievements[(currentIndex + o + total) % total].src;
    });
  }, [currentIndex, achievements, total]);

  if (typeof document === 'undefined') return null;

  const progress = currentIndex !== null ? ((currentIndex + 1) / total) * 100 : 0;
  const people = current ? current.highlights.slice(0, 8) : [];

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          ref={rootRef}
          className="achievement-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onMouseDown={() => {
            isMouseDownOnBox.current = false;
          }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="achievement-lightbox__backdrop" />

          {/* Top header controls */}
          <motion.div
            className="achievement-lightbox__header"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
          >
            <div className="achievement-lightbox__tag-pill">
              {current.tag}
            </div>
            <div className="achievement-lightbox__counter" aria-live="polite">
              <strong>{pad(currentIndex! + 1)}</strong> / {pad(total)}
            </div>
            <button
              className="achievement-lightbox__close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            className="achievement-lightbox__stage"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              className="achievement-lightbox__nav achievement-lightbox__nav--prev"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous achievement"
            >
              <ChevronLeft size={28} />
            </button>

            <AnimatePresence mode="wait" custom={dirRef.current} initial={false}>
              <motion.div
                key={current.id}
                custom={dirRef.current}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: EASE }}
                className="achievement-lightbox__content"
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                onMouseDown={() => {
                  isMouseDownOnBox.current = true;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="achievement-lightbox__img-wrapper">
                  <div className={`achievement-lightbox__frame${shots.length > 1 ? ' is-gallery' : ''}`} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
                  <AnimatePresence initial={false} custom={shotDir.current} >
                    <motion.img
                      key={shotIdx}
                      src={shots[shotIdx]}
                      alt={current.alt}
                      className="achievement-lightbox__img"
                      draggable={false}
                      custom={shotDir.current}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </AnimatePresence>
                  {shots.length > 1 && (
                    <>
                      <div className="achievement-lightbox__shots">
                        {shots.map((_, i) => (
                          <button key={i} type="button" className={i === shotIdx ? 'is-on' : ''} aria-label={`Photo ${i + 1} of ${shots.length}`}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); shotDir.current = i > shotIdx ? 1 : -1; setShot(i); }} />
                        ))}
                      </div>
                    </>
                  )}
                  </div>
                </div>

                <div className="achievement-lightbox__footer">
                  <h3 className="achievement-lightbox__title">{current.title}</h3>
                  {current.description && (
                    <p className="achievement-lightbox__text">{current.description}</p>
                  )}
                  {people.length > 0 && (
                    <ul className="achievement-lightbox__chips">
                      {people.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              className="achievement-lightbox__nav achievement-lightbox__nav--next"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next achievement"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>

          {/* progress through the timeline */}
          <div className="achievement-lightbox__progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
