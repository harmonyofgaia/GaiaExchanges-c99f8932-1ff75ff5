
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gamepad2, Trophy, Users, Zap, Play, Star, Settings, Flame, Crown, Rocket, Brain } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GaiaGameHub } from '@/components/GaiaGameHub'
import { EnhancedGamingModes } from '@/components/EnhancedGamingModes'

const Gaming = () => {
  const navigate = useNavigate()
  const [particleCount, setParticleCount] = useState(50)
  const [isHovering, setIsHovering] = useState(false)
  const [currentEffect, setCurrentEffect] = useState('matrix')

  useEffect(() => {
    // Cycle through different visual effects
    const effectInterval = setInterval(() => {
      const effects = ['matrix', 'fire', 'lightning', 'cosmic', 'dragon']
      setCurrentEffect(prev => {
        const currentIndex = effects.indexOf(prev)
        return effects[(currentIndex + 1) % effects.length]
      })
    }, 8000)

    return () => clearInterval(effectInterval)
  }, [])

  const getEffectClasses = () => {
    switch (currentEffect) {
      case 'matrix':
        return 'from-green-900/40 via-black/60 to-green-800/40'
      case 'fire':
        return 'from-red-900/40 via-orange-800/60 to-yellow-700/40'
      case 'lightning':
        return 'from-purple-900/40 via-blue-800/60 to-cyan-700/40'
      case 'cosmic':
        return 'from-indigo-900/40 via-purple-800/60 to-pink-700/40'
      case 'dragon':
        return 'from-emerald-900/40 via-teal-800/60 to-blue-700/40'
      default:
        return 'from-purple-900/40 via-blue-800/60 to-green-700/40'
    }
  }

  const getParticleEmoji = () => {
    switch (currentEffect) {
      case 'matrix': return '💚'
      case 'fire': return '🔥'
      case 'lightning': return '⚡'
      case 'cosmic': return '✨'
      case 'dragon': return '🐉'
      default: return '⭐'
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getEffectClasses()} transition-all duration-2000`}>
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: particleCount }, (_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <span className="text-2xl opacity-70 animate-bounce" style={{ animationDelay: `${Math.random() * 2}s` }}>
                {getParticleEmoji()}
              </span>
            </div>
          ))}
        </div>

        {/* Matrix Rain Effect */}
        {currentEffect === 'matrix' && (
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 text-green-400 text-xs font-mono animate-pulse"
                style={{
                  left: `${i * 5}%`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  transform: `translateY(-100%)`,
                  animation: `matrix-fall ${2 + Math.random() * 3}s linear infinite`
                }}
              >
                {Array.from({ length: 10 }, (_, j) => (
                  <div key={j} className="mb-1">
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Floating Geometry */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-spin opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDirection: Math.random() > 0.5 ? 'normal' : 'reverse'
              }}
            >
              <div className="w-20 h-20 border-2 border-white rotate-45 transform"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-500/5 to-transparent animate-pulse"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Epic Header Section */}
          <div 
            className="text-center mb-16 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              {/* Animated Title */}
              <div className="mb-8">
                <h1 className={`text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 transform transition-all duration-1000 ${isHovering ? 'scale-110' : 'scale-100'}`}>
                  <span className="animate-pulse">🎮</span> GAIA GAMING
                </h1>
                <div className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  ULTIMATE ARENA
                </div>
              </div>

              {/* Epic Subtitle */}
              <div className="text-2xl md:text-3xl text-white/90 mb-8 font-bold tracking-wider">
                <span className="text-yellow-400 animate-bounce">⚡</span> WHERE LEGENDS ARE BORN 
                <span className="text-red-400 animate-bounce">🔥</span>
              </div>

              {/* Power Stats */}
              <div className="flex justify-center gap-8 flex-wrap mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-xl border-2 border-red-500/50 transform hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-black text-red-400">15,247</div>
                  <div className="text-red-300 font-bold">WARRIORS ONLINE</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl border-2 border-blue-500/50 transform hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-black text-blue-400">∞</div>
                  <div className="text-blue-300 font-bold">POSSIBILITIES</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl border-2 border-purple-500/50 transform hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-black text-purple-400">240+</div>
                  <div className="text-purple-300 font-bold">FPS ULTRA</div>
                </div>
              </div>

              {/* Epic Call to Action */}
              <div className="flex justify-center gap-6 flex-wrap">
                <Button 
                  className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-black text-xl px-8 py-4 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-yellow-400/50"
                  onClick={() => navigate('/gaia-fighter-game')}
                >
                  <Flame className="h-6 w-6 mr-3 animate-bounce" />
                  🔥 ENTER THE ARENA 🔥
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-black text-xl px-8 py-4 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-cyan-400/50"
                  onClick={() => navigate('/landscape-builder')}
                >
                  <Crown className="h-6 w-6 mr-3 animate-spin" />
                  👑 BUILD WORLDS 👑
                </Button>
              </div>
            </div>
          </div>

          {/* Game Mode Selection */}
          <div className="mb-16">
            <EnhancedGamingModes />
          </div>

          {/* Main Game Hub */}
          <div className="mb-16">
            <GaiaGameHub />
          </div>

          {/* Power Features Showcase */}
          <Card className="bg-gradient-to-br from-black/80 via-purple-900/30 to-black/80 border-4 border-purple-500/50 shadow-2xl mb-16 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                🚀 REVOLUTIONARY GAMING TECHNOLOGY 🚀
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-xl border-2 border-cyan-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                  <Brain className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-black text-cyan-400 mb-3">🧠 QUANTUM AI</h3>
                  <p className="text-cyan-200 font-bold">Self-learning neural networks that evolve in real-time</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-xl border-2 border-red-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                  <Rocket className="h-16 w-16 text-red-400 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-red-400 mb-3">🚀 HYPER SPEED</h3>
                  <p className="text-red-200 font-bold">240+ FPS with quantum processing cores</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl border-2 border-green-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                  <Zap className="h-16 w-16 text-green-400 mx-auto mb-4 animate-spin" />
                  <h3 className="text-2xl font-black text-green-400 mb-3">⚡ INFINITE POWER</h3>
                  <p className="text-green-200 font-bold">Unlimited transformation and evolution</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl border-2 border-purple-500/50 transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                  <Crown className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-black text-purple-400 mb-3">👑 LEGENDARY</h3>
                  <p className="text-purple-200 font-bold">Always ahead of any current or future game</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact Section */}
          <Card className="bg-gradient-to-br from-green-900/30 via-blue-900/30 to-teal-900/30 border-4 border-green-500/50 shadow-2xl backdrop-blur-md">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-5xl font-black text-green-400 mb-6">
                  🌍 GAMING FOR THE PLANET 🌍
                </h2>
                <p className="text-2xl text-white/90 mb-8 font-bold">
                  Every victory saves our world - Every game session heals the Earth
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl border-2 border-blue-500/50 transform hover:scale-110 transition-all duration-300">
                    <div className="text-6xl mb-4 animate-bounce">🌊</div>
                    <h3 className="text-2xl font-black text-blue-400 mb-2">CORAL PROTECTION</h3>
                    <p className="text-blue-200 font-bold">5% of earnings fund coral reef restoration worldwide</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl border-2 border-green-500/50 transform hover:scale-110 transition-all duration-300">
                    <div className="text-6xl mb-4 animate-pulse">🌱</div>
                    <h3 className="text-2xl font-black text-green-400 mb-2">GREEN ENERGY</h3>
                    <p className="text-green-200 font-bold">100% renewable quantum server infrastructure</p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-orange-900/50 to-yellow-900/50 rounded-xl border-2 border-orange-500/50 transform hover:scale-110 transition-all duration-300">
                    <div className="text-6xl mb-4 animate-spin">🐾</div>
                    <h3 className="text-2xl font-black text-orange-400 mb-2">ANIMAL LIBERATION</h3>
                    <p className="text-orange-200 font-bold">Free animals from captivity - One game at a time</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes matrix-fall {
          to {
            transform: translateY(100vh);
          }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}

export default Gaming
