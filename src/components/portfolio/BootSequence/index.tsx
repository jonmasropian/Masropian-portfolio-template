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

// Jagged tear points — x% and y% pairs at the 50% mark
// Alternates above/below 50% to create torn-paper look
const X = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
const Y = [51,46,53,47,54,46,52,48,54,47,53,46,55,48,53,46,52,47,54,46,51];

const tearLR = X.map((x, i) => `${x}% ${Y[i]}%`).join(', ');
const tearRL = [...X].reverse().map((x, i) => `${x}% ${Y[Y.length - 1 - i]}%`).join(', ');

const TOP_CLIP    = `polygon(0% 0%, 100% 0%, ${tearRL})`;
const BOTTOM_CLIP = `polygon(${tearLR}, 100% 100%, 0% 100%)`;

interface Props { onComplete: () => void; }

export default function BootSequence({ onComplete }: Props) {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [done, setDone]       = useState(false);
  const [ripping, setRipping] = useState(false);

  // Keep onComplete in a ref so the effect doesn't re-run when the parent re-renders
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
          const t2 = setTimeout(() => {
            setRipping(true);
            const t3 = setTimeout(() => onCompleteRef.current(), 620);
            timers.push(t3);
          }, 350);
          timers.push(t2);
        }, 500);
        timers.push(t1);
      }
    }, 220);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []); // empty — runs once only

  return (
    <>
      {/* ── BOOT SCREEN ── */}
      <AnimatePresence>
        {!ripping && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
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
              {!done && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2.5 h-5 ml-1"
                  style={{ background: '#c084fc' }}
                />
              )}
            </div>

            {/* Scanlines */}
            <div className="pointer-events-none absolute inset-0"
              style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RIP PANELS ── */}
      <AnimatePresence>
        {ripping && (
          <>
            {/* Purple flash at the moment of rip */}
            <motion.div
              className="fixed inset-0 z-[10002] pointer-events-none"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: 'rgba(123,47,255,0.25)' }}
            />

            {/* Top panel — tears upward */}
            <motion.div
              className="fixed inset-0 z-[10001] pointer-events-none"
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: [0.86, 0, 0.07, 1] }}
              style={{ background: '#000005', clipPath: TOP_CLIP }}
            />

            {/* Bottom panel — tears downward */}
            <motion.div
              className="fixed inset-0 z-[10001] pointer-events-none"
              initial={{ y: 0 }}
              animate={{ y: '100%' }}
              transition={{ duration: 0.55, ease: [0.86, 0, 0.07, 1] }}
              style={{ background: '#000005', clipPath: BOTTOM_CLIP }}
            />
          </>
        )}
      </AnimatePresence>
    </>
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
