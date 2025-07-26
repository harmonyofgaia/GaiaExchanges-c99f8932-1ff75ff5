
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, Heart, Leaf, Sparkles } from 'lucide-react'

export default function EcoAvatar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
<div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🌿 Eco Avatar
          </h1>
          <p className="text-xl text-muted-foreground">
            Deep spiritual connection with nature through avatars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Display */}
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Users className="h-5 w-5" />
                Your Gaia Soul
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 h-48 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-20 w-20 text-green-400 mx-auto mb-2" />
                  <p className="text-green-300">Nature Guardian Avatar</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Earth Connection</span>
                  <span>Level 5</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Customize Avatar
              </Button>
            </CardContent>
          </Card>

          {/* Elemental Meditation */}
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Heart className="h-5 w-5" />
                Elemental Meditation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💧</div>
                  <p className="text-sm text-blue-300">Water</p>
                  <p className="text-xs text-muted-foreground">Level 3</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🌱</div>
                  <p className="text-sm text-green-300">Earth</p>
                  <p className="text-xs text-muted-foreground">Level 4</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🔥</div>
                  <p className="text-sm text-orange-300">Fire</p>
                  <p className="text-xs text-muted-foreground">Level 2</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">💨</div>
                  <p className="text-sm text-purple-300">Air</p>
                  <p className="text-xs text-muted-foreground">Level 3</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Meditation
              </Button>
            </CardContent>
          </Card>

          {/* Spiritual Evolution */}
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Leaf className="h-5 w-5" />
                Spiritual Evolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <h4 className="font-medium text-purple-400 mb-1">Environmental Harmony</h4>
                  <Progress value={85} className="w-full mb-1" />
                  <p className="text-xs text-muted-foreground">Deep connection with nature</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <h4 className="font-medium text-cyan-400 mb-1">Inner Peace</h4>
                  <Progress value={60} className="w-full mb-1" />
                  <p className="text-xs text-muted-foreground">Meditation mastery progress</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-400 mb-1">Gaia Wisdom</h4>
                  <Progress value={40} className="w-full mb-1" />
                  <p className="text-xs text-muted-foreground">Universal understanding</p>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Continue Journey
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Bonding */}
        <div className="mt-8">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-center">Environmental Bonding Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-3">
                    <div className="text-4xl mb-2">🌳</div>
                    <h3 className="font-medium text-green-400 mb-1">Forest Communion</h3>
                    <p className="text-sm text-muted-foreground">Connect with ancient tree spirits</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                    Enter Forest
                  </Button>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-3">
                    <div className="text-4xl mb-2">🌊</div>
                    <h3 className="font-medium text-blue-400 mb-1">Ocean Meditation</h3>
                    <p className="text-sm text-muted-foreground">Flow with the rhythm of waves</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                    Dive Deep
                  </Button>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-3">
                    <div className="text-4xl mb-2">⛰️</div>
                    <h3 className="font-medium text-purple-400 mb-1">Mountain Wisdom</h3>
                    <p className="text-sm text-muted-foreground">Seek guidance from stone elders</p>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                    Ascend Peak
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
