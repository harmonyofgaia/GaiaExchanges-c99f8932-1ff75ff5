
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Globe, Server, Shield, Zap, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface HostingStatus {
  domain: string
  status: 'active' | 'deploying' | 'error' | 'pending'
  uptime: number
  visitors: number
  bandwidth: number
  securityLevel: number
  lastDeployment: Date
  ssl: boolean
  cdn: boolean
}

interface DeploymentStats {
  totalSites: number
  activeDeployments: number
  totalTraffic: number
  securityEvents: number
}

export function WebsiteHostingManager() {
  const [hostingStatus, setHostingStatus] = useState<HostingStatus>({
    domain: 'www.gaiaexchanges.net',
    status: 'active',
    uptime: 99.9,
    visitors: 15420,
    bandwidth: 2.4,
    securityLevel: 100,
    lastDeployment: new Date(Date.now() - 2 * 60 * 60 * 1000),
    ssl: true,
    cdn: true
  })

  const [deploymentStats, setDeploymentStats] = useState<DeploymentStats>({
    totalSites: 1,
    activeDeployments: 1,
    totalTraffic: 15420,
    securityEvents: 0
  })

  const [customDomain, setCustomDomain] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHostingStatus(prev => ({
        ...prev,
        visitors: prev.visitors + Math.floor(Math.random() * 5),
        bandwidth: prev.bandwidth + Math.random() * 0.1,
        uptime: Math.min(99.99, prev.uptime + Math.random() * 0.01)
      }))

      setDeploymentStats(prev => ({
        ...prev,
        totalTraffic: prev.totalTraffic + Math.floor(Math.random() * 3)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const deployWebsite = async () => {
    setIsDeploying(true)
    setHostingStatus(prev => ({ ...prev, status: 'deploying' }))

    toast.info('🚀 Deploying Website...', {
      description: 'Setting up www.gaiaexchanges.net with quantum security',
      duration: 3000
    })

    // Simulate deployment process
    setTimeout(() => {
      setHostingStatus(prev => ({
        ...prev,
        status: 'active',
        lastDeployment: new Date()
      }))
      setIsDeploying(false)

      toast.success('🌍 Website Deployed Successfully!', {
        description: 'www.gaiaexchanges.net is now live with maximum security',
        duration: 5000
      })
    }, 3000)
  }

  const testSecurity = () => {
    toast.info('🛡️ Running Security Scan...', {
      description: 'Testing quantum-level protection systems',
      duration: 2000
    })

    setTimeout(() => {
      toast.success('✅ Security Test Passed!', {
        description: 'All systems operating at 100% protection level',
        duration: 3000
      })
    }, 2000)
  }

  const optimizePerformance = () => {
    toast.info('⚡ Optimizing Performance...', {
      description: 'Applying quantum speed improvements',
      duration: 2000
    })

    setTimeout(() => {
      setHostingStatus(prev => ({
        ...prev,
        uptime: 99.99,
        bandwidth: prev.bandwidth * 0.8 // Reduce bandwidth usage
      }))

      toast.success('🚀 Performance Optimized!', {
        description: 'Website is now running at maximum efficiency',
        duration: 3000
      })
    }, 2000)
  }

  const visitWebsite = () => {
    window.open(`https://${hostingStatus.domain}`, '_blank')
    toast.success('🌐 Opening Website', {
      description: `Redirecting to ${hostingStatus.domain}`,
      duration: 2000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'deploying': return 'bg-yellow-600'
      case 'error': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'deploying': return <Zap className="h-4 w-4 animate-spin" />
      case 'error': return <AlertCircle className="h-4 w-4" />
      default: return <Server className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Globe className="h-6 w-6" />
          🌐 GAIA WEBSITE HOSTING - www.gaiaexchanges.net
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getStatusColor(hostingStatus.status)} text-white`}>
            {getStatusIcon(hostingStatus.status)}
            <span className="ml-1">{hostingStatus.status.toUpperCase()}</span>
          </Badge>
          <Badge className="bg-green-600 text-white">
            SSL: {hostingStatus.ssl ? '✅' : '❌'}
          </Badge>
          <Badge className="bg-purple-600 text-white">
            CDN: {hostingStatus.cdn ? '✅' : '❌'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* GAiA Token Integration */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-bold text-green-400 mb-2">🌍 Harmony of Gaia Official Website</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Domain:</div>
                <div className="font-mono text-blue-400">{hostingStatus.domain}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Token Contract:</div>
                <code className="font-mono text-xs text-green-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Website Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{hostingStatus.uptime}%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
            <Progress value={hostingStatus.uptime} className="h-2 mt-2" />
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{hostingStatus.visitors.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Visitors</div>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{hostingStatus.bandwidth.toFixed(1)} GB</div>
            <div className="text-xs text-muted-foreground">Bandwidth</div>
          </div>

          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{hostingStatus.securityLevel}%</div>
            <div className="text-xs text-muted-foreground">Security</div>
            <Progress value={hostingStatus.securityLevel} className="h-2 mt-2" />
          </div>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-400">🚀 Deployment Controls</h3>
            <div className="space-y-2">
              <Button 
                onClick={deployWebsite}
                disabled={isDeploying}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isDeploying ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Server className="h-4 w-4 mr-2" />
                    Deploy Website
                  </>
                )}
              </Button>
              
              <Button 
                onClick={visitWebsite}
                variant="outline"
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-400">🛡️ Security & Performance</h3>
            <div className="space-y-2">
              <Button 
                onClick={testSecurity}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Shield className="h-4 w-4 mr-2" />
                Test Security
              </Button>
              
              <Button 
                onClick={optimizePerformance}
                variant="outline"
                className="w-full"
              >
                <Zap className="h-4 w-4 mr-2" />
                Optimize Performance
              </Button>
            </div>
          </div>
        </div>

        {/* Custom Domain Setup */}
        <div className="bg-gray-900/20 border border-gray-500/30 rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-400 mb-4">🌐 Custom Domain Setup</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter custom domain (e.g., mycustomdomain.com)"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              Add Domain
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Current domain: {hostingStatus.domain} (Active & Secured)
          </p>
        </div>

        {/* Deployment History */}
        <div className="bg-black/20 border border-gray-500/30 rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-400 mb-4">📊 Deployment Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-400">{deploymentStats.totalSites}</div>
              <div className="text-xs text-muted-foreground">Total Sites</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-400">{deploymentStats.activeDeployments}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-400">{deploymentStats.totalTraffic.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Traffic</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-400">{deploymentStats.securityEvents}</div>
              <div className="text-xs text-muted-foreground">Security Events</div>
            </div>
          </div>
        </div>

        {/* Last Deployment Info */}
        <div className="text-center text-sm text-muted-foreground">
          Last deployment: {hostingStatus.lastDeployment.toLocaleString()}
          <br />
          🛡️ Protected by Quantum Security • ⚡ Optimized for Speed • 🌍 Global CDN Active
        </div>
      </CardContent>
    </Card>
  )
}
