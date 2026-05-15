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
