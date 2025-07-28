
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Flame, 
  Shield, 
  MapPin, 
  Users, 
  Target,
  AlertTriangle,
  Thermometer,
  Wind,
  Droplets,
  Clock,
  DollarSign,
  TrendingUp,
  Globe,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface WildfireData {
  activeFiresNearby: number
  riskLevel: 'Low' | 'Medium' | 'High' | 'Extreme'
  temperature: number
  humidity: number
  windSpeed: number
  lastUpdated: string
}

interface ProtectionZone {
  id: string
  name: string
  location: string
  coverage: number // hectares
  sandBarriers: number
  status: 'Active' | 'Under Construction' | 'Planned'
  fundingGoal: number
  currentFunding: number
  protectedHomes: number
  effectiveness: number // percentage
}

export function WildfireSandProtection() {
  const [wildfireData, setWildfireData] = useState<WildfireData>({
    activeFiresNearby: 3,
    riskLevel: 'High',
    temperature: 42,
    humidity: 15,
    windSpeed: 25,
    lastUpdated: new Date().toLocaleTimeString()
  })

  const [protectionZones] = useState<ProtectionZone[]>([
    {
      id: 'zone-1',
      name: 'Paradise Valley Protection',
      location: 'California, USA',
      coverage: 2500,
      sandBarriers: 15,
      status: 'Active',
      fundingGoal: 850000,
      currentFunding: 647500,
      protectedHomes: 450,
      effectiveness: 94
    },
    {
      id: 'zone-2',
      name: 'Blue Mountains Defense',
      location: 'Oregon, USA',
      coverage: 1800,
      sandBarriers: 12,
      status: 'Under Construction',
      fundingGoal: 620000,
      currentFunding: 496000,
      protectedHomes: 320,
      effectiveness: 89
    },
    {
      id: 'zone-3',
      name: 'Eucalyptus Forest Barrier',
      location: 'Victoria, Australia',
      coverage: 3200,
      sandBarriers: 22,
      status: 'Planned',
      fundingGoal: 1200000,
      currentFunding: 360000,
      protectedHomes: 680,
      effectiveness: 96
    }
  ])

  const [selectedAmount, setSelectedAmount] = useState('')
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [totalProtected, setTotalProtected] = useState(0)

  useEffect(() => {
    const total = protectionZones.reduce((sum, zone) => sum + zone.protectedHomes, 0)
    setTotalProtected(total)

    // Simulate real-time wildfire data updates
    const interval = setInterval(() => {
      setWildfireData(prev => ({
        ...prev,
        activeFiresNearby: Math.max(0, prev.activeFiresNearby + (Math.random() > 0.7 ? 1 : -1)),
        temperature: Math.max(20, prev.temperature + (Math.random() - 0.5) * 3),
        humidity: Math.max(5, Math.min(80, prev.humidity + (Math.random() - 0.5) * 5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 5),
        lastUpdated: new Date().toLocaleTimeString()
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [protectionZones])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-400 bg-green-900/20 border-green-500/30'
      case 'Medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30'
      case 'High': return 'text-orange-400 bg-orange-900/20 border-orange-500/30'
      case 'Extreme': return 'text-red-400 bg-red-900/20 border-red-500/30'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600'
      case 'Under Construction': return 'bg-yellow-600'
      case 'Planned': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const handleFundProject = (zoneId: string) => {
    if (!selectedAmount || parseFloat(selectedAmount) <= 0) {
      toast.error('Please enter a valid funding amount')
      return
    }

    const zone = protectionZones.find(z => z.id === zoneId)
    if (zone) {
      toast.success(`🔥 Funded ${zone.name} with $${selectedAmount}!`, {
        description: `Your contribution helps protect ${zone.protectedHomes} homes from wildfires`
      })
      setSelectedAmount('')
      setSelectedZone(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time Wildfire Alert System */}
      <Card className={`border animate-pulse ${getRiskColor(wildfireData.riskLevel)}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-6 w-6" />
            🚨 Real-time Wildfire Risk Assessment
            <Badge className={`${getRiskColor(wildfireData.riskLevel)} animate-pulse`}>
              {wildfireData.riskLevel} Risk
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 rounded-lg bg-red-900/20">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{wildfireData.activeFiresNearby}</div>
              <div className="text-xs text-muted-foreground">Active Fires Nearby</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/20">
              <Thermometer className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{wildfireData.temperature.toFixed(1)}°C</div>
              <div className="text-xs text-muted-foreground">Temperature</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/20">
              <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{wildfireData.humidity.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-900/20">
              <Wind className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-400">{wildfireData.windSpeed.toFixed(1)} km/h</div>
              <div className="text-xs text-muted-foreground">Wind Speed</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/20">
              <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">{wildfireData.lastUpdated}</div>
              <div className="text-xs text-muted-foreground">Last Updated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Overview */}
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Shield className="h-6 w-6" />
            🏔️ Advanced Sand Barrier Wildfire Protection System
          </CardTitle>
          <p className="text-orange-300/80">
            Revolutionary sand barrier technology that creates firebreaks and redirects wildfire paths to protect communities and ecosystems.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{totalProtected.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Homes Protected</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {protectionZones.reduce((sum, zone) => sum + zone.coverage, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Hectares Covered</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {protectionZones.reduce((sum, zone) => sum + zone.sandBarriers, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Sand Barriers</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
              <TrendingUp className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(protectionZones.reduce((sum, zone) => sum + zone.effectiveness, 0) / protectionZones.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Effectiveness</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protection Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protectionZones.map((zone) => (
          <Card key={zone.id} className="border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-red-900/10 hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <MapPin className="h-5 w-5" />
                {zone.name}
              </CardTitle>
              <div className="flex gap-2">
                <Badge className={getStatusColor(zone.status)}>
                  {zone.status}
                </Badge>
                <Badge className="bg-orange-600">
                  {zone.effectiveness}% Effective
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                📍 {zone.location}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funding Progress</span>
                  <span className="font-bold">
                    {Math.round((zone.currentFunding / zone.fundingGoal) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(zone.currentFunding / zone.fundingGoal) * 100} 
                  className="w-full h-2" 
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${zone.currentFunding.toLocaleString()} raised</span>
                  <span>${zone.fundingGoal.toLocaleString()} goal</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-black/20 p-2 rounded">
                  <div className="text-green-400 font-bold">{zone.coverage} hectares</div>
                  <div className="text-muted-foreground">Coverage Area</div>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <div className="text-blue-400 font-bold">{zone.protectedHomes}</div>
                  <div className="text-muted-foreground">Homes Protected</div>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <div className="text-orange-400 font-bold">{zone.sandBarriers}</div>
                  <div className="text-muted-foreground">Sand Barriers</div>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <div className="text-purple-400 font-bold">{zone.effectiveness}%</div>
                  <div className="text-muted-foreground">Effectiveness</div>
                </div>
              </div>

              {selectedZone === zone.id ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Enter amount to fund"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleFundProject(zone.id)}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Fund Now
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedZone(null)
                        setSelectedAmount('')
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setSelectedZone(zone.id)}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Fund This Zone
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">
            🔬 How Sand Barrier Technology Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-4xl mb-2">1️⃣</div>
              <h4 className="font-bold text-blue-400 mb-2">Strategic Placement</h4>
              <p className="text-sm text-muted-foreground">
                Sand barriers are placed at key locations based on wind patterns and fire behavior analysis.
              </p>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-4xl mb-2">2️⃣</div>
              <h4 className="font-bold text-green-400 mb-2">Fire Deflection</h4>
              <p className="text-sm text-muted-foreground">
                The barriers redirect fire flow away from protected areas while creating firebreaks.
              </p>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <div className="text-4xl mb-2">3️⃣</div>
              <h4 className="font-bold text-orange-400 mb-2">Heat Absorption</h4>
              <p className="text-sm text-muted-foreground">
                Special sand composition absorbs heat and reduces fire intensity.
              </p>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-4xl mb-2">4️⃣</div>
              <h4 className="font-bold text-purple-400 mb-2">Community Safety</h4>
              <p className="text-sm text-muted-foreground">
                Protected communities have more time to evacuate and property damage is minimized.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Features */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-red-400 mb-4">
            <Zap className="h-6 w-6 animate-pulse" />
            <h3 className="text-xl font-bold">🚨 EMERGENCY WILDFIRE FUNDING ACTIVATED</h3>
            <Zap className="h-6 w-6 animate-pulse" />
          </div>
          <p className="text-center text-red-300 mb-6">
            When wildfire risk reaches "Extreme" levels, emergency funding protocols activate automatically 
            to accelerate barrier construction and community protection measures.
          </p>
          <div className="text-center">
            <Badge className="bg-red-600 text-white animate-pulse">
              Current Risk Level: {wildfireData.riskLevel}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
