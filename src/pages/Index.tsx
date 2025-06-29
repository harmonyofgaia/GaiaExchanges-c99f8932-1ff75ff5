import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-green-900 dark:to-blue-900">
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">
          Welcome to Harmony of Gaia
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore the future of gaming and sustainable technology.
        </p>
      </header>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
              Eco-Friendly Initiatives
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Learn about our commitment to sustainability and how we're making a positive impact on the planet.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Discover the innovative technologies that power our platform and drive our mission forward.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
              Community Engagement
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Join our vibrant community of gamers, developers, and environmental enthusiasts.
            </p>
          </div>
        </div>
      </section>
      
      {/* Add this to the navigation section */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-6">
          <Link 
            to="/game" 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            🎮 Play GAIA Fighter
          </Link>
          <Link 
            to="/admin" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📊 Admin Panel
          </Link>
          <Link 
            to="/secure-admin" 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            🛡️ Secure Admin Vault
          </Link>
        </div>
      </nav>

      <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2025 Harmony of Gaia. All rights reserved.</p>
      </footer>
    </div>
  )
}
