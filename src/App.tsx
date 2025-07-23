
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { DatabaseErrorFixer } from '@/components/security/DatabaseErrorFixer';
import EnhancedDownloads from "./pages/EnhancedDownloads";
import SecureVault from "./pages/SecureVault";
import SecureAdmin from "./pages/SecureAdmin";
import Game from "./pages/Game";
import GaiasProjects from "./pages/GaiasProjects";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DatabaseErrorFixer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/enhanced-downloads" element={<EnhancedDownloads />} />
          <Route path="/secure-vault" element={<SecureVault />} />
          <Route path="/secure-admin" element={<SecureAdmin />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gaming" element={<Game />} />
          <Route path="/gaias-projects" element={<GaiasProjects />} />
          <Route path="/projects" element={<GaiasProjects />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
