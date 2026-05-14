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
      style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,0,0,0.5)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-cyan-400/5 transition-colors"
      >
        <div>
          <div className="text-white font-semibold text-lg">{role}</div>
          <div className="text-cyan-400 font-mono text-sm mt-1">{company}</div>
          <div className="text-gray-500 font-mono text-xs mt-1 tracking-widest">{period}</div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-cyan-400 flex-shrink-0 mt-1" />
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
                <li key={i} className="flex gap-3 text-gray-400 text-sm font-mono">
                  <span className="text-cyan-400 flex-shrink-0">▸</span>
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
