
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AdvertisingHeader } from "@/components/AdvertisingHeader"
import { AppWithErrorBoundary } from "@/components/AppWithErrorBoundary"
import Index from "./pages/Index"
import About from "./pages/About"
import Wallet from "./pages/Wallet"
import Markets from "./pages/Markets"
import Transparency from "./pages/Transparency"
import Reinvestments from "./pages/Reinvestments"
import Downloads from "./pages/Downloads"
import SmartContracts from "./pages/SmartContracts"
import Marketing from "./pages/Marketing"
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <AdvertisingHeader />
              <div className="p-4">
                <SidebarTrigger />
              </div>
              <AppWithErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/reinvestments" element={<Reinvestments />} />
                  <Route path="/downloads" element={<Downloads />} />
                  <Route path="/smart-contracts" element={<SmartContracts />} />
                  <Route path="/marketing" element={<Marketing />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppWithErrorBoundary>
            </main>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
