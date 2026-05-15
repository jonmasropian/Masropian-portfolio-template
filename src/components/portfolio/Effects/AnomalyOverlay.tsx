'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'ANOMALY DETECTED // SECTOR UNKNOWN',
  'SIGNAL ORIGIN: UNRESOLVABLE',
  'REALITY ANCHOR: UNSTABLE',
  'UNKNOWN ENTITY OBSERVING',
  'VOID BREACH // CONTAINMENT FAILING',
  'WARNING: COGNITIVE HAZARD DETECTED',
];

const CORNERS = [
  { top: '2rem',    left: '2rem',  right: 'auto',  bottom: 'auto'  },
  { top: '2rem',    right: '2rem', left: 'auto',   bottom: 'auto'  },
  { bottom: '4rem', left: '2rem',  right: 'auto',  top: 'auto'     },
  { bottom: '4rem', right: '2rem', left: 'auto',   top: 'auto'     },
];

export default function AnomalyOverlay() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  const [corner, setCorner] = useState(CORNERS[0]);

  useEffect(() => {
    const fire = () => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setCorner(CORNERS[Math.floor(Math.random() * CORNERS.length)]);
      setActive(true);
      setTimeout(() => setActive(false), 2500);
    };

    // First fire after 15s, then every ~45s
    const first = setTimeout(fire, 15000);
    const interval = setInterval(fire, 45000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, times: [0, 0.1, 0.85, 1] }}
          style={{
            position: 'fixed',
            zIndex: 9990,
            pointerEvents: 'none',
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: '#ff4d6d',
            border: '1px solid rgba(255, 77, 109, 0.4)',
            background: 'rgba(40, 0, 10, 0.85)',
            padding: '0.4rem 0.8rem',
            backdropFilter: 'blur(4px)',
            ...corner,
          }}
        >
          &#9650; {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
