
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { EnhancedAdminControls } from '@/components/EnhancedAdminControls'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Admin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Control System</h1>
          <p className="text-muted-foreground">Complete control over the Harmony of Gaia Exchange</p>
        </div>
      </div>
      
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enhanced">Enhanced Controls</TabsTrigger>
          <TabsTrigger value="standard">Standard Controls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced">
          <EnhancedAdminControls />
        </TabsContent>
        
        <TabsContent value="standard">
          <AdminControlSystem />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Admin
