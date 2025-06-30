
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Check, Star, Crown } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      icon: DollarSign,
      features: ['Basic Wallet Access', 'Simple Trading', 'Community Access', 'Basic Security'],
      color: 'green'
    },
    {
      name: 'Premium',
      price: '$29/month',
      icon: Star,
      features: ['Advanced Trading', 'Premium Security', 'Priority Support', 'Advanced Analytics'],
      color: 'blue',
      popular: true
    },
    {
      name: 'Ultimate',
      price: '$99/month',
      icon: Crown,
      features: ['All Features', 'Quantum Security', 'VIP Support', 'Custom Solutions'],
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900/20 to-green-900/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 mb-4">
            💲 Harmony of Gaia Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card key={plan.name} className={`border-${plan.color}-500/30 bg-gradient-to-br from-${plan.color}-900/30 to-${plan.color}-900/20 relative`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    MOST POPULAR
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-${plan.color}-600/20 rounded-full flex items-center justify-center`}>
                    <IconComponent className={`h-8 w-8 text-${plan.color}-400`} />
                  </div>
                  <CardTitle className={`text-${plan.color}-400 text-2xl`}>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-white">{plan.price}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className={`h-5 w-5 text-${plan.color}-400`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 hover:from-${plan.color}-700 hover:to-${plan.color}-800`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                🌍 All Plans Include
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div>✅ Dragon Security</div>
                <div>✅ Cloud Optimization</div>
                <div>✅ 24/7 Support</div>
                <div>✅ Regular Updates</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Pricing
