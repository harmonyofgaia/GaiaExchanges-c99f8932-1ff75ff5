import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { tokenWarfare } from '@/services/tokenWarfare'
import { Coins, Shield, Zap, Target, TrendingUp, DollarSign } from 'lucide-react'

export function TokenWarfareDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    tokensGenerated: 0,
    marketValue: 0,
    economicWarfare: 0,
    liquidityPools: 0,
    tradingBots: 0
  })

  useEffect(() => {
    const updateStatus = () => {
      setStatus(tokenWarfare.getTokenWarfareStatus())
    }

    const interval = setInterval(updateStatus, 2000)
    updateStatus()

    return () => clearInterval(interval)
  }, [])

  const handleInitializeTokenWarfare = async () => {
    try {
      await tokenWarfare.initializeTokenWarfareSystem()
      toast.success('💰 Token Warfare System Activated')
    } catch (error) {
      toast.error('Failed to initialize token warfare')
    }
  }

  const handleGenerateUtilityToken = async () => {
    try {
      await tokenWarfare.generateUtilityToken({
        name: 'SecureToken',
        symbol: 'SECTK',
        totalSupply: 1000000,
        utilities: ['governance', 'staking', 'access_control']
      })
    } catch (error) {
      toast.error('Failed to generate utility token')
    }
  }

  const handleDeployLiquidityPool = async () => {
    try {
      await tokenWarfare.deployLiquidityPool({
        tokenA: 'SECTK',
        tokenB: 'ETH',
        initialLiquidityA: 100000,
        initialLiquidityB: 50,
        feeStructure: 'dynamic'
      })
    } catch (error) {
      toast.error('Failed to deploy liquidity pool')
    }
  }

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-6 w-6 text-primary" />
          Phase 4: Token Warfare & Economic Domination
          <Badge variant={status.isActive ? "default" : "secondary"}>
            {status.isActive ? "ACTIVE" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Tokens Generated</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.tokensGenerated}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Market Value</span>
            </div>
            <div className="text-2xl font-bold text-primary">${status.marketValue.toLocaleString()}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Economic Warfare</span>
            </div>
            <Progress value={status.economicWarfare} className="mt-2" />
            <div className="text-sm text-muted-foreground">{status.economicWarfare}% Dominance</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Liquidity Pools</span>
            </div>
            <div className="text-xl font-bold">{status.liquidityPools} Active</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Trading Bots</span>
            </div>
            <div className="text-xl font-bold">{status.tradingBots} Running</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeTokenWarfare} size="sm">
            <Target className="h-4 w-4 mr-2" />
            Initialize Token Warfare
          </Button>
          
          <Button onClick={handleGenerateUtilityToken} variant="outline" size="sm">
            <Coins className="h-4 w-4 mr-2" />
            Generate Utility Token
          </Button>
          
          <Button onClick={handleDeployLiquidityPool} variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Deploy Liquidity Pool
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Active Economic Weapons</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Smart Contract Fortress</Badge>
            <Badge variant="default">DeFi Integration Engine</Badge>
            <Badge variant="default">Economic Manipulation Matrix</Badge>
            <Badge variant="default">Liquidity Mining Protocol</Badge>
            <Badge variant="default">Token Distribution Network</Badge>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🏦 Economic Domination Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Our token warfare system provides unparalleled economic control through 
            advanced DeFi protocols, strategic token generation, and market manipulation 
            resistance. Complete financial sovereignty achieved.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}