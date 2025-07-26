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
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    { name: 'Secure Admin', path: '/secure-admin', icon: Settings }
  ]

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-primary/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GaiaLogo size="sm" variant="matrix" showText={false} />
            <span className="font-bold text-primary text-xl">Gaia Exchanges</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 8).map((item) => {
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
            
            {/* More menu for additional items */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                  <MoreHorizontal className="h-4 w-4 mr-1" />
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 border-primary/30 backdrop-blur-sm">
                {navItems.slice(8).map((item) => {
                  const Icon = item.icon
                  return (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:bg-primary/10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary/30">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
