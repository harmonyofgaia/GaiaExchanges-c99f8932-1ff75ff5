import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { MatrixHarmonyBackground } from '@/components/ui/matrix-harmony-background'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { grantAdminAccess } = useSecureAdmin()
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    const { error } = await signIn(email, password)

    if (error) {
      toast.error(`Authentication failed: ${error.message}`)
      setLoading(false)
      return
    }

    // Grant admin access after successful sign-in
    const isAdminGranted = grantAdminAccess()
    if (isAdminGranted) {
      toast.success('Admin access granted!')
      navigate('/admin')
    } else {
      toast.error('Failed to grant admin access.')
    }

    setLoading(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <MatrixHarmonyBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-green-900 opacity-60 z-0" />
      <div className="container relative z-10">
        <Card className="w-full max-w-md bg-black/80 text-white border-green-500/30">
          <CardHeader className="space-y-1 p-6">
            <CardTitle className="text-2xl text-center">
              👑 Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailInputRef}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordInputRef}
                  disabled={loading}
                />
              </div>
              <Button disabled={loading} className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white">
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
