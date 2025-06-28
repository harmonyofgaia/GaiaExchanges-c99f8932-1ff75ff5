
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Waves, 
  Car, 
  TreePine, 
  Wind,
  ArrowRight,
  Heart,
  Globe,
  Zap,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

const DrivingToNature = () => {
  const [journeyProgress, setJourneyProgress] = useState(0)
  const [coralReefHealth, setCoralReefHealth] = useState(15)
  const [totalRaised, setTotalRaised] = useState(62500)

  useEffect(() => {
    const interval = setInterval(() => {
      setJourneyProgress(prev => (prev + 0.5) % 100)
      setCoralReefHealth(prev => Math.min(prev + 0.1, 100))
      setTotalRaised(prev => prev + Math.floor(Math.random() * 50))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const activateCoralMode = () => {
    toast.success('🪸 CORAL REEF RECOVERY MODE ACTIVATED!', {
      description: 'Driving towards the most beautiful underwater paradise restoration!',
      duration: 5000
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Revolutionary Driving to Nature Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-green-800 to-cyan-900">
        {/* Moving Road Animation */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-gray-800 to-transparent">
          <div className="absolute bottom-0 w-full h-2 bg-yellow-400 animate-pulse" 
               style={{
                 animation: 'roadLines 2s linear infinite',
                 background: 'repeating-linear-gradient(90deg, yellow 0px, yellow 20px, transparent 20px, transparent 40px)'
               }}
          />
        </div>

        {/* Floating Trees Animation */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <TreePine className={`h-${4 + Math.floor(Math.random() * 8)} w-${4 + Math.floor(Math.random() * 8)} text-green-400 opacity-${30 + Math.floor(Math.random() * 70)}`} />
          </div>
        ))}

        {/* Floating Coral Elements */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <div className="text-4xl animate-spin-slow">🪸</div>
          </div>
        ))}

        {/* Wind Effects */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <Wind
              key={i}
              className="absolute text-white/20 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Driving Car Animation */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <Car className="h-16 w-16 text-blue-400 animate-bounce" />
            <div className="absolute -top-4 -right-4">
              <div className="animate-spin text-2xl">🌍</div>
            </div>
          </div>
        </div>

        {/* Gaia Logo Decorations */}
        <div className="absolute top-10 left-10">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-24 h-24 object-contain opacity-30 animate-pulse"
          />
        </div>
        <div className="absolute top-10 right-10">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-24 h-24 object-contain opacity-30 animate-pulse"
          />
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-32 h-32 object-contain opacity-20 animate-bounce"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🚗🌊 DRIVING TO NATURE
          </h1>
          <p className="text-2xl text-white mb-2">
            🪸 Sound Riffs Re Grau dio - Coral Reef Recovery Journey
          </p>
          <p className="text-lg text-cyan-300">
            Every journey contributes to the most beautiful underwater paradise restoration
          </p>
        </div>

        {/* Journey Progress */}
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Waves className="h-6 w-6" />
              🌊 Coral Reef Recovery Journey Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-cyan-300">Journey to Paradise:</span>
                <span className="text-cyan-400 font-bold">{journeyProgress.toFixed(1)}%</span>
              </div>
              <Progress value={journeyProgress} className="h-4 bg-cyan-900/30" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-cyan-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-cyan-400">${totalRaised.toLocaleString()}</div>
                  <div className="text-sm text-cyan-300">Raised for Coral Reefs</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-green-400">{coralReefHealth.toFixed(1)}%</div>
                  <div className="text-sm text-green-300">Reef Health Recovery</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400">3</div>
                  <div className="text-sm text-blue-300">Active Reef Sites</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={activateCoralMode}
              className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 text-lg"
            >
              <Sparkles className="h-6 w-6 mr-2" />
              🪸 ACTIVATE CORAL PARADISE MODE
            </Button>
          </CardContent>
        </Card>

        {/* Coral Reef Project Details */}
        <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Heart className="h-6 w-6" />
              🎵 Personal Coral Reef Recovery Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-cyan-400">🎵 Sound Riffs Re Grau dio Technology</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-cyan-300">Balanced underwater audio signals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-300">Attracts marine life back to reefs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-blue-300">Stimulates natural coral growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-300">Restores ecosystem balance</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-400">💰 Funding & Impact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GAiA Burn Allocation:</span>
                    <span className="text-green-400 font-bold">5% of all burns</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Personal Wallet:</span>
                    <span className="text-cyan-400 font-bold">Dedicated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reef Sites Active:</span>
                    <span className="text-blue-400 font-bold">3 locations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marine Life Helped:</span>
                    <span className="text-purple-400 font-bold">1000+ species</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/20">
              <h4 className="font-bold text-cyan-400 mb-2">🌊 Personal Wallet Address:</h4>
              <div className="font-mono text-sm bg-black/50 p-3 rounded break-all text-cyan-300 mb-4">
                ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7
              </div>
              <p className="text-sm text-cyan-300">
                🎵 Every GAiA token burn contributes 5% directly to this revolutionary coral reef restoration through Sound Riffs Re Grau dio technology - driving towards the most beautiful underwater paradise!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes roadLines {
          0% { transform: translateX(-40px); }
          100% { transform: translateX(0px); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default DrivingToNature
