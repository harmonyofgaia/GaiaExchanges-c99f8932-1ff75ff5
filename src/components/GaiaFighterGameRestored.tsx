import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Zap, Shield, Target, Trophy, Star } from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

interface Fighter {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  experience: number;
  element: "earth" | "water" | "fire" | "air";
}

interface GameState {
  player: Fighter;
  opponent: Fighter;
  gameActive: boolean;
  round: number;
  playerTurn: boolean;
  gameLog: string[];
}

export function GaiaFighterGameRestored() {
  const [gameState, setGameState] = useState<GameState>({
    player: {
      id: "player",
      name: "Gaia Guardian",
      health: 100,
      maxHealth: 100,
      attack: 25,
      defense: 15,
      speed: 20,
      level: 1,
      experience: 0,
      element: "earth",
    },
    opponent: {
      id: "opponent",
      name: "Eco Destroyer",
      health: 80,
      maxHealth: 80,
      attack: 20,
      defense: 10,
      speed: 15,
      level: 1,
      experience: 0,
      element: "fire",
    },
    gameActive: false,
    round: 1,
    playerTurn: true,
    gameLog: [],
  });

  const [gaiaRewards, setGaiaRewards] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout>(undefined);

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      gameActive: true,
      gameLog: ["🌍 Gaia Fighter Game Started! Defend the planet!"],
    }));

    toast.success("🎮 Gaia Fighter Game Started!", {
      description: "Fight for the environment and earn GAiA tokens!",
      duration: 3000,
    });
  };

  const performAttack = (attackType: "basic" | "special" | "ultimate") => {
    if (!gameState.gameActive || !gameState.playerTurn) return;

    setGameState((prev) => {
      const newState = { ...prev };
      let damage = 0;
      let logMessage = "";

      switch (attackType) {
        case "basic":
          damage = Math.floor(Math.random() * 15) + 10;
          logMessage = `🗡️ Gaia Guardian attacks for ${damage} damage!`;
          break;
        case "special":
          damage = Math.floor(Math.random() * 25) + 15;
          logMessage = `⚡ Gaia Guardian uses Nature's Wrath for ${damage} damage!`;
          break;
        case "ultimate":
          damage = Math.floor(Math.random() * 40) + 25;
          logMessage = `🌪️ Gaia Guardian unleashes Planet's Fury for ${damage} damage!`;
          break;
      }

      newState.opponent.health = Math.max(0, newState.opponent.health - damage);
      newState.gameLog = [...newState.gameLog.slice(-4), logMessage];
      newState.playerTurn = false;

      return newState;
    });

    // Opponent's turn after delay
    setTimeout(() => {
      setGameState((prev) => {
        if (prev.opponent.health <= 0) {
          // Player wins
          const reward = Math.floor(Math.random() * 50) + 25;
          setGaiaRewards((current) => current + reward);

          toast.success("🏆 Victory!", {
            description: `You earned ${reward} GAiA tokens for saving the environment!`,
            duration: 5000,
          });

          return {
            ...prev,
            gameActive: false,
            gameLog: [...prev.gameLog, `🏆 Victory! Earned ${reward} GAiA tokens!`],
          };
        }

        // Opponent attacks
        const opponentDamage = Math.floor(Math.random() * 20) + 8;
        const newState = { ...prev };
        newState.player.health = Math.max(0, newState.player.health - opponentDamage);
        newState.gameLog = [
          ...newState.gameLog.slice(-4),
          `💥 Eco Destroyer attacks for ${opponentDamage} damage!`,
        ];
        newState.playerTurn = true;

        if (newState.player.health <= 0) {
          newState.gameActive = false;
          newState.gameLog = [
            ...newState.gameLog,
            "💀 Defeat! The environment needs your protection!",
          ];

          toast.error("💀 Defeat!", {
            description: "The environment needs your protection! Try again!",
            duration: 3000,
          });
        }

        return newState;
      });
    }, 1500);
  };

  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, health: prev.player.maxHealth },
      opponent: { ...prev.opponent, health: prev.opponent.maxHealth },
      gameActive: false,
      round: 1,
      playerTurn: true,
      gameLog: [],
    }));
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Gamepad2 className="h-6 w-6" />
          🎮 GAIA FIGHTER GAME - Environmental Battle Arena
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-600 text-white">GAiA Rewards: {gaiaRewards}</Badge>
          <Badge className="bg-blue-600 text-white">Round: {gameState.round}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* GAiA Token Integration */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-bold text-green-400 mb-2">
              🌍 Harmony of Gaia Integration
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Contract:</div>
                <code className="font-mono text-xs text-green-400">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
              <div>
                <div className="text-muted-foreground">Rewards Earned:</div>
                <div className="text-xl font-bold text-green-400">{gaiaRewards} GAiA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fighter Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player Fighter */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {gameState.player.name}
            </h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span>
                    {gameState.player.health}/{gameState.player.maxHealth}
                  </span>
                </div>
                <Progress
                  value={(gameState.player.health / gameState.player.maxHealth) * 100}
                  className="h-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Attack: {gameState.player.attack}</div>
                <div>Defense: {gameState.player.defense}</div>
                <div>Speed: {gameState.player.speed}</div>
                <div>Level: {gameState.player.level}</div>
              </div>
            </div>
          </div>

          {/* Opponent Fighter */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              {gameState.opponent.name}
            </h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span>
                    {gameState.opponent.health}/{gameState.opponent.maxHealth}
                  </span>
                </div>
                <Progress
                  value={(gameState.opponent.health / gameState.opponent.maxHealth) * 100}
                  className="h-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Attack: {gameState.opponent.attack}</div>
                <div>Defense: {gameState.opponent.defense}</div>
                <div>Speed: {gameState.opponent.speed}</div>
                <div>Level: {gameState.opponent.level}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="space-y-4">
          {!gameState.gameActive ? (
            <div className="text-center space-y-4">
              <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                <Gamepad2 className="h-5 w-5 mr-2" />
                Start Eco Battle
              </Button>
              {gameState.gameLog.length > 0 && (
                <Button onClick={resetGame} variant="outline">
                  Reset Game
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => performAttack("basic")}
                disabled={!gameState.playerTurn}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="h-4 w-4 mr-2" />
                Basic Attack
              </Button>
              <Button
                onClick={() => performAttack("special")}
                disabled={!gameState.playerTurn}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Star className="h-4 w-4 mr-2" />
                Nature's Wrath
              </Button>
              <Button
                onClick={() => performAttack("ultimate")}
                disabled={!gameState.playerTurn}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Planet's Fury
              </Button>
            </div>
          )}
        </div>

        {/* Game Log */}
        {gameState.gameLog.length > 0 && (
          <div className="bg-black/20 border border-gray-500/30 rounded-lg p-4">
            <h4 className="text-sm font-bold text-gray-400 mb-2">Battle Log</h4>
            <div className="space-y-1 text-sm">
              {gameState.gameLog.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environmental Impact */}
        <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-bold text-green-400 mb-2">🌱 Environmental Impact</h4>
            <p className="text-sm text-muted-foreground">
              Every victory in Gaia Fighter helps fund real environmental projects through GAiA
              token rewards
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
