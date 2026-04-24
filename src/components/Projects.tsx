import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string;
  liveLink: string;
  github: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 'nexusai',
    title: 'Nexus AI',
    category: 'Enterprise SaaS Platform',
    description:
      'A production-grade AI content operating system. Features a 5-level AI failover engine for maximum uptime and reliability.',
    tech: 'React, Node.js, MongoDB, AI Agents',
    liveLink: 'https://nexus-ai-mocha-phi.vercel.app/',
    github: 'https://github.com/Haris-Rindh/NexusAI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
  },
  {
    id: 'nexus',
    title: 'NEXUS',
    category: 'SaaS Platform',
    description:
      'A comprehensive Investor & Entrepreneur Collaboration platform featuring real-time WebRTC video calling, secure document handling, and integrated Stripe payments.',
    tech: 'MERN Stack, Tailwind, Socket.io, WebRTC',
    liveLink: 'https://nexus-jet-eight-72.vercel.app/',
    github: 'https://github.com/Haris-Rindh/Nexus.git',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200', 
  },
  {
    id: 'booksphere',
    title: 'Book Sphere',
    category: 'Full-Stack Web App',
    description:
      'A dynamic library management application with cloud database integration and real-time collaborative updates.',
    tech: 'React, Firebase, Async API',
    liveLink: 'https://haris-rindh.github.io/Book-Sphere/',
    github: 'https://github.com/Haris-Rindh/Book-Sphere',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200',
  },
  {
    id: 'umer',
    title: 'Umer Surveying™',
    category: 'Corporate Business Site',
    description:
      'Designed and deployed the corporate portal for a leading surveying firm with full SEO optimization.',
    tech: 'HTML5, CSS3, SEO Optimization',
    liveLink: 'https://haris-rindh.github.io/Umer-Surveying/',
    github: 'https://github.com/Haris-Rindh/Umer-Surveying',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
  },
  {
    id: 'prime',
    title: 'Prime Real Estate',
    category: 'Property Platform',
    description:
      'High-performance property listing platform with advanced filtering, search and responsive layouts.',
    tech: 'React, Tailwind, Framer Motion',
    liveLink: 'https://skyline-apartments-two.vercel.app/',
    github: 'https://github.com/Haris-Rindh/Skyline-apartments.git',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200',
  },
  {
    id: 'digital',
    title: 'Digital Agency',
    category: 'Portfolio Template',
    description:
      "Modern, dark-themed portfolio for creative agencies with immersive animations and micro-interactions.",
    tech: 'React, Tailwind, Framer Motion',
    liveLink: 'https://neongrowth.vercel.app/',
    github: 'https://github.com/Haris-Rindh/neongrowth.git',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
  },
  {
    id: 'plumbing',
    title: 'City Plumbing',
    category: 'Local Service Site',
    description:
      'Conversion-focused layout for emergency plumbing services with integrated lead generation flows.',
    tech: 'HTML5, CSS3, Lead Gen',
    liveLink: 'https://swiftfix-plumbing.vercel.app/',
    github: 'https://github.com/Haris-Rindh/swiftfix-plumbing-landing.git',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200',
  },
  {
    id: 'dental',
    title: 'Dental Care',
    category: 'Medical Website',
    description:
      'Clean, trust-building design for a dental clinic featuring appointment scheduling and patient information.',
    tech: 'HTML5, Bootstrap, Responsive',
    liveLink: 'https://zenith-dental-one.vercel.app/',
    github: 'https://github.com/Haris-Rindh/Zenith-dental.git',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200',
  },
  {
    id: 'urban',
    title: 'Urban Restaurant',
    category: 'Hospitality',
    description:
      'Visual-heavy layout for a modern restaurant featuring menu galleries and online reservation flows.',
    tech: 'React, CSS Modules, Animation',
    liveLink: 'https://rustic-spoon-nu.vercel.app/',
    github: 'https://github.com/Haris-Rindh/rustic-spoon.git',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const ACCENT_COLORS = [
  'rgba(49,130,206,0.12)',
  'rgba(56,178,172,0.12)',
  'rgba(237,137,54,0.12)',
  'rgba(72,187,120,0.12)',
  'rgba(159,122,234,0.12)',
  'rgba(66,153,225,0.12)',
  'rgba(246,173,85,0.12)',
  'rgba(252,129,74,0.12)',
];

// Map colors dynamically so they loop perfectly, matching projects.length
const PROJECT_COLORS = projects.map((_, i) => ACCENT_COLORS[i % ACCENT_COLORS.length]);

// Each project gets PER_PROJECT_VH of vertical scroll "room"
const PER_PROJECT_VH = 90;
// Additional scroll for the all-grid phase
const GRID_VH = 120;
const TOTAL_VH = projects.length * PER_PROJECT_VH + GRID_VH;

// Normalised scroll fraction where grid phase begins
const GRID_START_FRAC = (projects.length * PER_PROJECT_VH) / TOTAL_VH;

// Shared easing that matches the spec
const CUSTOM_EASE = [0.76, 0, 0.24, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SpotlightCard — fully scroll-driven per-project card
// ─────────────────────────────────────────────────────────────────────────────
function SpotlightCard({
  project,
  index,
  scrollYProgress,
  reduced,
}: {
  key?: React.Key;
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const startFrac = (index * PER_PROJECT_VH) / TOTAL_VH;
  const endFrac = ((index + 1) * PER_PROJECT_VH) / TOTAL_VH;

  // Local progress 0→1 within this card's scroll segment
  const local = useTransform(scrollYProgress, [startFrac, endFrac], [0, 1], {
    clamp: true,
  });

  // ── Full-motion transforms ──
  // Entrance from below with overshoot, stable center, exit tilting upward
  const yFull = useTransform(
    local,
    [0, 0.16, 0.34, 0.66, 0.84, 1.0],
    ['100vh', '3vh', '0vh', '0vh', '-6vh', '-95vh']
  );
  const scaleFull = useTransform(
    local,
    [0, 0.14, 0.28, 0.72, 0.86, 1.0],
    [0.88, 1.05, 1.0, 1.0, 0.97, 0.88]
  );
  const rotateFull = useTransform(local, [0.7, 1.0], ['0deg', '-1.6deg']);

  // ── Reduced-motion fallbacks (always called — hooks rule) ──
  const yReduced = useTransform(local, [0, 1], ['0px', '0px']);
  const scaleReduced = useTransform(local, [0, 1], [1, 1]);
  const rotateReduced = useTransform(local, [0, 1], ['0deg', '0deg']);

  // Opacity is the same either way
  const opacity = useTransform(
    local,
    [0, 0.13, 0.28, 0.72, 0.87, 1.0],
    [0, 0.75, 1, 1, 0.75, 0]
  );

  // Dynamic z-index: card closest to its center (local=0.5) wins
  const zIndex = useTransform(local, (v) => {
    const distFromCenter = Math.abs(v - 0.5);
    return Math.max(1, Math.round((0.5 - distFromCenter) * 200));
  });

  // Disable pointer events outside the stable window
  const pointerEv = useTransform(local, (v) =>
    v > 0.2 && v < 0.8 ? 'auto' : 'none'
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 md:px-10 pt-20 pb-4"
      style={{
        y: reduced ? yReduced : yFull,
        scale: reduced ? scaleReduced : scaleFull,
        opacity,
        rotate: reduced ? rotateReduced : rotateFull,
        pointerEvents: pointerEv,
        zIndex,
      }}
    >
      <div className="w-full max-w-6xl flex flex-col lg:flex-row h-auto min-h-[55vh] lg:h-[70vh] lg:max-h-[540px] neo-flat rounded-[32px] md:rounded-[36px] overflow-hidden group relative shadow-neo-elevated items-stretch">
        {/* ── Left: Text content ── */}
        <div className="flex-1 w-full lg:w-[58%] min-w-0 p-6 md:p-12 lg:p-14 flex flex-col justify-between z-10 shrink-1 gap-6">
          <div className="space-y-4 md:space-y-5">
            <span className="inline-flex items-center font-mono text-xs text-accent uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full">
              {project.category}
            </span>
            <h3 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold text-text uppercase tracking-tight leading-[0.95] break-words hyphens-auto">
              {project.title}
            </h3>
            <p className="max-w-md text-text-muted text-sm md:text-base leading-relaxed break-words">
              {project.description}
            </p>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.split(', ').map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs md:text-xs text-accent uppercase tracking-wider border border-accent/25 bg-accent/5 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 pt-6">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-7 py-3.5 rounded-full font-display font-medium text-text flex items-center gap-2 hover:text-accent transition-colors group/cta"
            >
              <span>Live Site</span>
              <ArrowUpRight className="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 neo-convex rounded-full flex items-center justify-center text-text-muted hover:text-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div className="hidden lg:block w-[42%] shrink-0 neo-concave m-4 lg:m-6 rounded-3xl overflow-hidden relative self-stretch">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bg/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          {/* Ghost number watermark */}
          <div className="absolute top-3 right-4 font-display text-white/[0.07] text-[7rem] font-black leading-none select-none pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GridCard — compact card for the grid phase
// ─────────────────────────────────────────────────────────────────────────────
function GridCard({ project, index }: { key?: React.Key; project: Project; index: number }) {
  const firstTags = project.tech.split(', ').slice(0, 2);
  const extraCount = project.tech.split(', ').length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 36, scale: 0.94 }}
      transition={{
        delay: index * 0.07,
        duration: 0.45,
        ease: CUSTOM_EASE,
      }}
      className="neo-convex rounded-2xl overflow-hidden group cursor-pointer hover:neo-flat transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-28 md:h-36 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="font-display text-white text-xs md:text-sm font-bold truncate leading-tight">
            {project.title}
          </h4>
          <p className="font-mono text-white/55 text-sm uppercase tracking-wider truncate mt-0.5">
            {project.category}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 md:p-3 flex items-center gap-2">
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {firstTags.map((t) => (
            <span
              key={t}
              className="font-mono text-xs md:text-sm text-accent uppercase tracking-tight border border-accent/20 bg-accent/5 px-1.5 py-0.5 rounded truncate"
            >
              {t}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="font-mono text-xs text-text-muted uppercase">
              +{extraCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MobileProjectCard — clean vertical card for touch devices
// ─────────────────────────────────────────────────────────────────────────────
function MobileProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="neo-flat rounded-[28px] overflow-hidden flex flex-col h-full"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden w-full neo-concave rounded-t-[28px]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-black/20 to-transparent" />
        <div className="absolute top-3 right-4 font-display text-white/[0.15] text-[3rem] font-black leading-none pointer-events-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      
      {/* Text Body */}
      <div className="p-6 flex flex-col space-y-4 flex-1">
        <span className="inline-flex items-center font-mono text-xs text-accent uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full w-max">
          {project.category}
        </span>
        <h3 className="text-2xl font-display font-bold text-text uppercase tracking-tight leading-[1.1]">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-auto">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.split(', ').map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-accent uppercase tracking-wider border border-accent/25 bg-accent/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-6 mt-auto">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] neo-btn px-4 py-2 rounded-full font-display font-medium text-text text-sm flex items-center justify-center gap-2 hover:text-accent transition-colors"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 shrink-0 neo-convex rounded-full flex items-center justify-center text-text-muted hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Projects component
// ─────────────────────────────────────────────────────────────────────────────
export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isGrid, setIsGrid] = useState(false);

  // Per-project background accent colour mapped to the exact length of the projects array
  const bgColor = useTransform(
    scrollYProgress,
    [
      0,
      ...projects.map((_, i) => ((i + 0.5) * PER_PROJECT_VH) / TOTAL_VH),
      GRID_START_FRAC,
      1,
    ],
    [
      'rgba(49,130,206,0)',
      ...PROJECT_COLORS,
      PROJECT_COLORS[PROJECT_COLORS.length - 1], // Matches grid start with last project color
      'rgba(252,129,74,0)',
    ]
  );

  // Derive state from scroll position (drives counter + dots + grid phase)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsGrid(v >= GRID_START_FRAC);
    const raw = (v * TOTAL_VH) / PER_PROJECT_VH;
    const idx = Math.min(Math.max(Math.floor(raw), 0), projects.length - 1);
    setActiveIndex(idx);
  });

  return (
    <section id="projects" className="relative">
      
      {/* ── MOBILE SWIPE CAROUSEL (Hide on Desktop) ── */}
      <div className="block lg:hidden py-20 px-0 w-full overflow-hidden relative">
        <div className="px-6 md:px-12 space-y-4 mb-8">
          <p className="font-mono text-xs sm:text-xs text-accent uppercase tracking-widest mb-0.5">
            Full Portfolio
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text leading-none uppercase">
              All Projects
            </h2>
            <div className="flex items-center gap-1.5 text-text-muted font-mono text-xs uppercase border border-dark-shadow/20 px-2.5 py-1 rounded-full shadow-neo-flat-sm bg-bg">
              <span className="animate-pulse">Swipe</span>
              <ArrowUpRight className="w-3 h-3 rotate-45" /> 
            </div>
          </div>
        </div>
        
        {/* Horizontal Snap Scroll Area */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-12 gap-6" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, i) => (
            <div key={project.id} className="snap-center shrink-0 w-[85vw] sm:w-[360px] h-auto flex flex-col">
              <MobileProjectCard project={project} index={i} />
            </div>
          ))}
          {/* Edge spacer */}
          <div className="shrink-0 w-2" />
        </div>
        
        {/* Hide webkit scrollbar for this container */}
        <style>{`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* ── Tall scroll driver FOR DESKTOP ── */}
      <div ref={containerRef} style={{ height: `${TOTAL_VH}vh` }} className="hidden lg:block">

        {/* ── Sticky viewport ── */}
        <div className="sticky top-0 h-screen overflow-hidden bg-bg">

          {/* Per-project accent wash */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: bgColor }}
          />

          {/* ══ HUD: top bar ══ */}
          <div className="absolute top-0 left-0 right-0 z-[60] px-5 md:px-10 pt-6 flex items-end justify-between">
            {/* Label that morphs between phases */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isGrid ? 'phase-grid' : 'phase-spotlight'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: CUSTOM_EASE }}
              >
                <p className="font-mono text-xs text-accent uppercase tracking-widest mb-0.5">
                  {isGrid ? 'Full Portfolio' : 'Spotlight Showcase'}
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-text leading-none">
                  {isGrid ? 'ALL PROJECTS' : 'FEATURED PROJECT'}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Flip counter */}
            {!isGrid && (
              <div className="flex items-center gap-1.5 font-mono text-xs md:text-sm tabular-nums text-text-muted select-none">
                <div className="overflow-hidden" style={{ height: '1.2em' }}>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={activeIndex}
                      initial={{ y: '-110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '110%', opacity: 0 }}
                      transition={{ duration: 0.28, ease: CUSTOM_EASE }}
                      className="block font-semibold text-text"
                    >
                      {String(activeIndex + 1).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-text-muted/50">—</span>
                <span>{String(projects.length).padStart(2, '0')}</span>
              </div>
            )}
          </div>

          {/* ══ Side progress bar indicators ══ */}
          <AnimatePresence>
            {!isGrid && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.35 }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-1.5"
              >
                {projects.map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full"
                    animate={{
                      width: 3,
                      height: i === activeIndex ? 30 : i < activeIndex ? 8 : 6,
                      backgroundColor:
                        i === activeIndex
                          ? 'rgb(49,130,206)'
                          : i < activeIndex
                          ? 'rgba(49,130,206,0.45)'
                          : 'rgba(0,0,0,0.18)',
                    }}
                    transition={{ duration: 0.4, ease: CUSTOM_EASE }}
                  />
                ))}
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 font-mono text-sm tracking-[0.2em] text-text-muted/70 uppercase whitespace-nowrap rotate-180"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  Explore ↓
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══ Spotlight cards (always mounted for scroll-driven transforms) ══ */}
          <div
            className="absolute inset-0"
            style={{ pointerEvents: isGrid ? 'none' : undefined }}
          >
            {projects.map((project, i) => (
              <SpotlightCard
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                reduced={shouldReduce}
              />
            ))}
          </div>

          {/* ══ Grid phase overlay ══ */}
          <AnimatePresence>
            {isGrid && (
              <motion.div
                key="grid-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 pt-24 pb-4 px-4 md:px-10 overflow-y-auto"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {projects.map((project, i) => (
                    <GridCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}