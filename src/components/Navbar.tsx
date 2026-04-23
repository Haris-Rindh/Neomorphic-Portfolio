import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';

const navItems = [
  { label: 'Home',       href: '#home',       id: 'home' },
  { label: 'About',      href: '#about',      id: 'about' },
  { label: 'Skills',     href: '#skills',     id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects',   href: '#projects',   id: 'projects' },
  { label: 'Process',    href: '#process',    id: 'process' },
  { label: 'Contact',    href: '#contact',    id: 'contact' },
];

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[95%] max-w-5xl"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-neo-elevated">
          <div className="flex items-center space-x-2">
            <Terminal className="text-accent w-5 h-5" />
            <span className="font-display font-medium text-text tracking-widest text-sm uppercase">HARIS.DEV</span>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-mono uppercase tracking-widest relative group transition-colors duration-200"
                  style={{ color: isActive ? 'rgb(49,130,206)' : undefined }}
                >
                  <span className={isActive ? 'text-accent' : 'text-text-muted hover:text-text'}>
                    {item.label}
                  </span>
                  {/* Active underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] bg-accent rounded-full transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                  {/* Hover underline for inactive */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent/50 transition-all group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </div>

          <Magnetic strength={0.2}>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="neo-btn w-10 h-10 rounded-full flex items-center justify-center lg:hidden"
            >
              <Menu size={18} className="text-text" />
            </button>
          </Magnetic>

          <div className="hidden lg:block">
            <button
              onClick={onOpenTerminal}
              className="neo-btn px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-text hover:text-accent transition-colors"
            >
              Startup CLI
            </button>
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
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-display font-medium uppercase tracking-widest transition-colors ${
                      isActive ? 'text-accent' : 'text-text hover:text-accent'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-8 border-t border-dark-shadow/20 w-full flex justify-center">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="neo-btn px-8 py-4 rounded-full text-sm font-mono uppercase tracking-widest text-text hover:text-accent transition-colors"
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
