
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Network, 
  Shield, 
  Zap, 
  Database,
  Lock,
  Globe,
  Activity,
  Cpu,
  HardDrive,
  Router
} from 'lucide-react'
import { toast } from 'sonner'

interface BlockchainStats {
  totalBlocks: number
  totalTransactions: number
  networkHashRate: number
  activeNodes: number
  blockTime: number
  difficulty: number
  networkHealth: number
}

export default function GaiaPrivateBlockchain() {
  const [stats, setStats] = useState<BlockchainStats>({
    totalBlocks: 1247856,
    totalTransactions: 5934782,
    networkHashRate: 2847.65,
    activeNodes: 847,
    blockTime: 2.3,
    difficulty: 98765432,
    networkHealth: 99.7
  })

  const [isGeneratingBlock, setIsGeneratingBlock] = useState(false)
  const [quantumSecurity, setQuantumSecurity] = useState(100)

  useEffect(() => {
    // Simulate real-time blockchain updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + Math.floor(Math.random() * 3),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 50),
        networkHashRate: prev.networkHashRate + (Math.random() - 0.5) * 100,
        activeNodes: prev.activeNodes + Math.floor(Math.random() * 5 - 2),
        networkHealth: Math.min(100, prev.networkHealth + (Math.random() - 0.5) * 2)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const generateBlock = () => {
    setIsGeneratingBlock(true)
    toast.success('⛏️ Mining new block...', {
      description: 'GAiA Private Blockchain is processing transactions',
      duration: 3000
    })

    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalBlocks: prev.totalBlocks + 1,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 20 + 10)
      }))
      setIsGeneratingBlock(false)
      toast.success('✅ New block mined successfully!', {
        description: `Block #${stats.totalBlocks + 1} added to GAiA blockchain`,
        duration: 4000
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              ⛓️ GAiA PRIVATE BLOCKCHAIN
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Quantum-Secured • Environment-Focused • Self-Healing Network
            </p>
          </CardHeader>
        </Card>

        {/* Network Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Network className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{stats.activeNodes}</div>
              <div className="text-sm text-muted-foreground">Active Nodes</div>
              <Badge className="mt-2 bg-green-600 animate-pulse">ONLINE</Badge>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{stats.totalBlocks.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Blocks</div>
              <Badge className="mt-2 bg-blue-600">GROWING</Badge>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{stats.networkHashRate.toFixed(2)} TH/s</div>
              <div className="text-sm text-muted-foreground">Hash Rate</div>
              <Badge className="mt-2 bg-purple-600">SECURE</Badge>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{quantumSecurity}%</div>
              <div className="text-sm text-muted-foreground">Quantum Security</div>
              <Badge className="mt-2 bg-yellow-600">QUANTUM</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blockchain Control Panel */}
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">🎛️ Blockchain Control Panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Network Health</span>
                    <span className="text-green-400">{stats.networkHealth.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.networkHealth} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Block Generation</span>
                    <span className="text-blue-400">{stats.blockTime}s avg</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Transaction Pool</span>
                    <span className="text-purple-400">847 pending</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={generateBlock}
                  disabled={isGeneratingBlock}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isGeneratingBlock ? (
                    <>
                      <Cpu className="h-4 w-4 mr-2 animate-spin" />
                      Mining...
                    </>
                  ) : (
                    <>
                      <Database className="h-4 w-4 mr-2" />
                      Mine Block
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-green-500/30 text-green-400">
                  <Activity className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>

              <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <h4 className="font-bold text-purple-400 mb-2">🔐 Security Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✅ Post-Quantum Cryptography</li>
                  <li>✅ Environmental Proof-of-Stake</li>
                  <li>✅ Self-Healing Network Protocols</li>
                  <li>✅ AI-Powered Threat Detection</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Monitor */}
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">📊 Live Transaction Monitor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <div className="text-xl font-bold text-green-400">
                    {stats.totalTransactions.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Transactions</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <div className="text-xl font-bold text-blue-400">
                    {(stats.totalTransactions / stats.totalBlocks).toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Avg TXs per Block</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-400">🔄 Recent Transactions</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="p-3 bg-gray-900/30 rounded border border-gray-500/30">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-mono text-green-400">
                            tx{Math.random().toString(36).substr(2, 8)}...
                          </span>
                        </div>
                        <Badge className="bg-blue-600 text-xs">
                          {(Math.random() * 1000).toFixed(2)} GAiA
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Block #{stats.totalBlocks - Math.floor(Math.random() * 10)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Topology */}
        <Card className="border-indigo-500/30 bg-indigo-900/20">
          <CardHeader>
            <CardTitle className="text-indigo-400">🌐 Global Network Topology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <Globe className="h-16 w-16 mx-auto text-indigo-400" />
                <h4 className="font-bold text-indigo-400">Global Nodes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>🌍 Europe</span>
                    <Badge className="bg-green-600">287 nodes</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>🌏 Asia</span>
                    <Badge className="bg-blue-600">324 nodes</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>🌎 Americas</span>
                    <Badge className="bg-purple-600">236 nodes</Badge>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Router className="h-16 w-16 mx-auto text-green-400" />
                <h4 className="font-bold text-green-400">Network Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Latency</span>
                    <span className="text-green-400">23ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Throughput</span>
                    <span className="text-blue-400">5,847 TPS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Uptime</span>
                    <span className="text-purple-400">99.97%</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <HardDrive className="h-16 w-16 mx-auto text-yellow-400" />
                <h4 className="font-bold text-yellow-400">Storage Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chain Size</span>
                    <span className="text-green-400">2.7 TB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Growth Rate</span>
                    <span className="text-blue-400">15 GB/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Redundancy</span>
                    <span className="text-purple-400">99.99%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">🌱 Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">0.001</div>
                <div className="text-sm text-muted-foreground">kWh per Transaction</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">-847</div>
                <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">12,450</div>
                <div className="text-sm text-muted-foreground">Trees Funded</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-muted-foreground">Renewable Energy</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
