
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Home, Info, Wallet, FileText, TrendingUp, Settings, Megaphone, Download } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "About", url: "/about", icon: Info },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Transparency", url: "/transparency", icon: FileText },
  { title: "Markets", url: "/markets", icon: TrendingUp },
  { title: "Marketing", url: "/marketing", icon: Megaphone },
  { title: "Downloads", url: "/downloads", icon: Download },
  { title: "Admin", url: "/admin", icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/ab19f9f8-2069-4211-955c-dab937602141.png" 
            alt="Gaia of Harmony Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="font-semibold text-sm">Gaia's Exchanges</h2>
            <p className="text-xs text-muted-foreground">Harmony of Gaia</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
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
