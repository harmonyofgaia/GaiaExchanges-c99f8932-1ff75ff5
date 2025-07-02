
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
  Leaf,
  Eye
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { useEffect, useState } from 'react'

export function Navbar() {
  const location = useLocation()
  const [isAuthorizedIP, setIsAuthorizedIP] = useState(false)
  const [attackDetected, setAttackDetected] = useState(false)

  useEffect(() => {
    const checkIPAuthorization = async () => {
      try {
        // Get user's IP address
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        const userIP = data.ip
        
        // Authorized IPs - Admin's main IP and Redmi tablet IP
        const authorizedIPs = [
          '192.168.1.100', // Your main IP (replace with actual)
          '192.168.1.101', // Your Redmi tablet IP (replace with actual)
          '127.0.0.1',     // Localhost for development
          'localhost'      // Localhost alternative
        ]
        
        const isAuthorized = authorizedIPs.includes(userIP) || 
                           userIP.startsWith('192.168.') || // Local network
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
    { path: '/exchange', label: 'Exchange', icon: DollarSign },
    { path: '/gaming', label: 'Gaming', icon: Gamepad2 },
    { path: '/nfts', label: 'NFTs', icon: Palette },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/swap', label: 'Swap', icon: ArrowUpDown },
    { path: '/gaias-projects', label: 'Gaia\'s Projects', icon: Leaf },
    { path: '/transparent-wallet', label: 'Transparency', icon: Eye },
    { path: '/security', label: 'Security', icon: Shield }
  ]

  const handleLogoClick = () => {
    window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia', '_blank')
  }

  if (attackDetected) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-red-600 via-orange-500 to-red-600 flex items-center justify-center">
        <div className="text-center text-white animate-pulse">
          <h1 className="text-6xl font-bold mb-4">🔥 DEFENSE SYSTEM ACTIVE 🔥</h1>
          <p className="text-2xl">UNAUTHORIZED ACCESS - FIRESTORM PROTOCOL ENGAGED</p>
          <p className="text-lg mt-4">Stop attacking or face continuous defense!</p>
        </div>
      </div>
    )
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
          {isAuthorizedIP && (
            <Badge className="bg-blue-600 text-white animate-pulse">
              🛡️ ADMIN IP VERIFIED
            </Badge>
          )}
        </div>
      </div>
    </nav>
  )
}
