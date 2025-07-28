
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { TreePine } from 'lucide-react'

export function CarbonCreditActions() {
  const [actionType, setActionType] = useState('')
  const [carbonOffset, setCarbonOffset] = useState('')
  const { addActivity, loading } = useEarningActivities('user-123')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!actionType || !carbonOffset) {
      toast.error('Please fill in all fields')
      return
    }

    const points = Math.floor(parseFloat(carbonOffset) * 10)
    const tokens = Math.floor(parseFloat(carbonOffset) * 2)

    const activity = {
      id: Date.now().toString(),
      type: 'carbon_credit',
      title: 'Carbon Credit Action',
      amount: points,
      timestamp: new Date(),
      description: `Carbon offset: ${carbonOffset}kg CO2 via ${actionType}`,
      status: 'completed' as const,
      pointsEarned: points,
      tokensEarned: tokens,
      verified: true,
      metadata: { actionType, carbonOffset: parseFloat(carbonOffset) }
    }

    addActivity(activity)
    toast.success(`Carbon credit recorded! +${points} points earned`)
    setActionType('')
    setCarbonOffset('')
  }

  return (
    <Card className="border-green-500/30 bg-green-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <TreePine className="h-5 w-5" />
          🌱 Carbon Credit Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Action Type</label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tree_planting">Tree Planting</SelectItem>
                <SelectItem value="renewable_energy">Renewable Energy</SelectItem>
                <SelectItem value="carbon_sequestration">Carbon Sequestration</SelectItem>
                <SelectItem value="emissions_reduction">Emissions Reduction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Carbon Offset (kg CO2)</label>
            <Input
              type="number"
              step="0.1"
              value={carbonOffset}
              onChange={(e) => setCarbonOffset(e.target.value)}
              placeholder="Enter CO2 offset amount"
              min="0.1"
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
            {loading ? 'Recording...' : '🌱 Record Carbon Action'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
          <p className="text-sm text-green-300">
            💡 <strong>Earning:</strong> 10 points per kg CO2 offset + verified carbon credits
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
