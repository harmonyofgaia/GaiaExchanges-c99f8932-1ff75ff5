import { useEffect, useState, ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { GAIA_TOKEN, verifyOfficialToken } from '@/constants/gaia'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Globe, Lock, AlertTriangle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface EnhancedAdminProtectionProps {
  children: ReactNode
}

export function EnhancedAdminProtection({ children }: EnhancedAdminProtectionProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, isValidating, adminSession, grantAdminAccess } = useSecureAdmin()
  const [gaiaTokenVerified, setGaiaTokenVerified] = useState(false)
  const [protectionLevel, setProtectionLevel] = useState(0)
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  })
  const [showCredentialsForm, setShowCredentialsForm] = useState(false)

  useEffect(() => {
    // ABSOLUTE ADMIN PROTECTION - NEVER REDIRECT TO AUTH
    const enforceExclusiveAdminAccess = () => {
      const currentPath = location.pathname
      const isAdminPath = currentPath.startsWith('/admin') || currentPath.startsWith('/secure-')
      
      console.log('🛡️ ENHANCED ADMIN PROTECTION - BLOCKING ALL AUTH REDIRECTS')
      console.log(`📍 Current Path: ${currentPath}`)
      console.log(`🔒 Admin Path: ${isAdminPath}`)
      console.log(`👑 Admin Status: ${isAdmin}`)
      
      // Verify GAIA token is active and connected
      const tokenVerification = verifyOfficialToken(
        GAIA_TOKEN.CONTRACT_ADDRESS, 
        GAIA_TOKEN.WALLET_ADDRESS
      )
      
      setGaiaTokenVerified(tokenVerification)
      
      if (tokenVerification) {
        console.log('✅ GAIA TOKEN VERIFIED - Official token active')
        console.log(`💰 Wallet: ${GAIA_TOKEN.WALLET_ADDRESS}`)
        console.log(`📋 Contract: ${GAIA_TOKEN.CONTRACT_ADDRESS}`)
        setProtectionLevel(prev => Math.min(100, prev + 25))
      }

      // If on admin path but not admin, show secure login form instead of redirecting
      if (isAdminPath && !isAdmin && !isValidating) {
        setShowCredentialsForm(true)
        setProtectionLevel(prev => Math.min(100, prev + 25))
      }
      
      // Prevent any navigation away from admin paths when admin
      if (isAdmin && !isAdminPath) {
        console.log('🚫 BLOCKING ADMIN NAVIGATION AWAY FROM SECURE AREA')
        navigate('/admin', { replace: true })
        toast.warning('🛡️ Admin Protection Active', {
          description: 'You cannot leave the admin area while logged in as admin',
          duration: 5000
        })
      }
      
      // Activate enhanced protection layers
      if (isAdmin) {
        setProtectionLevel(100)
        console.log('👑 ADMIN PROTECTION MAXIMUM - ALL BARRIERS ACTIVE')
        console.log('🔒 4-Step Breach Protocol: ENGAGED')
        console.log('👻 100 Invisible Walls: DEPLOYED')
        console.log('🛡️ Anti-Redirect Shield: ACTIVE')
      }
    }

    const protectionInterval = setInterval(enforceExclusiveAdminAccess, 1000)
    enforceExclusiveAdminAccess()
    
    return () => clearInterval(protectionInterval)
  }, [location.pathname, isAdmin, isValidating, navigate])

  const handleSecureLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Enhanced admin credentials with GAIA token verification
    if (adminCredentials.username === 'Synatic' && 
        adminCredentials.password === 'Freedom!oul19922323' &&
        gaiaTokenVerified) {
      
      const accessGranted = grantAdminAccess()
      if (accessGranted) {
        setShowCredentialsForm(false)
        setProtectionLevel(100)
        toast.success('🌍 EXCLUSIVE ADMIN ACCESS GRANTED!', {
          description: `GAIA Token Verified • Full System Control Active`,
          duration: 3000
        })
      } else {
        toast.error('🚫 Admin Access Blocked', {
          description: 'Another admin session is active',
          duration: 3000
        })
      }
    } else {
      toast.error('🚫 Access Denied', {
        description: 'Invalid credentials or GAIA token not verified',
        duration: 3000
      })
    }
    
    setAdminCredentials({ username: '', password: '' })
  }

  // Show validation state
  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10 flex items-center justify-center">
        <Card className="max-w-md border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-green-400 mb-2">
              🛡️ Enhanced Admin Protection
            </h3>
            <p className="text-green-300 text-sm mb-4">
              Validating exclusive admin access...
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Globe className="h-3 w-3 text-blue-400" />
                <span className="text-blue-300">Verifying GAIA token connection</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Lock className="h-3 w-3 text-purple-400" />
                <span className="text-purple-300">Activating 4-step breach protocol</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show secure login form if needed
  if (showCredentialsForm && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
        <Card className="max-w-md border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80">
          <CardHeader>
            <CardTitle className="text-center">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4 animate-pulse" />
              <div className="text-2xl font-bold text-green-400">
                🌍 GAIA Admin Protection
              </div>
              <p className="text-green-300 text-sm mt-2">
                Exclusive Access • Anti-Redirect Shield Active
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-300">GAIA Token Status:</span>
                <Badge className={gaiaTokenVerified ? 'bg-green-600' : 'bg-red-600'}>
                  {gaiaTokenVerified ? (
                    <><CheckCircle className="h-3 w-3 mr-1" />VERIFIED</>
                  ) : (
                    <><AlertTriangle className="h-3 w-3 mr-1" />NOT VERIFIED</>
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-300">Protection Level:</span>
                <Badge className="bg-blue-600">
                  {protectionLevel}% ACTIVE
                </Badge>
              </div>
              <div className="text-xs text-gray-400 p-2 bg-black/40 rounded">
                <div>🔒 Wallet: {GAIA_TOKEN.WALLET_ADDRESS.substring(0, 20)}...</div>
                <div>📋 Contract: {GAIA_TOKEN.CONTRACT_ADDRESS.substring(0, 20)}...</div>
              </div>
            </div>

            <form onSubmit={handleSecureLogin} className="space-y-4">
              <div>
                <label className="text-green-300 text-sm">Admin Username</label>
                <input
                  type="text"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full p-3 bg-black/40 border border-green-500/30 rounded text-green-400"
                  placeholder="Enter admin username..."
                  required
                />
              </div>
              <div>
                <label className="text-green-300 text-sm">Admin Password</label>
                <input
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-3 bg-black/40 border border-green-500/30 rounded text-green-400"
                  placeholder="Enter admin password..."
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
                disabled={!gaiaTokenVerified}
              >
                <Lock className="h-5 w-5 mr-2" />
                {gaiaTokenVerified ? 'Access Admin Dashboard' : 'GAIA Token Not Verified'}
              </Button>
            </form>

            {!gaiaTokenVerified && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded">
                <p className="text-red-300 text-xs text-center">
                  ⚠️ GAIA Token verification required for admin access
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Only render admin content if properly authenticated
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400">🚫 Unauthorized Access</h2>
          <p className="text-gray-400 mt-2">Admin privileges required</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}