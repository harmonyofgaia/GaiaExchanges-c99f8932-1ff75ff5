
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
  Star
} from 'lucide-react'

export const FeatureGrid = () => {
  const features = [
    {
      icon: Flame,
      title: 'Dragon Protected',
      description: 'Quantum-level security with mythical dragon power protecting every transaction and user interaction.',
      gradient: 'from-red-600 via-orange-500 to-yellow-500',
      bgGradient: 'from-red-900/20 to-orange-900/20',
      borderColor: 'border-red-500/50',
      iconColor: 'text-red-400',
      glowColor: 'shadow-red-500/25'
    },
    {
      icon: Shield,
      title: 'Quantum Secure',
      description: 'Military-grade encryption with quantum computing protection against all future threats.',
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-900/20 to-cyan-900/20',
      borderColor: 'border-blue-500/50',
      iconColor: 'text-blue-400',
      glowColor: 'shadow-blue-500/25'
    },
    {
      icon: Crown,
      title: 'Forever Invincible',
      description: 'Completely invincible defense system - 100x stronger than any technology that will ever be created.',
      gradient: 'from-purple-600 via-pink-500 to-rose-500',
      bgGradient: 'from-purple-900/20 to-pink-900/20',
      borderColor: 'border-purple-500/50',
      iconColor: 'text-purple-400',
      glowColor: 'shadow-purple-500/25'
    },
    {
      icon: Users,
      title: 'Culture of Harmony',
      description: 'Building the most harmonious and united global community in cryptocurrency history.',
      gradient: 'from-green-600 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-900/20 to-emerald-900/20',
      borderColor: 'border-green-500/50',
      iconColor: 'text-green-400', 
      glowColor: 'shadow-green-500/25'
    },
    {
      icon: Eye,
      title: 'Gaia\'s Exchange Platform',
      description: 'Revolutionary trading platform with the most advanced security and user experience in the world.',
      gradient: 'from-yellow-600 via-amber-500 to-orange-500',
      bgGradient: 'from-yellow-900/20 to-amber-900/20',
      borderColor: 'border-yellow-500/50',
      iconColor: 'text-yellow-400',
      glowColor: 'shadow-yellow-500/25'
    },
    {
      icon: Sparkles,
      title: 'Quantum Defense Matrix',
      description: 'Advanced AI-powered defense system that evolves and adapts to neutralize any threat instantly.',
      gradient: 'from-indigo-600 via-violet-500 to-purple-500',
      bgGradient: 'from-indigo-900/20 to-violet-900/20',
      borderColor: 'border-indigo-500/50',
      iconColor: 'text-indigo-400',
      glowColor: 'shadow-indigo-500/25'
    }
  ]

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
          🚀 REVOLUTIONARY FEATURES - WORLD'S MOST ADVANCED PLATFORM
        </h2>
        <p className="text-xl text-muted-foreground">
          Powered by Culture of Harmony • Dragon-Level Security • Quantum Technology
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="relative group h-full">
              {/* Animated graffiti background */}
              <div 
                className="absolute inset-0 rounded-lg opacity-30 blur-sm graffiti-bg"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: `${8 + index}s`
                }}
              />
              
              {/* Fading animated overlay */}
              <div 
                className="absolute inset-0 rounded-lg fade-sweep-bg"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: `${10 + index * 2}s`
                }}
              />
              
              <Card 
                className={`
                  h-full relative z-10 transition-all duration-500 hover:scale-105 
                  bg-gradient-to-br ${feature.bgGradient} 
                  border-2 ${feature.borderColor} 
                  shadow-xl ${feature.glowColor}
                  backdrop-blur-sm
                  transform-gpu
                  hover:shadow-2xl hover:${feature.glowColor.replace('25', '50')}
                `}
                style={{
                  minHeight: '280px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Graffiti texture overlay */}
                <div 
                  className="absolute inset-0 opacity-10 graffiti-texture"
                />
                
                <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
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
                      ACTIVE
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
