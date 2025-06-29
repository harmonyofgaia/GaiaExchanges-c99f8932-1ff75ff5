import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Users, TrendingUp, Zap, Settings, Flame, Sparkles, Factory, Hammer } from 'lucide-react'

interface FloatingCoin {
  id: number
  x: number
  y: number
  delay: number
  size: number
  direction: 'up' | 'down' | 'left' | 'right'
  speed: number
}

interface CraftingRobot {
  isActive: boolean
  animation: string
  producing: boolean
  hammerSwing: boolean
  intensity: number
}

interface CoinExplosion {
  id: number
  x: number
  y: number
  coins: Array<{
    id: number
    x: number
    y: number
    rotation: number
    scale: number
  }>
}

export function AnimatedCoinCrafting() {
  const [investors, setInvestors] = useState(12847)
  const [coinsProduced, setCoinsProduced] = useState(100)
  const [monthlyProgress, setMonthlyProgress] = useState(65)
  const [craftingRobot, setCraftingRobot] = useState<CraftingRobot>({
    isActive: false,
    animation: 'idle',
    producing: false,
    hammerSwing: false,
    intensity: 1
  })
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([])
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([])
  const [coinExplosions, setCoinExplosions] = useState<CoinExplosion[]>([])
  const [hammerImpacts, setHammerImpacts] = useState<Array<{id: number, x: number, y: number}>>([])

  // Calculate coins based on investors
  const calculateMonthlyCoins = (investorCount: number) => {
    const baseCoins = 100
    const bonusCoins = Math.floor(investorCount / 100) * 5
    return baseCoins + bonusCoins
  }

  // Enhanced coin crafting animation with smashing effects
  useEffect(() => {
    const craftingInterval = setInterval(() => {
      const intensity = 1 + Math.random() * 2 // Random intensity 1-3
      
      // Start intense robot animation
      setCraftingRobot({
        isActive: true,
        animation: 'intense-crafting',
        producing: true,
        hammerSwing: true,
        intensity: intensity
      })
      
      // Create massive coin explosion effect
      const explosionCount = Math.floor(4 + intensity * 3) // 4-12 explosions
      const newExplosions: CoinExplosion[] = Array.from({ length: explosionCount }, (_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        y: 25 + Math.random() * 50,
        coins: Array.from({ length: 8 + Math.floor(Math.random() * 12) }, (_, j) => ({
          id: Date.now() + i * 100 + j,
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 1.5
        }))
      }))
      
      setCoinExplosions(prev => [...prev, ...newExplosions])
      
      // Create enhanced floating coins with different directions and speeds
      const newCoins: FloatingCoin[] = Array.from({ length: 15 + Math.floor(intensity * 5) }, (_, i) => ({
        id: Date.now() + i + 1000,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60,
        delay: i * 0.1,
        size: 0.8 + Math.random() * 1.2,
        direction: ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)] as any,
        speed: 1 + Math.random() * 2
      }))
      
      setFloatingCoins(prev => [...prev, ...newCoins])
      
      // Create hammer impact effects
      const hammerHits = Array.from({ length: 5 + Math.floor(intensity * 3) }, (_, i) => ({
        id: Date.now() + i + 2000,
        x: 30 + Math.random() * 40,
        y: 40 + Math.random() * 30
      }))
      
      setHammerImpacts(prev => [...prev, ...hammerHits])
      
      // Enhanced sparkle effects
      const newSparkles = Array.from({ length: 20 + Math.floor(intensity * 10) }, (_, i) => ({
        id: Date.now() + i + 3000,
        x: 5 + Math.random() * 90,
        y: 15 + Math.random() * 70
      }))
      
      setSparkles(prev => [...prev, ...newSparkles])
      
      // Remove effects after animation with staggered timing
      setTimeout(() => {
        setFloatingCoins(prev => prev.filter(coin => !newCoins.includes(coin)))
        setCoinExplosions(prev => prev.filter(explosion => !newExplosions.includes(explosion)))
        setHammerImpacts(prev => prev.filter(hit => !hammerHits.includes(hit)))
        setSparkles(prev => prev.filter(sparkle => !newSparkles.includes(sparkle)))
        setCraftingRobot({
          isActive: false,
          animation: 'idle',
          producing: false,
          hammerSwing: false,
          intensity: 1
        })
      }, 4000)
      
      // Update progress and production with intensity
      setMonthlyProgress(prev => {
        const newProgress = (prev + (2 + intensity)) % 100
        if (newProgress < prev) {
          setCoinsProduced(prevCoins => prevCoins + Math.floor(Math.random() * 15) + 5 + Math.floor(intensity * 3))
        }
        return newProgress
      })
    }, 3000) // Faster crafting cycles

    return () => clearInterval(craftingInterval)
  }, [])

  // Simulate investor growth
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setInvestors(prev => prev + Math.floor(Math.random() * 20) + 8)
    }, 5000)

    return () => clearInterval(growthInterval)
  }, [])

  const monthlyPotential = calculateMonthlyCoins(investors)

  const getDirectionClass = (direction: string, speed: number) => {
    const baseSpeed = speed * 2
    switch (direction) {
      case 'up': return `animate-bounce duration-${Math.floor(1000/baseSpeed)}`
      case 'down': return `animate-pulse duration-${Math.floor(1500/baseSpeed)}`
      case 'left': return `animate-ping duration-${Math.floor(1200/baseSpeed)}`
      case 'right': return `animate-spin duration-${Math.floor(800/baseSpeed)}`
      default: return `animate-bounce duration-${Math.floor(1000/baseSpeed)}`
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Animated Crafting Display */}
      <Card className="border-4 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 relative overflow-hidden min-h-[600px]">
        {/* Dynamic background with intensity */}
        <div className={`absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 ${
          craftingRobot.isActive ? `animate-pulse duration-${Math.floor(300/craftingRobot.intensity)}` : ''
        }`}></div>
        
        {/* Coin Explosions */}
        {coinExplosions.map((explosion) => (
          <div key={explosion.id} className="absolute pointer-events-none z-30" 
               style={{ left: `${explosion.x}%`, top: `${explosion.y}%` }}>
            {explosion.coins.map((coin) => (
              <div
                key={coin.id}
                className="absolute text-yellow-400 animate-ping"
                style={{
                  left: `${coin.x}px`,
                  top: `${coin.y}px`,
                  transform: `rotate(${coin.rotation}deg) scale(${coin.scale})`,
                  fontSize: '1.5rem',
                  animationDuration: '1s'
                }}
              >
                🪙
              </div>
            ))}
          </div>
        ))}

        {/* Enhanced Floating Coins Animation */}
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className={`absolute text-yellow-400 pointer-events-none z-20 ${getDirectionClass(coin.direction, coin.speed)}`}
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              fontSize: `${coin.size * 2.5}rem`,
              animationDelay: `${coin.delay}s`,
            }}
          >
            🪙
          </div>
        ))}

        {/* Hammer Impact Effects */}
        {hammerImpacts.map((impact) => (
          <div
            key={impact.id}
            className="absolute animate-ping text-orange-400 pointer-events-none z-25 text-4xl"
            style={{
              left: `${impact.x}%`,
              top: `${impact.y}%`,
              animationDuration: '0.8s'
            }}
          >
            💥
          </div>
        ))}

        {/* Enhanced Sparkle Effects */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-ping text-yellow-300 pointer-events-none z-15"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDuration: `${1 + Math.random()}s`,
              fontSize: `${0.8 + Math.random() * 0.7}rem`
            }}
          >
            ✨
          </div>
        ))}

        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-400 text-center justify-center text-2xl">
            <Factory className={`h-10 w-10 ${craftingRobot.isActive ? 'animate-spin duration-300' : 'animate-pulse'}`} />
            <Hammer className={`h-10 w-10 ${craftingRobot.hammerSwing ? 'animate-bounce duration-200' : 'animate-pulse'}`} />
            🏭 INTENSE COIN SMASHING CRAFTER 🔨
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 relative z-10">
          {/* Enhanced Animated Crafting Robot Scene */}
          <div className="text-center space-y-6">
            <div className="relative">
              {/* Enhanced Robot with hammer smashing */}
              <div className={`text-8xl ${
                craftingRobot.hammerSwing ? 'animate-bounce duration-200' : 
                craftingRobot.isActive ? 'animate-pulse duration-500' : 'animate-pulse duration-2000'
              }`}>
                {craftingRobot.producing ? '🤖⚡🔨💥' : '🤖🔨'}
              </div>
              
              {/* Enhanced crafting scene with hammers and anvils */}
              <div className="text-6xl mt-4 flex justify-center gap-4">
                <span className={`${craftingRobot.hammerSwing ? 'animate-bounce duration-150' : 'animate-pulse'}`}>🔨</span>
                <span className={`${craftingRobot.isActive ? 'animate-spin duration-300' : ''}`}>⚙️</span>
                <span className={`${craftingRobot.producing ? 'animate-bounce duration-200' : 'animate-pulse'} text-yellow-400`}>🪙</span>
                <span className={`${craftingRobot.hammerSwing ? 'animate-ping duration-300' : ''}`}>⚒️</span>
                <span className={`${craftingRobot.isActive ? 'animate-spin duration-300' : ''} rotate-180`}>⚙️</span>
              </div>
              
              {/* Enhanced crafting foundry with anvils */}
              <div className="text-4xl mt-4">
                {craftingRobot.isActive ? 
                  '🔥⚒️💥🪙💥⚒️🔥' : 
                  '🏭___⚒️___🪙___⚒️___🏭'
                }
              </div>
              
              {/* Coin production line */}
              <div className="text-3xl mt-2">
                {craftingRobot.producing ? 
                  '🪙💥🪙💥🪙💥🪙💥🪙' : 
                  '🪙___🪙___🪙___🪙___🪙'
                }
              </div>
            </div>
            
            <div className="space-y-2">
              <p className={`text-2xl font-bold ${
                craftingRobot.producing ? 'text-orange-400 animate-pulse duration-300' : 'text-yellow-400'
              }`}>
                {craftingRobot.producing ? 
                  `🔨 INTENSE COIN SMASHING IN PROGRESS! 💥` : 
                  "🔨 COIN SMASHER READY FOR ACTION"
                }
              </p>
              <p className={`text-lg ${
                craftingRobot.isActive ? 'text-red-400 animate-bounce' : 'text-gray-400'
              }`}>
                {craftingRobot.isActive ? 
                  `⚡ MAXIMUM INTENSITY CRAFTING x${craftingRobot.intensity.toFixed(1)} ⚡` : 
                  "Standby Mode - Preparing Next Smashing Cycle"
                }
              </p>
            </div>
          </div>

          {/* Production Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-900/40 rounded-xl border-2 border-green-500/30">
              <Coins className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-green-400 mb-2">{coinsProduced}</div>
              <div className="text-sm text-muted-foreground mb-3">Coins Crafted This Month</div>
              <Progress value={monthlyProgress} className="h-4 mb-2" />
              <Badge className="bg-green-600 text-white">
                {monthlyProgress.toFixed(1)}% Complete
              </Badge>
            </div>

            <div className="text-center p-6 bg-blue-900/40 rounded-xl border-2 border-blue-500/30">
              <Users className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-blue-400 mb-2">{investors.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mb-3">Active Investors</div>
              <div className="text-2xl text-green-400 mb-2">+{Math.floor(investors/1000)}%</div>
              <Badge className="bg-blue-600 text-white">Production Bonus Active</Badge>
            </div>

            <div className="text-center p-6 bg-purple-900/40 rounded-xl border-2 border-purple-500/30">
              <TrendingUp className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-purple-400 mb-2">{monthlyPotential}</div>
              <div className="text-sm text-muted-foreground mb-3">Monthly Potential</div>
              <div className="text-xs text-green-400 mb-2">Base: 100 + Investor Multiplier</div>
              <Badge className="bg-purple-600 text-white">Optimized Production</Badge>
            </div>
          </div>

          {/* Enhanced Live Crafting Process Illustration */}
          <div className="p-8 bg-gradient-to-r from-gray-900/50 to-yellow-900/50 rounded-xl border-2 border-yellow-500/30">
            <h4 className="text-yellow-400 font-bold mb-6 flex items-center gap-3 text-xl">
              <Hammer className={`h-6 w-6 ${craftingRobot.hammerSwing ? 'animate-bounce duration-200' : ''}`} />
              Live Coin Smashing & Forging Process
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🔥</div>
                <div className="text-sm">Metal Heating</div>
                <div className={`text-xs ${craftingRobot.isActive ? 'text-red-400' : 'text-gray-400'}`}>
                  {craftingRobot.isActive ? 'Blazing Hot' : 'Standby'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">🔨</div>
                <div className="text-sm">Hammer Smashing</div>
                <div className={`text-xs ${craftingRobot.hammerSwing ? 'text-orange-400 animate-pulse' : 'text-gray-400'}`}>
                  {craftingRobot.hammerSwing ? 'SMASHING!' : 'Ready'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">⚒️</div>
                <div className="text-sm">Forging Process</div>
                <div className={`text-xs ${craftingRobot.producing ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {craftingRobot.producing ? 'Forging' : 'Idle'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">🪙</div>
                <div className="text-sm">Coin Creation</div>
                <div className={`text-xs ${craftingRobot.producing ? 'text-green-400 animate-pulse' : 'text-gray-400'}`}>
                  {craftingRobot.producing ? 'Creating' : 'Waiting'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">💰</div>
                <div className="text-sm">Final Polish</div>
                <div className="text-xs text-blue-400">Ready</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Impact and Formula */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-400 text-xl">
            <Sparkles className="h-6 w-6" />
            Investor-Powered Production Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-bold text-blue-400 text-lg">Illustrated Production Formula:</h4>
              <div className="bg-muted/40 p-6 rounded-xl font-mono border-2 border-blue-500/30">
                <div className="text-green-400 text-lg mb-2">🏭 Base Production: 100 coins/month</div>
                <div className="text-blue-400 text-lg mb-2">👥 Investor Bonus: +5 coins per 100 investors</div>
                <div className="text-purple-400 text-lg mb-3">⚡ Speed Multiplier: 10x crafting speed</div>
                <div className="text-yellow-400 font-bold text-xl border-t border-gray-600 pt-3">
                  🎯 Total Output: {monthlyPotential} coins/month
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-purple-400 text-lg">Crafted Coin Distribution:</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-900/30 rounded border border-green-500/30">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    <span>Community Rewards:</span>
                  </span>
                  <span className="text-green-400 font-bold text-lg">{Math.floor(monthlyPotential * 0.4)} coins</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded border border-blue-500/30">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">🌱</span>
                    <span>Project Reinvestment:</span>
                  </span>
                  <span className="text-blue-400 font-bold text-lg">{Math.floor(monthlyPotential * 0.35)} coins</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-900/30 rounded border border-purple-500/30">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">🏪</span>
                    <span>Platform Upgrades:</span>
                  </span>
                  <span className="text-purple-400 font-bold text-lg">{Math.floor(monthlyPotential * 0.25)} coins</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
