
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { UnifiedServiceOrchestrator } from '@/components/UnifiedServiceOrchestrator'

export const SecurityPreview = () => {
  const unifiedServices = UnifiedServiceOrchestrator()

  return (
    <Card className="border-2 border-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-gradient-to-br from-red-900/10 to-purple-900/10 relative overflow-hidden">
      {/* Subtle artistic background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400" />
        <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">
          🛡️ UNIFIED DRAGON SECURITY STATS
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div className="p-3 bg-red-500/10 rounded-lg backdrop-blur-sm">
            <div className="text-xl font-bold text-red-400">∞</div>
            <div className="text-xs text-muted-foreground">Security Power</div>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg backdrop-blur-sm">
            <div className="text-xl font-bold text-purple-400">{unifiedServices.activeServices}</div>
            <div className="text-xs text-muted-foreground">Active Services</div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg backdrop-blur-sm">
            <div className="text-xl font-bold text-blue-400">100%</div>
            <div className="text-xs text-muted-foreground">Invisibility Level</div>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg backdrop-blur-sm">
            <div className="text-xl font-bold text-green-400">24/7</div>
            <div className="text-xs text-muted-foreground">Dragon Protection</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link to="/ultimate-security">
            <Button size="sm" className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:opacity-80 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
              <Shield className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Enter Security Fortress</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
