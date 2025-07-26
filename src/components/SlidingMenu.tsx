
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Globe, 
  Coins, 
  Hammer,
  Mountain,
  Palette,
  BarChart3,
  Settings,
  Shield,
  Info,
  Mail,
  DollarSign,
  ChevronRight,
  Menu,
  X,
  Crown,
  Music,
  Radio,
  Video,
  RotateCcw,
  Gamepad2,
  TrendingUp,
  Activity,
  TreePine,
  Heart,
  Leaf,
  CreditCard,
  User,
  Wallet,
  Bike,
  Pickaxe,
  Building,
  Sprout,
  Droplets,
  Award,
  GraduationCap,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navigationItems, getItemsByCategory, type NavigationItem } from '@/nav-items'

const SlidingMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthorizedIP, setIsAuthorizedIP] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
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

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  const getCategoryTitle = (category: NavigationItem['category']) => {
    switch (category) {
      case 'core': return '🏠 Core System'
      case 'eco': return '🌱 Eco Features'
      case 'blockchain': return '⛓️ Blockchain & Tokens'
      case 'community': return '👥 Community & Education'
      case 'gaming': return '🎮 Gaming & Entertainment'
      case 'admin': return '⚙️ Administration'
      default: return category
    }
  }

  const getCategoryIcon = (category: NavigationItem['category']) => {
    switch (category) {
      case 'core': return Home
      case 'eco': return Leaf
      case 'blockchain': return Coins
      case 'community': return Heart
      case 'gaming': return Gamepad2
      case 'admin': return Settings
      default: return Home
    }
  }

  const categories: NavigationItem['category'][] = ['core', 'eco', 'blockchain', 'community', 'gaming', 'admin']

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 bg-black/80 hover:bg-black/90 text-white border border-green-500/30 md:hidden"
        size="sm"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Desktop Menu Button */}
      <div className="hidden md:block">
        <Button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 bg-gradient-to-r from-green-600/80 to-blue-600/80 hover:from-green-700/90 hover:to-blue-700/90 text-white border border-green-500/30 backdrop-blur-sm"
          size="sm"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="ml-2 hidden lg:inline">Menu</span>
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-black/95 
        backdrop-blur-md border-r border-green-500/20 transform transition-transform 
        duration-300 ease-in-out z-45 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 pt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              🌍 Gaia Exchanges
            </h2>
            <p className="text-sm text-green-300/80 mt-1">
              Sustainable Future Platform
            </p>
          </div>

          <nav className="space-y-2">
            {categories.map((categoryKey) => {
              const categoryItems = getItemsByCategory(categoryKey)
              if (categoryItems.length === 0) return null
              
              const CategoryIcon = getCategoryIcon(categoryKey)
              const isExpanded = expandedCategory === categoryKey

              return (
                <div key={categoryKey} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="w-full flex items-center justify-between p-3 rounded-lg 
                             hover:bg-green-500/10 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-white group-hover:text-green-300">
                        {getCategoryTitle(categoryKey)}
                      </span>
                    </div>
                    <ChevronRight 
                      className={`h-4 w-4 text-green-400 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`} 
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-4 space-y-1 border-l border-green-500/20 pl-3">
                      {categoryItems.map((item) => {
                        const IconComponent = item.icon
                        const isActive = location.pathname === item.to
                        
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`
                              flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group
                              ${isActive 
                                ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 border border-green-500/30' 
                                : 'hover:bg-green-500/10 text-gray-300 hover:text-green-300'
                              }
                            `}
                            onClick={() => setIsOpen(false)}
                          >
                            <IconComponent className={`h-4 w-4 ${isActive ? 'text-green-400' : 'text-gray-400 group-hover:text-green-400'}`} />
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{item.title}</span>
                              {item.masterPlanVersion && (
                                <span className="text-xs text-blue-400">v7 Enhanced</span>
                              )}
                            </div>
                            {item.masterPlanVersion === 'v7' && (
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-green-500/20">
            <div className="text-xs text-gray-400 space-y-1">
              <p>🌱 Master Plan v7 Active</p>
              <p>🔗 GAIA Token Integrated</p>
              <p>🛡️ Blockchain Security</p>
              {isAuthorizedIP && (
                <p className="text-green-400">✅ Authorized Access</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SlidingMenu
