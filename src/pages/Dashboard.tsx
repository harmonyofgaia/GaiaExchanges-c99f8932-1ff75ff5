import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Activity,
  Globe,
  Zap
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            🌍 Gaia Exchange Dashboard
          </h1>
          <p className="text-gray-300">
            Your environmental impact and token management center
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Wallet className="h-5 w-5" />
                Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$0.00</div>
              <p className="text-sm text-gray-400">Total portfolio value</p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+0.00%</div>
              <p className="text-sm text-gray-400">24h change</p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Activity className="h-5 w-5" />
                Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-sm text-gray-400">Recent transactions</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">Welcome to Gaia Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Your dashboard for managing environmental tokens and tracking impact.
                Start trading and making a difference for our planet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard