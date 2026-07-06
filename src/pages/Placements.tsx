import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, TrendingUp, Wallet, Users, ArrowUpRight } from 'lucide-react';
import { MagicBento, BentoCard } from '../components/MagicBento';
import ShinyText from '../components/ShinyText';
import BlurText from '../components/BlurText';
import CountUp from '../components/placements/CountUp';
import TrendChart, { type TrendMetric } from '../components/placements/TrendChart';
import DomainDonut from '../components/placements/DomainDonut';
import PackageBars from '../components/placements/PackageBars';
import DriveTimeline from '../components/placements/DriveTimeline';
import { placementsData } from '../data/placementsData';
import { getAllTimeStats, getLatestYear, getYear, growthPct, topCompaniesForYear } from '../data/placementsStats';
import './Placements.css';

const EASE = [0.25, 1, 0.5, 1] as const;

const Placements: React.FC = () => {
  const [heroScope, setHeroScope] = useState<'allTime' | 'latest'>('allTime');
  const [selectedYear, setSelectedYear] = useState<number>(getLatestYear().year);
  const [trendMetric, setTrendMetric] = useState<TrendMetric>('placed');

  const allTime = useMemo(() => getAllTimeStats(), []);
  const latest = getLatestYear();
  const yearData = getYear(selectedYear);
  const years = placementsData.map((y) => y.year);
  const prevYearData = years.length > 1 ? getYear(years[years.length - 2]) : null;

  const heroStats = heroScope === 'allTime'
    ? {
        placed: allTime.totalStudentsPlaced,
        highest: allTime.highestPackageLPA,
        average: allTime.averagePackageLPA,
        companies: allTime.companiesCount,
      }
    : {
        placed: latest.totalStudentsPlaced,
        highest: latest.highestPackageLPA,
        average: latest.averagePackageLPA,
        companies: latest.companies.length,
      };

  const placedGrowth = prevYearData ? growthPct(yearData.totalStudentsPlaced, prevYearData.totalStudentsPlaced) : null;
  const topRecruiters = topCompaniesForYear(selectedYear, 8);

  return (
    <div className="placements-page">
      <section className="placements-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="placements-hero-content"
        >
          <div className="hud-eyebrow placements-eyebrow">
            <Briefcase size={12} className="accent-icon" />
            <span>Placements</span>
          </div>
          <h2 className="placements-title" style={{ display: 'flex', alignItems: 'center', gap: '0.25em', flexWrap: 'wrap' }}>
            <BlurText text="Careers" />
            <ShinyText text="Launched." speed={3} />
          </h2>
          <p className="placements-subtitle">
            Our members don&apos;t just build side projects &mdash; they carry that craft straight into
            the offers that matter. Here&apos;s what recruiters at VJTI IT &amp; CE have backed, in numbers.
          </p>
        </motion.div>
      </section>

      <section className="placements-section">
        <div className="stat-strip-header">
          <div className="stat-scope-toggle" role="tablist" aria-label="Stat scope">
            <button
              role="tab"
              aria-selected={heroScope === 'allTime'}
              className={`stat-scope-btn ${heroScope === 'allTime' ? 'active' : ''}`}
              onClick={() => setHeroScope('allTime')}
            >
              All Time
            </button>
            <button
              role="tab"
              aria-selected={heroScope === 'latest'}
              className={`stat-scope-btn ${heroScope === 'latest' ? 'active' : ''}`}
              onClick={() => setHeroScope('latest')}
            >
              Class of {latest.year}
            </button>
          </div>
        </div>

        <div className="stat-strip">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0 }}
          >
            <Users size={18} className="stat-icon" />
            <span className="stat-value">
              <CountUp value={heroStats.placed} />
            </span>
            <span className="stat-label">Students Placed</span>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            <TrendingUp size={18} className="stat-icon" />
            <span className="stat-value">
              <CountUp value={heroStats.highest} decimals={0} suffix=" LPA" />
            </span>
            <span className="stat-label">Highest Package</span>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          >
            <Wallet size={18} className="stat-icon" />
            <span className="stat-value">
              <CountUp value={heroStats.average} decimals={1} suffix=" LPA" />
            </span>
            <span className="stat-label">Average Package</span>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
          >
            <Building2 size={18} className="stat-icon" />
            <span className="stat-value">
              <CountUp value={heroStats.companies} />
            </span>
            <span className="stat-label">Recruiting Companies</span>
          </motion.div>
        </div>
      </section>

      <section className="placements-section">
        <SectionHeading
          eyebrow="Year Over Year"
          title="The Trajectory"
          subtitle="How outcomes have moved across graduating batches."
        />
        <TrendChart metric={trendMetric} onMetricChange={setTrendMetric} />
      </section>

      <section className="placements-section">
        <div className="year-scope-row">
          <SectionHeading
            eyebrow="Snapshot"
            title={`Class of ${selectedYear}`}
            subtitle={placedGrowth !== null ? `${placedGrowth >= 0 ? '+' : ''}${placedGrowth.toFixed(1)}% students placed vs. the year before.` : 'Domain mix, top recruiters, and package spread for this batch.'}
          />
          <div className="year-tabs" role="tablist" aria-label="Select year">
            {years.map((y) => (
              <button
                key={y}
                role="tab"
                aria-selected={selectedYear === y}
                className={`year-tab ${selectedYear === y ? 'active' : ''}`}
                onClick={() => setSelectedYear(y)}
              >
                {selectedYear === y && (
                  <motion.div
                    layoutId="year-tab-indicator"
                    className="year-tab-indicator"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="year-tab-label">{y}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="domain-recruiters-grid">
          <div className="domain-block">
            <h3 className="subsection-title">Where Offers Landed</h3>
            <DomainDonut data={yearData.domainSplit} year={selectedYear} />
          </div>

          <div className="recruiters-block">
            <h3 className="subsection-title">Top Recruiters</h3>
            <MagicBento>
              <div className="recruiters-grid">
                {topRecruiters.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className="recruiter-card-wrapper"
                  >
                    <BentoCard contentClassName="recruiter-card-content" glowColor="rgba(97, 185, 25, 0.7)">
                      <span className="recruiter-rank">{String(i + 1).padStart(2, '0')}</span>
                      <h4 className="recruiter-name">{c.name}</h4>
                      <div className="recruiter-meta">
                        <span className="recruiter-offers">{c.offers} offer{c.offers > 1 ? 's' : ''}</span>
                        <span className="recruiter-package">{c.packageLPA !== null ? `${c.packageLPA} LPA` : 'Undisclosed'}</span>
                      </div>
                    </BentoCard>
                  </motion.div>
                ))}
              </div>
            </MagicBento>
          </div>
        </div>

        <div className="bars-timeline-grid">
          <div className="bars-block">
            <h3 className="subsection-title">Package Spread</h3>
            <PackageBars
              highest={yearData.highestPackageLPA}
              average={yearData.averagePackageLPA}
              median={yearData.medianPackageLPA}
            />
          </div>

          <div className="timeline-block">
            <h3 className="subsection-title">When Drives Ran</h3>
            <DriveTimeline data={yearData.monthlyDrives} />
          </div>
        </div>
      </section>

      <section className="placements-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="placements-cta-content"
        >
          <h3 className="placements-cta-title">
            Building the skills recruiters look for starts with <ShinyText text="one commit." speed={3} />
          </h3>
          <p className="placements-cta-subtitle">
            Every offer on this page traces back to a project, a contribution, or a late night debugging session.
          </p>
          <div className="placements-cta-links">
            <a href="#projects" className="cta-link cta-link-primary">
              Explore Projects <ArrowUpRight size={16} />
            </a>
            <a href="#open-source" className="cta-link">
              See Open Source Wins <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtitle }) => (
  <div className="section-heading">
    <span className="section-eyebrow">{eyebrow}</span>
    <h3 className="section-title">{title}</h3>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

export default Placements;
