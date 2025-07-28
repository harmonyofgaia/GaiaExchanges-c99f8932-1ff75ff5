
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Activity, AlertTriangle, CheckCircle, Zap, Globe } from 'lucide-react'
import { toast } from 'sonner'
import HoverSidebar from '@/components/HoverSidebar'

export function GaiaConsistencyStatus() {
  const [systemStatus] = useState({
    overall: 'Optimal',
    consistency: 97.8,
    networks: 12,
    activeNodes: 1547,
    globalHealth: 'Excellent'
  })

  const [criticalSystems] = useState([
    { name: 'Forest Protection Network', status: 'Active', consistency: 99.2, nodes: 234 },
    { name: 'Ocean Monitoring Grid', status: 'Active', consistency: 96.8, nodes: 189 },
    { name: 'Air Quality Sensors', status: 'Warning', consistency: 87.3, nodes: 456 },
    { name: 'Climate Data Processing', status: 'Active', consistency: 98.9, nodes: 678 }
  ])

  const refreshStatus = () => {
    toast.success('🌍 GAiA Status Updated!', {
      description: 'All environmental systems synchronized',
      duration: 4000
    })
    console.log('GAiA consistency status refreshed')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600'
      case 'Warning': return 'bg-yellow-600'
      case 'Critical': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-5 w-5" />
      case 'Warning': return <AlertTriangle className="h-5 w-5" />
      case 'Critical': return <AlertTriangle className="h-5 w-5" />
      default: return <Activity className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                🌍 GAiA CONSISTENCY STATUS
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Global Environmental Intelligence Network Monitoring
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">🌍 Overview</TabsTrigger>
              <TabsTrigger value="networks">🔗 Networks</TabsTrigger>
              <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
              <TabsTrigger value="alerts">⚠️ Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* System Overview */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{systemStatus.overall}</div>
                    <div className="text-sm text-muted-foreground">System Status</div>
                  </CardContent>
                </Card>
                <Card className="border-blue-500/30">
                  <CardContent className="p-4 text-center">
                    <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-400">{systemStatus.consistency}%</div>
                    <div className="text-sm text-muted-foreground">Consistency</div>
                  </CardContent>
                </Card>
                <Card className="border-purple-500/30">
                  <CardContent className="p-4 text-center">
                    <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">{systemStatus.networks}</div>
                    <div className="text-sm text-muted-foreground">Networks</div>
                  </CardContent>
                </Card>
                <Card className="border-cyan-500/30">
                  <CardContent className="p-4 text-center">
                    <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-cyan-400">{systemStatus.activeNodes}</div>
                    <div className="text-sm text-muted-foreground">Active Nodes</div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-500/30">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-400">{systemStatus.globalHealth}</div>
                    <div className="text-sm text-muted-foreground">Global Health</div>
                  </CardContent>
                </Card>
              </div>

              {/* Critical Systems */}
              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">🔧 Critical Systems Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criticalSystems.map((system, index) => (
                    <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(system.status)}
                          <div>
                            <span className="font-medium text-white">{system.name}</span>
                            <p className="text-sm text-muted-foreground">{system.nodes} active nodes</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Consistency Level</span>
                          <span>{system.consistency}%</span>
                        </div>
                        <Progress value={system.consistency} className="h-2" />
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={refreshStatus}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Refresh Status
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="networks" className="space-y-6">
              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400">🔗 Network Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-green-400" />
                    <p className="text-lg">Environmental network topology</p>
                    <p className="text-sm">Monitor and manage global sensor networks</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">📊 Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-lg">System performance metrics</p>
                    <p className="text-sm">Analyze consistency trends and optimization opportunities</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">⚠️ Alert Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <p className="text-lg">System alerts and notifications</p>
                    <p className="text-sm">Monitor critical events and system warnings</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default GaiaConsistencyStatus
