
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  History, 
  Settings,
  Home,
  LineChart
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
  { title: "Trading", url: "/trading", icon: BarChart3 },
  { title: "Markets", url: "/markets", icon: TrendingUp },
  { title: "Portfolio", url: "/portfolio", icon: Wallet },
  { title: "Charts", url: "/charts", icon: LineChart },
  { title: "History", url: "/history", icon: History },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar className="w-60 border-r border-border">
      <SidebarContent className="bg-sidebar-background">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">CryptoEx</h1>
          <p className="text-sm text-muted-foreground">Professional Trading</p>
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
                            ? 'bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-primary' 
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
