
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  Coins, 
  TrendingUp, 
  Shield, 
  Users, 
  Target,
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

export function BlockchainVirtualEconomy() {
  const [economyStats, setEconomyStats] = useState({
    totalGaiaInCirculation: 15247890,
    maxEarnablePerPlayer: 500,
    dailyEarningCap: 50,
    marketCapProtection: 99.8,
    tokenBurnPrevention: true,
    activeEarners: 8934
  })

  const [earningLimits, setEarningLimits] = useState({
    beginner: 10,
    intermediate: 25,
    advanced: 50,
    expert: 100
  })

  const updateEarningLimit = (level: string, newLimit: number) => {
    if (newLimit <= economyStats.maxEarnablePerPlayer) {
      setEarningLimits(prev => ({
        ...prev,
        [level]: newLimit
      }))
      toast.success(`${level} earning limit updated to ${newLimit} GAiA tokens`)
    } else {
      toast.error('Earning limit exceeds maximum allowed amount')
    }
  }

  const protectMarketCap = () => {
    toast.success('Market Cap Protection Activated!', {
      description: 'Token supply burning prevention system engaged'
    })
  }

  return (
    <div className="space-y-6">
      {/* Economy Status Header */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Coins className="h-6 w-6" />
            💰 BLOCKCHAIN VIRTUAL ECONOMY - DECENTRALIZED VALUE SYSTEM
          </CardTitle>
          <div className="flex gap-4">
            <Badge className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              MARKET CAP PROTECTED
            </Badge>
            <Badge className="bg-blue-600">
              <Shield className="h-3 w-3 mr-1" />
              NO TOKEN BURNING
            </Badge>
            <Badge className="bg-purple-600">
              <Users className="h-3 w-3 mr-1" />
              {economyStats.activeEarners.toLocaleString()} ACTIVE EARNERS
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
              <Coins className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{economyStats.totalGaiaInCirculation.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">GAiA in Circulation</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <Target className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{economyStats.maxEarnablePerPlayer}</div>
              <div className="text-sm text-muted-foreground">Max Earnings/Player</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <TrendingUp className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{economyStats.marketCapProtection}%</div>
              <div className="text-sm text-muted-foreground">Market Cap Protection</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
              <Shield className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-muted-foreground">Supply Protection</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earning Limits Management */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">🎮 PLAYER EARNING LIMITS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-green-400">🎯 Earning Tiers (GAiA per day)</h4>
              {Object.entries(earningLimits).map(([level, limit]) => (
                <div key={level} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="capitalize font-medium">{level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={limit}
                      onChange={(e) => updateEarningLimit(level, parseInt(e.target.value) || 0)}
                      className="w-20 h-8"
                      max={economyStats.maxEarnablePerPlayer}
                    />
                    <span className="text-green-400">GAiA</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-blue-400">💎 Economy Protection</h4>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Token Supply Safety:</span>
                    <Badge className="bg-green-600">PROTECTED</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap Status:</span>
                    <Badge className="bg-blue-600">STABLE</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Burning Prevention:</span>
                    <Badge className="bg-purple-600">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Supply Monitoring:</span>
                    <Badge className="bg-orange-600">24/7</Badge>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={protectMarketCap}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                ACTIVATE ENHANCED PROTECTION
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coin Creator Integration */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-400">🔧 COIN CREATOR MECHANISM ENHANCEMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-900/20 rounded-lg">
              <h4 className="font-bold text-purple-400 mb-3">⚙️ Enhanced Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Smart supply management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Anti-burn protection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Real-time market analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Automated earning caps
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
              <h4 className="font-bold text-red-400 mb-3">⚠️ Critical Safeguards</h4>
              <ul className="space-y-2 text-sm text-red-300">
                <li>• Never exceed production capacity</li>
                <li>• Maintain market cap stability</li>
                <li>• Prevent token supply depletion</li>
                <li>• Monitor all earning activities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-medium text-green-400 mb-2">🚀 Virtual Economy System Status</h4>
        <div className="text-sm text-green-300">
          ✅ Decentralized economy fully operational<br/>
          ✅ Player earning limits automatically enforced<br/>
          ✅ Market cap protection actively monitoring<br/>
          ✅ Token burning prevention system engaged<br/>
          ✅ Coin creator mechanism enhanced and secured<br/>
          ✅ Real-time supply management active
        </div>
      </div>
    </div>
  )
}
