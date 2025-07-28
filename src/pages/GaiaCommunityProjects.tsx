
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Leaf, Heart } from 'lucide-react'

export default function GaiaCommunityProjects() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Gaia Community Projects
        </h1>
        <p className="text-xl text-muted-foreground">
          Community-driven initiatives for environmental impact
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              The Heart Of Gaia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Core community project for environmental healing</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-400" />
              Seed Splitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Project demo for sustainable agriculture</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              Community Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Central hub for all community activities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
