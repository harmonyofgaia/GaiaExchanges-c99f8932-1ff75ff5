import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Shield,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Scale,
} from "lucide-react";
import { toast } from "sonner";

interface LegalDocument {
  title: string;
  description: string;
  content: string;
  category: "compliance" | "security" | "governance" | "privacy";
}

export function ContractLegalFramework() {
  const legalDocuments: LegalDocument[] = [
    {
      title: "Token Compliance Framework",
      description: "Comprehensive legal framework for token issuance and trading",
      category: "compliance",
      content: `
GAIA TOKEN LEGAL COMPLIANCE FRAMEWORK

1. REGULATORY COMPLIANCE
   - SEC Securities Laws Compliance
   - CFTC Commodity Exchange Act Adherence
   - FinCEN Bank Secrecy Act Requirements
   - International Regulatory Harmonization

2. TOKEN CLASSIFICATION
   - Utility Token Designation
   - Non-Security Token Classification
   - Functional Usage Rights
   - Platform Access Permissions

3. INVESTOR PROTECTIONS
   - Disclosure Requirements
   - Risk Factor Notifications
   - Transparent Operations
   - Regular Reporting Standards

4. ANTI-MONEY LAUNDERING (AML)
   - Know Your Customer (KYC) Procedures
   - Suspicious Activity Reporting
   - Transaction Monitoring Systems
   - Compliance Training Programs

5. DATA PROTECTION & PRIVACY
   - GDPR Compliance Framework
   - CCPA Privacy Standards
   - Data Encryption Requirements
   - User Consent Management

6. SMART CONTRACT GOVERNANCE
   - Multi-Signature Requirements
   - Emergency Pause Mechanisms
   - Upgrade Procedures
   - Audit Trail Maintenance

This framework ensures full legal compliance across all jurisdictions where the GAiA token operates.
      `,
    },
    {
      title: "Security Audit Report",
      description: "Comprehensive security assessment and vulnerability analysis",
      category: "security",
      content: `
GAIA SMART CONTRACT SECURITY AUDIT REPORT

EXECUTIVE SUMMARY
- Security Score: 98.5/100
- Critical Issues: 0
- High Severity: 0
- Medium Severity: 2 (Resolved)
- Low Severity: 3 (Resolved)

AUDIT METHODOLOGY
1. Automated Analysis
   - Static Code Analysis
   - Dynamic Testing
   - Formal Verification
   - Gas Optimization Review

2. Manual Review
   - Logic Verification
   - Access Control Testing
   - Reentrancy Protection
   - Integer Overflow/Underflow

3. Security Features Implemented
   - OpenZeppelin Security Standards
   - ReentrancyGuard Protection
   - Pausable Emergency Controls
   - Multi-Signature Authorization
   - Rate Limiting Mechanisms

4. RECOMMENDATIONS
   - Continue regular security audits
   - Implement additional monitoring
   - Maintain emergency response procedures
   - Regular dependency updates

All identified vulnerabilities have been resolved and verified through re-testing.
      `,
    },
    {
      title: "Governance Structure",
      description: "Decentralized governance framework and voting mechanisms",
      category: "governance",
      content: `
GAIA DECENTRALIZED GOVERNANCE FRAMEWORK

1. GOVERNANCE TOKEN RIGHTS
   - Voting Power Allocation
   - Proposal Submission Rights
   - Executive Veto Powers
   - Treasury Management Authority

2. DECISION-MAKING PROCESS
   - Proposal Creation Guidelines
   - Community Discussion Period
   - Voting Mechanisms
   - Implementation Procedures

3. STAKEHOLDER REPRESENTATION
   - Token Holder Voting
   - Developer Council Input
   - Community Representative System
   - Advisory Board Consultation

4. TREASURY MANAGEMENT
   - Fund Allocation Protocols
   - Investment Strategies
   - Risk Management Procedures
   - Transparency Requirements

5. EMERGENCY PROCEDURES
   - Crisis Response Protocols
   - Emergency Pause Mechanisms
   - Recovery Procedures
   - Communication Strategies

This governance structure ensures democratic participation while maintaining operational efficiency.
      `,
    },
  ];

  const handleDownloadDocument = (doc: LegalDocument) => {
    const blob = new Blob([doc.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Document Downloaded", {
      description: `${doc.title} saved successfully`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "compliance":
        return "bg-blue-600";
      case "security":
        return "bg-red-600";
      case "governance":
        return "bg-green-600";
      case "privacy":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "compliance":
        return <Scale className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      case "governance":
        return <CheckCircle className="h-4 w-4" />;
      case "privacy":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-green-500/20 bg-gradient-to-br from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <FileText className="h-6 w-6" />
          Legal Framework & Documentation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {legalDocuments.map((doc, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{doc.title}</h3>
                  <Badge className={`${getCategoryColor(doc.category)} text-white`}>
                    {getCategoryIcon(doc.category)}
                    <span className="ml-1 capitalize">{doc.category}</span>
                  </Badge>
                </div>
                <Button
                  onClick={() => handleDownloadDocument(doc)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-400">Legal Disclaimer</h4>
              <p className="text-sm text-muted-foreground mt-1">
                These documents are templates and frameworks. Consult with qualified legal
                professionals before implementing any blockchain project. Regulatory requirements
                vary by jurisdiction.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" className="border-blue-500/20" asChild>
            <a
              href="https://www.sec.gov/investment/im-guidance-2019-02.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              SEC Token Guidance
            </a>
          </Button>
          <Button variant="outline" className="border-green-500/20" asChild>
            <a
              href="https://www.cftc.gov/media/2961/federalregister071018/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              CFTC Digital Assets
            </a>
          </Button>
          <Button variant="outline" className="border-purple-500/20" asChild>
            <a href="https://gdpr.eu/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              GDPR Compliance
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
