
import { Link, useLocation } from 'react-router-dom'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  DollarSign, 
  Gamepad2, 
  Palette, 
  BarChart3, 
  ArrowUpDown, 
  Shield,
  Settings,
  Leaf,
  Eye
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/exchange', label: 'Exchange', icon: DollarSign },
    { path: '/gaming', label: 'Gaming', icon: Gamepad2 },
    { path: '/nfts', label: 'NFTs', icon: Palette },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/swap', label: 'Swap', icon: ArrowUpDown },
    { path: '/gaias-projects', label: 'Gaia\'s Projects', icon: Leaf },
    { path: '/transparent-wallet', label: 'Transparency', icon: Eye },
    { path: '/security', label: 'Security', icon: Shield },
    { path: '/admin', label: 'Admin', icon: Settings },
  ]

  const handleLogoClick = () => {
    window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <UniversalGaiaLogo 
            size="sm" 
            animated={true}
            showText={true}
            onClick={handleLogoClick}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`${
                      isActive 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : "hover:bg-muted"
                    } transition-colors`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-400 border-green-400">
            GAIA Platform
          </Badge>
        </div>
      </div>
    </nav>
  )
}
