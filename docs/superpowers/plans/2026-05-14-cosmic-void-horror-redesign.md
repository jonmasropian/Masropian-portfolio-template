# Cosmic Void Horror — Full Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the entire portfolio from cyan cyberpunk to Cosmic Void Horror — deep purple palette, fixed lightweight canvas background (sparse stars + rotating sigil), full-site horror effects (anomaly overlay, char corruption, glitch colors), and section-by-section horror framing.

**Architecture:** A single fixed `<canvas>` (VoidBackground) renders behind all content at z-index 0. An AnomalyOverlay fires random horror warnings every ~45s. A corruption utility powers hover/timed char-glitch effects. All other changes are inline style/className updates to existing components.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS v4, Framer Motion, Canvas 2D API

---

## Task 1: Update Color Palette and CSS Foundations

**Files:**
- Modify: `src/lib/theme.ts`
- Modify: `src/styles/tailwind.css`

- [ ] **Step 1: Replace theme.ts with the void purple palette**

Replace the entire content of `src/lib/theme.ts`:

```typescript
export const colors = {
  // Purple — the void
  purple:        '#7b2fff',
  purpleDim:     '#3b0070',
  purpleMid:     '#8b5cf6',
  purplePale:    '#c084fc',
  purpleGlow:    'rgba(123, 47, 255, 0.15)',

  // Cyan — the dying machine signal (kept)
  cyan:          '#00e5ff',
  cyanDim:       '#00b8d4',
  cyanGlow:      'rgba(0, 229, 255, 0.12)',

  // Horror red — anomaly/error only
  horrorRed:     '#ff4d6d',

  // Backgrounds
  voidBlack:     '#000005',
  voidDeep:      '#0d0010',
  midGray:       '#111111',
  borderGray:    '#1a0030',

  // Text
  textPrimary:   '#ffffff',
  textSecondary: '#a0a0a0',
  textPurple:    '#c084fc',
  textCyan:      '#00e5ff',
} as const;

export const fonts = {
  mono: 'var(--font-mono)',
  sans: 'var(--font-sans)',
} as const;

export const glow = {
  purple:      '0 0 20px rgba(123, 47, 255, 0.5), 0 0 60px rgba(123, 47, 255, 0.2)',
  purpleSmall: '0 0 10px rgba(123, 47, 255, 0.4)',
  cyan:        '0 0 20px rgba(0, 229, 255, 0.4)',
  cyanSmall:   '0 0 10px rgba(0, 229, 255, 0.3)',
  red:         '0 0 20px rgba(255, 77, 109, 0.5)',
} as const;
```

- [ ] **Step 2: Update CSS custom properties and effects in tailwind.css**

Find and replace the `/* ===== CYBERPUNK GLOBALS =====` block at the bottom of `src/styles/tailwind.css` (lines 846–954) with:

```css
/* ===== VOID HORROR GLOBALS ===== */

:root {
  --purple:       #7b2fff;
  --purple-dim:   #3b0070;
  --purple-pale:  #c084fc;
  --cyan:         #00e5ff;
  --horror-red:   #ff4d6d;
  --void-black:   #000005;
  --void-deep:    #0d0010;
  --border-gray:  #1a0030;
}

/* Fixed void nebula background */
.void-nebula::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 30%, rgba(90, 0, 160, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(50, 0, 100, 0.2) 0%, transparent 45%),
    radial-gradient(ellipse at 60% 10%, rgba(0, 80, 120, 0.08) 0%, transparent 40%);
  pointer-events: none;
  z-index: 0;
}

/* Scan line overlay — slightly intensified */
.scanlines::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

/* Hide native cursor when custom cursor active */
.custom-cursor * {
  cursor: none !important;
}

html {
  scroll-behavior: smooth;
  background: #000005;
}

body {
  background: #000005;
  color: #fff;
  overflow-x: hidden;
}

/* Void scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0d0010; }
::-webkit-scrollbar-thumb { background: #7b2fff; border-radius: 2px; }

/* Glitch text — purple/void offset colors */
@keyframes glitch {
  0%, 100% { clip-path: inset(0 0 98% 0); transform: translateX(-2px); }
  20%       { clip-path: inset(30% 0 50% 0); transform: translateX(2px); }
  40%       { clip-path: inset(60% 0 20% 0); transform: translateX(-1px); }
  60%       { clip-path: inset(10% 0 80% 0); transform: translateX(1px); }
  80%       { clip-path: inset(80% 0 5% 0); transform: translateX(-2px); }
}

.glitch { position: relative; }
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
.glitch::before {
  color: #c084fc;
  animation: glitch 3s infinite linear;
  opacity: 0.7;
}
.glitch::after {
  color: #7b2fff;
  animation: glitch 3s infinite linear reverse;
  opacity: 0.5;
}

/* Logo pulse animation */
@keyframes voidPulse {
  0%, 100% { text-shadow: 0 0 10px rgba(192,132,252,0.4), 0 0 20px rgba(123,47,255,0.2); }
  50%       { text-shadow: 0 0 20px rgba(192,132,252,0.7), 0 0 40px rgba(123,47,255,0.4), 0 0 60px rgba(123,47,255,0.1); }
}
.void-pulse { animation: voidPulse 3s ease-in-out infinite; }

/* Flicker animation for horror tags */
@keyframes voidFlicker {
  0%, 92%, 96%, 100% { opacity: 1; }
  93%, 95%            { opacity: 0.15; }
}
.void-flicker { animation: voidFlicker 5s infinite; }

/* Section spacing */
.section {
  padding: 6rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Void neon border — purple */
.void-border {
  border: 1px solid rgba(123, 47, 255, 0.3);
  box-shadow: 0 0 10px rgba(123, 47, 255, 0.1), inset 0 0 10px rgba(123, 47, 255, 0.05);
}

/* Cyan border — machine/data elements */
.cyan-border {
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.1), inset 0 0 10px rgba(0, 229, 255, 0.05);
}

/* Terminal text style */
.terminal-text {
  font-family: 'Courier New', 'Consolas', monospace;
  color: #00e5ff;
}
```

- [ ] **Step 3: Verify dev server still compiles**

```bash
npm run dev
```

Expected: No compile errors. Page loads (still looks old — canvas not mounted yet).

- [ ] **Step 4: Commit**

```bash
git add src/lib/theme.ts src/styles/tailwind.css
git commit -m "feat: update color palette and CSS to Cosmic Void Horror theme"
```

---

## Task 2: Create VoidBackground Canvas Component

**Files:**
- Create: `src/components/portfolio/Effects/VoidBackground.tsx`

- [ ] **Step 1: Create the file**

```typescript
'use client';
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  glow: boolean;
}

const STAR_COLORS = ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff',
                     '#c084fc', '#c084fc', '#c084fc', '#00e5ff', '#00e5ff'];

function buildStars(w: number, h: number): Star[] {
  return Array.from({ length: 150 }, () => {
    const roll = Math.random();
    const size = roll < 0.7 ? 1 : roll < 0.9 ? 2 : 3;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      size,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      glow: size >= 2,
    };
  });
}

function drawSigil(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, angle: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = '#7b2fff';
  ctx.lineWidth = 0.8;

  // Outer dashed ring
  ctx.setLineDash([6, 10]);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  // Inner ring
  ctx.setLineDash([3, 8]);
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  // Axis and diagonal lines
  ctx.setLineDash([]);
  ctx.lineWidth = 0.4;
  ctx.strokeStyle = '#5b00c0';
  [[0, -r, 0, r], [-r, 0, r, 0],
   [-r * 0.7, -r * 0.7, r * 0.7, r * 0.7],
   [r * 0.7, -r * 0.7, -r * 0.7, r * 0.7]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });

  // Tentacle curves
  ctx.strokeStyle = '#7b2fff';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.07;
  const arms = [
    [0, 0, -r * 0.35, -r * 0.55, -r * 0.95, -r * 0.8],
    [0, 0,  r * 0.35, -r * 0.55,  r * 0.95, -r * 0.8],
    [0, 0, -r * 0.5,  r * 0.35, -r * 0.7,   r * 0.95],
    [0, 0,  r * 0.5,  r * 0.35,  r * 0.7,   r * 0.95],
    [0, 0, -r * 0.65, r * 0.1,  -r,          0       ],
    [0, 0,  r * 0.65, r * 0.1,   r,          0       ],
  ];
  arms.forEach(([x1, y1, cpx, cpy, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(cpx, cpy, x2, y2); ctx.stroke();
  });

  // Center point
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function VoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = buildStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Throttle to ~30fps
    const FPS = 30;
    const INTERVAL = 1000 / FPS;
    // Sigil completes 1 revolution per 90 seconds
    const RPM = (2 * Math.PI) / (90 * FPS);

    const draw = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (timestamp - lastFrameRef.current < INTERVAL) return;
      lastFrameRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      starsRef.current.forEach((star) => {
        ctx.save();
        if (star.glow) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = star.color;
        }
        ctx.fillStyle = star.color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw rotating sigil
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.38;
      angleRef.current += RPM;
      drawSigil(ctx, cx, cy, radius, angleRef.current);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Effects/VoidBackground.tsx
git commit -m "feat: add VoidBackground fixed canvas with stars and rotating sigil"
```

---

## Task 3: Create AnomalyOverlay Component

**Files:**
- Create: `src/components/portfolio/Effects/AnomalyOverlay.tsx`

- [ ] **Step 1: Create the file**

```typescript
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'ANOMALY DETECTED // SECTOR UNKNOWN',
  'SIGNAL ORIGIN: UNRESOLVABLE',
  'REALITY ANCHOR: UNSTABLE',
  'UNKNOWN ENTITY OBSERVING',
  'VOID BREACH // CONTAINMENT FAILING',
  'WARNING: COGNITIVE HAZARD DETECTED',
];

const CORNERS = [
  { top: '2rem',    left: '2rem',  right: 'auto',  bottom: 'auto'  },
  { top: '2rem',    right: '2rem', left: 'auto',   bottom: 'auto'  },
  { bottom: '4rem', left: '2rem',  right: 'auto',  top: 'auto'     },
  { bottom: '4rem', right: '2rem', left: 'auto',   top: 'auto'     },
];

export default function AnomalyOverlay() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  const [corner, setCorner] = useState(CORNERS[0]);

  useEffect(() => {
    const fire = () => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setCorner(CORNERS[Math.floor(Math.random() * CORNERS.length)]);
      setActive(true);
      setTimeout(() => setActive(false), 2500);
    };

    // First fire after 15s, then every ~45s
    const first = setTimeout(fire, 15000);
    const interval = setInterval(fire, 45000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, times: [0, 0.1, 0.85, 1] }}
          style={{
            position: 'fixed',
            zIndex: 9990,
            pointerEvents: 'none',
            fontFamily: 'monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: '#ff4d6d',
            border: '1px solid rgba(255, 77, 109, 0.4)',
            background: 'rgba(40, 0, 10, 0.85)',
            padding: '0.4rem 0.8rem',
            backdropFilter: 'blur(4px)',
            ...corner,
          }}
        >
          &#9650; {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Effects/AnomalyOverlay.tsx
git commit -m "feat: add AnomalyOverlay random horror warning events"
```

---

## Task 4: Create Char Corruption Utility

**Files:**
- Create: `src/lib/corruption.ts`

- [ ] **Step 1: Create the file**

```typescript
const GLITCH_CHARS = '░▒▓█▀▄╬╪╫■□▪▫';

/**
 * Corrupts `count` random chars in `text` for `durationMs`, then calls `restore`.
 * Returns a cleanup function.
 */
export function corruptText(
  text: string,
  durationMs: number,
  onCorrupt: (s: string) => void,
  onRestore: () => void,
): () => void {
  const count = Math.min(2, Math.floor(text.length * 0.15) || 1);
  const chars = text.split('');
  const indices = new Set<number>();

  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * chars.length));
  }

  const corrupted = chars.map((c, i) =>
    indices.has(i) ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : c
  ).join('');

  onCorrupt(corrupted);
  const t = setTimeout(onRestore, durationMs);
  return () => clearTimeout(t);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/corruption.ts
git commit -m "feat: add char corruption utility for horror glitch effects"
```

---

## Task 5: Mount Global Effects in Layout

**Files:**
- Modify: `src/app/(site)/layout.tsx`

- [ ] **Step 1: Update layout.tsx**

Replace the entire file content:

```typescript
import '@/styles/animate.css';
import '@/styles/tailwind.css';

import Navigation from '@/components/portfolio/Navigation';
import CursorGlow from '@/components/portfolio/Effects/CursorGlow';
import VoidBackground from '@/components/portfolio/Effects/VoidBackground';
import AnomalyOverlay from '@/components/portfolio/Effects/AnomalyOverlay';
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
```

- [ ] **Step 2: Verify in browser**

Run `npm run dev`. Open http://localhost:3000. You should see:
- Black/deep purple background
- ~150 sparse stars scattered across the fixed viewport
- Very faint rotating sigil geometry in the center
- Purple scanlines overlay
- Footer text updated

- [ ] **Step 3: Commit**

```bash
git add src/app/(site)/layout.tsx
git commit -m "feat: mount VoidBackground, AnomalyOverlay in layout; update body classes"
```

---

## Task 6: Update CursorGlow to Purple

**Files:**
- Modify: `src/components/portfolio/Effects/CursorGlow.tsx`

- [ ] **Step 1: Replace file content**

```typescript
'use client';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{ width: 40, height: 40, border: '1px solid rgba(192,132,252,0.35)' }}
        animate={{ x: x - 20, y: y - 20 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: '#c084fc', boxShadow: '0 0 10px rgba(192,132,252,0.8)' }}
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
      {/* Ambient glow blob */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)',
        }}
        animate={{ x: x - 150, y: y - 150 }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Effects/CursorGlow.tsx
git commit -m "feat: update cursor glow to void purple"
```

---

## Task 7: Update Boot Sequence

**Files:**
- Modify: `src/components/portfolio/BootSequence/index.tsx`

- [ ] **Step 1: Replace file content**

```typescript
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { corruptText } from '@/lib/corruption';

const bootLines = [
  { text: '> INITIALIZING VOID_OS v2.077...', type: 'normal' },
  { text: '> LOADING KERNEL MODULES... [OK]', type: 'ok' },
  { text: '> MOUNTING SECURE PARTITIONS... [OK]', type: 'ok' },
  { text: '> WARNING: ANOMALOUS SIGNAL DETECTED IN SECTOR 7', type: 'warn' },
  { text: '> CHECKING CLEARANCE LEVEL... SECRET [VERIFIED]', type: 'ok' },
  { text: '> LOADING OPERATOR PROFILE: JON MASROPIAN', type: 'normal' },
  { text: '> SIGNAL CORPS // 25H // 22 YEARS SERVICE', type: 'normal' },
  { text: '> [ERR_0xDEAD] REALITY ANCHOR UNSTABLE — PROCEEDING ANYWAY', type: 'error' },
  { text: '> FULL STACK DEVELOPMENT MODULES LOADED', type: 'ok' },
  { text: '> ACCESSING PORTFOLIO DATABASE...', type: 'normal' },
  { text: '> SOMETHING IS WATCHING. ENTERING PORTFOLIO...', type: 'warn' },
];

const typeColor: Record<string, string> = {
  normal: 'rgba(192,132,252,0.7)',
  ok:     '#00e5ff',
  warn:   '#c084fc',
  error:  '#ff4d6d',
};

interface Props { onComplete: () => void; }

export default function BootSequence({ onComplete }: Props) {
  const [lines, setLines] = useState<{ text: string; type: string }[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        setLines((prev) => [...prev, line]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 500);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex flex-col justify-center items-start px-8 md:px-24"
          style={{ background: '#000005' }}
        >
          {/* Logo */}
          <div className="mb-8 text-5xl font-bold tracking-widest void-pulse"
            style={{ color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
            JM
          </div>

          {/* Boot lines */}
          <div className="font-mono text-xs md:text-sm space-y-1 max-w-2xl">
            {lines.map((line, idx) => (
              <BootLine key={idx} text={line.text} type={line.type} />
            ))}
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 ml-1"
              style={{ background: '#c084fc' }}
            />
          </div>

          {/* Scan line overlay */}
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)' }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BootLine({ text, type }: { text: string; type: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (type !== 'error') return;
    const cleanup = corruptText(text, 300, setDisplay, () => setDisplay(text));
    return cleanup;
  }, [text, type]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      style={{ color: typeColor[type] ?? typeColor.normal }}
    >
      {display}
    </motion.div>
  );
}
```

- [ ] **Step 2: Check browser**

Run `npm run dev`. On first load the boot sequence should show with purple/cyan/red color-coded lines, logo pulsing purple, cursor purple.

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/BootSequence/index.tsx
git commit -m "feat: update boot sequence with horror lines and void purple styling"
```

---

## Task 8: Update Navigation

**Files:**
- Modify: `src/components/portfolio/Navigation/index.tsx`

- [ ] **Step 1: Replace file content**

```typescript
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'ABOUT',          href: '#about' },
  { label: 'SKILLS',         href: '#skills' },
  { label: 'EXPERIENCE',     href: '#experience' },
  { label: 'PROJECTS',       href: '#projects' },
  { label: 'CYBER LAB',      href: '#cyberlab' },
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Navigation/index.tsx
git commit -m "feat: update navigation to void purple styling"
```

---

## Task 9: Update Hero Section

**Files:**
- Modify: `src/components/portfolio/Hero/index.tsx`
- Delete: `src/components/portfolio/Hero/HeroBackground.tsx` (replaced by global VoidBackground)

- [ ] **Step 1: Replace Hero/index.tsx**

```typescript
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
          <a
            href="#cyberlab"
            onClick={(e) => { e.preventDefault(); document.querySelector('#cyberlab')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 font-mono text-sm tracking-widest transition-all duration-300 hover:scale-105"
            style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.4)', boxShadow: '0 0 15px rgba(0,229,255,0.08)' }}
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
```

- [ ] **Step 2: Delete HeroBackground.tsx**

```bash
rm "src/components/portfolio/Hero/HeroBackground.tsx"
```

- [ ] **Step 3: Verify no import errors**

```bash
npm run dev
```

Expected: No errors referencing HeroBackground. Hero section visible with purple glow on name.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Hero/index.tsx
git rm src/components/portfolio/Hero/HeroBackground.tsx
git commit -m "feat: update hero section; remove Three.js HeroBackground replaced by global canvas"
```

---

## Task 10: Update MetricCards

**Files:**
- Modify: `src/components/portfolio/Hero/MetricCards.tsx`

- [ ] **Step 1: Replace MetricCards.tsx**

```typescript
'use client';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { staggerContainer, scaleIn } from '@/lib/animations';

export default function MetricCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12"
    >
      {personal.metrics.map((metric) => (
        <motion.div
          key={metric.label}
          variants={scaleIn}
          className="p-4 text-center"
          style={{
            background: 'rgba(123,47,255,0.06)',
            border: '1px solid rgba(123,47,255,0.25)',
            boxShadow: '0 0 10px rgba(123,47,255,0.08)',
          }}
        >
          <div className="text-2xl md:text-3xl font-bold font-mono" style={{ color: '#00e5ff' }}>
            {metric.value}
            <span className="text-sm ml-0.5">{metric.suffix}</span>
          </div>
          <div className="text-xs mt-1 tracking-wider uppercase font-mono" style={{ color: 'rgba(192,132,252,0.55)' }}>
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Hero/MetricCards.tsx
git commit -m "feat: update metric cards to void purple borders"
```

---

## Task 11: Update About Section

**Files:**
- Modify: `src/components/portfolio/About/index.tsx`
- Modify: `src/components/portfolio/About/MilitaryTimeline.tsx`

- [ ] **Step 1: Update About/index.tsx**

Make these targeted changes:

1. Change the background accent div:
```typescript
// Replace rgba(0,229,255,0.04) with rgba(123,47,255,0.04)
style={{ background: 'radial-gradient(circle, rgba(123,47,255,0.04) 0%, transparent 70%)' }}
```

2. Change the section label:
```typescript
// Was: text-cyan-400, '01 // ABOUT'
<span className="text-xs font-mono tracking-widest" style={{ color: '#00e5ff' }}>
  01 // OPERATIVE_FILE
</span>
```

3. Change the h2 accent span:
```typescript
// Was: color: '#00E5FF'
<span style={{ color: '#c084fc' }}>the Void</span>
```

4. Change the inline-highlighted text in paragraph:
```typescript
// Was: text-cyan-400
<span style={{ color: '#00e5ff' }}>figure it out...</span>
```

5. Change pillar card borders and icons:
```typescript
// Border: rgba(0,229,255,0.1) → rgba(123,47,255,0.15)
// Background: rgba(0,229,255,0.02) → rgba(123,47,255,0.03)
// Icon className: text-cyan-400 → keep as cyan (Shield/Code/Network icons stay cyan — they are functional)
style={{ border: '1px solid rgba(123,47,255,0.15)', background: 'rgba(123,47,255,0.03)' }}
```

6. Add anomaly bar after the timeline's parent div. After the closing `</motion.div>` of the right column (timeline column), add:
```typescript
<div className="mt-8 text-xs font-mono void-flicker"
  style={{ color: '#ff4d6d', border: '1px solid rgba(255,77,109,0.25)', padding: '0.4rem 0.75rem', background: 'rgba(40,0,10,0.4)' }}>
  &#9650; ANOMALY: 22 years of encrypted service records detected
</div>
```

- [ ] **Step 2: Update MilitaryTimeline.tsx**

Replace the entire file:

```typescript
'use client';
import { motion } from 'framer-motion';
import { militaryTimeline } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { staggerContainer, fadeUp } from '@/lib/animations';

export default function MilitaryTimeline() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="relative"
    >
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, rgba(123,47,255,0.6), rgba(123,47,255,0.15), transparent)' }} />

      <div className="space-y-8 pl-12">
        {militaryTimeline.map((item, idx) => (
          <motion.div key={idx} variants={fadeUp} className="relative">
            {/* Node — cyan for current/last, purple for past */}
            <div
              className="absolute -left-[2.35rem] w-3 h-3 rounded-full border-2"
              style={{
                borderColor: idx === militaryTimeline.length - 1 ? '#00e5ff' : '#7b2fff',
                background: '#000005',
                boxShadow: idx === militaryTimeline.length - 1
                  ? '0 0 10px rgba(0,229,255,0.7)'
                  : '0 0 10px rgba(123,47,255,0.7)',
              }}
            />
            {/* Year */}
            <div className="text-xs font-mono mb-1 tracking-widest"
              style={{ color: idx === militaryTimeline.length - 1 ? '#00e5ff' : '#c084fc' }}>
              {item.year}
            </div>
            {/* Event */}
            <div className="text-white font-semibold text-sm">{item.event}</div>
            {/* Detail */}
            <div className="text-xs mt-1 font-mono" style={{ color: 'rgba(160,140,200,0.6)' }}>{item.detail}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/About/index.tsx src/components/portfolio/About/MilitaryTimeline.tsx
git commit -m "feat: update About section and MilitaryTimeline to void horror theme"
```

---

## Task 12: Update Skills Section

**Files:**
- Modify: `src/components/portfolio/Skills/index.tsx`
- Modify: `src/components/portfolio/Skills/SkillBadge.tsx`
- Modify: `src/components/portfolio/Skills/SkillCategory.tsx`

- [ ] **Step 1: Update Skills/index.tsx**

Change the section label and heading accent:
```typescript
// Label: text-cyan-400 → cyan (section numbers stay cyan as data markers)
<span className="text-xs font-mono tracking-widest" style={{ color: '#00e5ff' }}>02 // CAPABILITY_MATRIX</span>

// Heading accent
<span style={{ color: '#c084fc' }}>Arsenal</span>

// Background gradient: keep but shift to void tones
style={{ background: 'linear-gradient(to bottom, #000005, #0d0010, #000005)' }}
```

- [ ] **Step 2: Update Skills/SkillBadge.tsx**

The badge needs to accept a `variant` prop for the dual-color system. Replace the file:

```typescript
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import { corruptText } from '@/lib/corruption';

interface Props {
  skill: string;
  variant?: 'purple' | 'cyan';
}

export default function SkillBadge({ skill, variant = 'purple' }: Props) {
  const [display, setDisplay] = useState(skill);

  const isPurple = variant === 'purple';
  const borderColor = isPurple ? 'rgba(123,47,255,0.3)' : 'rgba(0,229,255,0.25)';
  const textColor   = isPurple ? '#c084fc'               : '#00e5ff';
  const bgColor     = isPurple ? 'rgba(123,47,255,0.06)' : 'rgba(0,229,255,0.04)';
  const hoverBorder = isPurple ? 'rgba(123,47,255,0.7)'  : 'rgba(0,229,255,0.6)';
  const hoverShadow = isPurple
    ? '0 0 12px rgba(123,47,255,0.3)'
    : '0 0 12px rgba(0,229,255,0.2)';

  const handleHoverStart = () => {
    corruptText(skill, 120, setDisplay, () => setDisplay(skill));
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05, borderColor: hoverBorder, boxShadow: hoverShadow }}
      onHoverStart={handleHoverStart}
      className="px-3 py-1.5 text-xs font-mono transition-all duration-200"
      style={{ border: `1px solid ${borderColor}`, background: bgColor, color: textColor }}
    >
      {display}
    </motion.div>
  );
}
```

- [ ] **Step 3: Replace SkillCategory.tsx**

```typescript
'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SkillBadge from './SkillBadge';

const CYAN_CATEGORIES = ['Networking & Security', 'IT Operations', 'Cybersecurity', 'DevOps & Tools'];

interface Props {
  category: string;
  items: string[];
  index: number;
}

export default function SkillCategory({ category, items, index }: Props) {
  const { ref, isVisible } = useScrollReveal();
  const isCyan = CYAN_CATEGORIES.includes(category);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="p-6"
      style={{ border: '1px solid rgba(123,47,255,0.15)', background: 'rgba(0,0,5,0.5)' }}
    >
      <div
        className="text-xs font-mono tracking-widest mb-4 pb-2"
        style={{
          color: isCyan ? '#00e5ff' : '#c084fc',
          borderBottom: `1px solid ${isCyan ? 'rgba(0,229,255,0.15)' : 'rgba(123,47,255,0.2)'}`,
        }}
      >
        {category.toUpperCase()}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => (
          <SkillBadge key={skill} skill={skill} variant={isCyan ? 'cyan' : 'purple'} />
        ))}
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Skills/index.tsx src/components/portfolio/Skills/SkillBadge.tsx src/components/portfolio/Skills/SkillCategory.tsx
git commit -m "feat: update Skills section with dual-color badges and void styling"
```

---

## Task 13: Update Experience Section

**Files:**
- Modify: `src/components/portfolio/Experience/index.tsx`
- Modify: `src/components/portfolio/Experience/ExperienceCard.tsx`

- [ ] **Step 1: Replace Experience/index.tsx**

```typescript
'use client';
import { motion } from 'framer-motion';
import { experience } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import ExperienceCard from './ExperienceCard';

export default function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: '#00e5ff' }}>03 // MISSION_LOGS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Field <span style={{ color: '#c084fc' }}>Record</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <ExperienceCard key={exp.id} {...exp} index={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace ExperienceCard.tsx**

```typescript
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { fadeUp } from '@/lib/animations';

interface Props {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  index: number;
  isVisible: boolean;
}

export default function ExperienceCard({ role, company, period, highlights, index, isVisible }: Props) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
      className="overflow-hidden"
      style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(13,0,16,0.5)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between gap-4 transition-colors"
        style={{ background: expanded ? 'rgba(123,47,255,0.05)' : 'transparent' }}
      >
        <div>
          <div className="text-white font-semibold text-lg">{role}</div>
          <div className="font-mono text-sm mt-1" style={{ color: '#c084fc' }}>{company}</div>
          <div className="font-mono text-xs mt-1 tracking-widest" style={{ color: '#00e5ff' }}>{period}</div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="flex-shrink-0 mt-1" style={{ color: '#c084fc' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="px-6 pb-6 space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm font-mono" style={{ color: 'rgba(200,180,240,0.65)' }}>
                  <span className="flex-shrink-0" style={{ color: '#7b2fff' }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Experience/index.tsx src/components/portfolio/Experience/ExperienceCard.tsx
git commit -m "feat: update Experience section to void purple card borders"
```

---

## Task 14: Update Projects Section

**Files:**
- Modify: `src/components/portfolio/Projects/index.tsx`
- Modify: `src/components/portfolio/Projects/ProjectCard.tsx`
- Modify: `src/components/portfolio/Projects/ProjectModal.tsx`

- [ ] **Step 1: Update Projects/index.tsx**

- Section label: `04 // CLASSIFIED_OPERATIONS`
- h2 accent: `color: '#c084fc'`

- [ ] **Step 2: Update ProjectCard.tsx**

Replace inline styles:
```typescript
// whileHover borderColor:
whileHover={{ y: -4, borderColor: 'rgba(123,47,255,0.5)' }}

// Card container:
style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(13,0,16,0.6)' }}

// Title on hover: group-hover:text-cyan-400 → keep cyan (project names are data)

// ExternalLink icon: group-hover:text-cyan-400 → keep cyan

// Tech stack tags:
style={{ border: '1px solid rgba(123,47,255,0.15)', color: 'rgba(192,132,252,0.5)' }}
// (Cyan stays on the "VIEW DETAILS →" link at bottom — it's interactive)

// Status colors: Live → cyan, In Progress → yellow, other → gray (unchanged)
```

- [ ] **Step 3: Replace ProjectModal.tsx**

```typescript
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitFork, ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolio';

type Project = typeof projects[0];

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[2000] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,5,0.85)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-[2001] overflow-auto"
            style={{ border: '1px solid rgba(123,47,255,0.35)', background: '#000005', maxHeight: '85vh', boxShadow: '0 0 40px rgba(123,47,255,0.15)' }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-mono tracking-widest mb-1" style={{ color: '#c084fc' }}>
                    {project.type} // {project.year}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="text-sm mt-1" style={{ color: 'rgba(160,140,200,0.6)' }}>{project.subtitle}</div>
                </div>
                <button onClick={onClose} className="transition-colors" style={{ color: 'rgba(123,47,255,0.6)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#c084fc')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(123,47,255,0.6)')}>
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm leading-relaxed mb-6 font-mono" style={{ color: 'rgba(200,180,240,0.65)' }}>
                {project.description}
              </p>

              <ul className="space-y-2 mb-6">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm font-mono" style={{ color: 'rgba(200,180,240,0.6)' }}>
                    <span className="flex-shrink-0" style={{ color: '#7b2fff' }}>▸</span>{h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((s) => (
                  <span key={s} className="px-2 py-1 text-xs font-mono" style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.25)' }}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono transition-colors"
                    style={{ color: 'rgba(0,229,255,0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,229,255,0.6)')}>
                    <GitFork size={16} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono transition-colors"
                    style={{ color: 'rgba(0,229,255,0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00e5ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,229,255,0.6)')}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Projects/index.tsx src/components/portfolio/Projects/ProjectCard.tsx src/components/portfolio/Projects/ProjectModal.tsx
git commit -m "feat: update Projects section to void horror styling"
```

---

## Task 15: Update Certifications Section

**Files:**
- Modify: `src/components/portfolio/Certifications/index.tsx`
- Modify: `src/components/portfolio/Certifications/CertCard.tsx`

- [ ] **Step 1: Update Certifications/index.tsx**

- Section label: `05 // CLEARANCE_VERIFIED`
- h2 accent: `color: '#c084fc'`

- [ ] **Step 2: Update CertCard.tsx**

Replace the file:

```typescript
'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import { Shield, CheckCircle, Clock } from 'lucide-react';

interface Props {
  name: string;
  issuer: string;
  code: string;
  status: string;
  year: string;
  description: string;
  index: number;
  isVisible: boolean;
}

export default function CertCard({ name, issuer, code, status, year, description, index, isVisible }: Props) {
  const isActive = status === 'Active' || status === 'Completed';
  const StatusIcon = isActive ? CheckCircle : Clock;
  const statusColor = status === 'Active' ? '#00e5ff' : status === 'Completed' ? '#00e5ff' : '#F59E0B';

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, borderColor: 'rgba(123,47,255,0.5)' }}
      className="p-6 transition-all duration-300"
      style={{ border: '1px solid rgba(123,47,255,0.2)', background: 'rgba(13,0,16,0.5)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <Shield size={24} style={{ color: '#c084fc', filter: 'drop-shadow(0 0 6px rgba(123,47,255,0.5))' }} />
        <div className="flex items-center gap-1.5" style={{ color: statusColor }}>
          <StatusIcon size={12} />
          <span className="text-xs font-mono tracking-widest">{status.toUpperCase()}</span>
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1">{name}</h3>
      <div className="font-mono text-xs tracking-wider mb-1" style={{ color: '#00e5ff' }}>{issuer}</div>
      <div className="font-mono text-xs mb-4" style={{ color: 'rgba(123,47,255,0.6)' }}>{code} // {year}</div>
      <p className="text-xs font-mono leading-relaxed" style={{ color: 'rgba(160,140,200,0.55)' }}>{description}</p>
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/Certifications/index.tsx src/components/portfolio/Certifications/CertCard.tsx
git commit -m "feat: update Certifications section to void purple styling"
```

---

## Task 16: Update Cyber Lab

**Files:**
- Modify: `src/components/portfolio/CyberLab/index.tsx`
- Modify: `src/components/portfolio/CyberLab/Terminal.tsx`
- Modify: `src/components/portfolio/CyberLab/ThreatFeed.tsx`

- [ ] **Step 1: Update CyberLab/index.tsx**

- Section label: `06 // VOID_INTERFACE`
- h2 accent: `color: '#c084fc'`
- Section background stays near-black (terminal sections look best as deep void)

- [ ] **Step 2: Update Terminal.tsx**

Replace the file:

```typescript
'use client';
import { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '@/data/portfolio';

export default function Terminal() {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([
    { input: '', output: '> VOID_OS v2.077 READY. Signal stable.\n> Operator: Jon Masropian // SECRET CLEARANCE ACTIVE\n> Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const output = cmd === 'clear'
      ? null
      : terminalCommands[cmd] ?? `> Command not found: "${cmd}". Type "help" for options.`;

    if (cmd === 'clear') {
      setHistory([{ input: '', output: '> Terminal cleared. Void persists.' }]);
    } else {
      setHistory((prev) => [...prev, { input: `VOID://> ${input}`, output: output! }]);
    }
    setInput('');
  };

  return (
    <div className="font-mono text-sm h-80 overflow-y-auto flex flex-col"
      style={{ background: '#000005', border: '1px solid rgba(0,229,255,0.2)', padding: '1rem' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: '#ff4d6d' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#7b2fff' }} />
        <span className="ml-2 text-xs tracking-widest" style={{ color: 'rgba(123,47,255,0.5)' }}>
          MASROPIAN-VOID-TERMINAL v2.077
        </span>
      </div>

      {/* History */}
      <div className="flex-1 space-y-3">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input && (
              <div style={{ color: '#c084fc' }}>{entry.input}</div>
            )}
            <pre className="whitespace-pre-wrap text-xs leading-relaxed" style={{ color: 'rgba(0,229,255,0.75)' }}>
              {entry.output}
            </pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 pt-2"
        style={{ borderTop: '1px solid rgba(0,229,255,0.1)' }}>
        <span style={{ color: '#c084fc' }}>VOID://&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-700"
          style={{ color: '#00e5ff' }}
          placeholder="enter command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
```

- [ ] **Step 3: Update ThreatFeed.tsx**

Replace only the `typeColor` map and the border styling:

```typescript
// Replace typeColor:
const typeColor: Record<string, string> = {
  INFO:  '#00e5ff',
  WARN:  '#c084fc',
  ALERT: '#ff4d6d',
};

// Container style:
style={{ background: '#000005', border: '1px solid rgba(123,47,255,0.2)', padding: '1rem' }}

// Title bar border:
style={{ borderBottom: '1px solid rgba(123,47,255,0.15)' }}

// Live indicator (the pulsing dot): keep red (it's an alert indicator)
// Header text:
style={{ color: 'rgba(192,132,252,0.5)' }}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/CyberLab/index.tsx src/components/portfolio/CyberLab/Terminal.tsx src/components/portfolio/CyberLab/ThreatFeed.tsx
git commit -m "feat: update CyberLab with VOID://> prompt and purple threat feed"
```

---

## Task 17: Update Contact Section

**Files:**
- Modify: `src/components/portfolio/Contact/index.tsx`
- Modify: `src/components/portfolio/Contact/ContactForm.tsx`

- [ ] **Step 1: Update Contact/index.tsx**

- Section label: `07 // TRANSMIT_INTO_THE_VOID`
- h2 accent: `color: '#c084fc'`
- Any cyan accents in the contact info sidebar → purple for labels, cyan for actual data (email address, location)

- [ ] **Step 2: Update ContactForm.tsx**

Find and replace the specific style values:

1. Input/textarea border (default): `rgba(0,229,255,0.2)` → `rgba(123,47,255,0.25)`
2. Input/textarea focus border: add focus handler or update the error/normal check:
```typescript
// In the field() function, change the border style line:
style={{ border: `1px solid ${errors[key] ? '#EF4444' : 'rgba(123,47,255,0.25)'}` }}
```

3. Submit button:
```typescript
<button
  type="submit"
  disabled={status === 'sending'}
  className="flex items-center gap-3 px-8 py-3 font-mono text-sm tracking-widest font-bold disabled:opacity-50 transition-all duration-300 hover:scale-105"
  style={{ background: 'rgba(123,47,255,0.8)', color: '#e9d5ff', boxShadow: '0 0 25px rgba(123,47,255,0.3)', border: '1px solid rgba(123,47,255,0.6)' }}
>
  {status === 'sending' ? (
    <>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-4 h-4 border-2 border-t-transparent rounded-full" style={{ borderColor: '#c084fc', borderTopColor: 'transparent' }} />
      TRANSMITTING...
    </>
  ) : (
    <><Send size={16} /> TRANSMIT</>
  )}
</button>
```

4. Success state:
```typescript
// CheckCircle icon: text-cyan-400 → keep cyan (success is a machine confirmation)
// "Send another message" link: text-cyan-400 → style={{ color: '#c084fc' }}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/Contact/index.tsx src/components/portfolio/Contact/ContactForm.tsx
git commit -m "feat: update Contact section — TRANSMIT button and purple void styling"
```

---

## Task 18: Final Verification

- [ ] **Step 1: Run dev server and do a full visual pass**

```bash
npm run dev
```

Open http://localhost:3000 and scroll through every section. Verify:
- [ ] Boot sequence: purple/cyan/red lines, purple logo, horror messages appear
- [ ] Fixed void background visible through all sections (stars + faint sigil)
- [ ] Navigation: purple glow logo, lavender links, purple HIRE ME border
- [ ] Hero: purple glitch on name, void label above, purple primary CTA
- [ ] About: purple timeline nodes, cyan for current milestone, anomaly bar visible
- [ ] Skills: purple badges for dev skills, cyan for ops/security skills, corruption on hover
- [ ] Experience: purple card borders
- [ ] Projects: purple card borders, void card background
- [ ] Certifications: purple card borders, cyan issuer text
- [ ] Cyber Lab: VOID://> prompt, purple/red threat feed
- [ ] Contact: purple inputs, TRANSMIT button purple
- [ ] AnomalyOverlay: wait ~15s after load, a red warning should flash in a corner
- [ ] Cursor: purple glow dot and ring
- [ ] Scrollbar: purple thumb visible

- [ ] **Step 2: Check TypeScript compilation**

```bash
npm run build
```

Expected: Builds successfully with no type errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Cosmic Void Horror redesign — all sections updated"
```
