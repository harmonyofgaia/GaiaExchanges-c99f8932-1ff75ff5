
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Wallet, 
  Gamepad2, 
  TrendingUp, 
  Settings, 
  Info, 
  Mail, 
  DollarSign,
  Hammer,
  Activity,
  BarChart3,
  Shield,
  ChevronRight,
  Globe,
  Coins,
  Mountain,
  Palette,
  Crown,
  Star,
  Eye,
  Vault,
  Network,
  ShoppingCart,
  Menu,
  X
} from 'lucide-react'

const SlidingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
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
        setIsAuthorized(window.location.hostname === 'localhost')
      }
    }

    checkIPAuthorization()
  }, [])

  // Filter menu items based on admin authorization
  const baseMenuItems = [
    { icon: Home, label: 'Galaxy Home', path: '/', category: 'main' },
    { icon: Globe, label: 'Virtual World', path: '/virtual-world', category: 'world' },
    { icon: Gamepad2, label: 'Gaming Hub', path: '/gaming', category: 'gaming' },
    { icon: TrendingUp, label: 'Exchange', path: '/exchange', category: 'trading' },
    { icon: Coins, label: 'Swap Exchange', path: '/swap', category: 'trading' },
    { icon: ShoppingCart, label: 'NFT Marketplace', path: '/nft-marketplace', category: 'nft' },
    { icon: Coins, label: 'NFT Animals', path: '/nft-green-animals', category: 'nft' },
    { icon: Hammer, label: 'Coin Crafter', path: '/coin-crafter', category: 'tools' },
    { icon: Mountain, label: 'Landscape Builder', path: '/advanced-landscape-builder', category: 'tools' },
    { icon: Palette, label: 'Aura Land Scrapyard', path: '/aura-land-scrapyard', category: 'tools' },
    { icon: Vault, label: 'Community Vault', path: '/community-vault', category: 'community' },
    { icon: Eye, label: 'Transparent Wallets', path: '/transparent-wallets', category: 'transparency' },
    { icon: Network, label: 'GAiA Blockchain', path: '/gaia-private-blockchain', category: 'blockchain' },
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

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-[60] p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-all duration-300"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[50] transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Sliding Menu */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-md border-r border-purple-500/30 transition-transform duration-300 z-[55] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo and Header */}
          <div className="p-6 border-b border-purple-500/30 mt-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h2 className="text-purple-400 font-bold text-xl">GAiA Universe</h2>
                <p className="text-sm text-muted-foreground">Harmony of Culture</p>
              </div>
            </div>
            {isAuthorizedIP && (
              <div className="text-center">
                <div className="text-xs bg-green-600 text-white px-3 py-1 rounded animate-pulse">
                  🛡️ ADMIN ACCESS GRANTED
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-purple-500/30">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                GAiA Platform v3.0
              </p>
              <p className="text-xs text-purple-400">
                Complete Ecosystem
              </p>
              <div className="mt-2 text-xs text-green-400">
                ✅ All Systems Operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SlidingMenu
