import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotate: 15,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("flex flex-wrap overflow-hidden", className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="mr-2 mb-2 inline-block origin-bottom"
        >
          {word === '<br/>' ? <br /> : word}
        </motion.span>
      ))}
    </motion.div>
  );
}
