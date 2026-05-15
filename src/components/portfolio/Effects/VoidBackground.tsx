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
