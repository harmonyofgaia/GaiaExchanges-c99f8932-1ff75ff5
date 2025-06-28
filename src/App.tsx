import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NeuralElectricBackground } from "@/components/ui/neural-electric-background";
import { useGlobalBackground } from "@/hooks/useGlobalBackground";
import Index from "./pages/Index";
import Reinvestments from "./pages/Reinvestments";
import Downloads from "./pages/Downloads";
import PlatformCompatibility from "./pages/PlatformCompatibility";
import Gaming from "./pages/Gaming";
import Webshop from "./pages/Webshop";
import AnimalNFTCommunity from "./pages/AnimalNFTCommunity";
import Transparency from "./pages/Transparency";
import ArtistStreaming from "./pages/ArtistStreaming";
import GaiaCoinCrafterPage from "./pages/GaiaCoinCrafter";
import DrivingToNature from "./pages/DrivingToNature";
import TechnoSoulSolutions from "./pages/TechnoSoulSolutions";
import GaiaFighterGame from "./pages/GaiaFighterGame";
import GaiasExchange from "./pages/GaiasExchange";
import HeartOfGaia from "./pages/HeartOfGaia";

const queryClient = new QueryClient();

const AppContent = () => {
  const { backgroundStyle } = useGlobalBackground();

  return (
    <>
      <Toaster />
      <Sonner />
      <NeuralElectricBackground style={backgroundStyle} intensity="medium" />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reinvestments" element={<Reinvestments />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/platform-compatibility" element={<PlatformCompatibility />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/webshop" element={<Webshop />} />
          <Route path="/animal-nft-community" element={<AnimalNFTCommunity />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/artist-streaming" element={<ArtistStreaming />} />
          <Route path="/gaia-coin-crafter" element={<GaiaCoinCrafterPage />} />
          <Route path="/driving-to-nature" element={<DrivingToNature />} />
          <Route path="/techno-soul-solutions" element={<TechnoSoulSolutions />} />
          <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
          <Route path="/gaias-exchange" element={<GaiasExchange />} />
          <Route path="/heart-of-gaia" element={<HeartOfGaia />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
