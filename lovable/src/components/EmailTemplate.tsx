import React from "react";
import { GaiaLogo } from "./GaiaLogo";

interface EmailTemplateProps {
  type: "newsletter" | "announcement" | "trading-alert";
  subject: string;
  content: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  type,
  subject,
  content,
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case "newsletter":
        return "from-green-900/20 to-emerald-900/20";
      case "announcement":
        return "from-blue-900/20 to-purple-900/20";
      case "trading-alert":
        return "from-orange-900/20 to-red-900/20";
      default:
        return "from-gray-900/20 to-black/20";
    }
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto bg-gradient-to-br ${getBackgroundColor()} border border-green-500/20 rounded-lg overflow-hidden`}
    >
      {/* Header */}
      <div className="bg-black/50 p-6 text-center">
        <GaiaLogo size="lg" variant="glow" className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Harmony of Gaia</h1>
        <p className="text-green-300">
          GAiA Token - The Future of Environmental Cryptocurrency
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">{subject}</h2>
        <div className="text-gray-300 leading-relaxed mb-6">{content}</div>

        {/* Call to Action */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
          <h3 className="text-green-400 font-semibold mb-2">
            Ready to Join the Revolution?
          </h3>
          <p className="text-green-300 text-sm mb-4">
            Trade GAiA tokens on the world's most secure cryptocurrency exchange
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-2xl font-bold text-white">$3.00</div>
            <div className="text-green-400 text-sm">+5.67% today</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black/30 p-4 text-center border-t border-green-500/10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GaiaLogo size="sm" />
          <span className="text-green-400 text-sm">
            info@cultureofharmony.net
          </span>
        </div>
        <p className="text-gray-400 text-xs">
          © 2024 Harmony of Gaia. Making the world a better place through
          environmental cryptocurrency.
        </p>
      </div>
    </div>
  );
};

// Example usage component for testing
export const EmailPreview: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-black/90 min-h-screen">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Email Marketing Templates - Ready for info@cultureofharmony.net
      </h2>

      <EmailTemplate
        type="newsletter"
        subject="🌍 GAiA Token Weekly Update - Environmental Impact Growing!"
        content="Dear Harmony of Gaia community, this week GAiA token has shown incredible growth with a 5.67% increase! Our environmental impact continues to expand as more investors join our mission to make the world a better place through sustainable cryptocurrency. With zero trading fees and maximum security, GAiA remains the strongest choice for conscious investors."
      />

      <EmailTemplate
        type="announcement"
        subject="🚀 Major GAiA Token Exchange Integration Announcement"
        content="We're excited to announce that GAiA token is now available on multiple trading platforms with enhanced security features and real-time price updates. Our commitment to transparency and environmental sustainability makes GAiA the perfect choice for the future of cryptocurrency investing."
      />
    </div>
  );
};
