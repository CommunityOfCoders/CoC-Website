import { motion } from 'framer-motion';
import './FuzzyOverlay.css';

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{ transform: "translateX(10%) translateY(10%)" }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      className="fuzzy-overlay"
    />
  );
};

export default FuzzyOverlay;
