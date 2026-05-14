import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Experience from '@/components/portfolio/Experience';
import Projects from '@/components/portfolio/Projects';
import CyberLab from '@/components/portfolio/CyberLab';
import Certifications from '@/components/portfolio/Certifications';
import Contact from '@/components/portfolio/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jon Masropian — Full Stack Developer | Army Veteran',
  description: 'Portfolio of Jon Masropian: Full Stack Developer, IT Professional, and U.S. Army Veteran with 22 years of Signal Corps experience. CompTIA Security+ certified. Active Secret Clearance.',
  openGraph: {
    title: 'Jon Masropian — Full Stack Developer',
    description: 'Cybersecurity-aware Full Stack Developer and Army Veteran based in Lawton, OK.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CyberLab />
      <Certifications />
      <Contact />
    </main>
  );
}
