import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GAIA_TOKEN } from '@/constants/tokens';

// Import project data from managers
import { GreenProjectWalletManager } from '@/components/vault/GreenProjectWalletManager';
import { AnimalWelfareWalletManager } from '@/components/animal-welfare/AnimalWelfareWalletManager';

// Example: You may want to import or fetch Community Vault and Main Wallet project data as well


// Import or define real project data here
const greenProjects = [
  { name: 'Green Project 1', wallet_address: 'GP1...', allocation_percentage: 30, total_received: 10000 },
  { name: 'Green Project 2', wallet_address: 'GP2...', allocation_percentage: 25, total_received: 8500 }
];
const animalProjects = [
  { name: 'Animal Project 1', wallet_address: 'AP1...', allocation_percentage: 35, total_received: 12000 },
  { name: 'Animal Project 2', wallet_address: 'AP2...', allocation_percentage: 20, total_received: 7000 }
];
// If you have per-project vaults, import or define them here
const communityVaultProjects = [];
const mainWalletOverview = {
  address: GAIA_TOKEN.address,
  network: 'Solana',
  contract: GAIA_TOKEN.address,
};

export const AdminWalletsOverview: React.FC = () => {
  // PDF export logic
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('GAIA Wallets & Projects Overview', 14, 16);

    // Main Wallet
    doc.text('Main Community Wallet', 14, 28);
    autoTable(doc, {
      startY: 32,
      head: [['Wallet Address', 'Network', 'Contract']],
      body: [[mainWalletOverview.address, mainWalletOverview.network, mainWalletOverview.contract]],
    });

    // Green Investments
    doc.text('Green Investments Projects', 14, 50);
    autoTable(doc, {
      startY: 54,
      head: [['Project', 'Wallet Address', 'Allocation %', 'Total Received']],
      body: greenProjects.map(p => [p.name, p.wallet_address, p.allocation_percentage, p.total_received]),
    });

    // Animal Welfare
    doc.text('Animal Welfare Projects', 14, 100);
    autoTable(doc, {
      startY: 104,
      head: [['Project', 'Wallet Address', 'Allocation %', 'Total Received']],
      body: animalProjects.map(p => [p.name, p.wallet_address, p.allocation_percentage, p.total_received]),
    });

    // Community Vault (if any)
    if (communityVaultProjects.length > 0) {
      doc.text('Community Vault Projects', 14, 150);
      autoTable(doc, {
        startY: 154,
        head: [['Project', 'Wallet Address', 'Allocation %', 'Total Received']],
        body: communityVaultProjects.map(p => [p.name, p.wallet_address, p.allocation_percentage, p.total_received]),
      });
    }

    doc.save('GAIA_Wallets_Overview.pdf');
  };

  return (
    <Card className="border-blue-500/30 mt-8">
      <CardHeader>
        <CardTitle className="text-blue-400">Admin Wallets & Projects Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Render wallet/project tables here for admin view (reuse project arrays) */}
        <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700 mt-4">
          Download PDF Overview
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminWalletsOverview;
