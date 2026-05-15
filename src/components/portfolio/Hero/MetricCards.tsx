'use client';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { staggerContainer, scaleIn } from '@/lib/animations';

export default function MetricCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12"
    >
      {personal.metrics.map((metric) => (
        <motion.div
          key={metric.label}
          variants={scaleIn}
          className="p-4 text-center"
          style={{
            background: 'rgba(123,47,255,0.06)',
            border: '1px solid rgba(123,47,255,0.25)',
            boxShadow: '0 0 10px rgba(123,47,255,0.08)',
          }}
        >
          <div className="text-2xl md:text-3xl font-bold font-mono" style={{ color: '#00e5ff' }}>
            {metric.value}
            <span className="text-sm ml-0.5">{metric.suffix}</span>
          </div>
          <div className="text-xs mt-1 tracking-wider uppercase font-mono" style={{ color: 'rgba(192,132,252,0.55)' }}>
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
