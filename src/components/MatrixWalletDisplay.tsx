
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, TrendingDown, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Transaction {
  id: string
  type: 'input' | 'output'
  amount: string
  hash: string
  timestamp: Date
  status: 'confirmed' | 'pending'
}

export function MatrixWalletDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'input',
      amount: '1,247.50',
      hash: '0x742d35cc...2f5a8',
      timestamp: new Date(Date.now() - 5000),
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'output',
      amount: '500.00',
      hash: '0x9f4e8c2a...2b5d',
      timestamp: new Date(Date.now() - 25000),
      status: 'confirmed'
    }
  ])

  const walletAddress = "ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7"

  // Matrix falling letters animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 400
    canvas.height = 300

    const matrix = 'GAiABURNHARMONY0123456789ABCDEF'
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

  // Update transactions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'input' : 'output',
        amount: (Math.random() * 1000 + 100).toFixed(2),
        hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        timestamp: new Date(),
        status: Math.random() > 0.1 ? 'confirmed' : 'pending'
      }

      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)])
      
      toast.success(`New ${newTransaction.type === 'input' ? 'Input' : 'Output'} Transaction`, {
        description: `${newTransaction.amount} GAiA - ${newTransaction.hash}`,
        duration: 3000
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast.success('Wallet Address Copied!', {
      description: 'GAiA wallet address copied to clipboard',
      duration: 2000
    })
  }

  return (
    <Card className="bg-black/80 backdrop-blur-md border-green-500/30 relative overflow-hidden">
      {/* Logo decoration in background */}
      <div className="absolute top-4 right-4 opacity-10">
        <img 
          src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
          alt="Gaia of Harmony Logo"
          className="w-32 h-32 object-contain"
        />
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Wallet className="h-6 w-6" />
          🌊 MATRIX WALLET DISPLAY - Live Updates Every 5 Seconds
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Wallet Address Box with Matrix Background */}
        <div className="relative bg-black/60 rounded-lg p-4 border border-green-500/30">
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-lg opacity-30"
          />
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-bold">GAiA Wallet Address:</span>
              <Button 
                onClick={copyWalletAddress}
                variant="outline" 
                size="sm"
                className="border-green-500/30 text-green-400"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
            
            <div className="bg-green-900/20 p-3 rounded border border-green-500/20">
              <code className="text-green-300 font-mono text-sm break-all">
                {walletAddress}
              </code>
            </div>
          </div>
        </div>

        {/* Live Transaction Feed */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            Live Transaction Feed (Updated Every 5s)
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
                    tx.type === 'input' ? 'bg-green-600/20' : 'bg-red-600/20'
                  }`}>
                    {tx.type === 'input' ? 
                      <TrendingUp className="h-4 w-4 text-green-400" /> :
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    }
                  </div>
                  
                  <div>
                    <div className="font-bold text-white">
                      {tx.type === 'input' ? '+' : '-'}{tx.amount} GAiA
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {tx.hash}
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
      </CardContent>
    </Card>
  )
}
