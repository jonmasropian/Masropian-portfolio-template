'use client';
import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import SkillCategory from './SkillCategory';

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #000005, #0d0010, #000005)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: '#00e5ff' }}>02 // CAPABILITY_MATRIX</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Technical <span style={{ color: '#c084fc' }}>Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((cat, idx) => (
            <SkillCategory key={cat.category} category={cat.category} items={cat.items} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
