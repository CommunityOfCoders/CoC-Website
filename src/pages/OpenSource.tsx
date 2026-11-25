import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, Rss, Search, X } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { Tilt } from '../components/ui/Tilt';
import { KineticWords } from '../components/ui/KineticHeading';
import { Github, LinkedinColor, MediumLogo } from '../components/ui/BrandIcons';
import { CONTRIBUTORS, FEATURED_ORGS, PROGRAMS, type Contributor, type Program } from '../data/openSourceData';
import { CERNLogo, CNCFLogo, INCFLogo, IntelLogo, JuliaLogo, ML4SciLogo, OctaveLogo, SymPyLogo } from '../components/ui/OrgLogos';
import orgImg_aiida from '../assets/org-logos/aiida.png';
import orgImg_archive from '../assets/org-logos/archive.png';
import orgImg_compiler from '../assets/org-logos/compiler.png';
import orgImg_gnuastro from '../assets/org-logos/gnuastro.png';
import orgImg_jderobot from '../assets/org-logos/jderobot.png';
import orgImg_numfocus from '../assets/org-logos/numfocus.png';
import orgImg_neurobagel from '../assets/org-logos/neurobagel.png';
import orgImg_openastro from '../assets/org-logos/openastro.png';
import orgImg_root from '../assets/org-logos/root.png';
import orgImg_sugar from '../assets/org-logos/sugar.png';
import orgImg_redhen from '../assets/org-logos/redhen.png';
import LogoBento from '../components/opensource/LogoBento';
import './OpenSource.css';

const getProgram = (id: Contributor['programId']): Program | undefined => PROGRAMS.find((p) => p.id === id);


function BlogIcon({ url }: { url: string }) {
  if (/medium\.com/i.test(url)) return <MediumLogo width={16} height={16} />;
  return <Rss size={15} />;
}

/* real organisation marks (first match wins); anyone else falls back to
   their program's logo */
type OrgMarkDef = { match: RegExp; Logo?: React.FC<React.SVGProps<SVGSVGElement>>; src?: string };
const ORG_LOGOS: OrgMarkDef[] = [
  { match: /compiler research/i, src: orgImg_compiler },
  { match: /\/ root/i, src: orgImg_root },
  { match: /neurobagel/i, src: orgImg_neurobagel },
  { match: /incf/i, Logo: INCFLogo },
  { match: /cern/i, Logo: CERNLogo },
  { match: /octave/i, Logo: OctaveLogo },
  { match: /ml4sci/i, Logo: ML4SciLogo },
  { match: /cncf/i, Logo: CNCFLogo },
  { match: /intel/i, Logo: IntelLogo },
  { match: /julia/i, Logo: JuliaLogo },
  { match: /sympy/i, Logo: SymPyLogo },
  { match: /aiida/i, src: orgImg_aiida },
  { match: /numfocus/i, src: orgImg_numfocus },
  { match: /gnuastro|gnu astronomy/i, src: orgImg_gnuastro },
  { match: /openastronomy/i, src: orgImg_openastro },
  { match: /internet archive|open library/i, src: orgImg_archive },
  { match: /jderobot/i, src: orgImg_jderobot },
  { match: /sugar labs/i, src: orgImg_sugar },
  { match: /red hen/i, src: orgImg_redhen },
];

const TAGS_SHOWN = 3;

// ─── CONTRIBUTOR CARD ─────────────────────────────────────────────────────────

interface ContributorCardProps {
  contributor: Contributor;
  index: number;
  onSelect: (c: Contributor) => void;
}

function ContributorCard({ contributor, index, onSelect }: ContributorCardProps) {
  const program = getProgram(contributor.programId);
  const orgLogo = ORG_LOGOS.find((o) => o.match.test(contributor.org));
  const FallbackLogo = program?.Logo;
  const mentors = (contributor.mentor ?? '').split(',').map((m) => m.trim()).filter(Boolean);

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
          style={{ '--card-accent': program?.hover } as React.CSSProperties}
        >
          <div className="os-card__head">
            <span className="os-card__prog-logo">
              {orgLogo?.src ? (
                <img src={orgLogo.src} alt="" draggable={false} loading="lazy" decoding="async" />
              ) : orgLogo?.Logo ? (
                <orgLogo.Logo width={20} height={20} />
              ) : FallbackLogo ? (
                <FallbackLogo width={20} height={20} />
              ) : null}
            </span>
            <span className="os-card__org">{contributor.org}</span>
            <span className="os-card__year">{contributor.year}</span>
          </div>

          <div className="os-card__body">
            <h3 className="os-card__name">{contributor.name}</h3>
            <p className="os-card__project">{contributor.project}</p>

            {/* phones: one tidy line instead of pill chips */}
            <p className="os-card__tech-line">{contributor.tech.join(' · ')}</p>

            <div className="os-card__tech">
              {contributor.tech.slice(0, TAGS_SHOWN).map((t) => (
                <span key={t} className="tech-chip">
                  {t}
                </span>
              ))}
              {contributor.tech.length > TAGS_SHOWN && (
                <span className="tech-chip tech-chip--more">+{contributor.tech.length - TAGS_SHOWN}</span>
              )}
            </div>

            <div className="os-card__footer">
              {mentors.length > 0 && (
                <div className="os-card__mentor">
                  <em>{mentors.length > 1 ? 'Mentors' : 'Mentor'}</em>
                  <span>{mentors.join(', ')}</span>
                </div>
              )}
              <div className="os-card__actions">
                <span className="os-card__links" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  {contributor.github && (
                    <a href={contributor.github} target="_blank" rel="noreferrer" aria-label={`${contributor.name} on GitHub`}>
                      <Github width={15} height={15} />
                    </a>
                  )}
                  {contributor.linkedin && (
                    <a href={contributor.linkedin} target="_blank" rel="noreferrer" aria-label={`${contributor.name} on LinkedIn`}>
                      <LinkedinColor width={15} height={15} />
                    </a>
                  )}
                  {contributor.blog && (
                    <a href={contributor.blog} target="_blank" rel="noreferrer" aria-label={`${contributor.name}'s blog`}>
                      <BlogIcon url={contributor.blog} />
                    </a>
                  )}
                </span>
                <span className="os-card__go">
                  View profile <ChevronRight size={14} />
                </span>
              </div>
            </div>
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
        style={
          {
            '--card-accent': getProgram(contributor.programId)?.hover,
            '--card-ink': contributor.programId === 'jsoc' ? '#ffffff' : '#0b0c0b',
          } as React.CSSProperties
        }
      >
        <button type="button" className="os-drawer-mclose" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>
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

  const titleRef = useRef<HTMLHeadingElement>(null);

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
          <div className="os-hero__grid">
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

            </div>

            <Reveal variant="fade" delay={0.2}>
              <LogoBento />
            </Reveal>
          </div>

          {/* Featured organizations: an endless scrolling bar, same as the homepage */}
          <Reveal delay={0.3}>
            <div className="os-marquee-wrap" aria-label="Featured organizations">
              <div className="os-marquee-fade os-marquee-fade--l" />
              <div className="os-marquee-fade os-marquee-fade--r" />
              <div className="os-marquee-track">
                {[...FEATURED_ORGS, ...FEATURED_ORGS].map((org, idx) => (
                  <a
                    key={`${org.name}-${idx}`}
                    href={org.href}
                    target="_blank"
                    rel="noreferrer"
                    className="os-marquee-logo"
                    aria-label={org.name}
                    title={org.name}
                    aria-hidden={idx >= FEATURED_ORGS.length ? true : undefined}
                    tabIndex={idx >= FEATURED_ORGS.length ? -1 : undefined}
                  >
                    <org.Logo width={34} height={34} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 2: MEET THE CONTRIBUTORS ──────────────────────────── */}
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
                  >
                    <div className="os-division-header">
                      <div className="os-division-badge">
                        <span className="os-card__prog-logo">
                          <program.Logo width={20} height={20} />
                        </span>
                        <span>{program.name}</span>
                      </div>
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
