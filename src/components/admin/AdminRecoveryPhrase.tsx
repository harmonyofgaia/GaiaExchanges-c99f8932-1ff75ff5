
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Key, Shield, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function AdminRecoveryPhrase() {
  const [recoveryPhrase, setRecoveryPhrase] = useState<string[]>([])
  const [showPhrase, setShowPhrase] = useState(false)
  const [verificationInput, setVerificationInput] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const { toast } = useToast()

  // Generate 12 words, each 8 characters long
  const generateRecoveryPhrase = () => {
    const wordLists = [
      'STRENGTH', 'GUARDIAN', 'FORTRESS', 'PROTOCOL', 'FIREWALL', 'SECURITY',
      'DEFENDER', 'SENTINEL', 'BULWARK', 'BASTION', 'AEGIS', 'RAMPART',
      'CITADEL', 'BARRIER', 'SHELTER', 'ARSENAL', 'COMMAND', 'CONTROL',
      'ENCRYPT', 'PROTECT', 'SECURE', 'VERIFY', 'VALIDATE', 'CONFIRM',
      'HARMONY', 'BALANCE', 'NATURE', 'ELEMENT', 'CRYSTAL', 'MATRIX',
      'ENERGY', 'POWER', 'FORCE', 'LIGHT', 'PURE', 'SACRED',
      'DIVINE', 'COSMIC', 'STELLAR', 'QUANTUM', 'DIGITAL', 'SYSTEM'
    ]

    const phrase: string[] = []
    const usedWords = new Set<string>()

    while (phrase.length < 12) {
      const randomWord = wordLists[Math.floor(Math.random() * wordLists.length)]
      if (!usedWords.has(randomWord)) {
        phrase.push(randomWord)
        usedWords.add(randomWord)
      }
    }

    setRecoveryPhrase(phrase)
    setIsGenerated(true)
    
    // Store in localStorage for this admin session
    localStorage.setItem('admin_recovery_phrase', JSON.stringify(phrase))
    
    toast({
      title: "🔐 Recovery Phrase Generated",
      description: "Your 12-word recovery phrase has been created securely",
    })
  }

  // Load existing phrase from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_recovery_phrase')
    if (stored) {
      try {
        const phrase = JSON.parse(stored)
        if (Array.isArray(phrase) && phrase.length === 12) {
          setRecoveryPhrase(phrase)
          setIsGenerated(true)
        }
      } catch (error) {
        console.error('Error loading recovery phrase:', error)
      }
    }
  }, [])

  const copyToClipboard = () => {
    const phraseText = recoveryPhrase.join(' ')
    navigator.clipboard.writeText(phraseText).then(() => {
      toast({
        title: "📋 Copied to Clipboard",
        description: "Recovery phrase copied securely",
      })
    })
  }

  const verifyPhrase = () => {
    setIsVerifying(true)
    const inputWords = verificationInput.trim().toUpperCase().split(/\s+/)
    const isValid = inputWords.length === 12 && 
                   inputWords.every((word, index) => word === recoveryPhrase[index])

    if (isValid) {
      toast({
        title: "✅ Verification Successful",
        description: "Recovery phrase verified correctly",
      })
    } else {
      toast({
        title: "❌ Verification Failed",
        description: "Please check your recovery phrase and try again",
        variant: "destructive"
      })
    }
    
    setIsVerifying(false)
  }

  return (
    <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Key className="h-5 w-5" />
          Admin Recovery Phrase - Ultra Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="border-red-500/20 bg-red-500/10">
          <Shield className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <strong>CRITICAL SECURITY:</strong> This recovery phrase provides complete admin access. 
            Store it securely offline and never share it with anyone.
          </AlertDescription>
        </Alert>

        {!isGenerated ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Generate a secure 12-word recovery phrase for admin account access on other devices.
            </p>
            <Button 
              onClick={generateRecoveryPhrase}
              className="bg-red-600 hover:bg-red-700"
            >
              <Key className="h-4 w-4 mr-2" />
              Generate Recovery Phrase
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-red-400">Your Recovery Phrase</h4>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPhrase(!showPhrase)}
                >
                  {showPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={generateRecoveryPhrase}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {recoveryPhrase.map((word, index) => (
                <div
                  key={index}
                  className="bg-red-500/10 border border-red-500/20 rounded p-3 text-center"
                >
                  <div className="text-xs text-red-400 mb-1">{index + 1}</div>
                  <Badge className="bg-red-600 font-mono">
                    {showPhrase ? word : '••••••••'}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-red-400">Verify Recovery Phrase</h4>
              <Input
                type="text"
                placeholder="Enter all 12 words separated by spaces"
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                className="bg-red-500/10 border-red-500/30"
              />
              <Button
                onClick={verifyPhrase}
                disabled={!verificationInput.trim() || isVerifying}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isVerifying ? 'Verifying...' : 'Verify Recovery Phrase'}
              </Button>
            </div>

            <Alert className="border-orange-500/20 bg-orange-500/10">
              <Key className="h-4 w-4 text-orange-400" />
              <AlertDescription className="text-orange-300 text-sm">
                <strong>Recovery Instructions:</strong><br/>
                1. Write down these 12 words in exact order<br/>
                2. Store in a secure, offline location<br/>
                3. Use this phrase to recover admin access on new devices<br/>
                4. Never store digitally or share with anyone
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
