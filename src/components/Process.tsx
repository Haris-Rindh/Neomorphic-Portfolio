import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Database, Layers } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Research & Strategy',
    description: 'Deep dive into user psychology and market trends to define the technical roadmap.',
    icon: Globe,
    tech: 'MARKET ANALYSIS / USER FLOWS',
  },
  {
    id: '02',
    title: 'Precision Architecting',
    description: 'Building robust backends with scalable Node.js and MongoDB for maximum efficiency and speed.',
    icon: Cpu,
    tech: 'NODE.JS / EXPRESS / DOCKER',
  },
  {
    id: '03',
    title: 'Interactive Frontend',
    description: 'Crafting fluid motion and pixel-perfect UI using Framer Motion and React.',
    icon: Layers,
    tech: 'REACT / VITE / MOTION',
  },
  {
    id: '04',
    title: 'Deployment & Scaling',
    description: 'Automated CI/CD pipelines and edge delivery to ensure global accessibility.',
    icon: Database,
    tech: 'VERCEL / AWS / GITHUB ACTIONS',
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 lg:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">
              Methodology
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-text uppercase leading-[0.9]">
              SYSTEM
              <br />
              ARCHITECT
            </h2>
          </div>

          {/* Quote card — glassmorphic pill */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="neo-flat p-6 rounded-[24px] max-w-xs border border-white/20 relative overflow-hidden"
          >
            <div className="absolute -top-6 -left-4 text-[5rem] font-display text-accent/10 select-none pointer-events-none leading-none">
              "
            </div>
            <p className="text-text-muted font-mono text-sm leading-relaxed italic relative z-10">
              A system is only as strong as its weakest interaction loop. I build loop-less systems.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                <span className="text-accent text-[9px] font-bold">HR</span>
              </div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Haris Rindh</span>
            </div>
          </motion.div>
        </div>

        {/* ── Step cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group p-6 lg:p-8 neo-flat rounded-[24px] lg:rounded-3xl transition-all duration-300 flex flex-col h-full"
              style={{
                // Hover: deepen shadow without swapping material class
                '--hover-shadow': '12px 12px 28px #a3b1c6, -12px -12px 28px #ffffff',
              } as React.CSSProperties}
            >
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <span className="text-4xl font-display font-bold text-dark-shadow/25 group-hover:text-accent/40 transition-colors uppercase italic">
                  {step.id}
                </span>
                <div className="w-10 h-10 neo-concave rounded-full flex items-center justify-center shadow-glass">
                  <step.icon className="text-accent w-5 h-5" />
                </div>
              </div>

              <h3 className="text-xl font-display font-semibold text-text mb-4 group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-auto">{step.description}</p>

              <div className="mt-8 pt-6 border-t border-dark-shadow/20">
                <span className="font-mono text-[10px] text-accent tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">
                  {step.tech}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
