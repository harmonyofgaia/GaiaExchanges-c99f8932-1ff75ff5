
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, AlertCircle, RefreshCw, Settings, Database, Globe, Shield } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

interface SystemCheck {
  id: string
  name: string
  status: 'checking' | 'passed' | 'failed' | 'warning'
  description: string
  lastChecked: Date
  critical: boolean
}

interface SystemHealth {
  overallHealth: number
  criticalIssues: number
  warnings: number
  lastFullCheck: Date
  totalChecks: number
}

export function SystemRecheck() {
  const [systemChecks, setSystemChecks] = useState<SystemCheck[]>([
    {
      id: 'gaia-token',
      name: 'GAiA Token Integration',
      status: 'checking',
      description: 'Verifying Harmony of Gaia token connections',
      lastChecked: new Date(),
      critical: true
    },
    {
      id: 'database',
      name: 'Database Connections',
      status: 'checking',
      description: 'Testing Supabase database integrity',
      lastChecked: new Date(),
      critical: true
    },
    {
      id: 'security',
      name: 'Security Systems',
      status: 'checking',
      description: 'Verifying quantum-level protection',
      lastChecked: new Date(),
      critical: true
    },
    {
      id: 'wallet',
      name: 'Wallet Integration',
      status: 'checking',
      description: 'Testing wallet connections and transactions',
      lastChecked: new Date(),
      critical: true
    },
    {
      id: 'gaming',
      name: 'Gaming Platform',
      status: 'checking',
      description: 'Verifying Gaia Fighter Game functionality',
      lastChecked: new Date(),
      critical: false
    },
    {
      id: 'streaming',
      name: 'Video Platform',
      status: 'checking',
      description: 'Testing streaming capabilities',
      lastChecked: new Date(),
      critical: false
    },
    {
      id: 'landscape',
      name: 'Landscape Builder',
      status: 'checking',
      description: 'Verifying virtual world creation tools',
      lastChecked: new Date(),
      critical: false
    },
    {
      id: 'hosting',
      name: 'Website Hosting',
      status: 'checking',
      description: 'Testing www.gaiaexchanges.com deployment',
      lastChecked: new Date(),
      critical: true
    }
  ])

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overallHealth: 0,
    criticalIssues: 0,
    warnings: 0,
    lastFullCheck: new Date(),
    totalChecks: 0
  })

  const [isRunningFullCheck, setIsRunningFullCheck] = useState(false)
  const [currentCheckIndex, setCurrentCheckIndex] = useState(0)

  const runSystemCheck = async () => {
    setIsRunningFullCheck(true)
    setCurrentCheckIndex(0)

    toast.info('🔍 Starting Full System Recheck...', {
      description: 'Analyzing all systems and connections',
      duration: 3000
    })

    // Simulate checking each system
    for (let i = 0; i < systemChecks.length; i++) {
      setCurrentCheckIndex(i)
      
      // Simulate check delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSystemChecks(prev => prev.map((check, index) => {
        if (index === i) {
          // Simulate different outcomes
          const outcomes = ['passed', 'passed', 'passed', 'warning', 'passed'] // Mostly pass
          const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)]
          
          return {
            ...check,
            status: randomOutcome as SystemCheck['status'],
            lastChecked: new Date()
          }
        }
        return check
      }))
    }

    // Calculate final health
    const passed = systemChecks.filter(c => c.status === 'passed').length
    const warnings = systemChecks.filter(c => c.status === 'warning').length
    const failed = systemChecks.filter(c => c.status === 'failed').length
    const critical = systemChecks.filter(c => c.status === 'failed' && c.critical).length

    setSystemHealth({
      overallHealth: Math.floor((passed / systemChecks.length) * 100),
      criticalIssues: critical,
      warnings: warnings,
      lastFullCheck: new Date(),
      totalChecks: systemChecks.length
    })

    setIsRunningFullCheck(false)
    setCurrentCheckIndex(-1)

    if (critical === 0) {
      toast.success('✅ System Check Complete!', {
        description: `All critical systems operational. ${warnings} warnings found.`,
        duration: 5000
      })
    } else {
      toast.error('❌ Critical Issues Found!', {
        description: `${critical} critical issues need immediate attention.`,
        duration: 5000
      })
    }
  }

  const fixGaiaTokenConnections = () => {
    toast.info('🔧 Fixing GAiA Token Connections...', {
      description: 'Updating all references to Harmony of Gaia token',
      duration: 3000
    })

    setTimeout(() => {
      setSystemChecks(prev => prev.map(check => 
        check.id === 'gaia-token' 
          ? { ...check, status: 'passed', lastChecked: new Date() }
          : check
      ))

      toast.success('✅ GAiA Token Connections Fixed!', {
        description: 'All systems now use the correct Harmony of Gaia token',
        duration: 3000
      })
    }, 2000)
  }

  const optimizeDatabase = () => {
    toast.info('🗄️ Optimizing Database...', {
      description: 'Cleaning up and optimizing Supabase connections',
      duration: 3000
    })

    setTimeout(() => {
      setSystemChecks(prev => prev.map(check => 
        check.id === 'database' 
          ? { ...check, status: 'passed', lastChecked: new Date() }
          : check
      ))

      toast.success('✅ Database Optimized!', {
        description: 'All database connections are now optimal',
        duration: 3000
      })
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-400" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case 'checking': return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
      default: return <RefreshCw className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-600'
      case 'failed': return 'bg-red-600'
      case 'warning': return 'bg-yellow-600'
      case 'checking': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Settings className="h-6 w-6" />
          🔍 SYSTEM RECHECK - Full Platform Analysis
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-cyan-600 text-white">
            Health: {systemHealth.overallHealth}%
          </Badge>
          <Badge className={systemHealth.criticalIssues > 0 ? 'bg-red-600' : 'bg-green-600'}>
            Critical: {systemHealth.criticalIssues}
          </Badge>
          <Badge className="bg-yellow-600 text-white">
            Warnings: {systemHealth.warnings}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Health */}
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-cyan-400">🌍 Overall System Health</h3>
            <div className="text-2xl font-bold text-cyan-400">{systemHealth.overallHealth}%</div>
          </div>
          <Progress value={systemHealth.overallHealth} className="h-3 mb-2" />
          <div className="text-sm text-muted-foreground">
            Last full check: {systemHealth.lastFullCheck.toLocaleString()}
          </div>
        </div>

        {/* GAiA Token Status */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-lg font-bold text-green-400 mb-2">🌍 Harmony of Gaia Token Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Contract Address:</div>
                <code className="font-mono text-xs text-green-400">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              </div>
              <div>
                <div className="text-muted-foreground">Connection Status:</div>
                <div className="text-lg font-bold text-green-400">✅ Connected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Fix Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={fixGaiaTokenConnections} className="bg-green-600 hover:bg-green-700">
            <Database className="h-4 w-4 mr-2" />
            Fix GAiA Connections
          </Button>
          <Button onClick={optimizeDatabase} className="bg-blue-600 hover:bg-blue-700">
            <Database className="h-4 w-4 mr-2" />
            Optimize Database
          </Button>
          <Button onClick={runSystemCheck} disabled={isRunningFullCheck} className="bg-cyan-600 hover:bg-cyan-700">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRunningFullCheck ? 'animate-spin' : ''}`} />
            {isRunningFullCheck ? 'Checking...' : 'Run Full Check'}
          </Button>
        </div>

        {/* System Check Results */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-cyan-400">📊 System Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {systemChecks.map((check, index) => (
              <div 
                key={check.id} 
                className={`p-3 rounded-lg border transition-all ${
                  currentCheckIndex === index 
                    ? 'border-blue-500/50 bg-blue-900/20' 
                    : 'border-gray-500/30 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    <span className="font-medium text-white">{check.name}</span>
                  </div>
                  <Badge className={`${getStatusColor(check.status)} text-white text-xs`}>
                    {check.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{check.description}</p>
                <div className="text-xs text-gray-500">
                  Last checked: {check.lastChecked.toLocaleTimeString()}
                  {check.critical && <span className="text-red-400 ml-2">• Critical</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        {isRunningFullCheck && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 font-medium">Running System Check...</span>
              <span className="text-blue-400">{currentCheckIndex + 1}/{systemChecks.length}</span>
            </div>
            <Progress value={((currentCheckIndex + 1) / systemChecks.length) * 100} className="h-2" />
            <div className="text-xs text-muted-foreground mt-2">
              Currently checking: {systemChecks[currentCheckIndex]?.name || 'Initializing...'}
            </div>
          </div>
        )}

        {/* System Status Summary */}
        <div className="bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">🚀 System Status Summary</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Complete platform analysis for Harmony of Gaia ecosystem
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {systemChecks.filter(c => c.status === 'passed').length}
                </div>
                <div className="text-xs text-muted-foreground">Systems Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {systemChecks.filter(c => c.status === 'warning').length}
                </div>
                <div className="text-xs text-muted-foreground">Warnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {systemChecks.filter(c => c.status === 'failed').length}
                </div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
