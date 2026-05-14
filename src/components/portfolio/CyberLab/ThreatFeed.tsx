'use client';
import { useEffect, useState } from 'react';
import { threatFeed } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThreatFeed() {
  const [visible, setVisible] = useState<typeof threatFeed>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= threatFeed.length) {
      const reset = setTimeout(() => { setVisible([]); setIdx(0); }, 3000);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => {
      setVisible((prev) => [...prev, threatFeed[idx]]);
      setIdx((i) => i + 1);
    }, 800);
    return () => clearTimeout(t);
  }, [idx]);

  const typeColor: Record<string, string> = {
    INFO: '#00E5FF',
    WARN: '#F59E0B',
    ALERT: '#EF4444',
  };

  return (
    <div className="h-80 overflow-hidden font-mono text-xs"
      style={{ background: '#050505', border: '1px solid rgba(0,229,255,0.2)', padding: '1rem' }}>
      <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-gray-500 tracking-widest">LIVE THREAT MONITOR</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {visible.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-gray-600">[{entry.time}]</span>
              <span className="font-bold" style={{ color: typeColor[entry.type] ?? '#fff' }}>
                {entry.type}
              </span>
              <span className="text-gray-400">{entry.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
