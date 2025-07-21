
import { Home, Info, Mail, DollarSign, Download } from "lucide-react";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Downloads from "./pages/Downloads";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "About",
    to: "/about",
    icon: <Info className="h-4 w-4" />,
    page: <About />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <Mail className="h-4 w-4" />,
    page: <Contact />,
  },
  {
    title: "Pricing",
    to: "/pricing",
    icon: <DollarSign className="h-4 w-4" />,
    page: <Pricing />,
  },
  {
    title: "Downloads",
    to: "/downloads",
    icon: <Download className="h-4 w-4" />,
    page: <Downloads />,
  },
];
