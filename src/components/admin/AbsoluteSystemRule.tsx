import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SynaticIAEngine } from './SynaticIAEngine'
import { SystemRuleEnforcement } from './SystemRuleEnforcement'
import { Shield, AlertTriangle, Crown, Check, X, Brain, Activity, Lock } from 'lucide-react'

export function AbsoluteSystemRule() {
  const [ruleComplianceScore, setRuleComplianceScore] = useState(100)
  const [activeSessions, setActiveSessions] = useState(12)
  const [protectedRoutes, setProtectedRoutes] = useState(16)

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400 text-xl">
            <AlertTriangle className="h-6 w-6" />
            🚨 ABSOLUTE SYSTEM RULE - CRITICAL PROTECTION
          </CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <Badge className="bg-red-600 text-red-100">CRITICAL</Badge>
            <Badge className="bg-orange-600 text-orange-100">MANDATORY</Badge>
            <Badge className="bg-yellow-600 text-yellow-100">ADMIN ONLY</Badge>
            <Badge className="bg-green-600 text-green-100">SYNATIC IA ACTIVE</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{ruleComplianceScore}%</div>
              <p className="text-sm text-muted-foreground">Rule Compliance</p>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded-lg border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">{activeSessions}</div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{protectedRoutes}</div>
              <p className="text-sm text-muted-foreground">Protected Routes</p>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">15,420+</div>
              <p className="text-sm text-muted-foreground">Protected Users</p>
            </div>
          </div>

          {/* Four Mandatory Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-red-900/20 border-red-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-red-400 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  🚨 Absolute System Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  NO existing system functionality can be modified, overwritten, or deleted without explicit admin approval.
                </p>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400">ACTIVE & ENFORCED</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-orange-400 flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  👑 Admin-Only Approval Authority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  Only admin can approve changes via Synatic IA Engine interaction and authorization.
                </p>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400">SYNATIC IA CONNECTED</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-900/20 border-yellow-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-yellow-400 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  🔍 Mandatory Duplicate Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  Automated scanning prevents duplicate routings or conflicting features.
                </p>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400">SCANNING ACTIVE</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-green-400 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  ✅ Explicit Duplicate Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-2">
                  Dedicated approval workflow for potential duplicates with admin confirmation.
                </p>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400">WORKFLOW READY</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ia-engine" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ia-engine" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Synatic IA Engine
          </TabsTrigger>
          <TabsTrigger value="enforcement" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Rule Enforcement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ia-engine" className="space-y-6">
          <SynaticIAEngine />
        </TabsContent>

        <TabsContent value="enforcement" className="space-y-6">
          <SystemRuleEnforcement />
        </TabsContent>
      </Tabs>
    </div>
  )
}