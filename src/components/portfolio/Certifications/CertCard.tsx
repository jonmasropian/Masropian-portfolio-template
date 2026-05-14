'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import { Shield, CheckCircle, Clock } from 'lucide-react';

interface Props {
  name: string;
  issuer: string;
  code: string;
  status: string;
  year: string;
  description: string;
  index: number;
  isVisible: boolean;
}

export default function CertCard({ name, issuer, code, status, year, description, index, isVisible }: Props) {
  const isActive = status === 'Active' || status === 'Completed';
  const StatusIcon = isActive ? CheckCircle : Clock;
  const statusColor = status === 'Active' ? '#00E5FF' : status === 'Completed' ? '#22C55E' : '#F59E0B';

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, borderColor: 'rgba(0,229,255,0.5)' }}
      className="p-6 transition-all duration-300"
      style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <Shield size={24} className="text-cyan-400" style={{ filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.5))' }} />
        <div className="flex items-center gap-1.5" style={{ color: statusColor }}>
          <StatusIcon size={12} />
          <span className="text-xs font-mono tracking-widest">{status.toUpperCase()}</span>
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1">{name}</h3>
      <div className="text-cyan-400 font-mono text-xs tracking-wider mb-1">{issuer}</div>
      <div className="text-gray-600 font-mono text-xs mb-4">{code} // {year}</div>
      <p className="text-gray-500 text-xs font-mono leading-relaxed">{description}</p>
    </motion.div>
  );
}
