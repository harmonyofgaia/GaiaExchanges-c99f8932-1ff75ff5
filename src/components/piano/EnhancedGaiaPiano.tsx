import { useState, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Camera,
  Globe,
  GraduationCap,
  Crown,
  Gift,
  Bike,
  MapPin,
  Carrot,
} from "lucide-react";

// Lazy load components
const EnhancedBadgeSystem = lazy(() =>
  import("@/components/earning/EnhancedBadgeSystem").then((m) => ({
    default: m.EnhancedBadgeSystem,
  })),
);
const PhotoVerificationSystem = lazy(() =>
  import("@/components/earning/PhotoVerificationSystem").then((m) => ({
    default: m.PhotoVerificationSystem,
  })),
);
const EcosystemIntegration = lazy(() =>
  import("@/components/earning/EcosystemIntegration").then((m) => ({
    default: m.EcosystemIntegration,
  })),
);
const MentorshipProgram = lazy(() =>
  import("@/components/earning/MentorshipProgram").then((m) => ({
    default: m.MentorshipProgram,
  })),
);
const CommunityGovernance = lazy(() =>
  import("@/components/community/CommunityGovernance").then((m) => ({
    default: m.CommunityGovernance,
  })),
);
const CommunityRewardsProgram = lazy(() =>
  import("@/components/earning/CommunityRewardsProgram").then((m) => ({
    default: m.CommunityRewardsProgram,
  })),
);
const GaiaBikeEarning = lazy(() =>
  import("@/components/earning/GaiaBikeEarning").then((m) => ({
    default: m.GaiaBikeEarning,
  })),
);
const InteractiveFoodMap = lazy(() =>
  import("@/components/community/InteractiveFoodMap").then((m) => ({
    default: m.InteractiveFoodMap,
  })),
);
const EnhancedHomeGrownFoodTracker = lazy(() =>
  import("@/components/earning/EnhancedHomeGrownFoodTracker").then((m) => ({
    default: m.EnhancedHomeGrownFoodTracker,
  })),
);
const InteractiveEcoBikeMap = lazy(() =>
  import("@/components/earning/InteractiveEcoBikeMap").then((m) => ({
    default: m.InteractiveEcoBikeMap,
  })),
);

interface PianoKeyProps {
  icon: any;
  title: string;
  description: string;
  component: any;
  color: string;
  hoverColor: string;
  glowColor: string;
  onClick: () => void;
  isBlackKey?: boolean;
  position?: string;
}

function PianoKey({
  icon: Icon,
  title,
  description,
  component: Component,
  color,
  hoverColor,
  glowColor,
  onClick,
  isBlackKey = false,
  position = "",
}: PianoKeyProps) {
  return (
    <div
      className={`group relative ${isBlackKey ? `w-12 ${position} cursor-pointer` : "flex-1 h-full border-r-2 border-gray-600 cursor-pointer"} transform transition-all duration-200 active:scale-95`}
      onClick={onClick}
    >
      <div
        className={`h-full ${
          isBlackKey
            ? `bg-gradient-to-b from-gray-900 via-gray-800 to-black hover:from-${color}-800 hover:via-${color}-700 hover:to-${color}-900 transition-all duration-300 rounded-b-xl shadow-[0_5px_15px_rgba(0,0,0,0.8)] hover:shadow-[0_5px_20px_${glowColor}] flex flex-col items-center justify-end p-3 border-l-2 border-r-2 border-gray-700`
            : `bg-gradient-to-b from-white via-gray-50 to-gray-100 hover:from-${hoverColor}-100 hover:via-${hoverColor}-50 hover:to-${hoverColor}-200 transition-all duration-300 rounded-b-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_2px_15px_${glowColor}] flex flex-col items-center justify-end p-6 border-l-2 border-r-2 border-gray-300`
        }`}
      >
        <div
          className={`${isBlackKey ? "bg-gray-800" : "bg-white/80"} rounded-full p-3 mb-3 shadow-lg`}
        >
          <Icon
            className={`${isBlackKey ? "h-8 w-8" : "h-10 w-10"} text-${color}-${isBlackKey ? "400" : "600"} group-hover:animate-bounce`}
          />
        </div>
        <span
          className={`text-sm font-bold ${isBlackKey ? `text-${color}-200 text-center transform -rotate-90 whitespace-nowrap` : `text-gray-800 text-center leading-tight`}`}
        >
          {isBlackKey ? title : title.split(" ").join("\n")}
        </span>
        {!isBlackKey && (
          <div
            className={`w-full h-1 bg-${color}-200 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <div
              className={`h-full bg-${color}-600 rounded-full w-5/6 animate-pulse`}
            ></div>
          </div>
        )}
      </div>

      {/* Enhanced Floating Preview */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100 z-50 pointer-events-none">
        <div
          className={`bg-black/98 backdrop-blur-2xl rounded-3xl border-2 border-${color}-500/70 p-8 w-96 shadow-[0_0_40px_${glowColor}]`}
        >
          <div className="text-center mb-6">
            <div
              className={`bg-gradient-to-r from-${color}-600 to-${color}-400 rounded-full p-4 mx-auto w-fit mb-4`}
            >
              <Icon className="h-16 w-16 text-white" />
            </div>
            <h4 className={`text-2xl font-bold text-${color}-400 mb-2`}>
              {title}
            </h4>
            <p className="text-gray-300">{description}</p>
          </div>
          <div
            className={`h-48 overflow-hidden rounded-xl border-2 border-${color}-500/40 bg-gradient-to-br from-${color}-900/30 to-${color}-800/20`}
          >
            <Suspense
              fallback={
                <div
                  className={`animate-pulse bg-${color}-500/20 h-full flex items-center justify-center`}
                >
                  <span className={`text-${color}-300`}>Loading...</span>
                </div>
              }
            >
              <Component />
            </Suspense>
          </div>
          <div className="mt-4 text-center">
            <Badge className={`bg-${color}-600 text-white px-4 py-2`}>
              Click to explore!
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

interface EnhancedGaiaPianoProps {
  onCategorySelect: (categoryId: string) => void;
}

export function EnhancedGaiaPiano({
  onCategorySelect,
}: EnhancedGaiaPianoProps) {
  const whiteKeys = [
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Unlock badges, levels & exclusive rewards",
      component: EnhancedBadgeSystem,
      color: "blue",
      hoverColor: "blue",
      glowColor: "rgba(59,130,246,0.3)",
      categoryId: "advanced",
    },
    {
      icon: Camera,
      title: "Photo Verification",
      description: "Prove your eco-actions with smart verification",
      component: PhotoVerificationSystem,
      color: "purple",
      hoverColor: "purple",
      glowColor: "rgba(147,51,234,0.3)",
      categoryId: "foundation",
    },
    {
      icon: Globe,
      title: "Ecosystem Integration",
      description: "Connect with global sustainability platforms",
      component: EcosystemIntegration,
      color: "indigo",
      hoverColor: "indigo",
      glowColor: "rgba(99,102,241,0.3)",
      categoryId: "systems",
    },
    {
      icon: GraduationCap,
      title: "Mentorship Program",
      description: "Learn from sustainability experts worldwide",
      component: MentorshipProgram,
      color: "red",
      hoverColor: "red",
      glowColor: "rgba(239,68,68,0.3)",
      categoryId: "community",
    },
    {
      icon: Crown,
      title: "Community Governance",
      description: "Vote on proposals & shape the future",
      component: CommunityGovernance,
      color: "cyan",
      hoverColor: "cyan",
      glowColor: "rgba(6,182,212,0.3)",
      categoryId: "community",
    },
    {
      icon: Gift,
      title: "Reward System",
      description: "Tier-based rewards & special benefits",
      component: CommunityRewardsProgram,
      color: "green",
      hoverColor: "green",
      glowColor: "rgba(34,197,94,0.3)",
      categoryId: "lifestyle",
    },
    {
      icon: Bike,
      title: "GAiA Bike System",
      description: "Earn tokens while cycling sustainably",
      component: GaiaBikeEarning,
      color: "emerald",
      hoverColor: "emerald",
      glowColor: "rgba(16,185,129,0.3)",
      categoryId: "travel",
    },
  ];

  const blackKeys = [
    {
      icon: MapPin,
      title: "Food Map",
      description: "Discover local food producers & markets",
      component: InteractiveFoodMap,
      color: "pink",
      hoverColor: "pink",
      glowColor: "rgba(236,72,153,0.6)",
      position: "ml-16",
      categoryId: "lifestyle",
    },
    {
      icon: Carrot,
      title: "Home Food",
      description: "Track your home-grown food production",
      component: EnhancedHomeGrownFoodTracker,
      color: "amber",
      hoverColor: "amber",
      glowColor: "rgba(245,158,11,0.6)",
      position: "ml-20",
      categoryId: "lifestyle",
    },
    {
      icon: MapPin,
      title: "Bike Routes",
      description: "Discover sustainable cycling paths",
      component: InteractiveEcoBikeMap,
      color: "teal",
      hoverColor: "teal",
      glowColor: "rgba(20,184,166,0.6)",
      position: "ml-20",
      categoryId: "travel",
    },
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-6">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
          🎹 GAiA Grand Piano
        </h2>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
          ✨ Touch the keys of change - Experience the symphony of
          sustainability ✨
        </p>
        <div className="flex justify-center items-center gap-4 text-lg">
          <span className="animate-bounce">🎵</span>
          <span className="text-amber-400 font-semibold">
            Hover to preview • Click to explore
          </span>
          <span className="animate-bounce delay-100">🎶</span>
        </div>
      </div>

      {/* Luxury Piano Stand */}
      <div className="relative mx-auto max-w-7xl">
        <div className="bg-gradient-to-b from-amber-900/50 via-amber-800/70 to-amber-700/90 rounded-3xl p-12 border-8 border-amber-600/80 shadow-[0_0_60px_rgba(245,158,11,0.6)] backdrop-blur-sm">
          {/* Music Stand */}
          <div className="mb-8 text-center">
            <div className="inline-block bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl p-6 shadow-2xl border-4 border-amber-400 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <h3 className="text-3xl font-bold text-amber-900 mb-3">
                🎼 Environmental Symphony
              </h3>
              <p className="text-amber-800 text-lg">
                Each key unlocks sustainable actions for our planet
              </p>
            </div>
          </div>

          {/* Piano Body - Ultra Realistic Wood Grain */}
          <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 rounded-2xl p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] border-6 border-amber-600/90">
            {/* Piano Keyboard - Premium Design */}
            <div className="relative h-96 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] border-6 border-gray-600 overflow-hidden">
              {/* Piano Key Bed */}
              <div className="absolute inset-3 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-inner"></div>

              {/* White Keys */}
              <div className="relative flex h-full p-3">
                {whiteKeys.map((key, index) => (
                  <PianoKey
                    key={index}
                    {...key}
                    onClick={() => onCategorySelect(key.categoryId)}
                  />
                ))}
              </div>

              {/* Black Keys - Floating Above */}
              <div className="absolute bottom-0 left-0 right-0 flex h-3/5 z-10">
                {blackKeys.map((key, index) => (
                  <PianoKey
                    key={index}
                    {...key}
                    isBlackKey={true}
                    onClick={() => onCategorySelect(key.categoryId)}
                  />
                ))}
              </div>
            </div>

            {/* Piano Brand/Logo with Musical Notes */}
            <div className="text-center mt-8">
              <div className="inline-block bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 text-amber-100 px-8 py-4 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-amber-500/50">
                <div className="flex items-center gap-3">
                  <span className="animate-bounce">🎹</span>
                  <span>GAiA Grand Piano</span>
                  <span className="animate-bounce delay-100">🎵</span>
                </div>
                <div className="text-sm font-normal mt-1 opacity-80">
                  Environmental Symphony • Play to Explore
                </div>
              </div>
            </div>

            {/* Decorative Musical Elements */}
            <div className="absolute top-4 left-4 text-2xl animate-bounce delay-300">
              🎼
            </div>
            <div className="absolute top-8 right-8 text-2xl animate-bounce delay-700">
              🎶
            </div>
            <div className="absolute bottom-16 left-8 text-xl animate-bounce delay-500">
              ♪
            </div>
            <div className="absolute bottom-20 right-12 text-xl animate-bounce delay-900">
              ♫
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
