import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<{ id: string; text: string; isCommand: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootSequence = [
    "Initializing Nexus AI Core...",
    "Loading 3D Assets...",
    "Mounting Neumorphic UI Components...",
    "System booted successfully.",
    "Type 'help' to see available commands."
  ];

  // Reset and re-boot every time the terminal opens
  useEffect(() => {
    if (isOpen) {
      setHistory([]);
      setIsBooting(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isBooting && history.length === 0) {
      let delay = 0;
      const initialHistory: { id: string; text: string; isCommand: boolean }[] = [];

      bootSequence.forEach((line, index) => {
        delay += 550 + Math.random() * 350;
        setTimeout(() => {
          initialHistory.push({ id: `boot-${index}`, text: line, isCommand: false });
          setHistory([...initialHistory]);
          if (index === bootSequence.length - 1) {
            setIsBooting(false);
          }
        }, delay);
      });
    }
  }, [isOpen, isBooting, history.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input after boot
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBooting || !input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [
      ...history,
      { id: Math.random().toString(), text: `$ ${input}`, isCommand: true },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: Math.random().toString(),
          text:
            'Available commands:\n' +
            '  help      → Lists all available commands.\n' +
            '  about     → Displays professional bio.\n' +
            '  projects  → Shows a list of key projects.\n' +
            '  nexus     → Navigates to the Nexus AI project.\n' +
            '  clear     → Clears the terminal history.\n' +
            '  exit      → Closes the terminal.\n\n' +
            'Tip: Press [Esc] or click × to close anytime.',
          isCommand: false,
        });
        break;

      case 'about':
        newHistory.push({
          id: Math.random().toString(),
          text:
            'Haris Rindh — MERN Stack Specialist\n' +
            'Transforming complex problems into elegant, scalable web solutions.\n' +
            'Open to remote opportunities worldwide.',
          isCommand: false,
        });
        break;

      case 'projects':
        newHistory.push({
          id: Math.random().toString(),
          text:
            'Key Projects:\n' +
            '  1. Nexus AI       — Enterprise SaaS Platform\n' +
            '  2. Book Sphere    — Full-Stack Library App\n' +
            '  3. Prime Real Estate — Property Platform\n' +
            '  4. Digital Agency — Portfolio Template\n' +
            '  5. Urban Restaurant — Hospitality Site\n\n' +
            "Type 'nexus' to navigate directly to the featured project.",
          isCommand: false,
        });
        break;

      case 'nexus':
        newHistory.push({
          id: Math.random().toString(),
          text: 'Navigating to Nexus AI project...',
          isCommand: false,
        });
        setTimeout(() => {
          const section = document.getElementById('projects');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
          onClose();
        }, 700);
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
      case 'close':
        newHistory.push({
          id: Math.random().toString(),
          text: 'Closing terminal. Goodbye!',
          isCommand: false,
        });
        setHistory(newHistory);
        setInput('');
        // Small delay so the user sees the message
        setTimeout(() => onClose(), 600);
        return;

      default:
        newHistory.push({
          id: Math.random().toString(),
          text: `Command not found: '${cmd}'\nType 'help' for a list of available commands.`,
          isCommand: false,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none"
          >
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden pointer-events-auto border border-white/30 shadow-neo-elevated backdrop-blur-xl bg-white/40 flex flex-col h-[65vh] max-h-[620px]">

              {/* ── Title bar ── */}
              <div className="flex items-center px-4 py-3 bg-white/25 border-b border-white/20 shrink-0">
                {/* macOS-style traffic-light dots */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onClose}
                    title="Close (exit)"
                    className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors flex items-center justify-center group"
                  >
                    <X className="w-1.5 h-1.5 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* Title */}
                <span className="font-mono text-xs text-text/60 uppercase tracking-widest font-semibold flex-1 text-center">
                  Startup CLI — Haris.dev
                </span>

                {/* Explicit close button */}
                <button
                  onClick={onClose}
                  title="Close terminal  (Esc)"
                  className="w-7 h-7 neo-btn rounded-full flex items-center justify-center text-text/60 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ── Close hint strip ── */}
              <div className="flex items-center gap-3 px-5 py-1.5 bg-accent/5 border-b border-white/10 shrink-0">
                <span className="font-mono text-[10px] text-text/40 uppercase tracking-widest">
                  Type <span className="text-accent font-semibold">exit</span> or press{' '}
                  <span className="text-accent font-semibold">Esc</span> to close
                </span>
              </div>

              {/* ── Output history ── */}
              <div className="flex-1 px-5 py-4 overflow-y-auto font-mono text-sm text-text flex flex-col space-y-1.5">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={
                      item.isCommand
                        ? 'text-accent font-semibold'
                        : 'text-text/75 whitespace-pre-wrap leading-relaxed'
                    }
                  >
                    {item.text}
                  </div>
                ))}

                {!isBooting && (
                  <form onSubmit={handleCommand} className="flex items-center mt-1">
                    <span className="text-accent font-bold mr-2 select-none">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none border-none text-text focus:ring-0 p-0 m-0 caret-accent font-mono"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="enter command…"
                    />
                  </form>
                )}

                <div ref={bottomRef} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
