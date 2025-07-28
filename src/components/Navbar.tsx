
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Shield, TrendingUp, Home } from 'lucide-react'
import { Button } from './ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-green-400 font-bold text-xl hover:text-green-300">
              🌱 GAiA Exchange
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-green-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/earning-activities"
                className="text-green-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Earning Activities
              </Link>
              <Link
                to="/secure-admin"
                className="text-red-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin Portal
              </Link>
            </div>
          </div>
          
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

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 rounded-lg mt-2">
              <Link
                to="/"
                className="text-green-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4 inline mr-2" />
                Home
              </Link>
              <Link
                to="/earning-activities"
                className="text-green-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <TrendingUp className="h-4 w-4 inline mr-2" />
                Earning Activities
              </Link>
              <Link
                to="/secure-admin"
                className="text-red-300 hover:text-red-400 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4 inline mr-2" />
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
