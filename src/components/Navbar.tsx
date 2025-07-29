
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Shield, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Tokenomics', path: '/tokenomics' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Games', path: '/games' },
    { name: 'Vault', path: '/vault' },
    { name: 'Earning', path: '/earning' },
    { name: 'Community', path: '/community' },
    { name: 'Staking', path: '/staking' },
    { name: 'Governance', path: '/governance' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'NFT', path: '/nft' },
    { name: 'DeFi', path: '/defi' },
    { name: 'Trading', path: '/trading' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'Support', path: '/support' },
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Referrals', path: '/referrals' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Security', path: '/security' },
    { name: 'API', path: '/api' },
    { name: 'Developers', path: '/developers' },
    { name: 'Partnerships', path: '/partnerships' },
    { name: 'Legal', path: '/legal' },
  ]

  const coreItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Tokenomics', path: '/tokenomics' },
    { name: 'Roadmap', path: '/roadmap' },
  ]

  const defiItems = [
    { name: 'DeFi', path: '/defi' },
    { name: 'Staking', path: '/staking' },
    { name: 'Trading', path: '/trading' },
    { name: 'Governance', path: '/governance' },
  ]

  const ecosystemItems = [
    { name: 'Games', path: '/games' },
    { name: 'NFT', path: '/nft' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Community', path: '/community' },
  ]

  const earningItems = [
    { name: 'Earning', path: '/earning' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Referrals', path: '/referrals' },
    { name: 'Achievements', path: '/achievements' },
  ]

  const platformItems = [
    { name: 'Vault', path: '/vault' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Notifications', path: '/notifications' },
  ]

  const moreItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'Support', path: '/support' },
    { name: 'News', path: '/news' },
    { name: 'Events', path: '/events' },
    { name: 'Security', path: '/security' },
    { name: 'API', path: '/api' },
    { name: 'Developers', path: '/developers' },
    { name: 'Partnerships', path: '/partnerships' },
    { name: 'Legal', path: '/legal' },
  ]

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">GAiA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Core Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Core</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {coreItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={isActive(item.path) ? 'bg-accent' : ''}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* DeFi Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>DeFi</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {defiItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={isActive(item.path) ? 'bg-accent' : ''}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Ecosystem Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Ecosystem</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {ecosystemItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={isActive(item.path) ? 'bg-accent' : ''}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Earning Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Earning</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {earningItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={isActive(item.path) ? 'bg-accent' : ''}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Platform</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {platformItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={isActive(item.path) ? 'bg-accent' : ''}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>More</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={isActive(item.path) ? 'bg-accent' : ''}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Access - Updated to point to secure-admin */}
            <Link to="/secure-admin">
              <Button variant="outline" className="flex items-center space-x-2 border-red-500/30 hover:bg-red-500/10">
                <Shield className="h-4 w-4 text-red-400" />
                <span className="text-red-400">Admin</span>
                <Badge variant="destructive" className="text-xs">SECURE</Badge>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Admin Access - Updated to point to secure-admin */}
              <Link
                to="/secure-admin"
                className="block px-3 py-2 text-base font-medium rounded-md transition-colors text-red-400 hover:bg-red-500/10"
                onClick={() => setIsOpen(false)}
              >
                🛡️ Admin (SECURE)
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
