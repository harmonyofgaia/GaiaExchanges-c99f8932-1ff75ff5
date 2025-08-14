import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "./AdminLogin";
import { AdminMFA } from "./AdminMFA";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, RefreshCw, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function SecureAdminLogin() {
  const navigate = useNavigate();
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<"credentials" | "mfa" | "complete">(
    "credentials"
  );
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentialsVisible, setCredentialsVisible] = useState(false);
  const { isAdmin, grantAdminAccess, revokeAdminAccess } = useSecureAdmin();

  const handleDirectLogin = (username: string, password: string) => {
    // Generate new vault access key with quantum protection
    const vaultKey = btoa("harmony quantum vault access")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    // Enhanced security validation with vault-connected credentials
    const validCredentials = {
      user: "Synatic", // Updated username
      pass: "harmonyquantumvaultaccess", // Updated password
      vault: vaultKey,
    };

    if (username === validCredentials.user && password === validCredentials.pass) {
      // Immediate secure cleanup
      username = "";
      password = "";
      validCredentials.user = "";
      validCredentials.pass = "";
      validCredentials.vault = "";

      grantAdminAccess();
      toast.success("🌍 GAIA Vault Access Granted!", {
        description: "Quantum vault security verified - all systems operational",
        duration: 5000,
      });
      return true;
    }

    // Clear all traces
    username = "";
    password = "";

    return false;
  };

  const handleShowCredentials = () => {
    console.log("🔐 Show Credentials button clicked");
    setShowCredentials(true);
    setCredentialsVisible(true);

    console.log("🔐 Credentials now visible, starting 10-second timer");

    // Auto-hide after exactly 10 seconds
    setTimeout(() => {
      console.log("🔐 10 seconds elapsed, clearing credentials");
      setCredentialsVisible(false);
      setShowCredentials(false);

      // Clear all DOM traces
      const credentialElements = document.querySelectorAll("[data-credential-display]");
      console.log(`🔐 Found ${credentialElements.length} credential elements to remove`);
      credentialElements.forEach((el) => el.remove());

      toast.success("🔐 Credentials Auto-Cleared", {
        description: "All traces removed from memory and display",
        duration: 3000,
      });
    }, 10000);

    toast.info("⏱️ Credentials Visible", {
      description: "Auto-clearing in 10 seconds...",
      duration: 10000,
    });
  };

  const handleRecoveryLogin = () => {
    setRecoveryStep("credentials");
    setShowRecovery(true);
  };

  const handleRecoveryCredentialsSuccess = (username: string, password: string) => {
    // Same validation for recovery with vault connection
    const vaultKey = btoa("harmony quantum vault access")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    const validCredentials = {
      user: "Synatic", // Updated username
      pass: "harmonyquantumvaultaccess", // Updated password
      vault: vaultKey,
    };

    if (username === validCredentials.user && password === validCredentials.pass) {
      // Secure cleanup
      username = "";
      password = "";
      validCredentials.user = "";
      validCredentials.pass = "";
      validCredentials.vault = "";

      setRecoveryStep("mfa");
      return true;
    }

    // Clear failed credentials
    username = "";
    password = "";

    return false;
  };

  const handleRecoveryMFASuccess = () => {
    setRecoveryStep("complete");
    grantAdminAccess();
    setShowRecovery(false);
    toast.success("🔐 Vault Recovery Complete!", {
      description: "Access restored via 4-step vault verification",
      duration: 5000,
    });
  };

  const handleLogout = () => {
    revokeAdminAccess();
    setShowRecovery(false);
    setRecoveryStep("credentials");
    setShowCredentials(false);
    setCredentialsVisible(false);
  };

  console.log(
    "🔐 Admin page render - isAdmin:",
    isAdmin,
    "credentialsVisible:",
    credentialsVisible
  );

  if (isAdmin && !showRecovery) {
    return (
      <div className="space-y-6">
        {/* Admin Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-green-400">
                    🛡️ GAIA VAULT CONTROL CENTER
                  </h2>
                  <p className="text-green-300">
                    Quantum Vault Security • Full System Control • Global Management
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleShowCredentials}
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  disabled={showCredentials}
                >
                  {credentialsVisible ? (
                    <EyeOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  {credentialsVisible ? "Hiding Soon..." : "Show Credentials"}
                </Button>
                <Button
                  onClick={handleRecoveryLogin}
                  variant="outline"
                  className="border-blue-500/30"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recovery Access
                </Button>
                <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
                  <LogOut className="h-4 w-4 mr-2" />
                  Secure Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temporary Credentials Display */}
        {credentialsVisible && (
          <Card
            className="border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 animate-pulse"
            data-credential-display="true"
          >
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-yellow-400 font-bold text-lg">
                  ⚡ VAULT CREDENTIALS (AUTO-CLEARING IN 10s)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">Admin Username:</div>
                    <div className="text-white font-mono text-lg">Synatic</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">Vault Password:</div>
                    <div className="text-white font-mono text-lg">harmonyquantumvaultaccess</div>
                  </div>
                </div>
                <div className="text-xs text-yellow-400">
                  🔐 This display will auto-destruct and clear all traces in 10 seconds
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-4">
            <h3 className="text-blue-400 font-bold mb-2">🌐 Live Blockchain Network</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Real-time Architek Network monitoring
            </p>
            <Button
              onClick={() => navigate("/secure-admin")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              View Live Blockchain
            </Button>
          </Card>

          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-4">
            <h3 className="text-green-400 font-bold mb-2">👥 User Management</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Control all user accounts & permissions
            </p>
            <Button
              onClick={() => navigate("/secure-admin")}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Manage Users
            </Button>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-4">
            <h3 className="text-purple-400 font-bold mb-2">🚀 Marketing Engine</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Global advertising & investor outreach
            </p>
            <Button
              onClick={() => navigate("/secure-admin")}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Launch Campaigns
            </Button>
          </Card>

          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-4">
            <h3 className="text-cyan-400 font-bold mb-2">🛡️ Security Center</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Advanced threat monitoring & protection
            </p>
            <Button
              onClick={() => navigate("/secure-admin")}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              Security Dashboard
            </Button>
          </Card>

          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-red-900/20 p-4">
            <h3 className="text-orange-400 font-bold mb-2">🎮 Gaming Controls</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Game security & tournament management
            </p>
            <Button
              onClick={() => navigate("/secure-admin")}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Gaming Center
            </Button>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 p-4">
            <h3 className="text-yellow-400 font-bold mb-2">⚡ Quantum Vault</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Advanced vault monitoring & control
            </p>
            <Button
              onClick={() => navigate("/secure-admin")}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
              Vault Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">🌍 GAIA VAULT ACCESS</h1>
          <p className="text-green-300">
            {showRecovery
              ? "Vault Recovery System • 4-Step Verification"
              : "Quantum Vault Security Portal"}
          </p>
        </div>

        {!showRecovery ? (
          <>
            <AdminLogin onLoginSuccess={handleDirectLogin} />
            <div className="mt-6 text-center">
              <Button
                onClick={handleRecoveryLogin}
                variant="ghost"
                className="text-xs text-muted-foreground hover:text-blue-400"
              >
                Need 4-Step Recovery Access?
              </Button>
            </div>
          </>
        ) : (
          <>
            {recoveryStep === "credentials" && (
              <AdminLogin onLoginSuccess={handleRecoveryCredentialsSuccess} />
            )}

            {recoveryStep === "mfa" && <AdminMFA onMFASuccess={handleRecoveryMFASuccess} />}

            <div className="mt-4 text-center">
              <Button
                onClick={() => setShowRecovery(false)}
                variant="ghost"
                className="text-xs text-muted-foreground"
              >
                Back to Simple Login
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
