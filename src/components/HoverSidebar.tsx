
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { 
  Home, 
  Wallet, 
  Globe, 
  Flame, 
  Activity, 
  Settings, 
  BarChart3, 
  Shield, 
  Users, 
  Inbox, 
  DollarSign,
  Menu,
  X
} from 'lucide-react'

const navigationItems = [
  { name: '🏠 Home', path: '/', icon: Home },
  { name: '💰 Wallet', path: '/wallet', icon: Wallet },
  { name: '🌍 Virtual World', path: '/virtual-world', icon: Globe },
  { name: '🔥 Coin Crafter', path: '/coin-crafter', icon: Flame },
  { name: '📊 Live Tracking', path: '/live-tracking', icon: Activity },
  { name: '🛡️ System Status', path: '/system-status', icon: Settings },
  { name: '📈 Comprehensive Status', path: '/comprehensive-status', icon: BarChart3 },
  { name: '🔒 Immortal Security', path: '/immortal-security', icon: Shield },
  { name: 'ℹ️ About', path: '/about', icon: Users },
  { name: '📞 Contact', path: '/contact', icon: Inbox },
  { name: '💲 Pricing', path: '/pricing', icon: DollarSign }
]

export function HoverSidebar() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {/* Hover trigger area */}
      <div
        className="fixed left-0 top-0 w-4 h-full z-40 bg-transparent"
        onMouseEnter={() => setIsVisible(true)}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-50 transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Card className="h-full w-72 bg-black/90 backdrop-blur-lg border-green-500/30 rounded-none">
          <div className="p-4 border-b border-green-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                🌍 HARMONY OF GAIA
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-green-400 hover:text-green-300 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-green-300 mt-1">Heavenly Fortress Navigation</p>
          </div>
          
          <div className="p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-lg bg-green-900/20 hover:bg-green-900/40 text-green-300 hover:text-green-100 transition-all duration-200 border border-green-500/20 hover:border-green-500/40"
                onClick={() => setIsVisible(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
            <div className="text-xs text-green-400 text-center">
              🛡️ Better • Faster • Stronger
              <br />
              <span className="text-green-300">Admin has full control</span>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
