
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { EarningSystemsList } from '@/components/earning/EarningSystemsList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Coins, 
  Award, 
  TrendingUp, 
  Target,
  Zap,
  Users,
  Globe
} from 'lucide-react'

const EarningSystemsOverview = () => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🪙 GAiA Earning Systems
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Complete overview of all token earning mechanisms • Environmental impact rewards • Community benefits
          </p>
          <div className="text-sm text-green-400 mt-2">
            ✨ 10 Earning Systems • Real Environmental Impact • Community Driven Rewards
          </div>
        </div>

        {/* Overview Stats */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-400">
              <Globe className="h-6 w-6" />
              GAiA Token Ecosystem Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-800/20 rounded-lg">
                <Coins className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">10</div>
                <div className="text-sm text-muted-foreground">Earning Systems</div>
              </div>
              <div className="text-center p-4 bg-blue-800/20 rounded-lg">
                <Award className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">7</div>
                <div className="text-sm text-muted-foreground">Active Systems</div>
              </div>
              <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">85%</div>
                <div className="text-sm text-muted-foreground">Avg. Progress</div>
              </div>
              <div className="text-center p-4 bg-orange-800/20 rounded-lg">
                <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">2.5K</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earning Systems Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              All Systems
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Active (7)
            </TabsTrigger>
            <TabsTrigger value="development" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              In Development (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <EarningSystemsList />
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">Active Earning Systems</h3>
              <p className="text-muted-foreground">Currently operational systems earning real rewards</p>
            </div>
            <EarningSystemsList />
          </TabsContent>

          <TabsContent value="development" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">Systems in Development</h3>
              <p className="text-muted-foreground">Coming soon with enhanced features and rewards</p>
            </div>
            <EarningSystemsList />
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
            <CardContent className="pt-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-400">Start Earning GAiA Tokens Today!</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join the environmental revolution and earn rewards for making a positive impact on our planet. 
                  Every action counts towards a sustainable future.
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <Zap className="h-5 w-5 mr-2" />
                    Start Earning Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-green-400 text-green-400 hover:bg-green-900/20">
                    <Award className="h-5 w-5 mr-2" />
                    View Rewards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EarningSystemsOverview
