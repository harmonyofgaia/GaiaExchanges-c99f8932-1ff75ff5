
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, FileText, CheckCircle, ExternalLink } from 'lucide-react'

export function LegalCompliance() {
  return (
    <div className="space-y-6 p-6">
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-6 w-6" />
            GAiA Token Legal Compliance Documentation
          </CardTitle>
          <Badge className="bg-green-600 w-fit">Exchange Ready</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Token Classification */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">Token Classification & Utility</h3>
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
              <h4 className="font-bold text-green-300 mb-2">GAiA Token Utility Classification</h4>
              <ul className="space-y-2 text-green-200 text-sm">
                <li>• Environmental Impact Token - Not a security</li>
                <li>• Utility for eco-system transactions and environmental projects</li>
                <li>• Transparent fee distribution to environmental causes</li>
                <li>• Community governance participation rights</li>
                <li>• Access to exclusive environmental impact tracking</li>
              </ul>
            </div>
          </div>

          {/* Regulatory Compliance */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Regulatory Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                <h4 className="font-bold text-blue-300 mb-2">✅ AML/KYC Compliance</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Identity verification protocols</li>
                  <li>• Transaction monitoring systems</li>
                  <li>• Suspicious activity reporting</li>
                  <li>• Record keeping requirements</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
                <h4 className="font-bold text-purple-300 mb-2">✅ GDPR Compliance</h4>
                <ul className="text-purple-200 text-sm space-y-1">
                  <li>• Data protection by design</li>
                  <li>• User consent mechanisms</li>
                  <li>• Right to erasure implementation</li>
                  <li>• Data portability features</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Security */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-400">Technical Security Framework</h3>
            <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-bold text-orange-300 mb-2">🔐 Security Measures</h4>
                  <ul className="text-orange-200 text-sm space-y-1">
                    <li>• Multi-signature wallets</li>
                    <li>• Cold storage protocols</li>
                    <li>• End-to-end encryption</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-orange-300 mb-2">🛡️ Infrastructure</h4>
                  <ul className="text-orange-200 text-sm space-y-1">
                    <li>• Distributed architecture</li>
                    <li>• Load balancing systems</li>
                    <li>• Backup & recovery plans</li>
                    <li>• 99.9% uptime guarantee</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-orange-300 mb-2">📊 Monitoring</h4>
                  <ul className="text-orange-200 text-sm space-y-1">
                    <li>• Real-time transaction monitoring</li>
                    <li>• Anomaly detection systems</li>
                    <li>• Compliance reporting tools</li>
                    <li>• Audit trail maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Documentation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">Financial & Business Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
                <h4 className="font-bold text-yellow-300 mb-2">📈 Financial Reports</h4>
                <ul className="text-yellow-200 text-sm space-y-1">
                  <li>• Audited financial statements</li>
                  <li>• Token economics whitepaper</li>
                  <li>• Revenue model documentation</li>
                  <li>• Environmental impact reports</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
                <h4 className="font-bold text-green-300 mb-2">🌱 Environmental Proof</h4>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Carbon offset certificates</li>
                  <li>• Tree planting verification</li>
                  <li>• Ocean cleanup documentation</li>
                  <li>• Third-party environmental audits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Structure */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-400">Legal Entity Structure</h3>
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20">
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-red-300">🏢 Corporate Structure</h4>
                  <p className="text-red-200 text-sm">
                    Harmony of Gaia Foundation - Environmental Impact Organization
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-red-300">📋 Registration Details</h4>
                  <ul className="text-red-200 text-sm space-y-1">
                    <li>• Legal entity registration: Netherlands</li>
                    <li>• Tax compliance: Multi-jurisdiction</li>
                    <li>• Regulatory licenses: Applied/Pending</li>
                    <li>• Insurance coverage: Professional liability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Requirements Checklist */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Exchange Listing Requirements</h3>
            <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-cyan-300 mb-2">✅ Documentation Complete</h4>
                  <ul className="text-cyan-200 text-sm space-y-1">
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Whitepaper & Technical docs</li>
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Smart contract audit reports</li>
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Legal opinion letters</li>
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Compliance certificates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-300 mb-2">✅ Technical Integration</h4>
                  <ul className="text-cyan-200 text-sm space-y-1">
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />API documentation ready</li>
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Testnet integration completed</li>
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Security testing passed</li>
                    <li><CheckCircle className="inline h-3 w-3 mr-1" />Liquidity pool established</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-900/20 p-4 rounded-lg border border-gray-500/20">
            <h4 className="font-bold text-gray-300 mb-2">📞 Legal & Compliance Contact</h4>
            <div className="text-gray-200 text-sm space-y-1">
              <p>Email: legal@harmonyofgaia.com</p>
              <p>Phone: +31 687 758 236</p>
              <p>Address: Culture of Harmony Foundation, Netherlands</p>
              <p>Website: www.cultureofharmony.net</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
