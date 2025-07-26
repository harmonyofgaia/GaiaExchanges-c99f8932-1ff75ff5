import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wallet, 
  ShoppingCart, 
  TrendingUp, 
  Heart, 
  Zap,
  Shield,
  Target,
  ArrowRightLeft,
  DollarSign,
  Globe,
  Activity,
  Timer,
  Sparkles,
  Crown,
  Gift
} from 'lucide-react'
import { toast } from 'sonner'

interface FundingStats {
  vaultFunding: {
    total: number
    daily: number
    contributors: number
    avgContribution: number
  }
  marketplaceFunding: {
    total: number
    dailySales: number
    totalNFTsSold: number
    avgNFTPrice: number
  }
  combinedImpact: {
    totalRescued: number
    animalsSupported: number
    habitatsBuilt: number
    careProvided: number
  }
}

interface FundingFlow {
  id: string
  source: 'vault' | 'marketplace'
  amount: number
  destination: string
  purpose: string
  timestamp: string
  animalBenefited: string
  impactGenerated: string
}

export function DualFundingMechanisms() {
  const [fundingStats, setFundingStats] = useState<FundingStats>({
    vaultFunding: {
      total: 2847562.50,
      daily: 12847.25,
      contributors: 15847,
      avgContribution: 179.50
    },
    marketplaceFunding: {
      total: 1934785.75,
      dailySales: 8924.50,
      totalNFTsSold: 3421,
      avgNFTPrice: 565.75
    },
    combinedImpact: {
      totalRescued: 1247,
      animalsSupported: 8456,
      habitatsBuilt: 87,
      careProvided: 24567
    }
  })

  const [recentFlows, setRecentFlows] = useState<FundingFlow[]>([
    {
      id: 'flow_001',
      source: 'vault',
      amount: 2500,
      destination: 'Luna Wolf Rescue',
      purpose: 'Emergency Medical Care',
      timestamp: '2024-01-20T14:30:00Z',
      animalBenefited: 'Luna - Arctic Wolf',
      impactGenerated: 'Life-saving surgery completed'
    },
    {
      id: 'flow_002',
      source: 'marketplace',
      amount: 1850,
      destination: 'Tiger Sanctuary Thailand',
      purpose: 'Habitat Expansion',
      timestamp: '2024-01-20T13:15:00Z',
      animalBenefited: 'Freedom - Tiger',
      impactGenerated: '200m² new habitat space'
    },
    {
      id: 'flow_003',
      source: 'vault',
      amount: 950,
      destination: 'Elephant Care Center',
      purpose: 'Daily Care & Feeding',
      timestamp: '2024-01-20T12:45:00Z',
      animalBenefited: 'Sunny - Elephant',
      impactGenerated: '30 days of premium care'
    }
  ])

  const [selectedFundingMethod, setSelectedFundingMethod] = useState<'vault' | 'marketplace' | 'combined'>('combined')

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setFundingStats(prev => ({
        ...prev,
        vaultFunding: {
          ...prev.vaultFunding,
          total: prev.vaultFunding.total + (Math.random() * 100),
          daily: prev.vaultFunding.daily + (Math.random() * 50)
        },
        marketplaceFunding: {
          ...prev.marketplaceFunding,
          total: prev.marketplaceFunding.total + (Math.random() * 75),
          dailySales: prev.marketplaceFunding.dailySales + (Math.random() * 30)
        },
        combinedImpact: {
          ...prev.combinedImpact,
          animalsSupported: prev.combinedImpact.animalsSupported + Math.floor(Math.random() * 2),
          careProvided: prev.combinedImpact.careProvided + Math.floor(Math.random() * 5)
        }
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const initiateVaultFunding = (amount: number, purpose: string) => {
    const newFlow: FundingFlow = {
      id: `flow_${Date.now()}`,
      source: 'vault',
      amount,
      destination: 'Animal Welfare Vault',
      purpose,
      timestamp: new Date().toISOString(),
      animalBenefited: 'Multiple Animals',
      impactGenerated: `$${amount} allocated for ${purpose.toLowerCase()}`
    }

    setRecentFlows(prev => [newFlow, ...prev.slice(0, 9)])
    
    setFundingStats(prev => ({
      ...prev,
      vaultFunding: {
        ...prev.vaultFunding,
        total: prev.vaultFunding.total + amount,
        contributors: prev.vaultFunding.contributors + 1
      }
    }))

    toast.success('🏦 Vault Funding Initiated!', {
      description: `$${amount} allocated from Vault for ${purpose}`,
      duration: 5000
    })
  }

  const initiateMarketplaceFunding = (amount: number, nftType: string) => {
    const newFlow: FundingFlow = {
      id: `flow_${Date.now()}`,
      source: 'marketplace',
      amount,
      destination: 'NFT Marketplace Sales',
      purpose: `${nftType} NFT Sale`,
      timestamp: new Date().toISOString(),
      animalBenefited: 'Direct Animal Support',
      impactGenerated: `$${amount} from NFT marketplace sale`
    }

    setRecentFlows(prev => [newFlow, ...prev.slice(0, 9)])
    
    setFundingStats(prev => ({
      ...prev,
      marketplaceFunding: {
        ...prev.marketplaceFunding,
        total: prev.marketplaceFunding.total + amount,
        totalNFTsSold: prev.marketplaceFunding.totalNFTsSold + 1
      }
    }))

    toast.success('🏪 Marketplace Sale Complete!', {
      description: `$${amount} generated from ${nftType} NFT sale for animal welfare`,
      duration: 5000
    })
  }

  const getFundingSourceIcon = (source: 'vault' | 'marketplace') => {
    return source === 'vault' ? Wallet : ShoppingCart
  }

  const getFundingSourceColor = (source: 'vault' | 'marketplace') => {
    return source === 'vault' ? 'text-blue-400' : 'text-green-400'
  }

  return (
    <div className="space-y-6">
      {/* Dual Funding Overview */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
            <ArrowRightLeft className="h-6 w-6" />
            🔄 DUAL FUNDING MECHANISMS - VAULT & MARKETPLACE
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Revolutionary dual-stream funding combining Vault-driven support and direct NFT marketplace revenue
          </p>
        </CardHeader>
        <CardContent>
          {/* Funding Method Selector */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Button
              onClick={() => setSelectedFundingMethod('vault')}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                selectedFundingMethod === 'vault' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-600'
              }`}
            >
              <Wallet className="h-6 w-6" />
              <span className="font-bold">Vault Funding</span>
              <span className="text-xs">Community Pool</span>
            </Button>
            <Button
              onClick={() => setSelectedFundingMethod('marketplace')}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                selectedFundingMethod === 'marketplace' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-600'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="font-bold">Marketplace Sales</span>
              <span className="text-xs">Direct NFT Revenue</span>
            </Button>
            <Button
              onClick={() => setSelectedFundingMethod('combined')}
              className={`p-4 h-auto flex flex-col items-center gap-2 ${
                selectedFundingMethod === 'combined' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-600'
              }`}
            >
              <Sparkles className="h-6 w-6" />
              <span className="font-bold">Combined Power</span>
              <span className="text-xs">Maximum Impact</span>
            </Button>
          </div>

          {/* Funding Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
              <Wallet className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">${(fundingStats.vaultFunding.total / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-muted-foreground">Vault Total</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30">
              <ShoppingCart className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">${(fundingStats.marketplaceFunding.total / 1000000).toFixed(2)}M</div>
              <div className="text-xs text-muted-foreground">Marketplace Total</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
              <Heart className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{fundingStats.combinedImpact.totalRescued.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Animals Rescued</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/30">
              <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{fundingStats.combinedImpact.animalsSupported.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Animals Supported</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Method Details */}
      <Tabs value={selectedFundingMethod} onValueChange={(value) => setSelectedFundingMethod(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vault">🏦 Vault Funding</TabsTrigger>
          <TabsTrigger value="marketplace">🏪 Marketplace Sales</TabsTrigger>
          <TabsTrigger value="combined">⚡ Combined Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="vault" className="space-y-6">
          <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Wallet className="h-6 w-6" />
                Community Vault-Driven Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vault Stats */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
                    <h4 className="font-bold text-blue-400 mb-3">Vault Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Vault Funds:</span>
                        <span className="text-blue-400 font-bold">${fundingStats.vaultFunding.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Contributions:</span>
                        <span className="text-green-400">${fundingStats.vaultFunding.daily.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Contributors:</span>
                        <span className="text-yellow-400">{fundingStats.vaultFunding.contributors.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Contribution:</span>
                        <span className="text-purple-400">${fundingStats.vaultFunding.avgContribution.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vault Funding Actions */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-blue-400">Quick Vault Funding</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => initiateVaultFunding(500, 'Emergency Rescue')}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-xs"
                      >
                        Emergency $500
                      </Button>
                      <Button 
                        onClick={() => initiateVaultFunding(1000, 'Medical Care')}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-xs"
                      >
                        Medical $1000
                      </Button>
                      <Button 
                        onClick={() => initiateVaultFunding(2500, 'Habitat Construction')}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-xs"
                      >
                        Habitat $2500
                      </Button>
                      <Button 
                        onClick={() => initiateVaultFunding(5000, 'Long-term Care')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                      >
                        Care $5000
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Vault Flow Visualization */}
                <div className="space-y-4">
                  <h4 className="font-bold text-blue-400">Vault Funding Flow</h4>
                  <div className="space-y-3">
                    {recentFlows.filter(flow => flow.source === 'vault').slice(0, 4).map((flow) => (
                      <div key={flow.id} className="p-3 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-blue-400" />
                            <span className="font-bold text-blue-400">${flow.amount.toLocaleString()}</span>
                          </div>
                          <Badge className="bg-blue-600 text-white text-xs">VAULT</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>{flow.purpose} → {flow.destination}</div>
                          <div className="text-green-400">{flow.impactGenerated}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <ShoppingCart className="h-6 w-6" />
                Direct NFT Marketplace Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Marketplace Stats */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30">
                    <h4 className="font-bold text-green-400 mb-3">Marketplace Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Sales Revenue:</span>
                        <span className="text-green-400 font-bold">${fundingStats.marketplaceFunding.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Sales:</span>
                        <span className="text-blue-400">${fundingStats.marketplaceFunding.dailySales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NFTs Sold:</span>
                        <span className="text-yellow-400">{fundingStats.marketplaceFunding.totalNFTsSold.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg NFT Price:</span>
                        <span className="text-purple-400">${fundingStats.marketplaceFunding.avgNFTPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Marketplace Actions */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-green-400">Simulate NFT Sales</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => initiateMarketplaceFunding(250, 'Common Animal')}
                        className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-xs"
                      >
                        Common $250
                      </Button>
                      <Button 
                        onClick={() => initiateMarketplaceFunding(750, 'Rare Animal')}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-xs"
                      >
                        Rare $750
                      </Button>
                      <Button 
                        onClick={() => initiateMarketplaceFunding(1500, 'Epic Animal')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs"
                      >
                        Epic $1500
                      </Button>
                      <Button 
                        onClick={() => initiateMarketplaceFunding(3500, 'Legendary Animal')}
                        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-xs"
                      >
                        Legend $3500
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Marketplace Flow Visualization */}
                <div className="space-y-4">
                  <h4 className="font-bold text-green-400">Marketplace Sales Flow</h4>
                  <div className="space-y-3">
                    {recentFlows.filter(flow => flow.source === 'marketplace').slice(0, 4).map((flow) => (
                      <div key={flow.id} className="p-3 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="h-4 w-4 text-green-400" />
                            <span className="font-bold text-green-400">${flow.amount.toLocaleString()}</span>
                          </div>
                          <Badge className="bg-green-600 text-white text-xs">MARKETPLACE</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>{flow.purpose} → {flow.destination}</div>
                          <div className="text-blue-400">{flow.impactGenerated}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combined" className="space-y-6">
          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Sparkles className="h-6 w-6" />
                Combined Impact Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Combined Impact Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-red-900/40 to-pink-900/40 rounded-lg border border-red-500/30">
                  <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">{fundingStats.combinedImpact.totalRescued.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Rescued</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-lg border border-blue-500/30">
                  <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{fundingStats.combinedImpact.animalsSupported.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Animals Supported</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30">
                  <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{fundingStats.combinedImpact.habitatsBuilt.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Habitats Built</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 rounded-lg border border-yellow-500/30">
                  <Activity className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">{fundingStats.combinedImpact.careProvided.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Care Instances</div>
                </div>
              </div>

              {/* Unified Funding Flow */}
              <div className="space-y-4">
                <h4 className="font-bold text-purple-400">All Funding Flows - Live Stream</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentFlows.map((flow) => {
                    const Icon = getFundingSourceIcon(flow.source)
                    const colorClass = getFundingSourceColor(flow.source)
                    
                    return (
                      <div key={flow.id} className="p-3 bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-lg border border-gray-500/20 hover:scale-105 transition-transform duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${colorClass}`} />
                            <span className={`font-bold ${colorClass}`}>${flow.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${flow.source === 'vault' ? 'bg-blue-600' : 'bg-green-600'} text-white text-xs`}>
                              {flow.source.toUpperCase()}
                            </Badge>
                            <Timer className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {new Date(flow.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div className="mb-1">{flow.purpose} → {flow.destination}</div>
                          <div className="text-purple-400">🐾 {flow.animalBenefited}</div>
                          <div className="text-green-400">✨ {flow.impactGenerated}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Combined Funding Progress */}
              <div className="p-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-purple-400 mb-3">Total Funding Power</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Combined Daily Impact:</span>
                      <span className="text-purple-400 font-bold">${(fundingStats.vaultFunding.daily + fundingStats.marketplaceFunding.dailySales).toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={((fundingStats.vaultFunding.daily + fundingStats.marketplaceFunding.dailySales) / 25000) * 100} 
                      className="h-3" 
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Daily Goal: $25,000 combined from both funding streams
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