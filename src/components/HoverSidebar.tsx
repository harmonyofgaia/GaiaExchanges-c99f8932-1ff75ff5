
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Shield, 
  Crown,
  Settings,
  Activity,
  Lock,
  Eye,
  ChevronRight,
  Globe
} from 'lucide-react'

export function HoverSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  const navigationItems = [
    { path: '/', icon: Home, label: 'Home', description: 'Main Dashboard' },
    { path: '/system-status', icon: Activity, label: 'System Status', description: 'Health & Performance', badge: 'NEW' },
    { path: '/ultimate-security', icon: Shield, label: 'Ultimate Security', description: 'Quantum Protection' },
    { path: '/immortal-security', icon: Lock, label: 'Immortal Security', description: 'Dragon Defense' },
    { path: '/admin', icon: Crown, label: 'Admin Panel', description: 'God Mode Control' },
    { path: '/secure-admin', icon: Eye, label: 'Secure Vault', description: 'Admin Access' }
  ]

  return (
    <>
      {/* Hover trigger area */}
      <div 
        className="fixed left-0 top-0 w-4 h-full z-40 bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full z-50 transition-transform duration-300 ${
          isHovered ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="h-full w-80 rounded-none border-r-2 border-green-500/30 bg-gradient-to-b from-black/95 via-gray-900/95 to-green-900/95 backdrop-blur-md">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-2">🌍</div>
              <h2 className="text-xl font-bold text-green-400">Harmony of Gaia</h2>
              <p className="text-sm text-muted-foreground">Navigation Hub</p>
            </div>

            {/* Navigation Items */}
            <div className="space-y-3 flex-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 hover:bg-green-500/10 hover:border-green-500/30 border border-transparent transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <IconComponent className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{item.label}</span>
                            {item.badge && (
                              <Badge className="bg-green-600 text-white text-xs px-2 py-0">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Status Footer */}
            <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">System Status</span>
              </div>
              <div className="flex justify-between items-center">
                <Badge className="bg-green-600 text-white text-xs">
                  ALL SYSTEMS OPERATIONAL
                </Badge>
                <Globe className="h-4 w-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
