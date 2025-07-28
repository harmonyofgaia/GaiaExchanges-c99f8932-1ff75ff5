
import { Navbar } from '@/components/Navbar'
import { GAiACommunityProjects } from '@/components/green-investments/GAiACommunityProjects'
import { GaiaCommunityProjects } from '@/components/GaiaCommunityProjects'
import { WildfireSandProtection } from '@/components/green-investments/WildfireSandProtection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, Globe, TrendingUp, Shield, Flame } from 'lucide-react'

const GreenInvestments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Green Investments
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Invest in environmental projects • Support sustainable initiatives • Make a positive impact
          </p>
          <div className="text-sm text-green-400 mt-2">
            ✨ Powered by GAiA Token • Community Driven • Transparent Impact
          </div>
        </div>

        {/* Green Investment Overview */}
        <Card className="mb-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Globe className="h-6 w-6" />
              Green Investment Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-800/20 rounded-lg">
                <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">Environmental</div>
                <div className="text-sm text-muted-foreground">Impact Projects</div>
              </div>
              <div className="text-center p-4 bg-blue-800/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">Sustainable</div>
                <div className="text-sm text-muted-foreground">Returns</div>
              </div>
              <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">Global</div>
                <div className="text-sm text-muted-foreground">Community</div>
              </div>
              <div className="text-center p-4 bg-orange-800/20 rounded-lg">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">Protection</div>
                <div className="text-sm text-muted-foreground">& Prevention</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Project: Wildfire Sand Protection */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge className="bg-orange-600 text-white mb-2">
              <Flame className="h-4 w-4 mr-1" />
              FEATURED PROTECTION PROJECT
            </Badge>
            <h2 className="text-2xl font-bold text-orange-400">Our Latest Environmental Protection Initiative</h2>
          </div>
          <WildfireSandProtection />
        </div>

        {/* Your Restored GAiA Community Projects */}
        <div className="mb-12">
          <GAiACommunityProjects />
        </div>

        {/* Additional Community Projects */}
        <div className="mb-12">
          <GaiaCommunityProjects />
        </div>
      </div>
    </div>
  )
}

export default GreenInvestments
