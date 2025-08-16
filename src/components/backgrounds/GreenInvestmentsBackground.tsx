import React, { useEffect, useRef } from "react";

/**
 * GreenInvestmentsBackground
 * 
 * Implements the specified background for Green Investments page:
 * - Hallway background image with subtle green neon tint
 * - Very subtle, low-CPU matrix rain effect
 * - Slow growing roots line animation
 * - Never overlays content (z-index and pointer-events safeguards)
 * - Respects prefers-reduced-motion
 * - Responsive and performant
 */
export default function GreenInvestmentsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Cap DPR for performance
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let width = 0;
    let height = 0;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Matrix rain setup (very subtle)
    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZぁいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
    const fontSize = 12;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width * dpr;
      height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
      
      // Recalculate columns and drops on resize
      columns = Math.floor(rect.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -500; // Start with staggered timing
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Growing roots paths (SVG-like paths)
    const rootPaths: Array<{
      x: number;
      y: number;
      segments: Array<{ x: number; y: number }>;
      growth: number;
      maxGrowth: number;
    }> = [];

    // Create initial root paths
    const createRootPath = (startX: number, startY: number) => {
      const segments: Array<{ x: number; y: number }> = [{ x: startX, y: startY }];
      const numSegments = 15 + Math.random() * 10;
      
      let currentX = startX;
      let currentY = startY;
      
      for (let i = 1; i < numSegments; i++) {
        currentX += (Math.random() - 0.5) * 40;
        currentY -= Math.random() * 20 + 10;
        segments.push({ x: currentX, y: currentY });
      }
      
      return {
        x: startX,
        y: startY,
        segments,
        growth: 0,
        maxGrowth: segments.length
      };
    };

    // Initialize roots from bottom and edges
    for (let i = 0; i < 8; i++) {
      const x = (width / dpr) * (i / 7);
      rootPaths.push(createRootPath(x, height / dpr + 20));
    }

    // Add some edge roots
    rootPaths.push(createRootPath(-20, height / dpr * 0.8));
    rootPaths.push(createRootPath(width / dpr + 20, height / dpr * 0.7));

    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime: number) {
      if (currentTime - lastTime < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      // Clear canvas with low opacity for trails (0.1 chosen for effective clearing)
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width / dpr, height / dpr);

      if (!prefersReducedMotion) {
        // Draw matrix rain (very subtle)
        ctx.fillStyle = "rgba(0, 255, 166, 0.15)";
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          ctx.fillText(text, x, y);
          
          // Move drop down slowly
          drops[i] += MATRIX_RAIN_DROP_SPEED;
          
          // Reset drop when it goes off screen
          if (y > height / dpr) {
            drops[i] = -Math.random() * 20;
          }
        }

        // Draw growing roots
        ctx.strokeStyle = "rgba(0, 255, 166, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(0, 255, 166, 0.6)";
        ctx.shadowBlur = 4;
        
        for (const root of rootPaths) {
          if (root.growth < root.maxGrowth) {
            root.growth += 0.02; // Very slow growth
          }
          
          const numSegmentsToDraw = Math.floor(root.growth);
          
          if (numSegmentsToDraw > 1) {
            ctx.beginPath();
            ctx.moveTo(root.segments[0].x, root.segments[0].y);
            
            for (let i = 1; i < numSegmentsToDraw && i < root.segments.length; i++) {
              ctx.lineTo(root.segments[i].x, root.segments[i].y);
            }
            
            ctx.stroke();
          }
        }
        
        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="gi-bg absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Hallway background with green neon tint */}
      <div className="gi-hallway absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(0, 255, 166, 0.1) 0%, rgba(0, 255, 166, 0.05) 40%, transparent 70%),
              linear-gradient(135deg, rgba(4, 23, 14, 0.8) 0%, rgba(6, 78, 59, 0.6) 50%, rgba(4, 23, 14, 0.9) 100%)
            `,
            backgroundBlendMode: "screen"
          }}
        />
        {/* Additional green neon tint overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(0, 255, 166, 0.1) 0%, transparent 50%)
            `,
            mixBlendMode: "screen"
          }}
        />
      </div>

      {/* Matrix rain canvas */}
      <canvas 
        ref={canvasRef}
        id="gi-matrix"
        className="absolute inset-0 opacity-20"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Growing roots SVG overlay */}
      <div className="gi-roots absolute inset-0">
        <svg className="w-full h-full" style={{ filter: "drop-shadow(0 0 4px rgba(0, 255, 166, 0.5))" }}>
          <defs>
            <linearGradient id="rootGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 255, 166, 0.6)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
            </linearGradient>
          </defs>
          
          {/* Static root pattern that will be animated via CSS */}
          <path
            d="M 0 100 Q 20 80 40 85 T 80 70 Q 100 60 120 75"
            stroke="url(#rootGradient)"
            strokeWidth="2"
            fill="none"
            className="gi-root-path"
            style={{
              strokeDasharray: "200",
              strokeDashoffset: "200",
              animation: "grow-roots 60s ease-in-out infinite"
            }}
          />
          <path
            d="M 100 90 Q 80 70 60 75 T 20 60 Q 0 50 -20 65"
            stroke="url(#rootGradient)"
            strokeWidth="1.5"
            fill="none"
            className="gi-root-path"
            style={{
              strokeDasharray: "150",
              strokeDashoffset: "150",
              animation: "grow-roots 45s ease-in-out infinite 10s"
            }}
          />
        </svg>
      </div>
    </div>
  );
}