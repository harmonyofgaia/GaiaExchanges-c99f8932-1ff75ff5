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
  MoreHorizontal,
  Users,
  FileText,
  Info,
  Mail,
  BarChart,
  Palette
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'

interface NavItem {
  name: string
  path: string
  icon: any
  adminOnly?: boolean
  gaiaToken?: boolean
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if user is in production and admin access
  const isProduction = import.meta.env.PROD
  const hasAdminAccess = sessionStorage.getItem('admin-active') === 'true'
  const showAdminPages = !isProduction || hasAdminAccess

  // Complete navigation - all pages accessible via hamburger menu only
  const navItems = [
    { name: '🏠 Home', path: '/', icon: Home, gaiaToken: true },
    { name: '📈 Live Tracking', path: '/live-tracking', icon: TrendingUp, gaiaToken: true },
    { name: '🎮 Gaming', path: '/gaming', icon: Gamepad2, gaiaToken: true },
    { name: '💰 GAiA Wallet', path: '/wallet', icon: Wallet, gaiaToken: true },
    { name: '📊 Markets', path: '/markets', icon: BarChart3, gaiaToken: true },
    { name: '🎥 Video Exchange', path: '/video-exchange', icon: Video, gaiaToken: true },
    { name: '🚴 Bike Ecosystem', path: '/gaia-bike-ecosystem', icon: Bike, gaiaToken: true },
    { name: '⛏️ GAiA Token Mining', path: '/token-mining', icon: Pickaxe, gaiaToken: true },
    { name: '🌱 Green Investments', path: '/green-investments', icon: Leaf, gaiaToken: true },
    { name: '🪙 GAiA Coin Crafter', path: '/coin-crafter', icon: Coins, gaiaToken: true },
    { name: '🔐 GAIA Private Blockchain', path: '/private-blockchain', icon: Shield, gaiaToken: true },
    { name: '👥 Community', path: '/community', icon: Users, gaiaToken: true },
    { name: '🎨 NFT Marketplace', path: '/nfts', icon: Palette, gaiaToken: true },
    { name: '📊 Analytics', path: '/analytics', icon: BarChart, gaiaToken: true },
    { name: '📧 Contact', path: '/contact', icon: Mail, gaiaToken: true },
    { name: 'ℹ️ About', path: '/about', icon: Info, gaiaToken: true },
    { name: '📄 Documentation', path: '/docs', icon: FileText, gaiaToken: true },
    { name: '⚙️ Secure Admin', path: '/secure-admin', icon: Settings, adminOnly: true, gaiaToken: true }
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
            <span className="hidden sm:inline text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
              GAiA Token Powered
            </span>
          </Link>

          {/* Right-top Hamburger Menu Button - Only navigation element */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10 p-2 border border-primary/30"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-background/95 border-primary/30 backdrop-blur-sm w-72 max-h-96 overflow-y-auto"
              >
                <div className="p-2">
                  <div className="text-sm font-semibold text-primary mb-3 px-2 flex items-center justify-between">
                    🌍 GAIA EXCHANGES NAVIGATION
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                      GAiA Token
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {filteredNavItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link
                            to={item.path}
                            className="flex items-center justify-between px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors cursor-pointer"
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className="h-4 w-4" />
                              <span>{item.name}</span>
                            </div>
                            {item.gaiaToken && (
                              <span className="text-xs text-primary/70">GAiA</span>
                            )}
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-primary/20">
                    <div className="text-xs text-muted-foreground px-2 text-center">
                      Powered by Official GAiA Token Network
                    </div>
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
