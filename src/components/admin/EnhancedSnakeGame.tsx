
import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Star,
  Zap,
  Rocket,
  Crown
} from 'lucide-react'
import { toast } from 'sonner'

interface GameState {
  snake: { x: number; y: number }[]
  food: { x: number; y: number }
  gaiaCoins: { x: number; y: number }[]
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  score: number
  gaiaTokens: number
  level: number
  speed: number
  gameRunning: boolean
  gameOver: boolean
  consecutiveWins: number
  xpPoints: number
  playTime: number
  isSpaceMode: boolean
}

interface PlayerRanking {
  id: string
  name: string
  score: number
  gaiaTokens: number
  xpPoints: number
  level: number
  consecutiveWins: number
  playTime: number
}

const GRID_SIZE = 20
const CANVAS_SIZE = 400

export function EnhancedSnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number>()
  const xpTimerRef = useRef<number>()
  
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    gaiaCoins: [],
    direction: 'RIGHT',
    score: 0,
    gaiaTokens: 0,
    level: 1,
    speed: 200,
    gameRunning: false,
    gameOver: false,
    consecutiveWins: 0,
    xpPoints: 0,
    playTime: 0,
    isSpaceMode: false
  })

  const [rankings, setRankings] = useState<PlayerRanking[]>([
    { id: '1', name: 'DragonMaster', score: 15420, gaiaTokens: 2840, xpPoints: 8450, level: 28, consecutiveWins: 12, playTime: 145 },
    { id: '2', name: 'GaiaWarrior', score: 12350, gaiaTokens: 2100, xpPoints: 6890, level: 24, consecutiveWins: 8, playTime: 123 },
    { id: '3', name: 'CryptoDefender', score: 9870, gaiaTokens: 1750, xpPoints: 5420, level: 19, consecutiveWins: 6, playTime: 98 },
    { id: '4', name: 'SnakeHunter', score: 8500, gaiaTokens: 1400, xpPoints: 4650, level: 16, consecutiveWins: 4, playTime: 87 },
    { id: '5', name: 'TokenCollector', score: 7200, gaiaTokens: 1200, xpPoints: 3890, level: 14, consecutiveWins: 3, playTime: 72 }
  ])

  // Generate random GAIA coins
  const generateGaiaCoin = useCallback(() => {
    const newCoin = {
      x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
    }
    setGameState(prev => ({
      ...prev,
      gaiaCoins: [...prev.gaiaCoins, newCoin]
    }))
  }, [])

  // Initialize game
  const initGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      gaiaCoins: [],
      direction: 'RIGHT',
      score: 0,
      gameOver: false,
      isSpaceMode: false
    }))
    
    // Generate initial GAIA coins
    for (let i = 0; i < 5; i++) {
      setTimeout(() => generateGaiaCoin(), i * 1000)
    }
  }, [generateGaiaCoin])

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameState.gameRunning || gameState.gameOver) return

    const { direction } = gameState
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') {
          setGameState(prev => ({ ...prev, direction: 'UP' }))
        }
        break
      case 'ArrowDown':
        if (direction !== 'UP') {
          setGameState(prev => ({ ...prev, direction: 'DOWN' }))
        }
        break
      case 'ArrowLeft':
        if (direction !== 'RIGHT') {
          setGameState(prev => ({ ...prev, direction: 'LEFT' }))
        }
        break
      case 'ArrowRight':
        if (direction !== 'LEFT') {
          setGameState(prev => ({ ...prev, direction: 'RIGHT' }))
        }
        break
    }
  }, [gameState.gameRunning, gameState.gameOver, gameState.direction])

  // Game loop
  const gameLoop = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameRunning || prev.gameOver) return prev

      const head = { ...prev.snake[0] }

      // Move snake head
      switch (prev.direction) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || 
          head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
        return { ...prev, gameOver: true, gameRunning: false }
      }

      // Check self collision
      if (prev.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, gameOver: true, gameRunning: false }
      }

      const newSnake = [head, ...prev.snake]
      let newScore = prev.score
      let newGaiaTokens = prev.gaiaTokens
      let newFood = prev.food
      let newGaiaCoins = [...prev.gaiaCoins]
      let newLevel = prev.level
      let newSpeed = prev.speed
      let isSpaceMode = prev.isSpaceMode

      // Check food collision
      if (head.x === prev.food.x && head.y === prev.food.y) {
        newScore += 10
        newFood = {
          x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
          y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
        }
      } else {
        newSnake.pop()
      }

      // Check GAIA coin collision
      newGaiaCoins = newGaiaCoins.filter(coin => {
        if (head.x === coin.x && head.y === coin.y) {
          newGaiaTokens += 1
          newScore += 5
          return false
        }
        return true
      })

      // Level progression and difficulty
      const targetLevel = Math.floor(newScore / 100) + 1
      if (targetLevel > newLevel) {
        newLevel = targetLevel
        newSpeed = Math.max(50, 200 - (newLevel - 1) * 15)
        
        toast.success(`🚀 Level ${newLevel} Reached!`, {
          description: `Speed increased! Difficulty: ${newLevel * 10}%`,
          duration: 3000
        })
      }

      // Space mode activation at 100 GAIA tokens
      if (newGaiaTokens >= 100 && !prev.isSpaceMode) {
        isSpaceMode = true
        toast.success('🚀 SPACE MODE ACTIVATED!', {
          description: 'You are being transported to the Worms battlefield!',
          duration: 5000
        })
        
        // Simulate space transition
        setTimeout(() => {
          toast.success('🌌 Welcome to Space Worms Arena!', {
            description: 'Eat items and bite players to win all prizes!',
            duration: 6000
          })
        }, 2000)
      }

      return {
        ...prev,
        snake: newSnake,
        score: newScore,
        gaiaTokens: newGaiaTokens,
        food: newFood,
        gaiaCoins: newGaiaCoins,
        level: newLevel,
        speed: newSpeed,
        isSpaceMode
      }
    })
  }, [])

  // Draw game
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    if (gameState.isSpaceMode) {
      // Space background
      ctx.fillStyle = '#0a0a1a'
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      
      // Stars
      ctx.fillStyle = '#ffffff'
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * CANVAS_SIZE
        const y = Math.random() * CANVAS_SIZE
        ctx.fillRect(x, y, 1, 1)
      }
    } else {
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }

    // Draw snake
    ctx.fillStyle = gameState.isSpaceMode ? '#00ffff' : '#4ade80'
    gameState.snake.forEach((segment, index) => {
      if (index === 0) {
        // Snake head - brighter
        ctx.fillStyle = gameState.isSpaceMode ? '#ffff00' : '#22c55e'
      } else {
        ctx.fillStyle = gameState.isSpaceMode ? '#00ffff' : '#4ade80'
      }
      ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2)
    })

    // Draw food
    ctx.fillStyle = '#ef4444'
    ctx.fillRect(gameState.food.x * GRID_SIZE, gameState.food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2)

    // Draw GAIA coins
    ctx.fillStyle = '#fbbf24'
    gameState.gaiaCoins.forEach(coin => {
      ctx.fillRect(coin.x * GRID_SIZE, coin.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2)
    })

    // Draw grid
    ctx.strokeStyle = gameState.isSpaceMode ? '#333366' : '#333333'
    ctx.lineWidth = 1
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, CANVAS_SIZE)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(CANVAS_SIZE, i)
      ctx.stroke()
    }
  }, [gameState])

  // Start game
  const startGame = () => {
    if (gameState.consecutiveWins >= 5) {
      const difficultyMultiplier = Math.min(gameState.consecutiveWins / 5, 3)
      setGameState(prev => ({
        ...prev,
        speed: Math.max(30, prev.speed / difficultyMultiplier),
        gameRunning: true
      }))
      
      toast.warning(`🔥 EXTREME DIFFICULTY MODE!`, {
        description: `${gameState.consecutiveWins} consecutive wins - Speed x${difficultyMultiplier.toFixed(1)}`,
        duration: 4000
      })
    } else {
      setGameState(prev => ({ ...prev, gameRunning: true }))
    }
  }

  // Pause game
  const pauseGame = () => {
    setGameState(prev => ({ ...prev, gameRunning: false }))
  }

  // Reset game
  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      gameRunning: false,
      gameOver: false
    }))
    initGame()
  }

  // Handle game win
  const handleGameWin = () => {
    const tokensWon = Math.min(100, gameState.level * 10)
    const bonusMultiplier = Math.min(gameState.consecutiveWins + 1, 5)
    const finalTokens = tokensWon * bonusMultiplier
    
    setGameState(prev => ({
      ...prev,
      gaiaTokens: prev.gaiaTokens + finalTokens,
      consecutiveWins: prev.consecutiveWins + 1,
      xpPoints: prev.xpPoints + (50 * prev.level)
    }))
    
    toast.success(`🏆 GAME WON! ${finalTokens} GAIA Tokens!`, {
      description: `Consecutive wins: ${gameState.consecutiveWins + 1} | Bonus: x${bonusMultiplier}`,
      duration: 5000
    })
  }

  // XP Timer (5 XP per hour)
  useEffect(() => {
    if (gameState.gameRunning) {
      xpTimerRef.current = window.setInterval(() => {
        setGameState(prev => ({
          ...prev,
          xpPoints: prev.xpPoints + 5,
          playTime: prev.playTime + 1
        }))
      }, 3600000) // 1 hour
    } else {
      if (xpTimerRef.current) {
        clearInterval(xpTimerRef.current)
      }
    }

    return () => {
      if (xpTimerRef.current) {
        clearInterval(xpTimerRef.current)
      }
    }
  }, [gameState.gameRunning])

  // Game loop effect
  useEffect(() => {
    if (gameState.gameRunning && !gameState.gameOver) {
      gameLoopRef.current = window.setInterval(gameLoop, gameState.speed)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState.gameRunning, gameState.gameOver, gameState.speed, gameLoop])

  // Keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Generate GAIA coins periodically
  useEffect(() => {
    if (gameState.gameRunning) {
      const coinInterval = setInterval(() => {
        if (Math.random() < 0.3) {
          generateGaiaCoin()
        }
      }, 3000)
      
      return () => clearInterval(coinInterval)
    }
  }, [gameState.gameRunning, generateGaiaCoin])

  // Draw game
  useEffect(() => {
    draw()
  }, [draw])

  // Initialize on mount
  useEffect(() => {
    initGame()
  }, [initGame])

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Zap className="h-6 w-6" />
            🐍 ENHANCED GAIA SNAKE GAME
          </CardTitle>
          <p className="text-muted-foreground">
            Win 100 GAIA tokens • Space mode at 100 coins • Increasing difficulty after 5 consecutive wins
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <Card className={`border-2 ${gameState.isSpaceMode ? 'border-cyan-500/50 bg-gradient-to-br from-purple-900/30 to-blue-900/30' : 'border-green-500/30'}`}>
            <CardContent className="p-4">
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  className="border border-border rounded-lg"
                />
              </div>
              
              {gameState.isSpaceMode && (
                <div className="text-center mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-cyan-400 mb-2">🚀 SPACE MODE ACTIVATED!</div>
                  <div className="text-sm text-purple-400">
                    You're now in the cosmic battlefield! Prepare for Worms Arena integration!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Game Controls */}
          <Card className="border-green-500/30">
            <CardContent className="p-4">
              <div className="flex gap-4 justify-center">
                {!gameState.gameRunning ? (
                  <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Game
                  </Button>
                ) : (
                  <Button onClick={pauseGame} className="bg-yellow-600 hover:bg-yellow-700">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                )}
                
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                
                {gameState.score >= 500 && (
                  <Button onClick={handleGameWin} className="bg-purple-600 hover:bg-purple-700">
                    <Trophy className="h-4 w-4 mr-2" />
                    Claim Victory
                  </Button>
                )}
              </div>
              
              <div className="text-center mt-4 text-sm text-muted-foreground">
                Use arrow keys to control the snake • Collect yellow GAIA coins for tokens!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Stats & Rankings */}
        <div className="space-y-4">
          {/* Current Game Stats */}
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-sm">📊 Game Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Score: <span className="text-green-400 font-bold">{gameState.score}</span></div>
                <div>Level: <span className="text-blue-400 font-bold">{gameState.level}</span></div>
                <div>GAIA: <span className="text-yellow-400 font-bold">{gameState.gaiaTokens}</span></div>
                <div>XP: <span className="text-purple-400 font-bold">{gameState.xpPoints}</span></div>
                <div>Wins: <span className="text-orange-400 font-bold">{gameState.consecutiveWins}</span></div>
                <div>Speed: <span className="text-red-400 font-bold">{gameState.speed}ms</span></div>
              </div>
              
              {gameState.consecutiveWins >= 5 && (
                <div className="p-2 bg-red-900/30 rounded border border-red-500/20 text-center">
                  <div className="text-red-400 text-xs font-bold">🔥 EXTREME MODE</div>
                  <div className="text-xs text-muted-foreground">Difficulty Multiplier: x{Math.min(gameState.consecutiveWins / 5, 3).toFixed(1)}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Rankings */}
          <Card className="border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                🏆 Live Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {rankings.map((player, index) => (
                <div key={player.id} className={`flex items-center gap-2 p-2 rounded ${index < 3 ? 'bg-yellow-900/20 border border-yellow-500/20' : 'bg-muted/20'}`}>
                  <div className="flex items-center gap-1">
                    {index === 0 && <Crown className="h-3 w-3 text-yellow-400" />}
                    {index === 1 && <Star className="h-3 w-3 text-gray-400" />}
                    {index === 2 && <Star className="h-3 w-3 text-orange-400" />}
                    <span className="text-xs font-bold">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{player.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {player.score} pts • {player.gaiaTokens} GAIA • Lv.{player.level}
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white text-xs">
                    {player.xpPoints} XP
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Game Progress */}
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-sm">🎯 Progress to Space Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>GAIA Coins Collected</span>
                  <span>{gameState.gaiaTokens}/100</span>
                </div>
                <Progress value={(gameState.gaiaTokens / 100) * 100} className="h-2" />
              </div>
              
              {gameState.gaiaTokens >= 100 && (
                <div className="text-center p-2 bg-cyan-900/30 rounded border border-cyan-500/20">
                  <Rocket className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
                  <div className="text-cyan-400 text-xs font-bold">SPACE MODE READY!</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
