
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Home, 
  Wallet, 
  Globe, 
  Settings, 
  BarChart3, 
  Shield, 
  Activity, 
  Flame, 
  Download, 
  Gamepad2, 
  TreePine 
} from 'lucide-react'

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "💰 GAiA Wallet", url: "/wallet", icon: Wallet },
  { title: "🌍 Virtual World", url: "/virtual-world", icon: Globe },
  { title: "System Status", url: "/system-status", icon: Settings },
  { title: "Comprehensive Status", url: "/comprehensive-status", icon: BarChart3 },
  { title: "Ultimate Security", url: "/ultimate-security", icon: Shield },
  { title: "Live Tracking", url: "/live-tracking", icon: Activity },
  { title: "🔥 Coin Crafter", url: "/coin-crafter", icon: Flame },
  { title: "🔥 Transparency Center", url: "/transparency", icon: Download },
  { title: "🎮 Gaming Arena", url: "/gaming", icon: Gamepad2 },
  { title: "🏗️ Landscape Builder", url: "/landscape-builder", icon: TreePine }
]

export const HoverSidebar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mouseX, setMouseX] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      
      // Show sidebar when mouse is within 50px of left edge
      if (e.clientX <= 50) {
        setIsVisible(true)
      } else if (e.clientX > 300) {
        // Hide sidebar when mouse moves away from sidebar area
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Trigger zone - invisible area on the left edge */}
      <div 
        className="fixed left-0 top-0 w-12 h-full z-40 pointer-events-none"
        style={{ background: 'transparent' }}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-r border-green-500/30 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        onMouseLeave={() => setIsVisible(false)}
      >
        {/* Header */}
        <div className="p-6 border-b border-green-500/20">
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            🌍 GAIA Ecosystem
          </h2>
          <p className="text-sm text-gray-400">Token Burning Paradise</p>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2 overflow-y-auto h-full pb-20">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 group"
              onClick={() => setIsVisible(false)}
            >
              <item.icon className="h-5 w-5 group-hover:text-green-400 transition-colors" />
              <span className="font-medium">{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-500/20 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-xs text-gray-500 text-center">
            Hover near left edge to show menu
          </p>
        </div>
      </div>
    </>
  )
}
