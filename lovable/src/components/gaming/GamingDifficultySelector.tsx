import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skull, Shield, Zap, Crown, Star, Flame } from "lucide-react";

export function GamingDifficultySelector() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("legendary");

  const difficulties = [
    {
      id: "beginner",
      name: "Peaceful Explorer",
      icon: Shield,
      color: "green",
      description: "Learn the basics, no pressure",
      multiplier: "1x Experience",
    },
    {
      id: "normal",
      name: "Brave Adventurer",
      icon: Star,
      color: "blue",
      description: "Balanced challenge for most players",
      multiplier: "2x Experience",
    },
    {
      id: "hard",
      name: "Fearless Warrior",
      icon: Zap,
      color: "orange",
      description: "For experienced gamers seeking challenge",
      multiplier: "5x Experience",
    },
    {
      id: "extreme",
      name: "Legendary Master",
      icon: Crown,
      color: "purple",
      description: "Only for the most skilled players",
      multiplier: "10x Experience",
    },
    {
      id: "legendary",
      name: "Quantum God Mode",
      icon: Flame,
      color: "red",
      description: "Impossible difficulty - Prove your legend",
      multiplier: "100x Experience",
    },
    {
      id: "immortal",
      name: "Universe Destroyer",
      icon: Skull,
      color: "black",
      description: "Beyond human capability - AI assistance required",
      multiplier: "1000x Experience",
    },
  ];

  return (
    <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          ⚔️ CHOOSE YOUR GAMING HARSHNESS LEVEL
        </CardTitle>
        <div className="text-center text-lg text-orange-300 font-bold">
          Universal Difficulty System - Applied to ALL Games
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {difficulties.map((difficulty) => {
            const Icon = difficulty.icon;
            const isSelected = selectedDifficulty === difficulty.id;

            return (
              <Button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`p-6 h-auto flex flex-col items-center gap-3 transition-all duration-300 ${
                  isSelected
                    ? `bg-${difficulty.color}-600 border-4 border-${difficulty.color}-400 scale-110 shadow-2xl`
                    : `bg-${difficulty.color}-900/30 border-2 border-${difficulty.color}-500/30 hover:scale-105`
                }`}
              >
                <Icon
                  className={`h-12 w-12 ${isSelected ? "animate-pulse" : ""}`}
                />
                <div className="text-center">
                  <div className="text-xl font-black mb-2">
                    {difficulty.name}
                  </div>
                  <div className="text-sm mb-2">{difficulty.description}</div>
                  <Badge className={`bg-${difficulty.color}-600`}>
                    {difficulty.multiplier}
                  </Badge>
                </div>
                {isSelected && (
                  <div className="text-center">
                    <div className="text-2xl animate-bounce">👑</div>
                    <div className="text-sm font-bold">SELECTED</div>
                  </div>
                )}
              </Button>
            );
          })}
        </div>

        {/* Selected Difficulty Info */}
        <div className="bg-black/50 rounded-lg p-6 border-2 border-orange-500/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">
              🎯 CURRENT DIFFICULTY:{" "}
              {difficulties
                .find((d) => d.id === selectedDifficulty)
                ?.name.toUpperCase()}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-red-900/30 rounded border border-red-500/30">
                <div className="text-sm text-red-300">Enemy Strength</div>
                <div className="text-xl text-red-400 font-bold">
                  {selectedDifficulty === "beginner"
                    ? "50%"
                    : selectedDifficulty === "normal"
                      ? "100%"
                      : selectedDifficulty === "hard"
                        ? "200%"
                        : selectedDifficulty === "extreme"
                          ? "500%"
                          : selectedDifficulty === "legendary"
                            ? "1000%"
                            : "∞"}
                </div>
              </div>

              <div className="text-center p-3 bg-green-900/30 rounded border border-green-500/30">
                <div className="text-sm text-green-300">Rewards</div>
                <div className="text-xl text-green-400 font-bold">
                  {
                    difficulties.find((d) => d.id === selectedDifficulty)
                      ?.multiplier
                  }
                </div>
              </div>

              <div className="text-center p-3 bg-blue-900/30 rounded border border-blue-500/30">
                <div className="text-sm text-blue-300">Skill Required</div>
                <div className="text-xl text-blue-400 font-bold">
                  {selectedDifficulty === "beginner"
                    ? "Casual"
                    : selectedDifficulty === "normal"
                      ? "Medium"
                      : selectedDifficulty === "hard"
                        ? "High"
                        : selectedDifficulty === "extreme"
                          ? "Expert"
                          : selectedDifficulty === "legendary"
                            ? "Master"
                            : "Godlike"}
                </div>
              </div>

              <div className="text-center p-3 bg-purple-900/30 rounded border border-purple-500/30">
                <div className="text-sm text-purple-300">AI Assistance</div>
                <div className="text-xl text-purple-400 font-bold">
                  {selectedDifficulty === "immortal" ? "Required" : "Optional"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-black text-orange-400 mb-2">
            🌟 APPLIES TO ALL GAMES ON GAIA PLATFORM 🌟
          </div>
          <div className="text-lg text-orange-300">
            Gaia Fighter Pro • Landscape Builder • Habbo Tycoon • All Future
            Games
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
