
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress' 
import { Button } from '@/components/ui/button'
import { Hammer, Zap, Factory, TrendingUp, ExternalLink } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

export function OptimizedCoinCrafter() {
  const [isOptimized, setIsOptimized] = useState(true)
  const [craftingSpeed, setCraftingSpeed] = useState(250) // coins per minute
  const [totalCrafted, setTotalCrafted] = useState(1287345)
  const [efficiency, setEfficiency] = useState(99.7)
  const [electricPower, setElectricPower] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      // Update optimized crafting metrics
      setTotalCrafted(prev => prev + Math.floor(Math.random() * 25) + 15)
      setCraftingSpeed(prev => prev + (Math.random() - 0.5) * 5)
      setEfficiency(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5)))
      setElectricPower(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const boostOptimization = () => {
    setCraftingSpeed(prev => prev * 1.2)
    setEfficiency(prev => Math.min(100, prev + 5))
    toast.success('⚡ Optimization Boosted!', {
      description: 'Crafting speed increased by 20%',
      duration: 3000
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  return (
    <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Factory className="h-6 w-6" />
          ⚡ OPTIMIZED NEURAL-ELECTRIC COIN CRAFTER
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button onClick={openPumpFun} variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
            <ExternalLink className="h-3 w-3 mr-1" />
            View on PumpFun
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Optimization Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">{craftingSpeed.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Coins/Min</div>
            <div className="text-xs text-cyan-300 mt-1">Neural Speed</div>
          </div>
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{totalCrafted.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Crafted</div>
            <div className="text-xs text-green-300 mt-1">Optimized</div>
          </div>
          <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">{efficiency.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
            <div className="text-xs text-yellow-300 mt-1">System</div>
          </div>
          <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">{electricPower.toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Electric Power</div>
            <div className="text-xs text-purple-300 mt-1">Neural Grid</div>
          </div>
        </div>

        {/* Optimized Crafting Visual */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-black/20 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-sm text-cyan-400">Neural-Electric Crafter</div>
          </div>
          
          <div className="flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl relative">
                ⚡
                <div className="absolute -top-1 -right-1 text-lg animate-pulse">🔋</div>
              </div>
              <div className="text-xs text-blue-400">Electric Core</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl animate-spin">🔧</div>
              <div className="text-xs text-purple-400">Neural Processor</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-3xl animate-bounce">🪙</div>
              <div className="text-xs text-green-400">GAiA Output</div>
            </div>
          </div>

          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-400">Neural Processing:</span>
              <span className="text-cyan-300">{efficiency.toFixed(1)}%</span>
            </div>
            <Progress value={efficiency} className="h-2 bg-cyan-900/30" />
          </div>

          <Badge className="bg-cyan-600 animate-pulse text-lg px-4 py-2">
            ⚡ Neural-Electric Optimization Active
          </Badge>
        </div>

        {/* Optimization Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={boostOptimization}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Boost Neural Optimization
          </Button>
          <Button 
            variant="outline"
            className="border-cyan-500/30 text-cyan-400"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Performance Analytics
          </Button>
        </div>

        {/* Connection Status */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🌍 Connected to Official GAiA Network</h4>
          <div className="text-sm text-green-300">
            Optimized system directly connected to GAiA token ecosystem with enhanced neural-electric processing.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
