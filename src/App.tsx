import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient } from './QueryClient'
import Index from '@/pages/Index'
import Markets from '@/pages/Markets'
import Webshop from '@/pages/Webshop'
import AnimalWelfare from '@/pages/AnimalWelfare'
import NFTGreenAnimalPlatform from '@/pages/NFTGreenAnimalPlatform'
import Contact from '@/pages/Contact'
import About from '@/pages/About'
import Navbar from '@/components/Navbar'

function App() {
  return (
    <QueryClient>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/webshop" element={<Webshop />} />
            <Route path="/animal-welfare" element={<AnimalWelfare />} />
            <Route path="/nft-green-animal-platform" element={<NFTGreenAnimalPlatform />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClient>
  )
}

export default App
