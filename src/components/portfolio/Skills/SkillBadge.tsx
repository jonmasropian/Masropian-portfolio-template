'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

interface Props {
  skill: string;
}

export default function SkillBadge({ skill }: Props) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05, borderColor: 'rgba(0,229,255,0.8)', boxShadow: '0 0 12px rgba(0,229,255,0.3)' }}
      className="px-3 py-1.5 text-xs font-mono text-gray-300 transition-all duration-200"
      style={{ border: '1px solid rgba(0,229,255,0.2)', background: 'rgba(0,229,255,0.03)' }}
    >
      {skill}
    </motion.div>
  );
}
