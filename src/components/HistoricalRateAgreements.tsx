import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, TrendingUp, TrendingDown, BarChart, Clock, Target } from 'lucide-react'
import { useState, useEffect } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface HistoricalRate {
  date: string
  price: number
  volume: number
  environmentalScore: number
}

interface RateAgreement {
  id: string
  tokenSymbol: string
  agreementType: string
  targetPrice: number
  currentPrice: number
  deadline: string
  progress: number
  environmentalGoal: string
  status: 'active' | 'completed' | 'pending'
}

export function HistoricalRateAgreements() {
  const [historicalData, setHistoricalData] = useState<HistoricalRate[]>([])
  const [rateAgreements, setRateAgreements] = useState<RateAgreement[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedToken, setSelectedToken] = useState('GAIA')

  useEffect(() => {
    // Simulate historical rate data
    const generateHistoricalData = () => {
      const data: HistoricalRate[] = []
      const periods = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90
      
      for (let i = periods; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        
        const basePrice = 0.15 + (Math.random() * 0.2)
        const environmentalBonus = Math.random() * 0.05
        
        data.push({
          date: date.toISOString().split('T')[0],
          price: basePrice + environmentalBonus,
          volume: 1000000 + (Math.random() * 5000000),
          environmentalScore: 70 + (Math.random() * 30)
        })
      }
      
      setHistoricalData(data)
    }

    // Simulate rate agreements
    const generateRateAgreements = () => {
      const agreements: RateAgreement[] = [
        {
          id: 'RA001',
          tokenSymbol: 'GAIA',
          agreementType: 'Environmental Milestone',
          targetPrice: 0.30,
          currentPrice: 0.245,
          deadline: '2025-03-15',
          progress: 81.7,
          environmentalGoal: 'Carbon Neutral Platform',
          status: 'active'
        },
        {
          id: 'RA002',
          tokenSymbol: 'GAIA',
          agreementType: 'Community Growth',
          targetPrice: 0.50,
          currentPrice: 0.245,
          deadline: '2025-06-01',
          progress: 49.0,
          environmentalGoal: '100K Tree Planting',
          status: 'active'
        },
        {
          id: 'RA003',
          tokenSymbol: 'GAIA',
          agreementType: 'Partnership Unlock',
          targetPrice: 0.25,
          currentPrice: 0.245,
          deadline: '2024-12-31',
          progress: 98.0,
          environmentalGoal: '50 NGO Partnerships',
          status: 'active'
        }
      ]
      
      setRateAgreements(agreements)
    }

    generateHistoricalData()
    generateRateAgreements()
  }, [selectedPeriod, selectedToken])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600'
      case 'completed': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(4)}`
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString()

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          📈 Historical Rate Agreements
        </CardTitle>
        <p className="text-center text-sm text-purple-300">
          Environmental Impact-Based Rate Targets • Smart Contract Automation • Community Goals
        </p>
        
        <div className="flex justify-center gap-2 mt-4">
          {['7d', '30d', '90d'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? 
                "bg-purple-600 text-white" : 
                "border-purple-500/30 text-purple-300"
              }
            >
              {period}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Historical Chart */}
        <div className="bg-black/20 p-4 rounded-lg border border-purple-500/20">
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            GAIA Token Historical Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
              <XAxis 
                dataKey="date" 
                stroke="#a855f7"
                fontSize={12}
                tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#a855f7"
                fontSize={12}
                tickFormatter={(value) => `$${value.toFixed(3)}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1b4b', 
                  border: '1px solid #7c3aed',
                  borderRadius: '8px',
                  color: '#e5d3ff'
                }}
                formatter={(value: number, name: string) => [
                  name === 'price' ? formatPrice(value) : value.toFixed(0),
                  name === 'price' ? 'Price' : name === 'environmentalScore' ? 'Eco Score' : 'Volume'
                ]}
                labelFormatter={(label) => `Date: ${formatDate(label)}`}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#7c3aed"
                fill="url(#priceGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Rate Agreements */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Active Rate Agreements
          </h3>
          <div className="space-y-4">
            {rateAgreements.map((agreement) => (
              <div 
                key={agreement.id}
                className="bg-black/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getStatusColor(agreement.status)}>
                        {agreement.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium text-purple-300">
                        {agreement.agreementType}
                      </span>
                    </div>
                    <div className="text-xs text-purple-400">
                      Agreement ID: {agreement.id}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-200">
                      {formatPrice(agreement.currentPrice)} → {formatPrice(agreement.targetPrice)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-purple-300">
                      {agreement.currentPrice < agreement.targetPrice ? 
                        <TrendingUp className="h-4 w-4 text-green-400" /> : 
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      }
                      {agreement.progress.toFixed(1)}% Progress
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-purple-400 mb-1">
                    <span>Progress to Target</span>
                    <span>{agreement.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-purple-900/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(agreement.progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-purple-900/30 p-3 rounded border border-purple-500/20">
                    <div className="flex items-center gap-2 text-purple-300 mb-1">
                      <Calendar className="h-4 w-4" />
                      Deadline
                    </div>
                    <div className="font-bold text-purple-200">
                      {formatDate(agreement.deadline)}
                    </div>
                  </div>
                  
                  <div className="bg-pink-900/30 p-3 rounded border border-pink-500/20">
                    <div className="flex items-center gap-2 text-pink-300 mb-1">
                      <span>🌱</span>
                      Environmental Goal
                    </div>
                    <div className="font-bold text-pink-200">
                      {agreement.environmentalGoal}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-purple-500/20">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-purple-400">
                      <Clock className="h-3 w-3" />
                      Auto-executed via smart contract
                    </div>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      Environmental Impact Verified
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement Summary */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-purple-500/30">
          <h3 className="text-lg font-bold text-purple-400 mb-2">📊 Agreement Impact Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-purple-300 font-medium">Total Active Agreements:</div>
              <div className="text-xl font-bold text-purple-200">3</div>
            </div>
            <div>
              <div className="text-pink-300 font-medium">Average Progress:</div>
              <div className="text-xl font-bold text-pink-200">76.2%</div>
            </div>
            <div>
              <div className="text-cyan-300 font-medium">Environmental Goals:</div>
              <div className="text-xl font-bold text-cyan-200">100% Green</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}