import React, { useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { placementsData } from '../../data/placementsData';

export type TrendMetric = 'placed' | 'avg' | 'highest';

const METRIC_CONFIG: Record<TrendMetric, { label: string; getValue: (y: (typeof placementsData)[number]) => number; suffix: string; format: (n: number) => string }> = {
  placed: {
    label: 'Students Placed',
    getValue: (y) => y.totalStudentsPlaced,
    suffix: '',
    format: (n) => Math.round(n).toString(),
  },
  avg: {
    label: 'Average Package',
    getValue: (y) => y.averagePackageLPA,
    suffix: ' LPA',
    format: (n) => n.toFixed(1),
  },
  highest: {
    label: 'Highest Package',
    getValue: (y) => y.highestPackageLPA,
    suffix: ' LPA',
    format: (n) => n.toFixed(0),
  },
};

const WIDTH = 760;
const HEIGHT = 280;
const PAD_X = 50;
const PAD_TOP = 40;
const PAD_BOTTOM = 40;

interface TrendChartProps {
  metric: TrendMetric;
  onMetricChange: (m: TrendMetric) => void;
}

const TrendChart: React.FC<TrendChartProps> = ({ metric, onMetricChange }) => {
  const gradId = useId();
  const reduceMotion = useReducedMotion();
  const config = METRIC_CONFIG[metric];
  const values = placementsData.map(config.getValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = placementsData.map((y, i) => {
    const x = PAD_X + (i / (placementsData.length - 1 || 1)) * (WIDTH - PAD_X * 2);
    const norm = (config.getValue(y) - min) / range;
    const y2 = HEIGHT - PAD_BOTTOM - norm * (HEIGHT - PAD_TOP - PAD_BOTTOM);
    return { x, y: y2, year: y.year, value: config.getValue(y) };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${HEIGHT - PAD_BOTTOM} L ${points[0].x} ${HEIGHT - PAD_BOTTOM} Z`;

  return (
    <div className="trend-chart">
      <div className="trend-tabs" role="tablist" aria-label="Trend metric">
        {(Object.keys(METRIC_CONFIG) as TrendMetric[]).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={metric === key}
            className={`trend-tab ${metric === key ? 'active' : ''}`}
            onClick={() => onMetricChange(key)}
          >
            {metric === key && (
              <motion.div
                layoutId="trend-tab-indicator"
                className="trend-tab-indicator"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="trend-tab-label">{METRIC_CONFIG[key].label}</span>
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="trend-svg" role="img" aria-label={`${config.label} by year`}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--highlight)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal guide lines */}
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={HEIGHT - PAD_BOTTOM - t * (HEIGHT - PAD_TOP - PAD_BOTTOM)}
            y2={HEIGHT - PAD_BOTTOM - t * (HEIGHT - PAD_TOP - PAD_BOTTOM)}
            className="trend-gridline"
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.g
            key={metric}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            <motion.path
              d={areaPath}
              fill={`url(#${gradId})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.4 }}
            />
            <motion.path
              d={linePath}
              className="trend-line"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.1, ease: [0.25, 1, 0.5, 1] }}
            />
            {points.map((p, i) => (
              <motion.g
                key={p.year}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.7 + i * 0.12 }}
              >
                <circle cx={p.x} cy={p.y} r={5} className="trend-point" />
                <text x={p.x} y={p.y - 18} textAnchor="middle" className="trend-point-value">
                  {config.format(p.value)}
                  {config.suffix}
                </text>
                <text x={p.x} y={HEIGHT - PAD_BOTTOM + 26} textAnchor="middle" className="trend-axis-label">
                  {p.year}
                </text>
              </motion.g>
            ))}
          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default TrendChart;
