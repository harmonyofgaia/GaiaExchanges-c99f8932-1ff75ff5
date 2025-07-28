
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedEarthLogo } from '@/components/branding/AnimatedEarthLogo'
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
  Video,
  Film,
  Bike,
  Pickaxe,
  Leaf,
  Coins,
  Settings,
  Menu,
  X,
  MoreHorizontal,
  Heart,
  Globe,
  Mountain,
  Palette,
  Crown,
  Info,
  Mail,
  DollarSign,
  ShoppingBag,
  BarChart3,
  Users
} from 'lucide-react'

interface NavItem {
  name: string
  path: string
  icon: any
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Galaxy Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Green Impact', path: '/green-impact-dashboard', icon: Leaf },
    { name: 'Eco Avatar', path: '/eco-avatar', icon: Users },
    { name: 'Virtual World', path: '/virtual-world', icon: Globe },
    { name: 'Animal Welfare', path: '/animal-welfare', icon: Heart },
    { name: 'Gaming Hub', path: '/gaming', icon: Gamepad2 },
    { name: 'Exchange', path: '/exchange', icon: TrendingUp },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Video Exchange', path: '/video-exchange', icon: Video },
    { name: 'Streaming Shows', path: '/streaming-shows', icon: Film },
    { name: 'Bike Ecosystem', path: '/gaia-bike-ecosystem', icon: Bike },
    { name: 'Token Mining', path: '/token-mining', icon: Pickaxe },
    { name: 'Green Investments', path: '/green-investments', icon: Leaf },
    { name: 'Coin Crafter', path: '/coin-crafter', icon: Coins },
    { name: 'Landscape Builder', path: '/landscape-builder', icon: Mountain },
    { name: 'Aura Land Scrapyard', path: '/aura-land-scrapyard', icon: Palette },
    { name: 'Comprehensive Status', path: '/comprehensive-status', icon: Settings },
    { name: 'About GAiA', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Pricing', path: '/pricing', icon: DollarSign },
    { name: '👑 Admin Portal', path: '/admin', icon: Crown }
  ]

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-primary/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <AnimatedEarthLogo />
            <span className="font-bold text-primary text-xl">Gaia's Exchanges</span>
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
            <div className="grid grid-cols-1 gap-2">
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
