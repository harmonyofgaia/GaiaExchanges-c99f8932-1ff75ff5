import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Coins,
  Zap,
  Crown,
  Target,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface GameStats {
  tokensCollected: number;
  score: number;
  gamesPlayed: number;
  gamesWon: number;
  weeklyWins: number;
  tokensWonThisWeek: number;
}

interface Position {
  x: number;
  y: number;
}

interface GaiaToken {
  position: Position;
  value: number;
  type: "normal" | "bonus" | "mega";
}

export function SnakeGameArena() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>(0);

  const [gameState, setGameState] = useState<
    "menu" | "playing" | "paused" | "gameover" | "blackhole"
  >("menu");
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 });
  const [gaiaTokens, setGaiaTokens] = useState<GaiaToken[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    tokensCollected: 0,
    score: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    weeklyWins: 0,
    tokensWonThisWeek: 0,
  });

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;
  const GAME_COST = 50; // GAIA tokens to play
  const MAX_WEEKLY_WINS = 10;
  const WIN_THRESHOLD = 100; // tokens needed to win and access blackhole

  const generateGaiaToken = useCallback((): GaiaToken => {
    const types = ["normal", "bonus", "mega"] as const;
    const probabilities = [0.7, 0.25, 0.05]; // 70% normal, 25% bonus, 5% mega

    let type: "normal" | "bonus" | "mega" = "normal";
    const rand = Math.random();
    let cumulative = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulative += probabilities[i];
      if (rand < cumulative) {
        type = types[i];
        break;
      }
    }

    const values = { normal: 1, bonus: 5, mega: 15 };

    return {
      position: {
        x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
      },
      value: values[type],
      type,
    };
  }, []);

  const startGame = () => {
    if (gameStats.weeklyWins >= MAX_WEEKLY_WINS) {
      toast.error("🚫 Weekly Limit Reached!", {
        description: "You can only win 10 times per week. Come back next week!",
        duration: 5000,
      });
      return;
    }

    setGameState("playing");
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setGaiaTokens([generateGaiaToken(), generateGaiaToken(), generateGaiaToken()]);
    setGameStats((prev) => ({
      ...prev,
      tokensCollected: 0,
      score: 0,
      gamesPlayed: prev.gamesPlayed + 1,
    }));

    toast.info("🐍 Snake Game Started!", {
      description: `Cost: ${GAME_COST} GAIA tokens. Reach ${WIN_THRESHOLD} tokens to access the blackhole!`,
      duration: 4000,
    });
  };

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= CANVAS_SIZE / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_SIZE / GRID_SIZE
      ) {
        setGameState("gameover");
        toast.error("💀 Game Over!", {
          description: "Snake hit the wall!",
          duration: 3000,
        });
        return prevSnake;
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameState("gameover");
        toast.error("💀 Game Over!", {
          description: "Snake ate itself!",
          duration: 3000,
        });
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check token collision
      let tokenEaten = false;
      let tokenValue = 0;

      setGaiaTokens((prevTokens) => {
        const newTokens = [...prevTokens];

        for (let i = 0; i < newTokens.length; i++) {
          if (newTokens[i].position.x === head.x && newTokens[i].position.y === head.y) {
            tokenValue = newTokens[i].value;
            tokenEaten = true;
            newTokens[i] = generateGaiaToken();

            setGameStats((prev) => {
              const newTokensCollected = prev.tokensCollected + tokenValue;
              const newScore = prev.score + tokenValue * 10;

              if (newTokensCollected >= WIN_THRESHOLD) {
                setGameState("blackhole");
                toast.success("🌌 BLACKHOLE ACTIVATED!", {
                  description: "You reached 100 GAIA tokens! Entering random multiplayer battle!",
                  duration: 6000,
                });
                return {
                  ...prev,
                  tokensCollected: newTokensCollected,
                  score: newScore,
                  gamesWon: prev.gamesWon + 1,
                  weeklyWins: prev.weeklyWins + 1,
                  tokensWonThisWeek: prev.tokensWonThisWeek + newTokensCollected,
                };
              }

              return {
                ...prev,
                tokensCollected: newTokensCollected,
                score: newScore,
              };
            });
            break;
          }
        }

        return newTokens;
      });

      if (!tokenEaten) {
        newSnake.pop();
      } else {
        toast.success(`🪙 Token Collected! +${tokenValue} GAIA`, {
          duration: 1500,
        });
      }

      return newSnake;
    });
  }, [direction, gameState, generateGaiaToken]);

  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = window.setInterval(gameLoop, 200);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameState]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#0f0f0f";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_SIZE, i);
      ctx.stroke();
    }

    if (gameState === "playing" || gameState === "paused") {
      // Draw snake
      snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#22c55e" : "#16a34a";
        ctx.fillRect(
          segment.x * GRID_SIZE + 1,
          segment.y * GRID_SIZE + 1,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );
      });

      // Draw GAIA tokens
      gaiaTokens.forEach((token) => {
        const colors = {
          normal: "#fbbf24",
          bonus: "#3b82f6",
          mega: "#8b5cf6",
        };
        ctx.fillStyle = colors[token.type];
        ctx.fillRect(
          token.position.x * GRID_SIZE + 2,
          token.position.y * GRID_SIZE + 2,
          GRID_SIZE - 4,
          GRID_SIZE - 4
        );

        // Draw token value
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          token.value.toString()
          token.position.x * GRID_SIZE + GRID_SIZE / 2,
          token.position.y * GRID_SIZE + GRID_SIZE / 2 + 3
        );
      });
    }
  }, [snake, gaiaTokens, gameState]);

  const enterRandomBattle = () => {
    toast.success("🎮 Entering Random Battle!", {
      description: "Transporting to a random multiplayer game arena!",
      duration: 5000,
    });
    // This would connect to other games or redirect to multiplayer arena
    setGameState("menu");
  };

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Zap className="h-6 w-6" />
          🐍 GAIA SNAKE - HIGH RISK HIGH REWARD
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Cost: {GAME_COST} GAIA to play | Win up to 100 GAIA | Max 10 wins/week
          </p>
          <Badge className="bg-gradient-to-r from-green-600 to-cyan-600 text-white">
            Weekly Wins: {gameStats.weeklyWins}/10
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/20 text-center">
            <div className="text-lg font-bold text-yellow-400">{gameStats.tokensCollected}</div>
            <div className="text-xs text-yellow-300">Current Tokens</div>
          </div>
          <div className="p-3 bg-green-900/30 rounded border border-green-500/20 text-center">
            <div className="text-lg font-bold text-green-400">{gameStats.score}</div>
            <div className="text-xs text-green-300">Score</div>
          </div>
          <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20 text-center">
            <div className="text-lg font-bold text-blue-400">{gameStats.gamesWon}</div>
            <div className="text-xs text-blue-300">Total Wins</div>
          </div>
          <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20 text-center">
            <div className="text-lg font-bold text-purple-400">{gameStats.tokensWonThisWeek}</div>
            <div className="text-xs text-purple-300">Weekly Earned</div>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="border-2 border-green-500/50 rounded-lg bg-black"
            />

            {/* Game Overlays */}
            {gameState === "menu" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐍</div>
                  <div className="text-2xl font-bold text-green-400 mb-4">GAIA SNAKE</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Collect GAIA tokens to win! Reach 100 tokens to access the blackhole!
                  </div>
                  <Button
                    onClick={startGame}
                    disabled={gameStats.weeklyWins >= MAX_WEEKLY_WINS}
                    className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    PAY {GAME_COST} GAIA & PLAY
                  </Button>
                </div>
              </div>
            )}

            {gameState === "blackhole" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-spin">🌌</div>
                  <div className="text-2xl font-bold text-purple-400 mb-4">
                    BLACKHOLE ACTIVATED!
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    You collected {gameStats.tokensCollected} GAIA tokens!
                    <br />
                    Ready to enter a random multiplayer battle?
                  </div>
                  <Button
                    onClick={enterRandomBattle}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    🌌 ENTER RANDOM BATTLE
                  </Button>
                </div>
              </div>
            )}

            {gameState === "gameover" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">💀</div>
                  <div className="text-2xl font-bold text-red-400 mb-4">GAME OVER</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Collected: {gameStats.tokensCollected} GAIA tokens
                    <br />
                    Score: {gameStats.score}
                  </div>
                  <Button
                    onClick={() => setGameState("menu")}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    BACK TO MENU
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress to Blackhole */}
        {gameState === "playing" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-400">Progress to Blackhole:</span>
              <span className="text-purple-400">
                {gameStats.tokensCollected}/{WIN_THRESHOLD} GAIA
              </span>
            </div>
            <Progress
              value={(gameStats.tokensCollected / WIN_THRESHOLD) * 100}
              className="h-3 bg-purple-900/30"
            />
          </div>
        )}

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" className="border-green-500/30">
            <ArrowUp className="h-4 w-4 mr-2" />W / ↑
          </Button>
          <Button variant="outline" className="border-green-500/30">
            <ArrowLeft className="h-4 w-4 mr-2" />A / ←
          </Button>
          <Button variant="outline" className="border-green-500/30">
            <ArrowDown className="h-4 w-4 mr-2" />S / ↓
          </Button>
          <Button variant="outline" className="border-green-500/30">
            <ArrowRight className="h-4 w-4 mr-2" />D / →
          </Button>
        </div>

        {/* Token Legend */}
        <div className="bg-gradient-to-r from-yellow-900/30 to-purple-900/30 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-yellow-400 font-bold mb-3">🪙 GAIA TOKEN TYPES</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-yellow-900/20 rounded">
              <div className="w-4 h-4 bg-yellow-400 mx-auto mb-1 rounded"></div>
              <div className="text-xs text-yellow-400">Normal: 1 GAIA</div>
            </div>
            <div className="p-2 bg-blue-900/20 rounded">
              <div className="w-4 h-4 bg-blue-400 mx-auto mb-1 rounded"></div>
              <div className="text-xs text-blue-400">Bonus: 5 GAIA</div>
            </div>
            <div className="p-2 bg-purple-900/20 rounded">
              <div className="w-4 h-4 bg-purple-400 mx-auto mb-1 rounded"></div>
              <div className="text-xs text-purple-400">Mega: 15 GAIA</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
