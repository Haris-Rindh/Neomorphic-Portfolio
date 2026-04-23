import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      // Reduced from 1.2 → 0.8 for snappier feel with less perceived lag
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Slightly higher multiplier so small wheel movements feel responsive
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      // Prevent Lenis from hijacking Framer Motion scroll events
      eventsTarget: document.documentElement,
    });

    // Use cancelAnimationFrame loop instead of raw RAF to allow cleanup
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
