import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Gift,
  Star,
  Trophy,
  Crown,
  Zap,
  ShoppingCart,
  Users,
  Calendar,
  Target,
  Award,
} from "lucide-react";

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: "discount" | "exclusive" | "experience" | "physical";
  discount?: number;
  limited?: boolean;
  timeLimit?: string;
  icon: string;
}

interface UserLevel {
  level: number;
  name: string;
  pointsRequired: number;
  benefits: string[];
  multiplier: number;
  color: string;
}

export function CommunityRewardsProgram() {
  const [userPoints, setUserPoints] = useState(2450);
  const [userLevel, setUserLevel] = useState(7);
  const [weeklyStreak, setWeeklyStreak] = useState(12);

  const rewards: Reward[] = [
    {
      id: "1",
      name: "Local Business 25% Discount",
      description: "Get 25% off at participating eco-friendly local businesses",
      cost: 500,
      category: "discount",
      discount: 25,
      icon: "🏪",
    },
    {
      id: "2",
      name: "Organic Food Market 40% Off",
      description: "Huge discount at organic food markets and farmer markets",
      cost: 750,
      category: "discount",
      discount: 40,
      icon: "🥕",
    },
    {
      id: "3",
      name: "Tree Adoption Certificate",
      description:
        "Adopt a tree in your name and receive quarterly growth updates",
      cost: 1000,
      category: "experience",
      icon: "🌳",
    },
    {
      id: "4",
      name: "Exclusive GAiA NFT Collection",
      description: "Limited edition environmental impact NFT collection",
      cost: 2000,
      category: "exclusive",
      limited: true,
      icon: "🎨",
    },
    {
      id: "5",
      name: "Zero Waste Workshop Access",
      description: "Join exclusive workshops with environmental experts",
      cost: 800,
      category: "experience",
      icon: "🎓",
    },
    {
      id: "6",
      name: "Renewable Energy 50% Discount",
      description:
        "Special discount on solar panels and renewable energy systems",
      cost: 1500,
      category: "discount",
      discount: 50,
      icon: "⚡",
    },
    {
      id: "7",
      name: "Eco-Travel Experience",
      description: "Sustainable travel packages to environmental destinations",
      cost: 3000,
      category: "experience",
      limited: true,
      icon: "✈️",
    },
    {
      id: "8",
      name: "Community Leader Badge",
      description: "Special recognition as an environmental community leader",
      cost: 2500,
      category: "exclusive",
      icon: "👑",
    },
  ];

  const userLevels: UserLevel[] = [
    {
      level: 1,
      name: "Eco Newbie",
      pointsRequired: 0,
      benefits: ["Basic rewards"],
      multiplier: 1.0,
      color: "text-gray-400",
    },
    {
      level: 2,
      name: "Green Starter",
      pointsRequired: 100,
      benefits: ["5% point bonus"],
      multiplier: 1.05,
      color: "text-green-400",
    },
    {
      level: 3,
      name: "Nature Friend",
      pointsRequired: 300,
      benefits: ["10% point bonus", "Discount access"],
      multiplier: 1.1,
      color: "text-green-500",
    },
    {
      level: 4,
      name: "Eco Warrior",
      pointsRequired: 600,
      benefits: ["15% point bonus", "Exclusive rewards"],
      multiplier: 1.15,
      color: "text-blue-400",
    },
    {
      level: 5,
      name: "Planet Guardian",
      pointsRequired: 1000,
      benefits: ["20% point bonus", "Priority access"],
      multiplier: 1.2,
      color: "text-blue-500",
    },
    {
      level: 6,
      name: "Environmental Hero",
      pointsRequired: 1600,
      benefits: ["25% point bonus", "VIP rewards"],
      multiplier: 1.25,
      color: "text-purple-400",
    },
    {
      level: 7,
      name: "Gaia Champion",
      pointsRequired: 2400,
      benefits: ["30% point bonus", "Premium benefits"],
      multiplier: 1.3,
      color: "text-purple-500",
    },
    {
      level: 8,
      name: "Climate Leader",
      pointsRequired: 3500,
      benefits: ["35% point bonus", "Leadership perks"],
      multiplier: 1.35,
      color: "text-yellow-400",
    },
    {
      level: 9,
      name: "Earth Protector",
      pointsRequired: 5000,
      benefits: ["40% point bonus", "Elite access"],
      multiplier: 1.4,
      color: "text-orange-400",
    },
    {
      level: 10,
      name: "Planetary Sage",
      pointsRequired: 7500,
      benefits: ["50% point bonus", "Master benefits"],
      multiplier: 1.5,
      color: "text-red-400",
    },
  ];

  const currentLevel =
    userLevels.find((l) => l.level === userLevel) || userLevels[0];
  const nextLevel = userLevels.find((l) => l.level === userLevel + 1);

  const claimReward = (reward: Reward) => {
    if (userPoints >= reward.cost) {
      setUserPoints((prev) => prev - reward.cost);
      toast.success(`🎉 ${reward.name} claimed!`, {
        description: reward.description,
        duration: 5000,
      });
    } else {
      toast.error("Not enough points to claim this reward");
    }
  };

  const getRewardsByCategory = (category: string) => {
    return rewards.filter((r) => r.category === category);
  };

  return (
    <Card className="border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-400">
          <Gift className="h-6 w-6" />
          🎁 Community Rewards & Benefits Program
          <Badge className="bg-yellow-600">Premium</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">
              {userPoints.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Available Points
            </div>
          </div>
          <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
            <div className={`text-2xl font-bold ${currentLevel.color}`}>
              {currentLevel.name}
            </div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </div>
          <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">
              {currentLevel.multiplier}x
            </div>
            <div className="text-sm text-muted-foreground">
              Point Multiplier
            </div>
          </div>
          <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">
              {weeklyStreak}
            </div>
            <div className="text-sm text-muted-foreground">Week Streak</div>
          </div>
        </div>

        {/* Level Progress */}
        {nextLevel && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={currentLevel.color}>
                Level {userLevel}: {currentLevel.name}
              </span>
              <span className={nextLevel.color}>Next: {nextLevel.name}</span>
            </div>
            <Progress
              value={
                ((userPoints - currentLevel.pointsRequired) /
                  (nextLevel.pointsRequired - currentLevel.pointsRequired)) *
                100
              }
              className="h-3"
            />
            <div className="text-xs text-center text-muted-foreground">
              {nextLevel.pointsRequired - userPoints} points to next level
            </div>
          </div>
        )}

        {/* Current Level Benefits */}
        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20">
          <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Your Current Benefits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentLevel.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Award className="h-3 w-3 text-purple-400" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Catalog */}
        <Tabs defaultValue="discounts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discounts" className="text-xs">
              💸 Discounts
            </TabsTrigger>
            <TabsTrigger value="experiences" className="text-xs">
              🎯 Experiences
            </TabsTrigger>
            <TabsTrigger value="exclusive" className="text-xs">
              👑 Exclusive
            </TabsTrigger>
            <TabsTrigger value="levels" className="text-xs">
              📊 Levels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discounts" className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">
              💸 Community Discounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getRewardsByCategory("discount").map((reward) => (
                <Card
                  key={reward.id}
                  className="border-green-500/30 bg-green-900/10"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{reward.icon}</span>
                        <div>
                          <h4 className="font-semibold text-green-400">
                            {reward.name}
                          </h4>
                          {reward.discount && (
                            <Badge className="bg-green-600 text-xs">
                              {reward.discount}% OFF
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-400">
                          {reward.cost}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {reward.description}
                    </p>
                    <Button
                      onClick={() => claimReward(reward)}
                      disabled={userPoints < reward.cost}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      {userPoints >= reward.cost
                        ? "Claim Reward"
                        : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">
              🎯 Environmental Experiences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getRewardsByCategory("experience").map((reward) => (
                <Card
                  key={reward.id}
                  className="border-blue-500/30 bg-blue-900/10"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{reward.icon}</span>
                        <div>
                          <h4 className="font-semibold text-blue-400">
                            {reward.name}
                          </h4>
                          {reward.limited && (
                            <Badge className="bg-red-600 text-xs">
                              Limited
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-400">
                          {reward.cost}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {reward.description}
                    </p>
                    <Button
                      onClick={() => claimReward(reward)}
                      disabled={userPoints < reward.cost}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      {userPoints >= reward.cost
                        ? "Claim Experience"
                        : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exclusive" className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">
              👑 Exclusive Rewards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getRewardsByCategory("exclusive").map((reward) => (
                <Card
                  key={reward.id}
                  className="border-purple-500/30 bg-purple-900/10"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{reward.icon}</span>
                        <div>
                          <h4 className="font-semibold text-purple-400">
                            {reward.name}
                          </h4>
                          {reward.limited && (
                            <Badge className="bg-red-600 text-xs animate-pulse">
                              Exclusive
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-400">
                          {reward.cost}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {reward.description}
                    </p>
                    <Button
                      onClick={() => claimReward(reward)}
                      disabled={userPoints < reward.cost}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      {userPoints >= reward.cost
                        ? "Claim Exclusive"
                        : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="levels" className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">
              📊 Level Progression & Benefits
            </h3>
            <div className="space-y-3">
              {userLevels.map((level, index) => (
                <Card
                  key={level.level}
                  className={`${
                    level.level === userLevel
                      ? "border-yellow-500/50 bg-yellow-900/20"
                      : level.level < userLevel
                        ? "border-green-500/30 bg-green-900/10"
                        : "border-gray-500/20 bg-gray-900/10"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${level.color}`}>
                          {level.level}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${level.color}`}>
                            {level.name}
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            {level.pointsRequired} points required
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${level.color}`}>
                          {level.multiplier}x
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Multiplier
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {level.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    {level.level === userLevel && (
                      <Badge className="mt-2 bg-yellow-600">
                        Current Level
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
