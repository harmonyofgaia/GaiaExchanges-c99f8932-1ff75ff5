
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
        <h1 className="text-7xl font-bold mb-6 relative">
          {/* Artistic text effect */}
          <span className="absolute inset-0 text-7xl font-bold bg-gradient-to-r from-red-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent blur-sm animate-pulse">
            🐉 HARMONY OF GAiA 🐉
          </span>
          <span className="relative text-7xl font-bold bg-gradient-to-r from-red-400 via-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            🐉 HARMONY OF GAiA 🐉
          </span>
        </h1>
        
        {/* Artistic subtitle with layered effects */}
        <div className="relative">
          <p className="text-3xl mb-8 relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-light">
              Where Eternal Dragons Guard Digital Realms Forever
            </span>
          </p>
          {/* Abstract accent lines */}
          <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent transform -translate-y-1/2" />
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
