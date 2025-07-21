
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Eye, Zap, Skull, Bug, Spider } from 'lucide-react'
import { toast } from 'sonner'

export function DefenseCreatureArmy() {
  const [creatures, setCreatures] = useState({
    ghosts: 999999,
    distractionAnimals: 888888,
    invisibleTrojans: 777777,
    matrixSpiders: 666666
  })
  
  const [attackersTrapped, setAttackersTrapped] = useState(12847)
  const [fakeSystems, setFakeSystems] = useState(50)
  const [trojanDeployments, setTrojanDeployments] = useState(999999)

  useEffect(() => {
    const interval = setInterval(() => {
      setAttackersTrapped(prev => prev + Math.floor(Math.random() * 10))
      setTrojanDeployments(prev => prev + Math.floor(Math.random() * 50))
      
      console.log('👻 DEFENSE CREATURE ARMY - GLOBAL PROTECTION ACTIVE')
      console.log('🕷️ MATRIX WEB TRAPPING ALL ATTACKERS')
      console.log('🦎 DISTRACTION ANIMALS LEADING ATTACKERS TO FALSE SYSTEMS')
      console.log('💀 INVISIBLE TROJANS DEPLOYED - UNTRACEABLE FOREVER')
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const deployGhostArmy = () => {
    setCreatures(prev => ({ ...prev, ghosts: prev.ghosts + 100000 }))
    toast.success('👻 GHOST ARMY DEPLOYED!', {
      description: 'Invisible trackers released worldwide - All attackers will be tracked',
      duration: 10000
    })
    
    console.log('👻 GHOST ARMY DEPLOYMENT SUCCESSFUL')
    console.log('🌍 GLOBAL INVISIBLE TRACKING INITIATED')
  }

  const activateDistractionAnimals = () => {
    setCreatures(prev => ({ ...prev, distractionAnimals: prev.distractionAnimals + 50000 }))
    setFakeSystems(prev => prev + 10)
    toast.success('🦎 DISTRACTION ANIMALS ACTIVATED!', {
      description: 'Attackers will be led to fake systems with false information',
      duration: 12000
    })
    
    console.log('🦎 DISTRACTION ANIMALS ACTIVE')
    console.log('🎭 FAKE SYSTEMS ONLINE - ATTACKERS WILL SEE FALSE DATA')
  }

  const deployMatrixWeb = () => {
    setCreatures(prev => ({ ...prev, matrixSpiders: prev.matrixSpiders + 75000 }))
    toast.success('🕷️ MATRIX WEB DEPLOYED!', {
      description: 'Inescapable trap activated - Attackers cannot escape once caught',
      duration: 15000
    })
    
    console.log('🕷️ MATRIX WEB TRAP ACTIVATED')
    console.log('🚫 NO ESCAPE ROUTE FOR ATTACKERS')
  }

  return (
    <div className="space-y-6">
      {/* Main Army Status */}
      <Card className="bg-gradient-to-r from-red-900/40 via-purple-900/40 to-black border-4 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-gray-400">
            🛡️ DEFENSE CREATURE ARMY - ULTIMATE PROTECTION
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-2xl text-red-400 font-bold">
              INVISIBLE ARMY • MATRIX TRAPS • FAKE SYSTEMS • UNTRACEABLE TROJANS
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-red-600 animate-pulse text-lg px-4 py-2">ARMY DEPLOYED</Badge>
              <Badge className="bg-purple-600 animate-pulse text-lg px-4 py-2">MATRIX ACTIVE</Badge>
              <Badge className="bg-gray-600 animate-pulse text-lg px-4 py-2">INVISIBLE</Badge>
              <Badge className="bg-green-600 animate-pulse text-lg px-4 py-2">PROTECTING</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Army Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/50 bg-purple-900/30">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">👻</div>
            <div className="text-2xl font-bold text-purple-400">{creatures.ghosts.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Ghost Trackers</div>
          </CardContent>
        </Card>

        <Card className="border-green-500/50 bg-green-900/30">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">🦎</div>
            <div className="text-2xl font-bold text-green-400">{creatures.distractionAnimals.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Distraction Animals</div>
          </CardContent>
        </Card>

        <Card className="border-red-500/50 bg-red-900/30">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">💀</div>
            <div className="text-2xl font-bold text-red-400">{creatures.invisibleTrojans.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Invisible Trojans</div>
          </CardContent>
        </Card>

        <Card className="border-gray-500/50 bg-gray-900/30">
          <CardContent className="pt-6 text-center">
            <div className="text-4xl mb-2">🕷️</div>
            <div className="text-2xl font-bold text-gray-400">{creatures.matrixSpiders.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Matrix Spiders</div>
          </CardContent>
        </Card>
      </div>

      {/* Defense Controls */}
      <Tabs defaultValue="ghosts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ghosts">👻 Ghosts</TabsTrigger>
          <TabsTrigger value="animals">🦎 Animals</TabsTrigger>
          <TabsTrigger value="matrix">🕷️ Matrix</TabsTrigger>
          <TabsTrigger value="trojans">💀 Trojans</TabsTrigger>
        </TabsList>

        <TabsContent value="ghosts" className="space-y-4">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">👻 GHOST TRACKER ARMY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-purple-900/30 rounded-lg">
                <div className="text-6xl mb-4">👻</div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{creatures.ghosts.toLocaleString()}</div>
                <div className="text-purple-300">Active Ghost Trackers Worldwide</div>
              </div>

              <Button 
                onClick={deployGhostArmy}
                className="w-full bg-gradient-to-r from-purple-600 to-gray-600 hover:from-purple-700 hover:to-gray-700 h-16 text-xl"
              >
                <Eye className="h-8 w-8 mr-4" />
                👻 DEPLOY GHOST ARMY
              </Button>

              <div className="p-4 bg-purple-900/30 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2">👻 GHOST CAPABILITIES:</h4>
                <div className="space-y-1 text-sm">
                  <div>🔍 Track Every Step of Attackers</div>
                  <div>👻 Completely Invisible to All Systems</div>
                  <div>🌍 Global Coverage - No Escape</div>
                  <div>📊 Send All Data to IA Engine</div>
                  <div>💀 Mark Attackers for Destruction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="animals" className="space-y-4">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🦎 DISTRACTION ANIMAL ARMY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-green-900/30 rounded-lg">
                <div className="text-6xl mb-4">🦎</div>
                <div className="text-3xl font-bold text-green-400 mb-2">{creatures.distractionAnimals.toLocaleString()}</div>
                <div className="text-green-300">Active Distraction Animals</div>
              </div>

              <Button 
                onClick={activateDistractionAnimals}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-16 text-xl"
              >
                <Shield className="h-8 w-8 mr-4" />
                🦎 ACTIVATE DISTRACTION ANIMALS
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-900/30 rounded-lg">
                  <h4 className="text-green-400 font-bold mb-2">🎭 FAKE SYSTEMS:</h4>
                  <div className="space-y-1 text-sm">
                    <div>🏢 {fakeSystems} Fake Company Systems</div>
                    <div>🔐 False Security Portals</div>
                    <div>📊 Misleading Databases</div>
                    <div>🌐 Decoy Websites Active</div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-900/30 rounded-lg">
                  <h4 className="text-blue-400 font-bold mb-2">🦎 ANIMAL POWERS:</h4>
                  <div className="space-y-1 text-sm">
                    <div>🎯 Lead Attackers to Fake Systems</div>
                    <div>🎭 Show Completely False Information</div>
                    <div>💀 Hidden Invisible Trojans</div>
                    <div>📡 Send Real-time Intel to Admin</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card className="border-gray-500/30 bg-gray-900/20">
            <CardHeader>
              <CardTitle className="text-gray-400">🕷️ MATRIX WEB TRAP SYSTEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gray-900/30 rounded-lg">
                <div className="text-6xl mb-4">🕷️</div>
                <div className="text-3xl font-bold text-gray-400 mb-2">{attackersTrapped.toLocaleString()}</div>
                <div className="text-gray-300">Attackers Trapped Forever</div>
              </div>

              <Button 
                onClick={deployMatrixWeb}
                className="w-full bg-gradient-to-r from-gray-600 to-black hover:from-gray-700 hover:to-gray-900 h-16 text-xl"
              >
                <Spider className="h-8 w-8 mr-4" />
                🕷️ DEPLOY MATRIX WEB TRAP
              </Button>

              <div className="p-4 bg-red-900/30 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2">🕸️ MATRIX WEB FEATURES:</h4>
                <div className="space-y-1 text-sm">
                  <div>🚫 No Escape Route Once Trapped</div>
                  <div>🕸️ Web Expands Automatically</div>
                  <div>💀 Destroys Attacker Systems</div>
                  <div>👻 Completely Invisible Entry</div>
                  <div>🔄 Self-Replicating Web Structure</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trojans" className="space-y-4">
          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-400">💀 INVISIBLE TROJAN ARMY</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-red-900/30 rounded-lg">
                <div className="text-6xl mb-4">💀</div>
                <div className="text-3xl font-bold text-red-400 mb-2">{trojanDeployments.toLocaleString()}</div>
                <div className="text-red-300">Trojans Deployed</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-red-600 hover:bg-red-700 h-16">
                  <Bug className="h-6 w-6 mr-2" />
                  DEPLOY AUTO TROJANS
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                  <Skull className="h-6 w-6 mr-2" />
                  ACTIVATE DESTROYERS
                </Button>
              </div>

              <div className="p-4 bg-red-900/30 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2">💀 TROJAN CAPABILITIES:</h4>
                <div className="space-y-1 text-sm">
                  <div>👻 Completely Invisible Forever</div>
                  <div>🔄 Self-Destruct if Detected</div>
                  <div>📊 Send All Intel to IA Engine</div>
                  <div>💥 Destroy Attacker Systems</div>
                  <div>🌐 Spread Through Their Networks</div>
                  <div>🛡️ Protect Our Real Systems</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
