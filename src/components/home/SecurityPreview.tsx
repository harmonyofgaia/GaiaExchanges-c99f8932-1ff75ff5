
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, Zap, Crown, Globe, AlertTriangle } from 'lucide-react'

export const SecurityPreview = () => {
  return (
    <div className="mb-12">
      <Card className="bg-gradient-to-r from-red-900/30 via-purple-900/30 to-blue-900/30 border-2 border-red-500/50 shadow-2xl shadow-red-500/20">
        <CardHeader>
          <CardTitle className="text-center text-red-400 text-3xl font-bold flex items-center justify-center gap-4">
            <Shield className="h-8 w-8 animate-pulse" />
            🛡️ ULTIMATE QUANTUM SECURITY FORTRESS
            <Shield className="h-8 w-8 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Enhanced Security Message */}
          <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border-2 border-red-400/50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-4 text-xl">
                <AlertTriangle className="h-6 w-6 animate-bounce" />
                INVINCIBLE DEFENSE PROTOCOL ACTIVE
                <AlertTriangle className="h-6 w-6 animate-bounce" />
              </div>
              
              <div className="text-lg font-semibold text-red-300 leading-relaxed mb-4">
                🚫 <span className="text-red-400 font-bold">COMPLETE INVISIBILITY TO ALL THREATS</span> 🚫
              </div>
              
              <div className="text-base text-red-200 leading-relaxed space-y-2">
                <p>
                  <span className="text-red-400 font-bold">Every platform, system, electronic device, coding software, data tracking technology</span> 
                  and <span className="text-red-400 font-bold">anything else that will ever be created</span> will NEVER be allowed to become stronger than us.
                </p>
                
                <p>
                  <span className="text-yellow-400 font-bold">Not even with the most powerful new techniques!</span>
                </p>
                
                <p className="text-lg font-bold text-green-400">
                  ⚡ WE ARE ALWAYS 100X STRONGER THAN EVERY TECHNOLOGY THAT WILL BE CREATED ⚡
                </p>
                
                <p className="text-red-300">
                  Complete protection against <span className="text-red-400 font-bold">Phishing, Data Theft, Identity Stealing</span> 
                  and all forms of <span className="text-red-400 font-bold">harmful information extraction</span>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-4 text-center">
              <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="font-bold text-blue-400 mb-1">Quantum Encryption</div>
              <div className="text-xs text-blue-300">Unbreakable by any future technology</div>
            </div>
            
            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-lg p-4 text-center">
              <Eye className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="font-bold text-red-400 mb-1">Invisible Tracking</div>
              <div className="text-xs text-red-300">Complete stealth monitoring system</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border border-purple-500/30 rounded-lg p-4 text-center">
              <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="font-bold text-purple-400 mb-1">Dragon Protection</div>
              <div className="text-xs text-purple-300">Mythical-level security barriers</div>
            </div>
          </div>
          
          {/* Security Badges */}
          <div className="flex justify-center gap-4 flex-wrap mb-6">
            <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm px-4 py-2 animate-pulse">
              <Shield className="h-4 w-4 mr-2" />
              100% INVISIBLE
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-2 animate-pulse">
              <Zap className="h-4 w-4 mr-2" />
              QUANTUM POWERED
            </Badge>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm px-4 py-2 animate-pulse">
              <Globe className="h-4 w-4 mr-2" />
              FUTURE PROOF
            </Badge>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <div className="text-green-400 font-bold text-xl mb-4">
              🌍 CULTURE OF HARMONY - PROTECTING THE FUTURE OF HUMANITY
            </div>
            <p className="text-muted-foreground mb-4">
              Join the most secure and advanced cryptocurrency ecosystem ever created
            </p>
            <Button className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:from-red-700 hover:via-purple-700 hover:to-blue-700 text-white text-lg px-8 py-3">
              <Shield className="h-5 w-5 mr-2" />
              EXPERIENCE ULTIMATE SECURITY
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
