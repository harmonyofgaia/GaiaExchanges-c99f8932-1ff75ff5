import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Database,
  Filter,
  TrendingUp,
  Wallet,
  DollarSign,
  Calendar,
  Users,
  Building,
  Leaf,
  Crown,
  RefreshCw,
} from "lucide-react";

interface Transaction {
  id: string;
  timestamp: string;
  type: "income" | "outcome";
  amount: number;
  currency: string;
  source: string;
  category: string;
  description: string;
  walletAddress: string;
  status: "completed" | "pending" | "failed";
}

interface WalletSummary {
  category: string;
  totalIncome: number;
  totalOutcome: number;
  transactionCount: number;
  color: string;
  icon: any;
}

export function PDFTransactionTracker() {
  const [activeTab, setActiveTab] = useState("overview");
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleString());
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Mock transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      timestamp: "2024-08-02 10:30:00",
      type: "income",
      amount: 1250.5,
      currency: "GAIA",
      source: "Animal Welfare - Tiger Conservation",
      category: "animal-welfare",
      description: "Donation for tiger habitat protection",
      walletAddress: "0x1234...5678",
      status: "completed",
    },
    {
      id: "2",
      timestamp: "2024-08-02 09:15:00",
      type: "income",
      amount: 850.0,
      currency: "GAIA",
      source: "Green Investments - Solar Farm Project",
      category: "green-investments",
      description: "Investment return from solar energy project",
      walletAddress: "0xabcd...efgh",
      status: "completed",
    },
    {
      id: "3",
      timestamp: "2024-08-02 08:45:00",
      type: "outcome",
      amount: 300.25,
      currency: "GAIA",
      source: "Forest Development",
      category: "forest-projects",
      description: "Seedling purchase for 7-layer forest",
      walletAddress: "0x9876...5432",
      status: "completed",
    },
    {
      id: "4",
      timestamp: "2024-08-02 07:20:00",
      type: "income",
      amount: 2100.75,
      currency: "GAIA",
      source: "Gaming Platform - Habbo Tycoon",
      category: "gaming",
      description: "Platform revenue share",
      walletAddress: "0xgame...1234",
      status: "completed",
    },
    {
      id: "5",
      timestamp: "2024-08-02 06:30:00",
      type: "income",
      amount: 750.0,
      currency: "GAIA",
      source: "Community Hub - Business Support",
      category: "community",
      description: "Business development fee",
      walletAddress: "0xcomm...5678",
      status: "completed",
    },
  ]);

  const walletSummaries: WalletSummary[] = [
    {
      category: "Animal Welfare",
      totalIncome: 3450.75,
      totalOutcome: 1200.5,
      transactionCount: 24,
      color: "bg-green-600",
      icon: Users,
    },
    {
      category: "Green Investments",
      totalIncome: 12850.0,
      totalOutcome: 2300.75,
      transactionCount: 18,
      color: "bg-emerald-600",
      icon: Leaf,
    },
    {
      category: "Gaming Platform",
      totalIncome: 8750.25,
      totalOutcome: 500.0,
      transactionCount: 32,
      color: "bg-purple-600",
      icon: TrendingUp,
    },
    {
      category: "Community Hub",
      totalIncome: 4200.5,
      totalOutcome: 800.25,
      transactionCount: 15,
      color: "bg-blue-600",
      icon: Building,
    },
    {
      category: "Forest Projects",
      totalIncome: 2100.0,
      totalOutcome: 5750.0,
      transactionCount: 21,
      color: "bg-orange-600",
      icon: Crown,
    },
  ];

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutcome = transactions
    .filter((t) => t.type === "outcome")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalOutcome;

  const generatePDF = async (category?: string) => {
    setIsGeneratingPDF(true);

    // Simulate PDF generation
    setTimeout(() => {
      setIsGeneratingPDF(false);
      // In a real app, this would trigger a PDF download
      console.log("PDF generated for:", category || "All Transactions");
    }, 2000);
  };

  const refreshData = () => {
    setLastUpdate(new Date().toLocaleString());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-600";
      case "failed":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "income" ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-400 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            📊 PDF TRANSACTION DATABASE SYSTEM
          </CardTitle>
          <p className="text-muted-foreground">
            Complete transaction tracking with automated PDF generation
            organized by project and source
          </p>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {totalIncome.toLocaleString()} GAIA
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Income
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {totalOutcome.toLocaleString()} GAIA
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Outcome
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {netBalance.toLocaleString()} GAIA
                </div>
                <div className="text-sm text-muted-foreground">Net Balance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {transactions.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Transactions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 border border-gray-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-200">
              Control Panel
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={refreshData}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <Button
                onClick={() => generatePDF()}
                disabled={isGeneratingPDF}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGeneratingPDF ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Full PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdate} | Auto-update: Every 5 minutes
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="by-category">📁 By Category</TabsTrigger>
          <TabsTrigger value="transactions">📝 Transactions</TabsTrigger>
          <TabsTrigger value="reports">📑 Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-cyan-400">
                💰 Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    INCOME SOURCES
                  </h4>
                  {walletSummaries
                    .filter((w) => w.totalIncome > 0)
                    .sort((a, b) => b.totalIncome - a.totalIncome)
                    .map((wallet, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <wallet.icon className="h-4 w-4" />
                          <span className="text-sm">{wallet.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">
                            {wallet.totalIncome.toLocaleString()} GAIA
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {wallet.transactionCount} transactions
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    EXPENSE CATEGORIES
                  </h4>
                  {walletSummaries
                    .filter((w) => w.totalOutcome > 0)
                    .sort((a, b) => b.totalOutcome - a.totalOutcome)
                    .map((wallet, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <wallet.icon className="h-4 w-4" />
                          <span className="text-sm">{wallet.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-red-400 font-medium">
                            {wallet.totalOutcome.toLocaleString()} GAIA
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {wallet.transactionCount} transactions
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-category" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {walletSummaries.map((wallet, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50"
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <wallet.icon className="h-5 w-5" />
                    {wallet.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Income:</span>
                      <div className="font-medium text-green-400">
                        {wallet.totalIncome.toLocaleString()} GAIA
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Outcome:</span>
                      <div className="font-medium text-red-400">
                        {wallet.totalOutcome.toLocaleString()} GAIA
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Net Balance:
                    </span>
                    <span
                      className={`font-medium ${wallet.totalIncome - wallet.totalOutcome >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {(
                        wallet.totalIncome - wallet.totalOutcome
                      ).toLocaleString()}{" "}
                      GAIA
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Transactions:
                    </span>
                    <Badge className="bg-blue-600">
                      {wallet.transactionCount}
                    </Badge>
                  </div>

                  <Button
                    onClick={() => generatePDF(wallet.category)}
                    disabled={isGeneratingPDF}
                    size="sm"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate {wallet.category} PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-violet-400">
                📝 Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <Card
                    key={tx.id}
                    className="bg-gray-800/50 border border-gray-700/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-muted-foreground">
                              {tx.timestamp}
                            </span>
                            <Badge className={getStatusColor(tx.status)}>
                              {tx.status}
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <span className="font-medium">{tx.source}</span>
                            <p className="text-sm text-muted-foreground">
                              {tx.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Wallet: {tx.walletAddress}</span>
                            <span>Category: {tx.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${getTypeColor(tx.type)}`}
                          >
                            {tx.type === "income" ? "+" : "-"}
                            {tx.amount.toLocaleString()} {tx.currency}
                          </div>
                          <Badge
                            className={
                              tx.type === "income"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }
                          >
                            {tx.type}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-orange-400">
                📑 Automated Report Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => generatePDF("daily-report")}
                  disabled={isGeneratingPDF}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Daily Transaction Report
                </Button>
                <Button
                  onClick={() => generatePDF("weekly-summary")}
                  disabled={isGeneratingPDF}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Weekly Summary
                </Button>
                <Button
                  onClick={() => generatePDF("monthly-analysis")}
                  disabled={isGeneratingPDF}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Monthly Analysis
                </Button>
                <Button
                  onClick={() => generatePDF("project-breakdown")}
                  disabled={isGeneratingPDF}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Project Breakdown
                </Button>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">
                  📋 PDF Report Features
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete transaction history with wallet addresses</li>
                  <li>
                    • Organized by project/source with detailed breakdowns
                  </li>
                  <li>• Income/outcome categorization with visual charts</li>
                  <li>• Customer support database integration</li>
                  <li>• Automatic backup and archival system</li>
                  <li>• Professional formatting for administration use</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
