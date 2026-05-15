'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolio';

type Project = typeof projects[0];

interface Props {
  project: Project;
  index: number;
  isVisible: boolean;
  onClick: (p: Project) => void;
}

export default function ProjectCard({ project, index, isVisible, onClick }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -4, borderColor: 'rgba(123,47,255,0.5)' }}
      onClick={() => onClick(project)}
      className="p-6 cursor-pointer transition-all duration-300 group"
      style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(13,0,16,0.6)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-gray-500 tracking-widest mb-1">{project.type} // {project.year}</div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
          <div className="text-gray-500 text-sm mt-1">{project.subtitle}</div>
        </div>
        <ExternalLink size={16} className="text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
      </div>

      <p className="text-gray-500 text-sm font-mono leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="text-xs font-mono px-2 py-0.5"
            style={{ border: '1px solid rgba(123,47,255,0.15)', color: 'rgba(192,132,252,0.5)' }}>{s}</span>
        ))}
        {project.stack.length > 5 && (
          <span className="text-xs font-mono text-gray-600">+{project.stack.length - 5}</span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-mono tracking-widest ${project.status === 'Live' ? 'text-green-400' : project.status === 'In Progress' ? 'text-yellow-400' : 'text-gray-500'}`}>
          ● {project.status.toUpperCase()}
        </span>
        <span className="text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">VIEW DETAILS →</span>
      </div>
    </motion.div>
  );
}
