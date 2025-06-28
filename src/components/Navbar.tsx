
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  User, 
  Mail, 
  Download,
  Shield,
  Menu,
  X,
  Leaf,
  Target,
  Wrench
} from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Leaf },
    { name: 'Wallet', href: '/wallet', icon: Wallet },
    { name: 'Exchange', href: '/exchange', icon: TrendingUp },
    { name: 'Markets', href: '/markets', icon: BarChart3 },
    { name: 'Security', href: '/ultimate-security', icon: Shield },
    { name: 'Marketing', href: '/marketing', icon: Target },
    { name: 'Tech Support', href: '/techno-soul-solutions', icon: Wrench },
    { name: 'Downloads', href: '/downloads', icon: Download },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold text-white">Harmony of Gaia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-gray-300 hover:bg-green-500/10 hover:text-green-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-green-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/98 border-t border-green-500/20">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-gray-300 hover:bg-green-500/10 hover:text-green-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
