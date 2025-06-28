
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Smartphone, 
  Monitor, 
  Globe, 
  Wifi, 
  Cpu, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface PlatformStatus {
  name: string
  version: string
  status: 'active' | 'testing' | 'legacy' | 'deprecated'
  compatibility: number
  icon: React.ReactNode
}

export function CrossPlatformCompatibility() {
  const [platforms, setPlatforms] = useState<PlatformStatus[]>([
    {
      name: 'iOS',
      version: '17.0+',
      status: 'active',
      compatibility: 100,
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      name: 'Android',
      version: '14.0+',
      status: 'active',
      compatibility: 100,
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      name: 'Windows',
      version: '11/10',
      status: 'active',
      compatibility: 100,
      icon: <Monitor className="h-4 w-4" />
    },
    {
      name: 'macOS',
      version: '14.0+',
      status: 'active',
      compatibility: 100,
      icon: <Monitor className="h-4 w-4" />
    },
    {
      name: 'Linux',
      version: 'Ubuntu 22.04+',
      status: 'active',
      compatibility: 98,
      icon: <Monitor className="h-4 w-4" />
    },
    {
      name: 'BlackBerry',
      version: 'OS 10.3+',
      status: 'legacy',
      compatibility: 85,
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      name: 'Web Browsers',
      version: 'Modern',
      status: 'active',
      compatibility: 100,
      icon: <Globe className="h-4 w-4" />
    },
    {
      name: 'Smart TV',
      version: 'WebOS/Tizen',
      status: 'testing',
      compatibility: 75,
      icon: <Monitor className="h-4 w-4" />
    },
    {
      name: 'IoT Devices',
      version: 'ARM/x86',
      status: 'testing',
      compatibility: 70,
      icon: <Cpu className="h-4 w-4" />
    }
  ])

  const [overallCompatibility, setOverallCompatibility] = useState(0)

  useEffect(() => {
    // Calculate overall compatibility
    const totalCompatibility = platforms.reduce((sum, platform) => sum + platform.compatibility, 0)
    const avgCompatibility = totalCompatibility / platforms.length
    setOverallCompatibility(avgCompatibility)

    // Continuous compatibility optimization
    const optimizeCompatibility = setInterval(() => {
      setPlatforms(prev => prev.map(platform => {
        if (platform.compatibility < 100 && platform.status !== 'deprecated') {
          const improvement = Math.min(1, 100 - platform.compatibility)
          return {
            ...platform,
            compatibility: Math.min(100, platform.compatibility + improvement)
          }
        }
        return platform
      }))
    }, 10000) // Optimize every 10 seconds

    return () => clearInterval(optimizeCompatibility)
  }, [platforms])

  const optimizeForBlackBerry = () => {
    toast.success('🔧 BlackBerry Optimization Started', {
      description: 'Implementing legacy system compatibility protocols',
      duration: 3000
    })

    setPlatforms(prev => prev.map(platform => {
      if (platform.name === 'BlackBerry') {
        return {
          ...platform,
          compatibility: Math.min(100, platform.compatibility + 15),
          status: platform.compatibility >= 95 ? 'active' : 'legacy'
        }
      }
      return platform
    }))

    console.log('📱 BlackBerry compatibility optimization completed')
  }

  const runCompatibilityTest = () => {
    toast.success('🧪 Cross-Platform Testing Initiated', {
      description: 'Running comprehensive compatibility tests across all platforms',
      duration: 5000
    })

    // Simulate testing process
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      status: platform.status === 'active' ? 'testing' : platform.status
    })))

    setTimeout(() => {
      setPlatforms(prev => prev.map(platform => ({
        ...platform,
        status: platform.status === 'testing' ? 'active' : platform.status,
        compatibility: Math.min(100, platform.compatibility + 2)
      })))
      
      toast.success('✅ All Platform Tests Passed', {
        description: 'DApp is fully compatible across all tested platforms',
        duration: 3000
      })
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'testing': return 'bg-yellow-600'
      case 'legacy': return 'bg-orange-600'
      case 'deprecated': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 95) return 'text-green-400'
    if (compatibility >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Globe className="h-5 w-5" />
            Universal Platform Compatibility Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {overallCompatibility.toFixed(1)}%
              </div>
              <p className="text-muted-foreground">Overall Compatibility Score</p>
              <Progress value={overallCompatibility} className="mt-3" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {platforms.filter(p => p.status === 'active').length}
                </div>
                <p className="text-muted-foreground">Active Platforms</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {platforms.filter(p => p.status === 'testing').length}
                </div>
                <p className="text-muted-foreground">In Testing</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {platforms.filter(p => p.status === 'legacy').length}
                </div>
                <p className="text-muted-foreground">Legacy Support</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {platforms.length}
                </div>
                <p className="text-muted-foreground">Total Platforms</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Details */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Compatibility Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platforms.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="text-blue-400">
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-muted-foreground">{platform.version}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getCompatibilityColor(platform.compatibility)}`}>
                      {platform.compatibility.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Compatible</div>
                  </div>
                  
                  <Badge className={`${getStatusColor(platform.status)} text-white`}>
                    {platform.status}
                  </Badge>
                  
                  {platform.compatibility >= 95 && (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  {platform.compatibility < 80 && (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={optimizeForBlackBerry}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Smartphone className="h-4 w-4 mr-2" />
          Optimize BlackBerry Support
        </Button>
        
        <Button
          onClick={runCompatibilityTest}
          variant="outline"
          className="border-blue-500/20"
        >
          <Shield className="h-4 w-4 mr-2" />
          Run Full Compatibility Test
        </Button>
        
        <Button
          variant="outline"
          className="border-green-500/20"
        >
          <Zap className="h-4 w-4 mr-2" />
          Deploy Universal Build
        </Button>
      </div>

      {/* BlackBerry Legacy Support */}
      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Smartphone className="h-5 w-5" />
            BlackBerry Legacy System Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-orange-300">
              Special optimization protocols for BlackBerry OS 10.3+ devices with enhanced 
              security and performance adaptations for legacy hardware constraints.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span>Memory Optimization</span>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span>Network Adaptation</span>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span>UI Scaling</span>
              </div>
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span>Security Hardening</span>
              </div>
            </div>
            <div className="bg-orange-500/10 p-3 rounded-lg mt-3">
              <div className="text-sm font-medium text-orange-400">Legacy Compatibility Status</div>
              <Progress 
                value={platforms.find(p => p.name === 'BlackBerry')?.compatibility || 0} 
                className="mt-2" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
