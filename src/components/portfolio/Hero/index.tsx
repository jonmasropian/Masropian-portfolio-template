'use client';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { fadeUp } from '@/lib/animations';
import TypingEffect from './TypingEffect';
import MetricCards from './MetricCards';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="home"
      style={{ zIndex: 1 }}>

      {/* Purple radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,47,255,0.07) 0%, transparent 70%)', zIndex: 0 }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-24" style={{ zIndex: 1 }}>
        {/* Void label */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
          <span className="text-xs font-mono tracking-widest void-flicker"
            style={{ color: 'rgba(0,229,255,0.5)', letterSpacing: '0.2em' }}>
            // SIGNAL RECOVERED FROM THE VOID //
          </span>
        </motion.div>

        {/* Tagline badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
          <span className="text-xs font-mono tracking-widest void-flicker"
            style={{ color: '#c084fc', border: '1px solid rgba(123,47,255,0.35)', padding: '2px 12px' }}>
            {personal.tagline}
          </span>
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-2 glitch"
          data-text={personal.name}
          style={{ textShadow: '0 0 40px rgba(192,132,252,0.3)' }}
        >
          {personal.name}
        </motion.h1>

        {/* Typing titles */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
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
            className="px-8 py-3 font-mono text-sm tracking-widest font-bold transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(123,47,255,0.8)', color: '#e9d5ff', boxShadow: '0 0 30px rgba(123,47,255,0.4)' }}
          >
            VIEW PROJECTS
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
          <span className="text-xs font-mono tracking-widest" style={{ color: 'rgba(123,47,255,0.5)' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, #7b2fff, transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
