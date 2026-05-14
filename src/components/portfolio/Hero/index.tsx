'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { fadeUp } from '@/lib/animations';
import TypingEffect from './TypingEffect';
import MetricCards from './MetricCards';

const HeroBackground = dynamic(() => import('./HeroBackground'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="home">
      <HeroBackground />

      {/* Radial glow behind text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        {/* Tag line */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
          <span className="text-xs font-mono tracking-widest text-red-500 border border-red-500/30 px-3 py-1">
            {personal.tagline}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-2"
          data-text={personal.name}
        >
          {personal.name}
        </motion.h1>

        {/* Typing titles */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <TypingEffect />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed font-mono"
        >
          {personal.summary}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 font-mono text-sm tracking-widest font-bold text-black transition-all duration-300 hover:scale-105"
            style={{ background: '#00E5FF', boxShadow: '0 0 30px rgba(0,229,255,0.4)' }}
          >
            VIEW PROJECTS
          </a>
          <a
            href="#cyberlab"
            onClick={(e) => { e.preventDefault(); document.querySelector('#cyberlab')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 font-mono text-sm tracking-widest text-cyan-400 transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid rgba(0,229,255,0.5)', boxShadow: '0 0 15px rgba(0,229,255,0.1)' }}
          >
            ACCESS TERMINAL
          </a>
        </motion.div>

        {/* Metric cards */}
        <MetricCards />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-gray-600 tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
