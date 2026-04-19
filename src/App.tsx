import React, { useState } from 'react';
import { LenisProvider } from './components/LenisProvider';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Process } from './components/Process';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Terminal } from './components/Terminal';
import { ScrollProgress } from './components/ScrollProgress';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

// Custom Fiverr SVG Icon
const FiverrIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.040c-.057-.178-.114-.354-.179-.534h1.219v-.996h-1.537c-.359-.695-.83-1.309-1.389-1.828l.698-.7-.701-.703-.803.804A5.6 5.6 0 0 0 16.36 8v-1.14h-.997V8A5.63 5.63 0 0 0 10.734 13.5H9.56v.996h1.174c.084.367.213.73.365 1.07H9.56v.997h1.943A5.624 5.624 0 0 0 16.36 19.2v1.14h.997V19.2a5.62 5.62 0 0 0 4.046-2.637h1.605v-.997h-.997zM16.36 18.2a4.58 4.58 0 0 1 0-9.16 4.58 4.58 0 0 1 0 9.16zm0-7.16a2.58 2.58 0 1 0 0 5.16 2.58 2.58 0 0 0 0-5.16zm0 4.16a1.58 1.58 0 1 1 0-3.16 1.58 1.58 0 0 1 0 3.16z"/>
  </svg>
);

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-bg text-text selection:bg-accent/30">
        <ScrollProgress />
        <CustomCursor />
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        
        <main>
          <Hero />
          
          <About />

          <Skills />

          <Experience />

          <Projects />

          <Process />

          <Contact />

          {/* Minimal Footer */}
          <footer className="px-6 md:px-12 py-12 border-t border-dark-shadow/10 mt-12 bg-bg/50 backdrop-blur-sm">
             <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                   <span>© {new Date().getFullYear()} Haris Rindh — Crafting the Digital Frontier</span>
                </div>
                
                <div className="flex items-center gap-8">
                   <a href="https://github.com/Haris-Rindh" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all flex items-center space-x-2">
                      <FaGithub size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">Github</span>
                   </a>
                   <a href="https://www.linkedin.com/in/harisrindh" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all flex items-center space-x-2">
                      <FaLinkedin size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">LinkedIn</span>
                   </a>
                   <a href="https://wa.me/923037368528" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all flex items-center space-x-2">
                      <FaWhatsapp size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">WhatsApp</span>
                   </a>
                   <a href="https://www.fiverr.com/haris_rindh" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all flex items-center space-x-2">
                      <FiverrIcon size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">Fiverr</span>
                   </a>
                </div>
             </div>
          </footer>
        </main>
      </div>
    </LenisProvider>
  );
}
