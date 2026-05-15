'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';

const navLinks = [
  { label: 'ABOUT',          href: '#about' },
  { label: 'SKILLS',         href: '#skills' },
  { label: 'EXPERIENCE',     href: '#experience' },
  { label: 'PROJECTS',       href: '#projects' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'CONTACT',        href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    // Delay lets the mobile menu close animation finish before scrolling
    setTimeout(() => scrollToSection(href), 350);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[1000]"
      style={{
        background: scrolled ? 'rgba(0,0,5,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(123,47,255,0.2)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold tracking-widest font-mono void-pulse"
          style={{ color: '#c084fc' }}
        >
          JM
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-3 py-1.5 text-xs tracking-widest font-mono transition-colors duration-200 relative group"
              style={{ color: 'rgba(192,132,252,0.6)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c084fc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(192,132,252,0.6)')}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: '#7b2fff' }} />
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="ml-4 px-4 py-1.5 text-xs tracking-widest font-mono font-bold"
            style={{
              color: '#c084fc',
              border: '1px solid rgba(123,47,255,0.6)',
              background: 'rgba(123,47,255,0.15)',
              boxShadow: '0 0 15px rgba(123,47,255,0.2)',
            }}
          >
            HIRE ME
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: '#c084fc' }} className="lg:hidden">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
            style={{ background: 'rgba(0,0,5,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(123,47,255,0.2)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm tracking-widest font-mono py-2"
                  style={{ color: 'rgba(192,132,252,0.6)', borderBottom: '1px solid rgba(123,47,255,0.1)' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-2 py-2 text-sm tracking-widest font-mono font-bold text-center"
                style={{ color: '#c084fc', border: '1px solid rgba(123,47,255,0.5)', background: 'rgba(123,47,255,0.15)' }}
              >
                HIRE ME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
