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
import booksphere from '../assets/booksphere.png';
import dentalWebsite from '../assets/dental_website.png';
import rusticSpoon from '../assets/rustic_spoon.png';
import skyline from '../assets/skyline.png';
import MashaAllah from '../assets/MashaAllah_bangles.png';
import trendtrove from '../assets/trendtrove.png';
import Surveying from '../assets/UmerSurveying.png';
import Plumbing from '../assets/CityPlumbing.png';

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
  featured: boolean;
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
    featured: true,
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
    featured: true,
  },
  {
    id: 'prime',
    title: 'Skyline Apartments',
    category: 'Luxury Real Estate',
    description:
      'An ultra-luxury real estate SPA featuring live interactive Leaflet maps, a custom tour scheduling calendar, and Vercel serverless API integrations.',
    tech: 'React, Vite, Tailwind CSS, Leaflet, Serverless APIs',
    liveLink: 'https://skyline-apartments-two.vercel.app/',
    github: 'https://github.com/Haris-Rindh/Skyline-apartments.git',
    image: skyline,
    featured: true,
  },
  {
    id: 'urban',
    title: 'Rustic Spoon',
    category: 'Hospitality',
    description:
      'A premium five-star restaurant website featuring a multi-page farm-to-table dining experience, interactive table reservation widget, and client-side menu PDF generation.',
    tech: 'Next.js, TypeScript, Tailwind CSS v4, Framer Motion, jsPDF',
    liveLink: 'https://rustic-spoon-nu.vercel.app/',
    github: 'https://github.com/Haris-Rindh/rustic-spoon.git',
    image: rusticSpoon,
    featured: true,
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
    image: booksphere,
    featured: false,
  },
  {
    id: 'digital',
    title: 'Digital Agency',
    category: 'Agency Portfolio',
    description:
      "Modern, dark-themed agency portfolio with immersive animations and micro-interactions.",
    tech: 'React, Tailwind, Framer Motion',
    liveLink: 'https://neongrowth.vercel.app/',
    github: 'https://github.com/Haris-Rindh/neongrowth.git',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
    featured: false,
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
    image: Surveying,
    featured: false,
  },
  {
    id: 'dental',
    title: 'Zenith Dental',
    category: 'Medical Website',
    description:
      'A professional dental clinic website featuring floating info cards, an interactive booking modal with validation, FAQ accordion, and Smile Gallery.',
    tech: 'HTML5, Tailwind CSS, Vanilla JS',
    liveLink: 'https://zenith-dental-one.vercel.app/',
    github: 'https://github.com/Haris-Rindh/Zenith-dental.git',
    image: dentalWebsite,
    featured: false,
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
    image: Plumbing,
    featured: false,
  },
  {
    id: 'securechat',
    title: 'SecureChat',
    category: 'Security / Real-Time App',
    description:
      'A browser-based, zero-trust E2EE messaging PWA. All messages, files, and voice recordings are encrypted client-side via ECDH + AES-GCM before reaching Firebase. Features a Duress PIN, disappearing messages, and panic redirect.',
    tech: 'HTML, Firebase, Web Crypto API, PWA, AES-GCM, ECDH',
    liveLink: 'https://github.com/Haris-Rindh/securechat',
    github: 'https://github.com/Haris-Rindh/securechat',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200',
    featured: false,
  },
  {
    id: 'trendtrove',
    title: 'TrendTrove',
    category: 'B2B E-Commerce Platform',
    description:
      'A scalable B2B e-commerce platform with Firebase auth, wishlist & cart, order management, admin dashboard with bulk import, advanced product search, and category filtering.',
    tech: 'React, Vite, Firebase, Tailwind CSS, Context API',
    liveLink: 'https://github.com/Haris-Rindh/ecommerce-website',
    github: 'https://github.com/Haris-Rindh/ecommerce-website',
    image: trendtrove,
    featured: false,
  },
  {
    id: 'mashaallah',
    title: 'MashaAllah Store',
    category: 'Full-Stack Client Project',
    description:
      'A real client e-commerce site for a retail store (bangles, cosmetics, jewellery). Built with React + Node.js/Express + MongoDB + Cloudinary. Features GSAP animations, Lenis smooth scroll, a PIN-gated admin panel, and WhatsApp-integrated order flow.',
    tech: 'React, Node.js, Express, MongoDB, Cloudinary, GSAP, Three.js',
    liveLink: 'https://github.com/Haris-Rindh/MashaAllah-bangles-store',
    github: 'https://github.com/Haris-Rindh/MashaAllah-bangles-store',
    image: MashaAllah,
    featured: false,
  },
  {
    id: 'vulms',
    title: 'VULMS Handler',
    category: 'Browser Extension / Dev Tool',
    description:
      'An automated LMS deadline notifier for VU students. V1 is a Chrome extension that scrapes assignments and fires escalating push notifications. V2 is a full backend (Node.js + Playwright + SQLite + AES-256-GCM) with web-push to desktop and mobile, running 24/7 on a cloud VM.',
    tech: 'JavaScript, Chrome Extension API, Playwright, Node.js, SQLite, Web Push, AES-256-GCM',
    liveLink: 'https://github.com/Haris-Rindh/VULMS-Handler',
    github: 'https://github.com/Haris-Rindh/VULMS-Handler',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200',
    featured: false,
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

// Featured projects only appear in the scroll spotlight phase
const featuredProjects = projects.filter((p) => p.featured);

// Each project gets PER_PROJECT_VH of vertical scroll "room"
const PER_PROJECT_VH = 90;
const TOTAL_VH = featuredProjects.length * PER_PROJECT_VH;

// Shared easing that matches the spec
const CUSTOM_EASE = [0.76, 0, 0.24, 1] as const;

const filterCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'saas', label: 'SaaS & Full-Stack' },
  { id: 'websites', label: 'Websites' },
  { id: 'tools', label: 'Dev Tools & Security' }
];

const getFilteredProjects = (category: string) => {
  const nonFeatured = projects.filter(p => !p.featured);
  if (category === 'all') return nonFeatured;
  return nonFeatured.filter(project => {
    const id = project.id;
    if (category === 'saas') {
      return ['booksphere', 'trendtrove', 'mashaallah'].includes(id);
    }
    if (category === 'websites') {
      return ['digital', 'umer', 'dental', 'plumbing'].includes(id);
    }
    if (category === 'tools') {
      return ['securechat', 'vulms'].includes(id);
    }
    return true;
  });
};

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
      className="absolute inset-0 flex items-center justify-center px-3 md:px-8 pt-24 pb-6"
      style={{
        y: reduced ? yReduced : yFull,
        scale: reduced ? scaleReduced : scaleFull,
        opacity,
        rotate: reduced ? rotateReduced : rotateFull,
        pointerEvents: pointerEv,
        zIndex,
      }}
    >
      <div className="w-full max-w-6xl flex flex-col lg:flex-row neo-flat rounded-[28px] md:rounded-[36px] overflow-hidden group relative shadow-neo-elevated items-stretch" style={{ height: 'min(72vh, 560px)', minHeight: '420px' }}>
        {/* ── Left: Text content ── */}
        <div className="flex flex-col w-full lg:w-[58%] min-w-0 p-5 md:p-10 lg:p-12 z-10 overflow-y-auto" style={{ maxHeight: '100%' }}>
          <div className="space-y-3 md:space-y-4 flex-1">
            <span className="inline-flex items-center font-mono text-xs text-accent uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-full">
              {project.category}
            </span>
            <h3 className="text-2xl md:text-4xl xl:text-5xl font-display font-bold text-text uppercase tracking-tight leading-[0.95] break-words hyphens-auto">
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
                  className="font-mono text-xs text-accent uppercase tracking-wider border border-accent/25 bg-accent/5 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs — always visible, never clipped */}
          <div className="flex items-center gap-3 pt-5 mt-auto flex-shrink-0">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-5 py-3 rounded-full font-display font-medium text-text text-sm flex items-center gap-2 hover:text-accent transition-colors group/cta"
            >
              <span>Live Site</span>
              <ArrowUpRight className="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 neo-convex rounded-full flex items-center justify-center text-text-muted hover:text-accent transition-colors flex-shrink-0"
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
function GridCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        delay: (index % 4) * 0.05,
        duration: 0.4,
        ease: CUSTOM_EASE,
      }}
      className="neo-flat rounded-[22px] overflow-hidden flex flex-col h-full hover:shadow-neo-elevated hover:scale-[1.01] transition-all duration-300 group"
    >
      {/* Image Header */}
      <div className="relative h-32 overflow-hidden w-full neo-concave rounded-t-[22px]">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-black/10 to-transparent" />
      </div>
      
      {/* Text Body */}
      <div className="p-4.5 flex flex-col space-y-2.5 flex-1">
        <span className="inline-flex items-center font-mono text-[9px] text-accent uppercase tracking-widest bg-accent/10 py-0.5 px-2 rounded-full w-max">
          {project.category}
        </span>
        <h3 className="text-lg font-display font-bold text-text uppercase tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tech.split(', ').slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] text-accent uppercase tracking-wider border border-accent/25 bg-accent/5 px-1.5 py-0.2 rounded"
            >
              {tag}
            </span>
          ))}
          {project.tech.split(', ').length > 4 && (
            <span className="font-mono text-[9px] text-text-muted uppercase px-1 py-0.2">
              +{project.tech.split(', ').length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4 mt-auto border-t border-dark-shadow/10">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[34px] neo-btn px-3 py-1 rounded-full font-display font-medium text-text text-xs flex items-center justify-center gap-1 hover:text-accent transition-colors"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 shrink-0 neo-convex rounded-full flex items-center justify-center text-text-muted hover:text-accent transition-colors"
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Per-project background accent colour mapped to the exact length of the projects array
  const bgColor = useTransform(
    scrollYProgress,
    [
      0,
      ...featuredProjects.map((_, i) => ((i + 0.5) * PER_PROJECT_VH) / TOTAL_VH),
      1,
    ],
    [
      'rgba(49,130,206,0)',
      ...featuredProjects.map((_, i) => ACCENT_COLORS[i % ACCENT_COLORS.length]),
      'rgba(252,129,74,0)',
    ]
  );

  // Derive state from scroll position
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const raw = (v * TOTAL_VH) / PER_PROJECT_VH;
    const idx = Math.min(Math.max(Math.floor(raw), 0), featuredProjects.length - 1);
    setActiveIndex(idx);
  });

  return (
    <section id="projects" className="relative">
      
      {/* ── MOBILE SWIPE CAROUSEL (Hide on Desktop) ── */}
      <div className="block lg:hidden py-20 px-0 w-full overflow-hidden relative">
        <div className="px-6 md:px-12 space-y-4 mb-8">
          <p className="font-mono text-xs sm:text-xs text-accent uppercase tracking-widest mb-0.5">
            Spotlight Showcase
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-text leading-none uppercase">
              Featured Projects
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
          {featuredProjects.map((project, i) => (
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
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-0.5">
                Spotlight Showcase
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text leading-none">
                FEATURED PROJECT
              </h2>
            </div>

            {/* Flip counter */}
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
              <span>{String(featuredProjects.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* ══ Side progress bar indicators ══ */}
          <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-1.5">
            {featuredProjects.map((_, i) => (
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
            <span 
              className="mt-4 font-mono text-sm tracking-[0.2em] text-text-muted/70 uppercase whitespace-nowrap rotate-180"
              style={{ writingMode: 'vertical-rl' }}
            >
              Explore ↓
            </span>
          </div>

          {/* ══ Spotlight cards ══ */}
          <div className="absolute inset-0">
            {featuredProjects.map((project, i) => (
              <SpotlightCard
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                reduced={shouldReduce}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── ALL PROJECTS GRID SECTION (Visible on all devices, naturally scrolled) ── */}
      <div className="py-24 md:py-32 border-t border-dark-shadow/10 bg-bg/30 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1.5">
            Full Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text uppercase tracking-tight">
            All Projects
          </h2>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12 max-w-4xl mx-auto px-6">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                setIsExpanded(false);
              }}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat.id
                  ? 'neo-concave text-accent font-semibold'
                  : 'neo-btn text-text-muted hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Neomorphic Card Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto px-6 md:px-12"
        >
          <AnimatePresence mode="popLayout">
            {getFilteredProjects(activeFilter)
              .slice(0, isExpanded ? undefined : 4)
              .map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <GridCard project={project} index={i} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse Button */}
        {getFilteredProjects(activeFilter).length > 4 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="neo-btn px-8 py-3.5 rounded-full font-display font-medium text-sm text-text hover:text-accent transition-all duration-200"
            >
              {isExpanded ? 'Show Less' : 'Show all projects'}
            </button>
          </div>
        )}
      </div>

    </section>
  );
}