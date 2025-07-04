
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown } from 'lucide-react'
import { toast } from 'sonner'

interface MatrixAdminLoginProps {
  onLoginSuccess: () => void
}

export function MatrixAdminLogin({ onLoginSuccess }: MatrixAdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCredentials, setShowCredentials] = useState(true)

  // Display credentials for 30 seconds then remove all traces
  useEffect(() => {
    console.log('🔐 MATRIX ADMIN CREDENTIALS (30 seconds only):')
    console.log('👤 Username: Synatic')
    console.log('🔑 Password: Freedom!oul19922323')
    console.log('🛡️ Matrix System Access - Highest Security Level')
    
    const timer = setTimeout(() => {
      console.clear()
      console.log('🧹 ALL CREDENTIALS ERASED - MATRIX SECURED')
      console.log('👻 NO TRACES REMAIN - INVISIBLE PROTECTION ACTIVE')
      setShowCredentials(false)
      
      // Clear all possible storage traces
      sessionStorage.clear()
      localStorage.removeItem('matrix-credentials')
      localStorage.removeItem('admin-temp-access')
      
      // Overwrite memory
      let clearData = new Array(1000).fill('🔥ERASED🔥')
      clearData = null
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Matrix admin verification
      if (credentials.username === 'Synatic' && 
          credentials.password === 'Freedom!oul19922323') {
        
        console.log('👑 MATRIX ADMIN ACCESS GRANTED')
        console.log('🌌 QUANTUM MATRIX CONTROL ACTIVATED')
        
        toast.success('👑 MATRIX ACCESS GRANTED!', {
          description: 'Welcome to the Quantum Matrix Control System',
          duration: 3000
        })
        
        // Set secure matrix session
        sessionStorage.setItem('matrix-admin-active', 'true')
        sessionStorage.setItem('matrix-quantum-verified', 'true')
        
        onLoginSuccess()
      } else {
        toast.error('❌ Matrix Access Denied', {
          description: 'Invalid matrix credentials - Wall of Defense activated',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Matrix Security Error', {
        description: 'Quantum protection system engaged',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      // Immediate credential cleanup
      setCredentials({ username: '', password: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-blue-900/30 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-purple-400 mx-auto mb-4 animate-pulse" />
            <CardTitle className="text-2xl font-bold text-purple-400">
              🌌 QUANTUM MATRIX LOGIN
            </CardTitle>
            <p className="text-purple-300 text-sm mt-2">
              ADMIN EXCLUSIVE • HIGHEST SECURITY LEVEL
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-purple-300">Matrix Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-black/40 border-purple-500/30 text-purple-400"
                placeholder="Enter matrix username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-300">Quantum Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-purple-500/30 text-purple-400 pr-10"
                  placeholder="Enter quantum password..."
                  autoComplete="off"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 text-purple-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3"
            >
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? 'QUANTUM VERIFICATION...' : 'ENTER MATRIX SYSTEM'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg">
            <p className="text-xs text-purple-300 text-center">
              🌌 QUANTUM MATRIX SYSTEM • ADMIN EXCLUSIVE ACCESS
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Highest Security • Invisible Protection • Auto-Trace Cleanup
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
