
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Shield, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { RealGoogleAuthenticator } from './RealGoogleAuthenticator'

export function UserAuthenticationSystem() {
  const [authStep, setAuthStep] = useState<'login' | 'register' | '2fa' | 'verified'>('login')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user exists (simplified)
    const existingUsers = ['user@gaia.com', 'test@gaia.com']
    
    if (existingUsers.includes(email)) {
      setAuthStep('2fa')
      toast.info('🔐 2FA Required', {
        description: 'Please complete Google Authenticator verification',
        duration: 5000
      })
    } else {
      toast.info('👋 New User Detected', {
        description: 'Please register first',
        duration: 4000
      })
      setAuthStep('register')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (email.includes('@') && fullName.trim() && password.length >= 6) {
      setAuthStep('2fa')
      toast.success('✅ Registration Successful!', {
        description: 'Now setting up 2FA security',
        duration: 5000
      })
    } else {
      toast.error('❌ Registration Failed', {
        description: 'Please fill all fields correctly',
        duration: 4000
      })
    }
  }

  const handle2FASuccess = () => {
    setIsAuthenticated(true)
    setAuthStep('verified')
    toast.success('🎉 Welcome to GAIA Platform!', {
      description: 'You are now securely logged in with 2FA protection',
      duration: 5000
    })
  }

  if (isAuthenticated) {
    return (
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Shield className="h-6 w-6" />
            ✅ USER AUTHENTICATION SUCCESSFUL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
              <div>
                <div className="font-bold text-green-400">Welcome to GAIA Platform!</div>
                <div className="text-sm text-muted-foreground">
                  {email} • Secured with Google Authenticator
                </div>
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                USER
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-bold mb-2">🔐 Your Access Features:</h4>
              <div className="text-sm text-green-300">
                • Secure GAiA token trading
                • Environmental project participation
                • Community engagement tools
                • Protected by 2FA security
                • Real-time market access
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="w-full max-w-md space-y-6">
        {authStep === 'login' && (
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-center text-blue-400 flex items-center justify-center gap-2">
                <User className="h-6 w-6" />
                GAIA PLATFORM LOGIN
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Secure access with Google Authenticator 2FA
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label className="text-blue-400">Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1 bg-black/30 border-blue-500/30"
                    required
                  />
                </div>
                <div>
                  <Label className="text-blue-400">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1 bg-black/30 border-blue-500/30"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Login to GAIA Platform
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setAuthStep('register')}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    New user? Create account
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {authStep === 'register' && (
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-center text-green-400">
                CREATE GAIA ACCOUNT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label className="text-green-400">Full Name</Label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-1 bg-black/30 border-green-500/30"
                    required
                  />
                </div>
                <div>
                  <Label className="text-green-400">Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="mt-1 bg-black/30 border-green-500/30"
                    required
                  />
                </div>
                <div>
                  <Label className="text-green-400">Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    className="mt-1 bg-black/30 border-green-500/30"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <User className="h-4 w-4 mr-2" />
                  Create GAIA Account
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setAuthStep('login')}
                    className="text-sm text-green-400 hover:underline"
                  >
                    Already have an account? Login
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {authStep === '2fa' && (
          <RealGoogleAuthenticator
            email={email}
            onSuccess={handle2FASuccess}
          />
        )}
      </div>
    </div>
  )
}
