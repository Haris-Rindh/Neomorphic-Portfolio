import React from 'react';
import { motion } from 'motion/react';

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: "Developing custom MERN stack applications, responsive enterprise platforms, and highly interactive UI components."
  },
  {
    role: "Frontend Specialist",
    company: "Tech Agency",
    period: "2021 - 2023",
    description: "Led a small team in modernizing legacy frontends into scalable React applications with sophisticated state management."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-bg relative">
      <div className="px-6 md:px-12 w-full max-w-4xl mx-auto mb-16">
        <div className="flex flex-col space-y-4">
          <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full w-max">Career Path</span>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-text">MY <br />EXPERIENCE</h2>
        </div>

        <div className="mt-12 space-y-8">
            {experiences.map((exp, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.2 }}
                    className="neo-convex p-8 rounded-3xl group hover:neo-flat transition-shadow duration-300"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h3 className="text-2xl font-display font-bold text-text group-hover:text-accent transition-colors">{exp.role}</h3>
                        <span className="font-mono text-xs text-text-muted mt-2 md:mt-0">{exp.period}</span>
                    </div>
                    <h4 className="text-md font-medium text-text mt-1">{exp.company}</h4>
                    <p className="mt-4 text-sm text-text-muted leading-relaxed">
                        {exp.description}
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
