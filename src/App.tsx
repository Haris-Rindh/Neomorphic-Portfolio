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
import { Terminal } from './components/Terminal';
import { ScrollProgress } from './components/ScrollProgress';
import { motion } from 'motion/react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MessageCircle } from 'lucide-react';

// Custom Fiverr SVG Icon (Fiverr doesn't exist in react-icons/fa)
const FiverrIcon = ({ size = 16 }: { size?: number }) => (
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

          {/* CTA / Footer Lite */}
          <footer id="contact" className="px-6 md:px-12 py-32 border-t border-dark-shadow/20 mt-24">
             <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                   <h4 className="text-3xl font-display text-text mb-2 tracking-tighter">Ready to build the future?</h4>
                   <p className="text-text-muted font-mono text-sm max-w-md">Reach out to discuss your next big idea or team integration.</p>
                </div>
                
                <a href="mailto:haris.rindh.pk@gmail.com" className="neo-btn px-12 py-6 rounded-full font-display text-xl text-text hover:text-accent flex items-center space-x-3 transition-colors">
                   <MessageCircle className="w-6 h-6" />
                   <span>haris.rindh.pk@gmail.com</span>
                </a>
             </div>
             
             <div className="w-full max-w-7xl mx-auto mt-24 pt-8 border-t border-dark-shadow/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-text-muted">
                <span>© {new Date().getFullYear()} Haris Rindh</span>
                <div className="flex gap-8">
                   <a href="https://github.com/Haris-Rindh" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center space-x-2"><FaGithub size={16} /> <span>Github</span></a>
                   <a href="https://www.linkedin.com/in/harisrindh" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center space-x-2"><FaLinkedin size={16} /> <span>LinkedIn</span></a>
                   <a href="https://wa.me/923037368528" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center space-x-2"><FaWhatsapp size={16} /> <span>WhatsApp</span></a>
                   <a href="https://www.fiverr.com/haris_rindh" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center space-x-2"><FiverrIcon size={16} /> <span>Fiverr</span></a>
                </div>
             </div>
          </footer>
        </main>
      </div>
    </LenisProvider>
  );
}
