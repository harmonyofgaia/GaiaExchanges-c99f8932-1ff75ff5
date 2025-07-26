import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GaiaLogo } from '@/components/GaiaLogo'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Home,
  TrendingUp,
  Gamepad2,
  Wallet,
  BarChart3,
  Video,
  Bike,
  Pickaxe,
  Leaf,
  Coins,
  Shield,
  Settings,
  Menu,
  X,
  MoreHorizontal
} from 'lucide-react'

interface NavItem {
  name: string
  path: string
  icon: any
  adminOnly?: boolean
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if user is in production and admin access
  const isProduction = import.meta.env.PROD
  const hasAdminAccess = sessionStorage.getItem('admin-active') === 'true'
  const showAdminPages = !isProduction || hasAdminAccess

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Live Tracking', path: '/live-tracking', icon: TrendingUp },
    { name: 'Gaming', path: '/gaming', icon: Gamepad2 },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Markets', path: '/markets', icon: BarChart3 },
    { name: 'Video Exchange', path: '/video-exchange', icon: Video },
    { name: 'Bike Ecosystem', path: '/gaia-bike-ecosystem', icon: Bike },
    { name: 'Token Mining', path: '/token-mining', icon: Pickaxe },
    { name: 'Green Investments', path: '/green-investments', icon: Leaf },
    { name: 'Coin Crafter', path: '/coin-crafter', icon: Coins },
    { name: 'Private Blockchain', path: '/private-blockchain', icon: Shield },
    { name: 'Secure Admin', path: '/secure-admin', icon: Settings, adminOnly: true }
  ]

  // Filter navigation items based on admin access
  const filteredNavItems = navItems.filter(item => 
    !item.adminOnly || showAdminPages
  )

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-primary/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GaiaLogo size="sm" variant="matrix" showText={false} />
            <span className="font-bold text-primary text-xl">Gaia Exchanges</span>
          </Link>

          {/* Desktop Navigation - Show first items directly */}
          <div className="hidden lg:flex items-center space-x-1">
            {filteredNavItems.slice(0, 6).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Right-top Hamburger Menu Button - Always visible */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10 p-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-background/95 border-primary/30 backdrop-blur-sm w-64 max-h-96 overflow-y-auto"
              >
                <div className="p-2">
                  <div className="text-sm font-semibold text-primary mb-2 px-2">
                    🌍 GAIA EXCHANGES NAVIGATION
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {filteredNavItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link
                            to={item.path}
                            className="flex items-center space-x-3 px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
