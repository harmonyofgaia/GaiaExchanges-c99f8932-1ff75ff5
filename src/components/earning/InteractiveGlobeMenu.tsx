import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Carrot,
  TreePine,
  Sun,
  Users,
  Plane,
  Star,
  Crown,
  GraduationCap,
  Coins,
  Zap,
  Bus,
  ShoppingBag,
  Bird,
  RotateCcw,
  Leaf,
  PartyPopper,
  MapPin,
  Gift,
  Award,
  Camera,
  Vote,
  Trophy,
  Lock,
  Globe,
  Bike,
} from "lucide-react";

interface GlobePoint {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  color: string;
  position: { x: number; y: number; z: number };
  difficulty: string;
  points: string;
}

interface InteractiveGlobeMenuProps {
  onActivitySelect: (category: string, activityId: string) => void;
  categories: any[];
}

export function InteractiveGlobeMenu({ onActivitySelect, categories }: InteractiveGlobeMenuProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [matrixLines] = useState(() => generateMatrixLines());
  const globeRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Generate globe points from categories
  const globePoints: GlobePoint[] = categories.flatMap((category, catIndex) =>
    category.components.map((comp: any, compIndex: number) => {
      const phi = Math.acos(-1 + (2 * (catIndex * 5 + compIndex)) / (categories.length * 5 - 1));
      const theta = Math.sqrt(categories.length * 5 * Math.PI) * phi;
      
      return {
        id: `${category.id}-${compIndex}`,
        title: comp.title,
        icon: comp.icon,
        category: category.id,
        color: getColorFromCategory(category.id),
        position: {
          x: 200 * Math.sin(phi) * Math.cos(theta),
          y: 200 * Math.sin(phi) * Math.sin(theta),
          z: 200 * Math.cos(phi),
        },
        difficulty: comp.difficulty,
        points: comp.points,
      };
    })
  );

  function generateMatrixLines() {
    const lines = [];
    for (let i = 0; i < 50; i++) {
      const phi1 = Math.random() * Math.PI;
      const theta1 = Math.random() * 2 * Math.PI;
      const phi2 = Math.random() * Math.PI;
      const theta2 = Math.random() * 2 * Math.PI;
      
      lines.push({
        id: i,
        start: {
          x: 180 * Math.sin(phi1) * Math.cos(theta1),
          y: 180 * Math.sin(phi1) * Math.sin(theta1),
          z: 180 * Math.cos(phi1),
        },
        end: {
          x: 180 * Math.sin(phi2) * Math.cos(theta2),
          y: 180 * Math.sin(phi2) * Math.sin(theta2),
          z: 180 * Math.cos(phi2),
        },
      });
    }
    return lines;
  }

  function getColorFromCategory(categoryId: string): string {
    const colors: Record<string, string> = {
      foundation: "#10b981",
      lifestyle: "#3b82f6", 
      environmental: "#059669",
      community: "#8b5cf6",
      travel: "#06b6d4",
      advanced: "#f59e0b",
      systems: "#6b7280",
    };
    return colors[categoryId] || "#ffffff";
  }

  function project3DTo2D(point: { x: number; y: number; z: number }, rotation: { x: number; y: number }) {
    // Apply rotation
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);

    // Rotate around Y axis
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.x * sinY + point.z * cosY;
    
    // Rotate around X axis
    const y2 = point.y * cosX - z1 * sinX;
    const z2 = point.y * sinX + z1 * cosX;

    // Project to 2D (simple perspective projection)
    const distance = 500;
    const scale = distance / (distance + z2);
    
    return {
      x: x1 * scale + 250,
      y: y2 * scale + 250,
      scale,
      visible: z2 > -200,
    };
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Auto-rotation when not dragging
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.005,
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  return (
    <div className="relative w-full h-[600px] bg-black/20 rounded-2xl border border-cyan-500/30 overflow-hidden">
      {/* Matrix Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-500/10 animate-pulse"
              style={{ animationDelay: `${i * 0.01}s` }}
            />
          ))}
        </div>
      </div>

      {/* Globe Container */}
      <div
        ref={globeRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Matrix Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {matrixLines.map((line) => {
            const startProjected = project3DTo2D(line.start, rotation);
            const endProjected = project3DTo2D(line.end, rotation);
            
            if (!startProjected.visible && !endProjected.visible) return null;
            
            return (
              <motion.line
                key={line.id}
                x1={startProjected.x}
                y1={startProjected.y}
                x2={endProjected.x}
                y2={endProjected.y}
                stroke="url(#matrixGradient)"
                strokeWidth="0.5"
                opacity={Math.min(startProjected.scale, endProjected.scale) * 0.6}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: line.id * 0.1,
                }}
              />
            );
          })}
          
          {/* SVG Gradients */}
          <defs>
            <linearGradient id="matrixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00ff00" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Globe Points */}
        {globePoints.map((point) => {
          const projected = project3DTo2D(point.position, rotation);
          
          if (!projected.visible) return null;
          
          const IconComponent = point.icon;
          
          return (
            <motion.div
              key={point.id}
              className="absolute cursor-pointer"
              style={{
                left: projected.x - 20,
                top: projected.y - 20,
                transform: `scale(${projected.scale})`,
                zIndex: Math.round(projected.scale * 100),
              }}
              onMouseEnter={() => setHoveredPoint(point.id)}
              onMouseLeave={() => setHoveredPoint(null)}
              onClick={() => {
                setSelectedCategory(point.category);
                onActivitySelect(point.category, point.id);
              }}
              whileHover={{
                scale: projected.scale * 1.2,
              }}
              whileTap={{
                scale: projected.scale * 0.9,
              }}
            >
              <div
                className="relative w-10 h-10 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
                style={{
                  backgroundColor: `${point.color}20`,
                  borderColor: point.color,
                  boxShadow: `0 0 20px ${point.color}40`,
                }}
              >
                <IconComponent 
                  className="w-5 h-5" 
                />
                
                {/* Pulsing Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: point.color }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: point.id.length * 0.1,
                  }}
                />
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredPoint === point.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: -50 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="absolute left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap border"
                    style={{ borderColor: point.color }}
                  >
                    <div className="font-semibold">{point.title}</div>
                    <div className="text-xs opacity-75">{point.points} • {point.difficulty}</div>
                    <div 
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0"
                      style={{
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: `5px solid ${point.color}`,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-green-500/20 border border-white/20"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-green-400/40 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-sm text-white/60">
        <p>🖱️ Drag to rotate • 🎯 Click points to explore activities</p>
      </div>

      {/* Category Legend */}
      <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-3 backdrop-blur-sm">
        <h3 className="text-white font-semibold mb-2">Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border"
                style={{ 
                  backgroundColor: `${getColorFromCategory(cat.id)}20`,
                  borderColor: getColorFromCategory(cat.id),
                }}
              />
              <span className="text-white/80">{cat.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}