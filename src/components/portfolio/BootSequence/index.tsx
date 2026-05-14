'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  '> INITIALIZING SYSTEM...',
  '> LOADING KERNEL MODULES... [OK]',
  '> MOUNTING SECURE PARTITIONS... [OK]',
  '> CHECKING CLEARANCE LEVEL... SECRET [VERIFIED]',
  '> ESTABLISHING ENCRYPTED CHANNEL... [OK]',
  '> LOADING OPERATOR PROFILE: JON MASROPIAN',
  '> SIGNAL CORPS // 25H // 22 YEARS SERVICE',
  '> FULL STACK DEVELOPMENT MODULES LOADED',
  '> [SYSTEM_CORRUPTION_DETECTED]',
  '> ACCESSING PORTFOLIO DATABASE...',
  '> ACCESS GRANTED. WELCOME.',
];

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 500);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex flex-col justify-center items-start bg-black px-8 md:px-24"
        >
          {/* JM Logo */}
          <div className="mb-8 text-5xl font-bold tracking-widest" style={{ color: '#00E5FF', textShadow: '0 0 30px rgba(0,229,255,0.8)' }}>
            JM
          </div>

          {/* Boot lines */}
          <div className="font-mono text-xs md:text-sm space-y-1 max-w-2xl">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={
                  line.includes('[SYSTEM_CORRUPTION') ? 'text-red-500' :
                  line.includes('GRANTED') || line.includes('WELCOME') ? 'text-cyan-400 font-bold' :
                  line.includes('[OK]') || line.includes('[VERIFIED]') ? 'text-green-400' :
                  'text-gray-400'
                }
              >
                {line}
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan-400 ml-1"
            />
          </div>

          {/* Scan line overlay */}
          <div className="pointer-events-none absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
