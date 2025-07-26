import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { TreePine, Mountain, Waves, Building, Sparkles, Wand2, Download, Upload, Zap } from 'lucide-react'
import { ItemType } from '@/types/ui-types'

export function LandscapeBuilderAdvanced() {
  const [selectedTool, setSelectedTool] = useState<ItemType>('tree')
  const [brushSize, setBrushSize] = useState([10])
  const [items, setItems] = useState([])
  const [isAutoMode, setIsAutoMode] = useState(false)
  
  // Define autoEnhanceLandscape before using it
  const autoEnhanceLandscape = () => {
    setItems(prev => {
      // Auto enhancement logic
      return [...prev, {
        id: Date.now(),
        type: selectedTool,
        x: Math.random() * 800,
        y: Math.random() * 600
      }]
    })
  }

  useEffect(() => {
    if (isAutoMode) {
      const interval = setInterval(autoEnhanceLandscape, 2000)
      return () => clearInterval(interval)
    }
  }, [isAutoMode, autoEnhanceLandscape])

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool as ItemType)
  }

  const handleBrushSizeChange = (value: number[]) => {
    setBrushSize(value)
  }

  const handleAddItem = () => {
    setItems(prev => [...prev, {
      id: Date.now(),
      type: selectedTool,
      x: Math.random() * 800,
      y: Math.random() * 600
    }])
  }

  const handleClearCanvas = () => {
    setItems([])
  }

  const handleAutoModeToggle = () => {
    setIsAutoMode(prev => !prev)
  }

  const handleImportLandscape = () => {
    // Import logic
  }

  const handleExportLandscape = () => {
    // Export logic
  }

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Mountain className="h-6 w-6" />
          🏔️ Advanced Landscape Builder
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tool Selection */}
        <Tabs value={selectedTool} onValueChange={handleToolChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tree">
              <TreePine className="h-4 w-4 mr-2" />
              Trees
            </TabsTrigger>
            <TabsTrigger value="building">
              <Building className="h-4 w-4 mr-2" />
              Buildings
            </TabsTrigger>
            <TabsTrigger value="mountain">
              <Mountain className="h-4 w-4 mr-2" />
              Mountains
            </TabsTrigger>
            <TabsTrigger value="water">
              <Waves className="h-4 w-4 mr-2" />
              Water
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Brush Size Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Brush Size:</label>
            <Badge className="bg-blue-600 text-white">
              {brushSize[0]}
            </Badge>
          </div>
          <Slider
            value={brushSize}
            onValueChange={handleBrushSizeChange}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Canvas */}
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 space-x-2">
            <Button size="sm" variant="outline" onClick={handleAddItem}>
              Add Item
            </Button>
            <Button size="sm" variant="destructive" onClick={handleClearCanvas}>
              Clear Canvas
            </Button>
            <Button 
              size="sm" 
              variant={isAutoMode ? 'secondary' : 'outline'} 
              onClick={handleAutoModeToggle}
            >
              {isAutoMode ? <Zap className="h-4 w-4 mr-2 animate-pulse" /> : <Wand2 className="h-4 w-4 mr-2" />}
              {isAutoMode ? 'Auto Mode ON' : 'Enable Auto Mode'}
            </Button>
          </div>
          <div 
            className="w-full h-[600px] bg-gray-900 border border-gray-700 rounded-lg relative overflow-hidden"
          >
            {items.map(item => (
              <div
                key={item.id}
                className={`absolute rounded-full ${item.type === 'tree' ? 'bg-green-500' : item.type === 'building' ? 'bg-gray-500' : item.type === 'mountain' ? 'bg-gray-700' : 'bg-blue-500'}`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${brushSize[0]}px`,
                  height: `${brushSize[0]}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Import/Export */}
        <div className="flex items-center justify-between">
          <Button onClick={handleImportLandscape} variant="secondary">
            <Upload className="h-4 w-4 mr-2" />
            Import Landscape
          </Button>
          <Button onClick={handleExportLandscape} variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export Landscape
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
