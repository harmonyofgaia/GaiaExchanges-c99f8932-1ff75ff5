import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedEarthLogo } from '@/components/branding/AnimatedEarthLogo'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Home,
  LayoutDashboard,
  Leaf,
  User,
  Globe,
  Heart,
  Gamepad2,
  ArrowRightLeft,
  ShoppingBag,
  Wallet,
  Video,
  Tv,
  Bike,
  Pickaxe,
  TrendingUp,
  Coins,
  Shield,
  Menu,
  X,
  ChevronDown,
  Activity,
  Trophy,
  MessageCircle,
  Handshake,
  Target,
  Brain
} from 'lucide-react'

interface NavItem {
  name: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Exchange', path: '/exchange', icon: ArrowRightLeft },
  { name: 'Green Investments', path: '/green-investments', icon: TrendingUp },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Green Impact', path: '/green-impact-dashboard', icon: Leaf },
  { name: 'Eco Avatar', path: '/eco-avatar', icon: User },
  { name: 'Earning Activities', path: '/earning-activities', icon: Activity },
  { name: 'Enhanced Leaderboard', path: '/enhanced-leaderboard', icon: Trophy },
  { name: 'Community Hub', path: '/community-engagement-hub', icon: MessageCircle },
  { name: 'Partnership Management', path: '/partnership-management', icon: Handshake },
  { name: 'Impact Measurement', path: '/impact-measurement-system', icon: Target },
  { name: 'Sea Green AI', path: '/sea-green-psychohistorical', icon: Brain },
  { name: 'Gaia Token Status', path: '/gaia-token-status', icon: Shield },
  { name: 'Virtual World', path: '/virtual-world', icon: Globe },
  { name: 'Animal Welfare', path: '/animal-welfare', icon: Heart },
  { name: 'Gaming Hub', path: '/gaming', icon: Gamepad2 },
  { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { name: 'Wallet', path: '/wallet', icon: Wallet },
  { name: 'Video Exchange', path: '/video-exchange', icon: Video },
  { name: 'Streaming Shows', path: '/streaming-shows', icon: Tv },
  { name: 'Gaia Bike', path: '/gaia-bike-ecosystem', icon: Bike },
  { name: 'Token Mining', path: '/token-mining', icon: Pickaxe },
  { name: 'Coin Crafter', path: '/coin-crafter', icon: Coins },
  { name: 'Sand Protect', path: '/sand-protect', icon: Shield },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Enhanced for better visibility */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity min-w-fit flex-shrink-0">
            <AnimatedEarthLogo />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
              Gaia's Exchanges
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.slice(0, 10).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all relative group"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <span>More</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 border-primary/30 backdrop-blur-sm">
                {navItems.slice(10).map((item) => {
                  const Icon = item.icon
                  return (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center space-x-2 w-full">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
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
              onClick={() => setIsOpen(!isOpen)}
              className="relative"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/40 bg-background/95 backdrop-blur">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
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
