import React from 'react';
import { motion } from 'motion/react';
import { Database, Layout, Code2, GitMerge } from 'lucide-react';
import { TextReveal } from './TextReveal';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Layout,
    items: [
      { name: 'HTML5 & CSS3', level: 'Expert' },
      { name: 'JavaScript ES6+', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'React.js', level: 'Intermediate' },
      { name: 'Framer Motion', level: 'Intermediate' },
    ]
  },
  {
    title: 'Backend & Tools',
    icon: Database,
    items: [
      { name: 'Node.js & Express', level: 'Intermediate' },
      { name: 'MongoDB / SQL', level: 'In Progress' },
      { name: 'Git & GitHub', level: 'Proficient' },
      { name: 'REST APIs', level: 'Proficient' },
    ]
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative">
      
      {/* Sticky Left Hemisphere */}
      <div className="w-full md:w-1/3">
        <div className="sticky top-32 flex flex-col space-y-6">
          <span className="text-accent font-mono text-xs uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full w-max shadow-neo-flat-sm">Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-text leading-tight uppercase">
             <TextReveal text="TECHNICAL <br/> ARSENAL" />
          </h2>
          <p className="text-text-muted text-sm mt-4 max-w-xs leading-relaxed">
            Consistently expanding my toolset to build fast, resilient, and beautifully animated experiences.
          </p>
        </div>
      </div>

      {/* Scrolling Right Hemisphere */}
      <div className="w-full md:w-2/3 flex flex-col space-y-16 mt-12 md:mt-0">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            className="p-8 md:p-10 neo-flat rounded-[32px] flex flex-col space-y-8 relative overflow-hidden group hover:shadow-neo-elevated transition-shadow duration-500"
          >
            {/* Soft decorative blur */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-accent/20 transition-colors duration-500" />
            
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="w-12 h-12 neo-concave rounded-full flex items-center justify-center border border-white/20 shadow-glass">
                <category.icon className="text-accent w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-medium text-text">{category.title}</h3>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              {category.items.map((skill) => (
                <motion.div 
                  variants={itemVariants}
                  key={skill.name} 
                  className="neo-btn px-6 py-3 rounded-xl flex flex-col space-y-1 cursor-default"
                >
                  <span className="font-sans font-semibold text-text text-sm group-hover/btn:text-accent transition-colors">{skill.name}</span>
                  <span className="font-mono text-[10px] text-accent uppercase tracking-wider">{skill.level}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
