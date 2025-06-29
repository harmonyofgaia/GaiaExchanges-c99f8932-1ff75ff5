
import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Play, Pause, RotateCcw, Trophy } from 'lucide-react'
import { toast } from 'sonner'

interface Position {
  x: number
  y: number
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [gaiaTokensEarned, setGaiaTokensEarned] = useState(0)

  const BOARD_SIZE = 20

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      
      head.x += direction.x
      head.y += direction.y

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true)
        setIsPlaying(false)
        toast.error('Game Over! Hit the wall! 🐍', {
          description: `Final Score: ${score} | GAiA Earned: ${gaiaTokensEarned}`
        })
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        toast.error('Game Over! Snake ate itself! 🐍', {
          description: `Final Score: ${score} | GAiA Earned: ${gaiaTokensEarned}`
        })
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        // Generate new food
        const newFood = {
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE)
        }
        setFood(newFood)
        setScore(prev => prev + 10)
        setGaiaTokensEarned(prev => prev + 0.5)
        toast.success('Food eaten! +10 points! 🍎', {
          description: '+0.5 GAiA tokens earned!'
        })
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, isPlaying, gameOver, food, score, gaiaTokensEarned])

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150)
    return () => clearInterval(gameLoop)
  }, [moveSnake])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
        case ' ':
          e.preventDefault()
          setIsPlaying(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPlaying])

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood({ x: 15, y: 15 })
    setDirection({ x: 0, y: -1 })
    setGameOver(false)
    setScore(0)
    setIsPlaying(true)
    toast.success('🐍 Snake Game Started!', {
      description: 'Use arrow keys to control, Space to pause'
    })
  }

  const resetGame = () => {
    if (score > highScore) {
      setHighScore(score)
      toast.success('🏆 New High Score!', {
        description: `New record: ${score} points!`
      })
    }
    startGame()
  }

  const pauseGame = () => {
    setIsPlaying(!isPlaying)
    toast.info(isPlaying ? '⏸️ Game Paused' : '▶️ Game Resumed')
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Gamepad2 className="h-6 w-6" />
          🐍 GAiA Snake Game - Earn Tokens!
        </CardTitle>
        <div className="flex gap-4">
          <Badge className="bg-blue-600 text-white">Score: {score}</Badge>
          <Badge className="bg-purple-600 text-white">High Score: {highScore}</Badge>
          <Badge className="bg-green-600 text-white">GAiA Earned: {gaiaTokensEarned.toFixed(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Controls */}
        <div className="flex gap-2 justify-center">
          <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button onClick={pauseGame} disabled={!isPlaying && !gameOver} variant="outline">
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Game Board */}
        <div className="flex justify-center">
          <div 
            className="grid gap-0 border-2 border-green-500/50 bg-black/80 p-2 rounded-lg"
            style={{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              width: '400px',
              height: '400px'
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE
              const y = Math.floor(index / BOARD_SIZE)
              
              const isSnake = snake.some(segment => segment.x === x && segment.y === y)
              const isHead = snake[0]?.x === x && snake[0]?.y === y
              const isFood = food.x === x && food.y === y
              
              return (
                <div
                  key={index}
                  className={`
                    w-full h-full border border-green-900/20
                    ${isHead ? 'bg-green-400' : ''}
                    ${isSnake && !isHead ? 'bg-green-600' : ''}
                    ${isFood ? 'bg-red-500' : ''}
                  `}
                >
                  {isFood && <span className="text-xs">🍎</span>}
                  {isHead && <span className="text-xs">🐍</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>🎮 Use arrow keys to control the snake</p>
          <p>🍎 Eat food to grow and earn GAiA tokens</p>
          <p>⚡ Avoid walls and your own tail</p>
          <p>🏆 Beat your high score for bonus rewards!</p>
        </div>

        {gameOver && (
          <div className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded">
            <Trophy className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h3 className="text-red-400 font-bold">Game Over!</h3>
            <p className="text-muted-foreground">Final Score: {score}</p>
            <p className="text-green-400">GAiA Tokens Earned: {gaiaTokensEarned.toFixed(1)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
