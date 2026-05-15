'use client';
import { useEffect, useRef, useState } from 'react';
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
  normal: 'rgba(192,132,252,0.75)',
  ok:     '#00e5ff',
  warn:   '#c084fc',
  error:  '#ff4d6d',
};

interface Props { onComplete: () => void; }

export default function BootSequence({ onComplete }: Props) {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [done, setDone] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        const t1 = setTimeout(() => {
          setDone(true);
          const t2 = setTimeout(() => onCompleteRef.current(), 600);
          timers.push(t2);
        }, 500);
        timers.push(t1);
      }
    }, 220);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: '#000005' }}
        >
          {/* Large centered JM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-8xl md:text-9xl font-bold tracking-widest void-pulse mb-4"
            style={{ color: '#c084fc', fontFamily: 'var(--font-mono)' }}
          >
            JM
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
            style={{
              width: '320px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(123,47,255,0.7), rgba(0,229,255,0.5), rgba(123,47,255,0.7), transparent)',
            }}
          />

          {/* Boot lines — centered */}
          <div className="font-mono text-sm md:text-base space-y-2 text-center max-w-2xl px-6">
            {lines.map((line, idx) => (
              <BootLine key={idx} text={line.text} type={line.type} />
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2.5 h-5 ml-1"
              style={{ background: '#c084fc' }}
            />
          </div>

          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)' }}
          />
        </motion.div>
      )}
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      style={{ color: typeColor[type] ?? typeColor.normal }}
    >
      {display}
    </motion.div>
  );
}
