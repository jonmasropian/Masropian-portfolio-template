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
