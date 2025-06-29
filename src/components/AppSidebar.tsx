
import { Calendar, Home, Inbox, Search, Settings, Shield, Activity, Download, BarChart3, Flame, Gamepad2, TreePine, Wrench, Wallet, Globe, Users, DollarSign } from "lucide-react"

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
import { Link } from "react-router-dom"

// Menu items with complete routing coverage
const items = [
  {
    title: "🏠 Home",
    url: "/",
    icon: Home,
  },
  {
    title: "💰 GAiA Wallet",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "🌍 Virtual World", 
    url: "/virtual-world",
    icon: Globe,
  },
  {
    title: "🔥 Coin Crafter",
    url: "/coin-crafter",
    icon: Flame,
  },
  {
    title: "📊 Live Tracking",
    url: "/live-tracking",
    icon: Activity,
  },
  {
    title: "🛡️ System Status", 
    url: "/system-status",
    icon: Settings,
  },
  {
    title: "📈 Comprehensive Status",
    url: "/comprehensive-status", 
    icon: BarChart3,
  },
  {
    title: "🔒 Immortal Security",
    url: "/immortal-security",
    icon: Shield,
  },
  {
    title: "ℹ️ About",
    url: "/about",
    icon: Users,
  },
  {
    title: "📞 Contact",
    url: "/contact",
    icon: Inbox,
  },
  {
    title: "💲 Pricing",
    url: "/pricing",
    icon: DollarSign,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>🌍 HARMONY OF GAIA - Heavenly Fortress Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
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
