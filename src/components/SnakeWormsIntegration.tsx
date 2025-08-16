import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Play, Pause, RotateCcw, Target, Zap, Crown, Flame, Shield } from "lucide-react";
import { toast } from "sonner";

interface Position {
  x: number;
  y: number;
}

interface Worm {
  id: string;
  segments: Position[];
  health: number;
  team: "player" | "enemy";
  color: string;
}

interface Weapon {
  name: string;
  damage: number;
  radius: number;
  icon: string;
}

export function SnakeWormsIntegration() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "paused" | "gameOver">("menu");
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 });
  const [worms, setWorms] = useState<Worm[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>({
    name: "Bazooka",
    damage: 50,
    radius: 2,
    icon: "🚀",
  });
  const [gameStats, setGameStats] = useState({
    score: 0,
    wormsDestroyed: 0,
    gaiaTokensEarned: 0,
    battleRound: 1,
    snakeHealth: 100,
  });
  const [explosions, setExplosions] = useState<Position[]>([]);

  const BOARD_SIZE = 30;
  const weapons: Weapon[] = [
    { name: "Bazooka", damage: 50, radius: 2, icon: "🚀" },
    { name: "Grenade", damage: 35, radius: 3, icon: "💣" },
    { name: "Fire Snake", damage: 75, radius: 1, icon: "🔥" },
    { name: "Ice Freeze", damage: 25, radius: 4, icon: "❄️" },
    { name: "Lightning", damage: 100, radius: 1, icon: "⚡" },
  ];

  // Initialize worms
  const spawnWorms = useCallback(() => {
    const newWorms: Worm[] = [];
    for (let i = 0; i < 5; i++) {
      const worm: Worm = {
        id: `worm-${i}`,
        segments: [
          {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
          },
        ],
        health: 100,
        team: "enemy",
        color: i % 2 === 0 ? "bg-red-600" : "bg-orange-600",
      };
      newWorms.push(worm);
    }
    setWorms(newWorms);
  }, []);

  // Snake movement
  const moveSnake = useCallback(() => {
    if (gameState !== "playing") return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Wrap around borders for continuous play
      if (head.x < 0) head.x = BOARD_SIZE - 1;
      if (head.x >= BOARD_SIZE) head.x = 0;
      if (head.y < 0) head.y = BOARD_SIZE - 1;
      if (head.y >= BOARD_SIZE) head.y = 0;

      // Check worm collision for battle
      worms.forEach((worm) => {
        if (worm.segments.some((segment) => segment.x === head.x && segment.y === head.y)) {
          initiateWormBattle(worm);
        }
      });

      newSnake.unshift(head);
      if (newSnake.length > 15) {
        // Max snake length
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, gameState, worms, initiateWormBattle]);

  const initiateWormBattle = useCallback(
    (worm: Worm) => {
      const damage = selectedWeapon.damage + Math.floor(Math.random() * 25);

      setWorms(
        (prev) =>
          prev
            .map((w) => {
              if (w.id === worm.id) {
                const newHealth = Math.max(0, w.health - damage);
                if (newHealth === 0) {
                  // Worm destroyed
                  setGameStats((stats) => ({
                    ...stats,
                    score: stats.score + 100,
                    wormsDestroyed: stats.wormsDestroyed + 1,
                    gaiaTokensEarned: stats.gaiaTokensEarned + 2.5,
                  }));

                  toast.success(`🐍 Snake Victory!`, {
                    description: `Worm destroyed with ${selectedWeapon.icon} ${selectedWeapon.name}! +2.5 GAiA earned!`,
                    duration: 3000,
                  });

                  // Add explosion effect
                  setExplosions((prev) => [...prev, ...w.segments]);
                  setTimeout(() => {
                    setExplosions((prev) =>
                      prev.filter(
                        (pos) => !w.segments.some((seg) => seg.x === pos.x && seg.y === pos.y)
                      )
                    );
                  }, 1000);

                  return null; // Remove worm
                }
                return { ...w, health: newHealth };
              }
              return w;
            })
            .filter(Boolean) as Worm[]
      );
    },
    [selectedWeapon]
  );

  const fireWeapon = useCallback(
    (targetX: number, targetY: number) => {
      if (gameState !== "playing") return;

      // Check if any worms are in weapon radius
      const hitWorms = worms.filter((worm) =>
        worm.segments.some(
          (segment) =>
            Math.abs(segment.x - targetX) <= selectedWeapon.radius &&
            Math.abs(segment.y - targetY) <= selectedWeapon.radius
        )
      );

      hitWorms.forEach((worm) => {
        initiateWormBattle(worm);
      });

      if (hitWorms.length === 0) {
        toast.info("🎯 Missed!", {
          description: "No worms in weapon range",
          duration: 2000,
        });
      }
    },
    [gameState, worms, selectedWeapon, initiateWormBattle]
  );

  useEffect(() => {
    if (gameState === "playing") {
      const gameLoop = setInterval(moveSnake, 200);
      return () => clearInterval(gameLoop);
    }
  }, [moveSnake, gameState]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;

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
        case " ":
          e.preventDefault();
          // Fire weapon at snake head position
          fireWeapon(snake[0].x, snake[0].y + direction.y);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameState, snake, selectedWeapon, fireWeapon]);

  const startGame = () => {
    setGameState("playing");
    setSnake([{ x: 15, y: 15 }]);
    setDirection({ x: 0, y: -1 });
    setGameStats({
      score: 0,
      wormsDestroyed: 0,
      gaiaTokensEarned: 0,
      battleRound: 1,
      snakeHealth: 100,
    });
    spawnWorms();

    toast.success("🐍⚔️ Snake vs Worms Battle Started!", {
      description: "Control snake with arrows, Space to fire weapons!",
      duration: 4000,
    });
  };

  const pauseGame = () => {
    setGameState(gameState === "playing" ? "paused" : "playing");
  };

  const renderBoard = () => {
    return Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
      const x = index % BOARD_SIZE;
      const y = Math.floor(index / BOARD_SIZE);

      const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
      const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
      const isWorm = worms.some((worm) =>
        worm.segments.some((segment) => segment.x === x && segment.y === y)
      );
      const isExplosion = explosions.some((pos) => pos.x === x && pos.y === y);
      const worm = worms.find((w) => w.segments.some((s) => s.x === x && s.y === y));

      return (
        <div
          key={index}
          className={`
            w-4 h-4 border border-gray-800/30 flex items-center justify-center text-xs cursor-pointer
            ${isSnakeHead ? "bg-green-400" : ""}
            ${isSnake && !isSnakeHead ? "bg-green-600" : ""}
            ${isWorm ? worm?.color || "bg-red-600" : ""}
            ${isExplosion ? "bg-yellow-400 animate-pulse" : ""}
            ${!isSnake && !isWorm && !isExplosion ? "bg-gray-900" : ""}
          `}
          onClick={() => fireWeapon(x, y)}
        >
          {isSnakeHead && "🐍"}
          {isWorm && !isSnakeHead && "🪱"}
          {isExplosion && "💥"}
        </div>
      );
    });
  };

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-red-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Target className="h-6 w-6" />
          🐍⚔️ Snake vs Worms - Live Battle Arena
        </CardTitle>
        <div className="flex gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white">Score: {gameStats.score}</Badge>
          <Badge className="bg-red-600 text-white">Worms: {gameStats.wormsDestroyed}</Badge>
          <Badge className="bg-blue-600 text-white">
            GAiA: {gameStats.gaiaTokensEarned.toFixed(1)}
          </Badge>
          <Badge className="bg-purple-600 text-white">Round: {gameStats.battleRound}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Controls */}
        <div className="flex gap-2 justify-center flex-wrap">
          <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Start Battle
          </Button>
          <Button onClick={pauseGame} disabled={gameState === "menu"} variant="outline">
            <Pause className="h-4 w-4 mr-2" />
            {gameState === "paused" ? "Resume" : "Pause"}
          </Button>
          <Button onClick={spawnWorms} variant="outline" disabled={gameState === "playing"}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Worms
          </Button>
        </div>

        {/* Weapon Selection */}
        <div className="flex gap-2 justify-center flex-wrap">
          {weapons.map((weapon) => (
            <Button
              key={weapon.name}
              onClick={() => setSelectedWeapon(weapon)}
              variant={selectedWeapon.name === weapon.name ? "default" : "outline"}
              size="sm"
            >
              {weapon.icon} {weapon.name}
              <Badge className="ml-2 bg-red-600 text-white">{weapon.damage}</Badge>
            </Button>
          ))}
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div
            className="grid gap-0 border-2 border-orange-500/50 bg-black/80 p-2 rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              width: "600px",
              height: "600px",
            }}
          >
            {renderBoard()}
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{gameStats.snakeHealth}%</div>
            <div className="text-sm text-muted-foreground">Snake Health</div>
            <Progress value={gameStats.snakeHealth} className="h-2 mt-1" />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">{worms.length}</div>
            <div className="text-sm text-muted-foreground">Worms Alive</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">{selectedWeapon.damage}</div>
            <div className="text-sm text-muted-foreground">Weapon Power</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">{selectedWeapon.radius}</div>
            <div className="text-sm text-muted-foreground">Blast Radius</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>🎮 Arrow keys to move snake | Space to fire weapon</p>
          <p>🎯 Click on board to target specific locations</p>
          <p>🐍 Collide with worms to engage in battle</p>
          <p>💰 Destroy worms to earn GAiA tokens!</p>
        </div>

        {worms.length === 0 && gameState === "playing" && (
          <div className="text-center p-4 bg-green-900/20 border border-green-500/30 rounded">
            <Crown className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-green-400 font-bold">Victory!</h3>
            <p className="text-muted-foreground">All worms destroyed!</p>
            <p className="text-green-400">
              GAiA Tokens Earned: {gameStats.gaiaTokensEarned.toFixed(1)}
            </p>
            <Button onClick={spawnWorms} className="mt-2 bg-green-600 hover:bg-green-700">
              <Flame className="h-4 w-4 mr-2" />
              Next Wave
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
