
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const CommunityStats = () => {
  return (
    <Card className="border-4 border-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 mb-12 relative overflow-hidden">
      {/* Abstract art background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400 via-blue-400 to-purple-400" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          🌟 COMMUNITY POWER - HARMONY OF SOULS
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400/10 rounded-lg blur-sm" />
            <div className="relative p-4">
              <div className="text-5xl font-bold text-green-400 animate-pulse">87K+</div>
              <div className="text-muted-foreground text-lg">Dragon Guardians</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/10 rounded-lg blur-sm" />
            <div className="relative p-4">
              <div className="text-5xl font-bold text-blue-400 animate-bounce">∞</div>
              <div className="text-muted-foreground text-lg">Security Level</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-purple-400/10 rounded-lg blur-sm" />
            <div className="relative p-4">
              <div className="text-5xl font-bold text-purple-400 animate-pulse">247</div>
              <div className="text-muted-foreground text-lg">Countries</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400/10 rounded-lg blur-sm" />
            <div className="relative p-4">
              <div className="text-5xl font-bold text-orange-400 animate-bounce">24/7</div>
              <div className="text-muted-foreground text-lg">Dragon Protection</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-red-400/10 rounded-lg blur-sm" />
            <div className="relative p-4">
              <div className="text-5xl font-bold text-red-400 animate-pulse">ETERNAL</div>
              <div className="text-muted-foreground text-lg">Dragon Evolution</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
