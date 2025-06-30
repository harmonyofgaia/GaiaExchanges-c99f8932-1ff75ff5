
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap, Crown } from 'lucide-react'

const Pricing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          💲 Pricing Plans
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Choose your plan • All plans contribute to environmental causes • Fair and transparent
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Zap className="h-6 w-6" />
              Basic Plan
            </CardTitle>
            <div className="text-3xl font-bold text-green-400">Free</div>
            <p className="text-sm text-muted-foreground">Perfect for getting started</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-sm">Basic wallet access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-sm">Virtual world exploration</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-sm">Basic games access</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-sm">Environmental impact tracking</span>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Get Started Free
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20 relative">
          <Badge className="absolute -top-2 right-4 bg-blue-600">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Star className="h-6 w-6" />
              Pro Plan
            </CardTitle>
            <div className="text-3xl font-bold text-blue-400">$19/month</div>
            <p className="text-sm text-muted-foreground">For serious users</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Everything in Basic</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Pro games and landscapes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Advanced wallet features</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-400" />
                <span className="text-sm">10% more environmental impact</span>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Crown className="h-6 w-6" />
              Enterprise
            </CardTitle>
            <div className="text-3xl font-bold text-purple-400">$99/month</div>
            <p className="text-sm text-muted-foreground">For organizations</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Everything in Pro</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="text-sm">White-label solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Custom integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Dedicated support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-purple-400" />
                <span className="text-sm">25% more environmental impact</span>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Pricing
