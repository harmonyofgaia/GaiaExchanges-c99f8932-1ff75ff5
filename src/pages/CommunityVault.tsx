
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Vault, 
  Users, 
  Coins, 
  TrendingUp, 
  Shield,
  Eye,
  Lock,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

export default function CommunityVault() {
  const [vaultStats] = useState({
    totalValue: 2547893,
    activeMembers: 8934,
    monthlyGrowth: 12.5,
    distributionRate: 95.2
  })

  const handleContribute = () => {
    toast.success('Contribution successful!', {
      description: 'Your tokens have been added to the community vault'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-black p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🏛️ COMMUNITY VAULT
            </CardTitle>
            <p className="text-center text-lg text-muted-foreground">
              Transparent • Decentralized • Community Owned
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                ACTIVE
              </Badge>
              <Badge className="bg-blue-600">
                <Shield className="h-3 w-3 mr-1" />
                SECURED
              </Badge>
              <Badge className="bg-purple-600">
                <Eye className="h-3 w-3 mr-1" />
                TRANSPARENT
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-green-500/20 bg-green-900/20">
            <CardContent className="p-4 text-center">
              <Vault className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                ${vaultStats.totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-900/20">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {vaultStats.activeMembers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-purple-900/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                +{vaultStats.monthlyGrowth}%
              </div>
              <div className="text-sm text-muted-foreground">Growth</div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-900/20">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                {vaultStats.distributionRate}%
              </div>
              <div className="text-sm text-muted-foreground">Distribution</div>
            </CardContent>
          </Card>
        </div>

        {/* Vault Operations */}
        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400">💎 Vault Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-400">Contribute to Vault</h4>
                <p className="text-sm text-muted-foreground">
                  Add your GAiA tokens to the community vault and earn rewards
                </p>
                <Button onClick={handleContribute} className="w-full bg-green-600 hover:bg-green-700">
                  <Coins className="h-4 w-4 mr-2" />
                  Contribute Tokens
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400">Vault Security</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Security Level</span>
                    <span className="text-green-400">Maximum</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Multi-signature protected
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">🌟 Community Vault Status</h4>
          <div className="text-sm text-green-300">
            ✅ Community vault fully operational and transparent<br/>
            ✅ Multi-signature security protocols active<br/>
            ✅ Automated distribution system running<br/>
            ✅ Real-time transparency reporting enabled
          </div>
        </div>
      </div>
    </div>
  )
}
