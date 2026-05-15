import '@/styles/animate.css';
import '@/styles/tailwind.css';

import Navigation from '@/components/portfolio/Navigation';
import CursorGlow from '@/components/portfolio/Effects/CursorGlow';
import VoidBackground from '@/components/portfolio/Effects/VoidBackground';
import AnomalyOverlay from '@/components/portfolio/Effects/AnomalyOverlay';
import AudioUnlock from '@/components/portfolio/Effects/AudioUnlock';
import BootSequenceWrapper from '@/components/portfolio/BootSequence/BootSequenceWrapper';
import { JetBrains_Mono, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#000005] text-white overflow-x-hidden scanlines void-nebula custom-cursor">
        <VoidBackground />
        <AnomalyOverlay />
        <AudioUnlock />
        <CursorGlow />
        <BootSequenceWrapper>
          <Navigation />
          {children}
          <footer className="py-8 px-6 border-t border-purple-500/10 text-center" style={{ position: 'relative', zIndex: 1 }}>
            <p className="text-xs font-mono text-purple-900/60 tracking-widest">
              JON MASROPIAN // {new Date().getFullYear()} // [VOID_SIGNAL_ACTIVE]
            </p>
          </footer>
        </BootSequenceWrapper>
      </body>
    </html>
  );
}
