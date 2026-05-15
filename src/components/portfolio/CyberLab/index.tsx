'use client';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import Terminal from './Terminal';
import ThreatFeed from './ThreatFeed';

export default function CyberLab() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="cyberlab" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(183,28,28,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-red-500 tracking-widest">06 // VOID_INTERFACE</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Command <span style={{ color: '#c084fc' }}>Center</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-3">
            Interactive terminal and live threat monitoring simulation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} transition={{ delay: 0.1 }}>
            <div className="text-xs font-mono text-cyan-400 tracking-widest mb-3">OPERATOR TERMINAL</div>
            <Terminal />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} transition={{ delay: 0.2 }}>
            <div className="text-xs font-mono text-red-400 tracking-widest mb-3">THREAT INTELLIGENCE FEED</div>
            <ThreatFeed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
