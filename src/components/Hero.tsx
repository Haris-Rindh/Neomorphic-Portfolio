import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import { Magnetic } from './Magnetic';
import { TextReveal } from './TextReveal';
import avatarImg from '../assets/avatar.png';

// Custom Fiverr SVG Icon
const FiverrIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.040c-.057-.178-.114-.354-.179-.534h1.219v-.996h-1.537c-.359-.695-.83-1.309-1.389-1.828l.698-.7-.701-.703-.803.804A5.6 5.6 0 0 0 16.36 8v-1.14h-.997V8A5.63 5.63 0 0 0 10.734 13.5H9.56v.996h1.174c.084.367.213.73.365 1.07H9.56v.997h1.943A5.624 5.624 0 0 0 16.36 19.2v1.14h.997V19.2a5.62 5.62 0 0 0 4.046-2.637h1.605v-.997h-.997zM16.36 18.2a4.58 4.58 0 0 1 0-9.16 4.58 4.58 0 0 1 0 9.16zm0-7.16a2.58 2.58 0 1 0 0 5.16 2.58 2.58 0 0 0 0-5.16zm0 4.16a1.58 1.58 0 1 1 0-3.16 1.58 1.58 0 0 1 0 3.16zM.996 10.4H0v.996h.996v-.996zm0 2.692H0v.997h.996v-.997zm2.034-5.383H2.033v.997h.997v-.997zm0 2.691H2.033v.997h.997v-.997zm0 2.692H2.033v.997h.997v-.997zM5.062 7.016H4.065v.997h.997v-.997zm0 2.692H4.065v.997h.997v-.997zm0 2.691H4.065v.997h.997v-.997zm0 2.692H4.065v.997h.997v-.997zM7.097 5.325H6.1v.997h.997v-.997zm0 2.691H6.1v.997h.997v-.997zm0 2.692H6.1v.997h.997v-.997zm0 2.691H6.1v.997h.997v-.997zm0 2.692H6.1v.997h.997v-.997z" />
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

  const yOrb = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex flex-col md:flex-row items-stretch justify-between pt-24 px-6 md:px-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

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
            <span className="text-accent font-mono text-sm uppercase tracking-widest">Open to Remote Opportunities</span>
          </div>
          <h1 className="flex flex-col text-6xl md:text-8xl font-display font-medium leading-[0.9] text-gray-900 tracking-tight">
            <span><TextReveal text="HARIS" /></span>
            <span className="text-gradient"><TextReveal text="RINDH." delay={0.2} /></span>
          </h1>

          <div className="h-8 md:h-10 text-xl md:text-3xl font-display font-semibold text-gray-700 flex items-center overflow-hidden">
            <span className="mr-2 text-gray-900">&gt;</span>
            <div className="inline-block">
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
          className="max-w-md text-gray-700 text-lg leading-relaxed font-medium"
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
            <a href="#projects" className="neo-btn px-8 py-4 rounded-full font-display font-medium text-text flex items-center space-x-2 hover:text-accent transition-colors group">
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Magnetic>

          <div className="flex items-center space-x-4">
            <Magnetic strength={0.2}>
              <a href="https://github.com/Haris-Rindh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-gray-800 hover:text-accent transition-colors">
                <FaGithub size={20} />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://www.linkedin.com/in/harisrindh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-gray-800 hover:text-accent transition-colors">
                <FaLinkedin size={20} />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://wa.me/923037368528" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-gray-800 hover:text-accent transition-colors">
                <FaWhatsapp size={20} />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="https://www.fiverr.com/haris_rindh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 neo-convex flex items-center justify-center rounded-full text-gray-800 hover:text-accent transition-colors" title="Fiverr">
                <FiverrIcon size={20} />
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Right Stats/Visual */}
      <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-full aspect-square max-w-md"
        >
          <motion.div style={{ y: yOrb }} className="absolute inset-0 neo-flat rounded-full shadow-neo-elevated flex items-center justify-center p-6">
            <div className="w-full h-full rounded-full border-2 border-white/30 relative overflow-hidden group shadow-neo-concave">
              {/* Developer Photo */}
              <img
                src={avatarImg}
                alt="Haris Rindh"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle light overlay — simulates Neumorphic glass */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none z-10" />
              {/* Bottom label badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-neo-flat-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-text uppercase tracking-widest whitespace-nowrap">Stack Specialist</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Cards with Parallax */}
          <motion.div style={{ y: yCard1 }} className="absolute top-[10%] -right-4 glass p-4 rounded-xl flex items-center space-x-3 rotate-6 shadow-neo-flat">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-xs font-mono uppercase tracking-tighter text-text">Availability: Remote</span>
          </motion.div>

          <motion.div style={{ y: yCard2 }} className="absolute bottom-[20%] -left-8 glass p-4 rounded-xl flex items-center space-x-3 -rotate-12 shadow-neo-flat">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(49,130,206,0.5)]" />
            <span className="text-xs font-mono uppercase tracking-tighter text-text">Focus: Scalability</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
