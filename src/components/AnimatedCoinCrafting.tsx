
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Users, TrendingUp, Zap, Settings, Flame, Sparkles, Factory } from 'lucide-react'

interface FloatingCoin {
  id: number
  x: number
  y: number
  delay: number
  size: number
}

interface CraftingRobot {
  isActive: boolean
  animation: string
  producing: boolean
}

export function AnimatedCoinCrafting() {
  const [investors, setInvestors] = useState(12847)
  const [coinsProduced, setCoinsProduced] = useState(100)
  const [monthlyProgress, setMonthlyProgress] = useState(65)
  const [craftingRobot, setCraftingRobot] = useState<CraftingRobot>({
    isActive: false,
    animation: 'idle',
    producing: false
  })
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([])
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([])

  // Calculate coins based on investors
  const calculateMonthlyCoins = (investorCount: number) => {
    const baseCoins = 100
    const bonusCoins = Math.floor(investorCount / 100) * 5
    return baseCoins + bonusCoins
  }

  // Animated coin crafting process
  useEffect(() => {
    const craftingInterval = setInterval(() => {
      // Start robot animation
      setCraftingRobot({
        isActive: true,
        animation: 'crafting',
        producing: true
      })
      
      // Create floating coins with different sizes and delays
      const newCoins: FloatingCoin[] = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
        delay: i * 0.3,
        size: 0.8 + Math.random() * 0.4
      }))
      
      setFloatingCoins(prev => [...prev, ...newCoins])
      
      // Add sparkle effects
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i + 100,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60
      }))
      
      setSparkles(prev => [...prev, ...newSparkles])
      
      // Remove effects after animation
      setTimeout(() => {
        setFloatingCoins(prev => prev.filter(coin => !newCoins.includes(coin)))
        setSparkles(prev => prev.filter(sparkle => !newSparkles.includes(sparkle)))
        setCraftingRobot({
          isActive: false,
          animation: 'idle',
          producing: false
        })
      }, 3000)
      
      // Update progress and production
      setMonthlyProgress(prev => {
        const newProgress = (prev + 3) % 100
        if (newProgress < prev) {
          setCoinsProduced(prevCoins => prevCoins + Math.floor(Math.random() * 8) + 3)
        }
        return newProgress
      })
    }, 4000)

    return () => clearInterval(craftingInterval)
  }, [])

  // Simulate investor growth
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setInvestors(prev => prev + Math.floor(Math.random() * 15) + 5)
    }, 6000)

    return () => clearInterval(growthInterval)
  }, [])

  const monthlyPotential = calculateMonthlyCoins(investors)

  return (
    <div className="space-y-6">
      {/* Main Animated Crafting Display */}
      <Card className="border-4 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 relative overflow-hidden min-h-[500px]">
        {/* Animated background glow */}
        <div className={`absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 ${craftingRobot.isActive ? 'animate-pulse' : ''}`}></div>
        
        {/* Floating Coins Animation */}
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className="absolute animate-bounce text-yellow-400 pointer-events-none z-20"
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              fontSize: `${coin.size * 2}rem`,
              animationDelay: `${coin.delay}s`,
              animationDuration: '2s'
            }}
          >
            🪙
          </div>
        ))}

        {/* Sparkle Effects */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-ping text-yellow-300 pointer-events-none z-15"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDuration: '1.5s'
            }}
          >
            ✨
          </div>
        ))}

        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-400 text-center justify-center text-2xl">
            <Factory className={`h-10 w-10 ${craftingRobot.isActive ? 'animate-spin' : 'animate-pulse'}`} />
            🏭 ILLUSTRATED MOVING COIN CRAFTER
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 relative z-10">
          {/* Animated Crafting Robot Scene */}
          <div className="text-center space-y-6">
            <div className="relative">
              {/* Robot with different states */}
              <div className={`text-8xl ${craftingRobot.isActive ? 'animate-bounce' : 'animate-pulse'}`}>
                {craftingRobot.producing ? '🤖⚡' : '🤖'}
              </div>
              
              {/* Crafting arms and gears */}
              <div className="text-6xl mt-4 flex justify-center gap-4">
                <span className={`${craftingRobot.isActive ? 'animate-spin' : ''}`}>⚙️</span>
                <span className={`${craftingRobot.producing ? 'animate-bounce' : 'animate-pulse'}`}>🪙</span>
                <span className={`${craftingRobot.isActive ? 'animate-spin' : ''} animation-reverse`}>⚙️</span>
              </div>
              
              {/* Crafting table/conveyor */}
              <div className="text-4xl mt-4">
                {craftingRobot.isActive ? '🏭⚡🏭⚡🏭' : '🏭___🏭___🏭'}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className={`text-2xl font-bold ${craftingRobot.producing ? 'text-green-400 animate-pulse' : 'text-yellow-400'}`}>
                {craftingRobot.producing ? "CRAFTING COINS IN PROGRESS..." : "COIN CRAFTER READY"}
              </p>
              <p className={`text-lg ${craftingRobot.isActive ? 'text-orange-400' : 'text-gray-400'}`}>
                {craftingRobot.isActive ? "⚡ High-Speed Production Mode Active ⚡" : "Standby Mode - Awaiting Next Cycle"}
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

          {/* Live Crafting Process Illustration */}
          <div className="p-8 bg-gradient-to-r from-gray-900/50 to-yellow-900/50 rounded-xl border-2 border-yellow-500/30">
            <h4 className="text-yellow-400 font-bold mb-6 flex items-center gap-3 text-xl">
              <Settings className={`h-6 w-6 ${craftingRobot.isActive ? 'animate-spin' : ''}`} />
              Live Illustrated Crafting Process
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-3">
                <div className="text-4xl">🔥</div>
                <div className="text-sm">Token Burning</div>
                <div className={`text-xs ${craftingRobot.isActive ? 'text-red-400' : 'text-gray-400'}`}>
                  {craftingRobot.isActive ? 'Active' : 'Standby'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">⚡</div>
                <div className="text-sm">Energy Conversion</div>
                <div className={`text-xs ${craftingRobot.producing ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {craftingRobot.producing ? 'Processing' : 'Ready'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">🪙</div>
                <div className="text-sm">Coin Generation</div>
                <div className={`text-xs ${craftingRobot.producing ? 'text-green-400' : 'text-gray-400'}`}>
                  {craftingRobot.producing ? 'Crafting' : 'Idle'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">💰</div>
                <div className="text-sm">Distribution</div>
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
