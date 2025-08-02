
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainLayout } from "@/components/layout/MainLayout";
import { Navbar } from "@/components/Navbar";



// Import all sidebar and main navigation pages statically
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Games from "@/pages/Games";
import VirtualWorld from "@/pages/VirtualWorld";
import Community from "@/pages/Community";
import Leaderboard from "@/pages/Leaderboard";
import GaiaTokenStatus from "@/pages/GaiaTokenStatus";
import SystemStatus from "@/pages/SystemStatus";
import AuraLandScrapyard from "@/pages/AuraLandScrapyard";
import Settings from "@/pages/Settings";
import About from "@/pages/About";
import Docs from "@/pages/Docs";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Marketplace from "@/pages/Marketplace";
import AdminLogin from "@/pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1">
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/community" element={<Community />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/token-info" element={<GaiaTokenStatus />} />
              <Route path="/gaia-system" element={<SystemStatus />} />
              <Route path="/aura-land-scrapyard" element={<AuraLandScrapyard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/admin" element={<AdminLogin />} />
              {/* Add more routes for other pages as needed */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
