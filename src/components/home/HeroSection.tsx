import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Flame,
  Zap,
  Crown,
  Users
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'

export const HeroSection = () => {
  return (
    <div className="text-center mb-12 relative">
      {/* Enhanced Background art for title with multiple layers */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 blur-lg animate-pulse">
          HARMONY
        </div>
      </div>
      
      {/* Additional artistic background layers */}
      <div className="absolute inset-0 flex items-center justify-center opacity-3">
        <div 
          className="text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-yellow-400 blur-2xl"
          style={{
            fontFamily: "'Cinzel Decorative', 'Uncial Antiqua', serif",
            transform: 'rotate(-5deg) scale(1.2)',
            animation: 'gradient-shift 8s ease infinite'
          }}
        >
          ℌ𝔞𝔯𝔪𝔬𝔫𝔶
        </div>
      </div>
      
      <div className="mb-8 relative z-10">
        {/* Revolutionary New Artistic Gothic Style Title */}
        <h1 className="mb-6 relative flex flex-col items-center">
          {/* Enhanced Multi-Layered Gothic Title */}
          <div className="relative mb-4">
            {/* Shadow/Glow Effect with Multiple Colors */}
            <div className="absolute inset-0 scale-125 opacity-40">
              <div 
                className="text-9xl font-bold text-white blur-lg animate-pulse"
                style={{
                  fontFamily: "'Cinzel Decorative', 'Uncial Antiqua', 'Old English Text MT', serif",
                  letterSpacing: '0.2em',
                  textShadow: `
                    0 0 30px rgba(255, 223, 0, 0.9),
                    0 0 60px rgba(220, 20, 60, 0.7),
                    0 0 90px rgba(138, 43, 226, 0.5),
                    0 0 120px rgba(0, 191, 255, 0.3)
                  `,
                  animation: 'glow-pulse 3s ease-in-out infinite'
                }}
              >
                ℌ𝔞𝔯𝔪𝔬𝔫𝔶
              </div>
            </div>
            
            {/* Main Artistic Gothic Title with Revolutionary Multi-Gradient Design */}
            <div 
              className="relative text-9xl font-bold"
              style={{
                fontFamily: "'Cinzel Decorative', 'Uncial Antiqua', 'Old English Text MT', serif",
                letterSpacing: '0.2em',
                textShadow: `
                  3px 3px 6px rgba(0,0,0,0.9),
                  -2px -2px 4px rgba(255,255,255,0.1),
                  0 0 20px rgba(255, 223, 0, 0.6)
                `,
                filter: 'drop-shadow(0 0 15px rgba(255, 223, 0, 0.8))',
                background: `
                  linear-gradient(45deg, 
                    #ff6b6b 0%, 
                    #ffd93d 12%, 
                    #ff8c42 25%, 
                    #6bcf7f 37%, 
                    #4ecdc4 50%, 
                    #45b7d1 62%, 
                    #96ceb4 75%, 
                    #feca57 87%, 
                    #ff9ff3 100%
                  )
                `,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 6s ease infinite'
              }}
            >
              ℌ𝔞𝔯𝔪𝔬𝔫𝔶
            </div>
            
            {/* Enhanced Gothic Decorative Elements */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-5xl opacity-90 animate-bounce">
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-gold-400 to-amber-400"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 223, 0, 0.8))',
                  animation: 'float-up 4s ease-in-out infinite'
                }}
              >
                ✠ ⚜ ❈ ⚜ ✠
              </span>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-5xl opacity-90 animate-bounce" style={{animationDelay: '1s'}}>
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(220, 20, 60, 0.8))',
                  animation: 'float-up 5s ease-in-out infinite reverse'
                }}
              >
                ❦ ⚜ ❋ ⚜ ❦
              </span>
            </div>
            
            {/* Floating Artistic Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute animate-pulse"
                  style={{
                    left: `${10 + (i * 10)}%`,
                    top: `${20 + Math.sin(i) * 30}%`,
                    animation: `float-up ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    i % 4 === 0 ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 
                    i % 4 === 1 ? 'bg-pink-400 shadow-lg shadow-pink-400/50' : 
                    i % 4 === 2 ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : 
                    'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                  } blur-sm`} />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced "OF" with more artistic styling */}
          <div className="relative mb-4">
            <span 
              className="text-5xl font-bold"
              style={{
                fontFamily: "'Cinzel Decorative', 'Uncial Antiqua', serif",
                letterSpacing: '0.3em',
                textShadow: `
                  2px 2px 4px rgba(0,0,0,0.8),
                  0 0 15px rgba(255, 182, 193, 0.6)
                `,
                background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 25%, #fecfef 75%, #ff9a9e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(255, 182, 193, 0.4))'
              }}
            >
              𝔬𝔣
            </span>
            
            {/* Decorative flourishes around "OF" */}
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 text-2xl text-pink-400 opacity-70 animate-spin" style={{animationDuration: '8s'}}>
              ❀
            </div>
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-2xl text-pink-400 opacity-70 animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}>
              ❀
            </div>
          </div>

          {/* Revolutionary GAiA Styling with Enhanced Logos */}
          <div className="relative flex items-center justify-center gap-12">
            {/* Enhanced Left Logo with Advanced Effects */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-28 h-28">
                {/* Glow ring around logo */}
                <div className="absolute inset-0 w-32 h-32 -top-2 -left-2 rounded-full bg-gradient-to-r from-green-400/30 to-emerald-400/30 blur-xl animate-pulse"></div>
                
                <img 
                  src="/lovable-uploads/32992cdc-cfdf-4b28-805d-7e30bac68456.png"
                  alt="Gaia of Harmony Logo Left"
                  className="w-28 h-28 object-contain animate-pulse relative z-10"
                  style={{
                    filter: `
                      drop-shadow(0 0 25px rgba(34, 197, 94, 0.8)) 
                      drop-shadow(0 0 50px rgba(34, 197, 94, 0.6))
                      drop-shadow(0 0 75px rgba(34, 197, 94, 0.4))
                    `,
                    maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)'
                  }}
                />
                
                {/* Orbiting particles around logo */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '12s'}}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-green-400/50"></div>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-emerald-400/50"></div>
                </div>
              </div>
            </div>

            {/* Revolutionary GAiA Typography */}
            <div className="relative">
              {/* Multi-layered Glow Effect Background */}
              <div className="absolute inset-0 scale-150 opacity-60">
                <div 
                  className="text-9xl font-bold text-emerald-400 blur-2xl animate-pulse"
                  style={{
                    fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', 'Audiowide', monospace",
                    letterSpacing: '0.25em',
                    textShadow: `
                      0 0 40px rgba(34, 197, 94, 0.9),
                      0 0 80px rgba(34, 197, 94, 0.7),
                      0 0 120px rgba(34, 197, 94, 0.5)
                    `
                  }}
                >
                  𝙂𝒂𝒊𝒜
                </div>
              </div>
              
              {/* Main Revolutionary GAiA Title */}
              <div 
                className="relative text-9xl font-bold animate-pulse"
                style={{
                  fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', 'Audiowide', monospace",
                  letterSpacing: '0.25em',
                  textShadow: `
                    3px 3px 6px rgba(0,0,0,0.9),
                    0 0 20px rgba(34, 197, 94, 0.9),
                    0 0 40px rgba(34, 197, 94, 0.7),
                    0 0 60px rgba(34, 197, 94, 0.5)
                  `,
                  filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.9))',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  background: `
                    linear-gradient(45deg, 
                      #10b981 0%, 
                      #34d399 15%, 
                      #6ee7b7 30%, 
                      #a7f3d0 45%, 
                      #d1fae5 60%, 
                      #a7f3d0 75%, 
                      #34d399 90%, 
                      #10b981 100%
                    )
                  `,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 5s ease infinite'
                }}
              >
                𝙂𝒂𝒊𝒜
              </div>
              
              {/* Enhanced Tech Elements around GAiA */}
              <div className="absolute -top-12 -left-8 text-3xl text-emerald-400 opacity-80 animate-bounce">
                ⚡
              </div>
              <div className="absolute -top-12 -right-8 text-3xl text-emerald-400 opacity-80 animate-bounce" style={{animationDelay: '0.3s'}}>
                ⚡
              </div>
              <div className="absolute -bottom-12 -left-8 text-3xl text-emerald-400 opacity-80 animate-bounce" style={{animationDelay: '0.6s'}}>
                🌿
              </div>
              <div className="absolute -bottom-12 -right-8 text-3xl text-emerald-400 opacity-80 animate-bounce" style={{animationDelay: '0.9s'}}>
                🌿
              </div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-3xl text-emerald-400 opacity-80 animate-bounce" style={{animationDelay: '1.2s'}}>
                💎
              </div>
            </div>

            {/* Enhanced Right Logo (Mirrored) with Advanced Effects */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-28 h-28">
                {/* Glow ring around logo */}
                <div className="absolute inset-0 w-32 h-32 -top-2 -left-2 rounded-full bg-gradient-to-l from-green-400/30 to-emerald-400/30 blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                
                <img 
                  src="/lovable-uploads/32992cdc-cfdf-4b28-805d-7e30bac68456.png"
                  alt="Gaia of Harmony Logo Right"
                  className="w-28 h-28 object-contain animate-pulse transform scale-x-[-1] relative z-10"
                  style={{
                    filter: `
                      drop-shadow(0 0 25px rgba(34, 197, 94, 0.8)) 
                      drop-shadow(0 0 50px rgba(34, 197, 94, 0.6))
                      drop-shadow(0 0 75px rgba(34, 197, 94, 0.4))
                    `,
                    maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.3) 85%, rgba(0,0,0,0) 100%)',
                    animationDelay: '0.5s'
                  }}
                />
                
                {/* Counter-orbiting particles around right logo */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-emerald-400/50"></div>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-green-400/50"></div>
                </div>
              </div>
            </div>
          </div>
        </h1>
        
        
        <div className="relative mb-8">
          <p 
            className="text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300"
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.1em'
            }}
          >
            ⚔️ Where Eternal Dragons Guard Digital Realms Forever ⚔️
          </p>
          
          <div className="flex justify-center items-center gap-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <span className="text-purple-400 text-2xl">❦</span>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur-sm" />
          <div className="relative bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 animate-pulse" />
              🚀 POWERED BY GAiA TOKEN
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                <span className="text-green-400 font-semibold">Contract:</span>
                <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                <span className="text-blue-400 font-semibold">Wallet:</span>
                <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">{GAIA_TOKEN.WALLET_ADDRESS}</code>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-center italic">
              The revolutionary token that powers our entire ecosystem with dragon-level security
            </p>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 flex-wrap">
          <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl px-8 py-3 animate-bounce shadow-lg shadow-red-500/25 border border-red-400/30">
            <Flame className="h-5 w-5 mr-2" />
            Dragon Protected
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-8 py-3 animate-pulse shadow-lg shadow-blue-500/25 border border-blue-400/30">
            <Zap className="h-5 w-5 mr-2" />
            Quantum Secure
          </Badge>
          <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl px-8 py-3 animate-bounce shadow-lg shadow-green-500/25 border border-green-400/30">
            <Crown className="h-5 w-5 mr-2" />
            Forever Invisible
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-8 py-3 animate-pulse shadow-lg shadow-purple-500/25 border border-purple-400/30">
            <Users className="h-5 w-5 mr-2" />
            Community Driven
          </Badge>
        </div>
      </div>
    </div>
  )
}
