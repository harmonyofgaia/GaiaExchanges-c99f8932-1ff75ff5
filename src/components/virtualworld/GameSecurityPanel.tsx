
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Camera,
  Mic,
  FileText,
  Download,
  Crown
} from 'lucide-react'
import { toast } from 'sonner'
import { ExoticDefenseSystem } from '@/components/security/ExoticDefenseSystem'

interface SecurityThreat {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  blocked: boolean
}

export function GameSecurityPanel() {
  const [securityLevel, setSecurityLevel] = useState(95)
  const [adminVerified, setAdminVerified] = useState(false)
  const [screenshotProtection, setScreenshotProtection] = useState(true)
  const [voiceMonitoring, setVoiceMonitoring] = useState(true)
  const [chatEncryption, setChatEncryption] = useState(true)
  
  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: '1',
      type: 'Unauthorized chat access attempt',
      severity: 'high',
      timestamp: new Date(Date.now() - 5 * 60000),
      blocked: true
    },
    {
      id: '2',
      type: 'Screenshot malware detected',
      severity: 'critical',
      timestamp: new Date(Date.now() - 15 * 60000),
      blocked: true
    },
    {
      id: '3',
      type: 'VR connection tampering',
      severity: 'medium',
      timestamp: new Date(Date.now() - 30 * 60000),
      blocked: true
    }
  ])

  const initiateAdminVerification = () => {
    toast.info('🔐 Initiating Admin Verification...', {
      description: 'Please complete all security steps to access admin features',
      duration: 4000
    })
    
    // Simulate verification process
    setTimeout(() => {
      setAdminVerified(true)
      toast.success('✅ Admin Verification Complete!', {
        description: 'Full admin access granted with highest security clearance',
        duration: 5000
      })
    }, 3000)
  }

  const downloadGAIAPolicies = () => {
    if (!adminVerified) {
      toast.error('🚫 Admin Verification Required', {
        description: 'You must be verified as admin to download GAIA policies',
        duration: 4000
      })
      return
    }

    toast.success('📄 Downloading GAIA Policies...', {
      description: 'Official GAIA policy document will be downloaded',
      duration: 3000
    })
    
    // In a real implementation, this would trigger a PDF download
    console.log('Downloading GAIA Policies PDF...')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-600'
      case 'high': return 'text-orange-400 bg-orange-600'
      case 'medium': return 'text-yellow-400 bg-yellow-600'
      default: return 'text-blue-400 bg-blue-600'
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Security Status Overview */}
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🛡️ GAIA Security Command Center - Exotic Defense Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Security Level */}
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{securityLevel}%</div>
              <div className="text-sm text-muted-foreground mb-3">Security Level</div>
              <Progress value={securityLevel} className="h-3" />
              <Badge className="mt-2 bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                MAXIMUM PROTECTION
              </Badge>
            </div>

            {/* Admin Status */}
            <div className="text-center">
              <div className={`text-4xl mb-2 ${adminVerified ? 'text-green-400' : 'text-yellow-400'}`}>
                {adminVerified ? '👑' : '🔒'}
              </div>
              <div className="text-sm text-muted-foreground mb-3">Admin Status</div>
              {adminVerified ? (
                <Badge className="bg-green-600">
                  <Crown className="h-3 w-3 mr-1" />
                  VERIFIED ADMIN
                </Badge>
              ) : (
                <Button
                  size="sm"
                  onClick={initiateAdminVerification}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <UserCheck className="h-3 w-3 mr-1" />
                  Verify Admin
                </Button>
              )}
            </div>

            {/* Threat Status */}
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">{threats.length}</div>
              <div className="text-sm text-muted-foreground mb-3">Threats Blocked</div>
              <Badge className="bg-red-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                ALL NEUTRALIZED
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Lock className="h-5 w-5" />
            Active Security Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Security Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-green-400" />
                  <Label>Screenshot Protection</Label>
                </div>
                <Switch
                  checked={screenshotProtection}
                  onCheckedChange={setScreenshotProtection}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-blue-400" />
                  <Label>Voice Monitoring</Label>
                </div>
                <Switch
                  checked={voiceMonitoring}
                  onCheckedChange={setVoiceMonitoring}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  <Label>Chat Encryption</Label>
                </div>
                <Switch
                  checked={chatEncryption}
                  onCheckedChange={setChatEncryption}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-yellow-400" />
                  <Label>Activity Monitoring</Label>
                </div>
                <Switch
                  checked={true}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {/* GAIA Policies Section */}
          <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h4 className="font-bold text-cyan-400">GAIA Official Policies</h4>
              </div>
              {adminVerified && (
                <Badge className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Admin Access
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-cyan-200 mb-4">
              Official GAIA policies and guidelines for the virtual world platform. 
              Contains security protocols, user conduct rules, and administrative procedures.
            </p>
            
            <Button
              onClick={downloadGAIAPolicies}
              disabled={!adminVerified}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download GAIA Policies PDF
            </Button>
            
            {!adminVerified && (
              <p className="text-xs text-yellow-400 mt-2">
                ⚠️ Admin verification required to access policy documents
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            Recent Security Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {threats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${threat.blocked ? 'bg-green-400' : 'bg-red-400'}`} />
                  <div>
                    <div className="font-medium text-sm">{threat.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {threat.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(threat.severity)}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                  {threat.blocked && (
                    <Badge className="bg-green-600">
                      BLOCKED
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exotic Defense System */}
      <ExoticDefenseSystem />
    </div>
  )
}
