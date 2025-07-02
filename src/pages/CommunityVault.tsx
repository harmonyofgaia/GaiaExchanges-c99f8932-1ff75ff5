
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Vault, 
  Lock, 
  DollarSign, 
  Gift, 
  Users,
  MessageSquare,
  Coins,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'

export default function CommunityVault() {
  const [vaultBalance, setVaultBalance] = useState(2847356.78)
  const [depositAmount, setDepositAmount] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Animate vault door opening/closing
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    
    setVaultBalance(prev => prev + parseFloat(depositAmount))
    toast.success(`🏛️ ${depositAmount} GAiA deposited to Community Vault`)
    setDepositAmount('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Vault Header */}
        <Card className="border-gold/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              🏛️ COMMUNITY VAULT
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Secure Community Treasury • Free Giveaways • Quantum Protection
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Animated Vault */}
          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">🏛️ Secure Underground Vault</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Animated Vault Illustration */}
              <div className="relative">
                <div className="text-center space-y-4">
                  <div className="text-8xl animate-pulse">🏛️</div>
                  <div className={`text-6xl transition-transform duration-1000 ${isAnimating ? 'scale-110 rotate-12' : 'scale-100'}`}>
                    🚪
                  </div>
                  <div className="text-4xl">🔒</div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50 rounded-lg"></div>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400">
                    ${vaultBalance.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Vault Balance</div>
                </div>

                <div>
                  <div className="text-sm text-yellow-400 mb-2">Vault Security Level</div>
                  <Progress value={100} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">Quantum Secured</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deposit Interface */}
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">💰 Community Deposits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Deposit Amount (GAiA)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount..."
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-black/30 border-green-500/30"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-green-400">📋 Fee Destination Options:</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400">🌍 Environmental Projects</span>
                        <Badge className="bg-blue-600">30%</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-red-400">❤️ Animal Protection</span>
                        <Badge className="bg-red-600">25%</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">👥 Community Growth</span>
                        <Badge className="bg-purple-600">25%</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">🎁 Free Giveaways</span>
                        <Badge className="bg-green-600">20%</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleDeposit}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Vault className="h-4 w-4 mr-2" />
                  Deposit to Community Vault
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Forum Preview */}
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">💬 Community Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-blue-400">Community Member</span>
                  <Badge className="bg-green-600">Verified</Badge>
                </div>
                <p className="text-muted-foreground">
                  Amazing work on the GAiA ecosystem! Looking forward to the next giveaway 🎉
                </p>
              </div>

              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Gift className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold text-yellow-400">🎁 ADMIN ANNOUNCEMENT</span>
                  <Badge className="bg-yellow-600">Pinned</Badge>
                </div>
                <p className="text-yellow-300">
                  🚨 EXCLUSIVE GIVEAWAY: 10,000 GAiA tokens for active community members! 
                  Stay tuned for more details...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vault Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-green-900/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">847</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Gift className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">23</div>
              <div className="text-sm text-muted-foreground">Giveaways Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">1,247</div>
              <div className="text-sm text-muted-foreground">Forum Messages</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-muted-foreground">Security Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Vault Address Info */}
        <Card className="border-gray-500/30 bg-gray-900/20">
          <CardContent className="p-4">
            <div className="text-center">
              <h4 className="font-bold text-white mb-2">🏛️ Community Vault Address</h4>
              <div className="text-sm text-muted-foreground bg-black/30 p-2 rounded border">
                6DAj3dhtwBDv3HY3UYw1ykjHGRLTU7yMKQmCn8bNoTpW
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All community deposits are secured in this quantum-protected vault
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
