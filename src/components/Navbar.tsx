
import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Gamepad2, Home, Wallet, TrendingUp, Shield, Settings, Download, Heart } from 'lucide-react'

interface MainNavItem {
  title: string
  href?: string
  items?: MainNavItem[]
  description?: string
}

interface MainNavProps {
  items?: MainNavItem[]
}

const navigationItems: MainNavItem[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Home",
        href: "/",
        description: "Welcome to Harmony of Gaia ecosystem"
      },
      {
        title: "Gaming Hub",
        href: "/gaming",
        description: "Epic battles and environmental gaming"
      },
      {
        title: "Gaia Fighter",
        href: "/gaia-fighter-game",
        description: "Environmental warrior battle arena"
      },
      {
        title: "Virtual World",
        href: "/virtual-world",
        description: "Explore infinite Gaia landscapes"
      }
    ]
  },
  {
    title: "Exchange",
    items: [
      {
        title: "Markets",
        href: "/markets",
        description: "Trade GAiA tokens and view market data"
      },
      {
        title: "Wallet",
        href: "/wallet",
        description: "Manage your GAiA tokens securely"
      },
      {
        title: "Gaia Exchange",
        href: "/gaias-exchange",
        description: "Official GAiA token exchange platform"
      }
    ]
  },
  {
    title: "Tools",
    items: [
      {
        title: "Transparency",
        href: "/transparency",
        description: "View all transactions and project funding"
      },
      {
        title: "Downloads",
        href: "/downloads",
        description: "Get mobile apps and resources"
      },
      {
        title: "System Status",
        href: "/system-status",
        description: "Check platform health and uptime"
      }
    ]
  }
]

export function MainNav({ items }: MainNavProps) {
  const location = useLocation()
  const navItems = items || navigationItems

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="flex items-center space-x-2">
        <Gamepad2 className="h-6 w-6 text-green-400" />
        <span className="hidden font-bold sm:inline-block text-green-400">
          Harmony of Gaia
        </span>
      </Link>
      {navItems?.length ? (
        <NavigationMenu>
          <NavigationMenuList>
            {navItems?.map(
              (item, i) =>
                item.href ? (
                  <NavigationMenuItem key={i}>
                    <Link to={item.href}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'data-[active]:text-foreground data-[active]:no-underline',
                          location.pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  item.items && (
                    <NavigationMenuItem key={i}>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                to="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium text-green-400">
                                  Harmony of Gaia
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  World's #1 Ecological Project & Exchange Platform
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {item.items.map((item) => (
                            <ListItem
                              key={item.title}
                              title={item.title}
                              to={item.href}
                            >
                              {item.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string
    children?: React.ReactNode
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="hidden md:flex items-center space-x-4 text-sm">
              <Link 
                to="/gaming" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <Gamepad2 className="h-4 w-4 inline mr-1" />
                Gaming
              </Link>
              <Link 
                to="/wallet" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <Wallet className="h-4 w-4 inline mr-1" />
                Wallet
              </Link>
              <Link 
                to="/markets" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                <TrendingUp className="h-4 w-4 inline mr-1" />
                Markets
              </Link>
            </nav>
          </div>
          <nav className="flex items-center space-x-2">
            <Link to="/complete-system-hub">
              <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                <Settings className="h-4 w-4 mr-1" />
                System Hub
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
