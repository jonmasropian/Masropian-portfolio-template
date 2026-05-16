'use client';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { personal } from '@/data/portfolio';

export default function TypingEffect() {
  const displayed = useTypingEffect(personal.rotatingTitles);

  return (
    <div className="h-8 md:h-10 flex items-center">
      <span className="text-xl md:text-4xl font-mono" style={{ color: '#00E5FF' }}>
        {displayed}
        <span className="animate-pulse">_</span>
      </span>
    </div>
  );
}
