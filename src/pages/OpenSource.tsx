import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Rss, Search, X } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { Tilt } from '../components/ui/Tilt';
import { KineticWords } from '../components/ui/KineticHeading';
import { Github, LinkedinColor, MediumLogo } from '../components/ui/BrandIcons';
import { CONTRIBUTORS, FEATURED_ORGS, PROGRAMS, REPOS, type Contributor, type Program } from '../data/openSourceData';
import githubLogoImg from '../assets/github.png';
import gsocLogoImg from '../assets/GSoC_logo.svg';
import lfxLogoImg from '../assets/lfx-seeklogo.png';
import hacktoberfestLogoImg from '../assets/Hacktoberfest_logo.png';
import mediumLogoImg from '../assets/Medium-Icon-Black.svg';
import './OpenSource.css';

const GH_ORG = 'CommunityOfCoders';
const STATIC_STARS = REPOS.reduce((sum, r) => sum + r.stars, 0);
const STATIC_REPOS = REPOS.length;

const getProgram = (id: Contributor['programId']): Program | undefined => PROGRAMS.find((p) => p.id === id);

const FLOATING_HERO_LOGOS = [
  {
    name: 'LFX Mentorship',
    href: 'https://lfx.linuxfoundation.org/tools/mentorship/',
    src: lfxLogoImg,
  },
  {
    name: 'Google Summer of Code',
    href: 'https://summerofcode.withgoogle.com/',
    src: gsocLogoImg,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/CommunityOfCoders',
    src: githubLogoImg,
    isInvert: true,
  },
  {
    name: 'Hacktoberfest',
    href: 'https://hacktoberfest.com/',
    src: hacktoberfestLogoImg,
  },
  {
    name: 'Medium Blog',
    href: 'https://medium.com/@swayams',
    src: mediumLogoImg,
  },
];

/** Live public-repo count + star total for the org - snapshot from
 *  REPOS until the fetch resolves, cached per tab so repeat visits
 *  to the page don't re-hit the API. */
function useOrgStats() {
  const [stats, setStats] = useState({ repos: STATIC_REPOS, stars: STATIC_STARS });

  useEffect(() => {
    const cacheKey = `gh_org_stats_${GH_ORG}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setStats(JSON.parse(cached));
      return;
    }
    fetch(`https://api.github.com/orgs/${GH_ORG}/repos?per_page=100`)
      .then((r) => r.json())
      .then((repos) => {
        if (Array.isArray(repos) && repos.length) {
          const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
          const data = { repos: repos.length, stars };
          setStats(data);
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  return stats;
}

function BlogIcon({ url }: { url: string }) {
  if (/medium\.com/i.test(url)) return <MediumLogo width={16} height={16} />;
  return <Rss size={15} />;
}

function ProgramTag({ programId }: { programId: Contributor['programId'] }) {
  const program = getProgram(programId);
  if (!program) return null;
  return (
    <span className="os-program-tag" style={{ '--tag-color': program.color } as React.CSSProperties}>
      <program.Logo width={13} height={13} /> {program.shortName}
    </span>
  );
}

// ─── CONTRIBUTOR CARD ─────────────────────────────────────────────────────────

interface ContributorCardProps {
  contributor: Contributor;
  index: number;
  onSelect: (c: Contributor) => void;
}

function ContributorCard({ contributor, index, onSelect }: ContributorCardProps) {
  const program = getProgram(contributor.programId);

  const activate = () => onSelect(contributor);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  };

  return (
    <Reveal delay={(index % 4) * 0.06}>
      <Tilt rotationFactor={5} springOptions={{ stiffness: 220, damping: 24 }}>
        <article
          className="os-card"
          onClick={activate}
          onKeyDown={onKeyDown}
          role="button"
          tabIndex={0}
          style={{ '--card-accent': program?.color } as React.CSSProperties}
        >
          <div className="os-card__top">
            <div className="os-avatar" style={{ background: program?.color }}>
              {contributor.initials}
            </div>
            <ProgramTag programId={contributor.programId} />
          </div>

          <h3 className="os-card__name">{contributor.name}</h3>
          <div className="os-card__org">
            {contributor.org} · {contributor.year}
          </div>
          <p className="os-card__project">{contributor.project}</p>

          <div className="os-card__tech">
            {contributor.tech.map((t) => (
              <span key={t} className="tech-chip">
                {t}
              </span>
            ))}
          </div>

          <div className="os-card__footer">
            View profile <ChevronRight size={13} />
          </div>
        </article>
      </Tilt>
    </Reveal>
  );
}

// ─── CONTRIBUTOR DETAIL DRAWER ────────────────────────────────────────────────

interface DrawerProps {
  contributor: Contributor | null;
  isOpen: boolean;
  onClose: () => void;
}

function ContributorDrawer({ contributor, isOpen, onClose }: DrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    openerRef.current = document.activeElement as HTMLElement;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('os-panel-open');

    const raf = requestAnimationFrame(() => {
      panelRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
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
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove('os-panel-open');
      openerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!contributor) return null;
  const nameParts = contributor.name.split(' ');
  const firstNames = nameParts.slice(0, -1).join(' ') || nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  return (
    <>
      <div
        className={`os-drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        className={`os-drawer-panel ${isOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="os-drawer-name"
        tabIndex={-1}
      >
        <div className="os-drawer-content">
          <h2 id="os-drawer-name" className="os-drawer-name">
            <span className="os-drawer-name__first">{firstNames}</span>
            {lastName && <span className="os-drawer-name__last"> {lastName}</span>}
          </h2>
          <div className="os-drawer-meta">
            {contributor.org} · {contributor.project} · {contributor.year}
          </div>

          <div className="os-drawer-actions">
            {contributor.github && (
              <a href={contributor.github} target="_blank" rel="noreferrer" className="os-action-btn">
                <Github width={15} height={15} /> GitHub
              </a>
            )}
            {contributor.linkedin && (
              <a href={contributor.linkedin} target="_blank" rel="noreferrer" className="os-action-btn">
                <LinkedinColor width={16} height={16} /> LinkedIn
              </a>
            )}
            {contributor.blog && (
              <a href={contributor.blog} target="_blank" rel="noreferrer" className="os-action-btn">
                <BlogIcon url={contributor.blog} /> Blog
              </a>
            )}
            {contributor.projectLink && (
              <a href={contributor.projectLink} target="_blank" rel="noreferrer" className="os-action-btn">
                <ArrowUpRight size={15} /> Project Link
              </a>
            )}
          </div>

          <div className="os-drawer-section">
            <div className="os-drawer-section-label">About</div>
            <p className="os-drawer-about">{contributor.description}</p>
          </div>

          <div className="os-drawer-section">
            <div className="os-drawer-section-label">Technologies</div>
            <div className="os-card__tech">
              {contributor.tech.map((t) => (
                <span key={t} className="tech-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {contributor.mentor && (
            <div className="os-drawer-section">
              <div className="os-drawer-section-label">Mentored by</div>
              <div className="os-drawer-mentor-name">{contributor.mentor}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ─── MAIN OPEN SOURCE PAGE COMPONENT ───────────────────────────────────────────

export default function OpenSource() {
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const stats = useOrgStats();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16 });
  const sy = useSpring(my, { stiffness: 60, damping: 16 });

  const onHeroMove = (e: React.MouseEvent) => {
    if (reduce || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const onHeroLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const handleOpenContributor = (c: Contributor) => {
    setSelectedContributor(c);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);

  const filters = [
    'All',
    ...(Array.from(new Set(CONTRIBUTORS.map((c) => c.programId)))
      .map((id) => getProgram(id)?.shortName)
      .filter(Boolean) as string[]),
  ];

  const filteredContributors = CONTRIBUTORS.filter((c) => {
    const program = getProgram(c.programId);
    const matchesFilter = activeFilter === 'All' || program?.shortName === activeFilter;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === '' ||
      c.name.toLowerCase().includes(q) ||
      c.org.toLowerCase().includes(q) ||
      c.project.toLowerCase().includes(q) ||
      c.tech.some((t) => t.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="opensource-page">
      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="os-hero">
        <div className="container">
          <div className="os-hero__grid" ref={heroRef} onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>
            <div className="os-hero__content">
              <Reveal>
                <span className="eyebrow">Student-run · VJTI Matunga</span>
              </Reveal>

              <h1 className="os-hero__title" ref={titleRef}>
                <span className="os-hero__title-row">
                  <KineticWords words={[{ t: 'OPEN' }]} triggerRef={titleRef} />
                </span>
                <span className="os-hero__title-row">
                  <KineticWords words={[{ t: 'SOURCE.', mark: true }]} triggerRef={titleRef} baseDelay={0.08} />
                </span>
              </h1>

              <Reveal delay={0.22}>
                <p className="os-hero__subtitle">
                  Celebrating Community of Coders members who&apos;ve carried VJTI into global open-source
                  programs - real people, real merged pull requests.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="os-stats-row">
                  <div className="os-stat">
                    <span className="os-stat__num">{stats.repos}</span>
                    <span className="os-stat__label">Repositories</span>
                  </div>
                  <div className="os-stat">
                    <span className="os-stat__num">{stats.stars}+</span>
                    <span className="os-stat__label">GitHub stars</span>
                  </div>
                  <div className="os-stat">
                    <span className="os-stat__num">{FEATURED_ORGS.length}</span>
                    <span className="os-stat__label">Organizations</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.38}>
                <div className="os-orgs-row">
                  <span className="os-orgs-row__label">Featured organizations</span>
                  <div className="os-orgs-row__logos">
                    {FEATURED_ORGS.map((org) => (
                      <a
                        key={org.name}
                        href={org.href}
                        target="_blank"
                        rel="noreferrer"
                        className="os-org-mark"
                        data-tip={org.name}
                        aria-label={org.name}
                      >
                        <org.Logo width={30} height={30} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal variant="fade" delay={0.2}>
              <motion.div className="os-floating-showcase" style={reduce ? undefined : { x: sx, y: sy }}>
                <div className="os-floating-showcase__grid">
                  {FLOATING_HERO_LOGOS.map((item, idx) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="os-floating-logo-item"
                      data-tip={item.name}
                      aria-label={item.name}
                      style={{ animationDelay: `${idx * 0.5}s` }}
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        className={`os-floating-logo-img ${item.isInvert ? 'is-inverted' : ''}`}
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: WHERE WE'VE CONTRIBUTED ────────────────────────── */}
      <section className="os-programs-section">
        <div className="container">
          <div className="os-section-header">
            <Reveal>
              <span className="eyebrow">Programs</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title">
                Where we&apos;ve <span className="mark">contributed.</span>
              </h2>
            </Reveal>
          </div>

          <div className="os-programs-grid">
            {PROGRAMS.map((program, i) => (
              <Reveal delay={i * 0.08} key={program.id} className="os-program-reveal">
                <a href={program.href} target="_blank" rel="noreferrer" className="os-program-card">

                  <div className="os-program-card__logo">
                    <program.Logo width={30} height={30} />
                  </div>
                  <h3 className="os-program-card__title">{program.name}</h3>
                  <p className="os-program-card__desc">{program.description}</p>
                  <span className="os-program-card__link">
                    Visit site <ArrowUpRight size={14} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: MEET THE CONTRIBUTORS ──────────────────────────── */}
      <section className="os-people-section" id="contributors-section">
        <div className="container">
          <div className="os-section-header">
            <Reveal>
              <span className="eyebrow">People</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title">
                Meet the <span className="mark">contributors.</span>
              </h2>
            </Reveal>
          </div>

          <div className="os-search-bar">
            <Search size={18} className="os-search-icon" />
            <input
              type="text"
              className="os-search-input"
              placeholder="Search contributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="os-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="os-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`os-filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="os-subhead">
            <span className="eyebrow">Contributors</span>
            <span className="os-count">- {filteredContributors.length} featured</span>
          </div>

          {(() => {
            const programGroups = PROGRAMS.filter((p) => p.id === 'gsoc' || p.id === 'lfx' || p.id === 'jsoc')
              .map((p) => {
                const list = filteredContributors.filter((c) => c.programId === p.id);
                return { program: p, contributors: list };
              })
              .filter((g) => g.contributors.length > 0);

            if (programGroups.length === 0) {
              return (
                <div className="os-empty">
                  <p>No contributors found matching &quot;{searchQuery}&quot;.</p>
                </div>
              );
            }

            return (
              <div className="os-program-divisions">
                {programGroups.map(({ program, contributors }) => (
                  <div
                    key={program.id}
                    className="os-division-block"
                    style={{ '--division-color': program.color } as React.CSSProperties}
                  >
                    <div className="os-division-header">
                      <div className="os-division-badge">
                        <program.Logo width={18} height={18} />
                        <span>{program.name}</span>
                      </div>
                      <span className="os-division-count">
                        {contributors.length} {contributors.length === 1 ? 'contributor' : 'contributors'}
                      </span>
                      <div className="os-division-line" />
                    </div>

                    <div className="os-contributors-grid">
                      {contributors.map((c, i) => (
                        <ContributorCard key={c.id} contributor={c} index={i} onSelect={handleOpenContributor} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ─── CONTRIBUTOR DETAIL DRAWER ─────────────────────────────────── */}
      <ContributorDrawer contributor={selectedContributor} isOpen={drawerOpen} onClose={handleCloseDrawer} />
    </div>
  );
}
