
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Users, Gamepad2, Heart } from 'lucide-react'

export default function VirtualWorld() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center gap-3">
              <Globe className="h-12 w-12 text-purple-400 animate-pulse" />
              🌍 GAiA Virtual World
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Experience the Ultimate Virtual Reality Platform
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">🌱 Eco-Friendly</Badge>
              <Badge className="bg-blue-600">🌍 Global Community</Badge>
              <Badge className="bg-purple-600">✨ Immersive Experience</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Virtual Ecosystems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore and protect diverse virtual ecosystems while earning rewards for conservation activities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Community Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with like-minded individuals from around the world and collaborate on environmental projects.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                Interactive Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Play educational games that teach sustainability while having fun and earning tokens.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
