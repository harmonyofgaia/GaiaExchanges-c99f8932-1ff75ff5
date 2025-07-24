
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

export function AgeLandscapeSelector({ onAgeGroupSelect }: { onAgeGroupSelect: (ageGroup: string) => void }) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('')

  const ageGroups: AgeGroup[] = [
    {
      id: 'children',
      name: 'Children Paradise',
      ageRange: '0-12 years',
      description: 'Safe, colorful worlds designed for young explorers',
      icon: Baby,
      color: 'bg-gradient-to-r from-pink-500 to-purple-500',
      features: [
        'Bright, friendly animal companions',
        'Simple building tools',
        'Educational content',
        'Parental controls',
        'No complex interactions'
      ],
      restrictions: [
        'No trading features',
        'Limited chat functionality',
        'Supervised environment only'
      ]
    },
    {
      id: 'teens',
      name: 'Teen Adventure Zone',
      ageRange: '13-16 years',
      description: 'Adventure-focused landscapes with social features',
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      features: [
        'Adventure quests',
        'Team building activities',
        'Basic trading systems',
        'Social interaction',
        'Creative challenges'
      ],
      restrictions: [
        'Limited investment features',
        'Moderated chat',
        'Spending limits'
      ]
    },
    {
      id: 'young_adults',
      name: 'Young Adult Campus',
      ageRange: '17-22 years',
      description: 'Learning-focused environments with advanced features',
      icon: GraduationCap,
      color: 'bg-gradient-to-r from-green-500 to-teal-500',
      features: [
        'Advanced building tools',
        'Investment education',
        'Career simulation',
        'Full social features',
        'Mentorship programs'
      ],
      restrictions: [
        'Investment guidance required',
        'Risk warnings enabled'
      ]
    },
    {
      id: 'adults',
      name: 'Professional Arena',
      ageRange: '23+ years',
      description: 'Full-featured platform for serious investors and creators',
      icon: Trophy,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      features: [
        'Unlimited building capabilities',
        'Full investment access',
        'Professional networking',
        'Advanced analytics',
        'Leadership opportunities',
        'Real money transactions'
      ],
      restrictions: [
        'Identity verification required',
        'Full responsibility for actions'
      ]
    }
  ]

  const handleSelectAgeGroup = (ageGroupId: string) => {
    setSelectedAgeGroup(ageGroupId)
    onAgeGroupSelect(ageGroupId)
  }

  return (
    <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
          <Shield className="h-6 w-6" />
          🎯 SELECT YOUR AGE GROUP LANDSCAPE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((group) => {
            const IconComponent = group.icon
            return (
              <div
                key={group.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedAgeGroup === group.id
                    ? 'border-yellow-400 scale-105 shadow-lg shadow-yellow-400/20'
                    : 'border-gray-600 hover:border-gray-400'
                } bg-gradient-to-br from-gray-900/40 to-gray-800/40`}
                onClick={() => handleSelectAgeGroup(group.id)}
              >
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${group.color} mb-3`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{group.name}</h3>
                  <Badge className="bg-blue-600 text-white">{group.ageRange}</Badge>
                </div>

                <p className="text-sm text-gray-300 mb-4 text-center">{group.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Features
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {group.features.slice(0, 3).map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Guidelines
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {group.restrictions.slice(0, 2).map((restriction, index) => (
                        <li key={index}>• {restriction}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  className={`w-full mt-4 ${
                    selectedAgeGroup === group.id
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {selectedAgeGroup === group.id ? 'Selected' : 'Enter Zone'}
                </Button>
              </div>
            )
          })}
        </div>

        {selectedAgeGroup && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/30">
            <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">
              🌟 Welcome to {ageGroups.find(g => g.id === selectedAgeGroup)?.name}!
            </h3>
            <p className="text-center text-gray-300 mb-4">
              You've entered a specially designed environment for your age group. Enjoy building and creating!
            </p>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                Start Building Your Landscape
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
