import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/components/auth/AuthProvider'
import { Wallet, Shield, Globe, Users } from 'lucide-react'

const Index = () => {
  const { user, signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
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
          title: "Login successful",
          description: `Welcome back!`,
        })
      }
    } else {
      // Sign up logic
      const { error } = await signUp(email, password)
      if (error) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: error.message,
        })
      } else {
        toast({
          title: "Signup successful",
          description: "Please check your email to verify your account.",
        })
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-900/10" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png')] bg-cover bg-center opacity-5" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-green-500/3 to-blue-500/5" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-green-400/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-blue-400/8 via-transparent to-transparent rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Harmony of Gaia Exchanges
            </h1>
            <p className="text-xl text-muted-foreground mt-4">
              Eco-conscious trading with bank-level security and community support
            </p>
            <p className="text-sm text-green-400 mt-2">
              🌱 Powered by Culture of Harmony • Secure • Transparent • Sustainable
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/wallet" className="group">
              <Card className="h-full bg-gradient-to-br from-green-900/50 to-emerald-900/30 border-green-500/30 hover:border-green-400/50 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Wallet className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Gaia Wallet</h3>
                  <p className="text-sm text-muted-foreground">Secure wallet with maximum protection</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/community" className="group">
              <Card className="h-full bg-gradient-to-br from-blue-900/50 to-cyan-900/30 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Community Projects</h3>
                  <p className="text-sm text-muted-foreground">Join green reinvestment initiatives</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/security" className="group">
              <Card className="h-full bg-gradient-to-br from-purple-900/50 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Ultimate Security</h3>
                  <p className="text-sm text-muted-foreground">Future-proof protection system</p>
                </CardContent>
              </Card>
            </Link>

            <a href="https://sites.google.com/view/culture-of-harmony" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full bg-gradient-to-br from-orange-900/50 to-red-900/30 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Culture of Harmony</h3>
                  <p className="text-sm text-muted-foreground">Visit our main website</p>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Auth Section */}
          {!user ? (
            <Card className="border-blue-500/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="mt-1"
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
                      placeholder="password"
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </Button>
                </form>
                <div className="text-center mt-4">
                  <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-green-500/20">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-green-400 mb-4">
                  Welcome, {user.email}!
                </h2>
                <p className="text-muted-foreground">
                  You are now logged in.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index
