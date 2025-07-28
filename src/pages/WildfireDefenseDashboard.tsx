
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Flame, 
  Shield, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Thermometer,
  Wind,
  Droplets,
  Zap,
  Map,
  Users
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function WildfireDefenseDashboard() {
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [cannonStatus, setCannonStatus] = useState('active')

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            🔥 Wildfire Defense Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time monitoring and sand blast cannon control system
          </p>
        </div>

        {/* Alert Status */}
        <div className="mb-8">
          <Alert className="border-red-500/50 bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>High Risk Warning:</strong> Extreme fire weather conditions detected in Sector 7. 
              Sand cannons are on standby and ready for deployment.
            </AlertDescription>
          </Alert>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-500/20 bg-gradient-to-br from-red-900/20 to-red-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-400">Active Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Flame className="h-8 w-8 text-red-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-red-400">{activeAlerts}</div>
                  <p className="text-xs text-muted-foreground">High priority zones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-orange-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-400">Sand Cannons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-orange-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-orange-400">847</div>
                  <p className="text-xs text-muted-foreground">Ready for deployment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Protected Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Map className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-400">2.4M</div>
                  <p className="text-xs text-muted-foreground">Hectares covered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Response Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">156</div>
                  <p className="text-xs text-muted-foreground">Teams on standby</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Conditions */}
        <Card className="mb-8 border-yellow-500/20 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Activity className="h-5 w-5" />
              Environmental Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Thermometer className="h-6 w-6 text-red-400 mr-2" />
                  <span className="text-2xl font-bold text-red-400">42°C</span>
                </div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <Badge variant="destructive" className="mt-1">Critical</Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Wind className="h-6 w-6 text-orange-400 mr-2" />
                  <span className="text-2xl font-bold text-orange-400">28</span>
                </div>
                <p className="text-sm text-muted-foreground">Wind Speed (km/h)</p>
                <Badge variant="outline" className="border-orange-500/50 text-orange-400 mt-1">High</Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Droplets className="h-6 w-6 text-blue-400 mr-2" />
                  <span className="text-2xl font-bold text-blue-400">12%</span>
                </div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <Badge variant="destructive" className="mt-1">Critical</Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-purple-400 mr-2" />
                  <span className="text-2xl font-bold text-purple-400">High</span>
                </div>
                <p className="text-sm text-muted-foreground">Fire Danger Index</p>
                <Badge variant="destructive" className="mt-1">Extreme</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sand Cannon Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Target className="h-5 w-5" />
                Sand Cannon Control Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">System Status</span>
                <Badge className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Cannons Ready</span>
                <span className="text-green-400 font-bold">847/850</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Sand Reserves</span>
                <span className="text-blue-400 font-bold">94%</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => setCannonStatus('emergency')}
                >
                  Emergency Deploy
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-orange-500/50 text-orange-400"
                  onClick={() => setCannonStatus('standby')}
                >
                  Standby Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Activity className="h-5 w-5" />
                Recent Deployments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Sector 12 - Pine Ridge</div>
                    <div className="text-sm text-muted-foreground">2 hours ago</div>
                  </div>
                  <Badge className="bg-green-600">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Sector 7 - Oak Valley</div>
                    <div className="text-sm text-muted-foreground">5 hours ago</div>
                  </div>
                  <Badge className="bg-green-600">Success</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Sector 3 - Cedar Hills</div>
                    <div className="text-sm text-muted-foreground">1 day ago</div>
                  </div>
                  <Badge className="bg-green-600">Success</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics */}
        <Card className="border-gray-500/20 bg-gradient-to-r from-gray-900/20 to-black/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Defense System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">98.7%</div>
                <p className="text-sm text-muted-foreground">Fire Prevention Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">2.3s</div>
                <p className="text-sm text-muted-foreground">Average Response Time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">847</div>
                <p className="text-sm text-muted-foreground">Successful Deployments</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">99.2%</div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
