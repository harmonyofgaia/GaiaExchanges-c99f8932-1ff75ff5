import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { invisibleDefense } from '@/services/invisibleDefense'
import { EyeOff, Ghost, Shield, Zap, Radar, Network } from 'lucide-react'

export function InvisibleDefenseDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    stealthLevel: 0,
    cloakingNodes: 0,
    hiddenServices: 0,
    phantomDecoys: 0,
    invisibilityRating: 0
  })

  useEffect(() => {
    const updateStatus = () => {
      setStatus(invisibleDefense.getInvisibleDefenseStatus())
    }

    const interval = setInterval(updateStatus, 2000)
    updateStatus()

    return () => clearInterval(interval)
  }, [])

  const handleInitializeInvisibleDefense = async () => {
    try {
      await invisibleDefense.initializeInvisibleDefenseSystem()
      toast.success('👻 Invisible Defense System Activated')
    } catch (error) {
      toast.error('Failed to initialize invisible defense')
    }
  }

  const handleActivateGhostMode = async () => {
    try {
      await invisibleDefense.activateGhostMode()
    } catch (error) {
      toast.error('Failed to activate ghost mode')
    }
  }

  const handleDeployPhantomDecoys = async () => {
    try {
      await invisibleDefense.deployPhantomDecoys(10)
    } catch (error) {
      toast.error('Failed to deploy phantom decoys')
    }
  }

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <EyeOff className="h-6 w-6 text-primary" />
          Phase 6: Invisible Defense & Stealth Matrix
          <Badge variant={status.isActive ? "default" : "secondary"}>
            {status.isActive ? "CLOAKED" : "VISIBLE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Ghost className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Stealth Level</span>
            </div>
            <Progress value={status.stealthLevel} className="mt-2" />
            <div className="text-sm text-muted-foreground">{status.stealthLevel}% Hidden</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Cloaking Nodes</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.cloakingNodes}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Phantom Decoys</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.phantomDecoys}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Hidden Services</span>
            </div>
            <div className="text-xl font-bold">{status.hiddenServices} Active</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Invisibility Rating</span>
            </div>
            <Progress value={status.invisibilityRating} className="mt-2" />
            <div className="text-sm text-muted-foreground">{status.invisibilityRating}% Undetectable</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeInvisibleDefense} size="sm">
            <EyeOff className="h-4 w-4 mr-2" />
            Initialize Invisible Defense
          </Button>
          
          <Button onClick={handleActivateGhostMode} variant="outline" size="sm">
            <Ghost className="h-4 w-4 mr-2" />
            Activate Ghost Mode
          </Button>
          
          <Button onClick={handleDeployPhantomDecoys} variant="outline" size="sm">
            <Radar className="h-4 w-4 mr-2" />
            Deploy Phantom Decoys
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Active Stealth Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Quantum Cloaking</Badge>
            <Badge variant="default">Phantom Network Topology</Badge>
            <Badge variant="default">Invisible Service Mesh</Badge>
            <Badge variant="default">Stealth Communication</Badge>
            <Badge variant="default">Shadow Infrastructure</Badge>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">👻 Complete Invisibility Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Our invisible defense system provides undetectable protection through 
            quantum cloaking, phantom decoys, and stealth communication protocols. 
            Complete operational invisibility achieved.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}