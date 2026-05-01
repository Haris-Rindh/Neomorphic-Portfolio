import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, MessageCircle, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { TextReveal } from './TextReveal';

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-bg relative overflow-hidden">
      {/* Immersive background glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center space-y-6 mb-16">
          <span className="text-accent font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-4 rounded-full w-max shadow-neo-flat-sm border border-white/20 mx-auto">Available for Hire</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium text-text leading-[0.8] uppercase pt-4 max-w-4xl">
            <TextReveal text="READY TO BUILD <br/> THE FUTURE?" />
          </h2>
          <p className="text-lg text-text-muted font-light max-w-xl mx-auto pt-4 leading-relaxed px-4">
            Whether you have a groundbreaking idea or a team in need of a MERN specialist, I'm just a message away. Let's create something extraordinary together.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Email Card (Main CTA) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="lg:col-span-2 neo-flat p-6 md:p-14 rounded-[32px] md:rounded-[48px] flex flex-col justify-between group hover:neo-concave transition-all duration-500 relative overflow-hidden"
          >
             <div className="space-y-4 md:space-y-6">
                <div className="w-16 h-16 neo-convex rounded-2xl flex items-center justify-center text-accent group-hover:neo-concave transition-all">
                  <Mail size={32} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-3xl font-display font-bold text-text">Direct Inquiry</h3>
                   <p className="text-text-muted font-light">The fastest way to get a project estimate or interview invitation.</p>
                </div>
             </div>
             
             <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 relative z-10">
                <a 
                  href="mailto:haris.rindh.pk@gmail.com" 
                  className="w-full xl:w-max neo-btn px-5 sm:px-10 py-3.5 sm:py-5 rounded-[20px] sm:rounded-full font-display text-sm md:text-xl text-text hover:text-accent hover:shadow-[0_0_24px_rgba(49,130,206,0.3)] flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 group/btn break-all sm:break-normal"
                >
                   <span>haris.rindh.pk@gmail.com</span>
                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                </a>
             </div>

             {/* Decorative Ghost Text */}
             <span className="absolute bottom-[-5px] sm:bottom-[-10px] right-2 sm:right-8 font-display text-[3.5rem] sm:text-[5rem] font-bold text-accent/5 pointer-events-none select-none uppercase z-0">EMAIL</span>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="neo-flat p-6 md:p-10 rounded-[32px] md:rounded-[48px] flex flex-col space-y-6 md:space-y-8"
          >
             <h3 className="text-xl font-display font-bold text-text uppercase tracking-widest text-center mt-2">Social Connect</h3>
             
             <div className="flex flex-col gap-4">
                <a 
                  href="https://www.linkedin.com/in/harisrindh" 
                  target="_blank" rel="noopener noreferrer"
                  className="neo-btn p-5 rounded-2xl flex items-center justify-between group hover:border-accent/20 transition-all duration-300"
                >
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 neo-concave rounded-xl flex items-center justify-center text-accent">
                         <Linkedin size={20} />
                      </div>
                      <span className="font-sans font-bold text-text">LinkedIn</span>
                   </div>
                   <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>

                <a 
                  href="https://github.com/Haris-Rindh" 
                  target="_blank" rel="noopener noreferrer"
                  className="neo-btn p-5 rounded-2xl flex items-center justify-between group hover:border-accent/20 transition-all duration-300"
                >
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 neo-concave rounded-xl flex items-center justify-center text-text">
                         <Github size={20} />
                      </div>
                      <span className="font-sans font-bold text-text">GitHub</span>
                   </div>
                   <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>

                <a 
                  href="https://wa.me/923037368528" 
                  target="_blank" rel="noopener noreferrer"
                  className="neo-btn p-5 rounded-2xl flex items-center justify-between group hover:border-accent/20 transition-all duration-300"
                >
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 neo-concave rounded-xl flex items-center justify-center text-green-500">
                         <FaWhatsapp size={20} />  
                      </div>
                      <span className="font-sans font-bold text-text">WhatsApp</span>
                   </div>
                   <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </a>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
