
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Activity,
  Brain,
  Eye,
  Lock,
  Crown,
  Globe,
  Coins,
  Zap,
  Target,
  Settings
} from 'lucide-react'

// Import all admin components
import { GlobalTrackingSystem } from './GlobalTrackingSystem'
import { AdvancedThreatTracker } from './AdvancedThreatTracker'
import { LiveTrackingEngine } from '../tracking/LiveTrackingEngine'
import { NeuralNetworkGameAI } from './NeuralNetworkGameAI'
import { BlockchainVirtualEconomy } from './BlockchainVirtualEconomy'
import { AutonomousContentGeneration } from './AutonomousContentGeneration'
import { FourStepVerification } from './FourStepVerification'
import { AdminTransparencyCenter } from './AdminTransparencyCenter'
import { ConsolidatedSecuritySystem } from './ConsolidatedSecuritySystem'

export function AdminDashboardTabs() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: Activity },
    { id: 'security', label: 'Consolidated Security', icon: Shield },
    { id: 'verification', label: '4-Step Verification', icon: Lock },
    { id: 'transparency', label: 'Transparency Center', icon: Eye },
    { id: 'neural-ai', label: 'Neural Network AI', icon: Brain },
    { id: 'blockchain', label: 'Virtual Economy', icon: Coins },
    { id: 'content-gen', label: 'Content Generation', icon: Zap },
    { id: 'tracking', label: 'Global Tracking', icon: Globe },
    { id: 'threats', label: 'Threat Defense', icon: Target }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-purple-400 mb-4">
          👑 ADMIN CONTROL CENTER - HARMONY OF GAIA
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 animate-pulse">
            <Activity className="h-3 w-3 mr-1" />
            ALL SYSTEMS OPERATIONAL
          </Badge>
          <Badge className="bg-blue-600">
            <Crown className="h-3 w-3 mr-1" />
            ADMIN AUTHENTICATED
          </Badge>
          <Badge className="bg-purple-600">
            <Settings className="h-3 w-3 mr-1" />
            QUANTUM PROTOCOLS ACTIVE
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 bg-black/20">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="text-xs data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Icon className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <LiveTrackingEngine />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <ConsolidatedSecuritySystem />
        </TabsContent>

        <TabsContent value="verification" className="mt-6">
          <FourStepVerification />
        </TabsContent>

        <TabsContent value="transparency" className="mt-6">
          <AdminTransparencyCenter />
        </TabsContent>

        <TabsContent value="neural-ai" className="mt-6">
          <NeuralNetworkGameAI />
        </TabsContent>

        <TabsContent value="blockchain" className="mt-6">
          <BlockchainVirtualEconomy />
        </TabsContent>

        <TabsContent value="content-gen" className="mt-6">
          <AutonomousContentGeneration />
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <GlobalTrackingSystem />
        </TabsContent>

        <TabsContent value="threats" className="mt-6">
          <AdvancedThreatTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
