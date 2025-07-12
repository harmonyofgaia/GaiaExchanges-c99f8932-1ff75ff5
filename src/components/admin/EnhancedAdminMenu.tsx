
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Cog, 
  Eye, 
  Zap, 
  Crown, 
  Leaf,
  Users,
  TrendingUp,
  Settings,
  Database,
  Lock
} from 'lucide-react'

export function EnhancedAdminMenu() {
  const adminModules = [
    {
      id: 'green-projects',
      title: 'Green Project Management',
      description: 'Manage environmental projects and funding',
      icon: Leaf,
      status: 'active',
      priority: 'high'
    },
    {
      id: 'security-suite',
      title: 'Advanced Security Suite',
      description: '4-step breach protocol + 100 defense walls',
      icon: Shield,
      status: 'active',
      priority: 'critical'
    },
    {
      id: 'ai-engine',
      title: 'AI Engine Control',
      description: 'Neural networks and quantum computing',
      icon: Zap,
      status: 'active',
      priority: 'high'
    },
    {
      id: 'defense-army',
      title: 'Digital Defense Army',
      description: 'Creature-based defense system',
      icon: Crown,
      status: 'active',
      priority: 'high'
    },
    {
      id: 'tracking-suite',
      title: 'Advanced Tracking',
      description: 'Real-time monitoring and analytics',
      icon: Eye,
      status: 'active',
      priority: 'medium'
    },
    {
      id: 'token-management',
      title: 'Token Management',
      description: 'Complete GAiA token control',
      icon: TrendingUp,
      status: 'active',
      priority: 'high'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600'
      case 'high': return 'bg-orange-600'
      case 'medium': return 'bg-yellow-600'
      default: return 'bg-green-600'
    }
  }

  return (
    <Card className="border-4 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-3xl text-purple-400">
          <Crown className="h-8 w-8" />
          🛡️ ENHANCED ADMIN CONTROL MATRIX
          <Badge className="bg-purple-600 text-white animate-pulse">OMNIPOTENT</Badge>
        </CardTitle>
        <p className="text-purple-300">
          Complete administrative control over all GAiA ecosystem components
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminModules.map((module) => (
            <Card key={module.id} className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20 hover:border-purple-400/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <module.icon className="h-6 w-6 text-purple-400" />
                  <Badge className={`${getPriorityColor(module.priority)} text-white text-xs`}>
                    {module.priority.toUpperCase()}
                  </Badge>
                </div>
                <h3 className="font-bold text-purple-400 mb-2">{module.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-green-600 text-white text-xs">
                    {module.status.toUpperCase()}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    <Settings className="h-3 w-3 mr-1" />
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Status */}
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-400" />
              <span className="font-bold text-green-400">All Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-300">Security Level: MAXIMUM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
