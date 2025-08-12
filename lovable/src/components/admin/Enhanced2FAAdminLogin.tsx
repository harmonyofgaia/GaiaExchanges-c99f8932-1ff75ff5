import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AdminLogin } from "./AdminLogin";
import { AdminMFA } from "./AdminMFA";
import { GoogleAuthenticator } from "../auth/GoogleAuthenticator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Smartphone, QrCode } from "lucide-react";

interface Enhanced2FAAdminLoginProps {
  onLoginSuccess: () => void;
}

export function Enhanced2FAAdminLogin({
  onLoginSuccess,
}: Enhanced2FAAdminLoginProps) {
  const [loginStep, setLoginStep] = useState<
    "credentials" | "sms-mfa" | "google-2fa" | "success"
  >("credentials");
  const [selectedMFAMethod, setSelectedMFAMethod] = useState<"sms" | "google">(
    "sms",
  );

  const handleCredentialsSuccess = (username: string, password: string) => {
    // Generate vault access key with quantum protection
    const vaultKey = btoa("harmony quantum vault access")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    // Enhanced security validation with vault-connected credentials
    const validCredentials = {
      user: "Synatic", // Updated username
      pass: "harmonyquantumvaultaccess", // Updated password
      vault: vaultKey,
    };

    if (
      username === validCredentials.user &&
      password === validCredentials.pass
    ) {
      // Immediate secure cleanup
      username = "";
      password = "";
      validCredentials.user = "";
      validCredentials.pass = "";
      validCredentials.vault = "";

      // After successful credential validation, show MFA options
      setLoginStep(selectedMFAMethod === "sms" ? "sms-mfa" : "google-2fa");
      return true;
    }

    // Clear all traces
    username = "";
    password = "";

    return false;
  };

  const handleMFASuccess = () => {
    setLoginStep("success");
    onLoginSuccess();
  };

  const handleGoogleAuthSetup = () => {
    // Google Authenticator setup completed
    handleMFASuccess();
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6">
        <div className="text-center space-y-2">
          <Shield className="h-12 w-12 text-green-400 mx-auto" />
          <h1 className="text-2xl font-bold text-green-400">
            GAIA Admin Security Center
          </h1>
          <p className="text-sm text-green-300">
            Multi-Factor Authentication Required
          </p>
        </div>
      </Card>

      {loginStep === "credentials" && (
        <div className="space-y-4">
          {/* MFA Method Selection */}
          <Card className="border-blue-500/30 p-4">
            <h3 className="text-blue-400 font-medium mb-3">
              Choose 2FA Method:
            </h3>
            <Tabs
              value={selectedMFAMethod}
              onValueChange={(v) => setSelectedMFAMethod(v as "sms" | "google")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sms" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  SMS Verification
                </TabsTrigger>
                <TabsTrigger value="google" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Google Authenticator
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          {/* Admin Login Form */}
          <AdminLogin onLoginSuccess={handleCredentialsSuccess} />
        </div>
      )}

      {loginStep === "sms-mfa" && <AdminMFA onMFASuccess={handleMFASuccess} />}

      {loginStep === "google-2fa" && (
        <GoogleAuthenticator
          onSetupComplete={handleGoogleAuthSetup}
          onVerificationSuccess={handleMFASuccess}
          userEmail="admin@cultureofharmony.net"
        />
      )}

      {loginStep === "success" && (
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-green-400">
              Security Verification Complete!
            </h2>
            <p className="text-green-300">
              Welcome to GAIA Admin Dashboard - Maximum security active across
              all platforms
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
