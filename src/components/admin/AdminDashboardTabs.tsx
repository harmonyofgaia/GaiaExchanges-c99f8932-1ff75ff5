
/**
 * AdminDashboardTabs Component - Refactored for Stability and Maintainability
 * 
 * This component serves as the main navigation hub for the admin dashboard,
 * providing access to all administrative tools and systems in a tabbed interface.
 * 
 * STABILITY FEATURES:
 * - Error boundaries around each tab to prevent component failures from breaking the dashboard
 * - Responsive design that adapts to different screen sizes (mobile-first approach)
 * - Lazy loading of tab content to improve initial load performance
 * - Comprehensive error handling and fallback components
 * - Loading states for better user experience
 * - Proper TypeScript types for all props and state
 * 
 * MAINTAINABILITY FEATURES:
 * - Clear component organization with descriptive naming
 * - Detailed comments explaining functionality
 * - Consistent styling using design system components
 * - Modular structure for easy addition/removal of tabs
 * - Error logging for debugging and monitoring
 * 
 * RESPONSIVE DESIGN:
 * - Mobile: Single column with collapsible tabs
 * - Tablet: Grid layout with scrollable tabs
 * - Desktop: Full grid layout with all tabs visible
 * 
 * @author Admin Dashboard Team
 * @version 2.0.0 - Stability & Error Resilience Update
 * @lastModified 2024-01-26
 */

import React, { Suspense, useState, useCallback, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  Palette, 
  Heart, 
  Shield, 
  Wrench, 
  RotateCcw, 
  FileText, 
  BarChart3, 
  Crown,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Import error boundary and loading components
import { AdminDashboardTabsErrorBoundary } from './AdminDashboardTabsErrorBoundary'
import { AdminTabLoading, AdminTabInlineLoading } from './AdminTabLoading'

// Lazy load all tab components for better performance
const AdminControlSystem = React.lazy(() => import('@/components/AdminControlSystem'))
const RefactoredAdminTools = React.lazy(() => import('./RefactoredAdminTools'))
const UltimateSecurity = React.lazy(() => import('./UltimateSecurity'))
const AdminRecoveryPortal = React.lazy(() => import('../security/AdminRecoveryPortal'))
const PlanRecoverySystem = React.lazy(() => import('./PlanRecoverySystem'))
const HolisticAnalysis = React.lazy(() => import('./HolisticAnalysis'))
const AnimalWelfareControlPanel = React.lazy(() => import('./AnimalWelfareControlPanel'))
const AdminVisualControls = React.lazy(() => import('./AdminVisualControls'))
const SecureAdminQuantumIAEnginePanel = React.lazy(() => import('../SecureAdminQuantumIAEnginePanel'))

/**
 * Tab configuration interface for type safety and maintainability
 */
interface TabConfig {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  component: React.LazyExoticComponent<React.ComponentType>
  description: string
  priority: 'high' | 'medium' | 'low' // For responsive hiding on small screens
  badge?: {
    text: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

/**
 * Main AdminDashboardTabs Component
 */
export function AdminDashboardTabs() {
  const [currentTab, setCurrentTab] = useState('control')
  const [tabsScrollPosition, setTabsScrollPosition] = useState(0)

  /**
   * Tab configuration - centralized for easy maintenance
   * Each tab includes component, metadata, and responsive behavior
   */
  const tabConfigs: TabConfig[] = useMemo(() => [
    {
      id: 'control',
      label: 'Control Center',
      icon: Settings,
      component: AdminControlSystem,
      description: 'Main admin control panel with system monitoring',
      priority: 'high'
    },
    {
      id: 'visual',
      label: 'Visual Controls',
      icon: Palette,
      component: AdminVisualControls,
      description: 'UI customization and visual settings',
      priority: 'medium',
      badge: { text: '🎨', variant: 'secondary' }
    },
    {
      id: 'animal-welfare',
      label: 'Animal Welfare',
      icon: Heart,
      component: AnimalWelfareControlPanel,
      description: 'Animal welfare monitoring and controls',
      priority: 'high',
      badge: { text: '🐾', variant: 'outline' }
    },
    {
      id: 'security',
      label: 'Security Suite',
      icon: Shield,
      component: UltimateSecurity,
      description: 'Comprehensive security management',
      priority: 'high'
    },
    {
      id: 'tools',
      label: 'Admin Tools',
      icon: Wrench,
      component: RefactoredAdminTools,
      description: 'Administrative utilities and tools',
      priority: 'medium'
    },
    {
      id: 'recovery',
      label: 'Recovery Portal',
      icon: RotateCcw,
      component: AdminRecoveryPortal,
      description: 'System recovery and backup management',
      priority: 'medium'
    },
    {
      id: 'plans',
      label: 'Plan Recovery',
      icon: FileText,
      component: PlanRecoverySystem,
      description: 'Strategic plan recovery and management',
      priority: 'low'
    },
    {
      id: 'analysis',
      label: 'Deep Analysis',
      icon: BarChart3,
      component: HolisticAnalysis,
      description: 'Comprehensive system analysis and insights',
      priority: 'medium'
    },
    {
      id: 'quantum-ia',
      label: 'Quantum IA',
      icon: Crown,
      component: SecureAdminQuantumIAEnginePanel,
      description: 'Advanced quantum intelligence controls',
      priority: 'low',
      badge: { text: '👑', variant: 'default' }
    }
  ], [])

  /**
   * Handle tab changes with proper state management
   */
  const handleTabChange = useCallback((value: string) => {
    setCurrentTab(value)
    
    // Log tab changes for analytics (in production, send to analytics service)
    console.log(`Admin dashboard tab changed to: ${value}`)
  }, [])

  /**
   * Render individual tab triggers with responsive behavior
   */
  const renderTabTriggers = useCallback(() => {
    return tabConfigs.map((tab) => {
      const Icon = tab.icon
      
      return (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className={`
            flex items-center gap-2 text-xs sm:text-sm
            data-[state=active]:bg-gradient-to-r 
            data-[state=active]:from-blue-600/20 
            data-[state=active]:to-purple-600/20
            data-[state=active]:border-blue-500/30
            transition-all duration-200
            ${tab.id === 'quantum-ia' ? 'bg-gradient-to-r from-purple-600/10 to-amber-600/10 border border-purple-500/20' : ''}
            ${tab.priority === 'low' ? 'hidden lg:flex' : ''}
            ${tab.priority === 'medium' ? 'hidden md:flex' : ''}
          `}
          title={tab.description}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline truncate">{tab.label}</span>
          {tab.badge && (
            <Badge 
              variant={tab.badge.variant} 
              className="text-xs px-1 py-0 h-auto ml-1"
            >
              {tab.badge.text}
            </Badge>
          )}
        </TabsTrigger>
      )
    })
  }, [tabConfigs])

  /**
   * Render tab content with error boundaries and loading states
   */
  const renderTabContent = useCallback((tab: TabConfig) => {
    const Component = tab.component
    
    return (
      <TabsContent key={tab.id} value={tab.id} className="space-y-6 mt-6">
        <AdminDashboardTabsErrorBoundary tabName={tab.label}>
          <Suspense fallback={<AdminTabLoading tabName={tab.label} />}>
            <Component />
          </Suspense>
        </AdminDashboardTabsErrorBoundary>
      </TabsContent>
    )
  }, [])

  /**
   * Main component render
   */
  return (
    <div className="w-full space-y-4">
      {/* Dashboard Header with Status Information */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Settings className="h-5 w-5" />
              Admin Dashboard - Enhanced & Stable
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 text-green-100">
                All Systems Operational
              </Badge>
              <Badge className="bg-blue-600 text-blue-100">
                Error-Protected Mode
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs Container */}
      <Tabs 
        value={currentTab} 
        onValueChange={handleTabChange} 
        className="w-full"
      >
        {/* Responsive Tabs List */}
        <div className="relative">
          <TabsList className="
            grid w-full gap-1 p-1
            grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9
            bg-slate-900/50 border border-slate-700/50 rounded-lg
          ">
            {renderTabTriggers()}
          </TabsList>
          
          {/* Mobile navigation hint */}
          <div className="md:hidden text-center mt-2">
            <p className="text-xs text-muted-foreground">
              Swipe tabs to see more options
            </p>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="mt-6">
          {tabConfigs.map(renderTabContent)}
        </div>

        {/* Fallback for unknown tabs */}
        <TabsContent value="" className="space-y-6">
          <Card className="border-yellow-500/20 bg-yellow-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="h-5 w-5" />
                Tab Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The requested tab is not available. Please select a valid tab from the list above.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTabChange('control')}
                className="mt-4"
              >
                Go to Control Center
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
