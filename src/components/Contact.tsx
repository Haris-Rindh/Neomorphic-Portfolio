import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, MessageCircle, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { TextReveal } from './TextReveal';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('All fields are required.');
      return;
    }
    setStatus('sending');
    setErrorMessage('');

    try {
      const payload = {
        service_id: 'service_bfb9zzx',
        template_id: 'template_pz38kdu',
        user_id: '4u41MVsnQ6mWKycsm',
        template_params: {
          from_name: name,
          name: name,
          from_email: email,
          email: email,
          message: message,
        }
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const text = await response.text();
        throw new Error(text || 'Failed to send.');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred. Please try again.');
    }
  };

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
          
          {/* Email / Contact Form Card (Main CTA) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 neo-flat p-6 md:p-10 rounded-[32px] md:rounded-[48px] flex flex-col justify-between transition-all duration-500 relative overflow-hidden"
          >
             <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col w-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 neo-convex rounded-xl flex items-center justify-center text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text">Send Message</h3>
                    <p className="text-text-muted text-xs font-light">Email lands directly in my inbox.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-5 py-3 rounded-2xl bg-bg shadow-neo-concave text-text border border-transparent outline-none focus:border-accent/30 transition-all font-sans text-sm"
                      required
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Your Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-5 py-3 rounded-2xl bg-bg shadow-neo-concave text-text border border-transparent outline-none focus:border-accent/30 transition-all font-sans text-sm"
                      required
                      disabled={status === 'sending'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or inquiry..."
                    rows={4}
                    className="w-full px-5 py-3 rounded-2xl bg-bg shadow-neo-concave text-text border border-transparent outline-none focus:border-accent/30 transition-all font-sans text-sm resize-none"
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <div className="pt-4 mt-auto">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full neo-btn py-3.5 rounded-full font-display font-medium text-sm text-text hover:text-accent hover:shadow-[0_0_24px_rgba(49,130,206,0.3)] flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <span>Sending Message...</span>
                    ) : status === 'success' ? (
                      <span className="text-green-500 font-bold">Message Sent! ✓</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 font-mono text-[10px] mt-2 text-center">{errorMessage}</p>
                  )}
                  {status === 'success' && (
                    <p className="text-green-500 font-mono text-[10px] mt-2 text-center">Thank you! Your message has been sent.</p>
                  )}
                </div>
             </form>
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
