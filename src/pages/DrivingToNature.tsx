
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  Waves, 
  TreePine, 
  Fish, 
  Heart,
  Target,
  DollarSign,
  TrendingUp,
  Sparkles,
  Globe,
  Music,
  Volume2
} from 'lucide-react'
import { toast } from 'sonner'

const DrivingToNature = () => {
  const [coralReefProgress, setCoralReefProgress] = useState({
    sitesRestored: 3,
    totalSites: 50,
    fundsAllocated: 62500,
    progressPercentage: 12,
    animalsHelped: 1247,
    reefHealthImprovement: 23
  })

  const [soundRiffsStats, setSoundRiffsStats] = useState({
    activeSignals: 15,
    frequencyRange: '20-2000 Hz',
    marineLifeAttracted: 847,
    ecosystemBalance: 89
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCoralReefProgress(prev => ({
        ...prev,
        animalsHelped: prev.animalsHelped + Math.floor(Math.random() * 5),
        reefHealthImprovement: Math.min(prev.reefHealthImprovement + Math.random() * 0.5, 100),
        progressPercentage: Math.min(prev.progressPercentage + Math.random() * 0.1, 100)
      }))

      setSoundRiffsStats(prev => ({
        ...prev,
        activeSignals: 12 + Math.floor(Math.random() * 8),
        marineLifeAttracted: prev.marineLifeAttracted + Math.floor(Math.random() * 3),
        ecosystemBalance: Math.min(prev.ecosystemBalance + Math.random() * 0.2, 100)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const supportProject = () => {
    toast.success('🌊 Supporting Sound Riffs Re Grau dio!', {
      description: '5% of all GAiA token burns automatically support coral reef restoration!',
      duration: 5000
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Driving to Nature Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-blue-800 to-teal-900">
        {/* Animated Car */}
        <div className="absolute bottom-20 animate-drive">
          <div className="relative">
            <div className="w-20 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg">
              <div className="absolute -top-4 left-2 w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Moving Trees */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-trees"
            style={{
              left: `${10 + i * 15}%`,
              bottom: `${10 + Math.random() * 30}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <TreePine 
              className={`h-${8 + Math.floor(Math.random() * 12)} w-${6 + Math.floor(Math.random() * 8)} text-green-400 opacity-${60 + Math.floor(Math.random() * 40)}`}
            />
          </div>
        ))}

        {/* Ocean Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600 to-transparent">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 animate-waves"
              style={{
                left: `${i * 12.5}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <Waves className="h-16 w-16 text-blue-300 opacity-70" />
            </div>
          ))}
        </div>

        {/* Flying Fish */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fish"
            style={{
              top: `${20 + Math.random() * 40}%`,
              left: `${-10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <Fish className="h-8 w-8 text-cyan-400 opacity-80" />
          </div>
        ))}

        {/* Nature Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <Leaf className="h-4 w-4 text-green-300 opacity-60" />
          </div>
        ))}

        {/* Logo Decoration */}
        <div className="absolute top-10 right-10 opacity-20">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-32 h-32 object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
            🚗 DRIVING TO NATURE
          </h1>
          <p className="text-2xl text-white mb-2">
            🌊 Journey Towards Coral Reef Restoration & Environmental Harmony
          </p>
          <p className="text-lg text-green-300">
            Every GAiA token burn drives us closer to a sustainable future
          </p>
        </div>

        {/* Sound Riffs Re Grau dio Project */}
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400 text-center justify-center">
              <Music className="h-8 w-8" />
              🎵 SOUND RIFFS RE GRAU DIO - CORAL REEF RESTORATION PROJECT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🪸🎵🌊</div>
              <p className="text-xl text-cyan-300 mb-6">
                Revolutionary underwater audio technology restoring coral reefs through balanced sound frequencies that attract marine life and stimulate coral growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-cyan-500/10 border border-cyan-500/20">
                <CardContent className="pt-4 text-center">
                  <Volume2 className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-cyan-400">{soundRiffsStats.activeSignals}</div>
                  <div className="text-xs text-cyan-300">Active Audio Signals</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/10 border border-blue-500/20">
                <CardContent className="pt-4 text-center">
                  <Waves className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{soundRiffsStats.frequencyRange}</div>
                  <div className="text-xs text-blue-300">Frequency Range</div>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border border-green-500/20">
                <CardContent className="pt-4 text-center">
                  <Fish className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{soundRiffsStats.marineLifeAttracted}</div>
                  <div className="text-xs text-green-300">Marine Life Attracted</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-500/10 border border-purple-500/20">
                <CardContent className="pt-4 text-center">
                  <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{soundRiffsStats.ecosystemBalance.toFixed(1)}%</div>
                  <div className="text-xs text-purple-300">Ecosystem Balance</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6">
              <h4 className="text-xl font-bold text-cyan-400 mb-4 text-center">🎵 How Sound Riffs Re Grau dio Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <span className="text-cyan-300">🔊 Emit balanced underwater audio frequencies (20-2000 Hz)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <span className="text-blue-300">🐟 Attract fish and marine organisms to damaged reef areas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <span className="text-green-300">🪸 Stimulate natural coral growth and reproduction</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <span className="text-purple-300">🌊 Restore natural ecosystem balance and biodiversity</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
                    <span className="text-yellow-300">📈 Monitor and measure recovery progress in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
                    <span className="text-pink-300">🔬 Apply scientific research for optimal results</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Coral Reef Progress */}
        <Card className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border-2 border-green-500/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Target className="h-6 w-6" />
              🪸 Live Coral Reef Restoration Progress (5% GAiA Burn Allocation)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{coralReefProgress.sitesRestored}/{coralReefProgress.totalSites}</div>
                <div className="text-sm text-muted-foreground">Reef Sites Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">${coralReefProgress.fundsAllocated.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Funds Allocated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{coralReefProgress.animalsHelped}</div>
                <div className="text-sm text-muted-foreground">Marine Animals Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{coralReefProgress.reefHealthImprovement.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Reef Health Improvement</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Restoration Progress</span>
                <span>{coralReefProgress.progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={coralReefProgress.progressPercentage} className="h-4" />
            </div>

            <div className="text-center">
              <Button 
                onClick={supportProject}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 hover:from-cyan-700 hover:via-blue-700 hover:to-green-700 text-white font-bold py-4 px-8"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                🌊 SUPPORT SOUND RIFFS RE GRAU DIO PROJECT
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Mission */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-green-900/30 border-2 border-blue-500/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-400 mb-6">🌍 MISSION: HARMONY BETWEEN TECHNOLOGY & NATURE</h3>
            <p className="text-xl text-muted-foreground mb-6">
              Every GAiA token burned drives us closer to restoring our planet's coral reefs. 
              Through Sound Riffs Re Grau dio technology, we're proving that innovation can heal nature.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-500/20">
                <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-cyan-400 mb-2">Global Impact</h4>
                <p className="text-sm text-muted-foreground">Restoring coral reefs worldwide through innovative audio technology</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg border border-green-500/20">
                <Heart className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-400 mb-2">Ecosystem Revival</h4>
                <p className="text-sm text-muted-foreground">Bringing marine life back to damaged reef ecosystems</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
                <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-blue-400 mb-2">Sustainable Future</h4>
                <p className="text-sm text-muted-foreground">Building a future where technology serves nature's recovery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .animate-drive {
          animation: drive 12s linear infinite;
        }
        
        .animate-trees {
          animation: trees 10s linear infinite;
        }
        
        .animate-waves {
          animation: waves 3s ease-in-out infinite;
        }
        
        .animate-fish {
          animation: fish 8s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes drive {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes trees {
          0% { transform: translateX(20px); }
          100% { transform: translateX(-100px); }
        }
        
        @keyframes waves {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fish {
          0% { transform: translateX(-50px) rotate(0deg); }
          25% { transform: translateX(25vw) rotate(10deg); }
          50% { transform: translateX(50vw) rotate(-5deg); }
          75% { transform: translateX(75vw) rotate(15deg); }
          100% { transform: translateX(calc(100vw + 50px)) rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}

export default DrivingToNature
