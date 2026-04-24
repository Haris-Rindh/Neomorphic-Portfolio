import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-blue-400 to-transparent origin-left z-50 rounded-r-full shadow-neo-elevated"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
