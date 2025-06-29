
import { EternalDragonDisplay } from '@/components/security/EternalDragonDisplay'
import { SecurityCenter } from '@/components/SecurityCenter'
import { SystemHealthMonitor } from '@/components/SystemHealthMonitor'
import { EnhancedAnimatedBackground } from '@/components/ui/enhanced-animated-background'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Crown, Zap, Eye } from 'lucide-react'

const ImmortalSecurity = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedAnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            🛡️ IMMORTAL SECURITY CENTER
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Dragon-Level Protection • Invisible Barriers • Quantum Defense
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Immortal Protection
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              <Crown className="h-4 w-4 mr-2" />
              God Mode Security
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Quantum Barriers
            </Badge>
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2">
              <Eye className="h-4 w-4 mr-2" />
              Invisible Defense
            </Badge>
          </div>
        </div>

        {/* ETERNAL DRAGON with artistic enhancement */}
        <div className="mb-12 relative">
          <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-red-400 text-center">
                🐲 ETERNAL DRAGON GUARDIAN - IMMORTAL PROTECTION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-xl" />
              <div className="relative">
                <EternalDragonDisplay />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SecurityCenter />
          <SystemHealthMonitor />
        </div>
      </div>
    </div>
  )
}

export default ImmortalSecurity
