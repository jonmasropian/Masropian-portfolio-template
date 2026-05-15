'use client';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp, slideInLeft, slideInRight } from '@/lib/animations';
import { Mail, Phone, MapPin, GitFork, ExternalLink } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(123,47,255,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">07 // TRANSMIT_INTO_THE_VOID</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Open <span style={{ color: '#c084fc' }}>Channel</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-3">
            Available for Full Stack Development, IT Support, or Hybrid Technical roles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: 'EMAIL', value: personal.email, href: `mailto:${personal.email}` },
              { icon: Phone, label: 'PHONE', value: personal.phone, href: `tel:${personal.phone}` },
              { icon: MapPin, label: 'LOCATION', value: personal.location, href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4"
                style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(123,47,255,0.03)' }}>
                <Icon size={18} className="flex-shrink-0" style={{ color: '#c084fc' }} />
                <div>
                  <div className="text-xs font-mono text-gray-500 tracking-widest">{label}</div>
                  {href ? (
                    <a href={href} className="text-white text-sm hover:text-cyan-400 transition-colors font-mono">{value}</a>
                  ) : (
                    <div className="text-white text-sm font-mono">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-2">
              <a href={personal.social.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(123,47,255,0.25)' }}>
                <GitFork size={16} /> GitHub
              </a>
              <a href={personal.social.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(123,47,255,0.25)' }}>
                <ExternalLink size={16} /> LinkedIn
              </a>
            </div>

            <div className="p-4 mt-4"
              style={{ border: '1px solid rgba(123,47,255,0.25)', background: 'rgba(123,47,255,0.04)' }}>
              <div className="text-xs font-mono tracking-widest mb-2" style={{ color: '#c084fc' }}>CLEARANCE STATUS</div>
              <div className="text-white text-sm font-mono">{personal.clearance}</div>
              <div className="text-gray-500 text-xs font-mono mt-1">Available for cleared positions</div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
