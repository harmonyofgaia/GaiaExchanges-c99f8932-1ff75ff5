
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import Index from "./legacy-pages/Index";
import Dashboard from "./legacy-pages/Dashboard";
import Auth from "./legacy-pages/Auth";
import Admin from "./legacy-pages/Admin";
import AdminLogin from "./legacy-pages/AdminLogin";
import EnhancedDownloads from "./legacy-pages/EnhancedDownloads";
import SecureVault from "./legacy-pages/SecureVault";
import SecureAdmin from "./legacy-pages/SecureAdmin";
import Game from "./legacy-pages/Game";
import GaiasProjects from "./legacy-pages/GaiasProjects";
import Exchange from "./legacy-pages/Exchange";
import GreenImpactDashboard from "./legacy-pages/GreenImpactDashboard";
import ProjectFunding from "./legacy-pages/ProjectFunding";
import EcoMissions from "./legacy-pages/EcoMissions";
import PlanetCleaning from "./legacy-pages/PlanetCleaning";
import NFTCards from "./legacy-pages/NFTCards";
import EcoAvatar from "./legacy-pages/EcoAvatar";
import Security from "./legacy-pages/Security";
import ArtistStreaming from "./legacy-pages/ArtistStreaming";
import VideoUpload from "./legacy-pages/VideoUpload";
import MusicPlatform from "./legacy-pages/MusicPlatform";
import EnvironmentalGames from "./legacy-pages/EnvironmentalGames";
import GlobalLeaderboardPage from "./legacy-pages/GlobalLeaderboard";
import AnimalRescue from "./legacy-pages/AnimalRescue";
import DeploymentCenter from "./legacy-pages/DeploymentCenter";
import QuantumSecurity from "./legacy-pages/QuantumSecurity";
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
            <Route path="/gaias-projects" element={<GaiasProjects />} />
            <Route path="/projects" element={<GaiasProjects />} />
            <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
            <Route path="/project-funding" element={<ProjectFunding />} />
            <Route path="/eco-missions" element={<EcoMissions />} />
            <Route path="/planet-cleaning" element={<PlanetCleaning />} />
            <Route path="/nft-cards" element={<NFTCards />} />
            <Route path="/eco-avatar" element={<EcoAvatar />} />
            
            {/* New Features from PRs #22-#41 */}
            <Route path="/environmental-games" element={<EnvironmentalGames />} />
            <Route path="/global-leaderboard" element={<GlobalLeaderboardPage />} />
            <Route path="/animal-rescue" element={<AnimalRescue />} />
            
            {/* Entertainment Routes */}
            <Route path="/artist-streaming" element={<ArtistStreaming />} />
            <Route path="/video-upload" element={<VideoUpload />} />
            <Route path="/music-platform" element={<MusicPlatform />} />
            
            {/* Gaming Routes */}
            <Route path="/game" element={<Game />} />
            <Route path="/gaming" element={<Game />} />
            
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/secure-admin" element={<SecureAdmin />} />
            <Route path="/secure-vault" element={<SecureVault />} />
            <Route path="/deployment-center" element={<DeploymentCenter />} />
            <Route path="/quantum-security" element={<QuantumSecurity />} />
            
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
