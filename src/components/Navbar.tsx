
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, BarChart3, TreePine, Activity, Award } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/token-dashboard', label: 'Token Dashboard', icon: BarChart3 },
    { href: '/green-investments', label: 'Green Investments', icon: TreePine },
    { href: '/earning-activities', label: 'Earning Activities', icon: Activity },
    { href: '/earning-systems', label: 'Earning Systems', icon: Award },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <TreePine className="h-6 w-6 text-green-400" />
            <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAiA Exchange
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-colors hover:text-foreground/80 flex items-center gap-2 ${
                  isActive(item.href) ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <TreePine className="mr-2 h-4 w-4 text-green-400" />
              <span className="font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                GAiA Exchange
              </span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${
                      isActive(item.href) ? 'text-foreground' : 'text-foreground/60'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="md:hidden flex items-center space-x-2">
              <TreePine className="h-6 w-6 text-green-400" />
              <span className="font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                GAiA
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
