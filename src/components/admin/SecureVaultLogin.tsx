
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, Fingerprint, Crown, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export function SecureVaultLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [securityLevel, setSecurityLevel] = useState(0)
  const [vaultAnimations, setVaultAnimations] = useState(true)

  useEffect(() => {
    // Simulate progressive security levels
    const levelInterval = setInterval(() => {
      setSecurityLevel(prev => Math.min(100, prev + 2))
    }, 100)

    return () => clearInterval(levelInterval)
  }, [])

  const handleVaultAccess = () => {
    toast.success('🔒 QUANTUM VAULT ACCESS GRANTED', {
      description: 'Welcome to the most secure digital fortress ever created',
      duration: 5000
    })
    setIsAuthenticated(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Underground Vault Background */}
      <div className="absolute inset-0">
        {/* Transparent Background Video Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-black/80">
          {/* Simulate underground depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-800/30 to-black/60" />
          
          {/* Animated Vault Door Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-96 h-96 rounded-full border-8 border-steel-400/50 ${vaultAnimations ? 'animate-pulse' : ''} shadow-2xl`}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative">
                {/* Vault Lock Mechanism */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 border-4 border-yellow-500 shadow-xl">
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <Lock className="h-16 w-16 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                </div>
                
                {/* Vault Bolts */}
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-500"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-120px)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="border-4 border-yellow-500/50 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 backdrop-blur-md max-w-2xl w-full shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <UniversalGaiaLogo 
                size="xl" 
                animated={true}
                showText={true}
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <CardTitle className="text-center text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              🔒 QUANTUM SECURE VAULT
            </CardTitle>
            <div className="text-center text-xl text-muted-foreground">
              DEEPEST UNDERGROUND DIGITAL FORTRESS
            </div>
            <div className="text-center text-lg text-yellow-400">
              🏛️ ADMIN-ONLY ULTRA SECURE ACCESS
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Security Level Display */}
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-green-400">
                Security Level: {securityLevel}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-400 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${securityLevel}%` }}
                />
              </div>
            </div>

            {/* Access Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-lg border border-red-500/30">
                <Shield className="h-8 w-8 text-red-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-bold text-red-400">∞</div>
                <div className="text-sm text-muted-foreground">Defense Layers</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-lg border border-blue-500/30">
                <Fingerprint className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-spin" />
                <div className="text-2xl font-bold text-blue-400">QUANTUM</div>
                <div className="text-sm text-muted-foreground">Encryption</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/30">
                <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-bounce" />
                <div className="text-2xl font-bold text-purple-400">ADMIN</div>
                <div className="text-sm text-muted-foreground">Access Only</div>
              </div>
            </div>

            {/* Vault Access Button */}
            <div className="text-center">
              <Button 
                onClick={handleVaultAccess}
                className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 text-white font-black text-xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <Zap className="h-8 w-8 mr-4 animate-bounce" />
                ENTER QUANTUM VAULT
              </Button>
            </div>

            {isAuthenticated && (
              <div className="text-center space-y-4 animate-fade-in">
                <Badge className="bg-green-600 text-white text-lg px-6 py-2 animate-pulse">
                  🔓 VAULT ACCESS GRANTED
                </Badge>
                <div className="text-green-400 font-bold">
                  Welcome to the most secure digital space ever created
                </div>
              </div>
            )}

            {/* Vault Features */}
            <div className="bg-black/50 rounded-lg p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
                🏛️ VAULT SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-yellow-300">🔐 Quantum Encryption</div>
                  <div className="text-blue-300">🛡️ Dragon Protection</div>
                  <div className="text-green-300">⚡ Lightning Security</div>
                </div>
                <div>
                  <div className="text-purple-300">🌌 Cosmic Firewall</div>
                  <div className="text-orange-300">🔥 Phoenix Backup</div>
                  <div className="text-cyan-300">❄️ Ice Preservation</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
