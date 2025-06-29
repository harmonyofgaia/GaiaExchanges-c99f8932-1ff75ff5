
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "Community",
      price: "Free",
      description: "Perfect for getting started with Harmony of Gaia",
      features: [
        "Basic GAiA token access",
        "Community gaming features",
        "Environmental impact tracking",
        "Basic wallet functionality"
      ],
      popular: false
    },
    {
      name: "Harmony Pro",
      price: "$9.99/month",
      description: "Advanced features for serious environmental warriors",
      features: [
        "All Community features",
        "Advanced trading tools",
        "Premium NFT access",
        "Priority customer support",
        "Enhanced security features"
      ],
      popular: true
    },
    {
      name: "Gaia Guardian",
      price: "$29.99/month", 
      description: "Ultimate package for environmental leaders",
      features: [
        "All Harmony Pro features",
        "Exclusive NFT collections",
        "Advanced analytics dashboard",
        "Direct environmental project funding",
        "Personal environmental consultant"
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            🌍 Choose Your Environmental Impact Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join millions in making the world a better place. Every subscription directly funds environmental projects worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-green-500/50 scale-105' : 'border-border/50'} bg-background/50 backdrop-blur-sm`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-green-400">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-white mt-4">{plan.price}</div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  size="lg"
                >
                  {plan.price === "Free" ? "Get Started" : "Choose Plan"}
                  <Zap className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-green-400 font-semibold text-lg">
            🌱 100% of proceeds go directly to environmental restoration projects
          </p>
          <p className="text-muted-foreground mt-2">
            Together we're making the world a better place, one subscription at a time
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pricing
