
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { Zap } from 'lucide-react'

export function SkillBasedEarning() {
  const [skillType, setSkillType] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [hoursWorked, setHoursWorked] = useState('')
  const [description, setDescription] = useState('')
  const { recordSkillBasedWork, loading } = useEarningActivities('user-123')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!skillType || !projectTitle || !hoursWorked) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      await recordSkillBasedWork({
        skillType,
        projectTitle,
        hoursWorked: parseFloat(hoursWorked),
        difficultyLevel: 3,
        qualityRating: 5,
        clientSatisfaction: 5,
        ecoImpact: true,
        description
      })
      
      const points = parseFloat(hoursWorked) * 10
      toast.success(`Skill-based work recorded! +${points} points earned`)
      setSkillType('')
      setProjectTitle('')
      setHoursWorked('')
      setDescription('')
    } catch (error) {
      toast.error('Failed to record skill-based work')
    }
  }

  return (
    <Card className="border-cyan-500/30 bg-cyan-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Zap className="h-5 w-5" />
          ⚡ Skill-Based Earning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Skill Type</label>
            <Select value={skillType} onValueChange={setSkillType}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="teaching">Teaching</SelectItem>
                <SelectItem value="translation">Translation</SelectItem>
                <SelectItem value="research">Research</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <Input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Name of your project"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Hours Worked</label>
            <Input
              type="number"
              step="0.5"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              placeholder="Hours spent on project"
              min="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (optional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the work..."
              rows={3}
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700">
            {loading ? 'Recording...' : '⚡ Record Skill Work (10 Points/Hour)'}
          </Button>
        </form>
        
        <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
          <p className="text-sm text-cyan-300">
            💡 <strong>Earning:</strong> 10 points per hour + quality bonuses for excellent work
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
