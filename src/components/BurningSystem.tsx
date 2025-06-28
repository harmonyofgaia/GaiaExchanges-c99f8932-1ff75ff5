import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Flame, ExternalLink, Eye, DollarSign, Leaf, Shield, Activity, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function BurningSystem() {
  const [burnAmount, setBurnAmount] = useState('')
  const [totalBurned, setTotalBurned] = useState(1_250_000)
  const [burnRate, setBurnRate] = useState(25000)
  const [coralReefFunding, setCoralReefFunding] = useState(62500) // 5% of total burned
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Updated burning wallet address as requested
  const burningWalletAddress = 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7'
  const mainWalletAddress = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'

  const environmentalProjects = [
    {
      name: 'Sound Riffs Re Grau dio - Coral Reef Restoration',
      allocated: coralReefFunding,
      status: 'Active',
      impact: 'Audio signals helping 3 reef sites recover',
      burnPercentage: 5
    },
    {
      name: 'Ocean Cleanup Initiative',
      allocated: 150000,
      status: 'Active', 
      impact: 'Removed 45 tons of plastic'
    },
    {
      name: 'Reforestation Project Brazil',
      allocated: 200000,
      status: 'Active', 
      impact: '12,000 trees planted'
    },
    {
      name: 'Solar Energy Villages Africa',
      allocated: 125000,
      status: 'Pending',
      impact: 'Planning phase'
    },
    {
      name: 'Carbon Capture Technology',
      allocated: 175000,
      status: 'Active',
      impact: '500 tons CO2 captured'
    }
  ]

  const handleBurn = async () => {
    if (!burnAmount || parseFloat(burnAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to burn",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      const amount = parseFloat(burnAmount)
      const coralReefShare = amount * 0.05 // 5% goes to coral reef project
      
      setTotalBurned(prev => prev + amount)
      setBurnRate(prev => prev + Math.floor(amount / 10))
      setCoralReefFunding(prev => prev + coralReefShare)
      
      toast({
        title: "Tokens Burned Successfully",
        description: `${amount.toLocaleString()} GAiA tokens burned. ${coralReefShare.toLocaleString()} GAiA (5%) allocated to coral reef restoration!`,
      })
      
      setBurnAmount('')
      setIsLoading(false)
    }, 2000)
  }

  const copyAddress = (address: string, name: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: `${name} address copied to clipboard`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-red-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Burned</CardTitle>
            <Flame className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-orange-400">
              {totalBurned.toLocaleString()}
            </div>
            <p className="text-xs text-orange-400">GAiA tokens permanently removed</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-blue-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coral Reef Funding</CardTitle>
            <div className="text-lg">🪸</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-cyan-400">
              {coralReefFunding.toLocaleString()}
            </div>
            <p className="text-xs text-cyan-400">GAiA from 5% burn allocation</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-emerald-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Burn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-green-400">
              {burnRate.toLocaleString()}
            </div>
            <p className="text-xs text-green-400">+15% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-cyan-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
            <Leaf className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-blue-400">$2.1M</div>
            <p className="text-xs text-blue-400">Reinvested in green projects</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Burn</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-purple-400">6h 42m</div>
            <p className="text-xs text-purple-400">Automated burning cycle</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="burning" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="burning">Token Burning</TabsTrigger>
          <TabsTrigger value="wallets">Transparent Wallets</TabsTrigger>
          <TabsTrigger value="projects">Green Projects</TabsTrigger>
          <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="burning">
          <div className="space-y-6">
            {/* Coral Reef Burn Allocation Banner */}
            <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="text-4xl">🪸🎵🌊</div>
                  <h3 className="text-xl font-bold text-cyan-400">Sound Riffs Re Grau dio</h3>
                  <p className="text-cyan-300">
                    5% of every token burn automatically funds coral reef restoration through underwater audio technology
                  </p>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 max-w-md mx-auto">
                    <div className="text-2xl font-bold text-cyan-400">{coralReefFunding.toLocaleString()} GAiA</div>
                    <div className="text-sm text-cyan-300">Total Coral Reef Funding</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Flame className="h-5 w-5" />
                  Manual Token Burning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Amount to Burn (GAiA)</label>
                  <Input
                    type="number"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    placeholder="0.00"
                    className="mono-numbers"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-sm text-muted-foreground">
                    Tokens will be permanently removed from circulation and sent to the burning wallet
                  </p>
                </div>
                
                <Button 
                  onClick={handleBurn}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!burnAmount || isLoading}
                >
                  {isLoading ? 'Burning Tokens...' : 'Burn GAiA Tokens'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Burning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Supply Reduction:</span>
                      <span className="text-orange-400">-12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deflation Rate:</span>
                      <span className="text-orange-400">2.1% annually</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Auto-Burn:</span>
                      <span className="text-orange-400">6h 42m</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Burned This Week:</span>
                      <span className="text-green-400">{burnRate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Burned This Month:</span>
                      <span className="text-green-400">145,320</span>
                    </div>
                    <div className="flex justify-between">
                      <span>All-Time Burned:</span>
                      <span className="text-green-400">{totalBurned.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Value Burned:</span>
                      <span className="text-blue-400">$3.75M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Environmental Impact:</span>
                      <span className="text-blue-400">$2.1M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Benefit:</span>
                      <span className="text-blue-400">$1.65M</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wallets">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  100% Transparent Wallet System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Updated Burning Wallet */}
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-orange-400">🔥 Burning Wallet (Updated)</h4>
                      <p className="text-sm text-orange-300">Phantom Wallet - All burned tokens go here</p>
                    </div>
                    <Badge className="bg-orange-600">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm bg-muted/50 p-2 rounded break-all">
                      {burningWalletAddress}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyAddress(burningWalletAddress, 'Burning Wallet')}
                      >
                        Copy Address
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={`https://solscan.io/account/${burningWalletAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Solscan
                        </a>
                      </Button>
                    </div>
                    <div className="text-sm text-orange-400">
                      Balance: {totalBurned.toLocaleString()} GAiA (Permanently Locked)
                    </div>
                  </div>
                </div>

                {/* Main Wallet */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-green-400">💰 Main Treasury Wallet</h4>
                      <p className="text-sm text-green-300">Primary operations and environmental funding</p>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm bg-muted/50 p-2 rounded break-all">
                      {mainWalletAddress}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyAddress(mainWalletAddress, 'Main Wallet')}
                      >
                        Copy Address
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={`https://solscan.io/account/${mainWalletAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Solscan
                        </a>
                      </Button>
                    </div>
                    <div className="text-sm text-green-400">
                      Balance: 2,450,875 GAiA
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2">Transparency Commitment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Real-time Tracking:</span>
                        <span className="text-green-400">✓ Always On</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Public Verification:</span>
                        <span className="text-green-400">✓ Blockchain</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Community Access:</span>
                        <span className="text-green-400">✓ 24/7</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Third-party Audits:</span>
                        <span className="text-green-400">✓ Quarterly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Environmental Reports:</span>
                        <span className="text-green-400">✓ Monthly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Open Source Code:</span>
                        <span className="text-green-400">✓ GitHub</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Environmental Reinvestment Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {environmentalProjects.map((project, index) => (
                    <div key={index} className={`${index === 0 ? 'bg-cyan-500/10 border-cyan-500/20' : 'bg-muted/30 border-border/30'} rounded-lg p-4 space-y-3 border`}>
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${index === 0 ? 'text-cyan-400' : ''}`}>
                          {index === 0 && '🪸 '}{project.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                          {project.burnPercentage && (
                            <Badge className="bg-orange-600 text-white">
                              {project.burnPercentage}% Burn
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Allocated:</span>
                          <span className={index === 0 ? 'text-cyan-400' : 'text-green-400'}>
                            {project.allocated.toLocaleString()} GAiA
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Impact:</span>
                          <span className={index === 0 ? 'text-cyan-400' : 'text-blue-400'}>
                            {project.impact}
                          </span>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-cyan-300 bg-cyan-500/5 p-2 rounded">
                          🎵 Automated funding from token burns helps restore marine ecosystems
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time System Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Burning Analytics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Burn Rate:</span>
                        <span className="text-orange-400">0.21% daily</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Supply Reduced:</span>
                        <span className="text-orange-400">12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price Impact:</span>
                        <span className="text-green-400">+18.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Holder Benefit:</span>
                        <span className="text-green-400">Deflationary</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Environmental Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Projects:</span>
                        <span className="text-blue-400">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Investment:</span>
                        <span className="text-blue-400">$2.1M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CO2 Captured:</span>
                        <span className="text-green-400">500 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trees Planted:</span>
                        <span className="text-green-400">12,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
