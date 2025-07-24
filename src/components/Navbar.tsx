
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, Shield, Wallet, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GAIA_TOKEN } from '@/constants/gaia'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Exchange', path: '/exchange' },
    { name: 'Transparent Wallet', path: '/wallet' },
    { name: 'Fee Vault', path: '/fee-vault' },
    { name: 'Admin', path: '/admin' },
  ]

  return (
    <nav className="bg-gradient-to-r from-green-900/80 to-blue-900/80 backdrop-blur-sm border-b border-green-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-400">GAIA Token</h1>
              <p className="text-xs text-green-300">Harmony of Culture</p>
            </div>
          </Link>

          {/* Official Token Info */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge className="bg-green-600/80 text-white">
              <Wallet className="h-3 w-3 mr-1" />
              Official GAIA Token
            </Badge>
            <div className="text-xs text-green-300">
              Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 8)}...{GAIA_TOKEN.WALLET_ADDRESS.slice(-8)}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-green-300 hover:text-green-100 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href={GAIA_TOKEN.PUMP_FUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Trade GAIA
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden text-green-300 hover:text-green-100"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-green-500/20 bg-gradient-to-b from-green-900/50 to-blue-900/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Token Info Mobile */}
              <div className="px-3 py-2 border-b border-green-500/20 mb-2">
                <Badge className="bg-green-600/80 text-white mb-2">
                  <Shield className="h-3 w-3 mr-1" />
                  Official GAIA Token
                </Badge>
                <div className="text-xs text-green-300">
                  Wallet: {GAIA_TOKEN.WALLET_ADDRESS.slice(0, 12)}...
                </div>
                <div className="text-xs text-blue-300">
                  Contract: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 12)}...
                </div>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-green-300 hover:text-green-100 hover:bg-green-800/20 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
              <a
                href={GAIA_TOKEN.PUMP_FUN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1 mx-3 mt-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Trade GAIA
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
