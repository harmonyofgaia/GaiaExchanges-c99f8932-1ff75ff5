import React, { useEffect, useRef } from "react";

/**
 * MasterForestBackground
 * Single, definitive background overlay for Green Investments:
 * - Living green roots growing subtly from the bottom and edges
 * - Gentle volumetric god rays toward a distant vanishing point
 * - Low opacity, cinematic, never overpowering content
 * - 30 FPS cap, reduced-motion support, zero pointer capture
 */
export default function MasterForestBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width = 0;
    let height = 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targetFPS = prefersReducedMotion ? 12 : 30;
    const minDt = 1000 / targetFPS;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Pre-clear
      ctx.clearRect(0, 0, width, height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Scene parameters
    const baseAlpha = 0.18; // global scene opacity ceiling
    const raysAlpha = 0.10;
    const rootsAlpha = 0.22;

    // Vanishing point (slightly above center)
    let vp = { x: 0, y: 0 };

    // Build god rays geometry once
    type Ray = { angle: number; width: number; length: number; speed: number; phase: number };
    const rays: Ray[] = Array.from({ length: 9 }, (_, i) => ({
      angle: (-Math.PI / 12) + (i / 8) * (Math.PI / 6),
      width: 120 + Math.random() * 160,
      length: 0, // set on each frame from height
      speed: prefersReducedMotion ? 0.0002 : 0.0007 + Math.random() * 0.0006,
      phase: Math.random() * Math.PI * 2,
    }));

    // Root growth system
    type Shoot = {
      x: number;
      y: number;
      dir: number;
      life: number;
      w: number;
    };
    const shoots: Shoot[] = [];

    function seedShoots() {
      shoots.length = 0;
      // Bottom base seeds
      const count = 6;
      for (let i = 0; i < count; i++) {
        const px = width * (0.12 + i * (0.76 / (count - 1))) + (Math.random() * 24 - 12);
        shoots.push({ x: px, y: height * 0.98, dir: -Math.PI / 2 + (Math.random() - 0.5) * 0.3, life: 320 + Math.random() * 160, w: 2.2 + Math.random() * 1.6 });
      }
      // Side wall seeds
      const sideCount = 4;
      for (let i = 0; i < sideCount; i++) {
        const py = height * (0.45 + i * (0.46 / sideCount));
        shoots.push({ x: 2, y: py, dir: Math.random() * (-Math.PI / 3) - Math.PI / 6, life: 140 + Math.random() * 120, w: 1.4 + Math.random() * 0.8 });
        shoots.push({ x: width - 2, y: py, dir: Math.PI - (Math.random() * (-Math.PI / 3) - Math.PI / 6), life: 140 + Math.random() * 120, w: 1.4 + Math.random() * 0.8 });
      }
    }

    let lastW = -1, lastH = -1;

    function drawGodRays(t: number) {
      if (width !== lastW || height !== lastH) {
        // refresh dependent sizes and vanishing point
        vp = { x: width * 0.5, y: height * 0.32 };
        for (const r of rays) {
          r.length = height * (0.9 + Math.random() * 0.3);
        }
        seedShoots();
        lastW = width; lastH = height;
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = baseAlpha * raysAlpha;

      for (const r of rays) {
        // Small temporal drift (breathing)
        const sway = Math.sin(t * r.speed + r.phase) * 0.08;
        const a = r.angle + sway;

        const dx = Math.cos(a);
        const dy = Math.sin(a);

        const px = vp.x;
        const py = vp.y;

        // Build a tapered quad along the ray
        const w0 = r.width * 0.08;
        const w1 = r.width;

        const nx = -dy;
        const ny = dx;

        const x0a = px + nx * w0;
        const y0a = py + ny * w0;
        const x0b = px - nx * w0;
        const y0b = py - ny * w0;

        const x1 = px + dx * r.length;
        const y1 = py + dy * r.length;

        const x1a = x1 + nx * w1;
        const y1a = y1 + ny * w1;
        const x1b = x1 - nx * w1;
        const y1b = y1 - ny * w1;

        const grad = ctx.createLinearGradient(px, py, x1, y1);
        grad.addColorStop(0, "rgba(0, 255, 170, 0.00);");
        grad.addColorStop(0.25, "rgba(0, 255, 170, 0.06);");
        grad.addColorStop(0.55, "rgba(100, 255, 210, 0.05);");
        grad.addColorStop(1, "rgba(0, 255, 170, 0.00);");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x0a, y0a);
        ctx.lineTo(x1a, y1a);
        ctx.lineTo(x1b, y1b);
        ctx.lineTo(x0b, y0b);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    function drawRoots() {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = baseAlpha * rootsAlpha;

      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];

        const step = prefersReducedMotion ? 0.6 : 1.2;
        const bend = 0.08 * (Math.random() - 0.5);
        s.dir += bend;

        const len = 6 + Math.random() * 10;
        const nx = Math.cos(s.dir) * len;
        const ny = Math.sin(s.dir) * len;

        const x1 = s.x + nx * 0.5;
        const y1 = s.y + ny * 0.5;
        const x2 = s.x + nx;
        const y2 = s.y + ny;

        // Stroke style: neon green to teal
        const g = ctx.createLinearGradient(s.x, s.y, x2, y2);
        g.addColorStop(0, "rgba(0, 255, 166, 0.6);");
        g.addColorStop(0.5, "rgba(20, 255, 200, 0.55);");
        g.addColorStop(1, "rgba(0, 200, 140, 0.5);");

        ctx.strokeStyle = g;
        ctx.lineWidth = Math.max(0.7, s.w);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(x1, y1, x2, y2);
        ctx.stroke();

        // Soft glow halo
        ctx.shadowColor = "rgba(0,255,190,0.3);";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(x1, y1, x2, y2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        s.x = x2;
        s.y = y2;
        s.life -= step;
        s.w *= 0.994;

        // Occasional branching
        if (!prefersReducedMotion && s.life > 40 && Math.random() < 0.015) {
          const branchDir = s.dir + (Math.random() - 0.5) * 0.9;
          shoots.push({
            x: s.x,
            y: s.y,
            dir: branchDir,
            life: s.life * (0.6 + Math.random() * 0.25),
            w: Math.max(0.5, s.w * (0.7 + Math.random() * 0.2)),
          });
        }

        // Cull dead or off-screen
        if (
          s.life <= 0 ||
          s.x < -40 ||
          s.x > width + 40 ||
          s.y < -40 ||
          s.y > height + 40 ||
          s.w < 0.4
        ) {
          shoots.splice(i, 1);
        }
      }

      // Maintain population
      if (!prefersReducedMotion && shoots.length < 24) {
        const px = width * (0.1 + Math.random() * 0.8);
        shoots.push({
          x: px,
          y: height * (0.96 + Math.random() * 0.03),
          dir: -Math.PI / 2 + (Math.random() - 0.5) * 0.4,
          life: 180 + Math.random() * 180,
          w: 1.4 + Math.random(),
        });
      }

      ctx.restore();
    }

    function drawVignette() {
      // Deep hallway vignette to amplify depth but keep it subtle
      const radial = ctx.createRadialGradient(
        width * 0.5,
        height * 0.6,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.6,
        Math.max(width, height) * 0.8,
      );
      radial.addColorStop(0, "rgba(0,0,0,0.00);");
      radial.addColorStop(0.55, "rgba(2, 10, 10, 0.12);");
      radial.addColorStop(1, "rgba(0,0,0,0.35);");

      ctx.save();
      ctx.globalAlpha = baseAlpha;
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    let last = performance.now();
    function step(now: number) {
      rafRef.current = requestAnimationFrame(step);
      const dt = now - last;
      if (dt < minDt) return;
      last = now;

      // Clear with full clear; trails are handled by line glow instead of accumulation
      ctx.clearRect(0, 0, width, height);

      drawGodRays(now);
      drawRoots();
      drawVignette();
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}