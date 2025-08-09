import { CheckCircle, Shield, Lock, Eye, Zap, FileCheck } from "lucide-react";

export function AutoResolutionFeatures() {
  const features = [
    { icon: Shield, text: "Cyber Attack Detection" },
    { icon: Lock, text: "Wallet Security Monitoring" },
    { icon: Eye, text: "File Integrity Surveillance" },
    { icon: Zap, text: "Real-time Threat Response" },
    { icon: FileCheck, text: "Application Health Checks" },
    { icon: CheckCircle, text: "Community Protection" },
  ];

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-green-400">
        🛡️ Advanced Security Features
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div key={feature.text} className="flex items-center gap-2">
              <IconComponent className="h-4 w-4 text-green-400" />
              <span>{feature.text}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs">
        <p className="text-blue-300">
          🔐 <strong>Silent Monitoring:</strong> No pop-ups, only critical
          security notifications
        </p>
      </div>
    </div>
  );
}
