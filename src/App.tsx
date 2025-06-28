
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { AnimatedBackground } from "./components/ui/animated-background";
import Index from "./pages/Index";
import About from "./pages/About";
import Wallet from "./pages/Wallet";
import Transparency from "./pages/Transparency";
import Markets from "./pages/Markets";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background relative">
            <AnimatedBackground />
            <AppSidebar />
            <div className="flex-1 flex flex-col relative z-10">
              <header className="h-14 flex items-center border-b border-border px-6 bg-background/80 backdrop-blur-sm">
                <SidebarTrigger className="mr-4" />
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Gaia's Exchanges • World's Most Secure Crypto Trading Platform
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      World Leader Status
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6 bg-background/50 backdrop-blur-sm">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/marketing" element={<Marketing />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
