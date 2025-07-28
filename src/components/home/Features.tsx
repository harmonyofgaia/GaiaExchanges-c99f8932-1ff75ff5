
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Crown, 
  Flame,
  Eye,
  Lock,
  Sparkles,
  Star,
  Gamepad2,
  Music,
  TrendingUp
} from 'lucide-react'

export const Features = () => {
  const additionalFeatures = [
    {
      icon: Gamepad2,
      title: 'GAiA Fighter Game',
      description: 'Revolutionary blockchain gaming experience with dragon-powered battles and eternal rewards.',
      gradient: 'from-indigo-600 via-purple-500 to-pink-500',
      bgGradient: 'from-indigo-900/20 to-purple-900/20',
      borderColor: 'border-indigo-500/50',
      iconColor: 'text-indigo-400',
      glowColor: 'shadow-indigo-500/25'
    },
    {
      icon: Music,
      title: 'Artist Streaming Platform',
      description: 'Exclusive music streaming platform where artists earn GAiA tokens directly from their fans.',
      gradient: 'from-pink-600 via-rose-500 to-orange-500',
      bgGradient: 'from-pink-900/20 to-orange-900/20',
      borderColor: 'border-pink-500/50',
      iconColor: 'text-pink-400',
      glowColor: 'shadow-pink-500/25'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Trading Suite',
      description: 'Professional trading platform with quantum-level analytics and dragon-protected transactions.',
      gradient: 'from-cyan-600 via-blue-500 to-indigo-500',
      bgGradient: 'from-cyan-900/20 to-blue-900/20',
      borderColor: 'border-cyan-500/50',
      iconColor: 'text-cyan-400',
      glowColor: 'shadow-cyan-500/25'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-green-900/10 to-blue-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
            🌟 REVOLUTIONARY ECOSYSTEM FEATURES
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the most advanced blockchain platform ever created
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index}
                className={`
                  h-full transition-all duration-500 hover:scale-105 
                  bg-gradient-to-br ${feature.bgGradient} 
                  border-2 ${feature.borderColor} 
                  shadow-xl ${feature.glowColor}
                  backdrop-blur-sm
                `}
              >
                <CardContent className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${feature.gradient} shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-center mb-3 text-white">
                      {feature.title}
                    </h3>
                    
                    <p className="text-center text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Badge 
                      className={`bg-gradient-to-r ${feature.gradient} text-white px-4 py-1 animate-pulse border-0`}
                    >
                      <Star className="h-3 w-3 mr-1" />
                      COMING SOON
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
