
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRouteProtector } from "@/components/admin/AdminRouteProtector";
import Index from "./pages/Index";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Exchange = lazy(() => import("./pages/Exchange"));
const Admin = lazy(() => import("./pages/Admin"));
const Security = lazy(() => import("./pages/Security"));
const SecureAdmin = lazy(() => import("./pages/SecureAdmin"));
const SecureVault = lazy(() => import("./pages/SecureVault"));
const GaiasProjects = lazy(() => import("./pages/GaiasProjects"));

// Master Plan v7 pages
const GreenImpactDashboard = lazy(() => import("./pages/GreenImpactDashboard"));
const DecentralizedProjectFundingPools = lazy(() => import("./pages/DecentralizedProjectFundingPools"));
const EcoMissionGenerator = lazy(() => import("./pages/EcoMissionGenerator"));
const PlanetCleaningRewardsSystem = lazy(() => import("./pages/PlanetCleaningRewardsSystem"));
const NFTCardGame = lazy(() => import("./pages/NFTCardGame"));
const EcoAvatarGaiaSoulSystem = lazy(() => import("./pages/EcoAvatarGaiaSoulSystem"));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
      </div>
      <p className="text-green-400 font-medium">Loading Harmony of Gaia...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminRouteProtector />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exchange"
                element={
                  <ProtectedRoute>
                    <Exchange />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gaias-projects"
                element={
                  <ProtectedRoute>
                    <GaiasProjects />
                  </ProtectedRoute>
                }
              />
              
              {/* Master Plan v7 Routes */}
              <Route
                path="/green-impact-dashboard"
                element={
                  <ProtectedRoute>
                    <GreenImpactDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/project-funding"
                element={
                  <ProtectedRoute>
                    <DecentralizedProjectFundingPools />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eco-missions"
                element={
                  <ProtectedRoute>
                    <EcoMissionGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/planet-cleaning"
                element={
                  <ProtectedRoute>
                    <PlanetCleaningRewardsSystem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nft-cards"
                element={
                  <ProtectedRoute>
                    <NFTCardGame />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eco-avatar"
                element={
                  <ProtectedRoute>
                    <EcoAvatarGaiaSoulSystem />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute isAdminRoute={true}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/secure-admin"
                element={
                  <ProtectedRoute isAdminRoute={true}>
                    <SecureAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/secure-vault"
                element={
                  <ProtectedRoute isAdminRoute={true}>
                    <SecureVault />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security"
                element={
                  <ProtectedRoute>
                    <Security />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
