import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, TreePine, Mountain, Waves, Flame, Sparkles, Target, Zap } from "lucide-react";

interface GameProject {
  id: string;
  name: string;
  description: string;
  icon: string;
  theme: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  rewards: string;
  participants: number;
  status: "Active" | "Coming Soon" | "Full";
}

export function GameProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const gameProjects: GameProject[] = [
    {
      id: "heart-of-gaia",
      name: "The Heart of Gaia",
      description: "Protect the core essence of nature itself",
      icon: "💚",
      theme: "Nature/Mystical",
      difficulty: "Extreme",
      rewards: "500-2000 GAIA",
      participants: 1247,
      status: "Active",
    },
    {
      id: "seed-splitter",
      name: "Seed Splitter",
      description: "Divide and multiply life forces",
      icon: "🌱",
      theme: "Growth/Evolution",
      difficulty: "Medium",
      rewards: "100-500 GAIA",
      participants: 2834,
      status: "Active",
    },
    {
      id: "railing-energy",
      name: "Railing Energy",
      description: "Harness the power of electric rails",
      icon: "⚡",
      theme: "Electric/Tech",
      difficulty: "Hard",
      rewards: "300-800 GAIA",
      participants: 1567,
      status: "Active",
    },
    {
      id: "freeze-capital",
      name: "Freeze Capital",
      description: "Control the frozen assets of the ice realm",
      icon: "❄️",
      theme: "Ice/Strategy",
      difficulty: "Hard",
      rewards: "400-1000 GAIA",
      participants: 892,
      status: "Active",
    },
    {
      id: "earth-aquarium",
      name: "Earth Aquarium of Shrooms",
      description: "Cultivate mystical mushroom ecosystems",
      icon: "🍄",
      theme: "Underground/Bio",
      difficulty: "Medium",
      rewards: "200-600 GAIA",
      participants: 1823,
      status: "Active",
    },
    {
      id: "vintage-cafe",
      name: "Vintage Internet Café's",
      description: "Battle in retro digital environments",
      icon: "💻",
      theme: "Retro/Digital",
      difficulty: "Easy",
      rewards: "50-300 GAIA",
      participants: 3421,
      status: "Active",
    },
    {
      id: "techno-soul",
      name: "Techno Soul Solutions",
      description: "Merge technology with spiritual energy",
      icon: "🔮",
      theme: "Cyber/Spiritual",
      difficulty: "Extreme",
      rewards: "600-1500 GAIA",
      participants: 567,
      status: "Active",
    },
    {
      id: "nft-gameswap",
      name: "NFT Gameswap",
      description: "Trade and battle with NFT collections",
      icon: "🎨",
      theme: "NFT/Trading",
      difficulty: "Medium",
      rewards: "150-700 GAIA",
      participants: 2156,
      status: "Active",
    },
    {
      id: "sound-riffs",
      name: "Sound Riffs Re grau dio",
      description: "Create musical energy through sound battles",
      icon: "🎵",
      theme: "Music/Audio",
      difficulty: "Hard",
      rewards: "250-900 GAIA",
      participants: 1334,
      status: "Coming Soon",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "from-green-600 to-emerald-600";
      case "Medium":
        return "from-yellow-600 to-orange-600";
      case "Hard":
        return "from-red-600 to-pink-600";
      case "Extreme":
        return "from-purple-600 to-violet-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  const getThemeIcon = (theme: string) => {
    if (theme.includes("Nature")) return <TreePine className="h-4 w-4" />;
    if (theme.includes("Electric")) return <Zap className="h-4 w-4" />;
    if (theme.includes("Ice")) return <Mountain className="h-4 w-4" />;
    if (theme.includes("Underground")) return <Waves className="h-4 w-4" />;
    if (theme.includes("Retro")) return <Target className="h-4 w-4" />;
    if (theme.includes("Cyber")) return <Sparkles className="h-4 w-4" />;
    return <Flame className="h-4 w-4" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gameProjects.map((project, index) => (
        <Card
          key={project.id}
          className={`
            border-2 hover:scale-105 transition-all duration-500 cursor-pointer relative overflow-hidden
            ${selectedProject === project.id ? "border-green-500 bg-green-900/20" : "border-muted/50 hover:border-purple-500/50"}
            ${index === gameProjects.length - 1 ? "animate-pulse opacity-80" : ""}
          `}
          onClick={() => setSelectedProject(project.id)}
          style={{
            ...(index >= gameProjects.length - 3
              ? {
                  opacity: 1 - (index - (gameProjects.length - 4)) * 0.15,
                  transform: `translateX(${(index - (gameProjects.length - 4)) * 5}px)`,
                }
              : {}),
          }}
        >
          <div className="absolute top-2 right-2 opacity-20">
            <div className="text-4xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
              {project.icon}
            </div>
          </div>

          <div className="absolute bottom-2 left-2 opacity-30">
            <div className="text-2xl animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}>
              {index % 4 === 0 ? "🦅" : index % 4 === 1 ? "🐺" : index % 4 === 2 ? "🦋" : "🐸"}
            </div>
          </div>

          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {getThemeIcon(project.theme)}
              <span className="text-2xl mr-2">{project.icon}</span>
              {project.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                className={`bg-gradient-to-r ${getDifficultyColor(project.difficulty)} text-white`}
              >
                {project.difficulty}
              </Badge>
              <Badge
                className={
                  project.status === "Active"
                    ? "bg-green-600"
                    : project.status === "Coming Soon"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                }
              >
                {project.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{project.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Theme:</span>
                <span className="text-purple-400">{project.theme}</span>
              </div>
              <div className="flex justify-between">
                <span>Rewards:</span>
                <span className="text-green-400 font-bold">{project.rewards}</span>
              </div>
              <div className="flex justify-between">
                <span>Players:</span>
                <span className="text-blue-400">{project.participants.toLocaleString()}</span>
              </div>
            </div>

            <Button
              className={`w-full ${
                project.status === "Active"
                  ? "bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={project.status !== "Active"}
            >
              {project.status === "Active" ? (
                <>
                  <Crown className="h-4 w-4 mr-2" />
                  ENTER BATTLEFIELD
                </>
              ) : (
                project.status.toUpperCase()
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
