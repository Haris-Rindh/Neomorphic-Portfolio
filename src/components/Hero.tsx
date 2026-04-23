import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, ChevronDown, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { Magnetic } from './Magnetic';
import { TextReveal } from './TextReveal';
import { FiverrIcon } from './FiverrIcon';
import avatarImg from '../assets/avatar.png';

const roles = [
  'Full Stack Developer',
  'MERN Stack Specialist',
  'UI/UX Enthusiast',
  'Problem Solver',
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  // Parallax springs for floating elements — NOT on the scroll progress itself
  // Low mass + high stiffness = snappy, not laggy
  const springCfg = { damping: 40, stiffness: 200, mass: 0.3 };
  const smoothProgress = useSpring(scrollYProgress, springCfg);

  const yOrb   = useTransform(smoothProgress, [0, 1], [0, 200]);
  const yCard1 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const yCard2 = useTransform(smoothProgress, [0, 1], [0, 150]);
  // Use raw scroll for opacity — spring on opacity causes the hero to linger too long
  const heroOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100svh] pt-24 px-6 md:px-12 flex items-center will-change-transform z-10 overflow-hidden"
    >
      {/* Background Decor — contained inside overflow-hidden, no translate needed */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="flex w-full max-w-7xl mx-auto flex-col lg:flex-row items-stretch justify-between relative z-10 gap-12 lg:gap-8"
      >
        {/* ── Left Content ── */}
        <div className="flex-1 flex flex-col justify-center space-y-10 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            {/* Badge */}
            <div className="flex items-center space-x-2">
              <span className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-xs sm:text-sm uppercase tracking-widest">
                Open to Remote Opportunities
              </span>
            </div>

            {/* H1 */}
            <h1 className="flex flex-col text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] text-text tracking-tight">
              <span><TextReveal text="HARIS" /></span>
              <span className="text-gradient"><TextReveal text="RINDH." delay={0.2} /></span>
            </h1>

            {/* Typewriter */}
            <div className="h-8 md:h-10 text-xl md:text-3xl font-display font-semibold text-text flex items-center overflow-hidden">
              <span className="mr-2 text-text">&gt;</span>
              <div className="inline-block min-w-0 w-full max-w-[320px]">
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg text-text-muted text-lg leading-relaxed font-medium"
          >
            Transforming complex problems into elegant, scalable web solutions. I build the digital
            future, one line of code at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6"
          >
            {/* Primary CTA */}
            <Magnetic>
              <a
                href="#projects"
                className="neo-btn px-8 py-4 rounded-full font-display font-medium text-text flex items-center space-x-2 hover:text-accent transition-colors group"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Magnetic>

            {/* Download CV */}
            <Magnetic>
              <a
                href="/Haris-Rindh-CV.pdf"
                download
                className="neo-btn px-8 py-4 rounded-full font-display font-medium text-text flex items-center space-x-2 hover:text-accent transition-colors group border border-accent/20"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                <span>Download CV</span>
              </a>
            </Magnetic>

            {/* Social icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Magnetic strength={0.2}>
                <a
                  href="https://github.com/Haris-Rindh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-text transition-colors"
                  title="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="https://www.linkedin.com/in/harisrindh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-accent transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="https://wa.me/923037368528"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-[#25D366] transition-colors"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="https://www.fiverr.com/haris_rindh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-text-muted hover:text-accent transition-colors"
                  title="Fiverr"
                >
                  <FiverrIcon size={28} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Avatar ── */}
        <div className="flex-1 flex items-center justify-center relative mt-6 md:mt-0 px-4 md:px-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 60, delay: 0.6 }}
            className="relative w-full aspect-square max-w-[240px] sm:max-w-[300px] md:max-w-md"
          >
            <motion.div
              style={{ y: isMobile ? 0 : yOrb }}
              className="absolute inset-0 neo-flat rounded-full shadow-neo-elevated flex items-center justify-center p-3 sm:p-5 md:p-6 group"
            >
              <div className="w-full h-full rounded-full border border-white/20 sm:border-2 sm:border-white/30 relative overflow-hidden shadow-neo-concave z-10">
                <img
                  src={avatarImg}
                  alt="Haris Rindh — Full Stack Developer"
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none z-10" />
              </div>

              {/* Bottom label badge */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-neo-flat border border-white/40">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(49,130,206,0.5)]" />
                <span className="font-mono text-[9px] sm:text-[11px] font-bold text-text uppercase tracking-widest whitespace-nowrap">
                  Stack Specialist
                </span>
              </div>
            </motion.div>

            {/* Floating Card 1 — hidden on mobile to prevent overflow */}
            <motion.div
              style={{ y: isMobile ? 0 : yCard1 }}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 md:-top-14 md:-right-10 glass p-3 sm:p-4 rounded-xl items-center space-x-2 sm:space-x-3 rotate-6 shadow-neo-flat border border-white/10 hidden sm:flex z-30"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(49,130,206,0.5)]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-tighter text-text">
                Availability: Remote
              </span>
            </motion.div>

            {/* Floating Card 2 — hidden on mobile to prevent overflow */}
            <motion.div
              style={{ y: isMobile ? 0 : yCard2 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 md:-bottom-14 md:-left-10 glass p-3 sm:p-4 rounded-xl items-center space-x-2 sm:space-x-3 -rotate-12 shadow-neo-flat border border-white/10 hidden sm:flex z-30"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(49,130,206,0.5)]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-tighter text-text">
                Focus: Scalability
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
