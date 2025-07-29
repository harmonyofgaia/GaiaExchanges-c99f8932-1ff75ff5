import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { globalSurveillance } from '@/services/globalSurveillance'
import { Satellite, Eye, Globe, Radar, Activity, Database } from 'lucide-react'

export function GlobalSurveillanceDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    satelliteNetwork: { total: 0, active: 0, threats: 0 },
    deepWebMonitoring: { layers: 0, threats: 0, intelligence: 0 },
    governmentIntegration: { agencies: 0, feeds: 0, classification: 'UNCLASSIFIED' },
    internationalCoordination: { partners: 0, threats: 0, responses: 0 }
  })

  useEffect(() => {
    const updateStatus = () => {
      setStatus(globalSurveillance.getGlobalSurveillanceStatus())
    }

    const interval = setInterval(updateStatus, 2000)
    updateStatus()

    return () => clearInterval(interval)
  }, [])

  const handleInitializeGlobalSurveillance = async () => {
    try {
      await globalSurveillance.initializeGlobalSurveillanceSystem()
      toast.success('🛰️ Global Surveillance System Activated')
    } catch (error) {
      toast.error('Failed to initialize global surveillance')
    }
  }

  const handleDeploySatelliteNetwork = async () => {
    try {
      await globalSurveillance.deploySatelliteNetwork()
    } catch (error) {
      toast.error('Failed to deploy satellite network')
    }
  }

  const handleCreateDeepWebMonitor = async () => {
    try {
      await globalSurveillance.deploySatelliteNetwork()
    } catch (error) {
      toast.error('Failed to deploy satellite network')
    }
  }

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Satellite className="h-6 w-6 text-primary" />
          Phase 8: Global Surveillance & Intelligence Network
          <Badge variant={status.isActive ? "default" : "secondary"}>
            {status.isActive ? "MONITORING" : "OFFLINE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Satellite className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Satellites</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.satelliteNetwork.total}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Nodes</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.satelliteNetwork.active}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Threats Detected</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.satelliteNetwork.threats}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Deep Web Layers</span>
            </div>
            <div className="text-xl font-bold">{status.deepWebMonitoring.layers}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Gov Agencies</span>
            </div>
            <div className="text-xl font-bold">{status.governmentIntegration.agencies}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">International Partners</span>
            </div>
            <div className="text-xl font-bold">{status.internationalCoordination.partners}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeGlobalSurveillance} size="sm">
            <Satellite className="h-4 w-4 mr-2" />
            Initialize Global Surveillance
          </Button>
          
          <Button onClick={handleDeploySatelliteNetwork} variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            Deploy Satellite Network
          </Button>
          
          <Button onClick={handleCreateDeepWebMonitor} variant="outline" size="sm">
            <Radar className="h-4 w-4 mr-2" />
            Deploy Deep Web Monitor
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Active Surveillance Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Satellite Network</Badge>
            <Badge variant="default">Quantum Radar Array</Badge>
            <Badge variant="default">Global Intelligence Grid</Badge>
            <Badge variant="default">Predictive Threat Analysis</Badge>
            <Badge variant="default">Real-time Monitoring</Badge>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🛰️ Total Global Awareness Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Our global surveillance system provides complete planetary monitoring 
            through quantum radar, satellite networks, and predictive intelligence. 
            Total situational awareness achieved.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}