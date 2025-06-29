
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Zap, Globe, Users, TrendingUp, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AdminReverseButton } from '@/components/admin/AdminReverseButton'

const Home = () => {
  const [dragonPower, setDragonPower] = useState(100)

  useEffect(() => {
    const interval = setInterval(() => {
      setDragonPower(prev => Math.min(999999, prev + 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🐉 HARMONY OF GAIA 🐉
          </h1>
          <p className="text-xl text-green-300 mb-2">
            The Ultimate Dragon-Protected Ecosystem
          </p>
          <p className="text-sm text-muted-foreground">
            🛡️ Dragon Power Level: {dragonPower.toLocaleString()}+ • ⚡ Quantum Security Active • 🌍 Worldwide Protection
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/20 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Shield className="h-6 w-6" />
                🐉 Dragon Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-300 mb-4">
                Unbeatable quantum defense system with full body armor protection
              </p>
              <Link to="/ultimate-security">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Access Dragon Core
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-6 w-6" />
                👑 Admin Portal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-300 mb-4">
                Maximum security admin dashboard with Google Authenticator
              </p>
              <Link to="/admin">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Admin Access
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/20 hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <TrendingUp className="h-6 w-6" />
                📊 System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-300 mb-4">
                Real-time monitoring of all dragon-protected systems
              </p>
              <Link to="/system-status">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Status
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Dragon Power Display */}
        <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20 mb-8">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🐉</div>
            <h2 className="text-3xl font-bold text-red-400 mb-4">
              TRAINED DRAGON CORE ACTIVE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-900/30 p-4 rounded-lg">
                <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">∞</div>
                <div className="text-sm text-green-300">Quantum Power</div>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg">
                <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-sm text-blue-300">Security Level</div>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-purple-300">Global Protection</div>
              </div>
              <div className="bg-orange-900/30 p-4 rounded-lg">
                <Lock className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">UNBREAKABLE</div>
                <div className="text-sm text-orange-300">Defense System</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground">
          <p className="mb-2">
            🌍 Making the world safer • 🔐 Maximum security for all holders • ⚡ Quantum evolution active
          </p>
          <p className="text-sm">
            Protected by Trained Dragon • Full Body Armor • Unbeatable Defense System
          </p>
        </div>
      </div>
      
      <AdminReverseButton />
    </div>
  )
}

export default Home
