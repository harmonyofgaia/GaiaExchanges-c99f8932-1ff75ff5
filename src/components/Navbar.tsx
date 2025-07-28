import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-500/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-lg font-semibold text-green-400">
              <img src="/gaia-logo.png" alt="GAiA Logo" className="h-8 w-auto mr-2" />
              GAiA Exchanges
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium"
            >
              🏠 Home
            </Link>
            <Link 
              to="/earning-activities" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              🎯 Earning Activities
            </Link>
            <Link 
              to="/earning-systems" 
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
            >
              🪙 Earning Systems
            </Link>
            <Link 
              to="/green-investments" 
              className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium"
            >
              🌱 Green Investments
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Open menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* User section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-400">Welcome, {user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="block px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link 
              to="/earning-activities"
              className="block px-3 py-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              🎯 Earning Activities
            </Link>
            <Link 
              to="/earning-systems"
              className="block px-3 py-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              🪙 Earning Systems
            </Link>
            <Link 
              to="/green-investments"
              className="block px-3 py-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              🌱 Green Investments
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
