
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import SystemStatus from "./pages/SystemStatus";
import ComprehensiveStatus from "./pages/ComprehensiveStatus";
import UltimateSecurity from "./pages/UltimateSecurity";
import LiveTracking from "./pages/LiveTracking";
import { SystemMonitor } from "@/components/SystemMonitor";
import { GlobalAnnouncement } from "@/components/GlobalAnnouncement";

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
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/system-status" element={<SystemStatus />} />
                  <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                  <Route path="/ultimate-security" element={<UltimateSecurity />} />
                  <Route path="/live-tracking" element={<LiveTracking />} />
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
