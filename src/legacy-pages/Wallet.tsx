import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, CreditCard, TrendingUp, Shield, ExternalLink, Copy } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const WalletPage = () => {
  const openGaiaToken = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank', 'noopener,noreferrer')
    toast.success('Opening Official GAiA Token Page', {
      description: 'Harmony of Gaia - Official Token',
      duration: 3000
    })
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`, {
      duration: 2000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                💰 GAiA Wallet - Harmony of Gaia
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Secure Digital Wallet for the Official GAiA Token
              </p>
              <div className="text-center mt-4">
                <Button onClick={openGaiaToken} className="bg-green-600 hover:bg-green-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Official GAiA Token: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 8)}...
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">💼 Overview</TabsTrigger>
              <TabsTrigger value="transactions">📊 Transactions</TabsTrigger>
              <TabsTrigger value="staking">🔒 Staking</TabsTrigger>
              <TabsTrigger value="security">🛡️ Security</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-green-500/30 bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <Wallet className="h-6 w-6" />
                      GAiA Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      1,234.56 GAiA
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ≈ $2,469.12 USD
                    </div>
                    <Button 
                      onClick={() => copyToClipboard(GAIA_TOKEN.CONTRACT_ADDRESS, 'Contract Address')}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Contract Address
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <TrendingUp className="h-6 w-6" />
                      Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      $2,469.12
                    </div>
                    <div className="text-sm text-green-400">
                      +12.5% (24h)
                    </div>
                    <Badge className="bg-blue-600 mt-4">
                      Harmony of Gaia Official
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/30 bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      <Shield className="h-6 w-6" />
                      Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      SECURE
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Multi-signature enabled
                    </div>
                    <Badge className="bg-purple-600 mt-4">
                      Quantum Protected
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-green-500/30 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400">🌍 Official Harmony of Gaia Token Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Token Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {GAIA_TOKEN.NAME}</p>
                        <p><strong>Symbol:</strong> {GAIA_TOKEN.SYMBOL}</p>
                        <p><strong>Network:</strong> {GAIA_TOKEN.NETWORK}</p>
                        <p><strong>Contract:</strong> <code className="text-blue-400">{GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...</code></p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">Wallet Features</h4>
                      <div className="space-y-1 text-sm">
                        <p>• Real-time GAiA token tracking</p>
                        <p>• Secure multi-signature support</p>
                        <p>• Environmental impact dashboard</p>
                        <p>• Cross-platform synchronization</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card className="border-blue-500/30 bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">Received GAiA</div>
                        <div className="text-sm text-muted-foreground">From: 0x1234...5678</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">+100.00 GAiA</div>
                        <div className="text-sm text-muted-foreground">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">Sent GAiA</div>
                        <div className="text-sm text-muted-foreground">To: 0x9876...5432</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-400">-50.00 GAiA</div>
                        <div className="text-sm text-muted-foreground">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staking" className="space-y-6">
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">GAiA Staking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">Staking Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Earn rewards by staking your GAiA tokens and supporting the Harmony of Gaia ecosystem.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="border-red-500/30 bg-red-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <Shield className="h-6 w-6" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">Extra security for your wallet</div>
                      </div>
                      <Badge className="bg-green-600">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">Biometric Lock</div>
                        <div className="text-sm text-muted-foreground">Fingerprint/Face ID protection</div>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-semibold">Multi-Signature</div>
                        <div className="text-sm text-muted-foreground">Require multiple confirmations</div>
                      </div>
                      <Badge className="bg-green-600">Configured</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/20">
                <CardHeader>
                  <CardTitle className="text-orange-400">⚠️ Security Notice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-300 mb-3">
                    Always verify you're using the official Harmony of Gaia wallet. 
                    Our official GAiA token contract is: <code className="text-blue-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
                  </p>
                  <p className="text-orange-300">
                    🚫 This is NOT GAIA Everworld or any other GAIA token. We are the official 
                    Harmony of Gaia community token. Never share your private keys or seed phrase.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
