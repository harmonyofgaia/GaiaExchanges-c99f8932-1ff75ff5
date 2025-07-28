import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Leaf, TreePine, Droplets, Wind, Target, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function GreenImpactDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Green Impact Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Track your environmental impact and contribute to global sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">127 kg</div>
              <div className="text-muted-foreground">Carbon Offset</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <TreePine className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">23</div>
              <div className="text-muted-foreground">Trees Planted</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <Droplets className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">45 L</div>
              <div className="text-muted-foreground">Ocean Cleanup</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
            <CardContent className="p-6 text-center">
              <Wind className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">92%</div>
              <div className="text-muted-foreground">Air Quality</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Personal Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Carbon Footprint</div>
                    <Progress value={65} className="h-2 w-48" />
                    <div className="text-xs text-muted-foreground">65% offset</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <TreePine className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Trees Planted</div>
                    <Progress value={30} className="h-2 w-48" />
                    <div className="text-xs text-muted-foreground">30 trees</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Community Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Projects</span>
                  <span className="text-white font-bold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="text-white font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Impact</span>
                  <span className="text-white font-bold">24,567 tons</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
