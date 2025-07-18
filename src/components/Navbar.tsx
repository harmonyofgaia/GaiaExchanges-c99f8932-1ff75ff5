
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { WalletConnection } from '@/components/WalletConnection'
import { 
  Home, 
  Settings, 
  Video,
  Upload,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export function Navbar() {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [showWalletConnection, setShowWalletConnection] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/artist-streaming', label: 'Live Artist Shows', icon: Video },
    { path: '/video-sharing', label: 'Video Platform', icon: Upload },
  ]

  return (
    <>
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                🌍 Harmony of Gaia
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                onClick={() => setShowWalletConnection(!showWalletConnection)}
                variant="outline"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
              >
                💳 Connect Wallet
              </Button>

              <Link to="/admin">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>

              {user && (
                <Button onClick={signOut} variant="ghost">
                  Sign Out
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  onClick={() => {
                    setShowWalletConnection(!showWalletConnection)
                    setMobileMenuOpen(false)
                  }}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
                >
                  💳 Connect Wallet
                </Button>

                <Link to="/admin" className="block">
                  <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>

                {user && (
                  <Button onClick={signOut} variant="ghost" className="w-full">
                    Sign Out
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Wallet Connection Modal */}
      {showWalletConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Connect Your Wallets</h2>
                <Button
                  onClick={() => setShowWalletConnection(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <WalletConnection />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
