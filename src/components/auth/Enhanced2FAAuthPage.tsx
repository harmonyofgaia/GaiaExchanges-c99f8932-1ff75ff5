import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Leaf, Shield, Globe, Smartphone } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "./AuthProvider";
import { GoogleAuthenticator } from "./GoogleAuthenticator";

export function Enhanced2FAAuthPage() {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message || "Failed to sign in");
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setUserEmail(email);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message || "Failed to sign up");
    } else {
      setSuccess(
        "Account created successfully! Please set up 2FA for maximum security.",
      );
      setShow2FASetup(true);
    }

    setIsLoading(false);
  };

  const handle2FASetupComplete = () => {
    setShow2FASetup(false);
    setSuccess(
      "🔐 Account created with maximum security! Please check your email to verify your account.",
    );
  };

  if (show2FASetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-4">
        <GoogleAuthenticator
          onSetupComplete={handle2FASetupComplete}
          onVerificationSuccess={handle2FASetupComplete}
          userEmail={userEmail}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold text-green-400">Gaia's World</h1>
          </div>
          <p className="text-muted-foreground">
            Join the ultimate gaming ecosystem with maximum security protection
          </p>
        </div>

        {/* Security Features Showcase */}
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-blue-400 mb-3 text-center">
              🛡️ Ultra-Secure Gaming Platform
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Google Authenticator 2FA Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>Real-time IP Tracking & Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-purple-400" />
                <span>Advanced Security Verification</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auth Card */}
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="text-center">
              Welcome to Gaia's Gaming World
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one with maximum security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Your password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In Securely"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullname">Full Name</Label>
                    <Input
                      id="signup-fullname"
                      name="fullName"
                      type="text"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Creating Account..."
                      : "Create Secure Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {error && (
              <Alert className="mt-4 border-red-500/20 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4 border-green-500/20 bg-green-500/10">
                <Shield className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-400">
                  {success}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="space-y-3 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span>
              Military-grade security with environmental impact tracking
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Globe className="h-4 w-4 text-blue-400" />
            <span>Connect with the global Gaia gaming community</span>
          </div>
        </div>
      </div>
    </div>
  );
}
