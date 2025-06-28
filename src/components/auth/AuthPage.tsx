
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from './AuthProvider'
import { AdminSetup } from '@/components/admin/AdminSetup'
import { AuthHeader } from './AuthHeader'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'
import { AuthFeatures } from './AuthFeatures'
import { AuthAlerts } from './AuthAlerts'

export function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    }
    
    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string

    const { error } = await signUp(email, password, {
      full_name: fullName,
      username: username
    })
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Account created successfully! Please check your email to verify your account.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <AuthHeader />

        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="text-center">Welcome to Gaia's Exchanges</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="admin">Admin Access</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4 mt-6">
                <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <AdminSetup />
              </TabsContent>
            </Tabs>

            <AuthAlerts error={error} success={success} />
          </CardContent>
        </Card>

        <AuthFeatures />
      </div>
    </div>
  )
}
