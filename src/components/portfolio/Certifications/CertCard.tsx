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
  const statusColor = status === 'Active' ? '#00e5ff' : status === 'Completed' ? '#00e5ff' : '#F59E0B';

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 600, damping: 30 }}
      whileHover={{ y: -4, borderColor: 'rgba(123,47,255,0.6)', boxShadow: '0 0 18px rgba(123,47,255,0.18)' }}
      className="p-6"
      style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(13,0,16,0.5)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <Shield size={24} style={{ color: '#c084fc', filter: 'drop-shadow(0 0 6px rgba(123,47,255,0.5))' }} />
        <div className="flex items-center gap-1.5" style={{ color: statusColor }}>
          <StatusIcon size={12} />
          <span className="text-xs font-mono tracking-widest">{status.toUpperCase()}</span>
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1">{name}</h3>
      <div className="font-mono text-xs tracking-wider mb-1" style={{ color: '#00e5ff' }}>{issuer}</div>
      <div className="font-mono text-xs mb-4" style={{ color: 'rgba(123,47,255,0.6)' }}>{code} // {year}</div>
      <p className="text-xs font-mono leading-relaxed" style={{ color: 'rgba(160,140,200,0.55)' }}>{description}</p>
    </motion.div>
  );
}
