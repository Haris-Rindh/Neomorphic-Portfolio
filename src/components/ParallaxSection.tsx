import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TextReveal } from './TextReveal';

export function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="relative px-6 md:px-12 py-40 overflow-hidden flex flex-col md:flex-row items-center gap-12 w-full max-w-7xl mx-auto">
      <motion.div style={{ y: y1 }} className="flex-1 space-y-6 z-10">
        <h2 className="text-5xl md:text-7xl font-display font-medium text-text leading-tight uppercase">
          <TextReveal text="SCALABLE <br/> SOLUTIONS." />
        </h2>
        <div className="w-20 h-1 bg-accent rounded-full" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="flex-1 z-10">
        <p className="text-xl text-text font-light leading-relaxed max-w-xl neo-flat p-8 rounded-3xl">
          In the modern web, speed isn't just a feature—it's the foundation of user retention. I build applications that bridge the gap between creative visual artistry and extreme engineering efficiency.
        </p>
      </motion.div>
      
      {/* Parallax Background Orbs */}
      <motion.div 
        style={{ y: y1, x: y2 }} 
        className="absolute top-[20%] left-[20%] w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none -z-10"
      />
      <motion.div 
        style={{ y: y2, x: y1 }} 
        className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-blue-400/5 blur-[100px] rounded-full pointer-events-none -z-10"
      />
    </section>
  );
}
