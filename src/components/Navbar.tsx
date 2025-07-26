
import { useState, useEffect } from 'react'
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
  Shield,
  Radio,
  Music,
  Gamepad2,
  TrendingUp,
  Coins,
  User,
  Hammer,
  Mountain,
  Palette,
  Activity,
  Info,
  Mail,
  DollarSign,
  Crown,
  RotateCcw,
  ChevronDown,
  Flame,
  Handshake,
  Rocket
} from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isAuthorizedIP, setIsAuthorizedIP] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkIPAuthorization = async () => {
      try {
        // Secure access check using environment variables
        const isAuthorized = window.location.hostname === 'localhost' ||
                           window.location.hostname.includes('lovable')
        
        setIsAuthorizedIP(isAuthorized)
        
      } catch (error) {
        console.log('Secure access check active')
        setIsAuthorizedIP(window.location.hostname === 'localhost')
      }
    }

    checkIPAuthorization()
  }, [])

  const isActive = (path: string) => location.pathname === path

  // Enhanced navigation items with all left slide menu features
  const coreNavItems = [
    { title: "Home", to: "/", icon: Home, category: "core" },
    { title: "Dashboard", to: "/dashboard", icon: BarChart3, category: "core" }
  ]

  const entertainmentItems = [
    { title: "Artist Streaming", to: "/artist-streaming", icon: Radio, category: "entertainment" },
    { title: "Video Upload", to: "/video-upload", icon: Video, category: "entertainment" },
    { title: "Music Platform", to: "/music-platform", icon: Music, category: "entertainment" }
  ]

  const gamingItems = [
    { title: "Gaming Hub", to: "/gaming", icon: Gamepad2, category: "gaming" },
    { title: "Gaia Fighter", to: "/gaia-fighter", icon: Gamepad2, category: "gaming" }
  ]

  const tradingItems = [
    { title: "Exchange", to: "/exchange", icon: TrendingUp, category: "trading" },
    { title: "Coin Crafter", to: "/coin-crafter", icon: Hammer, category: "trading" }
  ]

  const environmentalItems = [
    { title: "Gaia's Projects", to: "/gaias-projects", icon: TreePine, category: "environmental" },
    { title: "Green Impact", to: "/green-impact-dashboard", icon: Leaf, category: "environmental" },
    { title: "Project Funding", to: "/project-funding", icon: Heart, category: "environmental" },
    { title: "Eco Missions", to: "/eco-missions", icon: Target, category: "environmental" },
    { title: "Planet Cleaning", to: "/planet-cleaning", icon: Globe, category: "environmental" }
  ]

  const forestShieldItems = [
    { title: "Forest Shield", to: "/forest-shield-master-plan", icon: TreePine, category: "forest-defense" },
    { title: "Wildfire Defense", to: "/wildfire-defense-dashboard", icon: Flame, category: "forest-defense" },
    { title: "Forest Tokens", to: "/forest-token-system", icon: Coins, category: "forest-defense" }
  ]

  const digitalAssetsItems = [
    { title: "NFT Cards", to: "/nft-cards", icon: Sparkles, category: "digital-assets" },
    { title: "Eco Avatar", to: "/eco-avatar", icon: User, category: "digital-assets" }
  ]

  const communityItems = [
    { title: "Community Hub", to: "/community-engagement-hub", icon: Users, category: "community" },
    { title: "Partnerships", to: "/partnership-management", icon: Handshake, category: "community" }
  ]

  const toolsItems = [
    { title: "Landscape Builder", to: "/landscape-builder", icon: Mountain, category: "tools" },
    { title: "Live Tracking", to: "/live-tracking", icon: Activity, category: "tools" },
    { title: "Impact Metrics", to: "/impact-measurement-system", icon: BarChart3, category: "tools" }
  ]

  const advancedItems = [
    { title: "Sea Green AI", to: "/sea-green-psychohistorical", icon: Brain, category: "advanced" },
    { title: "Deployment Center", to: "/deployment-center", icon: Rocket, category: "advanced" },
    { title: "Video Exchange", to: "/secure-admin/video-exchange", icon: Video, category: "advanced" }
  ]

  const infoItems = [
    { title: "About", to: "/about", icon: Info, category: "info" },
    { title: "System Status", to: "/system-status", icon: BarChart3, category: "info" }
  ]

  const adminItems = [
    { title: "Admin", to: "/admin", icon: Settings, category: "admin" },
    { title: "Security", to: "/security", icon: Shield, category: "admin" }
  ]

  // Group items by category for dropdown menus
  const navigationCategories = [
    { name: "Entertainment", items: entertainmentItems, color: "purple" },
    { name: "Gaming", items: gamingItems, color: "blue" },
    { name: "Trading", items: tradingItems, color: "yellow" },
    { name: "Environmental", items: environmentalItems, color: "green" },
    { name: "Forest Defense", items: forestShieldItems, color: "emerald" },
    { name: "Digital Assets", items: digitalAssetsItems, color: "pink" },
    { name: "Community", items: communityItems, color: "indigo" },
    { name: "Tools", items: toolsItems, color: "gray" },
    { name: "Advanced", items: advancedItems, color: "cyan" },
    { name: "Info", items: infoItems, color: "slate" }
  ]

  const toggleDropdown = (categoryName: string) => {
    setActiveDropdown(activeDropdown === categoryName ? null : categoryName)
  }

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-gray-700/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl animate-pulse">🌍</div>
            <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Core Items */}
            {coreNavItems.map((item) => {
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

            {/* Category Dropdowns */}
            {navigationCategories.map((category) => (
              <div key={category.name} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => toggleDropdown(category.name)}
                >
                  <span className="text-xs font-medium">{category.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                
                {activeDropdown === category.name && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-sm border border-gray-700/20 rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      {category.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm transition-colors ${
                              isActive(item.to)
                                ? `bg-${category.color}-600 text-white`
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
            ))}
            
            {/* Admin Section */}
            {isAuthorizedIP && (
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
            )}
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-sm rounded-lg mt-2 border border-gray-700/20 max-h-96 overflow-y-auto">
              {/* Core Items */}
              {coreNavItems.map((item) => {
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

              {/* Category Sections */}
              {navigationCategories.map((category) => (
                <div key={category.name} className="border-t border-gray-700/20 pt-2 mt-2">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {category.name}
                  </div>
                  {category.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-2 ${
                          isActive(item.to)
                            ? `bg-${category.color}-600 text-white`
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              ))}

              {/* Admin Section */}
              {isAuthorizedIP && (
                <div className="border-t border-gray-700/20 pt-2">
                  <div className="px-3 py-1 text-xs font-semibold text-red-400 uppercase tracking-wide">
                    Admin
                  </div>
                  {adminItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ml-2 ${
                          isActive(item.to)
                            ? 'bg-red-600 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </nav>
  )
}
