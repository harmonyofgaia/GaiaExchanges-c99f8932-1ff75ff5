
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">GAiA</h3>
            <p className="text-sm text-muted-foreground">
              Building the future of sustainable blockchain technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/games" className="text-muted-foreground hover:text-primary">Games</Link></li>
              <li><Link to="/trading" className="text-muted-foreground hover:text-primary">Trading</Link></li>
              <li><Link to="/staking" className="text-muted-foreground hover:text-primary">Staking</Link></li>
              <li><Link to="/vault" className="text-muted-foreground hover:text-primary">Vault</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/community" className="text-muted-foreground hover:text-primary">Community</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-primary">Events</Link></li>
              <li><Link to="/tournaments" className="text-muted-foreground hover:text-primary">Tournaments</Link></li>
              <li><Link to="/governance" className="text-muted-foreground hover:text-primary">Governance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs" className="text-muted-foreground hover:text-primary">Documentation</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-primary">Support</Link></li>
              <li><Link to="/partnerships" className="text-muted-foreground hover:text-primary">Partnerships</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 GAiA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
