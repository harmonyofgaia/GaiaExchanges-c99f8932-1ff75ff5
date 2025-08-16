import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sword, Shield, Zap, Trophy, Coins, Users, Target } from "lucide-react";
import { toast } from "sonner";

interface CustomToken {
  id: string;
  name: string;
  symbol: string;
  power: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  owner: string;
  image: string;
}

interface Battle {
  id: string;
  player1: string;
  player2: string;
  player1Token: CustomToken;
  player2Token: CustomToken;
  status: "pending" | "active" | "completed";
  winner?: string;
  timestamp: Date;
}

export function TokenWarfareSystem() {
  const [userTokens, setUserTokens] = useState<CustomToken[]>([
    {
      id: "1",
      name: "Thunder Strike",
      symbol: "THND",
      power: 85,
      rarity: "Epic",
      owner: "Player1",
      image: "⚡",
    },
    {
      id: "2",
      name: "Earth Guardian",
      symbol: "EARTH",
      power: 90,
      rarity: "Legendary",
      owner: "Player1",
      image: "🌍",
    },
  ]);

  const [activeBattles, setActiveBattles] = useState<Battle[]>([]);
  const [selectedToken, setSelectedToken] = useState<CustomToken | null>(null);
  const [battleQueue, setBattleQueue] = useState<string[]>([]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500";
      case "Rare":
        return "bg-blue-500";
      case "Epic":
        return "bg-purple-500";
      case "Legendary":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const initiateBattle = (token: CustomToken) => {
    setSelectedToken(token);
    setBattleQueue((prev) => [...prev, "searching"]);
    toast.success(`🥊 ${token.name} entered the battle arena!`);

    // Simulate finding opponent
    setTimeout(() => {
      const mockOpponent: CustomToken = {
        id: "opp1",
        name: "Shadow Blade",
        symbol: "SHAD",
        power: Math.floor(Math.random() * 100) + 50,
        rarity: "Epic",
        owner: "Opponent",
        image: "🗡️",
      };

      const newBattle: Battle = {
        id: Date.now().toString(),
        player1: "You",
        player2: "Shadow Fighter",
        player1Token: token,
        player2Token: mockOpponent,
        status: "active",
        timestamp: new Date()
      };

      setActiveBattles((prev) => [...prev, newBattle]);
      setBattleQueue([]);
      toast.info("🎯 Opponent found! Battle begins!");

      // Simulate battle outcome
      setTimeout(() => {
        const winner = token.power > mockOpponent.power ? "You" : "Shadow Fighter";
        const updatedBattle = {
          ...newBattle,
          status: "completed" as const,
          winner,
        };

        setActiveBattles((prev) => prev.map((b) => (b.id === newBattle.id ? updatedBattle : b)));

        if (winner === "You") {
          toast.success(`🏆 Victory! You won ${mockOpponent.name} token!`);
          setUserTokens((prev) => [...prev, { ...mockOpponent, owner: "Player1" }]);
        } else {
          toast.error(`💀 Defeat! You lost ${token.name} token!`);
          setUserTokens((prev) => prev.filter((t) => t.id !== token.id));
        }
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
          ⚔️ Token Warfare Arena
        </h2>
        <p className="text-muted-foreground">
          Battle with your custom tokens in Tekken-style combat. Winner takes all!
        </p>
      </div>

      {/* User's Token Collection */}
      <Card className="bg-gradient-to-br from-purple-900/30 to-red-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Coins className="h-5 w-5" />
            Your Battle Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userTokens.map((token) => (
              <Card
                key={token.id}
                className="bg-gradient-to-br from-purple-800/20 to-red-800/20 border-purple-400/20"
              >
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{token.image}</div>
                    <h3 className="font-bold text-purple-300">{token.name}</h3>
                    <Badge className={getRarityColor(token.rarity)}>{token.rarity}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-400">Power</span>
                      <span className="text-purple-300">{token.power}</span>
                    </div>
                    <Progress value={token.power} className="h-2" />
                  </div>

                  <Button
                    onClick={() => initiateBattle(token)}
                    className="w-full mt-3 bg-red-600 hover:bg-red-700"
                    disabled={battleQueue.length > 0}
                  >
                    <Sword className="h-4 w-4 mr-2" />
                    Enter Battle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Battle Queue */}
      {battleQueue.length > 0 && (
        <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <Zap className="h-5 w-5 animate-pulse" />
              <span>Searching for worthy opponent...</span>
              <Zap className="h-5 w-5 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Battles */}
      {activeBattles.length > 0 && (
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-5 w-5" />
              Active Battles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeBattles.map((battle) => (
                <Card
                  key={battle.id}
                  className="bg-gradient-to-br from-red-800/20 to-orange-800/20 border-red-400/20"
                >
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      {/* Player 1 */}
                      <div className="text-center">
                        <div className="text-2xl mb-1">{battle.player1Token.image}</div>
                        <h4 className="font-bold text-red-300">{battle.player1Token.name}</h4>
                        <div className="text-sm text-red-400">
                          Power: {battle.player1Token.power}
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {battle.player1}
                        </Badge>
                      </div>

                      {/* VS */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 animate-pulse">⚔️</div>
                        <div className="text-sm text-yellow-300">
                          {battle.status === "active"
                            ? "FIGHTING!"
                            : battle.status === "completed"
                              ? "FINISHED"
                              : "PENDING"}
                        </div>
                        {battle.winner && (
                          <Badge className="mt-1 bg-yellow-600">Winner: {battle.winner}</Badge>
                        )}
                      </div>

                      {/* Player 2 */}
                      <div className="text-center">
                        <div className="text-2xl mb-1">{battle.player2Token.image}</div>
                        <h4 className="font-bold text-red-300">{battle.player2Token.name}</h4>
                        <div className="text-sm text-red-400">
                          Power: {battle.player2Token.power}
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {battle.player2}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Victory Rewards Info */}
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Trophy className="h-5 w-5" />
            Victory Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-800/20 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h4 className="font-bold text-green-300">Gaia Fantasy Access</h4>
              <p className="text-sm text-green-400/80">Win battles to unlock special features</p>
            </div>

            <div className="text-center p-4 bg-green-800/20 rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h4 className="font-bold text-green-300">Opponent Tokens</h4>
              <p className="text-sm text-green-400/80">Collect defeated tokens for your arsenal</p>
            </div>

            <div className="text-center p-4 bg-green-800/20 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h4 className="font-bold text-green-300">Virtual Landscapes</h4>
              <p className="text-sm text-green-400/80">
                Purchase special terrains for Virtual World
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
