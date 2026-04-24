import React from 'react';
import { motion } from 'motion/react';
import { Database, Layout, Code2, Cpu, Globe, Rocket, Wrench } from 'lucide-react';
import { TextReveal } from './TextReveal';

const skillCategories = [
  {
    title: 'Frontend Mastery',
    icon: Layout,
    description: 'Crafting immersive, high-performance user interfaces with modern frameworks.',
    color: 'text-accent',
    items: [
      { name: 'React / Next.js', level: 'Expert' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'Framer Motion', level: 'Advanced' },
      { name: 'Three.js / GSAP', level: 'Intermediate' },
    ]
  },
  {
    title: 'Backend & DevOps',
    icon: Database,
    description: 'Building robust, scalable server-side systems and efficient databases.',
    color: 'text-accent',
    items: [
      { name: 'Node.js & Express', level: 'Advanced' },
      { name: 'MongoDB / PostgreSQL', level: 'Advanced' },
      { name: 'Firebase / AWS', level: 'Intermediate' },
      { name: 'Docker / CI/CD', level: 'Intermediate' },
      { name: 'GraphQL / REST', level: 'Proficient' },
    ]
  },
  {
    title: 'Tools & Workflow',
    icon: Wrench,
    description: 'Streamlining development processes and ensuring version control integrity.',
    color: 'text-accent',
    items: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'Docker / CI/CD', level: 'Intermediate' },
      { name: 'Figma', level: 'Advanced' },
      { name: 'Postman', level: 'Expert' },
    ]
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 18, stiffness: 80 } }
};

export function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-32 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-20 relative">
      
      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 border-b border-dark-shadow/10" />

      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Sticky Left Hemisphere */}
      <div className="w-full md:w-2/5">
        <div className="md:sticky md:top-[20vh] lg:top-[30vh] flex flex-col space-y-8 pb-12 lg:pb-0 z-20">
          <div className="flex flex-col space-y-4">
             <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">Technical Prowess</span>
             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-display font-medium text-text leading-[0.9] uppercase">
                <TextReveal text="TECHNICAL <br/> ARSENAL" />
             </h2>
          </div>
          <p className="text-text-muted text-lg font-light leading-relaxed max-w-sm">
            I don't just write code. I architect digital ecosystems designed for speed, scale, and emotional impact.
          </p>
          
          <div className="flex gap-4 pt-4">
             <div className="w-12 h-12 neo-convex rounded-full flex items-center justify-center text-accent"><Code2 size={20} /></div>
             <div className="w-12 h-12 neo-convex rounded-full flex items-center justify-center text-accent"><Cpu size={20} /></div>
             <div className="w-12 h-12 neo-convex rounded-full flex items-center justify-center text-accent"><Globe size={20} /></div>
          </div>
        </div>
      </div>

      {/* Scrolling Right Hemisphere */}
      <div className="w-full md:w-3/5 flex flex-col space-y-12">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
            className="p-6 lg:p-14 neo-flat rounded-[32px] lg:rounded-[48px] flex flex-col space-y-8 lg:space-y-10 relative overflow-hidden group border border-white/10"
          >
            {/* Animated accent glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-accent/15 transition-all duration-700 group-hover:scale-150" />
            
            <motion.div variants={itemVariants} className="space-y-4 relative z-10">
              <div className="flex items-center space-x-5">
                <div className="w-16 h-16 neo-concave rounded-3xl flex items-center justify-center border border-white/30 shadow-glass shrink-0">
                  <category.icon className={`${category.color} w-8 h-8`} />
                </div>
                <div>
                   <h3 className="text-3xl font-display font-medium text-text">{category.title}</h3>
                   <p className="text-sm text-text-muted font-light">{category.description}</p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
              {category.items.map((skill) => (
                <motion.div 
                  variants={itemVariants}
                  key={skill.name} 
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="neo-btn p-4 md:p-5 rounded-[20px] md:rounded-[24px] flex flex-col space-y-2 cursor-pointer group/pill border border-transparent hover:border-accent/20 transition-colors duration-300"
                >
                  <span className="font-sans font-bold text-text text-xs sm:text-sm group-hover/pill:text-accent transition-colors leading-tight">{skill.name}</span>
                  <div className="flex items-center justify-between">
                     <span className="font-mono text-xs text-text-muted uppercase tracking-wider">{skill.level}</span>
                     <Rocket size={10} className="text-accent opacity-0 group-hover/pill:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
