
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import navigationItems from "./nav-items";
import Index from "./pages/Index";

// Lazy load components for better performance
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const NFTMarketplacePage = lazy(() => import("./pages/NFTMarketplacePage"));
const ArtistStreamingPage = lazy(() => import("./pages/ArtistStreamingPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/community-hub" element={
            <Suspense fallback={<div>Loading...</div>}>
              <CommunityPage />
            </Suspense>
          } />
          <Route path="/profile" element={
            <Suspense fallback={<div>Loading...</div>}>
              <UserProfilePage />
            </Suspense>
          } />
          <Route path="/nft-marketplace" element={
            <Suspense fallback={<div>Loading...</div>}>
              <NFTMarketplacePage />
            </Suspense>
          } />
          <Route path="/artist-streaming" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ArtistStreamingPage />
            </Suspense>
          } />
          {navigationItems.map(({ to, title }) => {
            const LazyComponent = lazy(() => import(`./pages${to}`));
            return (
              <Route 
                key={to} 
                path={to} 
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent />
                  </Suspense>
                } 
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
