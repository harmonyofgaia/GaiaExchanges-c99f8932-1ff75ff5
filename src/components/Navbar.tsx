
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
        
        // If unauthorized and trying to access admin, trigger defense
        if (!isAuthorized && (location.pathname.includes('/admin') || location.pathname.includes('/secure'))) {
          triggerDefenseSystem()
        }
        
      } catch (error) {
        console.log('IP check failed, allowing local access only')
        setIsAuthorizedIP(window.location.hostname === 'localhost')
      }
    }

    checkIPAuthorization()
  }, [location.pathname])

  const triggerDefenseSystem = () => {
    setAttackDetected(true)
    
    // Visual defense system activation
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff4500, #ff0000, #ff4500)'
    document.body.style.animation = 'fireStorm 0.1s infinite'
    
    // Add CSS animation for fire storm effect
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fireStorm {
        0% { filter: brightness(1) hue-rotate(0deg); }
        25% { filter: brightness(2) hue-rotate(90deg); }
        50% { filter: brightness(1.5) hue-rotate(180deg); }
        75% { filter: brightness(2.5) hue-rotate(270deg); }
        100% { filter: brightness(1) hue-rotate(360deg); }
      }
      .fire-attack {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,69,0,0.6) 50%, transparent 100%);
        pointer-events: none;
        z-index: 9999;
        animation: fireStorm 0.1s infinite;
      }
    `
    document.head.appendChild(style)
    
    // Create fire overlay
    const fireOverlay = document.createElement('div')
    fireOverlay.className = 'fire-attack'
    document.body.appendChild(fireOverlay)
    
    console.log('🔥 DEFENSE SYSTEM ACTIVATED - FIRESTORM ATTACK INITIATED 🔥')
    console.log('🚨 UNAUTHORIZED ACCESS DETECTED - HEAVY DEFENSE PROTOCOL ENGAGED 🚨')
    
    // Continuous defense messages
    let defenseCount = 0
    const defenseInterval = setInterval(() => {
      defenseCount++
      console.log(`🔥 FIRESTORM ATTACK ${defenseCount} - STOP ATTACKING OR FACE CONSEQUENCES 🔥`)
      
      if (defenseCount > 100) {
        console.log('🚫 MAXIMUM DEFENSE REACHED - CONTACT ADMIN FOR ACCESS 🚫')
        clearInterval(defenseInterval)
      }
    }, 100)
    
    // Show warning message
    setTimeout(() => {
      alert('🔥 GAIA DEFENSE SYSTEM ACTIVATED 🔥\n\nUNAUTHORIZED ACCESS DETECTED!\nFIRESTORM DEFENSE PROTOCOL ENGAGED!\n\nSTOP ATTACKING IMMEDIATELY!\n\nContact admin for authorized access.')
    }, 1000)
  }

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
    // Admin only visible for authorized IPs
    ...(isAuthorizedIP ? [{ path: '/admin', label: 'Admin', icon: Settings }] : [])
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
              ADMIN IP
            </Badge>
          )}
        </div>
      </div>
    </nav>
  )
}
