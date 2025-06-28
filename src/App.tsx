import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Admin } from './pages'
import { NotFound } from './pages'
import { UltimateSecurity } from './pages'
import { AuthTestPage } from './pages'
import { SecureVault } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ultimate-security" element={<UltimateSecurity />} />
        <Route path="/auth-test" element={<AuthTestPage />} />
        <Route path="/secure-vault" element={<SecureVault />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
