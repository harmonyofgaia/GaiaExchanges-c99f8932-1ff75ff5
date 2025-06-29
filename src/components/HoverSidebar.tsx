
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Hammer, 
  Activity, 
  Shield, 
  Wallet, 
  TrendingUp, 
  Gamepad2,
  Settings,
  Users,
  Info,
  Phone,
  ShoppingCart,
  BarChart3,
  Globe,
  Crown,
  Radio,
  Menu,
  X
} from 'lucide-react'
import { GaiaLogo } from './GaiaLogo'

export function HoverSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/coin-crafter', label: 'Coin Crafter', icon: Hammer },
    { path: '/live-tracking', label: 'Live Tracking', icon: Activity },
    { path: '/immortal-security', label: 'Security', icon: Shield },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/exchange', label: 'Exchange', icon: TrendingUp },
    { path: '/gaming', label: 'Gaming', icon: Gamepad2 },
    { path: '/artist-streaming', label: 'Artist Streaming', icon: Radio },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/webshop', label: 'Webshop', icon: ShoppingCart },
    { path: '/markets', label: 'Markets', icon: BarChart3 },
    { path: '/global-marketing', label: 'Global Marketing', icon: Globe },
    { path: '/admin', label: 'Universe Control', icon: Crown },
  ]

  const isActive = (path: string) => location.pathname === path

  const shouldShow = isOpen || isHovered

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-black/80 border-green-500/30"
        size="sm"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out ${
          shouldShow ? 'w-64' : 'w-12'
        } bg-black/95 backdrop-blur-sm border-r border-green-500/20`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="p-4 border-b border-green-500/20">
          <div className="flex items-center gap-3">
            <GaiaLogo size="sm" variant="colorful" />
            {shouldShow && (
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Harmony of Gaia
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-3 ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  } ${!shouldShow ? 'px-2' : ''}`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {shouldShow && <span className="truncate">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {shouldShow && (
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="w-full justify-center bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Culture of Harmony
            </Badge>
          </div>
        )}
      </div>

      {/* Content Spacer */}
      <div className={`transition-all duration-300 ${shouldShow ? 'ml-64' : 'ml-12'} hidden md:block`} />
    </>
  )
}
