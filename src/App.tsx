import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LightningClickEffect } from "@/components/ui/lightning-click-effect";
import { PageSpecificBackground } from "@/components/ui/page-specific-background";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import GaiaFighterGame from "./pages/GaiaFighterGame";
import Markets from "./pages/Markets";
import ArtistStreaming from "./pages/ArtistStreaming";
import VirtualWorld from "./pages/VirtualWorld";
import Wallet from "./pages/Wallet";
import UltimateSecurity from "./pages/UltimateSecurity";
import SystemStatus from "./pages/SystemStatus";
import ComprehensiveStatus from "./pages/ComprehensiveStatus";
import Downloads from "./pages/Downloads";
import Marketing from "./pages/Marketing";
import Transparency from "./pages/Transparency";
import LiveTracking from "./pages/LiveTracking";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Docs from "./pages/Docs";
import Webshop from "./pages/Webshop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <PageSpecificBackground />
          <LightningClickEffect />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/artist-streaming" element={<ArtistStreaming />} />
            <Route path="/virtual-world" element={<VirtualWorld />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/ultimate-security" element={<UltimateSecurity />} />
            <Route path="/system-status" element={<SystemStatus />} />
            <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/webshop" element={<Webshop />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
