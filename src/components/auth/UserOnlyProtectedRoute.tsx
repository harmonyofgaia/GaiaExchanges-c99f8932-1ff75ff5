import { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { AuthPage } from "./AuthPage";

interface UserOnlyProtectedRouteProps {
  children: ReactNode;
}

export function UserOnlyProtectedRoute({
  children,
}: UserOnlyProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <p className="text-green-400 font-medium">Loading GAiA Platform...</p>
          <p className="text-green-300 text-sm">Connecting to secure servers</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show auth page
  if (!user) {
    return <AuthPage />;
  }

  // Authenticated users get access
  return <>{children}</>;
}
