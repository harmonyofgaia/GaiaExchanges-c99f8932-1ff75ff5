import { useState } from 'react'
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
  Lock,
  Crown,
  Star,
  Book
} from 'lucide-react'

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Galaxy Home', path: '/', category: 'main' },
    { icon: Globe, label: 'Virtual World', path: '/virtual-world', category: 'world' },
    { icon: Gamepad2, label: 'Gaming Hub', path: '/gaming', category: 'gaming' },
    { icon: TrendingUp, label: 'Exchange', path: '/exchange', category: 'trading' },
    { icon: Coins, label: 'NFT Animals', path: '/nft-green-animals', category: 'nft' },
    { icon: Hammer, label: 'Coin Crafter', path: '/coin-crafter', category: 'tools' },
    { icon: Mountain, label: 'Landscape Builder', path: '/landscape-builder', category: 'tools' },
    { icon: Palette, label: 'Aura Land Scrapyard', path: '/aura-land-scrapyard', category: 'tools' },
    { icon: Activity, label: 'Live Tracking', path: '/live-tracking', category: 'monitoring' },
    { icon: BarChart3, label: 'System Status', path: '/system-status', category: 'monitoring' },
    { icon: Settings, label: 'Comprehensive Status', path: '/comprehensive-status', category: 'monitoring' },
    { icon: Shield, label: 'Ultimate Security', path: '/ultimate-security', category: 'security' },
    { icon: Lock, label: 'Immortal Security', path: '/immortal-security', category: 'security' },
    { icon: Crown, label: 'Secure Vault', path: '/secure-vault', category: 'admin' },
    { icon: User, label: 'Admin Portal', path: '/admin', category: 'admin' },
    { icon: Star, label: 'Ultimate Features', path: '/ultimate-features', category: 'special' },
    { icon: Download, label: 'Enhanced Downloads', path: '/enhanced-downloads', category: 'resources' },
    { icon: Info, label: 'About GAiA', path: '/about', category: 'info' },
    { icon: Mail, label: 'Contact', path: '/contact', category: 'info' },
    { icon: DollarSign, label: 'Pricing', path: '/pricing', category: 'info' },
    { icon: Book, label: 'Documentation', path: '/docs', category: 'info' }
  ]

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

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/30">
          {isExpanded && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                GAiA Platform v2.0
              </p>
              <p className="text-xs text-purple-400">
                Harmony of Culture
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppSidebar
