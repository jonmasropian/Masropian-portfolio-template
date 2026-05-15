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
      <div className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, rgba(123,47,255,0.6), rgba(123,47,255,0.15), transparent)' }} />

      <div className="space-y-8 pl-12">
        {militaryTimeline.map((item, idx) => (
          <motion.div key={idx} variants={fadeUp} className="relative">
            {/* Node — cyan for current/last, purple for past */}
            <div
              className="absolute -left-[2.35rem] w-3 h-3 rounded-full border-2"
              style={{
                borderColor: idx === militaryTimeline.length - 1 ? '#00e5ff' : '#7b2fff',
                background: '#000005',
                boxShadow: idx === militaryTimeline.length - 1
                  ? '0 0 10px rgba(0,229,255,0.7)'
                  : '0 0 10px rgba(123,47,255,0.7)',
              }}
            />
            {/* Year */}
            <div className="text-xs font-mono mb-1 tracking-widest"
              style={{ color: idx === militaryTimeline.length - 1 ? '#00e5ff' : '#c084fc' }}>
              {item.year}
            </div>
            {/* Event */}
            <div className="text-white font-semibold text-sm">{item.event}</div>
            {/* Detail */}
            <div className="text-xs mt-1 font-mono" style={{ color: 'rgba(160,140,200,0.6)' }}>{item.detail}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
