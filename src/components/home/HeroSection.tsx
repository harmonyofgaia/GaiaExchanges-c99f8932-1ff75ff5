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
      {/* Background art for title */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 blur-sm">
          HARMONY
        </div>
      </div>
      
      <div className="mb-8 relative z-10">
        {/* Custom Gothic Style Title */}
        <h1 className="mb-6 relative flex flex-col items-center">
          {/* Main Gothic Title with Custom Styling */}
          <div className="relative mb-4">
            {/* Shadow/Glow Effect */}
            <div className="absolute inset-0 scale-110 opacity-30">
              <div 
                className="text-8xl font-bold text-white blur-sm"
                style={{
                  fontFamily: "'Uncial Antiqua', 'Cinzel Decorative', serif",
                  letterSpacing: '0.15em',
                  textShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)'
                }}
              >
                ℌ𝔞𝔯𝔪𝔬𝔫𝔶
              </div>
            </div>
            
            {/* Main Title with Gothic Styling */}
            <div 
              className="relative text-8xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent"
              style={{
                fontFamily: "'Uncial Antiqua', 'Cinzel Decorative', serif",
                letterSpacing: '0.15em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))'
              }}
            >
              ℌ𝔞𝔯𝔪𝔬𝔫𝔶
            </div>
            
            {/* Gothic Decorative Elements */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl text-purple-400 opacity-80">
              ✠ ⚜ ✠
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-4xl text-purple-400 opacity-80">
              ❦ ⚜ ❦
            </div>
          </div>

          {/* "OF" with smaller gothic styling */}
          <div className="relative mb-2">
            <span 
              className="text-4xl font-bold text-purple-300"
              style={{
                fontFamily: "'Uncial Antiqua', 'Cinzel Decorative', serif",
                letterSpacing: '0.2em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}
            >
              𝔬𝔣
            </span>
          </div>

          {/* GAiA with NEW CUSTOM LETTER STYLE and Logo Integration */}
          <div className="relative flex items-center justify-center gap-8">
            {/* Left Logo with Enhanced Fade Effect and "Harmony of GAiA" text */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <img 
                  src="/lovable-uploads/32992cdc-cfdf-4b28-805d-7e30bac68456.png"
                  alt="Gaia of Harmony Logo Left"
                  className="w-24 h-24 object-contain animate-pulse"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 40px rgba(34, 197, 94, 0.4))',
                    maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)'
                  }}
                />
                {/* Additional fade overlay for smoother transition */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.9) 100%)'
                  }}
                />
              </div>
              {/* "Harmony of GAiA" text under left logo */}
              <div className="text-center">
                <div 
                  className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-green-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: '0.1em'
                  }}
                >
                  Harmony of GAiA
                </div>
              </div>
            </div>

            {/* NEW CUSTOM GAiA STYLING */}
            <div className="relative">
              {/* Glow Effect Background */}
              <div className="absolute inset-0 scale-125 opacity-50">
                <div 
                  className="text-8xl font-bold text-emerald-400 blur-md animate-pulse"
                  style={{
                    fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', monospace",
                    letterSpacing: '0.2em',
                    textShadow: '0 0 30px rgba(34, 197, 94, 0.9), 0 0 60px rgba(34, 197, 94, 0.7)'
                  }}
                >
                  𝙂𝒂𝒊𝒜
                </div>
              </div>
              
              {/* Main GAiA Title with NEW Custom Styling */}
              <div 
                className="relative text-8xl font-bold bg-gradient-to-r from-emerald-200 via-green-100 to-teal-200 bg-clip-text text-transparent animate-pulse"
                style={{
                  fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', monospace",
                  letterSpacing: '0.2em',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                  filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.8))',
                  fontWeight: '900',
                  textTransform: 'uppercase'
                }}
              >
                𝙂𝒂𝒊𝒜
              </div>
              
              {/* Decorative Tech Elements around GAiA */}
              <div className="absolute -top-8 left-0 text-2xl text-emerald-400 opacity-70 animate-bounce">
                ⚡
              </div>
              <div className="absolute -top-8 right-0 text-2xl text-emerald-400 opacity-70 animate-bounce" style={{animationDelay: '0.3s'}}>
                ⚡
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-2xl text-emerald-400 opacity-70 animate-bounce" style={{animationDelay: '0.6s'}}>
                🌿
              </div>
            </div>

            {/* Right Logo with Enhanced Fade Effect (Mirrored) and "Harmony of GAiA" text */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <img 
                  src="/lovable-uploads/32992cdc-cfdf-4b28-805d-7e30bac68456.png"
                  alt="Gaia of Harmony Logo Right"
                  className="w-24 h-24 object-contain animate-pulse transform scale-x-[-1]"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 40px rgba(34, 197, 94, 0.4))',
                    maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)'
                  }}
                />
                {/* Additional fade overlay for smoother transition */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.9) 100%)'
                  }}
                />
              </div>
              {/* "Harmony of GAiA" text under right logo (mirrored) */}
              <div className="text-center">
                <div 
                  className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-purple-300"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: '0.1em'
                  }}
                >
                  Harmony of GAiA
                </div>
              </div>
            </div>
          </div>
        </h1>
        
        {/* Enhanced subtitle with gothic touch */}
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
          
          {/* Decorative border lines */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <span className="text-purple-400 text-2xl">❦</span>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>
        </div>
        
        {/* Enhanced GAiA Token Display with artistic frame */}
        <div className="relative mb-8">
          {/* Artistic frame */}
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
        
        {/* Artistic badges with enhanced effects */}
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
