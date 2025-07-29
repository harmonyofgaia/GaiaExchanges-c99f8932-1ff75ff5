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
    totalSupply: 0,
    burnedTokens: 0,
    stakingTiers: 0,
    activeProposals: 0,
    protectedPools: 0,
    tokenMechanisms: 0
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

  const handleCreateTokenMechanism = async () => {
    try {
      await tokenWarfare.initializeTokenWarfareSystem()
    } catch (error) {
      toast.error('Failed to create token mechanism')
    }
  }

  const handleCreateLiquidityPool = async () => {
    try {
      await tokenWarfare.protectLiquidityPool('pool-1')
    } catch (error) {
      toast.error('Failed to create liquidity pool')
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
              <span className="text-sm font-medium">Total Supply</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.totalSupply.toLocaleString()}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Burned Tokens</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.burnedTokens.toLocaleString()}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Proposals</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.activeProposals}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Staking Tiers</span>
            </div>
            <div className="text-xl font-bold">{status.stakingTiers}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Protected Pools</span>
            </div>
            <div className="text-xl font-bold">{status.protectedPools}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeTokenWarfare} size="sm">
            <Target className="h-4 w-4 mr-2" />
            Initialize Token Warfare
          </Button>
          
          <Button onClick={handleCreateTokenMechanism} variant="outline" size="sm">
            <Coins className="h-4 w-4 mr-2" />
            Create Token Mechanism
          </Button>
          
          <Button onClick={handleCreateLiquidityPool} variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Create Liquidity Pool
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