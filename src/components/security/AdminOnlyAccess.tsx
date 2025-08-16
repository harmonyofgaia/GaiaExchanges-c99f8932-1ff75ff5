import { ReactNode } from "react";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";
import { SecureAdminLogin } from "@/components/auth/SecureAdminLogin";
import { Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminOnlyAccessProps {
  children: ReactNode;
}

export function AdminOnlyAccess({ children }: AdminOnlyAccessProps) {
  const { isAdmin, revokeAdminAccess, isValidating } = useSecureAdmin();

  const handleAdminLogin = () => {
    // This will be handled by SecureAdminLogin component
    window.location.reload();
  };

  const handleLogout = async () => {
    await revokeAdminAccess();
  };

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <p className="text-green-400 font-medium">
            Validating Admin Access...
          </p>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className="space-y-6">
        {/* Admin Status Bar */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-bold">
              🛡️ ADMIN MODE ACTIVE
            </span>
            <Badge className="bg-green-600 animate-pulse">SECURE ACCESS</Badge>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
          >
            <Lock className="h-4 w-4 mr-2" />
            Logout Admin
          </Button>
        </div>

        {/* Admin Content */}
        {children}
      </div>
    );
  }

  return <SecureAdminLogin onAdminLogin={handleAdminLogin} />;
}
