import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hammer, Paintbrush, Zap, Shield, Cpu, Globe } from "lucide-react";

export function LandscapeToolbox() {
  const tools = [
    {
      name: "Terrain Sculptor",
      icon: <Hammer className="h-5 w-5" />,
      description: "Shape mountains, valleys, and terrain features",
      category: "Creation",
      color: "bg-brown-600",
    },
    {
      name: "Weather Controller",
      icon: <Zap className="h-5 w-5" />,
      description: "Control climate, storms, and atmospheric conditions",
      category: "Environment",
      color: "bg-blue-600",
    },
    {
      name: "Ecosystem Designer",
      icon: <Globe className="h-5 w-5" />,
      description: "Design flora, fauna, and natural ecosystems",
      category: "Biology",
      color: "bg-green-600",
    },
    {
      name: "Reality Painter",
      icon: <Paintbrush className="h-5 w-5" />,
      description: "Apply textures, colors, and visual effects",
      category: "Visual",
      color: "bg-purple-600",
    },
    {
      name: "Physics Engine",
      icon: <Cpu className="h-5 w-5" />,
      description: "Configure gravity, physics, and natural laws",
      category: "Physics",
      color: "bg-cyan-600",
    },
    {
      name: "Protection Shield",
      icon: <Shield className="h-5 w-5" />,
      description: "Secure your landscape from unauthorized changes",
      category: "Security",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            🔧 Advanced Landscape Tools
          </CardTitle>
          <p className="text-muted-foreground">
            Professional-grade tools for creating complex virtual landscapes
            with unlimited possibilities
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card
            key={index}
            className="border-blue-500/20 bg-blue-900/10 hover:bg-blue-900/20 transition-all"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <div className="text-blue-400">{tool.icon}</div>
                {tool.name}
              </CardTitle>
              <Badge className={`${tool.color} text-white w-fit`}>
                {tool.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Launch Tool
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/20 bg-green-900/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">
            🚀 Quantum Landscape Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-300 mb-2">
                Virtual Reality Support
              </h4>
              <p className="text-sm text-muted-foreground">
                Full VR compatibility for immersive landscape exploration
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">
                Real-Time Collaboration
              </h4>
              <p className="text-sm text-muted-foreground">
                Multiple users can work on landscapes simultaneously
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">
                NFT Integration
              </h4>
              <p className="text-sm text-muted-foreground">
                Convert landscapes into tradeable NFTs automatically
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-orange-300 mb-2">
                Quantum Security
              </h4>
              <p className="text-sm text-muted-foreground">
                Unbreakable protection for your landscape creations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
