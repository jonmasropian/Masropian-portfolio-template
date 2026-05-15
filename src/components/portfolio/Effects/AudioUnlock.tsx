'use client';
import { useEffect } from 'react';
import { unlockAudio } from '@/lib/sounds';

export default function AudioUnlock() {
  useEffect(() => {
    const handle = () => unlockAudio();
    document.addEventListener('click', handle, { once: true });
    return () => document.removeEventListener('click', handle);
  }, []);

  return null;
}
