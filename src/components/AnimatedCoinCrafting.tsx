
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Users, TrendingUp, Zap, Settings, Flame } from 'lucide-react'

export function AnimatedCoinCrafting() {
  const [investors, setInvestors] = useState(12847)
  const [coinsProduced, setCoinsProduced] = useState(100)
  const [monthlyProgress, setMonthlyProgress] = useState(65)
  const [craftingAnimation, setCraftingAnimation] = useState(false)
  const [floatingCoins, setFloatingCoins] = useState<Array<{id: number, x: number, y: number}>>([])

  // Calculate coins based on investors
  const calculateMonthlyCoins = (investorCount: number) => {
    const baseCoins = 100
    const bonusCoins = Math.floor(investorCount / 100) * 5
    return baseCoins + bonusCoins
  }

  // Animated coin creation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCraftingAnimation(true)
      
      // Create floating coins animation
      const newCoins = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 30 + 40
      }))
      
      setFloatingCoins(prev => [...prev, ...newCoins])
      
      // Remove coins after animation
      setTimeout(() => {
        setFloatingCoins(prev => prev.filter(coin => !newCoins.includes(coin)))
        setCraftingAnimation(false)
      }, 2000)
      
      // Update progress
      setMonthlyProgress(prev => (prev + 2) % 100)
      if (monthlyProgress >= 98) {
        setCoinsProduced(prev => prev + Math.floor(Math.random() * 5) + 1)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [monthlyProgress])

  // Simulate investor growth
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setInvestors(prev => prev + Math.floor(Math.random() * 10))
    }, 5000)

    return () => clearInterval(growthInterval)
  }, [])

  const monthlyPotential = calculateMonthlyCoins(investors)

  return (
    <div className="space-y-6">
      {/* Animated Crafting Display */}
      <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 animate-pulse"></div>
        
        {/* Floating Coins Animation */}
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className="absolute animate-bounce text-yellow-400 text-2xl pointer-events-none z-10"
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              animation: 'float 2s ease-out forwards'
            }}
          >
            🪙
          </div>
        ))}

        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400 text-center justify-center">
            <Coins className="h-8 w-8 animate-spin" />
            🏭 LIVE COIN CRAFTING FACILITY
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Crafting Robot Illustration */}
          <div className="text-center space-y-4">
            <div className="text-8xl animate-pulse">
              🤖
            </div>
            <div className="text-6xl animate-bounce">
              ⚙️🪙⚙️
            </div>
            <p className="text-yellow-400 font-bold text-xl">
              {craftingAnimation ? "CRAFTING COINS..." : "READY TO CRAFT"}
            </p>
          </div>

          {/* Production Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <Coins className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-400">{coinsProduced}</div>
              <div className="text-sm text-muted-foreground">Coins This Month</div>
              <Progress value={monthlyProgress} className="mt-2 h-3" />
            </div>

            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-400">{investors.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Investors</div>
              <Badge className="mt-2 bg-blue-600">+{Math.floor(investors/1000)}% Bonus</Badge>
            </div>

            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-400">{monthlyPotential}</div>
              <div className="text-sm text-muted-foreground">Monthly Potential</div>
              <div className="text-xs text-green-400 mt-1">Base: 100 + Investor Bonus</div>
            </div>
          </div>

          {/* Crafting Process Visualization */}
          <div className="p-6 bg-gradient-to-r from-gray-900/40 to-yellow-900/40 rounded-lg border border-yellow-500/20">
            <h4 className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 animate-spin" />
              Live Crafting Process
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>🔥 Burning Old Tokens</span>
                <span className="text-red-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>⚡ Energy Conversion</span>
                <span className="text-yellow-400">Processing</span>
              </div>
              <div className="flex items-center justify-between">
                <span>🪙 New Coin Generation</span>
                <span className="text-green-400">Crafting</span>
              </div>
              <div className="flex items-center justify-between">
                <span>💰 Wallet Distribution</span>
                <span className="text-blue-400">Ready</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Impact Display */}
      <Card className="border-green-500/50 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Zap className="h-6 w-6" />
            Investor Impact on Production
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-blue-400">Production Formula:</h4>
              <div className="bg-muted/30 p-4 rounded font-mono text-sm">
                <div>Base Production: 100 coins/month</div>
                <div>Investor Bonus: +5 coins per 100 investors</div>
                <div className="text-green-400 font-bold">
                  Total: {monthlyPotential} coins/month
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-purple-400">Distribution:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>🎁 Community Rewards:</span>
                  <span className="text-green-400">{Math.floor(monthlyPotential * 0.4)} coins</span>
                </div>
                <div className="flex justify-between">
                  <span>🌱 Project Reinvestment:</span>
                  <span className="text-blue-400">{Math.floor(monthlyPotential * 0.35)} coins</span>
                </div>
                <div className="flex justify-between">
                  <span>🏪 Marketplace Upgrades:</span>
                  <span className="text-purple-400">{Math.floor(monthlyPotential * 0.25)} coins</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
