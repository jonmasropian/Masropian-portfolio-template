'use client';
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  glow: boolean;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const STAR_COLORS = [
  '#ffffff', '#ffffff', '#ffffff', '#ffffff',
  '#c084fc', '#c084fc',
  '#00e5ff', '#00e5ff',
  '#7b2fff',
];

function buildStars(w: number, h: number): Star[] {
  return Array.from({ length: 180 }, () => {
    const roll = Math.random();
    const size = roll < 0.65 ? 1 : roll < 0.88 ? 2 : 3;
    const speed = 0.04 + Math.random() * 0.1; // gentle drift
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      glow: size >= 2,
      opacity: 0.5 + Math.random() * 0.5,
      twinkleSpeed: 0.3 + Math.random() * 1.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    };
  });
}

function drawSigil(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  angle: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  ctx.globalAlpha = 0.05;
  ctx.strokeStyle = '#7b2fff';
  ctx.lineWidth = 0.8;

  ctx.setLineDash([6, 10]);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([3, 8]);
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.lineWidth = 0.4;
  ctx.strokeStyle = '#5b00c0';
  [
    [0, -r, 0, r], [-r, 0, r, 0],
    [-r * 0.7, -r * 0.7, r * 0.7, r * 0.7],
    [r * 0.7, -r * 0.7, -r * 0.7, r * 0.7],
  ].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  });

  ctx.strokeStyle = '#7b2fff';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.06;
  [
    [0, 0, -r * 0.35, -r * 0.55, -r * 0.95, -r * 0.8],
    [0, 0,  r * 0.35, -r * 0.55,  r * 0.95, -r * 0.8],
    [0, 0, -r * 0.5,  r * 0.35, -r * 0.7,   r * 0.95],
    [0, 0,  r * 0.5,  r * 0.35,  r * 0.7,   r * 0.95],
    [0, 0, -r * 0.65, r * 0.1,  -r,          0       ],
    [0, 0,  r * 0.65, r * 0.1,   r,          0       ],
  ].forEach(([x1, y1, cpx, cpy, x2, y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(cpx, cpy, x2, y2); ctx.stroke();
  });

  ctx.globalAlpha = 0.8;
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function VoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<Star[]>([]);
  const angleRef  = useRef(0);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef(0); // time counter for twinkle

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = buildStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Sigil completes one revolution per 90 s at 60 fps
    const RPM = (2 * Math.PI) / (90 * 60);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const { width: w, height: h } = canvas;

      ctx.clearRect(0, 0, w, h);

      tRef.current += 0.016;

      // Draw + update stars
      starsRef.current.forEach((star) => {
        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < -4)  star.x = w + 4;
        if (star.x > w + 4) star.x = -4;
        if (star.y < -4)  star.y = h + 4;
        if (star.y > h + 4) star.y = -4;

        // Twinkle
        const alpha = star.opacity *
          (0.7 + 0.3 * Math.sin(tRef.current * star.twinkleSpeed + star.twinkleOffset));

        ctx.save();
        if (star.glow) {
          ctx.shadowBlur  = 7;
          ctx.shadowColor = star.color;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw rotating sigil
      const cx     = w / 2;
      const cy     = h / 2;
      const radius = Math.min(w, h) * 0.38;
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
