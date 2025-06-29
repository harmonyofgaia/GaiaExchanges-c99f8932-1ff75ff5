
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
import { Gamepad2 } from 'lucide-react'

interface MainNavItem {
  title: string
  href?: string
  items?: MainNavItem[]
  description?: string
}

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const location = useLocation()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="flex items-center space-x-2">
        <Gamepad2 className="h-6 w-6 text-green-400" />
        <span className="hidden font-bold sm:inline-block text-green-400">
          Harmony of Gaia
        </span>
      </Link>
      {items?.length ? (
        <NavigationMenu>
          <NavigationMenuList>
            {items?.map(
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
        <MainNav items={[]} />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Navigation items can go here */}
          </div>
          <nav className="flex items-center">
            <Link to="/complete-system-hub">
              <Button variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                System Hub
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
