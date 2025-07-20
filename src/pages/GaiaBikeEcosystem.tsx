
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bike, Leaf, Coins, BarChart3 } from 'lucide-react'

export default function GaiaBikeEcosystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-yellow-900/20 p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            🚴 GAiA Bike Ecosystem
          </h1>
          <p className="text-xl text-muted-foreground">
            Ride • Earn • Save the Planet • Build Community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Bike className="h-6 w-6" />
                Smart Bike Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your rides, monitor environmental impact, and earn tokens based on distance and eco-friendliness.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Today's Distance:</span>
                  <span className="text-green-400 font-bold">12.5 km</span>
                </div>
                <div className="flex justify-between">
                  <span>CO2 Saved:</span>
                  <span className="text-green-400 font-bold">2.3 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Tokens Earned:</span>
                  <span className="text-green-400 font-bold">125 GAiA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <BarChart3 className="h-6 w-6" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Advanced analytics to track your progress and environmental contribution.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Weekly Goal:</span>
                  <span className="text-blue-400 font-bold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Rank:</span>
                  <span className="text-blue-400 font-bold">#142</span>
                </div>
                <div className="flex justify-between">
                  <span>Streak:</span>
                  <span className="text-blue-400 font-bold">7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Coins className="h-6 w-6" />
                Token Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Earn GAiA tokens for every kilometer you ride sustainably.
              </p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                View Rewards
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Leaf className="h-6 w-6" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                See your real contribution to reducing carbon emissions.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Impact
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Bike className="h-6 w-6" />
                Community Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Join global challenges and compete with riders worldwide.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Join Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
