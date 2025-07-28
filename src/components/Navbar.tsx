
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  User, 
  Settings, 
  LogOut, 
  Wallet,
  TreePine,
  Car,
  Gamepad2,
  TrendingUp,
  Coins,
  Shield,
  Menu,
  X,
  ChevronDown,
  Crown,
  Pickaxe,
  Zap,
  LogIn
} from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { toast } from 'sonner'

const mainNavItems = [
  { name: 'Home', path: '/', icon: Home, public: true },
  { name: 'Dashboard', path: '/dashboard', icon: Home, public: false },
  { name: 'GAiA Token Wallet', path: '/wallet', icon: Wallet, public: false },
  { name: 'Game Center', path: '/game-center', icon: Gamepad2, public: false },
  { name: 'Bike-to-Earn', path: '/bike-to-earn', icon: Car, public: false },
  { name: 'Eco Missions', path: '/eco-missions', icon: TreePine, public: false },
]

const tokenEconomyItems = [
  { name: 'Token Mining', path: '/token-mining', icon: Pickaxe },
  { name: 'Coin Crafter', path: '/coin-crafter', icon: Coins },
  { name: 'Sand Protect', path: '/sand-protect', icon: Shield },
]

export function Navbar() {
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const isActive = (path: string) => location.pathname === path

  // Filter navigation items based on authentication status
  const visibleNavItems = mainNavItems.filter(item => user || item.public)

  return (
    <nav className="bg-gradient-to-r from-green-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🌍 GAiA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                {/* Main Nav Items */}
                {visibleNavItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-green-600/50 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* Token Economy Dropdown - Only for authenticated users */}
                {user && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50">
                      <Coins className="w-4 h-4 mr-2" />
                      Token Economy
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2">
                        {tokenEconomyItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {/* Admin Section - Only for authenticated users */}
                {user && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50">
                      <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                      Admin Portal
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2">
                        <Link
                          to="/admin-security-center"
                          className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Security Center
                        </Link>
                        <Link
                          to="/secure-admin"
                          className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/security"
                          className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Security Monitor
                        </Link>
                        <Link
                          to="/quantum-security"
                          className="flex items-center px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Shield className="w-4 h-4 mr-2 text-red-400" />
                          Quantum Security
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User Menu or Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.email}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
                <Link to="/auth" className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {visibleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-green-600/50 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
            
            {user && (
              <>
                <div className="border-t border-gray-700 mt-4 pt-4">
                  <div className="text-sm font-medium text-gray-400 px-3 py-2">Token Economy</div>
                  {tokenEconomyItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center px-6 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700/50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-gray-700 mt-4 pt-4">
                  <div className="text-sm font-medium text-gray-400 px-3 py-2 flex items-center">
                    <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                    Admin Portal
                  </div>
                  <Link
                    to="/admin-security-center"
                    className="flex items-center px-6 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    Security Center
                  </Link>
                  <Link
                    to="/secure-admin"
                    className="flex items-center px-6 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-700/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Crown className="w-4 h-4 mr-3 text-yellow-400" />
                    Admin Dashboard
                  </Link>
                </div>
              </>
            )}
            
            <div className="border-t border-gray-700 mt-4 pt-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
