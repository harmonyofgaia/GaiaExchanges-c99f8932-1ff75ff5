
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  History, 
  Settings,
  Home,
  LineChart,
  Info,
  Eye,
  Leaf
} from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Markets", url: "/markets", icon: TrendingUp },
  { title: "Harmony Wallet", url: "/wallet", icon: Wallet },
  { title: "Transparency", url: "/transparency", icon: Eye },
  { title: "About GAiA", url: "/about", icon: Info },
  { title: "History", url: "/history", icon: History },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-60 border-r border-border">
      <SidebarContent className="bg-sidebar-background">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-6 w-6 text-green-400" />
            <h1 className="text-xl font-bold text-green-400">Harmony of Gaia</h1>
          </div>
          <p className="text-sm text-muted-foreground">Environmental Exchange</p>
          <div className="mt-2 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
            No Trading • Full Transparency
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-6 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                          isActive 
                            ? 'bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-green-400' 
                            : 'text-sidebar-foreground'
                        }`
                      }
                      end
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
