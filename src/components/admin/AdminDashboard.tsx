import { AdminDashboardTabs } from "./AdminDashboardTabs";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";
import { AdminOnlyAccess } from "@/components/security/AdminOnlyAccess";
import { EnhancedAdminMenu } from "./EnhancedAdminMenu";

export function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminOnlyAccess>
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              🛡️ GAIA ADMIN CONTROL CENTER 🛡️
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Ultimate transparency and control for community protection
            </p>
          </div>

          {/* Enhanced Admin Menu */}
          <EnhancedAdminMenu />

          {/* Original Admin Dashboard Tabs */}
          <div className="mt-8">
            <AdminDashboardTabs />
          </div>
        </div>
      </AdminOnlyAccess>
    </AdminProtectedRoute>
  );
}
