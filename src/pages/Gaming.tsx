
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'

const Gaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                🎮 GAiA Gaming Universe
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Play, Earn, and Restore the Environment
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-purple-900/20 rounded border border-purple-500/20">
                  <Gamepad2 className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                  <div className="font-bold text-purple-400">Play & Earn</div>
                </div>
                <div className="p-4 bg-blue-900/20 rounded border border-blue-500/20">
                  <Trophy className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <div className="font-bold text-blue-400">Competitions</div>
                </div>
                <div className="p-4 bg-green-900/20 rounded border border-green-500/20">
                  <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
                  <div className="font-bold text-green-400">Community</div>
                </div>
                <div className="p-4 bg-orange-900/20 rounded border border-orange-500/20">
                  <Zap className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                  <div className="font-bold text-orange-400">Rewards</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">🌍 Eco Adventure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explore virtual worlds while contributing to real environmental restoration projects.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Play Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">⚔️ GAiA Battles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Compete in strategic battles and earn GAiA tokens for every victory.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Battle Arena
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🌱 Garden Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Build virtual gardens that correspond to real tree planting initiatives.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Start Building
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gaming
