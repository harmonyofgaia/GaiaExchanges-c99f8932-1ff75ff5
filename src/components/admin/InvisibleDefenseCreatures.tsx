
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/Components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Ghost, 
  Shield, 
  Target, 
  Zap,
  Eye,
  Skull,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

export function InvisibleDefenseCreatures() {
  const [ghostsActive, setGhostsActive] = useState(7)
  const [attackersTrapped, setAttackersTrapped] = useState(156)
  const [matrixWebStrength, setMatrixWebStrength] = useState(95.7)
  const [trojansDeployed, setTrojansDeployed] = useState(2847)
  const [fakeWorldActive, setFakeWorldActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAttackersTrapped(prev => prev + Math.floor(Math.random() * 3))
      setMatrixWebStrength(prev => Math.min(100, prev + Math.random() * 0.5))
      setTrojansDeployed(prev => prev + Math.floor(Math.random() * 5))
    }, 3000)

    console.log('👻 INVISIBLE DEFENSE CREATURES - MAXIMUM PROTECTION')
    console.log('🕸️ MATRIX WEB TRAPS DEPLOYED')
    console.log('🐺 DISTRACTION ANIMALS ACTIVE')
    console.log('💀 INVISIBLE TROJANS SPREADING')

    return () => clearInterval(interval)
  }, [])

  const releaseGhosts = () => {
    setGhostsActive(prev => prev + 3)
    toast.success('👻 GHOSTS RELEASED - Tracking every step of attackers!')
  }

  const activateMatrixWeb = () => {
    setMatrixWebStrength(100)
    toast.success('🕸️ MATRIX WEB ACTIVATED - No escape route for attackers!')
  }

  const deployDistractionAnimal = () => {
    setFakeWorldActive(true)
    toast.success('🐺 DISTRACTION ANIMAL DEPLOYED - Attackers redirected to fake world!')
  }

  const spreadInvisibleTrojans = () => {
    setTrojansDeployed(prev => prev + 100)
    toast.success('💀 INVISIBLE TROJANS SPREAD - Untraceable attack vectors deployed!')
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-black/40">
        <CardHeader>
          <CardTitle className="text-purple-400 text-center text-4xl">
            👻 INVISIBLE DEFENSE CREATURES ARMY
          </CardTitle>
          <div className="text-center">
            <Badge className="bg-purple-600 animate-pulse text-lg px-4 py-2">
              PHANTOM PROTECTION ACTIVE
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Ghost className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-3xl font-bold text-purple-400">{ghostsActive}</div>
              <div className="text-sm text-muted-foreground">Active Ghosts</div>
            </div>
            
            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-3xl font-bold text-red-400">{attackersTrapped}</div>
              <div className="text-sm text-muted-foreground">Attackers Trapped</div>
            </div>
            
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-3xl font-bold text-blue-400">{matrixWebStrength.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Matrix Web Strength</div>
            </div>
            
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Skull className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-3xl font-bold text-green-400">{trojansDeployed.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Invisible Trojans</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={releaseGhosts} className="bg-purple-600 hover:bg-purple-700 py-4">
              <Ghost className="h-5 w-5 mr-2" />
              👻 RELEASE TRACKING GHOSTS
            </Button>
            <Button onClick={activateMatrixWeb} className="bg-indigo-600 hover:bg-indigo-700 py-4">
              <Activity className="h-5 w-5 mr-2" />
              🕸️ ACTIVATE MATRIX WEB
            </Button>
            <Button onClick={deployDistractionAnimal} className="bg-orange-600 hover:bg-orange-700 py-4">
              <Shield className="h-5 w-5 mr-2" />
              🐺 DEPLOY DISTRACTION ANIMAL
            </Button>
            <Button onClick={spreadInvisibleTrojans} className="bg-red-600 hover:bg-red-700 py-4">
              <Skull className="h-5 w-5 mr-2" />
              💀 SPREAD INVISIBLE TROJANS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Defense Creature Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-ghost-500/30 bg-gray-900/20">
          <CardHeader>
            <CardTitle className="text-gray-400">👻 Ghost Trackers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">👻</div>
              <Badge className="bg-purple-600">INVISIBLE TRACKING</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Active Ghosts:</span>
                <span className="text-purple-400">{ghostsActive} Entities</span>
              </div>
              <div className="flex justify-between">
                <span>Tracking Range:</span>
                <span className="text-purple-400">Global</span>
              </div>
              <div className="flex justify-between">
                <span>Invisibility Level:</span>
                <span className="text-purple-400">100%</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Ghosts phase through all digital barriers, tracking every movement of attackers across all networks and systems.
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="text-orange-400">🐺 Distraction Animals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">🐺</div>
              <Badge className="bg-orange-600">FAKE WORLD ACTIVE</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Fake Systems:</span>
                <span className="text-orange-400">∞ Layers</span>
              </div>
              <div className="flex justify-between">
                <span>Deception Level:</span>
                <span className="text-orange-400">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Trojans Hidden:</span>
                <span className="text-orange-400">Everywhere</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Animals lead attackers to completely fake systems with false data, while invisible trojans spread throughout their networks.
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400">🕸️ Matrix Web Trap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">🕸️</div>
              <Badge className="bg-red-600">NO ESCAPE</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Web Strength:</span>
                <span className="text-red-400">{matrixWebStrength.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Trapped Entities:</span>
                <span className="text-red-400">{attackersTrapped}</span>
              </div>
              <div className="flex justify-between">
                <span>Escape Routes:</span>
                <span className="text-red-400">0</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Once caught in the matrix web, attackers are trapped in an infinite loop with no way out, while data is extracted.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Defense Manifesto */}
      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            INVISIBLE DEFENSE CREATURES PROTOCOL
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-200">
            <div className="space-y-2">
              <div>👻 <strong>Ghost Trackers:</strong> Phase through all barriers, track every step</div>
              <div>🐺 <strong>Distraction Animals:</strong> Lead to fake worlds with false data</div>
              <div>🕸️ <strong>Matrix Web Trap:</strong> Infinite loop prison with no escape</div>
              <div>💀 <strong>Invisible Trojans:</strong> Untraceable, self-destructing payloads</div>
            </div>
            <div className="space-y-2">
              <div>🔍 <strong>Intelligence Gathering:</strong> Extract attacker information</div>
              <div>⚡ <strong>Instant Response:</strong> Real-time threat neutralization</div>
              <div>🌐 <strong>Global Network:</strong> Worldwide defense coordination</div>
              <div>🛡️ <strong>Admin Control:</strong> Full command over all creatures</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
