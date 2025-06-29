
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Flame,
  Zap,
  Crown,
  Users,
  AlertTriangle
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { EnhancedArtisticTitle } from './EnhancedArtisticTitle'

export const HeroSection = () => {
  return (
    <div className="text-center mb-12 relative">
      {/* Enhanced Artistic Title Component */}
      <EnhancedArtisticTitle />
      
      {/* BRAND CLARIFICATION NOTICE */}
      <div className="relative mb-8">
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-4 max-w-4xl mx-auto backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-2">
            <AlertTriangle className="h-5 w-5" />
            IMPORTANT BRAND CLARIFICATION
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p className="text-sm text-red-300">
            We are NOT GAIA Everworld! We are GAiA Token - a completely separate, exclusive project powered by Harmony of Gaia Projects Creator Business, empowered by Culture of Harmony.
          </p>
        </div>
      </div>
      
      <div className="relative mb-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur-sm" />
          <div className="relative bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 animate-pulse" />
              🚀 POWERED BY GAiA TOKEN (NOT GAIA EVERWORLD)
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                <span className="text-green-400 font-semibold">Our Contract:</span>
                <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                <span className="text-blue-400 font-semibold">Our Wallet:</span>
                <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">{GAIA_TOKEN.WALLET_ADDRESS}</code>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-center italic">
              Exclusive GAiA Token ecosystem with dragon-level security - Culture of Harmony powered
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
            Culture of Harmony
          </Badge>
        </div>
      </div>
    </div>
  )
}
