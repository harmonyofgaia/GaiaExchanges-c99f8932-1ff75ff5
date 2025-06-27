
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Flame, Recycle, TreePine, Droplets } from 'lucide-react'

interface BurnData {
  totalBurned: number
  weeklyBurn: number
  reinvestmentPool: number
  environmentalProjects: {
    name: string
    allocation: number
    impact: string
  }[]
}

const mockBurnData: BurnData = {
  totalBurned: 1250000,
  weeklyBurn: 25000,
  reinvestmentPool: 890000,
  environmentalProjects: [
    { name: "Ocean Cleanup Initiative", allocation: 35, impact: "2.3M lbs plastic removed" },
    { name: "Reforestation Program", allocation: 30, impact: "150K trees planted" },
    { name: "Renewable Energy", allocation: 25, impact: "50MW clean energy" },
    { name: "Water Conservation", allocation: 10, impact: "1M gallons saved" }
  ]
}

export function BurningSystem() {
  const [burnData, setBurnData] = useState<BurnData>(mockBurnData)
  const [currentBurn, setCurrentBurn] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBurn(prev => (prev + 1) % 100)
      // Simulate real-time burning
      setBurnData(prev => ({
        ...prev,
        totalBurned: prev.totalBurned + Math.floor(Math.random() * 10),
        reinvestmentPool: prev.reinvestmentPool + Math.floor(Math.random() * 5)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Live Burning Status */}
      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Flame className="h-5 w-5 animate-pulse" />
            Live Token Burning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mono-numbers text-orange-400">
                {formatNumber(burnData.totalBurned)}
              </div>
              <p className="text-sm text-muted-foreground">Total GAiA Burned</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mono-numbers text-orange-400">
                {formatNumber(burnData.weeklyBurn)}
              </div>
              <p className="text-sm text-muted-foreground">Weekly Burn Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mono-numbers text-green-400">
                ${formatNumber(burnData.reinvestmentPool)}
              </div>
              <p className="text-sm text-muted-foreground">Reinvestment Pool</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Burn Cycle</span>
              <span>{currentBurn}%</span>
            </div>
            <Progress value={currentBurn} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Transparent Reinvestment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Recycle className="h-5 w-5" />
            Transparent Reinvestment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Every GAiA token burned is converted to value that gets reinvested into environmental projects. 
              Track exactly where your contribution goes in real-time.
            </p>
            
            <div className="space-y-4">
              {burnData.environmentalProjects.map((project, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Droplets className="h-4 w-4 text-blue-400" />}
                      {index === 1 && <TreePine className="h-4 w-4 text-green-400" />}
                      {index === 2 && <Flame className="h-4 w-4 text-yellow-400" />}
                      {index === 3 && <Droplets className="h-4 w-4 text-cyan-400" />}
                      <h4 className="font-semibold">{project.name}</h4>
                    </div>
                    <span className="text-sm font-medium">{project.allocation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Progress value={project.allocation} className="flex-1 mr-4 h-2" />
                    <span className="text-sm text-green-400 font-medium">{project.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transparency Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Transparency Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">Real-Time Tracking</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Burn Transactions:</span>
                  <span className="font-mono">24/7 Live</span>
                </div>
                <div className="flex justify-between">
                  <span>Wallet Visibility:</span>
                  <span className="text-green-400">100% Open</span>
                </div>
                <div className="flex justify-between">
                  <span>Project Updates:</span>
                  <span className="text-green-400">Daily</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Access:</span>
                  <span className="text-green-400">Full Access</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Environmental Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>CO2 Offset:</span>
                  <span className="text-green-400">1,250 tons</span>
                </div>
                <div className="flex justify-between">
                  <span>Trees Planted:</span>
                  <span className="text-green-400">150,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Ocean Cleanup:</span>
                  <span className="text-green-400">2.3M lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Clean Energy:</span>
                  <span className="text-green-400">50 MW</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
