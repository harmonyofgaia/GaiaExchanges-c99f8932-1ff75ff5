
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, Shield, Search, Vault, Settings, Crown, Eye, Activity,
  Users, BarChart3, Globe, Gamepad2, Mountain, Coins, Hammer,
  Palette, Info, Mail, DollarSign, ChevronRight
} from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'

interface MenuItem {
  icon: any
  label: string
  path: string
  category: 'main' | 'admin' | 'tools' | 'security' | 'info'
  adminOnly?: boolean
}

export function AnimatedSlidingMenu() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMouseNear, setIsMouseNear] = useState(false)
  const [cubesAnimation, setCubesAnimation] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { isAdmin } = useSecureAdmin()

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Galaxy Home', path: '/', category: 'main' },
    { icon: Globe, label: 'Virtual World', path: '/virtual-world', category: 'main' },
    { icon: Gamepad2, label: 'Gaming Hub', path: '/gaming', category: 'main' },
    { icon: Mountain, label: 'Landscape Builder', path: '/landscape-builder', category: 'tools' },
    { icon: Coins, label: 'NFT Animals', path: '/nft-green-animals', category: 'tools' },
    { icon: Hammer, label: 'Coin Crafter', path: '/coin-crafter', category: 'tools' },
    { icon: Palette, label: 'Aura Land Scrapyard', path: '/aura-land-scrapyard', category: 'tools' },
    { icon: Search, label: 'Search & Track', path: '/search-track', category: 'security' },
    { icon: Activity, label: 'Live Tracking', path: '/live-tracking', category: 'security' },
    { icon: BarChart3, label: 'System Status', path: '/system-status', category: 'security' },
    { icon: Shield, label: 'Security Overview', path: '/security', category: 'security' },
    { icon: Eye, label: 'Vault System', path: '/vault-system', category: 'security' },
    { icon: Crown, label: '👑 Admin Portal', path: '/admin', category: 'admin', adminOnly: true },
    { icon: Crown, label: '🌌 Matrix Admin', path: '/matrix-admin', category: 'admin', adminOnly: true },
    { icon: Info, label: 'About GAiA', path: '/about', category: 'info' },
    { icon: Mail, label: 'Contact', path: '/contact', category: 'info' },
    { icon: DollarSign, label: 'Pricing', path: '/pricing', category: 'info' }
  ]

  // Filter menu items based on admin access
  const visibleMenuItems = menuItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const distanceFromLeft = e.clientX
      const shouldShowMenu = distanceFromLeft <= 60
      
      if (shouldShowMenu !== isMouseNear) {
        setIsMouseNear(shouldShowMenu)
        
        if (shouldShowMenu) {
          setIsVisible(true)
          setCubesAnimation(false)
        } else {
          // Start cubes animation before hiding
          setCubesAnimation(true)
          setTimeout(() => {
            setIsVisible(false)
            setCubesAnimation(false)
          }, 800)
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isMouseNear])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'admin': return 'from-red-600 to-red-800 border-red-500/50'
      case 'security': return 'from-purple-600 to-purple-800 border-purple-500/50'
      case 'tools': return 'from-blue-600 to-blue-800 border-blue-500/50'
      case 'info': return 'from-green-600 to-green-800 border-green-500/50'
      default: return 'from-gray-600 to-gray-800 border-gray-500/50'
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Hover Detection Zone */}
      <div className="fixed left-0 top-0 w-16 h-full z-40 pointer-events-none" />
      
      {/* Animated Sliding Menu */}
      <div
        ref={menuRef}
        className={`fixed left-0 top-0 h-full w-80 z-50 transition-all duration-500 ${
          isVisible 
            ? 'transform translate-x-0 opacity-100' 
            : 'transform -translate-x-full opacity-0'
        } ${cubesAnimation ? 'animate-cube-disintegration' : ''}`}
        style={{
          background: 'linear-gradient(135deg, rgba(59, 7, 100, 0.95) 0%, rgba(29, 78, 216, 0.95) 50%, rgba(16, 185, 129, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '2px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '4px 0 30px rgba(139, 92, 246, 0.4)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="text-3xl animate-pulse">🌍</div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                GAiA Universe
              </h2>
              <p className="text-sm text-muted-foreground">Harmony of Culture</p>
              {isAdmin && (
                <div className="mt-2">
                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded animate-pulse">
                    👑 ADMIN ACCESS
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-2 px-4">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    active
                      ? `bg-gradient-to-r ${getCategoryColor(item.category)} text-white shadow-lg`
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  } ${item.adminOnly ? 'border border-red-500/30' : ''}`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'animate-pulse' : 'group-hover:animate-bounce'}`} />
                  <span className="font-medium">{item.label}</span>
                  {active && <ChevronRight className="h-4 w-4 ml-auto animate-pulse" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-500/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">GAiA Platform v2.0</p>
            <p className="text-sm text-purple-400">Harmony of Culture</p>
            <div className="mt-2 text-xs text-green-400">
              🌟 System Status: OPTIMAL
            </div>
          </div>
        </div>

        {/* Cube Disintegration Effect */}
        {cubesAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-purple-500/50 animate-cube-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Background Overlay */}
      {isVisible && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={() => setIsVisible(false)}
        />
      )}
    </>
  )
}
