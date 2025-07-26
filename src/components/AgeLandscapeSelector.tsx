
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Baby, 
  Users, 
  GraduationCap, 
  Trophy,
  Shield,
  Star,
  Zap
} from 'lucide-react'

interface AgeGroup {
  id: string
  name: string
  ageRange: string
  description: string
  icon: React.ComponentType<{ className?: string; size?: number | string }>
  color: string
  features: string[]
  restrictions: string[]
}

interface AgeLandscapeSelectorProps {
  selectedAge: string;
  onAgeSelect: (age: string) => void;
  onAgeGroupSelect?: (ageGroup: string) => void;
}

export function AgeLandscapeSelector({ selectedAge, onAgeSelect, onAgeGroupSelect }: AgeLandscapeSelectorProps) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(selectedAge || '')

  // Simple age groups for backwards compatibility
  const simpleAgeGroups = [
    { id: '6-8', label: '6-8 Years', description: 'Simple builds, basic shapes' },
    { id: '9-12', label: '9-12 Years', description: 'Medium complexity, creative themes' },
    { id: '13-16', label: '13-16 Years', description: 'Advanced builds, detailed structures' },
    { id: '17+', label: '17+ Years', description: 'Expert level, unlimited creativity' }
  ];

  const handleAgeGroupSelect = (ageGroupId: string) => {
    setSelectedAgeGroup(ageGroupId)
    onAgeSelect(ageGroupId)
    onAgeGroupSelect?.(ageGroupId)
  }

  // Use simple groups for basic functionality
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {simpleAgeGroups.map((group) => (
        <Card 
          key={group.id}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedAge === group.id 
              ? 'border-green-400 bg-green-900/50' 
              : 'border-green-600/30 bg-green-900/20'
          }`}
          onClick={() => handleAgeGroupSelect(group.id)}
        >
          <div className="p-4 text-center space-y-2">
            <h3 className="font-semibold text-green-300">{group.label}</h3>
            <p className="text-sm text-green-400/80">{group.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
