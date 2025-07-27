
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Zap, Eye, Lock, Globe, Users, Waves, Fish, Coral } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { GaiaLogo } from '@/components/GaiaLogo'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export default function SandProtect() {
  const [protectionStats, setProtectionStats] = useState({
    threatsBlocked: 15432,
    protectedAreas: 89,
    marineLifeSaved: 5678,
    communityMembers: 12589
  })

  const [securityLevel, setSecurityLevel] = useState(98)

  useEffect(() => {
    const interval = setInterval(() => {
      setProtectionStats(prev => ({
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 10),
        protectedAreas: prev.protectedAreas + Math.floor(Math.random() * 2),
        marineLifeSaved: prev.marineLifeSaved + Math.floor(Math.random() * 15),
        communityMembers: prev.communityMembers + Math.floor(Math.random() * 5)
      }))
      
      setSecurityLevel(prev => Math.min(100, prev + Math.random() * 2))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-cyan-900">
      <EnhancedBackgroundManager 
        settings={{
          type: 'waves',
          intensity: 'medium',
          color: '#00ffff',
          speed: 1,
          autoGenerate: true
        }}
      />
      
      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-4">
            <UniversalGaiaLogo size="lg" animated={true} />
            <GaiaLogo size="lg" variant="glow" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🏖️ Sand & Sea Protection
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300/90 font-medium">
              Defending Our Oceans, Beaches & Marine Life
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced protection systems safeguarding coastal ecosystems, 
              marine biodiversity, and beach environments worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Shield className="h-5 w-5 mr-2" />
              Activate Protection
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-900/20">
              <Waves className="h-5 w-5 mr-2" />
              Monitor Ocean Health
            </Button>
          </div>
        </div>

        {/* Protection Status */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Shield className="h-6 w-6" />
              🛡️ Protection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-cyan-400">Security Level</span>
                  <span className="text-cyan-300">{securityLevel.toFixed(1)}%</span>
                </div>
                <Progress value={securityLevel} className="h-3" />
              </div>
              <Badge className="bg-green-600 animate-pulse">
                <Eye className="h-3 w-3 mr-1" />
                ACTIVE
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  <AnimatedCounter value={protectionStats.threatsBlocked} />
                </div>
                <div className="text-sm text-cyan-300/80">Threats Blocked</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  <AnimatedCounter value={protectionStats.protectedAreas} />
                </div>
                <div className="text-sm text-blue-300/80">Protected Areas</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  <AnimatedCounter value={protectionStats.marineLifeSaved} />
                </div>
                <div className="text-sm text-emerald-300/80">Marine Life Saved</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  <AnimatedCounter value={protectionStats.communityMembers} />
                </div>
                <div className="text-sm text-purple-300/80">Protectors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protection Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Waves className="h-5 w-5" />
                Ocean Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-300/80 mb-4">
                Real-time monitoring of ocean health, temperature, and pollution levels 
                across protected marine areas.
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600">Active</Badge>
                <Badge className="bg-blue-600">24/7 Monitoring</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <Fish className="h-5 w-5" />
                Marine Life Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-300/80 mb-4">
                Advanced AI systems protecting marine ecosystems from illegal fishing, 
                pollution, and habitat destruction.
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-600">AI Powered</Badge>
                <Badge className="bg-green-600">Automated</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Coral className="h-5 w-5" />
                Reef Restoration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300/80 mb-4">
                Community-driven coral reef restoration projects using blockchain 
                technology and sustainable practices.
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-600">Community</Badge>
                <Badge className="bg-pink-600">Restoration</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Features */}
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Lock className="h-6 w-6" />
              🔒 Advanced Security Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">Quantum Encryption</span>
                </div>
                <p className="text-sm text-red-300/80">
                  Military-grade quantum encryption protecting all coastal monitoring data
                </p>
              </div>
              
              <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">Global Network</span>
                </div>
                <p className="text-sm text-orange-300/80">
                  Worldwide network of protection nodes ensuring comprehensive coverage
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-red-600 hover:bg-red-700">
                <Shield className="h-4 w-4 mr-2" />
                Activate Maximum Protection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
