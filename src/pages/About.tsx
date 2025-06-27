
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Leaf, Globe, Users, Zap, Target } from 'lucide-react'

const About = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">Harmony of Gaia (GAiA)</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The world's first eco-conscious cryptocurrency exchange dedicated to environmental sustainability and transparent reinvestment
        </p>
        <div className="flex items-center justify-center gap-2 text-green-400">
          <Leaf className="h-5 w-5" />
          <span className="font-medium">Sustainable • Transparent • Community-Driven</span>
        </div>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Harmony of Gaia was founded on the principle that cryptocurrency can be a force for environmental good. 
              We've created the first exchange where every transaction contributes to global sustainability initiatives.
            </p>
            <p>
              Through our transparent burning and reinvestment protocol, we ensure that the GAiA token ecosystem 
              grows stronger while supporting real-world environmental projects.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Transparency in all operations</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="h-4 w-4 text-green-400" />
                <span>Environmental sustainability</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-green-400" />
                <span>Community-first approach</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4 text-green-400" />
                <span>Innovation for good</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Founder Information */}
      <Card>
        <CardHeader>
          <CardTitle>Founder & Ownership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4">GAiA Token Ownership</h3>
            <p className="mb-4">
              Harmony of Gaia Exchange is proudly owned and founded by the GAiA Token community. 
              This unique structure ensures that all decisions are made in the best interest of token holders and environmental sustainability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Token Details</h4>
                <p className="text-sm text-muted-foreground">Symbol: GAiA</p>
                <p className="text-sm text-muted-foreground">Network: Multi-chain</p>
                <p className="text-sm text-muted-foreground">Total Supply: Community Governed</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Governance</h4>
                <p className="text-sm text-muted-foreground">Decentralized Decision Making</p>
                <p className="text-sm text-muted-foreground">Community Proposals</p>
                <p className="text-sm text-muted-foreground">Transparent Voting</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Regulatory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Company Registration</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Entity:</span> Harmony of Gaia Ltd.</p>
                <p><span className="font-medium">Registration:</span> Environmental Tech Sector</p>
                <p><span className="font-medium">Compliance:</span> Full KYC/AML Standards</p>
                <p><span className="font-medium">License:</span> Digital Asset Exchange</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Environmental Certifications</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Carbon Neutral:</span> Certified 2024</p>
                <p><span className="font-medium">Green Energy:</span> 100% Renewable</p>
                <p><span className="font-medium">ISO 14001:</span> Environmental Management</p>
                <p><span className="font-medium">B-Corp:</span> Certified Benefit Corporation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default About
