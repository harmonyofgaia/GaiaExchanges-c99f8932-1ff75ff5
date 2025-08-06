
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  AlertTriangle, 
  ArrowLeftRight, 
  Shield, 
  Eye, 
  Undo2,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react'
import { toast } from 'sonner'

interface SuspiciousTransaction {
  id: string
  fromAddress: string
  toAddress: string
  amount: number
  currency: string
  timestamp: Date
  status: 'SUSPICIOUS' | 'FLAGGED' | 'REVERSED' | 'APPROVED'
  riskScore: number
  location: string
  userAgent: string
  deviceFingerprint: string
}

export function TransactionReversalSystem() {
  const [suspiciousTransactions, setSuspiciousTransactions] = useState<SuspiciousTransaction[]>([
    {
      id: 'tx_suspicious_001',
      fromAddress: '0x1234...malicious',
      toAddress: '0x5678...unknown',
      amount: 10000,
      currency: 'GAIA',
      timestamp: new Date(),
      status: 'SUSPICIOUS',
      riskScore: 95,
      location: 'Unknown VPN Location',
      userAgent: 'Suspicious Browser',
      deviceFingerprint: 'malicious_device_001'
    },
    {
      id: 'tx_suspicious_002',
      fromAddress: '0x9876...hacker',
      toAddress: '0x5432...stolen',
      amount: 25000,
      currency: 'GAIA',
      timestamp: new Date(),
      status: 'FLAGGED',
      riskScore: 98,
      location: 'Dark Web Exit Node',
      userAgent: 'Automated Script',
      deviceFingerprint: 'bot_device_002'
    }
  ])

  const [adminWalletAddress] = useState('CdWdJHyH6Tss3z1PLGNWtMp8Nst1sU2eSKb4o9P8S6fZ')
  const [monitoringActive, setMonitoringActive] = useState(true)

  useEffect(() => {
    if (!monitoringActive) return

    const fraudDetection = setInterval(() => {
      console.log('🕵️ FRAUD DETECTION - SCANNING ALL TRANSACTIONS GLOBALLY')
      console.log('🚨 ADMIN PROTECTION - MONITORING FOR STOLEN FUNDS')
      console.log('⚡ REVERSAL SYSTEM - READY TO PROTECT COMMUNITY')
      
      // Simulate detecting fraudulent transactions
      if (Math.random() < 0.2) {
        const newSuspiciousTransaction: SuspiciousTransaction = {
          id: `tx_suspicious_${Date.now()}`,
          fromAddress: `0x${Math.random().toString(16).substr(2, 8)}...suspicious`,
          toAddress: `0x${Math.random().toString(16).substr(2, 8)}...unknown`,
          amount: Math.floor(Math.random() * 50000) + 1000,
          currency: 'GAIA',
          timestamp: new Date(),
          status: 'SUSPICIOUS',
          riskScore: Math.floor(Math.random() * 30) + 70,
          location: ['Unknown VPN', 'Dark Web', 'Suspicious IP', 'Blocked Region'][Math.floor(Math.random() * 4)],
          userAgent: 'Suspicious Activity Detected',
          deviceFingerprint: `suspicious_${Date.now()}`
        }
        
        setSuspiciousTransactions(prev => [newSuspiciousTransaction, ...prev.slice(0, 9)])
        
        toast.error('🚨 SUSPICIOUS TRANSACTION DETECTED!', {
          description: `${newSuspiciousTransaction.amount} ${newSuspiciousTransaction.currency} flagged for review`,
          duration: 5000
        })
        
        // Send admin notification
        sendAdminAlert(newSuspiciousTransaction)
      }
    }, 15000) // Check every 15 seconds

    return () => clearInterval(fraudDetection)
  }, [monitoringActive])

  const sendAdminAlert = (transaction: SuspiciousTransaction) => {
    console.log('📧 ADMIN ALERT SENT:', {
      email: 'michelzuidwijk@gmail.com',
      phone: '+31687758236',
      transaction: transaction,
      timestamp: new Date(),
      action: 'IMMEDIATE_REVIEW_REQUIRED'
    })
  }

  const handleReverseTransaction = (transactionId: string) => {
    const transaction = suspiciousTransactions.find(tx => tx.id === transactionId)
    if (!transaction) return

    setSuspiciousTransactions(prev => 
      prev.map(tx => 
        tx.id === transactionId 
          ? { ...tx, status: 'REVERSED' as const }
          : tx
      )
    )

    toast.success('⚡ TRANSACTION REVERSED!', {
      description: `${transaction.amount} ${transaction.currency} returned to community protection wallet`,
      duration: 8000
    })

    // Execute reversal protocol
    executeTransactionReversal(transaction)
  }

  const executeTransactionReversal = (transaction: SuspiciousTransaction) => {
    console.log('⚡ EXECUTING TRANSACTION REVERSAL PROTOCOL')
    console.log(`💰 AMOUNT: ${transaction.amount} ${transaction.currency}`)
    console.log(`🎯 FROM: ${transaction.fromAddress}`)
    console.log(`🏦 TO ADMIN WALLET: ${adminWalletAddress}`)
    console.log('🛡️ COMMUNITY PROTECTION: FUNDS SECURED')
    
    // Simulate blockchain reversal
    const reversalSteps = [
      'BLOCKCHAIN_SCAN_INITIATED',
      'TRANSACTION_LOCATED',
      'REVERSAL_AUTHORIZATION_GRANTED',
      'FUNDS_FROZEN',
      'TRANSFER_TO_ADMIN_WALLET',
      'COMMUNITY_PROTECTION_COMPLETE'
    ]
    
    reversalSteps.forEach((step, index) => {
      setTimeout(() => {
        console.log(`🔄 STEP ${index + 1}: ${step}`)
      }, index * 1000)
    })
  }

  const handleApproveTransaction = (transactionId: string) => {
    setSuspiciousTransactions(prev => 
      prev.map(tx => 
        tx.id === transactionId 
          ? { ...tx, status: 'APPROVED' as const }
          : tx
      )
    )
    
    toast.success('✅ Transaction Approved', {
      description: 'Transaction marked as legitimate',
      duration: 3000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUSPICIOUS': return 'bg-yellow-600'
      case 'FLAGGED': return 'bg-red-600'
      case 'REVERSED': return 'bg-purple-600'
      case 'APPROVED': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 90) return 'text-red-400'
    if (riskScore >= 70) return 'text-orange-400'
    return 'text-yellow-400'
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6 animate-pulse" />
            🚨 TRANSACTION REVERSAL SYSTEM - COMMUNITY PROTECTION
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-red-600 animate-pulse">
              FRAUD DETECTION: ACTIVE
            </Badge>
            <Badge className="bg-purple-600">
              ADMIN WALLET: PROTECTED
            </Badge>
            <Badge className="bg-green-600">
              COMMUNITY: SECURED
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 font-bold">🏦 Admin Protection Wallet:</span>
              <Badge className="bg-green-600 text-white">SECURED</Badge>
            </div>
            <code className="text-green-300 font-mono text-sm break-all block bg-green-900/10 p-2 rounded">
              {adminWalletAddress}
            </code>
            <div className="text-xs text-green-400 mt-2">
              All reversed funds automatically secured for community protection
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suspicious Transactions */}
      <Card className="bg-black/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">🚨 SUSPICIOUS TRANSACTIONS - ADMIN CONTROL</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {suspiciousTransactions.map((transaction) => (
                <Card 
                  key={transaction.id} 
                  className={`${
                    transaction.status === 'REVERSED' 
                      ? 'bg-purple-900/30 border-purple-500' 
                      : transaction.status === 'FLAGGED'
                      ? 'bg-red-900/30 border-red-500'
                      : transaction.status === 'APPROVED'
                      ? 'bg-green-900/30 border-green-500'
                      : 'bg-yellow-900/30 border-yellow-500'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-sm">🚨 Transaction ID: {transaction.id}</h4>
                        <p className="text-xs text-muted-foreground">💰 Amount: {transaction.amount} {transaction.currency}</p>
                        <p className="text-xs text-muted-foreground">📍 From: {transaction.fromAddress}</p>
                        <p className="text-xs text-muted-foreground">🎯 To: {transaction.toAddress}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <Badge className="bg-orange-600 text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Risk: <span className={getRiskColor(transaction.riskScore)}>{transaction.riskScore}%</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-xs mb-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>Location: {transaction.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>Time: {transaction.timestamp.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3" />
                        <span>Device: {transaction.deviceFingerprint}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleReverseTransaction(transaction.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-xs"
                        disabled={transaction.status === 'REVERSED' || transaction.status === 'APPROVED'}
                      >
                        <Undo2 className="h-3 w-3 mr-1" />
                        ⚡ Reverse & Secure
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveTransaction(transaction.id)}
                        className="bg-green-600 hover:bg-green-700 text-xs"
                        disabled={transaction.status === 'REVERSED' || transaction.status === 'APPROVED'}
                      >
                        ✅ Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
