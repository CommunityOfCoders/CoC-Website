import React, { useId, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { placementsData } from '../../data/placementsData';
import { METRICS, type TrendMetric } from '../../data/placementsStats';

const W = 900;
const H = 340;
const PAD_L = 16;
const PAD_R = 16;
const PAD_T = 46;
const PAD_B = 42;

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  metric: TrendMetric;
  onMetricChange: (m: TrendMetric) => void;
}

const TrajectoryChart: React.FC<Props> = ({ metric, onMetricChange }) => {
  const gradId = useId();
  const reduce = useReducedMotion();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const cfg = METRICS[metric];

  const { points, linePath, areaPath } = useMemo(() => {
    const values = placementsData.map(cfg.get);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const innerW = W - PAD_L - PAD_R;
    const innerH = H - PAD_T - PAD_B;
    const pts = placementsData.map((y, i) => {
      const x = PAD_L + (i / (placementsData.length - 1)) * innerW;
      const norm = (cfg.get(y) - min) / range;
      const yy = PAD_T + (1 - norm) * innerH;
      return { x, y: yy, year: y.year, value: cfg.get(y) };
    });
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${H - PAD_B} L ${pts[0].x.toFixed(1)} ${H - PAD_B} Z`;
    return { points: pts, linePath: line, areaPath: area };
  }, [metric, cfg]);

  const handleMove = (e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - relX);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHoverIdx(nearest);
  };

  const active = hoverIdx !== null ? points[hoverIdx] : null;

  return (
    <div className="traj">
      <div className="traj-tabs" role="tablist" aria-label="Trajectory metric">
        {(Object.keys(METRICS) as TrendMetric[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={metric === key}
            className={`traj-tab ${metric === key ? 'active' : ''}`}
            onClick={() => onMetricChange(key)}
          >
            {metric === key && (
              <motion.span
                layoutId="traj-tab-ind"
                className="traj-tab-ind"
                transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
              />
            )}
            <span className="traj-tab-lbl">{METRICS[key].label}</span>
          </button>
        ))}
      </div>

      <div className="traj-plot">
        <svg viewBox={`0 0 ${W} ${H}`} className="traj-svg" role="img" aria-label={`${cfg.label} across seasons`}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--pl-cream)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--pl-cream)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 0.5, 1].map((t) => {
            const y = PAD_T + t * (H - PAD_T - PAD_B);
            return <line key={t} x1={PAD_L} x2={W - PAD_R} y1={y} y2={y} className="traj-grid" />;
          })}

          <motion.path
            d={areaPath}
            fill={`url(#${gradId})`}
            initial={false}
            animate={{ d: areaPath, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
          />
          <motion.path
            className="traj-line"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true }}
            animate={{ d: linePath }}
            transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
          />

          {points.map((p, i) => (
            <g key={p.year}>
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoverIdx === i ? 6 : 3.5}
                className="traj-dot"
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ cx: p.x, cy: p.y }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 + i * 0.045, ease: EASE }}
              />
              <text x={p.x} y={H - PAD_B + 24} textAnchor="middle" className="traj-xlabel">
                {`'${String(p.year).slice(2)}`}
              </text>
            </g>
          ))}

          {active && (
            <g pointerEvents="none">
              <line x1={active.x} x2={active.x} y1={PAD_T - 10} y2={H - PAD_B} className="traj-cursor" />
              <text x={active.x} y={PAD_T - 20} textAnchor="middle" className="traj-tip-val">
                {cfg.format(active.value)}
                {cfg.suffix}
              </text>
            </g>
          )}

          <rect
            x={0}
            y={0}
            width={W}
            height={H}
            fill="transparent"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverIdx(null)}
          />
        </svg>
      </div>
    </div>
  );
};

export default TrajectoryChart;
