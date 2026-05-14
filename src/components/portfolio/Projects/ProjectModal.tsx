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
            className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-[2001] overflow-auto"
            style={{ border: '1px solid rgba(0,229,255,0.3)', background: '#050505', maxHeight: '85vh' }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400 tracking-widest mb-1">{project.type} // {project.year}</div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="text-gray-500 text-sm mt-1">{project.subtitle}</div>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">{project.description}</p>

              <ul className="space-y-2 mb-6">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-gray-400 text-sm font-mono">
                    <span className="text-cyan-400 flex-shrink-0">▸</span>{h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((s) => (
                  <span key={s} className="px-2 py-1 text-xs font-mono text-cyan-400"
                    style={{ border: '1px solid rgba(0,229,255,0.3)' }}>{s}</span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors">
                    <GitFork size={16} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors">
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
