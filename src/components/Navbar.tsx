import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Menu } from 'lucide-react';
import { Magnetic } from './Magnetic';

const navItems = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Process',    href: '#process' },
  { label: 'Contact',    href: '#contact' },
];

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-neo-elevated">
        <div className="flex items-center space-x-2">
          <Terminal className="text-accent w-5 h-5" />
          <span className="font-display font-medium text-text tracking-widest text-sm uppercase">HARIS.DEV</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <Magnetic strength={0.2}>
          <button className="neo-btn w-10 h-10 rounded-full flex items-center justify-center md:hidden">
            <Menu size={18} className="text-text" />
          </button>
        </Magnetic>

        <div className="hidden md:block">
           <button 
              onClick={onOpenTerminal}
              className="neo-btn px-6 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-text hover:text-accent transition-colors"
           >
              Startup CLI
           </button>
        </div>
      </div>
    </motion.nav>
  );
}
