import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Trophy, Zap, Target, Crown } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface Worm {
  id: string;
  segments: Position[];
  health: number;
  color: string;
}

interface GameStats {
  snakeWins: number;
  wormsDefeated: number;
  totalScore: number;
  transitionBonuses: number;
}

type GameMode = "snake" | "transition" | "worms" | "victory";

export function SnakeToWormsIntegration() {
  const [gameMode, setGameMode] = useState<GameMode>("snake");
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [snakeSpeed, setSnakeSpeed] = useState(200);

  // Worms game state
  const [worms, setWorms] = useState<Worm[]>([]);
  const [selectedWorm, setSelectedWorm] = useState<string>("");
  const [explosions, setExplosions] = useState<Position[]>([]);
  const [wormsGameActive, setWormsGameActive] = useState(false);

  // Transition state
  const [transitionActive, setTransitionActive] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Game statistics
  const [gameStats, setGameStats] = useState<GameStats>({
    snakeWins: 0,
    wormsDefeated: 0,
    totalScore: 0,
    transitionBonuses: 0,
  });

  const gameLoopRef = useRef<NodeJS.Timeout>(undefined);
  const transitionRef = useRef<NodeJS.Timeout>(undefined);

  // Snake game logic
  const moveSnake = useCallback(() => {
    if (gameState !== "playing" || gameMode !== "snake") return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Check boundaries
      if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20) {
        setGameState("gameover");
        toast.error("🐍 Snake hit the wall!", { description: "Game Over" });
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameState("gameover");
        toast.error("🐍 Snake ate itself!", { description: "Game Over" });
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood({
          x: Math.floor(Math.random() * 30),
          y: Math.floor(Math.random() * 20),
        });

        // Increase speed slightly
        setSnakeSpeed((prev) => Math.max(100, prev - 5));

        toast.success("🍎 Food eaten!", { description: "+10 points" });

        // Check for snake victory condition (length >= 15)
        if (newSnake.length >= 15) {
          triggerSnakeVictory();
          return newSnake;
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameState, gameMode]);

  // Trigger snake victory and transition to worms
  const triggerSnakeVictory = () => {
    setGameState("paused");
    setTransitionActive(true);
    setTransitionProgress(0);

    toast.success("🎉 SNAKE VICTORY!", {
      description: "Snake will now blast into the Worms arena!",
      duration: 4000,
    });

    // Animate transition
    let progress = 0;
    transitionRef.current = setInterval(() => {
      progress += 10;
      setTransitionProgress(progress);

      if (progress >= 100) {
        clearInterval(transitionRef.current!);
        initiateWormsMode();
      }
    }, 100);

    // Update stats
    setGameStats((prev) => ({
      ...prev,
      snakeWins: prev.snakeWins + 1,
      totalScore: prev.totalScore + score + 100, // Victory bonus
      transitionBonuses: prev.transitionBonuses + 1,
    }));
  };

  // Initialize worms game mode
  const initiateWormsMode = () => {
    setTransitionActive(false);
    setGameMode("worms");
    setWormsGameActive(true);

    // Convert snake into worms with enhanced abilities
    const newWorms: Worm[] = [];

    // Create worms based on snake segments
    snake.forEach((segment, index) => {
      const worm: Worm = {
        id: `worm-${index}`,
        segments: [segment, { x: segment.x, y: segment.y + 1 }, { x: segment.x, y: segment.y + 2 }],
        health: 100,
        color: index === 0 ? "#00ff00" : "#66ff66", // Snake head becomes main worm
      };
      newWorms.push(worm);
    });

    setWorms(newWorms);
    setSelectedWorm(newWorms[0]?.id || "");

    toast.success("🪱 WORMS ARENA ACTIVATED!", {
      description: `Your snake transformed into ${newWorms.length} powerful worms!`,
      duration: 5000,
    });
  };

  // Worms game logic
  const fireWeapon = useCallback((targetX: number, targetY: number) => {
    if (!selectedWorm || !wormsGameActive) return;

    // Create explosion effect
    const explosion = { x: targetX, y: targetY }, [targetX, number, targetY]);
    setExplosions((prev) => [...prev, explosion]);

    // Remove explosion after animation
    setTimeout(() => {
      setExplosions((prev) => prev.filter((exp) => exp.x !== explosion.x || exp.y !== explosion.y));
    }, 1000);

    // Damage nearby worms
    setWorms((prev) =>
      prev.map((worm) => {
        const distance = Math.sqrt(
          Math.pow(worm.segments[0].x - targetX, 2) + Math.pow(worm.segments[0].y - targetY, 2)
        );

        if (distance <= 2 && worm.id !== selectedWorm) {
          const newHealth = Math.max(0, worm.health - 30);
          if (newHealth === 0) {
            setGameStats((prev) => ({
              ...prev,
              wormsDefeated: prev.wormsDefeated + 1,
              totalScore: prev.totalScore + 50,
            }));
            toast.success("💥 Worm defeated!", { description: "+50 points" });
          }
          return { ...worm, health: newHealth };
        }
        return worm;
      })
    );

    toast.info("💥 Weapon fired!", { description: "Explosion damage dealt" });
  };

  // Game controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameMode === "snake" && gameState === "playing") {
        switch (e.key) {
          case "ArrowUp":
            if (direction.y === 0) setDirection({ x: 0, y: -1 });
            break;
          case "ArrowDown":
            if (direction.y === 0) setDirection({ x: 0, y: 1 });
            break;
          case "ArrowLeft":
            if (direction.x === 0) setDirection({ x: -1, y: 0 });
            break;
          case "ArrowRight":
            if (direction.x === 0) setDirection({ x: 1, y: 0 });
            break;
        }
      } else if (gameMode === "worms" && wormsGameActive) {
        if (e.key === " ") {
          // Fire weapon at random location for demo
          const targetX = Math.floor(Math.random() * 30);
          const targetY = Math.floor(Math.random() * 20);
          fireWeapon(targetX, targetY);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameState, gameMode, selectedWorm, wormsGameActive]);

  // Snake game loop
  useEffect(() => {
    if (gameState === "playing" && gameMode === "snake") {
      gameLoopRef.current = setInterval(moveSnake, snakeSpeed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, gameState, gameMode, snakeSpeed]);

  const startSnakeGame = () => {
    setGameMode("snake");
    setGameState("playing");
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setSnakeSpeed(200);
    setFood({ x: 15, y: 15 });

    toast.success("🐍 Snake Game Started!", {
      description: "Grow to 15 segments to unlock Worms mode!",
    });
  };

  const resetGame = () => {
    setGameMode("snake");
    setGameState("menu");
    setTransitionActive(false);
    setWormsGameActive(false);
    setWorms([]);
    setExplosions([]);
    if (transitionRef.current) clearInterval(transitionRef.current);
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="bg-gradient-to-r from-green-900/30 to-purple-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Trophy className="h-6 w-6 animate-bounce" />
            🐍➡️🪱 Snake to Worms Blast Arena
          </CardTitle>
          <div className="flex gap-4 text-sm flex-wrap">
            <Badge className="bg-green-600">Score: {score}</Badge>
            <Badge className="bg-blue-600">Snake Length: {snake.length}</Badge>
            <Badge className="bg-purple-600">Mode: {gameMode.toUpperCase()}</Badge>
            <Badge className="bg-yellow-600">
              Worms: {worms.filter((w) => w.health > 0).length}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Game Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/30 border-green-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{gameStats.snakeWins}</div>
              <div className="text-sm text-muted-foreground">Snake Victories</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{gameStats.wormsDefeated}</div>
              <div className="text-sm text-muted-foreground">Worms Defeated</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{gameStats.totalScore}</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {gameStats.transitionBonuses}
              </div>
              <div className="text-sm text-muted-foreground">Transitions</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transition Animation */}
      {transitionActive && (
        <Card className="bg-gradient-to-r from-green-600/30 to-purple-600/30 border-green-500/30 animate-pulse">
          <CardHeader>
            <CardTitle className="text-center text-green-400">
              🚀 SNAKE BLASTING INTO WORMS ARENA! 🚀
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={transitionProgress} className="h-4 mb-4" />
            <div className="text-center text-lg font-bold text-purple-400">
              {transitionProgress < 50
                ? "🐍 Snake Victory Sequence..."
                : "🪱 Transforming into Worms..."}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Board */}
      <Card className="bg-black/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            {gameMode === "snake" ? "🐍 Snake Arena" : "🪱 Worms Battle Arena"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="grid grid-cols-30 gap-px bg-gray-800 p-2 rounded-lg mb-4"
            style={{ aspectRatio: "3/2" }}
          >
            {Array.from({ length: 600 }, (_, i) => {
              const x = i % 30;
              const y = Math.floor(i / 30);

              const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
              const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
              const isFood = food.x === x && food.y === y;
              const isWorm = worms.some(
                (worm) =>
                  worm.health > 0 &&
                  worm.segments.some((segment) => segment.x === x && segment.y === y)
              );
              const isExplosion = explosions.some((exp) => exp.x === x && exp.y === y);

              return (
                <div
                  key={i}
                  className={`
                    w-4 h-4 rounded-sm transition-all duration-100
                    ${isSnakeHead ? "bg-green-400 animate-pulse" : ""}
                    ${isSnake && !isSnakeHead ? "bg-green-600" : ""}
                    ${isFood && gameMode === "snake" ? "bg-red-500 animate-bounce" : ""}
                    ${isWorm && gameMode === "worms" ? "bg-purple-500" : ""}
                    ${isExplosion ? "bg-orange-500 animate-ping" : ""}
                    ${!isSnake && !isFood && !isWorm && !isExplosion ? "bg-gray-900" : ""}
                  `}
                  onClick={() => gameMode === "worms" && fireWeapon(x, y)}
                >
                  {isSnakeHead && "🐍"}
                  {isFood && gameMode === "snake" && "🍎"}
                  {isWorm && gameMode === "worms" && "🪱"}
                  {isExplosion && "💥"}
                </div>
              );
            })}
          </div>

          {/* Game Controls */}
          <div className="flex gap-4 justify-center">
            {gameState === "menu" && (
              <Button onClick={startSnakeGame} className="bg-green-600 hover:bg-green-700">
                <Target className="h-4 w-4 mr-2" />
                Start Snake Game
              </Button>
            )}

            {gameState === "playing" && gameMode === "snake" && (
              <Button
                onClick={() => setGameState("paused")}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Pause Game
              </Button>
            )}

            {gameState === "paused" && !transitionActive && (
              <Button
                onClick={() => setGameState("playing")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Resume Game
              </Button>
            )}

            <Button onClick={resetGame} variant="outline" className="border-red-500/30">
              Reset Game
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center space-y-2 text-sm text-muted-foreground">
            {gameMode === "snake" && (
              <>
                <p>🎮 Use arrow keys to control the snake</p>
                <p>🎯 Eat food to grow • Reach 15 segments to blast into Worms mode!</p>
              </>
            )}
            {gameMode === "worms" && (
              <>
                <p>🎮 Click on the board to fire weapons</p>
                <p>💥 Defeat enemy worms to score points!</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Worms Control Panel */}
      {gameMode === "worms" && wormsGameActive && (
        <Card className="bg-black/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">🪱 Worms Command Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {worms
                .filter((w) => w.health > 0)
                .map((worm) => (
                  <div
                    key={worm.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedWorm === worm.id
                        ? "border-purple-500 bg-purple-900/30"
                        : "border-gray-600 bg-gray-900/30"
                    }`}
                    onClick={() => setSelectedWorm(worm.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-4 w-4 text-purple-400" />
                      <span className="text-purple-400 font-medium">
                        Worm {worm.id.split("-")[1]}
                      </span>
                    </div>
                    <Progress value={worm.health} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">Health: {worm.health}%</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
