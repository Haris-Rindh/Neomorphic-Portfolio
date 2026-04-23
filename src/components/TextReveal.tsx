import React, { memo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const container = {
  hidden:  { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', damping: 22, stiffness: 120 },
  },
  hidden: {
    opacity: 0,
    y: 40,
    rotate: 10,
    transition: { type: 'spring', damping: 22, stiffness: 120 },
  },
};

export const TextReveal = memo(function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  // Split by <br/> first (supports line breaks), then by spaces for word animation
  const segments = text.split('<br/>');

  return (
    <motion.div
      custom={delay}
      variants={container}
      initial="hidden"
      whileInView="visible"
      // once:true is critical for performance — avoids running animation on every reverse scroll
      viewport={{ once: true, margin: '-80px' }}
      className={cn('flex flex-col overflow-hidden', className)}
    >
      {segments.map((segment, si) => (
        <span key={si} className="flex flex-wrap">
          {segment
            .split(' ')
            .filter(Boolean)
            .map((word, wi) => (
              <motion.span
                variants={child}
                key={`${si}-${wi}`}
                className="mr-2 mb-1 inline-block origin-bottom"
                // Promote each word to its own layer for GPU compositing
                style={{ willChange: 'transform, opacity' }}
              >
                {word}
              </motion.span>
            ))}
          {si < segments.length - 1 && <br />}
        </span>
      ))}
    </motion.div>
  );
});
