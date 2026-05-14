'use client';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp, slideInLeft, slideInRight } from '@/lib/animations';
import MilitaryTimeline from './MilitaryTimeline';
import { Shield, Code, Network } from 'lucide-react';

const pillars = [
  { icon: Shield, label: 'Security First', desc: 'CompTIA Security+ certified. Active Secret Clearance. DoD STIG compliance built into every decision.' },
  { icon: Code, label: 'Full Stack Dev', desc: 'React, Next.js, Node.js, MySQL — from wireframe in Figma to deployed production code.' },
  { icon: Network, label: 'IT & Networks', desc: '22 years maintaining enterprise-grade network infrastructure under real operational pressure.' },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">01 // ABOUT</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            The Operator Behind<br />
            <span style={{ color: '#00E5FF' }}>the Code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <p className="text-gray-400 leading-relaxed mb-6">
              I'm a recently retired U.S. Army veteran with 22 years of service, making a deliberate transition into the technology and web development world. My time in the Army — particularly as a Signal Corps technician and Drill Sergeant — shaped how I approach problems: methodically, under pressure, and with accountability for the outcome.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              I'm not just checking boxes. I use tools like Claude AI and Figma as thinking partners, not shortcuts — my goal is to genuinely understand what I'm building and why. Whether I'm designing a client's e-commerce site, studying JavaScript certification material, or troubleshooting a network, I bring the same mindset: <span className="text-cyan-400">figure it out, do it right, and make it better next time.</span>
            </p>
            <p className="text-gray-400 leading-relaxed">
              I bring something most junior developers don't: two decades of real-world operations experience, a security clearance, and the kind of work ethic that doesn't clock out.
            </p>

            {/* Pillars */}
            <div className="mt-8 space-y-4">
              {pillars.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-4 p-4"
                  style={{ border: '1px solid rgba(0,229,255,0.1)', background: 'rgba(0,229,255,0.02)' }}>
                  <Icon size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-semibold">{label}</div>
                    <div className="text-gray-500 text-xs mt-1 font-mono">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <div className="mb-6">
              <span className="text-xs font-mono text-gray-500 tracking-widest">OPERATIONAL HISTORY</span>
            </div>
            <MilitaryTimeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
