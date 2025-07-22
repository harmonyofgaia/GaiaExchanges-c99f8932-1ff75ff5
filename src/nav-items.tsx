import { Home, Shield, Users, Gamepad2, ShoppingBag, BarChart3, Settings, Book, Phone, User } from "lucide-react"
import Index from "@/pages/Index"
import Admin from "@/pages/Admin"
import Community from "@/pages/Community"
import Gaming from "@/pages/Gaming"
import Marketplace from "@/pages/Marketplace"
import Analytics from "@/pages/Analytics"
import Profile from "@/pages/Profile"
import Docs from "@/pages/Docs"
import Contact from "@/pages/Contact"
import About from "@/pages/About"

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <Index />,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: Shield,
    page: <Admin />,
  },
  {
    title: "Community",
    to: "/community",
    icon: Users,
    page: <Community />,
  },
  {
    title: "Gaming",
    to: "/gaming",
    icon: Gamepad2,
    page: <Gaming />,
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    icon: ShoppingBag,
    page: <Marketplace />,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: BarChart3,
    page: <Analytics />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: User,
    page: <Profile />,
  },
  {
    title: "Docs",
    to: "/docs",
    icon: Book,
    page: <Docs />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: Phone,
    page: <Contact />,
  },
  {
    title: "About",
    to: "/about",
    icon: Settings,
    page: <About />,
  },
]