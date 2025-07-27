
export interface GAiAProject {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'completed' | 'planning'
  progress: number
  participants: number
  reward: number
  deadline: string
  impact: 'Low' | 'Medium' | 'High' | 'Very High'
  image?: string
  tags: string[]
}

export const GAIA_PROJECTS: GAiAProject[] = [
  {
    id: '1',
    title: 'Global Reforestation Initiative',
    description: 'Plant trees worldwide to combat climate change and restore ecosystems.',
    category: 'Environmental',
    status: 'active',
    progress: 67,
    participants: 25847,
    reward: 500,
    deadline: '2024-12-31',
    impact: 'Very High',
    tags: ['trees', 'climate', 'carbon']
  },
  {
    id: '2',
    title: 'Ocean Cleanup Campaign',
    description: 'Remove plastic waste from oceans and waterways.',
    category: 'Environmental',
    status: 'active',
    progress: 45,
    participants: 15632,
    reward: 350,
    deadline: '2024-11-30',
    impact: 'High',
    tags: ['ocean', 'plastic', 'cleanup']
  },
  {
    id: '3',
    title: 'Solar Energy Expansion',
    description: 'Install solar panels in communities worldwide.',
    category: 'Energy',
    status: 'active',
    progress: 78,
    participants: 8934,
    reward: 750,
    deadline: '2024-10-15',
    impact: 'Very High',
    tags: ['solar', 'renewable', 'energy']
  },
  {
    id: '4',
    title: 'Sustainable Agriculture Network',
    description: 'Promote sustainable farming practices globally.',
    category: 'Agriculture',
    status: 'planning',
    progress: 12,
    participants: 3456,
    reward: 400,
    deadline: '2025-03-31',
    impact: 'High',
    tags: ['farming', 'sustainable', 'food']
  },
  {
    id: '5',
    title: 'Wildlife Conservation Program',
    description: 'Protect endangered species and their habitats.',
    category: 'Wildlife',
    status: 'active',
    progress: 56,
    participants: 7890,
    reward: 600,
    deadline: '2024-09-30',
    impact: 'Very High',
    tags: ['wildlife', 'conservation', 'biodiversity']
  }
]
