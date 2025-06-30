
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TreePine, Waves, Heart, Shield } from 'lucide-react'

const GaiasProjects = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌱 Gaia's Environmental Projects
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Real environmental impact • Global conservation • Community driven
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TreePine className="h-6 w-6" />
              Global Reforestation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-400">2,847 Trees</div>
              <p className="text-green-300">
                Planted across 15 countries through GAiA token burns and community contributions.
              </p>
              <Badge className="bg-green-600">Active Project</Badge>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Support Reforestation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Waves className="h-6 w-6" />
              Ocean Cleanup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-blue-400">1,653 Kg</div>
              <p className="text-blue-300">
                Plastic waste removed from oceans through our marine conservation partnerships.
              </p>
              <Badge className="bg-blue-600">Ongoing</Badge>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Join Ocean Mission
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Heart className="h-6 w-6" />
              Wildlife Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-purple-400">934 Animals</div>
              <p className="text-purple-300">
                Protected through conservation programs funded by GAiA community initiatives.
              </p>
              <Badge className="bg-purple-600">High Impact</Badge>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Protect Wildlife
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Shield className="h-6 w-6" />
              Carbon Offset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-orange-400">12.4 Tons</div>
              <p className="text-orange-300">
                CO2 offset through renewable energy projects and sustainable practices.
              </p>
              <Badge className="bg-orange-600">Verified</Badge>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Offset Carbon
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default GaiasProjects
