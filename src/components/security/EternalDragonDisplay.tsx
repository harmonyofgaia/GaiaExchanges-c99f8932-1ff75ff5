
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Flame, 
  Crown, 
  Shield, 
  Zap,
  Eye,
  Target
} from 'lucide-react'
import { PersistentDragonCore } from './PersistentDragonCore'
import { toast } from 'sonner'

export function EternalDragonDisplay() {
  const dragonCore = PersistentDragonCore()
  
  const unleashDragonPower = () => {
    toast.success('🐉 ETERNAL DRAGON POWER UNLEASHED!', {
      description: 'Maximum protection and immortal defense activated',
      duration: 5000
    })
  }

  return (
    <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Flame className="h-6 w-6" />
          🐉 ETERNAL DRAGON PROTECTION SYSTEM
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-red-600 animate-pulse">
            LEVEL {dragonCore.dragonStats.level}
          </Badge>
          <Badge className="bg-orange-600">
            AGE: {dragonCore.formatAge()}
          </Badge>
          <Badge className="bg-purple-600">
            {dragonCore.dragonStats.quantumEvolutions} EVOLUTIONS
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Flame className="h-8 w-8 text-red-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-bold text-red-400">
              {Math.floor(dragonCore.dragonStats.power).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Dragon Power</div>
            <Progress value={Math.min(100, dragonCore.dragonStats.power / 1000)} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">
              {Math.floor(dragonCore.dragonStats.immuneSystemStrength).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Immune System</div>
            <Progress value={Math.min(100, dragonCore.dragonStats.immuneSystemStrength / 1000)} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {dragonCore.dragonStats.threatsDestroyed.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Threats Destroyed</div>
          </div>
          
          <div className="text-center">
            <Eye className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">
              {dragonCore.dragonStats.networksProtected.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Networks Protected</div>
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded border border-red-500/30">
          <div className="text-6xl mb-4">🐉</div>
          <div className="text-xl font-bold text-red-400 mb-2">
            ETERNAL DRAGON - IMMORTAL GUARDIAN
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            Growing stronger every moment • Never-ending evolution • Worldwide influence: {dragonCore.dragonStats.worldwideInfluence.toFixed(3)}%
          </div>
          
          <Button 
            onClick={unleashDragonPower}
            className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold py-3 px-6"
          >
            <Crown className="h-5 w-5 mr-2" />
            🐉 UNLEASH ETERNAL DRAGON POWER
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="text-center p-2 bg-red-900/20 rounded border border-red-500/20">
            <div className="text-red-400 font-bold">{dragonCore.dragonStats.experience.toLocaleString()}</div>
            <div className="text-muted-foreground">Total Experience</div>
          </div>
          <div className="text-center p-2 bg-orange-900/20 rounded border border-orange-500/20">
            <div className="text-orange-400 font-bold">{dragonCore.getGrowthRate()}/sec</div>
            <div className="text-muted-foreground">Growth Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
