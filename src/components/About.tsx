import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { TextReveal } from './TextReveal';

const stats = [
  { label: 'Years of Exp.', num: 3, prefix: '0', suffix: '+' },
  { label: 'Projects Done', num: 20, prefix: '', suffix: '+' },
  { label: 'Success Rate', num: 100, prefix: '', suffix: '%' },
  { label: 'Client Satisfaction', num: 5, prefix: '', suffix: '/5' },
];

function Counter({ num, prefix = '', suffix = '' }: { num: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 80 });

  useEffect(() => {
    if (inView) {
      motionValue.set(num);
    }
  }, [inView, num, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const val = Math.floor(latest);
        ref.current.textContent = prefix + val + suffix;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-bg relative overflow-hidden">
      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 border-b border-dark-shadow/10" />

      {/* Background Decor */}
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-accent/5 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Bio Story */}
          <div className="w-full lg:w-3/5 space-y-10">
            <div className="flex flex-col space-y-4">
              <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">The Visionary</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-text leading-[0.9] uppercase">
                <TextReveal text="THE DEVELOPER <br/> BEHIND THE CODE" />
              </h2>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="space-y-6"
            >
               <p className="text-xl text-text-muted leading-relaxed font-light">
                 I am <span className="text-text font-medium underline decoration-accent/30 underline-offset-4">Haris Rindh</span>, a dedicated MERN Stack Specialist with a passion for designing and developing robust, scalable, and visually compelling web applications. I bridge the gap between back-end infrastructure and front-end user experience.
               </p>
               <p className="text-lg text-text-muted leading-relaxed font-light">
                 With a deep understanding of Neumorphic and Glassmorphic design principles, I aim to craft digital experiences that are not just functional, but profoundly engaging. Every project is an opportunity to solve a complex problem with an elegant solution.
               </p>
            </motion.div>
          </div>

          {/* Right: Stats Grid */}
          <div className="w-full lg:w-2/5">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="neo-flat p-6 md:p-8 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center text-center group hover:neo-concave transition-all duration-300"
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-500">
                    <Counter num={stat.num} prefix={stat.prefix} suffix={stat.suffix} />
                  </span>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest leading-tight">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
