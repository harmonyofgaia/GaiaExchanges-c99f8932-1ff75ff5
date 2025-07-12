
import { Button } from '@/components/ui/button'
import { ArrowRight, Gamepad2, TrendingUp, Music } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CallToAction() {
  const navigate = useNavigate()

  const handleGameClick = () => {
    navigate('/gaia-fighter-game')
  }

  const handleExchangeClick = () => {
    navigate('/exchange')
  }

  const handleArtistClick = () => {
    navigate('/artist-streaming')
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Ready to Join the Green Revolution?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience the future of sustainable finance and entertainment with GAiA's ecosystem
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={handleGameClick}
          >
            <Gamepad2 className="mr-2 h-5 w-5" />
            Play GAiA Fighter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={handleExchangeClick}
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Start Trading
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={handleArtistClick}
          >
            <Music className="mr-2 h-5 w-5" />
            Live Artists
          </Button>
        </div>
      </div>
    </section>
  )
}
