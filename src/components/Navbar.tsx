
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  BarChart3, 
  Shield,
  Leaf,
  Eye,
  DollarSign,
  ArrowUpDown,
  ShoppingCart,
  Settings
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { useEffect, useState } from 'react'

export function Navbar() {
  const location = useLocation()
  const [isAuthorizedIP, setIsAuthorizedIP] = useState(false)

  useEffect(() => {
    const checkIPAuthorization = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        const userIP = data.ip
        
        const authorizedIPs = [
          '192.168.1.100',
          '192.168.1.101',
          '127.0.0.1',
          'localhost'
        ]
        
        const isAuthorized = authorizedIPs.includes(userIP) || 
                           userIP.startsWith('192.168.') || 
                           window.location.hostname === 'localhost'
        
        setIsAuthorizedIP(isAuthorized)
        
      } catch (error) {
        console.log('IP check failed, allowing local access only')
        setIsAuthorizedIP(window.location.hostname === 'localhost')
      }
    }

    checkIPAuthorization()
  }, [location.pathname])

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/gaias-projects', label: 'Gaia\'s Projects', icon: Leaf },
    { path: '/transparent-wallet', label: 'Transparency', icon: Eye },
    { path: '/landscape-builder', label: 'Landscape Builder', icon: Settings },
    { path: '/security', label: 'Security', icon: Shield }
  ]

  const topMenuItems = [
    { path: '/exchange', label: 'Exchange', icon: DollarSign, hasSubmenu: true },
    { path: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
    { path: '/live-artist-platform', label: 'Live Artists', icon: Eye }
  ]

  const handleLogoClick = () => {
    window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')
  }

  return (
    <>
      {/* Top Menu Bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center px-4 ml-16">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {topMenuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || 
                  (item.hasSubmenu && location.pathname === '/swap')
                
                return (
                  <div key={item.path} className="relative group">
                    <Link to={item.path}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`${
                          isActive 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "hover:bg-muted"
                        } transition-colors`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    </Link>
                    
                    {/* Submenu for Exchange */}
                    {item.hasSubmenu && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <Link to="/swap" className="block px-4 py-2 hover:bg-muted">
                          <div className="flex items-center gap-2">
                            <ArrowUpDown className="h-4 w-4" />
                            Swap
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="flex h-16 items-center px-4 ml-16">
          {/* Logo - offset for menu button */}
          <div className="flex items-center gap-4">
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
            {isAuthorizedIP && (
              <Badge className="bg-blue-600 text-white animate-pulse">
                🛡️ ADMIN IP VERIFIED
              </Badge>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
