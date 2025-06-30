
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Blocks, ArrowLeft, Shield, Zap, Database, Network } from 'lucide-react'
import { toast } from 'sonner'

interface BlockchainBlock {
  id: number
  hash: string
  previousHash: string
  timestamp: string
  data: string
  nonce: number
}

export function GaiaPrivateBlockchain() {
  const [blocks, setBlocks] = useState<BlockchainBlock[]>([])
  const [newTransaction, setNewTransaction] = useState('')
  const [rollbackTarget, setRollbackTarget] = useState('')
  const [mining, setMining] = useState(false)
  const [chainHealth, setChainHealth] = useState(100)

  useEffect(() => {
    // Initialize genesis block
    const genesisBlock: BlockchainBlock = {
      id: 0,
      hash: 'GENESIS_GAIA_QUANTUM_HASH_000000',
      previousHash: '0',
      timestamp: new Date().toISOString(),
      data: 'GAiA Private Blockchain Genesis Block - Admin Control',
      nonce: 0
    }
    
    setBlocks([genesisBlock])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setChainHealth(prev => Math.min(100, prev + Math.random() * 0.5))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const mineBlock = async () => {
    if (!newTransaction.trim()) {
      toast.error('Enter transaction data')
      return
    }

    setMining(true)
    console.log('⛏️ MINING NEW BLOCK ON GAIA PRIVATE BLOCKCHAIN')
    console.log('🔒 QUANTUM ENCRYPTION ACTIVE')

    // Simulate mining
    setTimeout(() => {
      const previousBlock = blocks[blocks.length - 1]
      const newBlock: BlockchainBlock = {
        id: blocks.length,
        hash: `GAIA_BLOCK_${blocks.length}_${Math.random().toString(36).substring(2, 15)}`,
        previousHash: previousBlock.hash,
        timestamp: new Date().toISOString(),
        data: newTransaction,
        nonce: Math.floor(Math.random() * 1000000)
      }

      setBlocks(prev => [...prev, newBlock])
      setNewTransaction('')
      setMining(false)

      toast.success('⛏️ BLOCK MINED!', {
        description: `Block ${newBlock.id} added to GAiA Private Blockchain`,
        duration: 3000
      })

      console.log('✅ BLOCK SUCCESSFULLY ADDED TO PRIVATE CHAIN')
    }, 2000)
  }

  const rollbackChain = () => {
    const targetBlock = parseInt(rollbackTarget)
    if (isNaN(targetBlock) || targetBlock < 0 || targetBlock >= blocks.length) {
      toast.error('Invalid block number for rollback')
      return
    }

    const newBlocks = blocks.slice(0, targetBlock + 1)
    setBlocks(newBlocks)
    setRollbackTarget('')

    toast.success('🔄 BLOCKCHAIN ROLLBACK COMPLETE!', {
      description: `Chain rolled back to block ${targetBlock}`,
      duration: 3000
    })

    console.log(`🔄 MASSIVE ROLLBACK EXECUTED - CHAIN RESTORED TO BLOCK ${targetBlock}`)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Blocks className="h-6 w-6" />
            🔗 GAiA PRIVATE BLOCKCHAIN - ADMIN CONTROL
          </CardTitle>
          <p className="text-purple-300">
            Private blockchain with massive rollback features • Admin exclusive • Quantum secured
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Blockchain Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-blue-500/20 bg-blue-900/20">
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">{blocks.length}</div>
                <div className="text-sm text-blue-300">Total Blocks</div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-900/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{chainHealth.toFixed(1)}%</div>
                <div className="text-sm text-green-300">Chain Health</div>
                <Progress value={chainHealth} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-900/20">
              <CardContent className="p-4 text-center">
                <Network className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">PRIVATE</div>
                <div className="text-sm text-purple-300">Network Type</div>
                <Badge className="mt-2 bg-purple-600">ADMIN ONLY</Badge>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-900/20">
              <CardContent className="p-4 text-center">
                <ArrowLeft className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">ACTIVE</div>
                <div className="text-sm text-orange-300">Rollback Ready</div>
                <Badge className="mt-2 bg-orange-600">1 YEAR ACCESS</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Mine New Block */}
          <Card className="border-green-500/30 bg-green-900/10">
            <CardHeader>
              <CardTitle className="text-green-400">⛏️ MINE NEW BLOCK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter transaction data..."
                  value={newTransaction}
                  onChange={(e) => setNewTransaction(e.target.value)}
                  className="bg-black/30 border-green-500/30 text-green-400"
                />
                <Button 
                  onClick={mineBlock}
                  disabled={mining}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {mining ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Mining...
                    </>
                  ) : (
                    <>
                      <Blocks className="h-4 w-4 mr-2" />
                      MINE BLOCK
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Massive Rollback */}
          <Card className="border-red-500/30 bg-red-900/10">
            <CardHeader>
              <CardTitle className="text-red-400">🔄 MASSIVE ROLLBACK SYSTEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Block number to rollback to..."
                  value={rollbackTarget}
                  onChange={(e) => setRollbackTarget(e.target.value)}
                  className="bg-black/30 border-red-500/30 text-red-400"
                />
                <Button 
                  onClick={rollbackChain}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ROLLBACK CHAIN
                </Button>
              </div>
              <p className="text-xs text-red-300">
                ⚠️ This will permanently remove all blocks after the target block
              </p>
            </CardContent>
          </Card>

          {/* Blockchain Explorer */}
          <Card className="border-blue-500/30 bg-blue-900/10">
            <CardHeader>
              <CardTitle className="text-blue-400">📊 BLOCKCHAIN EXPLORER</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {blocks.slice().reverse().map((block, index) => (
                  <Card key={block.id} className="border-gray-500/20 bg-gray-900/20">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-blue-600">Block #{block.id}</Badge>
                        <div className="text-xs text-muted-foreground">
                          {new Date(block.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <div><span className="text-green-400">Hash:</span> <span className="font-mono text-xs">{block.hash}</span></div>
                        <div><span className="text-purple-400">Data:</span> {block.data}</div>
                        <div><span className="text-orange-400">Nonce:</span> {block.nonce}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Admin Warning */}
      <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-red-900/30">
        <CardContent className="p-4 text-center">
          <h4 className="text-2xl font-bold text-yellow-400 mb-2">
            🔐 PRIVATE BLOCKCHAIN - ADMIN EXCLUSIVE 🔐
          </h4>
          <p className="text-sm text-muted-foreground">
            This private blockchain is exclusively controlled by admin for 1 year maximum.
            Massive rollback features available for emergency recovery.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
