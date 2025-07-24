
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Menu, 
  X, 
  Home, 
  ArrowLeftRight, 
  Wallet, 
  Shield,
  Vault,
  Globe,
  Heart
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Exchange', href: '/exchange', icon: ArrowLeftRight },
    { name: 'Transparent Wallet', href: '/transparent-wallet', icon: Wallet },
    { name: 'Fee Vault', href: '/fee-vault', icon: Vault },
    { name: 'Admin', href: '/admin', icon: Shield },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-green-400 font-bold text-xl">GAiA</span>
              <span className="text-xs text-green-300">Harmony of Culture</span>
            </div>
          </Link>

          {/* Official Token Badge */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge className="bg-green-600 text-white px-3 py-1">
              <Heart className="h-3 w-3 mr-1" />
              Official GAiA Token
            </Badge>
            <div className="text-xs text-green-300">
              {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 10)}...{GAIA_TOKEN.WALLET_ADDRESS.slice(-6)}
            </div>
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
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive(item.href)
                        ? 'bg-green-600 text-white'
                        : 'text-green-300 hover:bg-green-900/50 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
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
              className="text-green-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-md border-t border-green-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 ${
                    isActive(item.href)
                      ? 'bg-green-600 text-white'
                      : 'text-green-300 hover:bg-green-900/50 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
          
          {/* Mobile Token Info */}
          <div className="px-4 py-3 border-t border-green-500/20">
            <Badge className="bg-green-600 text-white px-3 py-1 mb-2">
              <Heart className="h-3 w-3 mr-1" />
              Official GAiA Token
            </Badge>
            <div className="text-xs text-green-300 break-all">
              Wallet: {GAIA_TOKEN.WALLET_ADDRESS}
            </div>
            <div className="text-xs text-purple-300 break-all">
              Contract: {GAIA_TOKEN.CONTRACT_ADDRESS}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
