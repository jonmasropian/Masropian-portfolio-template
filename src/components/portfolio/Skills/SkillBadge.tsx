'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import { corruptText } from '@/lib/corruption';
import { playGlitch, playGrowl } from '@/lib/sounds';

interface Props {
  skill: string;
  variant?: 'purple' | 'cyan';
}

export default function SkillBadge({ skill, variant = 'purple' }: Props) {
  const [display, setDisplay] = useState(skill);

  const isPurple = variant === 'purple';
  const borderColor = isPurple ? 'rgba(123,47,255,0.3)' : 'rgba(0,229,255,0.25)';
  const textColor   = isPurple ? '#c084fc'               : '#00e5ff';
  const bgColor     = isPurple ? 'rgba(123,47,255,0.06)' : 'rgba(0,229,255,0.04)';
  const hoverBorder = isPurple ? 'rgba(123,47,255,0.7)'  : 'rgba(0,229,255,0.6)';
  const hoverShadow = isPurple
    ? '0 0 12px rgba(123,47,255,0.3)'
    : '0 0 12px rgba(0,229,255,0.2)';

  const handleHoverStart = () => {
    corruptText(skill, 120, setDisplay, () => setDisplay(skill));
    // Cyan (ops/security) badges: 40% chance of growl, otherwise glitch
    // Purple (dev) badges: always glitch
    if (!isPurple && Math.random() < 0.4) {
      playGrowl();
    } else {
      playGlitch();
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05, borderColor: hoverBorder, boxShadow: hoverShadow }}
      onHoverStart={handleHoverStart}
      className="px-3 py-1.5 text-xs font-mono transition-all duration-200"
      style={{ border: `1px solid ${borderColor}`, background: bgColor, color: textColor }}
    >
      {display}
    </motion.div>
  );
}
