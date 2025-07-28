
import { Navbar } from '@/components/Navbar'
import { AnimalWelfareHub } from '@/components/animal-welfare/AnimalWelfareHub'

export default function AnimalWelfare() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <AnimalWelfareHub />
      </div>
    </div>
  )
}
