
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, TrendingUp, Users, Zap } from 'lucide-react'

export default function Tokenomics() {
  const tokenomicsData = [
    {
      title: "Total Supply",
      value: "1,000,000,000 GAIA",
      description: "Fixed supply with deflationary mechanisms",
      icon: Coins,
      color: "text-green-400"
    },
    {
      title: "Staking Rewards",
      value: "40%",
      description: "Allocated for community staking and rewards",
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      title: "Community Pool",
      value: "30%",
      description: "For ecosystem development and partnerships",
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Development",
      value: "20%",
      description: "Platform development and maintenance",
      icon: Zap,
      color: "text-yellow-400"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Tokenomics
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Understanding the economic model behind Universal Gaia's ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tokenomicsData.map((item, index) => {
          const Icon = item.icon
          return (
            <Card key={index} className="bg-black/40 backdrop-blur-sm border-green-500/20 hover:border-green-400/40 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <Icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <CardTitle className="text-white">{item.title}</CardTitle>
                <CardDescription className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center">{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400">Distribution Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Team & Advisors</span>
                <span className="text-white font-semibold">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Development</span>
                <span className="text-white font-semibold">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Community Pool</span>
                <span className="text-white font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Staking Rewards</span>
                <span className="text-white font-semibold">40%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400">Utility & Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Governance voting rights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Staking rewards</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Platform fee discounts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Exclusive access to features</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
