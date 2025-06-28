
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Monitor, 
  Smartphone, 
  Laptop, 
  Shield, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Headphones,
  Zap,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Wrench,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

const TechnoSoulSolutions = () => {
  const [supportStats, setSupportStats] = useState({
    ticketsResolved: 1847,
    fundsRecovered: 250000,
    responseTime: 15,
    satisfactionRate: 98.7,
    onlineAgents: 12
  })

  const [activeTickets] = useState([
    { id: 1, title: 'Wallet Recovery - Lost Private Key', status: 'In Progress', priority: 'High', amount: '$15,000' },
    { id: 2, title: 'Transaction Stuck - Network Issues', status: 'Investigating', priority: 'Medium', amount: '$3,500' },
    { id: 3, title: 'Exchange Account Locked', status: 'Resolved', priority: 'High', amount: '$25,000' },
    { id: 4, title: 'Smart Contract Bug Fix', status: 'In Progress', priority: 'Critical', amount: '$50,000' }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSupportStats(prev => ({
        ...prev,
        ticketsResolved: prev.ticketsResolved + Math.floor(Math.random() * 3),
        fundsRecovered: prev.fundsRecovered + Math.floor(Math.random() * 1000),
        onlineAgents: 10 + Math.floor(Math.random() * 8)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const submitTicket = () => {
    toast.success('🎯 Support Ticket Submitted!', {
      description: 'Our Techno Soul Solutions team will contact you within 15 minutes!',
      duration: 5000
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ultra-Advanced Electronic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
            {/* Circuit Lines */}
            {[...Array(50)].map((_, i) => (
              <g key={i}>
                <line 
                  x1={Math.random() * 1000} 
                  y1={Math.random() * 1000} 
                  x2={Math.random() * 1000} 
                  y2={Math.random() * 1000} 
                  stroke="url(#circuit-gradient)" 
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
                <circle 
                  cx={Math.random() * 1000} 
                  cy={Math.random() * 1000} 
                  r="4" 
                  fill="#00ff88" 
                  className="animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </g>
            ))}
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff88" />
                <stop offset="50%" stopColor="#0088ff" />
                <stop offset="100%" stopColor="#8800ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Electronic Devices */}
        {[...Array(15)].map((_, i) => {
          const devices = [Monitor, Smartphone, Laptop, Cpu, HardDrive, Wifi]
          const Device = devices[i % devices.length]
          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              <Device 
                className={`h-${6 + Math.floor(Math.random() * 8)} w-${6 + Math.floor(Math.random() * 8)} text-cyan-400 opacity-${30 + Math.floor(Math.random() * 40)} animate-pulse`}
                style={{ filter: 'drop-shadow(0 0 10px currentColor)' }}
              />
            </div>
          )
        })}

        {/* Central Support Agent Illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Computer Setup */}
            <div className="relative z-10 p-8 bg-gradient-to-br from-gray-800/50 to-blue-900/50 rounded-xl border border-cyan-500/30 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Monitor className="h-16 w-16 text-cyan-400 animate-pulse" />
                <Laptop className="h-16 w-16 text-blue-400 animate-bounce" />
                <Smartphone className="h-16 w-16 text-purple-400 animate-ping" />
              </div>
              
              {/* Agent Avatar */}
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse">
                  <Headphones className="h-10 w-10 text-white" />
                </div>
                <div className="text-cyan-400 font-bold">TECHNO SOUL AGENT</div>
                <div className="text-xs text-muted-foreground">Solving Problems 24/7</div>
              </div>

              {/* Working Animation */}
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded animate-pulse"
                    style={{ 
                      width: `${50 + Math.random() * 50}%`,
                      animationDelay: `${i * 0.2}s` 
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Surrounding Tech Elements */}
            <div className="absolute -inset-20">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-orbit"
                  style={{
                    '--orbit-radius': `${120 + i * 20}px`,
                    '--orbit-duration': `${10 + i * 2}s`,
                    '--orbit-delay': `${i * 0.5}s`
                  } as any}
                >
                  <Cpu className="h-6 w-6 text-green-400 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logo Decorations */}
        <div className="absolute top-10 left-10">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-20 h-20 object-contain opacity-20 animate-pulse"
          />
        </div>
        <div className="absolute top-10 right-10">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-20 h-20 object-contain opacity-20 animate-pulse"
          />
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <img 
            src="/lovable-uploads/78f81378-5535-4da5-bb6c-28f9a9866f3e.png" 
            alt="Gaia Logo"
            className="w-24 h-24 object-contain opacity-10 animate-bounce"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            ⚡ TECHNO SOUL SOLUTIONS
          </h1>
          <p className="text-2xl text-white mb-2">
            🛡️ Ultimate Security & Lost Funds Recovery Specialists
          </p>
          <p className="text-lg text-cyan-300">
            Our Dev Team ensures the highest security while recovering your lost funds
          </p>
        </div>

        {/* Live Support Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
            <CardContent className="pt-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{supportStats.ticketsResolved}</div>
              <div className="text-xs text-green-300">Tickets Resolved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
            <CardContent className="pt-4 text-center">
              <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">${supportStats.fundsRecovered.toLocaleString()}</div>
              <div className="text-xs text-yellow-300">Funds Recovered</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
            <CardContent className="pt-4 text-center">
              <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{supportStats.responseTime}m</div>
              <div className="text-xs text-blue-300">Avg Response</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
            <CardContent className="pt-4 text-center">
              <Star className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{supportStats.satisfactionRate}%</div>
              <div className="text-xs text-purple-300">Satisfaction</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50">
            <CardContent className="pt-4 text-center">
              <Headphones className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{supportStats.onlineAgents}</div>
              <div className="text-xs text-cyan-300">Agents Online</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Support Tickets */}
        <Card className="bg-gradient-to-br from-gray-900/30 to-blue-900/30 border-2 border-blue-500/50 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              🎯 Live Support Dashboard - Real-Time Problem Solving
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 bg-gradient-to-r from-gray-800/50 to-blue-800/50 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{ticket.title}</h4>
                    <div className="flex gap-2">
                      <Badge className={`${
                        ticket.priority === 'Critical' ? 'bg-red-600' :
                        ticket.priority === 'High' ? 'bg-orange-600' :
                        ticket.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                      } text-white`}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={`${
                        ticket.status === 'Resolved' ? 'bg-green-600' :
                        ticket.status === 'In Progress' ? 'bg-blue-600' : 'bg-yellow-600'
                      } text-white`}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Recovery Amount:</span>
                    <span className="text-green-400 font-bold">{ticket.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Services */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              🛡️ Our Techno Soul Solutions Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-lg border border-green-500/30">
                <DollarSign className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Lost Funds Recovery</h3>
                <p className="text-sm text-muted-foreground">Professional recovery of lost cryptocurrency and digital assets</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/30">
                <Shield className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-blue-400 mb-2">Security Audits</h3>
                <p className="text-sm text-muted-foreground">Comprehensive security analysis and vulnerability assessment</p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/30">
                <Wrench className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-400 mb-2">Technical Support</h3>
                <p className="text-sm text-muted-foreground">24/7 technical assistance for all blockchain-related issues</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={submitTicket}
                className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg"
              >
                <Zap className="h-6 w-6 mr-2" />
                🎯 SUBMIT SUPPORT TICKET - GET INSTANT HELP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit var(--orbit-duration) linear infinite;
          animation-delay: var(--orbit-delay);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes orbit {
          0% { 
            transform: rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); 
          }
          100% { 
            transform: rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); 
          }
        }
      `}</style>
    </div>
  )
}

export default TechnoSoulSolutions
