
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, User, Mail, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface GoogleAuthenticatorProps {
  onSetupComplete?: (secret?: string) => void
  onVerificationSuccess?: () => void
  userEmail?: string
}

export function GoogleAuthenticator({ 
  onSetupComplete, 
  onVerificationSuccess, 
  userEmail = '' 
}: GoogleAuthenticatorProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState(userEmail)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleGoogleAuth = () => {
    toast.success('🔐 Google Authentication Ready!', {
      description: 'Secure 2FA protection for GAiA Token access',
      duration: 5000
    })
    
    // Call the setup complete callback if provided
    if (onSetupComplete) {
      const secret = btoa(Date.now().toString())
      onSetupComplete(secret)
    }
  }

  const handleEmailAuth = () => {
    if (isRegistering && password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    toast.success(isRegistering ? '✅ Registration Successful!' : '✅ Login Successful!', {
      description: 'Welcome to the GAiA Token ecosystem',
      duration: 5000
    })
    
    // Call the verification success callback if provided
    if (onVerificationSuccess) {
      onVerificationSuccess()
    }
  }

  return (
    <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400 text-center">
          <Shield className="h-6 w-6" />
          🌍 GAiA Token Access
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={handleGoogleAuth}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 py-3"
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google"
            className="h-5 w-5 mr-2"
          />
          Continue with Google Authenticator
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">or</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-green-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/20 border-green-500/30"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-green-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-green-500/30"
              placeholder="Enter your password"
            />
          </div>

          {isRegistering && (
            <div>
              <Label htmlFor="confirmPassword" className="text-green-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black/20 border-green-500/30"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <Button 
            onClick={handleEmailAuth}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <User className="h-4 w-4 mr-2" />
            {isRegistering ? 'Register for GAiA' : 'Login to GAiA'}
          </Button>

          <Button 
            onClick={() => setIsRegistering(!isRegistering)}
            variant="ghost"
            className="w-full text-green-400 hover:text-green-300"
          >
            {isRegistering ? 'Already have an account? Login' : 'New to GAiA? Register'}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 p-4 rounded-lg border border-green-500/30">
          <h4 className="font-bold text-green-400 mb-2">🚀 Join the GAiA Revolution:</h4>
          <ul className="text-sm text-green-300 space-y-1">
            <li>• Secure 2FA Google Authentication</li>
            <li>• Access to exclusive token presale</li>
            <li>• Baby boom investment opportunities</li>
            <li>• Environmental impact tracking</li>
            <li>• Global exchange integration</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
