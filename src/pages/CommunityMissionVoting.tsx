import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TreePine,
  Droplets,
  Wind,
  Recycle,
  Target,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Filter,
  Search,
  Calendar,
  MapPin,
  Zap,
  Shield,
  Globe
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Navbar from '@/components/Navbar'

export default function CommunityMissionVoting() {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: "Urban Tree Planting",
      description: "Help plant trees in urban areas to improve air quality",
      type: "Tree Planting",
      dueDate: "2024-08-15",
      votes: 125,
      status: "open"
    },
    {
      id: 2,
      title: "Beach Cleanup",
      description: "Organize a beach cleanup event to remove plastic waste",
      type: "Cleanup",
      dueDate: "2024-07-22",
      votes: 98,
      status: "closed"
    },
    {
      id: 3,
      title: "Recycling Campaign",
      description: "Promote recycling in your community",
      type: "Recycling",
      dueDate: "2024-09-01",
      votes: 156,
      status: "open"
    }
  ])

  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("votes")

  const filteredMissions = missions.filter(mission => {
    if (filter === "open") {
      return mission.status === "open"
    }
    if (filter === "closed") {
      return mission.status === "closed"
    }
    return true
  }).filter(mission => {
    return mission.title.toLowerCase().includes(search.toLowerCase()) ||
           mission.description.toLowerCase().includes(search.toLowerCase())
  })

  const sortedMissions = [...filteredMissions].sort((a, b) => {
    if (sort === "votes") {
      return b.votes - a.votes
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🗳️ Community Mission Voting
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Vote for community-led environmental missions
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input 
            type="text" 
            placeholder="Search missions..." 
            className="flex-grow"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Votes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMissions.map(mission => (
            <Card key={mission.id} className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-green-400" />
                  {mission.title}
                </CardTitle>
                <Badge className={mission.status === "open" ? "bg-green-600" : "bg-red-600"}>
                  {mission.status === "open" ? "Open" : "Closed"}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mission.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-white font-bold">{mission.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date</span>
                    <span className="text-orange-400 font-bold">{mission.dueDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Votes</span>
                    <span className="text-purple-400 font-bold">{mission.votes}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Vote className="h-4 w-4 mr-2" />
                  Vote for Mission
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
