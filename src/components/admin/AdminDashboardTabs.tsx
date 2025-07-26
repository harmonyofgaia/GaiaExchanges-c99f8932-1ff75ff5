
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Menu, X } from 'lucide-react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      {/* Desktop Navigation - Show first 6 tabs directly, rest in More menu */}
      <div className="hidden lg:block">
        <TabsList className="grid w-full grid-cols-7">
          {tabs.slice(0, 6).map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 px-4 py-2 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/95 border-primary/30 backdrop-blur-sm">
              {tabs.slice(6).map((tab) => (
                <DropdownMenuItem 
                  key={tab.value} 
                  onClick={() => setActiveTab(tab.value)}
                  className={`cursor-pointer ${activeTab === tab.value ? 'bg-primary/20 text-primary' : ''}`}
                >
                  {tab.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TabsList>
      </div>

      {/* Mobile Navigation - Hamburger Menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b border-primary/30">
          <h2 className="text-lg font-semibold text-primary">{getActiveTabLabel()}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary hover:bg-primary/10"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {mobileMenuOpen && (
          <div className="border-b border-primary/30 bg-background/95 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-1 p-4">
              {tabs.map((tab) => (
                <Button
                  key={tab.value}
                  variant={activeTab === tab.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveTab(tab.value)
                    setMobileMenuOpen(false)
                  }}
                  className="justify-start text-xs"
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        )}
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
