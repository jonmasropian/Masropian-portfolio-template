'use client';
import { motion } from 'framer-motion';
import { militaryTimeline } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { staggerContainer, fadeUp } from '@/lib/animations';

export default function MilitaryTimeline() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="relative"
    >
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent" />

      <div className="space-y-8 pl-12">
        {militaryTimeline.map((item, idx) => (
          <motion.div key={idx} variants={fadeUp} className="relative">
            {/* Dot */}
            <div
              className="absolute -left-[2.35rem] w-3 h-3 rounded-full border-2 border-cyan-400 bg-black"
              style={{ boxShadow: '0 0 10px rgba(0,229,255,0.6)' }}
            />
            {/* Year */}
            <div className="text-xs font-mono text-cyan-400 mb-1 tracking-widest">{item.year}</div>
            {/* Event */}
            <div className="text-white font-semibold text-sm">{item.event}</div>
            {/* Detail */}
            <div className="text-gray-500 text-xs mt-1 font-mono">{item.detail}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
