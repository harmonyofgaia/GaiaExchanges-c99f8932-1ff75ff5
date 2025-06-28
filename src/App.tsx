
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NeuralPathwaysBackground } from "@/components/ui/neural-pathways-background";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NeuralPathwaysBackground />
      <div className="relative z-10">
        <BrowserRouter>
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
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
