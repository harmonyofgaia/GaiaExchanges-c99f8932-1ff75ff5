
import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { CallToAction } from '@/components/home/CallToAction'
import { BackgroundChanger } from '@/components/BackgroundChanger'
import { useGlobalBackground } from '@/hooks/useGlobalBackground'

const Index = () => {
  const { backgroundStyle } = useGlobalBackground()

  const getBackgroundClasses = () => {
    switch (backgroundStyle) {
      case 'plasma':
        return 'bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20'
      case 'galaxy':
        return 'bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30'
      case 'forest':
        return 'bg-gradient-to-br from-green-900/20 to-emerald-900/20'
      case 'ocean':
        return 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20'
      case 'fire':
        return 'bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20'
      case 'ice':
        return 'bg-gradient-to-br from-cyan-200/10 to-blue-200/10'
      case 'void':
        return 'bg-gradient-to-br from-gray-900/30 to-black/30'
      case 'rainbow':
        return 'bg-gradient-to-br from-red-500/10 via-yellow-500/10 via-green-500/10 via-blue-500/10 to-purple-500/10'
      case 'matrix':
        return 'bg-gradient-to-br from-green-900/20 to-black/20'
      default:
        return 'bg-gradient-to-br from-blue-900/20 to-purple-900/20'
    }
  }

  return (
    <div className={`min-h-screen ${getBackgroundClasses()}`}>
      <Hero />
      
      {/* Background Changer Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <BackgroundChanger />
        </div>
      </section>
      
      <Features />
      <CallToAction />
    </div>
  )
}

export default Index
