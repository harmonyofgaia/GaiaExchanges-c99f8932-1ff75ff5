
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Hammer, 
  Activity, 
  Shield, 
  Wallet, 
  TrendingUp, 
  Gamepad2,
  Menu,
  X
} from 'lucide-react'
import { GaiaLogo } from './GaiaLogo'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/coin-crafter', label: 'Coin Crafter', icon: Hammer },
    { path: '/live-tracking', label: 'Live Tracking', icon: Activity },
    { path: '/immortal-security', label: 'Security', icon: Shield },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/exchange', label: 'Exchange', icon: TrendingUp },
    { path: '/gaming', label: 'Gaming', icon: Gamepad2 },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GaiaLogo size="sm" variant="white-fade" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Harmony of Gaia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isActive(item.path) 
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start gap-2 ${
                        isActive(item.path) 
                          ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
