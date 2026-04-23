import React, { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 5;

// Lerp factor for each trail point — head is fastest, tail is slowest
const LERP_FACTORS = [0.5, 0.35, 0.25, 0.18, 0.12];

export function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const trailRefs  = useRef<(HTMLDivElement | null)[]>([]);

  const rawPos   = useRef({ x: -100, y: -100 });
  const trailPos = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered]         = useState(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none) or (pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };

      // Move main cursor instantly — no spring lag
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hovered =
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        !!t.closest('button') ||
        t.getAttribute('role') === 'button' ||
        t.classList.contains('cursor-pointer');

      if (hovered !== isHoveredRef.current) {
        isHoveredRef.current = hovered;
        setIsHovered(hovered);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    // Animate trail via direct DOM manipulation — zero React re-renders
    let rafId: number;
    const animateTrail = () => {
      const pts = trailPos.current;
      const raw = rawPos.current;

      pts[0].x += (raw.x - pts[0].x) * LERP_FACTORS[0];
      pts[0].y += (raw.y - pts[0].y) * LERP_FACTORS[0];

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * LERP_FACTORS[i];
        pts[i].y += (pts[i - 1].y - pts[i].y) * LERP_FACTORS[i];
      }

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const el = trailRefs.current[i];
        if (el) {
          const size = Math.max(2, 10 - i * 1.5);
          el.style.transform = `translate(${pts[i].x - size / 2}px, ${pts[i].y - size / 2}px)`;
        }
      }

      rafId = requestAnimationFrame(animateTrail);
    };
    rafId = requestAnimationFrame(animateTrail);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail orbs — position driven by RAF, no React re-renders */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => {
        const size = Math.max(2, 10 - i * 1.5);
        const opacity = (1 - i / TRAIL_LENGTH) * 0.2;
        return (
          <div
            key={i}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              background: `rgba(49,130,206,${opacity})`,
              zIndex: 9996,
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Main dot — positioned directly in onMouseMove, no spring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-3.5 h-3.5 bg-accent rounded-full mix-blend-multiply transition-transform duration-150"
          style={{ transform: isHovered ? 'scale(3.5)' : 'scale(1)' }}
        />
      </div>

      {/* Outer ring — follows cursor with a slight lag via CSS transition */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform', transition: 'opacity 0.3s' }}
      >
        <div
          className="w-9 h-9 border border-accent/40 rounded-full transition-all duration-200"
          style={{
            transform:  isHovered ? 'scale(0.5)' : 'scale(1)',
            opacity:    isHovered ? 0 : 1,
          }}
        />
      </div>
    </>
  );
}
