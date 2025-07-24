
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  Gamepad2, 
  Shield, 
  Download,
  Coins,
  TreePine,
  Trophy,
  Heart,
  Rocket,
  Brain
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { GAIA_TOKEN } from '@/constants/gaia'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/exchange', label: 'Exchange', icon: Coins },
    { path: '/environmental-games', label: 'Games Hub', icon: Gamepad2, badge: 'New' },
    { path: '/global-leaderboard', label: 'Leaderboard', icon: Trophy, badge: 'Live' },
    { path: '/animal-rescue', label: 'Animal Rescue', icon: Heart, badge: 'NFT' },
    { path: '/gaias-projects', label: 'Green Projects', icon: TreePine },
    { path: '/secure-admin', label: 'Admin', icon: Shield },
  ]

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAIA Exchanges
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`relative ${
                    isActive(item.path) 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs px-1 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Official GAiA Token Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs text-green-300">Official GAiA Token</div>
              <div className="text-xs font-mono text-green-400">
                {GAIA_TOKEN.WALLET_ADDRESS.substring(0, 8)}...
              </div>
            </div>
            <a 
              href={GAIA_TOKEN.PUMP_FUN_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Trade on PumpFun
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-green-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-green-500/30">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.path) 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-300 hover:text-green-400 hover:bg-green-900/20'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-2 bg-red-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile GAiA Token Info */}
              <div className="pt-4 border-t border-green-500/30">
                <div className="text-center">
                  <div className="text-xs text-green-300 mb-1">Official GAiA Token</div>
                  <div className="text-xs font-mono text-green-400 mb-2">
                    {GAIA_TOKEN.WALLET_ADDRESS}
                  </div>
                  <a 
                    href={GAIA_TOKEN.PUMP_FUN_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Trade on PumpFun
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
