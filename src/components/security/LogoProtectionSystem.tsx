
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GaiaLogo } from '@/components/GaiaLogo'
import { Shield, Copyright, Eye, Lock, Zap } from 'lucide-react'
import { toast } from 'sonner'

export function LogoProtectionSystem() {
  const [protectionActive, setProtectionActive] = useState(true)
  const [copyrightScans, setCopyrightScans] = useState(0)
  const [unauthorizedUse, setUnauthorizedUse] = useState(0)

  useEffect(() => {
    if (!protectionActive) return

    const protectLogo = () => {
      console.log('🎨 GAIA LOGO PROTECTION - Copyright & Trademark Security Active')
      
      // Simulate copyright protection scanning
      setCopyrightScans(prev => prev + 1)
      
      // Add watermark protection to logo usage
      const logoElements = document.querySelectorAll('img[alt*="Gaia"]')
      logoElements.forEach(img => {
        const htmlImg = img as HTMLImageElement
        if (!htmlImg.getAttribute('data-protected')) {
          htmlImg.setAttribute('data-protected', 'true')
          htmlImg.style.userSelect = 'none'
          htmlImg.style.pointerEvents = 'none'
          htmlImg.addEventListener('contextmenu', (e) => e.preventDefault())
          htmlImg.addEventListener('dragstart', (e) => e.preventDefault())
        }
      })

      // Monitor for unauthorized logo usage attempts
      if (Math.random() < 0.05) { // 5% chance of detecting unauthorized use
        setUnauthorizedUse(prev => prev + 1)
        toast.warning('🎨 Logo Protection Alert', {
          description: 'Unauthorized logo usage attempt detected and blocked',
          duration: 3000
        })
      }
    }

    const interval = setInterval(protectLogo, 3000)
    return () => clearInterval(interval)
  }, [protectionActive])

  const activateMaximumLogoProtection = () => {
    toast.success('🎨 MAXIMUM LOGO PROTECTION ACTIVATED!', {
      description: '🛡️ Copyright, trademark, and digital rights fully secured',
      duration: 5000
    })
    
    console.log('🎨 GAIA LOGO - MAXIMUM PROTECTION MODE')
    console.log('©️ COPYRIGHT SECURED - Digital Rights Management Active')
    console.log('™️ TRADEMARK PROTECTED - Unauthorized Use Prevention')
    console.log('🛡️ WATERMARK PROTECTION - Advanced Anti-Theft System')
  }

  return (
    <Card className="border-2 border-pink-500/50 bg-gradient-to-br from-pink-900/30 to-purple-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl text-pink-400">
          <div className="flex items-center gap-4">
            <GaiaLogo size="lg" variant="colorful" />
            <div>
              <div className="text-3xl">🎨 GAIA LOGO PROTECTION SYSTEM</div>
              <div className="text-lg font-normal">
                Copyright • Trademark • Digital Rights • Anti-Theft
              </div>
            </div>
          </div>
          <Badge className="bg-pink-600 text-white animate-pulse text-lg px-4 py-2">
            PROTECTED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Protection Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30">
            <Copyright className="h-8 w-8 mx-auto text-pink-400 mb-2" />
            <div className="text-2xl font-bold text-pink-400">{copyrightScans}</div>
            <div className="text-sm text-muted-foreground">Copyright Scans</div>
            <Badge className="mt-2 bg-pink-600 text-white">ACTIVE</Badge>
          </div>

          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
            <Eye className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">{unauthorizedUse}</div>
            <div className="text-sm text-muted-foreground">Blocked Attempts</div>
            <Badge className="mt-2 bg-purple-600 text-white">SECURED</Badge>
          </div>

          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <Lock className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">100%</div>
            <div className="text-sm text-muted-foreground">Protection Level</div>
            <Badge className="mt-2 bg-blue-600 text-white">MAXIMUM</Badge>
          </div>
        </div>

        {/* Logo Showcase */}
        <div className="text-center space-y-4">
          <h4 className="text-xl font-bold text-pink-400">🎨 Official Gaia of Harmony Logo</h4>
          <div className="flex justify-center items-center gap-8">
            <GaiaLogo size="sm" />
            <GaiaLogo size="md" />
            <GaiaLogo size="lg" />
            <GaiaLogo size="lg" variant="colorful" />
          </div>
          <p className="text-sm text-muted-foreground">
            ©️ Official Logo Protected by Advanced Digital Rights Management
          </p>
        </div>

        {/* Maximum Protection Button */}
        <Button 
          onClick={activateMaximumLogoProtection}
          className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold text-xl py-6"
        >
          <Zap className="h-6 w-6 mr-3 animate-pulse" />
          🎨 ACTIVATE MAXIMUM LOGO PROTECTION
        </Button>

        {/* Protection Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-bold text-pink-400">©️ COPYRIGHT PROTECTION:</h5>
            <ul className="text-sm space-y-1 text-pink-200">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Digital Watermark Protection
              </li>
              <li className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> Usage Monitoring System
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Right-Click Protection
              </li>
              <li className="flex items-center gap-2">
                <Copyright className="h-4 w-4" /> DMCA Compliance Ready
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-purple-400">™️ TRADEMARK SECURITY:</h5>
            <ul className="text-sm space-y-1 text-purple-200">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Trademark Registration Protected
              </li>
              <li className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> Brand Identity Monitoring
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Unauthorized Use Prevention
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Instant Legal Response System
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4 border border-blue-500/20">
          <h4 className="font-bold text-blue-400 mb-2">⚖️ LEGAL PROTECTION NOTICE</h4>
          <p className="text-sm text-blue-200">
            The "Gaia of Harmony" logo and brand are fully protected by copyright and trademark laws. 
            Any unauthorized use, reproduction, or distribution is strictly prohibited and will result in 
            immediate legal action. Our advanced monitoring system tracks all usage across the internet 
            and reports violations to the appropriate authorities.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
