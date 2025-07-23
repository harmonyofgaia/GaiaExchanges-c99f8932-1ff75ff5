
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import EnhancedDownloads from "./pages/EnhancedDownloads";
import SecureVault from "./pages/SecureVault";
import SecureAdmin from "./pages/SecureAdmin";
import Game from "./pages/Game";
import Gaming from "./pages/Gaming";
import GaiasProjects from "./pages/GaiasProjects";
import Exchange from "./pages/Exchange";
import CoinCrafter from "./pages/CoinCrafter";
import GreenImpactDashboard from "./pages/GreenImpactDashboard";
import ProjectFunding from "./pages/ProjectFunding";
import EcoMissions from "./pages/EcoMissions";
import PlanetCleaning from "./pages/PlanetCleaning";
import NFTCards from "./pages/NFTCards";
import EcoAvatar from "./pages/EcoAvatar";
import Security from "./pages/Security";
import ArtistStreaming from "./pages/ArtistStreaming";
import VideoUpload from "./pages/VideoUpload";
import MusicPlatform from "./pages/MusicPlatform";
import GaiaFantasyMMORPG from "./pages/games/GaiaFantasyMMORPG";
import SnakeArenaGame from "./pages/games/SnakeArenaGame";
import HabboTycoon from "./pages/games/HabboTycoon";
import { DatabaseErrorFixer } from '@/components/security/DatabaseErrorFixer';
import SlidingMenu from '@/components/SlidingMenu';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <DatabaseErrorFixer />
        <BrowserRouter>
          <SlidingMenu />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Main Platform Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/coin-crafter" element={<CoinCrafter />} />
            <Route path="/gaias-projects" element={<GaiasProjects />} />
            <Route path="/projects" element={<GaiasProjects />} />
            <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
            <Route path="/project-funding" element={<ProjectFunding />} />
            <Route path="/eco-missions" element={<EcoMissions />} />
            <Route path="/planet-cleaning" element={<PlanetCleaning />} />
            <Route path="/nft-cards" element={<NFTCards />} />
            <Route path="/eco-avatar" element={<EcoAvatar />} />
            
            {/* Entertainment Routes */}
            <Route path="/artist-streaming" element={<ArtistStreaming />} />
            <Route path="/video-upload" element={<VideoUpload />} />
            <Route path="/music-platform" element={<MusicPlatform />} />
            
            {/* Gaming Routes */}
            <Route path="/game" element={<Game />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/game/gaia-fantasy-mmorpg" element={<GaiaFantasyMMORPG />} />
            <Route path="/game/snake-arena" element={<SnakeArenaGame />} />
            <Route path="/game/habbo-tycoon" element={<HabboTycoon />} />
            <Route path="/gaia-fighter-game" element={<Game />} />
            
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/secure-admin" element={<SecureAdmin />} />
            <Route path="/secure-vault" element={<SecureVault />} />
            
            {/* Security and Downloads */}
            <Route path="/security" element={<Security />} />
            <Route path="/enhanced-downloads" element={<EnhancedDownloads />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
