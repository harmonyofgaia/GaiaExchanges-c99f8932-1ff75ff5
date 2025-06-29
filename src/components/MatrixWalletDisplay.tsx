
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, TrendingDown, Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { GAIA_TOKEN, formatGaiaPrice } from '@/constants/gaia'

interface Transaction {
  id: string
  type: 'input' | 'output' | 'burn' | 'stake' | 'reward'
  amount: string
  hash: string
  timestamp: Date
  status: 'confirmed' | 'pending'
  from?: string
  to?: string
}

export function MatrixWalletDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'reward',
      amount: '2,847.50',
      hash: '0x742d35cc...2f5a8',
      timestamp: new Date(Date.now() - 5000),
      status: 'confirmed',
      from: 'Environmental Reward System',
      to: GAIA_TOKEN.WALLET_ADDRESS
    },
    {
      id: '2',
      type: 'burn',
      amount: '1,250.00',
      hash: '0x9f4e8c2a...2b5d',
      timestamp: new Date(Date.now() - 25000),
      status: 'confirmed',
      from: GAIA_TOKEN.WALLET_ADDRESS,
      to: 'Ocean Cleanup Burn Address'
    }
  ])

  // Matrix falling letters animation with GAiA theme
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const matrix = 'HARMONY0OF0GAIA0ECO0BURN0REWARD0123456789ABCDEF'
    const matrixArray = matrix.split('')
    const fontSize = 12
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const animationId = setInterval(draw, 50)
    return () => clearInterval(animationId)
  }, [])

  // Update transactions every 5 seconds with GAiA-specific data
  useEffect(() => {
    const interval = setInterval(() => {
      const transactionTypes = ['input', 'output', 'burn', 'stake', 'reward'] as const
      const sources = [
        'Environmental Reward System',
        'Ocean Cleanup Project',
        'Carbon Credit Exchange',
        'Renewable Energy Pool',
        'Ecosystem Restoration',
        'Wildlife Conservation Fund'
      ]
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
        amount: (Math.random() * 5000 + 100).toFixed(2),
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        timestamp: new Date(),
        status: Math.random() > 0.1 ? 'confirmed' : 'pending',
        from: Math.random() > 0.5 ? sources[Math.floor(Math.random() * sources.length)] : GAIA_TOKEN.WALLET_ADDRESS,
        to: Math.random() > 0.5 ? GAIA_TOKEN.WALLET_ADDRESS : 'Harmony of Gaia Ecosystem'
      }

      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)])
      
      toast.success(`🌍 New ${newTransaction.type.toUpperCase()} Transaction`, {
        description: `${newTransaction.amount} GAiA - ${newTransaction.hash}`,
        duration: 3000
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAiA Contract Address Copied!', {
      description: 'Harmony of Gaia contract address copied to clipboard',
      duration: 2000
    })
  }

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('GAiA Wallet Address Copied!', {
      description: 'Harmony of Gaia wallet address copied to clipboard',
      duration: 2000
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
    toast.success('Opening Harmony of Gaia on Pump.fun!', {
      description: 'World\'s #1 ecological project - Leading the future',
      duration: 3000
    })
  }

  return (
    <Card className="bg-black/80 backdrop-blur-md border-green-500/30 relative overflow-hidden">
      {/* Harmony of Gaia logo decoration in background */}
      <div className="absolute top-4 right-4 opacity-10">
        <img 
          src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
          alt="Harmony of Gaia Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Wallet className="h-6 w-6" />
          🌍 HARMONY OF GAIA MATRIX - Live Ecological Transactions
        </CardTitle>
        <p className="text-muted-foreground">
          World's #1 Ecological Project • Real Environmental Impact • Live Updates Every 5 Seconds
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Contract & Wallet Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative bg-black/60 rounded-lg p-4 border border-green-500/30">
            <canvas 
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-lg opacity-30"
            />
            
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold">🌍 GAiA Contract:</span>
                <div className="flex gap-2">
                  <Button 
                    onClick={copyContractAddress}
                    variant="outline" 
                    size="sm"
                    className="border-green-500/30 text-green-400"
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
              
              <div className="bg-green-900/20 p-3 rounded border border-green-500/20">
                <code className="text-green-300 font-mono text-sm break-all">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
            </div>
          </div>

          <div className="relative bg-black/60 rounded-lg p-4 border border-blue-500/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold">🏦 GAiA Wallet:</span>
                <Button 
                  onClick={copyWalletAddress}
                  variant="outline" 
                  size="sm"
                  className="border-blue-500/30 text-blue-400"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              
              <div className="bg-blue-900/20 p-3 rounded border border-blue-500/20">
                <code className="text-blue-300 font-mono text-sm break-all">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Live Transaction Feed */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            🌍 Live Harmony of Gaia Transactions (Updated Every 5s)
          </h3>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {transactions.map((tx, index) => (
              <div 
                key={tx.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-500 ${
                  index === 0 ? 'border-yellow-500/50 bg-yellow-900/10' : 'border-green-500/20 bg-black/20'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'input' || tx.type === 'reward' ? 'bg-green-600/20' : 
                    tx.type === 'output' ? 'bg-blue-600/20' :
                    tx.type === 'burn' ? 'bg-orange-600/20' :
                    'bg-purple-600/20'
                  }`}>
                    {tx.type === 'input' || tx.type === 'reward' ? 
                      <TrendingUp className="h-4 w-4 text-green-400" /> :
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    }
                  </div>
                  
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      {tx.type === 'input' || tx.type === 'reward' ? '+' : '-'}{tx.amount} GAiA
                      {tx.type === 'burn' && <span className="text-orange-400">🔥</span>}
                      {tx.type === 'reward' && <span className="text-green-400">🌍</span>}
                      {tx.type === 'stake' && <span className="text-purple-400">💎</span>}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {tx.hash}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tx.type === 'input' || tx.type === 'reward' ? 'From' : 'To'}: {
                        tx.type === 'input' || tx.type === 'reward' ? tx.from : tx.to
                      }
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge 
                    className={
                      tx.status === 'confirmed' ? 
                      'bg-green-500/20 text-green-400' : 
                      'bg-yellow-500/20 text-yellow-400'
                    }
                  >
                    {tx.status.toUpperCase()}
                  </Badge>
                  <div className="text-xs text-gray-400 mt-1">
                    {tx.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Harmony of Gaia Status */}
        <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-green-400 mb-2">🌍 HARMONY OF GAIA STATUS</h4>
            <p className="text-sm text-muted-foreground mb-4">
              World's Leading Ecological Project • Real Environmental Impact • Future of Sustainability
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs text-muted-foreground">Ecological Impact</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">LIVE</div>
                <div className="text-xs text-muted-foreground">Real-time Burns</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">∞</div>
                <div className="text-xs text-muted-foreground">Innovation Level</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
