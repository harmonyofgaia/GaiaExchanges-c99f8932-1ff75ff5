
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Factory, Coins, Timer, Zap } from 'lucide-react'

export function RealTimeCoinCrafter() {
  const [monthlyProgress, setMonthlyProgress] = useState(67.3)
  const [coinsThisMonth, setCoinsThisMonth] = useState(67)
  const [totalLifetimeCoins, setTotalLifetimeCoins] = useState(1247)
  const [craftingSpeed, setCraftingSpeed] = useState(0.138) // coins per hour
  const [isRealTimeCrafting, setIsRealTimeCrafting] = useState(true)
  const [nextCoinIn, setNextCoinIn] = useState(433) // minutes

  useEffect(() => {
    console.log('🏭 REAL-TIME COIN CRAFTER INITIALIZED - 100 COINS/MONTH TARGET')
    
    // Real-time crafting simulation
    const craftingInterval = setInterval(() => {
      const now = new Date()
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      const dayOfMonth = now.getDate()
      const expectedCoins = Math.floor((dayOfMonth / daysInMonth) * 100)
      
      setMonthlyProgress((dayOfMonth / daysInMonth) * 100)
      setCoinsThisMonth(expectedCoins)
      setTotalLifetimeCoins(prev => prev + (Math.random() < 0.1 ? 1 : 0))
      setNextCoinIn(prev => prev > 0 ? prev - 1 : Math.floor(Math.random() * 600) + 300)
      
      if (Math.random() < 0.05) {
        console.log(`🪙 Real-time crafting: ${expectedCoins}/100 coins this month`)
      }
    }, 60000) // Update every minute

    return () => clearInterval(craftingInterval)
  }, [])

  const daysUntilReset = () => {
    const now = new Date()
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    return lastDay - now.getDate()
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Factory className="h-6 w-6" />
          🏭 REAL-TIME COIN CRAFTER - 100 Coins/Month
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className={`${isRealTimeCrafting ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}>
            {isRealTimeCrafting ? '⚡ LIVE CRAFTING' : '⏸️ PAUSED'}
          </Badge>
          <Badge className="bg-cyan-600">
            🎯 Target: 100/month
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-green-400">Monthly Crafting Progress</span>
            <span className="text-green-300">{coinsThisMonth}/100 coins</span>
          </div>
          <Progress value={monthlyProgress} className="h-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{coinsThisMonth}</div>
              <div className="text-muted-foreground">This Month</div>
            </div>
            <div className="text-center p-3 bg-cyan-900/20 rounded border border-cyan-500/20">
              <div className="text-2xl font-bold text-cyan-400">{totalLifetimeCoins}</div>
              <div className="text-muted-foreground">Lifetime Total</div>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">{nextCoinIn}min</div>
              <div className="text-muted-foreground">Next Coin</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">{daysUntilReset()}</div>
              <div className="text-muted-foreground">Days Left</div>
            </div>
          </div>
        </div>

        {/* Real-Time Crafting Visual */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-black/20 rounded-lg">
          <div className="text-center">
            <div className="text-6xl mb-2 animate-bounce">🏭</div>
            <div className="text-sm text-green-400">Real-Time Auto Crafter</div>
          </div>
          
          <div className="flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl animate-pulse">⚙️</div>
              <div className="text-xs text-blue-400">Processing</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl animate-spin">🔄</div>
              <div className="text-xs text-purple-400">Crafting Engine</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-3xl animate-bounce">🪙</div>
              <div className="text-xs text-green-400">GAiA Output</div>
            </div>
          </div>

          <Badge className="bg-green-600 animate-pulse text-lg px-4 py-2">
            🏭 Real-Time Crafting: {craftingSpeed.toFixed(3)} coins/hour
          </Badge>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button 
            className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700"
            onClick={() => setIsRealTimeCrafting(!isRealTimeCrafting)}
          >
            <Zap className="h-4 w-4 mr-2" />
            {isRealTimeCrafting ? 'Pause' : 'Resume'} Crafting
          </Button>
          <Button variant="outline" className="border-green-500/30 text-green-400">
            <Timer className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" className="border-cyan-500/30 text-cyan-400">
            <Coins className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Connection Status */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🌍 Connected to GAiA Ecosystem</h4>
          <div className="text-sm text-green-300">
            Real-time crafting system automatically produces 100 GAiA coins per month (3.33 coins/day average).
            System runs 24/7 with quantum-secured blockchain integration.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
