import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Smartphone, Apple, Play, FileText, Shield } from "lucide-react";
import { toast } from "sonner";

export function AppStorePreparation() {
  const downloadDocument = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`${filename} downloaded!`, {
      description: "Document ready for app store submission",
    });
  };

  const privacyPolicy = `PRIVACY POLICY FOR HARMONY OF GAIA - GAIA'S EXCHANGES

Last Updated: ${new Date().toLocaleDateString()}

1. INTRODUCTION
Culture of Harmony ("we," "our," or "us") operates the Harmony of Gaia ecosystem, including Gaia's Exchanges mobile application. This Privacy Policy explains how we collect, use, and protect your information.

2. INFORMATION WE COLLECT
- Account Information: Name, email address, username
- Wallet Information: Cryptocurrency wallet addresses (public keys only)
- Transaction Data: Trading history and transaction records
- Device Information: Device type, operating system, app version
- Usage Analytics: App usage patterns for improvement purposes

3. HOW WE USE YOUR INFORMATION
- Provide secure cryptocurrency trading services
- Maintain and improve app functionality
- Send important account and security notifications
- Comply with legal and regulatory requirements
- Prevent fraud and unauthorized access

4. DATA SECURITY
We implement bank-level security measures including:
- End-to-end encryption for all sensitive data
- Multi-factor authentication options
- Regular security audits and monitoring
- Secure data storage with industry-standard protocols

5. DATA SHARING
We DO NOT sell your personal information to third parties.
We may share data only when:
- Required by law or legal process
- Necessary to prevent fraud or security threats
- With your explicit consent

6. YOUR RIGHTS
- Access your personal data
- Request data correction or deletion
- Withdraw consent for data processing
- Export your data in portable format

7. CONTACT INFORMATION
For privacy concerns, contact us at:
Email: info@cultureofharmony.net
Website: www.cultureofharmony.net

8. UPDATES TO THIS POLICY
We may update this Privacy Policy. Users will be notified of significant changes through the app or email.

This Privacy Policy is designed to comply with GDPR, CCPA, and other major privacy regulations.`;

  const termsOfService = `TERMS OF SERVICE FOR HARMONY OF GAIA - GAIA'S EXCHANGES

Last Updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS
By using Gaia's Exchanges, you agree to these Terms of Service and our Privacy Policy.

2. DESCRIPTION OF SERVICE
Gaia's Exchanges is a cryptocurrency trading platform focused on sustainable blockchain technology and environmental impact.

3. USER ELIGIBILITY
- Must be 18 years or older
- Must have legal capacity to enter contracts
- Must comply with local laws regarding cryptocurrency trading
- Prohibited in jurisdictions where cryptocurrency trading is illegal

4. ACCOUNT RESPONSIBILITIES
- Maintain accurate account information
- Secure your login credentials and private keys
- Report suspicious activity immediately
- Comply with all applicable laws and regulations

5. TRADING TERMS
- All trades are final once executed
- Trading fees may apply (except GAiA token trades)
- Market prices are subject to volatility
- We reserve the right to suspend trading during maintenance

6. PROHIBITED ACTIVITIES
- Money laundering or illegal financial activities
- Market manipulation or fraudulent trading
- Unauthorized access to other user accounts
- Use of automated trading bots without permission

7. INTELLECTUAL PROPERTY
All content, trademarks, and intellectual property belong to Culture of Harmony unless otherwise stated.

8. LIMITATION OF LIABILITY
Culture of Harmony is not liable for:
- Market losses due to cryptocurrency volatility
- Technical issues beyond our control
- Third-party security breaches
- Force majeure events

9. DISPUTE RESOLUTION
Disputes will be resolved through binding arbitration in accordance with applicable laws.

10. TERMINATION
We may terminate accounts for violations of these terms or suspicious activity.

11. CONTACT INFORMATION
For questions about these terms:
Email: info@cultureofharmony.net
Website: www.cultureofharmony.net

These terms are governed by applicable laws and designed for international compliance.`;

  const appStoreDescription = `Harmony of Gaia - Gaia's Exchanges: Revolutionary Sustainable Crypto Trading

🌍 JOIN THE GREEN CRYPTOCURRENCY REVOLUTION 🌍

Gaia's Exchanges is the world's first environmentally-focused cryptocurrency trading platform, designed to make digital assets accessible while contributing to planetary healing.

KEY FEATURES:
✅ Zero-Fee GAiA Token Trading
✅ Military-Grade Security Protection
✅ 24/7 Admin Monitoring & Support
✅ Transaction Reversal Rights
✅ Environmental Impact Tracking
✅ Full Transparency & Open Operations

🔐 ULTIMATE SECURITY:
- Bank-level encryption for all transactions
- Multi-factor authentication
- Cold storage wallet protection
- Real-time fraud detection
- Secure backup and recovery

🌱 ENVIRONMENTAL MISSION:
Every trade contributes to environmental restoration projects. Track your positive impact on the planet while building your digital asset portfolio.

💰 TRADING FEATURES:
- Instant GAiA token swaps (zero fees)
- Multiple cryptocurrency support
- Real-time market data
- Advanced trading analytics
- Portfolio tracking and management

🤝 COMMUNITY DRIVEN:
Join thousands of eco-conscious traders in the Culture of Harmony community. Together we make the world a better place through sustainable technology.

📱 PERFECT FOR:
- New cryptocurrency traders
- Environmentally conscious investors
- Experienced traders seeking security
- Anyone wanting to make a positive impact

Download now and start your journey toward sustainable cryptocurrency trading!

Contact: info@cultureofharmony.net
Website: www.cultureofharmony.net

#SustainableCrypto #GreenTrading #CultureOfHarmony #EnvironmentalBlockchain`;

  const appStoreKeywords = `cryptocurrency, crypto trading, sustainable blockchain, environmental, green crypto, GAiA token, wallet, secure trading, zero fees, eco-friendly, digital assets, DeFi, Culture of Harmony, sustainable finance, green technology, blockchain, bitcoin, ethereum, trading platform, crypto exchange, environmental impact, sustainable investing, clean energy crypto, carbon neutral trading, eco trading`;

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Smartphone className="h-5 w-5" />
            App Store Submission Package
          </CardTitle>
          <p className="text-muted-foreground">
            Complete documentation package for Apple App Store and Google Play Store submissions
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400 text-lg">
                  <Apple className="h-5 w-5" />
                  Apple App Store
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Required Documents:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Privacy Policy</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDocument("Privacy_Policy_iOS.txt", privacyPolicy)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Terms of Service</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDocument("Terms_of_Service_iOS.txt", termsOfService)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>App Description</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          downloadDocument("App_Store_Description.txt", appStoreDescription)
                        }
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Keywords</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadDocument("App_Store_Keywords.txt", appStoreKeywords)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-600">Ready for Submission</Badge>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400 text-lg">
                  <Play className="h-5 w-5" />
                  Google Play Store
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Required Documents:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Privacy Policy</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          downloadDocument("Privacy_Policy_Android.txt", privacyPolicy)
                        }
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Terms of Service</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          downloadDocument("Terms_of_Service_Android.txt", termsOfService)
                        }
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>App Description</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          downloadDocument("Play_Store_Description.txt", appStoreDescription)
                        }
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Keywords</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          downloadDocument("Play_Store_Keywords.txt", appStoreKeywords)
                        }
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                <Badge className="bg-yellow-600">Ready for Submission</Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <FileText className="h-5 w-5" />
                Submission Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-400 mb-2">
                    Step 1: Download All Documents
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Download all the policy documents and descriptions using the buttons above.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-blue-400 mb-2">
                    Step 2: Create Developer Accounts
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Apple Developer Program: $99/year (developer.apple.com)</li>
                    <li>• Google Play Console: $25 one-time fee (play.google.com/console)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-yellow-400 mb-2">Step 3: App Information</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• App Name: "Harmony of Gaia - Gaia's Exchanges"</li>
                    <li>• Category: Finance</li>
                    <li>• Age Rating: 17+ (Financial content)</li>
                    <li>• Content Rating: Suitable for mature audiences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-purple-400 mb-2">Step 4: Required Assets</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • App Icon: Use the official Gaia logo (1024x1024 for iOS, various sizes for
                      Android)
                    </li>
                    <li>• Screenshots: Take screenshots of the working app</li>
                    <li>• App Store description: Use the downloaded description files</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-red-400" />
                  <h4 className="font-medium text-red-400">Important Security Note</h4>
                </div>
                <p className="text-sm text-red-300">
                  You must manually submit these applications using your own developer accounts.
                  Never share your Apple ID, Google account credentials, or developer account access
                  with anyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
