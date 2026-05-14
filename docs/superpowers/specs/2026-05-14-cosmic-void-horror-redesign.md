# Cosmic Void Horror — Full Site Redesign

**Date:** 2026-05-14  
**Status:** Approved  
**Scope:** Full visual redesign of all portfolio sections

---

## Summary

Redesign the existing cyberpunk portfolio (black bg, neon cyan, CRT scanlines, terminal aesthetic) into a **Cosmic Void Horror** theme. Inspiration: *Event Horizon*, *Dead Space*, *System Shock*. The site should feel like a recovered signal from the abyss — professional enough to show hiring managers, distinctive enough to be unforgettable.

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Aesthetic | Cosmic Void Horror | Deep space + Lovecraftian dread + corrupted UI |
| Horror intensity | Full horror mode | Corrupted text, glitch events, anomaly warnings, tentacle geometry |
| Primary accent | Void Purple `#7b2fff` / `#c084fc` | The void itself |
| Secondary accent | Surviving Cyan `#00e5ff` | The dying machine signal bleeding through |
| Background | Fixed canvas: sparse stars + rotating sigil | Not scrollable, lightweight, won't slow the page |
| Stars/particles | Sparse (~150) | Differentiates from buddy's heavy-particle rotating-planet scene |

---

## Color System

### New Palette (replaces current cyan-only system)

```
Void Black:      #000005   (background, replaces #000000)
Void Deep:       #0d0010   (section backgrounds)
Void Purple:     #3b0070   (borders, deep accents)
Electric Purple: #7b2fff   (primary accent — glows, borders, nodes)
Mid Purple:      #8b5cf6   (secondary purple)
Pale Lavender:   #c084fc   (headings, labels, text accents)
Cyan Signal:     #00e5ff   (interactive elements, terminal text, data — KEPT)
Horror Red:      #ff4d6d   (error states, anomaly alerts only)
```

### Usage Rules
- **Purple** = void/horror atmosphere — backgrounds, heading glows, timeline nodes, card borders, scrollbar, cursor glow
- **Cyan** = machine/data/interactive — terminal text, links, active nav items, metric cards, skill badges (ops/security category)
- **Red** = danger/anomaly — error lines in boot sequence, anomaly warning overlays, threat feed alerts
- **White** = body text only, no accent use

---

## Background System

### Implementation: Single `<canvas>` (lightweight, fixed)

**File:** `src/components/portfolio/Effects/VoidBackground.tsx`

- Canvas is `position: fixed`, `inset: 0`, `z-index: 0`, `pointer-events: none`
- All page content sits at `z-index: 1` or above
- Canvas does NOT repaint on scroll — it is scroll-independent by design
- Uses `requestAnimationFrame` with a frame throttle (target 30fps on canvas, not 60) to minimize CPU impact

### Layer 1 — Sparse Stars (~150 particles)
- Random positions generated once on mount, never change
- Mix of sizes: 70% × 1px, 20% × 2px, 10% × 3px
- Colors: 60% white, 25% pale lavender `#c084fc`, 15% cyan `#00e5ff`
- No drift/movement — static stars. Avoids the "busy" look of heavy particle systems.
- Faint glow via `shadowBlur` on larger stars only

### Layer 2 — Rotating Void Sigil
- Drawn via Canvas 2D API (not SVG, for performance)
- Centered at viewport center
- Rotates at 1 revolution per 90 seconds (imperceptibly slow, creates unease)
- Elements: outer dashed ring, inner ring, 4 axis lines, 4 diagonal lines, 8 tentacle-curve paths, center point
- Color: `rgba(123, 47, 255, 0.06)` — barely visible, felt not seen
- No scroll reaction in this iteration (keep it simple)

### CSS Nebula (not canvas)
- Three `radial-gradient` layers on `body::before` or a fixed `<div>`
- Purple nebula cloud at 20% left / 30% top
- Smaller purple cloud at 80% right / 70% bottom  
- Faint cyan cloud at 60% left / 10% top
- These are pure CSS, zero runtime cost

---

## Global Horror Effects

### 1. CRT Scanlines
- Existing implementation kept, opacity slightly increased from `0.05` to `0.08`

### 2. Glitch Text Effect (updated colors)
- `::before` pseudo-element: color changes from `#00E5FF` to `#c084fc` (purple offset)
- `::after` pseudo-element: color stays `#B71C1C` → changes to `#7b2fff` (deeper purple)
- Applied to: site name in nav, hero name heading, section titles

### 3. Char Corruption Effect (new)
- A lightweight JS utility (`src/lib/corruption.ts`)
- Randomly replaces 1-2 chars in a target string with glitch chars (`░▒▓█▀▄╬╪╫`) for 80ms, then restores
- Fires on: hover over nav links, hero subtitle every ~8s, error lines in boot sequence
- Not applied globally — only on specific targeted elements

### 4. Anomaly Event System (new)
- `src/components/portfolio/Effects/AnomalyOverlay.tsx`
- A fixed-position overlay that appears briefly (~2.5s) every ~45 seconds
- Shows a single red/purple warning message chosen randomly from a pool:
  - `ANOMALY DETECTED // SECTOR UNKNOWN`
  - `SIGNAL ORIGIN: UNRESOLVABLE`
  - `REALITY ANCHOR: UNSTABLE`
  - `UNKNOWN ENTITY OBSERVING`
- Appears at a random corner of the screen, flickers, then fades out
- Does NOT block interaction (pointer-events: none)
- Can be disabled if it proves distracting during review

### 5. Scrollbar
- Thumb: `#7b2fff` (was `#00E5FF`)
- Track: `#0a0010` (was `#0A0A0A`)

### 6. Custom Cursor Glow
- Existing cursor glow color: `rgba(0, 229, 255, 0.15)` → `rgba(123, 47, 255, 0.2)`

---

## Section-by-Section Changes

### Boot Sequence (`BootSequence/index.tsx`)
- Terminal background: `#000005` with faint purple tint
- Boot lines updated with horror framing:
  - Add mid-sequence warning: `WARNING: ANOMALOUS SIGNAL DETECTED`
  - Add error line: `[ERR_0xDEAD] REALITY ANCHOR UNSTABLE — PROCEEDING ANYWAY`
  - Final line: `SOMETHING IS WATCHING. ENTERING PORTFOLIO...`
- Error lines rendered in `#ff4d6d`, warning lines in `#c084fc`, normal lines in `#00e5ff`
- Char corruption effect fires on error lines as they type

### Navigation (`Navigation/index.tsx`)
- Logo text: `MASROPIAN.SYS` — pulses with purple glow animation
- Nav border: purple glow (`rgba(123, 47, 255, 0.4)`) replaces cyan
- Active link: stays cyan `#00e5ff`
- Inactive links: `rgba(192, 132, 252, 0.6)` (pale lavender)
- Hover: char corruption + purple glow intensifies

### Hero (`Hero/index.tsx`, `HeroBackground.tsx`)
- `HeroBackground.tsx` replaced by `VoidBackground.tsx` (the shared fixed canvas — no duplicate bg)
- Hero section itself is transparent, sits above the global canvas
- Section label above name: `// SIGNAL RECOVERED FROM THE VOID //` in dim cyan
- Name heading: purple glitch effect (`#c084fc` glow)
- Typing effect subtitle: cyan (unchanged)
- Veteran/clearance tag: purple border, lavender text, flicker animation
- Metric cards: purple border glow, cyan values

### About / Military Timeline (`About/index.tsx`, `MilitaryTimeline.tsx`)
- Section header framing: `OPERATIVE_FILE: MASROPIAN_J`
- Timeline nodes: purple (`#7b2fff`) glow
- Cyan node used for "current/active" milestone
- Anomaly bar below timeline: `ANOMALY: 22 years of encrypted service records detected`

### Skills (`Skills/index.tsx`, `SkillBadge.tsx`, `SkillCategory.tsx`)
- Section label: `// SCANNING OPERATOR CAPABILITIES //`
- Category headers: pale lavender `#c084fc`
- Badge color split:
  - Dev/frontend skills: purple border + lavender text
  - Ops/security/networking skills: cyan border + cyan text
- Hover: 80ms char corruption before badge name restores

### Experience (`Experience/index.tsx`, `ExperienceCard.tsx`)
- Section framing: `MISSION LOGS: RECOVERED DATA`
- Card borders: purple glow
- Date ranges: cyan
- Card expand animation: existing kept, border glow intensifies on open

### Projects (`Projects/index.tsx`, `ProjectCard.tsx`, `ProjectModal.tsx`)
- Section framing: `CLASSIFIED OPERATIONS // PARTIAL DECRYPT`
- Cards: purple border, dark void background `rgba(20, 0, 40, 0.5)`
- Tech stack tags: cyan
- Modal: full dark void background, purple header, cyan links
- "View project" CTA: purple button with cyan text

### Certifications (`Certifications/index.tsx`, `CertCard.tsx`)
- Section framing: `CLEARANCE VERIFIED // CREDENTIALS ON RECORD`
- Cert cards: purple border, lavender cert name, cyan issuer
- Verified badge: green replaced with cyan checkmark

### Cyber Lab (`CyberLab/index.tsx`, `Terminal.tsx`, `ThreatFeed.tsx`)
- Terminal prompt changes from `$` to `VOID://>`
- Terminal border: cyan pulse (unchanged — terminal is the "machine" element)
- ThreatFeed: alert items shift to purple/red color coding
- Background of the lab section: deepest void `#000005`

### Contact (`Contact/index.tsx`, `ContactForm.tsx`)
- Section framing: `TRANSMIT INTO THE VOID`
- Input borders: purple glow on focus
- Submit button: purple background, cyan text, `TRANSMIT` label
- Contact info sidebar: cyan text, purple icon glows

---

## Files to Create

| File | Purpose |
|---|---|
| `src/components/portfolio/Effects/VoidBackground.tsx` | Fixed canvas: stars + sigil |
| `src/components/portfolio/Effects/AnomalyOverlay.tsx` | Random anomaly warning events |
| `src/lib/corruption.ts` | Char corruption utility function |

## Files to Modify

| File | Change |
|---|---|
| `src/lib/theme.ts` | Add full purple palette, update glow values |
| `src/styles/tailwind.css` | Update CSS variables, glitch colors, scrollbar, scanline opacity |
| `src/app/(site)/layout.tsx` | Mount `VoidBackground` and `AnomalyOverlay` |
| `src/components/portfolio/BootSequence/index.tsx` | Horror boot lines + char corruption |
| `src/components/portfolio/Navigation/index.tsx` | Purple nav styling |
| `src/components/portfolio/Hero/index.tsx` | Purple glitch name, section label |
| `src/components/portfolio/Hero/HeroBackground.tsx` | Remove (replaced by global VoidBackground) |
| `src/components/portfolio/Hero/MetricCards.tsx` | Purple border glow |
| `src/components/portfolio/About/index.tsx` | Horror framing labels |
| `src/components/portfolio/About/MilitaryTimeline.tsx` | Purple nodes, anomaly bar |
| `src/components/portfolio/Skills/SkillBadge.tsx` | Dual-color badges, corruption hover |
| `src/components/portfolio/Skills/SkillCategory.tsx` | Lavender category headers |
| `src/components/portfolio/Experience/ExperienceCard.tsx` | Purple card borders |
| `src/components/portfolio/Projects/ProjectCard.tsx` | Void card styling |
| `src/components/portfolio/Projects/ProjectModal.tsx` | Void modal styling |
| `src/components/portfolio/Certifications/CertCard.tsx` | Purple cert card styling |
| `src/components/portfolio/CyberLab/Terminal.tsx` | VOID://> prompt |
| `src/components/portfolio/CyberLab/ThreatFeed.tsx` | Purple/red threat alerts |
| `src/components/portfolio/Contact/ContactForm.tsx` | Purple inputs, TRANSMIT button |
| `src/components/portfolio/Contact/index.tsx` | Horror framing label |
| `src/data/portfolio.ts` | Update boot sequence lines |

---

## Out of Scope

- No changes to site structure, routing, or page layout
- No new sections added
- No font changes (monospace + sans stays)
- No changes to form validation logic
- No Three.js — canvas only
- Anomaly overlay is decorative only, never blocks content
