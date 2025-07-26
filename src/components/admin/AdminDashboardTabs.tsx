
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { PlanRecoverySystem } from './PlanRecoverySystem'
import { HolisticAnalysis } from './HolisticAnalysis'
import { VideoExchangeDashboard } from './VideoExchangeDashboard'
import { UserManagementSystem } from './UserManagementSystem'
import { PsychohistoricalEngine } from './PsychohistoricalEngine'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { SystemHealthDashboard } from './SystemHealthDashboard'
import { AIHub } from './AIHub'
import { DefenseSystems } from './DefenseSystems'

export function AdminDashboardTabs() {
  const [activeTab, setActiveTab] = useState("control")

  const tabs = [
    { value: "control", label: "Control Center" },
    { value: "video", label: "Video Exchange" },
    { value: "users", label: "User Management" },
    { value: "ai", label: "AI Hub" },
    { value: "defense", label: "Defense Systems" },
    { value: "psycho", label: "Psychohistorical" },
    { value: "media", label: "Media Library" },
    { value: "health", label: "System Health" },
    { value: "security", label: "Security Suite" },
    { value: "tools", label: "Admin Tools" },
    { value: "recovery", label: "Recovery Portal" },
    { value: "plans", label: "Plan Recovery" },
    { value: "analysis", label: "Deep Analysis" }
  ]

  const getActiveTabLabel = () => {
    return tabs.find(tab => tab.value === activeTab)?.label || "Control Center"
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Admin Dashboard Header with Right-top Hamburger Menu */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            {getActiveTabLabel()}
          </h2>
          <p className="text-sm text-muted-foreground">
            Navigate through all {tabs.length} admin systems
          </p>
        </div>
        
        {/* Right-top Hamburger Menu for Admin Dashboard */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/10 p-3"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-background/95 border-primary/30 backdrop-blur-sm w-80 max-h-96 overflow-y-auto"
          >
            <div className="p-3">
              <div className="text-sm font-semibold text-primary mb-3 px-2">
                🌍 GAIA ADMIN DASHBOARD - ALL SYSTEMS
              </div>
              <div className="grid grid-cols-2 gap-1">
                {tabs.map((tab) => (
                  <DropdownMenuItem key={tab.value} asChild>
                    <Button
                      variant={activeTab === tab.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab(tab.value)}
                      className="justify-start text-xs h-8 w-full"
                    >
                      {tab.label}
                    </Button>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="mt-3 p-2 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="text-xs text-green-400 text-center">
                  🛡️ {tabs.length} Security Systems Active
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
      </TabsContent>

      <TabsContent value="video" className="space-y-6">
        <VideoExchangeDashboard />
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <UserManagementSystem />
      </TabsContent>

      <TabsContent value="ai" className="space-y-6">
        <AIHub />
      </TabsContent>

      <TabsContent value="defense" className="space-y-6">
        <DefenseSystems />
      </TabsContent>

      <TabsContent value="psycho" className="space-y-6">
        <PsychohistoricalEngine />
      </TabsContent>

      <TabsContent value="media" className="space-y-6">
        <AdminMediaLibrary />
      </TabsContent>

      <TabsContent value="health" className="space-y-6">
        <SystemHealthDashboard />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <UltimateSecurity />
      </TabsContent>

      <TabsContent value="tools" className="space-y-6">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="recovery" className="space-y-6">
        <AdminRecoveryPortal />
      </TabsContent>

      <TabsContent value="plans" className="space-y-6">
        <PlanRecoverySystem />
      </TabsContent>

      <TabsContent value="analysis" className="space-y-6">
        <HolisticAnalysis />
      </TabsContent>
    </Tabs>
  )
}
