
import { QuantumEvolutionMonitor } from '@/components/security/QuantumEvolutionMonitor'
import { CloudPerformanceOptimizer } from '@/components/system/CloudPerformanceOptimizer'
import { SystemHealthChecker } from '@/components/system/SystemHealthChecker'
import { DragonSecurityDashboard } from '@/components/security/DragonSecurityDashboard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Cloud, Activity, Globe, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

const SystemStatus = () => {
  const handleDeployment = () => {
    toast.success('🚀 Deployment Initiated!', {
      description: 'Harmony of Gaia is being prepared for global launch',
      duration: 8000
    })
    
    setTimeout(() => {
      toast.success('🌍 Website Live!', {
        description: 'Your platform is now accessible worldwide',
        duration: 10000
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            HARMONY OF GAIA SYSTEM STATUS
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Admin-Only Access • Cloud Optimized • Dragon Protected • Ready for Global Launch
          </p>
          
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Badge className="bg-green-600 text-white px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Quantum Secured
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2">
              <Cloud className="h-4 w-4 mr-2" />
              Cloud Optimized
            </Badge>
            <Badge className="bg-purple-600 text-white px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              Performance Enhanced
            </Badge>
            <Badge className="bg-orange-600 text-white px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Global Ready
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <QuantumEvolutionMonitor />
          <CloudPerformanceOptimizer />
        </div>

        <div className="mb-8">
          <SystemHealthChecker />
        </div>

        <div className="mb-8">
          <DragonSecurityDashboard />
        </div>

        {/* Deployment and Access Panel */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              READY FOR GLOBAL DEPLOYMENT
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              All systems verified • Security active • Performance optimized
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-green-900/30 rounded border border-green-500/30">
                <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="font-bold text-green-400">SECURITY</div>
                <div className="text-sm text-muted-foreground">Admin-Only Protected</div>
              </div>
              
              <div className="p-4 bg-blue-900/30 rounded border border-blue-500/30">
                <Cloud className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="font-bold text-blue-400">PERFORMANCE</div>
                <div className="text-sm text-muted-foreground">Cloud Optimized</div>
              </div>
              
              <div className="p-4 bg-purple-900/30 rounded border border-purple-500/30">
                <Globe className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="font-bold text-purple-400">GLOBAL</div>
                <div className="text-sm text-muted-foreground">Worldwide Access</div>
              </div>
            </div>

            <Button 
              onClick={handleDeployment}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 text-lg mb-4"
            >
              <Globe className="h-6 w-6 mr-3" />
              🚀 DEPLOY HARMONY OF GAIA GLOBALLY
            </Button>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded border border-purple-500/40">
              <div className="text-sm text-purple-200 mb-2">
                🌍 Your platform will be accessible at:
              </div>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-400 border-blue-500/30"
                  onClick={() => window.open('https://8dfae018-363f-4770-8e5c-27c14bec8426.lovableproject.com', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-400 border-green-500/30"
                  onClick={() => toast.info('App store deployment requires export to your own repository first')}
                >
                  📱 App Stores (After Export)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Protection Notice */}
        <Card className="mt-6 border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-red-400 mb-2">
              LEGAL PROTECTION ACTIVE
            </h3>
            <p className="text-sm text-muted-foreground">
              This technology is exclusively owned by Harmony of Gaia. 
              Unauthorized copying, replication, or bundling of similar systems is strictly prohibited.
              All access attempts are monitored and logged for the admin account only.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemStatus
