# Jon Masropian Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full cyberpunk/dark-tech portfolio website for Jon Masropian — Army veteran turned Full Stack Developer — that feels like entering a classified futuristic operating system.

**Architecture:** Single-page layout on `src/app/(site)/page.tsx` with all portfolio sections rendered top-to-bottom. Each section is an isolated component under `src/components/portfolio/`. Content is centralized in `src/data/portfolio.ts`. Framer Motion handles scroll reveals and transitions; Three.js/R3F handles the 3D hero background; a boot-sequence overlay gates the first render.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js + @react-three/fiber + @react-three/drei, GSAP, Lucide React, shadcn/ui

---

## File Map

### New files to create
```
src/data/portfolio.ts                          # All resume content as typed data
src/lib/theme.ts                               # Color constants and CSS var names
src/lib/animations.ts                          # Shared Framer Motion variants
src/hooks/useTypingEffect.ts                   # Rotating title typing animation
src/hooks/useMousePosition.ts                  # Mouse tracking for 3D parallax
src/hooks/useScrollReveal.ts                   # Intersection observer hook

src/components/portfolio/Effects/CursorGlow.tsx        # Custom cursor glow
src/components/portfolio/Effects/ScanLines.tsx          # CRT scan line overlay
src/components/portfolio/Effects/GridBackground.tsx     # Animated grid bg

src/components/portfolio/BootSequence/index.tsx         # Animated boot/loading screen

src/components/portfolio/Navigation/index.tsx           # Cyberpunk floating navbar

src/components/portfolio/Hero/index.tsx                 # Hero section shell
src/components/portfolio/Hero/HeroBackground.tsx        # Three.js R3F canvas
src/components/portfolio/Hero/TypingEffect.tsx          # Rotating animated titles
src/components/portfolio/Hero/MetricCards.tsx           # Animated stat cards row

src/components/portfolio/About/index.tsx                # About section
src/components/portfolio/About/MilitaryTimeline.tsx     # Army career timeline

src/components/portfolio/Skills/index.tsx               # Skills section
src/components/portfolio/Skills/SkillCategory.tsx       # One category grid
src/components/portfolio/Skills/SkillBadge.tsx          # Individual skill chip

src/components/portfolio/Experience/index.tsx           # Experience section
src/components/portfolio/Experience/ExperienceCard.tsx  # One job entry

src/components/portfolio/Projects/index.tsx             # Projects section
src/components/portfolio/Projects/ProjectCard.tsx       # One project card
src/components/portfolio/Projects/ProjectModal.tsx      # Expanded project view

src/components/portfolio/CyberLab/index.tsx             # Cyber lab section
src/components/portfolio/CyberLab/Terminal.tsx          # Interactive terminal UI
src/components/portfolio/CyberLab/ThreatFeed.tsx        # Fake live threat log

src/components/portfolio/Certifications/index.tsx       # Certifications section
src/components/portfolio/Certifications/CertCard.tsx    # One cert card

src/components/portfolio/Contact/index.tsx              # Contact section
src/components/portfolio/Contact/ContactForm.tsx        # Validated contact form
```

### Files to modify
```
src/app/(site)/page.tsx          # Replace template content with portfolio sections
src/app/(site)/layout.tsx        # Add CursorGlow, ScanLines, boot gate
src/components/Header/index.tsx  # Replace with Navigation component (or delete)
src/components/Footer/index.tsx  # Strip to minimal cyberpunk footer
src/styles/tailwind.css          # Add CSS custom properties for theme colors
package.json                     # After installing new deps
```

---

## Phase 1 — Foundation

### Task 1: Install required packages

**Files:** `package.json`, `node_modules`

- [ ] **Step 1: Install animation and 3D packages**

```bash
npm install framer-motion gsap @react-three/fiber @react-three/drei three lucide-react
npm install --save-dev @types/three
```

Expected: packages added to `node_modules`, `package.json` updated.

- [ ] **Step 2: Install shadcn init**

```bash
npx shadcn@latest init -d
```

When prompted: TypeScript=yes, style=default, base color=slate, CSS variables=yes, tailwind config=yes, components alias=`@/components`, utils alias=`@/lib/utils`.

- [ ] **Step 3: Verify no TS errors after install**

```bash
npx tsc --noEmit
```

Expected: 0 errors (or only pre-existing errors unrelated to new packages).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install framer-motion, three/r3f, gsap, lucide, shadcn"
```

---

### Task 2: Set up theme and CSS variables

**Files:**
- Create: `src/lib/theme.ts`
- Modify: `src/styles/tailwind.css`

- [ ] **Step 1: Create theme constants**

Create `src/lib/theme.ts`:

```ts
export const colors = {
  cyan: '#00E5FF',
  cyanDim: '#00B8D4',
  cyanGlow: 'rgba(0, 229, 255, 0.15)',
  blue: '#1565C0',
  purple: '#7B1FA2',
  crimson: '#B71C1C',
  black: '#000000',
  darkGray: '#0A0A0A',
  midGray: '#111111',
  borderGray: '#1A1A1A',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textCyan: '#00E5FF',
} as const;

export const fonts = {
  mono: 'var(--font-mono)',
  sans: 'var(--font-sans)',
} as const;

export const glow = {
  cyan: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.2)',
  cyanSmall: '0 0 10px rgba(0, 229, 255, 0.4)',
  red: '0 0 20px rgba(183, 28, 28, 0.5)',
} as const;
```

- [ ] **Step 2: Add CSS custom properties and cyberpunk globals to tailwind.css**

Open `src/styles/tailwind.css` and add after the existing `@import` lines:

```css
@import "tailwindcss";

:root {
  --cyan: #00E5FF;
  --cyan-dim: #00B8D4;
  --cyan-glow: rgba(0, 229, 255, 0.15);
  --crimson: #B71C1C;
  --dark: #000000;
  --dark-gray: #0A0A0A;
  --mid-gray: #111111;
  --border-gray: #1A1A1A;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: #000;
}

body {
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

/* Cyberpunk scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #0A0A0A;
}
::-webkit-scrollbar-thumb {
  background: #00E5FF;
  border-radius: 2px;
}

/* Scan line overlay applied globally */
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
    rgba(0, 0, 0, 0.05) 2px,
    rgba(0, 0, 0, 0.05) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

/* Glitch text effect */
@keyframes glitch {
  0%, 100% { clip-path: inset(0 0 98% 0); transform: translateX(-2px); }
  20% { clip-path: inset(30% 0 50% 0); transform: translateX(2px); }
  40% { clip-path: inset(60% 0 20% 0); transform: translateX(-1px); }
  60% { clip-path: inset(10% 0 80% 0); transform: translateX(1px); }
  80% { clip-path: inset(80% 0 5% 0); transform: translateX(-2px); }
}

.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.glitch::before {
  color: #00E5FF;
  animation: glitch 3s infinite linear;
  opacity: 0.7;
}
.glitch::after {
  color: #B71C1C;
  animation: glitch 3s infinite linear reverse;
  opacity: 0.5;
}

/* Cursor hide for custom cursor */
.custom-cursor * {
  cursor: none !important;
}

/* Section spacing */
.section {
  padding: 6rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Neon border */
.neon-border {
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.1), inset 0 0 10px rgba(0, 229, 255, 0.05);
}

/* Terminal text style */
.terminal-text {
  font-family: 'Courier New', 'Consolas', monospace;
  color: #00E5FF;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/theme.ts src/styles/tailwind.css
git commit -m "feat: add cyberpunk theme constants and CSS variables"
```

---

### Task 3: Create portfolio data file

**Files:**
- Create: `src/data/portfolio.ts`

- [ ] **Step 1: Create the data file with all resume content**

Create `src/data/portfolio.ts`:

```ts
export const personal = {
  name: 'Jon Masropian',
  title: 'Full Stack Developer',
  tagline: '[SYSTEM_CORRUPTION_DETECTED]',
  location: 'Lawton, OK',
  email: 'jon.masropian@gmail.com',
  phone: '580-699-4002',
  clearance: 'Active Secret Clearance',
  summary: `Disciplined IT and Full Stack Web Development professional with 22 years of U.S. Army service as a Signal/Communications Technician. Combines deep technical expertise in secure network operations, systems support, and cybersecurity compliance with modern web development skills. CompTIA Security+ certified. Mission-first reliability, clear communication, and the ability to thrive under pressure in high-stakes environments.`,
  rotatingTitles: [
    'Full Stack Developer',
    'IT & Network Professional',
    'Cybersecurity Practitioner',
    'U.S. Army Veteran',
    'Signal Corps Technician',
    'UI/UX Designer',
  ],
  metrics: [
    { label: 'Years Army Service', value: '22', suffix: 'YRS' },
    { label: 'Trainees Mentored', value: '2000', suffix: '+' },
    { label: 'Dev Bootcamp Hours', value: '350', suffix: 'HRS' },
    { label: 'Security Clearance', value: 'SECRET', suffix: '' },
  ],
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};

export const skills: { category: string; items: string[] }[] = [
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'RESTful APIs', 'MySQL', 'Git', 'GitHub', 'Agile/Scrum'],
  },
  {
    category: 'Cybersecurity',
    items: ['CompTIA Security+', 'DoD STIG Compliance', 'Risk Assessment', 'Secure Network Practices', 'IAM'],
  },
  {
    category: 'IT & Network',
    items: ['TCP/IP', 'VLANs', 'Subnetting', 'Cisco Devices', 'Active Directory', 'Windows Workstation', 'Tier I/II Help Desk'],
  },
  {
    category: 'Tools',
    items: ['Figma', 'Git', 'GitHub', 'VS Code', 'PowerShell', 'Bash', 'Wireshark'],
  },
];

export const experience = [
  {
    id: 1,
    role: 'IT & Network Support Supervisor / Senior Communications Technician',
    company: 'U.S. Army — 25H Signal Corps',
    period: '2004 – 2026',
    highlights: [
      'Installed, configured, and maintained secure tactical and garrison network systems including routers, switches, and endpoints',
      'Troubleshot network connectivity, hardware failures, and user access issues — minimizing downtime in mission-critical environments',
      'Provided Tier I/II help desk support resolving technical issues across multiple departments and units',
      'Enforced DoD cybersecurity policies, STIG compliance, and secure network procedures',
      'Managed IT equipment accountability, licensing, and lifecycle tracking',
      'Supported field exercises requiring rapid deployment of reliable communications infrastructure',
      'Trained and supervised junior personnel on network operations, troubleshooting, and security best practices',
    ],
  },
  {
    id: 2,
    role: 'Technical Training Lead — Drill Sergeant',
    company: 'U.S. Army',
    period: '2016 – 2019',
    highlights: [
      'Delivered structured training programs and performance evaluations for Army recruits',
      'Trained and mentored over 2,000 trainees — largest-scale leadership role of career',
      'Enforced standards, procedures, and strict accountability across all training phases',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Warriors Blood Coffee',
    subtitle: 'E-Commerce Platform',
    description: 'Fully custom e-commerce site for a veteran-owned coffee brand, built from the ground up without Shopify or similar platforms. Complete UI/UX design in Figma with brand-consistent visual identity.',
    highlights: [
      'Designed product pages, checkout flow, and landing page in Figma',
      'Integrated Square payment backend with guest checkout for streamlined UX',
      'Managed and exported product image assets using Python/Pillow for grid-based layouts',
      'Collaborated across design and front-end implementation with a multi-person team',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Square API', 'Node.js', 'Python'],
    status: 'In Progress',
    year: '2024–Present',
    type: 'Client Project',
    github: null,
    demo: null,
  },
  {
    id: 2,
    title: 'Developer Portfolio',
    subtitle: 'This Website',
    description: 'Cyberpunk-themed personal portfolio built with Next.js, Three.js, and Framer Motion. Features a 3D animated hero, interactive terminal, boot sequence, and cinematic section reveals.',
    highlights: [
      'Three.js animated 3D background with mouse parallax',
      'Interactive terminal emulator in the Cyber Lab section',
      'Framer Motion scroll-triggered section animations',
      'Fully responsive cyberpunk UI with glitch effects',
    ],
    stack: ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'GSAP'],
    status: 'Live',
    year: '2025',
    type: 'Personal Project',
    github: null,
    demo: null,
  },
];

export const certifications = [
  {
    id: 1,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    code: 'SY0-701',
    status: 'Active',
    year: '2024',
    description: 'Industry-standard cybersecurity certification covering threat detection, risk management, and secure infrastructure.',
  },
  {
    id: 2,
    name: 'Full Stack Software Development',
    issuer: 'Era Academy',
    code: 'Oklahoma City, OK',
    status: 'Completed',
    year: '2024',
    description: '350+ hour immersive bootcamp covering HTML5, CSS3, JavaScript ES6+, React, MySQL, RESTful APIs, and Agile/Scrum.',
  },
  {
    id: 3,
    name: 'JavaScript Professional Developer',
    issuer: 'COITB',
    code: 'In Progress',
    status: 'In Progress',
    year: '2025',
    description: 'Professional JavaScript developer certification covering advanced ES6+, async patterns, and modern tooling.',
  },
  {
    id: 4,
    name: "Bachelor's — IT / Cybersecurity",
    issuer: 'Central Texas College',
    code: 'In Progress',
    status: 'In Progress',
    year: '2025',
    description: 'Coursework toward a Bachelor\'s degree in Information Technology with a Cybersecurity concentration.',
  },
];

export const militaryTimeline = [
  { year: '2004', event: 'Enlisted — U.S. Army Signal Corps (25H)', detail: 'Began 22-year career in military IT and communications' },
  { year: '2004', event: 'Advanced Individual Training (AIT)', detail: '25H Information Technology Specialist — hands-on network operations and secure comms' },
  { year: '2016', event: 'Selected as Drill Sergeant', detail: 'Achieved one of the most demanding leadership roles in the Army' },
  { year: '2016–2019', event: 'Trained 2,000+ Recruits', detail: 'Technical Training Lead responsible for evaluation, mentorship, and standards enforcement' },
  { year: '2024', event: 'Era Academy — Full Stack Dev Bootcamp', detail: '350+ hours of project-based web development training while still serving' },
  { year: '2024', event: 'Warriors Blood Coffee — Client Launch', detail: 'First professional web development client project' },
  { year: '2026', event: 'Honorably Retired — 22 Years', detail: 'Transitioned full-time into web development and IT industry' },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  whoami       — identity summary
  skills       — technical skill set
  clearance    — security status
  mission      — current objectives
  contact      — get in touch
  clear        — clear terminal`,
  whoami: `> Jon Masropian
> Role: Full Stack Developer | IT Professional | Army Veteran
> Clearance: Active Secret
> Location: Lawton, OK
> Status: [AVAILABLE FOR HIRE]`,
  skills: `> Frontend:  React, Next.js, TypeScript, Tailwind, Figma
> Backend:   Node.js, MySQL, RESTful APIs
> Security:  CompTIA Security+, DoD STIG, IAM
> Network:   TCP/IP, VLANs, Cisco, Active Directory
> Tools:     Git, GitHub, VS Code, PowerShell`,
  clearance: `> CLEARANCE LEVEL: SECRET
> STATUS: ACTIVE
> ISSUING AUTHORITY: U.S. Department of Defense
> VERIFICATION: On file`,
  mission: `> [CURRENT OBJECTIVES]
> ✓ CompTIA Security+ — COMPLETE
> ✓ Full Stack Dev Bootcamp — COMPLETE
> ⟳ COITB JS Developer Cert — IN PROGRESS
> ⟳ Bachelor's IT/Cybersecurity — IN PROGRESS
> ⟳ Land first dev/IT role — ACTIVE`,
  contact: `> Email:    jon.masropian@gmail.com
> Phone:    580-699-4002
> LinkedIn: /in/jon-masropian
> GitHub:   github.com/jonmasropian`,
};

export const threatFeed = [
  { time: '00:01', type: 'INFO', message: 'System initialized. All nodes online.' },
  { time: '00:03', type: 'WARN', message: 'Anomalous traffic detected on port 443' },
  { time: '00:05', type: 'INFO', message: 'Firewall rules updated. 247 IPs blocked.' },
  { time: '00:08', type: 'ALERT', message: 'Brute-force attempt detected — IP: 185.220.101.x' },
  { time: '00:09', type: 'INFO', message: 'Threat neutralized. Countermeasures deployed.' },
  { time: '00:12', type: 'INFO', message: 'SSL certificates verified. Encryption active.' },
  { time: '00:15', type: 'WARN', message: 'Suspicious login from unknown geolocation' },
  { time: '00:16', type: 'ALERT', message: 'MFA challenge triggered. User verified.' },
  { time: '00:20', type: 'INFO', message: 'Network scan complete. No vulnerabilities found.' },
  { time: '00:23', type: 'WARN', message: 'STIG compliance check initiated...' },
  { time: '00:25', type: 'INFO', message: 'All systems nominal. Defense posture: ACTIVE.' },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat: add centralized portfolio data from resume"
```

---

### Task 4: Create shared animation variants

**Files:**
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Create animation variants**

Create `src/lib/animations.ts`:

```ts
import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 10px rgba(0, 229, 255, 0.3)',
      '0 0 30px rgba(0, 229, 255, 0.6)',
      '0 0 10px rgba(0, 229, 255, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const borderGlow = {
  animate: {
    borderColor: [
      'rgba(0, 229, 255, 0.3)',
      'rgba(0, 229, 255, 0.8)',
      'rgba(0, 229, 255, 0.3)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/animations.ts
git commit -m "feat: add shared framer-motion animation variants"
```

---

### Task 5: Create shared hooks

**Files:**
- Create: `src/hooks/useTypingEffect.ts`
- Create: `src/hooks/useMousePosition.ts`
- Create: `src/hooks/useScrollReveal.ts`

- [ ] **Step 1: Create typing effect hook**

Create `src/hooks/useTypingEffect.ts`:

```ts
'use client';
import { useEffect, useState } from 'react';

export function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}
```

- [ ] **Step 2: Create mouse position hook**

Create `src/hooks/useMousePosition.ts`:

```ts
'use client';
import { useEffect, useState } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return position;
}
```

- [ ] **Step 3: Create scroll reveal hook**

Create `src/hooks/useScrollReveal.ts`:

```ts
'use client';
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add typing effect, mouse position, and scroll reveal hooks"
```

---

## Phase 2 — Global Effects + Navigation

### Task 6: Cursor glow effect

**Files:**
- Create: `src/components/portfolio/Effects/CursorGlow.tsx`

- [ ] **Step 1: Create cursor glow component**

Create `src/components/portfolio/Effects/CursorGlow.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-cyan-400/30"
        style={{ width: 40, height: 40 }}
        animate={{ x: x - 20, y: y - 20 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-cyan-400"
        style={{ width: 6, height: 6, boxShadow: '0 0 10px rgba(0,229,255,0.8)' }}
        animate={{ x: x - 3, y: y - 3 }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
      />
      {/* Ambient glow blob */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
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
git commit -m "feat: add custom cursor glow effect"
```

---

### Task 7: Boot sequence screen

**Files:**
- Create: `src/components/portfolio/BootSequence/index.tsx`

- [ ] **Step 1: Create boot sequence component**

Create `src/components/portfolio/BootSequence/index.tsx`:

```tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  '> INITIALIZING SYSTEM...',
  '> LOADING KERNEL MODULES... [OK]',
  '> MOUNTING SECURE PARTITIONS... [OK]',
  '> CHECKING CLEARANCE LEVEL... SECRET [VERIFIED]',
  '> ESTABLISHING ENCRYPTED CHANNEL... [OK]',
  '> LOADING OPERATOR PROFILE: JON MASROPIAN',
  '> SIGNAL CORPS // 25H // 22 YEARS SERVICE',
  '> FULL STACK DEVELOPMENT MODULES LOADED',
  '> [SYSTEM_CORRUPTION_DETECTED]',
  '> ACCESSING PORTFOLIO DATABASE...',
  '> ACCESS GRANTED. WELCOME.',
];

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 500);
      }
    }, 200);
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
          className="fixed inset-0 z-[10000] flex flex-col justify-center items-start bg-black px-8 md:px-24"
        >
          {/* JM Logo */}
          <div className="mb-8 text-5xl font-bold tracking-widest" style={{ color: '#00E5FF', textShadow: '0 0 30px rgba(0,229,255,0.8)' }}>
            JM
          </div>

          {/* Boot lines */}
          <div className="font-mono text-xs md:text-sm space-y-1 max-w-2xl">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={
                  line.includes('[SYSTEM_CORRUPTION') ? 'text-red-500' :
                  line.includes('GRANTED') || line.includes('WELCOME') ? 'text-cyan-400 font-bold' :
                  line.includes('[OK]') || line.includes('[VERIFIED]') ? 'text-green-400' :
                  'text-gray-400'
                }
              >
                {line}
              </motion.div>
            ))}
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan-400 ml-1"
            />
          </div>

          {/* Scan line overlay */}
          <div className="pointer-events-none absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/BootSequence/index.tsx
git commit -m "feat: add terminal boot sequence loading screen"
```

---

### Task 8: Cyberpunk navigation

**Files:**
- Create: `src/components/portfolio/Navigation/index.tsx`

- [ ] **Step 1: Create navigation component**

Create `src/components/portfolio/Navigation/index.tsx`:

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CYBER LAB', href: '#cyberlab' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,229,255,0.15)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold tracking-widest font-mono"
          style={{ color: '#00E5FF', textShadow: '0 0 20px rgba(0,229,255,0.6)' }}
        >
          JM
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-3 py-1.5 text-xs tracking-widest font-mono text-gray-400 hover:text-cyan-400 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="ml-4 px-4 py-1.5 text-xs tracking-widest font-mono text-black font-bold"
            style={{ background: '#00E5FF', boxShadow: '0 0 15px rgba(0,229,255,0.4)' }}
          >
            HIRE ME
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-cyan-400"
        >
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
            className="lg:hidden border-t border-cyan-400/20"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-sm tracking-widest font-mono text-gray-400 hover:text-cyan-400 transition-colors py-2 border-b border-gray-800"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-2 py-2 text-sm tracking-widest font-mono text-black font-bold text-center"
                style={{ background: '#00E5FF' }}
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
git commit -m "feat: add cyberpunk floating navigation bar"
```

---

## Phase 3 — Hero Section

### Task 9: Three.js animated background

**Files:**
- Create: `src/components/portfolio/Hero/HeroBackground.tsx`

- [ ] **Step 1: Create Three.js background**

Create `src/components/portfolio/Hero/HeroBackground.tsx`:

```tsx
'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

function CyberGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial color="#00E5FF" wireframe opacity={0.08} transparent />
    </mesh>
  );
}

function FloatingParticles() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00E5FF" size={0.04} transparent opacity={0.6} />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useMousePosition();

  useFrame(() => {
    camera.position.x += ((mouse.x / window.innerWidth - 0.5) * 2 - camera.position.x) * 0.02;
    camera.position.y += (-(mouse.y / window.innerHeight - 0.5) * 1 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.1} />
        <CyberGrid />
        <FloatingParticles />
        <CameraRig />
        <fog attach="fog" args={['#000000', 5, 25]} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/portfolio/Hero/HeroBackground.tsx
git commit -m "feat: add Three.js cyber grid and particle background"
```

---

### Task 10: Hero section

**Files:**
- Create: `src/components/portfolio/Hero/TypingEffect.tsx`
- Create: `src/components/portfolio/Hero/MetricCards.tsx`
- Create: `src/components/portfolio/Hero/index.tsx`

- [ ] **Step 1: Create TypingEffect component**

Create `src/components/portfolio/Hero/TypingEffect.tsx`:

```tsx
'use client';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { personal } from '@/data/portfolio';

export default function TypingEffect() {
  const displayed = useTypingEffect(personal.rotatingTitles);

  return (
    <div className="h-8 md:h-10 flex items-center">
      <span className="text-lg md:text-2xl font-mono" style={{ color: '#00E5FF' }}>
        {displayed}
        <span className="animate-pulse">_</span>
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create MetricCards component**

Create `src/components/portfolio/Hero/MetricCards.tsx`:

```tsx
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
            background: 'rgba(0,229,255,0.05)',
            border: '1px solid rgba(0,229,255,0.2)',
          }}
        >
          <div className="text-2xl md:text-3xl font-bold font-mono" style={{ color: '#00E5FF' }}>
            {metric.value}
            <span className="text-sm ml-0.5">{metric.suffix}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase font-mono">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create Hero section**

Create `src/components/portfolio/Hero/index.tsx`:

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Hero/
git commit -m "feat: add hero section with typing effect, 3D background, and metric cards"
```

---

## Phase 4 — About Section

### Task 11: About section

**Files:**
- Create: `src/components/portfolio/About/MilitaryTimeline.tsx`
- Create: `src/components/portfolio/About/index.tsx`

- [ ] **Step 1: Create military timeline**

Create `src/components/portfolio/About/MilitaryTimeline.tsx`:

```tsx
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
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent" />

      <div className="space-y-8 pl-12">
        {militaryTimeline.map((item, idx) => (
          <motion.div key={idx} variants={fadeUp} className="relative">
            {/* Dot */}
            <div
              className="absolute -left-[2.35rem] w-3 h-3 rounded-full border-2 border-cyan-400 bg-black"
              style={{ boxShadow: '0 0 10px rgba(0,229,255,0.6)' }}
            />
            {/* Year */}
            <div className="text-xs font-mono text-cyan-400 mb-1 tracking-widest">{item.year}</div>
            {/* Event */}
            <div className="text-white font-semibold text-sm">{item.event}</div>
            {/* Detail */}
            <div className="text-gray-500 text-xs mt-1 font-mono">{item.detail}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create About section**

Create `src/components/portfolio/About/index.tsx`:

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/About/
git commit -m "feat: add about section with military timeline"
```

---

## Phase 5 — Skills Section

### Task 12: Skills section

**Files:**
- Create: `src/components/portfolio/Skills/SkillBadge.tsx`
- Create: `src/components/portfolio/Skills/SkillCategory.tsx`
- Create: `src/components/portfolio/Skills/index.tsx`

- [ ] **Step 1: Create SkillBadge**

Create `src/components/portfolio/Skills/SkillBadge.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

interface Props {
  skill: string;
}

export default function SkillBadge({ skill }: Props) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05, borderColor: 'rgba(0,229,255,0.8)', boxShadow: '0 0 12px rgba(0,229,255,0.3)' }}
      className="px-3 py-1.5 text-xs font-mono text-gray-300 transition-all duration-200"
      style={{ border: '1px solid rgba(0,229,255,0.2)', background: 'rgba(0,229,255,0.03)' }}
    >
      {skill}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create SkillCategory**

Create `src/components/portfolio/Skills/SkillCategory.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SkillBadge from './SkillBadge';

interface Props {
  category: string;
  items: string[];
  index: number;
}

export default function SkillCategory({ category, items, index }: Props) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="p-6"
      style={{ border: '1px solid rgba(0,229,255,0.1)', background: 'rgba(0,0,0,0.4)' }}
    >
      <div className="text-xs font-mono text-cyan-400 tracking-widest mb-4 pb-2"
        style={{ borderBottom: '1px solid rgba(0,229,255,0.15)' }}>
        {category.toUpperCase()}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-2"
      >
        {items.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create Skills section**

Create `src/components/portfolio/Skills/index.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import SkillCategory from './SkillCategory';

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #000, #050505, #000)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">02 // SKILLS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Technical <span style={{ color: '#00E5FF' }}>Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((cat, idx) => (
            <SkillCategory key={cat.category} category={cat.category} items={cat.items} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Skills/
git commit -m "feat: add animated skills section with categorized badge grid"
```

---

## Phase 6 — Experience Section

### Task 13: Experience section

**Files:**
- Create: `src/components/portfolio/Experience/ExperienceCard.tsx`
- Create: `src/components/portfolio/Experience/index.tsx`

- [ ] **Step 1: Create ExperienceCard**

Create `src/components/portfolio/Experience/ExperienceCard.tsx`:

```tsx
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
      style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,0,0,0.5)' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-cyan-400/5 transition-colors"
      >
        <div>
          <div className="text-white font-semibold text-lg">{role}</div>
          <div className="text-cyan-400 font-mono text-sm mt-1">{company}</div>
          <div className="text-gray-500 font-mono text-xs mt-1 tracking-widest">{period}</div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-cyan-400 flex-shrink-0 mt-1" />
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
                <li key={i} className="flex gap-3 text-gray-400 text-sm font-mono">
                  <span className="text-cyan-400 flex-shrink-0">▸</span>
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

- [ ] **Step 2: Create Experience section**

Create `src/components/portfolio/Experience/index.tsx`:

```tsx
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
          <span className="text-xs font-mono text-cyan-400 tracking-widest">03 // EXPERIENCE</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Field <span style={{ color: '#00E5FF' }}>Record</span>
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

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/Experience/
git commit -m "feat: add experience section with expandable cards"
```

---

## Phase 7 — Projects Section

### Task 14: Projects section

**Files:**
- Create: `src/components/portfolio/Projects/ProjectModal.tsx`
- Create: `src/components/portfolio/Projects/ProjectCard.tsx`
- Create: `src/components/portfolio/Projects/index.tsx`

- [ ] **Step 1: Create ProjectModal**

Create `src/components/portfolio/Projects/ProjectModal.tsx`:

```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
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
            className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-[2001] overflow-auto"
            style={{ border: '1px solid rgba(0,229,255,0.3)', background: '#050505', maxHeight: '85vh' }}
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400 tracking-widest mb-1">{project.type} // {project.year}</div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="text-gray-500 text-sm mt-1">{project.subtitle}</div>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">{project.description}</p>

              <ul className="space-y-2 mb-6">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-gray-400 text-sm font-mono">
                    <span className="text-cyan-400 flex-shrink-0">▸</span>{h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((s) => (
                  <span key={s} className="px-2 py-1 text-xs font-mono text-cyan-400"
                    style={{ border: '1px solid rgba(0,229,255,0.3)' }}>{s}</span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors">
                    <Github size={16} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors">
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

- [ ] **Step 2: Create ProjectCard**

Create `src/components/portfolio/Projects/ProjectCard.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolio';

type Project = typeof projects[0];

interface Props {
  project: Project;
  index: number;
  isVisible: boolean;
  onClick: (p: Project) => void;
}

export default function ProjectCard({ project, index, isVisible, onClick }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
      whileHover={{ y: -4, borderColor: 'rgba(0,229,255,0.5)' }}
      onClick={() => onClick(project)}
      className="p-6 cursor-pointer transition-all duration-300 group"
      style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-gray-500 tracking-widest mb-1">{project.type} // {project.year}</div>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
          <div className="text-gray-500 text-sm mt-1">{project.subtitle}</div>
        </div>
        <ExternalLink size={16} className="text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
      </div>

      <p className="text-gray-500 text-sm font-mono leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="text-xs font-mono text-gray-500 px-2 py-0.5"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>{s}</span>
        ))}
        {project.stack.length > 5 && (
          <span className="text-xs font-mono text-gray-600">+{project.stack.length - 5}</span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-mono tracking-widest ${project.status === 'Live' ? 'text-green-400' : project.status === 'In Progress' ? 'text-yellow-400' : 'text-gray-500'}`}>
          ● {project.status.toUpperCase()}
        </span>
        <span className="text-xs font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">VIEW DETAILS →</span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create Projects section**

Create `src/components/portfolio/Projects/index.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { ref, isVisible } = useScrollReveal();
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #000, #050505, #000)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">04 // PROJECTS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Deployed <span style={{ color: '#00E5FF' }}>Missions</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-3">Click any card for full details</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              isVisible={isVisible}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Projects/
git commit -m "feat: add projects section with cards and expandable modal"
```

---

## Phase 8 — Cyber Lab

### Task 15: Cyber Lab section

**Files:**
- Create: `src/components/portfolio/CyberLab/Terminal.tsx`
- Create: `src/components/portfolio/CyberLab/ThreatFeed.tsx`
- Create: `src/components/portfolio/CyberLab/index.tsx`

- [ ] **Step 1: Create Terminal component**

Create `src/components/portfolio/CyberLab/Terminal.tsx`:

```tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { terminalCommands } from '@/data/portfolio';

export default function Terminal() {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([
    { input: '', output: '> SYSTEM READY. Type "help" for available commands.\n> Operator: Jon Masropian // SECRET CLEARANCE ACTIVE' },
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
      setHistory([{ input: '', output: '> Terminal cleared.' }]);
    } else {
      setHistory((prev) => [...prev, { input: `$ ${input}`, output: output! }]);
    }
    setInput('');
  };

  return (
    <div className="font-mono text-sm h-80 overflow-y-auto flex flex-col"
      style={{ background: '#050505', border: '1px solid rgba(0,229,255,0.2)', padding: '1rem' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500 tracking-widest">MASROPIAN-TERMINAL v1.0</span>
      </div>

      {/* History */}
      <div className="flex-1 space-y-3">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input && <div className="text-cyan-400">{entry.input}</div>}
            <pre className="text-gray-400 whitespace-pre-wrap text-xs leading-relaxed">{entry.output}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 pt-2"
        style={{ borderTop: '1px solid rgba(0,229,255,0.1)' }}>
        <span className="text-cyan-400">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-cyan-400 outline-none placeholder-gray-700 text-sm"
          placeholder="enter command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Create ThreatFeed component**

Create `src/components/portfolio/CyberLab/ThreatFeed.tsx`:

```tsx
'use client';
import { useEffect, useState } from 'react';
import { threatFeed } from '@/data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThreatFeed() {
  const [visible, setVisible] = useState<typeof threatFeed>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= threatFeed.length) {
      const reset = setTimeout(() => { setVisible([]); setIdx(0); }, 3000);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => {
      setVisible((prev) => [...prev, threatFeed[idx]]);
      setIdx((i) => i + 1);
    }, 800);
    return () => clearTimeout(t);
  }, [idx]);

  const typeColor: Record<string, string> = {
    INFO: '#00E5FF',
    WARN: '#F59E0B',
    ALERT: '#EF4444',
  };

  return (
    <div className="h-80 overflow-hidden font-mono text-xs"
      style={{ background: '#050505', border: '1px solid rgba(0,229,255,0.2)', padding: '1rem' }}>
      <div className="flex items-center gap-2 mb-4 pb-2" style={{ borderBottom: '1px solid rgba(0,229,255,0.1)' }}>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-red-500" />
        <span className="text-gray-500 tracking-widest">LIVE THREAT MONITOR</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {visible.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-gray-600">[{entry.time}]</span>
              <span className="font-bold" style={{ color: typeColor[entry.type] ?? '#fff' }}>
                {entry.type}
              </span>
              <span className="text-gray-400">{entry.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Cyber Lab section**

Create `src/components/portfolio/CyberLab/index.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import Terminal from './Terminal';
import ThreatFeed from './ThreatFeed';

export default function CyberLab() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="cyberlab" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(183,28,28,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-red-500 tracking-widest">05 // CYBER LAB</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Command <span style={{ color: '#00E5FF' }}>Center</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-3">
            Interactive terminal and live threat monitoring simulation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} transition={{ delay: 0.1 }}>
            <div className="text-xs font-mono text-cyan-400 tracking-widest mb-3">OPERATOR TERMINAL</div>
            <Terminal />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} transition={{ delay: 0.2 }}>
            <div className="text-xs font-mono text-red-400 tracking-widest mb-3">THREAT INTELLIGENCE FEED</div>
            <ThreatFeed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/CyberLab/
git commit -m "feat: add cyber lab with interactive terminal and threat feed"
```

---

## Phase 9 — Certifications

### Task 16: Certifications section

**Files:**
- Create: `src/components/portfolio/Certifications/CertCard.tsx`
- Create: `src/components/portfolio/Certifications/index.tsx`

- [ ] **Step 1: Create CertCard**

Create `src/components/portfolio/Certifications/CertCard.tsx`:

```tsx
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
  const statusColor = status === 'Active' ? '#00E5FF' : status === 'Completed' ? '#22C55E' : '#F59E0B';

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, borderColor: 'rgba(0,229,255,0.5)' }}
      className="p-6 transition-all duration-300"
      style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <Shield size={24} className="text-cyan-400" style={{ filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.5))' }} />
        <div className="flex items-center gap-1.5" style={{ color: statusColor }}>
          <StatusIcon size={12} />
          <span className="text-xs font-mono tracking-widest">{status.toUpperCase()}</span>
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-1">{name}</h3>
      <div className="text-cyan-400 font-mono text-xs tracking-wider mb-1">{issuer}</div>
      <div className="text-gray-600 font-mono text-xs mb-4">{code} // {year}</div>
      <p className="text-gray-500 text-xs font-mono leading-relaxed">{description}</p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create Certifications section**

Create `src/components/portfolio/Certifications/index.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp } from '@/lib/animations';
import CertCard from './CertCard';

export default function Certifications() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="certifications" className="py-24 px-6"
      style={{ background: 'linear-gradient(to bottom, #000, #050505, #000)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">06 // CERTIFICATIONS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Credentials &amp; <span style={{ color: '#00E5FF' }}>Clearances</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, idx) => (
            <CertCard key={cert.id} {...cert} index={idx} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/Certifications/
git commit -m "feat: add certifications section with animated cert cards"
```

---

## Phase 10 — Contact Section

### Task 17: Contact section

**Files:**
- Create: `src/components/portfolio/Contact/ContactForm.tsx`
- Create: `src/components/portfolio/Contact/index.tsx`

- [ ] **Step 1: Create ContactForm**

Create `src/components/portfolio/Contact/ContactForm.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormData = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Simulate sending — wire up to an email API (e.g. Resend, nodemailer) later
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setForm(empty);
  };

  const field = (key: keyof FormData, label: string, tag: 'input' | 'textarea' = 'input', rows?: number) => (
    <div>
      <label className="block text-xs font-mono text-gray-500 tracking-widest mb-2">{label}</label>
      {tag === 'input' ? (
        <input
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full bg-transparent text-white text-sm font-mono py-3 px-4 outline-none transition-colors placeholder-gray-700"
          style={{ border: `1px solid ${errors[key] ? '#EF4444' : 'rgba(0,229,255,0.2)'}` }}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <textarea
          rows={rows ?? 5}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full bg-transparent text-white text-sm font-mono py-3 px-4 outline-none resize-none transition-colors placeholder-gray-700"
          style={{ border: `1px solid ${errors[key] ? '#EF4444' : 'rgba(0,229,255,0.2)'}` }}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
      {errors[key] && <p className="text-red-400 text-xs font-mono mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {status === 'sent' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <CheckCircle size={48} className="text-cyan-400 mb-4" style={{ filter: 'drop-shadow(0 0 16px rgba(0,229,255,0.6))' }} />
          <h3 className="text-white font-bold text-xl mb-2">Message Received</h3>
          <p className="text-gray-500 font-mono text-sm">I'll get back to you ASAP. Stand by.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-xs font-mono text-cyan-400 hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {field('name', 'NAME')}
            {field('email', 'EMAIL')}
          </div>
          {field('subject', 'SUBJECT')}
          {field('message', 'MESSAGE', 'textarea', 6)}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center gap-3 px-8 py-3 font-mono text-sm tracking-widest font-bold text-black disabled:opacity-50 transition-all duration-300 hover:scale-105"
            style={{ background: '#00E5FF', boxShadow: '0 0 25px rgba(0,229,255,0.4)' }}
          >
            {status === 'sending' ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                TRANSMITTING...
              </>
            ) : (
              <><Send size={16} /> SEND MESSAGE</>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create Contact section**

Create `src/components/portfolio/Contact/index.tsx`:

```tsx
'use client';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUp, slideInLeft, slideInRight } from '@/lib/animations';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <span className="text-xs font-mono text-cyan-400 tracking-widest">07 // CONTACT</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Open <span style={{ color: '#00E5FF' }}>Channel</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-3">
            Available for Full Stack Development, IT Support, or Hybrid Technical roles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: 'EMAIL', value: personal.email, href: `mailto:${personal.email}` },
              { icon: Phone, label: 'PHONE', value: personal.phone, href: `tel:${personal.phone}` },
              { icon: MapPin, label: 'LOCATION', value: personal.location, href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 p-4"
                style={{ border: '1px solid rgba(0,229,255,0.1)', background: 'rgba(0,229,255,0.02)' }}>
                <Icon size={18} className="text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-mono text-gray-500 tracking-widest">{label}</div>
                  {href ? (
                    <a href={href} className="text-white text-sm hover:text-cyan-400 transition-colors font-mono">{value}</a>
                  ) : (
                    <div className="text-white text-sm font-mono">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-2">
              <a href={personal.social.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(0,229,255,0.15)' }}>
                <Github size={16} /> GitHub
              </a>
              <a href={personal.social.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors"
                style={{ border: '1px solid rgba(0,229,255,0.15)' }}>
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>

            <div className="p-4 mt-4"
              style={{ border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.03)' }}>
              <div className="text-xs font-mono text-cyan-400 tracking-widest mb-2">CLEARANCE STATUS</div>
              <div className="text-white text-sm font-mono">{personal.clearance}</div>
              <div className="text-gray-500 text-xs font-mono mt-1">Available for cleared positions</div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/Contact/
git commit -m "feat: add contact section with validated form and contact info"
```

---

## Phase 11 — Wire Everything Together

### Task 18: Update main page and layout

**Files:**
- Modify: `src/app/(site)/page.tsx`
- Modify: `src/app/(site)/layout.tsx`

- [ ] **Step 1: Replace main page with portfolio sections**

Replace the contents of `src/app/(site)/page.tsx` with:

```tsx
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
```

- [ ] **Step 2: Update layout to use new Navigation and CursorGlow**

Replace the contents of `src/app/(site)/layout.tsx` with:

```tsx
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
```

- [ ] **Step 3: Create BootSequenceWrapper (client wrapper for boot gate)**

Create `src/components/portfolio/BootSequence/BootSequenceWrapper.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './index';

export default function BootSequenceWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/(site)/page.tsx src/app/(site)/layout.tsx src/components/portfolio/BootSequence/BootSequenceWrapper.tsx
git commit -m "feat: wire all portfolio sections into main page with boot sequence and navigation"
```

---

### Task 19: Delete old template components

**Files to delete:** old Header, Footer, and all template section components no longer needed.

- [ ] **Step 1: Remove old Header (replaced by Navigation)**

```bash
rm -rf src/components/Header
rm -rf src/components/Footer
rm -rf src/components/Home
rm -rf src/components/CallToAction
rm -rf src/components/Clients  
rm -rf src/components/Newsletter
rm -rf src/components/Support
rm -rf src/components/About
rm -rf src/components/Faq
rm -rf src/components/AiTools
rm -rf src/components/Breadcrumb
rm -rf src/components/Docs
rm -rf src/components/ScrollToTop
rm -rf src/components/Common
```

- [ ] **Step 2: Remove old pages no longer needed**

```bash
rm -rf "src/app/(site)/about"
rm -rf "src/app/(site)/ai-examples"
rm -rf "src/app/(site)/docs"
rm -rf "src/app/(site)/error"
```

- [ ] **Step 3: Check build compiles**

```bash
npx tsc --noEmit
```

Fix any import errors (likely pointing to deleted components). If old `ToastContext` is still referenced remove it too.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove all old template components and pages"
```

---

## Phase 12 — Verify & Polish

### Task 20: Build verification and responsive check

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Walk through:
- Boot sequence plays and fades out
- Navigation appears and scrolls work
- Hero: 3D background renders, typing effect works, metric cards animate in
- About: text and timeline animate on scroll
- Skills: badges animate in on scroll
- Experience: cards expand/collapse
- Projects: cards clickable, modal opens and closes
- Cyber Lab: terminal accepts commands and returns output, threat feed animates
- Certifications: cards animate in
- Contact: form validates (try submitting empty, then with valid data)
- Custom cursor visible and tracking
- Scroll indicator at bottom of hero

- [ ] **Step 2: Check mobile at 375px width (Chrome DevTools)**

Verify no horizontal overflow, nav hamburger menu works, hero text readable, all sections stack correctly.

- [ ] **Step 3: Fix any layout issues found**

Address any overflow, spacing, or animation issues discovered in steps 1 and 2.

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: successful build with no errors. Fix any TypeScript or import errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: responsive and build verification fixes"
```

---

## Post-Implementation Notes

- **Contact form sending:** The form currently simulates sending. To make it real, add a `/api/contact` route using nodemailer (already installed) pointing to Jon's email.
- **GitHub/LinkedIn URLs:** Update `personal.social` in `src/data/portfolio.ts` with real URLs when known.
- **Project GitHub/demo links:** Update `projects` entries with real URLs when available.
- **Profile photo:** Add a profile image to `public/images/jon.jpg` and wire it into the Hero section.
- **Three.js performance:** If frame rate is poor on lower-end machines, reduce particle count in `HeroBackground.tsx` or conditionally skip Three.js canvas on mobile.
