'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { personal } from '@/data/portfolio';
import { fadeUp } from '@/lib/animations';
import { scrollToSection } from '@/lib/scroll';
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

        {/* Three-column layout: photo | text | logo */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">

          {/* === PHOTO (left) === */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            {/* Outer wrapper — positions sparks without overflow issues */}
            <div className="relative" style={{ width: 'fit-content' }}>
              {/* Spinning border contained inside — no overflow bleed */}
              <div
                className="relative rounded-xl"
                style={{ width: 208, height: 208, padding: '3px', overflow: 'hidden', boxShadow: '0 0 24px rgba(123,47,255,0.35)' }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'conic-gradient(from 0deg, #7b2fff, #00e5ff, #c084fc, #7b2fff)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative w-full h-full rounded-[10px] overflow-hidden" style={{ zIndex: 1 }}>
                  <Image
                    src="/portfolio-picture.png"
                    alt="Jon Masropian"
                    fill
                    sizes="(max-width: 768px) 208px, 208px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
              {/* Corner sparks — outside the clipped container */}
              <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ background: '#00e5ff', boxShadow: '0 0 8px #00e5ff, 0 0 16px rgba(0,229,255,0.6)', zIndex: 2 }}
                animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full" style={{ background: '#c084fc', boxShadow: '0 0 8px #c084fc', zIndex: 2 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 text-center">
              <span className="text-xs font-mono tracking-widest void-flicker"
                style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)', padding: '2px 10px' }}>
                ● SIGNAL ACTIVE
              </span>
            </motion.div>
          </motion.div>

          {/* === TEXT CONTENT (center) === */}
          <div className="flex-1 text-center lg:text-left min-w-0">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
              <span className="text-xs font-mono tracking-widest void-flicker"
                style={{ color: 'rgba(0,229,255,0.5)', letterSpacing: '0.2em' }}>
                // SIGNAL RECOVERED FROM THE VOID //
              </span>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-4">
              <span className="text-xs font-mono tracking-widest void-flicker"
                style={{ color: '#c084fc', border: '1px solid rgba(123,47,255,0.35)', padding: '2px 12px' }}>
                {personal.tagline}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-2 glitch"
              data-text={personal.name}
              style={{ textShadow: '0 0 40px rgba(192,132,252,0.3)' }}
            >
              {personal.name}
            </motion.h1>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <TypingEffect />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-5 max-w-xl text-gray-400 text-sm leading-relaxed font-mono"
            >
              {personal.summary}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mt-7 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}
                className="px-7 py-3 font-mono text-sm tracking-widest font-bold transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(123,47,255,0.8)', color: '#e9d5ff', boxShadow: '0 0 30px rgba(123,47,255,0.4)' }}
              >
                VIEW PROJECTS
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="px-7 py-3 font-mono text-sm tracking-widest transition-all duration-300 hover:scale-105"
                style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.4)', boxShadow: '0 0 15px rgba(0,229,255,0.08)' }}
              >
                CONTACT
              </a>
            </motion.div>
          </div>

          {/* === JM LOGO (right) — pulsing electric circle === */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>

              {/* Pulsing radar rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(123,47,255,0.7)' : 'rgba(0,229,255,0.5)'}`,
                  }}
                  animate={{ scale: [1, 1.7, 2.2], opacity: [0.9, 0.4, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: i * 0.9,
                    ease: 'easeOut',
                  }}
                />
              ))}

              {/* Glowing circle border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(123,47,255,0.6)' }}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(123,47,255,0.6), 0 0 30px rgba(123,47,255,0.2)',
                    '0 0 20px rgba(0,229,255,0.7), 0 0 50px rgba(0,229,255,0.2)',
                    '0 0 12px rgba(192,132,252,0.6), 0 0 30px rgba(192,132,252,0.2)',
                    '0 0 12px rgba(123,47,255,0.6), 0 0 30px rgba(123,47,255,0.2)',
                  ],
                  borderColor: [
                    'rgba(123,47,255,0.6)',
                    'rgba(0,229,255,0.6)',
                    'rgba(192,132,252,0.6)',
                    'rgba(123,47,255,0.6)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Logo image */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden" style={{ zIndex: 1 }}>
                <Image
                  src="/Code_Generated_Image.png"
                  alt="JM Logo"
                  fill
                  sizes="192px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>

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
