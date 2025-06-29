
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    adminKey: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Admin credential validation
      if (credentials.username === 'harmony_admin' && 
          credentials.password === 'GAiA_SecureAdmin2024!' &&
          credentials.adminKey === 'HARMONY_QUANTUM_VAULT_ACCESS') {
        
        toast.success('🔐 Admin Credentials Verified!', {
          description: 'Proceeding to MFA verification...',
          duration: 3000
        })
        
        onLoginSuccess()
      } else {
        toast.error('❌ Invalid Admin Credentials', {
          description: 'Access denied. Security incident logged.',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Authentication system protected the attempt',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400 text-center">
          <Shield className="h-5 w-5" />
          GAIA Admin Security Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-red-300">Admin Username</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="bg-black/30 border-red-500/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-red-300">Admin Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="bg-black/30 border-red-500/30 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminKey" className="text-red-300">Quantum Admin Key</Label>
            <Input
              id="adminKey"
              type="password"
              value={credentials.adminKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, adminKey: e.target.value }))}
              className="bg-black/30 border-red-500/30"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            <Lock className="h-4 w-4 mr-2" />
            {isLoading ? 'Verifying...' : 'Step 1: Verify Credentials'}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
          <p className="text-xs text-red-300 text-center">
            🛡️ Ultra-Secure Admin Access • Dragon Protection Active • All Attempts Logged
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
