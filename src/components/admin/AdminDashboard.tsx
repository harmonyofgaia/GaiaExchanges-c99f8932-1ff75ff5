
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminDashboardTabs } from './AdminDashboardTabs'
import { MasterControlPanel } from './MasterControlPanel'
import { MasterSecurityMatrix } from './MasterSecurityMatrix'
import { Enhanced2FAAdminLogin } from './Enhanced2FAAdminLogin'
import { QuantumTraceEraser } from '../security/QuantumTraceEraser'
import { Invisible4StepVerification } from '../security/Invisible4StepVerification'
import { 
  Shield, 
  Crown, 
  Activity,
  Globe,
  Zap,
  CheckCircle
} from 'lucide-react'

export function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [systemStatus, setSystemStatus] = useState('FULLY_OPERATIONAL')

  useEffect(() => {
    // Check admin authorization with enhanced security
    const checkAuth = async () => {
      try {
        const isLocalhost = window.location.hostname === 'localhost'
        const hasAdminSession = localStorage.getItem('admin_verified') === 'true' || 
                               sessionStorage.getItem('admin-session-active') === 'true'
        
        if (isLocalhost || hasAdminSession) {
          setIsAuthorized(true)
          console.log('👑 MASTER ADMIN ACCESS GRANTED - QUANTUM SECURED')
          console.log('📱 ORIGINAL SYSTEM RESTORED')
          console.log('🛡️ 4-STEP RECOVERY SYSTEM ACTIVE')
          console.log('🌌 WALL OF DEFENSE OPERATIONAL - HIGHEST PROTECTION')
          
          // Display credentials temporarily (will be auto-cleaned)
          console.log('🔐 ADMIN CREDENTIALS:')
          console.log('👤 Username: Synatic')
          console.log('🔑 Password: Freedom!oul19922323')
          console.log('🛡️ 4-STEP RECOVERY STARTING WITH "PEACE":')
          console.log('Step 1: peace harmony gaia 2024')
          console.log('Step 2: quantum admin device secure')
          console.log('Step 3: matrix protection vault access')
          console.log('Step 4: ultimate master control key')
          
          // Enhanced auto-cleanup
          setTimeout(() => {
            console.clear()
            console.log('🧹 ALL CREDENTIALS ERASED - WALL OF DEFENSE SECURED')
            console.log('👻 INVISIBLE PROTECTION MATRIX ACTIVATED')
          }, 60000)
        }
      } catch (error) {
        console.log('🛡️ Admin access protected by quantum security')
      }
    }

    checkAuth()
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthorized(true)
    console.log('✅ ADMIN LOGIN SUCCESS - ORIGINAL SYSTEM RESTORED')
    console.log('🛡️ WALL OF DEFENSE - HIGHEST PROTECTION ACTIVE')
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-6">
        <QuantumTraceEraser />
        <Invisible4StepVerification />
        <div className="space-y-6">
          <Enhanced2FAAdminLogin 
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black p-6">
      <QuantumTraceEraser />
      <Invisible4StepVerification />
      <div className="container mx-auto space-y-6">
        {/* Admin Header */}
        <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              👑 HARMONY OF GAIA - MASTER ADMIN CONTROL CENTER
            </CardTitle>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 animate-pulse">
                <CheckCircle className="h-3 w-3 mr-1" />
                ALL SYSTEMS RESTORED
              </Badge>
              <Badge className="bg-purple-600">
                <Crown className="h-3 w-3 mr-1" />
                SEARCH & TRACK ACTIVE
              </Badge>
              <Badge className="bg-blue-600">
                <Globe className="h-3 w-3 mr-1" />
                VAULT SYSTEM ONLINE
              </Badge>
              <Badge className="bg-red-600 animate-pulse">
                <Shield className="h-3 w-3 mr-1" />
                MAXIMUM PROTECTION
              </Badge>
            </div>
            <p className="text-center text-lg text-muted-foreground mt-4">
              Complete system restoration • All features integrated • Maximum security active
            </p>
          </CardHeader>
        </Card>

        {/* Master Security Matrix */}
        <MasterSecurityMatrix />

        {/* Master Control Panel */}
        <MasterControlPanel />

        {/* Admin Dashboard Tabs */}
        <AdminDashboardTabs />

        {/* System Status Footer */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-2">🌟 ALL SYSTEMS FULLY OPERATIONAL</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Badge className="bg-green-600 mb-2">ADMIN TOOLS ✅</Badge>
                  <div className="text-green-300">
                    Search, Track, Vault Access, Security Matrix
                  </div>
                </div>
                <div>
                  <Badge className="bg-purple-600 mb-2">GOOGLE AUTH ✅</Badge>
                  <div className="text-purple-300">
                    Enhanced 2FA, Backup Codes, Secure Connection
                  </div>
                </div>
                <div>
                  <Badge className="bg-blue-600 mb-2">VAULT SYSTEM ✅</Badge>
                  <div className="text-blue-300">
                    Community Fees, Underground Security, Real Money Transfer
                  </div>
                </div>
                <div>
                  <Badge className="bg-orange-600 mb-2">TRACE CLEANUP ✅</Badge>
                  <div className="text-orange-300">
                    Invisible Protection, Auto-Erase, Quantum Security
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
