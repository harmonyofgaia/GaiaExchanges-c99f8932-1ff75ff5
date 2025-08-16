import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Position {
  x: number;
  y: number;
}

interface GameState {
  snake: Position[];
  food: Position;
  direction: string;
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
}

export default function SnakeArenaGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: "RIGHT",
    score: 0,
    gameOver: false,
    isPlaying: false,
  });

  const [highScore, setHighScore] = useState(0);
  const [playersOnline] = useState(8934);

  const gridSize = 20;
  const canvasSize = 400;

  const generateFood = (): Position => ({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  });

  const resetGame = () => {
    setGameState({
      snake: [{ x: 10, y: 10 }],
      food: generateFood(),
      direction: "RIGHT",
      score: 0,
      gameOver: false,
      isPlaying: true,
    });
  };

  const moveSnake = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;

    setGameState((prev) => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      switch (prev.direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        toast.error("💥 Game Over! Hit the wall!");
        return { ...prev, gameOver: true, isPlaying: false };
      }

      // Check self collision
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        toast.error("💥 Game Over! Hit yourself!");
        return { ...prev, gameOver: true, isPlaying: false };
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === prev.food.x && head.y === prev.food.y) {
        const newScore = prev.score + 10;
        if (newScore > highScore) {
          setHighScore(newScore);
          toast.success("🏆 New High Score!");
        }
        return {
          ...prev,
          snake: newSnake,
          food: generateFood(),
          score: newScore,
        };
      } else {
        newSnake.pop();
        return {
          ...prev,
          snake: newSnake,
        };
      }
    });
  }, [gameState.isPlaying, gameState.gameOver, highScore]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.isPlaying) return;

      setGameState((prev) => {
        switch (e.key) {
          case "ArrowUp":
            return prev.direction !== "DOWN" ? { ...prev, direction: "UP" } : prev;
          case "ArrowDown":
            return prev.direction !== "UP" ? { ...prev, direction: "DOWN" } : prev;
          case "ArrowLeft":
            return prev.direction !== "RIGHT" ? { ...prev, direction: "LEFT" } : prev;
          case "ArrowRight":
            return prev.direction !== "LEFT" ? { ...prev, direction: "RIGHT" } : prev;,
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState.isPlaying]);

  const renderGameBoard = () => {
    const board = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isSnake = gameState.snake.some((segment) => segment.x === x && segment.y === y);
        const isFood = gameState.food.x === x && gameState.food.y === y;
        const isHead = gameState.snake[0]?.x === x && gameState.snake[0]?.y === y;

        board.push(
          <div
            key={`${x}-${y}`}
            className={`w-5 h-5 border border-gray-600 ${
              isHead
                ? "bg-green-500"
                : isSnake
                  ? "bg-green-400"
                  : isFood
                    ? "bg-red-500"
                    : "bg-gray-800"
            }`}
          />
        );
      }
    }
    return board;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-yellow-900/20 to-red-900/20 p-6">
      <div className="container mx-auto space-y-6">
        {/* Game Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-yellow-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400 text-2xl">
              🐍 Snake Arena - Environmental Edition
            </CardTitle>
            <div className="flex gap-4">
              <Badge className="bg-green-600">
                👥 {playersOnline.toLocaleString()} Players Online
              </Badge>
              <Badge className="bg-yellow-600">🏆 High Score: {highScore}</Badge>
              <Badge className="bg-blue-600">🎯 Current Score: {gameState.score}</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Game Board */}
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🎮 Game Arena</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              {!gameState.isPlaying && !gameState.gameOver ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-bounce">🐍</div>
                  <h3 className="text-xl font-bold text-green-400">Snake Arena</h3>
                  <p className="text-muted-foreground">
                    Collect environmental power-ups and grow your snake!
                  </p>
                  <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                    🎮 Start Game
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className="grid grid-cols-20 gap-0 border-2 border-green-500/50 bg-black/50 p-2"
                    style={{ width: "400px", height: "400px" }}
                  >
                    {renderGameBoard()}
                  </div>

                  {gameState.gameOver && (
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-red-400">Game Over!</h3>
                      <p className="text-yellow-400">Final Score: {gameState.score}</p>
                      <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                        🔄 Play Again
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Game Info */}
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🎯 Game Controls & Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">🕹️ Controls:</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Badge className="bg-blue-600 justify-center py-2">↑ Up Arrow</Badge>
                  <Badge className="bg-blue-600 justify-center py-2">↓ Down Arrow</Badge>
                  <Badge className="bg-blue-600 justify-center py-2">← Left Arrow</Badge>
                  <Badge className="bg-blue-600 justify-center py-2">→ Right Arrow</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-bold mb-2">🌟 Game Rules:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Collect red environmental power-ups to grow</li>
                  <li>• Avoid hitting walls or your own body</li>
                  <li>• Each power-up gives you 10 points</li>
                  <li>• Try to beat your high score!</li>
                </ul>
              </div>

              <div>
                <h4 className="text-blue-400 font-bold mb-2">📊 Statistics:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Snake Length:</span>
                    <span className="text-green-400">{gameState.snake.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Score:</span>
                    <span className="text-yellow-400">{gameState.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Score:</span>
                    <span className="text-orange-400">{highScore}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <h4 className="text-green-400 font-bold mb-2">🌱 Environmental Message</h4>
                <p className="text-sm text-green-300">
                  Each power-up you collect represents saving an endangered species! Keep playing to
                  make a positive environmental impact.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
