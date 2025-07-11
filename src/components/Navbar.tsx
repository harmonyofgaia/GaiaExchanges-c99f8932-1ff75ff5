
import { Button } from "@/components/ui/button"
import { Menu, User, Home, Info, Users, Gamepad2, RefreshCw } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import SlidingMenu from "./SlidingMenu"
import { GaiaLogo } from "./GaiaLogo"
import { useAuth } from "@/contexts/AuthContext"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Info, label: "About", path: "/about" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: RefreshCw, label: "Exchange", path: "/exchange" },
    { icon: Gamepad2, label: "Gaming", path: "/gaming" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-green-500/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(true)}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <Link to="/" className="flex items-center gap-2">
                <GaiaLogo size="sm" />
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  GAIA
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-green-500/20 text-green-400"
                        : "text-gray-300 hover:text-green-400 hover:bg-green-500/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                      🔒 Admin Portal
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/auth">
                    <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <SlidingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
