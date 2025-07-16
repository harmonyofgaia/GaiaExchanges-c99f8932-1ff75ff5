
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wallet, 
  Shield, 
  Zap, 
  TrendingUp, 
  Copy, 
  Check, 
  ArrowUpDown,
  Settings,
  Activity,
  DollarSign,
  Globe,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

export function WalletConnector() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [balance, setBalance] = useState(0)
  const [copied, setCopied] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState('solana')

  const gaiaWalletAddress = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'

  const handleConnectWallet = async () => {
    try {
      // Simulate wallet connection
      setIsConnected(true)
      setWalletAddress('7xKz...9mN4') // Simulated address
      setBalance(2847.65)
      toast.success('🎉 Wallet connected successfully!')
    } catch (error) {
      toast.error('Failed to connect wallet. Please try again.')
    }
  }

  const handleDisconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
    setBalance(0)
    toast.success('Wallet disconnected')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Address copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSwapToGaia = () => {
    toast.success('🚀 Swap to GAiA token initiated!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          💰 GAiA WALLET CONNECTION ENGINE
        </h1>
        <p className="text-center text-muted-foreground text-lg">
          Connect your wallet securely and manage your GAiA tokens with quantum-level security
        </p>
      </div>

      {!isConnected ? (
        <Card className="max-w-2xl mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-green-400 flex items-center justify-center gap-2">
              <Wallet className="h-6 w-6" />
              Connect Your Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Network Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-center">Select Network:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setSelectedNetwork('solana')}
                  className={`h-16 flex-col ${
                    selectedNetwork === 'solana' 
                      ? 'bg-purple-600 border-2 border-purple-400' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">◉</div>
                  <span className="text-xs">Solana</span>
                </Button>
                <Button
                  onClick={() => setSelectedNetwork('ethereum')}
                  className={`h-16 flex-col ${
                    selectedNetwork === 'ethereum' 
                      ? 'bg-blue-600 border-2 border-blue-400' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">Ξ</div>
                  <span className="text-xs">Ethereum</span>
                </Button>
                <Button
                  onClick={() => setSelectedNetwork('bsc')}
                  className={`h-16 flex-col ${
                    selectedNetwork === 'bsc' 
                      ? 'bg-yellow-600 border-2 border-yellow-400' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">🔶</div>
                  <span className="text-xs">BSC</span>
                </Button>
                <Button
                  onClick={() => setSelectedNetwork('polygon')}
                  className={`h-16 flex-col ${
                    selectedNetwork === 'polygon' 
                      ? 'bg-purple-600 border-2 border-purple-400' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">⬢</div>
                  <span className="text-xs">Polygon</span>
                </Button>
              </div>
            </div>

            {/* Connection Button */}
            <Button
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-16 text-lg"
            >
              <Wallet className="h-6 w-6 mr-3" />
              Connect Wallet ({selectedNetwork.toUpperCase()})
            </Button>

            {/* Security Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-bold text-green-400">Quantum Security</div>
                <div className="text-xs text-muted-foreground">256-bit encryption</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm font-bold text-blue-400">Lightning Fast</div>
                <div className="text-xs text-muted-foreground">0.2s transactions</div>
              </div>
              <div className="text-center p-4 bg-purple-900/20 border border-purple-500/20 rounded-lg">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-bold text-purple-400">Multi-Chain</div>
                <div className="text-xs text-muted-foreground">All networks</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Connected Wallet Status */}
          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-6 w-6" />
                  Wallet Connected
                </div>
                <Badge className="bg-green-600 animate-pulse">ACTIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Wallet Address:</div>
                  <div className="flex items-center gap-2">
                    <code className="bg-black/20 px-2 py-1 rounded text-sm">{walletAddress}</code>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(walletAddress)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Balance:</div>
                  <div className="text-2xl font-bold text-green-400">{balance.toLocaleString()} GAiA</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Network:</div>
                  <Badge className="bg-purple-600 text-white">{selectedNetwork.toUpperCase()}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Actions */}
          <Tabs defaultValue="trade" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trade">💰 Trade</TabsTrigger>
              <TabsTrigger value="stake">📈 Stake</TabsTrigger>
              <TabsTrigger value="history">📊 History</TabsTrigger>
              <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="trade">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-blue-500/30 bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="text-blue-400">🔄 Quick Swap to GAiA</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">From:</label>
                      <div className="flex gap-2">
                        <Input placeholder="0.0" className="flex-1" />
                        <select className="px-3 py-2 bg-background border border-input rounded-md">
                          <option>SOL</option>
                          <option>ETH</option>
                          <option>BNB</option>
                          <option>MATIC</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <ArrowUpDown className="h-6 w-6 text-muted-foreground mx-auto" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">To GAiA:</label>
                      <Input placeholder="0.0" readOnly className="bg-gray-800" />
                    </div>
                    
                    <Button
                      onClick={handleSwapToGaia}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Swap to GAiA
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-green-500/30 bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-green-400">📈 GAiA Token Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Token Price:</span>
                        <span className="font-bold text-green-400">$0.0247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>24h Change:</span>
                        <span className="font-bold text-green-400">+12.47%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Cap:</span>
                        <span className="font-bold text-blue-400">$2.8M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Supply:</span>
                        <span className="font-bold text-purple-400">100M GAiA</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-green-500/20">
                      <div className="text-sm text-muted-foreground mb-2">Official Contract:</div>
                      <div className="flex items-center gap-2">
                        <code className="bg-black/20 px-2 py-1 rounded text-xs break-all">
                          {gaiaWalletAddress}
                        </code>
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(gaiaWalletAddress)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stake">
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">📈 Stake GAiA Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-muted-foreground">Amount to Stake:</label>
                        <Input placeholder="Enter GAiA amount" />
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Stake GAiA Tokens
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-purple-400">Staking Benefits:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>APY Rate:</span>
                          <span className="font-bold text-green-400">24.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lock Period:</span>
                          <span className="text-yellow-400">30 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rewards Paid:</span>
                          <span className="text-blue-400">Daily</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Stake:</span>
                          <span className="text-purple-400">100 GAiA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="border-cyan-500/30 bg-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">📊 Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-900/20 rounded border border-green-500/20">
                      <div>
                        <div className="font-bold text-green-400">Swap: SOL → GAiA</div>
                        <div className="text-xs text-muted-foreground">2 hours ago</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">+1,247 GAiA</div>
                        <div className="text-xs text-muted-foreground">-2.5 SOL</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-900/20 rounded border border-blue-500/20">
                      <div>
                        <div className="font-bold text-blue-400">Stake Reward</div>
                        <div className="text-xs text-muted-foreground">1 day ago</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">+12.47 GAiA</div>
                        <div className="text-xs text-muted-foreground">Daily reward</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-900/20 rounded border border-purple-500/20">
                      <div>
                        <div className="font-bold text-purple-400">Stake: GAiA</div>
                        <div className="text-xs text-muted-foreground">3 days ago</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-400">500 GAiA</div>
                        <div className="text-xs text-muted-foreground">Staked</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="border-orange-500/30 bg-orange-900/20">
                <CardHeader>
                  <CardTitle className="text-orange-400">⚙️ Wallet Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-orange-400">Security Settings:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Two-Factor Auth:</span>
                          <Badge className="bg-green-600">ENABLED</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Transaction Signing:</span>
                          <Badge className="bg-green-600">REQUIRED</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Auto-Lock:</span>
                          <Badge className="bg-yellow-600">5 MIN</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-orange-400">Notifications:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Transaction Alerts:</span>
                          <Badge className="bg-green-600">ON</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Price Alerts:</span>
                          <Badge className="bg-green-600">ON</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Staking Rewards:</span>
                          <Badge className="bg-green-600">ON</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-orange-500/20">
                    <Button
                      onClick={handleDisconnectWallet}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Disconnect Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
