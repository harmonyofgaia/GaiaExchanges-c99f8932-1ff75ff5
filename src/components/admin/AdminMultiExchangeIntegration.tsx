import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MultiExchangeIntegration } from '@/components/MultiExchangeIntegration'
import { Badge } from '@/components/ui/badge'
import { Lock, Shield, Building2 } from 'lucide-react'

export function AdminMultiExchangeIntegration() {
  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400 text-2xl">
            <img src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png" alt="Harmony of Gaia" className="w-8 h-8" />
            🔒 ADMIN-ONLY: Multi-Exchange Integration System
            <Building2 className="h-6 w-6" />
          </CardTitle>
          <p className="text-blue-400">
            Comprehensive exchange listing management • Integration monitoring • Administrative controls
          </p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-red-600 text-white">RESTRICTED ACCESS</Badge>
            <Badge className="bg-cyan-600 text-white">ADMIN PORTAL</Badge>
            <Badge className="bg-blue-600 text-white">INTEGRATION CONTROL</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-bold text-cyan-300">ADMINISTRATIVE NOTICE</span>
            </div>
            <p className="text-xs text-cyan-200">
              This module provides full administrative control over all exchange integrations, listing processes, 
              and partnership negotiations. Access is restricted to authorized administrative personnel with 
              appropriate security clearance and exchange management permissions.
            </p>
            <div className="mt-2 text-xs text-blue-300">
              Security Level: Maximum • Admin Session: Active • Exchange Partners: 47 Active
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Exchange Integration Component */}
      <MultiExchangeIntegration />
    </div>
  )
}