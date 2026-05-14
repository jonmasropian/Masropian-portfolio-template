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
