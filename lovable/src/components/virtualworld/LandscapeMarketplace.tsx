import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Coins,
  TreePine,
  Fish,
  Mountain,
  Waves,
  Flame,
  Snowflake,
  Sun,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface LandscapeMarketplaceProps {
  onPurchase: (landscape: string) => void;
}

interface MarketplaceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: any;
  rarity: "common" | "rare" | "epic" | "legendary";
  environmentalImpact: string;
  tokensRequired: number;
}

export function LandscapeMarketplace({ onPurchase }: LandscapeMarketplaceProps) {
  const [userTokens] = useState(2847);

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: 1,
      name: "🌊 Coral Reef Paradise",
      description: "Stunning underwater world with token burning coral restoration",
      price: 150,
      icon: Fish,
      rarity: "epic",
      environmentalImpact: "Saves 500 coral polyps",
      tokensRequired: 25,
    },
    {
      id: 2,
      name: "🏔️ Alpine Token Summit",
      description: "Majestic mountain peaks with environmental token burning",
      price: 200,
      icon: Mountain,
      rarity: "rare",
      environmentalImpact: "Plants 100 mountain trees",
      tokensRequired: 35,
    },
    {
      id: 3,
      name: "🌲 Enchanted Burning Forest",
      description: "Magical forest where every action burns tokens for real trees",
      price: 300,
      icon: TreePine,
      rarity: "legendary",
      environmentalImpact: "Protects 1000 trees",
      tokensRequired: 50,
    },
    {
      id: 4,
      name: "🔥 Volcanic Token Forge",
      description: "Active volcano landscape for maximum token burning experience",
      price: 250,
      icon: Flame,
      rarity: "epic",
      environmentalImpact: "Funds renewable energy",
      tokensRequired: 40,
    },
    {
      id: 5,
      name: "❄️ Arctic Conservation Zone",
      description: "Pristine arctic environment with polar bear protection",
      price: 180,
      icon: Snowflake,
      rarity: "rare",
      environmentalImpact: "Protects arctic wildlife",
      tokensRequired: 30,
    },
    {
      id: 6,
      name: "🌅 Solar Energy Valley",
      description: "Renewable energy themed landscape with solar panels",
      price: 220,
      icon: Sun,
      rarity: "epic",
      environmentalImpact: "Powers 50 solar panels",
      tokensRequired: 35,
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

  const handlePurchase = (item: MarketplaceItem) => {
    if (userTokens >= item.tokensRequired) {
      onPurchase(item.name);
      toast.success("🛒 Landscape Purchased!", {
        description: `${item.name} added to your collection! Environmental impact: ${item.environmentalImpact}`,
        duration: 5000,
      });
    } else {
      toast.error("Insufficient Tokens", {
        description: `You need ${item.tokensRequired} tokens to purchase this landscape`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <ShoppingCart className="h-6 w-6" />
            🛒 Eco-Landscape Marketplace - Token Burning Adventures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-400">
                  {userTokens.toLocaleString()}
                </span>
                <span className="text-muted-foreground">Available Tokens</span>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              Every purchase burns tokens for real environmental projects!
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceItems.map((item) => {
          const Icon = item.icon;
          const canAfford = userTokens >= item.tokensRequired;

          return (
            <Card
              key={item.id}
              className={`border-2 transition-all hover:scale-105 ${
                canAfford
                  ? "border-green-500/50 hover:border-green-500"
                  : "border-red-500/30 opacity-70"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-8 w-8 text-blue-400" />
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge className={`${getRarityColor(item.rarity)} text-white text-xs mt-1`}>
                        <Star className="h-2 w-2 mr-1" />
                        {item.rarity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Environmental Impact:</span>
                  </div>
                  <p className="text-xs text-green-400">{item.environmentalImpact}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tokens Required:</span>
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-400" />
                      <span className="font-bold">{item.tokensRequired}</span>
                    </div>
                  </div>
                  <Progress value={(userTokens / item.tokensRequired) * 100} className="h-2" />
                </div>

                <Button
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford}
                  className={`w-full ${
                    canAfford
                      ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      : "bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {canAfford ? "Purchase & Burn Tokens" : "Insufficient Tokens"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Marketplace Statistics */}
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Flame className="h-6 w-6" />
            🔥 Marketplace Impact Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">847,250</div>
              <div className="text-sm text-muted-foreground">Tokens Burned via Purchases</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">2,547</div>
              <div className="text-sm text-muted-foreground">Landscapes Sold</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">$152,840</div>
              <div className="text-sm text-muted-foreground">Environmental Funding</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">24/7</div>
              <div className="text-sm text-muted-foreground">Active Marketplace</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
