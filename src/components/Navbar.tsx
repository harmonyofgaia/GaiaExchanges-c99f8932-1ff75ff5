
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Leaf, Users, BarChart3, Target, Globe, Sparkles, TreePine, Flame, Coins, Handshake, Video, Brain, Settings, Shield, Rocket } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: BarChart3,
      description: 'Platform overview'
    },
    {
      title: 'Exchange',
      href: '/exchange',
      icon: Users,
      description: 'Token trading'
    },
    {
      title: 'Projects',
      icon: TreePine,
      description: 'Environmental initiatives',
      items: [
        { title: "Gaia's Projects", href: '/gaias-projects', description: 'Project showcase' },
        { title: 'Green Impact', href: '/green-impact-dashboard', description: 'Environmental metrics' },
        { title: 'Project Funding', href: '/project-funding', description: 'Funding platform' },
        { title: 'Forest Shield', href: '/forest-shield-master-plan', description: 'Forest protection' },
        { title: 'Wildfire Defense', href: '/wildfire-defense-dashboard', description: 'Fire prevention' },
      ]
    },
    {
      title: 'Activities',
      icon: Target,
      description: 'Eco missions and games',
      items: [
        { title: 'Eco Missions', href: '/eco-missions', description: 'Environmental tasks' },
        { title: 'Planet Cleaning', href: '/planet-cleaning', description: 'Cleanup activities' },
        { title: 'GAIA Bike', href: '/gaia-bike-ecosystem', description: 'Eco transportation' },
        { title: 'NFT Cards', href: '/nft-cards', description: 'Collectible cards' },
        { title: 'NFT Card Game', href: '/nft-card-game', description: 'Card battle game' },
        { title: 'Coin Crafter', href: '/coin-crafter', description: 'Craft digital coins' },
      ]
    },
    {
      title: 'Community',
      icon: Users,
      description: 'Social features',
      items: [
        { title: 'Eco Avatar', href: '/eco-avatar', description: 'Avatar customization' },
        { title: 'Community Hub', href: '/community-engagement-hub', description: 'Community engagement' },
        { title: 'Video Exchange', href: '/secure-admin/video-exchange', description: 'Video sharing' },
        { title: 'Partnerships', href: '/partnership-management', description: 'Partner network' },
      ]
    },
    {
      title: 'Systems',
      icon: Rocket,
      description: 'Advanced features',
      items: [
        { title: 'Forest Tokens', href: '/forest-token-system', description: 'Token ecosystem' },
        { title: 'Impact Metrics', href: '/impact-measurement-system', description: 'Impact tracking' },
        { title: 'Psychohistorical', href: '/sea-green-psychohistorical', description: 'AI predictions' },
        { title: 'Deployment Center', href: '/deployment-center', description: 'System deployment' },
      ]
    },
    {
      title: 'Admin',
      icon: Settings,
      description: 'Administration',
      items: [
        { title: 'Admin Panel', href: '/admin', description: 'System administration' },
        { title: 'Security', href: '/security', description: 'Security monitoring' },
      ]
    }
  ]

  const NavLink = ({ href, children, className = '' }: { href: string, children: React.ReactNode, className?: string }) => (
    <Link 
      to={href} 
      className={`${className} ${isActive(href) ? 'text-green-400 bg-green-400/10' : 'hover:text-green-400 hover:bg-green-400/5'} transition-colors rounded-md px-3 py-2`}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAiA Exchanges
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger className="hover:text-green-400">
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-2">
                          {item.items.map((subItem) => (
                            <li key={subItem.href}>
                              <NavLink
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavLink href={item.href} className="flex items-center px-3 py-2">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </NavLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLink href="/dashboard" className="flex items-center text-lg font-medium">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </NavLink>
                <NavLink href="/exchange" className="flex items-center text-lg font-medium">
                  <Users className="w-5 h-5 mr-3" />
                  Exchange
                </NavLink>
                
                {/* Projects Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-green-400 mb-3 flex items-center">
                    <TreePine className="w-4 h-4 mr-2" />
                    Projects
                  </h3>
                  <div className="space-y-2 ml-6">
                    <NavLink href="/gaias-projects" className="block text-sm">Gaia's Projects</NavLink>
                    <NavLink href="/green-impact-dashboard" className="block text-sm">Green Impact</NavLink>
                    <NavLink href="/project-funding" className="block text-sm">Project Funding</NavLink>
                    <NavLink href="/forest-shield-master-plan" className="block text-sm">Forest Shield</NavLink>
                    <NavLink href="/wildfire-defense-dashboard" className="block text-sm">Wildfire Defense</NavLink>
                  </div>
                </div>

                {/* Activities Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-blue-400 mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Activities
                  </h3>
                  <div className="space-y-2 ml-6">
                    <NavLink href="/eco-missions" className="block text-sm">Eco Missions</NavLink>
                    <NavLink href="/planet-cleaning" className="block text-sm">Planet Cleaning</NavLink>
                    <NavLink href="/gaia-bike-ecosystem" className="block text-sm">GAIA Bike</NavLink>
                    <NavLink href="/nft-cards" className="block text-sm">NFT Cards</NavLink>
                    <NavLink href="/nft-card-game" className="block text-sm">NFT Card Game</NavLink>
                    <NavLink href="/coin-crafter" className="block text-sm">Coin Crafter</NavLink>
                  </div>
                </div>

                {/* Community Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-purple-400 mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Community
                  </h3>
                  <div className="space-y-2 ml-6">
                    <NavLink href="/eco-avatar" className="block text-sm">Eco Avatar</NavLink>
                    <NavLink href="/community-engagement-hub" className="block text-sm">Community Hub</NavLink>
                    <NavLink href="/secure-admin/video-exchange" className="block text-sm">Video Exchange</NavLink>
                    <NavLink href="/partnership-management" className="block text-sm">Partnerships</NavLink>
                  </div>
                </div>

                {/* Systems Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-yellow-400 mb-3 flex items-center">
                    <Rocket className="w-4 h-4 mr-2" />
                    Systems
                  </h3>
                  <div className="space-y-2 ml-6">
                    <NavLink href="/forest-token-system" className="block text-sm">Forest Tokens</NavLink>
                    <NavLink href="/impact-measurement-system" className="block text-sm">Impact Metrics</NavLink>
                    <NavLink href="/sea-green-psychohistorical" className="block text-sm">Psychohistorical</NavLink>
                    <NavLink href="/deployment-center" className="block text-sm">Deployment Center</NavLink>
                  </div>
                </div>

                {/* Admin Section */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-red-400 mb-3 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </h3>
                  <div className="space-y-2 ml-6">
                    <NavLink href="/admin" className="block text-sm">Admin Panel</NavLink>
                    <NavLink href="/security" className="block text-sm">Security</NavLink>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
