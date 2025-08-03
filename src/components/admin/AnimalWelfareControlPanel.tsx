import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart,
  Bot,
  DollarSign,
  Eye,
  EyeOff,
  Shield,
  Activity,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Gift,
  Wallet,
  Search,
  Settings,
  BarChart3,
  Globe,
  Camera,
  FileText,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface AISearchedAnimal {
  id: string
  cardId: string
  name: string
  species: string
  location: string
  walletAddress: string
  urgencyLevel: number
  emotionalState: {
    sadness: number
    hope: number
    fear: number
    trust: number
  }
  rescueProgress: number
  discoveredAt: string
  lastUpdate: string
}

interface FundingMetrics {
  vaultFunding: {
    totalAllocated: number
    activeRescues: number
    pendingReleases: number
  }
  marketplaceFunding: {
    nftSales: number
    directDonations: number
    totalRevenue: number
  }
  combinedImpact: {
    animalsRescued: number
    activeRescues: number
    awaitingRescue: number
  }
}

interface CommunityVaultStats {
  activeEvents: number
  totalGifts: number
  communityEngagement: number
}

function AnimalWelfareControlPanel() {
  const [searchedAnimals, setSearchedAnimals] = useState<AISearchedAnimal[]>([])
  const [fundingMetrics, setFundingMetrics] = useState<FundingMetrics>({
    vaultFunding: { totalAllocated: 2450000, activeRescues: 42, pendingReleases: 12 },
    marketplaceFunding: { nftSales: 1825000, directDonations: 675000, totalRevenue: 2500000 },
    combinedImpact: { animalsRescued: 330, activeRescues: 528, awaitingRescue: 858 }
  })
  const [vaultStats, setVaultStats] = useState<CommunityVaultStats>({
    activeEvents: 3,
    totalGifts: 584,
    communityEngagement: 94
  })
  const [aiMonitoringActive, setAiMonitoringActive] = useState(true)
  const [selectedAnimal, setSelectedAnimal] = useState<AISearchedAnimal | null>(null)

  useEffect(() => {
    // Initialize with sample AI-discovered animals
    const sampleAnimals: AISearchedAnimal[] = [
      {
        id: 'ai_001',
        cardId: 'GAIA_RESCUE_001',
        name: 'Luna',
        species: 'Siberian Tiger',
        location: 'Remote Forest, Siberia',
        walletAddress: GAIA_TOKEN.ANIMAL_WELFARE_WALLET,
        urgencyLevel: 9,
        emotionalState: { sadness: 85, hope: 32, fear: 78, trust: 15 },
        rescueProgress: 45,
        discoveredAt: '2024-01-15T08:30:00Z',
        lastUpdate: '2024-01-15T14:22:00Z'
      },
      {
        id: 'ai_002',
        cardId: 'GAIA_RESCUE_002',
        name: 'Sunny',
        species: 'Golden Eagle',
        location: 'Mountain Range, Colorado',
        walletAddress: GAIA_TOKEN.ANIMAL_WELFARE_WALLET,
        urgencyLevel: 7,
        emotionalState: { sadness: 60, hope: 55, fear: 45, trust: 40 },
        rescueProgress: 72,
        discoveredAt: '2024-01-14T12:15:00Z',
        lastUpdate: '2024-01-15T13:45:00Z'
      },
      {
        id: 'ai_003',
        cardId: 'GAIA_RESCUE_003',
        name: 'Freedom',
        species: 'African Elephant',
        location: 'Wildlife Reserve, Kenya',
        walletAddress: GAIA_TOKEN.ANIMAL_WELFARE_WALLET,
        urgencyLevel: 8,
        emotionalState: { sadness: 72, hope: 48, fear: 65, trust: 28 },
        rescueProgress: 23,
        discoveredAt: '2024-01-13T16:00:00Z',
        lastUpdate: '2024-01-15T11:30:00Z'
      }
    ]
    setSearchedAnimals(sampleAnimals)
    setSelectedAnimal(sampleAnimals[0])

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSearchedAnimals(prev => prev.map(animal => ({
        ...animal,
        emotionalState: {
          sadness: Math.max(10, animal.emotionalState.sadness + Math.floor(Math.random() * 10 - 5)),
          hope: Math.min(100, animal.emotionalState.hope + Math.floor(Math.random() * 8 - 2)),
          fear: Math.max(5, animal.emotionalState.fear + Math.floor(Math.random() * 12 - 6)),
          trust: Math.min(100, animal.emotionalState.trust + Math.floor(Math.random() * 6 - 1))
        },
        rescueProgress: Math.min(100, animal.rescueProgress + Math.floor(Math.random() * 3)),
        lastUpdate: new Date().toISOString()
      })))
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const handleForceFundingRelease = (animalId: string) => {
    toast.success('🎯 Emergency Funding Released', {
      description: `Urgent funding deployed for ${animalId}`,
      duration: 5000
    })
  }

  const handleAISearchOverride = () => {
    toast.info('🤖 AI Search Parameters Updated', {
      description: 'Expanding search radius and increasing sensitivity',
      duration: 4000
    })
  }

  const handleVaultGiftApproval = (productType: string) => {
    toast.success('🎁 Community Gift Approved', {
      description: `${productType} gift package authorized for distribution`,
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Heart className="h-5 w-5" />
            GAIA Animal Welfare Control Panel - Master Admin Control
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <Badge className="bg-green-600">AI Monitoring Active</Badge>
            <Badge className="bg-blue-600">Dual Funding Online</Badge>
            <Badge className="bg-purple-600">Community Vault Ready</Badge>
            <Badge className="bg-orange-600">24/7 Rescue Operations</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{fundingMetrics.combinedImpact.animalsRescued}</div>
              <p className="text-sm text-muted-foreground">Animals Rescued</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{fundingMetrics.combinedImpact.activeRescues}</div>
              <p className="text-sm text-muted-foreground">Active Rescues</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{fundingMetrics.combinedImpact.awaitingRescue}</div>
              <p className="text-sm text-muted-foreground">Awaiting Rescue</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{aiMonitoringActive ? '24/7' : 'OFF'}</div>
              <p className="text-sm text-muted-foreground">AI Monitoring</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ai-search" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ai-search">🤖 AI Search Control</TabsTrigger>
          <TabsTrigger value="dual-funding">💰 Funding Management</TabsTrigger>
          <TabsTrigger value="community-vault">🎁 Community Vault</TabsTrigger>
          <TabsTrigger value="live-dashboard">📊 Live Dashboard</TabsTrigger>
          <TabsTrigger value="rescue-ops">🚁 Rescue Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-search" className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Bot className="h-5 w-5" />
                AI-Powered Animal Discovery System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={aiMonitoringActive ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setAiMonitoringActive(!aiMonitoringActive)}
                  >
                    {aiMonitoringActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    {aiMonitoringActive ? 'AI Active' : 'AI Paused'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleAISearchOverride}>
                    <Settings className="h-4 w-4 mr-1" />
                    Override Parameters
                  </Button>
                </div>
                <Badge className="bg-green-600 text-white">
                  {searchedAnimals.length} Animals Discovered
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-300">Recently Discovered Animals</h4>
                  {searchedAnimals.map((animal) => (
                    <Card 
                      key={animal.id} 
                      className={`cursor-pointer transition-all ${selectedAnimal?.id === animal.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700'}`}
                      onClick={() => setSelectedAnimal(animal)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">{animal.name}</h5>
                            <p className="text-xs text-muted-foreground">{animal.species}</p>
                            <p className="text-xs text-blue-400">{animal.cardId}</p>
                          </div>
                          <Badge 
                            variant={animal.urgencyLevel > 8 ? "destructive" : animal.urgencyLevel > 6 ? "default" : "secondary"}
                          >
                            Urgency: {animal.urgencyLevel}/10
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin className="h-3 w-3" />
                          <span>{animal.location}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Rescue Progress</span>
                            <span>{animal.rescueProgress}%</span>
                          </div>
                          <Progress value={animal.rescueProgress} className="h-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedAnimal && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-300">Animal Details & Controls</h4>
                    <Card className="border-blue-500/30">
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <h5 className="font-medium text-lg">{selectedAnimal.name}</h5>
                          <p className="text-sm text-muted-foreground">{selectedAnimal.species}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Wallet className="h-4 w-4 text-green-400" />
                            <span className="text-xs font-mono">{selectedAnimal.walletAddress}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h6 className="text-sm font-medium text-blue-300">Emotional State (AI Tracked)</h6>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Sadness</span>
                                <span>{selectedAnimal.emotionalState.sadness}%</span>
                              </div>
                              <Progress value={selectedAnimal.emotionalState.sadness} className="h-1" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Hope</span>
                                <span>{selectedAnimal.emotionalState.hope}%</span>
                              </div>
                              <Progress value={selectedAnimal.emotionalState.hope} className="h-1" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Fear</span>
                                <span>{selectedAnimal.emotionalState.fear}%</span>
                              </div>
                              <Progress value={selectedAnimal.emotionalState.fear} className="h-1" />
                            </div>
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Trust</span>
                                <span>{selectedAnimal.emotionalState.trust}%</span>
                              </div>
                              <Progress value={selectedAnimal.emotionalState.trust} className="h-1" />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleForceFundingRelease(selectedAnimal.cardId)}
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            Emergency Fund
                          </Button>
                          <Button size="sm" variant="outline">
                            <Camera className="h-4 w-4 mr-1" />
                            Live Feed
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            Reports
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dual-funding" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-r from-green-900/10 to-emerald-900/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Shield className="h-5 w-5" />
                  Vault-Driven Support System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-400">
                      ${fundingMetrics.vaultFunding.totalAllocated.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">Total Allocated</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400">
                      {fundingMetrics.vaultFunding.activeRescues}
                    </div>
                    <p className="text-xs text-muted-foreground">Active Rescues</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-orange-400">
                      {fundingMetrics.vaultFunding.pendingReleases}
                    </div>
                    <p className="text-xs text-muted-foreground">Pending Releases</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Approve Pending Releases
                  </Button>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Increase Allocation Pool
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-900/10 to-pink-900/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <BarChart3 className="h-5 w-5" />
                  NFT Marketplace Revenue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-purple-400">
                      ${fundingMetrics.marketplaceFunding.nftSales.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">NFT Sales</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-pink-400">
                      ${fundingMetrics.marketplaceFunding.directDonations.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">Direct Donations</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyan-400">
                      ${fundingMetrics.marketplaceFunding.totalRevenue.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    View Revenue Analytics
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Marketplace Controls
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community-vault" className="space-y-4">
          <Card className="bg-gradient-to-r from-orange-900/10 to-red-900/10 border-orange-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Gift className="h-5 w-5" />
                Community Vault Administration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Removed legacy product cards */}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-400">{vaultStats.activeEvents}</div>
                  <p className="text-sm text-muted-foreground">Active Events</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{vaultStats.totalGifts}</div>
                  <p className="text-sm text-muted-foreground">Total Gifts</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{vaultStats.communityEngagement}%</div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live-dashboard" className="space-y-4">
          <Card className="bg-gradient-to-r from-cyan-900/10 to-blue-900/10 border-cyan-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Activity className="h-5 w-5" />
                Live Progress & Impact Dashboard Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">330</div>
                    <p className="text-sm text-muted-foreground">Successfully Rescued</p>
                    <Badge className="mt-2 bg-green-600">↑ 15 this week</Badge>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/30">
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-400">528</div>
                    <p className="text-sm text-muted-foreground">Active Rescues</p>
                    <Badge className="mt-2 bg-orange-600">↑ 23 today</Badge>
                  </CardContent>
                </Card>

                <Card className="border-red-500/30">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-400">858</div>
                    <p className="text-sm text-muted-foreground">Awaiting Rescue</p>
                    <Badge className="mt-2 bg-red-600">↑ 42 discovered</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-cyan-300">Dashboard Control Actions</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-1" />
                    Update Metrics
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Generate Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Verify Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-1" />
                    Broadcast Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rescue-ops" className="space-y-4">
          <Card className="bg-gradient-to-r from-red-900/10 to-orange-900/10 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="h-5 w-5" />
                Rescue Operations Command Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-300">Active Mission Control</h4>
                  <div className="space-y-2">
                    <Card className="border-orange-500/30 bg-orange-900/10">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">Operation Arctic Freedom</h5>
                            <p className="text-xs text-muted-foreground">Luna - Siberian Tiger</p>
                          </div>
                          <Badge className="bg-orange-600">In Progress</Badge>
                        </div>
                        <Progress value={45} className="mt-2 h-1" />
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            Team
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            Location
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-500/30 bg-green-900/10">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">Operation Sky Guardian</h5>
                            <p className="text-xs text-muted-foreground">Sunny - Golden Eagle</p>
                          </div>
                          <Badge className="bg-green-600">Near Complete</Badge>
                        </div>
                        <Progress value={72} className="mt-2 h-1" />
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            Team
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            Location
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-red-300">Emergency Controls</h4>
                  <div className="space-y-2">
                    <Button className="w-full" variant="destructive">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Emergency Response Protocol
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Deploy Additional Teams
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Zap className="h-4 w-4 mr-2" />
                      Priority Funding Release
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      Global Coordination Hub
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnimalWelfareControlPanel