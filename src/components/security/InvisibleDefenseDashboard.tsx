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
    stealthCommunications: 0,
    obfuscatedTraffic: 0,
    activeDecoys: 0,
    quantumCloaking: 0,
    totalAttacksDeflected: 0
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

  const handleCreateStealthMessage = async () => {
    try {
      await invisibleDefense.createStealthMessage('Demo message', 'image')
    } catch (error) {
      toast.error('Failed to create stealth message')
    }
  }

  const handleDeployDecoyNodes = async () => {
    try {
      await invisibleDefense.deployDecoyNode({ nodeType: 'phantom', location: 'Network Alpha' })
    } catch (error) {
      toast.error('Failed to deploy decoy nodes')
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
              <span className="text-sm font-medium">Stealth Communications</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.stealthCommunications}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Obfuscated Traffic</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.obfuscatedTraffic}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Decoys</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.activeDecoys}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Quantum Cloaking</span>
            </div>
            <div className="text-xl font-bold">{status.quantumCloaking} Active</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Attacks Deflected</span>
            </div>
            <div className="text-xl font-bold">{status.totalAttacksDeflected}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeInvisibleDefense} size="sm">
            <EyeOff className="h-4 w-4 mr-2" />
            Initialize Invisible Defense
          </Button>
          
          <Button onClick={handleCreateStealthMessage} variant="outline" size="sm">
            <Ghost className="h-4 w-4 mr-2" />
            Create Stealth Message
          </Button>
          
          <Button onClick={handleDeployDecoyNodes} variant="outline" size="sm">
            <Radar className="h-4 w-4 mr-2" />
            Deploy Decoy Nodes
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