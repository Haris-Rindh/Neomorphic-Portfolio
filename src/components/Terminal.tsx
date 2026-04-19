import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<{ id: string; text: string; isCommand: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "Initializing Nexus AI Core...",
    "Loading 3D Assets...",
    "Mounting Neumorphic UI Components...",
    "System booted successfully.",
    "Type 'help' to see available commands."
  ];

  useEffect(() => {
    if (isOpen && isBooting && history.length === 0) {
      let delay = 0;
      const initialHistory: { id: string; text: string; isCommand: boolean }[] = [];
      
      bootSequence.forEach((line, index) => {
        delay += 600 + Math.random() * 400; // Simulated latency
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

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBooting || !input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { id: Math.random().toString(), text: `$ ${input}`, isCommand: true }];

    switch (cmd) {
      case 'help':
        newHistory.push({
           id: Math.random().toString(),
           text: "Available commands:\n- help: Lists all available commands.\n- about: Displays professional bio.\n- projects: Shows a list of key projects.\n- nexus: Scrolls to the Nexus AI project section.\n- clear: Clears the terminal history.",
           isCommand: false
        });
        break;
      case 'about':
        newHistory.push({
           id: Math.random().toString(),
           text: "Haris Rindh, MERN Specialist.\nTransforming complex problems into elegant, scalable web solutions.",
           isCommand: false
        });
        break;
      case 'projects':
        newHistory.push({
           id: Math.random().toString(),
           text: "Key Projects:\n1. Nexus AI - Enterprise SaaS Platform\n2. ShopEase - E-commerce platform\n3. Book Sphere - Cloud Database Integration",
           isCommand: false
        });
        break;
      case 'nexus':
        newHistory.push({
           id: Math.random().toString(),
           text: "Navigating to Nexus AI project...",
           isCommand: false
        });
        setTimeout(() => {
           const projectsSection = document.getElementById('work');
           if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
              onClose();
           }
        }, 800);
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({
           id: Math.random().toString(),
           text: `Command not found: ${cmd}. Type 'help' for available commands.`,
           isCommand: false
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 20 }}
           transition={{ duration: 0.3 }}
           className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none"
        >
           {/* Terminal Window */}
           <div className="w-full max-w-3xl rounded-xl overflow-hidden pointer-events-auto border border-white/20 shadow-neo-elevated backdrop-blur-xl bg-white/40 flex flex-col h-[60vh] max-h-[600px]">
              
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/20 border-b border-white/20 backdrop-blur-md">
                 <div className="flex space-x-2">
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                    <button className="w-3 h-3 rounded-full bg-yellow-400" />
                    <button className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="font-mono text-xs text-text/70 uppercase tracking-widest font-semibold flex-1 text-center">
                    Startup CLI - Haris.dev
                 </div>
                 <div className="w-12" /> {/* Spacer for centering */}
              </div>

              {/* Content area */}
              <div className="flex-1 p-6 overflow-y-auto font-mono text-sm text-text bg-transparent custom-scrollbar flex flex-col space-y-2">
                 {history.map((item) => (
                    <div key={item.id} className={item.isCommand ? "text-accent font-semibold" : "text-text/80 whitespace-pre-wrap"}>
                       {item.text}
                    </div>
                 ))}
                 
                 {!isBooting && (
                    <form onSubmit={handleCommand} className="flex items-center mt-2">
                       <span className="text-accent font-semibold mr-2">$</span>
                       <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="flex-1 bg-transparent outline-none border-none text-text focus:ring-0 p-0 m-0 caret-accent"
                          autoFocus
                          autoComplete="off"
                          spellCheck="false"
                       />
                    </form>
                 )}
                 <div ref={bottomRef} />
              </div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
