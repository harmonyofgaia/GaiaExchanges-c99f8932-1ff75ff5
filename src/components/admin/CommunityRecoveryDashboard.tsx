
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Search, 
  Users, 
  Wallet, 
  AlertTriangle, 
  CheckCircle,
  Globe,
  Lock,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'

export function CommunityRecoveryDashboard() {
  const [searchAddress, setSearchAddress] = useState('')
  const [recoveryRequests, setRecoveryRequests] = useState<any[]>([])
  const [walletAnalysis, setWalletAnalysis] = useState<any>(null)
  const [isScanning, setIsScanning] = useState(false)

  // Generate sample recovery data
  useEffect(() => {
    const sampleRequests = [
      {
        id: 1,
        userEmail: 'user1@example.com',
        walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        status: 'pending',
        description: 'Lost access to wallet after device crash',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        priority: 'high'
      },
      {
        id: 2,
        userEmail: 'user2@example.com', 
        walletAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
        status: 'in-progress',
        description: 'Forgotten password recovery',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        priority: 'medium'
      },
      {
        id: 3,
        userEmail: 'user3@example.com',
        walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        status: 'resolved',
        description: 'Successfully recovered funds',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        priority: 'low'
      }
    ]
    setRecoveryRequests(sampleRequests)
  }, [])

  const handleWalletAnalysis = async () => {
    if (!searchAddress) return
    
    setIsScanning(true)
    
    // Simulate advanced wallet analysis
    setTimeout(() => {
      const analysis = {
        address: searchAddress,
        balance: Math.random() * 10,
        transactions: Math.floor(Math.random() * 1000),
        firstSeen: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
        lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        recoveryPossible: Math.random() > 0.3,
        associatedAddresses: Math.floor(Math.random() * 20),
        estimatedRecoveryTime: `${Math.floor(Math.random() * 72)} hours`
      }
      
      setWalletAnalysis(analysis)
      setIsScanning(false)
      
      toast.success('🔍 Wallet Analysis Complete', {
        description: 'Advanced recovery assessment generated',
        duration: 3000
      })
      
      console.log('🔍 COMMUNITY RECOVERY ANALYSIS:', analysis)
    }, 3000)
  }

  const handleRecoveryRequest = (requestId: number, action: string) => {
    setRecoveryRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'approve' ? 'in-progress' : 'rejected' }
        : req
    ))
    
    toast.success(`Recovery request ${action}d`, {
      description: `Community member will be notified`,
      duration: 3000
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600'
      case 'medium': return 'bg-yellow-600'
      case 'low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400'
      case 'in-progress': return 'text-blue-400'
      case 'resolved': return 'text-green-400'
      case 'rejected': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Users className="h-6 w-6" />
            🌍 Community Recovery Center
          </CardTitle>
          <p className="text-muted-foreground">
            Advanced wallet recovery system to help community members regain access to their funds
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">🔍 Wallet Analysis</TabsTrigger>
          <TabsTrigger value="requests">📋 Recovery Requests</TabsTrigger>
          <TabsTrigger value="tools">🛠️ Recovery Tools</TabsTrigger>
          <TabsTrigger value="stats">📊 Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">Advanced Wallet Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter wallet address for analysis..."
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="bg-black/30 border-blue-500/30"
                />
                <Button 
                  onClick={handleWalletAnalysis}
                  disabled={isScanning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isScanning ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>

              {walletAnalysis && (
                <Card className="border-green-500/30 bg-green-900/10">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {walletAnalysis.balance.toFixed(4)}
                        </div>
                        <div className="text-sm text-muted-foreground">Balance (ETH)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {walletAnalysis.transactions}
                        </div>
                        <div className="text-sm text-muted-foreground">Transactions</div>
                      </div>
                      <div className="text-center">
                        <Badge className={`${walletAnalysis.recoveryPossible ? 'bg-green-600' : 'bg-red-600'}`}>
                          {walletAnalysis.recoveryPossible ? 'Recoverable' : 'High Risk'}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">Recovery Status</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {walletAnalysis.estimatedRecoveryTime}
                        </div>
                        <div className="text-sm text-muted-foreground">Est. Recovery</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Community Recovery Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recoveryRequests.map((request) => (
                  <Card key={request.id} className="border-gray-500/30">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-white">{request.userEmail}</div>
                          <div className="text-sm text-muted-foreground font-mono">
                            {request.walletAddress}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {request.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.timestamp).toLocaleString()}
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleRecoveryRequest(request.id, 'approve')}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500/30 text-red-400"
                              onClick={() => handleRecoveryRequest(request.id, 'reject')}
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Review
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Recovery Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Wallet className="h-4 w-4 mr-2" />
                  Seed Phrase Recovery
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Password Recovery
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Eye className="h-4 w-4 mr-2" />
                  Address Tracing
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">15,847</div>
                  <div className="text-sm text-muted-foreground">Successful Recoveries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">98.7%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Funds Recovered</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-500/30 bg-green-900/10">
              <CardHeader>
                <CardTitle className="text-green-400">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-400">247</div>
                <p className="text-muted-foreground">Currently processing</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/10">
              <CardHeader>
                <CardTitle className="text-blue-400">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-400">2.3h</div>
                <p className="text-muted-foreground">Average response</p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/10">
              <CardHeader>
                <CardTitle className="text-purple-400">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-400">12</div>
                <p className="text-muted-foreground">Recovery specialists</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
