
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Crown } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                💎 GAiA Pricing Plans
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Choose your path to environmental harmony
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-green-500/30 bg-green-900/20 relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Star className="h-6 w-6" />
                  Eco Starter
                </CardTitle>
                <div className="text-3xl font-bold text-green-400">Free</div>
                <p className="text-muted-foreground">Perfect for beginners</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Basic wallet access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Simple games</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Community features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Basic rewards</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-blue-500/30 bg-blue-900/20 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
              <CardHeader className="pt-8">
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Zap className="h-6 w-6" />
                  Harmony Pro
                </CardTitle>
                <div className="text-3xl font-bold text-blue-400">$19.99/mo</div>
                <p className="text-muted-foreground">For serious eco-warriors</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    <span>Everything in Eco Starter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    <span>Advanced gaming modes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    <span>Enhanced rewards (2x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-400" />
                    <span>Exclusive tournaments</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-purple-500/30 bg-purple-900/20 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                Ultimate
              </Badge>
              <CardHeader className="pt-8">
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Crown className="h-6 w-6" />
                  Gaia Master
                </CardTitle>
                <div className="text-3xl font-bold text-purple-400">$49.99/mo</div>
                <p className="text-muted-foreground">For environmental leaders</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>Everything in Harmony Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>VIP gaming access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>Maximum rewards (5x)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>White-glove support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>Exclusive NFT access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-purple-400" />
                    <span>Direct impact tracking</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Become a Master
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mt-8 border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-orange-300 mb-2">What payment methods do you accept?</h4>
                  <p className="text-muted-foreground">We accept GAiA tokens, SOL, and major cryptocurrencies.</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-300 mb-2">Can I change my plan anytime?</h4>
                  <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time.</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-300 mb-2">Do you offer refunds?</h4>
                  <p className="text-muted-foreground">We offer a 30-day money-back guarantee on all paid plans.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Pricing
