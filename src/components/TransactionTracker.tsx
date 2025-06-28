
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Download, ExternalLink, Eye, Shield } from 'lucide-react'

interface Transaction {
  id: string
  hash: string
  type: 'received' | 'sent' | 'burned' | 'staked' | 'reward'
  token: string
  amount: number
  from: string
  to: string
  timestamp: Date
  status: 'confirmed' | 'pending' | 'failed'
  gasUsed?: number
  gasFee?: number
  blockNumber?: number
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0x742d35cc6c8f1a16ca1b6c8e9f3d2a5b1e7c4d8f9a2b3c5e6f8d1a4b7c9e2f5a8',
    type: 'received',
    token: 'GAiA',
    amount: 1250.50,
    from: 'Environmental Reward System',
    to: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: 'confirmed',
    gasUsed: 21000,
    gasFee: 0.0001,
    blockNumber: 18450123
  },
  {
    id: '2',
    hash: '0x9f4e8c2a1b5d7f3e6a8c4b9e2f1d5a7c3e6f8a1b4d7c9e2f5a8b1c4e7f9a2b5d',
    type: 'burned',
    token: 'GAiA',
    amount: 500.00,
    from: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    to: 'Ocean Cleanup Burning Address',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'confirmed',
    gasUsed: 45000,
    gasFee: 0.0002,
    blockNumber: 18449876
  },
  {
    id: '3',
    hash: '0x1a2b3c4d5e6f7a8b9c1d2e3f4a5b6c7d8e9f1a2b3c4d5e6f7a8b9c1d2e3f4a5b',
    type: 'received',
    token: 'BTC',
    amount: 0.00125,
    from: 'Binance Exchange',
    to: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'confirmed',
    gasUsed: 21000,
    gasFee: 0.00001,
    blockNumber: 18448956
  }
]

export function TransactionTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  // Simulate real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Checking for new transactions...')
      // In a real app, this would fetch from blockchain API
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || tx.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'failed': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'received': return 'text-green-400'
      case 'sent': return 'text-blue-400'
      case 'burned': return 'text-orange-400'
      case 'staked': return 'text-purple-400'
      case 'reward': return 'text-emerald-400'
      default: return 'text-gray-400'
    }
  }

  const formatAmount = (amount: number, token: string) => {
    const formatter = token === 'BTC' ? 
      new Intl.NumberFormat('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 }) :
      new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    
    return `${formatter.format(amount)} ${token}`
  }

  return (
    <Card className="border-green-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Eye className="h-5 w-5" />
          Complete Transaction History - 100% Transparent
        </CardTitle>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-green-400" />
          <span className="text-green-400">Auto-updated every 5 seconds</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by hash, token, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-background border border-input rounded-md text-sm"
            >
              <option value="all">All Types</option>
              <option value="received">Received</option>
              <option value="sent">Sent</option>
              <option value="burned">Burned</option>
              <option value="staked">Staked</option>
              <option value="reward">Rewards</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Token/Amount</TableHead>
                <TableHead>From/To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Block/Gas</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/20">
                  <TableCell className="font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <code className="bg-muted/50 px-2 py-1 rounded text-xs">
                        {tx.hash.slice(0, 8)}...{tx.hash.slice(-8)}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getTypeColor(tx.type)} border-current`}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">
                    <div className="font-semibold">{formatAmount(tx.amount, tx.token)}</div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">From:</div>
                      <code className="bg-muted/30 px-1 rounded text-xs">
                        {tx.from.length > 20 ? `${tx.from.slice(0, 20)}...` : tx.from}
                      </code>
                      <div className="text-muted-foreground">To:</div>
                      <code className="bg-muted/30 px-1 rounded text-xs">
                        {tx.to.length > 20 ? `${tx.to.slice(0, 20)}...` : tx.to}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    <div className="space-y-1">
                      <div>Block: {tx.blockNumber}</div>
                      <div>Gas: {tx.gasUsed?.toLocaleString()}</div>
                      <div>Fee: {tx.gasFee} ETH</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{tx.timestamp.toLocaleDateString()}</div>
                    <div className="text-muted-foreground">
                      {tx.timestamp.toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
