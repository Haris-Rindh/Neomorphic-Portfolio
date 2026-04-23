import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { TextReveal } from './TextReveal';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    location: 'Remote / Global',
    period: '2023 — Present',
    description:
      'Architecting end-to-end MERN stack solutions. Specializing in high-performance dashboards, real-time collaboration tools, and immersive Neumorphic UI systems.',
    highlights: ['SaaS Architecture', 'AI Integration', 'Premium UI/UX'],
  },
  {
    role: 'MERN Stack Specialist',
    company: 'Nexus Digital Platform',
    location: 'Lahore, PK',
    period: '2022 — 2023',
    description:
      'Developed and maintained large-scale web applications. Focused on optimizing database performance and building responsive, user-centric frontends.',
    highlights: ['API Optimization', 'State Management', 'Responsive Design'],
  },
  {
    role: 'Frontend Specialist',
    company: 'Tech Solutions Agency',
    location: 'Karachi, PK',
    period: '2021 — 2022',
    description:
      'Led the migration of legacy projects to modern React/Tailwind stacks. Standardized UI components and improved overall application accessibility.',
    highlights: ['React Migration', 'UI Kit Development', 'Clean Code'],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-bg relative overflow-hidden">
      {/* Background Decor — contained inside overflow-hidden */}
      <div className="absolute top-[40%] left-0 w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/3" />

      <div className="px-6 md:px-12 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col space-y-6 mb-12 md:mb-20">
          <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">
            The Journey
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-text leading-[0.9] uppercase">
            <TextReveal text="CAREER<br/>EVOLUTION" />
          </h2>
        </div>

        <div className="relative">
          {/* ── Desktop: Vertical Timeline Line ── */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-dark-shadow/10 -translate-x-1/2 z-0">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="w-full bg-accent"
            />
          </div>

          {/* ── Mobile: Left border connector ── */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30 z-0" />

          <div className="space-y-16 md:space-y-24 relative z-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* ── Mobile: dot on left border ── */}
                <div className="md:hidden absolute left-2.5 w-3 h-3 rounded-full bg-accent border-2 border-bg shadow-neo-flat-sm mt-8 -translate-x-1/2 z-20" />

                {/* ── Desktop: Center dot ── */}
                <div className="hidden md:flex absolute left-1/2 w-8 h-8 rounded-full bg-bg border-4 border-accent shadow-neo-flat -translate-x-1/2 z-20 items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[46%] pl-9 md:pl-0 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="neo-flat p-6 md:p-10 rounded-[32px] md:rounded-[40px] group hover:neo-concave transition-all duration-500 relative overflow-hidden">
                    {/* Ghost Numbering */}
                    <span className="absolute top-4 right-6 md:right-8 font-display text-[4rem] md:text-[5rem] font-bold text-accent/5 pointer-events-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex flex-col space-y-4 relative z-10">
                      <div className="flex items-center space-x-2 text-accent">
                        <Calendar size={14} />
                        <span className="font-mono text-xs uppercase tracking-widest">{exp.period}</span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl font-display font-bold text-text group-hover:text-accent transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center space-x-2 text-text-muted text-sm font-medium">
                          <Briefcase size={14} className="opacity-50" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <p className="text-sm text-text-muted leading-relaxed font-light">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[9px] text-accent uppercase tracking-wider border border-accent/25 bg-accent/5 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 flex items-center text-[10px] text-text-muted/60 font-mono uppercase tracking-widest border-t border-dark-shadow/10">
                        <MapPin size={10} className="mr-1" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[46%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
