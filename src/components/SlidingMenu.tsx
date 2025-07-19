
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { 
  Menu, 
  X, 
  Home, 
  Leaf, 
  Eye, 
  Shield, 
  Gamepad2, 
  DollarSign, 
  ShoppingCart,
  Music,
  Video,
  RotateCcw,
  Settings,
  Users,
  Upload,
  Wallet,
  BarChart3
} from 'lucide-react'

export default function SlidingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { isAdmin } = useSecureAdmin()

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { path: '/', label: 'Home', icon: Home, category: 'main' },
    { path: '/gaias-projects', label: "Gaia's Projects", icon: Leaf, category: 'main' },
    { path: '/transparency', label: 'Transparency', icon: Eye, category: 'main' },
    { path: '/security', label: 'Security', icon: Shield, category: 'main' },
    { path: '/gaming', label: 'Gaming', icon: Gamepad2, category: 'platform' },
    { path: '/exchange', label: 'Exchange', icon: DollarSign, category: 'platform' },
    { path: '/marketplace', label: 'Marketplace', icon: ShoppingCart, category: 'platform' },
    { path: '/artist-streaming', label: 'Artist Streaming', icon: Music, category: 'content' },
    { path: '/video-upload', label: 'Video Upload', icon: Video, category: 'content' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, category: 'tools' }
  ]

  const adminItems = [
    { path: '/admin', label: 'Admin Login', icon: Shield, category: 'admin' },
    { path: '/secure-admin', label: 'Admin Dashboard', icon: Settings, category: 'admin' },
    { path: '/task-reverser', label: 'Task Reverser', icon: RotateCcw, category: 'admin' },
    { path: '/admin-crafted-tools', label: 'Admin Tools', icon: Settings, category: 'admin' }
  ]

  const isActive = (path: string) => location.pathname === path

  const categories = [
    { id: 'main', title: '🌍 Main Platform', items: menuItems.filter(item => item.category === 'main') },
    { id: 'platform', title: '🚀 Platform', items: menuItems.filter(item => item.category === 'platform') },
    { id: 'content', title: '🎵 Content & Media', items: menuItems.filter(item => item.category === 'content') },
    { id: 'tools', title: '🔧 Tools', items: menuItems.filter(item => item.category === 'tools') }
  ]

  if (isAdmin) {
    categories.push({ id: 'admin', title: '👑 Admin Control', items: adminItems })
  }

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 bg-green-600 hover:bg-green-700 shadow-lg"
        size="sm"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Sliding Menu */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-background/95 backdrop-blur-sm border-r 
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 pt-16">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🌍 GAIA Platform
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Culture of Harmony Navigation
            </p>
            {isAdmin && (
              <Badge className="bg-red-600 text-white mt-2">
                👑 ADMIN ACCESS
              </Badge>
            )}
          </div>

          {/* Navigation Categories */}
          <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.path)
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={toggleMenu}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                          ${active 
                            ? 'bg-green-600 text-white' 
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                        {active && (
                          <Badge className="ml-auto bg-white/20 text-white text-xs">
                            Active
                          </Badge>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🎵 "Seeds Will Form Into Music"
              </p>
              <p className="text-xs text-green-400 mt-1">
                Culture of Harmony © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
