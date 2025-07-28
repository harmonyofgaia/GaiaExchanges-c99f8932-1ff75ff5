
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Shield,
  Menu,
  Search,
  Settings
} from 'lucide-react'
import { navigationItems } from '@/nav-items'
import { useMenuControl } from './MenuControlProvider'
import { toast } from 'sonner'

interface MenuControlDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MenuControlDialog({ open, onOpenChange }: MenuControlDialogProps) {
  const {
    isMenuLocked,
    toggleMenuLock,
    visiblePages,
    hiddenPages,
    togglePageVisibility,
    isPageVisible
  } = useMenuControl()

  const [searchTerm, setSearchTerm] = useState('')

  const handleLockToggle = () => {
    toggleMenuLock()
    toast.success(
      isMenuLocked ? 'Menu unlocked! You can now modify visibility.' : 'Menu locked! Navigation is now protected.',
      {
        description: isMenuLocked 
          ? 'Pages can now be hidden/shown freely' 
          : 'No one can modify navigation without unlocking first',
        duration: 3000
      }
    )
  }

  const filteredItems = navigationItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.to.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const visibleItems = filteredItems.filter(item => isPageVisible(item.to))
  const hiddenItems = filteredItems.filter(item => !isPageVisible(item.to))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-black/95 border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-purple-400 flex items-center gap-2">
            <Menu className="h-6 w-6" />
            Advanced Menu Control System
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Complete control over navigation visibility and protection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lock Control */}
          <Card className="border-orange-500/30 bg-orange-900/10">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                {isMenuLocked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                Menu Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg">Menu Lock Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {isMenuLocked 
                      ? 'Navigation is locked and protected from changes' 
                      : 'Navigation can be modified freely'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={isMenuLocked ? 'destructive' : 'secondary'}>
                    {isMenuLocked ? 'LOCKED' : 'UNLOCKED'}
                  </Badge>
                  <Switch
                    checked={isMenuLocked}
                    onCheckedChange={handleLockToggle}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="space-y-2">
            <Label>Search Pages</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by page name or path..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Page Management */}
          <Tabs defaultValue="visible" className="space-y-4">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="visible" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visible Pages ({visibleItems.length})
              </TabsTrigger>
              <TabsTrigger value="hidden" className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" />
                Hidden Pages ({hiddenItems.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                All Pages ({filteredItems.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visible" className="space-y-3">
              <div className="text-sm text-green-400 mb-3">
                These pages are currently visible in the navigation
              </div>
              {visibleItems.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.to} className="border-green-500/20 bg-green-900/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-green-400" />
                          <div>
                            <div className="font-medium text-green-400">{item.title}</div>
                            <div className="text-sm text-muted-foreground">{item.to}</div>
                            {item.description && (
                              <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePageVisibility(item.to)}
                          disabled={isMenuLocked}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <EyeOff className="h-4 w-4 mr-1" />
                          Hide
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="hidden" className="space-y-3">
              <div className="text-sm text-red-400 mb-3">
                These pages are hidden from navigation
              </div>
              {hiddenItems.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.to} className="border-red-500/20 bg-red-900/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-red-400" />
                          <div>
                            <div className="font-medium text-red-400">{item.title}</div>
                            <div className="text-sm text-muted-foreground">{item.to}</div>
                            {item.description && (
                              <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePageVisibility(item.to)}
                          disabled={isMenuLocked}
                          className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Show
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="all" className="space-y-3">
              <div className="text-sm text-blue-400 mb-3">
                Complete overview of all pages in the system
              </div>
              {filteredItems.map((item) => {
                const Icon = item.icon
                const visible = isPageVisible(item.to)
                return (
                  <Card key={item.to} className={`${
                    visible ? 'border-green-500/20 bg-green-900/10' : 'border-red-500/20 bg-red-900/10'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${visible ? 'text-green-400' : 'text-red-400'}`} />
                          <div>
                            <div className={`font-medium ${visible ? 'text-green-400' : 'text-red-400'}`}>
                              {item.title}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.to}</div>
                            {item.description && (
                              <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={visible ? 'default' : 'destructive'}>
                            {visible ? 'Visible' : 'Hidden'}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePageVisibility(item.to)}
                            disabled={isMenuLocked}
                            className={
                              visible 
                                ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                                : "border-green-500/30 text-green-400 hover:bg-green-500/10"
                            }
                          >
                            {visible ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                            {visible ? 'Hide' : 'Show'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
