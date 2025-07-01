
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Navbar } from '@/components/Navbar'
import { PageSpecificNeuralBackground } from '@/components/ui/page-specific-neural-background'
import { PageSpecificBackground } from '@/components/ui/page-specific-background'
import { CloudRAMEngine } from '@/components/admin/CloudRAMEngine'
import { UniversalQuantumDefenseCore } from '@/components/quantum/UniversalQuantumDefenseCore'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        {/* Enhanced multi-layer background system */}
        <PageSpecificNeuralBackground />
        <PageSpecificBackground />
        
        {/* Universal Quantum Defense Core - Always Active */}
        <div className="fixed top-4 left-4 z-50 w-96 hidden xl:block">
          <UniversalQuantumDefenseCore />
        </div>
        
        {/* Cloud RAM Engine for performance monitoring */}
        <div className="fixed top-4 right-4 z-50 w-80 hidden xl:block">
          <CloudRAMEngine />
        </div>
        
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 relative z-10 p-4">
            {/* Enhanced content visibility wrapper */}
            <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
