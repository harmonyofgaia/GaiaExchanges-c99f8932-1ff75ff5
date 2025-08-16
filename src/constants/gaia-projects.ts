export interface GAiAProject {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "planning";
  tags: string[];
  fundingGoal: number;
  currentFunding: number;
  participants: number;
  deadline: string;
  reward: number;
  progress: number;
  impact: "Low" | "Medium" | "High" | "Very High";
  expectedImpact: string;
  location: string;
  category?: string;
  isFeatured?: boolean;
  researchPhases?: string[];
  activeResearchers?: number;
  publicationsPlanned?: number;
}

export const GAIA_PROJECTS: GAiAProject[] = [
  {
    id: "1",
    title: "🌱 Solar Village Initiative",
    description:
      "Installing solar panels in remote villages to provide clean, renewable energy access.",
    status: "active",
    tags: ["Renewable Energy", "Community", "Sustainability"],
    fundingGoal: 50000,
    currentFunding: 35750,
    participants: 234,
    deadline: "18 days",
    reward: 500,
    progress: 71,
    impact: "High",
    expectedImpact: "Will provide clean energy to 500+ families",
    location: "Rural Communities Worldwide",
  },
  {
    id: "2",
    title: "🌊 Ocean Cleanup Technology",
    description:
      "Deploying autonomous drones to collect plastic waste from ocean surfaces.",
    status: "active",
    tags: ["Ocean Conservation", "Technology", "Clean Environment"],
    fundingGoal: 75000,
    currentFunding: 42300,
    participants: 189,
    deadline: "25 days",
    reward: 750,
    progress: 56,
    impact: "Very High",
    expectedImpact: "Expected to remove 10 tons of plastic annually",
    location: "Pacific Ocean",
  },
  {
    id: "3",
    title: "🌿 Urban Forest Expansion",
    description:
      "Creating green corridors in urban areas to improve air quality and biodiversity.",
    status: "completed",
    tags: ["Reforestation", "Urban Planning", "Air Quality"],
    fundingGoal: 30000,
    currentFunding: 30000,
    participants: 456,
    deadline: "Completed",
    reward: 300,
    progress: 100,
    impact: "Medium",
    expectedImpact: "Planted 1,000 trees in metropolitan areas",
    location: "Major Cities Globally",
  },
  {
    id: "4",
    title: "🧠 Green Neuroregeneration Initiative",
    description:
      "Bio-inspired research leveraging plant root growth mechanisms for human neural pathway regeneration, focusing on post-stroke recovery and neuroplasticity enhancement. Features groundbreaking Moringa oleifera (\"wonder tree\") × Blackberry (Rubus) synergy for neuroinflammation/oxidative stress reduction, plasticity/myelination support, and mitochondrial resilience. Incorporates gut–brain axis modulation and standardized extract approach for optimized bioavailability and BBB penetration.",
    status: "active",
    tags: [
      "Neuroregeneration",
      "Bio-Inspired",
      "Medical Research",
      "Post-Stroke Recovery",
      "Neuroplasticity",
      "Moringa",
      "Blackberry",
      "Anthocyanins",
      "Isothiocyanates",
      "Gut–Brain Axis",
      "Mitochondria",
    ],
    fundingGoal: 250000,
    currentFunding: 89750,
    participants: 127,
    deadline: "45 days",
    reward: 2500,
    progress: 36,
    impact: "Very High",
    expectedImpact:
      "Revolutionary breakthrough in neural pathway regeneration using plant-inspired mechanisms for stroke recovery. Standardized Moringa × Blackberry formulation with preclinical evidence and pharmacokinetic/blood-brain barrier data for enhanced neuroplasticity and mitochondrial function.",
    location: "Global Research Network",
    isFeatured: true,
    researchPhases: [
      "Root Growth Pattern Analysis",
      "Neural Pathway Mapping",
      "Moringa × Blackberry Standardization",
      "In vitro + In vivo Neuro Proof‑of‑Concept",
      "Bio-Mechanism Translation",
      "Clinical Trial Preparation",
    ],
    activeResearchers: 23,
    publicationsPlanned: 12,
  },
  {
    id: "5",
    title: "🚗 Electric Vehicle Infrastructure",
    description:
      "Building charging stations and supporting clean transportation networks.",
    status: "planning",
    tags: ["Transportation", "Clean Energy", "Infrastructure"],
    fundingGoal: 120000,
    currentFunding: 25000,
    participants: 89,
    deadline: "60 days",
    reward: 1200,
    progress: 21,
    impact: "High",
    expectedImpact:
      "Will support 500+ electric vehicles with charging infrastructure",
    location: "Urban Centers",
  },
  {
    id: "6",
    title: "♻️ Waste Reduction Systems",
    description:
      "Advanced recycling and waste management solutions for communities.",
    status: "active",
    tags: ["Waste Management", "Recycling", "Community Health"],
    fundingGoal: 65000,
    currentFunding: 31250,
    participants: 156,
    deadline: "30 days",
    reward: 650,
    progress: 48,
    impact: "Medium",
    expectedImpact:
      "Will reduce community waste by 60% through advanced recycling",
    location: "Metropolitan Areas",
  },
];
