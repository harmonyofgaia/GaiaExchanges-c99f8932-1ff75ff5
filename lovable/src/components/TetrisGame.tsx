import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Play, Pause, RotateCcw, Zap } from "lucide-react";
import { toast } from "sonner";

type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  x: number;
  y: number;
  color: string;
}

const TETROMINOS: Record<TetrominoType, { shape: number[][]; color: string }> =
  {
    I: { shape: [[1, 1, 1, 1]], color: "bg-cyan-500" },
    O: {
      shape: [
        [1, 1],
        [1, 1],
      ],
      color: "bg-yellow-500",
    },
    T: {
      shape: [
        [0, 1, 0],
        [1, 1, 1],
      ],
      color: "bg-purple-500",
    },
    S: {
      shape: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      color: "bg-green-500",
    },
    Z: {
      shape: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      color: "bg-red-500",
    },
    J: {
      shape: [
        [1, 0, 0],
        [1, 1, 1],
      ],
      color: "bg-blue-500",
    },
    L: {
      shape: [
        [0, 0, 1],
        [1, 1, 1],
      ],
      color: "bg-orange-500",
    },
  };

export function TetrisGame() {
  const [board, setBoard] = useState<string[][]>(() =>
    Array(20)
      .fill(null)
      .map(() => Array(10).fill("")),
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gaiaTokensEarned, setGaiaTokensEarned] = useState(0);

  const createNewPiece = (): Tetromino => {
    const types: TetrominoType[] = ["I", "O", "T", "S", "Z", "J", "L"];
    const type = types[Math.floor(Math.random() * types.length)];
    const { shape, color } = TETROMINOS[type];

    return {
      type,
      shape,
      x: Math.floor(10 / 2) - Math.floor(shape[0].length / 2),
      y: 0,
      color,
    };
  };

  const rotatePiece = (piece: Tetromino): Tetromino => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse(),
    );
    return { ...piece, shape: rotated };
  };

  const isValidMove = useCallback((
    piece: Tetromino,
    newX: number,
    newY: number,
    newShape?: number[][],
  ): boolean => {
    const shape = newShape || piece.shape;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;

          if (boardX < 0 || boardX >= 10 || boardY >= 20) return false;
          if (boardY >= 0 && board[boardY][boardX]) return false;
        }
      }
    }
    return true;
  }, [board]);

  const placePiece = useCallback((piece: Tetromino) => {
    const newBoard = [...board];

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }

    setBoard(newBoard);
    clearLines(newBoard);
  }, [board, clearLines]);

  const clearLines = useCallback((board: string[][]) => {
    const newBoard = board.filter((row) => !row.every((cell) => cell !== ""));
    const linesCleared = 20 - newBoard.length;

    if (linesCleared > 0) {
      const emptyRows = Array(linesCleared)
        .fill(null)
        .map(() => Array(10).fill(""));
      const finalBoard = [...emptyRows, ...newBoard];

      setBoard(finalBoard);
      setLines((prev) => prev + linesCleared);
      setScore((prev) => prev + linesCleared * 100 * level);
      setGaiaTokensEarned((prev) => prev + linesCleared * 2);
      setLevel(Math.floor((lines + linesCleared) / 10) + 1);

      toast.success(`${linesCleared} lines cleared! 🎉`, {
        description: `+${linesCleared * 100 * level} points, +${linesCleared * 2} GAiA tokens`,
      });
    }
  }, [level, lines]);

  const movePiece = useCallback(
    (dx: number, dy: number) => {
      if (!currentPiece || !isPlaying || gameOver) return;

      const newX = currentPiece.x + dx;
      const newY = currentPiece.y + dy;

      if (isValidMove(currentPiece, newX, newY)) {
        setCurrentPiece({ ...currentPiece, x: newX, y: newY });
      } else if (dy > 0) {
        // Piece hit bottom, place it
        placePiece(currentPiece);
        const newPiece = createNewPiece();

        if (!isValidMove(newPiece, newPiece.x, newPiece.y)) {
          setGameOver(true);
          setIsPlaying(false);
          toast.error("Game Over! 🎮", {
            description: `Final Score: ${score} | GAiA Earned: ${gaiaTokensEarned.toFixed(1)}`,
          });
        } else {
          setCurrentPiece(newPiece);
        }
      }
    },
    [
      currentPiece,
      isPlaying,
      gameOver,
      score,
      gaiaTokensEarned,
      isValidMove,
      placePiece,
    ],
  );

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || !isPlaying || gameOver) return;

    const rotated = rotatePiece(currentPiece);
    if (isValidMove(rotated, rotated.x, rotated.y, rotated.shape)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, isPlaying, gameOver, isValidMove]);

  const dropPiece = useCallback(() => {
    if (!currentPiece || !isPlaying || gameOver) return;

    let newY = currentPiece.y;
    while (isValidMove(currentPiece, currentPiece.x, newY + 1)) {
      newY++;
    }
    setCurrentPiece({ ...currentPiece, y: newY });
  }, [currentPiece, isPlaying, gameOver, isValidMove]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(
      () => {
        movePiece(0, 1);
      },
      Math.max(50, 1000 - level * 50),
    );

    return () => clearInterval(interval);
  }, [movePiece, isPlaying, gameOver, level]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          movePiece(-1, 0);
          break;
        case "ArrowRight":
          movePiece(1, 0);
          break;
        case "ArrowDown":
          movePiece(0, 1);
          break;
        case "ArrowUp":
          rotatePieceHandler();
          break;
        case " ":
          e.preventDefault();
          dropPiece();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece, isPlaying, gameOver, dropPiece, rotatePieceHandler]);

  const startGame = () => {
    setBoard(
      Array(20)
        .fill(null)
        .map(() => Array(10).fill("")),
    );
    setCurrentPiece(createNewPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPlaying(true);
    setGaiaTokensEarned(0);
    toast.success("🎮 Tetris Started!", {
      description: "Use arrow keys to control, Space to drop",
    });
  };

  const pauseGame = () => {
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? "⏸️ Game Paused" : "▶️ Game Resumed");
  };

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    // Add current piece to display
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-6 h-6 border border-gray-600 ${cell || "bg-gray-900"}`}
          />
        ))}
      </div>
    ));
  };

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Gamepad2 className="h-6 w-6" />
          🧩 GAiA Tetris - Block Puzzle Master
        </CardTitle>
        <div className="flex gap-4">
          <Badge className="bg-blue-600 text-white">Score: {score}</Badge>
          <Badge className="bg-purple-600 text-white">Level: {level}</Badge>
          <Badge className="bg-green-600 text-white">Lines: {lines}</Badge>
          <Badge className="bg-orange-600 text-white">
            GAiA: {gaiaTokensEarned.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 justify-center">
          <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button
            onClick={pauseGame}
            disabled={!currentPiece}
            variant="outline"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button
            onClick={dropPiece}
            disabled={!isPlaying || gameOver}
            variant="outline"
          >
            <Zap className="h-4 w-4 mr-2" />
            Drop
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="bg-black/80 p-4 rounded-lg border-2 border-blue-500/50">
            {renderBoard()}
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>🎮 Arrow keys to move and rotate</p>
          <p>⬇️ Down arrow to move faster</p>
          <p>⚡ Space to drop instantly</p>
          <p>🏆 Clear lines to earn GAiA tokens!</p>
        </div>

        {gameOver && (
          <div className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded">
            <h3 className="text-red-400 font-bold">Game Over!</h3>
            <p className="text-muted-foreground">Final Score: {score}</p>
            <p className="text-green-400">
              GAiA Tokens Earned: {gaiaTokensEarned.toFixed(1)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
