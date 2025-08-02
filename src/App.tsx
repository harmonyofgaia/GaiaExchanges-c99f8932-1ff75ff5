
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Navbar } from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";
import SlidingMenu from "@/components/SlidingMenu";

// Import key pages
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Games from "@/pages/Games";
import VirtualWorld from "@/pages/VirtualWorld";
import Community from "@/pages/Community";
import Marketplace from "@/pages/Marketplace";
import Profile from "@/pages/Profile";
import AdminLogin from "@/pages/AdminLogin";
import Settings from "@/pages/Settings";
import About from "@/pages/About";
import Docs from "@/pages/Docs";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <SlidingMenu />
          <div className="flex-1">
            <MainLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/games" element={<Games />} />
                <Route path="/virtual-world" element={<VirtualWorld />} />
                <Route path="/community" element={<Community />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/docs" element={<Docs />} />
                {/* Add more routes for other pages as needed */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
