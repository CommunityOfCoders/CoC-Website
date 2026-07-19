import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Quote, X } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/BrandIcons';
import Reveal from '../components/ui/Reveal';
import { TEAM, type TeamMember } from '../data/teamData';
import './Team.css';

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------- */
/* Outside-click hook — closes the expanded view when a click
   or touch lands anywhere outside the card itself.            */
/* ---------------------------------------------------------- */

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handle = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onOutsideClick();
    };
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [ref, onOutsideClick]);
};

/* ---------------------------------------------------------- */
/* Scroll lock — freezes the page while the expanded view is
   open and restores the exact scroll position on close.       */
/* ---------------------------------------------------------- */

const useScrollLock = () => {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
    };
  }, []);
};

/* social links — shared by card and expanded view */
const Socials: React.FC<{ member: TeamMember; large?: boolean }> = ({ member, large }) => (
  <div className={`team-socials${large ? ' team-socials--lg' : ''}`}>
    <a
      href={member.github}
      target="_blank"
      rel="noreferrer"
      aria-label={`${member.name} on GitHub`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Github />
    </a>
    <a
      href={member.linkedin}
      target="_blank"
      rel="noreferrer"
      aria-label={`${member.name} on LinkedIn`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Linkedin />
    </a>
  </div>
);

/* ---------------------------------------------------------- */
/* Collapsed card — morphs into the expanded view via shared
   layoutIds on the surface, photo, name and role.             */
/* ---------------------------------------------------------- */

const MemberCard: React.FC<{
  member: TeamMember;
  index: number;
  onOpen: (m: TeamMember) => void;
}> = ({ member, index, onOpen }) => {
  const reduce = useReducedMotion();
  return (
    <Reveal as="li" delay={(index % 3) * 0.07}>
      <motion.article
        layoutId={reduce ? undefined : `team-card-${member.id}`}
        className="team-card"
        role="button"
        tabIndex={0}
        aria-label={`${member.name}, ${member.role} — open profile`}
        whileHover={reduce ? undefined : { y: -7, rotate: index % 2 ? 0.5 : -0.5 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={() => onOpen(member)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen(member);
          }
        }}
      >
        <div className="team-card__bg" aria-hidden>
          <img src={member.photo} alt="" loading="lazy" />
        </div>

        <motion.div
          layoutId={reduce ? undefined : `team-photo-${member.id}`}
          className="team-card__photo"
        >
          <img src={member.photo} alt={member.name} loading="lazy" />
        </motion.div>

        <div className="team-card__text">
          <motion.span
            layoutId={reduce ? undefined : `team-role-${member.id}`}
            className="team-card__role"
          >
            {member.role}
          </motion.span>
          <motion.h3
            layoutId={reduce ? undefined : `team-name-${member.id}`}
            className="team-card__name"
          >
            {member.name}
          </motion.h3>
          <p className="team-card__tagline">{member.tagline}</p>
        </div>

        <Socials member={member} />
      </motion.article>
    </Reveal>
  );
};

/* ---------------------------------------------------------- */
/* Expanded profile — the card grown into a detail view.
   Escape / outside click / X all close it; body scroll locks. */
/* ---------------------------------------------------------- */

const MemberProfile: React.FC<{ member: TeamMember; onClose: () => void }> = ({
  member,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useScrollLock();
  useOutsideClick(ref, onClose);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('.team-profile__close')?.focus();

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
    return () => {
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="team-overlay-wrap">
      <motion.div
        className="team-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        layoutId={reduce ? undefined : `team-card-${member.id}`}
        className="team-profile"
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-profile-name"
        initial={reduce ? { opacity: 0 } : undefined}
        animate={reduce ? { opacity: 1 } : undefined}
        exit={reduce ? { opacity: 0 } : undefined}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <button
          type="button"
          className="team-profile__close"
          aria-label="Close profile"
          onClick={onClose}
        >
          <X />
        </button>

        <div className="team-profile__body">
          <div className="team-profile__top">
            <motion.div
              layoutId={reduce ? undefined : `team-photo-${member.id}`}
              className="team-profile__photo"
            >
              <img src={member.photo} alt={member.name} />
            </motion.div>

            <div className="team-profile__id">
              <motion.span
                layoutId={reduce ? undefined : `team-role-${member.id}`}
                className="team-profile__role"
              >
                {member.role}
              </motion.span>
              <motion.h2
                layoutId={reduce ? undefined : `team-name-${member.id}`}
                id="team-profile-name"
                className="team-profile__name"
              >
                {member.name}
              </motion.h2>
              <Socials member={member} large />
            </div>
          </div>

          <div className="team-profile__bio">
            <Quote aria-hidden />
            <p>{member.bio}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------------------------------------------------- */

const Team: React.FC = () => {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section className="section team-page">
      <div className="container">
        <div className="team-page__head">
          <Reveal>
            <span className="eyebrow">The people behind CoC</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="section-title">
              Meet the <span className="mark">team.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="team-page__intro">
              Council, leads and core members — the crew that keeps the repos merged, the events
              running and the labs open late. Click anyone for the full story.
            </p>
          </Reveal>
        </div>

        <ul className="team-grid">
          {TEAM.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} onOpen={setSelected} />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {selected && <MemberProfile member={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
};

export default Team;
