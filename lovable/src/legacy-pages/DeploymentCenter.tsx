import { Navbar } from "@/components/Navbar";
import { DeploymentAutomation } from "@/components/deployment/DeploymentAutomation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DeploymentCenter() {
  return (
    <ProtectedRoute isAdminRoute={true}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <DeploymentAutomation />
        </div>
      </div>
    </ProtectedRoute>
  );
}
