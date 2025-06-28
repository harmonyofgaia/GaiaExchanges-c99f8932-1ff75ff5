
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Wallet,
  TrendingUp,
  Shield,
  Info,
  Download,
  Megaphone,
  BarChart3,
  Recycle
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Markets",
    url: "/markets",
    icon: TrendingUp,
  },
  {
    title: "Wallet",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "Reinvestments",
    url: "/reinvestments",
    icon: Recycle,
  },
  {
    title: "Transparency",
    url: "/transparency",
    icon: Shield,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Downloads",
    url: "/downloads",
    icon: Download,
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: Megaphone,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()

  const getNavClassName = ({ isActive }: { isActive: boolean }) => {
    return isActive 
      ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-background/80 backdrop-blur-sm border-r border-border/50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            🌍 Harmony of Gaia
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClassName}
                      end={item.url === "/"}
                    >
                      <item.icon />
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
