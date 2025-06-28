import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckCircle2, Copy, ImagePlus, Palette, Shield } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from '@/hooks/use-toast'

interface BackgroundImage {
  id: string
  name: string
  description: string
  tags: string[]
  uploadDate: string
  usageCount: number
  isActive: boolean
}

export function BackgroundManager() {
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([
    {
      id: 'gaia-forest',
      name: 'Gaia Forest',
      description: 'Lush green forest with vibrant wildlife and mystical elements',
      tags: ['forest', 'nature', 'green', 'wildlife'],
      uploadDate: '2024-01-15',
      usageCount: 42,
      isActive: true
    },
    {
      id: 'ocean-waves',
      name: 'Ocean Waves',
      description: 'Calm ocean waves with a serene sunset and peaceful atmosphere',
      tags: ['ocean', 'waves', 'sunset', 'peaceful'],
      uploadDate: '2024-02-01',
      usageCount: 28,
      isActive: true
    },
    {
      id: 'mountain-peaks',
      name: 'Mountain Peaks',
      description: 'Snow-capped mountain peaks with a clear blue sky and majestic view',
      tags: ['mountain', 'snow', 'peaks', 'majestic'],
      uploadDate: '2024-02-10',
      usageCount: 35,
      isActive: false
    },
    {
      id: 'starry-night',
      name: 'Starry Night',
      description: 'A night sky filled with stars, galaxies, and cosmic wonders',
      tags: ['stars', 'night', 'galaxy', 'cosmic'],
      uploadDate: '2024-03-01',
      usageCount: 58,
      isActive: true
    },
    {
      id: 'desert-oasis',
      name: 'Desert Oasis',
      description: 'A hidden oasis in the desert with palm trees, clear water, and exotic wildlife',
      tags: ['desert', 'oasis', 'palm trees', 'exotic'],
      uploadDate: '2024-03-15',
      usageCount: 19,
      isActive: false
    }
  ])

  const [newImage, setNewImage] = useState<Omit<BackgroundImage, 'id' | 'uploadDate' | 'usageCount'>>({
    name: '',
    description: '',
    tags: [],
    isActive: true
  })

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewImage(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImage(prev => ({ ...prev, isActive: e.target.checked }))
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags(prev => [...prev, newTag])
      setNewImage(prev => ({ ...prev, tags: [...prev.tags, newTag] }))
      setNewTag('')
      setIsAddingTag(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove))
    setNewImage(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const handleCreateImage = () => {
    if (newImage.name && newImage.description) {
      const newBackgroundImage: BackgroundImage = {
        id: Date.now().toString(),
        name: newImage.name,
        description: newImage.description,
        tags: newImage.tags,
        uploadDate: date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        usageCount: 0,
        isActive: newImage.isActive
      }
      setBackgroundImages(prev => [...prev, newBackgroundImage])
      setNewImage({ name: '', description: '', tags: [], isActive: true })
      setSelectedTags([])
      setDate(undefined)
      toast({
        title: "Background Image Created",
        description: "New background image has been successfully created.",
      })
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
    }
  }

  const exoticDefenseImages = [
    {
      id: 'exotic-quantum',
      name: 'Quantum Defense Matrix',
      description: 'Exotic quantum encryption patterns for maximum security visualization',
      tags: ['exotic', 'quantum', 'defense', 'security'],
      uploadDate: new Date().toISOString().split('T')[0],
      usageCount: 1,
      isActive: true
    },
    {
      id: 'synatic-power',
      name: 'Synatic AI Core',
      description: 'Visual representation of Synatic AI power core and neural pathways',
      tags: ['synatic', 'ai', 'power', 'neural'],
      uploadDate: new Date().toISOString().split('T')[0],
      usageCount: 1,
      isActive: true
    }
  ]

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Exotic Defense Integration */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Palette className="h-8 w-8 text-purple-400" />
            <div>
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Enhanced Background Studio
              </div>
              <div className="text-sm font-normal text-purple-300">
                Powered by Exotic Defense System & Synatic AI
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{backgroundImages.length + exoticDefenseImages.length}</div>
              <div className="text-sm text-muted-foreground">Total Backgrounds</div>
              <Badge className="mt-2 bg-green-600">Enhanced</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">Exotic</div>
              <div className="text-sm text-muted-foreground">Defense Level</div>
              <Badge className="mt-2 bg-purple-600">Maximum</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">AI</div>
              <div className="text-sm text-muted-foreground">Synatic Powered</div>
              <Badge className="mt-2 bg-blue-600">Active</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-muted-foreground">Creative Potential</div>
              <Badge className="mt-2 bg-orange-600">Unlimited</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exotic Defense System Images Section */}
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            Exotic Defense System Backgrounds
          </CardTitle>
          <p className="text-sm text-red-300">
            Specialized backgrounds for the most powerful AI-Human engagement system
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exoticDefenseImages.map((image) => (
              <Card key={image.id} className="bg-gradient-to-br from-red-900/30 to-black/50 border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-red-300">{image.name}</h4>
                    <Badge className="bg-red-600 text-white">EXOTIC</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {image.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-red-500/30 text-red-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Active: {image.isActive ? 'Yes' : 'No'}</span>
                    <span>Used: {image.usageCount} times</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manage">Manage Backgrounds</TabsTrigger>
          <TabsTrigger value="create">Create Background</TabsTrigger>
        </TabsList>
        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Existing Background Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {backgroundImages.map(image => (
                  <Card key={image.id} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{image.name}</h4>
                        <Badge>{image.isActive ? 'Active' : 'Inactive'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {image.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Uploaded: {image.uploadDate}</span>
                        <span>Used: {image.usageCount} times</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Background Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={newImage.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newImage.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                      {tag}
                    </Badge>
                  ))}
                  {isAddingTag ? (
                    <div className="flex items-center">
                      <Input
                        type="text"
                        value={newTag}
                        onChange={handleTagInputChange}
                        className="mr-2"
                      />
                      <Button size="sm" onClick={handleAddTag}>Add</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setIsAddingTag(true)}>Add Tag</Button>
                  )}
                </div>
              </div>
              <div>
                <Label>Upload Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="active">Active</Label>
                <Switch
                  id="active"
                  checked={newImage.isActive}
                  onCheckedChange={handleCheckboxChange}
                />
              </div>
              <Button onClick={handleCreateImage}>Create Image</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
