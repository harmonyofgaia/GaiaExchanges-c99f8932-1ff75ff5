
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Waves, Fish, Anchor, AlertTriangle, Heart } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export default function SandProtect() {
  const [stats, setStats] = useState({
    protectedAreas: 12,
    marineLifeSaved: 847,
    volunteersActive: 156,
    fundingRaised: 28500
  })

  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        protectedAreas: prev.protectedAreas + Math.floor(Math.random() * 2),
        marineLifeSaved: prev.marineLifeSaved + Math.floor(Math.random() * 10),
        volunteersActive: prev.volunteersActive + Math.floor(Math.random() * 3),
        fundingRaised: prev.fundingRaised + Math.floor(Math.random() * 100)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sections = [
    {
      title: "🏖️ Beach Sand Protection",
      content: "Protecting coastal ecosystems and preventing sand erosion"
    },
    {
      title: "🌊 Marine Conservation",
      content: "Safeguarding marine life and coral reef systems"
    },
    {
      title: "🐠 Wildlife Protection",
      content: "Preserving endangered species and their habitats"
    },
    {
      title: "🔬 Research & Monitoring",
      content: "Scientific research and environmental monitoring"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block animate-bounce mb-4">
            <Shield className="h-16 w-16 text-blue-400 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-4">
            SandProtect Initiative
          </h1>
          <p className="text-xl text-blue-300/90 max-w-2xl mx-auto">
            Protecting our coastal ecosystems and marine environments for future generations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                <AnimatedCounter value={stats.protectedAreas} />
              </div>
              <div className="text-sm text-blue-300/80">Protected Areas</div>
            </CardContent>
          </Card>

          <Card className="bg-teal-900/20 border-teal-500/30">
            <CardContent className="p-6 text-center">
              <Fish className="h-8 w-8 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-teal-400">
                <AnimatedCounter value={stats.marineLifeSaved} />
              </div>
              <div className="text-sm text-teal-300/80">Marine Life Saved</div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/20 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                <AnimatedCounter value={stats.volunteersActive} />
              </div>
              <div className="text-sm text-green-300/80">Active Volunteers</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Anchor className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                $<AnimatedCounter value={stats.fundingRaised} />
              </div>
              <div className="text-sm text-purple-300/80">Funding Raised</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                currentSection === index ? 'opacity-100 transform-none' : 'opacity-70'
              }`}
            >
              <Card className="border-blue-500/30 bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-2xl">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-300/90 text-lg mb-6">
                    {section.content}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-2">Current Project</h4>
                      <p className="text-sm text-blue-300/80">
                        Beach restoration at Marine Park - 67% complete
                      </p>
                      <Progress value={67} className="mt-2" />
                    </div>
                    <div className="bg-teal-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-teal-400 mb-2">Impact</h4>
                      <p className="text-sm text-teal-300/80">
                        2.5 km of coastline protected this month
                      </p>
                    </div>
                    <div className="bg-green-800/30 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400 mb-2">Next Steps</h4>
                      <p className="text-sm text-green-300/80">
                        Expand to 3 additional coastal regions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Waves className="h-5 w-5 mr-2" />
            Join Protection Efforts
          </Button>
          <Button variant="outline" className="border-blue-400 text-blue-400">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Environmental Issue
          </Button>
        </div>
      </div>
    </div>
  )
}
