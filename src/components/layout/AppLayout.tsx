
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Navbar } from '@/components/Navbar'
import { PageSpecificNeuralBackground } from '@/components/ui/page-specific-neural-background'
import { PageSpecificBackground } from '@/components/ui/page-specific-background'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        {/* Multiple background layers for rich visual experience */}
        <PageSpecificNeuralBackground />
        <PageSpecificBackground />
        
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 relative z-10 p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
