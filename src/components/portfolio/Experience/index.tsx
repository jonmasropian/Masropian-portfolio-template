'use client';
import { motion } from 'framer-motion';
import { experience } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import ExperienceCard from './ExperienceCard';

export default function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">03 // EXPERIENCE</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Field <span style={{ color: '#00E5FF' }}>Record</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <ExperienceCard key={exp.id} {...exp} index={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
