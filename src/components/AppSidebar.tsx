
import { Home, Wallet, TrendingUp, Search, Download, Code, FileText, Users, Settings, Shield, BarChart3, Lock } from "lucide-react"

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
import { GaiaLogo } from "./GaiaLogo"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Wallet",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "Markets",
    url: "/markets",
    icon: TrendingUp,
  },
  {
    title: "Transparency",
    url: "/transparency",
    icon: Search,
  },
  {
    title: "Reinvestments",
    url: "/reinvestments",
    icon: BarChart3,
  },
  {
    title: "Downloads",
    url: "/downloads",
    icon: Download,
  },
  {
    title: "Smart Contracts",
    url: "/smart-contracts",
    icon: Code,
  },
  {
    title: "Ultimate Security",
    url: "/ultimate-security",
    icon: Lock,
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: Users,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r-green-500/20 bg-gradient-to-b from-green-900/20 to-black/40 backdrop-blur-sm">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-400 font-bold text-lg flex items-center gap-2">
            <GaiaLogo size="sm" variant="white-fade" />
            Gaia's Ecosystem
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 text-white/80 hover:text-green-400 transition-colors">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
