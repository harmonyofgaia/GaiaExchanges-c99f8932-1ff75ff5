import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, Zap } from "lucide-react";

export function GameModeSelector() {
  const modes = [
    {
      name: "Solo Campaign",
      description: "Epic single player adventure with AI companions",
      difficulty: "Medium",
      players: 1,
      status: "active",
      rewards: "Legendary Gear",
      duration: "2-6 hours",
    },
    {
      name: "Multiplayer Arena",
      description: "Intense PvP battles with friends worldwide",
      difficulty: "Hard",
      players: "2-8",
      status: "active",
      rewards: "Tournament Points",
      duration: "10-30 min",
    },
    {
      name: "Co-op Mission",
      description: "Team up for challenging environmental quests",
      difficulty: "Expert",
      players: "2-4",
      status: "active",
      rewards: "Rare Resources",
      duration: "1-3 hours",
    },
    {
      name: "Speedrun",
      description: "Time-trial challenges with global leaderboards",
      difficulty: "Insane",
      players: 1,
      status: "active",
      rewards: "Speed Titles",
      duration: "5-45 min",
    },
    {
      name: "Raid Boss",
      description: "Massive 20-player boss encounters",
      difficulty: "Legendary",
      players: "10-20",
      status: "active",
      rewards: "Epic Loot",
      duration: "1-2 hours",
    },
    {
      name: "Creative Build",
      description: "Build and share unlimited worlds",
      difficulty: "Any",
      players: "1-∞",
      status: "active",
      rewards: "Builder Points",
      duration: "Unlimited",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "medium":
        return "bg-yellow-600";
      case "hard":
        return "bg-orange-600";
      case "expert":
        return "bg-red-600";
      case "insane":
        return "bg-red-800";
      case "legendary":
        return "bg-purple-600";
      case "any":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="text-blue-400">🎮 Detailed Game Mode Selection</CardTitle>
        <p className="text-muted-foreground text-sm">
          Choose your preferred gameplay style and challenge level
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modes.map((mode, index) => (
            <div
              key={index}
              className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 hover:scale-105 transition-all"
            >
              <h4 className="font-semibold text-purple-400 mb-2">{mode.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Difficulty:</span>
                  <Badge className={getDifficultyColor(mode.difficulty)}>{mode.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Players:</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-blue-400" />
                    <span className="text-blue-400 text-xs">{mode.players}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Duration:</span>
                  <span className="text-cyan-400 text-xs">{mode.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Rewards:</span>
                  <span className="text-green-400 text-xs">{mode.rewards}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90">
                <Zap className="h-4 w-4 mr-2" />
                Select Mode
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
