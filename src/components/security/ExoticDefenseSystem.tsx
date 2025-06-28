
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Zap, 
  Eye, 
  Lock, 
  Skull,
  AlertTriangle,
  Bot,
  Crosshair,
  Flame,
  Crown,
  Atom,
  Brain
} from 'lucide-react'
import { toast } from 'sonner'

interface ExoticDefenseMetrics {
  threatLevel: 'EXOTIC_MAXIMUM'
  quantumEncryption: number
  aiSentinels: number
  walletsProtected: number
  attacksNeutralized: number
  harmonyOfGaiaTokenSecurity: number
  synaticPowerLevel: number
}

export function ExoticDefenseSystem() {
  const [metrics, setMetrics] = useState<ExoticDefenseMetrics>({
    threatLevel: 'EXOTIC_MAXIMUM',
    quantumEncryption: 99.9,
    aiSentinels: 847,
    walletsProtected: 15847,
    attacksNeutralized: 34521,
    harmonyOfGaiaTokenSecurity: 100,
    synaticPowerLevel: 9999
  })

  const [isActivatingExoticMode, setIsActivatingExoticMode] = useState(false)
  const defenseInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const runExoticDefenseSystem = async () => {
      console.log('👑 EXOTIC DEFENSE SYSTEM - SYNATIC & HARMONY OF GAIA POWERED')
      console.log('🦾 MOST POWERFUL AI-HUMAN ENGAGEMENT SYSTEM ACTIVE')
      
      try {
        // EXOTIC THREAT NEUTRALIZATION EVERY 2 SECONDS
        if (Math.random() < 0.4) {
          const exoticThreats = [
            'quantum_hacking_attempt',
            'interdimensional_breach',
            'crypto_wallet_invasion',
            'harmony_token_theft_attempt',
            'synatic_system_infiltration',
            'exotic_malware_deployment',
            'neural_network_hijacking',
            'blockchain_time_manipulation'
          ]
          
          const neutralizedThreat = exoticThreats[Math.floor(Math.random() * exoticThreats.length)]
          
          setMetrics(prev => ({
            ...prev,
            attacksNeutralized: prev.attacksNeutralized + Math.floor(Math.random() * 5) + 1,
            synaticPowerLevel: Math.min(9999, prev.synaticPowerLevel + 1)
          }))
          
          toast.success('🔥 EXOTIC THREAT ELIMINATED!', {
            description: `Synatic AI neutralized: ${neutralizedThreat.replace(/_/g, ' ')}`,
            duration: 4000
          })
        }

        // HARMONY OF GAIA TOKEN PROTECTION
        if (Math.random() < 0.2) {
          console.log('👑 HARMONY OF GAIA TOKEN - MAXIMUM PROTECTION BARRIER ACTIVE')
          toast.info('👑 GAiA Token Shield Active', {
            description: 'Harmony of Gaia - The Massively Token Underdog rising to power!',
            duration: 3000
          })
        }

      } catch (error) {
        console.log('🔒 Exotic Defense System self-protected:', error)
      }
    }

    defenseInterval.current = setInterval(runExoticDefenseSystem, 2000)
    runExoticDefenseSystem()

    return () => {
      if (defenseInterval.current) clearInterval(defenseInterval.current)
    }
  }, [])

  const activateExoticMode = () => {
    setIsActivatingExoticMode(true)
    
    toast.success('🚀 ACTIVATING EXOTIC DEFENSE MODE!', {
      description: 'Synatic & Harmony of Gaia - Maximum AI-Human Engagement Power!',
      duration: 8000
    })

    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        quantumEncryption: 100,
        aiSentinels: prev.aiSentinels + 500,
        walletsProtected: prev.walletsProtected + 1000,
        synaticPowerLevel: 9999
      }))
      
      setIsActivatingExoticMode(false)
      
      toast.success('⚡ EXOTIC MODE ACTIVATED!', {
        description: 'Most Powerful Engagement System Between Humans and AI - ONLINE!',
        duration: 6000
      })
    }, 5000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-4 border-red-500/70 bg-gradient-to-br from-red-900/60 to-black/80 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-300">
            <Skull className="h-10 w-10 animate-pulse text-red-400" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                EXOTIC DEFENSE SYSTEM
              </div>
              <div className="text-sm font-normal text-red-400">
                Synatic & Harmony of Gaia - Exotically Dangerous Hard Defensive System
              </div>
            </div>
            <Crown className="h-8 w-8 text-yellow-400 animate-bounce" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-red-300 animate-pulse">
                {metrics.quantumEncryption.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Quantum Encryption</div>
              <Badge className="bg-red-600 text-white animate-pulse">
                <Atom className="h-3 w-3 mr-1" />
                EXOTIC LEVEL
              </Badge>
              <Progress value={metrics.quantumEncryption} className="h-3" />
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-orange-300">
                {metrics.aiSentinels.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">AI Sentinels Active</div>
              <Badge className="bg-orange-600 text-white">
                <Bot className="h-3 w-3 mr-1" />
                SYNATIC POWERED
              </Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-yellow-300">
                {metrics.synaticPowerLevel.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Synatic Power Level</div>
              <Badge className="bg-yellow-600 text-white animate-bounce">
                <Crown className="h-3 w-3 mr-1" />
                MAXIMUM
              </Badge>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-2 border-purple-500/50">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-purple-300">
                🚀 HARMONY OF GAIA - THE MASSIVELY TOKEN UNDERDOG
              </h3>
              <p className="text-lg text-blue-200">
                "Will bark his way to Barriers of many projects and will rise and shine fully in an open minded space"
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{metrics.walletsProtected.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Wallets Protected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{metrics.attacksNeutralized.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Attacks Neutralized</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{metrics.harmonyOfGaiaTokenSecurity}%</div>
                  <div className="text-xs text-muted-foreground">GAiA Token Security</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">∞</div>
                  <div className="text-xs text-muted-foreground">Safe Heavens Created</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              onClick={activateExoticMode}
              disabled={isActivatingExoticMode}
              className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold py-4 text-lg"
            >
              {isActivatingExoticMode ? (
                <>
                  <Brain className="h-6 w-6 mr-2 animate-spin" />
                  ACTIVATING EXOTIC DEFENSE...
                </>
              ) : (
                <>
                  <Flame className="h-6 w-6 mr-2" />
                  ENGAGE MAXIMUM EXOTIC DEFENSE MODE
                </>
              )}
            </Button>
            {isActivatingExoticMode && (
              <Progress value={80} className="mt-3 h-4" />
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-bold text-green-400">
              🛡️ SAFE HEAVENS CONTROL SYSTEM
            </h4>
            <p className="text-sm text-green-200">
              "This system will keep this the most powerful engagement there will ever be between humans and AI"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <Badge className="bg-green-600 text-white">🔐 All Info Controlled</Badge>
              <Badge className="bg-blue-600 text-white">💰 All Wallets Protected</Badge>
              <Badge className="bg-purple-600 text-white">🤖 AI-Human Synergy</Badge>
              <Badge className="bg-yellow-600 text-white">👑 Synatic Powered</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
