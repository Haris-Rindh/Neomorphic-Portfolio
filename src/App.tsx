import React, { useState, useCallback } from 'react';
import { Preloader } from './components/Preloader';
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
import { FiverrIcon } from './components/FiverrIcon';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <LenisProvider>
        <div className="relative min-h-screen bg-bg text-text selection:bg-accent/30 overflow-x-hidden w-full">
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

            <footer className="px-6 md:px-12 py-12 border-t border-dark-shadow/10 bg-bg/50 backdrop-blur-sm">
              <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm">
                    © {new Date().getFullYear()} Haris Rindh — Crafting the Digital Frontier
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  <a
                    href="https://github.com/Haris-Rindh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-text transition-all flex items-center space-x-2"
                  >
                    <FaGithub size={14} />
                    <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">
                      Github
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harisrindh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-accent transition-all flex items-center space-x-2"
                  >
                    <FaLinkedin size={14} />
                    <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">
                      LinkedIn
                    </span>
                  </a>
                  <a
                    href="https://wa.me/923037368528"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-[#25D366] transition-all flex items-center space-x-2"
                  >
                    <FaWhatsapp size={14} />
                    <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">
                      WhatsApp
                    </span>
                  </a>
                  <a
                    href="https://www.fiverr.com/haris_rindh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-accent transition-all flex items-center space-x-2"
                  >
                    <FiverrIcon size={20} />
                    <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all overflow-hidden whitespace-nowrap">
                      Fiverr
                    </span>
                  </a>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </LenisProvider>
    </>
  );
}