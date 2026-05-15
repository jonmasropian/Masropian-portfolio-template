'use client';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{ width: 40, height: 40, border: '1px solid rgba(192,132,252,0.35)' }}
        animate={{ x: x - 20, y: y - 20 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: '#c084fc', boxShadow: '0 0 10px rgba(192,132,252,0.8)' }}
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
      {/* Ambient glow blob */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)',
        }}
        animate={{ x: x - 150, y: y - 150 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </>
  );
}
