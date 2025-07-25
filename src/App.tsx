
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { UnauthenticatedOnlyRoute } from "./components/auth/UnauthenticatedOnlyRoute";
import { AdminProtectedRoute } from "./components/auth/AdminProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import EnhancedDownloads from "./pages/EnhancedDownloads";
import SecureVault from "./pages/SecureVault";
import SecureAdmin from "./pages/SecureAdmin";
import Game from "./pages/Game";
import GaiasProjects from "./pages/GaiasProjects";
import Exchange from "./pages/Exchange";
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
import EnvironmentalGames from "./pages/EnvironmentalGames";
import GlobalLeaderboardPage from "./pages/GlobalLeaderboard";
import AnimalRescue from "./pages/AnimalRescue";
import DeploymentCenter from "./pages/DeploymentCenter";
import QuantumSecurity from "./pages/QuantumSecurity";
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
            {/* Public Routes - accessible to everyone */}
            <Route path="/" element={<Index />} />
            
            {/* Unauthenticated Only Routes - only for non-logged-in users */}
            <Route path="/auth" element={
              <UnauthenticatedOnlyRoute>
                <Auth />
              </UnauthenticatedOnlyRoute>
            } />
            
            {/* Protected User Routes - only for authenticated users */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/exchange" element={
              <ProtectedRoute>
                <Exchange />
              </ProtectedRoute>
            } />
            <Route path="/gaias-projects" element={
              <ProtectedRoute>
                <GaiasProjects />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <GaiasProjects />
              </ProtectedRoute>
            } />
            <Route path="/green-impact-dashboard" element={
              <ProtectedRoute>
                <GreenImpactDashboard />
              </ProtectedRoute>
            } />
            <Route path="/project-funding" element={
              <ProtectedRoute>
                <ProjectFunding />
              </ProtectedRoute>
            } />
            <Route path="/eco-missions" element={
              <ProtectedRoute>
                <EcoMissions />
              </ProtectedRoute>
            } />
            <Route path="/planet-cleaning" element={
              <ProtectedRoute>
                <PlanetCleaning />
              </ProtectedRoute>
            } />
            <Route path="/nft-cards" element={
              <ProtectedRoute>
                <NFTCards />
              </ProtectedRoute>
            } />
            <Route path="/eco-avatar" element={
              <ProtectedRoute>
                <EcoAvatar />
              </ProtectedRoute>
            } />
            
            {/* New Features from PRs #22-#41 - Protected */}
            <Route path="/environmental-games" element={
              <ProtectedRoute>
                <EnvironmentalGames />
              </ProtectedRoute>
            } />
            <Route path="/global-leaderboard" element={
              <ProtectedRoute>
                <GlobalLeaderboardPage />
              </ProtectedRoute>
            } />
            <Route path="/animal-rescue" element={
              <ProtectedRoute>
                <AnimalRescue />
              </ProtectedRoute>
            } />
            
            {/* Entertainment Routes - Protected */}
            <Route path="/artist-streaming" element={
              <ProtectedRoute>
                <ArtistStreaming />
              </ProtectedRoute>
            } />
            <Route path="/video-upload" element={
              <ProtectedRoute>
                <VideoUpload />
              </ProtectedRoute>
            } />
            <Route path="/music-platform" element={
              <ProtectedRoute>
                <MusicPlatform />
              </ProtectedRoute>
            } />
            
            {/* Gaming Routes - Protected */}
            <Route path="/game" element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } />
            <Route path="/gaming" element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Special admin authentication */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            } />
            <Route path="/secure-admin" element={
              <AdminProtectedRoute>
                <SecureAdmin />
              </AdminProtectedRoute>
            } />
            <Route path="/secure-vault" element={
              <AdminProtectedRoute>
                <SecureVault />
              </AdminProtectedRoute>
            } />
            <Route path="/deployment-center" element={
              <AdminProtectedRoute>
                <DeploymentCenter />
              </AdminProtectedRoute>
            } />
            <Route path="/quantum-security" element={
              <AdminProtectedRoute>
                <QuantumSecurity />
              </AdminProtectedRoute>
            } />
            
            {/* Security and Downloads - Protected */}
            <Route path="/security" element={
              <ProtectedRoute>
                <Security />
              </ProtectedRoute>
            } />
            <Route path="/enhanced-downloads" element={
              <ProtectedRoute>
                <EnhancedDownloads />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
