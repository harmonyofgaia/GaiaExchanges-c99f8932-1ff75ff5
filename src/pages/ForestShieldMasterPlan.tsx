import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, TreePine, Satellite, AlertTriangle, Users, Globe, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function ForestShieldMasterPlan() {
  const [shieldIntegrity, setShieldIntegrity] = useState(95)
  const [activeDrones, setActiveDrones] = useState(47)
  const [protectedArea, setProtectedArea] = useState(5000)
  const [threatLevel, setThreatLevel] = useState('Low')
  const [communitySupport, setCommunitySupport] = useState(78)

  useEffect(() => {
    // Simulate live updates
    const integrityInterval = setInterval(() => {
      setShieldIntegrity((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
    }, 5000)

    const droneInterval = setInterval(() => {
      setActiveDrones((prev) => Math.max(0, Math.min(50, prev + Math.floor(Math.random() * 3) - 1)))
    }, 7000)

    const supportInterval = setInterval(() => {
      setCommunitySupport((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 3)))
    }, 6000)

    return () => {
      clearInterval(integrityInterval)
      clearInterval(droneInterval)
      clearInterval(supportInterval)
    }
  }, [])

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-600'
      case 'Medium':
        return 'bg-yellow-600'
      case 'High':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌲 Forest Shield Master Plan
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Real-time monitoring and protection of global forest ecosystems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{shieldIntegrity}%</div>
              <div className="text-muted-foreground">Shield Integrity</div>
              <Progress value={shieldIntegrity} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <TreePine className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{protectedArea} ha</div>
              <div className="text-muted-foreground">Protected Area</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Satellite className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{activeDrones}</div>
              <div className="text-muted-foreground">Active Drones</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{threatLevel}</div>
              <div className="text-muted-foreground">Threat Level</div>
              <Badge className={`${getThreatColor(threatLevel)} mt-4`}>{threatLevel}</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Community Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Users className="h-4 w-4 text-green-400" />
                  <div className="text-sm text-white">Active participants: {communitySupport}%</div>
                </div>
                <Progress value={communitySupport} />
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Expand Community
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Real-time Data Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <div className="text-sm text-white">
                    Alert: Potential deforestation detected in Sector 4
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <div className="text-sm text-white">
                    Drone deployment initiated for aerial assessment
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <div className="text-sm text-white">
                    Community volunteers mobilized for ground verification
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
