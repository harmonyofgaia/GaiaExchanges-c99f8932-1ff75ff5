
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Users, TrendingUp, Factory, Hammer } from 'lucide-react'

interface CraftingState {
  isActive: boolean
  hammerCount: number
  currentCoin: number
  showCoin: boolean
  showSparks: boolean
}

export function AnimatedCoinCrafting() {
  const [investors, setInvestors] = useState(12847)
  const [coinsProduced, setCoinsProduced] = useState(100)
  const [monthlyProgress, setMonthlyProgress] = useState(65)
  const [craftingState, setCraftingState] = useState<CraftingState>({
    isActive: false,
    hammerCount: 0,
    currentCoin: 1,
    showCoin: true,
    showSparks: false
  })

  // Calculate coins based on investors
  const calculateMonthlyCoins = (investorCount: number) => {
    const baseCoins = 100
    const bonusCoins = Math.floor(investorCount / 100) * 5
    return baseCoins + bonusCoins
  }

  // Simple coin crafting animation
  useEffect(() => {
    const craftingInterval = setInterval(() => {
      console.log('🔨 Starting coin crafting cycle')
      
      // Start crafting sequence
      setCraftingState({
        isActive: true,
        hammerCount: 0,
        currentCoin: 1,
        showCoin: true,
        showSparks: false
      })

      // Hammer 5 times with delays
      for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
          setCraftingState(prev => ({
            ...prev,
            hammerCount: i,
            showSparks: true
          }))
          
          // Hide sparks after brief moment
          setTimeout(() => {
            setCraftingState(prev => ({
              ...prev,
              showSparks: false
            }))
          }, 200)
          
          console.log(`🔨 Hammer strike ${i}/5`)
        }, i * 800) // 800ms between each hammer strike
      }

      // Finish crafting after 5 strikes
      setTimeout(() => {
        setCraftingState({
          isActive: false,
          hammerCount: 0,
          currentCoin: 1,
          showCoin: true,
          showSparks: false
        })
        
        // Update progress
        setMonthlyProgress(prev => {
          const newProgress = (prev + 3) % 100
          if (newProgress < prev) {
            setCoinsProduced(prevCoins => prevCoins + Math.floor(Math.random() * 8) + 3)
          }
          return newProgress
        })
        
        console.log('✅ Coin crafting cycle complete')
      }, 5000) // Complete after 5 strikes + buffer time

    }, 8000) // Start new cycle every 8 seconds

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
      {/* Simple Animated Crafting Display */}
      <Card className="border-4 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 relative overflow-hidden min-h-[500px]">
        {/* Background glow during active crafting */}
        <div className={`absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 ${
          craftingState.isActive ? 'animate-pulse duration-1000' : ''
        }`}></div>
        
        {/* Simple sparks effect only during hammer strikes */}
        {craftingState.showSparks && (
          <>
            <div className="absolute animate-ping text-yellow-300 pointer-events-none z-15 text-2xl"
                 style={{ left: '45%', top: '45%', animationDuration: '0.3s' }}>
              ✨
            </div>
            <div className="absolute animate-ping text-orange-400 pointer-events-none z-15 text-xl"
                 style={{ left: '55%', top: '40%', animationDuration: '0.4s' }}>
              💥
            </div>
          </>
        )}

        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-yellow-400 text-center justify-center text-2xl">
            <Factory className={`h-8 w-8 ${craftingState.isActive ? 'animate-pulse duration-500' : 'animate-pulse duration-2000'}`} />
            🏭 SIMPLE COIN CRAFTER 🔨
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 relative z-10">
          {/* Simple Crafting Scene */}
          <div className="text-center space-y-6">
            <div className="relative">
              {/* Person with hammer */}
              <div className={`text-6xl ${
                craftingState.isActive && craftingState.showSparks ? 'animate-bounce duration-200' : 'animate-pulse duration-2000'
              }`}>
                🧑‍🔧
              </div>
              
              {/* Hammer animation */}
              <div className="text-4xl mt-2">
                <span className={`${craftingState.showSparks ? 'animate-bounce duration-150' : ''}`}>
                  🔨
                </span>
              </div>
              
              {/* Single coin being worked on */}
              <div className="text-5xl mt-4">
                {craftingState.showCoin && (
                  <span className={`text-yellow-400 ${craftingState.showSparks ? 'animate-pulse duration-200' : ''}`}>
                    🪙
                  </span>
                )}
              </div>
              
              {/* Anvil */}
              <div className="text-3xl mt-2">
                ⚒️
              </div>
            </div>
            
            <div className="space-y-2">
              <p className={`text-xl font-bold ${
                craftingState.isActive ? 'text-orange-400' : 'text-yellow-400'
              }`}>
                {craftingState.isActive ? 
                  `🔨 Hammering Coin - Strike ${craftingState.hammerCount}/5` : 
                  "🔨 Ready for Next Coin"
                }
              </p>
              <p className={`text-lg ${
                craftingState.isActive ? 'text-red-400' : 'text-gray-400'
              }`}>
                {craftingState.isActive ? 
                  "⚡ Crafting in Progress..." : 
                  "Standby Mode - Next crafting cycle starting soon"
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

          {/* Simple Crafting Process */}
          <div className="p-8 bg-gradient-to-r from-gray-900/50 to-yellow-900/50 rounded-xl border-2 border-yellow-500/30">
            <h4 className="text-yellow-400 font-bold mb-6 flex items-center gap-3 text-xl">
              <Hammer className={`h-6 w-6 ${craftingState.showSparks ? 'animate-bounce duration-200' : ''}`} />
              Simple Coin Crafting Process
            </h4>
            <div className="grid grid-cols-5 gap-4 text-center">
              <div className="space-y-3">
                <div className="text-3xl">🔥</div>
                <div className="text-sm">Heat Metal</div>
                <div className={`text-xs ${craftingState.isActive ? 'text-red-400' : 'text-gray-400'}`}>
                  {craftingState.isActive ? 'Hot' : 'Ready'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl">🔨</div>
                <div className="text-sm">Strike 1-2</div>
                <div className={`text-xs ${craftingState.hammerCount >= 1 && craftingState.hammerCount <= 2 ? 'text-orange-400' : 'text-gray-400'}`}>
                  {craftingState.hammerCount >= 1 && craftingState.hammerCount <= 2 ? 'Active' : 'Waiting'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl">⚒️</div>
                <div className="text-sm">Strike 3-4</div>
                <div className={`text-xs ${craftingState.hammerCount >= 3 && craftingState.hammerCount <= 4 ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {craftingState.hammerCount >= 3 && craftingState.hammerCount <= 4 ? 'Active' : 'Waiting'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl">🔨</div>
                <div className="text-sm">Final Strike</div>
                <div className={`text-xs ${craftingState.hammerCount === 5 ? 'text-green-400' : 'text-gray-400'}`}>
                  {craftingState.hammerCount === 5 ? 'Complete!' : 'Waiting'}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl">🪙</div>
                <div className="text-sm">Finished Coin</div>
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
            <Coins className="h-6 w-6" />
            Investor-Powered Production Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-bold text-blue-400 text-lg">Production Formula:</h4>
              <div className="bg-muted/40 p-6 rounded-xl font-mono border-2 border-blue-500/30">
                <div className="text-green-400 text-lg mb-2">🏭 Base Production: 100 coins/month</div>
                <div className="text-blue-400 text-lg mb-2">👥 Investor Bonus: +5 coins per 100 investors</div>
                <div className="text-purple-400 text-lg mb-3">⚡ Simple 5-strike process per coin</div>
                <div className="text-yellow-400 font-bold text-xl border-t border-gray-600 pt-3">
                  🎯 Total Output: {monthlyPotential} coins/month
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-bold text-purple-400 text-lg">Coin Distribution:</h4>
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
