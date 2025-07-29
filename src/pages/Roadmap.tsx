
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Circle, Clock } from 'lucide-react'

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "completed",
      timeline: "Q1 2024",
      items: [
        "Platform architecture design",
        "Core smart contracts development",
        "Initial community building",
        "Token generation event"
      ]
    },
    {
      phase: "Phase 2", 
      title: "Growth",
      status: "current",
      timeline: "Q2-Q3 2024",
      items: [
        "Video exchange platform launch",
        "Earning activities implementation", 
        "Mobile app development",
        "Partnership program"
      ]
    },
    {
      phase: "Phase 3",
      title: "Expansion",
      status: "upcoming",
      timeline: "Q4 2024",
      items: [
        "Advanced gaming features",
        "NFT marketplace integration",
        "Cross-chain compatibility",
        "Global community events"
      ]
    },
    {
      phase: "Phase 4",
      title: "Evolution",
      status: "future",
      timeline: "2025+",
      items: [
        "AI-powered content creation",
        "Metaverse integration",
        "Decentralized governance",
        "Ecosystem sustainability"
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-400" />
      case 'current':
        return <Clock className="h-6 w-6 text-blue-400" />
      default:
        return <Circle className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/40'
      case 'current':
        return 'border-blue-500/40'
      default:
        return 'border-gray-500/20'
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Roadmap
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our journey to build the ultimate creative ecosystem and community platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roadmapItems.map((item, index) => (
          <Card key={index} className={`bg-black/40 backdrop-blur-sm ${getStatusColor(item.status)} hover:border-green-400/40 transition-all duration-300`}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">{item.phase}</span>
                {getStatusIcon(item.status)}
              </div>
              <CardTitle className="text-white">{item.title}</CardTitle>
              <CardDescription className="text-green-400 font-semibold">
                {item.timeline}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {item.items.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">{task}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="bg-black/40 backdrop-blur-sm border-green-500/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-green-400">Vision Statement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">
              "We are building more than just a platform - we're creating a movement. 
              A space where creativity meets technology, where communities thrive, 
              and where every soul finds their place to shine. True life, true smiles, 
              true connections."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
