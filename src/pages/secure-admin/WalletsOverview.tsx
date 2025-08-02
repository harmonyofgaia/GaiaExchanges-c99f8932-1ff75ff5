import React from 'react';
import AdminWalletsOverview from '@/components/admin/AdminWalletsOverview';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

const WalletsOverviewPage: React.FC = () => {
  return (
    <ProtectedRoute isAdminRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-900/10 to-green-900/10 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">Secure Admin: Wallets & Projects Overview</h1>
          <AdminWalletsOverview />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default WalletsOverviewPage;
