import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wallet, Send, Download, History, Shield, Copy, ExternalLink } from 'lucide-react'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'
import { MatrixTransactionWallet } from '@/components/MatrixTransactionWallet'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const WalletPage = () => {
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Official GAiA Wallet Address Copied!', {
      description: 'Official GAiA wallet address copied to clipboard',
      duration: 3000
    })
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAiA Contract Address Copied!', {
      description: 'GAiA contract address copied to clipboard',
      duration: 3000
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  // Matrix wallet addresses as requested
  const greenInvestmentsWallet = 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7'
  const communityVault = '6DAj3dhtwBDv3HY3UYw1ykjHGRLTU7yMKQmCn8bNoTpW'
  const animalWelfareWallet = 'GRboWoafk4CYZyiuFtB84wT8DCswmhQtYthpGg31yJEf'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                💰 Official GAiA Wallet
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Connected to Official GAiA Token - {GAIA_TOKEN.NAME}
              </p>
            </CardHeader>
          </Card>

          {/* Matrix Wallet Displays - 4 Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Matrix Wallet 1 - Official GAiA */}
            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-black">
              <CardHeader>
                <CardTitle className="text-green-400 text-center">🌍 OFFICIAL GAIA MATRIX</CardTitle>
              </CardHeader>
              <CardContent>
                <MatrixWalletDisplay />
              </CardContent>
            </Card>

            {/* Matrix Wallet 2 - Green Investments */}
            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-black">
              <CardHeader>
                <CardTitle className="text-green-400 text-center">🌱 GREEN INVESTMENTS MATRIX</CardTitle>
              </CardHeader>
              <CardContent>
                <MatrixWalletDisplay />
                <div className="space-y-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400 mb-2">GREEN INVESTMENTS WALLET</div>
                    <div className="font-mono text-sm bg-green-900/20 p-2 rounded border border-green-500/20">
                      {greenInvestmentsWallet}
                    </div>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(greenInvestmentsWallet)
                        toast.success('Green Investments Address Copied!')
                      }}
                      className="mt-2 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Address
                    </Button>
                  </div>
                  <div className="text-center text-sm text-green-300">
                    Real-time environmental project investments with full transparency
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matrix Wallet 3 - Community Vault */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-black">
              <CardHeader>
                <CardTitle className="text-purple-400 text-center">🏦 COMMUNITY VAULT MATRIX</CardTitle>
              </CardHeader>
              <CardContent>
                <MatrixWalletDisplay />
                <div className="space-y-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400 mb-2">COMMUNITY VAULT</div>
                    <div className="font-mono text-sm bg-purple-900/20 p-2 rounded border border-purple-500/20">
                      {communityVault}
                    </div>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(communityVault)
                        toast.success('Community Vault Address Copied!')
                      }}
                      className="mt-2 bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Address
                    </Button>
                  </div>
                  <div className="text-center text-sm text-purple-300">
                    Secure community investments with instant transparency
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Matrix Wallet 4 - Animal Welfare */}
            <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/30 to-black">
              <CardHeader>
                <CardTitle className="text-orange-400 text-center">🐾 ANIMAL WELFARE MATRIX</CardTitle>
              </CardHeader>
              <CardContent>
                <MatrixWalletDisplay />
                <div className="space-y-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-400 mb-2">ANIMAL WELFARE WALLET</div>
                    <div className="font-mono text-sm bg-orange-900/20 p-2 rounded border border-orange-500/20">
                      {animalWelfareWallet}
                    </div>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(animalWelfareWallet)
                        toast.success('Animal Welfare Address Copied!')
                      }}
                      className="mt-2 bg-orange-600 hover:bg-orange-700"
                      size="sm"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Address
                    </Button>
                  </div>
                  <div className="text-center text-sm text-orange-300">
                    Direct animal protection funding with complete transparency
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Transaction Matrix Display */}
          <Card className="mb-8 border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-center">📺 LIVE TRANSACTION MATRIX - FULL TRANSPARENCY</CardTitle>
            </CardHeader>
            <CardContent>
              <MatrixTransactionWallet />
            </CardContent>
          </Card>

          {/* Official GAiA Wallet Address */}
          <Card className="mb-8 border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🌍 Official GAiA Wallet Connection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-bold">Official GAiA Wallet Address:</span>
                  <div className="flex gap-2">
                    <Button 
                      onClick={copyWalletAddress}
                      variant="outline" 
                      size="sm"
                      className="border-blue-500/30 text-blue-400"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    <Button 
                      onClick={openPumpFun}
                      variant="outline" 
                      size="sm"
                      className="border-purple-500/30 text-purple-400"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Pump.fun
                    </Button>
                  </div>
                </div>
                <code className="text-blue-300 font-mono text-sm break-all block bg-blue-900/10 p-2 rounded">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </code>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 font-bold">GAiA Contract Address:</span>
                  <Button 
                    onClick={copyContractAddress}
                    variant="outline" 
                    size="sm"
                    className="border-purple-500/30 text-purple-400"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <code className="text-purple-300 font-mono text-sm break-all block bg-purple-900/10 p-2 rounded">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-green-400 font-bold mb-2">Official GAiA Token Details:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Symbol:</span>
                    <span className="text-green-400 font-bold ml-2">{GAIA_TOKEN.SYMBOL}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Network:</span>
                    <span className="text-green-400 font-bold ml-2">{GAIA_TOKEN.NETWORK}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="text-green-400 font-bold ml-2">{GAIA_TOKEN.NAME}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Decimals:</span>
                    <span className="text-green-400 font-bold ml-2">{GAIA_TOKEN.DECIMALS}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Wallet className="h-6 w-6" />
                  Official GAiA Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400">Connected</div>
                    <div className="text-sm text-muted-foreground">to Official GAiA Token</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">Live Trading</div>
                    <div className="text-sm text-muted-foreground">on Pump.fun</div>
                  </div>
                  <Badge className="bg-green-600">
                    ✅ OFFICIAL TOKEN
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Official GAiA Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send GAiA
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Receive GAiA
                  </Button>
                  <Button 
                    onClick={openPumpFun}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Trade on Pump.fun
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Shield className="h-6 w-6" />
                  Official GAiA Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Official Token</span>
                    <Badge className="bg-green-600">✓</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Contract</span>
                    <Badge className="bg-green-600">✓</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Pump.fun Listed</span>
                    <Badge className="bg-green-600">✓</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Official Warning */}
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-400">⚠️ Official GAiA Token Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-yellow-300 font-bold">{GAIA_TOKEN.OFFICIAL_DISCLAIMER}</p>
                <p className="text-muted-foreground">{GAIA_TOKEN.BRAND_STATEMENT}</p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={copyWalletAddress}
                    variant="outline" 
                    className="border-yellow-500/30 text-yellow-400"
                  >
                    Copy Official Address
                  </Button>
                  <Button 
                    onClick={openPumpFun}
                    variant="outline" 
                    className="border-yellow-500/30 text-yellow-400"
                  >
                    Verify on Pump.fun
                  </Button>
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
