import { useEffect, useState, useRef, useCallback} from "react";

interface AttractedParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  speed: number;
  color: string;
  type: "spark" | "glow" | "trail" | "quantum";
  life: number;
  maxLife: number;
  attraction: number;
}

interface MouseAttraction {
  x: number;
  y: number;
  isActive: boolean;
  intensity: number;
}

export function MouseAttractionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [particles, setParticles] = useState<AttractedParticle[]>([]);
  const [mouseAttraction, setMouseAttraction] = useState<MouseAttraction>({
    x: 0,
    y: 0,
    isActive: false,
    intensity: 1,
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Mouse tracking with enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseAttraction({
        x: e.clientX,
        y: e.clientY,
        isActive: true,
        intensity: 1 + Math.random() * 0.5,
      });
    };

    const handleMouseEnter = () => {
      setMouseAttraction((prev) => ({ ...prev, isActive: true }));
    };

    const handleMouseLeave = () => {
      setMouseAttraction((prev) => ({ ...prev, isActive: false }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const newParticles: AttractedParticle[] = Array.from({ length: 200 }, (_, i) => {
        const types: AttractedParticle["type"][] = ["spark", "glow", "trail", "quantum"];
        const type = types[Math.floor(Math.random() * types.length)];

        const colors = {
          spark: ["#fbbf24", "#f59e0b", "#d97706"],
          glow: ["#22c55e", "#10b981", "#059669"],
          trail: ["#3b82f6", "#2563eb", "#1d4ed8"],
          quantum: ["#a855f7", "#9333ea", "#7c3aed"],
        };

        return {
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          targetX: Math.random() * dimensions.width,
          targetY: Math.random() * dimensions.height,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 0.5,
          color: colors[type][Math.floor(Math.random() * colors[type].length)],
          type,
          life: 0,
          maxLife: 300 + Math.random() * 200,
          attraction: Math.random() * 100 + 50,
        };
      });
      setParticles(newParticles);
    }
  }, [dimensions]);

  // Animation loop with mouse attraction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Draw mouse attraction area
      if (mouseAttraction.isActive) {
        // Pulsing glow around mouse
        const glowRadius = 100 * mouseAttraction.intensity;
        const gradient = ctx.createRadialGradient(
          mouseAttraction.x,
          mouseAttraction.y,
          0,
          mouseAttraction.x,
          mouseAttraction.y,
          glowRadius
        );
        gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)");
        gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.2)");
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseAttraction.x, mouseAttraction.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Lightning effect from mouse
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.5 * mouseAttraction.intensity})`;
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8 + time * 2;
          const length = 30 * mouseAttraction.intensity;
          ctx.beginPath();
          ctx.moveTo(mouseAttraction.x, mouseAttraction.y);
          ctx.lineTo(
            mouseAttraction.x + Math.cos(angle) * length,
            mouseAttraction.y + Math.sin(angle) * length
          );
          ctx.stroke();
        }
      }

      // Update and draw particles with mouse attraction
      setParticles((currentParticles) => {
        return currentParticles.map((particle) => {
          particle.life += 1;

          // Mouse attraction physics
          if (mouseAttraction.isActive) {
            const dx = mouseAttraction.x - particle.x;
            const dy = mouseAttraction.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < particle.attraction) {
              const force = (particle.attraction - distance) / particle.attraction;
              const attractionForce = force * 0.5 * mouseAttraction.intensity;

              particle.targetX = mouseAttraction.x + (Math.random() - 0.5) * 20;
              particle.targetY = mouseAttraction.y + (Math.random() - 0.5) * 20;

              // Immediate attraction
              particle.x += (dx / distance) * attractionForce * particle.speed;
              particle.y += (dy / distance) * attractionForce * particle.speed;
            } else {
              // Natural movement when outside attraction range
              particle.x += (particle.targetX - particle.x) * 0.02;
              particle.y += (particle.targetY - particle.y) * 0.02;
            }
          } else {
            // Natural floating movement
            particle.x += (particle.targetX - particle.x) * 0.01;
            particle.y += (particle.targetY - particle.y) * 0.01;

            // Update target occasionally
            if (Math.random() < 0.005) {
              particle.targetX = Math.random() * canvas.width;
              particle.targetY = Math.random() * canvas.height;
            }
          }

          // Boundary wrapping
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Particle regeneration
          if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
            particle.targetX = Math.random() * canvas.width;
            particle.targetY = Math.random() * canvas.height;
          }

          // Draw particle based on type
          ctx.save();

          const lifeRatio = particle.life / particle.maxLife;
          const alpha = Math.sin(lifeRatio * Math.PI) * 0.8 + 0.2;

          // Enhanced mouse proximity effects
          let proximityMultiplier = 1;
          if (mouseAttraction.isActive) {
            const distanceToMouse = Math.sqrt(
              (mouseAttraction.x - particle.x) ** 2 + (mouseAttraction.y - particle.y) ** 2
            );
            proximityMultiplier = distanceToMouse < 150 ? 2 - distanceToMouse / 150 : 1;
          }

          const finalSize = particle.size * proximityMultiplier;
          const finalAlpha = alpha * proximityMultiplier;

          ctx.shadowColor = particle.color;
          ctx.shadowBlur = finalSize * 4 * proximityMultiplier;

          switch (particle.type) {
            case "spark":
              // Electric spark effect
              ctx.fillStyle =
                particle.color +
                Math.floor(finalAlpha * 255)
                  .toString(16)
                  .padStart(2, "0");
              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6 + time * 3;
                const x = particle.x + Math.cos(angle) * finalSize;
                const y = particle.y + Math.sin(angle) * finalSize;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
              }
              ctx.closePath();
              ctx.fill();
              break;

            case "glow": {
              // Pulsing glow
              const glowRadius = finalSize * (1 + Math.sin(time * 4 + particle.id) * 0.3);
              const glowGradient = ctx.createRadialGradient(
                particle.x,
                particle.y,
                0,
                particle.x,
                particle.y,
                glowRadius * 2
              );
              glowGradient.addColorStop(
                0,
                particle.color +
                  Math.floor(finalAlpha * 255)
                    .toString(16)
                    .padStart(2, "0")
              );
              glowGradient.addColorStop(1, "transparent");
              ctx.fillStyle = glowGradient;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, glowRadius * 2, 0, Math.PI * 2);
              ctx.fill();
              break;
            }

            case "trail":
              // Trailing particle with motion blur
              ctx.fillStyle =
                particle.color +
                Math.floor(finalAlpha * 255)
                  .toString(16)
                  .padStart(2, "0");
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2);
              ctx.fill();

              // Motion trail
              ctx.strokeStyle = particle.color + "40";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle.x - particle.speed * 5, particle.y - particle.speed * 5);
              ctx.stroke();
              break;

            case "quantum":
              // Quantum entanglement visualization
              ctx.strokeStyle =
                particle.color +
                Math.floor(finalAlpha * 255)
                  .toString(16)
                  .padStart(2, "0");
              ctx.lineWidth = 1;
              for (let ring = 1; ring <= 3; ring++) {
                const radius = finalSize * ring * 0.8;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
                ctx.stroke();
              }

              // Central core
              ctx.fillStyle =
                particle.color +
                Math.floor(finalAlpha * 255)
                  .toString(16)
                  .padStart(2, "0");
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, finalSize * 0.3, 0, Math.PI * 2);
              ctx.fill();
              break;
          }

          ctx.restore();
          return particle;
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mouseAttraction, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
        mixBlendMode: "screen",
      }}
    />
  );
}
