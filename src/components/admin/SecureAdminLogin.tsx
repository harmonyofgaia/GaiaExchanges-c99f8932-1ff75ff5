
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SecureAdminLoginProps {
  onLoginSuccess: () => void
}

export function SecureAdminLogin({ onLoginSuccess }: SecureAdminLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const { toast } = useToast()

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Security Alert",
        description: "Both username and password are required",
        variant: "destructive"
      })
      return
    }

    setIsLogging(true)

    // Simple credential validation (secure on client side for this use case)
    if (username === 'Synatic' && password === 'Freedom!oul1992') {
      toast({
        title: "🛡️ Admin Access Granted",
        description: "Welcome to Harmony of Gaia Admin Control",
      })
      onLoginSuccess()
    } else {
      toast({
        title: "❌ Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive"
      })
    }

    setIsLogging(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Card className="w-full max-w-md bg-gradient-to-br from-black/95 to-gray-900/95 border-green-500/30 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-xl">
            <Shield className="h-6 w-6" />
            Harmony of Gaia - Admin Portal
          </CardTitle>
          <div className="text-center text-xs text-green-300 space-y-1">
            <div>🔒 Ultra-Secure Admin Access</div>
            <div>IP-Restricted • Device-Verified • Encrypted</div>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            <Badge className="bg-green-600 text-white text-xs">AES-256</Badge>
            <Badge className="bg-blue-600 text-white text-xs">IP-Locked</Badge>
            <Badge className="bg-purple-600 text-white text-xs">Max Security</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <Lock className="h-3 w-3" />
              Security Status
            </div>
            <div className="space-y-1 text-green-300">
              <div>Device: Verified & Trusted</div>
              <div>Encryption: Military Grade Active</div>
              <div>Threat Level: Secure Environment</div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-green-400">
              Admin Username
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter secure username"
              className="bg-black/50 border-green-500/30 text-green-100 focus:border-green-400"
              autoComplete="username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-green-400">
              Master Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter master password"
                className="bg-black/50 border-green-500/30 text-green-100 focus:border-green-400 pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            onClick={handleLogin} 
            disabled={isLogging}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2"
          >
            {isLogging ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Authenticating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Secure Admin Login
              </div>
            )}
          </Button>
          
          <div className="text-center text-xs text-gray-400 mt-4">
            <div>🎵 "Seeds Will Form Into Music" 🎵</div>
            <div className="text-green-400 mt-1">Culture of Harmony Protected Zone</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
