import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { Magnetic } from './Magnetic';
import { TextReveal } from './TextReveal';
import avatarImg from '../assets/avatar.png';

const FiverrIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508.02 508.02" width={size} height={size}>
    <style>
      {`
        .fiverr-shape {
          fill: currentColor;
          transition: fill 0.3s ease;
        }
        svg:hover .fiverr-shape {
          fill: #1dbf73;
        }
      `}
    </style>
    <circle className="fiverr-shape" cx="315.97" cy="162.19" r="26.87"/>
    <path className="fiverr-shape" d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
  </svg>
);

const roles = [
  "Full Stack Developer",
  "MERN Stack Specialist",
  "UI/UX Enthusiast",
  "Problem Solver"
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100, mass: 0.5 });

  const yOrb = useTransform(smoothProgress, [0, 1], [0, 120]);
  const yCard1 = useTransform(smoothProgress, [0, 1], [0, -60]);
  const yCard2 = useTransform(smoothProgress, [0, 1], [0, -30]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-[100svh] pt-24 px-6 md:px-12 flex items-center will-change-transform z-10">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
      </div>

      {/* Main Wrapper */}
      <div className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row items-stretch justify-between relative z-10 gap-12 lg:gap-8">

        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-xs sm:text-sm uppercase tracking-widest break-words bg-accent/10 py-1.5 px-4 rounded-full shadow-neo-flat-sm border border-white/20">Open to Remote Opportunities</span>
            </div>
            <h1 className="flex flex-col text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] text-text tracking-tight">
              <span><TextReveal text="HARIS" /></span>
              <span className="text-gradient"><TextReveal text="RINDH." delay={0.2} /></span>
            </h1>

            <div className="h-8 md:h-10 text-xl md:text-3xl font-display font-semibold text-text-muted flex items-center overflow-hidden">
              <span className="mr-2 text-text">&gt;</span>
              <div className="inline-block min-w-[200px] sm:min-w-[280px] max-w-full">
                <Typewriter
                  options={{
                    strings: roles,
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-text-muted text-lg leading-relaxed font-medium"
          >
            Transforming complex problems into elegant, scalable web solutions. I build the digital future, one line of code at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-6"
          >
            <Magnetic>
              <a href="#projects" className="neo-btn px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-display font-medium text-text flex items-center space-x-2 hover:text-accent transition-colors group">
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a href="/resume.pdf" download="Haris_Rindh_CV.pdf" target="_blank" className="neo-convex px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-display font-medium text-text flex items-center space-x-2 hover:text-accent transition-colors group">
                <span>Download CV</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Magnetic>

            <div className="flex items-center space-x-4">
              <Magnetic strength={0.2}>
                <a href="https://github.com/Haris-Rindh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-text transition-colors">
                  <FaGithub size={20} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="https://www.linkedin.com/in/harisrindh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-accent transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="https://wa.me/923037368528" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-[#25D366] transition-colors">
                  <FaWhatsapp size={20} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="https://www.fiverr.com/haris_rindh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-accent transition-colors" title="Fiverr">
                  <FiverrIcon size={30} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Right Stats/Visual */}
        <div className="flex-1 flex items-center justify-center relative mt-16 md:mt-0 px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 60, delay: 0.6 }}
            className="relative w-full aspect-square max-w-[300px] sm:max-w-[360px] md:max-w-md"
          >
            <motion.div style={{ y: isMobile ? 0 : yOrb }} className="absolute inset-0 neo-flat rounded-full shadow-neo-elevated flex items-center justify-center p-3 sm:p-5 md:p-6 group">

              <div className="w-full h-full rounded-full border border-white/20 sm:border-2 sm:border-white/30 relative overflow-hidden shadow-neo-concave z-10">
                {/* Developer Photo */}
                <img
                  src={avatarImg}
                  alt="Haris Rindh"
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle light overlay — simulates Neumorphic glass */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none z-10" />
              </div>

              {/* Bottom label badge OUTSIDE the overflow-hidden container */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-neo-flat border border-white/40">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(49,130,206,0.5)]" />
                <span className="font-mono text-xs sm:text-sm font-bold text-text uppercase tracking-widest whitespace-nowrap">Stack Specialist</span>
              </div>

            </motion.div>

            {/* Floating Cards with Parallax */}
            <motion.div style={{ y: isMobile ? 0 : yCard1 }} className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 md:-top-16 md:-right-12 lg:top-[10%] lg:-right-4 glass p-3 sm:p-4 rounded-xl flex items-center space-x-2 sm:space-x-3 rotate-6 shadow-neo-flat border border-white/10 hidden sm:flex z-30">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-tighter text-text">Availability: Remote</span>
            </motion.div>

            <motion.div style={{ y: isMobile ? 0 : yCard2 }} className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 md:-bottom-16 md:-left-12 lg:bottom-[20%] lg:-left-8 glass p-3 sm:p-4 rounded-xl flex items-center space-x-2 sm:space-x-3 -rotate-12 shadow-neo-flat border border-white/10 hidden sm:flex z-30">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(49,130,206,0.5)]" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-tighter text-text">Focus: Scalability</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-text-muted/30 rounded-full flex justify-center pt-1 shadow-neo-flat-sm"
        >
          <div className="w-1 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

