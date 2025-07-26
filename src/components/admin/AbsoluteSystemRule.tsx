import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Crown, 
  Bot,
  Lock,
  Search,
  Plus,
  Eye,
  FileText,
  Settings,
  Activity
} from 'lucide-react'
import { toast } from 'sonner'
import { SynaticIAEngine } from './SynaticIAEngine'
import { SystemRuleEnforcement } from './SystemRuleEnforcement'

interface SystemRule {
  id: string
  title: string
  description: string
  mandatory: boolean
  category: 'upgrade' | 'feature' | 'deployment' | 'security'
}

interface PendingChange {
  id: string
  type: 'upgrade' | 'feature' | 'route'
  name: string
  description: string
  requestedBy: string
  synaticApproval: boolean
  adminApproval: boolean
  duplicateCheck: 'pending' | 'clear' | 'duplicate_found'
  duplicates?: string[]
  timestamp: Date
  status: 'pending' | 'approved' | 'rejected'
}

export function AbsoluteSystemRule() {
  const [activeTab, setActiveTab] = useState<'rules' | 'pending' | 'synatic' | 'duplicate-check' | 'enforcement'>('rules')
  const [pendingChanges, setPendingChanges] = useState<PendingChange[]>([])

  const systemRules: SystemRule[] = [
    {
      id: 'absolute-rule-001',
      title: '🚨 ABSOLUTE SYSTEM PROTECTION RULE',
      description: 'Every new upgrade, feature, or task MUST NOT change, overwrite, delete, or negatively affect any part of the current running system or its data.',
      mandatory: true,
      category: 'upgrade'
    },
    {
      id: 'admin-approval-002',
      title: '👑 ADMIN-ONLY APPROVAL AUTHORITY',
      description: 'Only admin can approve new changes, features, or upgrades, and only if the admin has specifically requested them via interaction with the Copilot bot Synatic (the IA engine).',
      mandatory: true,
      category: 'feature'
    },
    {
      id: 'duplicate-check-003',
      title: '🔍 MANDATORY DUPLICATE DETECTION',
      description: 'Before adding any new upgrade or feature, the system must check and confirm that there will never be duplicate routings or features added to the current running system.',
      mandatory: true,
      category: 'deployment'
    },
    {
      id: 'explicit-approval-004',
      title: '✅ EXPLICIT DUPLICATE APPROVAL',
      description: 'If a potential duplicate is found, the new route or feature will only be added if the admin explicitly approves it inside a dedicated approval message box, preventing a messy or cluttered menu.',
      mandatory: true,
      category: 'security'
    }
  ]

  const performDuplicateCheck = (featureName: string): { hasDuplicates: boolean; duplicates: string[] } => {
    // This would integrate with actual routing and feature detection
    const existingFeatures = [
      '/admin', '/secure-admin', '/dashboard', '/exchange', 
      '/green-impact-dashboard', '/project-funding', '/eco-missions'
    ]
    
    const duplicates = existingFeatures.filter(feature => 
      feature.includes(featureName.toLowerCase()) || 
      featureName.toLowerCase().includes(feature.replace('/', '').replace('-', ' '))
    )
    
    return {
      hasDuplicates: duplicates.length > 0,
      duplicates
    }
  }

  const addPendingChange = () => {
    const featureName = (document.getElementById('new-feature-name') as HTMLInputElement)?.value
    const description = (document.getElementById('new-feature-description') as HTMLTextAreaElement)?.value
    
    if (!featureName || !description) {
      toast.error('Please fill in all fields')
      return
    }

    const duplicateCheck = performDuplicateCheck(featureName)
    
    const newChange: PendingChange = {
      id: `change-${Date.now()}`,
      type: 'feature',
      name: featureName,
      description,
      requestedBy: 'Synatic',
      synaticApproval: true,
      adminApproval: false,
      duplicateCheck: duplicateCheck.hasDuplicates ? 'duplicate_found' : 'clear',
      duplicates: duplicateCheck.duplicates,
      timestamp: new Date(),
      status: 'pending'
    }

    setPendingChanges(prev => [newChange, ...prev])
    
    if (duplicateCheck.hasDuplicates) {
      toast.warning('⚠️ Potential duplicates detected', {
        description: `Found ${duplicateCheck.duplicates.length} similar features. Admin approval required.`,
        duration: 7000
      })
    } else {
      toast.success('✅ No duplicates found', {
        description: 'Feature ready for admin approval',
        duration: 5000
      })
    }
  }

  const approveChange = (changeId: string) => {
    setPendingChanges(prev => 
      prev.map(change => 
        change.id === changeId 
          ? { ...change, adminApproval: true, status: 'approved' }
          : change
      )
    )
    toast.success('✅ Change approved by admin', {
      description: 'Feature can now be safely deployed',
      duration: 5000
    })
  }

  const rejectChange = (changeId: string) => {
    setPendingChanges(prev => 
      prev.map(change => 
        change.id === changeId 
          ? { ...change, status: 'rejected' }
          : change
      )
    )
    toast.error('❌ Change rejected by admin', {
      description: 'Feature deployment blocked',
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center p-6 bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <Crown className="h-8 w-8 text-yellow-400 mr-3" />
          <Shield className="h-10 w-10 text-red-400" />
          <AlertTriangle className="h-8 w-8 text-orange-400 ml-3" />
        </div>
        <h1 className="text-3xl font-bold text-red-400 mb-2">
          🚨 ABSOLUTE SYSTEM RULE 🚨
        </h1>
        <p className="text-lg text-orange-300">
          Master Protection Protocol for Admin Upgrades & Feature Additions
        </p>
        <Badge className="mt-3 bg-red-600 text-white font-bold text-sm">
          MANDATORY • NON-NEGOTIABLE • SYSTEM CRITICAL
        </Badge>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setActiveTab('rules')}
          variant={activeTab === 'rules' ? 'default' : 'outline'}
          className={activeTab === 'rules' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          <Shield className="h-4 w-4 mr-2" />
          System Rules
        </Button>
        <Button
          onClick={() => setActiveTab('synatic')}
          variant={activeTab === 'synatic' ? 'default' : 'outline'}
          className={activeTab === 'synatic' ? 'bg-blue-600 hover:bg-blue-700' : ''}
        >
          <Bot className="h-4 w-4 mr-2" />
          Synatic IA Engine
        </Button>
        <Button
          onClick={() => setActiveTab('enforcement')}
          variant={activeTab === 'enforcement' ? 'default' : 'outline'}
          className={activeTab === 'enforcement' ? 'bg-purple-600 hover:bg-purple-700' : ''}
        >
          <Activity className="h-4 w-4 mr-2" />
          Rule Enforcement
        </Button>
        <Button
          onClick={() => setActiveTab('duplicate-check')}
          variant={activeTab === 'duplicate-check' ? 'default' : 'outline'}
          className={activeTab === 'duplicate-check' ? 'bg-cyan-600 hover:bg-cyan-700' : ''}
        >
          <Search className="h-4 w-4 mr-2" />
          Duplicate Detection
        </Button>
        <Button
          onClick={() => setActiveTab('pending')}
          variant={activeTab === 'pending' ? 'default' : 'outline'}
          className={activeTab === 'pending' ? 'bg-orange-600 hover:bg-orange-700' : ''}
        >
          <Eye className="h-4 w-4 mr-2" />
          Pending Approvals
          {pendingChanges.filter(c => c.status === 'pending').length > 0 && (
            <Badge className="ml-2 bg-red-600">
              {pendingChanges.filter(c => c.status === 'pending').length}
            </Badge>
          )}
        </Button>
      </div>

      {/* System Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <Alert className="border-red-500/50 bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-300">
              <strong>CRITICAL:</strong> These rules are NON-NEGOTIABLE and apply to ALL system modifications, 
              upgrades, and feature additions. Violation of these rules may result in system instability or data loss.
            </AlertDescription>
          </Alert>

          {systemRules.map((rule) => (
            <Card key={rule.id} className="border-orange-500/30 bg-gradient-to-r from-orange-900/10 to-red-900/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-orange-400 flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    {rule.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-red-500/50 text-red-400">
                      {rule.category.toUpperCase()}
                    </Badge>
                    {rule.mandatory && (
                      <Badge className="bg-red-600 text-white">
                        MANDATORY
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{rule.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Synatic IA Engine Tab */}
      {activeTab === 'synatic' && (
        <SynaticIAEngine />
      )}

      {/* System Rule Enforcement Tab */}
      {activeTab === 'enforcement' && (
        <SystemRuleEnforcement />
      )}

      {/* Duplicate Detection Tab */}
      {activeTab === 'duplicate-check' && (
        <div className="space-y-6">
          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/10 to-indigo-900/10">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Search className="h-6 w-6 mr-2" />
                New Feature/Route Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="new-feature-name" className="text-purple-300">
                  Feature/Route Name
                </Label>
                <Input
                  id="new-feature-name"
                  placeholder="e.g., new-admin-feature, enhanced-dashboard"
                  className="bg-black/30 border-purple-500/30 text-purple-100"
                />
              </div>
              
              <div>
                <Label htmlFor="new-feature-description" className="text-purple-300">
                  Description
                </Label>
                <Textarea
                  id="new-feature-description"
                  placeholder="Describe the feature, its purpose, and functionality..."
                  className="bg-black/30 border-purple-500/30 text-purple-100"
                />
              </div>

              <Button
                onClick={addPendingChange}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Check for Duplicates & Add to Queue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pending Approvals Tab */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingChanges.length === 0 ? (
            <Card className="border-gray-500/30">
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No pending changes or approvals</p>
              </CardContent>
            </Card>
          ) : (
            pendingChanges.map((change) => (
              <Card 
                key={change.id} 
                className={`border-2 ${
                  change.status === 'approved' 
                    ? 'border-green-500/50 bg-green-900/10'
                    : change.status === 'rejected'
                    ? 'border-red-500/50 bg-red-900/10'
                    : change.duplicateCheck === 'duplicate_found'
                    ? 'border-orange-500/50 bg-orange-900/10'
                    : 'border-blue-500/50 bg-blue-900/10'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      {change.status === 'approved' ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      ) : change.status === 'rejected' ? (
                        <XCircle className="h-5 w-5 text-red-400 mr-2" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
                      )}
                      {change.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className={
                        change.status === 'approved' ? 'bg-green-600' :
                        change.status === 'rejected' ? 'bg-red-600' :
                        'bg-orange-600'
                      }>
                        {change.status.toUpperCase()}
                      </Badge>
                      {change.duplicateCheck === 'duplicate_found' && (
                        <Badge variant="outline" className="border-orange-500/50 text-orange-400">
                          DUPLICATES FOUND
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{change.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Requested by:</strong> {change.requestedBy}
                    </div>
                    <div>
                      <strong>Timestamp:</strong> {change.timestamp.toLocaleString()}
                    </div>
                    <div>
                      <strong>Synatic Approval:</strong> {change.synaticApproval ? '✅ Yes' : '❌ No'}
                    </div>
                    <div>
                      <strong>Admin Approval:</strong> {change.adminApproval ? '✅ Yes' : '❌ Pending'}
                    </div>
                  </div>

                  {change.duplicates && change.duplicates.length > 0 && (
                    <Alert className="border-orange-500/50 bg-orange-900/20">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Potential duplicates detected:</strong>
                        <ul className="mt-2 list-disc list-inside">
                          {change.duplicates.map((duplicate, index) => (
                            <li key={index} className="text-orange-300">{duplicate}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {change.status === 'pending' && (
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => approveChange(change.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => rejectChange(change.id)}
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-900/20"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}