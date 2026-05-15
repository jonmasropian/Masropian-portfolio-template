'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { personal } from '@/data/portfolio';
import { fadeUp } from '@/lib/animations';
import TypingEffect from './TypingEffect';
import MetricCards from './MetricCards';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" id="home"
      style={{ zIndex: 1 }}>

      {/* Purple radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,47,255,0.07) 0%, transparent 70%)', zIndex: 0 }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 w-full" style={{ zIndex: 1 }}>

        {/* Two-column layout: photo left, text right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* === PHOTO === */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              {/* Spinning electric border */}
              <motion.div
                className="absolute rounded-xl"
                style={{
                  inset: '-4px',
                  background: 'conic-gradient(from 0deg, #7b2fff, #00e5ff, #c084fc, #7b2fff)',
                  filter: 'blur(2px)',
                  zIndex: 0,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              {/* Sharp border on top for crispness */}
              <motion.div
                className="absolute rounded-xl"
                style={{
                  inset: '-2px',
                  background: 'conic-gradient(from 0deg, #7b2fff, #00e5ff, #c084fc, #7b2fff)',
                  zIndex: 0,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              {/* Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ zIndex: 1 }}>
                <Image
                  src="/portfolio-picture.png"
                  alt="Jon Masropian"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Corner spark accents */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ background: '#00e5ff', boxShadow: '0 0 8px #00e5ff, 0 0 16px rgba(0,229,255,0.6)', zIndex: 2 }}
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full"
                style={{ background: '#c084fc', boxShadow: '0 0 8px #c084fc, 0 0 16px rgba(192,132,252,0.6)', zIndex: 2 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              />
            </div>

            {/* Status tag below photo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-4 text-center"
            >
              <span className="text-xs font-mono tracking-widest void-flicker"
                style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)', padding: '2px 10px' }}>
                ● SIGNAL ACTIVE
              </span>
            </motion.div>
          </motion.div>

          {/* === TEXT CONTENT === */}
          <div className="flex-1 text-center lg:text-left">
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
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 glitch"
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
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3 font-mono text-sm tracking-widest font-bold transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(123,47,255,0.8)', color: '#e9d5ff', boxShadow: '0 0 30px rgba(123,47,255,0.4)' }}
              >
                VIEW PROJECTS
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3 font-mono text-sm tracking-widest transition-all duration-300 hover:scale-105"
                style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.4)', boxShadow: '0 0 15px rgba(0,229,255,0.08)' }}
              >
                CONTACT
              </a>
            </motion.div>
          </div>
        </div>

        {/* Metric cards — full width below */}
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
