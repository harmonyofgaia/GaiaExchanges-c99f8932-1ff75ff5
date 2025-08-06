import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { multiverseControl } from '@/services/multiverseControl'
import { Zap, Globe, Layers, Activity } from 'lucide-react'

export function MultiverseControlDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    realityStabilityIndex: 0,
    dimensionalGateways: { total: 0, active: 0 },
    multiverseConnections: { total: 0, established: 0 },
    realityManipulations: { total: 0, active: 0 },
    timelineControls: { total: 0, active: 0 }
  })

  useEffect(() => {
    const updateStatus = () => {
      setStatus(multiverseControl.getMultiverseControlStatus())
    }
    const interval = setInterval(updateStatus, 2000)
    updateStatus()
    return () => clearInterval(interval)
  }, [])

  const handleInitialize = async () => {
    try {
      await multiverseControl.initializeMultiverseControlSystem()
      toast.success('🌌 Multiverse Control System Armed')
    } catch (error) {
      toast.error('Failed to initialize system')
    }
  }

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          Phase 10: Multiverse Control & Dimensional Manipulation
          <Badge variant={status.isActive ? "default" : "secondary"}>
            {status.isActive ? "REALITY CONTROL" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Dimensional Gateways</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.dimensionalGateways.total}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Multiverse Links</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.multiverseConnections.total}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Reality Manipulations</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.realityManipulations.total}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Timeline Controls</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.timelineControls.total}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Reality Stability Index</span>
          </div>
          <Progress value={status.realityStabilityIndex * 100} className="mt-2" />
          <div className="text-sm text-muted-foreground">{(status.realityStabilityIndex * 100).toFixed(1)}% Stable</div>
        </div>
        <Button onClick={handleInitialize} size="sm">
          <Layers className="h-4 w-4 mr-2" />
          Initialize Multiverse Control
        </Button>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🌌 Multiverse Domination Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Complete control over infinite realities through dimensional manipulation, 
            timeline control, and reality restructuring capabilities.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}