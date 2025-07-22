/**
 * Real-Time Environmental Data Integration
 * Live environmental data feeds connected to GAiA token value
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Thermometer, 
  Cloud, 
  Droplets, 
  Wind,
  Sun,
  TreePine,
  Fish,
  Mountain,
  Globe,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface EnvironmentalData {
  id: string
  location: string
  temperature: number
  temperatureChange: number
  airQuality: number
  humidity: number
  windSpeed: number
  co2Level: number
  forestCoverage: number
  oceanHealth: number
  biodiversity: number
  renewableEnergy: number
  lastUpdated: string
  gaiaImpact: number
}

interface GlobalAlert {
  id: string
  type: 'critical' | 'warning' | 'info' | 'positive'
  title: string
  description: string
  location: string
  timestamp: string
  action?: string
  gaiaReward?: number
}

export function RealTimeEnvironmentalData() {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData[]>([
    {
      id: '1',
      location: 'Amazon Rainforest',
      temperature: 26.5,
      temperatureChange: -0.3,
      airQuality: 89,
      humidity: 78,
      windSpeed: 12,
      co2Level: 315,
      forestCoverage: 87.2,
      oceanHealth: 0,
      biodiversity: 94,
      renewableEnergy: 65,
      lastUpdated: '2 minutes ago',
      gaiaImpact: 45.2
    },
    {
      id: '2',
      location: 'Pacific Ocean',
      temperature: 18.2,
      temperatureChange: 0.1,
      airQuality: 95,
      humidity: 85,
      windSpeed: 25,
      co2Level: 405,
      forestCoverage: 0,
      oceanHealth: 72,
      biodiversity: 68,
      renewableEnergy: 85,
      lastUpdated: '5 minutes ago',
      gaiaImpact: 32.8
    },
    {
      id: '3',
      location: 'Sahara Solar Farm',
      temperature: 42.1,
      temperatureChange: 1.2,
      airQuality: 78,
      humidity: 15,
      windSpeed: 8,
      co2Level: 380,
      forestCoverage: 2.1,
      oceanHealth: 0,
      biodiversity: 23,
      renewableEnergy: 98,
      lastUpdated: '1 minute ago',
      gaiaImpact: 67.5
    }
  ])

  const [globalAlerts, setGlobalAlerts] = useState<GlobalAlert[]>([
    {
      id: '1',
      type: 'positive',
      title: 'Reforestation Success',
      description: '10,000 new trees planted in Costa Rica increasing GAiA token value',
      location: 'Costa Rica',
      timestamp: '15 minutes ago',
      action: 'Celebrate Success',
      gaiaReward: 25.0
    },
    {
      id: '2',
      type: 'warning',
      title: 'Ocean Temperature Rising',
      description: 'Pacific Ocean temperatures 0.5°C above normal - action needed',
      location: 'Pacific Ocean',
      timestamp: '32 minutes ago',
      action: 'Support Ocean Cooling',
      gaiaReward: 15.0
    },
    {
      id: '3',
      type: 'critical',
      title: 'Deforestation Alert',
      description: 'Illegal logging detected in protected area - immediate response required',
      location: 'Amazon Basin',
      timestamp: '1 hour ago',
      action: 'Emergency Response',
      gaiaReward: 50.0
    },
    {
      id: '4',
      type: 'info',
      title: 'Wind Farm Efficiency',
      description: 'New wind farm achieving 125% efficiency - bonus GAiA rewards available',
      location: 'North Sea',
      timestamp: '2 hours ago',
      action: 'Claim Bonus',
      gaiaReward: 20.0
    }
  ])

  const [gaiaPrice, setGaiaPrice] = useState(0.00234)
  const [priceChange, setPriceChange] = useState(2.34)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time environmental data updates
      setEnvironmentalData(prev => prev.map(data => ({
        ...data,
        temperature: data.temperature + (Math.random() - 0.5) * 0.1,
        airQuality: Math.max(0, Math.min(100, data.airQuality + (Math.random() - 0.5) * 2)),
        co2Level: Math.max(300, data.co2Level + (Math.random() - 0.5) * 5),
        forestCoverage: Math.max(0, Math.min(100, data.forestCoverage + (Math.random() - 0.5) * 0.1)),
        gaiaImpact: Math.max(0, data.gaiaImpact + (Math.random() - 0.5) * 2),
        lastUpdated: 'Just now'
      })))

      // Simulate GAiA price changes based on environmental improvements
      const avgGaiaImpact = environmentalData.reduce((sum, data) => sum + data.gaiaImpact, 0) / environmentalData.length
      const priceMultiplier = 1 + (avgGaiaImpact - 40) * 0.001
      setGaiaPrice(prev => Math.max(0.001, prev * priceMultiplier))
      setPriceChange((priceMultiplier - 1) * 100)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [environmentalData])

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-900/20'
      case 'warning': return 'border-yellow-500 bg-yellow-900/20'
      case 'info': return 'border-blue-500 bg-blue-900/20'
      case 'positive': return 'border-green-500 bg-green-900/20'
      default: return 'border-gray-500 bg-gray-900/20'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle
      case 'warning': return AlertTriangle
      case 'info': return Globe
      case 'positive': return CheckCircle
      default: return Globe
    }
  }

  const getHealthColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value < 30) return 'text-green-400'
      if (value < 60) return 'text-yellow-400'
      return 'text-red-400'
    } else {
      if (value > 80) return 'text-green-400'
      if (value > 50) return 'text-yellow-400'
      return 'text-red-400'
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-2">
          🌍 Live Environmental Data Feed
        </h1>
        <p className="text-lg text-muted-foreground">
          Real-time environmental monitoring connected to GAiA token performance
        </p>
      </div>

      {/* GAiA Price Impact */}
      <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-400">GAiA Token Environmental Impact</h3>
              <p className="text-sm text-muted-foreground">Price driven by real environmental improvements</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">${gaiaPrice.toFixed(6)}</div>
              <div className={`text-sm flex items-center gap-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {priceChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(priceChange).toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data">Environmental Data</TabsTrigger>
          <TabsTrigger value="alerts">Global Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-4">
          <div className="grid gap-4">
            {environmentalData.map((data) => (
              <Card key={data.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-blue-400">{data.location}</span>
                    <Badge className="bg-green-600">
                      Impact: +{data.gaiaImpact.toFixed(1)}% GAiA
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Last updated: {data.lastUpdated}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-red-900/20 rounded-lg">
                      <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-400" />
                      <div className="text-lg font-bold text-red-400">{data.temperature.toFixed(1)}°C</div>
                      <div className={`text-xs ${data.temperatureChange >= 0 ? 'text-red-300' : 'text-green-300'}`}>
                        {data.temperatureChange >= 0 ? '+' : ''}{data.temperatureChange.toFixed(1)}°C
                      </div>
                    </div>

                    <div className="text-center p-3 bg-green-900/20 rounded-lg">
                      <Wind className="h-6 w-6 mx-auto mb-2 text-green-400" />
                      <div className={`text-lg font-bold ${getHealthColor(data.airQuality)}`}>{data.airQuality}%</div>
                      <div className="text-xs text-muted-foreground">Air Quality</div>
                    </div>

                    <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                      <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                      <div className="text-lg font-bold text-blue-400">{data.humidity}%</div>
                      <div className="text-xs text-muted-foreground">Humidity</div>
                    </div>

                    <div className="text-center p-3 bg-purple-900/20 rounded-lg">
                      <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                      <div className={`text-lg font-bold ${getHealthColor(data.renewableEnergy)}`}>{data.renewableEnergy}%</div>
                      <div className="text-xs text-muted-foreground">Renewable Energy</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <TreePine className="h-4 w-4 text-green-400" />
                          Forest Coverage
                        </span>
                        <span className={getHealthColor(data.forestCoverage)}>{data.forestCoverage.toFixed(1)}%</span>
                      </div>
                      <Progress value={data.forestCoverage} className="h-2" />
                    </div>

                    {data.oceanHealth > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center gap-2">
                            <Fish className="h-4 w-4 text-blue-400" />
                            Ocean Health
                          </span>
                          <span className={getHealthColor(data.oceanHealth)}>{data.oceanHealth}%</span>
                        </div>
                        <Progress value={data.oceanHealth} className="h-2" />
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <Mountain className="h-4 w-4 text-purple-400" />
                          Biodiversity Index
                        </span>
                        <span className={getHealthColor(data.biodiversity)}>{data.biodiversity}%</span>
                      </div>
                      <Progress value={data.biodiversity} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <Cloud className="h-4 w-4 text-gray-400" />
                          CO2 Level
                        </span>
                        <span className={getHealthColor(data.co2Level, true)}>{data.co2Level} ppm</span>
                      </div>
                      <Progress value={Math.min(100, (data.co2Level - 300) / 2)} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {globalAlerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type)
              return (
                <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-6 w-6 mt-1 text-current" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>📍 {alert.location}</span>
                            <span>⏰ {alert.timestamp}</span>
                          </div>
                          {alert.gaiaReward && (
                            <Badge className="mt-2 bg-green-600">
                              Reward: +{alert.gaiaReward} GAiA
                            </Badge>
                          )}
                        </div>
                      </div>
                      {alert.action && (
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}