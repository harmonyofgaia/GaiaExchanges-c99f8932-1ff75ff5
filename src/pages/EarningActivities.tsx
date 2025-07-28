
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { Coins, Leaf, Recycle, TreePine, Zap, Water, Heart, Users } from "lucide-react"

const EarningActivities = () => {
  const activities = [
    {
      id: 1,
      title: "Plant a Tree",
      description: "Plant trees in your local community",
      reward: "50 GAiA",
      icon: TreePine,
      progress: 75,
      category: "Environmental",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Recycle Materials",
      description: "Properly sort and recycle waste materials",
      reward: "25 GAiA",
      icon: Recycle,
      progress: 100,
      category: "Sustainability",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Solar Panel Installation",
      description: "Install solar panels for renewable energy",
      reward: "200 GAiA",
      icon: Zap,
      progress: 30,
      category: "Energy",
      difficulty: "Hard"
    },
    {
      id: 4,
      title: "Water Conservation",
      description: "Implement water-saving measures",
      reward: "75 GAiA",
      icon: Water,
      progress: 60,
      category: "Conservation",
      difficulty: "Medium"
    },
    {
      id: 5,
      title: "Community Garden",
      description: "Start or maintain a community garden",
      reward: "100 GAiA",
      icon: Leaf,
      progress: 45,
      category: "Community",
      difficulty: "Medium"
    },
    {
      id: 6,
      title: "Eco Education Workshop",
      description: "Organize environmental awareness workshops",
      reward: "150 GAiA",
      icon: Users,
      progress: 0,
      category: "Education",
      difficulty: "Hard"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500"
      case "Medium": return "bg-yellow-500"
      case "Hard": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Earning Activities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete eco-friendly activities to earn GAiA tokens and contribute to a sustainable future
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Coins className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">1,247</div>
                    <div className="text-sm text-gray-600">Total GAiA Earned</div>
                  </div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-8 h-8 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">42</div>
                    <div className="text-sm text-gray-600">Activities Completed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <Card key={activity.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-8 h-8 text-green-600" />
                    <Badge className={`${getDifficultyColor(activity.difficulty)} text-white`}>
                      {activity.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-800">{activity.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-800">{activity.progress}%</span>
                    </div>
                    <Progress value={activity.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {activity.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">{activity.reward}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={activity.progress === 100}
                    >
                      {activity.progress === 100 ? "Completed" : "Start Activity"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of eco-warriors earning GAiA tokens while protecting our planet
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                View All Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EarningActivities
