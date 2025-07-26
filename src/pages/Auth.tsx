import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Lock, 
  Mail, 
  User, 
  Shield,
  LogIn,
  UserPlus,
  AlertTriangle,
  Home,
  Settings
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'
import { 
  getAuthAccessState, 
  setAdminDevMode, 
  debugAuthAccess,
  type AuthAccessState 
} from '@/utils/authAccessControl'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authAccessState, setAuthAccessState] = useState<AuthAccessState | null>(null)
  const [adminDevMode, setAdminDevModeLocal] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  // Check auth access state on component mount
  useEffect(() => {
    const state = getAuthAccessState()
    setAuthAccessState(state)
    setAdminDevModeLocal(state.isAdminDevMode)
  }, [])

  // Handle admin dev mode toggle
  const handleAdminDevModeToggle = (enabled: boolean) => {
    setAdminDevMode(enabled)
    setAdminDevModeLocal(enabled)
    setAuthAccessState(getAuthAccessState())
    toast.success(enabled ? 'Admin dev mode enabled' : 'Admin dev mode disabled')
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { error } = await signIn(email, password)
      if (!error) {
        navigate('/')
      }
    } catch (error) {
      console.error('Sign in failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { error } = await signUp(email, password)
      if (!error) {
        toast.success('Please check your email for confirmation link!')
      }
    } catch (error) {
      console.error('Sign up failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // If access is not allowed, show appropriate message
  if (authAccessState && !authAccessState.canAccessUserAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto border-orange-500/30 bg-orange-900/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-orange-400 text-2xl">
                <AlertTriangle className="h-6 w-6" />
                🔒 Access Restricted
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!authAccessState.hasVisitedHomepage && (
                <div className="text-center space-y-3">
                  <p className="text-gray-300">
                    Please visit the homepage first to access user authentication.
                  </p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go to Homepage
                  </Button>
                </div>
              )}
              
              {authAccessState.isAdminDevMode && (
                <div className="text-center space-y-3">
                  <p className="text-gray-300">
                    User authentication is disabled in admin development mode.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <Label htmlFor="admin-dev-toggle" className="text-sm text-gray-400">
                      Admin Dev Mode
                    </Label>
                    <Switch
                      id="admin-dev-toggle"
                      checked={adminDevMode}
                      onCheckedChange={handleAdminDevModeToggle}
                    />
                  </div>
                </div>
              )}
              
              {!authAccessState.isProductionDomain && !authAccessState.isAdminDevMode && (
                <div className="text-center space-y-3">
                  <p className="text-gray-300 text-sm">
                    User authentication is only available on the production domain (www.gaiaexchanges.com).
                  </p>
                  <p className="text-gray-400 text-xs">
                    Current domain: {typeof window !== 'undefined' ? window.location.hostname : 'unknown'}
                  </p>
                </div>
              )}

              {/* Debug button for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <Button
                    onClick={debugAuthAccess}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Debug Access Control
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  // Regular auth form when access is allowed
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto border-purple-500/30 bg-purple-900/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-purple-400 text-2xl">
              <Shield className="h-6 w-6" />
              🌍 Gaia Auth
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Access your environmental exchange platform
            </p>
          </CardHeader>
          <CardContent>
            {/* Admin Dev Mode Toggle for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dev-admin-toggle" className="text-sm text-gray-400">
                    Admin Dev Mode
                  </Label>
                  <Switch
                    id="dev-admin-toggle"
                    checked={adminDevMode}
                    onCheckedChange={handleAdminDevModeToggle}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Disable user auth for admin development
                </p>
              </div>
            )}

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Auth