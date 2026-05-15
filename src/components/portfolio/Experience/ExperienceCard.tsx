'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

interface Props {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  index: number;
  isVisible: boolean;
}

export default function ExperienceCard({ role, company, period, highlights, index, isVisible }: Props) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
      className="overflow-hidden"
      style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(13,0,16,0.5)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between gap-4 transition-colors"
        style={{ background: expanded ? 'rgba(123,47,255,0.05)' : 'transparent' }}
      >
        <div>
          <div className="text-white font-semibold text-lg">{role}</div>
          <div className="font-mono text-sm mt-1" style={{ color: '#c084fc' }}>{company}</div>
          <div className="font-mono text-xs mt-1 tracking-widest" style={{ color: '#00e5ff' }}>{period}</div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="flex-shrink-0 mt-1" style={{ color: '#c084fc' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="px-6 pb-6 space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm font-mono" style={{ color: 'rgba(200,180,240,0.65)' }}>
                  <span className="flex-shrink-0" style={{ color: '#7b2fff' }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
