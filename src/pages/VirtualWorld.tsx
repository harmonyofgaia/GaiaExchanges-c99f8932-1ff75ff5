
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Users, Gamepad2 } from 'lucide-react'

const VirtualWorld = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">
            🌍 VIRTUAL WORLD
          </h1>
          <p className="text-muted-foreground">
            Explore the GAIA virtual metaverse
          </p>
        </div>
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-6 text-center">
            <Globe className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Coming Soon</h3>
            <p className="text-muted-foreground">
              The GAIA Virtual World is under development with dragon-powered immersion
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VirtualWorld
