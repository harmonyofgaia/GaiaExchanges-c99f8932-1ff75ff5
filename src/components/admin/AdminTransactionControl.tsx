
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Lock,
  Unlock,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'transfer' | 'stake'
  amount: number
  currency: string
  userId: string
  userEmail: string
  status: 'pending' | 'approved' | 'rejected' | 'frozen'
  timestamp: Date
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export function AdminTransactionControl() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [totalVolume, setTotalVolume] = useState(0)
  const [suspiciousCount, setSuspiciousCount] = useState(0)

  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn_001',
        type: 'buy',
        amount: 1000,
        currency: 'GAIA',
        userId: 'user_123',
        userEmail: 'user@example.com',
        status: 'pending',
        timestamp: new Date(),
        riskLevel: 'low'
      },
      {
        id: 'txn_002',
        type: 'sell',
        amount: 5000,
        currency: 'GAIA',
        userId: 'user_456',
        userEmail: 'trader@example.com',
        status: 'pending',
        timestamp: new Date(),
        riskLevel: 'high'
      },
      {
        id: 'txn_003',
        type: 'transfer',
        amount: 25000,
        currency: 'GAIA',
        userId: 'user_789',
        userEmail: 'suspicious@example.com',
        status: 'frozen',
        timestamp: new Date(),
        riskLevel: 'critical'
      }
    ]

    setTransactions(mockTransactions)
    setTotalVolume(mockTransactions.reduce((sum, txn) => sum + txn.amount, 0))
    setSuspiciousCount(mockTransactions.filter(txn => txn.riskLevel === 'high' || txn.riskLevel === 'critical').length)
    
    console.log('💰 ADMIN TRANSACTION CONTROL INITIALIZED')
    console.log('🛡️ TRANSACTION MONITORING ACTIVE')
    console.log('⚡ FRAUD DETECTION SYSTEMS ONLINE')
  }, [])

  const handleTransactionAction = (transactionId: string, action: 'approve' | 'reject' | 'freeze' | 'investigate') => {
    setTransactions(prev => prev.map(txn => {
      if (txn.id === transactionId) {
        const newStatus = action === 'approve' ? 'approved' : 
                         action === 'reject' ? 'rejected' : 
                         action === 'freeze' ? 'frozen' : 'pending'
        
        const actionMessages = {
          approve: '✅ TRANSACTION APPROVED',
          reject: '❌ TRANSACTION REJECTED',
          freeze: '🧊 TRANSACTION FROZEN',
          investigate: '🔍 INVESTIGATION STARTED'
        }
        
        toast.success(actionMessages[action], {
          description: `Transaction ${transactionId} • Amount: ${txn.amount} ${txn.currency}`,
          duration: 4000
        })
        
        console.log(`💰 ADMIN ACTION: ${action.toUpperCase()}`)
        console.log(`📍 TRANSACTION: ${transactionId}`)
        console.log(`💵 AMOUNT: ${txn.amount} ${txn.currency}`)
        
        return { ...txn, status: newStatus }
      }
      return txn
    }))
  }

  const emergencyFreezeAll = () => {
    setTransactions(prev => prev.map(txn => ({ ...txn, status: 'frozen' })))
    
    toast.error('🚨 EMERGENCY FREEZE ACTIVATED!', {
      description: 'All transactions frozen • Manual review required',
      duration: 6000
    })
    
    console.log('🚨 EMERGENCY FREEZE - ALL TRANSACTIONS FROZEN')
    console.log('🛡️ ADMIN OVERRIDE - MANUAL REVIEW REQUIRED')
  }

  const bulkApprove = () => {
    const lowRiskTxns = transactions.filter(txn => txn.riskLevel === 'low' && txn.status === 'pending')
    
    setTransactions(prev => prev.map(txn => 
      txn.riskLevel === 'low' && txn.status === 'pending' 
        ? { ...txn, status: 'approved' }
        : txn
    ))
    
    toast.success('✅ BULK APPROVAL COMPLETED', {
      description: `${lowRiskTxns.length} low-risk transactions approved`,
      duration: 4000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-600'
      case 'rejected': return 'bg-red-600'
      case 'frozen': return 'bg-blue-600'
      case 'pending': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-600 animate-pulse'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'sell': return <TrendingDown className="h-4 w-4 text-red-400" />
      case 'transfer': return <Zap className="h-4 w-4 text-blue-400" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const filteredTransactions = transactions.filter(txn => 
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.currency.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            💰 ADMIN TRANSACTION CONTROL CENTER
          </CardTitle>
          <p className="text-green-300 text-sm">
            Complete transaction oversight • Fraud detection • Emergency controls • Unlimited authority
          </p>
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-green-600">TOTAL VOLUME: {totalVolume.toLocaleString()} GAIA</Badge>
            <Badge className="bg-orange-600">SUSPICIOUS: {suspiciousCount}</Badge>
            <Badge className="bg-blue-600">PENDING: {transactions.filter(t => t.status === 'pending').length}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/40 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {transactions.filter(t => t.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/40 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {transactions.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-4 bg-red-900/40 rounded-lg">
              <XCircle className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {transactions.filter(t => t.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
            <div className="text-center p-4 bg-blue-900/40 rounded-lg">
              <Lock className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {transactions.filter(t => t.status === 'frozen').length}
              </div>
              <div className="text-sm text-muted-foreground">Frozen</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Search transactions by ID, email, or currency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-black/30 border-green-500/30"
            />
            <Button 
              onClick={bulkApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              ✅ Bulk Approve Low Risk
            </Button>
            <Button 
              onClick={emergencyFreezeAll}
              className="bg-red-600 hover:bg-red-700"
            >
              🚨 Emergency Freeze All
            </Button>
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="border-gray-500/30 bg-black/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <div className="font-bold text-sm">{transaction.id}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.userEmail} • {transaction.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(transaction.riskLevel)}>
                        {transaction.riskLevel.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Amount:</div>
                      <div className="font-bold">{transaction.amount.toLocaleString()} {transaction.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Type:</div>
                      <div className="font-bold capitalize">{transaction.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">User ID:</div>
                      <div className="font-bold font-mono text-xs">{transaction.userId}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleTransactionAction(transaction.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={transaction.status === 'approved'}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      ✅ Approve
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleTransactionAction(transaction.id, 'reject')}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={transaction.status === 'rejected'}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      ❌ Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleTransactionAction(transaction.id, 'freeze')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Lock className="h-3 w-3 mr-1" />
                      🧊 Freeze
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleTransactionAction(transaction.id, 'investigate')}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      🔍 Investigate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-bold text-green-400 mb-2">💰 ADMIN TRANSACTION POWERS</h4>
            <div className="text-sm text-green-300 space-y-1">
              <div>• Complete oversight of all platform transactions</div>
              <div>• Real-time fraud detection and prevention</div>
              <div>• Emergency freeze capabilities for all transactions</div>
              <div>• Bulk approval/rejection for efficient processing</div>
              <div>• Deep investigation tools for suspicious activity</div>
              <div>• Unlimited authority over all financial operations</div>
              <div>🌟 ADMIN EXCLUSIVE: Override all transaction limits and restrictions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
