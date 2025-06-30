
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wallet, Send, Receive, History, Shield } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'
import { GAIA_TOKEN } from '@/constants/gaia'

const WalletPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                💰 GAiA Wallet
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Secure, Fast, and Environmentally Conscious
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Wallet className="h-6 w-6" />
                  Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400">1,247.89</div>
                    <div className="text-sm text-muted-foreground">GAiA Tokens</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">$2,495.78</div>
                    <div className="text-sm text-muted-foreground">USD Value</div>
                  </div>
                  <Badge className="bg-green-600">
                    +12.5% (24h)
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send GAiA
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Receive className="h-4 w-4 mr-2" />
                    Receive GAiA
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <History className="h-4 w-4 mr-2" />
                    Transaction History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Shield className="h-6 w-6" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>2FA Enabled</span>
                    <Badge className="bg-green-600">✓</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Backup Created</span>
                    <Badge className="bg-green-600">✓</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Wallet Encrypted</span>
                    <Badge className="bg-green-600">✓</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-cyan-900/30 rounded">
                  <div>
                    <div className="font-bold">Gaming Reward</div>
                    <div className="text-sm text-muted-foreground">2 hours ago</div>
                  </div>
                  <div className="text-green-400 font-bold">+25 GAiA</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-900/30 rounded">
                  <div>
                    <div className="font-bold">Environmental Contribution</div>
                    <div className="text-sm text-muted-foreground">1 day ago</div>
                  </div>
                  <div className="text-red-400 font-bold">-50 GAiA</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-900/30 rounded">
                  <div>
                    <div className="font-bold">Token Purchase</div>
                    <div className="text-sm text-muted-foreground">3 days ago</div>
                  </div>
                  <div className="text-green-400 font-bold">+500 GAiA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
