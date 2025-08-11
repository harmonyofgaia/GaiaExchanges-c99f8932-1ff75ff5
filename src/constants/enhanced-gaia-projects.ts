import { GAiAProject } from "./gaia-projects";

// Enhanced GAIA Projects with new revolutionary initiatives
export const ENHANCED_GAIA_PROJECTS: GAiAProject[] = [
  {
    id: "land-recovery-7phase",
    title: "🌾 7-Phase Land Recovery & Sustainable Farming",
    description:
      "Revolutionary 7-phase land restoration combining regenerative agriculture with advanced soil recovery techniques. Transforming degraded land into productive, sustainable farming ecosystems that support local communities.",
    status: "active",
    tags: [
      "Land Restoration",
      "Regenerative Agriculture",
      "Soil Recovery",
      "Sustainable Farming",
      "Community Support",
    ],
    fundingGoal: 500000,
    currentFunding: 125000,
    participants: 89,
    deadline: "60 days",
    reward: 5000,
    progress: 25,
    impact: "Very High",
    expectedImpact:
      "Will restore 10,000 acres of degraded land and support 200+ farming families with sustainable livelihoods",
    location: "Global Rural Communities",
    isFeatured: true,
    researchPhases: [
      "Phase 1: Soil Analysis & Contamination Assessment",
      "Phase 2: Mycorrhizal Network Restoration",
      "Phase 3: Carbon Sequestration Implementation",
      "Phase 4: Biodiversity Corridor Creation",
      "Phase 5: Sustainable Water Management",
      "Phase 6: Community Training & Integration",
      "Phase 7: Long-term Monitoring & Optimization",
    ],
    activeResearchers: 45,
    publicationsPlanned: 18,
  },
  {
    id: "pvas-water-cleanup",
    title: "💧 PVAS Chemical Water Remediation Research",
    description:
      "Advanced research project to eliminate PVAS (Poly- and perfluoroalkyl substances) contamination from water systems using bio-engineered filtration and molecular breakdown technologies.",
    status: "active",
    tags: [
      "Water Purification",
      "PVAS Removal",
      "Chemical Remediation",
      "Bio-Engineering",
      "Environmental Health",
    ],
    fundingGoal: 350000,
    currentFunding: 87500,
    participants: 156,
    deadline: "75 days",
    reward: 3500,
    progress: 25,
    impact: "Very High",
    expectedImpact:
      "Will develop revolutionary PVAS removal technology to clean contaminated water systems affecting millions of people worldwide",
    location: "Global Water Research Centers",
    isFeatured: true,
    researchPhases: [
      "PVAS Contamination Mapping & Analysis",
      "Bio-Engineered Filter Development",
      "Molecular Breakdown Technology",
      "Large-Scale Filtration Systems",
      "Community Water Treatment Deployment",
      "Long-term Environmental Impact Study",
    ],
    activeResearchers: 67,
    publicationsPlanned: 24,
  },
  {
    id: "community-relocation-eldercare",
    title: "🏡 Global Community Relocation & Elder Care Integration",
    description:
      "Innovative program helping families relocate internationally while integrating elder care solutions. Creating sustainable communities where multiple generations can thrive together.",
    status: "active",
    tags: [
      "Community Relocation",
      "Elder Care",
      "International Migration",
      "Sustainable Housing",
      "Family Integration",
    ],
    fundingGoal: 750000,
    currentFunding: 187500,
    participants: 234,
    deadline: "90 days",
    reward: 7500,
    progress: 25,
    impact: "High",
    expectedImpact:
      "Will facilitate relocation for 500+ families and create 50+ integrated elder care communities worldwide",
    location: "Global Migration Network",
    isFeatured: true,
    researchPhases: [
      "Legal Framework & Immigration Support",
      "Sustainable Housing Development",
      "Elder Care Integration Systems",
      "Community Building Programs",
      "Cultural Adaptation Support",
      "Long-term Community Sustainability",
    ],
    activeResearchers: 89,
    publicationsPlanned: 15,
  },
];

// Wallet configurations for each project
export const PROJECT_WALLETS = {
  "land-recovery-7phase": {
    address: "GAiA-LandRecovery-7Phase-Wallet-2024",
    currency: "GAIA",
    purpose: "7-Phase Land Recovery & Sustainable Farming",
    fundingTarget: 500000,
  },
  "pvas-water-cleanup": {
    address: "GAiA-PVAS-WaterCleanup-Research-2024",
    currency: "GAIA",
    purpose: "PVAS Chemical Water Remediation Research",
    fundingTarget: 350000,
  },
  "community-relocation-eldercare": {
    address: "GAiA-Community-Relocation-ElderCare-2024",
    currency: "GAIA",
    purpose: "Global Community Relocation & Elder Care Integration",
    fundingTarget: 750000,
  },
};

// Investment mechanisms for the projects
export const PROJECT_INVESTMENT_TIERS = {
  bronze: { min: 100, max: 999, reward: "Project Updates + Community Access" },
  silver: { min: 1000, max: 4999, reward: "All Bronze + Research Data Access" },
  gold: {
    min: 5000,
    max: 19999,
    reward: "All Silver + Direct Researcher Contact",
  },
  platinum: {
    min: 20000,
    max: 49999,
    reward: "All Gold + Co-Author Opportunities",
  },
  diamond: {
    min: 50000,
    max: Infinity,
    reward: "All Platinum + Project Steering Committee",
  },
};
