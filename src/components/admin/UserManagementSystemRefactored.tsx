
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield } from 'lucide-react'
import { UserControlPanel } from './UserControlPanel'
import { IPControlCenter } from './IPControlCenter'
import { QuickActionsPanel } from './QuickActionsPanel'
import { ChatSecurityPanel } from './ChatSecurityPanel'
import { EnhancedUserAnalytics } from './EnhancedUserAnalytics'

export function UserManagementSystemRefactored() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            🛡️ GAIA Admin Control Center - User & IP Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analytics">Enhanced Analytics</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="ip-control">IP Control Center</TabsTrigger>
              <TabsTrigger value="actions">Quick Actions</TabsTrigger>
              <TabsTrigger value="chat-security">Chat Security</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-4">
              <EnhancedUserAnalytics />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <UserControlPanel />
            </TabsContent>

            <TabsContent value="ip-control" className="space-y-4">
              <IPControlCenter />
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <QuickActionsPanel />
            </TabsContent>

            <TabsContent value="chat-security" className="space-y-4">
              <ChatSecurityPanel />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
