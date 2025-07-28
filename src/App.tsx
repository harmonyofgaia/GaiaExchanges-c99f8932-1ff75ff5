import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MenuControlProvider } from "@/components/ui/MenuControlProvider";
import Navbar from "./components/Navbar";
import Index from "./legacy-pages/Index";
import About from "./legacy-pages/About";
import Wallet from "./legacy-pages/Wallet";
import Markets from "./legacy-pages/Markets";
import SmartContracts from "./legacy-pages/SmartContracts";
import SystemStatus from "./legacy-pages/SystemStatus";
import ComprehensiveStatus from "./legacy-pages/ComprehensiveStatus";
import Downloads from "./legacy-pages/Downloads";
import Marketing from "./legacy-pages/Marketing";
import Reinvestments from "./legacy-pages/Reinvestments";
import Transparency from "./legacy-pages/Transparency";
import Admin from "./legacy-pages/Admin";
import Gaming from "./legacy-pages/Gaming";
import GaiaFighterGame from "./legacy-pages/GaiaFighterGame";
import LiveTracking from "./legacy-pages/LiveTracking";
import GaiaCoinCrafter from "./legacy-pages/GaiaCoinCrafter";
import LandscapeBuilder from "./legacy-pages/LandscapeBuilder";
import NotFound from "./legacy-pages/NotFound";
import SandProtect from "./pages/SandProtect";
import WildfireDefenseDashboard from "./pages/WildfireDefenseDashboard";
import ForestTokenSystem from "./pages/ForestTokenSystem";
import CommunityEngagementHub from "./pages/CommunityEngagementHub";
import PartnershipManagement from "./pages/PartnershipManagement";
import ImpactMeasurementSystem from "./pages/ImpactMeasurementSystem";
import SeaGreenPsychohistorical from "./pages/SeaGreenPsychohistorical";
import DeploymentCenter from "./pages/DeploymentCenter";
import Security from "./pages/Security";
import GaiaPrivateBlockchainSwapToken from "./pages/GaiaPrivateBlockchainSwapToken";
import SecureAdmin from "./pages/SecureAdmin";
import GaiaConsistencyStatus from "./pages/GaiaConsistencyStatus";

// Add the new streaming shows import
const StreamingShows = lazy(() => import("./pages/StreamingShows"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <MenuControlProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <Navbar />
                <main className="pt-16">
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[50vh]">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/markets" element={<Markets />} />
                      <Route path="/smart-contracts" element={<SmartContracts />} />
                      <Route path="/system-status" element={<SystemStatus />} />
                      <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                      <Route path="/downloads" element={<Downloads />} />
                      <Route path="/marketing" element={<Marketing />} />
                      <Route path="/reinvestments" element={<Reinvestments />} />
                      <Route path="/transparency" element={<Transparency />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/gaming" element={<Gaming />} />
                      <Route path="/gaia-fighter" element={<GaiaFighterGame />} />
                      <Route path="/live-tracking" element={<LiveTracking />} />
                      <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
                      <Route path="/landscape-builder" element={<LandscapeBuilder />} />
                      <Route path="*" element={<NotFound />} />
                      <Route path="/sand-protect" element={<SandProtect />} />
                      <Route path="/wildfire-defense-dashboard" element={<WildfireDefenseDashboard />} />
                      <Route path="/forest-token-system" element={<ForestTokenSystem />} />
                      <Route path="/community-engagement-hub" element={<CommunityEngagementHub />} />
                      <Route path="/partnership-management" element={<PartnershipManagement />} />
                      <Route path="/impact-measurement-system" element={<ImpactMeasurementSystem />} />
                      <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistorical />} />
                      <Route path="/deployment-center" element={<DeploymentCenter />} />
                      <Route path="/security" element={<Security />} />
                      <Route path="/gaia-private-blockchain-swap-token" element={<GaiaPrivateBlockchainSwapToken />} />
                      <Route path="/secure-admin" element={<SecureAdmin />} />
                      <Route path="/gaia-consistency-status" element={<GaiaConsistencyStatus />} />
                      
                      {/* Add the streaming shows route */}
                      <Route path="/streaming-shows" element={<StreamingShows />} />
                      
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </BrowserRouter>
          </MenuControlProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
