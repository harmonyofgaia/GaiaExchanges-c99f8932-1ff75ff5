
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from './auth/AuthProvider'
import { toast } from 'sonner'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

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

  const coreNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/tokenomics', label: 'Tokenomics' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/games', label: 'Games' },
    { href: '/vault', label: 'Vault' },
    { href: '/community', label: 'Community' },
    { href: '/news', label: 'News' },
    { href: '/trading', label: 'Trading' }
  ]

  const defiLinks = [
    { href: '/staking', label: 'Staking' },
    { href: '/farming', label: 'Farming' },
    { href: '/lending', label: 'Lending' },
    { href: '/bridge', label: 'Bridge' },
    { href: '/defi', label: 'DeFi' },
    { href: '/launchpad', label: 'Launchpad' }
  ]

  const ecosystemLinks = [
    { href: '/nfts', label: 'NFTs' },
    { href: '/metaverse', label: 'Metaverse' },
    { href: '/ai', label: 'AI' },
    { href: '/dao', label: 'DAO' },
    { href: '/governance', label: 'Governance' },
    { href: '/ecosystem', label: 'Ecosystem' }
  ]

  const earningLinks = [
    { href: '/airdrop', label: 'Airdrop' },
    { href: '/earning', label: 'Earning' },
    { href: '/referral', label: 'Referral' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/loyalty-program', label: 'Loyalty' },
    { href: '/prediction', label: 'Prediction' }
  ]

  const platformLinks = [
    { href: '/store', label: 'Store' },
    { href: '/creator', label: 'Creator' },
    { href: '/events', label: 'Events' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/insurance', label: 'Insurance' }
  ]

  const supportLinks = [
    { href: '/docs', label: 'Docs' },
    { href: '/support', label: 'Support' },
    { href: '/partnerships', label: 'Partnerships' },
    { href: '/lore', label: 'Lore' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/ide', label: 'IDE' },
    { href: '/chat', label: 'Chat' }
  ]

  const allNavLinks = [
    ...coreNavLinks,
    ...defiLinks,
    ...ecosystemLinks,
    ...earningLinks,
    ...platformLinks,
    ...supportLinks
  ]

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">GAiA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Core Navigation */}
                {coreNavLinks.slice(0, 4).map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link
                      to={link.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === link.href
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* DeFi Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    DeFi
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {defiLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link
                            to={link.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
                              location.pathname === link.href ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Ecosystem Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Ecosystem
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {ecosystemLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link
                            to={link.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
                              location.pathname === link.href ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Earning Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Earning
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {earningLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link
                            to={link.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
                              location.pathname === link.href ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Platform Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Platform
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {platformLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link
                            to={link.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
                              location.pathname === link.href ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Support Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {supportLinks.map((link) => (
                        <NavigationMenuLink key={link.href} asChild>
                          <Link
                            to={link.href}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
                              location.pathname === link.href ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">{link.label}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 max-h-[70vh] overflow-y-auto">
            {allNavLinks.map((link) => (
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
