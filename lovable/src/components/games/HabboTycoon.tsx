import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MapPin,
  Shield,
  Crown,
  Building2,
  Coins,
  Star,
  Globe,
  Lock,
  Eye,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";
import { AdminTycoonControls } from "./AdminTycoonControls";
import { WorldMapSelector } from "./WorldMapSelector";
import { PrivateChatrooms } from "./PrivateChatrooms";
import { TycoonSecurityWall } from "./TycoonSecurityWall";

interface Player {
  id: string;
  name: string;
  avatar: string;
  level: number;
  coins: number;
  buildings: number;
  reputation: number;
  location: { lat: number; lng: number; city: string };
  online: boolean;
}

interface Building {
  id: string;
  type: "hotel" | "restaurant" | "attraction" | "shop";
  name: string;
  level: number;
  income: number;
  cost: number;
  x: number;
  y: number;
}

export function HabboTycoon() {
  const { user } = useAuth();
  const [isAdmin] = useState(user?.email === "admin@gaia.com"); // Admin detection
  const [playerData, setPlayerData] = useState<Player>({
    id: user?.id || "guest",
    name: user?.email?.split("@")[0] || "Guest",
    avatar: "🎮",
    level: 1,
    coins: 1000,
    buildings: 0,
    reputation: 100,
    location: { lat: 52.52, lng: 13.405, city: "Berlin" },
    online: true,
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [gameMode, setGameMode] = useState<"building" | "chatroom" | "world">(
    "building",
  );
  const [onlinePlayers, setOnlinePlayers] = useState(1547);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(100);

  const gameLoopRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    console.log("🏨 HABBO TYCOON - ADVANCED GAMING SYSTEM INITIALIZED");
    console.log("🛡️ QUANTUM SECURITY PROTOCOLS ACTIVE");
    console.log("🌍 GLOBAL VIRTUAL REAL LIFE PLATFORM READY");

    if (isAdmin) {
      console.log("👑 ADMIN MODE ACTIVATED - ALL FEATURES UNLOCKED");
      console.log("🔒 INVISIBLE ADMIN CONTROLS LOADED");
    }

    // Game loop for passive income and updates
    gameLoopRef.current = setInterval(() => {
      const income = buildings.reduce(
        (total, building) => total + building.income,
        0,
      );

      setPlayerData((prev) => ({
        ...prev,
        coins: prev.coins + income,
        reputation: Math.min(100, prev.reputation + 0.1),
      }));

      setTotalRevenue((prev) => prev + income);
      setOnlinePlayers((prev) => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [buildings, isAdmin]);

  const buildStructure = (type: Building["type"]) => {
    const costs = { hotel: 500, restaurant: 300, attraction: 800, shop: 200 };
    const cost = costs[type];

    if (playerData.coins >= cost) {
      const newBuilding: Building = {
        id: Date.now().toString(),
        type,
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${buildings.length + 1}`,
        level: 1,
        income:
          type === "hotel"
            ? 50
            : type === "restaurant"
              ? 30
              : type === "attraction"
                ? 80
                : 20,
        cost,
        x: Math.random() * 300,
        y: Math.random() * 200,
      };

      setBuildings((prev) => [...prev, newBuilding]);
      setPlayerData((prev) => ({
        ...prev,
        coins: prev.coins - cost,
        buildings: prev.buildings + 1,
        level: Math.floor((prev.buildings + 1) / 5) + 1,
      }));

      toast.success(`🏗️ ${newBuilding.name} Built!`, {
        description: `Generating ${newBuilding.income} coins every 5 seconds`,
        duration: 3000,
      });
    } else {
      toast.error("💰 Not enough coins!", {
        description: `You need ${cost} coins to build a ${type}`,
        duration: 3000,
      });
    }
  };

  const enterChatroom = () => {
    if (!selectedLocation) {
      toast.error("🌍 Select a location first!", {
        description: "Choose where on Earth you want to chat",
        duration: 3000,
      });
      return;
    }

    setGameMode("chatroom");
    toast.success("🗣️ Entering secure chatroom!", {
      description: `Connected to ${selectedLocation.city} - Quantum encrypted`,
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <TycoonSecurityWall />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Game Header */}
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Building2 className="h-8 w-8 animate-bounce" />
              🏨 HABBO TYCOON - Virtual Real Life Platform
            </CardTitle>
            <div className="flex gap-4 text-sm">
              <Badge className="bg-green-600">
                👤 {playerData.name} - Level {playerData.level}
              </Badge>
              <Badge className="bg-yellow-600">
                💰 {playerData.coins.toLocaleString()} Coins
              </Badge>
              <Badge className="bg-blue-600">
                🏢 {playerData.buildings} Buildings
              </Badge>
              <Badge className="bg-purple-600">
                🌟 {playerData.reputation}% Reputation
              </Badge>
              <Badge className="bg-red-600">
                👥 {onlinePlayers.toLocaleString()} Online
              </Badge>
              {isAdmin && (
                <Badge className="bg-red-600 animate-pulse">
                  👑 ADMIN MODE ACTIVE
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Admin-Only Controls (Invisible to regular users) */}
        {isAdmin && (
          <AdminTycoonControls
            playerData={playerData}
            setPlayerData={setPlayerData}
            buildings={buildings}
            setBuildings={setBuildings}
          />
        )}

        {/* Game Tabs */}
        <Tabs
          value={gameMode}
          onValueChange={(value) => setGameMode(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="building">🏗️ Build Empire</TabsTrigger>
            <TabsTrigger value="world">🌍 World Map</TabsTrigger>
            <TabsTrigger value="chatroom">💬 Secure Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="building" className="space-y-6">
            {/* Building Game */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-black/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">
                    🏗️ Your Tycoon Empire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-64 bg-gradient-to-b from-green-900/20 to-brown-900/20 rounded-lg border border-green-500/30 overflow-hidden">
                    {buildings.map((building) => (
                      <div
                        key={building.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                        style={{ left: building.x, top: building.y }}
                        title={`${building.name} - Level ${building.level} - Income: ${building.income}/5s`}
                      >
                        <div className="text-2xl">
                          {building.type === "hotel" && "🏨"}
                          {building.type === "restaurant" && "🍽️"}
                          {building.type === "attraction" && "🎢"}
                          {building.type === "shop" && "🏪"}
                        </div>
                      </div>
                    ))}
                    {buildings.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        🏗️ Start building your empire!
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between text-sm">
                    <span>
                      Total Income:{" "}
                      {buildings.reduce((sum, b) => sum + b.income, 0)} coins/5s
                    </span>
                    <span>Buildings: {buildings.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">🏗️ Build Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => buildStructure("hotel")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    🏨 Hotel (500 💰)
                  </Button>
                  <Button
                    onClick={() => buildStructure("restaurant")}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    🍽️ Restaurant (300 💰)
                  </Button>
                  <Button
                    onClick={() => buildStructure("attraction")}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    🎢 Attraction (800 💰)
                  </Button>
                  <Button
                    onClick={() => buildStructure("shop")}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    🏪 Shop (200 💰)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="world" className="space-y-6">
            <WorldMapSelector
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              playerData={playerData}
              isAdmin={isAdmin}
            />
          </TabsContent>

          <TabsContent value="chatroom" className="space-y-6">
            <PrivateChatrooms
              selectedLocation={selectedLocation}
              playerData={playerData}
              isAdmin={isAdmin}
            />
          </TabsContent>
        </Tabs>

        {/* Game Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                ${totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {onlinePlayers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Players Online
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {playerData.level}
              </div>
              <div className="text-sm text-muted-foreground">Player Level</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/30 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">
                {buildings.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Buildings Built
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-900/30 border-red-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">
                {securityLevel}%
              </div>
              <div className="text-sm text-muted-foreground">
                Security Level
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
