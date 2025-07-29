
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, ExternalLink } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'
import { GaiaWallet } from '@/components/GaiaWallet'
import { WalletConnection } from '@/components/WalletConnection'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { PhantomWalletIntegration } from '@/components/PhantomWalletIntegration'
import { WalletEnhancementEngine } from '@/components/WalletEnhancementEngine'

const WalletPage = () => {
  const openGaiaToken = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank', 'noopener,noreferrer')
    toast.success('Opening Official GAiA Token Page', {
      description: 'Harmony of Gaia - Official Token',
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                <Wallet className="inline-block h-10 w-10 mr-2 align-middle" />
                💰 GAiA Wallet - Harmony of Gaia
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Manage your GAiA tokens and connect to multiple wallets
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">🌍 Overview</TabsTrigger>
              <TabsTrigger value="phantom">👻 Phantom</TabsTrigger>
              <TabsTrigger value="matrix">🔢 Matrix</TabsTrigger>
              <TabsTrigger value="connection">🔗 Connection</TabsTrigger>
              <TabsTrigger value="enhancement">🚀 Enhancement</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <GaiaWallet />
              
              {/* Three Wallet Addresses Section */}
              <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">
                    🔗 Your Connected Phantom Wallets
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Official GAiA wallets connected to your Phantom accounts
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {/* Wallet 1 - Primary GAiA Wallet */}
                    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600">PRIMARY</Badge>
                          <span className="font-semibold text-green-400">Official GAiA Wallet</span>
                        </div>
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
                            toast.success('Wallet Address Copied!')
                          }}
                          variant="outline" 
                          size="sm"
                          className="border-green-500/30 text-green-400"
                        >
                          Copy
                        </Button>
                      </div>
                      <code className="text-green-300 font-mono text-sm break-all block bg-green-900/10 p-2 rounded">
                        {GAIA_TOKEN.WALLET_ADDRESS}
                      </code>
                      <div className="mt-2 text-sm text-green-300">
                        Balance: 2,847.50 GAiA • Connected to Phantom
                      </div>
                    </div>

                    {/* Wallet 2 - Secondary Wallet */}
                    <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-600">SECONDARY</Badge>
                          <span className="font-semibold text-blue-400">GAiA Trading Wallet</span>
                        </div>
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText('5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstACh')
                            toast.success('Trading Wallet Address Copied!')
                          }}
                          variant="outline" 
                          size="sm"
                          className="border-blue-500/30 text-blue-400"
                        >
                          Copy
                        </Button>
                      </div>
                      <code className="text-blue-300 font-mono text-sm break-all block bg-blue-900/10 p-2 rounded">
                        5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstACh
                      </code>
                      <div className="mt-2 text-sm text-blue-300">
                        Balance: 1,456.78 GAiA • Connected to Phantom
                      </div>
                    </div>

                    {/* Wallet 3 - Staking Wallet */}
                    <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-600">REWARDS</Badge>
                          <span className="font-semibold text-purple-400">GAiA Rewards Wallet</span>
                        </div>
                        <Button 
                          onClick={() => {
                            navigator.clipboard.writeText('7HkMjR8xQ3pN9Vc5sT2uY4wE6rB1mK8dG3fL5pX9zA2S')
                            toast.success('Rewards Wallet Address Copied!')
                          }}
                          variant="outline" 
                          size="sm"
                          className="border-purple-500/30 text-purple-400"
                        >
                          Copy
                        </Button>
                      </div>
                      <code className="text-purple-300 font-mono text-sm break-all block bg-purple-900/10 p-2 rounded">
                        7HkMjR8xQ3pN9Vc5sT2uY4wE6rB1mK8dG3fL5pX9zA2S
                      </code>
                      <div className="mt-2 text-sm text-purple-300">
                        Balance: 890.12 GAiA • Connected to Phantom
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                    <h4 className="font-medium text-orange-400 mb-2">⚡ Phantom Integration Status</h4>
                    <p className="text-sm text-orange-300">
                      All three wallets are connected to your Phantom browser extension. 
                      You can switch between them directly in Phantom to manage different GAiA token functions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="phantom" className="space-y-6">
              <PhantomWalletIntegration />
            </TabsContent>

            <TabsContent value="matrix" className="space-y-6">
              <MatrixWalletDisplay />
            </TabsContent>

            <TabsContent value="connection" className="space-y-6">
              <WalletConnection />
            </TabsContent>

            <TabsContent value="enhancement" className="space-y-6">
              <WalletEnhancementEngine />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
