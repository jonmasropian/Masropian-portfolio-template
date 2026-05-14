'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './index';

export default function BootSequenceWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
