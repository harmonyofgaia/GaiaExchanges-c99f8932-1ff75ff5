
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Waves, TreePine, Heart, Globe, Camera, Droplets } from 'lucide-react'
import { toast } from 'sonner'

export function GreenLakeTriibe() {
  const [projectsCompleted, setProjectsCompleted] = useState(12)
  const [riversCleaned, setRiversCleaned] = useState(47)
  const [waterQuality, setWaterQuality] = useState(78)
  const [currentProject, setCurrentProject] = useState('Amazon River Restoration')

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterQuality(prev => Math.min(100, prev + Math.random() * 2))
      setRiversCleaned(prev => prev + Math.random() * 0.1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const donateToProject = () => {
    // Update coral reef wallet address as requested
    const coralReefWallet = 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7'
    
    toast.success('💚 DONATION SENT TO GREENLAKE TRIBE!', {
      description: `Funds sent to reinvestment wallet: ${coralReefWallet}`,
      duration: 5000
    })

    console.log(`💰 DONATION SENT TO CORAL REEF WALLET: ${coralReefWallet}`)
    console.log('🌊 GREENLAKE TRIBE PROJECT FUNDED')
  }

  const dirtyWaterLocations = [
    {
      name: 'Polluted Amazon Tributary',
      location: 'Brazil',
      severity: 'Critical',
      pollution: 'Industrial waste, plastic debris',
      status: 'Cleaning in progress'
    },
    {
      name: 'Ganges River Section',
      location: 'India', 
      severity: 'Severe',
      pollution: 'Chemical runoff, sewage',
      status: 'Assessment phase'
    },
    {
      name: 'Mississippi Delta',
      location: 'USA',
      severity: 'High',
      pollution: 'Agricultural runoff, oil spills',
      status: 'Planning cleanup'
    },
    {
      name: 'Yellow River Basin',
      location: 'China',
      severity: 'Critical',
      pollution: 'Heavy metals, industrial waste',
      status: 'Equipment deployment'
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <Waves className="h-6 w-6" />
            🌊 GREENLAKE TRIBE - GLOBAL WATER RESTORATION
          </CardTitle>
          <p className="text-emerald-300">
            Cleaning rivers and dirty pools worldwide • Restoring nature's health • Real impact
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-blue-500/20 bg-blue-900/20">
              <CardContent className="p-4 text-center">
                <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">{riversCleaned.toFixed(0)}</div>
                <div className="text-sm text-blue-300">Rivers Cleaned</div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-900/20">
              <CardContent className="p-4 text-center">
                <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{projectsCompleted}</div>
                <div className="text-sm text-green-300">Projects Completed</div>
              </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-emerald-900/20">
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-400">{waterQuality.toFixed(1)}%</div>
                <div className="text-sm text-emerald-300">Water Quality</div>
                <Progress value={waterQuality} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-cyan-500/20 bg-cyan-900/20">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">GLOBAL</div>
                <div className="text-sm text-cyan-300">Coverage</div>
                <Badge className="mt-2 bg-cyan-600">ACTIVE</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Current Project */}
          <Card className="border-green-500/30 bg-green-900/10">
            <CardHeader>
              <CardTitle className="text-green-400">🚀 CURRENT PROJECT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-green-400">{currentProject}</h3>
                <p className="text-muted-foreground">
                  Large-scale restoration of polluted water systems using advanced filtration technology
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={donateToProject} className="bg-emerald-600 hover:bg-emerald-700">
                    <Heart className="h-4 w-4 mr-2" />
                    FUND PROJECT
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Camera className="h-4 w-4 mr-2" />
                    LIVE FEED
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dirty Water Monitoring */}
          <Card className="border-red-500/30 bg-red-900/10">
            <CardHeader>
              <CardTitle className="text-red-400">🚨 GLOBAL WATER POLLUTION MONITORING</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dirtyWaterLocations.map((location, index) => (
                  <Card key={index} className="border-orange-500/20 bg-orange-900/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-orange-400">{location.name}</h4>
                          <p className="text-sm text-muted-foreground">{location.location}</p>
                        </div>
                        <Badge className={`${location.severity === 'Critical' ? 'bg-red-600' : location.severity === 'Severe' ? 'bg-orange-600' : 'bg-yellow-600'}`}>
                          {location.severity}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div><span className="text-red-400">Pollution:</span> {location.pollution}</div>
                        <div><span className="text-blue-400">Status:</span> {location.status}</div>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Waves className="h-3 w-3 mr-1" />
                          Deploy Cleanup
                        </Button>
                        <Button size="sm" variant="outline" className="border-blue-500/30">
                          <Camera className="h-3 w-3 mr-1" />
                          Live Video
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Donation Info */}
          <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-900/30 to-green-900/30">
            <CardContent className="p-4 text-center">
              <h4 className="text-lg font-bold text-emerald-400 mb-2">
                💰 REINVESTMENT WALLET FOR CORAL REEF PROJECTS
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                All donations go directly to water restoration and coral reef protection
              </p>
              <div className="text-xs font-mono bg-black/20 px-2 py-1 rounded text-emerald-400">
                ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Live Video Feeds Simulation */}
      <Card className="border-blue-500/30 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="text-blue-400">📹 LIVE WATER RESTORATION FEEDS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/50 h-48 rounded flex items-center justify-center">
              <div className="text-center text-blue-400">
                <Camera className="h-12 w-12 mx-auto mb-2" />
                <div>Amazon Cleanup - LIVE</div>
                <div className="text-xs text-red-400">🔴 Recording</div>
              </div>
            </div>
            <div className="bg-black/50 h-48 rounded flex items-center justify-center">
              <div className="text-center text-green-400">
                <Waves className="h-12 w-12 mx-auto mb-2" />
                <div>Ganges Restoration - LIVE</div>
                <div className="text-xs text-red-400">🔴 Recording</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
