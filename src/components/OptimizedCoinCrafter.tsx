
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { AlertTriangle, Coins, Factory, TrendingDown, TrendingUp } from 'lucide-react'
import { GAIA_TOKEN, GAIA_METRICS } from '@/constants/gaia'

interface SupplyMetrics {
  currentSupply: number
  maxSupply: number
  supplyRatio: number
  needsCrafting: boolean
}

export function OptimizedCoinCrafter() {
  const [supplyMetrics, setSupplyMetrics] = useState<SupplyMetrics>({
    currentSupply: 850000,
    maxSupply: 1000000,
    supplyRatio: 85,
    needsCrafting: false
  })
  
  const [craftingActive, setCraftingActive] = useState(false)
  const [craftingProgress, setCraftingProgress] = useState(0)
  const [lastCraftTime, setLastCraftTime] = useState<Date | null>(null)
  const [totalCrafted, setTotalCrafted] = useState(0)

  // Monitor supply levels and determine if crafting is needed
  useEffect(() => {
    const checkSupplyLevels = () => {
      const ratio = (supplyMetrics.currentSupply / supplyMetrics.maxSupply) * 100
      const needsCrafting = ratio < 75 // Start crafting when supply drops below 75%
      
      setSupplyMetrics(prev => ({
        ...prev,
        supplyRatio: ratio,
        needsCrafting
      }))

      // Simulate supply changes based on market activity
      setSupplyMetrics(prev => ({
        ...prev,
        currentSupply: Math.max(
          prev.currentSupply + (Math.random() - 0.6) * 1000,
          0
        )
      }))
    }

    const interval = setInterval(checkSupplyLevels, 5000)
    return () => clearInterval(interval)
  }, [supplyMetrics.currentSupply, supplyMetrics.maxSupply])

  // Automated crafting when supply is low
  useEffect(() => {
    if (supplyMetrics.needsCrafting && !craftingActive) {
      startAutomatedCrafting()
    }
  }, [supplyMetrics.needsCrafting, craftingActive])

  const startAutomatedCrafting = async () => {
    setCraftingActive(true)
    setCraftingProgress(0)
    
    console.log('🏭 Starting automated coin crafting - Supply low:', supplyMetrics.supplyRatio.toFixed(1), '%')
    
    // Simulate crafting process
    for (let i = 0; i <= 100; i += 5) {
      setCraftingProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    // Calculate coins to craft based on supply deficit
    const deficit = supplyMetrics.maxSupply - supplyMetrics.currentSupply
    const craftAmount = Math.min(deficit * 0.3, 50000) // Craft 30% of deficit, max 50k
    
    setSupplyMetrics(prev => ({
      ...prev,
      currentSupply: prev.currentSupply + craftAmount
    }))
    
    setTotalCrafted(prev => prev + craftAmount)
    setLastCraftTime(new Date())
    setCraftingActive(false)
    setCraftingProgress(0)
    
    console.log('✅ Completed automated crafting:', craftAmount.toLocaleString(), 'GAiA coins')
  }

  const getSupplyStatus = () => {
    if (supplyMetrics.supplyRatio > 90) return { color: 'text-green-400', status: 'Optimal', icon: TrendingUp }
    if (supplyMetrics.supplyRatio > 75) return { color: 'text-yellow-400', status: 'Good', icon: TrendingUp }
    if (supplyMetrics.supplyRatio > 50) return { color: 'text-orange-400', status: 'Low', icon: TrendingDown }
    return { color: 'text-red-400', status: 'Critical', icon: AlertTriangle }
  }

  const status = getSupplyStatus()
  const StatusIcon = status.icon

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Factory className="h-6 w-6" />
          🤖 OPTIMIZED AUTO-CRAFTING SYSTEM
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Intelligent supply monitoring - Only crafts when supply drops below 75%
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Supply Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 font-medium">Current Supply</span>
              <StatusIcon className={`h-5 w-5 ${status.color}`} />
            </div>
            <div className="text-2xl font-bold text-white">
              {supplyMetrics.currentSupply.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              of {supplyMetrics.maxSupply.toLocaleString()} max
            </div>
          </div>

          <div className="bg-black/20 border border-purple-500/20 rounded-lg p-4">
            <div className="text-purple-400 font-medium mb-2">Supply Ratio</div>
            <div className="text-2xl font-bold text-white mb-2">
              {supplyMetrics.supplyRatio.toFixed(1)}%
            </div>
            <Progress 
              value={supplyMetrics.supplyRatio} 
              className="h-2"
            />
          </div>

          <div className="bg-black/20 border border-green-500/20 rounded-lg p-4">
            <div className="text-green-400 font-medium mb-2">System Status</div>
            <Badge className={`${
              supplyMetrics.needsCrafting ? 'bg-orange-600' : 'bg-green-600'
            } text-white mb-2`}>
              {supplyMetrics.needsCrafting ? 'CRAFTING NEEDED' : 'SUPPLY OPTIMAL'}
            </Badge>
            <div className={`text-sm ${status.color}`}>
              Status: {status.status}
            </div>
          </div>
        </div>

        {/* Crafting Status */}
        {(craftingActive || supplyMetrics.needsCrafting) && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-400">
                {craftingActive ? 'Auto-Crafting in Progress...' : 'Low Supply Detected - Auto-Crafting Queued'}
              </span>
            </div>
            
            {craftingActive && (
              <>
                <Progress value={craftingProgress} className="h-3 mb-2" />
                <div className="text-sm text-orange-300">
                  Crafting Progress: {craftingProgress}%
                </div>
              </>
            )}
            
            {!craftingActive && supplyMetrics.needsCrafting && (
              <div className="text-sm text-orange-300">
                Supply ratio below 75% - Automated crafting will begin shortly
              </div>
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
            <div className="text-lg font-bold text-green-400">{totalCrafted.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Auto-Crafted</div>
          </div>
          <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
            <div className="text-lg font-bold text-blue-400">
              {supplyMetrics.needsCrafting ? 'ACTIVE' : 'STANDBY'}
            </div>
            <div className="text-muted-foreground">Crafting Mode</div>
          </div>
          <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
            <div className="text-lg font-bold text-purple-400">75%</div>
            <div className="text-muted-foreground">Trigger Threshold</div>
          </div>
          <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
            <div className="text-lg font-bold text-yellow-400">
              {lastCraftTime ? lastCraftTime.toLocaleTimeString() : 'Never'}
            </div>
            <div className="text-muted-foreground">Last Craft Time</div>
          </div>
        </div>

        {/* Alert for Low Supply */}
        {supplyMetrics.supplyRatio < 50 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">CRITICAL SUPPLY LEVEL</span>
            </div>
            <div className="text-sm text-red-300 mt-2">
              Supply has dropped to {supplyMetrics.supplyRatio.toFixed(1)}%. 
              Automated high-priority crafting is now active.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
