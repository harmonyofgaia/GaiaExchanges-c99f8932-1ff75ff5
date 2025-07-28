import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Recycle, 
  Globe, 
  Users, 
  TrendingUp, 
  Target, 
  Eye, 
  Satellite,
  BarChart3,
  Activity,
  Zap,
  Shield,
  MapPin,
  Clock,
  Award,
  Camera,
  FileText,
  CheckCircle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts'
import Navbar from '@/components/Navbar'

export default function ImpactMeasurementSystem() {
  const [impactData, setImpactData] = useState({
    treesPlanted: 12456,
    waterCleaned: 456789,
    wasteRecycled: 789012,
    energySaved: 345678
  })

  const [projectMetrics, setProjectMetrics] = useState([
    { name: 'Project A', carbonOffset: 150, biodiversityScore: 85 },
    { name: 'Project B', carbonOffset: 200, biodiversityScore: 92 },
    { name: 'Project C', carbonOffset: 180, biodiversityScore: 88 },
    { name: 'Project D', carbonOffset: 220, biodiversityScore: 95 }
  ])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const pieData = [
    { name: 'Trees Planted', value: impactData.treesPlanted },
    { name: 'Water Cleaned', value: impactData.waterCleaned },
    { name: 'Waste Recycled', value: impactData.wasteRecycled },
    { name: 'Energy Saved', value: impactData.energySaved }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded-md">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setImpactData(prev => ({
        treesPlanted: prev.treesPlanted + Math.floor(Math.random() * 100),
        waterCleaned: prev.waterCleaned + Math.floor(Math.random() * 500),
        wasteRecycled: prev.wasteRecycled + Math.floor(Math.random() * 300),
        energySaved: prev.energySaved + Math.floor(Math.random() * 200)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📊 Impact Measurement System
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Real-time environmental impact metrics and project analytics
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
              <Globe className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">
              <TreePine className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reporting" className="data-[state=active]:bg-orange-600">
              <FileText className="h-4 w-4 mr-2" />
              Reporting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
                <CardContent className="p-6 text-center">
                  <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{impactData.treesPlanted.toLocaleString()}</div>
                  <div className="text-muted-foreground">Trees Planted</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{impactData.waterCleaned.toLocaleString()}</div>
                  <div className="text-muted-foreground">Liters of Water Cleaned</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Recycle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{impactData.wasteRecycled.toLocaleString()}</div>
                  <div className="text-muted-foreground">Kilograms of Waste Recycled</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{impactData.energySaved.toLocaleString()}</div>
                  <div className="text-muted-foreground">Megawatt Hours of Energy Saved</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projectMetrics.map((project, index) => (
                <Card key={index} className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                  <CardHeader>
                    <CardTitle className="text-white">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbon Offset (tons)</span>
                        <span className="text-green-400">{project.carbonOffset}</span>
                      </div>
                      <Progress value={project.carbonOffset / 3} max={100} />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Biodiversity Score</span>
                        <span className="text-blue-400">{project.biodiversityScore}</span>
                      </div>
                      <Progress value={project.biodiversityScore} max={100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-white">Impact Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {
                          pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        }
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                <CardHeader>
                  <CardTitle className="text-white">Project Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={projectMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="white" />
                      <YAxis stroke="white" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="carbonOffset" fill="#8884d8" />
                      <Bar dataKey="biodiversityScore" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reporting" className="mt-6">
            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-white">Generate Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate detailed reports on environmental impact and project performance.
                </p>
                <Button>Generate Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
