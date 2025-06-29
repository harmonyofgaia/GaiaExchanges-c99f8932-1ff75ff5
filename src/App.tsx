
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/AppSidebar";
import { SystemMonitor } from "@/components/SystemMonitor";
import { GlobalAnnouncement } from "@/components/GlobalAnnouncement";
import { PageSpecificBackground } from "@/components/ui/page-specific-background";

// Import all pages
import Index from "./pages/Index";
import About from "./pages/About";
import SystemStatus from "./pages/SystemStatus";
import ComprehensiveStatus from "./pages/ComprehensiveStatus";
import UltimateSecurity from "./pages/UltimateSecurity";
import LiveTracking from "./pages/LiveTracking";
import Gaming from "./pages/Gaming";
import GaiaFighterGame from "./pages/GaiaFighterGame";
import Markets from "./pages/Markets";
import SmartContracts from "./pages/SmartContracts";
import Downloads from "./pages/Downloads";
import Marketing from "./pages/Marketing";
import Reinvestments from "./pages/Reinvestments";
import Transparency from "./pages/Transparency";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SystemMonitor />
        <GlobalAnnouncement />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full relative">
              <PageSpecificBackground />
              <AppSidebar />
              <main className="flex-1 overflow-auto relative z-10">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/system-status" element={<SystemStatus />} />
                  <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                  <Route path="/ultimate-security" element={<UltimateSecurity />} />
                  <Route path="/live-tracking" element={<LiveTracking />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/smart-contracts" element={<SmartContracts />} />
                  <Route path="/downloads" element={<Downloads />} />
                  <Route path="/marketing" element={<Marketing />} />
                  <Route path="/reinvestments" element={<Reinvestments />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
