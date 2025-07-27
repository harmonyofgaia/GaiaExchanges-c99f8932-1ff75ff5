
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DonationCard } from '@/components/green-investments/DonationCard'
import { Leaf, TrendingUp, Users, Globe, DollarSign, Heart } from 'lucide-react'

export default function GreenInvestments() {
  const [activeTab, setActiveTab] = useState('projects')

  const sampleProjects = [
    {
      id: '1',
      name: 'Solar Panel Installation',
      description: 'Install solar panels in rural communities to provide clean energy access',
      goal: 50000,
      raised: 32000,
      deadline: '2024-12-31',
      category: 'Clean Energy',
      image: '/placeholder-solar.jpg'
    },
    {
      id: '2',
      name: 'Ocean Cleanup Initiative',
      description: 'Remove plastic waste from oceans using advanced filtration technology',
      goal: 75000,
      raised: 45000,
      deadline: '2024-11-30',
      category: 'Ocean Conservation',
      image: '/placeholder-ocean.jpg'
    },
    {
      id: '3',
      name: 'Reforestation Program',
      description: 'Plant native trees in deforested areas to restore natural ecosystems',
      goal: 30000,
      raised: 28000,
      deadline: '2024-10-15',
      category: 'Forest Conservation',
      image: '/placeholder-forest.jpg'
    }
  ]

  const handleDonate = (projectId: string, amount: number) => {
    console.log(`Donating $${amount} to project ${projectId}`)
    // Here you would implement the actual donation logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            🌱 Green Investments
          </h1>
          <p className="text-xl text-muted-foreground">
            Invest in a sustainable future through verified environmental projects
          </p>
        </div>

        {/* Investment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/20 bg-green-900/10">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">$2.5M</div>
              <div className="text-sm text-muted-foreground">Total Invested</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-900/10">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">847</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-purple-900/10">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">12.3K</div>
              <div className="text-sm text-muted-foreground">Investors</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-yellow-900/10">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">45</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Investment Projects</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProjects.map((project) => (
                <DonationCard
                  key={project.id}
                  project={project}
                  onDonate={handleDonate}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-400">My Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Solar Panel Installation</h3>
                      <p className="text-sm text-muted-foreground">Invested: $500</p>
                    </div>
                    <Badge className="bg-green-600 text-white">+12.5%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Ocean Cleanup Initiative</h3>
                      <p className="text-sm text-muted-foreground">Invested: $750</p>
                    </div>
                    <Badge className="bg-blue-600 text-white">+8.3%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-400">Investment Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Portfolio Performance</h3>
                    <Progress value={68} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-1">68% above market average</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-400 mb-2" />
                      <div className="text-xl font-bold text-green-400">+15.2%</div>
                      <div className="text-sm text-muted-foreground">Annual Return</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Heart className="h-6 w-6 text-red-400 mb-2" />
                      <div className="text-xl font-bold text-red-400">2.3M</div>
                      <div className="text-sm text-muted-foreground">CO2 Offset (kg)</div>
                    </div>
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
