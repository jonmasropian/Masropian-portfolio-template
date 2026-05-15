'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitFork, ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolio';

type Project = typeof projects[0];

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,5,0.85)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-[2001] overflow-auto"
            style={{ border: '1px solid rgba(123,47,255,0.35)', background: '#000005', maxHeight: '85vh', boxShadow: '0 0 40px rgba(123,47,255,0.15)' }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-mono tracking-widest mb-1" style={{ color: '#c084fc' }}>
                    {project.type} // {project.year}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="text-sm mt-1" style={{ color: 'rgba(160,140,200,0.6)' }}>{project.subtitle}</div>
                </div>
                <button onClick={onClose} className="transition-colors" style={{ color: 'rgba(123,47,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#c084fc')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(123,47,255,0.6)')}>
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm leading-relaxed mb-6 font-mono" style={{ color: 'rgba(200,180,240,0.65)' }}>
                {project.description}
              </p>

              <ul className="space-y-2 mb-6">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm font-mono" style={{ color: 'rgba(200,180,240,0.6)' }}>
                    <span className="flex-shrink-0" style={{ color: '#7b2fff' }}>▸</span>{h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((s) => (
                  <span key={s} className="px-2 py-1 text-xs font-mono" style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.25)' }}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono transition-colors"
                    style={{ color: 'rgba(0,229,255,0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,229,255,0.6)')}>
                    <GitFork size={16} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono transition-colors"
                    style={{ color: 'rgba(0,229,255,0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,229,255,0.6)')}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
