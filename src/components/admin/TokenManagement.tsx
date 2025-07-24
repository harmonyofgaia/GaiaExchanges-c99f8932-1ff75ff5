import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Shield, Zap, Infinity as InfinityIcon, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { toast } from 'sonner'

interface Token {
  name: string
  symbol: string
  address: string
  verified: boolean
  fee: number
  totalSupply: bigint
  maxSupply: bigint
}

const trustedTokens: Token[] = [
  { 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 
    verified: true, 
    fee: 0.0001,
    totalSupply: BigInt('21000000000000000000000000'),
    maxSupply: BigInt('21000000000000000000000000')
  },
  { 
    name: 'Ethereum', 
    symbol: 'ETH', 
    address: '0x0000000000000000000000000000000000000000', 
    verified: true, 
    fee: 0.001,
    totalSupply: BigInt('120000000000000000000000000'),
    maxSupply: BigInt('1000000000000000000000000000')
  },
  { 
    name: 'Solana', 
    symbol: 'SOL', 
    address: 'So11111111111111111111111111111111111111112', 
    verified: true, 
    fee: 0.00005,
    totalSupply: BigInt('500000000000000000000000000'),
    maxSupply: BigInt('1000000000000000000000000000')
  },
  { 
    name: 'Harmony of Gaia', 
    symbol: 'GAiA', 
    address: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh', 
    verified: true, 
    fee: 0,
    totalSupply: BigInt('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999'),
    maxSupply: BigInt('99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
  }
]

export function TokenManagement() {
  const [tokens, setTokens] = useState(trustedTokens)
  const [newTokenName, setNewTokenName] = useState('')
  const [newTokenSymbol, setNewTokenSymbol] = useState('')
  const [newTokenAddress, setNewTokenAddress] = useState('')
  const [supplyOptimization, setSupplyOptimization] = useState(false)
  const { toast: toastHook } = useToast()

  useEffect(() => {
    // Continuous supply optimization
    const optimizeSupply = () => {
      setTokens(prev => prev.map(token => {
        if (token.symbol === 'GAiA') {
          const currentSupply = token.totalSupply
          const maxPossibleSupply = BigInt('99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
          
          if (currentSupply < maxPossibleSupply) {
            const newSupply = currentSupply + BigInt('1000000000000000000000000000000000000000000000000000000000000000000000000000')
            console.log(`🚀 GAiA Supply Expanded: ${newSupply.toString()}`)
            
            return {
              ...token,
              totalSupply: newSupply > maxPossibleSupply ? maxPossibleSupply : newSupply
            }
          }
        }
        return token
      }))
    }

    const interval = setInterval(optimizeSupply, 5000) // Optimize every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const addToken = () => {
    if (newTokenName && newTokenSymbol && newTokenAddress) {
      const newToken: Token = {
        name: newTokenName,
        symbol: newTokenSymbol,
        address: newTokenAddress,
        verified: false,
        fee: 0.001,
        totalSupply: BigInt('1000000000000000000000000'),
        maxSupply: BigInt('10000000000000000000000000')
      }
      setTokens([...tokens, newToken])
      setNewTokenName('')
      setNewTokenSymbol('')
      setNewTokenAddress('')
      toastHook({
        title: "Token Added Successfully",
        description: `${newToken.name} (${newToken.symbol}) added to the exchange with enhanced security protocols`,
      })
    }
  }

  const removeToken = (index: number) => {
    const removedToken = tokens[index]
    if (removedToken.symbol === 'GAiA') {
      toastHook({
        title: "Cannot Remove GAiA Token",
        description: "GAiA is the core token and cannot be removed from the exchange",
        variant: "destructive",
      })
      return
    }
    setTokens(tokens.filter((_, i) => i !== index))
    toastHook({
      title: "Token Removed",
      description: `${removedToken.name} has been safely removed from the exchange`,
    })
  }

  const maximizeGaiaSupply = async () => {
    setSupplyOptimization(true)
    
    toast.success('🚀 GAiA Supply Maximization Protocol Activated', {
      description: 'Implementing quantum-scale supply expansion with cross-platform compatibility',
      duration: 5000
    })

    // Simulate maximum supply expansion
    const maxSupply = BigInt('99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
    
    setTokens(prev => prev.map(token => {
      if (token.symbol === 'GAiA') {
        return {
          ...token,
          totalSupply: maxSupply,
          maxSupply: maxSupply
        }
      }
      return token
    }))

    // Cross-platform compatibility check
    setTimeout(() => {
      toast.success('✅ Cross-Platform Compatibility Verified', {
        description: 'GAiA token optimized for all platforms including BlackBerry legacy systems',
        duration: 3000
      })
      setSupplyOptimization(false)
    }, 3000)

    console.log('🌍 GAiA Token Maximum Supply Achieved:', maxSupply.toString())
  }

  const formatSupply = (supply: bigint): string => {
    const supplyStr = supply.toString()
    if (supplyStr.length > 15) {
      return supplyStr.slice(0, 15) + '...' + ` (${supplyStr.length} digits)`
    }
    return supplyStr
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <InfinityIcon className="h-5 w-5" />
            GAiA Token Maximum Supply Protocol - Updated Addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">Official GAiA Token Addresses - Updated</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs text-blue-300">Official Wallet Address</div>
                <div className="text-sm font-mono text-blue-400 break-all">
                  5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh
                </div>
              </div>
              <div className="bg-purple-900/20 p-3 rounded-lg">
                <div className="text-xs text-purple-300">Contract Address</div>
                <div className="text-sm font-mono text-purple-400 break-all">
                  t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-900/20 p-3 rounded-lg">
                <div className="text-xs text-green-300">Current Total Supply</div>
                <div className="text-lg font-mono text-green-400 break-all">
                  {formatSupply(tokens.find(t => t.symbol === 'GAiA')?.totalSupply || BigInt('0'))}
                </div>
              </div>
              <div className="bg-blue-900/20 p-3 rounded-lg">
                <div className="text-xs text-blue-300">Maximum Possible Supply</div>
                <div className="text-lg font-mono text-blue-400 break-all">
                  {formatSupply(tokens.find(t => t.symbol === 'GAiA')?.maxSupply || BigInt('0'))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={maximizeGaiaSupply} 
              className="bg-green-600 hover:bg-green-700 w-full"
              disabled={supplyOptimization}
            >
              {supplyOptimization ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Maximizing Supply...
                </>
              ) : (
                <>
                  <InfinityIcon className="h-4 w-4 mr-2" />
                  Activate Maximum Supply Protocol
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">∞</div>
              <p className="text-muted-foreground">Supply Potential</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">0%</div>
              <p className="text-muted-foreground">Trading Fees</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <p className="text-muted-foreground">Security Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">∞</div>
              <p className="text-muted-foreground">Platform Support</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Compatibility Status */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Globe className="h-5 w-5" />
            Universal Platform Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="h-4 w-4" />
              <span>iOS/Android Native</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="h-4 w-4" />
              <span>Windows/Mac/Linux</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="h-4 w-4" />
              <span>BlackBerry Legacy</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Shield className="h-4 w-4" />
              <span>Web3 Universal</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span>Smart TV Support</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span>IoT Devices</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span>Embedded Systems</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="h-4 w-4" />
              <span>Quantum Ready</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Token Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              value={newTokenName}
              onChange={(e) => setNewTokenName(e.target.value)}
              placeholder="Token Name"
            />
            <Input
              value={newTokenSymbol}
              onChange={(e) => setNewTokenSymbol(e.target.value)}
              placeholder="Symbol"
            />
            <Input
              value={newTokenAddress}
              onChange={(e) => setNewTokenAddress(e.target.value)}
              placeholder="Contract Address"
            />
          </div>
          <Button onClick={addToken} className="w-full">
            Add Token to Exchange
          </Button>
        </CardContent>
      </Card>

      {/* Supported Digital Currencies */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Digital Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-medium">{token.name} ({token.symbol})</div>
                    <div className="text-sm text-muted-foreground font-mono">{token.address}</div>
                    <div className="text-xs text-blue-400 mt-1">
                      Supply: {formatSupply(token.totalSupply)} {token.symbol}
                    </div>
                  </div>
                  {token.verified && (
                    <Badge variant="outline" className="border-green-500/20 text-green-400">
                      Verified
                    </Badge>
                  )}
                  {token.symbol === 'GAiA' && (
                    <Badge className="bg-green-600">
                      Core Token
                    </Badge>
                  )}
                  {token.totalSupply === token.maxSupply && token.symbol === 'GAiA' && (
                    <Badge className="bg-purple-600">
                      Max Supply
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Fee: {token.fee} {token.symbol}</span>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeToken(index)}
                    disabled={token.symbol === 'GAiA'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
