
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Globe, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            🌍 GAIA Exchange Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Decentralized • Transparent • Sustainable • Community-Driven
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Globe className="h-5 w-5" />
                Global Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connected worldwide community of sustainable traders and environmental advocates
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                Community First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Governed by the community, transparent operations, and shared prosperity for all
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Shield className="h-5 w-5" />
                Ultra Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bank-level security with quantum encryption and multi-layer protection systems
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Zap className="h-5 w-5" />
                Zero Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Revolutionary zero-fee trading model that puts more value back in your hands
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/auth">Join Community</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-500/30">
              <Link to="/trading">Start Trading</Link>
            </Button>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <Link to="/admin-login" className="text-muted-foreground hover:text-green-400">
              Admin Access
            </Link>
            <Link to="/secure-admin" className="text-muted-foreground hover:text-blue-400">
              Secure Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
