import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Palette, Settings, Monitor, Paintbrush } from 'lucide-react'

export function AdminVisualControls() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-5 w-5" />
            Visual Controls & UI Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Theme Controls */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-300">
                  <Paintbrush className="h-4 w-4" />
                  Theme Manager
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-600 text-blue-100">
                    Dark Ocean
                  </Badge>
                  <Badge variant="outline" className="border-purple-500 text-purple-300">
                    Galaxy
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-300">
                    Forest
                  </Badge>
                </div>
                <Button size="sm" className="w-full">
                  Apply Theme
                </Button>
              </CardContent>
            </Card>

            {/* Layout Controls */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-300">
                  <Monitor className="h-4 w-4" />
                  Layout Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Sidebar Width</span>
                    <span className="text-slate-200">280px</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Panel Spacing</span>
                    <span className="text-slate-200">24px</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Reset Layout
                </Button>
              </CardContent>
            </Card>

            {/* Animation Controls */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-300">
                  <Settings className="h-4 w-4" />
                  Animation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Transitions</span>
                    <Badge variant="secondary" className="bg-green-600 text-green-100">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Matrix Rain</span>
                    <Badge variant="secondary" className="bg-green-600 text-green-100">
                      Active
                    </Badge>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Configure
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
            <CardHeader>
              <CardTitle className="text-slate-300">Visual Enhancement Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">12</div>
                  <div className="text-xs text-slate-400">Custom Themes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">6</div>
                  <div className="text-xs text-slate-400">Layout Modes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">24</div>
                  <div className="text-xs text-slate-400">Color Schemes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">8</div>
                  <div className="text-xs text-slate-400">Font Options</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}