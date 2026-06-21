import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Colour palettes
───────────────────────────────────────────── */
const HARIS_COLORS = [
  '#2d7dd2', '#1a5fa8', '#5ba3e8',
  '#3d8fe0', '#1e4d8c', '#4a90d9',
];

const RINDH_COLORS = [
  '#b91c1c', '#dc2626', '#ef4444',
  '#f87171', '#9b2335', '#c2185b',
  '#ad1457', '#e91e63', '#a02848',
];

/* ─────────────────────────────────────────────
   Canvas dimensions
───────────────────────────────────────────── */
const W = 520;
const H = 180;

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleText(word: string): { x: number; y: number }[] {
  const off = document.createElement('canvas');
  off.width  = W;
  off.height = H;
  const oc = off.getContext('2d')!;
  oc.clearRect(0, 0, W, H);
  oc.fillStyle = '#000';
  oc.font = '900 110px Arial Black, Arial, sans-serif';
  oc.textAlign     = 'center';
  oc.textBaseline  = 'middle';
  oc.fillText(word, W / 2, H / 2);
  const d   = oc.getImageData(0, 0, W, H).data;
  const pts: { x: number; y: number }[] = [];
  const gap = 5;
  for (let y = 0; y < H; y += gap)
    for (let x = 0; x < W; x += gap)
      if (d[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
  return pts;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ─────────────────────────────────────────────
   Phase config
───────────────────────────────────────────── */
type Phase =
  | 'assemble_haris'
  | 'hold_haris'
  | 'burst'
  | 'scatter'
  | 'assemble_rindh'
  | 'done';

interface PhaseCfg {
  dur:      number;
  next:     Phase;
  progFrom: number;
  progTo:   number;
  label:    string;
  status:   string;
}

const PHASES: Record<Phase, PhaseCfg> = {
  assemble_haris: { dur: 50, next: 'hold_haris',    progFrom:  0, progTo:  40, label: 'haris',      status: 'placing particles'  },
  hold_haris:     { dur: 25, next: 'burst',         progFrom: 40, progTo:  42, label: 'haris',      status: 'formation locked'   },
  burst:          { dur: 35, next: 'scatter',       progFrom: 42, progTo:  62, label: 'exploding',  status: 'burst!'             },
  scatter:        { dur: 20, next: 'assemble_rindh',progFrom: 62, progTo:  68, label: 'in transit', status: 'reforming'          },
  assemble_rindh: { dur: 60, next: 'done',          progFrom: 68, progTo: 100, label: 'rindh',      status: 'placing particles'  },
  done:           { dur: Infinity, next: 'done',      progFrom: 100, progTo: 100, label: 'rindh',     status: 'ready'              },
};

/* ─────────────────────────────────────────────
   Particle class
───────────────────────────────────────────── */
class Particle {
  hx: number; hy: number;
  rx: number; ry: number;
  hc: string; rc: string;
  x: number; y: number;
  vx: number; vy: number;
  sz: number;
  color: string;

  constructor(
    hx: number, hy: number,
    rx: number, ry: number,
    hc: string, rc: string,
  ) {
    this.hx = hx; this.hy = hy;
    this.rx = rx; this.ry = ry;
    this.hc = hc; this.rc = rc;
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = 0; this.vy = 0;
    this.sz = Math.random() * 1.8 + 1.2;
    this.color = hc;
  }

  spring(tx: number, ty: number, stiff = 0.11, damp = 0.74) {
    const dx = tx - this.x, dy = ty - this.y;
    this.vx = (this.vx + dx * stiff) * damp;
    this.vy = (this.vy + dy * stiff) * damp;
    this.x += this.vx;
    this.y += this.vy;
  }

  burst() {
    this.vy  += 0.28;
    this.vx  *= 0.94;
    this.vy  *= 0.94;
    this.x   += this.vx;
    this.y   += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    /* Solid filled dot with a small specular highlight — matches the original design */
    ctx.save();
    ctx.translate(this.x, this.y);

    const grd = ctx.createRadialGradient(
      -this.sz * 0.25, -this.sz * 0.25, this.sz * 0.05,
      0, 0, this.sz,
    );
    grd.addColorStop(0, lightenHex(this.color, 0.35));
    grd.addColorStop(0.6, this.color);
    grd.addColorStop(1, darkenHex(this.color, 0.25));

    ctx.beginPath();
    ctx.arc(0, 0, this.sz, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    /* Specular glint */
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(-this.sz * 0.3, -this.sz * 0.3, this.sz * 0.28, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.restore();
  }
}

/* ─────────────────────────────────────────────
   Colour utilities (kept from original)
───────────────────────────────────────────── */
function lightenHex(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r + (255 - r) * amount)},${Math.round(g + (255 - g) * amount)},${Math.round(b + (255 - b) * amount)})`;
}

function darkenHex(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - amount))},${Math.round(g * (1 - amount))},${Math.round(b * (1 - amount))})`;
}

/* ─────────────────────────────────────────────
   ParticleCanvas
───────────────────────────────────────────── */
interface ParticleCanvasProps {
  onProgressChange: (p: number) => void;
  onStatusChange:   (s: string, label: string, dotActive: boolean) => void;
  onDone:           () => void;
}

function ParticleCanvas({ onProgressChange, onStatusChange, onDone }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<{
    parts:   Particle[];
    phase:   Phase;
    frame:   number;
    animId:  number;
  }>({ parts: [], phase: 'assemble_haris', frame: 0, animId: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const s   = stateRef.current;

    /* Build particles */
    const hPts = shuffle(sampleText('HARIS'));
    const rPts = shuffle(sampleText('RINDH'));
    const N    = Math.min(hPts.length, rPts.length);
    s.parts = Array.from({ length: N }, (_, i) =>
      new Particle(
        hPts[i].x, hPts[i].y,
        rPts[i].x, rPts[i].y,
        pick(HARIS_COLORS),
        pick(RINDH_COLORS),
      ),
    );
    s.phase = 'assemble_haris';
    s.frame = 0;

    onStatusChange(PHASES.assemble_haris.status, PHASES.assemble_haris.label, false);
    onProgressChange(0);

    const BG = '#caced4'; /* matches the inner panel's inset background */

    const loop = () => {
      /* Fill background to match the inner panel */
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      const cfg = PHASES[s.phase];
      s.frame++;

      /* Progress interpolation */
      const t = s.phase === 'done' ? 1 : Math.min(1, s.frame / cfg.dur);
      onProgressChange(Math.round(cfg.progFrom + (cfg.progTo - cfg.progFrom) * t));

      /* ── Phase logic ───────────────────────────────────── */
      if (s.phase === 'assemble_haris') {
        s.parts.forEach(p => { p.color = p.hc; p.spring(p.hx, p.hy); p.draw(ctx); });
        if (s.frame >= cfg.dur) {
          s.phase = 'hold_haris'; s.frame = 0;
          onStatusChange(PHASES.hold_haris.status, PHASES.hold_haris.label, false);
        }

      } else if (s.phase === 'hold_haris') {
        s.parts.forEach(p => { p.spring(p.hx, p.hy); p.draw(ctx); });
        if (s.frame >= cfg.dur) {
          s.phase = 'burst'; s.frame = 0;
          onStatusChange(PHASES.burst.status, PHASES.burst.label, false);
          /* Give every particle a random velocity */
          s.parts.forEach(p => {
            const a   = Math.random() * Math.PI * 2;
            const spd = Math.random() * 18 + 10;
            p.vx = Math.cos(a) * spd;
            p.vy = Math.sin(a) * spd - Math.random() * 9;
          });
        }

      } else if (s.phase === 'burst') {
        s.parts.forEach(p => { p.burst(); p.draw(ctx); });
        if (s.frame >= cfg.dur) {
          s.phase = 'scatter'; s.frame = 0;
          onStatusChange(PHASES.scatter.status, PHASES.scatter.label, false);
        }

      } else if (s.phase === 'scatter') {
        const frac = s.frame / cfg.dur;
        s.parts.forEach(p => {
          p.color = frac > 0.5 ? p.rc : p.hc;
          p.burst();
          p.draw(ctx);
        });
        if (s.frame >= cfg.dur) {
          s.phase = 'assemble_rindh'; s.frame = 0;
          onStatusChange(PHASES.assemble_rindh.status, PHASES.assemble_rindh.label, false);
        }

      } else if (s.phase === 'assemble_rindh') {
        s.parts.forEach(p => { p.color = p.rc; p.spring(p.rx, p.ry, 0.15, 0.70); p.draw(ctx); });
        if (s.frame >= cfg.dur) {
          s.phase = 'done'; s.frame = 0;
          onProgressChange(100);
          onStatusChange('ready', 'rindh', true);
          onDone();
          /* Keep the final frame alive and settle */
          const settle = () => {
            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, W, H);
            s.parts.forEach(p => { p.spring(p.rx, p.ry, 0.08, 0.80); p.draw(ctx); });
            s.animId = requestAnimationFrame(settle);
          };
          s.animId = requestAnimationFrame(settle);
          return;
        }
      }

      s.animId = requestAnimationFrame(loop);
    };

    s.animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.animId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ display: 'block', width: '100%', maxWidth: W }}
    />
  );
}

/* ─────────────────────────────────────────────
   Main Preloader component
───────────────────────────────────────────── */
interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress,   setProgress]   = useState(0);
  const [status,     setStatus]     = useState('placing particles');
  const [phaseLabel, setPhaseLabel] = useState('haris');
  const [dotActive,  setDotActive]  = useState(false);
  const [barColor,   setBarColor]   = useState('linear-gradient(90deg,#1a5fa8,#2d7dd2,#5ba3e8)');
  const [isDone,     setIsDone]     = useState(false);
  const [exitPhase,  setExitPhase]  = useState(false);

  const handleStatusChange = useCallback((s: string, label: string, active: boolean) => {
    setStatus(s);
    setPhaseLabel(label);
    setDotActive(active);
    /* Swap bar to red once we're building RINDH */
    if (label === 'rindh' || label === 'in transit' || label === 'exploding') {
      setBarColor('linear-gradient(90deg,#9b2335,#dc2626,#f87171)');
    } else {
      setBarColor('linear-gradient(90deg,#1a5fa8,#2d7dd2,#5ba3e8)');
    }
  }, []);

  const handleDone = useCallback(() => {
    setIsDone(true);
    /* Exit transition after a short hold */
    setTimeout(() => {
      setExitPhase(true);
      setTimeout(onComplete, 400);
    }, 400);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg transition-all duration-700 ease-out"
      style={{
        opacity:        exitPhase ? 0 : 1,
        transform:      exitPhase ? 'scale(1.04)' : 'scale(1)',
        pointerEvents:  exitPhase ? 'none' : 'all',
      }}
    >
      {/* ── Outer neumorphic card ── */}
      <div
        className="bg-bg rounded-[24px] px-12 py-10 shadow-neo-elevated flex flex-col items-center gap-7 w-[min(340px,90vw)] max-w-[95vw]"
      >
        {/* ── Inner concave display panel ── */}
        <div
          className="rounded-2xl px-7 py-6 shadow-neo-concave neo-concave flex items-center justify-center w-full overflow-hidden"
        >
          <ParticleCanvas
            onProgressChange={setProgress}
            onStatusChange={handleStatusChange}
            onDone={handleDone}
          />
        </div>

        {/* ── Phase label ── */}
        <p className="font-mono text-sm tracking-[0.3em] text-text-muted m-0 lowercase transition-colors duration-400">
          {phaseLabel}
        </p>

        {/* ── Progress bar track ── */}
        <div className="w-full h-1.5 rounded-full shadow-neo-concave neo-concave overflow-hidden">
          <div
            style={{
              height:     '100%',
              width:      `${progress}%`,
              borderRadius:'100px',
              background: barColor,
              transition: 'width 0.06s linear, background 0.5s ease',
              boxShadow:  '0 0 8px rgba(220,38,38,0.45)',
            }}
          />
        </div>

        {/* ── Status row ── */}
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted tracking-[0.15em]">
          {/* Animated pulse dot */}
          <span
            style={{
              width:      '8px',
              height:     '8px',
              borderRadius:'50%',
              background: dotActive ? '#dc2626' : '#a3b1c6',
              boxShadow:  dotActive ? '0 0 6px #dc262680' : 'none',
              transition: 'background 0.4s, box-shadow 0.4s',
              flexShrink: 0,
              animation:  isDone ? 'none' : 'pulseDot 1.2s ease-in-out infinite',
            }}
          />
          <span>
            {isDone ? 'ready' : `${status} — ${progress}%`}
          </span>
        </div>
      </div>

      {/* Keyframe for the pulsing dot */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}