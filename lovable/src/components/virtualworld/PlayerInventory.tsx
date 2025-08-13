import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Sword,
  Shield,
  TreePine,
  Fish,
  Gem,
  Star,
  Flame,
  Heart,
  Zap,
  Award,
} from "lucide-react";

export function PlayerInventory() {
  const [playerLevel] = useState(47);
  const [playerXP] = useState(85420);
  const [nextLevelXP] = useState(95000);

  const equipment = [
    {
      name: "🗡️ Eco-Warrior Sword",
      type: "weapon",
      power: 250,
      rarity: "legendary",
      equipped: true,
    },
    {
      name: "🛡️ Forest Guardian Shield",
      type: "armor",
      defense: 180,
      rarity: "epic",
      equipped: true,
    },
    {
      name: "👑 Crown of Nature",
      type: "helmet",
      power: 120,
      rarity: "rare",
      equipped: false,
    },
    {
      name: "🌊 Ocean Trident",
      type: "weapon",
      power: 300,
      rarity: "legendary",
      equipped: false,
    },
  ];

  const landscapes = [
    { name: "🌊 Azure Ocean Paradise", owned: true, tokensInvested: 150 },
    { name: "🏔️ Alpine Summit", owned: true, tokensInvested: 200 },
    { name: "🌲 Mystical Forest", owned: false, tokensInvested: 0 },
    { name: "🔥 Volcanic Forge", owned: true, tokensInvested: 300 },
  ];

  const achievements = [
    {
      name: "🌱 Tree Planter",
      description: "Burned 1000 tokens for tree planting",
      unlocked: true,
    },
    {
      name: "🐋 Ocean Protector",
      description: "Saved 500 marine animals",
      unlocked: true,
    },
    {
      name: "🔥 Token Burner Elite",
      description: "Burned 5000+ tokens",
      unlocked: false,
    },
    {
      name: "🌍 Eco Champion",
      description: "Completed all environmental quests",
      unlocked: false,
    },
  ];

  const resources = [
    {
      name: "Environmental Tokens",
      amount: 2847,
      icon: Flame,
      color: "text-orange-400",
    },
    {
      name: "Nature Crystals",
      amount: 156,
      icon: Gem,
      color: "text-purple-400",
    },
    { name: "Eco Points", amount: 9240, icon: Star, color: "text-yellow-400" },
    {
      name: "Conservation Energy",
      amount: 750,
      icon: Zap,
      color: "text-blue-400",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-600";
      case "rare":
        return "bg-blue-600";
      case "epic":
        return "bg-purple-600";
      case "legendary":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Player Stats Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Package className="h-6 w-6" />
            📦 Eco-Warrior Inventory & Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400">
                Level {playerLevel}
              </div>
              <div className="text-sm text-muted-foreground">
                Eco-Warrior Rank
              </div>
              <Progress
                value={(playerXP / nextLevelXP) * 100}
                className="mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {playerXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">4,250</div>
              <div className="text-sm text-muted-foreground">
                Total Tokens Burned
              </div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">1,847</div>
              <div className="text-sm text-muted-foreground">
                Animals Helped
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Tabs */}
      <Tabs defaultValue="equipment" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md">
          <TabsTrigger
            value="equipment"
            className="data-[state=active]:bg-purple-500/20"
          >
            <Sword className="h-4 w-4 mr-2" />
            ⚔️ Equipment
          </TabsTrigger>
          <TabsTrigger
            value="landscapes"
            className="data-[state=active]:bg-green-500/20"
          >
            <TreePine className="h-4 w-4 mr-2" />
            🌍 Landscapes
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="data-[state=active]:bg-blue-500/20"
          >
            <Gem className="h-4 w-4 mr-2" />
            💎 Resources
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-yellow-500/20"
          >
            <Award className="h-4 w-4 mr-2" />
            🏆 Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipment.map((item, index) => (
              <Card
                key={index}
                className={`border transition-all ${
                  item.equipped
                    ? "border-green-500/50 bg-green-900/20"
                    : "border-muted/50"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <Badge
                        className={`${getRarityColor(item.rarity)} text-white text-xs mt-1`}
                      >
                        {item.rarity.toUpperCase()}
                      </Badge>
                    </div>
                    {item.equipped && (
                      <Badge className="bg-green-600 text-white">
                        EQUIPPED
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    {item.power && (
                      <div className="flex justify-between">
                        <span className="text-sm">Power:</span>
                        <span className="text-red-400 font-bold">
                          {item.power}
                        </span>
                      </div>
                    )}
                    {item.defense && (
                      <div className="flex justify-between">
                        <span className="text-sm">Defense:</span>
                        <span className="text-blue-400 font-bold">
                          {item.defense}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-full mt-3"
                    variant={item.equipped ? "secondary" : "default"}
                    size="sm"
                  >
                    {item.equipped ? "Unequip" : "Equip"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="landscapes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landscapes.map((landscape, index) => (
              <Card
                key={index}
                className={`border transition-all ${
                  landscape.owned
                    ? "border-green-500/50 bg-green-900/20"
                    : "border-red-500/30 opacity-70"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold">{landscape.name}</h4>
                    <Badge
                      className={
                        landscape.owned ? "bg-green-600" : "bg-gray-600"
                      }
                    >
                      {landscape.owned ? "OWNED" : "LOCKED"}
                    </Badge>
                  </div>
                  {landscape.owned && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Tokens Invested:</span>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-orange-400" />
                          <span className="text-orange-400 font-bold">
                            {landscape.tokensInvested}
                          </span>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        🌍 Visit Landscape
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${resource.color}`} />
                        <div>
                          <h4 className="font-bold">{resource.name}</h4>
                          <p className="text-2xl font-bold">
                            {resource.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className={`border transition-all ${
                  achievement.unlocked
                    ? "border-yellow-500/50 bg-yellow-900/20"
                    : "border-muted/50 opacity-70"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge
                      className={
                        achievement.unlocked ? "bg-yellow-600" : "bg-gray-600"
                      }
                    >
                      {achievement.unlocked ? "UNLOCKED" : "LOCKED"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
