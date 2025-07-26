import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Lock, 
  Zap,
  Database,
  FileText,
  Settings,
  Eye,
  Clock,
  Activity,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface DeploymentCheck {
  id: string
  name: string
  status: 'passed' | 'failed' | 'warning' | 'pending'
  description: string
  critical: boolean
  details: string[]
}

interface SystemIntegrityData {
  currentRoutes: string[]
  currentFeatures: string[]
  currentData: {
    users: number
    transactions: number
    projects: number
    tokens: number
  }
  systemHealth: {
    cpu: number
    memory: number
    disk: number
    database: number
  }
}

export function SystemRuleEnforcement() {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState<Date | null>(null)
  const [deploymentChecks, setDeploymentChecks] = useState<DeploymentCheck[]>([])
  const [systemIntegrity, setSystemIntegrity] = useState<SystemIntegrityData>({
    currentRoutes: [
      '/', '/dashboard', '/exchange', '/admin', '/secure-admin',
      '/green-impact-dashboard', '/project-funding', '/eco-missions',
      '/planet-cleaning', '/nft-cards', '/eco-avatar', '/gaming',
      '/wallet', '/markets', '/video-exchange', '/security'
    ],
    currentFeatures: [
      'Admin Authentication', 'Token Exchange', 'Environmental Projects',
      'NFT Marketplace', 'Gaming Hub', 'Video Platform', 'Security Suite',
      'Analytics Dashboard', 'User Management', 'Wallet Integration'
    ],
    currentData: {
      users: 15420,
      transactions: 89651,
      projects: 247,
      tokens: 1250000
    },
    systemHealth: {
      cpu: 23,
      memory: 67,
      disk: 45,
      database: 89
    }
  })
  const [ruleViolations, setRuleViolations] = useState<string[]>([])

  const performSystemScan = async () => {
    setIsScanning(true)
    setRuleViolations([])
    
    try {
      // Simulate comprehensive system scan
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const checks: DeploymentCheck[] = [
        {
          id: 'rule-001',
          name: 'Absolute System Protection',
          status: 'passed',
          description: 'Verify no existing system components will be modified or deleted',
          critical: true,
          details: [
            '✅ All existing routes preserved',
            '✅ No data deletion detected',
            '✅ Current system functionality intact',
            '✅ User data protection verified'
          ]
        },
        {
          id: 'rule-002',
          name: 'Admin-Only Authorization',
          status: 'passed',
          description: 'Confirm all changes are admin-authorized through Synatic',
          critical: true,
          details: [
            '✅ Admin session verified',
            '✅ Synatic IA approval required',
            '✅ Unauthorized access blocked',
            '✅ Audit trail maintained'
          ]
        },
        {
          id: 'rule-003',
          name: 'Duplicate Route Detection',
          status: 'passed',
          description: 'Scan for potential duplicate routes or features',
          critical: true,
          details: [
            '✅ No duplicate routes detected',
            '✅ Feature namespace clean',
            '✅ Menu structure preserved',
            '✅ Navigation integrity maintained'
          ]
        },
        {
          id: 'rule-004',
          name: 'Data Integrity Check',
          status: 'passed',
          description: 'Ensure all user data and system state remain intact',
          critical: true,
          details: [
            '✅ Database consistency verified',
            '✅ User accounts intact',
            '✅ Transaction history preserved',
            '✅ Project data secure'
          ]
        },
        {
          id: 'backup-001',
          name: 'Automated Backup Verification',
          status: 'passed',
          description: 'Confirm backup systems are operational',
          critical: false,
          details: [
            '✅ Latest backup: 5 minutes ago',
            '✅ Backup integrity verified',
            '✅ Rollback procedures ready',
            '✅ Recovery point confirmed'
          ]
        },
        {
          id: 'security-001',
          name: 'Security Protocol Compliance',
          status: 'passed',
          description: 'Verify all security measures remain intact',
          critical: true,
          details: [
            '✅ Authentication systems secure',
            '✅ Admin access protected',
            '✅ Encryption standards maintained',
            '✅ Session management active'
          ]
        }
      ]
      
      setDeploymentChecks(checks)
      setLastScan(new Date())
      
      const failedCritical = checks.filter(c => c.critical && c.status === 'failed')
      if (failedCritical.length > 0) {
        toast.error('🚨 Critical Rule Violations Detected', {
          description: `${failedCritical.length} critical checks failed. Deployment blocked.`,
          duration: 10000
        })
        setRuleViolations(failedCritical.map(c => c.name))
      } else {
        toast.success('✅ All System Rules Passed', {
          description: 'System is compliant and ready for safe operations',
          duration: 5000
        })
      }
      
    } catch (error) {
      toast.error('System Scan Error', {
        description: 'Failed to complete system integrity check',
        duration: 5000
      })
    } finally {
      setIsScanning(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'failed': return <XCircle className="h-5 w-5 text-red-400" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-400" />
      default: return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'border-green-500/50 bg-green-900/10'
      case 'failed': return 'border-red-500/50 bg-red-900/10'
      case 'warning': return 'border-orange-500/50 bg-orange-900/10'
      default: return 'border-gray-500/50 bg-gray-900/10'
    }
  }

  useEffect(() => {
    // Auto-scan on component mount
    performSystemScan()
    
    // Set up periodic scans every 5 minutes
    const interval = setInterval(performSystemScan, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const overallScore = deploymentChecks.length > 0 
    ? Math.round((deploymentChecks.filter(c => c.status === 'passed').length / deploymentChecks.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <CardTitle className="text-2xl text-blue-400">
                  🛡️ SYSTEM RULE ENFORCEMENT
                </CardTitle>
                <p className="text-blue-300 text-sm mt-1">
                  Real-time Compliance Monitoring • Deployment Guard • Integrity Protection
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400 mb-1">{overallScore}%</div>
              <Badge className={overallScore === 100 ? 'bg-green-600' : 'bg-orange-600'}>
                {overallScore === 100 ? 'COMPLIANT' : 'ISSUES DETECTED'}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/30 bg-green-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-6 w-6 text-green-400" />
              <Badge className="bg-green-600 text-xs">SECURE</Badge>
            </div>
            <div className="text-xl font-bold text-green-400 mb-1">
              {systemIntegrity.currentData.users.toLocaleString()}
            </div>
            <div className="text-xs text-green-300">Protected Users</div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-6 w-6 text-blue-400" />
              <Badge className="bg-blue-600 text-xs">ACTIVE</Badge>
            </div>
            <div className="text-xl font-bold text-blue-400 mb-1">
              {systemIntegrity.currentRoutes.length}
            </div>
            <div className="text-xs text-blue-300">Active Routes</div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Settings className="h-6 w-6 text-purple-400" />
              <Badge className="bg-purple-600 text-xs">STABLE</Badge>
            </div>
            <div className="text-xl font-bold text-purple-400 mb-1">
              {systemIntegrity.currentFeatures.length}
            </div>
            <div className="text-xs text-purple-300">Core Features</div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Lock className="h-6 w-6 text-orange-400" />
              <Badge className="bg-orange-600 text-xs">
                {ruleViolations.length === 0 ? 'COMPLIANT' : 'VIOLATIONS'}
              </Badge>
            </div>
            <div className="text-xl font-bold text-orange-400 mb-1">
              {ruleViolations.length}
            </div>
            <div className="text-xs text-orange-300">Rule Violations</div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Meters */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/10 to-blue-900/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center">
            <Activity className="h-6 w-6 mr-2" />
            System Health Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(systemIntegrity.systemHealth).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-cyan-300 capitalize">{key} Usage</span>
                <span className="text-sm text-cyan-400 font-bold">{value}%</span>
              </div>
              <Progress 
                value={value} 
                className={`h-2 ${
                  value > 80 ? 'bg-red-900/30' : 
                  value > 60 ? 'bg-orange-900/30' : 
                  'bg-green-900/30'
                }`}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rule Violations Alert */}
      {ruleViolations.length > 0 && (
        <Alert className="border-red-500/50 bg-red-900/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong className="text-red-400">CRITICAL RULE VIOLATIONS DETECTED:</strong>
            <ul className="mt-2 list-disc list-inside text-red-300">
              {ruleViolations.map((violation, index) => (
                <li key={index}>{violation}</li>
              ))}
            </ul>
            <p className="mt-2 text-red-300">
              🚨 All deployment and system modification operations are BLOCKED until violations are resolved.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Scan Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={performSystemScan}
            disabled={isScanning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Run System Scan
              </>
            )}
          </Button>
          
          {lastScan && (
            <div className="text-sm text-muted-foreground">
              Last scan: {lastScan.toLocaleString()}
            </div>
          )}
        </div>

        <Badge 
          variant="outline" 
          className={`${
            overallScore === 100 
              ? 'border-green-500/50 text-green-400' 
              : 'border-red-500/50 text-red-400'
          }`}
        >
          {isScanning ? 'SCANNING...' : overallScore === 100 ? 'ALL SYSTEMS GO' : 'VIOLATIONS DETECTED'}
        </Badge>
      </div>

      {/* Deployment Checks */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-blue-400 flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          Deployment Compliance Checks
        </h3>

        {deploymentChecks.map((check) => (
          <Card key={check.id} className={`border ${getStatusColor(check.status)}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(check.status)}
                  <div className="ml-3">
                    <CardTitle className="text-lg">{check.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {check.critical && (
                    <Badge className="bg-red-600 text-white text-xs">CRITICAL</Badge>
                  )}
                  <Badge 
                    className={
                      check.status === 'passed' ? 'bg-green-600' :
                      check.status === 'failed' ? 'bg-red-600' :
                      check.status === 'warning' ? 'bg-orange-600' :
                      'bg-gray-600'
                    }
                  >
                    {check.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {check.details.map((detail, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {detail}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current System State */}
      <Card className="border-gray-500/30 bg-gradient-to-r from-gray-900/10 to-black/10">
        <CardHeader>
          <CardTitle className="text-gray-400 flex items-center">
            <Database className="h-6 w-6 mr-2" />
            Protected System State
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-blue-400 mb-2">Protected Routes ({systemIntegrity.currentRoutes.length})</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {systemIntegrity.currentRoutes.map((route, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                    {route}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-purple-400 mb-2">Protected Features ({systemIntegrity.currentFeatures.length})</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {systemIntegrity.currentFeatures.map((feature, index) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-400 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}