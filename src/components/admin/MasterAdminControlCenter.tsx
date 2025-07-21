
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Shield, Zap, Eye, Target, Brain, Ghost, Lock } from 'lucide-react'
import { InvisibleIAEngine } from './InvisibleIAEngine'
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { AdminDashboardTabs } from './AdminDashboardTabs'
import { toast } from 'sonner'

interface CommunityProject {
  id: string
  title: string
  category: 'HEALTH' | 'ENVIRONMENT' | 'EDUCATION' | 'TECHNOLOGY' | 'SOCIAL'
  tokenReward: number
  impact: string
  status: 'ACTIVE' | 'PLANNING' | 'COMPLETED'
}

export function MasterAdminControlCenter() {
  const [activeSection, setActiveSection] = useState('ia-engine')
  const [communityProjects] = useState<CommunityProject[]>([
    {
      id: '1',
      title: 'Green Energy Token Mining',
      category: 'ENVIRONMENT',
      tokenReward: 100,
      impact: 'Users earn tokens by contributing to renewable energy initiatives',
      status: 'ACTIVE'
    },
    {
      id: '2',
      title: 'Health Data Sharing Network',
      category: 'HEALTH',
      tokenReward: 150,
      impact: 'Anonymous health data contribution for medical research',
      status: 'PLANNING'
    },
    {
      id: '3',
      title: 'Educational Content Creation',
      category: 'EDUCATION',
      tokenReward: 75,
      impact: 'Create educational content that benefits global learning',
      status: 'ACTIVE'
    },
    {
      id: '4',
      title: 'Carbon Footprint Tracking',
      category: 'ENVIRONMENT',
      tokenReward: 125,
      impact: 'Track and reduce carbon footprint while earning tokens',
      status: 'ACTIVE'
    },
    {
      id: '5',
      title: 'Mental Health Support Network',
      category: 'HEALTH',
      tokenReward: 200,
      impact: 'Provide peer support and mental health resources',
      status: 'PLANNING'
    }
  ])

  const adminSections = [
    { id: 'ia-engine', label: '🧠 IA Engine', icon: Brain, description: 'Supreme invisible AI control' },
    { id: 'ultimate-suite', label: '⚡ Ultimate Suite', icon: Zap, description: 'Complete admin tools' },
    { id: 'dashboard-tabs', label: '📊 Dashboard', icon: Target, description: 'System monitoring' },
    { id: 'community-projects', label: '🌍 Community Projects', icon: Crown, description: 'World improvement initiatives' },
    { id: 'defense-overview', label: '🛡️ Defense Overview', icon: Shield, description: 'Security status' },
    { id: 'invisible-controls', label: '👻 Invisible Controls', icon: Ghost, description: 'Hidden admin powers' }
  ]

  const activateEmergencyProtocol = () => {
    toast.success('🚨 Emergency Protocol Activated!', {
      description: 'All defense systems are now at maximum alert level',
      duration: 10000
    })
    console.log('🚨 EMERGENCY PROTOCOL ACTIVATED - ALL SYSTEMS TO MAXIMUM DEFENSE')
  }

  return (
    <div className="space-y-6">
      {/* Master Control Header */}
      <Card className="bg-gradient-to-r from-red-900/40 via-purple-900/40 to-blue-900/40 border-2 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
            👑 MASTER ADMIN CONTROL CENTER - SUPREME AUTHORITY
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-xl text-red-400 font-bold">
              🧠 IA ENGINE • 🛡️ INVISIBLE DEFENSE • ⚡ UNLIMITED POWER • 🌍 GLOBAL CONTROL
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-red-600 animate-pulse">IA ENGINE ACTIVE</Badge>
              <Badge className="bg-purple-600 animate-pulse">INVISIBLE DEFENSE</Badge>
              <Badge className="bg-blue-600 animate-pulse">MATRIX WEB READY</Badge>
              <Badge className="bg-green-600 animate-pulse">COMMUNITY PROJECTS</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Grid */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {adminSections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              
              return (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`h-20 flex flex-col gap-2 ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="text-sm font-medium">{section.label}</div>
                    <div className="text-xs opacity-70">{section.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Controls */}
      <Card className="border-red-500/50 bg-red-900/20">
        <CardContent className="pt-6">
          <div className="flex justify-center gap-4">
            <Button
              onClick={activateEmergencyProtocol}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Shield className="h-4 w-4 mr-2" />
              🚨 Emergency Protocol
            </Button>
            <Button
              onClick={() => toast.success('🛡️ All systems secured!')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Lock className="h-4 w-4 mr-2" />
              🔒 Secure All Systems
            </Button>
            <Button
              onClick={() => toast.success('👻 Ghosts released!')}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              <Ghost className="h-4 w-4 mr-2" />
              👻 Release Defense Ghosts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Sections */}
      <div className="space-y-6">
        {activeSection === 'ia-engine' && <InvisibleIAEngine />}
        
        {activeSection === 'ultimate-suite' && <UltimateAdminSuite />}
        
        {activeSection === 'dashboard-tabs' && <AdminDashboardTabs />}
        
        {activeSection === 'community-projects' && (
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🌍 Community World Improvement Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communityProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-green-400">{project.title}</h4>
                        <div className="text-sm text-muted-foreground">{project.impact}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          project.status === 'ACTIVE' ? 'bg-green-600' :
                          project.status === 'PLANNING' ? 'bg-yellow-600' :
                          'bg-blue-600'
                        } text-white`}>
                          {project.status}
                        </Badge>
                        <div className="text-sm text-green-400 mt-1">
                          +{project.tokenReward} tokens
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-purple-400">
                      Category: {project.category}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeSection === 'defense-overview' && (
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🛡️ Defense System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                  <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-muted-foreground">System Health</div>
                </div>
                <div className="text-center p-4 bg-green-900/30 rounded-lg">
                  <Eye className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">ACTIVE</div>
                  <div className="text-sm text-muted-foreground">Global Monitoring</div>
                </div>
                <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                  <Ghost className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">4</div>
                  <div className="text-sm text-muted-foreground">Defense Animals</div>
                </div>
                <div className="text-center p-4 bg-red-900/30 rounded-lg">
                  <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">READY</div>
                  <div className="text-sm text-muted-foreground">Matrix Web</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeSection === 'invisible-controls' && (
          <Card className="border-gray-500/30 bg-black/40">
            <CardHeader>
              <CardTitle className="text-gray-400">👻 Invisible Admin Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <Ghost className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-4">
                  INVISIBLE CONTROLS ACTIVE
                </h3>
                <p className="text-muted-foreground mb-6">
                  All invisible controls are running in the background. 
                  These systems operate completely hidden from all detection methods.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-900/30 rounded">
                    <div className="text-lg font-bold text-gray-400">INVISIBLE</div>
                    <div className="text-sm">IA Engine Status</div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded">
                    <div className="text-lg font-bold text-gray-400">UNTRACEABLE</div>
                    <div className="text-sm">Admin Actions</div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded">
                    <div className="text-lg font-bold text-gray-400">PROTECTED</div>
                    <div className="text-sm">System Access</div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded">
                    <div className="text-lg font-bold text-gray-400">SUPREME</div>
                    <div className="text-sm">Authority Level</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
