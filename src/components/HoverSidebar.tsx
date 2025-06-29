
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { 
  Home, 
  Shield, 
  Wallet, 
  Info, 
  Coins, 
  Activity, 
  Lock, 
  BarChart3, 
  Gamepad2,
  Globe,
  Mail,
  DollarSign,
  ArrowLeftRight,
  Mountain,
  Building,
  TrendingUp,
  Users
} from 'lucide-react'

const menuItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: '👑 Admin Control', path: '/admin', icon: Shield },
  { name: '🔐 Secure Admin', path: '/secure-admin', icon: Lock },
  { name: 'Wallet', path: '/wallet', icon: Wallet },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Coin Crafter', path: '/coin-crafter', icon: Coins },
  { name: 'GAiA Coin Crafter', path: '/gaia-coin-crafter', icon: Coins },
  { name: 'Live Tracking', path: '/live-tracking', icon: Activity },
  { name: 'Immortal Security', path: '/immortal-security', icon: Lock },
  { name: 'System Status', path: '/system-status', icon: BarChart3 },
  { name: 'Comprehensive Status', path: '/comprehensive-status', icon: BarChart3 },
  { name: 'Gaming', path: '/gaming', icon: Gamepad2 },
  { name: 'GAIA Fighter Game', path: '/game', icon: Gamepad2 },
  { name: 'Landscape Builder', path: '/landscape-builder', icon: Mountain },
  { name: 'Virtual World', path: '/virtual-world', icon: Building },
  { name: 'Contact', path: '/contact', icon: Mail },
  { name: 'Pricing', path: '/pricing', icon: DollarSign },
  { name: 'Exchange', path: '/exchange', icon: ArrowLeftRight },
  { name: 'Markets', path: '/markets', icon: TrendingUp },
  { name: 'Marketing Hub', path: '/marketing-hub', icon: Users },
  { name: 'Global Marketing', path: '/global-marketing', icon: Globe },
  { name: 'Webshop', path: '/webshop', icon: Building }
]

export function HoverSidebar() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {/* Hover trigger area */}
      <div 
        className="fixed left-0 top-0 w-8 h-full z-40 cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-black/95 via-gray-900/95 to-green-900/95 backdrop-blur-md border-r border-green-500/30 transform transition-transform duration-300 z-50 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🌍 HARMONY OF GAIA
            </h2>
            <p className="text-sm text-green-300 mt-2">Parabolic Universe • GAiA Token • Admin Control</p>
          </div>
          
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/20">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500/20 transition-all duration-200 group"
              >
                <item.icon className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <span className="text-white group-hover:text-green-300 text-sm font-medium transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-green-900/30 rounded-lg border border-green-500/30">
            <p className="text-xs text-green-300 text-center">
              🛡️ Admin Parabolic Access • Invisible Operations • Quantum Protected
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
