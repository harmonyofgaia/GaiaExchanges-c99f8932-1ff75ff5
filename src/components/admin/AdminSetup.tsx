
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Crown } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useToast } from '@/hooks/use-toast'

export function AdminSetup() {
  const { signUp, grantAdminRole } = useAuth()
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)
  const [success, setSuccess] = useState(false)

  const createAdminAccount = async () => {
    setIsCreating(true)
    
    try {
      // Create the admin account
      const { error: signUpError } = await signUp(
        'info@cultureofharmony.net',
        'Synatic!oul1992',
        {
          full_name: 'Culture of Harmony Admin',
          username: 'admin'
        }
      )

      if (signUpError) {
        console.error('Sign up error:', signUpError)
        toast({
          title: "Account Creation",
          description: signUpError.message || "Account already exists or created successfully",
          variant: signUpError.message?.includes('already') ? "default" : "destructive"
        })
      }

      // Grant admin role regardless of signup result (account might already exist)
      const { error: roleError } = await grantAdminRole('info@cultureofharmony.net')
      
      if (roleError) {
        console.error('Role assignment error:', roleError)
        toast({
          title: "Role Assignment Failed",
          description: roleError.message,
          variant: "destructive"
        })
      } else {
        setSuccess(true)
        toast({
          title: "Admin Account Ready",
          description: "Admin role has been assigned to info@cultureofharmony.net",
        })
      }
      
    } catch (error) {
      console.error('Error creating admin account:', error)
      toast({
        title: "Error",
        description: "Failed to create admin account",
        variant: "destructive"
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto border-purple-500/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-purple-400">
          <Crown className="h-6 w-6" />
          Admin Account Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-purple-500/20 bg-purple-500/10">
          <Shield className="h-4 w-4 text-purple-400" />
          <AlertDescription className="text-purple-300">
            This will create an admin account with full system privileges
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label>Admin Email</Label>
          <Input 
            value="info@cultureofharmony.net" 
            disabled 
            className="bg-muted/50"
          />
        </div>

        <div className="space-y-2">
          <Label>Admin Password</Label>
          <Input 
            type="password"
            value="Synatic!oul1992" 
            disabled 
            className="bg-muted/50"
          />
        </div>

        {success ? (
          <Alert className="border-green-500/20 bg-green-500/10">
            <Shield className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">
              ✅ Admin account is ready! You can now sign in with full privileges.
            </AlertDescription>
          </Alert>
        ) : (
          <Button 
            onClick={createAdminAccount}
            disabled={isCreating}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isCreating ? 'Setting up Admin Account...' : 'Create Admin Account'}
          </Button>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Full access to all system functions</p>
          <p>• Ability to manage all users and data</p>
          <p>• Enhanced security privileges</p>
          <p>• Transaction reversal capabilities</p>
        </div>
      </CardContent>
    </Card>
  )
}
