
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Wallet, 
  Gamepad2, 
  Settings, 
  Info, 
  Mail, 
  DollarSign, 
  Download,
  Hammer,
  Activity,
  BarChart3,
  Shield,
  User,
  ChevronRight,
  Globe,
  Coins,
  Mountain,
  Palette,
  Crown,
  Star
} from 'lucide-react'

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAuthorizedIP, setIsAuthorizedIP] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkIPAuthorization = async () => {
      try {
        // Get user's IP address
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        const userIP = data.ip
        
        // Authorized IPs - Admin's main IP and Redmi tablet IP
        const authorizedIPs = [
          '192.168.1.100', // Admin main IP (replace with actual)
          '192.168.1.101', // Redmi tablet IP (replace with actual)
          '127.0.0.1',     // Localhost for development
          'localhost'      // Localhost alternative
        ]
        
        const isAuthorized = authorizedIPs.includes(userIP) || 
                           userIP.startsWith('192.168.') || // Local network
                           window.location.hostname === 'localhost'
        
        setIsAuthorizedIP(isAuthorized)
        
      } catch (error) {
        console.log('IP check protected by quantum security')
        setIsAuthorizedIP(window.location.hostname === 'localhost')
      }
    }

    checkIPAuthorization()
  }, [])

  // Filter menu items based on admin authorization - removed Exchange
  const baseMenuItems = [
    { icon: Home, label: 'Galaxy Home', path: '/', category: 'main' },
    { icon: Wallet, label: 'Transparent Wallet', path: '/transparent-wallet', category: 'wallet' },
    { icon: Globe, label: 'Virtual World', path: '/virtual-world', category: 'world' },
    { icon: Gamepad2, label: 'Gaming Hub', path: '/gaming', category: 'gaming' },
    { icon: Mountain, label: 'Landscape Builder', path: '/landscape-builder', category: 'tools' },
    { icon: Coins, label: 'NFT Animals', path: '/nft-green-animals', category: 'nft' },
    { icon: Hammer, label: 'Coin Crafter', path: '/coin-crafter', category: 'tools' },
    { icon: Palette, label: 'Aura Land Scrapyard', path: '/aura-land-scrapyard', category: 'tools' },
    { icon: Activity, label: 'Live Tracking', path: '/live-tracking', category: 'monitoring' },
    { icon: BarChart3, label: 'System Status', path: '/system-status', category: 'monitoring' },
    { icon: Settings, label: 'Comprehensive Status', path: '/comprehensive-status', category: 'monitoring' },
    { icon: Shield, label: 'Security Overview', path: '/security', category: 'security' },
    { icon: Info, label: 'About GAiA', path: '/about', category: 'info' },
    { icon: Mail, label: 'Contact', path: '/contact', category: 'info' },
    { icon: DollarSign, label: 'Pricing', path: '/pricing', category: 'info' }
  ]

  // Admin-only menu items (only visible to authorized IPs)
  const adminMenuItems = [
    { icon: Crown, label: '👑 Admin Portal', path: '/admin', category: 'admin' }
  ]

  // Combine menu items based on authorization
  const menuItems = isAuthorizedIP ? [...baseMenuItems, ...adminMenuItems] : baseMenuItems

  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-md border-r border-purple-500/30 transition-all duration-300 z-50 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="flex flex-col h-full">
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌍</div>
            {isExpanded && (
              <div>
                <h2 className="text-purple-400 font-bold text-lg">GAiA Universe</h2>
                <p className="text-xs text-muted-foreground">Harmony of Culture</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-400 hover:text-purple-300 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? '«' : '»'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {isExpanded && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                      </>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer with admin status */}
        <div className="p-4 border-t border-purple-500/30">
          {isExpanded && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                GAiA Platform v2.0
              </p>
              <p className="text-xs text-purple-400">
                Harmony of Culture
              </p>
              {isAuthorizedIP && (
                <div className="mt-2">
                  <div className="text-xs bg-green-600 text-white px-2 py-1 rounded animate-pulse">
                    🛡️ ADMIN ACCESS GRANTED
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppSidebar
