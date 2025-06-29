
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TreePine, Mountain, Waves } from 'lucide-react'

const LandscapeBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-brown-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🏗️ LANDSCAPE BUILDER
          </h1>
          <p className="text-muted-foreground">
            Build and design virtual landscapes
          </p>
        </div>
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-6 text-center">
            <TreePine className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-400 mb-4">Create Virtual Worlds</h3>
            <p className="text-muted-foreground">
              Design immersive landscapes with dragon-enhanced creativity tools
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LandscapeBuilder
