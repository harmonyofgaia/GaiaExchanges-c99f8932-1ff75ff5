import React, { useEffect, useRef } from "react";

type Branch = {
  x: number;
  y: number;
  angle: number;   // radians
  width: number;   // line width
  life: number;    // remaining growth steps
  speed: number;   // pixels per frame
  neon: string;    // stroke style
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * NeonTreeBackground
 * - Draws a slowly growing neon tree from far (tiny) to near (large), with a soft parallax glow.
 * - Adds subtle "matrix/glitch neural roots" particles in the background for a living ambience.
 * - Tuned for performance: capped FPS, batch drawing, minimal allocations.
 */
export default function NeonTreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Handle resize
    const onResize = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);

    // Neon palette
    const greens = ["#00ffa6", "#36ffd6", "#14ffb0"];
    const roots = ["#15c9ff22", "#00ff6e15", "#00b3ff20"];

    // Initial seed near bottom center, slightly randomized
    const baseX = canvas.offsetWidth * 0.5 + rand(-40, 40);
    const baseY = canvas.offsetHeight * 0.92;

    const branches: Branch[] = [];
    const makeBranch = (x: number, y: number, angle: number, widthPx: number, life: number) => {
      branches.push({
        x, y, angle,
        width: widthPx,
        life,
        speed: rand(1.2, 2.4),
        neon: greens[Math.floor(rand(0, greens.length))]
      });
    };

    // Seed trunk small to big (tiny -> big)
    makeBranch(baseX, baseY, -Math.PI / 2, 2.5, 340);

    // Background neural/matrix particles
    const particleCount = Math.min(120, Math.floor((width * height) / 15000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: rand(0, width / devicePixelRatio),
      y: rand(0, height / devicePixelRatio),
      vy: rand(0.15, 0.6),
      vx: rand(-0.05, 0.05),
      a: roots[Math.floor(rand(0, roots.length))]
    }));

    let last = performance.now();
    const targetFPS = 30;
    const minDt = 1000 / targetFPS;

    function step(now: number) {
      rafRef.current = requestAnimationFrame(step);
      const dt = now - last;
      if (dt < minDt) return;
      last = now;

      // Fade a bit to produce neon trails
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, width / devicePixelRatio, height / devicePixelRatio);

      // Subtle grid/scanline to enhance matrix feel
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = "#00ffbb";
      const spacing = 28;
      for (let x = 0; x < width / devicePixelRatio; x += spacing) {
        ctx.fillRect(x, 0, 1, height / devicePixelRatio);
      }
      for (let y = 0; y < height / devicePixelRatio; y += spacing) {
        ctx.fillRect(0, y, width / devicePixelRatio, 1);
      }
      ctx.restore();

      // Background neural particles (glitching pathways)
      ctx.save();
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y > height / devicePixelRatio) {
          p.y = -2;
          p.x = rand(0, width / devicePixelRatio);
        }
        if (p.x < -2) p.x = width / devicePixelRatio + 2;
        if (p.x > width / devicePixelRatio + 2) p.x = -2;

        ctx.strokeStyle = p.a;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + rand(-3, 3), p.y + rand(6, 12));
        ctx.stroke();
      }
      ctx.restore();

      // Grow tree branches
      const next: Branch[] = [];
      for (const b of branches) {
        if (b.life <= 0 || b.width < 0.25) continue;

        const len = clamp(b.speed, 0.6, 2.6);
        const nx = b.x + Math.cos(b.angle) * len;
        const ny = b.y + Math.sin(b.angle) * len;

        // Glow
        ctx.save();
        ctx.shadowColor = b.neon;
        ctx.shadowBlur = 12;
        ctx.strokeStyle = b.neon;
        ctx.lineWidth = b.width;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.restore();

        b.x = nx;
        b.y = ny;
        b.life -= 1;

        // Slight sway
        b.angle += rand(-0.02, 0.02);

        // Branching
        if (Math.random() < 0.02 && b.width > 0.6) {
          // fork
          next.push({
            ...b,
            angle: b.angle + rand(0.25, 0.55),
            width: b.width * rand(0.68, 0.78),
            life: b.life * rand(0.6, 0.9),
            neon: greens[Math.floor(rand(0, greens.length))]
          });
          next.push({
            ...b,
            angle: b.angle - rand(0.25, 0.55),
            width: b.width * rand(0.68, 0.78),
            life: b.life * rand(0.6, 0.9),
            neon: greens[Math.floor(rand(0, greens.length))]
          });
        } else if (Math.random() < 0.06) {
          // slight split
          next.push({
            ...b,
            angle: b.angle + rand(-0.18, 0.18),
            width: b.width * rand(0.82, 0.92),
            life: b.life * rand(0.95, 1.02)
          });
        } else {
          next.push(b);
        }
      }
      branches.length = 0;
      branches.push(...next);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-90"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 100%, rgba(0,10,8,0.75) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,1) 100%)",
        }}
      />
      {/* Soft vignette for column readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
    </div>
  );
}