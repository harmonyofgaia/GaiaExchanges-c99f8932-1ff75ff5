
import { useState } from 'react';
import { Menu, X, Coins, Leaf, TrendingUp, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-green-900/80 to-emerald-900/80 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              GAiA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-green-300 hover:text-green-200 transition-colors">
              Home
            </Link>
            <Link to="/green-investments" className="text-green-300 hover:text-green-200 transition-colors flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Green Investments
            </Link>
            <Link to="/earning-activities" className="text-green-300 hover:text-green-200 transition-colors flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Earning Activities
            </Link>
            <Link to="/earning-systems" className="text-green-300 hover:text-green-200 transition-colors flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Earning Systems
            </Link>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Coins className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-green-300 hover:text-green-200 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-900/50 backdrop-blur-sm rounded-lg mt-2">
              <Link 
                to="/" 
                className="block px-3 py-2 text-green-300 hover:text-green-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/green-investments" 
                className="block px-3 py-2 text-green-300 hover:text-green-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Green Investments
              </Link>
              <Link 
                to="/earning-activities" 
                className="block px-3 py-2 text-green-300 hover:text-green-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Earning Activities
              </Link>
              <Link 
                to="/earning-systems" 
                className="block px-3 py-2 text-green-300 hover:text-green-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Earning Systems
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Coins className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
