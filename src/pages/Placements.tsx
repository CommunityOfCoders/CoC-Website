import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import CountUp from '../components/placements/CountUp';
import TrajectoryChart from '../components/placements/TrajectoryChart';
import DomainDonut from '../components/placements/DomainDonut';
import BranchSplitBar from '../components/placements/BranchSplitBar';
import RecruiterList from '../components/placements/RecruiterList';
import PackageBars from '../components/placements/PackageBars';
import DrivesChart from '../components/placements/DrivesChart';
import {
  getYear,
  getAllTime,
  placementRate,
  growthPct,
  LATEST_YEAR,
  FIRST_YEAR,
  YEARS,
  type TrendMetric,
} from '../data/placementsStats';
import './Placements.css';

const EASE = [0.16, 1, 0.3, 1] as const;

type Scope = 'allTime' | 'latest';

const Placements: React.FC = () => {
  const allTime = useMemo(() => getAllTime(), []);
  const [scope, setScope] = useState<Scope>('allTime');
  const [selectedYear, setSelectedYear] = useState<number>(LATEST_YEAR.year);
  const [metric, setMetric] = useState<TrendMetric>('highest');

  const yearData = getYear(selectedYear);
  const prevYear = YEARS.indexOf(selectedYear) > 0 ? getYear(YEARS[YEARS.indexOf(selectedYear) - 1]) : null;
  const placedGrowth = prevYear ? growthPct(yearData.totalStudentsPlaced, prevYear.totalStudentsPlaced) : null;

  const supporting =
    scope === 'allTime'
      ? [
          { value: allTime.totalStudentsPlaced, label: 'Students placed', decimals: 0, suffix: '', note: `${allTime.seasons} seasons` },
          { value: allTime.averagePackageLPA, label: 'Average package', decimals: 1, suffix: ' LPA', note: `+${allTime.packageGrowthPct.toFixed(0)}% since '${String(FIRST_YEAR.year).slice(2)}` },
          { value: allTime.distinctRecruiters, label: 'Companies hired', decimals: 0, suffix: '', note: `top: ${allTime.topRecruiterAllTime.name}` },
        ]
      : [
          { value: LATEST_YEAR.totalStudentsPlaced, label: 'Students placed', decimals: 0, suffix: '', note: LATEST_YEAR.classLabel },
          { value: LATEST_YEAR.averagePackageLPA, label: 'Average package', decimals: 1, suffix: ' LPA', note: `median ${LATEST_YEAR.medianPackageLPA} LPA` },
          { value: placementRate(LATEST_YEAR), label: 'Placement rate', decimals: 0, suffix: '%', note: `${LATEST_YEAR.totalStudentsPlaced} of ${LATEST_YEAR.totalEligible}` },
        ];

  return (
    <div className="pl">
      {/* ============ HERO ============ */}
      <section className="pl-hero">
        <div className="pl-hero-top">
          <motion.p
            className="pl-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Placements <span className="pl-eyebrow-sep">/</span> {allTime.seasons} seasons on record
          </motion.p>

          <div className="pl-scope" role="tablist" aria-label="Headline scope">
            <button role="tab" aria-selected={scope === 'allTime'} className={`pl-scope-btn ${scope === 'allTime' ? 'on' : ''}`} onClick={() => setScope('allTime')}>
              {scope === 'allTime' && <motion.span layoutId="pl-scope-ind" className="pl-scope-ind" transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }} />}
              <span className="pl-scope-lbl">All time</span>
            </button>
            <button role="tab" aria-selected={scope === 'latest'} className={`pl-scope-btn ${scope === 'latest' ? 'on' : ''}`} onClick={() => setScope('latest')}>
              {scope === 'latest' && <motion.span layoutId="pl-scope-ind" className="pl-scope-ind" transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }} />}
              <span className="pl-scope-lbl">Class of {LATEST_YEAR.year}</span>
            </button>
          </div>
        </div>

        <motion.h1
          className="pl-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
        >
          Where the work<br />gets <span className="pl-headline-accent">hired.</span>
        </motion.h1>

        <div className="pl-hero-grid">
          <motion.div
            className="pl-hero-figure"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
          >
            <span className="pl-figure-kicker">All-time highest package</span>
            <span className="pl-figure-num">
              <CountUp value={allTime.highestPackageLPA} decimals={1} duration={1.4} />
              <span className="pl-figure-unit">LPA</span>
            </span>
            <span className="pl-figure-foot">
              {getYear(allTime.highestPackageYear).classLabel} · peaked from {FIRST_YEAR.highestPackageLPA} LPA in {FIRST_YEAR.year}
            </span>
          </motion.div>

          <div className="pl-hero-stats">
            {supporting.map((s, i) => (
              <motion.div
                key={s.label}
                className="pl-stat"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.08 }}
              >
                <span className="pl-stat-num">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </span>
                <span className="pl-stat-lbl">{s.label}</span>
                <span className="pl-stat-note">{s.note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRAJECTORY ============ */}
      <section className="pl-section">
        <SectionHead index="01" title="The trajectory" lead="Cohort size holds steady each year — the story is in the packages, climbing season over season." />
        <TrajectoryChart metric={metric} onMetricChange={setMetric} />
      </section>

      {/* ============ CLASS SNAPSHOT ============ */}
      <section className="pl-section">
        <div className="pl-snap-head">
          <SectionHead
            index="02"
            title="Class snapshot"
            lead={placedGrowth !== null ? `${yearData.classLabel} — ${yearData.recruitingCompaniesCount} companies on campus.` : `${yearData.classLabel} — the mix of where offers landed.`}
          />
          <div className="pl-years" role="tablist" aria-label="Select class year">
            {YEARS.map((y) => (
              <button
                key={y}
                role="tab"
                aria-selected={selectedYear === y}
                className={`pl-year ${selectedYear === y ? 'on' : ''}`}
                onClick={() => setSelectedYear(y)}
              >
                {selectedYear === y && <motion.span layoutId="pl-year-ind" className="pl-year-ind" transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }} />}
                <span className="pl-year-lbl">{`'${String(y).slice(2)}`}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pl-snap-grid">
          <div className="pl-card pl-card-donut">
            <div className="pl-card-head">
              <h3 className="pl-card-title">Where offers landed</h3>
              {yearData.verifiedSource && <span className="pl-verified">Verified · IT + CE</span>}
            </div>
            <DomainDonut year={selectedYear} />
          </div>

          <div className="pl-card pl-card-recs">
            <div className="pl-card-head">
              <h3 className="pl-card-title">Top recruiters</h3>
              <span className="pl-card-sub">by offers</span>
            </div>
            <RecruiterList year={selectedYear} />
          </div>

          <div className="pl-card pl-card-branch">
            <div className="pl-card-head">
              <h3 className="pl-card-title">Branch split</h3>
              <span className="pl-card-sub">{yearData.totalStudentsPlaced} placed</span>
            </div>
            <BranchSplitBar ce={yearData.branchSplit.CE} it={yearData.branchSplit.IT} />
          </div>
        </div>
      </section>

      {/* ============ PACKAGE SPREAD (light) ============ */}
      <section className="pl-light">
        <div className="pl-light-inner">
          <SectionHead index="03" title="Package spread" lead={`How ${yearData.classLabel} compensation stacks up — highest against the middle of the pack.`} light />
          <PackageBars highest={yearData.highestPackageLPA} average={yearData.averagePackageLPA} median={yearData.medianPackageLPA} />
        </div>
      </section>

      {/* ============ DRIVES ============ */}
      <section className="pl-section">
        <SectionHead index="04" title="Recruitment drives" lead={`When offers came through across the ${yearData.year} season — the autumn crush and the spring tail.`} />
        <div className="pl-card pl-card-drives">
          <DrivesChart data={yearData.monthlyDrives} />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="pl-cta">
        <motion.div
          className="pl-cta-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="pl-cta-title">Every offer here started as a <span className="pl-headline-accent">commit.</span></h2>
          <p className="pl-cta-lead">The projects and open-source work our members ship are the same things that show up in these interviews.</p>
          <div className="pl-cta-links">
            <a href="#projects" className="pl-btn pl-btn-primary">Explore projects <ArrowUpRight size={16} /></a>
            <a href="#open-source" className="pl-btn">Open-source wins <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

interface SectionHeadProps {
  index: string;
  title: string;
  lead?: string;
  light?: boolean;
}
const SectionHead: React.FC<SectionHeadProps> = ({ index, title, lead, light }) => (
  <motion.div
    className={`pl-head ${light ? 'pl-head-light' : ''}`}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.6, ease: EASE }}
  >
    <span className="pl-head-index">{index}</span>
    <div className="pl-head-text">
      <h2 className="pl-head-title">{title}</h2>
      {lead && <p className="pl-head-lead">{lead}</p>}
    </div>
  </motion.div>
);

export default Placements;
