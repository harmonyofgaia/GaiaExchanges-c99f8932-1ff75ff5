import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, WifiOff, Users, Gamepad2, Crown, Trophy, Zap } from "lucide-react";

interface GameStatus {
  isOnline: boolean;
  playerCount: number;
  activeGames: number;
  serverLoad: number;
  latency: number;
}

export function GameStatusIndicator() {
  const [gameStatus, setGameStatus] = useState<GameStatus>({
    isOnline: true,
    playerCount: 8942,
    activeGames: 247,
    serverLoad: 65,
    latency: 45,
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setGameStatus((prev) => ({
        ...prev,
        playerCount: prev.playerCount + Math.floor(Math.random() * 20) - 10,
        activeGames: prev.activeGames + Math.floor(Math.random() * 10) - 5,
        serverLoad: Math.max(20, Math.min(95, prev.serverLoad + (Math.random() - 0.5) * 10)),
        latency: Math.max(20, Math.min(200, prev.latency + (Math.random() - 0.5) * 20)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!gameStatus.isOnline) return "text-red-400";
    if (gameStatus.serverLoad > 80 || gameStatus.latency > 150) return "text-yellow-400";
    return "text-green-400";
  };

  const getStatusText = () => {
    if (!gameStatus.isOnline) return "OFFLINE";
    if (gameStatus.serverLoad > 80 || gameStatus.latency > 150) return "DEGRADED";
    return "OPTIMAL";
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-green-900/30 border border-green-500/30">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {gameStatus.isOnline ? (
              <Wifi className="h-5 w-5 text-green-400" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-400" />
            )}
            <span className="font-semibold text-white">Game Servers</span>
          </div>
          <Badge className={`${getStatusColor()} bg-black/30`}>{getStatusText()}</Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <Users className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <div className="font-bold text-blue-400">{gameStatus.playerCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Players</div>
          </div>

          <div className="text-center">
            <Gamepad2 className="h-4 w-4 text-purple-400 mx-auto mb-1" />
            <div className="font-bold text-purple-400">{gameStatus.activeGames}</div>
            <div className="text-xs text-muted-foreground">Active Games</div>
          </div>

          <div className="text-center">
            <Zap className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
            <div className="font-bold text-yellow-400">{gameStatus.serverLoad}%</div>
            <div className="text-xs text-muted-foreground">Server Load</div>
          </div>

          <div className="text-center">
            <Crown className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <div className="font-bold text-green-400">{gameStatus.latency}ms</div>
            <div className="text-xs text-muted-foreground">Latency</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
