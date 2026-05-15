'use client';
import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import CertCard from './CertCard';

export default function Certifications() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="certifications" className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #000, #050505, #000)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">05 // CLEARANCE_VERIFIED</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Credentials &amp; <span style={{ color: '#c084fc' }}>Clearances</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <CertCard key={cert.id} {...cert} index={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
