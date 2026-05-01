import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, ExternalLink, Database, Code2 } from 'lucide-react';
import { TextReveal } from './TextReveal';

const certs = [
  {
    id: 1,
    title: 'Meta Front-End Developer',
    issuer: 'Coursera / Meta',
    date: 'Jun 15, 2025',
    icon: Code2,
    link: 'https://drive.google.com/file/d/1Oqu4ciVLb1ACwRzXONNh8rrFUoZv0x-F/view?usp=sharing', // Replace with real credential link
  },
  {
    id: 2,
    title: 'Full Stack Development',
    issuer: 'DevelopersHub Corporation',
    date: 'April 12th, 2026',
    icon: ShieldCheck,
    link: 'https://drive.google.com/file/d/1DTdO0tkcgCDKrPBeURFt0TkOqfpx_ahi/view?usp=sharing',
  },
  {
    id: 3,
    title: 'Introduction to Networks',
    issuer: 'Cisco',
    date: 'Jul 04, 2025',
    icon: Award,
    link: 'https://drive.google.com/file/d/19sEfmdwihUN9-SX3NTuW8XyhGRLLJ5Bc/view?usp=sharing',
  }
];

// Fixed pattern to prevent hydration mismatches and jumping
const barcodePattern = [1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 1, 1, 2, 2, 1, 1, 3];

export function Certifications() {
  return (
    <section id="certifications" className="py-20 lg:py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
      {/* Top Separator */}
      <div className="absolute top-0 left-0 right-0 border-t border-dark-shadow/10" />

      {/* Background Decor */}
      <div className="absolute top-[30%] left-[-10%] w-[30%] h-[30%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6">
          <div className="space-y-4">
            <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20">Accreditations</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-text uppercase pt-4">
              <TextReveal text="VERIFIED <br/> EXPERTISE" />
            </h2>
          </div>
          <p className="max-w-xs text-text-muted font-mono text-sm leading-relaxed text-left md:text-right">
            Continuous learning certified by industry leaders.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[400px] relative neo-flat rounded-[28px] p-6 pt-12 flex flex-col items-center text-center group hover:shadow-neo-elevated transition-shadow duration-500"
            >
              {/* Lanyard Hole Punch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full shadow-neo-concave bg-bg border border-dark-shadow/20" />
              
              {/* Hologram Badge */}
              <div className="w-20 h-20 rounded-full neo-convex flex items-center justify-center text-accent mb-6 relative overflow-hidden group-hover:shadow-[0_0_24px_rgba(49,130,206,0.2)] transition-shadow duration-500">
                {/* Sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <cert.icon size={28} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="flex flex-col items-center gap-1 mb-3">
                <span className="font-mono text-[11px] font-bold text-accent tracking-widest uppercase">{cert.issuer}</span>
                <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">{cert.date}</span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-text leading-tight mb-4 group-hover:text-accent transition-colors">
                {cert.title}
              </h3>
              
              <div className="mt-auto pt-6 w-full flex flex-col items-center border-t border-dark-shadow/20 border-dashed">
                {/* Barcode Pattern */}
                <div className="flex items-center justify-center gap-[2px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 mb-4 w-full">
                  {barcodePattern.map((w, i) => (
                    <div key={i} className="h-6 bg-text rounded-sm transition-all duration-300" style={{ width: `${w * 2}px` }} />
                  ))}
                </div>
                
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neo-btn px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
                >
                  Verify <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
