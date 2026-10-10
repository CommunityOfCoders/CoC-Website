import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';

interface AchievementLightboxProps {
  achievements: Achievement[];
  currentIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export const AchievementLightbox: React.FC<AchievementLightboxProps> = ({
  achievements,
  currentIndex,
  onClose,
  onSelect,
}) => {
  const isOpen = currentIndex !== null;
  const current = isOpen ? achievements[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    onSelect((currentIndex - 1 + achievements.length) % achievements.length);
  }, [currentIndex, achievements.length, onSelect]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onSelect((currentIndex + 1) % achievements.length);
  }, [currentIndex, achievements.length, onSelect]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('modal-open');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="achievement-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop click to close */}
          <div className="achievement-lightbox__backdrop" onClick={onClose} />

          {/* Top header controls */}
          <div className="achievement-lightbox__header">
            <div className="achievement-lightbox__tag-pill">
              <Sparkles size={14} /> {current.tag}
            </div>
            <button
              className="achievement-lightbox__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="achievement-lightbox__stage">
            <button
              className="achievement-lightbox__nav achievement-lightbox__nav--prev"
              onClick={handlePrev}
              aria-label="Previous achievement"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={current.id}
              className="achievement-lightbox__content"
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="achievement-lightbox__img-wrapper">
                <img
                  src={current.src}
                  alt={current.alt}
                  className="achievement-lightbox__img"
                />
              </div>

              <div className="achievement-lightbox__footer">
                <h3 className="achievement-lightbox__title">{current.title}</h3>
              </div>
            </motion.div>

            <button
              className="achievement-lightbox__nav achievement-lightbox__nav--next"
              onClick={handleNext}
              aria-label="Next achievement"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
