
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Hammer, Coins, Zap } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'

export function AnimatedCoinCrafting() {
  const [hammerStrikes, setHammerStrikes] = useState(0)
  const [isCrafting, setIsCrafting] = useState(false)
  const [coinsBeing Crafted, setCoinsBeing Crafted] = useState(0)
  const [totalCrafted, setTotalCrafted] = useState(125847)

  useEffect(() => {
    const startCraftingCycle = () => {
      if (isCrafting) return
      
      console.log('🔨 Starting coin crafting cycle')
      setIsCrafting(true)
      setHammerStrikes(0)
      setCoinsBeing Crafted(Math.floor(Math.random() * 15) + 5)
      
      // Hammer strikes (5 strikes per cycle)
      const strikeInterval = setInterval(() => {
        setHammerStrikes(prev => {
          const newStrike = prev + 1
          console.log(`🔨 Hammer strike ${newStrike}/5`)
          
          if (newStrike >= 5) {
            clearInterval(strikeInterval)
            setTimeout(() => {
              setTotalCrafted(prev => prev + coinsBeing Crafted)
              setIsCrafting(false)
              setHammerStrikes(0)
              console.log('✅ Coin crafting cycle complete')
            }, 1000)
          }
          
          return newStrike
        })
      }, 1000)
    }

    // Start first cycle immediately, then repeat every 8 seconds
    startCraftingCycle()
    const craftingInterval = setInterval(startCraftingCycle, 8000)

    return () => {
      clearInterval(craftingInterval)
    }
  }, [coinsBeing Crafted, isCrafting])

  const hammerProgress = (hammerStrikes / 5) * 100

  return (
    <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-orange-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Hammer className="h-6 w-6" />
          🔨 Official GAiA Coin Crafting Animation - Connected to {GAIA_TOKEN.CONTRACT_ADDRESS}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Simple Crafting Illustration */}
        <div className="flex flex-col items-center space-y-6 p-8 bg-black/20 rounded-lg">
          {/* Person with Hammer */}
          <div className="relative">
            <div className="text-6xl mb-4">🧑‍🔧</div>
            <div 
              className={`absolute -top-2 -right-2 text-4xl transition-all duration-300 ${
                isCrafting && hammerStrikes > 0 ? 'scale-125 rotate-45' : 'scale-100 rotate-0'
              }`}
            >
              🔨
            </div>
          </div>

          {/* Single Coin Being Crafted */}
          <div className="flex items-center justify-center">
            <div 
              className={`text-8xl transition-all duration-500 ${
                isCrafting ? 'animate-pulse scale-110' : 'scale-100'
              }`}
            >
              🪙
            </div>
          </div>

          {/* Hammer Progress */}
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-orange-400">Hammer Strikes:</span>
              <span className="text-orange-300">{hammerStrikes}/5</span>
            </div>
            <Progress value={hammerProgress} className="h-3 bg-orange-900/30" />
          </div>

          {/* Status */}
          <div className="text-center">
            <Badge 
              className={`text-lg px-4 py-2 ${
                isCrafting 
                  ? 'bg-orange-600 animate-pulse' 
                  : 'bg-green-600'
              }`}
            >
              {isCrafting 
                ? `🔨 Crafting ${coinsBeing Crafted} GAiA Coins...` 
                : '✅ Ready for Next Craft'
              }
            </Badge>
          </div>
        </div>

        {/* Crafting Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{totalCrafted.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total GAiA Crafted</div>
          </div>
          <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">{coinsBeing Crafted}</div>
            <div className="text-sm text-muted-foreground">Current Batch</div>
          </div>
          <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">5</div>
            <div className="text-sm text-muted-foreground">Strikes Per Coin</div>
          </div>
        </div>

        {/* Official Token Info */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🌍 Connected to Official GAiA Token</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-green-300">Official Wallet:</div>
              <div className="font-mono text-xs text-green-400 break-all">{GAIA_TOKEN.WALLET_ADDRESS}</div>
            </div>
            <div>
              <div className="text-purple-300">Contract Address:</div>
              <div className="font-mono text-xs text-purple-400 break-all">{GAIA_TOKEN.CONTRACT_ADDRESS}</div>
            </div>
          </div>
        </div>

        {/* Process Description */}
        <div className="text-center space-y-2">
          <h4 className="text-lg font-semibold text-orange-400">🔨 Simple Crafting Process</h4>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our craftsperson uses a powerful hammer to forge new GAiA coins. Each coin requires exactly 5 precise strikes to achieve perfect quality. 
            The process repeats automatically every 8 seconds, continuously supplying the official GAiA ecosystem.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400">90% of all fees go to project reinvestment</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
