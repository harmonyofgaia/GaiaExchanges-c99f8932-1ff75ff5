
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/components/auth/AuthProvider'
import { Wallet, Shield, Globe, Users, Leaf, Zap } from 'lucide-react'
import { SystemMonitor } from '@/components/SystemMonitor'

const Index = () => {
  const { user, signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      })
      return
    }

    if (!isLogin && !fullName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your full name for registration.",
      })
      return
    }

    if (isLogin) {
      const { error } = await signIn(email, password)
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        })
      } else {
        toast({
          title: "Welcome back!",
          description: `Successfully logged in to Harmony of Gaia`,
        })
      }
    } else {
      // Enhanced sign up with metadata
      const { error } = await signUp(email, password, {
        data: {
          full_name: fullName,
          username: email.split('@')[0] // Generate username from email
        }
      })
      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        })
      } else {
        toast({
          title: "Registration successful!",
          description: "Welcome to Harmony of Gaia! Please check your email to verify your account.",
        })
      }
    }
  }

  return (
    <>
      <SystemMonitor />
      <div className="min-h-screen relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/10" />
          <div className="absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-5" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-green-500/3 to-blue-500/5" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-green-400/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-blue-400/8 via-transparent to-transparent rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-radial from-purple-400/6 via-transparent to-transparent rounded-full blur-xl animate-pulse" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            {/* Enhanced Header Section */}
            <div className="text-center mb-12">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <Leaf className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Quantum-Secured Platform</span>
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                Harmony of Gaia Exchanges
              </h1>
              <p className="text-2xl text-muted-foreground mb-4">
                The World's Most Secure Eco-Trading Platform
              </p>
              <p className="text-lg text-green-400 mb-2">
                🌱 Powered by Culture of Harmony • Quantum Protected • 100% Transparent
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
                <div className="flex items-center gap-1 text-green-400">
                  <Zap className="h-4 w-4" />
                  <span>Quantum Security</span>
                </div>
                <div className="flex items-center gap-1 text-blue-400">
                  <Shield className="h-4 w-4" />
                  <span>AI Protection</span>
                </div>
                <div className="flex items-center gap-1 text-purple-400">
                  <Globe className="h-4 w-4" />
                  <span>Global Network</span>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Link to="/wallet" className="group">
                <Card className="h-full bg-gradient-to-br from-green-900/50 to-emerald-900/30 border-green-500/30 hover:border-green-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-green-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Wallet className="h-12 w-12 text-green-400 mx-auto" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Gaia Wallet</h3>
                    <p className="text-sm text-muted-foreground mb-3">Quantum-secured wallet with ultimate protection</p>
                    <div className="text-xs text-green-400">🛡️ Maximum Security Active</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/community" className="group">
                <Card className="h-full bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Users className="h-12 w-12 text-blue-400 mx-auto" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Green Projects</h3>
                    <p className="text-sm text-muted-foreground mb-3">Join sustainable community initiatives</p>
                    <div className="text-xs text-blue-400">🌱 Contract Signing Available</div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/security" className="group">
                <Card className="h-full bg-gradient-to-br from-purple-900/50 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Shield className="h-12 w-12 text-purple-400 mx-auto" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">Ultimate Security</h3>
                    <p className="text-sm text-muted-foreground mb-3">Quantum-level protection system</p>
                    <div className="text-xs text-purple-400">⚡ Future-Proof Active</div>
                  </CardContent>
                </Card>
              </Link>

              <a href="https://sites.google.com/view/culture-of-harmony" target="_blank" rel="noopener noreferrer" className="group">
                <Card className="h-full bg-gradient-to-br from-orange-900/50 to-red-900/30 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Globe className="h-12 w-12 text-orange-400 mx-auto" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">Culture of Harmony</h3>
                    <p className="text-sm text-muted-foreground mb-3">Visit our main website</p>
                    <div className="text-xs text-orange-400">🌍 Official Organization</div>
                  </CardContent>
                </Card>
              </a>
            </div>

            {/* Enhanced Auth Section */}
            {!user ? (
              <div className="max-w-md mx-auto">
                <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/10">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-semibold text-blue-400 mb-2">
                        {isLogin ? 'Welcome Back' : 'Join Our Community'}
                      </h2>
                      <p className="text-muted-foreground">
                        {isLogin ? 'Sign in to access your secure wallet' : 'Create your account to get started'}
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {!isLogin && (
                        <div>
                          <Label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground">
                            Full Name
                          </Label>
                          <Input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-1"
                            required={!isLogin}
                          />
                        </div>
                      )}
                      
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                          Password
                        </Label>
                        <Input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Shield className="h-4 w-4 mr-2" />
                        {isLogin ? 'Sign In Securely' : 'Create Secure Account'}
                      </Button>
                    </form>
                    
                    <div className="text-center mt-6">
                      <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-blue-400 hover:text-blue-300">
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                      </Button>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-xs text-green-400 text-center">
                        🛡️ Your data is protected by quantum-level encryption
                        <br />
                        🌍 Managed by Culture of Harmony - Trusted Worldwide
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/10">
                  <CardContent className="p-8 text-center">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-green-400" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-green-400 mb-4">
                      Welcome to Harmony of Gaia!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Hello, <span className="text-green-400 font-medium">{user.email}</span>
                      <br />
                      Your account is secured and ready to use.
                    </p>
                    <div className="space-y-3">
                      <Link to="/wallet">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Wallet className="h-4 w-4 mr-2" />
                          Access Your Secure Wallet
                        </Button>
                      </Link>
                      <Link to="/community">
                        <Button variant="outline" className="w-full border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                          <Users className="h-4 w-4 mr-2" />
                          Explore Green Projects
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Features Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-8">Why Choose Harmony of Gaia?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-green-500/5 border border-green-500/20">
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-400 mb-2">Quantum Security</h4>
                  <p className="text-sm text-muted-foreground">Military-grade protection that evolves with emerging threats</p>
                </div>
                <div className="p-6 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <Leaf className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-blue-400 mb-2">Environmental Impact</h4>
                  <p className="text-sm text-muted-foreground">Every transaction contributes to global sustainability projects</p>
                </div>
                <div className="p-6 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <Globe className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-purple-400 mb-2">Full Transparency</h4>
                  <p className="text-sm text-muted-foreground">Open-source approach with complete community oversight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
