import '@/styles/animate.css';
import '@/styles/tailwind.css';

import Navigation from '@/components/portfolio/Navigation';
import CursorGlow from '@/components/portfolio/Effects/CursorGlow';
import BootSequenceWrapper from '@/components/portfolio/BootSequence/BootSequenceWrapper';
import { JetBrains_Mono, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white overflow-x-hidden">
        <CursorGlow />
        <BootSequenceWrapper>
          <Navigation />
          {children}
          <footer className="py-8 px-6 border-t border-cyan-400/10 text-center">
            <p className="text-xs font-mono text-gray-600 tracking-widest">
              JON MASROPIAN // {new Date().getFullYear()} // [SYSTEM_CORRUPTION_DETECTED]
            </p>
          </footer>
        </BootSequenceWrapper>
      </body>
    </html>
  );
}
