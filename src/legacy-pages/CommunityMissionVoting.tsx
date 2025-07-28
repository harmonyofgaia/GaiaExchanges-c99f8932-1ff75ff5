import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Vote, 
  Users, 
  TrendingUp, 
  Heart, 
  Leaf, 
  Droplets,
  Sun,
  TreePine,
  Fish,
  Award,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Globe,
  Shield,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'

interface Mission {
  id: number
  title: string
  description: string
  votes: number
  status: 'active' | 'completed' | 'pending'
  category: 'Environment' | 'Community' | 'Technology' | 'Education'
  startDate: string
  endDate: string
  targetCompletion: number
  currentProgress: number
  impactScore: number
  budget: number
  teamMembers: number
  successRate: number
}

const missionsData: Mission[] = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    description: 'Provide clean water access to rural communities.',
    votes: 125,
    status: 'active',
    category: 'Environment',
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    targetCompletion: 10000,
    currentProgress: 6800,
    impactScore: 85,
    budget: 75000,
    teamMembers: 15,
    successRate: 72
  },
  {
    id: 2,
    title: 'Education for All',
    description: 'Improve educational resources in underserved schools.',
    votes: 98,
    status: 'active',
    category: 'Education',
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    targetCompletion: 5000,
    currentProgress: 3200,
    impactScore: 92,
    budget: 60000,
    teamMembers: 12,
    successRate: 88
  },
  {
    id: 3,
    title: 'Green Energy Transition',
    description: 'Promote the use of renewable energy sources.',
    votes: 156,
    status: 'active',
    category: 'Technology',
    startDate: '2024-03-10',
    endDate: '2024-09-10',
    targetCompletion: 2000,
    currentProgress: 1500,
    impactScore: 78,
    budget: 90000,
    teamMembers: 18,
    successRate: 65
  },
  {
    id: 4,
    title: 'Community Health Program',
    description: 'Improve healthcare services in local communities.',
    votes: 85,
    status: 'active',
    category: 'Community',
    startDate: '2024-04-01',
    endDate: '2024-10-01',
    targetCompletion: 8000,
    currentProgress: 5500,
    impactScore: 80,
    budget: 70000,
    teamMembers: 14,
    successRate: 78
  },
  {
    id: 5,
    title: 'Reforestation Project',
    description: 'Plant trees to combat deforestation and promote biodiversity.',
    votes: 180,
    status: 'active',
    category: 'Environment',
    startDate: '2024-05-01',
    endDate: '2024-11-01',
    targetCompletion: 15000,
    currentProgress: 11000,
    impactScore: 95,
    budget: 80000,
    teamMembers: 16,
    successRate: 90
  },
  {
    id: 6,
    title: 'Digital Literacy Program',
    description: 'Provide digital skills training to bridge the digital divide.',
    votes: 110,
    status: 'active',
    category: 'Education',
    startDate: '2024-06-15',
    endDate: '2024-12-15',
    targetCompletion: 6000,
    currentProgress: 4000,
    impactScore: 88,
    budget: 65000,
    teamMembers: 13,
    successRate: 82
  },
  {
    id: 7,
    title: 'Sustainable Agriculture Initiative',
    description: 'Promote sustainable farming practices for food security.',
    votes: 140,
    status: 'active',
    category: 'Technology',
    startDate: '2024-07-01',
    endDate: '2025-01-01',
    targetCompletion: 1000,
    currentProgress: 750,
    impactScore: 82,
    budget: 85000,
    teamMembers: 17,
    successRate: 75
  },
  {
    id: 8,
    title: 'Mental Health Support',
    description: 'Offer mental health services and support to those in need.',
    votes: 92,
    status: 'active',
    category: 'Community',
    startDate: '2024-08-01',
    endDate: '2025-02-01',
    targetCompletion: 4000,
    currentProgress: 2800,
    impactScore: 75,
    budget: 72000,
    teamMembers: 15,
    successRate: 70
  },
  {
    id: 9,
    title: 'Ocean Cleanup Campaign',
    description: 'Remove plastic waste from oceans and protect marine life.',
    votes: 165,
    status: 'active',
    category: 'Environment',
    startDate: '2024-09-15',
    endDate: '2025-03-15',
    targetCompletion: 12000,
    currentProgress: 9000,
    impactScore: 90,
    budget: 78000,
    teamMembers: 16,
    successRate: 85
  },
  {
    id: 10,
    title: 'Skills Development Program',
    description: 'Provide vocational training and skills development opportunities.',
    votes: 105,
    status: 'active',
    category: 'Education',
    startDate: '2024-10-01',
    endDate: '2025-04-01',
    targetCompletion: 5500,
    currentProgress: 3800,
    impactScore: 85,
    budget: 62000,
    teamMembers: 13,
    successRate: 80
  }
]

const categories = ['Environment', 'Community', 'Technology', 'Education']
const missionStatuses = ['active', 'completed', 'pending']

export default function CommunityMissionVoting() {
  const [missions, setMissions] = useState<Mission[]>(missionsData)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleVote = (id: number) => {
    setMissions(
      missions.map((mission) =>
        mission.id === id ? { ...mission, votes: mission.votes + 1 } : mission
      )
    )
    toast.success('Vote submitted successfully!', {
      description: 'Your vote helps shape our community initiatives.',
    })
  }

  const filteredMissions = missions.filter((mission) => {
    const categoryMatch = selectedCategory
      ? mission.category === selectedCategory
      : true
    const statusMatch = selectedStatus ? mission.status === selectedStatus : true
    const searchMatch = mission.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return categoryMatch && statusMatch && searchMatch
  })

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            🗳️ Community Mission Voting
          </h1>
          <p className="text-xl text-muted-foreground">
            Vote for your favorite community missions and help shape our future
          </p>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-green-400">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className={cn(
                  'border-green-500/50 text-green-300 hover:bg-green-500/10',
                  selectedCategory === null && 'bg-green-500/10'
                )}
                onClick={() => handleCategoryFilter(null)}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className={cn(
                    'border-green-500/50 text-green-300 hover:bg-green-500/10',
                    selectedCategory === category && 'bg-green-500/10'
                  )}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-400">Filter by Status</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className={cn(
                  'border-blue-500/50 text-blue-300 hover:bg-blue-500/10',
                  selectedStatus === null && 'bg-blue-500/10'
                )}
                onClick={() => handleStatusFilter(null)}
              >
                All Statuses
              </Button>
              {missionStatuses.map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  className={cn(
                    'border-blue-500/50 text-blue-300 hover:bg-blue-500/10',
                    selectedStatus === status && 'bg-blue-500/10'
                  )}
                  onClick={() => handleStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-purple-400">Search Missions</h3>
            <input
              type="text"
              placeholder="Search by title"
              className="w-full rounded-md border border-purple-500/50 px-3 py-2 bg-transparent text-purple-300 focus:outline-none focus:border-purple-500"
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <Card key={mission.id} className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-green-400">
                  {mission.title}
                  <Badge
                    className={cn(
                      'text-white',
                      mission.status === 'active' && 'bg-green-600',
                      mission.status === 'completed' && 'bg-blue-600',
                      mission.status === 'pending' && 'bg-orange-600'
                    )}
                  >
                    {mission.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{mission.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Clock className="h-4 w-4" />
                    {mission.startDate} - {mission.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Target className="h-4 w-4" />
                    {mission.targetCompletion}
                  </div>
                  <div className="flex items-center gap-2 text-orange-300">
                    <CheckCircle className="h-4 w-4" />
                    {mission.currentProgress}
                  </div>
                  <div className="flex items-center gap-2 text-cyan-300">
                    <AlertCircle className="h-4 w-4" />
                    {mission.successRate}%
                  </div>
                </div>
                <Progress
                  value={(mission.currentProgress / mission.targetCompletion) * 100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">
                    {Math.round(
                      (mission.currentProgress / mission.targetCompletion) * 100
                    )}
                    % Complete
                  </span>
                  <span className="text-muted-foreground">
                    Impact Score: {mission.impactScore}
                  </span>
                </div>
                <div className="flex justify-between">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleVote(mission.id)}
                  >
                    <Vote className="h-4 w-4 mr-2" />
                    Vote
                  </Button>
                  <div className="flex items-center gap-2 text-yellow-300">
                    <TrendingUp className="h-4 w-4" />
                    {mission.votes} Votes
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
