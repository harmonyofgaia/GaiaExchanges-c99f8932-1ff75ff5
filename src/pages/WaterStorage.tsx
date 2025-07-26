import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Droplets, CloudRain, Zap, Gauge, Archive, Beaker } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { gaiaTokenService } from '@/services/gaiaTokenService'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

interface WaterStorageSystem {
  id: string
  name: string
  type: 'rainwater' | 'greywater' | 'purified' | 'underground'
  capacity: number // liters
  currentLevel: number // liters
  location: string
  gaiaTokensEarned: number
  purificationLevel: number
  lastMaintenance: Date
  efficiency: number
  carbonSavings: number
  status: 'active' | 'maintenance' | 'full' | 'empty'
}

interface WaterUsageData {
  date: Date
  consumed: number
  collected: number
  purified: number
  gaiaEarned: number
}

export default function WaterStorage() {
  const [storageSystems, setStorageSystems] = useState<WaterStorageSystem[]>([
    {
      id: '1',
      name: 'Rooftop Rainwater Collector',
      type: 'rainwater',
      capacity: 5000,
      currentLevel: 3750,
      location: 'Main Building Roof',
      gaiaTokensEarned: 285,
      purificationLevel: 95,
      lastMaintenance: new Date('2024-01-15'),
      efficiency: 87,
      carbonSavings: 145.5,
      status: 'active'
    },
    {
      id: '2',
      name: 'Greywater Recycling Unit',
      type: 'greywater',
      capacity: 2000,
      currentLevel: 1200,
      location: 'Basement',
      gaiaTokensEarned: 195,
      purificationLevel: 78,
      lastMaintenance: new Date('2024-02-01'),
      efficiency: 72,
      carbonSavings: 89.3,
      status: 'active'
    }
  ])

  const [usageHistory, setUsageHistory] = useState<WaterUsageData[]>([
    {
      date: new Date('2024-01-01'),
      consumed: 450,
      collected: 1200,
      purified: 800,
      gaiaEarned: 15
    }
  ])
  
  const [userGaiaBalance, setUserGaiaBalance] = useState(0)
  const [isUpgrading, setIsUpgrading] = useState(false)

  useEffect(() => {
    const fetchBalance = async () => {
      const tokenData = await gaiaTokenService.fetchLiveTokenData()
      setUserGaiaBalance(1250) // Simulated user balance
    }
    fetchBalance()
  }, [])

  const upgradeSystem = async (systemId: string, upgradeCost: number) => {
    if (userGaiaBalance < upgradeCost) {
      toast.error('Insufficient GAIA tokens', {
        description: `You need ${upgradeCost} GAIA tokens for this upgrade`
      })
      return
    }

    setIsUpgrading(true)
    try {
      console.log(`Upgrading water storage system ${systemId} with ${upgradeCost} GAIA tokens`)
      console.log(`Contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`)
      console.log(`Wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStorageSystems(prev => prev.map(system => 
        system.id === systemId 
          ? { 
              ...system, 
              efficiency: Math.min(system.efficiency + 10, 100),
              purificationLevel: Math.min(system.purificationLevel + 8, 100),
              capacity: Math.floor(system.capacity * 1.2)
            }
          : system
      ))
      
      setUserGaiaBalance(prev => prev - upgradeCost)
      
      toast.success('Water storage system upgraded!', {
        description: 'Improved efficiency and purification levels'
      })
    } catch (error) {
      toast.error('Upgrade failed', {
        description: 'Please try again later'
      })
    } finally {
      setIsUpgrading(false)
    }
  }

  const collectWater = async (systemId: string) => {
    try {
      const system = storageSystems.find(s => s.id === systemId)
      if (!system) return

      // Simulate water collection based on weather and system type
      const collectionAmount = Math.floor(Math.random() * 500) + 200
      const gaiaReward = Math.floor(collectionAmount / 50) // 1 GAIA per 50L collected
      
      console.log(`Collecting ${collectionAmount}L water, earning ${gaiaReward} GAIA`)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStorageSystems(prev => prev.map(s => 
        s.id === systemId 
          ? { 
              ...s, 
              currentLevel: Math.min(s.currentLevel + collectionAmount, s.capacity),
              gaiaTokensEarned: s.gaiaTokensEarned + gaiaReward,
              carbonSavings: s.carbonSavings + (collectionAmount * 0.001) // 1g CO2 per liter
            }
          : s
      ))
      
      setUserGaiaBalance(prev => prev + gaiaReward)
      
      toast.success(`Collected ${collectionAmount}L water!`, {
        description: `Earned ${gaiaReward} GAIA tokens`
      })
    } catch (error) {
      toast.error('Water collection failed')
    }
  }

  const purifyWater = async (systemId: string, amount: number) => {
    const purificationCost = Math.floor(amount / 100) // 1 GAIA per 100L
    
    if (userGaiaBalance < purificationCost) {
      toast.error(`Need ${purificationCost} GAIA tokens to purify ${amount}L`)
      return
    }

    try {
      console.log(`Purifying ${amount}L water for ${purificationCost} GAIA`)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const gaiaReward = Math.floor(amount / 25) // Higher reward for purification
      
      setStorageSystems(prev => prev.map(s => 
        s.id === systemId 
          ? { 
              ...s, 
              currentLevel: Math.max(s.currentLevel - amount, 0),
              gaiaTokensEarned: s.gaiaTokensEarned + gaiaReward,
              purificationLevel: Math.min(s.purificationLevel + 2, 100)
            }
          : s
      ))
      
      setUserGaiaBalance(prev => prev - purificationCost + gaiaReward)
      
      toast.success(`Purified ${amount}L water!`, {
        description: `Net earned ${gaiaReward - purificationCost} GAIA tokens`
      })
    } catch (error) {
      toast.error('Water purification failed')
    }
  }

  const createNewSystem = async (type: WaterStorageSystem['type']) => {
    const systemCosts = {
      rainwater: 300,
      greywater: 250,
      purified: 400,
      underground: 500
    }
    
    const cost = systemCosts[type]
    
    if (userGaiaBalance < cost) {
      toast.error(`Need ${cost} GAIA tokens to create ${type} system`)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const newSystem: WaterStorageSystem = {
        id: Date.now().toString(),
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} System`,
        type,
        capacity: type === 'underground' ? 10000 : 3000,
        currentLevel: 0,
        location: 'New Installation',
        gaiaTokensEarned: 0,
        purificationLevel: type === 'purified' ? 95 : 60,
        lastMaintenance: new Date(),
        efficiency: 65,
        carbonSavings: 0,
        status: 'active'
      }
      
      setStorageSystems(prev => [...prev, newSystem])
      setUserGaiaBalance(prev => prev - cost)
      
      toast.success(`New ${type} storage system created!`, {
        description: 'System is now active and ready to collect water'
      })
    } catch (error) {
      toast.error('System creation failed')
    }
  }

  const getTotalStats = () => {
    const totalCapacity = storageSystems.reduce((sum, s) => sum + s.capacity, 0)
    const totalStored = storageSystems.reduce((sum, s) => sum + s.currentLevel, 0)
    const totalGaia = storageSystems.reduce((sum, s) => sum + s.gaiaTokensEarned, 0)
    const totalCarbon = storageSystems.reduce((sum, s) => sum + s.carbonSavings, 0)
    
    return { totalCapacity, totalStored, totalGaia, totalCarbon }
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            💧 Water Storage Network
          </h1>
          <p className="text-xl text-muted-foreground">
            Collect, purify, and store water sustainably while earning GAIA tokens
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalCapacity.toLocaleString()}L</p>
                </div>
                <Archive className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Water Stored</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats.totalStored.toLocaleString()}L</p>
                </div>
                <Droplets className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">GAIA Earned</p>
                  <p className="text-2xl font-bold text-green-400">{stats.totalGaia}</p>
                </div>
                <Zap className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">CO2 Saved (kg)</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.totalCarbon.toFixed(1)}</p>
                </div>
                <CloudRain className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="systems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="systems">Storage Systems</TabsTrigger>
            <TabsTrigger value="collect">Collect Water</TabsTrigger>
            <TabsTrigger value="purify">Purify Water</TabsTrigger>
            <TabsTrigger value="create">New System</TabsTrigger>
          </TabsList>

          <TabsContent value="systems" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {storageSystems.map((system) => (
                <Card key={system.id} className="border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-blue-400">{system.name}</span>
                      <Badge variant={
                        system.status === 'active' ? 'default' : 
                        system.status === 'full' ? 'secondary' : 'outline'
                      }>
                        {system.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-bold text-cyan-400 capitalize">{system.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-bold">{system.location}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Water Level</span>
                        <span>{system.currentLevel.toLocaleString()}L / {system.capacity.toLocaleString()}L</span>
                      </div>
                      <Progress value={(system.currentLevel / system.capacity) * 100} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Efficiency</p>
                        <p className="font-bold text-green-400">{system.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Purity Level</p>
                        <p className="font-bold text-blue-400">{system.purificationLevel}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">GAIA Earned</p>
                        <p className="font-bold text-yellow-400">{system.gaiaTokensEarned}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Carbon Saved</p>
                        <p className="font-bold text-purple-400">{system.carbonSavings.toFixed(1)} kg</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => collectWater(system.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <Droplets className="h-3 w-3 mr-1" />
                        Collect
                      </Button>
                      <Button 
                        onClick={() => upgradeSystem(system.id, 150)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={isUpgrading || userGaiaBalance < 150}
                        size="sm"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Upgrade (150)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collect" className="space-y-6">
            <Card className="border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Water Collection Center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {storageSystems.map((system) => (
                    <div key={system.id} className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <h4 className="font-bold mb-2">{system.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Available Space:</span>
                          <span>{(system.capacity - system.currentLevel).toLocaleString()}L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Collection Rate:</span>
                          <span>{system.efficiency}% efficiency</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => collectWater(system.id)}
                        className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700"
                        disabled={system.currentLevel >= system.capacity}
                        size="sm"
                      >
                        <CloudRain className="h-3 w-3 mr-1" />
                        Collect Water
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purify" className="space-y-6">
            <Card className="border-teal-500/20">
              <CardHeader>
                <CardTitle className="text-teal-400">Water Purification Center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {storageSystems.map((system) => (
                    <div key={system.id} className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
                      <h4 className="font-bold mb-2">{system.name}</h4>
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex justify-between">
                          <span>Current Purity:</span>
                          <span>{system.purificationLevel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Available Water:</span>
                          <span>{system.currentLevel.toLocaleString()}L</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => purifyWater(system.id, 500)}
                          className="flex-1 bg-teal-600 hover:bg-teal-700"
                          disabled={system.currentLevel < 500}
                          size="sm"
                        >
                          <Beaker className="h-3 w-3 mr-1" />
                          Purify 500L
                        </Button>
                        <Button 
                          onClick={() => purifyWater(system.id, 1000)}
                          className="flex-1 bg-teal-600 hover:bg-teal-700"
                          disabled={system.currentLevel < 1000}
                          size="sm"
                        >
                          <Beaker className="h-3 w-3 mr-1" />
                          Purify 1000L
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { type: 'rainwater' as const, cost: 300, icon: '🌧️', description: 'Collect rainwater from rooftops and surfaces' },
                { type: 'greywater' as const, cost: 250, icon: '♻️', description: 'Recycle water from sinks and showers' },
                { type: 'purified' as const, cost: 400, icon: '💎', description: 'Advanced purification for drinking water' },
                { type: 'underground' as const, cost: 500, icon: '🕳️', description: 'Large underground storage tanks' }
              ].map((systemType) => (
                <Card key={systemType.type} className="border-blue-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{systemType.icon}</div>
                    <h3 className="text-lg font-bold mb-2 capitalize">{systemType.type} System</h3>
                    <p className="text-sm text-muted-foreground mb-4">{systemType.description}</p>
                    <p className="text-lg font-bold text-blue-400 mb-4">{systemType.cost} GAIA</p>
                    
                    <Button 
                      onClick={() => createNewSystem(systemType.type)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={userGaiaBalance < systemType.cost}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Create System
                    </Button>
                    
                    {userGaiaBalance < systemType.cost && (
                      <p className="text-sm text-red-400 mt-2">
                        Insufficient GAIA balance
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}