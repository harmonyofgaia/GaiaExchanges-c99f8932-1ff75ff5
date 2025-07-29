
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Map, Calendar, Target } from 'lucide-react'

export default function Roadmap() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-teal-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            🗺️ Roadmap Hub
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Our journey towards a sustainable future
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <Map className="h-12 w-12 mx-auto text-cyan-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-cyan-400">Development Path</div>
              <div className="text-sm text-muted-foreground">Strategic milestones</div>
            </div>

            <div className="text-center p-6 bg-teal-900/30 rounded-lg border border-teal-500/30">
              <Calendar className="h-12 w-12 mx-auto text-teal-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-teal-400">Timeline</div>
              <div className="text-sm text-muted-foreground">Planned releases</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <Target className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Goals</div>
              <div className="text-sm text-muted-foreground">Mission objectives</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
