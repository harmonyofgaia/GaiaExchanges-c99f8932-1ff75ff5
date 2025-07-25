import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { TreePine, Mountain, Waves, Building, Sparkles, Clock } from 'lucide-react'

interface LandscapeItem {
  id: number
  type: 'tree' | 'building' | 'mountain' | 'water' | 'decoration'
  x: number
  y: number
  age: number
}

const initialItems: LandscapeItem[] = [
  { id: 1, type: 'tree', x: 50, y: 150, age: 100 },
  { id: 2, type: 'mountain', x: 200, y: 250, age: 2000 },
  { id: 3, type: 'water', x: 400, y: 350, age: 500 },
]

const AgeSlider = ({ value, onValueChange }: { value: number[]; onValueChange: (value: number[]) => void }) => (
  <Slider
    value={value}
    onValueChange={onValueChange}
    max={5000}
    min={0}
    step={100}
    className="w-full"
  />
)

export function AgeLandscapeSelector() {
  const [ageRange, setAgeRange] = useState([1000, 3000])
  const [landscapeType, setLandscapeType] = useState('all')
  const [items, setItems] = useState(initialItems)

  const handleAgeChange = (value: number[]) => {
    setAgeRange(value)
  }

  const handleLandscapeTypeChange = (type: string) => {
    setLandscapeType(type)
  }

  const filteredItems = items.filter(item => {
    const isInAgeRange = item.age >= ageRange[0] && item.age <= ageRange[1]
    const isCorrectType = landscapeType === 'all' || item.type === landscapeType
    return isInAgeRange && isCorrectType
  })

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Clock className="h-6 w-6" />
          Age & Landscape Selector
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Age Controls */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-green-400">Filter by Age</h4>
          <div className="flex items-center gap-4">
            <Badge variant="outline">
              Min Age: {ageRange[0]}
            </Badge>
            <Badge variant="outline">
              Max Age: {ageRange[1]}
            </Badge>
          </div>
          <AgeSlider value={ageRange} onValueChange={handleAgeChange} />
        </div>

        {/* Landscape Type */}
        <div>
          <h4 className="text-sm font-bold text-blue-400">Landscape Type</h4>
          <Select onValueChange={handleLandscapeTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tree">
                <TreePine className="mr-2 h-4 w-4 inline-block" />
                Trees
              </SelectItem>
              <SelectItem value="mountain">
                <Mountain className="mr-2 h-4 w-4 inline-block" />
                Mountains
              </SelectItem>
              <SelectItem value="water">
                <Waves className="mr-2 h-4 w-4 inline-block" />
                Water
              </SelectItem>
              <SelectItem value="building">
                <Building className="mr-2 h-4 w-4 inline-block" />
                Buildings
              </SelectItem>
              <SelectItem value="decoration">
                <Sparkles className="mr-2 h-4 w-4 inline-block" />
                Decorations
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-purple-400">Advanced Filters</h4>
          <p className="text-muted-foreground text-sm">
            Additional filters and customization options can be added here.
          </p>
        </div>

        {/* Landscape Grid */}
        <div className="border border-gray-500/30 rounded-lg p-4">
          <h4 className="text-sm font-bold text-gray-400 mb-2">Landscape Preview</h4>
          <div className="relative w-full h-64 bg-black/20 rounded-md overflow-hidden">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`absolute ${item.type}`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                {item.type === 'tree' && <TreePine className="h-5 w-5 text-green-500" />}
                {item.type === 'mountain' && <Mountain className="h-5 w-5 text-gray-500" />}
                {item.type === 'water' && <Waves className="h-5 w-5 text-blue-500" />}
                {item.type === 'building' && <Building className="h-5 w-5 text-yellow-500" />}
                {item.type === 'decoration' && <Sparkles className="h-5 w-5 text-purple-500" />}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
