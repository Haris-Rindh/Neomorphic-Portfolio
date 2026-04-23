import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TextReveal } from './TextReveal';

/* ── Count-up hook — uses a single RAF cleanly cancelled on unmount ── */
function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);
  return value;
}

const stats = [
  { label: 'Years of Exp.', value: 3,   suffix: '+' },
  { label: 'Projects Done', value: 20,  suffix: '+' },
  { label: 'Success Rate',  value: 100, suffix: '%' },
  { label: 'Client Rating', value: 5,   suffix: '/5' },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCountUp(stat.value, 1400, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="neo-flat p-6 md:p-8 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center text-center group hover:neo-concave transition-all duration-300 cursor-default"
    >
      <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-500 tabular-nums">
        {count}{stat.suffix}
      </span>
      <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest leading-tight">
        {stat.label}
      </span>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-bg relative overflow-hidden">
      {/* Background Decor — no translate so orb stays within the overflow-hidden clip */}
      <div className="absolute top-[20%] right-0 w-1/3 h-1/3 bg-accent/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Left: Bio Story */}
          <div className="w-full lg:w-3/5 space-y-10">
            <div className="flex flex-col space-y-4">
              <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">
                The Visionary
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-text leading-[0.9] uppercase">
                <TextReveal text="THE DEVELOPER<br/>BEHIND THE CODE" />
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              <p className="text-xl text-text-muted leading-relaxed font-light">
                I am{' '}
                <span className="text-text font-medium underline decoration-accent/30 underline-offset-4">
                  Haris Rindh
                </span>
                , a dedicated MERN Stack Specialist with a passion for designing and developing
                robust, scalable, and visually compelling web applications. I bridge the gap between
                back-end infrastructure and front-end user experience.
              </p>
              <p className="text-lg text-text-muted leading-relaxed font-light">
                With a deep understanding of Neumorphic and Glassmorphic design principles, I aim to
                craft digital experiences that are not just functional, but profoundly engaging. Every
                project is an opportunity to solve a complex problem with an elegant solution.
              </p>
            </motion.div>
          </div>

          {/* Right: Stats Grid */}
          <div className="w-full lg:w-2/5">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <StatCard key={stat.label} stat={stat} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section separator */}
      <div className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12 h-px bg-gradient-to-r from-transparent via-dark-shadow/20 to-transparent" />
    </section>
  );
}
