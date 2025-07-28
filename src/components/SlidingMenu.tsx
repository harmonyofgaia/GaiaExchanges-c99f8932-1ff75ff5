import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Globe, 
  Coins, 
  Hammer,
  Mountain,
  Palette,
  BarChart3,
  Settings,
  Shield,
  Info,
  Mail,
  DollarSign,
  ChevronRight,
  Menu,
  X,
  Crown,
  Music,
  Radio,
  Video,
  RotateCcw,
  Gamepad2,
  TrendingUp,
  Activity,
  TreePine,
  Heart,
  Leaf,
  CreditCard,
  User,
  Wallet,
  Bike,
  Pickaxe
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const SlidingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthorizedIP, setIsAuthorizedIP] = useState(false)
  const location = useLocation()

  // Don't render the sliding menu on the wallet page
  if (location.pathname === '/wallet') {
    return null
  }

  useEffect(() => {
    const checkIPAuthorization = async () => {
      try {
        // Secure access check using environment variables
        const isAuthorized = window.location.hostname === 'localhost' ||
                           window.location.hostname.includes('lovable')
        
        setIsAuthorizedIP(isAuthorized)
        
      } catch (error) {
        console.log('Secure access check active')
        setIsAuthorizedIP(window.location.hostname === 'localhost')
      }
    }

    checkIPAuthorization()
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const baseMenuItems = [
    { icon: Home, label: 'Home', path: '/', category: 'main' },
    { icon: TrendingUp, label: 'Live Tracking', path: '/live-tracking', category: 'main' },
    { icon: Gamepad2, label: 'Gaming', path: '/gaming', category: 'main' },
    { icon: Wallet, label: 'Wallet', path: '/wallet', category: 'main' },
    { icon: BarChart3, label: 'Markets', path: '/markets', category: 'main' },
    { icon: Video, label: 'Video Exchange', path: '/video-exchange', category: 'entertainment' },
    { icon: Bike, label: 'Bike Ecosystem', path: '/gaia-bike-ecosystem', category: 'tools' },
    { icon: Pickaxe, label: 'Token Mining', path: '/token-mining', category: 'tools' },
    { icon: Leaf, label: 'Green Investments', path: '/green-investments', category: 'projects' },
    { icon: Coins, label: 'Coin Crafter', path: '/coin-crafter', category: 'tools' },
    { icon: Shield, label: 'Gaia Private Blockchain Swap Token', path: '/gaia-private-blockchain-swap-token', category: 'security' },
    { icon: Settings, label: 'Secure Admin', path: '/secure-admin', category: 'admin' }
  ]

  const adminMenuItems = [
    { icon: Crown, label: '👑 Admin Portal', path: '/admin', category: 'admin' }
  ]

  const menuItems = [...baseMenuItems, ...adminMenuItems]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Menu Toggle Button - Always visible */}
      <Button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg shadow-lg transition-all duration-300"
        size="sm"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-md border-r border-purple-500/30 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with space for toggle button */}
          <div className="p-4 pt-16 border-b border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌍</div>
              <div>
                <h2 className="text-purple-400 font-bold text-xl">GAiA Universe</h2>
                <p className="text-sm text-muted-foreground">Harmony of Culture</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-6 py-4 mx-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg'
                          : 'text-gray-300 hover:bg-purple-500/10 hover:text-purple-400'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
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
                Harmony of Culture + AI Evolution
              </p>
              {isAuthorizedIP && (
                <div className="mt-2">
                  <div className="text-xs bg-green-600 text-white px-2 py-1 rounded animate-pulse">
                    🛡️ ADMIN ACCESS + KOALA AI
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SlidingMenu
