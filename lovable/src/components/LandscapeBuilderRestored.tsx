import { useState, useEffect, useRef, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TreePine,
  Mountain,
  Waves,
  Sun,
  Home,
  Palette,
  Save,
  Download,
  Eye,
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

interface LandscapeElement {
  id: string;
  type: "tree" | "mountain" | "water" | "building" | "decoration";
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

interface LandscapeProject {
  id: string;
  name: string;
  elements: LandscapeElement[];
  backgroundType: string;
  backgroundColor: string;
  timestamp: Date;
}

export function LandscapeBuilderRestored() {
  const [currentProject, setCurrentProject] = useState<LandscapeProject>({
    id: "project-1",
    name: "My Gaia Landscape",
    elements: [],
    backgroundType: "nature",
    backgroundColor: "#87CEEB",
    timestamp: new Date()
  });

  const [selectedTool, setSelectedTool] = useState<LandscapeElement["type"]>("tree");
  const [brushSize, setBrushSize] = useState([50]);
  const [selectedColor, setSelectedColor] = useState("#228B22");
  const [isBuilding, setIsBuilding] = useState(false);
  const [savedProjects, setSavedProjects] = useState<LandscapeProject[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tools: {
    id: LandscapeElement["type"];
    name: string;,
    icon: LucideIcon;,
    color: string;
  }[] = [
    { id: "tree", name: "Trees", icon: TreePine, color: "#228B22" },
    { id: "mountain", name: "Mountains", icon: Mountain, color: "#8B4513" },
    { id: "water", name: "Water", icon: Waves, color: "#4169E1" },
    { id: "building", name: "Buildings", icon: Home, color: "#696969" },
    { id: "decoration", name: "Decorations", icon: Sun, color: "#FFD700" },
  ];

  const backgroundTypes = [
    { id: "nature", name: "Nature", color: "#87CEEB" },
    { id: "desert", name: "Desert", color: "#F4A460" },
    { id: "ocean", name: "Ocean", color: "#006994" },
    { id: "forest", name: "Forest", color: "#355E3B" },
    { id: "space", name: "Space", color: "#191970" },
  ];

  // Draw landscape on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = currentProject.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    currentProject.elements.forEach((element) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.fillStyle = element.color;

      switch (element.type) {
        case "tree":
          // Draw simple tree
          ctx.fillRect(-element.size / 8, -element.size / 4, element.size / 4, element.size / 2);
          ctx.beginPath();
          ctx.arc(0, -element.size / 2, element.size / 3, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "mountain":
          // Draw triangle mountain
          ctx.beginPath();
          ctx.moveTo(0, element.size / 2);
          ctx.lineTo(-element.size / 2, element.size / 2);
          ctx.lineTo(0, -element.size / 2);
          ctx.lineTo(element.size / 2, element.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case "water":
          // Draw water waves
          ctx.beginPath();
          for (let i = -element.size / 2; i <= element.size / 2; i += 10) {
            const y = Math.sin(i / 10) * 5;
            if (i === -element.size / 2) {
              ctx.moveTo(i, y);
            } else {
              ctx.lineTo(i, y);
            }
          }
          ctx.stroke();
          break;
        case "building":
          // Draw simple building
          ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size);
          ctx.fillStyle = "#FF0000";
          ctx.beginPath();
          ctx.moveTo(-element.size / 2, -element.size / 2);
          ctx.lineTo(0, -element.size);
          ctx.lineTo(element.size / 2, -element.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case "decoration":
          // Draw star decoration
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x = (Math.cos(angle) * element.size) / 2;
            const y = (Math.sin(angle) * element.size) / 2;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.fill();
          break;
      }
      ctx.restore();
    });
  }, [currentProject]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isBuilding) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newElement: LandscapeElement = {
      id: `element-${Date.now()}`,
      type: selectedTool,
      x,
      y,
      size: brushSize[0],
      color: selectedColor,
      rotation: Math.random() * 360,
    };

    setCurrentProject((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));

    toast.success(`Added ${selectedTool} to landscape!`, {
      description: "Keep building your dream world",
      duration: 2000,
    });
  };

  const saveProject = () => {
    const projectToSave = {
      ...currentProject,
      id: `project-${Date.now()}`,
      timestamp: new Date()
    };

    setSavedProjects((prev) => [...prev, projectToSave]);

    toast.success("🎨 Landscape Saved!", {
      description: `"${projectToSave.name}" has been saved to your collection`,
      duration: 3000,
    });
  };

  const clearCanvas = () => {
    setCurrentProject((prev) => ({
      ...prev,
      elements: [],
    }));
    toast.info("Canvas cleared", { duration: 2000 });
  };

  const exportLandscape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${currentProject.name.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast.success("🖼️ Landscape Exported!", {
      description: "Your creation has been downloaded",
      duration: 3000,
    });
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Palette className="h-6 w-6" />
          🌍 GAIA LANDSCAPE BUILDER - Create Your Dream World
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-600 text-white">
            Elements: {currentProject.elements.length}
          </Badge>
          <Badge className="bg-blue-600 text-white">Projects: {savedProjects.length}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* GAiA Token Integration */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-bold text-green-400 mb-2">
              🌍 Harmony of Gaia Integration
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Token:</div>
                <code className="font-mono text-xs text-green-400">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
              <div>
                <div className="text-muted-foreground">Virtual Reality Ready:</div>
                <div className="text-lg font-bold text-green-400">✅ VR Compatible</div>
              </div>
            </div>
          </div>
        </div>

        {/* Building Tools */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Button
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool.id);
                  setSelectedColor(tool.color);
                }}
                variant={selectedTool === tool.id ? "default" : "outline"}
                className={`${selectedTool === tool.id ? "bg-green-600" : ""} flex flex-col gap-1 h-16`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs">{tool.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Tool Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">Brush Size</label>
            <Slider
              value={brushSize}
              onValueChange={setBrushSize}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">Size: {brushSize[0]}px</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">Color</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-10 rounded border border-border"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">Background</label>
            <Select
              value={currentProject.backgroundType}
              onValueChange={(value) => {
                const bgType = backgroundTypes.find((bg) => bg.id === value);
                if (bgType) {
                  setCurrentProject((prev) => ({
                    ...prev,
                    backgroundType: value,
                    backgroundColor: bgType.color,
                  }));
                }
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {backgroundTypes.map((bg) => (
                  <SelectItem key={bg.id} value={bg.id}>
                    {bg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-green-400">Canvas</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsBuilding(!isBuilding)}
                variant={isBuilding ? "default" : "outline"}
                className={isBuilding ? "bg-green-600" : ""}
              >
                {isBuilding ? "🛠️ Building" : "✋ Paused"}
              </Button>
              <Button onClick={clearCanvas} variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            onClick={handleCanvasClick}
            className="w-full border border-gray-500/30 rounded cursor-crosshair bg-sky-200"
            style={{ maxHeight: "400px" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button onClick={saveProject} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Landscape
          </Button>
          <Button onClick={exportLandscape} className="bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Export PNG
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            VR Preview
          </Button>
        </div>

        {/* Saved Projects */}
        {savedProjects.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-green-400">🎨 Your Creations</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {savedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-black/20 border border-gray-500/30 rounded-lg p-3"
                >
                  <div className="text-sm font-medium text-white">{project.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {project.elements.length} elements • {project.timestamp.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Little Big Planet Integration */}
        <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-purple-400 mb-2">
              🌟 Little Big Planet Integration
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Your landscapes are VR-ready and can be shared with the Gaia community
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-purple-400">VR</div>
                <div className="text-xs text-muted-foreground">Virtual Reality</div>
              </div>
              <div>
                <div className="text-lg font-bold text-pink-400">3D</div>
                <div className="text-xs text-muted-foreground">3D Worlds</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-400">SHARE</div>
                <div className="text-xs text-muted-foreground">Community</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
