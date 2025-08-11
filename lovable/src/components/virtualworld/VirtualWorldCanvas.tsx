import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TreePine,
  Fish,
  Mountain,
  Waves,
  Sun,
  Moon,
  Cloud,
  Snowflake,
  Flame,
  Coins,
  Gamepad2,
  Users,
  Globe,
  Zap,
  Star,
  Heart,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

interface VirtualWorldCanvasProps {
  currentLandscape: string;
  onLandscapeChange: (landscape: string) => void;
}

export function VirtualWorldCanvas({
  currentLandscape,
  onLandscapeChange,
}: VirtualWorldCanvasProps) {
  const [tokensBurned, setTokensBurned] = useState(2847);
  const [animalsHelped, setAnimalsHelped] = useState(1653);
  const [weatherEffect, setWeatherEffect] = useState("sunny");
  const [playersOnline, setPlayersOnline] = useState(1247);
  const [worldActivity, setWorldActivity] = useState<string[]>([]);
  const [environmentalScore, setEnvironmentalScore] = useState(92.5);
  const [realTimeEvents, setRealTimeEvents] = useState<string[]>([]);

  const landscapes = [
    {
      name: "🌊 Ocean Paradise with Token Burning",
      icon: Waves,
      theme: "blue",
      power: 85,
    },
    {
      name: "🏔️ Mountain Summit Adventure",
      icon: Mountain,
      theme: "green",
      power: 92,
    },
    {
      name: "🌲 Enchanted Forest Sanctuary",
      icon: TreePine,
      theme: "emerald",
      power: 88,
    },
    {
      name: "🔥 Volcanic Token Burning Realm",
      icon: Flame,
      theme: "red",
      power: 95,
    },
    {
      name: "❄️ Arctic Crystal World",
      icon: Snowflake,
      theme: "cyan",
      power: 78,
    },
    {
      name: "🌅 Sunrise Valley of Harmony",
      icon: Sun,
      theme: "yellow",
      power: 82,
    },
    {
      name: "🌙 Moonlit Mystical Gardens",
      icon: Moon,
      theme: "purple",
      power: 87,
    },
    { name: "⚡ Thunder Plains Arena", icon: Zap, theme: "yellow", power: 90 },
  ];

  useEffect(() => {
    // Weather effects cycle
    const weatherInterval = setInterval(() => {
      setWeatherEffect((prev) => {
        const effects = [
          "sunny",
          "cloudy",
          "rainy",
          "snowy",
          "windy",
          "stormy",
        ];
        return effects[Math.floor(Math.random() * effects.length)];
      });
    }, 20000);

    // Online players simulation
    const playersInterval = setInterval(() => {
      setPlayersOnline((prev) => prev + Math.floor(Math.random() * 20) - 10);
    }, 10000);

    // Real-time events
    const eventsInterval = setInterval(() => {
      const events = [
        "Dragon spotted soaring over the landscape!",
        "Ancient tree blooms with magical energy",
        "Token burning ceremony completed successfully",
        "New environmental milestone reached",
        "Rare creature sighting reported",
        "Weather patterns shifting across the world",
        "Community quest objective completed",
      ];
      const newEvent = events[Math.floor(Math.random() * events.length)];
      setRealTimeEvents((prev) => [newEvent, ...prev.slice(0, 4)]);
    }, 15000);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(playersInterval);
      clearInterval(eventsInterval);
    };
  }, []);

  const handleLandscapeChange = (landscape: string) => {
    onLandscapeChange(landscape);
    setTokensBurned((prev) => prev + Math.floor(Math.random() * 10) + 5);
    setAnimalsHelped((prev) => prev + Math.floor(Math.random() * 5) + 2);
    setEnvironmentalScore((prev) => Math.min(100, prev + Math.random() * 2));

    const activities = [
      `Explored ${landscape}`,
      "Discovered hidden treasure",
      "Helped local wildlife",
      "Completed environmental quest",
      "Unlocked new area",
    ];
    setWorldActivity((prev) => [
      activities[Math.floor(Math.random() * activities.length)],
      ...prev.slice(0, 4),
    ]);
  };

  const handleInteraction = (type: string) => {
    const interactions = {
      "feed-animals": {
        tokens: 5,
        animals: 3,
        message: "Fed magical creatures!",
      },
      "plant-tree": {
        tokens: 10,
        animals: 1,
        message: "Planted ancient tree!",
      },
      "clean-water": {
        tokens: 8,
        animals: 2,
        message: "Purified sacred waters!",
      },
      "burn-tokens": {
        tokens: 25,
        animals: 0,
        message: "Burned tokens for environmental cause!",
      },
    };

    const interaction = interactions[type as keyof typeof interactions];
    if (interaction) {
      setTokensBurned((prev) => prev + interaction.tokens);
      setAnimalsHelped((prev) => prev + interaction.animals);
      setEnvironmentalScore((prev) => Math.min(100, prev + 0.5));
      toast.success(interaction.message, {
        description: `+${interaction.tokens} tokens burned, +${interaction.animals} animals helped`,
        duration: 3000,
      });
    }
  };

  const getWeatherIcon = () => {
    switch (weatherEffect) {
      case "rainy":
        return "🌧️";
      case "snowy":
        return "❄️";
      case "cloudy":
        return "☁️";
      case "windy":
        return "💨";
      case "stormy":
        return "⛈️";
      default:
        return "☀️";
    }
  };

  const getWeatherElements = () => {
    switch (weatherEffect) {
      case "rainy":
        return Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-8 bg-blue-400/40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ));
      case "snowy":
        return Array.from({ length: 20 }).map((_, i) => (
          <Snowflake
            key={i}
            className="absolute h-3 w-3 text-white/50 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "3s",
            }}
          />
        ));
      case "stormy":
        return Array.from({ length: 15 }).map((_, i) => (
          <Zap
            key={i}
            className="absolute h-4 w-4 text-yellow-400/60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* World Status Panel */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Globe className="h-6 w-6 animate-pulse" />
            🌍 Virtual World Status - Live Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {tokensBurned.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Tokens Burned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {animalsHelped.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Animals Helped
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {playersOnline.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Players Online
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {environmentalScore.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Eco Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{getWeatherIcon()}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {weatherEffect}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Canvas Area */}
      <Card className="relative min-h-[500px] overflow-hidden border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-center text-purple-400">
            🌍 Virtual World Canvas - Current: {currentLandscape}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating coins animation */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`coin-${i}`}
                className="absolute animate-bounce"
                style={{
                  left: `${10 + i * 6}%`,
                  top: `${20 + Math.sin(i) * 25}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: "3s",
                }}
              >
                <Coins className="h-5 w-5 text-yellow-400/70" />
              </div>
            ))}

            {/* Floating hearts for animals helped */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${15 + i * 10}%`,
                  top: `${40 + Math.cos(i) * 20}%`,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: "2s",
                }}
              >
                <Heart className="h-4 w-4 text-pink-400/60" />
              </div>
            ))}

            {/* Environmental shields */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`shield-${i}`}
                className="absolute animate-spin"
                style={{
                  left: `${25 + i * 12}%`,
                  top: `${60 + Math.sin(i * 2) * 15}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: "8s",
                }}
              >
                <Shield className="h-4 w-4 text-green-400/50" />
              </div>
            ))}

            {/* Weather effects */}
            {getWeatherElements()}
          </div>

          {/* Central Gaming Area */}
          <div className="relative z-10 text-center space-y-4">
            <div className="text-8xl animate-pulse">🌍</div>
            <div className="text-xl text-muted-foreground">
              Interactive Virtual Environment - Harmony of Gaia
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 text-white">
                <Flame className="h-3 w-3 mr-1" />
                {tokensBurned} Tokens Burned
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Fish className="h-3 w-3 mr-1" />
                {animalsHelped} Animals Helped
              </Badge>
              <Badge className="bg-purple-600 text-white">
                <Users className="h-3 w-3 mr-1" />
                {playersOnline} Online
              </Badge>
              <Badge className="bg-yellow-600 text-white">
                <Star className="h-3 w-3 mr-1" />
                {environmentalScore.toFixed(1)}% Eco Score
              </Badge>
            </div>

            {/* Interactive Buttons */}
            <div className="flex justify-center gap-3 flex-wrap mt-6">
              <Button
                onClick={() => handleInteraction("feed-animals")}
                className="bg-pink-600 hover:bg-pink-700"
              >
                🦋 Feed Animals
              </Button>
              <Button
                onClick={() => handleInteraction("plant-tree")}
                className="bg-green-600 hover:bg-green-700"
              >
                🌱 Plant Tree
              </Button>
              <Button
                onClick={() => handleInteraction("clean-water")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                💧 Clean Water
              </Button>
              <Button
                onClick={() => handleInteraction("burn-tokens")}
                className="bg-orange-600 hover:bg-orange-700"
              >
                🔥 Burn Tokens
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Events */}
      {realTimeEvents.length > 0 && (
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Zap className="h-5 w-5" />⚡ Live World Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {realTimeEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-300">{event}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Landscape Selection */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            🎮 Choose Your Adventure Landscape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {landscapes.map((landscape, index) => {
              const Icon = landscape.icon;
              return (
                <Button
                  key={index}
                  onClick={() => handleLandscapeChange(landscape.name)}
                  className={`h-24 bg-gradient-to-r from-${landscape.theme}-600 to-${landscape.theme}-700 hover:from-${landscape.theme}-700 hover:to-${landscape.theme}-800 text-white relative overflow-hidden`}
                >
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <Icon className="h-6 w-6" />
                    <span className="text-xs text-center">
                      {landscape.name}
                    </span>
                    <Badge className="bg-white/20 text-white text-xs">
                      Power: {landscape.power}
                    </Badge>
                  </div>
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* GAIA Token Integration */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center">
            🚀 Powered by GAIA Token - Harmony of Culture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-sm text-green-400">
              <strong>Contract:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>
            <div className="text-sm text-blue-400">
              <strong>Wallet:</strong>{" "}
              <code className="font-mono text-xs bg-black/20 px-2 py-1 rounded">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Every interaction burns GAIA tokens for real environmental impact
              and wildlife conservation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
