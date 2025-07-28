
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/Navbar'
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Recycle,
  TrendingUp,
  Globe,
  Target,
  Award
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export default function GreenImpactDashboard() {
  const [impactData, setImpactData] = useState({
    carbonReduced: 125847,
    treesPlanted: 89532,
    waterSaved: 2847392,
    wasteRecycled: 15847,
    energySaved: 98745,
    speciesProtected: 2847
  })

  const [projectProgress, setProjectProgress] = useState([
    { name: "Amazon Rainforest Protection", progress: 78, impact: "50,000 tons CO₂" },
    { name: "Ocean Plastic Cleanup", progress: 65, impact: "25,000 tons plastic" },
    { name: "Solar Energy Expansion", progress: 92, impact: "100MW capacity" },
    { name: "Biodiversity Conservation", progress: 56, impact: "2,500 species" }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setImpactData(prev => ({
        carbonReduced: prev.carbonReduced + Math.floor(Math.random() * 50),
        treesPlanted: prev.treesPlanted + Math.floor(Math.random() * 20),
        waterSaved: prev.waterSaved + Math.floor(Math.random() * 100),
        wasteRecycled: prev.wasteRecycled + Math.floor(Math.random() * 10),
        energySaved: prev.energySaved + Math.floor(Math.random() * 30),
        speciesProtected: prev.speciesProtected + Math.floor(Math.random() * 5)
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Green Impact Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Real-time environmental impact metrics and project progress tracking
          </p>
        </div>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Carbon Reduced</p>
                  <div className="text-2xl font-bold text-green-400">
                    <AnimatedCounter value={impactData.carbonReduced} />
                    <span className="text-sm text-green-300 ml-1">tons</span>
                  </div>
                </div>
                <Wind className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-2">
                <Badge className="bg-green-600 text-white">+12% this month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Trees Planted</p>
                  <div className="text-2xl font-bold text-blue-400">
                    <AnimatedCounter value={impactData.treesPlanted} />
                  </div>
                </div>
                <TreePine className="h-8 w-8 text-blue-400" />
              </div>
              <div className="mt-2">
                <Badge className="bg-blue-600 text-white">+8% this month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-teal-900/30 border-cyan-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm font-medium">Water Saved</p>
                  <div className="text-2xl font-bold text-cyan-400">
                    <AnimatedCounter value={impactData.waterSaved} />
                    <span className="text-sm text-cyan-300 ml-1">L</span>
                  </div>
                </div>
                <Droplets className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="mt-2">
                <Badge className="bg-cyan-600 text-white">+15% this month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Waste Recycled</p>
                  <div className="text-2xl font-bold text-purple-400">
                    <AnimatedCounter value={impactData.wasteRecycled} />
                    <span className="text-sm text-purple-300 ml-1">tons</span>
                  </div>
                </div>
                <Recycle className="h-8 w-8 text-purple-400" />
              </div>
              <div className="mt-2">
                <Badge className="bg-purple-600 text-white">+9% this month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Energy Saved</p>
                  <div className="text-2xl font-bold text-yellow-400">
                    <AnimatedCounter value={impactData.energySaved} />
                    <span className="text-sm text-yellow-300 ml-1">MWh</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="mt-2">
                <Badge className="bg-yellow-600 text-white">+18% this month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-300 text-sm font-medium">Species Protected</p>
                  <div className="text-2xl font-bold text-red-400">
                    <AnimatedCounter value={impactData.speciesProtected} />
                  </div>
                </div>
                <Globe className="h-8 w-8 text-red-400" />
              </div>
              <div className="mt-2">
                <Badge className="bg-red-600 text-white">+7% this month</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Progress */}
        <Card className="border-green-500/30 bg-green-900/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Target className="h-5 w-5" />
              Active Environmental Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {projectProgress.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{project.name}</div>
                    <div className="text-sm text-muted-foreground">Impact: {project.impact}</div>
                  </div>
                  <Badge className={`${
                    project.progress >= 80 ? 'bg-green-600' : 
                    project.progress >= 50 ? 'bg-yellow-600' : 'bg-orange-600'
                  } text-white`}>
                    {project.progress}%
                  </Badge>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Global Impact Summary */}
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Award className="h-5 w-5" />
              Global Environmental Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Carbon Footprint Reduction</span>
                  <span className="text-green-400 font-bold">-23%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Renewable Energy Usage</span>
                  <span className="text-blue-400 font-bold">+45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Waste Recycling Rate</span>
                  <span className="text-purple-400 font-bold">+78%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Water Conservation</span>
                  <span className="text-cyan-400 font-bold">+32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Biodiversity Index</span>
                  <span className="text-yellow-400 font-bold">+19%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ecosystem Health Score</span>
                  <span className="text-red-400 font-bold">87/100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
