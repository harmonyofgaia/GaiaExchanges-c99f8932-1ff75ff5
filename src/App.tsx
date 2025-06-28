
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NotFound, Admin, UltimateSecurity, SecureVault } from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ultimate-security" element={<UltimateSecurity />} />
        <Route path="/secure-vault" element={<SecureVault />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
