import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Leaf,
  Bike,
  Droplets,
  Sun,
  Recycle,
  Users,
  Crown,
  Shield,
  Target,
  Award,
} from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  category: string;
  progress: number;
  maxProgress: number;
  earned: boolean;
  earnedDate?: Date;
  requirement: string;
  tokensReward: number;
}

export function EnhancedBadgeSystem() {
  const [badges, setBadges] = useState<BadgeData[]>([
    {
      id: "1",
      name: "Eco Pioneer",
      description: "Complete your first environmental activity",
      icon: <Leaf className="h-6 w-6" />,
      rarity: "common",
      category: "Starter",
      progress: 1,
      maxProgress: 1,
      earned: true,
      earnedDate: new Date("2024-01-15"),
      requirement: "Complete 1 eco activity",
      tokensReward: 10,
    },
    {
      id: "2",
      name: "Bike Enthusiast",
      description: "Cycle 100km with GAiA bike",
      icon: <Bike className="h-6 w-6" />,
      rarity: "uncommon",
      category: "Transportation",
      progress: 45.8,
      maxProgress: 100,
      earned: false,
      requirement: "Cycle 100km total",
      tokensReward: 50,
    },
    {
      id: "3",
      name: "Water Guardian",
      description: "Save 1000L of water through conservation",
      icon: <Droplets className="h-6 w-6" />,
      rarity: "rare",
      category: "Conservation",
      progress: 750,
      maxProgress: 1000,
      earned: false,
      requirement: "Save 1000L of water",
      tokensReward: 100,
    },
    {
      id: "4",
      name: "Solar Champion",
      description: "Generate 1000kWh of solar energy",
      icon: <Sun className="h-6 w-6" />,
      rarity: "epic",
      category: "Energy",
      progress: 245,
      maxProgress: 1000,
      earned: false,
      requirement: "Generate 1000kWh solar",
      tokensReward: 250,
    },
    {
      id: "5",
      name: "Harmony Legend",
      description: "Complete 365 days of environmental activities",
      icon: <Crown className="h-6 w-6" />,
      rarity: "legendary",
      category: "Achievement",
      progress: 87,
      maxProgress: 365,
      earned: false,
      requirement: "365 consecutive days",
      tokensReward: 1000,
    },
    {
      id: "6",
      name: "Community Builder",
      description: "Help 50 community members start their eco journey",
      icon: <Users className="h-6 w-6" />,
      rarity: "rare",
      category: "Social",
      progress: 12,
      maxProgress: 50,
      earned: false,
      requirement: "Mentor 50 people",
      tokensReward: 200,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = [
    "All",
    "Starter",
    "Transportation",
    "Conservation",
    "Energy",
    "Achievement",
    "Social",
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-600";
      case "uncommon":
        return "bg-green-600";
      case "rare":
        return "bg-blue-600";
      case "epic":
        return "bg-purple-600";
      case "legendary":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500/50";
      case "uncommon":
        return "border-green-500/50";
      case "rare":
        return "border-blue-500/50";
      case "epic":
        return "border-purple-500/50";
      case "legendary":
        return "border-yellow-500/50 shadow-yellow-500/20 shadow-lg";
      default:
        return "border-gray-500/50";
    }
  };

  const filteredBadges =
    selectedCategory === "All"
      ? badges
      : badges.filter((badge) => badge.category === selectedCategory);

  const earnedBadges = badges.filter((badge) => badge.earned).length;
  const totalTokensFromBadges = badges
    .filter((badge) => badge.earned)
    .reduce((sum, badge) => sum + badge.tokensReward, 0);

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Trophy className="h-6 w-6" />
            🏆 Enhanced Badge & Achievement System
            <Badge className="bg-purple-600">Phase 1</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-center">
              <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {earnedBadges}/{badges.length}
              </div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20 text-center">
              <Star className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {totalTokensFromBadges}
              </div>
              <div className="text-sm text-muted-foreground">
                GAiA from Badges
              </div>
            </div>
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center">
              <Target className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {Math.round((earnedBadges / badges.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Completion Rate
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-purple-600 hover:bg-purple-700"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  badge.earned
                    ? `${getRarityBorder(badge.rarity)} bg-gradient-to-br from-${badge.rarity === "legendary" ? "yellow" : badge.rarity === "epic" ? "purple" : badge.rarity === "rare" ? "blue" : badge.rarity === "uncommon" ? "green" : "gray"}-900/30 to-black/50`
                    : "border-gray-700/50 bg-gray-900/20"
                } ${badge.earned ? "scale-105 hover:scale-110" : "hover:scale-105"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg ${badge.earned ? getRarityColor(badge.rarity) : "bg-gray-700"}`}
                  >
                    <div
                      className={badge.earned ? "text-white" : "text-gray-400"}
                    >
                      {badge.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        badge.earned
                          ? getRarityColor(badge.rarity)
                          : "bg-gray-600"
                      }
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
                </div>

                <h4
                  className={`font-bold mb-1 ${badge.earned ? "text-white" : "text-gray-300"}`}
                >
                  {badge.name}
                </h4>
                <p
                  className={`text-sm mb-3 ${badge.earned ? "text-gray-200" : "text-gray-400"}`}
                >
                  {badge.description}
                </p>

                {!badge.earned && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>
                        {badge.progress}/{badge.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={(badge.progress / badge.maxProgress) * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {badge.earned && badge.earnedDate && (
                  <div className="text-xs text-green-400 mt-2">
                    ✓ Earned {badge.earnedDate.toLocaleDateString()}
                  </div>
                )}

                <div className="flex justify-between items-center mt-3 text-xs">
                  <span className="text-muted-foreground">
                    {badge.requirement}
                  </span>
                  <span className="text-green-400 font-bold">
                    +{badge.tokensReward} GAiA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
