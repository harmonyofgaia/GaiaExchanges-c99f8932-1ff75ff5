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

      // Update neural particles
      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) {
          p.y = height / devicePixelRatio + 10;
          p.x = rand(0, width / devicePixelRatio);
        }
        if (p.x < -10 || p.x > width / devicePixelRatio + 10) {
          p.x = rand(0, width / devicePixelRatio);
        }
        
        ctx.fillStyle = p.a;
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      // Grow tree branches
      for (let i = branches.length - 1; i >= 0; i--) {
        const b = branches[i];
        if (b.life <= 0) continue;

        const dx = Math.cos(b.angle) * b.speed;
        const dy = Math.sin(b.angle) * b.speed;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = b.neon;
        ctx.lineWidth = b.width;
        ctx.lineCap = "round";
        ctx.shadowColor = b.neon;
        ctx.shadowBlur = b.width * 2;

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        b.x += dx;
        b.y += dy;
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();

        b.life--;

        // Occasionally branch out
        if (b.life > 20 && Math.random() < 0.08 && b.width > 0.8) {
          const variation = rand(-0.6, 0.6);
          const newAngle = b.angle + variation;
          const newWidth = b.width * rand(0.65, 0.9);
          const newLife = Math.floor(b.life * rand(0.4, 0.85));
          makeBranch(b.x, b.y, newAngle, newWidth, newLife);
        }

        // Gradual width reduction for organic taper
        if (b.life % 8 === 0 && b.width > 0.3) {
          b.width *= 0.98;
        }
      }
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
    </div>
  );
}