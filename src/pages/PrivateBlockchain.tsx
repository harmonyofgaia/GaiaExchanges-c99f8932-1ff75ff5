
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Cpu, 
  Shield, 
  Zap, 
  Globe, 
  Database,
  Network,
  Rocket,
  Star,
  Eye,
  Heart,
  Activity,
  Users,
  Server,
  TrendingUp,
  Lock,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from 'lucide-react'
import { toast } from 'sonner'

export default function PrivateBlockchain() {
  const [blockchainHealth, setBlockchainHealth] = useState(98.7)
  const [totalTransactions, setTotalTransactions] = useState(2847592)
  const [networkNodes, setNetworkNodes] = useState(1247)
  const [securityLevel, setSecurityLevel] = useState(100)
  const [activeMiners, setActiveMiners] = useState(847)
  const [hashRate, setHashRate] = useState(125.7)
  const [validatorCount, setValidatorCount] = useState(234)

  const [blockchainStats, setBlockchainStats] = useState({
    blockHeight: 1847293,
    avgBlockTime: 12.3,
    totalSupply: 21000000,
    circulatingSupply: 18547291,
    networkFees: 0.001,
    throughput: 100000,
    gasPrice: 0.00001
  })

  const [validators, setValidators] = useState([
    { id: 1, address: "0x1a2b...3c4d", stake: 50000, uptime: 99.97, reward: 847.23, status: "active" },
    { id: 2, address: "0x5e6f...7g8h", stake: 45000, uptime: 99.95, reward: 762.18, status: "active" },
    { id: 3, address: "0x9i0j...1k2l", stake: 42000, uptime: 99.89, reward: 712.45, status: "active" },
    { id: 4, address: "0x3m4n...5o6p", stake: 38000, uptime: 99.78, reward: 643.67, status: "warning" },
    { id: 5, address: "0x7q8r...9s0t", stake: 35000, uptime: 98.23, reward: 589.12, status: "inactive" }
  ])

  const [recentBlocks, setRecentBlocks] = useState([
    { height: 1847293, hash: "0xabc123...def456", transactions: 247, timestamp: "12:34:56", size: "2.1 MB" },
    { height: 1847292, hash: "0x789ghi...012jkl", transactions: 198, timestamp: "12:34:44", size: "1.8 MB" },
    { height: 1847291, hash: "0x345mno...678pqr", transactions: 312, timestamp: "12:34:32", size: "2.4 MB" },
    { height: 1847290, hash: "0x901stu...234vwx", transactions: 156, timestamp: "12:34:20", size: "1.5 MB" }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockchainHealth(prev => Math.min(100, prev + Math.random() * 0.1))
      setTotalTransactions(prev => prev + Math.floor(Math.random() * 50))
      setNetworkNodes(prev => prev + Math.floor(Math.random() * 5))
      setActiveMiners(prev => prev + Math.floor(Math.random() * 3) - 1)
      setHashRate(prev => prev + (Math.random() - 0.5) * 2)
      setBlockchainStats(prev => ({
        ...prev,
        blockHeight: prev.blockHeight + (Math.random() > 0.7 ? 1 : 0),
        avgBlockTime: Math.max(10, Math.min(15, prev.avgBlockTime + (Math.random() - 0.5) * 0.5))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getValidatorStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-500"><AlertTriangle className="h-3 w-3 mr-1" />Warning</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
            🔗 GAiA PRIVATE BLOCKCHAIN NETWORK
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            The World's Most Secure • Dragon-Protected • Quantum-Resistant Blockchain
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
              <CardContent className="p-4 text-center">
                <Activity className="h-6 w-6 mx-auto text-green-400 mb-1" />
                <div className="text-lg font-bold text-green-400">{blockchainHealth.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Health</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto text-blue-400 mb-1" />
                <div className="text-lg font-bold text-blue-400">{networkNodes}</div>
                <div className="text-xs text-muted-foreground">Nodes</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50">
              <CardContent className="p-4 text-center">
                <Server className="h-6 w-6 mx-auto text-purple-400 mb-1" />
                <div className="text-lg font-bold text-purple-400">{validatorCount}</div>
                <div className="text-xs text-muted-foreground">Validators</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/50">
              <CardContent className="p-4 text-center">
                <Shield className="h-6 w-6 mx-auto text-red-400 mb-1" />
                <div className="text-lg font-bold text-red-400">{securityLevel}%</div>
                <div className="text-xs text-muted-foreground">Security</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mining">Mining</TabsTrigger>
            <TabsTrigger value="validators">Validators</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Blockchain Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Chain Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Block Height</span>
                    <span className="font-mono">{blockchainStats.blockHeight.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Block Time</span>
                    <span className="font-mono">{blockchainStats.avgBlockTime.toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Transactions</span>
                    <span className="font-mono">{totalTransactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Throughput</span>
                    <span className="font-mono">{blockchainStats.throughput.toLocaleString()} TPS</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Token Economics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Supply</span>
                    <span className="font-mono">{blockchainStats.totalSupply.toLocaleString()} GAIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Circulating</span>
                    <span className="font-mono">{blockchainStats.circulatingSupply.toLocaleString()} GAIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Fee</span>
                    <span className="font-mono">{blockchainStats.networkFees} GAIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gas Price</span>
                    <span className="font-mono">{blockchainStats.gasPrice} GAIA</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Network Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Network Health</span>
                      <span className="text-sm font-medium">{blockchainHealth.toFixed(1)}%</span>
                    </div>
                    <Progress value={blockchainHealth} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Security Level</span>
                      <span className="text-sm font-medium">{securityLevel}%</span>
                    </div>
                    <Progress value={securityLevel} className="h-2" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Nodes</span>
                    <span className="font-semibold text-green-500">{networkNodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Status</span>
                    <Badge variant="default" className="bg-green-500">Online</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Blocks */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-2">Height</th>
                        <th className="text-left p-2">Hash</th>
                        <th className="text-left p-2">Transactions</th>
                        <th className="text-left p-2">Timestamp</th>
                        <th className="text-left p-2">Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBlocks.map((block) => (
                        <tr key={block.height} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-mono">{block.height.toLocaleString()}</td>
                          <td className="p-2 font-mono text-sm">{block.hash}</td>
                          <td className="p-2">{block.transactions}</td>
                          <td className="p-2 text-sm text-muted-foreground">{block.timestamp}</td>
                          <td className="p-2 text-sm">{block.size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mining" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cpu className="h-5 w-5 mr-2" />
                    Mining Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Miners</span>
                    <span className="font-semibold">{activeMiners}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Hashrate</span>
                    <span className="font-semibold">{hashRate.toFixed(1)} TH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Difficulty</span>
                    <span className="font-mono text-sm">847.23T</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Mining Reward</span>
                    <span className="font-semibold">6.25 GAIA</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mining Pools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GAIA Pool</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold">34.7%</div>
                        <Progress value={34.7} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Eco Mine</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold">28.3%</div>
                        <Progress value={28.3} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Green Hash</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold">19.8%</div>
                        <Progress value={19.8} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Others</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold">17.2%</div>
                        <Progress value={17.2} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eco-Friendly Mining</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-3">
                    <div className="text-2xl">🌱</div>
                    <div className="text-sm text-muted-foreground">
                      Our mining algorithm uses 99.5% less energy than traditional PoW networks
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-500">0.01 kWh</div>
                        <div className="text-xs text-muted-foreground">Per Transaction</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-500">100%</div>
                        <div className="text-xs text-muted-foreground">Renewable</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="validators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Validator Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-3">Validator</th>
                        <th className="text-left p-3">Stake</th>
                        <th className="text-left p-3">Uptime</th>
                        <th className="text-left p-3">Rewards</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validators.map((validator) => (
                        <tr key={validator.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div className="font-mono text-sm">{validator.address}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold">{validator.stake.toLocaleString()} GAIA</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{validator.uptime}%</span>
                              <Progress value={validator.uptime} className="w-16 h-2" />
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-green-500">{validator.reward.toFixed(2)} GAIA</div>
                          </td>
                          <td className="p-3">
                            {getValidatorStatusBadge(validator.status)}
                          </td>
                          <td className="p-3">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staking Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Staked</span>
                    <span className="font-semibold">8,247,593 GAIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Staking APY</span>
                    <span className="font-semibold text-green-500">12.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Min Stake</span>
                    <span className="font-semibold">32,000 GAIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Unbonding Period</span>
                    <span className="font-semibold">7 days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Validator Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Average Uptime</span>
                        <span className="text-sm font-medium">99.64%</span>
                      </div>
                      <Progress value={99.64} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Network Participation</span>
                        <span className="text-sm font-medium">98.7%</span>
                      </div>
                      <Progress value={98.7} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Slashing Events</span>
                      <span className="font-semibold text-green-500">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="h-5 w-5 mr-2" />
                    Network Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Nodes</span>
                    <span className="font-semibold">{networkNodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Full Nodes</span>
                    <span className="font-semibold">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Light Nodes</span>
                    <span className="font-semibold">400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Network Latency</span>
                    <span className="font-semibold">47ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Bandwidth Usage</span>
                    <span className="font-semibold">2.3 GB/s</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">North America</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold">412 nodes</span>
                        <Progress value={33} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Europe</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold">387 nodes</span>
                        <Progress value={31} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Asia Pacific</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold">298 nodes</span>
                        <Progress value={24} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other Regions</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold">150 nodes</span>
                        <Progress value={12} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Network Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">99.97%</div>
                    <div className="text-sm text-muted-foreground">Network Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">100,000</div>
                    <div className="text-sm text-muted-foreground">Max TPS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">12.3s</div>
                    <div className="text-sm text-muted-foreground">Avg Block Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">0.001</div>
                    <div className="text-sm text-muted-foreground">Network Fee (GAIA)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-green-500">{securityLevel}%</div>
                    <Progress value={securityLevel} className="h-3" />
                    <div className="text-sm text-muted-foreground">
                      Quantum-resistant encryption active
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Algorithm</span>
                    <span className="font-semibold">AES-256-GCM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Key Exchange</span>
                    <span className="font-semibold">ECDH P-521</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hash Function</span>
                    <span className="font-semibold">SHA3-512</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantum Ready</span>
                    <Badge variant="default" className="bg-green-500">Yes</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Threat Detection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">0</div>
                    <div className="text-sm text-muted-foreground mb-2">Active Threats</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Threats Blocked</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Scan</span>
                    <span className="font-semibold">Just now</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Multi-signature wallets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Time-locked transactions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Zero-knowledge proofs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Hardware security modules</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Formal verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Bug bounty program</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Regular security audits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Quantum-resistant algorithms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Transaction Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Transactions</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Today</span>
                        <span className="font-semibold">+12,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">This Week</span>
                        <span className="font-semibold">+87,293</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">This Month</span>
                        <span className="font-semibold">+342,156</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Network Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Active Addresses</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-500">+15.7%</div>
                        <Progress value={76} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Transaction Volume</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-500">+23.4%</div>
                        <Progress value={89} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Network Hashrate</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-500">+8.9%</div>
                        <Progress value={67} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Value Locked</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-500">+31.2%</div>
                        <Progress value={94} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-blue-500">47.3K</div>
                    <div className="text-sm text-muted-foreground">Daily Active Users</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-green-500">$2.4M</div>
                    <div className="text-sm text-muted-foreground">Daily Volume</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-purple-500">$847M</div>
                    <div className="text-sm text-muted-foreground">Total Value Locked</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-lg font-bold text-orange-500">99.97%</div>
                    <div className="text-sm text-muted-foreground">Network Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
