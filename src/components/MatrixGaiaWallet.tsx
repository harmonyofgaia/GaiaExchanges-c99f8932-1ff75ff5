
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GAIA_TOKEN } from '@/constants/gaia'

interface MatrixTransaction {
  id: string
  hash: string
  type: 'received' | 'sent' | 'burned' | 'staked' | 'reward'
  amount: number
  timestamp: Date
  status: 'confirmed' | 'pending'
  from: string
  to: string
}

const liveTransactions: MatrixTransaction[] = [
  {
    id: '1',
    hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 16) + '...' + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: 'received',
    amount: 2847.50,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'confirmed',
    from: 'Environmental Reward System',
    to: GAIA_TOKEN.WALLET_ADDRESS
  },
  {
    id: '2',
    hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 16) + '...' + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: 'burned',
    amount: 1250.00,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'confirmed',
    from: GAIA_TOKEN.WALLET_ADDRESS,
    to: 'Ocean Cleanup Burn Address'
  },
  {
    id: '3',
    hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 16) + '...' + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
    type: 'reward',
    amount: 3750.25,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'confirmed',
    from: 'Wildlife Conservation Fund',
    to: GAIA_TOKEN.WALLET_ADDRESS
  }
]

export function MatrixGaiaWallet() {
  const [transactions, setTransactions] = useState<MatrixTransaction[]>(liveTransactions)
  const [matrixCode, setMatrixCode] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate matrix-style falling code effect
  useEffect(() => {
    const chars = '0123456789GAiABURNMATRIXabcdefghijklmnopqrstuvwxyz!@#$%^&*()'
    const interval = setInterval(() => {
      const newCode = Array.from({ length: 80 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      )
      setMatrixCode(newCode)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Matrix canvas animation for TV screen effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    const matrix = '01GAiABURNHARMONYOFCULTURE'
    const matrixArray = matrix.split('')
    const fontSize = 12
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }

    function draw() {
      if (!ctx || !canvas) return
      
      // Create matrix effect with darker fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Matrix green glow
      ctx.fillStyle = '#00ff41'
      ctx.shadowColor = '#00ff41'
      ctx.shadowBlur = 10
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

  // Simulate real-time transaction updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction: MatrixTransaction = {
        id: Date.now().toString(),
        hash: GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 16) + '...' + GAIA_TOKEN.CONTRACT_ADDRESS.slice(-8),
        type: Math.random() > 0.5 ? 'received' : 'reward',
        amount: Math.random() * 5000 + 100,
        timestamp: new Date(),
        status: 'confirmed',
        from: Math.random() > 0.5 ? 'Environmental System' : 'Harmony Pool',
        to: GAIA_TOKEN.WALLET_ADDRESS
      }
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'received': return 'text-green-400'
      case 'sent': return 'text-blue-400'
      case 'burned': return 'text-orange-400'
      case 'staked': return 'text-purple-400'
      case 'reward': return 'text-emerald-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* TV Screen Frame */}
      <div className="absolute inset-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl border-4 border-gray-700">
        {/* Screen Bezel */}
        <div className="absolute inset-2 bg-black rounded-2xl overflow-hidden">
          {/* Matrix Background Canvas */}
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60"
          />
          
          {/* Screen Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-black/20">
            <Card className="h-full bg-transparent border-green-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-green-400 animate-pulse mb-2">
                  🌍 GAiA MATRIX WALLET
                </CardTitle>
                <div className="text-green-300 text-lg font-mono">
                  LIVE TRANSACTION MATRIX • HARMONY OF CULTURE
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge className="bg-green-600 animate-pulse">PUMP.FUN CONNECTED</Badge>
                  <Badge className="bg-blue-600">BALANCE: {GAIA_TOKEN.TOTAL_SUPPLY.toLocaleString()} GAiA</Badge>
                  <Badge className="bg-purple-600">MATRIX ACTIVE</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="px-8">
                {/* Live Transaction Feed */}
                <div className="space-y-3 max-h-96 overflow-hidden">
                  <h3 className="text-xl font-bold text-green-400 flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    LIVE TRANSACTION MATRIX FEED
                  </h3>
                  
                  {transactions.map((tx, index) => (
                    <div 
                      key={tx.id}
                      className="relative group bg-black/60 border border-green-500/30 rounded-lg p-4 hover:border-green-500/60 transition-all duration-300"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        filter: 'drop-shadow(0 0 5px rgba(0, 255, 65, 0.3))'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className={`${getTransactionColor(tx.type)} border-current font-mono`}
                            >
                              {tx.type.toUpperCase()}
                            </Badge>
                            <code className="text-xs text-green-400 font-mono bg-black/40 px-2 py-1 rounded">
                              {tx.hash}
                            </code>
                          </div>
                          <div className="text-sm text-green-300 font-mono">
                            {tx.type === 'received' ? 'FROM' : 'TO'}: {tx.type === 'received' ? tx.from : tx.to}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-bold font-mono ${getTransactionColor(tx.type)}`} style={{textShadow: '0 0 10px currentColor'}}>
                            {tx.type === 'received' || tx.type === 'reward' ? '+' : '-'}{tx.amount.toLocaleString()} GAiA
                          </div>
                          <div className="text-xs text-green-400 font-mono">
                            {tx.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* GAiA Token Info Display */}
                <div className="mt-8 bg-gradient-to-r from-green-900/40 to-blue-900/40 border border-green-500/30 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-sm text-green-300 mb-1">CONTRACT ADDRESS</div>
                      <code className="text-xs text-green-400 break-all font-mono bg-black/40 px-2 py-1 rounded">
                        {GAIA_TOKEN.CONTRACT_ADDRESS}
                      </code>
                    </div>
                    <div>
                      <div className="text-sm text-blue-300 mb-1">WALLET ADDRESS</div>
                      <code className="text-xs text-blue-400 break-all font-mono bg-black/40 px-2 py-1 rounded">
                        {GAIA_TOKEN.WALLET_ADDRESS}
                      </code>
                    </div>
                    <div>
                      <div className="text-sm text-purple-300 mb-1">PUMP.FUN INTEGRATION</div>
                      <div className="text-purple-400 font-mono text-lg">ACTIVE</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* TV Screen Glow Effects */}
        <div className="absolute -inset-4 bg-green-400/5 rounded-3xl blur-xl" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-green-400/20 rounded-full" />
      </div>
    </div>
  )
}
