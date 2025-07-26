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
  Bike
} from 'lucide-react'

const HoverSidebar = () => {
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Globe, label: 'Virtual World', path: '/virtual-world' },
    { icon: Gamepad2, label: 'Gaming', path: '/gaming' },
    { icon: TrendingUp, label: 'Exchange', path: '/exchange' },
    { icon: Hammer, label: 'Coin Crafter', path: '/coin-crafter' },
    { icon: BarChart3, label: 'System Status', path: '/system-status' },
    { icon: Settings, label: 'Comprehensive Status', path: '/comprehensive-status' },
    { icon: Shield, label: 'Immortal Security', path: '/immortal-security' },
    { icon: Bike, label: 'GAiA Bike Ecosystem', path: '/gaia-bike-ecosystem' },
    { icon: Info, label: 'About', path: '/about' },
    { icon: Mail, label: 'Contact', path: '/contact' },
    { icon: DollarSign, label: 'Pricing', path: '/pricing' },
    { icon: Download, label: 'Downloads', path: '/downloads' }
  ]

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-md border-r border-purple-500/30 transition-all duration-300 z-50 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="p-4 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌍</div>
            {isHovered && (
              <div>
                <h2 className="text-purple-400 font-bold text-lg">GAiA</h2>
                <p className="text-xs text-muted-foreground">Harmony of Culture</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
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
                    {isHovered && (
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
          {isHovered && (
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

export default HoverSidebar
