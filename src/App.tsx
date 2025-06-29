
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";
import { PageSpecificBackground } from "@/components/ui/page-specific-background";
import Index from "./pages/Index";
import About from "./pages/About";
import Wallet from "./pages/Wallet";
import Markets from "./pages/Markets";
import SmartContracts from "./pages/SmartContracts";
import UltimateSecurity from "./pages/UltimateSecurity";
import SystemStatus from "./pages/SystemStatus";
import ComprehensiveStatus from "./pages/ComprehensiveStatus";
import Downloads from "./pages/Downloads";
import Marketing from "./pages/Marketing";
import Reinvestments from "./pages/Reinvestments";
import Transparency from "./pages/Transparency";
import Admin from "./pages/Admin";
import Gaming from "./pages/Gaming";
import GaiaFighterGame from "./pages/GaiaFighterGame";
import LiveTracking from "./pages/LiveTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component loaded - routes should be available");
  
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <PageSpecificBackground />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/smart-contracts" element={<SmartContracts />} />
                <Route path="/ultimate-security" element={<UltimateSecurity />} />
                <Route path="/system-status" element={<SystemStatus />} />
                <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/marketing" element={<Marketing />} />
                <Route path="/reinvestments" element={<Reinvestments />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/gaming" element={<Gaming />} />
                <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
                <Route path="/live-tracking" element={<LiveTracking />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
};

export default App;
