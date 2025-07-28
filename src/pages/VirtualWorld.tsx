
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Users, Zap } from 'lucide-react'

export default function VirtualWorld() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-3">
              <Globe className="h-12 w-12 text-blue-400 animate-spin" />
              🌍 Virtual World
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Immersive 3D Environmental Experience
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-blue-600">🌐 3D World</Badge>
              <Badge className="bg-purple-600">🎮 Interactive</Badge>
              <Badge className="bg-green-600">🌱 Eco-Friendly</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                Virtual Environments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore beautiful 3D environments while learning about environmental conservation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Social Interaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with other eco-warriors in our virtual community spaces.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Eco Missions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete virtual missions that translate to real-world environmental impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
