import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/auth/AuthProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import UserAuth from "./pages/UserAuth";
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
import ForestShieldMasterPlan from "./pages/ForestShieldMasterPlan";
import WildfireDefenseDashboard from "./pages/WildfireDefenseDashboard";
import ForestTokenSystem from "./pages/ForestTokenSystem";
import CommunityEngagementHub from "./pages/CommunityEngagementHub";
import PartnershipManagement from "./pages/PartnershipManagement";
import ImpactMeasurementSystem from "./pages/ImpactMeasurementSystem";
import SeaGreenPsychohistoricalProject from "./pages/SeaGreenPsychohistoricalProject";
import { DatabaseErrorFixer } from '@/components/security/DatabaseErrorFixer';
import SlidingMenu from '@/components/SlidingMenu';
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin';
import LegacySecureAdmin from '@/legacy-pages/SecureAdmin';
import LegacySecureVault from '@/legacy-pages/SecureVault';
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute';
import './App.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <DatabaseErrorFixer />
            <SlidingMenu />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              
              {/* User Authentication - Only when users want to register/login */}
              <Route path="/user-auth" element={<UserAuth />} />
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
              <Route path="/forest-shield-master-plan" element={<ForestShieldMasterPlan />} />
              <Route path="/wildfire-defense-dashboard" element={<WildfireDefenseDashboard />} />
              <Route path="/forest-token-system" element={<ForestTokenSystem />} />
              <Route path="/community-engagement-hub" element={<CommunityEngagementHub />} />
              <Route path="/partnership-management" element={<PartnershipManagement />} />
              <Route path="/impact-measurement-system" element={<ImpactMeasurementSystem />} />
              <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistoricalProject />} />
              
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
              
              {/* Admin Routes - No user auth required, use admin-specific authentication */}
              <Route path="/admin-login" element={
                <AdminProtectedRoute>
                  <SecureAdminLogin />
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
              <Route path="/admin" element={
                <AdminProtectedRoute>
                  <AdminLogin />
                </AdminProtectedRoute>
              } />
              <Route path="/deployment-center" element={<DeploymentCenter />} />
              <Route path="/quantum-security" element={<QuantumSecurity />} />

              {/* Legacy Admin Routes */}
              <Route path="/legacy-admin" element={
                <AdminProtectedRoute>
                  <LegacySecureAdmin />
                </AdminProtectedRoute>
              } />
              <Route path="/legacy-vault" element={
                <AdminProtectedRoute>
                  <LegacySecureVault />
                </AdminProtectedRoute>
              } />
              
              {/* Security and Downloads */}
              <Route path="/security" element={<Security />} />
              <Route path="/enhanced-downloads" element={<EnhancedDownloads />} />
            </Routes>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;