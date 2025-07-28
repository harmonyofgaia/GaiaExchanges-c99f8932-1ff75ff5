
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TreePine, 
  Shield, 
  Globe, 
  TrendingUp, 
  CheckCircle,
  Activity,
  Target,
  Leaf,
  Droplets,
  Wind,
  Sun
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function ImpactMeasurementSystem() {
  const [selectedMetric, setSelectedMetric] = useState('carbon')

  const impactMetrics = [
    {
      id: 'carbon',
      name: 'Carbon Impact',
      value: '2.4M',
      unit: 'tons CO₂ prevented',
      change: '+23.5%',
      icon: <Leaf className="h-8 w-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      id: 'forest',
      name: 'Forest Protection',
      value: '847K',
      unit: 'hectares protected',
      change: '+18.2%',
      icon: <TreePine className="h-8 w-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    },
    {
      id: 'biodiversity',
      name: 'Biodiversity',
      value: '12.7K',
      unit: 'species preserved',
      change: '+31.8%',
      icon: <Globe className="h-8 w-8" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20'
    },
    {
      id: 'water',
      name: 'Water Conservation',
      value: '156M',
      unit: 'liters saved',
      change: '+42.1%',
      icon: <Droplets className="h-8 w-8" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20'
    }
  ]

  const selectedMetricData = impactMetrics.find(m => m.id === selectedMetric)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            📊 Impact Measurement System
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time environmental impact tracking and blockchain verification
          </p>
        </div>

        {/* Key Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactMetrics.map((metric) => (
            <Card 
              key={metric.id}
              className={`border-gray-500/20 ${metric.bgColor} cursor-pointer transition-all duration-300 hover:scale-105 ${selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-medium ${metric.color}`}>{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                  <div className="ml-3">
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                    <p className="text-xs text-muted-foreground">{metric.unit}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <span className="text-green-400 text-xs">{metric.change}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Metric View */}
        {selectedMetricData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className={`border-gray-500/20 ${selectedMetricData.bgColor}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${selectedMetricData.color}`}>
                  {selectedMetricData.icon}
                  {selectedMetricData.name} Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Impact</div>
                    <div className={`text-3xl font-bold ${selectedMetricData.color}`}>
                      {selectedMetricData.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{selectedMetricData.unit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Growth</div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-semibold">{selectedMetricData.change}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Annual Target Progress</span>
                    <span className={selectedMetricData.color}>73%</span>
                  </div>
                  <Progress value={73} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verified Impact</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-green-400">98.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Blockchain Verified</span>
                    <Badge className="bg-blue-600 text-xs">Real-time</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-500/20 bg-gradient-to-br from-gray-900/20 to-black/20">
              <CardHeader>
                <CardTitle className="text-white">Verification Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-semibold">Satellite Monitoring</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Real-time forest coverage analysis</div>
                </div>
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-semibold">IoT Sensor Network</span>
                    <Badge className="bg-blue-600">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Ground-based environmental sensors</div>
                </div>
                <div className="p-4 bg-purple-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-semibold">Community Reporting</span>
                    <Badge className="bg-purple-600">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Verified community observations</div>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-orange-400 font-semibold">Third-party Audits</span>
                    <Badge className="bg-orange-600">Monthly</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Independent verification partners</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SDG Alignment */}
        <Card className="mb-8 border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Target className="h-5 w-5" />
              UN Sustainable Development Goals Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">SDG 13</div>
                <div className="text-sm text-muted-foreground mb-2">Climate Action</div>
                <Progress value={89} className="h-2 mb-2" />
                <Badge className="bg-green-600">89% Aligned</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">SDG 15</div>
                <div className="text-sm text-muted-foreground mb-2">Life on Land</div>
                <Progress value={94} className="h-2 mb-2" />
                <Badge className="bg-blue-600">94% Aligned</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">SDG 6</div>
                <div className="text-sm text-muted-foreground mb-2">Clean Water</div>
                <Progress value={76} className="h-2 mb-2" />
                <Badge className="bg-purple-600">76% Aligned</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carbon Credit Management */}
        <Card className="mb-8 border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-5 w-5" />
              Carbon Credit Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">847K</div>
                <p className="text-sm text-muted-foreground">Credits Generated</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">623K</div>
                <p className="text-sm text-muted-foreground">Credits Sold</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">$18.42</div>
                <p className="text-sm text-muted-foreground">Average Price/Credit</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">$11.5M</div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="border-gray-500/20 bg-gradient-to-r from-gray-900/20 to-black/20">
          <CardHeader>
            <CardTitle className="text-center text-white">System Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">99.8%</div>
                <p className="text-sm text-muted-foreground">Data Accuracy</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <p className="text-sm text-muted-foreground">Monitoring Coverage</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">1.2s</div>
                <p className="text-sm text-muted-foreground">Update Frequency</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">47</div>
                <p className="text-sm text-muted-foreground">Countries Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
