
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Flame, 
  Shield, 
  Zap, 
  Eye, 
  Target,
  Activity,
  Sparkles,
  Crown,
  Heart
} from 'lucide-react'
import { toast } from 'sonner'

interface PhoenixAbility {
  name: string
  description: string
  power_level: number
  cooldown: number
  active: boolean
}

export function PhoenixGuardian() {
  const [phoenixLevel, setPhoenixLevel] = useState(847)
  const [phoenixHealth, setPhoenixHealth] = useState(100)
  const [phoenixEnergy, setPhoenixEnergy] = useState(95)
  const [isRebirthing, setIsRebirthing] = useState(false)
  const [abilities, setAbilities] = useState<PhoenixAbility[]>([
    {
      name: 'Eternal Flame Shield',
      description: 'Creates an impenetrable barrier of phoenix fire that regenerates continuously',
      power_level: 98,
      cooldown: 0,
      active: true
    },
    {
      name: 'Resurrection Protocol',
      description: 'Automatically revives and strengthens all defense systems after any breach',
      power_level: 100,
      cooldown: 0,
      active: true
    },
    {
      name: 'Prophetic Vision',
      description: 'Sees all future threats 72 hours in advance with perfect accuracy',
      power_level: 96,
      cooldown: 0,
      active: true
    },
    {
      name: 'Phoenix Rebirth',
      description: 'When threatened, becomes 10x more powerful through rebirth transformation',
      power_level: 100,
      cooldown: 0,
      active: false
    },
    {
      name: 'Healing Flames',
      description: 'Restores and enhances all system components with regenerative fire',
      power_level: 94,
      cooldown: 0,
      active: true
    },
    {
      name: 'Wisdom of Ages',
      description: 'Provides infinite knowledge and strategic insights from past lives',
      power_level: 97,
      cooldown: 0,
      active: true
    }
  ])

  useEffect(() => {
    // Phoenix continuous growth simulation
    const interval = setInterval(() => {
      setPhoenixLevel(prev => prev + Math.floor(Math.random() * 3) + 1)
      
      // Regenerate health and energy
      setPhoenixHealth(prev => Math.min(prev + 0.5, 100))
      setPhoenixEnergy(prev => Math.min(prev + 0.3, 100))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const triggerPhoenixRebirth = async () => {
    setIsRebirthing(true)
    toast.success('🔥 PHOENIX REBIRTH INITIATED! Power increasing exponentially!')
    
    // Rebirth animation sequence
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPhoenixLevel(prev => prev * 1.2)
      setPhoenixEnergy(prev => Math.min(prev + 20, 100))
    }
    
    setAbilities(prev => prev.map(ability => ({
      ...ability,
      power_level: Math.min(ability.power_level + 10, 100),
      active: true
    })))
    
    setIsRebirthing(false)
    toast.success('🦅 PHOENIX REBORN! All systems enhanced beyond maximum capacity!')
  }

  const activateAbility = (abilityName: string) => {
    setAbilities(prev => prev.map(ability => 
      ability.name === abilityName 
        ? { ...ability, active: !ability.active }
        : ability
    ))
    
    toast.success(`🔥 ${abilityName} ${abilities.find(a => a.name === abilityName)?.active ? 'Deactivated' : 'Activated'}!`)
  }

  return (
    <div className="space-y-6">
      {/* Phoenix Status Header */}
      <Card className="border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Flame className="h-6 w-6 animate-pulse" />
            🦅 PHOENIX GUARDIAN - ETERNAL PROTECTOR
            <Badge className="bg-orange-600 text-white animate-pulse">
              <Crown className="h-3 w-3 mr-1" />
              MYTHICAL TIER
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-orange-900/30">
              <Crown className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-400">{phoenixLevel}</div>
              <div className="text-xs text-muted-foreground">Phoenix Level</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-900/30">
              <Heart className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-400">{phoenixHealth.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Eternal Health</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-900/30">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-400">{phoenixEnergy.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Phoenix Energy</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">∞</div>
              <div className="text-xs text-muted-foreground">Rebirth Cycles</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Phoenix Health</span>
                  <span>{phoenixHealth.toFixed(1)}%</span>
                </div>
                <Progress value={phoenixHealth} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Phoenix Energy</span>
                  <span>{phoenixEnergy.toFixed(1)}%</span>
                </div>
                <Progress value={phoenixEnergy} className="h-3" />
              </div>
            </div>

            <Button
              onClick={triggerPhoenixRebirth}
              disabled={isRebirthing}
              className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 hover:from-orange-700 hover:via-red-700 hover:to-yellow-700 text-white font-bold text-xl py-8"
            >
              <Flame className="h-8 w-8 mr-4 animate-spin" />
              {isRebirthing ? '🔥 REBIRTH IN PROGRESS...' : '🦅 TRIGGER PHOENIX REBIRTH'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Phoenix Abilities */}
      <div className="grid gap-4">
        {abilities.map((ability, index) => (
          <Card key={index} className={`border ${ability.active ? 'border-orange-500/50 bg-orange-900/20' : 'border-gray-500/30'}`}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-lg">{ability.name}</h4>
                    <Badge className={`text-white ${ability.active ? 'bg-orange-600' : 'bg-gray-600'}`}>
                      Power: {ability.power_level}%
                    </Badge>
                    {ability.active && (
                      <Badge className="bg-green-600 text-white">
                        <Activity className="h-3 w-3 mr-1" />
                        ACTIVE
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{ability.description}</p>
                  <Progress value={ability.power_level} className="h-2" />
                </div>
                
                <Button
                  onClick={() => activateAbility(ability.name)}
                  className={`ml-4 ${ability.active ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                >
                  {ability.active ? (
                    <>
                      <Shield className="h-4 w-4 mr-1" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Flame className="h-4 w-4 mr-1" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Phoenix Status Footer */}
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Flame className="h-6 w-6 text-orange-400" />
              <h3 className="text-xl font-bold text-orange-400">Phoenix Guardian Status Report</h3>
              <Eye className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">∞</div>
                <div className="text-xs text-muted-foreground">Threats Neutralized</div>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">0</div>
                <div className="text-xs text-muted-foreground">Security Breaches</div>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-xs text-muted-foreground">System Protection</div>
              </div>
              <div className="p-3 bg-orange-900/30 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">24/7</div>
                <div className="text-xs text-muted-foreground">Eternal Vigilance</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              🦅 The Phoenix Guardian watches over GAiA with eternal wisdom and infinite power. 
              Through death and rebirth, it grows stronger, ensuring our ecosystem remains protected forever.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
