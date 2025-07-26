import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sprout, Apple, Carrot, Sun, Droplets, Scissors } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { gaiaTokenService } from '@/services/gaiaTokenService'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface CropData {
  id: string
  name: string
  type: 'vegetable' | 'fruit' | 'herb' | 'grain'
  planted: Date
  harvestReady: Date
  growth: number
  gaiaTokensEarned: number
  yieldExpected: number
  carbonOffset: number
  waterUsed: number
  status: 'growing' | 'ready' | 'harvested'
}

interface GardenPlot {
  id: string
  name: string
  crops: CropData[]
  size: number // square meters
  soilQuality: number
  totalGaiaEarned: number
  totalCarbonOffset: number
}

export default function HomeGrownFood() {
  const [gardenPlots, setGardenPlots] = useState<GardenPlot[]>([
    {
      id: '1',
      name: 'Backyard Garden',
      size: 25,
      soilQuality: 85,
      totalGaiaEarned: 340,
      totalCarbonOffset: 45.8,
      crops: [
        {
          id: '1',
          name: 'Tomatoes',
          type: 'vegetable',
          planted: new Date('2024-03-15'),
          harvestReady: new Date('2024-06-15'),
          growth: 78,
          gaiaTokensEarned: 45,
          yieldExpected: 12,
          carbonOffset: 8.5,
          waterUsed: 120,
          status: 'growing'
        },
        {
          id: '2',
          name: 'Lettuce',
          type: 'vegetable',
          planted: new Date('2024-04-01'),
          harvestReady: new Date('2024-05-30'),
          growth: 95,
          gaiaTokensEarned: 25,
          yieldExpected: 8,
          carbonOffset: 3.2,
          waterUsed: 60,
          status: 'ready'
        }
      ]
    }
  ])
  
  const [userGaiaBalance, setUserGaiaBalance] = useState(0)
  const [isPlanting, setIsPlanting] = useState(false)

  useEffect(() => {
    const fetchBalance = async () => {
      const tokenData = await gaiaTokenService.fetchLiveTokenData()
      setUserGaiaBalance(1250) // Simulated user balance
    }
    fetchBalance()
  }, [])

  const plantCrop = async (plotId: string, cropName: string, cost: number) => {
    if (userGaiaBalance < cost) {
      toast.error('Insufficient GAIA tokens', {
        description: `You need ${cost} GAIA tokens to plant ${cropName}`
      })
      return
    }

    setIsPlanting(true)
    try {
      console.log(`Planting ${cropName} with ${cost} GAIA tokens`)
      console.log(`Contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`)
      console.log(`Wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newCrop: CropData = {
        id: Date.now().toString(),
        name: cropName,
        type: 'vegetable',
        planted: new Date(),
        harvestReady: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        growth: 0,
        gaiaTokensEarned: 0,
        yieldExpected: Math.floor(Math.random() * 15) + 5,
        carbonOffset: Math.random() * 10 + 2,
        waterUsed: 0,
        status: 'growing'
      }
      
      setGardenPlots(prev => prev.map(plot => 
        plot.id === plotId 
          ? { ...plot, crops: [...plot.crops, newCrop] }
          : plot
      ))
      
      setUserGaiaBalance(prev => prev - cost)
      
      toast.success(`Successfully planted ${cropName}!`, {
        description: 'Your crop is now growing and will earn GAIA tokens'
      })
    } catch (error) {
      toast.error('Planting failed', {
        description: 'Please try again later'
      })
    } finally {
      setIsPlanting(false)
    }
  }

  const harvestCrop = async (plotId: string, cropId: string) => {
    try {
      const plot = gardenPlots.find(p => p.id === plotId)
      const crop = plot?.crops.find(c => c.id === cropId)
      
      if (!crop || crop.status !== 'ready') {
        toast.error('Crop not ready for harvest')
        return
      }

      // Calculate harvest rewards
      const harvestReward = Math.floor(crop.yieldExpected * 2.5) // GAIA per unit yield
      
      console.log(`Harvesting ${crop.name} for ${harvestReward} GAIA tokens`)
      console.log(`Carbon offset: ${crop.carbonOffset} kg CO2`)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setGardenPlots(prev => prev.map(plot => 
        plot.id === plotId 
          ? {
              ...plot,
              totalGaiaEarned: plot.totalGaiaEarned + harvestReward,
              totalCarbonOffset: plot.totalCarbonOffset + crop.carbonOffset,
              crops: plot.crops.map(c => 
                c.id === cropId ? { ...c, status: 'harvested' as const, gaiaTokensEarned: harvestReward } : c
              )
            }
          : plot
      ))
      
      setUserGaiaBalance(prev => prev + harvestReward)
      
      toast.success(`Harvested ${crop.name}!`, {
        description: `Earned ${harvestReward} GAIA tokens and offset ${crop.carbonOffset.toFixed(1)} kg CO2`
      })
    } catch (error) {
      toast.error('Harvest failed', {
        description: 'Please try again later'
      })
    }
  }

  const createNewPlot = async () => {
    const plotCost = 200
    if (userGaiaBalance < plotCost) {
      toast.error(`Insufficient GAIA tokens. Need ${plotCost} GAIA to create new plot.`)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newPlot: GardenPlot = {
        id: Date.now().toString(),
        name: `Garden Plot ${gardenPlots.length + 1}`,
        crops: [],
        size: 16,
        soilQuality: 75,
        totalGaiaEarned: 0,
        totalCarbonOffset: 0
      }
      
      setGardenPlots(prev => [...prev, newPlot])
      setUserGaiaBalance(prev => prev - plotCost)
      
      toast.success('New garden plot created!', {
        description: 'You can now plant crops in your new plot'
      })
    } catch (error) {
      toast.error('Failed to create plot')
    }
  }

  const getTotalStats = () => {
    const totalGaia = gardenPlots.reduce((sum, plot) => sum + plot.totalGaiaEarned, 0)
    const totalCarbon = gardenPlots.reduce((sum, plot) => sum + plot.totalCarbonOffset, 0)
    const totalCrops = gardenPlots.reduce((sum, plot) => sum + plot.crops.length, 0)
    
    return { totalGaia, totalCarbon, totalCrops }
  }

  const cropTypes = [
    { name: 'Tomatoes', cost: 15, icon: '🍅' },
    { name: 'Carrots', cost: 10, icon: '🥕' },
    { name: 'Lettuce', cost: 8, icon: '🥬' },
    { name: 'Peppers', cost: 12, icon: '🌶️' },
    { name: 'Herbs', cost: 6, icon: '🌿' },
    { name: 'Spinach', cost: 9, icon: '🥬' }
  ]

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-yellow-900/20 to-brown-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            🌱 Home-Grown Food Network
          </h1>
          <p className="text-xl text-muted-foreground">
            Grow your own food, earn GAIA tokens, and offset carbon through sustainable agriculture
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Garden Plots</p>
                  <p className="text-2xl font-bold text-green-400">{gardenPlots.length}</p>
                </div>
                <Sprout className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Crops</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.totalCrops}</p>
                </div>
                <Apple className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GAIA Earned</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalGaia}</p>
                </div>
                <Sun className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CO2 Offset (kg)</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.totalCarbon.toFixed(1)}</p>
                </div>
                <Droplets className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="plots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="plots">My Garden Plots</TabsTrigger>
            <TabsTrigger value="plant">Plant Crops</TabsTrigger>
            <TabsTrigger value="marketplace">Seed Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="plots" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gardenPlots.map((plot) => (
                <Card key={plot.id} className="border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-green-400">{plot.name}</span>
                      <Badge className="bg-green-600">
                        {plot.size}m²
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Soil Quality</p>
                        <p className="font-bold text-green-400">{plot.soilQuality}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GAIA Balance</p>
                        <p className="font-bold text-yellow-400">{userGaiaBalance}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Active Crops:</h4>
                      {plot.crops.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No crops planted yet</p>
                      ) : (
                        plot.crops.map((crop) => (
                          <div key={crop.id} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{crop.name}</span>
                              <Badge variant={
                                crop.status === 'ready' ? 'default' : 
                                crop.status === 'harvested' ? 'secondary' : 'outline'
                              }>
                                {crop.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Growth</span>
                                <span>{crop.growth}%</span>
                              </div>
                              <Progress value={crop.growth} />
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">Expected Yield: </span>
                                <span className="font-medium">{crop.yieldExpected} units</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">GAIA Earned: </span>
                                <span className="font-medium text-yellow-400">{crop.gaiaTokensEarned}</span>
                              </div>
                            </div>

                            {crop.status === 'ready' && (
                              <Button 
                                onClick={() => harvestCrop(plot.id, crop.id)}
                                className="w-full mt-2 bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                <Scissors className="h-3 w-3 mr-1" />
                                Harvest Now
                              </Button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-yellow-500/20">
              <CardContent className="p-6 text-center">
                <Sprout className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Expand Your Garden</h3>
                <p className="text-muted-foreground mb-4">
                  Create a new garden plot to grow more crops and earn more GAIA tokens
                </p>
                <Button 
                  onClick={createNewPlot}
                  className="bg-yellow-600 hover:bg-yellow-700"
                  disabled={userGaiaBalance < 200}
                >
                  Create New Plot (200 GAIA)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plant" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cropTypes.map((cropType) => (
                <Card key={cropType.name} className="border-green-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{cropType.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{cropType.name}</h3>
                    <p className="text-muted-foreground mb-4">Cost: {cropType.cost} GAIA</p>
                    
                    <select 
                      className="w-full p-2 mb-4 bg-background border border-border rounded"
                      onChange={(e) => {
                        if (e.target.value) {
                          plantCrop(e.target.value, cropType.name, cropType.cost)
                          e.target.value = ''
                        }
                      }}
                      disabled={isPlanting || userGaiaBalance < cropType.cost}
                    >
                      <option value="">Select garden plot...</option>
                      {gardenPlots.map((plot) => (
                        <option key={plot.id} value={plot.id}>
                          {plot.name} ({plot.crops.length} crops)
                        </option>
                      ))}
                    </select>
                    
                    {userGaiaBalance < cropType.cost && (
                      <p className="text-sm text-red-400">Insufficient GAIA tokens</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Seed Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <Carrot className="h-16 w-16 text-blue-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Trade seeds with other gardeners, discover rare varieties, and 
                      participate in seasonal growing challenges.
                    </p>
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