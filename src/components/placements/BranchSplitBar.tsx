import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  ce: number;
  it: number;
}

const BranchSplitBar: React.FC<Props> = ({ ce, it }) => {
  const reduce = useReducedMotion();
  const total = ce + it;
  const cePct = (ce / total) * 100;
  const itPct = (it / total) * 100;

  return (
    <div className="branch">
      <div className="branch-track" role="img" aria-label={`Computer Engineering ${ce}, Information Technology ${it}`}>
        <motion.div
          className="branch-seg branch-ce"
          initial={{ width: 0 }}
          whileInView={{ width: `${cePct}%` }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="branch-seg branch-it"
          initial={{ width: 0 }}
          whileInView={{ width: `${itPct}%` }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="branch-keys">
        <div className="branch-key">
          <span className="branch-key-dot branch-ce" />
          <span className="branch-key-name">Computer Engg.</span>
          <span className="branch-key-val">{ce}</span>
          <span className="branch-key-pct">{Math.round(cePct)}%</span>
        </div>
        <div className="branch-key">
          <span className="branch-key-dot branch-it" />
          <span className="branch-key-name">Information Tech.</span>
          <span className="branch-key-val">{it}</span>
          <span className="branch-key-pct">{Math.round(itPct)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BranchSplitBar;
