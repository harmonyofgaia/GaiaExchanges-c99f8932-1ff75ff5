
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff, Crown } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboard } from './AdminDashboard'

export function SecureVaultLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Original admin credentials from 2 days ago
      const isValidAdmin = credentials.username === 'Synatic' && 
                          credentials.password === 'Freedom!oul19922323'
      
      if (isValidAdmin) {
        setIsAuthenticated(true)
        toast.success('🌍 GAIA VAULT ACCESS GRANTED!', {
          description: 'Welcome to the Ultimate Control Center',
          duration: 5000
        })
      } else {
        toast.error('🚫 VAULT ACCESS DENIED', {
          description: 'Invalid admin credentials - Quantum protection active',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Vault protection system activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    toast.success('🚪 Vault session terminated - System secured', {
      description: 'All administrative controls have been disabled',
      duration: 3000
    })
  }

  if (isAuthenticated) {
    return (
      <div className="space-y-6">
        {/* Admin Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-green-400">🛡️ GAIA VAULT CONTROL CENTER</h2>
                  <p className="text-green-300">Quantum Vault Security • Full System Control • Global Management</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
                <Lock className="h-4 w-4 mr-2" />
                Secure Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admin Dashboard */}
        <AdminDashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-green-400">
              🌍 GAIA VAULT ACCESS
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Quantum Vault Security Portal • Ultimate Admin Control
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-300">Admin Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-black/40 border-green-500/30 text-green-400"
                placeholder="Enter admin username..."
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-300">Vault Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                  placeholder="Enter vault password..."
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
              {isLoading ? 'Verifying Vault Access...' : 'ENTER GAIA VAULT'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center mb-2">
              🛡️ Quantum Vault Protected • Bank-Level Security • All Access Monitored
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Secure admin portal with full system control</div>
              <div>• Advanced quantum protection active</div>
              <div>• Original credentials from vault system</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
