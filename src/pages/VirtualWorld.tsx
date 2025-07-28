
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Users, Gamepad2 } from 'lucide-react'

export default function VirtualWorld() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🌍 Virtual World
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore Gaia's immersive virtual ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Globe className="h-5 w-5" />
                World Explorer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Discover new virtual environments and ecosystems</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                Community Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Connect with other environmental enthusiasts</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Gamepad2 className="h-5 w-5" />
                Virtual Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Participate in eco-friendly virtual activities</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
