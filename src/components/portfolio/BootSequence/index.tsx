'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { corruptText } from '@/lib/corruption';

const bootLines = [
  { text: '> INITIALIZING VOID_OS v2.077...', type: 'normal' },
  { text: '> LOADING KERNEL MODULES... [OK]', type: 'ok' },
  { text: '> MOUNTING SECURE PARTITIONS... [OK]', type: 'ok' },
  { text: '> WARNING: ANOMALOUS SIGNAL DETECTED IN SECTOR 7', type: 'warn' },
  { text: '> CHECKING CLEARANCE LEVEL... SECRET [VERIFIED]', type: 'ok' },
  { text: '> LOADING OPERATOR PROFILE: JON MASROPIAN', type: 'normal' },
  { text: '> SIGNAL CORPS // 25H // 22 YEARS SERVICE', type: 'normal' },
  { text: '> [ERR_0xDEAD] REALITY ANCHOR UNSTABLE — PROCEEDING ANYWAY', type: 'error' },
  { text: '> FULL STACK DEVELOPMENT MODULES LOADED', type: 'ok' },
  { text: '> ACCESSING PORTFOLIO DATABASE...', type: 'normal' },
  { text: '> SOMETHING IS WATCHING. ENTERING PORTFOLIO...', type: 'warn' },
];

const typeColor: Record<string, string> = {
  normal: 'rgba(192,132,252,0.7)',
  ok:     '#00e5ff',
  warn:   '#c084fc',
  error:  '#ff4d6d',
};

interface Props { onComplete: () => void; }

export default function BootSequence({ onComplete }: Props) {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        setLines((prev) => [...prev, line]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 500);
      }
    }, 220);
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
          className="fixed inset-0 z-[10000] flex flex-col justify-center items-start px-8 md:px-24"
          style={{ background: '#000005' }}
        >
          {/* Logo */}
          <div className="mb-8 text-5xl font-bold tracking-widest void-pulse"
            style={{ color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
            JM
          </div>

          {/* Boot lines */}
          <div className="font-mono text-xs md:text-sm space-y-1 max-w-2xl">
            {lines.map((line, idx) => (
              <BootLine key={idx} text={line.text} type={line.type} />
            ))}
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 ml-1"
              style={{ background: '#c084fc' }}
            />
          </div>

          {/* Scan line overlay */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BootLine({ text, type }: { text: string; type: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (type !== 'error') return;
    const cleanup = corruptText(text, 300, setDisplay, () => setDisplay(text));
    return cleanup;
  }, [text, type]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      style={{ color: typeColor[type] ?? typeColor.normal }}
    >
      {display}
    </motion.div>
  );
}
