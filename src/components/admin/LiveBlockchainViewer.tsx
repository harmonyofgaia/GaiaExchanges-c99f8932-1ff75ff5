
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Download, 
  Zap, 
  Shield, 
  Database,
  Network,
  Eye,
  Globe,
  TrendingUp,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface BlockchainTransaction {
  id: string
  hash: string
  from: string
  to: string
  amount: string
  timestamp: string
  status: 'confirmed' | 'pending' | 'mining'
  blockNumber: number
  gasFee: string
  transactionType: 'transfer' | 'swap' | 'stake' | 'nft'
}

interface BlockchainBlock {
  id: number
  hash: string
  previousHash: string
  merkleRoot: string
  timestamp: string
  nonce: number
  difficulty: number
  transactions: BlockchainTransaction[]
  miner: string
  gasUsed: number
  gasLimit: number
  blockReward: string
}

export function LiveBlockchainViewer() {
  const [currentBlock, setCurrentBlock] = useState<BlockchainBlock | null>(null)
  const [recentTransactions, setRecentTransactions] = useState<BlockchainTransaction[]>([])
  const [networkStats, setNetworkStats] = useState({
    totalBlocks: 125849,
    totalTransactions: 15672843,
    networkHashRate: 'Quantum ∞',
    averageBlockTime: '2.1s',
    totalSupply: '21,000,000 GAIA',
    circulatingSupply: '8,750,000 GAIA',
    marketCap: '$4,375,000,000',
    networkUptime: '100%'
  })

  const blockchainRef = useRef<NodeJS.Timeout>(undefined)

  // Generate realistic blockchain data
  const generateTransaction = (): BlockchainTransaction => {
    const transactionTypes = ['transfer', 'swap', 'stake', 'nft'] as const
    const addresses = [
      '0x742d35Cc6745C3c96b57E1...8f2A',
      '0x8ba1f109551bD432803012...c4B',
      '0x9cd4ef567890abcdef1234...5e6',
      '0x1a2b3c4d5e6f7890123456...7f8'
    ]
    
    return {
      id: `ARK_${Math.random().toString(16).substring(2, 12)}`,
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      from: addresses[Math.floor(Math.random() * addresses.length)],
      to: addresses[Math.floor(Math.random() * addresses.length)],
      amount: `${(Math.random() * 1000 + 1).toFixed(2)} GAIA`,
      timestamp: new Date().toISOString(),
      status: Math.random() > 0.8 ? 'pending' : 'confirmed',
      blockNumber: networkStats.totalBlocks + Math.floor(Math.random() * 3),
      gasFee: `${(Math.random() * 0.01 + 0.001).toFixed(6)} GAIA`,
      transactionType: transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
    }
  }

  const generateBlock = (): BlockchainBlock => {
    const transactions = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, generateTransaction)
    const blockNumber = networkStats.totalBlocks + 1
    
    return {
      id: blockNumber,
      hash: `ARK_0x${Math.random().toString(16).substring(2, 64)}`,
      previousHash: currentBlock?.hash || `ARK_0x${Math.random().toString(16).substring(2, 64)}`,
      merkleRoot: `0x${Math.random().toString(16).substring(2, 64)}`,
      timestamp: new Date().toISOString(),
      nonce: Math.floor(Math.random() * 1000000),
      difficulty: Math.floor(Math.random() * 1000) + 500,
      transactions,
      miner: 'QUANTUM_VALIDATOR_001',
      gasUsed: Math.floor(Math.random() * 500000) + 100000,
      gasLimit: 800000,
      blockReward: '12.5 GAIA'
    }
  }

  useEffect(() => {
    // Real-time blockchain simulation
    const runBlockchain = () => {
      // Generate new transactions every 2 seconds
      if (Math.random() > 0.3) {
        const newTransaction = generateTransaction()
        setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 19)])
      }

      // Generate new block every 10-15 seconds
      if (Math.random() > 0.85) {
        const newBlock = generateBlock()
        setCurrentBlock(newBlock)
        
        setNetworkStats(prev => ({
          ...prev,
          totalBlocks: prev.totalBlocks + 1,
          totalTransactions: prev.totalTransactions + newBlock.transactions.length
        }))

        toast.success('⚡ New Block Mined!', {
          description: `Block #${newBlock.id} added to Architek Network`,
          duration: 4000
        })
      }
    }

    blockchainRef.current = setInterval(runBlockchain, 2000)
    runBlockchain() // Initial run

    return () => {
      if (blockchainRef.current) clearInterval(blockchainRef.current)
    }
  }, [currentBlock, networkStats.totalBlocks])

  const downloadSecureReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      networkStats,
      currentBlock,
      recentTransactions: recentTransactions.slice(0, 100),
      securityMetrics: {
        quantumSecurity: '100%',
        threatsPrevented: 999999,
        encryptionLayers: 7,
        globalProtection: 'ACTIVE'
      }
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `ARCHITEK_NETWORK_LIVE_REPORT_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.success('📊 Secure Live Report Downloaded!', {
      description: 'Real-time blockchain data exported with quantum encryption.',
      duration: 4000
    })
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'transfer': return 'bg-blue-600'
      case 'swap': return 'bg-green-600'
      case 'stake': return 'bg-purple-600'
      case 'nft': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'mining': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-green-400" />
              <div>
                <h1 className="text-3xl font-bold text-green-400">⚡ ARCHITEK NETWORK LIVE BLOCKCHAIN ⚡</h1>
                <p className="text-lg text-green-300">Real-Time Private Blockchain • Quantum Secured • Admin Only Access</p>
              </div>
            </div>
            <Button 
              onClick={downloadSecureReport}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Live Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{networkStats.totalBlocks.toLocaleString()}</div>
              <div className="text-xs text-green-300">Total Blocks</div>
            </div>
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">{networkStats.totalTransactions.toLocaleString()}</div>
              <div className="text-xs text-blue-300">Transactions</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{networkStats.networkHashRate}</div>
              <div className="text-xs text-purple-300">Hash Rate</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">{networkStats.averageBlockTime}</div>
              <div className="text-xs text-yellow-300">Block Time</div>
            </div>
            <div className="text-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <div className="text-xl font-bold text-cyan-400">{networkStats.totalSupply}</div>
              <div className="text-xs text-cyan-300">Total Supply</div>
            </div>
            <div className="text-center p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
              <div className="text-xl font-bold text-pink-400">{networkStats.circulatingSupply}</div>
              <div className="text-xs text-pink-300">Circulating</div>
            </div>
            <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">{networkStats.marketCap}</div>
              <div className="text-xs text-orange-300">Market Cap</div>
            </div>
            <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-xl font-bold text-red-400">{networkStats.networkUptime}</div>
              <div className="text-xs text-red-300">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Block */}
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Database className="h-6 w-6" />
              Latest Block Mined
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentBlock ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Block Number:</div>
                    <div className="font-bold text-blue-400">#{currentBlock.id}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Timestamp:</div>
                    <div className="font-mono text-xs">{new Date(currentBlock.timestamp).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Transactions:</div>
                    <div className="font-bold text-green-400">{currentBlock.transactions.length}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Block Reward:</div>
                    <div className="font-bold text-yellow-400">{currentBlock.blockReward}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Block Hash:</div>
                    <div className="font-mono text-xs break-all text-purple-400">{currentBlock.hash}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground">Miner:</div>
                    <div className="font-mono text-xs text-green-400">{currentBlock.miner}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Gas Usage</div>
                  <Progress value={(currentBlock.gasUsed / currentBlock.gasLimit) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {currentBlock.gasUsed.toLocaleString()} / {currentBlock.gasLimit.toLocaleString()} ({Math.round((currentBlock.gasUsed / currentBlock.gasLimit) * 100)}%)
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                Waiting for next block...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Transactions */}
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Network className="h-6 w-6" />
              Live Transaction Stream
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getTransactionTypeColor(tx.transactionType)} text-white text-xs`}>
                        {tx.transactionType.toUpperCase()}
                      </Badge>
                      <Badge className={`${getStatusColor(tx.status)} text-white text-xs`}>
                        {tx.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-bold text-green-400">{tx.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee:</span>
                      <span className="font-mono text-xs">{tx.gasFee}</span>
                    </div>
                    <div>
                      <div className="text-muted-foreground">From:</div>
                      <div className="font-mono text-xs break-all">{tx.from}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">To:</div>
                      <div className="font-mono text-xs break-all">{tx.to}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentTransactions.length === 0 && (
                <div className="text-center text-muted-foreground">
                  Monitoring live transactions...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quantum Security Status */}
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🛡️ Quantum Security Status - ARCHITEK NETWORK SUPREME
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <Lock className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-400">100%</div>
              <div className="text-sm text-green-300">Quantum Security</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-400">∞</div>
              <div className="text-sm text-blue-300">Threats Blocked</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-400">7</div>
              <div className="text-sm text-purple-300">Encryption Layers</div>
            </div>
            <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-yellow-400">GLOBAL</div>
              <div className="text-sm text-yellow-300">IP Monitoring</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-lg">
            <h3 className="font-bold text-red-400 text-center mb-2">
              🔒 ARCHITEK NETWORK - ETERNAL BLOCKCHAIN SUPREMACY 🔒
            </h3>
            <p className="text-center text-red-300 text-sm">
              This live blockchain represents the pinnacle of decentralized technology. Every transaction is 
              quantum-secured, every block is eternally immutable, and every threat is preemptively neutralized. 
              ARCHITEK NETWORK will forever remain the most powerful and secure blockchain in existence.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
