
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Shield, Globe } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAIA Exchange
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/trading" className="text-sm hover:text-green-400 transition-colors">
              Trading
            </Link>
            <Link to="/community" className="text-sm hover:text-blue-400 transition-colors">
              Community
            </Link>
            <Link to="/sustainability" className="text-sm hover:text-purple-400 transition-colors">
              Sustainability
            </Link>
            <Link to="/admin-login" className="flex items-center gap-1 text-sm hover:text-orange-400 transition-colors">
              <Shield className="h-4 w-4" />
              Admin
            </Link>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link 
              to="/trading" 
              className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Trading
            </Link>
            <Link 
              to="/community" 
              className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/sustainability" 
              className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Sustainability
            </Link>
            <Link 
              to="/admin-login" 
              className="block px-4 py-2 text-sm hover:bg-muted rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Admin Access
            </Link>
            <div className="px-4 py-2">
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
