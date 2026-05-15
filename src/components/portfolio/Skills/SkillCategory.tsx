'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SkillBadge from './SkillBadge';

const CYAN_CATEGORIES = ['Cybersecurity', 'IT & Network'];

interface Props {
  category: string;
  items: string[];
  index: number;
}

export default function SkillCategory({ category, items, index }: Props) {
  const { ref, isVisible } = useScrollReveal();
  const isCyan = CYAN_CATEGORIES.includes(category);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="p-6"
      style={{ border: '1px solid rgba(123,47,255,0.15)', background: 'rgba(0,0,5,0.5)' }}
    >
      <div
        className="text-xs font-mono tracking-widest mb-4 pb-2"
        style={{
          color: isCyan ? '#00e5ff' : '#c084fc',
          borderBottom: `1px solid ${isCyan ? 'rgba(0,229,255,0.15)' : 'rgba(123,47,255,0.2)'}`,
        }}
      >
        {category.toUpperCase()}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => (
          <SkillBadge key={skill} skill={skill} variant={isCyan ? 'cyan' : 'purple'} />
        ))}
      </motion.div>
    </motion.div>
  );
}
