
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Heart, 
  TreePine, 
  Bird, 
  Crown, 
  Shield, 
  Flame,
  Target,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

const HeartOfGaia = () => {
  const [battleStats, setBattleStats] = useState({
    dragonsDefeated: 847,
    forestsProtected: 1230,
    activeGuardians: 156,
    gaiaEssence: 95.7
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setBattleStats(prev => ({
        ...prev,
        dragonsDefeated: prev.dragonsDefeated + Math.floor(Math.random() * 3),
        activeGuardians: 150 + Math.floor(Math.random() * 20)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const enterBattle = () => {
    toast.success('🐉 Ancient Forest Dragon Summoned!', {
      description: 'Prepare for the ultimate battle to protect Gaia\'s heart!',
      duration: 5000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-pink-900/20 to-rose-900/20 relative overflow-hidden">
      
      {/* Animated Forest Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <TreePine className="h-12 w-12 text-green-400" />
          </div>
        ))}
        
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-30"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <Bird className="h-8 w-8 text-blue-400" />
          </div>
        ))}
      </div>

      {/* Floating Gaia Logos */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-spin opacity-10"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80}%`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <img 
              src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
              alt="Harmony of Gaia"
              className="w-16 h-16 object-contain"
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        
        {/* Arena Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-red-500/30 to-pink-600/30 rounded-full border-2 border-red-500/50">
              <Heart className="h-16 w-16 text-red-400" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 bg-clip-text text-transparent mb-4">
            ❤️ THE HEART OF GAIA ARENA
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            🐉 Battle Ancient Forest Dragons - Protect Nature's Core Essence
          </p>
          <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg px-6 py-2">
            LEGENDARY DIFFICULTY - DANGER LEVEL 95%
          </Badge>
        </div>

        {/* Battle Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border-2 border-red-500/50">
            <CardContent className="pt-4 text-center">
              <Crown className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{battleStats.dragonsDefeated}</div>
              <div className="text-xs text-red-300">Dragons Defeated</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
            <CardContent className="pt-4 text-center">
              <TreePine className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{battleStats.forestsProtected}</div>
              <div className="text-xs text-green-300">Forests Protected</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50">
            <CardContent className="pt-4 text-center">
              <Shield className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{battleStats.activeGuardians}</div>
              <div className="text-xs text-blue-300">Active Guardians</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
            <CardContent className="pt-4 text-center">
              <Heart className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{battleStats.gaiaEssence}%</div>
              <div className="text-xs text-yellow-300">Gaia Essence</div>
            </CardContent>
          </Card>
        </div>

        {/* Dragon Battle Arena */}
        <Card className="bg-gradient-to-br from-red-900/30 to-black/50 border-2 border-red-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2 text-center justify-center">
              <Flame className="h-6 w-6" />
              🐉 ANCIENT FOREST DRAGON BATTLE ARENA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Dragon Illustration */}
            <div className="relative bg-gradient-to-br from-red-800/30 to-black/30 border border-red-500/30 rounded-lg p-8 text-center">
              <div className="text-8xl mb-4 animate-pulse">🐉</div>
              <h3 className="text-3xl font-bold text-red-400 mb-2">ANCIENT FOREST DRAGON</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Guardian of the forest's darkest secrets, this legendary beast has protected Gaia's heart for millennia
              </p>
              
              {/* Dragon Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
                  <div className="text-sm text-red-300">Power Level</div>
                  <div className="text-xl font-bold text-red-400">95%</div>
                </div>
                <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
                  <div className="text-sm text-green-300">Forest Bond</div>
                  <div className="text-xl font-bold text-green-400">100%</div>
                </div>
                <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
                  <div className="text-sm text-blue-300">Magic Resist</div>
                  <div className="text-xl font-bold text-blue-400">90%</div>
                </div>
                <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/20">
                  <div className="text-sm text-yellow-300">Ancient Wisdom</div>
                  <div className="text-xl font-bold text-yellow-400">∞</div>
                </div>
              </div>

              <Button 
                onClick={enterBattle}
                className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 hover:from-red-700 hover:via-pink-700 hover:to-rose-700 text-white font-bold py-4 px-8 text-lg"
              >
                <Target className="h-6 w-6 mr-2" />
                🐉 CHALLENGE THE ANCIENT DRAGON
              </Button>
            </div>

            {/* Battle Rewards */}
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-6">
              <h4 className="text-xl font-bold text-yellow-400 mb-4 text-center">🏆 LEGENDARY BATTLE REWARDS</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-900/20 rounded">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-bold text-yellow-400">500-1000 GAIA</div>
                  <div className="text-xs text-muted-foreground">Victory Tokens</div>
                </div>
                <div className="text-center p-4 bg-green-900/20 rounded">
                  <div className="text-2xl mb-2">🌳</div>
                  <div className="font-bold text-green-400">Forest Guardian</div>
                  <div className="text-xs text-muted-foreground">Legendary Title</div>
                </div>
                <div className="text-center p-4 bg-red-900/20 rounded">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="font-bold text-red-400">Dragon's Blessing</div>
                  <div className="text-xs text-muted-foreground">Permanent Power</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <TreePine className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-4">🌍 PROTECTING GAIA'S HEART</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Every battle fought in this arena directly contributes to forest conservation and wildlife protection worldwide. 
                The Ancient Forest Dragon's defeat channels its power into real environmental restoration projects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-green-900/20 rounded-lg border border-green-500/20">
                  <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-bold text-green-400">Forest Restoration</h4>
                  <p className="text-sm text-muted-foreground">Each victory plants 100 real trees</p>
                </div>
                <div className="p-6 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <Bird className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-bold text-blue-400">Wildlife Protection</h4>
                  <p className="text-sm text-muted-foreground">Protects endangered forest species</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HeartOfGaia
