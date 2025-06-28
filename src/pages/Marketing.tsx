import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Star,
  ExternalLink,
  Megaphone,
  Target,
  BarChart3,
  Image
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Marketing = () => {
  const { toast } = useToast()

  const campaignTemplates = [
    {
      platform: 'Twitter/X',
      template: '🌍 Join the #GaiaExchange revolution! Trade $GAiA tokens with ZERO fees and military-grade security. The future of eco-friendly crypto trading is here! 🚀 Explore all Harmony of Gaia projects: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia #DeFi #CryptoTrading #Sustainability',
      engagement: 'High'
    },
    {
      platform: 'Reddit',
      template: 'Introducing Gaia\'s Exchanges - The most secure crypto trading platform with zero-fee GAiA token swaps. Built with transparency and environmental impact in mind. Discover the full Harmony of Gaia ecosystem: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia',
      engagement: 'Medium'
    },
    {
      platform: 'LinkedIn',
      template: 'Professional crypto traders are choosing Gaia\'s Exchanges for its enterprise-grade security and innovative fee optimization. Join the sustainable trading revolution and explore Harmony of Gaia projects: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia',
      engagement: 'Professional'
    },
    {
      platform: 'Radio Station Script',
      template: 'Stay Tuned And Connect With the most Loveable Project of Our Human Race, called Harmony of Gaia. Find more info at www.cultureofharmony.net - The future of sustainable cryptocurrency trading is here with Gaia\'s Exchanges!',
      engagement: 'Broadcast'
    }
  ]

  const competitiveAdvantages = [
    { feature: 'Zero-Fee GAiA Trading', status: 'Active', competitor: 'Coinbase: 1.49%' },
    { feature: 'Military-Grade Security', status: 'Active', competitor: 'Standard: Basic SSL' },
    { feature: '24/7 Admin Monitoring', status: 'Active', competitor: 'Limited: Business Hours' },
    { feature: 'Transaction Reversal Rights', status: 'Unique', competitor: 'None Available' },
    { feature: 'Environmental Impact Focus', status: 'Leading', competitor: 'Not Available' },
    { feature: 'Full Transparency', status: 'Complete', competitor: 'Partial Only' }
  ]

  const handleCopyTemplate = (template: string) => {
    navigator.clipboard.writeText(template)
    toast({
      title: "Template Copied!",
      description: "Marketing template copied to clipboard. Ready to paste!",
    })
  }

  const handleCopyLogo = () => {
    const logoUrl = `${window.location.origin}/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png`
    navigator.clipboard.writeText(logoUrl)
    toast({
      title: "Logo URL Copied!",
      description: "Official Gaia of Harmony logo URL copied to clipboard for advertising use.",
    })
  }

  const handleCopyBackgroundImage = () => {
    const backgroundUrl = `${window.location.origin}/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png`
    navigator.clipboard.writeText(backgroundUrl)
    toast({
      title: "Background Image URL Copied!",
      description: "Official Culture of Harmony advertising background copied to clipboard.",
    })
  }

  const handleSubmitToCoinGecko = () => {
    toast({
      title: "CoinGecko Submission Guide",
      description: "Visit CoinGecko's official listing form and submit GAiA token details with contract information.",
    })
  }

  const handleCopyRadioScript = () => {
    const radioScript = "Stay Tuned And Connect With the most Loveable Project of Our Human Race, called Harmony of Gaia. Find more info at www.cultureofharmony.net"
    navigator.clipboard.writeText(radioScript)
    toast({
      title: "Radio Script Copied!",
      description: "Weekly radio announcement script copied to clipboard. Contact radio stations manually to arrange broadcasts.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-400">Gaia's Exchanges - Marketing Hub</h1>
          <p className="text-muted-foreground">World-leading crypto exchange marketing and expansion tools</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          Marketing Dashboard v2.0
        </Badge>
      </div>

      <Tabs defaultValue="advertising" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="advertising">Daily Advertising</TabsTrigger>
          <TabsTrigger value="branding">Official Branding</TabsTrigger>
          <TabsTrigger value="campaigns">Marketing Campaigns</TabsTrigger>
          <TabsTrigger value="advantages">Competitive Edge</TabsTrigger>
          <TabsTrigger value="listings">Exchange Listings</TabsTrigger>
          <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="advertising">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Image className="h-5 w-5" />
                  Official Culture of Harmony - Daily Advertising Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div 
                    className="w-full h-64 bg-cover bg-center rounded-lg mb-4 relative overflow-hidden cursor-pointer"
                    style={{ 
                      backgroundImage: `url(/lovable-uploads/0ca4bd04-3680-4cfa-acd8-d61ae9a40101.png)` 
                    }}
                    onClick={() => window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')}
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center">
                        <img 
                          src="/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png" 
                          alt="Gaia of Harmony Logo" 
                          className="w-16 h-16 mx-auto mb-2 opacity-98 hover:opacity-100 transition-opacity"
                        />
                        <h3 className="text-2xl font-bold text-white">Gaia's Exchanges</h3>
                        <p className="text-green-300">Culture of Harmony - Together We Make The World A Better Place</p>
                        <p className="text-xs text-blue-300 mt-2">Click to explore all Harmony of Gaia projects</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Official Advertising Header Background</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use this "Culture of Harmony" background for ALL daily advertising across news and social platforms
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={handleCopyBackgroundImage}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Copy Background URL
                    </Button>
                    <Button 
                      onClick={handleCopyLogo}
                      variant="outline"
                      className="border-green-500 text-green-400"
                    >
                      Copy Logo URL
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-400 mb-2">Daily Usage Guidelines</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use for ALL social media headers</li>
                      <li>• Apply to news platform submissions</li>
                      <li>• Include Gaia logo overlay</li>
                      <li>• Update daily across all channels</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-2">Platform Coverage</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Twitter/X Headers</li>
                      <li>• Facebook Cover Photos</li>
                      <li>• LinkedIn Company Banners</li>
                      <li>• Reddit Community Headers</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/20 to-orange-900/20 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">🌍 Culture of Harmony Message & Link Integration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    "Together We Can Make The World A Better Place" - This powerful message represents our commitment to environmental sustainability, global unity, and positive change through cryptocurrency innovation.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 mb-3">
                    <p className="text-sm text-blue-300 mb-2">
                      <strong>Project Link:</strong> Always include link to all Harmony of Gaia projects:
                    </p>
                    <code className="text-xs bg-black/20 p-1 rounded">
                      https://sites.google.com/view/culture-of-harmony/harmony-of-gaia
                    </code>
                  </div>
                  <p className="text-xs text-purple-300">
                    Use this message and link consistently across all advertising to reinforce our mission and direct users to our complete project ecosystem.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-400 mb-2">📻 Radio Station Outreach</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Weekly radio announcement script for manual distribution to radio stations worldwide:
                  </p>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mb-3">
                    <p className="text-sm text-yellow-300 italic">
                      "Stay Tuned And Connect With the most Loveable Project of Our Human Race, called Harmony of Gaia. Find more info at www.cultureofharmony.net"
                    </p>
                  </div>
                  <Button 
                    onClick={handleCopyRadioScript}
                    className="bg-yellow-600 hover:bg-yellow-700 mr-2"
                  >
                    Copy Radio Script
                  </Button>
                  <p className="text-xs text-yellow-400 mt-2">
                    Note: Radio station outreach requires manual contact with each station's programming department
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Image className="h-5 w-5" />
                  Official Gaia of Harmony Logo & Branding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png" 
                    alt="Official Gaia of Harmony Logo" 
                    className="w-48 h-48 object-contain mx-auto mb-4 bg-white/5 rounded-lg p-4"
                  />
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Official Gaia of Harmony Logo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use this official logo across all advertising platforms, exchange listings, and marketing materials
                  </p>
                  <Button 
                    onClick={handleCopyLogo}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Copy Logo URL for Advertising
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-400 mb-2">Logo Usage Guidelines</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use on white or dark backgrounds</li>
                      <li>• Maintain aspect ratio when resizing</li>
                      <li>• Minimum size: 32x32 pixels</li>
                      <li>• Clear space: Logo height around all sides</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-2">Brand Colors</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Primary: Turquoise Eye (#40E0D0)</li>
                      <li>• Secondary: Deep Black (#1A1A1A)</li>
                      <li>• Accent: Soft Green (#90EE90)</li>
                      <li>• Background: Clean White (#FFFFFF)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Megaphone className="h-5 w-5" />
                  Daily Marketing Campaign Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaignTemplates.map((campaign, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{campaign.platform}</h4>
                      <Badge variant="outline">{campaign.engagement} Engagement</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{campaign.template}</p>
                    <Button 
                      size="sm" 
                      onClick={() => handleCopyTemplate(campaign.template)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Copy Template
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Advertising Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-400 mb-2">Primary Targets</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Crypto traders seeking zero fees</li>
                      <li>• Environmentally conscious investors</li>
                      <li>• DeFi enthusiasts</li>
                      <li>• Security-focused traders</li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-2">Key Messages</h4>
                    <ul className="text-sm space-y-1">
                      <li>• World's most secure exchange</li>
                      <li>• Zero-fee GAiA token trading</li>
                      <li>• Full transparency & admin controls</li>
                      <li>• Environmental sustainability focus</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advantages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Competitive Advantages Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitiveAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div>
                        <div className="font-medium">{advantage.feature}</div>
                        <div className="text-sm text-muted-foreground">Status: {advantage.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">vs Competition</div>
                      <div className="text-xs text-red-400">{advantage.competitor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Exchange Listing Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-400 mb-2">Manual Action Required</h4>
                  <p className="text-sm text-yellow-300 mb-3">
                    These listings require direct application through official channels:
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={handleSubmitToCoinGecko}
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Submit to CoinGecko (Free Listing)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply to CoinMarketCap
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Submit to Binance Listing Application
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-400 mb-2">Immediate Actions</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Professional website active</li>
                      <li>✓ Working exchange platform</li>
                      <li>✓ Security documentation</li>
                      <li>✓ Transparent operations</li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h4 className="font-medium text-purple-400 mb-2">Next Steps</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Create token documentation</li>
                      <li>• Prepare marketing materials</li>
                      <li>• Build community presence</li>
                      <li>• Submit to app stores</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Growth Metrics & Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-400">0→1000</div>
                  <p className="text-sm text-muted-foreground">Daily Users Target</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-400">0→50</div>
                  <p className="text-sm text-muted-foreground">Exchange Partnerships</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-400">0→100K</div>
                  <p className="text-sm text-muted-foreground">Community Members</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-green-400 mb-2">World Leader Strategy</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Roadmap to become the #1 crypto exchange with GAiA token as the leading environmental currency
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-1">Phase 1: Foundation</h5>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Secure platform operations</li>
                      <li>• Community building</li>
                      <li>• Initial partnerships</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Phase 2: Expansion</h5>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Major exchange listings</li>
                      <li>• Mobile app deployment</li>
                      <li>• Global marketing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Marketing
