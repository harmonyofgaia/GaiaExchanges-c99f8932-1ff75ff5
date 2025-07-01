
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Crown, Zap, Shield, Star } from 'lucide-react'

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              💎 GAiA Universe Pricing
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Choose Your Level of Cosmic Power
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-green-400">FREE</div>
              <Badge className="bg-green-600">Most Popular</Badge>
              <ul className="space-y-2 text-sm">
                <li>✅ Basic Virtual Worlds</li>
                <li>✅ Animal Tracking</li>
                <li>✅ Community Features</li>
                <li>✅ Environmental Impact</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Join Free
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2" />
                Explorer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-blue-400">$9.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
              <ul className="space-y-2 text-sm">
                <li>✅ Advanced Virtual Worlds</li>
                <li>✅ Premium Animals</li>
                <li>✅ NFT Creation</li>
                <li>✅ Enhanced Security</li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                Guardian
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-purple-400">$29.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
              <ul className="space-y-2 text-sm">
                <li>✅ Quantum Defense Access</li>
                <li>✅ Dragon Protection</li>
                <li>✅ Advanced Trading</li>
                <li>✅ Priority Support</li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Become Guardian
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20 border-2">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-center">
                <Crown className="h-8 w-8 mx-auto mb-2" />
                God Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-yellow-400">$99.99</div>
              <div className="text-sm text-muted-foreground">per month</div>
              <Badge className="bg-yellow-600">Ultimate Power</Badge>
              <ul className="space-y-2 text-sm">
                <li>✅ Admin-Level Powers</li>
                <li>✅ Galaxy Control</li>
                <li>✅ Quantum Authority</li>
                <li>✅ Unlimited Everything</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                Ascend to Godhood
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Pricing
