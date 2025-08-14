import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Square,
  Download,
  Sparkles,
  Zap,
  Wand2,
  Film,
  Camera,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

export function FuturisticAnimationStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState([30]);
  const [selectedStyle, setSelectedStyle] = useState("neon");
  const [selectedEffect, setSelectedEffect] = useState("particles");
  const animationRef = useRef<number>(0);

  const animationStyles = [
    { id: "neon", name: "Neon Glow", color: "from-cyan-400 to-purple-400" },
    {
      id: "holographic",
      name: "Holographic",
      color: "from-blue-400 to-pink-400",
    },
    { id: "matrix", name: "Matrix Code", color: "from-green-400 to-lime-400" },
    { id: "plasma", name: "Plasma Wave", color: "from-purple-400 to-red-400" },
    {
      id: "neural",
      name: "Neural Network",
      color: "from-yellow-400 to-orange-400",
    },
    {
      id: "quantum",
      name: "Quantum Field",
      color: "from-indigo-400 to-violet-400",
    },
    { id: "cosmic", name: "Cosmic Energy", color: "from-pink-400 to-rose-400" },
    {
      id: "bioelectric",
      name: "Bio-Electric",
      color: "from-emerald-400 to-teal-400",
    },
  ];

  const effects = [
    "particles",
    "waves",
    "fractals",
    "lightning",
    "spirals",
    "morphing",
    "tunnels",
    "explosions",
    "flowing",
    "pulsing",
  ];

  useEffect(() => {
    initializeCanvas();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isPlaying, selectedStyle, selectedEffect, animationSpeed]);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create base background with green snail glue holes
    createBaseBackground(ctx);
  };

  const createBaseBackground = (ctx: CanvasRenderingContext2D) => {
    // Dark gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(0.5, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Create holes with green snail glue dripping effect
    const holes = [
      { x: 80, y: 40 },
      { x: 240, y: 60 },
      { x: 420, y: 30 },
      { x: 620, y: 50 },
      { x: 720, y: 35 },
      { x: 120, y: 150 },
      { x: 340, y: 140 },
      { x: 540, y: 160 },
      { x: 680, y: 155 },
      { x: 60, y: 280 },
      { x: 200, y: 300 },
      { x: 380, y: 270 },
      { x: 580, y: 290 },
      { x: 740, y: 285 },
      { x: 140, y: 420 },
      { x: 320, y: 450 },
      { x: 500, y: 430 },
      { x: 660, y: 440 },
      { x: 100, y: 550 },
      { x: 280, y: 570 },
      { x: 460, y: 560 },
      { x: 720, y: 550 },
    ];

    holes.forEach((hole, index) => {
      // Create hole
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      // Create animated dripping green glue
      const time = Date.now() * 0.001;
      const dripLength = 15 + Math.sin(time + index * 0.5) * 8;
      const wobble = Math.sin(time * 2 + index) * 2;

      const glueGradient = ctx.createLinearGradient(
        hole.x,
        hole.y,
        hole.x + wobble,
        hole.y + dripLength
      );
      glueGradient.addColorStop(0, "#39ff14");
      glueGradient.addColorStop(0.3, "#32cd32");
      glueGradient.addColorStop(0.7, "#228b22");
      glueGradient.addColorStop(1, "rgba(34, 139, 34, 0)");

      ctx.fillStyle = glueGradient;
      ctx.beginPath();
      ctx.ellipse(
        hole.x + wobble / 2,
        hole.y + dripLength / 2,
        3,
        dripLength / 2,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(hole.x, hole.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#39ff14";
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };

  const startAnimation = () => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear and redraw background
      createBaseBackground(ctx);

      // Draw animation based on selected style and effect
      drawAnimation(ctx);

      setCurrentFrame((prev) => prev + 1);

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const drawAnimation = (ctx: CanvasRenderingContext2D) => {
    const time = currentFrame * 0.05 * (animationSpeed[0] / 30);

    ctx.save();
    ctx.translate(400, 300);

    switch (selectedStyle) {
      case "neon":
        drawNeonAnimation(ctx, time);
        break;
      case "holographic":
        drawHolographicAnimation(ctx, time);
        break;
      case "matrix":
        drawMatrixAnimation(ctx, time);
        break;
      case "plasma":
        drawPlasmaAnimation(ctx, time);
        break;
      case "neural":
        drawNeuralAnimation(ctx, time);
        break;
      case "quantum":
        drawQuantumAnimation(ctx, time);
        break;
      case "cosmic":
        drawCosmicAnimation(ctx, time);
        break;
      case "bioelectric":
        drawBioElectricAnimation(ctx, time);
        break;
    }

    ctx.restore();
  };

  const drawNeonAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Neon circles animation
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time;
      const radius = 100 + Math.sin(time + i) * 50;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = `hsl(${180 + i * 45}, 100%, 50%)`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawHolographicAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Holographic interference patterns
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = Math.sin(time * 2 + i * 0.2) * 150;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      ctx.strokeStyle = `hsla(${240 + Math.sin(time + i) * 60}, 100%, 70%, 0.6)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const drawMatrixAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Matrix-style falling code
    for (let i = 0; i < 20; i++) {
      const x = (i - 10) * 40;
      for (let j = 0; j < 15; j++) {
        const y = ((time * 100 + j * 30) % 600) - 300;
        ctx.fillStyle = `hsla(120, 100%, ${50 + j * 3}%, ${1 - j * 0.06})`;
        ctx.font = "16px monospace";
        ctx.fillText(String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)), x, y);
      }
    }
  };

  const drawPlasmaAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Plasma wave effect
    const imageData = ctx.createImageData(200, 200);

    for (let x = 0; x < 200; x++) {
      for (let y = 0; y < 200; y++) {
        const value =
          Math.sin((x + time * 50) * 0.02) *
          Math.sin((y + time * 30) * 0.03) *
          Math.sin((x + y + time * 40) * 0.01);

        const index = (y * 200 + x) * 4;
        imageData.data[index] = Math.floor((Math.sin(value * Math.PI) + 1) * 127.5); // R
        imageData.data[index + 1] = Math.floor((Math.sin(value * Math.PI + 2) + 1) * 127.5); // G
        imageData.data[index + 2] = Math.floor((Math.sin(value * Math.PI + 4) + 1) * 127.5); // B
        imageData.data[index + 3] = 255; // A
      }
    }

    ctx.putImageData(imageData, -100, -100);
  };

  const drawNeuralAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Neural network nodes and connections
    const nodes = [];
    for (let i = 0; i < 12; i++) {
      nodes.push({
        x: Math.cos(i * 0.5 + time) * (80 + i * 10),
        y: Math.sin(i * 0.7 + time) * (60 + i * 8),
        active: Math.sin(time * 3 + i) > 0,
      });
    }

    // Draw connections
    ctx.strokeStyle = "#ffaa00";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].active && nodes[j].active) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach((node) => {
      ctx.fillStyle = node.active ? "#ffff00" : "#444400";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawQuantumAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Quantum field visualization
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      ctx.fillStyle = `hsla(${270 + Math.sin(time + i) * 30}, 100%, 70%, ${Math.random() * 0.8})`;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawCosmicAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Cosmic energy spirals
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `hsla(${300 + i * 20}, 100%, 60%, 0.8)`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let angle = 0; angle < Math.PI * 8; angle += 0.1) {
        const radius = angle * 5 + Math.sin(time + i + angle) * 20;
        const x = Math.cos(angle + time + i) * radius;
        const y = Math.sin(angle + time + i) * radius;

        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  };

  const drawBioElectricAnimation = (ctx: CanvasRenderingContext2D, time: number) => {
    // Bio-electric pulses
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const baseX = Math.cos(angle) * 100;
      const baseY = Math.sin(angle) * 100;

      ctx.strokeStyle = `hsla(${160 + i * 10}, 100%, 60%, 0.9)`;
      ctx.lineWidth = 3;
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 15;

      ctx.beginPath();
      ctx.moveTo(baseX, baseY);

      for (let j = 0; j < 20; j++) {
        const progress = j / 20;
        const pulse = Math.sin(time * 5 + i + progress * Math.PI * 4) * 30;
        const x = baseX + Math.cos(angle + progress * 0.5) * pulse;
        const y = baseY + Math.sin(angle + progress * 0.5) * pulse;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? "Animation Paused" : "Animation Playing", {
      description: `${selectedStyle} style with ${selectedEffect} effects`,
    });
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
    initializeCanvas();
    toast.success("Animation Reset");
  };

  const exportAnimation = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const imageData = canvas.toDataURL("image/png");

      // Save the animation frame
      const response = await fetch("/functions/v1/generate-artwork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          basePrompt: `${selectedStyle} animation with ${selectedEffect} effects`,
          artworkType: "animation_frame",
          style: "futuristic_animation",
        }),
      });

      if (response.ok) {
        toast.success("🎬 Animation Exported!", {
          description: `${selectedStyle} animation saved successfully`,
        });
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export animation");
    }
  };

  const downloadFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `animation-${selectedStyle}-frame-${currentFrame}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast.success("🎬 Frame Downloaded!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <Film className="h-8 w-8 animate-bounce text-pink-400" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Futuristic Animation Studio
              </div>
              <div className="text-sm font-normal text-purple-400">
                High-Quality Animation Generator
              </div>
            </div>
            <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Animation Style Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {animationStyles.map((style) => (
              <Button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`h-14 flex flex-col items-center gap-1 ${
                  selectedStyle === style.id
                    ? `bg-gradient-to-r ${style.color} text-white`
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <Zap className="h-4 w-4" />
                <span className="text-xs font-medium">{style.name}</span>
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Animation Speed: {animationSpeed[0]} FPS
              </label>
              <Slider
                value={animationSpeed}
                onValueChange={setAnimationSpeed}
                max={60}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Effect Type</label>
              <Select value={selectedEffect} onValueChange={setSelectedEffect}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {effects.map((effect) => (
                    <SelectItem key={effect} value={effect}>
                      {effect.charAt(0).toUpperCase() + effect.slice(1)} Effect
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative rounded-lg overflow-hidden border-2 border-purple-500/30">
            <canvas
              ref={canvasRef}
              className="w-full h-auto bg-black"
              style={{ maxHeight: "400px" }}
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge className="bg-purple-600 text-white">{selectedStyle.toUpperCase()}</Badge>
              <Badge className="bg-pink-600 text-white">Frame: {currentFrame}</Badge>
            </div>
            <div className="absolute top-2 right-2">
              <Badge className="bg-cyan-600 text-white">{animationSpeed[0]} FPS</Badge>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex gap-3">
            <Button
              onClick={togglePlayback}
              className={`flex-1 ${
                isPlaying
                  ? "bg-gradient-to-r from-red-600 to-orange-600"
                  : "bg-gradient-to-r from-green-600 to-emerald-600"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Animation
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play Animation
                </>
              )}
            </Button>

            <Button
              onClick={stopPlayback}
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>

          {/* Export Controls */}
          <div className="flex gap-3">
            <Button
              onClick={exportAnimation}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Camera className="h-4 w-4 mr-2" />
              Export Animation
            </Button>

            <Button
              onClick={downloadFrame}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Frame
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
