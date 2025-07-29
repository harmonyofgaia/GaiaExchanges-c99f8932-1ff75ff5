
import { UniversalGaiaLogo } from './branding/UniversalGaiaLogo'

export function Footer() {
  return (
    <footer className="relative z-10 bg-black/90 backdrop-blur-md border-t border-green-500/20 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <UniversalGaiaLogo size="sm" />
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2024 Universal Gaia. Building the future of creative ecosystems.
            </p>
            <p className="text-green-400 text-xs mt-1">
              "Doesn't matter if you're Black or White" - True Souls, True Life, True Smiles
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
