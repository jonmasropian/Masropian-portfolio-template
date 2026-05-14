'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { ref, isVisible } = useScrollReveal();
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #000, #050505, #000)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">04 // PROJECTS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Deployed <span style={{ color: '#00E5FF' }}>Missions</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-3">Click any card for full details</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isVisible={isVisible}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
