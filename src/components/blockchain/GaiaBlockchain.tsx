
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Database, 
  Network, 
  Shield, 
  Cpu, 
  Zap, 
  Activity,
  Blocks,
  Lock,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

interface Block {
  id: number
  hash: string
  previousHash: string
  timestamp: string
  data: any
  nonce: number
  validator: string
}

interface NetworkStats {
  totalBlocks: number
  activeValidators: number
  transactionsPerSecond: number
  networkHealth: number
  consensusStatus: string
  totalStaked: number
}

export function GaiaBlockchain() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalBlocks: 1247892,
    activeValidators: 147,
    transactionsPerSecond: 3247,
    networkHealth: 99.8,
    consensusStatus: 'ACTIVE',
    totalStaked: 2847592
  })
  const [isValidator, setIsValidator] = useState(true)

  useEffect(() => {
    // Initialize genesis block
    const genesisBlock: Block = {
      id: 0,
      hash: 'GAIA_GENESIS_' + Math.random().toString(36).substring(2, 15),
      previousHash: '0',
      timestamp: new Date().toISOString(),
      data: { type: 'genesis', message: 'GAIA Private Blockchain Genesis' },
      nonce: 0,
      validator: 'GAIA_VALIDATOR_PRIME'
    }
    
    setBlocks([genesisBlock])

    // Simulate network activity
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + Math.floor(Math.random() * 5),
        transactionsPerSecond: prev.transactionsPerSecond + Math.floor(Math.random() * 100 - 50),
        networkHealth: Math.max(95, Math.min(100, prev.networkHealth + (Math.random() - 0.5) * 0.2))
      }))

      // Add new blocks periodically
      if (Math.random() > 0.7) {
        const newBlock: Block = {
          id: blocks.length,
          hash: 'GAIA_BLOCK_' + Math.random().toString(36).substring(2, 15),
          previousHash: blocks[blocks.length - 1]?.hash || '0',
          timestamp: new Date().toISOString(),
          data: {
            type: 'transaction_batch',
            transactions: Math.floor(Math.random() * 50) + 1,
            fees: Math.random() * 10
          },
          nonce: Math.floor(Math.random() * 1000000),
          validator: 'GAIA_VALIDATOR_' + Math.floor(Math.random() * 10)
        }
        
        setBlocks(prev => [...prev.slice(-9), newBlock])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const createTransaction = () => {
    const newBlock: Block = {
      id: blocks.length,
      hash: 'GAIA_TX_' + Math.random().toString(36).substring(2, 15),
      previousHash: blocks[blocks.length - 1]?.hash || '0',
      timestamp: new Date().toISOString(),
      data: {
        type: 'user_transaction',
        amount: Math.random() * 1000,
        from: 'USER_WALLET',
        to: 'GAIA_SYSTEM'
      },
      nonce: Math.floor(Math.random() * 1000000),
      validator: isValidator ? 'GAIA_VALIDATOR_PRIME' : 'GAIA_VALIDATOR_' + Math.floor(Math.random() * 10)
    }

    setBlocks(prev => [...prev.slice(-9), newBlock])
    toast.success('🔗 Transaction Added to GAIA Blockchain!', {
      description: `Block #${newBlock.id} validated and confirmed`,
      duration: 3000
    })
  }

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Blocks className="h-6 w-6" />
            🔗 GAIA PRIVATE BLOCKCHAIN NETWORK
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-green-600 animate-pulse">OPERATIONAL</Badge>
            <Badge className="bg-blue-600">QUANTUM SECURED</Badge>
            <Badge className="bg-purple-600">VALIDATOR ACTIVE</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Network Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{networkStats.totalBlocks.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Blocks</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">{networkStats.activeValidators}</div>
              <div className="text-sm text-muted-foreground">Active Validators</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">{networkStats.transactionsPerSecond.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">TPS</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">{networkStats.totalStaked.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Staked</div>
            </div>
          </div>

          {/* Network Health */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-400">Network Health</span>
                <span className="text-green-400">{networkStats.networkHealth.toFixed(1)}%</span>
              </div>
              <Progress value={networkStats.networkHealth} className="h-3" />
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={createTransaction} className="bg-green-600 hover:bg-green-700">
              <Zap className="h-4 w-4 mr-2" />
              Create Transaction
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Network className="h-4 w-4 mr-2" />
              Network Status
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Shield className="h-4 w-4 mr-2" />
              Validate Block
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Database className="h-4 w-4 mr-2" />
              Node Info
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Blocks */}
      <Card className="border-blue-500/30 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="text-blue-400">📊 Recent Blockchain Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {blocks.slice().reverse().map((block, index) => (
              <Card key={block.id} className="border-gray-500/20 bg-gray-900/20">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-green-600">Block #{block.id}</Badge>
                    <div className="text-xs text-muted-foreground">
                      {new Date(block.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <div><span className="text-green-400">Hash:</span> <span className="font-mono text-xs">{block.hash}</span></div>
                    <div><span className="text-purple-400">Validator:</span> {block.validator}</div>
                    <div><span className="text-orange-400">Nonce:</span> {block.nonce}</div>
                    <div><span className="text-blue-400">Data:</span> {JSON.stringify(block.data)}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
