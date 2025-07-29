
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from './auth/AuthProvider'
import { toast } from 'sonner'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tokenomics', label: 'Tokenomics' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/games', label: 'Games' },
    { href: '/vault', label: 'Vault' },
    { href: '/community', label: 'Community' },
    { href: '/news', label: 'News' },
    { href: '/trading', label: 'Trading' },
    { href: '/staking', label: 'Staking' },
    { href: '/airdrop', label: 'Airdrop' },
    { href: '/referral', label: 'Referral' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/lore', label: 'Lore' },
    { href: '/docs', label: 'Docs' },
    { href: '/support', label: 'Support' },
    { href: '/partnerships', label: 'Partnerships' },
    { href: '/governance', label: 'Governance' },
    { href: '/nfts', label: 'NFTs' },
    { href: '/metaverse', label: 'Metaverse' },
    { href: '/ai', label: 'AI' },
    { href: '/defi', label: 'DeFi' },
    { href: '/store', label: 'Store' },
    { href: '/creator', label: 'Creator' },
    { href: '/events', label: 'Events' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/earning', label: 'Earning' },
    { href: '/loyalty-program', label: 'Loyalty' },
    { href: '/farming', label: 'Farming' },
    { href: '/ecosystem', label: 'Ecosystem' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/launchpad', label: 'Launchpad' },
    { href: '/bridge', label: 'Bridge' },
    { href: '/lending', label: 'Lending' },
    { href: '/insurance', label: 'Insurance' },
    { href: '/prediction', label: 'Prediction' },
    { href: '/dao', label: 'DAO' },
    { href: '/ide', label: 'IDE' },
    { href: '/chat', label: 'Chat' }
  ]

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">GAiA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.slice(0, 8).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
