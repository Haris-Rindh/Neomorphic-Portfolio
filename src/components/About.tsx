import React from 'react';
import { motion } from 'motion/react';

export function About() {
  return (
    <section id="about" className="py-24 bg-bg relative">
      <div className="px-6 md:px-12 w-full max-w-4xl mx-auto mb-16">
        <div className="flex flex-col space-y-4">
          <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full w-max">About Me</span>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-text">THE DEVELOPER <br />BEHIND THE CODE</h2>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mt-12 neo-flat p-8 md:p-12 rounded-[40px] space-y-6"
        >
            <p className="text-lg text-text-muted leading-relaxed">
              I am Haris Rindh, a dedicated MERN Stack Specialist with a passion for designing and developing robust, scalable, and visually compelling web applications. I bridge the gap between back-end infrastructure and front-end user experience.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              With a deep understanding of Neumorphic and Glassmorphic design principles, I aim to craft digital experiences that are not just functional, but profoundly engaging. Every project is an opportunity to solve a complex problem with an elegant solution.
            </p>
        </motion.div>
      </div>
    </section>
  );
}
