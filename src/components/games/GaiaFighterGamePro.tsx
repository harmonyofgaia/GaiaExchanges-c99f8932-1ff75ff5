import { useState, useEffect, useRef, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sword,
  Shield,
  Zap,
  Crown,
  Star,
  Trophy,
  Gamepad2,
  Users,
  Globe,
  Rocket,
  Brain,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";

interface Fighter {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  special: string;
  avatar: string;
  xp: number;
  maxXp: number;
}

interface GameState {
  currentFighter: Fighter;
  opponent: Fighter | null;
  battleInProgress: boolean;
  round: number;
  wins: number;
  losses: number;
  rank: string;
  onlinePlayers: number;
}

export function GaiaFighterGamePro() {
  const { user } = useAuth();
  const [gameState, setGameState] = useState<GameState>({
    currentFighter: {
      id: user?.id || "player",
      name: user?.email?.split("@")[0] || "Warrior",
      level: 1,
      health: 100,
      maxHealth: 100,
      attack: 25,
      defense: 20,
      speed: 15,
      special: "Fire Blast",
      avatar: "⚔️",
      xp: 0,
      maxXp: 100,
    },
    opponent: null,
    battleInProgress: false,
    round: 1,
    wins: 0,
    losses: 0,
    rank: "Novice",
    onlinePlayers: 15247,
  });

  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    console.log("⚔️ GAIA FIGHTER GAME PRO - ADVANCED COMBAT SYSTEM");
    console.log("🛡️ QUANTUM BATTLE ENGINE INITIALIZED");
    console.log("🌍 GLOBAL TOURNAMENT MODE ACTIVE");

    startGameLoop();
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        onlinePlayers: prev.onlinePlayers + Math.floor(Math.random() * 20) - 10,
      }));
    }, 3000);
  };

  const generateOpponent = () => {
    const opponents = [
      { name: "🐉 Dragon Slayer", avatar: "🐉", difficulty: 1.2 },
      { name: "⚡ Lightning Master", avatar: "⚡", difficulty: 1.5 },
      { name: "🔥 Fire Demon", avatar: "🔥", difficulty: 1.8 },
      { name: "❄️ Ice Queen", avatar: "❄️", difficulty: 2.0 },
      { name: "🌪️ Storm Lord", avatar: "🌪️", difficulty: 2.5 },
      { name: "👑 Shadow King", avatar: "👑", difficulty: 3.0 },
    ];

    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    const playerLevel = gameState.currentFighter.level;

    return {
      id: "opponent",
      name: randomOpponent.name,
      level: Math.max(1, playerLevel + Math.floor(Math.random() * 3) - 1),
      health: Math.floor(100 * randomOpponent.difficulty),
      maxHealth: Math.floor(100 * randomOpponent.difficulty),
      attack: Math.floor(25 * randomOpponent.difficulty),
      defense: Math.floor(20 * randomOpponent.difficulty),
      speed: Math.floor(15 * randomOpponent.difficulty),
      special: "Ultimate Strike",
      avatar: randomOpponent.avatar,
      xp: 0,
      maxXp: 100,
    };
  };

  const startBattle = () => {
    const opponent = generateOpponent();
    setGameState((prev) => ({
      ...prev,
      opponent,
      battleInProgress: true,
      round: 1,
    }));
    setBattleLog([
      `⚔️ Battle begins!`,
      `${gameState.currentFighter.name} vs ${opponent.name}`,
      `🎯 Victory conditions: Reduce opponent's health to 0`,
    ]);

    toast.success("⚔️ Battle Started!", {
      description: `Fighting ${opponent.name} - Level ${opponent.level}`,
      duration: 3000,
    });
  };

  const performAttack = (attackType: "normal" | "special") => {
    if (!gameState.opponent || !gameState.battleInProgress) return;

    const player = gameState.currentFighter;
    const opponent = gameState.opponent;

    // Player attack
    let playerDamage =
      attackType === "special"
        ? Math.floor(player.attack * 1.5)
        : Math.floor(player.attack * (0.8 + Math.random() * 0.4));

    playerDamage = Math.max(1, playerDamage - Math.floor(opponent.defense * 0.5));

    const newOpponentHealth = Math.max(0, opponent.health - playerDamage);

    setBattleLog((prev) => [
      ...prev,
      `🗡️ ${player.name} ${attackType === "special" ? "uses " + player.special : "attacks"} for ${playerDamage} damage!`,
    ]);

    // Check if opponent is defeated
    if (newOpponentHealth <= 0) {
      const xpGained = Math.floor(opponent.level * 25 + Math.random() * 50);
      const newPlayerXp = player.xp + xpGained;
      const levelUp = newPlayerXp >= player.maxXp;

      setBattleLog((prev) => [
        ...prev,
        `🏆 Victory! ${opponent.name} is defeated!`,
        `✨ Gained ${xpGained} XP!`,
      ]);

      if (levelUp) {
        setBattleLog((prev) => [...prev, `🌟 LEVEL UP! You are now level ${player.level + 1}!`]);
      }

      setGameState((prev) => ({
        ...prev,
        currentFighter: {
          ...prev.currentFighter,
          xp: levelUp ? newPlayerXp - player.maxXp : newPlayerXp,
          level: levelUp ? player.level + 1 : player.level,
          maxXp: levelUp ? Math.floor(player.maxXp * 1.2) : player.maxXp,
          attack: levelUp ? player.attack + 5 : player.attack,
          defense: levelUp ? player.defense + 3 : player.defense,
          maxHealth: levelUp ? player.maxHealth + 10 : player.maxHealth,
          health: levelUp ? player.maxHealth + 10 : Math.min(player.maxHealth, player.health + 20)
        },
        opponent: null,
        battleInProgress: false,
        wins: prev.wins + 1,
        rank: prev.wins + 1 >= 10 ? "Master" : prev.wins + 1 >= 5 ? "Expert" : "Novice",
      }));

      toast.success("🏆 Victory!", {
        description: `Defeated ${opponent.name} and gained ${xpGained} XP!`,
        duration: 4000,
      });
      return;
    }

    // Opponent counter-attack
    setTimeout(() => {
      let opponentDamage = Math.floor(opponent.attack * (0.8 + Math.random() * 0.4));
      opponentDamage = Math.max(1, opponentDamage - Math.floor(player.defense * 0.5));

      const newPlayerHealth = Math.max(0, player.health - opponentDamage);

      setBattleLog((prev) => [
        ...prev,
        `💥 ${opponent.name} counter-attacks for ${opponentDamage} damage!`,
      ]);

      if (newPlayerHealth <= 0) {
        setBattleLog((prev) => [...prev, `💀 Defeat! You have been defeated by ${opponent.name}!`]);

        setGameState((prev) => ({
          ...prev,
          currentFighter: {
            ...prev.currentFighter,
            health: prev.currentFighter.maxHealth,
          },
          opponent: null,
          battleInProgress: false,
          losses: prev.losses + 1,
        }));

        toast.error("💀 Defeated!", {
          description: `${opponent.name} has bested you in combat!`,
          duration: 4000,
        });
        return;
      }

      setGameState((prev) => ({
        ...prev,
        currentFighter: {
          ...prev.currentFighter,
          health: newPlayerHealth,
        },
        opponent: {
          ...prev.opponent!,
          health: newOpponentHealth,
        },
        round: prev.round + 1,
      }));
    }, 1500);

    setGameState((prev) => ({
      ...prev,
      opponent: {
        ...prev.opponent!,
        health: newOpponentHealth,
      },
    }));
  };

  const trainFighter = async () => {
    setIsTraining(true);
    console.log("🏋️ TRAINING MODE ACTIVATED");
    console.log("💪 QUANTUM TRAINING PROTOCOLS ENGAGED");

    for (let i = 0; i < 3; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBattleLog((prev) => [...prev, `🏋️ Training session ${i + 1}/3...`]);
    }

    const statBonus = Math.floor(Math.random() * 5) + 1;

    setGameState((prev) => ({
      ...prev,
      currentFighter: {
        ...prev.currentFighter,
        attack: prev.currentFighter.attack + statBonus,
        defense: prev.currentFighter.defense + Math.floor(statBonus / 2),
        health: prev.currentFighter.maxHealth,
      },
    }));

    setBattleLog((prev) => [...prev, `💪 Training complete! Attack increased by ${statBonus}!`]);

    setIsTraining(false);

    toast.success("💪 Training Complete!", {
      description: `Your fighter has grown stronger!`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Game Header */}
        <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Sword className="h-8 w-8 animate-pulse" />
              ⚔️ GAIA FIGHTER GAME PRO - ULTIMATE COMBAT
            </CardTitle>
            <div className="flex gap-4 text-sm flex-wrap">
              <Badge className="bg-red-600">
                🗡️ {gameState.currentFighter.name} - Level {gameState.currentFighter.level}
              </Badge>
              <Badge className="bg-green-600">
                ❤️ {gameState.currentFighter.health}/{gameState.currentFighter.maxHealth} HP
              </Badge>
              <Badge className="bg-blue-600">
                ⚡ {gameState.currentFighter.attack} ATK / {gameState.currentFighter.defense} DEF
              </Badge>
              <Badge className="bg-purple-600">
                🏆 Wins: {gameState.wins} | Losses: {gameState.losses}
              </Badge>
              <Badge className="bg-yellow-600">👑 Rank: {gameState.rank}</Badge>
              <Badge className="bg-cyan-600">
                👥 Online: {gameState.onlinePlayers.toLocaleString()}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="battle" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="battle">⚔️ Battle Arena</TabsTrigger>
            <TabsTrigger value="training">💪 Training</TabsTrigger>
            <TabsTrigger value="stats">📊 Fighter Stats</TabsTrigger>
            <TabsTrigger value="tournament">🏆 Tournament</TabsTrigger>
          </TabsList>

          <TabsContent value="battle" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fighter Display */}
              <Card className="bg-black/30 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400">🛡️ Your Fighter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{gameState.currentFighter.avatar}</div>
                    <div className="text-xl font-bold text-green-400">
                      {gameState.currentFighter.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Level {gameState.currentFighter.level} {gameState.rank}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health</span>
                      <span className="text-red-400">
                        {gameState.currentFighter.health}/{gameState.currentFighter.maxHealth}
                      </span>
                    </div>
                    <Progress
                      value={
                        (gameState.currentFighter.health / gameState.currentFighter.maxHealth) * 100
                      }
                      className="h-2 bg-red-900/50"
                    />

                    <div className="flex justify-between text-sm">
                      <span>Experience</span>
                      <span className="text-blue-400">
                        {gameState.currentFighter.xp}/{gameState.currentFighter.maxXp}
                      </span>
                    </div>
                    <Progress
                      value={(gameState.currentFighter.xp / gameState.currentFighter.maxXp) * 100}
                      className="h-2 bg-blue-900/50"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Battle Arena */}
              <Card className="bg-black/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">⚔️ Battle Arena</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!gameState.battleInProgress ? (
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🏟️</div>
                      <div className="text-lg text-purple-400">Ready for Battle!</div>
                      <Button
                        onClick={startBattle}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                      >
                        <Sword className="h-4 w-4 mr-2" />
                        🎯 Find Opponent
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">⚔️ VS {gameState.opponent?.avatar}</div>
                        <div className="text-lg font-bold text-red-400">
                          Round {gameState.round}
                        </div>
                      </div>

                      {gameState.opponent && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{gameState.opponent.name}</span>
                            <span className="text-red-400">
                              {gameState.opponent.health}/{gameState.opponent.maxHealth}
                            </span>
                          </div>
                          <Progress
                            value={(gameState.opponent.health / gameState.opponent.maxHealth) * 100}
                            className="h-2 bg-red-900/50"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => performAttack("normal")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          🗡️ Attack
                        </Button>
                        <Button
                          onClick={() => performAttack("special")}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          ⚡ Special
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Battle Log */}
              <Card className="bg-black/30 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">📜 Battle Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 overflow-y-auto space-y-1 text-sm">
                    {battleLog.map((log, index) => (
                      <div key={index} className="text-muted-foreground">
                        {log}
                      </div>
                    ))}
                    {battleLog.length === 0 && (
                      <div className="text-center text-muted-foreground">
                        No battles yet. Start fighting to see the action!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400 text-center">
                  💪 QUANTUM TRAINING CENTER
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-pulse">🏋️</div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    ADVANCED COMBAT TRAINING
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enhance your fighter's abilities through quantum training protocols
                  </p>

                  <Button
                    onClick={trainFighter}
                    disabled={isTraining}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-4"
                  >
                    <Brain className="h-6 w-6 mr-2" />
                    {isTraining ? "🏋️ TRAINING..." : "💪 START TRAINING"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-red-900/30 border-red-500/30">
                <CardContent className="p-4 text-center">
                  <Sword className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">
                    {gameState.currentFighter.attack}
                  </div>
                  <div className="text-sm text-muted-foreground">Attack Power</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/30 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">
                    {gameState.currentFighter.defense}
                  </div>
                  <div className="text-sm text-muted-foreground">Defense</div>
                </CardContent>
              </Card>

              <Card className="bg-green-900/30 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">
                    {gameState.currentFighter.speed}
                  </div>
                  <div className="text-sm text-muted-foreground">Speed</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/30 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">
                    {gameState.currentFighter.level}
                  </div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tournament" className="space-y-6">
            <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-center">🏆 GLOBAL TOURNAMENT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🏆</div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">WORLDWIDE COMPETITION</h3>
                  <p className="text-muted-foreground mb-6">
                    Compete against {gameState.onlinePlayers.toLocaleString()} fighters worldwide
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">{gameState.wins}</div>
                      <div className="text-xs text-muted-foreground">Tournament Wins</div>
                    </div>
                    <div className="text-center p-4 bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-400">{gameState.losses}</div>
                      <div className="text-xs text-muted-foreground">Losses</div>
                    </div>
                    <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">{gameState.rank}</div>
                      <div className="text-xs text-muted-foreground">Current Rank</div>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold px-8 py-4">
                    <Trophy className="h-6 w-6 mr-2" />
                    🏆 JOIN TOURNAMENT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
