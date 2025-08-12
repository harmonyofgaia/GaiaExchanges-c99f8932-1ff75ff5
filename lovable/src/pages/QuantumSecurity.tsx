import { Navbar } from "@/components/Navbar";
import { QuantumSecurityDashboard } from "@/components/security/QuantumSecurityDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function QuantumSecurity() {
  return (
    <ProtectedRoute isAdminRoute={true}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <QuantumSecurityDashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
}
