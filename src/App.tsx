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


const FiverrIcon = ({ size = 14 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 508.02 508.02" 
    width={size} 
    height={size}
    fill="currentColor"
  >
    <circle cx="315.97" cy="162.19" r="26.87"/>
    <path d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" transform="translate(-1.83 -0.98)"/>
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

          <footer className="px-6 md:px-12 py-12 border-t border-dark-shadow/10 mt-12 bg-bg/50 backdrop-blur-sm">
             <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
                   <span className='text-sm'>© {new Date().getFullYear()} Haris Rindh — Crafting the Digital Frontier</span>
                </div>
                
                <div className="flex items-center gap-8">
                   <a href="https://github.com/Haris-Rindh" target="_blank" rel="noopener noreferrer" className="group hover:text-gray-900 transition-all flex items-center space-x-2">
                      <FaGithub size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">Github</span>
                   </a>
                   <a href="https://www.linkedin.com/in/harisrindh" target="_blank" rel="noopener noreferrer" className="group hover:text-accent transition-all flex items-center space-x-2">
                      <FaLinkedin size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">LinkedIn</span>
                   </a>
                   <a href="https://wa.me/923037368528" target="_blank" rel="noopener noreferrer" className="group hover:text-green-700 transition-all flex items-center space-x-2">
                      <FaWhatsapp size={14} /> 
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">WhatsApp</span>
                   </a>
                   <a href="https://www.fiverr.com/haris_rindh" target="_blank" rel="noopener noreferrer" className="group hover:text-green-500 transition-all flex items-center space-x-2">
                      <FiverrIcon size={20} /> 
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