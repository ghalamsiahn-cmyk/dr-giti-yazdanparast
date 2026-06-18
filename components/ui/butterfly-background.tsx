"use client";

import { useEffect, useRef } from "react";

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  flapSpeed: number;
  opacity: number;
  hue: number;
  angle: number; // direction of travel
}

interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

export default function ButterflyBackground({
  className = "absolute inset-0 w-full h-full",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const W = () => canvas.width;
    const H = () => canvas.height;

    const COUNT = 12;
    const butterflies: Butterfly[] = Array.from({ length: COUNT }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.35 + Math.random() * 0.45;
      return {
        x: Math.random() * (W() || 1280),
        y: Math.random() * (H() || 900),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 32 + Math.random() * 52,
        phase: (i / COUNT) * Math.PI * 2,
        flapSpeed: 2.2 + Math.random() * 1.8,
        opacity: 0.55 + Math.random() * 0.35,
        hue: 265 + Math.random() * 60,
        angle,
      };
    });

    const particles: Particle[] = [];

    // ── Draw a single butterfly centred at (0,0) ──────────────────────
    const drawButterfly = (b: Butterfly, t: number) => {
      const flap = Math.sin(t * b.flapSpeed + b.phase);
      // w goes 0→1: 0 = wings folded shut, 1 = fully open
      const w = Math.abs(flap);
      const s = b.size;

      ctx.save();
      ctx.translate(b.x, b.y);
      // Rotate to face direction of travel
      ctx.rotate(b.angle - Math.PI / 2);
      ctx.globalAlpha = b.opacity;

      const hue = b.hue;
      const wingMain  = `hsla(${hue}, 62%, 52%, 0.92)`;
      const wingLight = `hsla(${hue + 18}, 80%, 76%, 0.9)`;
      const wingDeep  = `hsla(${hue - 15}, 70%, 32%, 0.95)`;

      // ── Glow grows when wings spread ────────────────────────────────
      ctx.shadowBlur = 22 * w + 4;
      ctx.shadowColor = `hsla(${hue}, 75%, 70%, ${0.4 * w + 0.05})`;

      // Helper: draw one side's upper + lower wing then mirror
      const drawSide = (side: 1 | -1) => {
        // Upper wing
        ctx.beginPath();
        ctx.moveTo(0, s * 0.06);
        ctx.bezierCurveTo(
          side * s * 0.35 * w, -s * 1.05,
          side * s * 1.45 * w, -s * 0.82,
          side * s * 1.55 * w, -s * 0.04
        );
        ctx.bezierCurveTo(
          side * s * 1.35 * w,  s * 0.26,
          side * s * 0.48 * w,  s * 0.14,
          0,                     s * 0.06
        );
        ctx.closePath();

        const gr = ctx.createLinearGradient(side * s * 1.2 * w, -s * 0.7, 0, 0);
        gr.addColorStop(0,   wingLight);
        gr.addColorStop(0.5, wingMain);
        gr.addColorStop(1,   wingDeep);
        ctx.fillStyle = gr;
        ctx.fill();

        // Lower wing
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.06);
        ctx.bezierCurveTo(
          side * s * 0.52 * w,  s * 0.78,
          side * s * 1.12 * w,  s * 0.68,
          side * s * 1.02 * w,  s * 0.18
        );
        ctx.bezierCurveTo(
          side * s * 0.82 * w,  s * 0.04,
          side * s * 0.28 * w, -s * 0.02,
          0,                    -s * 0.06
        );
        ctx.closePath();

        const gl = ctx.createLinearGradient(side * s * 0.8 * w, s * 0.5, 0, 0);
        gl.addColorStop(0,   wingLight);
        gl.addColorStop(1,   wingMain);
        ctx.fillStyle = gl;
        ctx.fill();
      };

      drawSide(-1);
      drawSide(1);

      // ── Wing border accent & spots (only when sufficiently open) ────
      if (w > 0.3) {
        ctx.shadowBlur = 0;
        const spotOpacity = (w - 0.3) / 0.7;
        ctx.globalAlpha = b.opacity * spotOpacity * 0.75;
        const spotColor = `hsla(${hue + 25}, 95%, 88%, 0.85)`;

        const spots: [number, number, number][] = [
          [-0.62, -0.72, 0.065],
          [-0.95, -0.45, 0.055],
          [-0.60, -0.20, 0.048],
          [-0.70,  0.42, 0.052],
          [-0.42,  0.62, 0.044],
        ];

        spots.forEach(([sx, sy, r]) => {
          // left side
          ctx.beginPath();
          ctx.arc(sx * s * w, sy * s, r * s, 0, Math.PI * 2);
          ctx.fillStyle = spotColor;
          ctx.fill();
          // right side (mirror x)
          ctx.beginPath();
          ctx.arc(-sx * s * w, sy * s, r * s, 0, Math.PI * 2);
          ctx.fill();
        });

        // Wing border stripe
        ctx.globalAlpha = b.opacity * spotOpacity * 0.35;
        ctx.strokeStyle = wingLight;
        ctx.lineWidth = s * 0.025;
        ctx.beginPath();
        ctx.moveTo(-s * 0.02 * w, s * 0.06);
        ctx.bezierCurveTo(
          -s * 0.35 * w, -s * 1.05,
          -s * 1.45 * w, -s * 0.82,
          -s * 1.55 * w, -s * 0.04
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s * 0.02 * w, s * 0.06);
        ctx.bezierCurveTo(
          s * 0.35 * w, -s * 1.05,
          s * 1.45 * w, -s * 0.82,
          s * 1.55 * w, -s * 0.04
        );
        ctx.stroke();
      }

      // ── Antennae ─────────────────────────────────────────────────────
      ctx.globalAlpha = b.opacity * 0.7;
      ctx.shadowBlur = 5;
      ctx.shadowColor = `hsla(${hue}, 60%, 80%, 0.6)`;
      ctx.strokeStyle = `hsla(${hue + 10}, 50%, 75%, 0.65)`;
      ctx.lineWidth = s * 0.016;
      ctx.lineCap = "round";

      [[-1, 1], [1, -1]].forEach(([sx]) => {
        ctx.beginPath();
        ctx.moveTo(sx * s * 0.05, -s * 0.08);
        ctx.quadraticCurveTo(sx * s * 0.28, -s * 0.6, sx * s * 0.18, -s * 0.82);
        ctx.stroke();
        // Knob
        ctx.beginPath();
        ctx.arc(sx * s * 0.18, -s * 0.84, s * 0.038, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 55%, 78%, 0.8)`;
        ctx.fill();
      });

      // ── Body ─────────────────────────────────────────────────────────
      ctx.globalAlpha = b.opacity;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(20, 8, 40, 0.7)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.055, s * 0.2, 0, 0, Math.PI * 2);
      const bodyGrad = ctx.createLinearGradient(0, -s * 0.2, 0, s * 0.2);
      bodyGrad.addColorStop(0, `hsla(${hue}, 40%, 30%, 0.95)`);
      bodyGrad.addColorStop(1, `hsla(${hue}, 60%, 15%, 0.98)`);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      ctx.restore();
    };

    // ── Spawn shimmer particles near butterfly ─────────────────────────
    const spawnParticle = (b: Butterfly) => {
      if (Math.random() > 0.18) return;
      particles.push({
        x: b.x + (Math.random() - 0.5) * b.size * 2.5,
        y: b.y + (Math.random() - 0.5) * b.size * 2.5,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        hue: b.hue + (Math.random() - 0.5) * 30,
        size: 1.5 + Math.random() * 3,
      });
    };

    const drawParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y - progress * 20, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 80%, 80%, ${alpha * 0.6})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    let animId: number;
    const startTime = Date.now();

    const render = () => {
      const t = (Date.now() - startTime) / 1000;

      // ── Background ─────────────────────────────────────────────────
      ctx.fillStyle = "#140D1C";
      ctx.fillRect(0, 0, W(), H());

      // Soft centre bloom
      const bloom = ctx.createRadialGradient(W() * 0.5, H() * 0.5, 0, W() * 0.5, H() * 0.5, W() * 0.65);
      bloom.addColorStop(0, "rgba(75, 35, 110, 0.2)");
      bloom.addColorStop(1, "rgba(20, 13, 28, 0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W(), H());

      drawParticles();

      butterflies.forEach((b) => {
        // Organic sinusoidal drift
        b.x += b.vx + Math.sin(t * 0.35 + b.phase) * 0.4;
        b.y += b.vy + Math.cos(t * 0.28 + b.phase * 1.3) * 0.28;

        // Gently steer toward center so they don't all escape
        const cx = W() / 2, cy = H() / 2;
        const dx = cx - b.x, dy = cy - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > Math.min(W(), H()) * 0.52) {
          b.vx += dx * 0.0004;
          b.vy += dy * 0.0004;
        }

        // Cap speed
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed > 0.9) { b.vx *= 0.9 / speed; b.vy *= 0.9 / speed; }

        // Update travel angle smoothly
        const targetAngle = Math.atan2(b.vy, b.vx);
        const angleDiff = targetAngle - b.angle;
        b.angle += Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff)) * 0.06;

        // Wrap viewport edges
        const m = b.size * 2;
        if (b.x < -m) b.x = W() + m;
        if (b.x > W() + m) b.x = -m;
        if (b.y < -m) b.y = H() + m;
        if (b.y > H() + m) b.y = -m;

        spawnParticle(b);
        drawButterfly(b, t);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
