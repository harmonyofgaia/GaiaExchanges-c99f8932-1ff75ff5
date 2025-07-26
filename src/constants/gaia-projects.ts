import { Heart, Sprout, Zap, Snowflake, Waves, Coffee, Wrench, Droplets, Gamepad2, Music, Users } from 'lucide-react'

export interface GAiAProject {
  id: string
  name: string
  description: string
  category: string
  walletAddress: string
  website?: string
  icon: any
  minDonation: number
  suggestedDonations: number[]
  impactDescription: string
  verified: boolean
}

export const GAIA_COMMUNITY_PROJECTS: GAiAProject[] = [
  {
    id: 'heart-of-gaia',
    name: 'The Heart Of Gaia',
    description: 'Core community project fostering global environmental consciousness and sustainable living practices.',
    category: 'Community Foundation',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    website: 'https://www.gaiaexchanges.net',
    icon: Heart,
    minDonation: 100,
    suggestedDonations: [500, 1000, 2500, 5000],
    impactDescription: 'Supporting global environmental awareness and community building initiatives.',
    verified: true
  },
  {
    id: 'seed-splitter',
    name: 'Seed Splitter',
    description: 'Innovative seed distribution network promoting biodiversity and sustainable agriculture worldwide.',
    category: 'Agriculture & Biodiversity',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Sprout,
    minDonation: 250,
    suggestedDonations: [500, 1000, 2500, 5000],
    impactDescription: 'Distributing native seeds to restore ecosystems and support local food security.',
    verified: true
  },
  {
    id: 'railing-energy',
    name: 'Railing Energy',
    description: 'Revolutionary railway-based renewable energy generation system for sustainable transportation.',
    category: 'Renewable Energy',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Zap,
    minDonation: 500,
    suggestedDonations: [1000, 2500, 5000, 10000],
    impactDescription: 'Generating clean energy from railway infrastructure to power sustainable transport.',
    verified: true
  },
  {
    id: 'freeze-capital',
    name: 'Freeze Capital',
    description: 'Arctic preservation initiative focused on protecting polar ecosystems and wildlife habitats.',
    category: 'Conservation',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Snowflake,
    minDonation: 300,
    suggestedDonations: [750, 1500, 3000, 7500],
    impactDescription: 'Protecting Arctic environments and supporting polar wildlife conservation efforts.',
    verified: true
  },
  {
    id: 'earth-aquarium-shrooms',
    name: 'Earth Aquarium of Shrooms',
    description: 'Mycological research center developing sustainable fungal solutions for environmental restoration.',
    category: 'Research & Restoration',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Waves,
    minDonation: 200,
    suggestedDonations: [400, 800, 2000, 4000],
    impactDescription: 'Using mushroom cultivation for soil restoration and environmental healing.',
    verified: true
  },
  {
    id: 'vintage-internet-cafe',
    name: 'Vintage Internet Cafe',
    description: 'Digital inclusion project providing sustainable internet access and environmental education.',
    category: 'Digital Sustainability',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Coffee,
    minDonation: 150,
    suggestedDonations: [300, 600, 1500, 3000],
    impactDescription: 'Bridging digital divides while promoting environmental awareness through technology.',
    verified: true
  },
  {
    id: 'techno-soul-solutions',
    name: 'Techno Soul Solutions',
    description: 'Technology-driven environmental solutions combining innovation with spiritual sustainability.',
    category: 'Green Technology',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Wrench,
    minDonation: 400,
    suggestedDonations: [800, 1600, 4000, 8000],
    impactDescription: 'Developing holistic tech solutions for environmental and social challenges.',
    verified: true
  },
  {
    id: 'natural-clean-system',
    name: 'Natural Clean System',
    description: 'Bio-based cleaning and water purification systems for environmental restoration.',
    category: 'Water & Sanitation',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Droplets,
    minDonation: 250,
    suggestedDonations: [500, 1000, 2500, 5000],
    impactDescription: 'Providing natural water purification and ecosystem restoration solutions.',
    verified: true
  },
  {
    id: 'nft-gameswap-virtual',
    name: 'NFT GameSwap Virtual',
    description: 'Virtual gaming platform promoting environmental awareness through blockchain-based games.',
    category: 'Environmental Gaming',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Gamepad2,
    minDonation: 100,
    suggestedDonations: [200, 500, 1000, 2000],
    impactDescription: 'Gamifying environmental action and education through virtual experiences.',
    verified: true
  },
  {
    id: 'sound-riffs-re-grau-dio',
    name: 'Sound Riffs Re Grau dio',
    description: 'Musical platform creating environmental awareness through collaborative sound experiences.',
    category: 'Environmental Arts',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Music,
    minDonation: 100,
    suggestedDonations: [250, 500, 1250, 2500],
    impactDescription: 'Using music and sound to inspire environmental consciousness and action.',
    verified: true
  },
  {
    id: 'greenlake-tribe',
    name: 'GreenLake Tribe',
    description: 'Community-based lake and wetland restoration project supporting aquatic ecosystems.',
    category: 'Ecosystem Restoration',
    walletAddress: '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh',
    icon: Users,
    minDonation: 200,
    suggestedDonations: [400, 800, 2000, 4000],
    impactDescription: 'Restoring lake ecosystems and building sustainable community stewardship.',
    verified: true
  }
]

export const CULTURE_OF_HARMONY_URL = 'https://www.gaiaexchanges.net/heart-of-gaia-projects'

export const getCommunityProjectById = (id: string): GAiAProject | undefined => {
  return GAIA_COMMUNITY_PROJECTS.find(project => project.id === id)
}

export const getCommunityProjectsByCategory = (category: string): GAiAProject[] => {
  return GAIA_COMMUNITY_PROJECTS.filter(project => project.category === category)
}

export const getAllCategories = (): string[] => {
  return Array.from(new Set(GAIA_COMMUNITY_PROJECTS.map(project => project.category)))
}