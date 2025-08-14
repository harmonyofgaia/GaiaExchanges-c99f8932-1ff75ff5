import { useAuth } from "./AuthProvider";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";
import { AuthPage } from "./AuthPage";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdminRoute?: boolean;
}

export function ProtectedRoute({ children, isAdminRoute = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { isAdmin, isValidating } = useSecureAdmin();

  // Show loading state while validating
  if (loading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <p className="text-green-400 font-medium">
            {isAdminRoute ? "Validating Admin Access..." : "Loading Harmony of Gaia..."}
          </p>
          <p className="text-green-300 text-sm">
            {isAdminRoute
              ? "Maximum security verification in progress"
              : "Connecting to secure servers"}
          </p>
        </div>
      </div>
    );
  }

  // For admin routes, check admin access first
  if (isAdminRoute) {
    // If user has admin access, allow through
    if (isAdmin) {
      return <>{children}</>;
    }

    // For admin routes, redirect to admin login instead of general auth
    return <Navigate to="/admin-login" replace />;
  }

  // For regular routes, check user authentication
  if (!user) {
    return <AuthPage />;
  }

  return <>{children}</>;
}
