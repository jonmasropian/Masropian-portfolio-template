'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SkillBadge from './SkillBadge';

interface Props {
  category: string;
  items: string[];
  index: number;
}

export default function SkillCategory({ category, items, index }: Props) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="p-6"
      style={{ border: '1px solid rgba(0,229,255,0.1)', background: 'rgba(0,0,0,0.4)' }}
    >
      <div className="text-xs font-mono text-cyan-400 tracking-widest mb-4 pb-2"
        style={{ borderBottom: '1px solid rgba(0,229,255,0.15)' }}>
        {category.toUpperCase()}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}
