import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Settings,
  Palette,
  Brush,
  LayoutDashboard,
  Code,
  Wand2,
  Lock,
  Unlock
} from 'lucide-react'

import { TemplateSelector } from './TemplateSelector'
import { LockToggle } from './LockToggle'

export function VisualControlMenu() {
  const [isLocked, setIsLocked] = useState(false)
  
  const handleTemplateApplied = (template: any) => {
    console.log('Template applied:', template)
  }

  const handleLockToggle = () => {
    setIsLocked(!isLocked)
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20 bg-blue-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-title">Site Title</Label>
            <Input id="site-title" defaultValue="GAiA - Harmony of Life" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-description">Site Description</Label>
            <Textarea
              id="site-description"
              defaultValue="The future of sustainable finance and entertainment"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Palette className="h-5 w-5" />
            Color Palette
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input id="primary-color" type="color" defaultValue="#0070f3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <Input id="secondary-color" type="color" defaultValue="#6c757d" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <Input id="accent-color" type="color" defaultValue="#ff4581" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="background-color">Background Color</Label>
              <Input id="background-color" type="color" defaultValue="#1a202c" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/20 bg-purple-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brush className="h-5 w-5" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="font-family">Font Family</Label>
            <Input id="font-family" defaultValue="Inter, sans-serif" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Input id="font-size" type="number" defaultValue="16" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="line-height">Line Height</Label>
              <Input id="line-height" type="number" step="0.1" defaultValue="1.5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/20 bg-orange-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <LayoutDashboard className="h-5 w-5" />
            Layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="container-width">Container Width</Label>
            <Input id="container-width" type="number" defaultValue="1200" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input id="padding" type="number" defaultValue="16" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="margin">Margin</Label>
              <Input id="margin" type="number" defaultValue="24" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-red-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Code className="h-5 w-5" />
            Custom CSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-css">Custom CSS</Label>
            <Textarea
              id="custom-css"
              placeholder="Enter your custom CSS here"
            />
          </div>
        </CardContent>
      </Card>
      
      <TemplateSelector onTemplateApplied={handleTemplateApplied} />
      
      <div className="flex justify-end">
        <LockToggle isLocked={isLocked} onLockToggle={handleLockToggle} />
      </div>
    </div>
  )
}
