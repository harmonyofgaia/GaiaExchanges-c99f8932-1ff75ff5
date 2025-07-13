
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Activity, DollarSign, ArrowUpRight, ArrowDownLeft, Clock, Eye } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'

interface Transaction {
  id: string
  type: 'incoming' | 'outgoing'
  amount: number
  hash: string
  timestamp: Date
  from: string
  to: string
  status: 'confirmed' | 'pending'
}

export function LiveWalletMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState(0)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Simulate live blockchain monitoring
    const generateTransaction = (): Transaction => {
      const isIncoming = Math.random() > 0.5
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: isIncoming ? 'incoming' : 'outgoing',
        amount: Math.random() * 1000000,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        timestamp: new Date(),
        from: isIncoming ? `0x${Math.random().toString(16).substr(2, 40)}` : GAIA_TOKEN.WALLET_ADDRESS,
        to: isIncoming ? GAIA_TOKEN.WALLET_ADDRESS : `0x${Math.random().toString(16).substr(2, 40)}`,
        status: Math.random() > 0.2 ? 'confirmed' : 'pending'
      }
    }

    // Add initial transactions
    const initialTxs = Array.from({ length: 5 }, generateTransaction)
    setTransactions(initialTxs)

    // Simulate live updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new transaction
        const newTx = generateTransaction()
        setTransactions(prev => [newTx, ...prev.slice(0, 9)]) // Keep last 10
        
        // Update balance
        setBalance(prev => {
          const change = newTx.type === 'incoming' ? newTx.amount : -newTx.amount
          return Math.max(0, prev + change)
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatAmount = (amount: number) => {
    return amount.toLocaleString(undefined, { maximumFractionDigits: 4 })
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-cyan-900/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-green-400">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            🔴 LIVE WALLET MONITOR - GAiA Token
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${isLive ? 'bg-green-600 animate-pulse' : 'bg-red-600'} text-white`}>
              {isLive ? '🟢 LIVE' : '🔴 OFFLINE'}
            </Badge>
            <Button onClick={() => setIsLive(!isLive)} variant="outline" size="sm">
              <Eye className="h-3 w-3 mr-1" />
              {isLive ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </CardTitle>
        <div className="text-sm text-green-300">
          Monitoring: {formatAddress(GAIA_TOKEN.WALLET_ADDRESS)}
        </div>
      </CardHeader>
      <CardContent>
        {/* Balance Display */}
        <div className="mb-6 p-4 bg-black/40 rounded-lg border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Current Balance</div>
              <div className="text-3xl font-bold text-green-400">
                {formatAmount(balance)} {GAIA_TOKEN.SYMBOL}
              </div>
            </div>
            <DollarSign className="h-12 w-12 text-green-400" />
          </div>
        </div>

        {/* Live Transactions */}
        <div className="space-y-3">
          <h4 className="font-bold text-cyan-400 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Live Transactions Stream
          </h4>
          
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              Monitoring for transactions...
            </div>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className={`p-3 rounded-lg border transition-all duration-500 ${
                  tx.type === 'incoming'
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-red-900/20 border-red-500/30'
                } hover:bg-opacity-40`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {tx.type === 'incoming' ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`font-bold ${
                      tx.type === 'incoming' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.type === 'incoming' ? 'Received' : 'Sent'}
                    </span>
                  </div>
                  <Badge className={`text-xs ${
                    tx.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'
                  } text-white`}>
                    {tx.status}
                  </Badge>
                </div>
                
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-bold text-white">
                      {formatAmount(tx.amount)} {GAIA_TOKEN.SYMBOL}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-mono text-xs text-blue-300">
                      {formatAddress(tx.from)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-mono text-xs text-purple-300">
                      {formatAddress(tx.to)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="text-xs text-cyan-300">
                      {tx.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 break-all">
                    Hash: {tx.hash.slice(0, 20)}...
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
            <div className="text-lg font-bold text-green-400">
              {transactions.filter(tx => tx.type === 'incoming').length}
            </div>
            <div className="text-xs text-muted-foreground">Incoming Today</div>
          </div>
          <div className="text-center p-3 bg-red-900/20 rounded border border-red-500/20">
            <div className="text-lg font-bold text-red-400">
              {transactions.filter(tx => tx.type === 'outgoing').length}
            </div>
            <div className="text-xs text-muted-foreground">Outgoing Today</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
