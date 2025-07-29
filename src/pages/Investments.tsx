
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { TrendingUp, PieChart, DollarSign } from 'lucide-react'

export default function Investments() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
            📈 Investment Portfolio
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Manage your GAiA investments and track performance
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
              <TrendingUp className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">Portfolio Growth</div>
              <div className="text-sm text-muted-foreground">Track performance</div>
            </div>

            <div className="text-center p-6 bg-teal-900/30 rounded-lg border border-teal-500/30">
              <PieChart className="h-12 w-12 mx-auto text-teal-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-teal-400">Asset Allocation</div>
              <div className="text-sm text-muted-foreground">Diversified holdings</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <DollarSign className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Returns</div>
              <div className="text-sm text-muted-foreground">Profit tracking</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
