import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { Leaf } from 'lucide-react'

export function CompostingActions() {
  const [compostType, setCompostType] = useState('')
  const [organicWaste, setOrganicWaste] = useState('')
  const [compostMethod, setCompostMethod] = useState('')
  const { addActivity, loading } = useEarningActivities('user-123')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!compostType || !organicWaste || !compostMethod) {
      toast.error('Please fill in all fields')
      return
    }

    const points = parseFloat(organicWaste) * 5
    const tokens = Math.floor(points * 0.1)

    const activity = {
      id: Date.now().toString(),
      type: 'composting',
      title: 'Composting Activity',
      amount: Math.floor(points),
      timestamp: new Date(),
      description: `Composted ${organicWaste}kg of ${compostType} using ${compostMethod}`,
      status: 'completed' as const,
      pointsEarned: Math.floor(points),
      tokensEarned: tokens,
      verified: true,
      metadata: { compostType, organicWaste: parseFloat(organicWaste), compostMethod }
    }

    addActivity(activity)
    toast.success(`Composting recorded! +${Math.floor(points)} points earned`)
    setCompostType('')
    setOrganicWaste('')
    setCompostMethod('')
  }

  return (
    <Card className="border-orange-500/30 bg-orange-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Leaf className="h-5 w-5" />
          🍂 Composting Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Compost Type</label>
            <Select value={compostType} onValueChange={setCompostType}>
              <SelectTrigger>
                <SelectValue placeholder="Select compost type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kitchen_scraps">Kitchen Scraps</SelectItem>
                <SelectItem value="yard_waste">Yard Waste</SelectItem>
                <SelectItem value="food_waste">Food Waste</SelectItem>
                <SelectItem value="paper_cardboard">Paper & Cardboard</SelectItem>
                <SelectItem value="mixed_organic">Mixed Organic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Organic Waste Weight (kg)</label>
            <Input
              type="number"
              step="0.1"
              value={organicWaste}
              onChange={(e) => setOrganicWaste(e.target.value)}
              placeholder="Weight of composted material"
              min="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Composting Method</label>
            <Select value={compostMethod} onValueChange={setCompostMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select composting method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backyard_bin">Backyard Bin</SelectItem>
                <SelectItem value="tumbler">Tumbler</SelectItem>
                <SelectItem value="vermicomposting">Vermicomposting</SelectItem>
                <SelectItem value="bokashi">Bokashi</SelectItem>
                <SelectItem value="community_program">Community Program</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700">
            {loading ? 'Recording...' : '🍂 Record Composting (+5 Points per kg)'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
          <p className="text-sm text-orange-300">
            💡 <strong>Soil Health:</strong> Composting reduces landfill waste and creates nutrient-rich soil amendments!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}