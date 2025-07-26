import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Cpu, 
  Shield, 
  Zap, 
  Globe, 
  Database,
  Network,
  Rocket,
  Star,
  Eye,
  Heart,
  ArrowUpDown,
  Coins,
  Activity,
  TrendingUp
} from 'lucide-react'
import { toast } from 'sonner'

// Token configuration for swapping
const supportedTokens = [
  { name: 'Harmony of Gaia', symbol: 'GAiA', icon: '🌍', fee: 0, address: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh' },
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', fee: 0.0001, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', fee: 0.001, address: '0x0000000000000000000000000000000000000000' },
  { name: 'Solana', symbol: 'SOL', icon: '◎', fee: 0.00005, address: 'So11111111111111111111111111111111111111112' },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', fee: 0.17, address: 'addr1...' },
  { name: 'Polkadot', symbol: 'DOT', icon: '●', fee: 0.01, address: '1...' },
]

export default function GaiaPrivateBlockchainSwapToken() {
  // Blockchain metrics state (preserved from original)
  const [blockchainHealth, setBlockchainHealth] = useState(98.7)
  const [totalTransactions, setTotalTransactions] = useState(2847592)
  const [networkNodes, setNetworkNodes] = useState(1247)
  const [securityLevel, setSecurityLevel] = useState(100)

  // Token swap state (new functionality)
  const [fromToken, setFromToken] = useState(supportedTokens[0])
  const [toToken, setToToken] = useState(supportedTokens[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapRate, setSwapRate] = useState(1.0)

  // Real-time updates (preserved from original)
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockchainHealth(prev => Math.min(100, prev + Math.random() * 0.1))
      setTotalTransactions(prev => prev + Math.floor(Math.random() * 50))
      setNetworkNodes(prev => prev + Math.floor(Math.random() * 5))
      
      // Update swap rate
      setSwapRate(prev => {
        const newRate = prev + (Math.random() - 0.5) * 0.01;
        const MIN_RATE = 0.1;
        const MAX_RATE = 10.0;
        return Math.max(MIN_RATE, Math.min(MAX_RATE, newRate));
      });
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Calculate swap amount
  useEffect(() => {
    const parsedAmount = parseFloat(fromAmount)
    if (fromAmount && !isNaN(parsedAmount) && parsedAmount > 0) {
      setToAmount((parsedAmount * swapRate).toFixed(6))
    } else {
      setToAmount('')
    }
  }, [fromAmount, swapRate])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
  }

  // Swap validation function
  const validateSwap = (fromAmount: string, toAmount: string, swapRate: number) => {
    const parsedFromAmount = parseFloat(fromAmount)
    const parsedToAmount = parseFloat(toAmount)
    
    // Basic validation checks
    if (isNaN(parsedFromAmount) || parsedFromAmount <= 0) {
      return { success: false, error: 'Invalid from amount' }
    }
    
    if (isNaN(parsedToAmount) || parsedToAmount <= 0) {
      return { success: false, error: 'Invalid to amount' }
    }
    
    // Rate validation (allow 1% tolerance for floating point precision)
    const expectedToAmount = parsedFromAmount * swapRate
    const tolerance = expectedToAmount * TOLERANCE_PERCENTAGE
    if (Math.abs(parsedToAmount - expectedToAmount) > tolerance) {
      return { success: false, error: 'Invalid swap rate calculation' }
    }
    
    // Check if tokens are different
    if (fromToken.symbol === toToken.symbol) {
      return { success: false, error: 'Cannot swap identical tokens' }
    }
    
    // Minimum swap amount check
    if (parsedFromAmount < MINIMUM_SWAP_AMOUNT) {
      return { success: false, error: 'Amount too small for swap' }
    }
    
    return { success: true, error: null }
  }

  const executeSwap = async () => {
    if (!fromAmount || !toAmount) {
      toast.error('Please enter swap amounts')
      return
    }

    setIsSwapping(true)
    toast.info('Initiating secure blockchain swap...')

    // Simulate blockchain swap process with validation
    setTimeout(() => {
      const swapValidation = validateSwap(fromAmount, toAmount, swapRate)
      if (!swapValidation.success) {
        toast.error(`Swap failed: ${swapValidation.error}`)
        setIsSwapping(false)
        return
      }
      toast.success(`Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`)
      setIsSwapping(false)
      setFromAmount('')
      setToAmount('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
            🔗 GAiA PRIVATE BLOCKCHAIN SWAP TOKEN
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            The World's Most Secure • Dragon-Protected • Quantum-Resistant Blockchain with Advanced Token Swapping
          </p>

          {/* Enhanced Features Tabs */}
          <Tabs defaultValue="blockchain" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 bg-purple-900/30">
              <TabsTrigger value="blockchain" className="text-white">Blockchain Network</TabsTrigger>
              <TabsTrigger value="swap" className="text-white">Token Swap</TabsTrigger>
            </TabsList>

            <TabsContent value="blockchain">
              {/* Original Blockchain Content */}
              <Card className="mb-8 bg-gradient-to-r from-green-900/30 to-blue-900/30 border-2 border-green-500/50">
                <CardContent className="p-8">
                  <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎬</div>
                        <div className="text-2xl font-bold text-green-400 mb-2">
                          GAIA BLOCKCHAIN EXPLAINED
                        </div>
                        <div className="text-lg text-blue-400 mb-4 animate-pulse">
                          Animated Movie Coming Soon...
                        </div>
                        
                        {/* Animated Illustration */}
                        <div className="flex justify-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                          <div className="w-12 h-12 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-12 h-12 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground max-w-md mx-auto">
                          Our private blockchain combines quantum security, dragon-level protection, 
                          and eco-friendly consensus to create the most advanced blockchain network ever built.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-900/30 rounded-lg">
                      <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <div className="font-bold text-green-400">Quantum Secure</div>
                      <div className="text-sm text-muted-foreground">Unbreakable encryption</div>
                    </div>
                    <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                      <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <div className="font-bold text-blue-400">Lightning Fast</div>
                      <div className="text-sm text-muted-foreground">100,000 TPS</div>
                    </div>
                    <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                      <Heart className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <div className="font-bold text-purple-400">Eco-Friendly</div>
                      <div className="text-sm text-muted-foreground">Zero carbon footprint</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="swap">
              {/* New Token Swap Interface */}
              <Card className="mb-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-center text-purple-400 flex items-center justify-center gap-2">
                    <Coins className="h-6 w-6" />
                    SECURE BLOCKCHAIN TOKEN SWAP
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="max-w-md mx-auto space-y-6">
                    {/* From Token */}
                    <div className="space-y-2">
                      <label id="from-token-label" className="text-sm text-muted-foreground">From</label>
                      <div className="flex gap-2">
                        <select 
                          className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={fromToken.symbol}
                          onChange={(e) => setFromToken(supportedTokens.find(t => t.symbol === e.target.value) || supportedTokens[0])}
                          aria-labelledby="from-token-label"
                        >
                          {supportedTokens.map(token => (
                            <option key={token.symbol} value={token.symbol}>
                              {token.icon} {token.symbol}
                            </option>
                          ))}
                        </select>
                        <Input
                          placeholder="0.0"
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleSwapTokens}
                        variant="outline" 
                        size="sm"
                        className="rounded-full p-2"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* To Token */}
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">To</label>
                      <div className="flex gap-2">
                        <select 
                          className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={toToken.symbol}
                          onChange={(e) => setToToken(supportedTokens.find(t => t.symbol === e.target.value) || supportedTokens[0])}
                        >
                          {supportedTokens.map(token => (
                            <option key={token.symbol} value={token.symbol}>
                              {token.icon} {token.symbol}
                            </option>
                          ))}
                        </select>
                        <Input
                          placeholder="0.0"
                          value={toAmount}
                          readOnly
                          className="flex-1 bg-muted"
                        />
                      </div>
                    </div>

                    {/* Swap Rate */}
                    <div className="text-center text-sm text-muted-foreground">
                      Rate: 1 {fromToken.symbol} = {swapRate.toFixed(6)} {toToken.symbol}
                    </div>

                    {/* Execute Swap */}
                    <Button 
                      onClick={executeSwap}
                      disabled={isSwapping || !fromAmount}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isSwapping ? 'Swapping...' : 'Execute Secure Swap'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Blockchain Metrics (preserved from original) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{blockchainHealth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Network Health</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50">
            <CardContent className="p-6 text-center">
              <Network className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{totalTransactions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{networkNodes}</div>
              <div className="text-sm text-muted-foreground">Network Nodes</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/50">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">{securityLevel}%</div>
              <div className="text-sm text-muted-foreground">Security Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Host Information (preserved from original) */}
        <Card className="mb-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-center text-purple-400">
              🌐 GAIA EXCHANGE HOSTING NETWORK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-green-400 mb-2">
                www.gaiaexchanges.net
              </div>
              <div className="text-lg text-blue-400 mb-4">
                Our Private Hosting Infrastructure - Coming Online Soon
              </div>
              <Progress value={85} className="h-4 mb-4" />
              <div className="text-sm text-muted-foreground">
                85% Complete - Full Implementation in Progress
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded-lg">
                <Rocket className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="font-bold text-green-400">99.99% Uptime</div>
                <div className="text-sm text-muted-foreground">Guaranteed availability</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="font-bold text-blue-400">Global CDN</div>
                <div className="text-sm text-muted-foreground">Lightning fast worldwide</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="font-bold text-purple-400">Fort Knox Security</div>
                <div className="text-sm text-muted-foreground">Military-grade protection</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}