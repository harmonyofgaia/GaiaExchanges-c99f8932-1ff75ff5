
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Menu,
  X,
  Home,
  BarChart3,
  Users,
  TreePine,
  Leaf,
  Heart,
  Target,
  Globe,
  Sparkles,
  Brain,
  Video,
  Settings,
  Shield
} from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navigationItems = [
    { title: "Home", to: "/", icon: Home },
    { title: "Dashboard", to: "/dashboard", icon: BarChart3 },
    { title: "Exchange", to: "/exchange", icon: Users },
    { title: "Gaia's Projects", to: "/gaias-projects", icon: TreePine },
    { title: "Green Impact", to: "/green-impact-dashboard", icon: Leaf },
    { title: "Project Funding", to: "/project-funding", icon: Heart },
    { title: "Eco Missions", to: "/eco-missions", icon: Target },
    { title: "Planet Cleaning", to: "/planet-cleaning", icon: Globe },
    { title: "NFT Cards", to: "/nft-cards", icon: Sparkles },
    { title: "Eco Avatar", to: "/eco-avatar", icon: Users },
    { title: "Sea Green AI", to: "/sea-green-psychohistorical", icon: Brain },
    { title: "Video Exchange", to: "/secure-admin/video-exchange", icon: Video },
  ]

  const adminItems = [
    { title: "Admin", to: "/admin", icon: Settings },
    { title: "Security", to: "/security", icon: Shield },
  ]

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-gray-700/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Jumping Animation */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl animate-bounce">🌍</div>
            <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.to} to={item.to}>
                  <Button
                    variant={isActive(item.to) ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-1 ${
                      isActive(item.to)
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.title}</span>
                  </Button>
                </Link>
              )
            })}
            
            {/* Admin Section */}
            <div className="border-l border-gray-700 ml-2 pl-2">
              {adminItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.to} to={item.to}>
                    <Button
                      variant={isActive(item.to) ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-1 ${
                        isActive(item.to)
                          ? 'bg-red-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden xl:inline">{item.title}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-sm rounded-lg mt-2 border border-gray-700/20">
              {[...navigationItems, ...adminItems].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
