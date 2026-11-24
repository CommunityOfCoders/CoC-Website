import React, { useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';
import type { Achievement } from '../../data/achievementsData';
import { AchievementLightbox } from './AchievementLightbox';
import './AchievementStrips.css';

/* Every four achievements are "printed" on one photo-booth strip: a paper
   strip slides out of a slot, the four frames develop one after another
   (black & white, like a real strip) and turn to full colour when you point
   at them. A click fires the flash and opens the full viewer. */

const PER_STRIP = 4;
const WINNER = /winner|champion|1st|runner-up/i;

type Fit = 'cover' | 'contain';

const Frame: React.FC<{
  item: Achievement;
  slot: number;
  onOpen: () => void;
}> = ({ item, slot, onOpen }) => {
  const [fit, setFit] = useState<Fit>('cover');
  const win = WINNER.test(`${item.tag} ${item.title}`);

  return (
    <button
      type="button"
      className="booth-frame"
      style={{ '--slot': slot } as React.CSSProperties}
      onClick={onOpen}
      aria-label={`Open ${item.title}`}
    >
      <span className="booth-frame__shot">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          draggable={false}
          className={`is-${fit}`}
          onLoad={(e) => {
            const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
            const r = w / h;
            // photos fill the frame; posters / tall certificates stay whole
            setFit(r >= 0.78 && r <= 1.9 ? 'cover' : 'contain');
          }}
        />
        {win && (
          <span className="booth-frame__trophy" aria-hidden="true">
            <Trophy size={13} strokeWidth={2.2} />
          </span>
        )}
      </span>
      <span className="booth-frame__cap">{item.title}</span>
    </button>
  );
};

export const AchievementStrips: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [flash, setFlash] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const strips: Achievement[][] = [];
  for (let i = 0; i < achievements.length; i += PER_STRIP) strips.push(achievements.slice(i, i + PER_STRIP));

  // strips slide out of their slot the first time they scroll into view
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            // watch the slot wrapper: the paper itself starts hidden above it
            en.target.querySelector('.booth-strip')?.classList.add('is-in');
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12 },
    );
    root.querySelectorAll('.booth-strip-wrap').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [achievements.length]);

  // touch screens have no hover: the frame nearest the middle develops into colour
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia('(hover: none)').matches) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.target.classList.toggle('is-lit', en.isIntersecting)),
      { rootMargin: '-38% 0px -38% 0px' },
    );
    root.querySelectorAll('.booth-frame').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [achievements.length]);

  const openAt = (index: number) => {
    setFlash((n) => n + 1); // camera flash, then the viewer
    window.setTimeout(() => setOpen(index), 120);
  };

  return (
    <div ref={rootRef} className="booth">
      <div className="booth__grid">
        {strips.map((strip, s) => (
          <div className="booth-strip-wrap" key={strip[0].id}>
            <span className="booth-slot" aria-hidden="true" />
            <article className="booth-strip" style={{ '--strip': s % 4 } as React.CSSProperties}>
              <header className="booth-strip__head">Community of Coders</header>
              {strip.map((item, i) => (
                <Frame key={item.id} item={item} slot={i} onOpen={() => openAt(s * PER_STRIP + i)} />
              ))}
              <footer className="booth-strip__foot">
                <span>Photo booth</span>
                <span>
                  {String(s + 1).padStart(2, '0')} / {String(strips.length).padStart(2, '0')}
                </span>
              </footer>
            </article>
          </div>
        ))}
      </div>

      <span key={flash} className={`booth-flash${flash ? ' go' : ''}`} aria-hidden="true" />

      <AchievementLightbox
        achievements={achievements}
        currentIndex={open}
        onClose={() => setOpen(null)}
        onSelect={(i) => setOpen(i)}
      />
    </div>
  );
};
