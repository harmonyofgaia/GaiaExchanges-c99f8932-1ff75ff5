
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { toast } from 'sonner'

interface AdminOnlyLoginProps {
  onAdminLogin: () => void
}

export function AdminOnlyLogin({ onAdminLogin }: AdminOnlyLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Admin credentials verification
      const isValidAdmin = credentials.username === 'Synatic' && 
                          credentials.password === 'harmonyquantumvaultaccess'
      
      if (isValidAdmin) {
        onAdminLogin()
        toast.success('👑 GOD MODE ADMIN ACCESS GRANTED!', {
          description: 'Welcome to the Ultimate Control Center',
          duration: 5000
        })
      } else {
        toast.error('🚫 ADMIN ACCESS DENIED', {
          description: 'Invalid admin credentials - Quantum protection active',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Admin protection system activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-green-500/30 bg-gradient-to-br from-green-900/30 to-black/70 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-2xl">
              <Shield className="h-6 w-6" />
              ADMIN ONLY ACCESS
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              GOD MODE • QUANTUM VAULT • ULTIMATE CONTROL
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-300">Admin Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-black/30 border-green-500/30 text-green-400"
                placeholder="Admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">Quantum Vault Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/30 border-green-500/30 text-green-400 pr-10"
                  placeholder="Quantum vault password..."
                  autoComplete="off"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 text-green-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
            >
              <Lock className="h-5 w-5 mr-2" />
              {isLoading ? 'Verifying GOD MODE...' : 'ENTER ADMIN VAULT'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              👑 ADMIN ONLY • QUANTUM PROTECTED • BANK-LEVEL SECURITY
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Ultimate Control • Global Management • Parabolic Universe Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
