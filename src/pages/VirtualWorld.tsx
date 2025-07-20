
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Users, Map, Zap } from 'lucide-react'

export default function VirtualWorld() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4">
            🌍 GAiA Virtual World
          </h1>
          <p className="text-xl text-muted-foreground">
            Immersive 3D environments • Global community • Sustainable adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Globe className="h-6 w-6" />
                Explore Worlds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Discover stunning virtual landscapes and hidden treasures.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Exploring
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Users className="h-6 w-6" />
                Join Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with like-minded individuals from around the globe.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Join Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Zap className="h-6 w-6" />
                Earn Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete quests and earn GAiA tokens for your adventures.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Earning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
