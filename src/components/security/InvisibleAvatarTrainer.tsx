
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  Brain, 
  Zap, 
  Shield,
  Eye,
  Crown,
  Target
} from 'lucide-react'
import { toast } from 'sonner'

interface AvatarStats {
  invisibilityLevel: number
  trainingProgress: number
  avatarCount: number
  combatEffectiveness: number
  stealthMastery: number
}

export function InvisibleAvatarTrainer() {
  const [avatarStats, setAvatarStats] = useState<AvatarStats>({
    invisibilityLevel: 99.8,
    trainingProgress: 87.3,
    avatarCount: 24,
    combatEffectiveness: 95.7,
    stealthMastery: 100
  })

  useEffect(() => {
    console.log('👻 INVISIBLE AVATAR TRAINER - STEALTH PROTOCOLS ACTIVE')
    console.log('🥷 TRAINING INVISIBLE WARRIORS FOR MAXIMUM PROTECTION')
    console.log('🔮 AVATAR MULTIPLICATION SYSTEM ENGAGED')
    
    const trainingInterval = setInterval(() => {
      setAvatarStats(prev => ({
        invisibilityLevel: Math.min(100, prev.invisibilityLevel + Math.random() * 0.01),
        trainingProgress: Math.min(100, prev.trainingProgress + Math.random() * 0.5),
        avatarCount: prev.avatarCount + (Math.random() > 0.9 ? 1 : 0),
        combatEffectiveness: Math.min(100, prev.combatEffectiveness + Math.random() * 0.1),
        stealthMastery: 100
      }))
      
      if (Math.random() < 0.04) {
        console.log('👻 NEW INVISIBLE AVATAR TRAINED - STEALTH FORCE EXPANDED')
      }
    }, 3000)

    return () => clearInterval(trainingInterval)
  }, [])

  const spawnNewAvatar = () => {
    setAvatarStats(prev => ({
      ...prev,
      avatarCount: prev.avatarCount + 1
    }))
    
    toast.success('👻 NEW INVISIBLE AVATAR SPAWNED!', {
      description: 'Stealth warrior added to protection force',
      duration: 3000
    })
  }

  return (
    <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <User className="h-6 w-6" />
          👻 INVISIBLE AVATAR TRAINING SYSTEM
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-purple-600 animate-pulse">
            {avatarStats.avatarCount} AVATARS ACTIVE
          </Badge>
          <Badge className="bg-blue-600">
            {avatarStats.invisibilityLevel.toFixed(1)}% INVISIBLE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Eye className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{avatarStats.invisibilityLevel.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Invisibility</div>
            <Progress value={avatarStats.invisibilityLevel} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{avatarStats.combatEffectiveness.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Combat Power</div>
            <Progress value={avatarStats.combatEffectiveness} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Brain className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{avatarStats.trainingProgress.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Training</div>
            <Progress value={avatarStats.trainingProgress} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Target className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">{avatarStats.stealthMastery}%</div>
            <div className="text-xs text-muted-foreground">Stealth Mastery</div>
            <Progress value={avatarStats.stealthMastery} className="mt-2 h-2" />
          </div>
        </div>

        <div className="text-center p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded border border-purple-500/30">
          <div className="text-4xl mb-2">👻🥷👤</div>
          <div className="text-lg font-bold text-purple-400 mb-2">
            INVISIBLE AVATAR ARMY
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            {avatarStats.avatarCount} trained invisible warriors protecting the system
          </div>
          
          <Button 
            onClick={spawnNewAvatar}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3"
          >
            <Zap className="h-5 w-5 mr-2" />
            👻 SPAWN NEW INVISIBLE AVATAR
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-purple-900/20 rounded border border-purple-500/20">
            <Crown className="h-4 w-4 text-purple-400 mx-auto mb-1" />
            <div className="text-purple-400 font-bold">MASTER</div>
            <div className="text-muted-foreground">Stealth Level</div>
          </div>
          <div className="text-center p-2 bg-blue-900/20 rounded border border-blue-500/20">
            <Shield className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <div className="text-blue-400 font-bold">ELITE</div>
            <div className="text-muted-foreground">Protection</div>
          </div>
          <div className="text-center p-2 bg-green-900/20 rounded border border-green-500/20">
            <Zap className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <div className="text-green-400 font-bold">ACTIVE</div>
            <div className="text-muted-foreground">Training</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
