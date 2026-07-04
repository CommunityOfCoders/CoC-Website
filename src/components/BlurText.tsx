import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({ text, delay = 0, className = '' }) => {
  const words = text.split(' ');
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { filter: 'blur(10px)', opacity: 0 },
        visible: { 
          filter: 'blur(0px)', 
          opacity: 1, 
          transition: { staggerChildren: 0.1, delayChildren: delay } 
        },
      }}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
            visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;
