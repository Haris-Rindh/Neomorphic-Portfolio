import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Database, Layers } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Understand & Plan',
    description: 'Deep dive into user goals, scope requirements, and define the technical roadmap before writing a single line of code.',
    icon: Globe,
    tech: 'MARKET ANALYSIS / USER FLOWS'
  },
  {
    id: '02',
    title: 'Design the System',
    description: 'Architect the database schema, API structure, and component hierarchy for a scalable, maintainable codebase.',
    icon: Cpu,
    tech: 'NODE.JS / EXPRESS / MONGODB'
  },
  {
    id: '03',
    title: 'Build & Animate',
    description: 'Craft fluid motion and pixel-perfect UI using React and Framer Motion, wired to a robust backend.',
    icon: Layers,
    tech: 'REACT / VITE / FRAMER MOTION'
  },
  {
    id: '04',
    title: 'Deploy & Monitor',
    description: 'Ship via Vercel with CI/CD pipelines. Monitor performance and iterate based on real user feedback.',
    icon: Database,
    tech: 'VERCEL / GITHUB ACTIONS'
  }
];

export function Process() {
  return (
    <section id="process" className="py-20 lg:py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 space-y-4">
          <div className="space-y-4">
            <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">Methodology</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-text">MY <br />PROCESS</h2>
          </div>
          <div className="max-w-sm neo-flat p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/20">
              <p className="text-text-muted font-mono text-xs leading-relaxed italic border-l-2 border-accent pl-4">
                "I don't just build features — I build systems that are easy to understand, maintain, and grow."
              </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 lg:p-8 neo-flat rounded-[24px] lg:rounded-3xl hover:shadow-neo-elevated transition-shadow duration-500 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <span className="text-4xl font-display font-bold text-dark-shadow/30 group-hover:text-accent/40 transition-colors uppercase italic">{step.id}</span>
                <div className="w-10 h-10 neo-concave rounded-full flex items-center justify-center shadow-glass">
                  <step.icon className="text-accent w-5 h-5" />
                </div>
              </div>
              
              <h3 className="text-xl font-display font-semibold text-text mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-auto">
                {step.description}
              </p>
              
              <div className="mt-8 pt-6 border-t border-dark-shadow/20">
                <span className="font-mono text-xs text-accent tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
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

