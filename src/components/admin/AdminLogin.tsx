
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

interface AdminLoginProps {
  onLoginSuccess: (username: string, password: string, adminKey: string) => boolean
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
      const success = onLoginSuccess(credentials.username, credentials.password, credentials.adminKey)
      
      if (!success) {
        toast.error('❌ Access Denied', {
          description: 'Invalid credentials. Security protocol active.',
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
      // Clear sensitive data immediately after attempt
      setCredentials({
        username: '',
        password: '',
        adminKey: ''
      })
    }
  }

  return (
    <Card className="max-w-md mx-auto border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400 text-center">
          <Shield className="h-5 w-5" />
          GAIA Admin Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-green-300">Admin Username</Label>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="bg-black/30 border-green-500/30"
              autoComplete="off"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-300">Admin Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="bg-black/30 border-green-500/30 pr-10"
                autoComplete="off"
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
            <Label htmlFor="adminKey" className="text-green-300">Security Key</Label>
            <Input
              id="adminKey"
              type="password"
              value={credentials.adminKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, adminKey: e.target.value }))}
              className="bg-black/30 border-green-500/30"
              autoComplete="off"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Lock className="h-4 w-4 mr-2" />
            {isLoading ? 'Verifying...' : 'Access GAIA Admin Vault'}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
          <p className="text-xs text-green-300 text-center">
            🛡️ Ultra-Secure Access • Advanced Protection Active • All Attempts Monitored
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
