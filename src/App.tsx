import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { Navbar } from "@/components/Navbar"
import { BackgroundMusic } from "@/components/BackgroundMusic"
import Index from "./pages/Index"
import Admin from "./pages/Admin"
import ArtistStreaming from "./pages/ArtistStreaming"
import VideoSharing from "./pages/VideoSharing"
import { InvisibleAttachmentSystem } from '@/components/security/InvisibleAttachmentSystem'
import { InvisibleAdminProtection } from '@/components/security/InvisibleAdminProtection'
import { InvisibleSecurityCore } from '@/components/security/InvisibleSecurityCore'
import { Invisible4StepVerification } from '@/components/security/Invisible4StepVerification'
import { QuantumEvolutionMonitor } from '@/components/security/QuantumEvolutionMonitor'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            {/* Invisible Security Systems - Running in Background */}
            <InvisibleAttachmentSystem />
            <InvisibleAdminProtection />
            <InvisibleSecurityCore />
            <Invisible4StepVerification />
            <QuantumEvolutionMonitor />
            
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/artist-streaming" element={<ArtistStreaming />} />
                <Route path="/video-sharing" element={<VideoSharing />} />
              </Routes>
              <BackgroundMusic />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
