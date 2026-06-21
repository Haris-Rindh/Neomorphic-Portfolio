import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, Moon, Sun } from 'lucide-react';
import { Magnetic } from './Magnetic';

const navItems = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { rootMargin: '-40% 0px -40% 0px' });
    
    navItems.forEach(item => {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] w-[95%] max-w-5xl"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-neo-elevated">
        <div className="flex items-center space-x-2">
          <Terminal className="text-accent w-5 h-5" />
          <span className="font-display font-medium text-text tracking-widest text-sm uppercase">HARIS.DEV</span>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-mono uppercase tracking-widest transition-colors relative group ${activeSection === item.href.replace('#', '') ? 'text-text font-bold' : 'text-text-muted hover:text-text'}`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-accent transition-all ${activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2 md:space-x-3">
           <button 
              onClick={toggleDarkMode}
              className="neo-convex w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-text hover:text-accent transition-colors"
           >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
           </button>
           
           <div className="hidden lg:block">
              <button 
                 onClick={onOpenTerminal}
                 className="neo-btn px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-text hover:text-accent transition-colors"
              >
                 Startup CLI
              </button>
           </div>

           <Magnetic strength={0.2}>
             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="neo-btn w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center lg:hidden"
             >
               <Menu size={16} className="text-text" />
             </button>
           </Magnetic>
        </div>
      </div>
    </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center px-6"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-6 neo-btn w-12 h-12 rounded-full flex items-center justify-center"
            >
              <X size={24} className="text-text" />
            </button>
            <div className="flex flex-col space-y-8 items-center w-full">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium uppercase tracking-widest text-text hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-8 border-t border-dark-shadow/20 w-full flex flex-col space-y-4 items-center">
                 <button 
                    onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenTerminal();
                    }}
                    className="neo-btn px-8 py-3.5 rounded-full text-sm font-mono uppercase tracking-widest text-text hover:text-accent transition-colors"
                 >
                    Startup CLI
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
