import React from 'react';
import { motion } from 'motion/react';
import { Star, Linkedin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

type Testimonial = {
  id: string;
  type: 'whatsapp' | 'linkedin';
  text: string;
  author: string;
  role?: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 'whatsapp-review',
    type: 'whatsapp',
    text: "“Working with Muhammad Haris was a game-changer for our digital presence. From the initial concept to the final deployment, he demonstrated a level of technical precision that is rare to find. Haris didn't just build a website; he engineered a scalable, high-performance platform that perfectly captures our brand identity. If you are looking for a developer who prioritizes clean code, seamless UX, and reliable results, I highly recommend him.”",
    author: 'Mahad Abbas(WhatsApp Review)',
  },
  {
    id: 'linkedin-rec',
    type: 'linkedin',
    text: '“Haris Khan designed and now manages website of my consultancy firm, Umer Surveying, with remarkable professionalism, creativity, and technical expertise. He also developed a professional logo for our company. The modern, responsive site reflects our brand perfectly, with smooth performance, timely updates, and reliable support.”',
    author: 'Farooqistan K',
    role: 'Full-Stack Developer',
    company: 'LinkedIn Recommendation',
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-bg relative overflow-hidden border-t border-dark-shadow/10">
      {/* Immersive background glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center space-y-4 mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20 mx-auto block">
            Endorsements
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-text leading-[0.8] uppercase pt-4">
            Testimonials
          </h2>
          <p className="text-lg text-text-muted font-light max-w-xl mx-auto pt-4 leading-relaxed">
            Here is what clients and colleagues say about working with me on WhatsApp and LinkedIn.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10 relative">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="neo-flat p-6 md:p-10 rounded-[32px] flex flex-col justify-between hover:shadow-neo-elevated hover:scale-[1.01] transition-all duration-300 relative group min-h-[320px]"
            >
              {/* Header: Platform Logo & Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center neo-convex ${
                  t.type === 'whatsapp' ? 'text-green-500' : 'text-accent'
                }`}>
                  {t.type === 'whatsapp' ? <FaWhatsapp size={22} /> : <Linkedin size={20} />}
                </div>
                
                {t.type === 'whatsapp' ? (
                  <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-xs font-mono">
                    <Star size={12} fill="currentColor" />
                    <span>5.0 Rating</span>
                  </div>
                ) : (
                  <span className="font-mono text-[10px] text-accent uppercase tracking-wider bg-accent/10 py-1 px-3 rounded-full">
                    LinkedIn Verified
                  </span>
                )}
              </div>

              {/* Text */}
              <p className="text-text-muted text-sm md:text-base leading-relaxed italic mb-8 select-text">
                {t.text}
              </p>

              {/* Author Footer */}
              <div className="border-t border-dark-shadow/15 pt-4 mt-auto">
                <h4 className="font-display font-bold text-text text-base md:text-lg">{t.author}</h4>
                {t.role && (
                  <p className="font-mono text-xs text-text-muted mt-1">
                    {t.role} {t.company ? `— ${t.company}` : ''}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
