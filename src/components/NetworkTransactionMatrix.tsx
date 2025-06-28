
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Network, Globe, TrendingUp, TrendingDown, Activity, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface NetworkTransaction {
  id: string
  hash: string
  type: 'buy' | 'sell' | 'transfer' | 'burn' | 'mint'
  amount: number
  price: number
  fromWallet: string
  toWallet: string
  timestamp: Date
  status: 'confirmed' | 'pending'
  networkFee: number
}

const mockNetworkTransactions: NetworkTransaction[] = [
  {
    id: '1',
    hash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    type: 'buy',
    amount: 2500.75,
    price: 3.12,
    fromWallet: 'Binance Exchange',
    toWallet: 'Community Holder #1247',
    timestamp: new Date(Date.now() - 30 * 1000),
    status: 'confirmed',
    networkFee: 0.001
  },
  {
    id: '2',
    hash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a',
    type: 'sell',
    amount: 1850.25,
    price: 3.15,
    fromWallet: 'Early Investor Wallet',
    toWallet: 'Pump.fun DEX',
    timestamp: new Date(Date.now() - 120 * 1000),
    status: 'confirmed',
    networkFee: 0.002
  },
  {
    id: '3',
    hash: '0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2',
    type: 'burn',
    amount: 500.00,
    price: 3.10,
    fromWallet: 'Harmony of Gaia Treasury',
    toWallet: 'Ocean Cleanup Burn Address',
    timestamp: new Date(Date.now() - 240 * 1000),
    status: 'confirmed',
    networkFee: 0.0005
  }
]

export function NetworkTransactionMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [networkTransactions, setNetworkTransactions] = useState<NetworkTransaction[]>(mockNetworkTransactions)
  const [totalVolume, setTotalVolume] = useState(0)
  const [activeWallets, setActiveWallets] = useState(0)

  // Enhanced Matrix Animation with GAIA Network theme
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 500
    canvas.height = 400

    const matrix = 'GAIA♦NETWORK♦BUY♦SELL♦BURN♦MINT♦0123456789ABCDEF'
    const matrixArray = matrix.split('')
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return
      
      // Create trailing effect with slight transparency
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Different colors for different parts of the matrix
      const colors = ['#00ff41', '#0099ff', '#ff6600', '#ff0066', '#9900ff']
      
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        const colorIndex = Math.floor(i / 5) % colors.length
        ctx.fillStyle = colors[colorIndex]
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const animationId = setInterval(draw, 40)
    return () => clearInterval(animationId)
  }, [])

  // Simulate real-time network transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const transactionTypes: NetworkTransaction['type'][] = ['buy', 'sell', 'transfer', 'burn', 'mint']
      const randomType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
      
      const newTransaction: NetworkTransaction = {
        id: Date.now().toString(),
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        type: randomType,
        amount: Math.random() * 5000 + 100,
        price: 3.00 + (Math.random() - 0.5) * 0.5,
        fromWallet: randomType === 'buy' ? 'Exchange Wallet' : `Holder Wallet #${Math.floor(Math.random() * 9999)}`,
        toWallet: randomType === 'sell' ? 'Exchange Pool' : `Community Wallet #${Math.floor(Math.random() * 9999)}`,
        timestamp: new Date(),
        status: Math.random() > 0.1 ? 'confirmed' : 'pending',
        networkFee: Math.random() * 0.005
      }

      setNetworkTransactions(prev => [newTransaction, ...prev.slice(0, 19)])
      
      // Update stats
      setTotalVolume(prev => prev + (newTransaction.amount * newTransaction.price))
      setActiveWallets(prev => prev + (Math.random() > 0.7 ? 1 : 0))
      
      toast.success(`🌊 Network ${newTransaction.type.toUpperCase()}`, {
        description: `${newTransaction.amount.toFixed(2)} GAIA - $${(newTransaction.amount * newTransaction.price).toFixed(2)}`,
        duration: 2000
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'buy': return 'text-green-400'
      case 'sell': return 'text-red-400'
      case 'transfer': return 'text-blue-400'
      case 'burn': return 'text-orange-400'
      case 'mint': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy': return '📈'
      case 'sell': return '📉'
      case 'transfer': return '🔄'
      case 'burn': return '🔥'
      case 'mint': return '⚡'
      default: return '•'
    }
  }

  return (
    <Card className="bg-black/90 backdrop-blur-md border-cyan-500/30 relative overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/8 to-blue-500/12" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-cyan-400/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-blue-400/10 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Network className="h-6 w-6" />
          🌊 GAIA NETWORK TRANSACTION MATRIX - Live Global Activity
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <Badge className="bg-green-500/20 text-green-400">
            <Globe className="h-3 w-3 mr-1" />
            Network Wide
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400">
            <Activity className="h-3 w-3 mr-1" />
            Live Updates Every 3s
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400">
            <Eye className="h-3 w-3 mr-1" />
            Full Transparency
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-6">
        {/* Network Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400 font-mono">
              ${totalVolume.toLocaleString()}
            </div>
            <p className="text-sm text-cyan-300">24H Volume</p>
          </div>
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
            <div className="text-2xl font-bold text-green-400 font-mono">
              {activeWallets.toLocaleString()}
            </div>
            <p className="text-sm text-green-300">Active Wallets</p>
          </div>
          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400 font-mono">
              {networkTransactions.length}
            </div>
            <p className="text-sm text-purple-300">Live Transactions</p>
          </div>
        </div>

        {/* Enhanced Matrix Background Canvas */}
        <div className="relative bg-black/60 rounded-lg p-4 border border-cyan-500/30">
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-lg opacity-40"
          />
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                🌐 Global GAIA Network Activity
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                className="border-cyan-500/30 text-cyan-400"
                onClick={() => window.open('https://pump.fun/coin/t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump', '_blank')}
              >
                View on Pump.fun
              </Button>
            </div>
            
            {/* Live Network Transaction Feed */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {networkTransactions.map((tx, index) => (
                <div 
                  key={tx.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${
                    index === 0 ? 'border-yellow-500/50 bg-yellow-900/10 animate-pulse' : 'border-cyan-500/20 bg-black/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-lg ${getTransactionColor(tx.type)}`}>
                      {getTransactionIcon(tx.type)}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${getTransactionColor(tx.type)} border-current text-xs`}
                        >
                          {tx.type.toUpperCase()}
                        </Badge>
                        <span className="text-white font-bold font-mono">
                          {tx.amount.toLocaleString()} GAIA
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {tx.hash.slice(0, 16)}...{tx.hash.slice(-8)}
                      </div>
                      <div className="text-xs text-gray-300">
                        From: {tx.fromWallet.length > 25 ? `${tx.fromWallet.slice(0, 25)}...` : tx.fromWallet}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold font-mono ${getTransactionColor(tx.type)}`}>
                      ${(tx.amount * tx.price).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      @${tx.price.toFixed(3)}
                    </div>
                    <Badge 
                      className={
                        tx.status === 'confirmed' ? 
                        'bg-green-500/20 text-green-400 text-xs' : 
                        'bg-yellow-500/20 text-yellow-400 text-xs'
                      }
                    >
                      {tx.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Network Information */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-lg p-4">
          <h4 className="text-cyan-300 font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            GAIA Network Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Network Status:</span>
                <span className="text-green-400">🟢 Fully Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Supply:</span>
                <span className="text-cyan-400">1,000,000,000 GAIA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Burned Tokens:</span>
                <span className="text-orange-400">25,847,392 GAIA</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Price:</span>
                <span className="text-green-400">$3.00 (+2.5%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Cap:</span>
                <span className="text-purple-400">$2.9B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Liquidity Pool:</span>
                <span className="text-blue-400">$15.7M</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
