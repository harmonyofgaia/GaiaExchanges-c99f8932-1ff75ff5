import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  DollarSign,
  ArrowRight,
  TrendingUp,
  Wallet,
  CreditCard,
  Zap,
  Shield,
  Clock
} from 'lucide-react'
import { toast } from 'sonner'

interface FeeRoutingButtonProps {
  className?: string
}

export function FeeRoutingButton({ className = '' }: FeeRoutingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const feeRoutes = [
    {
      id: 'express',
      name: 'Express Route',
      description: 'Fastest transaction processing with priority fees',
      fee: '0.1%',
      speed: 'Instant',
      icon: <Zap className="h-5 w-5" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/50'
    },
    {
      id: 'standard',
      name: 'Standard Route',
      description: 'Balanced fees and processing time',
      fee: '0.05%',
      speed: '1-2 minutes',
      icon: <Shield className="h-5 w-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50'
    },
    {
      id: 'economy',
      name: 'Economy Route',
      description: 'Lowest fees with standard processing',
      fee: '0.025%',
      speed: '5-10 minutes',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50'
    }
  ]

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId)
    const route = feeRoutes.find(r => r.id === routeId)
    if (route) {
      localStorage.setItem('gaia-fee-route-preference', routeId)
      toast.success(`Fee route set to ${route.name}`, {
        description: `${route.fee} fee • ${route.speed} processing`,
        duration: 3000
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-lg ${className}`}
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Fee Routing
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-background/95 border-primary/30 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-yellow-400" />
            💰 Smart Fee Routing
          </DialogTitle>
          <p className="text-muted-foreground">
            Choose your preferred fee structure and transaction speed
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {feeRoutes.map((route) => (
            <Card 
              key={route.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                selectedRoute === route.id 
                  ? `${route.borderColor} ${route.bgColor}` 
                  : 'border-primary/20 hover:border-primary/40'
              }`}
              onClick={() => handleRouteSelect(route.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${route.bgColor}`}>
                      <div className={route.color}>
                        {route.icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${route.color}`}>
                        {route.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {route.description}
                      </p>
                    </div>
                  </div>
                  {selectedRoute === route.id && (
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={`text-xl font-bold ${route.color}`}>
                        {route.fee}
                      </div>
                      <div className="text-xs text-muted-foreground">Fee</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-medium ${route.color}`}>
                        {route.speed}
                      </div>
                      <div className="text-xs text-muted-foreground">Processing</div>
                    </div>
                  </div>
                  <ArrowRight className={`h-5 w-5 ${route.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <h4 className="font-medium text-green-400">Smart Routing Benefits</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Automatic fee optimization based on network conditions</li>
            <li>• Real-time route switching for best performance</li>
            <li>• Carbon-negative transaction processing</li>
            <li>• Quantum-secured fee calculations</li>
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-primary/20">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-muted-foreground">
              Connected to Gaia Network
            </span>
          </div>
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  )
}