import React from 'react';
import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  // Use raw scroll value — no spring needed here, it just adds perceived lag
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left z-[60] pointer-events-none"
      style={{
        scaleX: scrollYProgress,
        height: 3,
        background: 'linear-gradient(90deg, #1a5fa8 0%, #3182CE 55%, #5ba3e8 88%, transparent 100%)',
        borderRadius: '0 4px 4px 0',
        boxShadow: '0 0 10px rgba(49,130,206,0.45)',
        willChange: 'transform',
      }}
    />
  );
}
