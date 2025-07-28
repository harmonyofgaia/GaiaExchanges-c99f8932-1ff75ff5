
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
  Users,
  Shield,
  TreePine,
  Flame,
  Handshake,
  Brain,
  Rocket,
  Trophy,
  Sparkles,
  Target,
  Zap
} from 'lucide-react'

interface NavItem {
  name: string
  path: string
  icon: any
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Exchange', path: '/exchange', icon: TrendingUp },
    { name: 'Green Impact', path: '/green-impact-dashboard', icon: Leaf },
    { name: 'Gaia\'s Projects', path: '/gaias-projects', icon: TreePine },
    { name: 'Earning Activities', path: '/earning-activities', icon: Zap },
    { name: 'Enhanced Leaderboard', path: '/enhanced-leaderboard', icon: Trophy },
    { name: 'Project Funding', path: '/project-funding', icon: Heart },
    { name: 'NFT Cards', path: '/nft-cards', icon: Sparkles },
    { name: 'Eco Avatar', path: '/eco-avatar', icon: Users },
    { name: 'Forest Shield', path: '/forest-shield-master-plan', icon: TreePine },
    { name: 'Sand Protect', path: '/sand-protect', icon: Shield },
    { name: 'Wildfire Defense', path: '/wildfire-defense-dashboard', icon: Flame },
    { name: 'Forest Tokens', path: '/forest-token-system', icon: Coins },
    { name: 'Community Hub', path: '/community-engagement-hub', icon: Users },
    { name: 'Partnerships', path: '/partnership-management', icon: Handshake },
    { name: 'Impact Metrics', path: '/impact-measurement-system', icon: BarChart3 },
    { name: 'Sea Green AI', path: '/sea-green-psychohistorical', icon: Brain },
    { name: 'GAiA Token Status', path: '/gaia-consistency-status', icon: Shield },
    { name: 'Deployment Center', path: '/deployment-center', icon: Rocket },
    { name: 'Security', path: '/security', icon: Shield },
    { name: 'Blockchain Swap', path: '/gaia-private-blockchain-swap-token', icon: Shield },
    { name: 'Video Exchange', path: '/secure-admin/video-exchange', icon: Video },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: '👑 Admin', path: '/admin', icon: Crown }
  ]

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-primary/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GaiaLogo size="sm" variant="matrix" showText={false} />
            <span className="font-bold text-primary text-xl">GAiA Universe</span>
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
              <DropdownMenuContent className="bg-background/95 border-primary/30 backdrop-blur-sm max-h-96 overflow-y-auto">
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
          <div className="lg:hidden py-4 border-t border-primary/30 max-h-96 overflow-y-auto">
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
