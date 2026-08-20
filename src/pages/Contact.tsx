import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { Github, InstagramColor, LinkedinColor } from '../components/ui/BrandIcons';
import { IMG } from '../data/placeholderImages';
import './Contact.css';

const EMAIL = 'communityofcoders@gmail.com';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;
interface Social { label: string; href: string; tip: string; Icon: IconType; cls?: string; size?: number }

/* CoC's own channels — shown big, front and centre */
const COC_SOCIALS: Social[] = [
  { label: 'Instagram', href: 'https://instagram.com/coc_vjti', tip: '@coc_vjti', Icon: InstagramColor, cls: 'ig', size: 60 },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/community-of-coders-vjti', tip: 'Community Of Coders, VJTI', Icon: LinkedinColor, cls: 'li', size: 52 },
  { label: 'GitHub', href: 'https://github.com/CommunityOfCoders', tip: 'github.com/CommunityOfCoders', Icon: Github, cls: 'gh', size: 44 },
];

/* affiliated communities — every confirmed channel per community.
   Project X's X/Twitter is intentionally left out: no confirmed handle
   was found, and a guessed link isn't worth shipping. Add it as soon
   as it's confirmed. */
const NETWORK: { name: string; socials: Social[] }[] = [
  {
    name: 'Project X',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/x_vjti', tip: '@x_vjti', Icon: InstagramColor, size: 30 },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/project-x-vjti', tip: 'Project X VJTI', Icon: LinkedinColor, size: 30 },
      { label: 'GitHub', href: 'https://github.com/ProjectX-VJTI', tip: 'github.com/ProjectX-VJTI', Icon: Github, size: 26 },
    ],
  },
  {
    name: 'CP Club',
    socials: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/cp-club-vjti', tip: 'CP Club, VJTI', Icon: LinkedinColor, size: 30 },
    ],
  },
  {
    name: 'ETH VJTI',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/eth_vjti', tip: '@eth_vjti', Icon: InstagramColor, size: 30 },
    ],
  },
];

/* site accent, not a third-party brand — kept local rather than in BrandIcons */
const MailMark: IconType = (props) => (
  <svg viewBox="0 0 50 50" {...props}>
    <rect width="50" height="50" rx="13" fill="var(--accent)" />
    <path d="M11 17h28v16H11z" fill="none" stroke="var(--accent-ink)" strokeWidth="2.4" />
    <path d="m11 18 14 11 14-11" fill="none" stroke="var(--accent-ink)" strokeWidth="2.4" />
  </svg>
);

const Contact: React.FC = () => {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16 });
  const sy = useSpring(my, { stiffness: 60, damping: 16 });
  const [copied, setCopied] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 28);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 20);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section className="section ct-page">
      <div className="container">
        <div className="ct-hero" ref={heroRef} onMouseMove={onMove} onMouseLeave={onLeave}>
          <div>
            <Reveal><span className="eyebrow">Say hello</span></Reveal>
            <Reveal delay={0.08}>
              <h1 className="ct-kinetic">
                <span className="outline">Let&apos;s</span><br />talk<span className="mark">.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="ct-intro">
                Questions about an event, a project, or just want to say hi — this is every way
                to reach the people behind CoC.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="ct-email-wrap">
                <span className={`ct-toast${copied ? ' show' : ''}`}>Copied ✓</span>
                <a className="ct-email-line" href={`mailto:${EMAIL}`} onClick={copyEmail}>
                  {EMAIL} <span className="go"><ArrowUpRight /></span>
                </a>
              </div>
              <span className="ct-email-hint">click to copy </span>
              <span className="ct-status"><span className="ct-status-dot" />usually replies within a few hours</span>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="ct-soc-label"><span className="eyebrow">Community of Coders</span></div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="ct-soc-cluster">
                {COC_SOCIALS.map(({ label, href, tip, Icon, cls, size }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={`ct-soc-mark ${cls}`} data-tip={tip} aria-label={label}>
                    <Icon width={size} height={size} />
                  </a>
                ))}
                <a href={`mailto:${EMAIL}`} className="ct-soc-mark mail" data-tip={EMAIL} aria-label="Email" onClick={copyEmail}>
                  <MailMark width={50} height={50} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={0.2}>
            <motion.div className="ct-media" style={reduce ? undefined : { x: sx, y: sy }}>
              <div className="ct-media-shape" />
              <div className="ct-img-main">
                <img src={IMG.groupPhoto} alt="CoC members huddled together at an event" loading="lazy" />
              </div>
              <div className="ct-img-sub">
                <img src={IMG.throwback[4]} alt="Students collaborating at a CoC session" loading="lazy" />
              </div>
              <div className="ct-badge"><span className="ct-badge-k">reply in</span><span className="ct-badge-v">&lt;24h</span></div>
            </motion.div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="ct-also">
            <span className="eyebrow">Also find us</span>
            <div className="ct-also-grid">
              {NETWORK.map((comm) => (
                <div className="ct-comm" key={comm.name}>
                  <div className="ct-comm-name">{comm.name}</div>
                  <div className="ct-comm-icons">
                    {comm.socials.map(({ label, href, tip, Icon, size }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="ct-soc-mark"
                        data-tip={tip}
                        aria-label={`${comm.name} on ${label}`}
                      >
                        <Icon width={size} height={size} />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
